cc.Class({
    extends: cc.Component,

    properties: {
        updateSpeed: 0,
    },

    // use this for initialization
    onLoad: function () {
        this.adventureControl = cc.find('Canvas/control').getComponent('adventureControl');
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
