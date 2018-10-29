cc.Class({
    extends: cc.Component,

    properties: {
        eventName : cc.Label,
        eventContent : cc.Label,
        optionArea : cc.Node,
        randomEventOptionButtonPrefab : cc.Prefab,
    },

    // use this for initialization
    onLoad: function () {
        this.activeListener();
        this.eventAnim = this.node.getComponent(cc.Animation);
        this.sendMassage = cc.director.getScene().getChildByName("massageArea").getComponent("massageAreaControl").createAMassage;
    },
	//监听节点是否启用
    activeListener:function(){
        this.node.on('active-in-hierarchy-changed',function(event){
            if(this.node.activeInHierarchy){//若节点启用
                //cc.log("randomEventControl invoked");
                this.selectEvent();//挑选随机事件
                this.getScene(0);//部署随机事件的第一个场景
            }
            else{
                //cc.log("randomEventControl end invoked");
            }
        },this);
    },
    //挑选事件
    selectEvent : function() {
        var randomEventData = JSON.parse(cc.sys.localStorage.getItem("randomEventData"));
        var flag = parseInt(cc.rand() % randomEventData.length);
        this.eventData = randomEventData[flag];
        //cc.log("eventData = ");
        //cc.log(this.eventData);
    },
    //部署场景
    getScene : function(sceneNumber) {
        var scene = this.eventData.scene[sceneNumber];
        var option = scene.option;
        this.eventName.string = scene.name;//场景名
        this.eventContent.string = scene.content;//场景内容
        for(var i = 0;i < option.length; ++i){
            //cc.log("第" + (i+1) + "个按钮的的数据绑定：");
            this.createNewOption(i, option[i].content);//生成新选项按钮
            //新按钮的数据绑定
            var optionButtonNode = this.optionArea.getChildByName(i.toString());
            var optionButtion = optionButtonNode.getComponent(cc.Button);
            var operation = option[i].operation;
            //cc.log("operation:" + operation);
            //添加点击事件
            var clickEventHandler = [];
            
            if(operation.length === 0) {
                clickEventHandler[0] = new cc.Component.EventHandler();
                clickEventHandler[0].target = this.node; 
                clickEventHandler[0].component = "randomEventControl";
                clickEventHandler[0].handler = "exitEvent";
                optionButtion.clickEvents.push(clickEventHandler[0]);
            }
            
            for(var j = 0;j < operation.length; ++j){
                clickEventHandler[j] = new cc.Component.EventHandler();
                clickEventHandler[j].target = this.node; 
                clickEventHandler[j].component = "randomEventControl";
                //cc.log("operation " + (j+1) + " is:");
                //cc.log(operation[j]);
                switch(operation[j]){//按钮的回调方法选择
                    case "getItem" : 
                        clickEventHandler[j].handler = "getItem";
                        clickEventHandler[j].customEventData = {"sceneCode" : sceneNumber , "optionCode" : i};
                        this.getItemCheck({"sceneCode" : sceneNumber , "optionCode" : i});
                    break;
                    case "getPerson" : 
                        clickEventHandler[j].handler = "getPerson";
                        clickEventHandler[j].customEventData = {"sceneCode" : sceneNumber , "optionCode" : i};
                    break;
                    case "unlockItem" : 
                        clickEventHandler[j].handler = "unlockItem";
                        clickEventHandler[j].customEventData = {"sceneCode" : sceneNumber , "optionCode" : i};
                    break;
                    case "jumpTo" : 
                        clickEventHandler[j].handler = "jumpTo";
                        clickEventHandler[j].customEventData = {"sceneCode" : sceneNumber , "optionCode" : i};
                    break;
                    default : 
                        clickEventHandler[j].handler = "exitEvent";
                    break;
                }
                optionButtion.clickEvents.push(clickEventHandler[j]);
            }
            //cc.log(optionButtion.clickEvents);
        }
    },
    //重设场景按钮
    resetScene : function(){
        this.optionArea.removeAllChildren();
    },
    //新建选项按钮
    createNewOption : function(itemName , itemContent){
        var item = cc.instantiate(this.randomEventOptionButtonPrefab);
        this.optionArea.addChild(item);
        item.getComponent("randomEventOptionButtonTemplate").init({
           name : itemName,
           content : itemContent
        });
    },
    //回调方法-跳转场景
    jumpTo : function(event , invokeInfo){
        var scene = this.eventData.scene;
        var totalOperation = this.eventData.operation.jumpTo;
        
        for(var i = 0;i < totalOperation.length; ++i){
            if((totalOperation[i].dependentScene === invokeInfo.sceneCode) && (totalOperation[i].dependentOption === invokeInfo.optionCode)){
                this.resetScene();
                this.eventAnim.play("randomEvent-anim-transition");
                this.getScene(totalOperation[i].id);
            }
        }
    },
    //回调方法-获取物品
    getItem : function(event , invokeInfo){
        var totalOperation = this.eventData.operation.getItem;
        
        for(var i = 0;i < totalOperation.length; ++i){
            if((totalOperation[i].dependentScene === invokeInfo.sceneCode) && (totalOperation[i].dependentOption === invokeInfo.optionCode)){
                var neededOperation = totalOperation[i];
                var articleData = JSON.parse(cc.sys.localStorage.getItem("articleData"));
                articleData[neededOperation.id].number += neededOperation.number;
                cc.sys.localStorage.setItem("articleData",JSON.stringify(articleData));
                
                if(neededOperation.number > 0){
                    this.sendMassage("你获得了" + neededOperation.number + "个" + articleData[neededOperation.id].name);
                    //cc.log(articleData[neededOperation.id].name + "的数量+" + neededOperation.number);
                }
                else{
                    this.sendMassage("你消耗了" + (-neededOperation.number) + "个" + articleData[neededOperation.id].name);
                    //cc.log(articleData[neededOperation.id].name + "的数量-" + (-neededOperation.number));
                }
            }
        }
    },
	//回调方法-获取工人
    getPerson : function(event , invokeInfo){
        var totalOperation = this.eventData.operation.getPerson;
        
        for(var i = 0;i < totalOperation.length; ++i){
            if((totalOperation[i].dependentScene === invokeInfo.sceneCode) && (totalOperation[i].dependentOption === invokeInfo.optionCode)){
                var neededOperation = totalOperation[i];
                
                var personnelData = JSON.parse(cc.sys.localStorage.getItem("personnelData"));
                personnelData[neededOperation.id].number += 1;
                personnelData[neededOperation.id].state = personnelData[neededOperation.id].state ? true : true;
                cc.sys.localStorage.setItem("personnelData",JSON.stringify(personnelData));
                
                if(neededOperation.number > 0){
                    this.sendMassage(neededOperation.number + "位" + personnelData[neededOperation.id].name + "加入了你的基地。");
                    //cc.log(personnelData[neededOperation.id].name + "的数量+" + neededOperation.number);
                }
                else{
                    this.sendMassage((-neededOperation.number) + "位" + personnelData[neededOperation.id].name + "离开了你的基地。");
                    //cc.log(personnelData[neededOperation.id].name + "的数量-" + (-neededOperation.number));
                }
            }
        }
    },
    //回调方法-解锁物品
    unlockItem : function(event , invokeInfo){
        var totalOperation = this.eventData.operation.unlockItem;
        
        for(var i = 0;i < totalOperation.length; ++i){
            if((totalOperation[i].dependentScene === invokeInfo.sceneCode) && (totalOperation[i].dependentOption === invokeInfo.optionCode)){
                var neededOperation = totalOperation[i];
                
                var data = JSON.parse(cc.sys.localStorage.getItem(neededOperation.type));
                //cc.log( data[neededOperation.id]);
                data[neededOperation.id].state = true;
                cc.sys.localStorage.setItem(neededOperation.type,JSON.stringify(data));
                //cc.log(data);
                this.sendMassage(data[neededOperation.id].name + "已解锁 。");
                //cc.log(data[neededOperation.id].name + "已解锁 。");
            }
        }
    },
    
    //回调方法-退出事件
    exitEvent : function(event){
        //cc.log("exitEvent invoked");
        this.eventAnim.play("randomEvent-anim-hide");
        this.resetScene();
    },
    //消耗物品检查
    getItemCheck : function(invokeInfo){
        var totalOperation = this.eventData.operation.getItem;
        
        for(var i = 0;i < totalOperation.length; ++i){//遍历所有消耗
            if((totalOperation[i].dependentScene === invokeInfo.sceneCode) && (totalOperation[i].dependentOption === invokeInfo.optionCode)){//场景校对
                var neededOperation = totalOperation[i];
                if(neededOperation.nubmer >= 0) return;
                var articleData = JSON.parse(cc.sys.localStorage.getItem("articleData"));
                
                if(articleData[neededOperation.id].number < (-neededOperation.number)){//如果库存所需物品不足，则禁用该选项
                    var optionButton = this.optionArea.getChildByName(invokeInfo.optionCode.toString()).getComponent(cc.Button);
                    optionButton.interactable = false;
                }
            }
        }
    },
    //关闭节点
    closeNode : function(){
        var randomEventNode = cc.find("randomEvent/randomEvent");
        randomEventNode.active = false;
    },
});
