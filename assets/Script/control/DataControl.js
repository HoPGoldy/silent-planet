cc.Class({
    extends: cc.Component,

    properties: {
        buildData: [],
        articleData: [],
        // backPackData: [],
        // personnelData: [],
        // backPackInfo: [],
        // personnelInfo: [],
        // chillDownData: [],
    },

    // use this for initialization
    onLoad: function () {
        this.buildData = JSON.parse(cc.sys.localStorage.getItem("buildData"));
		this.articleData = JSON.parse(cc.sys.localStorage.getItem("articleData"));
// 		this.personnelData = JSON.parse(cc.sys.localStorage.getItem("personnelData"));
// 		this.backPackInfo = JSON.parse(cc.sys.localStorage.getItem("backPackInfo"));
// 		this.personnelInfo = JSON.parse(cc.sys.localStorage.getItem("personnelInfo"));
// 		this.chillDownData = JSON.parse(cc.sys.localStorage.getItem("chillDownData"));
    },

    infoUpdate : function(){
        this.schedule(function(dt){
            cc.sys.localStorage.setItem("buildData",JSON.stringify(this.buildData));
    		cc.sys.localStorage.setItem("articleData",JSON.stringify(this.articleData));
    // 		cc.sys.localStorage.setItem("backPackData",JSON.stringify(this.backPackData));
    // 		cc.sys.localStorage.setItem("skillData",JSON.stringify(this.skillData));
    // 		cc.sys.localStorage.setItem("personnelData",JSON.stringify(this.personnelData));
    // 		cc.sys.localStorage.setItem("backPackInfo",JSON.stringify(this.backPackInfo));
    // 		cc.sys.localStorage.setItem("personnelInfo",JSON.stringify(this.personnelInfo));
    // 		cc.sys.localStorage.setItem("massageData",JSON.stringify(this.massageData));
    // 		cc.sys.localStorage.setItem("chillDownData",JSON.stringify(this.chillDownData));
    // 		cc.sys.localStorage.setItem("randomEventData",JSON.stringify(this.randomEventData));
        }, 1);
    },
});
