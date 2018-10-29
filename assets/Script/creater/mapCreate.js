cc.Class({
    extends: cc.Component,

    properties: {
        mapNode: cc.Node,
        tilePre: cc.Prefab,
        tiles: [],
        row: 0,
        col: 0,
        caveNum: 0,
        batFieldNum: 0,
        craterNum: 0,
        batBaseNum: 0,
        batResNum: 0,
        batPortalNum: 0,
        alienBaseNum: 0,
    },

    // use this for initialization
    onLoad: function () {
        this.Tile = require("tile");
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    //该方法由mapControl调用
    createMap: function() {
        this.Tile = require("tile");
        this.mapData = JSON.parse(cc.sys.localStorage.getItem("mapData"));
        if((this.mapData === null)) {
            this.initMap();
        }
        else {
            this.loadMap();
        }
        
        return {//返回地图数据以供mapControl使用
            "tiles": this.tiles,
            "base": this.base, 
        };
    },
    //载入地图
    loadMap: function() {
        var mapData = JSON.parse(cc.sys.localStorage.getItem("mapData"));
        
        for(var i = 0; i < mapData.tiles.length ; ++i) {
            var tile = cc.instantiate(this.tilePre);
            
            tile.tag = i;
            tile.getComponent('tileTem').type = mapData.tiles[i].type;
            if(mapData.tiles[i].type === this.Tile.TYPE.BATTLE) {
                tile.getComponent('tileTem').battleType = mapData.tiles[i].battleType;
            }
            if(mapData.tiles[i].type === this.Tile.TYPE.RESPOINT) {
                tile.getComponent('tileTem').respointType = mapData.tiles[i].respointType;
            }
            tile.getComponent('tileTem').state = mapData.tiles[i].state;
            
            this.mapNode.addChild(tile);
            this.tiles.push(tile);
        }
        this.base = this.tiles[parseInt(this.tiles.length / 2)];
    },
    
    //新建地图
    initMap: function() {
        for(var y = 0; y < this.row; ++y){
            for(var x = 0; x < this.col; ++x){
                var tile = cc.instantiate(this.tilePre);
                tile.tag = y * this.col + x;
                
                tile.getComponent('tileTem').state = this.Tile.STATE.NOTEXPLORED;
                
                this.mapNode.addChild(tile);
                this.tiles.push(tile);
            }
        }
        //this.addSpecialNode();
        this.addTestNode();
    },
    
    addTestNode: function() {
        //addBase
        this.base = this.tiles[parseInt(this.tiles.length / 2)];
        this.base.getComponent("tileTem").type = this.Tile.TYPE.BASE;
        
        //addCave
        this.tiles[108].getComponent("tileTem").battleType = this.Tile.BATTLE.CAVE;
        //addAlienBase
        this.tiles[110].getComponent("tileTem").battleType = this.Tile.BATTLE.ALIENBASE;
        //addBatfield
        this.tiles[112].getComponent("tileTem").battleType = this.Tile.BATTLE.BATFIELD;
        //addCrater
        this.tiles[80].getComponent("tileTem").battleType = this.Tile.BATTLE.CRATER;
        //addBatbase
        this.tiles[82].getComponent("tileTem").battleType = this.Tile.BATTLE.BATBASE;
        //addBatres
        this.tiles[86].getComponent("tileTem").battleType = this.Tile.BATTLE.BATRES;
        //addBatportal
        // this.tiles[88].getComponent("tileTem").battleType = this.Tile.BATTLE.BATPORTAL;
        //addStronghold
        // this.tiles[56].getComponent("tileTem").type = this.Tile.TYPE.STRONGHOLD;
        //addOutpost
        this.tiles[58].getComponent("tileTem").type = this.Tile.TYPE.OUTPOST;
        //addPortal
        // this.tiles[60].getComponent("tileTem").type = this.Tile.TYPE.PORTAL;
        //addRespoint1
        this.tiles[30].getComponent("tileTem").respointType = this.Tile.RESPOINT.RES1;
        //addRespoint2
        this.tiles[32].getComponent("tileTem").respointType = this.Tile.RESPOINT.RES2;
        //addRespoint3
        this.tiles[34].getComponent("tileTem").respointType = this.Tile.RESPOINT.RES3;
        
        this.saveMapData();
    },
    
    //添加特殊地图点
    addSpecialNode: function() {
        var tilesIndex = [];//获取tile索引
        var randPlace = 0;
        for(var i = 0;i < this.tiles.length; ++i){
            tilesIndex[i] = 0;
        }        
        
        //addBase
        this.base = this.tiles[parseInt(this.tiles.length / 2)];
        this.base.getComponent("tileTem").type = this.Tile.TYPE.BASE;
        this.setBufferArea(tilesIndex , parseInt(this.tiles.length / 2) , this.Tile.TYPE.BASE);
        
        //addCave
        for(var caveCode = 0; caveCode < this.caveNum; ++caveCode){
            randPlace = Math.floor(Math.random() * tilesIndex.length);
            if(tilesIndex[randPlace] === 0) {
                this.tiles[randPlace].getComponent("tileTem").battleType = this.Tile.BATTLE.CAVE;
                this.setBufferArea(tilesIndex, randPlace, this.Tile.TYPE.BATTLE);
            }
            else caveCode--;
        }
        
        //addResPoint
        for(var resPointCode = 0; resPointCode < this.resPointNum; ++resPointCode){
            randPlace = Math.floor(Math.random() * tilesIndex.length);
            if(tilesIndex[randPlace] === 0) {
                this.tiles[randPlace].getComponent("tileTem").type = this.Tile.TYPE.RESPOINT;
                this.setBufferArea(tilesIndex, randPlace, this.Tile.TYPE.RESPOINT);
            }
            else resPointCode--;
        }
        //addStronghold
        for(var strongholdCode = 0; strongholdCode < this.strongholdNum; ++strongholdCode){
            randPlace = Math.floor(Math.random() * tilesIndex.length);
            if(tilesIndex[randPlace] === 0) {
                this.tiles[randPlace].getComponent("tileTem").type = this.Tile.TYPE.STRONGHOLD;
                this.setBufferArea(tilesIndex, randPlace, this.Tile.TYPE.STRONGHOLD);
            }
            else strongholdCode--;
        }
       //cc.log(tilesIndex);
       
       this.saveMapData();
    },
    //设置缓冲区（一个地图点附近不能有第二个相同地图点）
    setBufferArea: function(tilesIndex , nodeCode , type) {
        this.tileRound = this.node.getComponent('mapControl').tileRound;
        tilesIndex[nodeCode] = type;
        var roundTiles = this.tileRound(nodeCode);
        for(var k = 0;k < roundTiles.length; ++k){
            tilesIndex[roundTiles[k].tag] = type;
        }
    },
    //保存地图数据
    saveMapData: function() {
        var mapData = {
            'tiles': [],
            'specialNodeData': {}
        };
        for(var tileCode = 0; tileCode < this.tiles.length; ++tileCode) {
            // cc.log(this.tiles[tileCode].getComponent('tileTem'));
            var tileData = {
                "state": this.tiles[tileCode].getComponent('tileTem').state,
                "type": this.tiles[tileCode].getComponent('tileTem').type,
                "battleType": this.tiles[tileCode].getComponent('tileTem').battleType,
                "respointType": this.tiles[tileCode].getComponent('tileTem').respointType,
            };
            mapData.tiles.push(tileData);
        }
        mapData.specialNodeData = this.initSpecialNodeData();
        cc.log(mapData);
        cc.sys.localStorage.setItem("mapData",JSON.stringify(mapData));
    },
    
    initSpecialNodeData: function() {
        var battleData = JSON.parse(cc.sys.localStorage.getItem("battleData"));
        var specialNodeData = {
            'cave': [],
            'batField': [],
            'crater': [],
            'batBase': [],
            'batRes': [],
            'batPortal': [],
            'alienBase': [],
            'caveCode': 0,
            'batFieldCode': 0,
            'craterCode': 0,
            'batBaseCode': 0,
            'batResCode': 0,
            'batPortalCode': 0,
            'alienBaseCode': 0
        };
        
        //initCaveData
        for(var caveCode = 0; caveCode < this.caveNum; ++caveCode) {
            specialNodeData.cave.push(this.initBattleData(battleData.cave));
        }
        //initBatField
        for(var batFieldCode = 0; batFieldCode < this.batFieldNum; ++batFieldCode) {
            specialNodeData.batField.push(this.initBattleData(battleData.batField));
        }
        //initCrater
        for(var craterCode = 0; craterCode < this.craterNum; ++craterCode) {
            specialNodeData.crater.push(this.initBattleData(battleData.crater));
        }
        //initBatBase
        for(var batBaseCode = 0; batBaseCode < this.batBaseNum; ++batBaseCode) {
            specialNodeData.batBase.push(this.initBattleData(battleData.batBase));
        }
        //initBatRes
        for(var batResCode = 0; batResCode < this.batResNum; ++batResCode) {
            specialNodeData.batRes.push(this.initBattleData(battleData.batRes));
        }
        //initBatPortal
        for(var batPortalCode = 0; batPortalCode < this.batPortalNum; ++batPortalCode) {
            specialNodeData.batPortal.push(this.initBattleData(battleData.batPortal));
        }
        //initAlienBase
        for(var alienBaseCode = 0; alienBaseCode < this.alienBaseNum; ++alienBaseCode) {
            specialNodeData.alienBase.push(this.initBattleData(battleData.alienBase));
        }
        
        cc.log(specialNodeData);
        return specialNodeData;
    },
    
    initBattleData: function(totalBattleData) {
        var battleData = [];
        var levelNum = 2 + Math.round(Math.random() * (totalBattleData.length - 3));
        for(var levelCode = 0; levelCode < levelNum; ++levelCode) {
            var totalLevelData;
            if(levelCode < (levelNum - 1)) {
                totalLevelData = totalBattleData[levelCode];
            }
            else {
                totalLevelData = totalBattleData[totalBattleData.length - 1];
            }
            var sceneCode = Math.round(Math.random() * (totalLevelData.scene.length - 1));
            var sceneData = totalLevelData.scene[sceneCode];
            var levelData = {
                'type': 0,
                'scene': {
                    'name': sceneData.name,
                    'content': sceneData.content,
                    'contentAfterGive': '',
                },
                'monster': 0,
                'drop': [],
                'need': [],
            };
            if(typeof(sceneData.type) === 'undefined') {
                levelData.type = 0;
            }
            else {
                levelData.type = sceneData.type;
            }
            var monsterData = JSON.parse(cc.sys.localStorage.getItem("monsterData"));
            // cc.log(sceneCode);
            switch(levelData.type) {
                case 0:
                    var monsterCode = Math.round(Math.random() * (totalLevelData.monster.length - 1));
                    levelData.monster = totalLevelData.monster[monsterCode];
                    levelData.scene.content += monsterData[levelData.monster].introduce;
                break;
                case 1:
                    levelData.monster = -1;
                break;
                case 2:
                    levelData.scene.content += monsterData[levelData.monster].introduce;
                    levelData.scene.contentAfterGive = sceneData.contentAfterGive;
                    for(var needCode = 0; needCode < sceneData.need.length; ++needCode) {
                        
                        if(needCode < sceneData.need.length - 2) {
                            var needFlag = Math.random().toFixed(2) < sceneData.need[needCode].odds ? true: false;
                        }
                        else if(levelData.need.length === 0) {
                            var needFlag = true;
                        }
                        if(needFlag) {
                            var needTemp = sceneData.need[needCode];
                            needTemp.number = 1 + Math.round(Math.random() * (sceneData.need[needCode].number - 1));
                            levelData.need.push(needTemp);
                        }
                    }
                break;
                default:break;
            }
            levelData.drop = levelData.type === 0? -1 : sceneData.drop,
            battleData.push(levelData);
        }
        return battleData;
    },
});
