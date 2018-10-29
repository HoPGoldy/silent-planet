cc.Class({
    extends: cc.Component,

    properties: {
        buildArea:cc.Node,
        manufactureArea:cc.Node,
        buyArea:cc.Node,
        articleInfoArea:cc.Node,
        
        buildButtonPrefab:cc.Prefab,
        manufactureButtonPrefab:cc.Prefab,
        BuyButtonPrefab:cc.Prefab,
        articlePrefab:cc.Prefab,
    },

    // use this for initialization
    onLoad: function () {
        this.loadData();
        
        this.createArticleInfoList();
        this.createBuildAreaList();
        this.createManufactureAreaList();
        this.createBuyAreaList();
    },
    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    //加载数据
	loadData:function(){
		this.buildData = JSON.parse(cc.sys.localStorage.getItem("buildData"));
		this.articleData = JSON.parse(cc.sys.localStorage.getItem("articleData"));
	},
	
	//创建建筑物列表
	createBuildAreaList:function(){
	    for(var i = 0;i < this.buildData.length; i++){
	        var item = cc.instantiate(this.buildButtonPrefab);
	        var data = this.buildData[i];
	        
	        if(data.state){
	            this.buildArea.addChild(item);
                //将数据传递给上句新建的item节点进行个性化操作
    	        item.getComponent("buildButtonTemplate").init(data);
	        }
	    }
	    this.hideList(this.buildArea);
	},
	//创建物品合成列表
	createManufactureAreaList:function(){
	    for(var i = 0;i < this.articleData.length; i++){
	        var item = cc.instantiate(this.manufactureButtonPrefab);
	        var data = this.articleData[i];
	        //cc.log(data.name);
	        //cc.log(data.canManufacture);
	        if(data.canManufacture && data.state){
	            this.manufactureArea.addChild(item);
    	    	//将数据传递给上句新建的item节点进行个性化操作
    	    	item.getComponent("articleButtonTemplate").init(data,"manufacture");
	        }
	    }
	    this.hideList(this.manufactureArea);
	},
	//创建物品购买列表
	createBuyAreaList:function(){
	    for(var i = 0;i < this.articleData.length; i++){
	        var item = cc.instantiate(this.BuyButtonPrefab);
	        var data = this.articleData[i];
	        if(data.canBuy && data.state){
	            this.buyArea.addChild(item);
    	    	    //将数据传递给上句新建的item节点进行个性化操
    	    	    item.getComponent("articleButtonTemplate").init(data,"buy");
	        }
	    }
	    this.hideList(this.buyArea);
	},
	//创建物品信息列表
	createArticleInfoList:function(){
	    for(var i = 0;i < this.articleData.length; i++){
	        var item = cc.instantiate(this.articlePrefab);
	        var data = this.articleData[i];
	        this.articleInfoArea.addChild(item);
	        //cc.log("addChild doing:" + i);
	        item.getComponent("itemTemplate").init(data,"article");
	    }
	},
	//收起菜单
	hideList : function(areaNode){
	    var areaNodeArray = [];
	    areaNodeArray = areaNode.getChildren();
	    for(var j = 0;j < areaNodeArray.length; ++j){
            if(areaNodeArray[j].name !== "areaName"){
                areaNodeArray[j].active = false;
            }
        }
	},
});
