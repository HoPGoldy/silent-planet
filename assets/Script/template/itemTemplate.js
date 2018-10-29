cc.Class({
    extends: cc.Component,

    properties: {
        id:0,
        itemName:cc.Label,
        itemNumber:cc.Label,
    },

    // use this for initialization
    onLoad: function () {
        
    },
    
    init:function(data,type){
        this.itemName.string = data.name;
        this.id = data.id;
        //cc.log(this.id + " " + data.name);
        if(type === "buildInfo"){
            if(data.isMax){
                this.itemNumber.string = data.number.toString() + "(max)";
            }
            else{
                this.itemNumber.string = data.number.toString();
            }
            this.buildInfoUpdateSelf();
        }
        if(type === "article"){
            this.itemNumber.string = data.number.toString();
            this.articleUpdateSelf();
        }
    },
    
    articleUpdateSelf:function(){
        this.schedule(function(dt){
            var articleData = cc.find("Canvas/ControlCenter").getComponent("controlCenterControl").articleData;
            //cc.log(articleData);
            this.itemNumber.string = articleData[this.id].number.toString();
        },0.1);
    },
    
    buildInfoUpdateSelf:function(){
        this.schedule(function(dt){
            var buildData = JSON.parse(cc.sys.localStorage.getItem("buildData"));
            //cc.log(this.id);
            var isMax = (buildData[this.id].number === buildData[this.id].maxNumber) ? true : false;
            var onlyBuildOnce = (buildData[this.id].maxNumber === 1) ? true : false;
            //cc.log(buildData[this.id].name + "is max: " + isMax);
            if(isMax){
                this.itemNumber.string = "√";
            }
            else if(onlyBuildOnce){
                this.itemNumber.string = "×";
            }
            else{
                this.itemNumber.string = buildData[this.id].number.toString();
            }
        },0.1);
    },
});
