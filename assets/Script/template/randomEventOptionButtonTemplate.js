cc.Class({
    extends: cc.Component,

    properties: {
        optionContent : cc.Label,
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    init : function(data){
        this.optionContent.string = data.content;
        this.node.name = data.name.toString();
    },
});
