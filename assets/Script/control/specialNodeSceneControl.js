cc.Class({
    extends: cc.Component,

    properties: {
        nameLab: cc.Label,
        contentLab: cc.Label,
        actionArea: cc.Node,
        controlNode: cc.Node,
        tileHUD: cc.Node,
        
        butPre: cc.Prefab,
    },

    // use this for initialization
    onLoad: function () {

    },
    
    showScene: function() {
        this.node.active = true;
        this.tileHUD.active = false;
        var sceneAnim = this.node.getComponent(cc.Animation);
        this.controlNode.getComponent('heroMoveControl').moveLock = true;
        sceneAnim.play('specialNodeScene-anim-show');
    },
    
    hideScene: function() {
        this.tileHUD.active = true;
        var sceneAnim = this.node.getComponent(cc.Animation);
        this.controlNode.getComponent('heroMoveControl').moveLock = false;
        sceneAnim.play('specialNodeScene-anim-hide');
    },
    
    init: function(sceneData) {
        this.actionArea.removeAllChildren();
        this.showScene();
        this.nameLab.string = sceneData.name;
        this.contentLab.string = sceneData.content;
        
        var actionData;
        if(sceneData.action === undefined) {
            actionData = [{
                'content': '离开',
                'target': this.node,
                'component': 'specialNodeSceneControl',
                'handler': 'hideScene',
                'customEventData': 'undefined',
            }];
        }
        else {
            actionData = sceneData.action;
        }
        for(var i = 0; i < actionData.length; ++i) {
            this.initBut(actionData[i]);
        }
    },
    
    initBut: function(butData) {
        var butNode = cc.instantiate(this.butPre);
        
        var actionBut = butNode.getComponent(cc.Button);
        var actionLab = butNode.getChildByName('Label').getComponent(cc.Label);
        actionLab.string = butData.content;
        
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = butData.target; 
        clickEventHandler.component = butData.component;
        clickEventHandler.handler = butData.handler;
        clickEventHandler.customEventData = butData.customEventData;
        actionBut.clickEvents.push(clickEventHandler);
        
        this.actionArea.addChild(butNode);
    },
});
