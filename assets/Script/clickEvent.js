cc.Class({
    extends: cc.Component,

    properties: {
        controlCenterNode : cc.Node,
        baseNode : cc.Node,
        progressBar:cc.ProgressBar,
        
        updateSpeed : 0,
    },

    // use this for initialization
    onLoad: function () {
        this.sendMassage = cc.director.getScene().getChildByName("massageArea").getComponent("massageAreaControl").createAMassage;
        
        
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        
    },
    
    collectStone:function(){
        this.articleDataOperation("石头", "add", 100);
        this.sendMassage("收集石头");
    },
    
    collectGarbage:function(){
        this.articleDataOperation("垃圾", "add", 100);
        this.sendMassage("收集垃圾");
    },
    
    underfeed:function(){
        this.articleDataOperation("石头", "reduce", 1);
        this.sendMassage("添加能源");
    },
    
    articleDataOperation : function(itemName,operator,itemNumber){
        var articleData = JSON.parse(cc.sys.localStorage.getItem("articleData"));
        
        for(var i = 0;i < articleData.length; i++){
            if(articleData[i].name === itemName){
                if(operator === "add"){
                    articleData[i].number += itemNumber;
                    cc.log(articleData[i].name + "+" + itemNumber);
                }
                if(operator === "reduce"){
                    articleData[i].number -= itemNumber;
                    cc.log(articleData[i].name + "-" + itemNumber);
                }
                cc.sys.localStorage.setItem("articleData",JSON.stringify(articleData));
                return;
            }
        }
    },

    chillDown : function(){
        this.schedule(this.updateProgress , 0.05);
    },
    
    updateProgress : function(dt){
        var progress = this.progressBar.progress;
        var thisButton = this.node.getComponent(cc.Button);
        
        thisButton.interactable = false;
        
        if (progress < 1) {
            progress += (dt * this.updateSpeed);
            //this.sendMassage("progress : " + progress.toString());
            //this.sendMassage("thisButton.interactable : " + thisButton.interactable.toString());
        }
        else if(progress >= 1){
            progress = 0;
            //this.sendMassage("progress = 0");
            thisButton.interactable = true;
            //this.sendMassage("thisButton.interactable : " + thisButton.interactable.toString());
            this.unschedule(this.updateProgress);
        }
        this.progressBar.progress = progress;
    },
    
    saveChillDown : function(){
        var chillDownData = JSON.parse(cc.sys.localStorage.getItem("chillDownData"));
        for(var i = 0;i < chillDownData.length; i++){
            if(chillDownData[i].name === this.node.name){
                var date = new Date();
                chillDownData[i].date = date.getTime();
                //cc.log("save date:" + chillDownData[i].date);
                chillDownData[i].progress = this.progressBar.progress;
                //cc.log("save progress:" + chillDownData[i].progress);
            }
        }
        cc.sys.localStorage.setItem("chillDownData",JSON.stringify(chillDownData));
    },
    
    resetChillDown : function(){
        var chillDownData = JSON.parse(cc.sys.localStorage.getItem("chillDownData"));
        for(var i = 0;i < chillDownData.length; i++){
            if(chillDownData[i].name === this.node.name){
                if(chillDownData[i].progress !== 0){
                    var nowDate = new Date();
                    nowDate = nowDate.getTime();
                    var progressTemp = chillDownData[i].progress + (((nowDate - chillDownData[i].date) * 0.001) * this.updateSpeed);
                    //cc.log("chillDownData[i].progress:" + chillDownData[i].progress);
                    cc.log("addProgress:" + (((nowDate - chillDownData[i].date) * 0.001) * 0.08));
                    //cc.log("progressTemp:" + progressTemp);
                    if(progressTemp >= 100){
                        this.progressBar.progress = 0;
                    }
                    else{
                        this.progressBar.progress = progressTemp;
                    }
                    chillDownData[i].progress = 0;
                    chillDownData[i].date = 0;
                    this.unschedule(this.updateProgress);
                    this.chillDown();
                }
            }
        }
        cc.sys.localStorage.setItem("chillDownData",JSON.stringify(chillDownData));
    },
    
    hideList : function(){
        var hideButtonNode = this.node.getChildByName("hideList");
        var showButtonNode = this.node.getChildByName("showList");
        var mask = this.node.parent.getComponent(cc.Mask);
        var childNodeArray = [];
        childNodeArray = this.node.parent.getChildren();
        
        mask.inverted = true;
        for(var i = 0;i < childNodeArray.length; ++i){
            if(childNodeArray[i].name !== "areaName"){
                childNodeArray[i].active = false;
            }
        }
        this.scheduleOnce(function(){
            mask.inverted = false;
        },0.03);
        
        hideButtonNode.active = false;
        showButtonNode.active = true;
    },
    
    showList : function(){
        var hideButtonNode = this.node.getChildByName("hideList");
        var showButtonNode = this.node.getChildByName("showList");
        var mask = this.node.parent.getComponent(cc.Mask);
        var childNodeArray = [];
        childNodeArray = this.node.parent.getChildren();
        
        mask.inverted = true;
        for(var i = 0;i < childNodeArray.length; ++i){
            if(childNodeArray[i].name !== "areaName"){
                childNodeArray[i].active = true;
            }
        }
        this.scheduleOnce(function(){
            mask.inverted = false;
        },0.03);
        
        hideButtonNode.active = true;
        showButtonNode.active = false;
    },
    
   goToAdventure : function(){
       cc.director.loadScene("adventure");
   }, 
   
});
