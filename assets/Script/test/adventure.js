cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    goToAdventurePrepare : function(){
        cc.director.loadScene("game", function() {
            var welcomeScene = cc.find('welcome');
            var controlCenter = cc.find('Canvas/ControlCenter');
            var adventurePrepare = cc.find('Canvas/adventurePrepare');
            
            welcomeScene.active = false;
            controlCenter.active = false;
            adventurePrepare.active = true;
        });
    },
    
    reinitMap: function() {
        cc.sys.localStorage.removeItem("mapData");
        
        cc.director.loadScene("game", function() {
            var welcomeScene = cc.find('welcome');
            var controlCenter = cc.find('Canvas/ControlCenter');
            var adventurePrepare = cc.find('Canvas/adventurePrepare');
            
            welcomeScene.active = false;
            controlCenter.active = false;
            adventurePrepare.active = true;
        });
    },
});
