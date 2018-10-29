cc.Class({
    extends: cc.Component,

    properties: {
        itemName: cc.Label,
        itemNumber: cc.Label
    },

    // use this for initialization
    onLoad: function () {
        
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    init : function(data){
        this.itemName.string = data.itemName;
        this.itemNumber.string = data.itemNumber.toString();
        this.node.name = data.itemName;
        this.node.tag = data.itemId;
        this.number = data.itemNumber;
        this.dataUpdate();
    },
    
    dataUpdate: function() {
        this.schedule(function(dt){
            if(this.node.tag >= 0) {
                var adventureControl = cc.find('Canvas/control').getComponent('adventureControl');
                var itemData = adventureControl.backPackData[this.node.tag];
                
                if(itemData.number > this.number) {
                    adventureControl.changeBackPackSpace(itemData.weight, '-');
                }
                else if(itemData.number < this.number) {
                    adventureControl.changeBackPackSpace(itemData.weight, '+');
                }
                if(itemData.number > 0) {
                    this.itemNumber.string = itemData.number.toString();
                }
                else {
                    this.node.active = false;
                    cc.removeSelf();
                }
                this.number = itemData.number;
            }
        }, 0.2);
    },
});
