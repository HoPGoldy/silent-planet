cc.Class({
    extends: cc.Component,

    properties: {
        id:0,
        data:0,
        type:0,
        itemName:cc.Label,
        resourcesUsed:cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        this.sendMassage = cc.director.getScene().getChildByName("massageArea").getComponent("massageAreaControl").createAMassage;
    },

    init:function(data,type){
        this.type = type;
        //cc.log(this.type);
        this.data = data;
        this.node.name = data.name;
        this.id = data.id;
        this.itemName.string = data.name;
        if(type === "buy"){
            this.resourcesUsed.getComponent("resourcesUsedCreate").init([{"name":"金子","number":data.cost}],"article");
        }
        else{
            this.resourcesUsed.getComponent("resourcesUsedCreate").init(data.resourcesUsed,"article");
        }
        this.loadData();
        this.dataCheck();
        this.updateSelf();
    },
    
    manufactureAItem:function(){
        var articleData = JSON.parse(cc.sys.localStorage.getItem("articleData"));
        var resourcesUsed = articleData[this.id].resourcesUsed;
        //cc.log(articleData[this.id].name + "need:");
        //cc.log(resourcesUsed);
        
        articleData[this.id].number += 1;
        for(var i = 0;i < resourcesUsed.length; i++){
            for(var j = 0;j < articleData.length; j++){
                if(resourcesUsed[i].name === articleData[j].name){
                    articleData[j].number -= resourcesUsed[i].number;
                }
            }
        }
        
        cc.sys.localStorage.setItem("articleData",JSON.stringify(articleData));
        this.sendMassage(this.data.name);
    },

    buyAItem:function(){
        var articleData = JSON.parse(cc.sys.localStorage.getItem("articleData"));
        var cost = articleData[this.id].cost;
        //cc.log(articleData[this.id].name + "need:");
        //cc.log(resourcesUsed);
        
        articleData[this.id].number += 1;
        for(var i = 0;i < articleData.length; i++){
            if(articleData[i].name === "金子"){
                articleData[i].number -= cost;
            }
        }
        
        cc.sys.localStorage.setItem("articleData",JSON.stringify(articleData));
        this.sendMassage("你购买了1个" + this.data.name);
    },
    
    updateSelf:function(){
        //cc.log(this.type);
        this.loadData();
        this.schedule(this.dataCheck,1);
    },
    
    dataCheck : function(dt){
        if(this.type === "manufacture"){
            var resourcesUsedData = this.data.resourcesUsed;
            var manufactureButton = this.node.getComponent(cc.Button);
            //cc.log(this.data.name + " on manufacture");
            //cc.log(resourcesUsedData.length);
            for(var j = 0;j < resourcesUsedData.length; j++){
                var resourcesId = resourcesUsedData[j].id;
                //cc.log(resourcesUsedData[j]);
                this.inventoryNumber = this.articleData[resourcesId].number;
                
                //cc.log(resourcesUsedData[j].name + "number:" + resourcesUsedData[j].number + " have:" + this.inventoryNumber);
                if(resourcesUsedData[j].number > this.inventoryNumber){
                    //cc.log(buildButton.name + "set to:false");
                    manufactureButton.interactable = false;
                    break;
                }
                else{
                    //cc.log(buildButton.name + "set to:true");
                    manufactureButton.interactable = true;
                }
            }
        }
        else if(this.type === "buy"){
            var cost = this.data.cost;
            var buyButton = this.node.getComponent(cc.Button);
            
            //获取库存里此物品的数量
            this.inventoryNumber = this.articleData[7].number;
            
            //cc.log(resourcesUsedData[i].name + "number:" + resourcesUsedData[i].number + " have:" + this.inventoryNumber);
            if(cost > this.inventoryNumber){
                //cc.log(buildButton.name + "set to:false");
                buyButton.interactable = false;
            }
            else{
                //cc.log(buildButton.name + "set to:true");
                buyButton.interactable = true;
            }
        }
    },
    
    loadData:function(){
		this.articleData = cc.find("Canvas/ControlCenter").getComponent("controlCenterControl").articleData;
	},
});