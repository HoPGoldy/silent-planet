const TYPE = cc.Enum({
    BLANK: 0,
    BASE: 1,
    BATTLE: 2,
    RESPOINT: 3,
    PORTAL: 4,
    OUTPOST: 5,
    STRONGHOLD: 6,
    OCCUPIED: 7,
});

const STATE = cc.Enum({
    NOTEXPLORED: 0,
    EXPLORED: 1,
});

const BATTLE = cc.Enum({
    CAVE:0,
    ALIENBASE: 1,
    BATFIELD: 2,
    CRATER: 3,
    BATBASE: 4,
    BATRES: 5,
    BATPORTAL: 6,
});

const RESPOINT = cc.Enum({
    RES1: 0,
    RES2: 1,
    RES3: 2,
});

const EXPLORED = cc.Enum({
    NORMAL: 0,
    OWN: 1,
    ENEMY: 2,
    DANGER: 3,
});

module.exports = {
    STATE: STATE,
    TYPE: TYPE,
    BATTLE: BATTLE,
    RESPOINT: RESPOINT,
    EXPLORED: EXPLORED,
};

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
