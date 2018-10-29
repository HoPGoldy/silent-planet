cc.Class({
    extends: cc.Component,

    properties: {
        resourcesInfo:cc.Label,
    },

    // use this for initialization
    onLoad: function () {

    },
    
    init:function(data,mode){
        //cc.log(data.itemName);
        //cc.log(data.itemNumber);
        if(mode === "article"){
            this.node.name = data.itemName;
            this.resourcesInfo.string = data.itemName + ":" + data.itemNumber;
        }
        if(mode !== "article"){
            this.node.name = data.itemName;
            //cc.log(this.node.name);
            this.resourcesInfo.string = data.itemName + ":" + data.itemNumber * mode + "/s";
        }
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
