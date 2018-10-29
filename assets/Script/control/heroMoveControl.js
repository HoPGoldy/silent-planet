cc.Class({
    extends: cc.Component,

    properties: {
        mapNode: cc.Node,
        topArea: cc.Node,
        bottomArea: cc.Node,
        leftArea: cc.Node,
        rightArea: cc.Node,
        
        _moveLock: false,//移动锁，用于玩家执行其他操作时关闭移动监听，防止误操作
        moveLock: {
            get: function() {
                return this._moveLock;
            },
            set: function(value) {
                this._moveLock = value;
                if(!this.moveLock) {
                    cc.log('heroMove unlock!');
                    if(cc.sys.os === cc.sys.OS_WINDOWS) {
                        this.keyListenerOn();
                    }
                    else {
                        this.touchListenerOn();
                    }
                }
                else {
                    cc.log('heroMove lock!');
                    if(cc.sys.os === cc.sys.OS_WINDOWS) {
                        this.keyListenerOff();
                    }
                    else {
                        this.touchListenerOff();
                    }
                }
            },
        },
    },

    // use this for initialization
    onLoad: function () {
        this.mapControl = this.mapNode.getComponent('mapControl');
        this.moveLock = false;
    },

    //windows按键监听
    keyListenerOn: function() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.keyCallBack, this);
    },
    
    keyListenerOff: function() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.keyCallBack, this);
    },
    
    keyCallBack: function(event) {
        switch(event.keyCode) {
            case cc.KEY.w:
                this.mapControl.heroMove('top');
            break;
            case cc.KEY.a:
                this.mapControl.heroMove('left');
            break;
            case cc.KEY.s:
                this.mapControl.heroMove('bottom');
            break;
            case cc.KEY.d:
                this.mapControl.heroMove('right');
            break;
            default:return;
        }
    },
    
    //触摸监听，分别开启对应区域的监听
    touchListenerOn: function() {
        //cc.log('on');
        this.topArea.on(cc.Node.EventType.TOUCH_END, this.touchCallBack, this);
        this.leftArea.on(cc.Node.EventType.TOUCH_END, this.touchCallBack, this);
        this.bottomArea.on(cc.Node.EventType.TOUCH_END, this.touchCallBack, this);
        this.rightArea.on(cc.Node.EventType.TOUCH_END, this.touchCallBack, this);
    },
    
    touchListenerOff: function() {
        //cc.log('off');
        this.topArea.off(cc.Node.EventType.TOUCH_END, this.touchCallBack, this);
        this.leftArea.off(cc.Node.EventType.TOUCH_END, this.touchCallBack, this);
        this.bottomArea.off(cc.Node.EventType.TOUCH_END, this.touchCallBack, this);
        this.rightArea.off(cc.Node.EventType.TOUCH_END, this.touchCallBack, this);
    },
    
    touchCallBack: function(event) {
        this.mapControl.heroMove(event.target.name);
    }
});
