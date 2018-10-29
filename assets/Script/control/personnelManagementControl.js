cc.Class({
    extends: cc.Component,

    properties: {
        managementList:cc.Node,
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.personnelInfo();
        this.personnelResourcesUsedInfo();
    },
    //人数更新
    personnelInfo:function(){
        var personnelData = JSON.parse(cc.sys.localStorage.getItem("personnelData"));
        for(var i = 0;i < personnelData.length; i++){
            if(personnelData[i].state){//若该人员已解锁
                var personNumber = this.managementList.getChildByName(personnelData[i].name).getChildByName("number").getComponent(cc.Label);
                personNumber.string = personnelData[i].number.toString();//更新该人员人数
            }
        }
    },
    //资源消耗更新
    personnelResourcesUsedInfo:function(){
        this.personnelMakeInfo();
        this.personnelConsumeInfo();
    },
    //制造更新
    personnelMakeInfo:function(){
        var personnelData = JSON.parse(cc.sys.localStorage.getItem("personnelData"));
        for(var i = 0;i < personnelData.length; i++){//遍历人员
            if(personnelData[i].state){
                var personnelMakeData = personnelData[i].make;
                for(var j = 0;j < personnelMakeData.length; j++){//遍历人员的制造列表
                    var personnelMakeLabel = this.managementList.getChildByName(personnelData[i].name).getChildByName("make").getChildByName(personnelMakeData[j].name).getChildByName("resourcesInfo").getComponent(cc.Label);
                    //cc.log(personnelData[i].name + "." + personnelMakeData[j].name + ":" + personnelMakeLabel.string);
                    if(((personnelData[i].number * personnelMakeData[j].number) - Math.floor((personnelData[i].number * personnelMakeData[j].number))) !== 0){
                        personnelMakeLabel.string = personnelMakeData[j].name + ":" + ((personnelData[i].number * personnelMakeData[j].number).toFixed(1)).toString() + "/s";
                    }
                    else{
                        personnelMakeLabel.string = personnelMakeData[j].name + ":" + (personnelData[i].number * personnelMakeData[j].number).toString() + "/s";
                    }
                }
            }
        }
    },
    //消耗更新
    personnelConsumeInfo:function(){
        var personnelData = JSON.parse(cc.sys.localStorage.getItem("personnelData"));
        for(var i = 0;i < personnelData.length; i++){//遍历人员
            if(personnelData[i].state){
                var personnelConsumeData = personnelData[i].consume;
                for(var j = 0;j < personnelConsumeData.length; j++){//遍历消耗列表
                    var personnelConsumeLabel = this.managementList.getChildByName(personnelData[i].name).getChildByName("consume").getChildByName(personnelConsumeData[j].name).getChildByName("resourcesInfo").getComponent(cc.Label);
                    if(((personnelData[i].number * personnelConsumeData[j].number) - Math.floor((personnelData[i].number * personnelConsumeData[j].number))) !== 0){
                        personnelConsumeLabel.string = personnelConsumeData[j].name + ":" + ((personnelData[i].number * personnelConsumeData[j].number).toFixed(1)).toString() + "/s";
                    }
                    else{
                        personnelConsumeLabel.string = personnelConsumeData[j].name + ":" + (personnelData[i].number * personnelConsumeData[j].number).toString() + "/s";
                    }
                }
            }
        }
    },
});
