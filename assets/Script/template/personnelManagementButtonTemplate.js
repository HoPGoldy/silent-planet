cc.Class({
    extends: cc.Component,

    properties: {
        professionName:cc.Label,
        professionNumber:cc.Label,
        
        professionMake:cc.Node,
        professionConsume:cc.Node,
    },

    // use this for initialization
    onLoad: function () {

    },
    
    update:function(dt){
        
    },

    init:function(data){
        this.node.name = data.name;
        //cc.log(this.node.name);
        this.professionName.string = data.name;
        this.professionNumber.string = data.number;
        //cc.log(this.professionMake.name);
        this.professionMake.getComponent("resourcesUsedCreate").init(data.make,data.number);
        this.professionConsume.getComponent("resourcesUsedCreate").init(data.consume,data.number);
        if(data.name === "石矿工"){
            this.node.getChildByName("add").active = false;
            this.node.getChildByName("reduce").active = false;
        }
    },
    
    add:function(){
        var personnelData = JSON.parse(cc.sys.localStorage.getItem("personnelData"));
        for(var j = 0;j < personnelData.length; j++){
            if(personnelData[j].name === "石矿工"){
                break;
            }
        }
        if(personnelData[j].number > 0){
            for(var i = 0;i < personnelData.length; i++){
                if(personnelData[i].name === this.professionName.string){
                    personnelData[i].number += 1;
                    break;
                }
            }
            personnelData[j].number -= 1;
            cc.sys.localStorage.setItem("personnelData",JSON.stringify(personnelData));
        }
    },
    
    reduce:function(){
        if(parseInt(this.professionNumber.string) > 0){
            var personnelData = JSON.parse(cc.sys.localStorage.getItem("personnelData"));
            for(var i = 0;i < personnelData.length; i++){
                if(personnelData[i].name === this.professionName.string){
                    personnelData[i].number -= 1;
                    break;
                }
            }
            for(var j = 0;j < personnelData.length; j++){
                if(personnelData[j].name === "石矿工"){
                    personnelData[j].number += 1;
                    break;
                }
            }
            cc.sys.localStorage.setItem("personnelData",JSON.stringify(personnelData));
        }
    },
    
});
