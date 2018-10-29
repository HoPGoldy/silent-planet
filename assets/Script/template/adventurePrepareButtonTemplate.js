cc.Class({
    extends: cc.Component,

    properties: {
        itemName:cc.Label,
        itemNumber:cc.Label,
        inventoryNumber:cc.Label,
        itemWeight:cc.Label,
    },

    // use this for initialization
    onLoad: function () {

    },

    init:function(data){
        this.node.name = data.itemName;
        this.itemName.string = data.itemName;
        this.itemNumber.string = data.itemNumber.toString();
        this.inventoryNumber.string = data.inventoryNumber.toString();
        this.itemWeight.string = data.itemWeight.toString();
    },
    
    add:function(){
        if(this.inventoryNumber.string > 0){
            this.itemNumber.string = parseInt(this.itemNumber.string) + 1;
            this.inventoryNumber.string = parseInt(this.inventoryNumber.string) - 1;
            this.dataOperation();
        }
    },
    
    reduce:function(){
        if(this.itemNumber.string > 0){
            this.itemNumber.string = parseInt(this.itemNumber.string) - 1;
            this.inventoryNumber.string = parseInt(this.inventoryNumber.string) + 1;
            this.dataOperation();
        }
    },
    dataOperation:function(){
        var articleData = JSON.parse(cc.sys.localStorage.getItem("articleData"));
        var backPackData = JSON.parse(cc.sys.localStorage.getItem("backPackData"));
        
        for(var i = 0;i < articleData.length; i++){
            if(articleData[i].name === this.itemName.string){
                articleData[i].number = parseInt(this.inventoryNumber.string);
                //cc.log(articleData[i]);
            }
        }
        for(var j = 0;j < backPackData.length; j++){
            if(backPackData[j].name === this.itemName.string){
                backPackData[j].number = parseInt(this.itemNumber.string);
                //cc.log(backPackData[j]);
            }
        }
        
        cc.sys.localStorage.setItem("articleData",JSON.stringify(articleData));
	    cc.sys.localStorage.setItem("backPackData",JSON.stringify(backPackData));
    },
});