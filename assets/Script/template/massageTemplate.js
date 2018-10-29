cc.Class({
    extends: cc.Component,

    properties: {
        massageLabel : cc.Label,
        showAnim : cc.Animation,
        id : 0,
    },

    // use this for initialization
    onLoad: function () {

    },

    init:function(data){
        this.id = data.id;
        this.massageLabel.string = data.content;
        //cc.log("this massage id:" + this.id + " content:" + this.massageLabel.string);
        this.showAnim.play("massage-anim-show");
    },
});
