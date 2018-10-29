cc.Class({
    extends: cc.Component,

    properties: {
        viewNameLabel: cc.Label,
        HPShowLabel: cc.Label,
        remainingSpaceLabel: cc.Label,
        adventureItemPrefab: cc.Prefab,
        backpackItemList: cc.Node,
        
        heroMaxHp:0,
        remainingSpace: 0,
        _water: 0,
        water: {
            get: function() {
                return this._water;
            },
            set: function(value) {
                var backpackItemArray = this.backpackItemList.getChildren();
                var waterNode = backpackItemArray[0];
                if(waterNode.tag !== -1) {
                    for(var i = 0; i < backpackItemArray.length; ++i) {
                        if(backpackItemArray[i].tag === -1) {
                            waterNode = backpackItemArray[i];
                        }
                    }
                }
                if(value === 'max') {
                    this._water = this.backPackInfo.maxWater;
                }
                else {
                    this._water = value;
                }
                var numberLab = waterNode.getChildByName('number').getComponent(cc.Label);
                numberLab.string = this._water.toString();
            }
        },
        _heroHp: 0,
        heroHp: {
            get: function() {
                return this._heroHp;
            },
            set: function(value) {
                if(value != this._heroHp) {
                    this._heroHp = value;
                    var backPackInfo = JSON.parse(cc.sys.localStorage.getItem("backPackInfo"));
                    this.HPShowLabel.string = 'HP:' + value.toString() + '/' + backPackInfo.maxHP.toString();
                }
            }
        },
    },

    // use this for initialization
    onLoad: function () {
        this.infoUpdate();
        this._water = JSON.parse(cc.sys.localStorage.getItem("backPackInfo")).maxWater;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
	//adventure模块的数据更新
    infoUpdate : function(){
        this.schedule(function(dt){
            this.backPackInfo = JSON.parse(cc.sys.localStorage.getItem("backPackInfo"));
            this.backPackData = JSON.parse(cc.sys.localStorage.getItem("backPackData"));
        },0.1);
    },
    
    changeBackPackSpace: function(changeSpace, mode) {
        cc.log('spaceChange');
        if(mode === '+') {
            //cc.log('剩余空间+' + changeSpace);
            this.remainingSpace += changeSpace;
        }
        else if(mode === '-') {
            //cc.log('剩余空间-' + changeSpace);
            this.remainingSpace -= changeSpace;
        }
        this.remainingSpaceLabel.string = '剩余空间：' + this.remainingSpace.toString() + "/" + this.backPackInfo.maxWeight.toString();
    },
    
    changeBackpackItem: function(itemId, changeNumber) {
        var backpackData = this.backPackData;
        var itemListNode = cc.find('Canvas/info/itemList');
        if(itemId === -1) {
            
        }
        for(var i = 0; i < backpackData.length; ++i) {
            if(backpackData[i].id === itemId) {
                if(backpackData[i].number === 0) {
                    //cc.log('backpackData[i].number:' + backpackData[i].number);
                    backpackData[i].number += changeNumber;
                    //cc.log('after change backpackData[i].number:' + backpackData[i].number);
                    //cc.log('add a new item');
                    this.changeBackPackSpace(backpackData[i].weight, '-');
                    var adventureCreate = this.node.getComponent('adventureCreate');
                    adventureCreate.initItem(backpackData[i]);
                }
                else if(changeNumber > 0) {
                    backpackData[i].number += changeNumber;
                    //cc.log('changeNumber > 0');
                }
                else if(changeNumber < 0 && changeNumber <= backpackData[i].number) {
                    backpackData[i].number += changeNumber;
                    //cc.log('changeNumber < 0');
                }
                else if(changeNumber < 0 && changeNumber > backpackData[i].number) {
                    backpackData[i].number = 0;
                    //cc.log('changeNumber < 0');
                }
                else {
                    cc.log('changeNumber value error');
                }
                break;
            }
        }
        cc.sys.localStorage.setItem("backPackData",JSON.stringify(backpackData));
    },
    
    changeInfoView: function(event, eventType) {
        var viewName = ['背包:','图例:'];
        this.viewNameLabel.string = viewName[event.getCurrentPageIndex()];
    },
});
