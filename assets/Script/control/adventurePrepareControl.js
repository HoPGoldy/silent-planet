cc.Class({
    extends: cc.Component,

    properties: {
        backPackInfoLabel : cc.Label,
        articleList : cc.Node,
        startAdventureButton : cc.Button,
        
        totalWeight : 0,
    },

    // use this for initialization
    onLoad: function () {
        this.initBackPackInfo();
        this.activeListener();
        this.adventurePrepareUpdate();
    },
    
    adventurePrepareUpdate: function(){
        this.schedule(function(dt){
            this.showBackPackInfo();
            this.prepareButtonControl();
            if(this.totalWeight === 0){//开始冒险按钮的状态更新,背包重量不为0则启用按钮
                this.startAdventureButton.interactable = false;
            }
            else{
                this.startAdventureButton.interactable = true;
            }
        },0.1);
    },
    //背包空间显示
    showBackPackInfo: function(){
        var backPackData = JSON.parse(cc.sys.localStorage.getItem("backPackData"));
        this.backPackInfo = JSON.parse(cc.sys.localStorage.getItem("backPackInfo"));
        var weight = 0;
        //计算背包总重量
        for(var i = 0;i < backPackData.length; i++){
            if(backPackData[i].number !== 0){
                weight += backPackData[i].weight * backPackData[i].number;
            }
        }
		//如果重量改变，则更新信息显示
        if(weight !== this.totalWeight){
            this.backPackInfoLabel.string = "——消耗品——\n—剩余空间:" + (this.backPackInfo.maxWeight - weight).toString() + "/" + this.backPackInfo.maxWeight.toString() + "—";
            this.totalWeight = weight;
        }
    },
    //初始化背包空间
    initBackPackInfo:function(){
        var backPackData = JSON.parse(cc.sys.localStorage.getItem("backPackData"));
        this.backPackInfo = JSON.parse(cc.sys.localStorage.getItem("backPackInfo"));
        var weight = 0;
        //计算总重量
        for(var i = 0;i < backPackData.length; i++){
            if(backPackData[i].number !== 0){
                weight += backPackData[i].weight * backPackData[i].number;
            }
        }
		//初始化信息显示
        this.backPackInfoLabel.string = "——消耗品——\n—剩余空间:" + (this.backPackInfo.maxWeight - weight).toString() + "/" + this.backPackInfo.maxWeight.toString() + "—";
        this.totalWeight = weight;
    },
    //物品调整按钮控制
    prepareButtonControl:function(){
        var articleData = JSON.parse(cc.sys.localStorage.getItem("articleData"));
        var backPackData = JSON.parse(cc.sys.localStorage.getItem("backPackData"));
        //若继续添加就会超出重量上限则禁用add按钮
        for(var i = 0;i < backPackData.length; ++i){
            var articleItemData = articleData[backPackData[i].articleId];
            var backPackItemData = backPackData[i];
			
            if(articleItemData.number !== 0 || backPackItemData.number !== 0){
                var prepareButton = this.articleList.getChildByName(backPackItemData.name);
                var addButton = prepareButton.getChildByName("add").getComponent(cc.Button);
                
                if((backPackItemData.weight + this.totalWeight) > this.backPackInfo.maxWeight){
                    addButton.interactable = false;
                }
                else {
                    addButton.interactable = true;
                }
            }
        }
    },
    //节点激活监听
    activeListener:function(){
        //cc.log("activeListener called");
        var adventurePrepareCreate = cc.find("Canvas/adventurePrepare/body").getComponent("adventurePrepareCreate");
        
        this.node.on('active-in-hierarchy-changed',function(event){
            if(this.node.activeInHierarchy){//若该节点被激活，则新建srticleList
                adventurePrepareCreate.createArticleList();
            }
            else { }
        },this);
    },
    
});
