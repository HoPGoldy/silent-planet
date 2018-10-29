cc.Class({
    extends: cc.Component,

    properties: {
        baseInfo:cc.Label,
        personnelData:0,
        totalPersonNumber:0
    },

    // use this for initialization
    onLoad: function () {
        this.loadPersonnelData();
		//计算人口总数
        for(var i = 0;i < this.personnelData.length; i++){
            this.totalPersonNumber += this.personnelData[i].number;
        }
        this.activeListener();
        this.baseUpdate();
    },
    
    baseUpdate: function(){
        this.schedule(function(dt){
            this.loadPersonnelData();
            var totalNumber = 0;
		    //重复计算人口数量，发现变化则更新显示
            for(var i = 0;i < this.personnelData.length; i++){
                totalNumber += this.personnelData[i].number;
            }
            if(totalNumber !== this.totalPersonNumber){
                this.totalPersonNumber = totalNumber;
                this.baseInfoSet();
            }
        },0.1);
    },
	//读取所需数据
    loadPersonnelData:function(){
        this.personnelData = JSON.parse(cc.sys.localStorage.getItem("personnelData"));
        this.personnelInfo = JSON.parse(cc.sys.localStorage.getItem("personnelInfo"));
    },
    //设置基地人口信息
    baseInfoSet:function(){
        this.baseInfo.string = "——基地—人口:" + this.totalPersonNumber.toString() + "/" + this.personnelInfo.maxPersonNumber.toString() + "——";
    },
    //节点激活监听
    activeListener:function(){
        var collectStoneClickEvent = cc.find("body/collectStoneButton",this.node).getComponent("clickEvent");
        var collectGarbageClickEvent = cc.find("body/collectGarbageButton",this.node).getComponent("clickEvent");
        var baseCreate = this.node.getChildByName("body").getComponent("baseCreate");
        
        this.node.on('active-in-hierarchy-changed',function(event){
            if(this.node.activeInHierarchy){//若该节点被激活则重设按钮冷却
                collectStoneClickEvent.resetChillDown();
                collectGarbageClickEvent.resetChillDown();
                baseCreate.createPersonnelManagementButtonList();
                this.loadPersonnelData();
                this.baseInfoSet();
            }
            else{//该节点被禁用则储存冷却
                collectStoneClickEvent.saveChillDown();
                collectGarbageClickEvent.saveChillDown();
            }
        },this);
    },
});
