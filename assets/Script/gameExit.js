cc.Class({
    extends: cc.Component,

    properties: {
        buttonIsShow: false,
    },

    // use this for initialization
    onLoad: function () {
        cc.game.addPersistRootNode(this.node);
        this.backKeyListener();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    backKeyListener : function(){
        var anim = this.node.getComponent("cc.Animation");
        if(cc.sys.os === cc.sys.OS_ANDROID){ 
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, 
            function (event) {
                if(event.keyCode == cc.KEY.back){
                    if(this.buttonIsShow === false){
                        anim.play("exitGameButton-anim-show");
                        this.buttonIsShow = true;
                    }
                    else{
                        anim.play("exitGameButton-anim-hide");
                        this.buttonIsShow = false;
                    }
                }
            }, this);
        }
    },
    
    exitGame : function(){
        cc.game.end(); 
    },
});
