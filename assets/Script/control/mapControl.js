cc.Class({
    extends: cc.Component,

    properties: {
        tiles: [],
        cameraNode: cc.Node,
        controlNode: cc.Node,
        tileHUD: cc.Node,
        visionRange: 0,
        fightOdds: 0,
    },

    // use this for initialization
    onLoad: function () {
        this.Tile = require("tile");
		//获取地图尺寸以供tileRound方法使用
        this.col = this.node.getComponent('mapCreate').col;
        this.row = this.node.getComponent('mapCreate').row;
        this.loadMap();
    },
    
    onDisable: function() {
        var mapData = JSON.parse(cc.sys.localStorage.getItem("mapData"));
        if(mapData !== null) {
            for(var i = 0; i < this.tiles.length; ++i) {
                if(this.tiles[i].getComponent("tileTem").state === this.Tile.STATE.EXPLORED) {
                    mapData.tiles[i].state = this.Tile.STATE.EXPLORED;
                }
            }
            cc.sys.localStorage.setItem("mapData",JSON.stringify(mapData));
        }
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    //载入地图
    loadMap: function() {
        var mapData = this.node.getComponent('mapCreate').createMap();//调用方法新建地图并获取地图信息
        this.tiles = mapData.tiles;
        this.hero = mapData.base;
        this.spwanHero();
    },
    //英雄出生
    spwanHero: function() {
        var heroTile = this.hero.getComponent("tileTem");
        
        heroTile.type = this.Tile.TYPE.BASE;
        heroTile.state = this.Tile.STATE.EXPLORED;
        heroTile.heroOn = true;
        //锁定摄像机位置并消除战争迷雾
        this.cameraNode.getComponent("cameraControl").initTarget(this.hero);
        this.openVision(this.hero.tag , this.visionRange);
        this.tileHUD.active = true;
        this.tileHUD.getComponent(cc.Animation).play('tileHUD-anim-show');
        this.enterSpecialNode(this.hero.getComponent('tileTem'));
    },
    //移动英雄，由heroControl脚本调用
    heroMove: function(nextDirection) {
        var nextTile = this.tileRound(this.hero.tag, nextDirection);
        var HUDAnim = this.tileHUD.getComponent(cc.Animation);
        //若下一个位置离开了特殊节点则隐藏进入按钮
        if((nextTile.getComponent('tileTem').type === this.Tile.TYPE.BLANK) && this.hero.getComponent('tileTem').type !== this.Tile.TYPE.BLANK && this.hero.getComponent('tileTem').type !== this.Tile.TYPE.OCCUPIED) {
            // this.tileHUD.active = false;
            HUDAnim.play('tileHUD-anim-hide');
            this.exitSpecialNode();
        }
		//若下一个位置为特殊节点则显示进入按钮
        if((nextTile.getComponent('tileTem').type !== this.Tile.TYPE.BLANK) && (this.hero !== nextTile) && (nextTile.getComponent('tileTem').type !== this.Tile.TYPE.OCCUPIED)) {
            this.tileHUD.active = true;
            HUDAnim.play('tileHUD-anim-show');
            this.enterSpecialNode(nextTile);
        }
        
        var adventureControl = this.controlNode.getComponent('adventureControl');
        adventureControl.water--;
        if(adventureControl.water <= 0) {
            cc.log('you are die!');
            adventureControl.water = 0;
        }
        
        this.hero.getComponent("tileTem").heroOn = false;
        this.hero = nextTile;
        cc.log("move to " + this.hero.tag + "t");
        
        this.hero.getComponent("tileTem").heroOn = true;
        this.cameraNode.getComponent("cameraControl").changeTarget(this.hero);//移动摄像机跟随英雄
        this.openVision(this.hero.tag , this.visionRange);//开拓视野
        
		//若玩家行走在空白区域则有几率触发战斗
        if(this.hero.getComponent('tileTem').type === this.Tile.TYPE.BLANK) {
            this.beginFight();
        }
    },
    //消除战争迷雾
    openVision: function(i , range) {
        var roundTiles = this.tileRound(i);
        
        for(var n = 0;n < roundTiles.length; ++n){
            if( roundTiles[n].getComponent("tileTem").state !== this.Tile.STATE.EXPLORED){
                this.tiles[roundTiles[n].tag].getComponent("tileTem").state = this.Tile.STATE.EXPLORED;
            }
            if(range > 1){
                this.openVision(roundTiles[n].tag , (range - 1));//递归开拓更远范围内的视野
            }
        }
    },
    //初始化进入特殊节点按钮
    enterSpecialNode: function(heroOnTile) {
        var tileTem = heroOnTile.getComponent('tileTem');
        var enterButton = this.tileHUD.getChildByName('enterButton').getComponent(cc.Button);
        var enterLabel = this.tileHUD.getChildByName('enterButton').getChildByName('Label').getComponent(cc.Label);
        var tileInfo = this.tileHUD.getChildByName('tileInfo');
        var tileInfo1 = tileInfo.getChildByName('info1').getComponent(cc.Label);
        var tileInfo2 = tileInfo.getChildByName('info2').getComponent(cc.Label);
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.controlNode; 
        clickEventHandler.component = 'specialNodeControl';
        switch(tileTem.type) {//根据节点种类不同设置对应方法
            case this.Tile.TYPE.BASE:
                enterLabel.string = '返回基地';
                tileInfo1.string = '基地';
                tileInfo2.string = '运行中';
                clickEventHandler.handler = 'backToBase';
                clickEventHandler.customEventData = heroOnTile.tag;
            break;
            case this.Tile.TYPE.BATTLE:
                switch(tileTem.battleType) {
                    case this.Tile.BATTLE.CAVE:
                        enterLabel.string = '进入洞穴';
                        tileInfo1.string = '洞穴';
                        tileInfo2.string = '危险';
                        clickEventHandler.handler = 'enterCave';
                    break;
                    case this.Tile.BATTLE.BATFIELD:
                        enterLabel.string = '进入战场遗迹';
                        tileInfo1.string = '战场';
                        tileInfo2.string = '危险';
                        clickEventHandler.handler = 'enterBatField';
                    break;
                    case this.Tile.BATTLE.CRATER:
                        enterLabel.string = '进入陨石坑';
                        tileInfo1.string = '陨石坑';
                        tileInfo2.string = '危险';
                        clickEventHandler.handler = 'enterCrater';
                    break;
                    case this.Tile.BATTLE.BATBASE:
                        enterLabel.string = '进入废弃基地';
                        tileInfo1.string = '废弃基地';
                        tileInfo2.string = '未占领';
                        clickEventHandler.handler = 'enterBatBase';
                    break;
                    case this.Tile.BATTLE.BATRES:
                        enterLabel.string = '进入废弃资源点';
                        tileInfo1.string = '资源点';
                        tileInfo2.string = '未占领';
                        clickEventHandler.handler = 'enterBatRes';
                    break;
                    case this.Tile.BATTLE.BATPORTAL:
                        enterLabel.string = '进入废弃传送门';
                        tileInfo1.string = '传送门';
                        tileInfo2.string = '未占领';
                        clickEventHandler.handler = 'enterBatPortal';
                    break;
                    case this.Tile.BATTLE.ALIENBASE:
                        enterLabel.string = '进入外星基地';
                        tileInfo1.string = '外星基地';
                        tileInfo2.string = '危险';
                        clickEventHandler.handler = 'enterAlienBase';
                    break;
                    default:break;
                }
            clickEventHandler.customEventData = heroOnTile.tag;
            break;
            case this.Tile.TYPE.RESPOINT:
                enterLabel.string = '进入资源点';
                tileInfo1.string = '资源点';
                tileInfo2.string = '已占领';
                clickEventHandler.handler = 'enterRespoint';
                switch(tileTem.respointType) {
                    case this.Tile.RESPOINT.RES1:
                        cc.log('1');
                        clickEventHandler.customEventData = 0;
                    break;
                    case this.Tile.RESPOINT.RES2:
                        cc.log('2');
                        clickEventHandler.customEventData = 1;
                    break
                    case this.Tile.RESPOINT.RES3:
                        cc.log('3');
                        clickEventHandler.customEventData = 2;
                    break;
                    default:break;
                }
            break;
            case this.Tile.TYPE.PORTAL:
                enterLabel.string = '进入传送门';
                tileInfo1.string = '传送门';
                tileInfo2.string = '已占领';
                clickEventHandler.handler = 'enterPortal';
            break;
            case this.Tile.TYPE.OUTPOST:
                enterLabel.string = '进入前哨站';
                tileInfo1.string = '前哨站';
                tileInfo2.string = '防御中';
                clickEventHandler.handler = 'enterOutpost';
            break;
            case this.Tile.TYPE.STRONGHOLD:
                enterLabel.string = '进入据点';
                tileInfo1.string = '据点';
                tileInfo2.string = '已占领';
                clickEventHandler.handler = 'enterStrongHold';
            break;
        }
        enterButton.clickEvents.push(clickEventHandler);
    },
    //删除特殊节点进入按钮的点击事件
    exitSpecialNode: function() {
        var enterButton = this.tileHUD.getChildByName('enterButton').getComponent(cc.Button);
        
        enterButton.clickEvents.splice(0, enterButton.clickEvents.length);
    },
    //随机开始战斗
    beginFight: function() {
        var fightFlag = Math.random().toFixed(2) < this.fightOdds ? true: false;
        if(fightFlag) {
            var fightControl = cc.find('view/fight',this.node).getComponent('fightControl');
            var monsterData = JSON.parse(cc.sys.localStorage.getItem("monsterData"));
		    var monsterCode = parseInt(cc.rand() % monsterData.length);
            fightControl.initFight(monsterCode, 'map');
        }
    },
    
    changeTileType: function(tileCode, typeCode, secoendTypeCode) {
        cc.log('tileCode is:' + tileCode);
        var usedType = this.tiles[tileCode].getComponent('tileTem').type;
        if(typeCode !== usedType) {
            if(typeCode === this.Tile.TYPE.BATTLE) {
                this.tiles[tileCode].getComponent('tileTem').type = typeCode;
                this.tiles[tileCode].getComponent('tileTem').battleType = secoendTypeCode;
            }
            else if(typeCode === this.Tile.TYPE.RESPOINT) {
                this.tiles[tileCode].getComponent('tileTem').type = typeCode;
                this.tiles[tileCode].getComponent('tileTem').respointType = secoendTypeCode;
            }
            else {
                this.tiles[tileCode].getComponent('tileTem').type = typeCode;
            }
        }
        var mapCreate = this.node.getComponent('mapCreate');
        mapCreate.saveMapData();
    },
    
    //返回tag为i的tile的周围tile数组
    tileRound: function(i , direction) {
        var col = this.col;
        var row = this.row;
        var roundTiles = [];
        if(i % col > 0){//左
            if(direction === "left") return this.tiles[i-1];
            roundTiles.push(this.tiles[i-1]);
        }
        else if(direction === "left") return this.tiles[i];
        
        if(i % col > 0 && Math.floor(i / col) > 0){//left bottom
            if(direction === "rightTop") return this.tiles[i - col - 1];
            roundTiles.push(this.tiles[i - col - 1]);   
        }
        else if(direction === "rightTop") return this.tiles[i];
        
        if(i % col > 0 && Math.floor(i / col) < row - 1){//left top
            if(direction === "leftTop") return this.tiles[i + col - 1];
            roundTiles.push(this.tiles[i + col - 1]);
        }
        else if(direction === "leftTop") return this.tiles[i];
        
        if(Math.floor(i / col) > 0){//bottom
            if(direction === "bottom") return this.tiles[i - col];
            roundTiles.push(this.tiles[i - col]);
        }
        else if(direction === "bottom") return this.tiles[i];
        
        if(Math.floor(i / col) < row - 1){//top
            if(direction === "top") return this.tiles[i + col];
            roundTiles.push(this.tiles[i + col]);
        }
        else if(direction === "top") return this.tiles[i];
        
        if(i % col < col - 1){//right
            if(direction === "right") return this.tiles[i+1];
            roundTiles.push(this.tiles[i+1]);
        }
        else if(direction === "right") return this.tiles[i];
        
        if(i % col < col - 1 && Math.floor(i / col) > 0){//rihgt bottom
            if(direction === "rightButtom") return this.tiles[i - col + 1];
            roundTiles.push(this.tiles[i - col + 1]);
        }
        else if(direction === "rightBottom") return this.tiles[i];
        
        if(i % col < col - 1 && Math.floor(i / col) < row - 1){//right top
            if(direction === "leftButtom") return this.tiles[i + col + 1];
            roundTiles.push(this.tiles[i + col + 1]);
        }
        else if(direction === "leftBottom") return this.tiles[i];
        
        return roundTiles;
    },
});
