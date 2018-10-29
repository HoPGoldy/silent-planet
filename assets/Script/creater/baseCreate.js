cc.Class({
    extends: cc.Component,

    properties: {
        buildInfoArea:cc.Node,
        personnelManagementArea:cc.Node,
        BuildInfoPrefab:cc.Prefab,
        personnelManagementButtonPrefab:cc.Prefab,
    },

    // use this for initialization
    onLoad: function () {
        this.loadData();
        this.creatBuildInfoList();
        this.createPersonnelManagementButtonList();
    },
	//数据读取
    loadData:function(){
		this.buildData = JSON.parse(cc.sys.localStorage.getItem("buildData"));
		this.personnelData = JSON.parse(cc.sys.localStorage.getItem("personnelData"));
	},
	//生成建筑物信息列表
	creatBuildInfoList:function(){
	    for(var i = 0;i < this.buildData.length; ++i){
	        var item = cc.instantiate(this.BuildInfoPrefab);
	        var data = this.buildData[i];
	        this.buildInfoArea.addChild(item);
	        item.getComponent("itemTemplate").init({
	            id : data.id,
	            name : data.name,
	            number : data.number,
	            isMax : (data.number === data.maxNumber) ? true : false,
	        },"buildInfo");
	    }
	},
	//生成人员管理列表
	createPersonnelManagementButtonList:function(){
	    this.personnelData = JSON.parse(cc.sys.localStorage.getItem("personnelData"));	    
        
        for(var i = 0;i < this.personnelData.length; i++){
            var item = cc.instantiate(this.personnelManagementButtonPrefab);
            var data = this.personnelData[i];
            var personnelButton = cc.find("personnelOperationArea/view/content/manManagementList",this.node).getChildByName(data.name);
            //cc.log(personnelButton);
            if(personnelButton === null && data.state){
                this.personnelManagementArea.addChild(item);
                
                item.getComponent("personnelManagementButtonTemplate").init(data)
            }            
        }
    },
});
