cc.Class({
    extends: cc.Component,

    properties: {
        data:0,
        id:0,
        itemName:cc.Label,
        resourcesUsed:cc.Node,
        
    },

    // use this for initialization
    onLoad: function () {
        this.sendMassage = cc.director.getScene().getChildByName("massageArea").getComponent("massageAreaControl").createAMassage;//绑定信息发送方法
        this.dataCheck();//第一次数据检查更新自身状态
        this.updateSelf();//之后每隔一秒更新一次
    },

    init:function(data){
        this.data = data;//本地数据保存
        this.node.name = data.name;//节点名称修改
        this.id = data.id;
        this.itemName.string = data.name;
        this.resourcesUsed.getComponent("resourcesUsedCreate").init(data.resourcesUsed,"article");
    },
    
    addANumber:function(){
        var buildData = JSON.parse(cc.sys.localStorage.getItem("buildData"));
        var articleData = JSON.parse(cc.sys.localStorage.getItem("articleData"));
        var resourcesUsed = buildData[this.id].resourcesUsed;
        //cc.log(buildData[this.id].name + "need:");
        //cc.log(resourcesUsed);
        if(buildData[this.id].number === (buildData[this.id].maxNumber - 1)){
            buildData[this.id].number += 1;
            buildData[this.id].state = false;
            this.data.state = false;
            //this.node.active = false;
            this.node.getComponent(cc.Button).interactable = false;
            //cc.log(buildData[this.id].name + "state:" + buildData[this.id].state);
            if(buildData[this.id].unlockItem !== 0){
                this.unlockPerson(buildData[this.id].unlockItem);
            }
        }
        else if(buildData[this.id].number < buildData[this.id].maxNumber){
            buildData[this.id].number += 1;
            if(buildData[this.id].name === "小屋"){
                var personnelInfo = JSON.parse(cc.sys.localStorage.getItem("personnelInfo"));
                personnelInfo.maxPersonNumber += 10;
                //cc.log(personnelInfo.maxPersonNumber);
                cc.sys.localStorage.setItem("personnelInfo",JSON.stringify(personnelInfo));
            }
        }
        //建造四间小屋后延迟五秒发送信息
        if (this.id === 0 && buildData[this.id].number === 4){
            this.scheduleOnce(function(dt){
                this.sendMassage("4次小屋5s后");
            },5);
        }
        //消耗物品
        for(var i = 0;i < resourcesUsed.length; i++){
            articleData[resourcesUsed[i].id].number -= resourcesUsed[i].number;
        }
        this.data = buildData[this.id];//重置本地数据
        
        cc.sys.localStorage.setItem("buildData",JSON.stringify(buildData));
        cc.sys.localStorage.setItem("articleData",JSON.stringify(articleData));
		
        this.sendMassage(this.data.name);
    },
    //建造建筑物解锁新的工人
    unlockPerson:function(personnelName){
        var personnelData = JSON.parse(cc.sys.localStorage.getItem("personnelData"));
        
        for(var i = 0;i < personnelData.length; i++){
            if(personnelData[i].name === personnelName){
                personnelData[i].state = true;
            }
        }
        
        cc.sys.localStorage.setItem("personnelData",JSON.stringify(personnelData));
    },
    
    updateSelf:function(){
        this.schedule(this.dataCheck,1);
    },
    
    dataCheck : function(dt){
        var resourcesUsedData = this.data.resourcesUsed;
        this.articleData = cc.find("Canvas/ControlCenter").getComponent("controlCenterControl").articleData;
        
        if(this.data.state){
            var selfButton = this.node.getComponent(cc.Button);
            
            for(var j = 0;j < resourcesUsedData.length; j++){
                //获取库存里此物品的数量
                var resourcesId = this.articleData[j].id;
                        
                this.inventoryNumber = this.articleData[resourcesId].number;
                //cc.log(resourcesUsedData[j].name + "number:" + resourcesUsedData[j].number + " have:" + this.inventoryNumber);
                if(resourcesUsedData[j].number > this.inventoryNumber){
                    //cc.log(selfButton.name + "set to:false");
                    selfButton.interactable = false;
                    break;
                }
                else{
                    //cc.log(selfButton.name + "set to:true");
                    selfButton.interactable = true;
                }
            }
        }
    },
});
