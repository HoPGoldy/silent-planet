cc.Class({
    extends: cc.Component,

    properties: {
        buildArea:cc.Node,
        manufactureArea:cc.Node,
        buyArea:cc.Node,
        articleInfoArea:cc.Node,//只有此资源进行了数据绑定
        
        resetFrameTag : false,//如果该标志为是 则不再重设库存区域的边框
        buildData : 0,//该场景使用的建筑物数据
        articleData : 0,//该场景使用的物品数据
    },

    // use this for initialization
    onLoad: function () {
        this.activeListener();
        this.controlCenterDataUpdate();
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if( ! this.resetFrameTag){
            this.selectArticleInfoAreaFrame();
        }
    },
	//监听“场景”切换，切换时进行冷却保存和重载入
    activeListener:function(){
        var clickEvent = cc.find("body/getEnergyButton",this.node).getComponent("clickEvent");
        
        this.node.on('active-in-hierarchy-changed',function(event){
            if(this.node.activeInHierarchy){
                //cc.log("node his active!");
                clickEvent.resetChillDown();
            }
            else{
                //cc.log("node his unactive!");
                clickEvent.saveChillDown();
            }
        },this);
    },
    //选择物品显示区域的外框
    selectArticleInfoAreaFrame : function(){
        var articleContent = cc.find("view/articleContent",this.articleInfoArea);
        var articleContentBG = articleContent.getComponent(cc.Sprite);
        var articleInfoAreaBG = this.articleInfoArea.getComponent(cc.Sprite);
        //如果物品显示区域的高度大于滚动器的高度 则使用固定长度的外框
        if(articleContent.height < this.articleInfoArea.height){
            articleContentBG.enabled = true;
            articleInfoAreaBG.enabled = false;
        }
        else{
            articleContentBG.enabled = false;
            articleInfoAreaBG.enabled = true;
            this.resetFrameTag = true;
        }
    },
    //从数据库中实时更新数据
    controlCenterDataUpdate : function(){
        this.buildData = JSON.parse(cc.sys.localStorage.getItem("buildData"));
        this.articleData = JSON.parse(cc.sys.localStorage.getItem("articleData"));
        this.schedule(function(dt){
            this.buildData = JSON.parse(cc.sys.localStorage.getItem("buildData"));
            this.articleData = JSON.parse(cc.sys.localStorage.getItem("articleData"));
        },0.1);
    },
});
