cc.Class({
    extends: cc.Component,

    properties: {
        controlCenterNode : cc.Node,
        baseNode : cc.Node,
        adventruePrepareNode : cc.Node,
    },

    // use this for initialization
    onLoad: function () {

    },

    toControlCenter:function(){
        if(this.getTag() !== "controlCenter"){
            this.controlCenterNode.active = true;
            this.baseNode.active = false;
            this.adventruePrepareNode.active = false;
        }
    },
    toBase:function(){
        if(this.getTag() !== "base"){
            this.controlCenterNode.active = false;
            this.baseNode.active = true;
            this.adventruePrepareNode.active = false;
        }
    },
    toAdventurePrepare:function(){
        if(this.getTag() !== "adventruePrepare"){
            this.controlCenterNode.active = false;
            this.baseNode.active = false;
            this.adventruePrepareNode.active = true;
            
        }
    },
    
    getTag:function(){
        if(this.controlCenterNode.activeInHierarchy){return "controlCenter";}
        else if(this.baseNode.activeInHierarchy){return "base";}
        else {return "adventruePrepare";}
    },
});
