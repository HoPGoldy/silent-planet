cc.Class({
    extends: cc.Component,

    properties: {
        itemName:cc.EditBox,
        itemNumber:cc.EditBox,
        
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    getArticle:function(){
        var articleData = JSON.parse(cc.sys.localStorage.getItem("articleData"));
        for(var i = 0;i < articleData.length; i++){
            if(this.itemName.string === articleData[i].name){
                articleData[i].number += parseInt(this.itemNumber.string);
                cc.log(this.itemName.string + "+" + this.itemNumber.string);
            }
        }
        cc.sys.localStorage.setItem("articleData",JSON.stringify(articleData));
    },
    getPerson:function(){
        var personnelData = JSON.parse(cc.sys.localStorage.getItem("personnelData"));
        for(var i = 0;i < personnelData.length; i++){
            if(personnelData[i].name === "石矿工"){
                personnelData[i].number += 5;
                cc.log(personnelData[i].name + "+ 5");
            }
        }
        cc.sys.localStorage.setItem("personnelData",JSON.stringify(personnelData));
    },
    
    fpsSwitch:function(){
        if(cc.director.isDisplayStats()){
            cc.director.setDisplayStats(false);
        }
        else{
             cc.director.setDisplayStats(true);
        }
    },
});
