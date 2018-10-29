cc.Class({
    extends: cc.Component,

    properties: {
        anim : cc.Animation,
        massageBox:cc.Node,
        massagePrefab:cc.Prefab,
    },

    // use this for initialization
    onLoad: function () {
		cc.game.addPersistRootNode(this.node);//设置为根节点
		//获取窗口调整按钮
		this.moveUp = this.node.getChildByName("AreaMoveButton").getChildByName("moveUp");
		this.moveDown = this.node.getChildByName("AreaMoveButton").getChildByName("moveDown");
		//this.createAMassage("添加能源");
		//绘制区分线
		this.drawLine();
    },
	//展开信息区域
    massageAreaMoveUp:function(){
        this.anim.play("massageArea-anim-moveUp");
        this.moveUp.active = false;
        this.moveDown.active = true;
    },
    //缩小信息区域
    massageAreaMoveDown:function(){
        this.anim.play("massageArea-anim-moveDown");
        this.moveUp.active = true;
        this.moveDown.active = false;
    },
   //创建一条新信息
    createAMassage:function(massageName){
        var massageData = JSON.parse(cc.sys.localStorage.getItem("massageData"));
        var massageBox = cc.find("massageArea/view/massageBox");
        var missTag = true;
        cc.loader.loadRes("massage", function (err, massagePrefab) {//读取预制体
            for(var i = 1;i < massageData.length; i++){//遍历信息库
                if(massageData[i].name === massageName){//若找到参数所指信息，则显示该信息
                    var data = massageData[i];
                    var item = cc.instantiate(massagePrefab);
                    
                    massageBox.addChild(item);
                    item.getComponent("massageTemplate").init({
                        id:data.id,
                        content:data.content,
                    });
                    missTag = false;
                    break;
                }
            }
            if(missTag === true){//若未找到，则显示该参数
                var missItem = cc.instantiate(massagePrefab);
                
                massageBox.addChild(missItem);
                missItem.getComponent("massageTemplate").init({
                    id:0,
                    content:massageName,
                });
            }
        });
    },
	//绘制区分线
    drawLine:function(){
        var ctx = this.node.getChildByName("graphics").getComponent(cc.Graphics);
        ctx.moveTo(this.node.x - 20,this.node.height/2 - 105);
        ctx.lineTo(- this.node.x + 20,this.node.height/2 - 105);
        ctx.stroke();
    },
});
