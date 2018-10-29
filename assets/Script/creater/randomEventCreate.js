cc.Class({
    extends: cc.Component,

    properties: {
        randomEventNode:cc.Node,
        flagTime : 0,
    },

    // use this for initialization
    onLoad: function () {
        this.createARandomEvent();
    },
	//随机发生事件
    createARandomEvent:function(){
        var flag = parseInt(cc.rand() % this.flagTime);
        var interval = 0;
        
        cc.log("随机事件将在"+flag+"后发生");
        
        this.schedule(function(){
            if(interval == flag){
                this.randomEventNode.active = true;
                var eventAnim = this.randomEventNode.getComponent(cc.Animation);
                eventAnim.play("randomEvent-anim-show");
            }
            else if(interval > flag && this.randomEventNode.activeInHierarchy !== true){
                flag = parseInt(cc.rand() % this.flagTime);
                interval = 0;
                cc.log("随机事件将在"+flag+"后发生");
            }
            interval += 1;
        },1);
    },
});
