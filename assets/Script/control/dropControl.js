cc.Class({
    extends: cc.Component,

    properties: {
        controlNode: cc.Node,
        itemPerfab: cc.Prefab,
        butPerfab: cc.Prefab,
        
        _exitType: 'undefined',
    },

    // use this for initialization
    onLoad: function () {
        
    },
    
    onDisable: function() {
		var dropList = cc.find('pageView/view/content/drop/dropList', this.node);
		var backpackList = cc.find('pageView/view/content/backpack/backpackList', this.node);
		var healingArea = cc.find('operation/healingArea', this.node);
        dropList.removeAllChildren();
        backpackList.removeAllChildren();
        healingArea.removeAllChildren();
    },
    
    initDrop: function(dropData, exitType) {
        this._exitType = exitType;
        this.controlNode.getComponent('heroMoveControl').moveLock = true;
        var dropAnim = this.node.getComponent(cc.Animation);
        dropAnim.play('drop-anim-show');
        this.node.active = true;
        this.initHealingBut();
        this.initDropList(dropData);
        this.initBackpackList();
    },
    
    initHealingBut: function() {
        //根据背包中治疗物数量初始化治疗按钮
		var backPackData = JSON.parse(cc.sys.localStorage.getItem("backPackData"));
		for(var i = 0; i < backPackData.length; ++i) {
		    if(backPackData[i].canUseToHealing && backPackData[i].number > 0) {//可以被用于治疗且数量不为零
		        var itemData = backPackData[i];
		        var healingBut = cc.instantiate(this.butPerfab);
                healingBut.name = 'healing';
                //初始化按钮上的文字显示
                var butLabel = healingBut.getChildByName('Label').getComponent(cc.Label);
                if(itemData.articleId === 0) {
                    butLabel.string = '吃' + itemData.name;
                }
                else {
                    butLabel.string = '使用' + itemData.name;
                }
		        //初始化点击事件
                var clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = this.node;
                clickEventHandler.component = 'dropControl';
                clickEventHandler.handler = 'healing';
                clickEventHandler.customEventData = itemData;
                healingBut.getComponent(cc.Button).clickEvents.push(clickEventHandler);
                //部署按钮
                this.node.getChildByName('operation').getChildByName('healingArea').addChild(healingBut);
		    }
		}
    },
    
    healing: function(event, itemData) {
        var backPackData = JSON.parse(cc.sys.localStorage.getItem("backPackData"));
        backPackData[itemData.id].number --;
        var adventureControl = cc.find('Canvas/control').getComponent('adventureControl');
        if((adventureControl.heroHp + itemData.healingValue) > adventureControl.heroMaxHp) {
            adventureControl.heroHp = adventureControl.heroMaxHp;
        }
        else {
            adventureControl.heroHp += itemData.healingValue;
        }
        event.currentTarget.getComponent(cc.Button).interactable = false;
        cc.sys.localStorage.setItem("backPackData",JSON.stringify(backPackData));
    },
    
    exitDrop: function() {
        var dropAnim = this.node.getComponent(cc.Animation);
        switch(this._exitType) {
            case 'map':
                dropAnim.play('drop-anim-hide');
            break;
            case 'level':
                dropAnim.play('drop-anim-levelCallback');
            break;
            default:
                dropAnim.play('drop-anim-hide');
            break;
        }
        //this.exitNode();
    },
    
    levelCallback: function() {
        cc.log('exitNode');
        this.node.active = false;
        this.controlNode.getComponent('heroMoveControl').moveLock = false;
         this.controlNode.getComponent('specialNodeControl').initLevel(0, 'finish');
    },
    
    exitNode: function() {
        cc.log('exitNode');
        this.node.active = false;
        this.controlNode.getComponent('heroMoveControl').moveLock = false;
    },
    
    initDropList: function(dropData) {
        for(var i = 0; i < dropData.length; ++i) {
            var dropFlag = Math.random().toFixed(2) < dropData[i].odds ? true: false;
            if(dropFlag) {
                //生成指定范围内的随机数
                //min + Math.round(Math.random() * (max - min))
                var randNumber = 1 + Math.round(Math.random() * (dropData[i].number - 1));
                this.initItem(dropData[i].id, randNumber, 'drop');
            }
        }
    },
    
    initBackpackList: function() {
        var backPackData = JSON.parse(cc.sys.localStorage.getItem("backPackData"));
        for(var i = 0; i < backPackData.length; ++i) {
            var backpackItem = backPackData[i];
            if(backpackItem.number > 0) {
                this.initItem(backpackItem.id, backpackItem.number, 'backpack');
            }
        }
    },
    
    pickup: function(event, itemId) {
        this.dropOperation(itemId, 'reduce');
        this.backpackOperation(itemId, 'add');
        // cc.log('pickup invoke');
        var adventureControl = cc.find('Canvas/control').getComponent('adventureControl');
        adventureControl.changeBackpackItem(itemId, 1);
    },
    
    junk: function(event, itemId) {
        this.dropOperation(itemId, 'add');
        this.backpackOperation(itemId, 'reduce');
        // cc.log('junk invoke');
        var adventureControl = cc.find('Canvas/control').getComponent('adventureControl');
        adventureControl.changeBackpackItem(itemId, -1);
    },
    
    dropOperation: function(itemId, mode) {
        var listNode = cc.find('pageView/view/content/drop/dropList', this.node);
        var listChilds = listNode.getChildren();
        if(mode === 'add') {
            var findTag = false;
            for(var i = 0; i < listChilds.length; ++i) {
                if(listChilds[i].tag === itemId) {
                    // cc.log('item find! id:' + itemId);
                    listChilds[i].getComponent('dropItemTem').itemNumber ++;
                    findTag = true;
                }
            }
            if(!findTag) {
                // cc.log('add a new item in dropList');
                this.initItem(itemId, 1, 'drop');
            }
        }
        else if(mode === 'reduce') {
            for(var j = 0; j < listChilds.length; ++j) {
                if(listChilds[j].tag === itemId) {
                    listChilds[j].getComponent('dropItemTem').itemNumber --;
                }
            }
        }
        else {
            cc.warn('dropOperation mode type error');
        }
    },

    backpackOperation: function(itemId, mode) {
        var listNode = cc.find('pageView/view/content/backpack/backpackList', this.node);
        var backPackData = JSON.parse(cc.sys.localStorage.getItem("backPackData"));
        var listChilds = listNode.getChildren();
        if(mode === 'add') {
            var findTag = false;
            for(var i = 0; i < listChilds.length; ++i) {
                if(listChilds[i].tag === itemId) {
                    // cc.log(backPackData[listChilds[i].tag].name + '\'number will +1');
                    listChilds[i].getComponent('dropItemTem').itemNumber ++;
                    findTag = true;
                }
            }
            if(!findTag) {
                // cc.log('add a new item in backpackList');
                this.initItem(itemId, 1, 'backpack');
            }
        }
        else if(mode === 'reduce') {
            for(var j = 0; j < listChilds.length; ++j) {
                if(listChilds[j].tag === itemId) {
                    listChilds[j].getComponent('dropItemTem').itemNumber --;
                }
            }
        }
        else {
            cc.warn('backpackOperation mode type error');
        }
    },
    
    initItem: function(itemId, itemNumber, listName) {
        var item = cc.instantiate(this.itemPerfab);
        var listNode;
        var backpackData = JSON.parse(cc.sys.localStorage.getItem("backPackData"));
        var itemData = {
            'id': itemId,
            'weight': backpackData[itemId].weight,
            'name': backpackData[itemId].name,
            'number': itemNumber,
            'type': 'undefined',
        };
        if(listName === 'drop') {
            listNode = cc.find('pageView/view/content/drop/dropList', this.node);
            itemData.type = 'drop';
        }
        else if(listName === 'backpack') {
            listNode = cc.find('pageView/view/content/backpack/backpackList', this.node);
            itemData.type = 'backpack';
        }
        item.getComponent('dropItemTem').init(itemData);
        listNode.addChild(item);
    },
});
