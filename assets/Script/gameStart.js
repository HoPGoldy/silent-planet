cc.Class({
    extends: cc.Component,

    properties: {
        CanvasNode : cc.Node,
        massageAreaNode : cc.Node,
        welcomeNode : cc.Node,
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    sceneChange:function(){
        this.CanvasNode.active = true;
        this.massageAreaNode.active = true;
        this.welcomeNode.active = false;
    },
});
