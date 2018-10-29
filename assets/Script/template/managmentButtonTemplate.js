cc.Class({
    extends: cc.Component,

    properties: {
        itemName:cc.Label,
        itemNumber:cc.Label,
        itemState:cc.Label,
    },

    // use this for initialization
    onLoad: function () {

    },

    init:function(data){
        this.itemName = data.itemName;
        this.itemNumber = data.itemNumber;
        //this.itemWeight = "该物品重量为:" + data.itemWeight.toString();
    },
});