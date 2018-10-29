cc.Class({
    extends: cc.Component,

    properties: {
        articleListArea:cc.Node,
        skillShowArea:cc.Node,
        prepareButtonPrefab:cc.Prefab,
        skillInfoPrefab:cc.Prefab,
    },

    // use this for initialization
    onLoad: function () {
		this.loadData();
		this.createArticleList();
		this.skillInfoListCreate();
    },
	//数据加载
	loadData:function(){
		this.articleData = JSON.parse(cc.sys.localStorage.getItem("articleData"));
		this.backPackData = JSON.parse(cc.sys.localStorage.getItem("backPackData"));
		this.skillData = JSON.parse(cc.sys.localStorage.getItem("skillData"));
	},
	//生成背包物品管理按钮列表
	createArticleList:function(){
	    //cc.log("creatArticleList called");
	    this.loadData();
        for(var i = 0;i < this.backPackData.length; ++i){
            
            var item = cc.instantiate(this.prepareButtonPrefab);
            var articleData = this.articleData[this.backPackData[i].articleId];
            var backPackData = this.backPackData[i];
            var prepareButton = cc.find("operationArea/view/content/articleList",this.node).getChildByName(articleData.name);
            //cc.log("背包中的" + backPackData.name + ":");
            //cc.log(backPackData.number);
            //cc.log("库存中的" + articleData.name + ":");
            //cc.log(articleData.number);
            //cc.log("new PrepareButton name:" + articleData.name);
            if(prepareButton === null && (articleData.number !== 0 || backPackData.number !== 0)){
                this.articleListArea.addChild(item);
                item.getComponent("adventurePrepareButtonTemplate").init({
                    itemName:articleData.name,
                    itemNumber:backPackData.number,
                    inventoryNumber:articleData.number,
                    itemWeight:articleData.weight
                });
            }
            //cc.log(item.name);
        }
    },
    //生成技能信息列表
    skillInfoListCreate:function(){
	    for(var i = 0;i < this.skillData.length; i++){
	        var item = cc.instantiate(this.skillInfoPrefab);
	        var data = this.skillData[i];
	        
	        if(data.state){
	            this.skillShowArea.addChild(item);
	            item.getComponent("skillInfoTemplate").init({
	                skillName:data.name,
	                skillIntroduce:data.introduce
	            });
	        }
	        //cc.log("addChild done");
	    }
	},
	
	
});