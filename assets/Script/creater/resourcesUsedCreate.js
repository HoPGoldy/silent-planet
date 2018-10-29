cc.Class({
    extends: cc.Component,

    properties: {
        resourcesUsed:cc.Prefab,
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    init:function(data,mode){
        this.resourcesData = data;
        this.mode = mode;
        //cc.log(this.resourcesData);
        if(this.resourcesData !== 0){
            this.creatResourcesUsedList();
            //cc.log("create " + this.resourcesData.name);
        }
        else{
            this.node.active = false;
            this.node.parent.height = 140;
            //cc.log(this.node.name + "set to false");
        }
    },
    
    creatResourcesUsedList:function(){
        for(var i = 0;i < this.resourcesData.length; i++){
            var item = cc.instantiate(this.resourcesUsed);
            var data = this.resourcesData[i];
            this.node.addChild(item);
            item.getComponent("resourcesUsedSonNodeTemplate").init({
                itemName:data.name,
                itemNumber:data.number
            },this.mode)
        }
    },
});
