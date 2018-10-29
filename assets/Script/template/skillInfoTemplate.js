cc.Class({
    extends: cc.Component,

    properties: {
        skillName:cc.Label,
        skillIntroduce:cc.Label,
        
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    init:function(data){
        this.skillName.string = data.skillName;
        this.skillIntroduce.string = data.skillIntroduce;
    },
});
