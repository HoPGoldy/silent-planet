cc.Class({
    extends: cc.Component,

    properties: {
        heroNode: cc.Node,
        monsterNode: cc.Node,
		//英雄动作锁
        _heroActionLock: false,
        heroActionLock: {
            get: function() {
                return this._heroActionLock;
            },
            set: function(value) {
                if(this._heroActionLock !== value) {//若节点状态改变则立即隐藏尚未正常隐藏的信息
                    this._heroActionLock = value;
                    var image = this.heroNode.getChildByName('image');
                    image.getChildByName('defense').opacity = 0;
                    image.getChildByName('healing').opacity = 0;
                    image.getChildByName('damage').opacity = 0;
                }
            }
        },
        //怪物动作锁
        _monsterActionLock: false,
        monsterActionLock: {
            get: function() {
                return this._monsterActionLock;
            },
            set: function(value) {
                if(this._monsterActionLock !== value) {//若节点状态改变则立即隐藏尚未正常隐藏的信息
                    this._monsterActionLock = value;
                    var image = this.monsterNode.getChildByName('image');
                    image.getChildByName('defense').opacity = 0;
                    image.getChildByName('healing').opacity = 0;
                    image.getChildByName('damage').opacity = 0;
                }
            }
        },
    },

    // use this for initialization
    onLoad: function () {
		//获取所需动作
        var heroAnim = this.heroNode.getComponent(cc.Animation);
        var monsterAnim = this.monsterNode.getComponent(cc.Animation);
        this.fightAnim = {
            'hero': heroAnim,
            'monster': monsterAnim
        };
        //开启动作监听
        heroAnim.on('play', function() {
            this.heroActionLock = true;
        }, this);
        heroAnim.on('finished', function() {
            this.heroActionLock = false;
        }, this);
        monsterAnim.on('play', function() {
            this.monsterActionLock = true;
        }, this);
        monsterAnim.on('finished', function() {
            this.monsterActionLock = false;
        }, this);
    },
	//英雄攻击
    heroAttack: function() {
        if(!this.monsterActionLock) {//若怪物Anim闲置则执行第二段“怪物被攻击”的动画显示
            this.fightAnim.monster.play('monster-anim-beenAttack');
        }
        else{//否则进行补救显示
            this.monsterNode.getChildByName('image').getChildByName('damage').opacity = 255;
        }
    },
    //怪物攻击
    monsterAttack: function() {
        if(!this.heroActionLock) {//若英雄Anim闲置则执行第二段“英雄被攻击”的动画显示
            this.fightAnim.hero.play('hero-anim-beenAttack');
        }
        else{//否则进行补救显示
            this.heroNode.getChildByName('image').getChildByName('damage').opacity = 255;
        }
    },
});
