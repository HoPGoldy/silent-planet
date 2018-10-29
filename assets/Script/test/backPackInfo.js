cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {

    },

    showBackPackInfo:function(){
        var backPackData = JSON.parse(cc.sys.localStorage.getItem("backPackData"));
        var totalWeight = 0;
        cc.log("此次出发所携带的物品为：");
        for(var i = 0;i < backPackData.length; i++){
            if(backPackData[i].number !== 0){
                cc.log(backPackData[i].name + ":" + backPackData[i].number);
                totalWeight += backPackData[i].weight * backPackData[i].number;
            }
        }
        cc.log("总重量为:" + totalWeight);
    },
});
