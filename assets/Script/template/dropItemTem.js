cc.Class({
    extends: cc.Component,

    properties: {
        _itemId: 0,
        _itemWeight: 0,
        _itemName: 0,
        _itemNumber: 0,
        _itemType: 'undefined',
        
        itemNumber: {
            get: function() {
                return this._itemNumber;
            },
            set: function(vaule) {
                if(vaule > this._itemNumber) {
                    this._itemNumber ++;
                    this.itemLab.string = this._itemName + ':' + this._itemNumber.toString();
                }
                else if(vaule < this._itemNumber) {
                    if(this._itemNumber > 1) {
                        this._itemNumber --;
                        this.itemLab.string = this._itemName + ':' + this._itemNumber.toString();
                    }
                    else {
                        this.node.active = false;
                        this.node.removeFromParent();
                    }
                }
            }
        },
        itemLab: cc.Label,
    },

    // use this for initialization
    onLoad: function () {

    },
    
    init: function(itemData) {
        this._itemId = itemData.id;
        this._itemWeight = itemData.weight;
        this._itemName = itemData.name;
        this._itemNumber = itemData.number;
        this._itemType = itemData.type;
        
        this.node.name = this._itemName;
        this.node.tag = this._itemId;
        this.itemLab.string = this._itemName + ':' + this._itemNumber.toString();
        this.initEvent();
    },
    
    changeNumber: function(ChangedNumber) {
        
    },
    
    initEvent: function() {
        var clickEventHandler = this.node.getComponent(cc.Button).clickEvents[0];
        clickEventHandler.target = cc.find('Canvas/map/view/drop');
        clickEventHandler.component = 'dropControl';
        if(this._itemType === 'drop') {
            clickEventHandler.handler = 'pickup';
        }
        else if(this._itemType === 'backpack') {
            clickEventHandler.handler = 'junk';
        }
        clickEventHandler.customEventData = this._itemId;
        
        var adventureControl = cc.find('Canvas/control').getComponent('adventureControl');
        if(this._itemType === 'drop') {
            this.schedule(function(dt) {
                if(adventureControl.remainingSpace < this._weight) {
                    this.node.getComponent(cc.Button).interactable = false;
                }
                else {
                    this.node.getComponent(cc.Button).interactable = true;
                }
            }, 0.1);
        }
    },
});
