cc.Class({
    extends: cc.Component,

    properties: {
        specialNodeScene: cc.Node,
        tileHUD: cc.Node,
        
        _useData: 0,
        _levelCode: 0,
        _useInfo: 0,
    },

    // use this for initialization
    onLoad: function () {
        this.Tile = require("tile");
        if(cc.director.getScene().getChildByName("massageArea") !== null) {
            this.sendMassage = cc.director.getScene().getChildByName("massageArea").getComponent("massageAreaControl").createAMassage;
        }
        else {
            cc.warn('sendMassage is null');
        }
    },

    backToBase: function() {
        cc.director.loadScene("game", function() {
            var welcomeScene = cc.find('welcome');
            var controlCenter = cc.find('Canvas/ControlCenter');
            var adventurePrepare = cc.find('Canvas/adventurePrepare');
            
            welcomeScene.active = false;
            controlCenter.active = false;
            adventurePrepare.active = true;
        });
    },
    
    enterCave: function(event, tileTag) {
        cc.log('enterCave');
        var mapData = JSON.parse(cc.sys.localStorage.getItem("mapData"));
        var caveData = mapData.specialNodeData.cave[mapData.specialNodeData.caveCode];
        // //testUse
        // caveData[0].drop = -1;
        // caveData[0].monster = 1;
        // caveData[0].scene.content = 'content1';
        // caveData[0].scene.name = 'name1';
        // caveData[0].type = 0;
        
        // caveData[0].drop = [{"id":4,"odds":1,"number":2},{"id":6,"odds":1,"number":2}];
        // caveData[0].monster = -1;
        // caveData[0].scene.content = 'content2';
        // caveData[0].scene.name = 'name2';
        // caveData[0].type = 1;
        
        // caveData[0].drop = -1;
        // caveData[0].monster = 1;
        // caveData[0].scene.content = 'content2';
        // caveData[0].scene.contentAfterGive = 'content2AfterGive';
        // caveData[0].scene.name = 'name2';
        // caveData[0].type = 2;
        // caveData[0].need = [{"id":9,"odds":0.5,"number":5},{"id":0,"odds":0.5,"number":4}];
        
        // caveData.splice(1, caveData.length - 1);
        // //testUse
        
        this._useData = caveData;
        // cc.log(caveData);
        this._levelCode = 0;
        var useInfo = {
            name: 'cave',
            tileTag: tileTag,
        };
        this._useInfo = useInfo;
        this.initLevel('event', 'scene');
    },
    
    enterBatField: function(event, tileTag) {
        cc.log('enterBatField');
        var mapData = JSON.parse(cc.sys.localStorage.getItem("mapData"));
        var batFieldData = mapData.specialNodeData.batField[mapData.specialNodeData.batFieldCode];
        
        this._useData = batFieldData;
        this._levelCode = 0;
        var useInfo = {
            name: 'batField',
            tileTag: tileTag,
        };
        this._useInfo = useInfo;
        this.initLevel('event', 'scene');
    },
    
    enterCrater: function(event, tileTag) {
        cc.log('enterCrater');
        var mapData = JSON.parse(cc.sys.localStorage.getItem("mapData"));
        var craterCode = mapData.specialNodeData.crater[mapData.specialNodeData.craterCode];
        
        this._useData = craterCode;
        this._levelCode = 0;
        var useInfo = {
            name: 'crater',
            tileTag: tileTag,
        };
        this._useInfo = useInfo;
        this.initLevel('event', 'scene');
    },
    
    enterBatBase: function(event, tileTag) {
        cc.log('enterBatBase');
        var mapData = JSON.parse(cc.sys.localStorage.getItem("mapData"));
        var batBaseData = mapData.specialNodeData.batBase[mapData.specialNodeData.batBaseCode];
        
        this._useData = batBaseData;
        this._levelCode = 0;
        var useInfo = {
            name: 'batBase',
            tileTag: tileTag,
        };
        this._useInfo = useInfo;
        this.initLevel('event', 'scene');
    },
    
    enterBatRes: function(event, tileTag) {
        cc.log('enterBatRes');
        var mapData = JSON.parse(cc.sys.localStorage.getItem("mapData"));
        var batResData = mapData.specialNodeData.batRes[mapData.specialNodeData.batResCode];
        
        this._useData = batResData;
        this._levelCode = 0;
        this._useName = 'batRes';
        var useInfo = {
            name: 'batRes',
            tileTag: tileTag,
        };
        this._useInfo = useInfo;
        this.initLevel('event', 'scene');
    },
    
    enterBatPortal: function(event, tileTag) {
        cc.log('enterBatPortal');
        var mapData = JSON.parse(cc.sys.localStorage.getItem("mapData"));
        var batPortalData = mapData.specialNodeData.batPortal[mapData.specialNodeData.batPortalCode];
        
        this._useData = batPortalData;
        this._levelCode = 0;
        var useInfo = {
            name: 'batPortal',
            tileTag: tileTag,
        };
        this._useInfo = useInfo;
        this.initLevel('event', 'scene');
    },
    
    enterAlienBase: function(event, tileTag) {
        cc.log('enterAlienBase');
        var mapData = JSON.parse(cc.sys.localStorage.getItem("mapData"));
        var alienBaseData = mapData.specialNodeData.alienBase[mapData.specialNodeData.alienBaseCode];
        
        this._useData = alienBaseData;
        this._levelCode = 0;
        var useInfo = {
            name: 'alienBase',
            tileTag: tileTag,
        };
        this._useInfo = useInfo;
        this.initLevel('event', 'scene');
    },
    
    enterRespoint: function(event, resCode) {
        cc.log('enterRespoint');
        var specialNodeSceneControl = this.specialNodeScene.getComponent('specialNodeSceneControl');
        var respointContent = {
            'name': '资源点',
            'content': '这里是一个资源点!',
        };
        switch(resCode) {
            case 0:
                respointContent.content = '这里是资源点A!';
            break;
            case 1:
                respointContent.content = '这里是资源点B!';
            break;
            case 2:
                respointContent.content = '这里是资源点C!';
            break;
            default:break;
        }
        specialNodeSceneControl.init(respointContent);
    },
    
    enterPortal: function() {
        cc.log('enterPortal');
    },
    
    enterOutpost: function() {
        cc.log('enterOutpost');
        var dropControl = cc.find('Canvas/map/view/drop').getComponent('dropControl');
        dropControl.initDrop([{
            "id": 0,
            "odds": 1,
            "number": 6,
        }]);
        var adventureControl = cc.find('Canvas/control').getComponent('adventureControl');
        adventureControl.water = adventureControl.backPackInfo.maxWater;
    },
    
    enterStrongHold: function() {
        cc.log('enterStrongHold');
    },
    
    initLevel: function(event, initType) {
        // cc.log('levelCode: ' + this._levelCode + ' initType: ' + initType);
        // cc.log('initType:' + initType);
        var levelData = this._useData[this._levelCode];
        // cc.log('levelData:');
        // cc.log(levelData);
        
        switch(initType) {
            case 'scene':
                this.initScene(levelData.scene, levelData.type);
            break;
            case 'sceneAfterGive':
                this.sceneAfterGive(levelData);
            break;
            case 'fight':
                this.initFight(levelData.monster);
            break;
            case 'drop':
                var dropData;
                var monsterData = JSON.parse(cc.sys.localStorage.getItem("monsterData"));
                switch(levelData.type) {
                    case 0:
                        dropData = monsterData[levelData.monster].drop;
                    break;
                    case 1:
                        dropData = levelData.drop;
                    break;
                    case 2:
                        dropData = monsterData[levelData.monster].drop;
                    break;
                    default: break;
                }
                this.initDrop(dropData);
            break;
            case 'desert':
                var specialNodeSceneControl = this.specialNodeScene.getComponent('specialNodeSceneControl');
                specialNodeSceneControl.hideScene();
            break;
            case 'finish':
                if(this._levelCode < this._useData.length - 1) {
                    this._levelCode ++;
                    this.initLevel(0, 'scene');
                }
                else {
                    var mapControl =cc.find('Canvas/map').getComponent('mapControl'); 
                    cc.log(this._useInfo.name + ' finish!');
                    cc.log(this._useInfo.tileTag + ' finish!(tileTag)');
                    switch(this._useInfo.name) {
                        case 'cave':
                        case 'batField':
                        case 'crater':
                            mapControl.changeTileType(this._useInfo.tileTag, this.Tile.TYPE.OCCUPIED);
                        break;
                        case 'alienBase':
                        case 'batBase':
                            mapControl.changeTileType(this._useInfo.tileTag, this.Tile.TYPE.OUTPOST);
                        break;
                        case 'batRes':
                            
                        break;
                    }
                    this.tileHUD.active = false;
                }
            break;
            default: break;
        }
    },
    
    sceneAfterGive: function(levelData) {
        var sceneData = levelData.scene;
        var adventureControl = this.node.getComponent('adventureControl');
        var backpackData = adventureControl.backPackData;
        var passFlag = true;
        for(var i = 0; i < levelData.need.length; ++i) {
            if(levelData.need[i].number > backpackData[levelData.need[i].id].number) {
                passFlag = false;
                // cc.log('check not passed');
                this.sendMassage('你的背包里缺少相应的物品');
                break;
            }
        }
        if(passFlag) {
            // cc.log('check passed');
            for(var j = 0; j < levelData.need.length; ++j) {
                adventureControl.changeBackpackItem(levelData.need[j].id, -levelData.need[j].number);
            }
            sceneData.content = sceneData.contentAfterGive;
            this.initScene(sceneData, -1);
        }
    },
    
    initScene: function(sceneData, type) {
        var action = [];
        for(var i = 0; i < 2; ++i) {
            var actionData = {
                'content': 'undefined',
                'target': cc.find('Canvas/control'),
                'component': 'specialNodeControl',
                'handler': 'initLevel',
                'customEventData': 'undefined',
            };
            action.push(actionData);
        }
        
        switch(type) {
            case -1://the scene after give
                action[0].content = '继续';
                action[0].customEventData = "finish";
                action[1].content = '离开';
                action[1].customEventData = "finish";
            break;
            case 0:
                action[0].content = '战斗';
                action[0].customEventData = "fight";
                action[1].content = '逃跑';
                action[1].customEventData = "desert";
            break;
            case 1:
                action[0].content = '查看';
                action[0].customEventData = "drop";
                action[1].content = '逃跑';
                action[1].customEventData = "desert";
            break;
            case 2:
                action[0].content = '战斗';
                action[0].customEventData = "fight";
                action[1].content = '给予';
                action[1].customEventData = "sceneAfterGive";
            break;
            default:
                action[0].content = '继续';
                action[0].customEventData = "finish";
                action[1].content = '离开';
                action[1].customEventData = "finish";
        }
        var specialNodeSceneControl = this.specialNodeScene.getComponent('specialNodeSceneControl');
        specialNodeSceneControl.init({
            'name': sceneData.name,
            'content': sceneData.content,
            'action': action,
        });
        cc.log(action);
    },
    
    initFight: function(monsterId) {
        var specialNodeSceneControl = this.specialNodeScene.getComponent('specialNodeSceneControl');
        specialNodeSceneControl.hideScene();
        // cc.log('fight: monsterId: ' + monsterId);
        var fightNode = cc.find('Canvas/map/view/fight');
        var fightControl = fightNode.getComponent('fightControl');
        fightControl.initFight(monsterId, 'level');
        var desertBut = cc.find('operation/support/desert', fightNode).getComponent(cc.Button);
        desertBut.interactable = false;
    },
    
    initDrop: function(dropData) {
        var specialNodeSceneControl = this.specialNodeScene.getComponent('specialNodeSceneControl');
        specialNodeSceneControl.hideScene();
        // cc.log('drop init');
        var dropControl = cc.find('Canvas/map/view/drop').getComponent('dropControl');
        dropControl.initDrop(dropData, 'level');
    },
});
