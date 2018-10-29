cc.Class({
    extends: cc.Component,

    properties: {
        yFix: 0,//用于修正摄像机在y轴方向的拍摄误差
    },

    // use this for initialization
    onLoad: function () {
        this.camera = this.getComponent(cc.Camera);
    },
    //初始化目标
    initTarget: function(target) {
        this.camera = this.getComponent(cc.Camera);
        var targets = this.camera.getTargets();//获取摄像机跟随的目标
        
        this.camera.addTarget(target);//添加目标
        this.node.position = cc.p(0, this.yFix);//设置初始位置
        while(targets.length > 1) {//维持拍摄目标数量
            this.camera.removeTarget(targets[targets.length - 1]);
        }
    },
    //更改拍摄目标
    changeTarget: function(target) {
        var targets = this.camera.getTargets();
        
        //cc.log("added target:" + target.tag);
        this.camera.addTarget(target);//添加目标
        this.cameraMove(target);//移动摄像机至目标
            
        while(targets.length > 1) {//维持拍摄目标数量
            //cc.log("remove target:" + targets[targets.length - 1].tag);
            this.camera.removeTarget(targets[targets.length - 1]);
        }
        
        //cc.log("targets.length: " + targets.length);
    },
    
    //摄像机移动
    cameraMove: function(target) {
        var targetPos = target.convertToWorldSpaceAR(cc.Vec2.ZERO);
        var cameraPos = this.node.parent.convertToNodeSpaceAR(targetPos);
        cameraPos.y += this.yFix;
        this.node.position = cameraPos;
        //cc.log("this.node.position: " + this.node.position);
        
        //let ratio = targetPos.y / cc.winSize.height;
        //this.camera.zoomRatio = 1 + (0.5 - ratio) * 0.5;
    },
});
