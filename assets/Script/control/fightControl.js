cc.Class({
    extends: cc.Component,

    properties: {
        controlNode: cc.Node,
        butPerfab: cc.Prefab,
        heroNode: cc.Node,
        monsterNode: cc.Node,
		//行动冷却速度
        attackChillDownSpeed: 0,
        defenseChillDownSpeed: 0,
        healingChillDownSpeed: 0,
        desertChillDownSpeed: 0,
        //怪物攻速
        monsterAsp: 0,
		//逃跑几率
        desertOdds: 0,
		_exitType: 0,
		
        actionLock: false,
        defensing: false,
    },

    // use this for initialization
    onLoad: function () {
		//初始化动画
        var heroAnim =  this.node.getChildByName('scene').getChildByName('hero').getComponent('cc.Animation');
        var monsterAnim =  this.node.getChildByName('scene').getChildByName('monster').getComponent('cc.Animation');
        this.nodeAnim = this.node.getComponent('cc.Animation');
        this.fightAnim = {
            'hero': heroAnim,
            'monster': monsterAnim
        };
		//绑定信息窗口
        if(cc.director.getScene().getChildByName("massageArea") !== null) {
            this.sendMassage = cc.director.getScene().getChildByName("massageArea").getComponent("massageAreaControl").createAMassage;
        }
        //开启监听，行动是否完成及是否正在防御
        this.fightAnim.hero.on('play', function() {
            this.actionLock = true;
            if(this.fightAnim.hero.currentClip.name === 'hero-anim-defense') {
                this.defensing = true;
            }
        }, this);
        this.fightAnim.hero.on('finished', function() {
            this.actionLock = false;
            if(this.defensing) {
                this.defensing = false;
            }
        }, this);
        
        //启用怪物AI
        this.monsterAI();
    },
    
    onDisable: function() {
		//清空action按钮行冷却
        var operationChild = [];
        operationChild = this.node.getChildByName('operation').getChildren();
        var actions = operationChild[0].getChildren();
        for(var i = 0; i < actions.length; ++i) {
            actions[i].getChildByName('progressBar').getComponent(cc.ProgressBar).progress = 0;//重置冷却
            actions[i].getComponent('fightButtonSchedule').unschedule(this.updateProgress);//关闭冷却计时
            actions[i].getComponent(cc.Button).interactable = true;//开放按钮
        }
		//删除support按钮行按钮
        operationChild[1].removeAllChildren();
    },
    
    //初始化战斗，用于其他脚本调用
    initFight: function(monsterId, exitType) {
        this._exitType = exitType;
        this.controlNode.getComponent('heroMoveControl').moveLock = true;//关闭移动监听
        this.node.active = true;//启用战斗节点
        this.nodeAnim.play('fight-anim-show');//淡入
        
		//根据背包中治疗物数量初始化治疗按钮
		var backPackData = JSON.parse(cc.sys.localStorage.getItem("backPackData"));
		for(var i = 0; i < backPackData.length; ++i) {
		    if(backPackData[i].canUseToHealing && backPackData[i].number > 0) {//可以被用于治疗且数量不为零
		        this.initHealingBut(backPackData[i]);//调用初始化治疗按钮
		    }
		}
		//初始化逃跑按钮
		this.initDesertBut();
		//根据support按钮数量调整按钮间距
		var supportNode = this.node.getChildByName('operation').getChildByName('support');
		var supportLayout = supportNode.getComponent(cc.Layout);
		var supportChild = supportNode.getChildren();
		if(supportChild.length >= 3) {//按钮数量大于3
		    supportLayout.spacingX = (120 - ((supportChild.length - 2) * 30));//调整间距
		    var childWidth = (supportNode.width - (60 * 2) - ((supportChild.length - 1) * supportLayout.spacingX)) / supportChild.length;
		    for(var j = 0; j< supportChild.length; ++j) {
		        supportChild[j].getChildByName('progressBar').getComponent(cc.ProgressBar).totalLength = childWidth;//调整冷却条使之适配按钮长度
		    }
		}
		//初始化英雄状态
        this.heroState = JSON.parse(cc.sys.localStorage.getItem("heroData"));
        this.heroState.hp = cc.find('Canvas/control').getComponent('adventureControl').heroHp;
		this.heroMaxHp = JSON.parse(cc.sys.localStorage.getItem("backPackInfo")).maxHP;
		//初始化怪物状态
		var monsterData = JSON.parse(cc.sys.localStorage.getItem("monsterData"));
		if(monsterId >= 0 && monsterId < monsterData.length) {//根据调用参数选择怪物
		    this.monsterState = monsterData[monsterId];
		    cc.log('set give monster');
		}
		else {//或随机挑选怪物
		    var flag = parseInt(cc.rand() % monsterData.length);
		    this.monsterState = monsterData[flag];
		    cc.log('set rand monster');
		}
		//cc.log(this.monsterState);
        this.monsterMaxHp = this.monsterState.hp;//初始化hp
        this.desertOdds = this.monsterState.des;
	    //场景初始化
	    this.monsterAsp = monsterData.asp;
		this.node.getChildByName('info').getComponent(cc.Label).string = '你遭遇了' + this.monsterState.name + '!';//战斗信息介绍
		var heroStateNode = this.heroNode.getChildByName('state');
		var monsterStateNode = this.monsterNode.getChildByName('state');
	    heroStateNode.getChildByName('hp').getComponent(cc.Label).string = this.heroState.hp.toString() + '/' + this.heroMaxHp.toString();//hero血量
		monsterStateNode.getChildByName('name').getComponent(cc.Label).string = this.monsterState.name;//怪物名字
		monsterStateNode.getChildByName('hp').getComponent(cc.Label).string = this.monsterState.hp.toString() + '/' + this.monsterMaxHp.toString();//怪物血量
    },
    
    backBase: function() {
        cc.director.loadScene("game", function() {
            var welcomeScene = cc.find('welcome');
            var controlCenter = cc.find('Canvas/ControlCenter');
            var adventurePrepare = cc.find('Canvas/adventurePrepare');
            
            welcomeScene.active = false;
            controlCenter.active = false;
            adventurePrepare.active = true;
        });
    },
    
    //行动冷却，由四种技能方法调用
    chillDown : function(event){
        var schedule = event.currentTarget.getComponent('fightButtonSchedule');//在各自的按钮上获得冷却计时器
		//根据行动种类不同分配不同的冷却时间
        switch(event.currentTarget.name) {
            case 'attack':
                schedule.updateSpeed = this.attackChillDownSpeed;
            break;
            case 'defense':
                schedule.updateSpeed = this.defenseChillDownSpeed;
            break;
            case 'healing':
                schedule.updateSpeed = this.healingChillDownSpeed;
            break;
            case 'desert':
                schedule.updateSpeed = this.desertChillDownSpeed;
            break;
        }
        event.currentTarget.getComponent('fightButtonSchedule').schedule(this.updateProgress , 0.02);//开始冷却
    },
    //冷却方法
    updateProgress : function(dt){
        var self = this.node.parent.parent.parent.getComponent('fightControl');//绑定faightControl脚本
        var progress = this.node.getChildByName('progressBar').getComponent(cc.ProgressBar).progress;
        var thisButton = this.node.getComponent(cc.Button);
        var updateProgress = self.updateProgress;
        thisButton.interactable = false;
        
        if (progress < 1 ) {
            progress += (dt * this.updateSpeed);
        }
        else if(progress >= 1){
            thisButton.interactable = true;
            this.unschedule(updateProgress);
            progress = 0;
        }
        this.node.getChildByName('progressBar').getComponent(cc.ProgressBar).progress = progress;
    },
    //怪物ai
    monsterAI: function() {
        this.schedule(function(dt) {//按时发动攻击，该计时器在fightControl脚本上开启
            if(this.monsterState.hp > 0) {
                this.monsterAttack();
            }
        }, this.monsterAsp);
    },
    //攻击
    attack: function(event) {
		if(!this.actionLock) {
		    this.fightAnim.hero.play('hero-anim-attack');//播放攻击动画
            var damageShow = cc.find('image/damage', this.monsterNode).getComponent(cc.Label);//获取伤害数字Label
            //判断英雄是否命中及怪物是否闪避
            var heroHitFlag = Math.random().toFixed(2) < this.heroState.hit ? true: false;
            var monsterEvaFlag = Math.random().toFixed(2) > this.monsterState.eva ? true: false;
            //伤害发生
            if(heroHitFlag && monsterEvaFlag) {//若攻击命中
					//判断是否暴击
					var heroCriFlag = Math.random().toFixed(2) < this.heroState.cri ? true: false;
					//初始化伤害
					var _damage = 1;
					if(!heroCriFlag) {//若未产生暴击
                    if(this.monsterState.def < this.heroState.str) {//判断是否防御过高，是则伤害为1
                        _damage = this.heroState.str - parseInt((this.monsterState.def / 2));//否则计算伤害
                    }
                    damageShow.string = '-' + _damage.toString();//显示伤害值
                    // cc.log('normal hit');
					this.sendMassage('你对怪物发起进攻！造成' + _damage + '点伤害');
                }
                else {//若产生暴击则伤害*2
                    if(this.monsterState.def < this.heroState.str) {
                        _damage = (this.heroState.str * 2) - parseInt((this.monsterState.def / 2));
                    }
                    else {
                        _damage *= 2;
                    }
                    damageShow.string = '暴击！-' + _damage.toString();
                    // cc.log('cri hit');
					this.sendMassage('你对怪物发起进攻，暴击！造成' + _damage + '点伤害');
                }
				//战斗判断
                if(this.monsterState.hp > _damage) {//若伤害<怪物剩余生命
                    
                    this.monsterState.hp -= _damage;//造成伤害
					//更新血条
                    var hpShow = cc.find('state/hp', this.monsterNode).getComponent(cc.Label);
                    hpShow.string = this.monsterState.hp.toString() + '/' + this.monsterMaxHp.toString();
                    this.chillDown(event);//进入冷却
                }
                else {//否则战斗胜利
                    this.monsterState.hp = 0
                    var hpShow = cc.find('state/hp', this.monsterNode).getComponent(cc.Label);
                    hpShow.string = this.monsterState.hp.toString() + '/' + this.monsterMaxHp.toString();
                    this.fightWin();
                }
            }
            else {//攻击未命中
                damageShow.string = 'miss!';
            }
        }
        else {
            this.sendMassage('正在行动,无法进攻!');
        }
    },
    //怪物发起进攻
    monsterAttack: function(event) {
        this.fightAnim.monster.play('monster-anim-attack');//播放动画
        var damageShow = cc.find('image/damage', this.heroNode).getComponent(cc.Label);//获得伤害数字label
		//判断怪物是否命中及英雄是否闪避
        var monsterHitFlag = Math.random().toFixed(2) < this.monsterState.hit ? true: false;
        var heroEvaFlag = Math.random().toFixed(2) > this.heroState.eva ? true: false;
		//伤害发生
        if(monsterHitFlag && heroEvaFlag) {
            var heroCriFlag = Math.random().toFixed(2) < this.heroState.cri ? true: false;//是否暴击
            var _damage = 1;//初始化伤害
            if(!heroCriFlag) {//未暴击
                if(this.heroState.def < this.monsterState.str) {
                    _damage = this.monsterState.str - parseInt((this.heroState.def / 2));//计算伤害
                }
                if(this.defensing) {//英雄是否正在防御，是则伤害减半
                    _damage = parseInt(_damage / 2);
                    damageShow.string = '防御成功！-' + _damage.toString();
					this.sendMassage('防御成功！你受到了' + _damage + '点伤害');
                }
                else {
                    damageShow.string = '-' + _damage.toString();
					this.sendMassage('怪物对你发起进攻！造成' + _damage + '点伤害');
                }
                
            }
            else {//发生暴击
                if(this.heroState.def < this.monsterState.str) {
                    _damage = (this.monsterState.str * 2) - parseInt((this.heroState.def / 2));//伤害翻倍
                }
                else {
                    _damage *= 2;
                }
                if(this.defensing) {//英雄是否正在防御，是则伤害减半
                    _damage = parseInt(_damage / 2);
                    damageShow.string = '防御成功！-' + _damage.toString();
					this.sendMassage('防御成功！你受到了' + _damage + '点伤害');
                }
                else {
                    damageShow.string = '暴击！-' + _damage.toString();
					this.sendMassage('怪物对你发起进攻，暴击！造成' + _damage + '点伤害');
                }
                
            }
			//战斗判断
            if(this.heroState.hp > _damage) {//英雄剩余血量>本次伤害
                
                this.heroState.hp -= _damage;
                var hpShow = cc.find('state/hp', this.heroNode).getComponent(cc.Label);
                hpShow.string = this.heroState.hp.toString() + '/' + this.heroMaxHp.toString();
                var adventureControl = cc.find('Canvas/control').getComponent('adventureControl');
                adventureControl.heroHp = this.heroState.hp;
            }
            else {//否则战斗失败
                this.heroState.hp = 0;
                var hpShow = cc.find('state/hp', this.heroNode).getComponent(cc.Label);
                hpShow.string = this.heroState.hp.toString() + '/' + this.heroMaxHp.toString();
                this.fightFailure();
            }
        }
    },
    //防御
    defense: function(event) {
        if(!this.actionLock) {
            this.fightAnim.hero.play('hero-anim-defense');
            this.sendMassage('你发起了防御！');
            this.chillDown(event);
        }
        else {
            this.sendMassage('正在行动,无法防御!');
        }
    },
	//初始化治疗按钮
    initHealingBut: function(itemData) {
		//初始化治疗按钮
        var healingBut = cc.instantiate(this.butPerfab);
        healingBut.name = 'healing';
        //初始化按钮上的文字显示
        var butLabel = healingBut.getChildByName('Label').getComponent(cc.Label);
        if(itemData.articleId === 0) {
            butLabel.string = '吃掉' + itemData.name;
        }
        else {
            butLabel.string = '使用' + itemData.name;
        }
		//初始化点击事件
        var clickEventHandler = new cc.Component.EventHandler()
        clickEventHandler.target = this.node;
        clickEventHandler.component = 'fightControl';
        clickEventHandler.handler = 'healing';
        clickEventHandler.customEventData = itemData;
        healingBut.getComponent(cc.Button).clickEvents.push(clickEventHandler);
        //部署按钮
        this.node.getChildByName('operation').getChildByName('support').addChild(healingBut);
    },
    //治疗
    healing: function(event, itemData) {
        if(!this.actionLock) {
            var chillDownLock = false;//冷却锁，用于在治疗物用完时禁用按钮而不是进入冷却
            this.fightAnim.hero.play('hero-anim-healing');//播放动画
            if((this.heroState.hp + itemData.healingValue) > this.heroMaxHp) {//治疗量过高则补满生命值
                this.sendMassage('你治疗了自己！恢复了' + (this.heroMaxHp - this.heroState.hp) + '点生命');
                this.heroState.hp = this.heroMaxHp;
            }
            else {//否则补充指定血量
                this.heroState.hp += itemData.healingValue;
                this.sendMassage('你治疗了自己！恢复了' + itemData.healingValue + '点生命');
            }
			//更新血条
            var hpShow = cc.find('state/hp', this.heroNode).getComponent(cc.Label);
            hpShow.string = this.heroState.hp.toString() + '/' + this.heroMaxHp.toString();
            var adventureControl = cc.find('Canvas/control').getComponent('adventureControl');
            adventureControl.heroHp = this.heroState.hp;
            
			//减少该物品数量
            var backPackData = JSON.parse(cc.sys.localStorage.getItem("backPackData"));
            if((-- backPackData[itemData.id].number) <= 0){//若该物品数量为0，则禁用该按钮
                event.currentTarget.getComponent(cc.Button).interactable = false;
                chillDownLock = true;//打开冷却锁
            }
            cc.sys.localStorage.setItem("backPackData",JSON.stringify(backPackData));
            //冷却判定
            if(!chillDownLock) {
                this.chillDown(event);
            }
        }
        else {
            this.sendMassage('正在行动,无法治疗!');
        }
    },
    //初始化逃跑按钮
    initDesertBut: function() {
		///初始化按钮
        var desertBut = cc.instantiate(this.butPerfab);
        desertBut.name = 'desert';
        //初始化显示
        var butLabel = desertBut.getChildByName('Label').getComponent(cc.Label);
        butLabel.string = '逃跑';
        //绑定点击事件
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = 'fightControl';
        clickEventHandler.handler = 'desert';
        desertBut.getComponent(cc.Button).clickEvents.push(clickEventHandler);
        //部署按钮
        this.node.getChildByName('operation').getChildByName('support').addChild(desertBut);
    },
	//逃跑
    desert: function(event) {
		//判定是否逃跑成功
        if(Math.random().toFixed(2) < this.desertOdds) {//是则关闭战斗窗口
            this.nodeAnim.play('fight-anim-hide');
			this.sendMassage('逃跑成功！');
            //this.exitFight();
        }
        else {//否则进入冷却
            this.chillDown(event);
			this.sendMassage('逃跑失败！');
        }
    },
    //战斗失败
    fightFailure: function() {
        this.sendMassage('你被打败了');
        var backPackData = JSON.parse(cc.sys.localStorage.getItem("backPackData"));
        //物品丢失
        if(backPackData[12].number > 0) {//有生命之花则消耗之并保留其他物品
            this.sendMassage('但是生命之花拯救了你');
            backPackData[12].number --;
        }
        else {//否则遗失全部物品
            for(var i = 0; i < backPackData.length; ++i) {
                backPackData[i].number = 0;
            }
        }
        cc.sys.localStorage.setItem("backPackData",JSON.stringify(backPackData));
        
        this.nodeAnim.play('fight-anim-failure');
        //this.backBase();
    },
    //战斗胜利
    fightWin: function() {
        this.sendMassage('你战胜了怪物！');
        switch(this._exitType) {
            case 'map':
                this.nodeAnim.play('fight-anim-goToDrop');
            break;
            case 'level':
                this.nodeAnim.play('fight-anim-levelCallback');
            break;
            default:
                this.nodeAnim.play('fight-anim-hide');
            break;
        }
        var adventureControl = cc.find('Canvas/control').getComponent('adventureControl');
        adventureControl.heroHp = this.heroState.hp;
    },
    //退出战斗，在动画fight-anim-hide中掉调用
    exitFight: function() {
        this.node.active = false;
        this.controlNode.getComponent('heroMoveControl').moveLock = false;//启用移动监听
    },
    //enterDrop，在动画fight-anim-goToDrop中掉调用
    enterDrop: function() {
        this.node.active = false;
        this.controlNode.getComponent('heroMoveControl').moveLock = false;//启用移动监听
        this.node.parent.getChildByName('drop').getComponent('dropControl').initDrop(this.monsterState.drop, 'map');
    },
    //levelCallback,在动画fight-anim-levelCallback中掉调用
    levelCallback: function() {
        this.node.active = false;
        this.controlNode.getComponent('heroMoveControl').moveLock = false;//启用移动监听
        this.controlNode.getComponent('specialNodeControl').initLevel(0, 'drop');
    },
});
