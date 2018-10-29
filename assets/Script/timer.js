cc.Class({
    extends: cc.Component,

    properties: {
        articleData:0,
        personnelData:0,
        canMakeTag:0,
        addPersonNumberTag : false,
    },

    // use this for initialization
    onLoad: function () {
        this.sendMassage = cc.director.getScene().getChildByName("massageArea").getComponent("massageAreaControl").createAMassage;  
        this.timer();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    loadArticleAndPersonnelData:function(){
        this.articleData = JSON.parse(cc.sys.localStorage.getItem("articleData"));  
        this.personnelData = JSON.parse(cc.sys.localStorage.getItem("personnelData")); 
        this.personnelInfo = JSON.parse(cc.sys.localStorage.getItem("personnelInfo")); 
    },
    
    saveArticleData:function(){
        cc.sys.localStorage.setItem("articleData",JSON.stringify(this.articleData));
        cc.sys.localStorage.setItem("personnelData",JSON.stringify(this.personnelData));
        cc.sys.localStorage.setItem("personnelInfo",JSON.stringify(this.personnelInfo));
    },
    
    timer:function(){
        this.schedule(function(dt){
            this.loadArticleAndPersonnelData();
            this.autoUpdatePersonNumber();
            this.updateConsumeAndMake();
            
            this.saveArticleData();
        },1);
    },
    
    autoUpdatePersonNumber : function(){
        this.addPersonNumberTag = (parseInt(cc.rand() % 7) === 1) ? true : false;
        if(!this.addPersonNumberTag) return;
        
        var totalPersonNumber = 0;
        for(var i = 0;i < this.personnelData.length; ++i){
            totalPersonNumber += this.personnelData[i].number;
        }
        if(totalPersonNumber < this.personnelInfo.maxPersonNumber){
            var addNumber = parseInt(cc.rand() % 3) + 3;
            if((totalPersonNumber + addNumber) >= this.personnelInfo.maxPersonNumber){
                this.personnelData[0].number += (this.personnelInfo.maxPersonNumber - totalPersonNumber);
                this.sendMassage("有" + (this.personnelInfo.maxPersonNumber - totalPersonNumber) + "个无家可归的人投靠了你。");
            }
            else{
                this.personnelData[0].number += addNumber;
                this.sendMassage("有" + addNumber + "个无家可归的人投靠了你。");
            }
        }
    },
    
    updateConsumeAndMake:function(){
        for(var i = 0;i < this.personnelData.length; i++){//遍历工人
            this.canMakeTag = this.canMakeTagSet(this.personnelData[i]);
            if(this.canMakeTag === "max" || this.canMakeTag !== 0 ){
                this.consume(i,this.canMakeTag);
                this.make(i,this.canMakeTag);
                this.canMakeTag = 0;
            }
            else if(this.canMakeTag === 0){
                this.canMakeTag = 0;
            }
        }
    },
    
    //制作物品
    make:function(i,mode){
        var makeData = this.personnelData[i].make;
        for(var j = 0;j < makeData.length; j++){//遍历工人的制作列表
            for(var k = 0;k < this.articleData.length; k++){
                if(this.articleData[k].name === makeData[j].name){//遍历物品数据库，写入数据
                    var tempNumber;
                    if(mode === "max"){
                        tempNumber = makeData[j].number * this.personnelData[i].number;
                    }
                    else{
                        tempNumber = makeData[j].number * mode;
                    }
                    if((tempNumber - Math.floor(tempNumber)) !== 0){
                        makeData[j].tempNumber += tempNumber;
                        //cc.log(makeData[j].name + ":" + makeData[j].tempNumber);
                        if(makeData[j].tempNumber >= 1){
                            this.articleData[k].number += Math.floor(makeData[j].tempNumber);
                            makeData[j].tempNumber -= Math.floor(makeData[j].tempNumber);
                        }
                    }
                    else{
                        this.articleData[k].number += tempNumber;
                        //cc.log(makeData[j].name + ":+" + tempNumber);
                    }
                   break; 
                }
            }
        }
    },
    
    //消耗物品
    consume:function(i,mode){
        var consumeData = this.personnelData[i].consume;
        for(var j = 0;j < consumeData.length; j++){//遍历工人的消耗列表
            for(var k = 0;k < this.articleData.length; k++){
               if((this.articleData[k].name === consumeData[j].name)){//遍历物品数据库，写入数据
                    var tempNumber;
                    if(mode === "max"){
                        tempNumber = consumeData[j].number * this.personnelData[i].number;
                    }
                    else{
                        tempNumber = consumeData[j].number * mode;
                    }
                    if((tempNumber - Math.floor(tempNumber)) !== 0){
                        consumeData[j].tempNumber += tempNumber;
                        //cc.log(consumeData[j].name + ":" + consumeData[j].tempNumber);
                        if(consumeData[j].tempNumber >= 1){
                            this.articleData[k].number -= Math.floor(consumeData[j].tempNumber);
                            consumeData[j].tempNumber -= Math.floor(consumeData[j].tempNumber);
                        }
                    }
                    else{
                       this.articleData[k].number -= tempNumber;
                        //cc.log(consumeData[j].name + ":+" + tempNumber);
                    }
                   break; 
                }
            }
        }
    },
    
    ConsumeAndMakeOnce:function(i){
        var consumeData = this.personnelData[i].consume;
        var makeData = this.personnelData[i].make;
        
    },
    
    canMakeTagSet:function(aPersonData){
        var consumeData = aPersonData.consume;
        
        for(var i = 0;i < consumeData.length; i++){
            for(var j = 0;j < this.articleData.length; j++){
                if(this.articleData[j].name === consumeData[i].name){
                    if(this.articleData[j].number <= consumeData[i].number * aPersonData.number){
                        if(this.articleData[j].number >= consumeData[i].number){
                            for(var mode = aPersonData.number;; mode--){
                                if(this.articleData[j].number >= consumeData[i].number * mode){
                                    return mode;
                                }
                            }
                        }
                        else{
                            return 0;
                        }
                    }
                    break;
                }
            }
        }
        // cc.log("canMakeTag set to true");
        return "max";
    },
});
