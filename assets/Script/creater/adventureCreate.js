cc.Class({
    extends: cc.Component,

    properties: {
        //backpackLabel : cc.Label,
        HPShowLabel : cc.Label,
        remainingSpace : cc.Label,
        itemListNode : cc.Node,
        adventureItemPrefab : cc.Prefab,
    },

    // use this for initialization
    onLoad: function () {
        this.itemListCreate();
        this.infoInit();
    },
	//背包物品列表生成
    itemListCreate : function(){
        var backPackInfo = JSON.parse(cc.sys.localStorage.getItem("backPackInfo"));
        var backPackData = JSON.parse(cc.sys.localStorage.getItem("backPackData"));
        //生成“水”
        var water = cc.instantiate(this.adventureItemPrefab);
        this.itemListNode.addChild(water);
        water.getComponent("adventureItemTemplate").init({
            itemId: -1,
            itemName : "水",
            itemNumber : backPackInfo.maxWater,
        });
       //遍历背包物品并生成
        for(var i = 0;i < backPackData.length; ++i){
            if(backPackData[i].number !== 0){
                this.initItem(backPackData[i]);
            }
        }
    },
    
    initItem: function(itemData) {
        var item = cc.instantiate(this.adventureItemPrefab);
        this.itemListNode.addChild(item);
        item.getComponent("adventureItemTemplate").init({
            itemId: itemData.id,
            itemName : itemData.name,
            itemNumber : itemData.number,
        });
    },
    
    //初始化冒险信息
    infoInit: function() {
        var backPackInfo = JSON.parse(cc.sys.localStorage.getItem("backPackInfo"));
        var backPackData = JSON.parse(cc.sys.localStorage.getItem("backPackData"));
        var weight = 0;
        //计算背包总重量
        for(var i = 0; i < backPackData.length; i++){
            if(backPackData[i].number !== 0){
                weight += backPackData[i].weight * backPackData[i].number;
            }
        }
        this.remainingSpace.string = '剩余空间：' + (backPackInfo.maxWeight - weight).toString() + '/' + backPackInfo.maxWeight.toString();//初始化剩余空间显示
        this.HPShowLabel.string = "HP:" + backPackInfo.maxWater.toString() + '/' + backPackInfo.maxWater.toString();//初始化血量显示
        this.node.getComponent('adventureControl').heroHp = backPackInfo.maxHP;//设置当前英雄血量
        this.node.getComponent('adventureControl').heroMaxHp = backPackInfo.maxHP;
        this.node.getComponent('adventureControl').remainingSpace = backPackInfo.maxWeight - weight;
    },
});
