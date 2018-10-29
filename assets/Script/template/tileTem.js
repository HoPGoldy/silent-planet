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

const EXPLORED = cc.Enum({
    NORMAL: 0,
    OWN: 1,
    ENEMY: 2,
    DANGER: 3,
});

const RESPOINT = cc.Enum({
    RES1: 0,
    RES2: 1,
    RES3: 2,
});

cc.Class({
    extends: cc.Component,

    properties: {
        hero: cc.Node,
        
        _state: {
            default: STATE.NOTEXPLORED,
            type: STATE,
            visible: false
        },
        state: {
            get: function() {
                return this._state;
            },
            set: function(value) {
                // cc.log("set state: " + value);
                this._state = value;
                switch(this._state) {
                    case STATE.NOTEXPLORED:
                        this.getComponent(cc.Sprite).spriteFrame = cc.find('pic').getChildByName('notExplored').getComponent(cc.Sprite).spriteFrame;
                        break;
                    case STATE.EXPLORED:
                        this.showType();
                        break;
                    default:break;
                }
            },
            type:STATE,
        },
        
        _heroOn: {
            default: false,
            visible: false
        },
        heroOn: {
            get: function () {
                return this._heroOn;
            },
            set: function(value) {
                this._heroOn = value;
                //cc.log("heroOn: " + this._heroOn);
                if(this._heroOn) {
                    this.hero.opacity = 255;
                }
                else {
                    this.hero.opacity = 0;
                }
            },
        },
        
        _type: {
            default: TYPE.BLANK,
            type: TYPE,
        },
        type: {
            get: function() {
                return this._type;
            },
            set: function(value) {
                this._type = value;
                this.state = this.state;
            }
        },
        
        _battleType: {
            default: BATTLE.CAVE,
            type: BATTLE,
        },
        battleType: {
            get: function() {
                return this._battleType;
            },
            set: function(value) {
                this._battleType = value;
                this.type = TYPE.BATTLE;
            }
        },
        
        _respointType: {
            default: RESPOINT.RES1,
            type: RESPOINT,
        },
        respointType: {
            get: function() {
                return this._respointType;
            },
            set: function(value) {
                this._respointType = value;
                this.type = TYPE.RESPOINT;
            }
        },
    },

    // use this for initialization
    onLoad: function () {
        this.state = STATE.EXPLORED;//注释此句关闭地图全开
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    showType:function(){
        var pic = cc.find('pic');
        switch(this.type){
            case TYPE.BLANK:
                this.getComponent(cc.Sprite).spriteFrame = pic.getChildByName('blank').getComponent(cc.Sprite).spriteFrame;
                break;
            case TYPE.BASE:
                this.getComponent(cc.Sprite).spriteFrame = pic.getChildByName('base').getComponent(cc.Sprite).spriteFrame;
                break;
            case TYPE.BATTLE:
                this.showBattleType();
                break;
            case TYPE.RESPOINT:
                this.showRespointType();
                break;
            case TYPE.PORTAL:
                this.getComponent(cc.Sprite).spriteFrame = pic.getChildByName('portal').getComponent(cc.Sprite).spriteFrame;
                break;
            case TYPE.OUTPOST:
                this.getComponent(cc.Sprite).spriteFrame = pic.getChildByName('outpost').getComponent(cc.Sprite).spriteFrame;
                break;
            case TYPE.STRONGHOLD:
                this.getComponent(cc.Sprite).spriteFrame = pic.getChildByName('strongHold').getComponent(cc.Sprite).spriteFrame;
                break;
            case TYPE.OCCUPIED:
                this.getComponent(cc.Sprite).spriteFrame = pic.getChildByName('occupied').getComponent(cc.Sprite).spriteFrame;
                break;
            default:break;
        }
    },
    
    showBattleType: function() {
        var pic = cc.find('pic');
        // cc.log('battle type: ' + this.battleType);
        switch(this.battleType) {
            case BATTLE.CAVE:
                this.getComponent(cc.Sprite).spriteFrame = pic.getChildByName('cave').getComponent(cc.Sprite).spriteFrame;
            break;
            case BATTLE.BATFIELD:
                this.getComponent(cc.Sprite).spriteFrame = pic.getChildByName('batField').getComponent(cc.Sprite).spriteFrame;
            break;
            case BATTLE.CRATER:
                this.getComponent(cc.Sprite).spriteFrame = pic.getChildByName('crater').getComponent(cc.Sprite).spriteFrame;
            break;
            case BATTLE.BATBASE:
                this.getComponent(cc.Sprite).spriteFrame = pic.getChildByName('batBase').getComponent(cc.Sprite).spriteFrame;
            break;
            case BATTLE.BATRES:
                this.getComponent(cc.Sprite).spriteFrame = pic.getChildByName('resPoint').getComponent(cc.Sprite).spriteFrame;
            break;
            case BATTLE.BATPORTAL:
                this.getComponent(cc.Sprite).spriteFrame = pic.getChildByName('portal').getComponent(cc.Sprite).spriteFrame;
            break;
            case BATTLE.ALIENBASE:
                this.getComponent(cc.Sprite).spriteFrame = pic.getChildByName('alienBase').getComponent(cc.Sprite).spriteFrame;
            break;
            default:break;
        }
    },
    
    showRespointType: function() {
        var pic = cc.find('pic');
        switch(this.respointType) {
            case RESPOINT.RES1:
                this.getComponent(cc.Sprite).spriteFrame = pic.getChildByName('resPoint').getComponent(cc.Sprite).spriteFrame;
            break;
            case RESPOINT.RES2:
                this.getComponent(cc.Sprite).spriteFrame = pic.getChildByName('resPoint').getComponent(cc.Sprite).spriteFrame;
            break;
            case RESPOINT.RES3:
                this.getComponent(cc.Sprite).spriteFrame = pic.getChildByName('resPoint').getComponent(cc.Sprite).spriteFrame;
            break;
            default:break;
        }
    },
});
