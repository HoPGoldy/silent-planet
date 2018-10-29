cc.Class({
    extends: cc.Component,

    properties: {
        //gameStartAnim:cc.Animation,
    },

    // use this for initialization
    onLoad: function () {
        this.dataCheck();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    dataCheck:function(){
        var buildData = JSON.parse(cc.sys.localStorage.getItem("buildData"));
        if(buildData === null){
            this.createData();
        }
    },
	
    jumpToGameScene:function(){
		cc.director.loadScene("game");
	},
	
    createData:function(){
		var buildData = [
			{"id":0,"name":"小屋","number":1,"resourcesUsed":[{"id":3,"name":"石块","number":200},],"state":true,"maxNumber":50,"unlockItem":0},		
			{"id":1,"name":"石屋","number":0,"resourcesUsed":[{"id":1,"name":"石头","number":100},],"state":true,"maxNumber":1,"unlockItem":"石块工人"},
			{"id":2,"name":"熔炉","number":0,"resourcesUsed":[{"id":3,"name":"石块","number":100},],"state":true,"maxNumber":1,"unlockItem":"炼铁工人"},
			{"id":3,"name":"塑料厂","number":0,"resourcesUsed":[{"id":3,"name":"石块","number":500},{"id":5,"name":"铁","number":200}],"state":true,"maxNumber":1,"unlockItem":"塑料工人"},
			{"id":4,"name":"炼钢炉","number":0,"resourcesUsed":[{"id":3,"name":"石块","number":2000},{"id":5,"name":"铁","number":1000}],"state":true,"maxNumber":1,"unlockItem":"炼钢工人"},
			{"id":5,"name":"炼金屋","number":0,"resourcesUsed":[{"id":3,"name":"石块","number":2000},{"id":5,"name":"铁","number":3000},{"id":6,"name":"钢","number":1000}],"state":true,"maxNumber":1,"unlockItem":"炼金术师"},
			{"id":6,"name":"炼矿屋","number":0,"resourcesUsed":[{"id":3,"name":"石块","number":2000},{"id":5,"name":"铁","number":1000},{"id":6,"name":"钢","number":100}],"state":true,"maxNumber":1,"unlockItem":"矿工"},
			{"id":7,"name":"实验室","number":0,"resourcesUsed":[{"id":5,"name":"铁","number":10000},{"id":8,"name":"金刚","number":0},{"id":12,"name":"硅","number":0}],"state":true,"maxNumber":1,"unlockItem":0},
			{"id":8,"name":"祭坛","number":0,"resourcesUsed":[{"id":1,"name":"石头","number":100000},],"state":true,"maxNumber":1,"unlockItem":0}
		];
		var articleData = [
			{"id":0,"name":"食物","number":999999999,"weight":1,"resourcesUsed":0,"state":true,"canManufacture":false,"canBuy":true,"canUseToAdventure":true,"cost":0},
			{"id":1,"name":"石头","number":999999999,"weight":0,"resourcesUsed":0,"state":true,"canManufacture":false,"canBuy":false,"canUseToAdventure":false,"cost":0},
			{"id":2,"name":"垃圾","number":999999999,"weight":0,"resourcesUsed":0,"state":true,"canManufacture":false,"canBuy":true,"canUseToAdventure":false,"cost":0},
			{"id":3,"name":"石块","number":999999999,"weight":0,"resourcesUsed":[{"id":1,"name":"石头","number":1}],"state":true,"canManufacture":false,"canBuy":false,"canUseToAdventure":false,"cost":0},
			{"id":4,"name":"塑料","number":999999999,"weight":0,"resourcesUsed":[{"id":2,"name":"垃圾","number":20}],"state":true,"canManufacture":false,"canBuy":true,"canUseToAdventure":false,"cost":0},
		    {"id":5,"name":"铁","number":999999999,"weight":0,"resourcesUsed":[{"id":1,"name":"石头","number":3},{"id":9,"name":"煤","number":1}],"state":true,"canManufacture":false,"canBuy":true,"canUseToAdventure":false,"cost":0},
			{"id":6,"name":"钢","number":999999999,"weight":0,"resourcesUsed":[{"id":5,"name":"铁","number":10},{"id":1,"name":"石头","number":10}],"state":true,"canManufacture":false,"canBuy":true,"canUseToAdventure":false,"cost":0},
			{"id":7,"name":"金","number":999999999,"weight":0,"resourcesUsed":[{"id":1,"name":"石头","number":500}],"state":true,"canManufacture":false,"canBuy":false,"canUseToAdventure":false,"cost":0},
			{"id":8,"name":"金刚","number":999999999,"weight":0,"resourcesUsed":[{"id":6,"name":"钢","number":30},{"id":7,"name":"金","number":1}],"state":true,"canManufacture":true,"canBuy":true,"canUseToAdventure":false,"cost":0},
			{"id":9,"name":"煤","number":999999999,"weight":0,"resourcesUsed":0,"state":true,"canManufacture":false,"canBuy":true,"canUseToAdventure":false,"cost":0},
			{"id":10,"name":"矿石","number":999999999,"weight":0,"resourcesUsed":0,"state":true,"canManufacture":false,"canBuy":true,"canUseToAdventure":false,"cost":0},
			{"id":11,"name":"铅","number":0,"weight":0,"resourcesUsed":0,"state":true,"canManufacture":false,"canBuy":true,"canUseToAdventure":false,"cost":0},
			{"id":12,"name":"硅","number":0,"weight":0,"resourcesUsed":0,"state":true,"canManufacture":false,"canBuy":true,"canUseToAdventure":false,"cost":0},
			{"id":13,"name":"铀","number":0,"weight":0,"resourcesUsed":0,"state":true,"canManufacture":false,"canBuy":true,"canUseToAdventure":false,"cost":0},
			{"id":14,"name":"电池","number":0,"weight":1,"resourcesUsed":[{"id":4,"name":"塑料","number":10},{"id":11,"name":"铅","number":10}],"state":true,"canManufacture":true,"canBuy":true,"canUseToAdventure":true,"cost":0},
			{"id":15,"name":"元器件","number":1000,"weight":0,"resourcesUsed":[{"id":4,"name":"塑料","number":30},{"id":12,"name":"硅","number":1}],"state":true,"canManufacture":true,"canBuy":true,"canUseToAdventure":false,"cost":0},
			{"id":16,"name":"太阳能板","number":0,"weight":0,"resourcesUsed":[{"id":12,"name":"硅","number":0},{"id":11,"name":"铅","number":0},{"id":4,"name":"塑料","number":0}],"state":true,"canManufacture":true,"canBuy":true,"canUseToAdventure":false,"cost":0},
			{"id":17,"name":"铁铲","number":0,"weight":0,"resourcesUsed":[{"id":5,"name":"铁","number":200},{"id":1,"name":"石头","number":80}],"state":true,"canManufacture":true,"canBuy":true,"canUseToAdventure":false,"cost":0},
			{"id":18,"name":"铁剑","number":0,"weight":1,"resourcesUsed":[{"id":5,"name":"铁","number":0},{"id":1,"name":"石头","number":0}],"state":true,"canManufacture":true,"canBuy":true,"canUseToAdventure":true,"cost":0},
			{"id":19,"name":"铁甲","number":0,"weight":3,"resourcesUsed":[{"id":5,"name":"铁","number":0},{"id":4,"name":"塑料","number":0}],"state":true,"canManufacture":true,"canBuy":true,"canUseToAdventure":true,"cost":0},
			{"id":20,"name":"钢铲","number":0,"weight":0,"resourcesUsed":[{"id":6,"name":"钢","number":200},{"id":1,"name":"石头","number":400}],"state":true,"canManufacture":true,"canBuy":true,"canUseToAdventure":false,"cost":0},
			{"id":21,"name":"钢剑","number":0,"weight":2,"resourcesUsed":[{"id":6,"name":"钢","number":0},{"id":1,"name":"石头","number":0}],"state":true,"canManufacture":true,"canBuy":true,"canUseToAdventure":true,"cost":0},
			{"id":22,"name":"钢甲","number":0,"weight":6,"resourcesUsed":[{"id":6,"name":"钢","number":0},{"id":4,"name":"塑料","number":0}],"state":true,"canManufacture":true,"canBuy":true,"canUseToAdventure":true,"cost":0},
			{"id":23,"name":"手电筒","number":0,"weight":1,"resourcesUsed":[{"id":4,"name":"塑料","number":50},{"id":14,"name":"电池","number":3},{"id":5,"name":"铁","number":0}],"state":true,"canManufacture":true,"canBuy":true,"canUseToAdventure":true,"cost":0},
			{"id":24,"name":"电钻","number":0,"weight":0,"resourcesUsed":[{"id":8,"name":"金刚","number":10},{"id":4,"name":"塑料","number":400},{"id":14,"name":"电池","number":5}],"state":true,"canManufacture":true,"canBuy":true,"canUseToAdventure":false,"cost":0},
			{"id":25,"name":"电击枪","number":0,"weight":1,"resourcesUsed":[{"id":4,"name":"塑料","number":0},{"id":14,"name":"电池","number":0}],"state":true,"canManufacture":true,"canBuy":true,"canUseToAdventure":true,"cost":0},
			{"id":26,"name":"太空车","number":0,"weight":0,"resourcesUsed":[{"id":6,"name":"钢","number":0},{"id":14,"name":"电池","number":0},{"id":4,"name":"塑料","number":0}],"state":true,"canManufacture":true,"canBuy":true,"canUseToAdventure":false,"cost":0},
			{"id":27,"name":"金刚甲","number":0,"weight":15,"resourcesUsed":[{"id":8,"name":"金刚","number":0},{"id":4,"name":"塑料","number":0}],"state":true,"canManufacture":true,"canBuy":true,"canUseToAdventure":true,"cost":0},
			{"id":28,"name":"金甲","number":0,"weight":30,"resourcesUsed":[{"id":7,"name":"金","number":0}],"state":true,"canManufacture":true,"canBuy":true,"canUseToAdventure":true,"cost":0},
			{"id":29,"name":"激光钻","number":0,"weight":0,"resourcesUsed":[{"id":33,"name":"外星科技","number":0},{"id":7,"name":"金","number":0}],"state":true,"canManufacture":true,"canBuy":true,"canUseToAdventure":false,"cost":0},
			{"id":30,"name":"激光剑","number":0,"weight":2,"resourcesUsed":[{"id":33,"name":"外星科技","number":0},{"id":6,"name":"钢","number":0}],"state":true,"canManufacture":true,"canBuy":true,"canUseToAdventure":true,"cost":0},
			{"id":31,"name":"太阳能车","number":0,"weight":0,"resourcesUsed":[{"id":16,"name":"太阳能板","number":0},{"id":6,"name":"钢","number":0},{"id":4,"name":"塑料","number":0}],"state":true,"canManufacture":true,"canBuy":true,"canUseToAdventure":false,"cost":0},
			{"id":32,"name":"飞船","number":0,"weight":0,"resourcesUsed":[{"id":33,"name":"外星科技","number":0},{"id":6,"name":"钢","number":0},{"id":13,"name":"铀","number":0}],"state":true,"canManufacture":true,"canBuy":true,"canUseToAdventure":false,"cost":0},
			{"id":33,"name":"外星科技","number":0,"weight":0,"resourcesUsed":0,"state":true,"canManufacture":false,"canBuy":false,"canUseToAdventure":true,"cost":0},
			{"id":34,"name":"生命之花","number":0,"weight":1,"resourcesUsed":0,"state":true,"canManufacture":false,"canBuy":false,"canUseToAdventure":true,"cost":0},
			{"id":35,"name":"急救包","number":0,"weight":1,"resourcesUsed":0,"state":true,"canManufacture":false,"canBuy":true,"canUseToAdventure":true,"cost":0}
			]
		var backPackData = this.creatBackPackData(articleData);
		
		var backPackInfo = {"maxWeight":100,"maxHP":20,"maxWater":20}
		
		var heroData = {"hp":1,"speed":1,"hit":1,"def":1,"str":10,"cri":0.1,"eva":0.1,"vam":1,"asp":1,}
		
		var monsterData = [
			//{"id":0,"name":"一截烂木桩","hp":9999,"hit":1,"def":1,"str":1,"cri":1,"eva":0,"vam":1,"asp":2,"drop":[{"id":0,"odds":0.5,"number":3},{"id":1,"odds":1,"number":1}]},
			{"id":0,"type":0,"name":"失了智的外星人","introduce":"这里有一个看起来不太正常的外星人","hp":40,"hit":1,"def":1,"str":1,"cri":1,"eva":0,"vam":1,"des":0.8,"asp":2,"drop":[{"id":0,"odds":0.5,"number":3},{"id":1,"odds":1,"number":1}]},
			{"id":1,"type":0,"name":"外出卖萌的风滚草","introduce":"地上有一个风滚草静静的躺在哪里","hp":40,"hit":1,"def":1,"str":1,"cri":1,"eva":0,"vam":1,"des":0.8,"asp":2,"drop":[{"id":0,"odds":0.5,"number":3},{"id":1,"odds":1,"number":1}]}
		]
		
		var personnelInfo = {"maxPersonNumber":10}
		
		var skillData = [
			{"id":0,"name":"潜行术","introduce":"遇敌率减半","state":true},
			{"id":1,"name":"千里眼","introduce":"视野加倍","state":true},
			{"id":2,"name":"会心一击","introduce":"伤害增加","state":true},
			{"id":3,"name":"凌波微步","introduce":"闪避率增加","state":true},
			{"id":4,"name":"百发百中","introduce":"命中率增加","state":true},
			{"id":5,"name":"细嚼慢咽","introduce":"食物消耗量降低","state":true},
			{"id":6,"name":"坚持不懈","introduce":"物资用尽后坚持的时间","state":true},
			{"id":7,"name":"身强力壮","introduce":"基础生命值增加","state":false}
		]
		var personnelData = [
			{"id":0,"name":"石矿工","number":5,"make":[{"name":"石头","number":1}],"consume":0,"state":true},
			{"id":1,"name":"垃圾工人","number":5,"make":[{"name":"垃圾","number":0.5,"tempNumber":0}],"consume":0,"state":true},
			{"id":2,"name":"石块工人","number":0,"make":[{"name":"石块","number":1}],"consume":[{"name":"石头","number":1}],"state":false},
			{"id":3,"name":"炼铁工人","number":0,"make":[{"name":"铁","number":1}],"consume":[{"name":"石头","number":3}],"state":false},
			{"id":4,"name":"塑料工人","number":0,"make":[{"name":"塑料","number":0.1,"tempNumber":0}],"consume":[{"name":"垃圾","number":1}],"state":false},
			{"id":5,"name":"炼钢工人","number":0,"make":[{"name":"钢","number":1}],"consume":[{"name":"铁","number":10},{"name":"石头","number":10}],"state":false},
			{"id":6,"name":"矿工","number":0,"make":[{"name":"矿石","number":1}],"consume":0,"state":false},
			{"id":7,"name":"炼金术师","number":0,"make":[{"name":"金子","number":0.1,"tempNumber":0}],"consume":[{"name":"石头","number":5}],"state":false},
			{"id":8,"name":"煤矿工","number":0,"make":[{"name":"煤","number":1}],"consume":0,"state":false},
		]
		
		var massageData = [
			{"id":0,"name":"missMassage","content":"oops!There is no massage."},
			{"id":1,"name":"添加能源","content":"你扔了个石头到能源转化炉，控制中心亮起来辣！"},
			{"id":2,"name":"收集石头","content":"你得到了一堆石头，最好休息一会"},
			{"id":3,"name":"收集垃圾","content":"你得到了很多垃圾，应该有一些用处"},
			{"id":4,"name":"石屋","content":"你们用石头搭了一个简易的小屋，可以在这加工石头"},
			{"id":5,"name":"小屋","content":"用石块建了一个漂亮的小屋，可以容纳更多的人了"},
			{"id":6,"name":"冒险","content":"你随时可以出去到较远的一些的地方，但是要知道外面会有很多未知的危险，并且那些难民帮不上你，他们似乎对外面的生物有着极大的恐惧，所以你只有一个人，你还必须要时刻注意所带的食物是否还足够。"},
			{"id":7,"name":"熔炉","content":"一个熔炉搭了起来，你需要一些煤来炼铁"},
			{"id":8,"name":"铁铲","content":"有了铁铲搜集石头的效率增加了许多"},
			{"id":9,"name":"塑料厂","content":"从垃圾中可以提取塑料，有着很大用途"},
			{"id":10,"name":"炼矿屋","content":"练矿屋可以利用矿石提取矿物"},
			{"id":11,"name":"4次小屋5s后","content":"食物的消耗开始过量了，可使用电池增加农场的产量。"},
			{"id":12,"name":"铁剑","content":"一把称手的兵器"},
			{"id":13,"name":"铁甲","content":"无人能挡"},
			{"id":14,"name":"手电筒","content":"可探索山洞，一次消耗一节电池"},
			{"id":15,"name":"炼钢炉","content":"大型厂房和更优质的设施用来炼造纯度更高的钢"},
			{"id":16,"name":"钢铲","content":"新的铲子锋利而又结实，工作效率大大加快"},
			{"id":17,"name":"太空车","content":"电力驱动的车子，冒险的路程变得简单多了，还可以用来运输垃圾"},
			{"id":18,"name":"钢剑","content":"更加的坚硬，更加的锋利"},
			{"id":19,"name":"钢甲","content":"无所畏惧"},
			{"id":20,"name":"炼金屋","content":"炼金术师的专用房间，工作的时候绝不会让别人看到"},
			{"id":21,"name":"实验室","content":"这意味着一个新的开始"}
		]
		
		var chillDownData = [
            {"name":"getEnergyButton","progress":0,"date":0},
            {"name":"collectStoneButton","progress":0,"date":0},
            {"name":"collectGarbageButton","progress":0,"date":0}
        ]
		
		var randomEventData = [
			{"id":0,"state":true,"scene":[{"name":"来访","content":"有一群外星人来到了你的基地门前，好像有什么事情。","option":[{"content":"派人上前询问","operation":["jumpTo"]}]},{"name":"请求","content":"外星人的领队告诉你：他们想向你们要些吃的。作为回报，他们会给你提供一些新奇的小玩意。","option":[{"content":"同意他们的请求(消耗100个面包)","operation":["getItem","jumpTo"]},{"content":"拒接他们的请求","operation":["jumpTo"]}]},{"name":"同意","content":"你同意了外星人领队的要求，他们很开心，并且兑现了他们的承诺：送给你1个外星科技。这时，有一个外星人神色有点不对。","option":[{"content":"收下礼物并且送他们离开","operation":["getItem","exitEvent"]},{"content":"收下礼物并亲自上前询问这个外星人","operation":["jumpTo"]}]},{"name":"拒绝","content":"你拒绝了他们的请求，这群外星人看着你冷漠的表情，什么都没说就离开了。","option":[{"content":"目送他们离去","operation":["exitEvent"]}]},{"name":"留下","content":"这个外星人是一个落魄的科学家，他很向往你基地的研究环境，希望可以留下来。","option":[{"content":"欢迎他的加入","operation":["getPerson","jumpTo"]},{"content":"你对他的才能很赞许，但是你还是婉拒了他的请求","operation":["jumpTo"]}]},{"name":"加入","content":"他很高兴，在和其他的外星人同伴一一告别后，他搬进了你的基地。","option":[{"content":"确定","operation":["exitEvent"]}]},{"name":"离开","content":"他失望了摇了摇头，跟上自己的同伴渐渐消失在了地平线...","option":[{"content":"确定","operation":["exitEvent"]}]}],"operation":{"getItem":[{"dependentScene":1,"dependentOption":0,"id":0,"number":-100},{"dependentScene":2,"dependentOption":0,"id":33,"number":1}],"getPerson":[{"dependentScene":4,"dependentOption":0,"id":7,"number":1}],"jumpTo":[{"dependentScene":0,"dependentOption":0,"id":1},{"dependentScene":1,"dependentOption":0,"id":2},{"dependentScene":1,"dependentOption":1,"id":3},{"dependentScene":2,"dependentOption":1,"id":4},{"dependentScene":4,"dependentOption":0,"id":5},{"dependentScene":4,"dependentOption":1,"id":6}]}},
			{"id":1,"state":true,"scene":[{"name":"来访","content":"叩叩叩 有人敲门","option":[{"content":"打开门","operation":["jumpTo"]},{"content":"不理他，回去睡觉","operation":["jumpTo"]}]},{"name":"惊讶","content":"一个可爱的小快递机器人 说你有份快递 说完之后突然像耗子一样窜进了门里 伴随着笑声","option":[{"content":"赶快阻止它","operation":["jumpTo"]},{"content":"停下好好观察它","operation":["jumpTo"]}]},{"name":"事故","content":"“抓不到我抓不到我”在东扑西找之后快递机器人又窜回门口，不料“咚”的一声撞在了门框上，撞掉了半个脑袋，整个身体开始抽搐。","option":[{"content":"救","operation":["jumpTo"]},{"content":"不救","operation":["jumpTo"]}]},{"name":"慌乱","content":"其实你并没有什么头绪，小机器人抖的螺丝掉了一地，你手足无措，怕是救不回来了。机器人的警示灯慢慢变红，一闪一闪。这时，门外走过一个年轻人...","option":[{"content":"向他求助","operation":["jumpTo"]}]},{"name":"急救","content":"你和年轻人一起把小机器人抬到了医院，说明了情况之后医生答应出手救治，但是需要一些材料和费用","option":[{"content":"给予所需（消耗10个元器件和100个金子）","operation":["jumpTo","getItem"]},{"content":"拒不交付","operation":["jumpTo"]}]},{"name":"平安","content":"医生治好了小机器人，对你说：“它很调皮但心地不坏，陪伴了我们很久，我们定期修理但还是阻止不了它的老化，谢谢你这次救了它。”","option":[{"content":"确定","operation":["jumpTo"]}]},{"name":"脱险","content":"原来是这样，你知道小机器人脱险之后就松了口气。机器人需要留在医院进行再一次的维修保养，于是你决定... ","option":[{"content":"回家","operation":["jumpTo"]},{"content":"等它出院","operation":["jumpTo"]}]},{"name":"康复","content":"等待了摸约一个小时以后，你在修复室门口看到了机器人，它探了探头看到你随即溜了过来，难得的安静乖巧。“谢谢你”它说，然后打开储物箱 翻了很久，翻出一支略枯萎了的花。“昨天还是很漂亮的，今天怎么就枯掉了。”小机器人懊恼的说。你笑了笑还是收下了，毕竟已经很久没见过花了。","option":[{"content":"告别小机器人","operation":["jumpTo"]}]},{"name":"道谢","content":"第二天,你又一次听到了敲门声。开门发现门口放着一个精致的礼物，你看了看，四下无人。你笑着摇了摇头","option":[{"content":"收下礼物","operation":["exitEvent","getItem"]}]},{"name":"尾声","content":"距那件事发生已经过去几天了，”不知道它现在怎么样了。“你自言自语到，随后走进了家门，然而你没有注意到，窗口放着那盆它送你的花朵 已经慢慢的恢复了生机...","option":[{"content":"确定","operation":["getItem","exitEvent"]}]},{"name":"平静","content":"你沉沉的睡了过去，门口的响动也渐渐小了下去","option":[{"content":"确定","operation":["exitEvent"]}]},{"name":"平静","content":"你摇了摇头，医生明白了你的意思，转身离开了，年轻人看了看你，同样离开了。你抿了抿嘴...","option":[{"content":"离开","operation":["exitEvent"]}]},{"name":"事故","content":"在发现你不为所动后，小机器人蹦跶的更欢实了，不料“咚”的一声撞在了门框上，撞掉了半个脑袋，整个身体开始抽搐。","option":[{"content":"救","operation":["jumpTo"]},{"content":"不救","operation":["jumpTo"]}]},{"name":"死去","content":"你看着小机器人颤抖的身体，没有动弹。渐渐的，它的身体慢慢平静下来，不再颤抖...","option":[{"content":"收拾残局","operation":["exitEvent"]}]}],"operation":{"getItem":[{"dependentScene":4,"dependentOption":0,"id":15,"number":-10},{"dependentScene":4,"dependentOption":0,"id":7,"number":-100},{"dependentScene":8,"dependentOption":0,"id":14,"number":10},{"dependentScene":8,"dependentOption":0,"id":15,"number":5},{"dependentScene":8,"dependentOption":0,"id":8,"number":10},{"dependentScene":9,"dependentOption":0,"id":34,"number":1}],"jumpTo":[{"dependentScene":0,"dependentOption":0,"id":1},{"dependentScene":0,"dependentOption":1,"id":10},{"dependentScene":1,"dependentOption":0,"id":2},{"dependentScene":1,"dependentOption":1,"id":12},{"dependentScene":2,"dependentOption":0,"id":3},{"dependentScene":2,"dependentOption":1,"id":13},{"dependentScene":3,"dependentOption":0,"id":4},{"dependentScene":4,"dependentOption":0,"id":5},{"dependentScene":4,"dependentOption":1,"id":11},{"dependentScene":5,"dependentOption":0,"id":6},{"dependentScene":6,"dependentOption":0,"id":8},{"dependentScene":6,"dependentOption":1,"id":7},{"dependentScene":7,"dependentOption":0,"id":9},{"dependentScene":12,"dependentOption":0,"id":3},{"dependentScene":12,"dependentOption":1,"id":13}]}},
			//{"id":2,"state":true,"scene":[{"name":"按钮禁用测试","content":"场景内容","option":[{"content":"消耗100个外星科技","operation":["getItem"]},{"content":"退出","operation":[]}]}],"operation":{"jumpTo":[{"dependentScene":0,"dependentOption":0,"id":1}],"getItem":[{"dependentScene":0,"dependentOption":0,"id":33,"number":-100}],"getPerson":[{"dependentScene":0,"dependentOption":0,"id":0,"number":1}],"unlockItem":[{"dependentScene":0,"dependentOption":0,"type":"skillData","id":1}]}}
		]
		
		var battleData = {
			"cave":[{"scene":[{"type":0,"name":"场景1-1","content":"场景1-1介绍"},{"type":1,"name":"场景1-2","content":"场景1-2介绍","drop":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}]},{"type":2,"name":"场景1-3","content":"场景1-3介绍","contentAfterGive":"场景1-3给了东西之后","need":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}],"monster":2}],"monster":[0,1]},{"scene":[{"type":0,"name":"场景2-1","content":"场景2-1介绍"},{"type":1,"name":"场景2-2","content":"场景2-2介绍","drop":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}]},{"type":2,"name":"场景2-3","content":"场景2-3介绍","contentAfterGive":"场景2-3给了东西之后","need":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}],"monster":2}],"monster":[0,1]},{"scene":[{"type":0,"name":"场景3-1","content":"场景3-1介绍"},{"type":1,"name":"场景3-2","content":"场景3-2介绍","drop":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}]},{"type":2,"name":"场景3-3","content":"场景3-3介绍","contentAfterGive":"场景3-3给了东西之后","need":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}],"monster":2}],"monster":[0,1]},{"scene":[{"type":0,"name":"场景4-1","content":"场景4-1介绍"},{"type":1,"name":"场景4-2","content":"场景4-2介绍","drop":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}]},{"type":2,"name":"场景4-3","content":"场景4-3介绍","contentAfterGive":"场景4-3给了东西之后","need":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}],"monster":2}],"monster":[0,1]},{"scene":[{"type":0,"name":"通关场景5-1","content":"通关场景5-1介绍"},{"type":1,"name":"通关场景5-2","content":"通关场景5-2介绍","drop":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}]},{"type":2,"name":"通关场景5-3","content":"通关场景5-3介绍","contentAfterGive":"通关场景5-3给了东西之后","need":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}],"monster":2}],"monster":[0,1]}],
			"batField":[{"scene":[{"type":0,"name":"场景1-1","content":"场景1-1介绍"},{"type":1,"name":"场景1-2","content":"场景1-2介绍","drop":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}]},{"type":2,"name":"场景1-3","content":"场景1-3介绍","contentAfterGive":"场景1-3给了东西之后","need":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}],"monster":2}],"monster":[0,1]},{"scene":[{"type":0,"name":"场景2-1","content":"场景2-1介绍"},{"type":1,"name":"场景2-2","content":"场景2-2介绍","drop":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}]},{"type":2,"name":"场景2-3","content":"场景2-3介绍","contentAfterGive":"场景2-3给了东西之后","need":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}],"monster":2}],"monster":[0,1]},{"scene":[{"type":0,"name":"场景3-1","content":"场景3-1介绍"},{"type":1,"name":"场景3-2","content":"场景3-2介绍","drop":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}]},{"type":2,"name":"场景3-3","content":"场景3-3介绍","contentAfterGive":"场景3-3给了东西之后","need":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}],"monster":2}],"monster":[0,1]},{"scene":[{"type":0,"name":"场景4-1","content":"场景4-1介绍"},{"type":1,"name":"场景4-2","content":"场景4-2介绍","drop":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}]},{"type":2,"name":"场景4-3","content":"场景4-3介绍","contentAfterGive":"场景4-3给了东西之后","need":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}],"monster":2}],"monster":[0,1]},{"scene":[{"type":0,"name":"通关场景5-1","content":"通关场景5-1介绍"},{"type":1,"name":"通关场景5-2","content":"通关场景5-2介绍","drop":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}]},{"type":2,"name":"通关场景5-3","content":"通关场景5-3介绍","contentAfterGive":"通关场景5-3给了东西之后","need":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}],"monster":2}],"monster":[0,1]}],
			"crater":[{"scene":[{"type":0,"name":"场景1-1","content":"场景1-1介绍"},{"type":1,"name":"场景1-2","content":"场景1-2介绍","drop":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}]},{"type":2,"name":"场景1-3","content":"场景1-3介绍","contentAfterGive":"场景1-3给了东西之后","need":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}],"monster":2}],"monster":[0,1]},{"scene":[{"type":0,"name":"场景2-1","content":"场景2-1介绍"},{"type":1,"name":"场景2-2","content":"场景2-2介绍","drop":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}]},{"type":2,"name":"场景2-3","content":"场景2-3介绍","contentAfterGive":"场景2-3给了东西之后","need":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}],"monster":2}],"monster":[0,1]},{"scene":[{"type":0,"name":"场景3-1","content":"场景3-1介绍"},{"type":1,"name":"场景3-2","content":"场景3-2介绍","drop":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}]},{"type":2,"name":"场景3-3","content":"场景3-3介绍","contentAfterGive":"场景3-3给了东西之后","need":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}],"monster":2}],"monster":[0,1]},{"scene":[{"type":0,"name":"场景4-1","content":"场景4-1介绍"},{"type":1,"name":"场景4-2","content":"场景4-2介绍","drop":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}]},{"type":2,"name":"场景4-3","content":"场景4-3介绍","contentAfterGive":"场景4-3给了东西之后","need":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}],"monster":2}],"monster":[0,1]},{"scene":[{"type":0,"name":"通关场景5-1","content":"通关场景5-1介绍"},{"type":1,"name":"通关场景5-2","content":"通关场景5-2介绍","drop":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}]},{"type":2,"name":"通关场景5-3","content":"通关场景5-3介绍","contentAfterGive":"通关场景5-3给了东西之后","need":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}],"monster":2}],"monster":[0,1]}],
			"batBase":[{"scene":[{"type":0,"name":"场景1-1","content":"场景1-1介绍"},{"type":1,"name":"场景1-2","content":"场景1-2介绍","drop":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}]},{"type":2,"name":"场景1-3","content":"场景1-3介绍","contentAfterGive":"场景1-3给了东西之后","need":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}],"monster":2}],"monster":[0,1]},{"scene":[{"type":0,"name":"场景2-1","content":"场景2-1介绍"},{"type":1,"name":"场景2-2","content":"场景2-2介绍","drop":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}]},{"type":2,"name":"场景2-3","content":"场景2-3介绍","contentAfterGive":"场景2-3给了东西之后","need":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}],"monster":2}],"monster":[0,1]},{"scene":[{"type":0,"name":"场景3-1","content":"场景3-1介绍"},{"type":1,"name":"场景3-2","content":"场景3-2介绍","drop":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}]},{"type":2,"name":"场景3-3","content":"场景3-3介绍","contentAfterGive":"场景3-3给了东西之后","need":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}],"monster":2}],"monster":[0,1]},{"scene":[{"type":0,"name":"场景4-1","content":"场景4-1介绍"},{"type":1,"name":"场景4-2","content":"场景4-2介绍","drop":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}]},{"type":2,"name":"场景4-3","content":"场景4-3介绍","contentAfterGive":"场景4-3给了东西之后","need":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}],"monster":2}],"monster":[0,1]},{"scene":[{"type":0,"name":"通关场景5-1","content":"通关场景5-1介绍"},{"type":1,"name":"通关场景5-2","content":"通关场景5-2介绍","drop":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}]},{"type":2,"name":"通关场景5-3","content":"通关场景5-3介绍","contentAfterGive":"通关场景5-3给了东西之后","need":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}],"monster":2}],"monster":[0,1]}],
			"batRes":[{"scene":[{"type":0,"name":"场景1-1","content":"场景1-1介绍"},{"type":1,"name":"场景1-2","content":"场景1-2介绍","drop":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}]},{"type":2,"name":"场景1-3","content":"场景1-3介绍","contentAfterGive":"场景1-3给了东西之后","need":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}],"monster":2}],"monster":[0,1]},{"scene":[{"type":0,"name":"场景2-1","content":"场景2-1介绍"},{"type":1,"name":"场景2-2","content":"场景2-2介绍","drop":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}]},{"type":2,"name":"场景2-3","content":"场景2-3介绍","contentAfterGive":"场景2-3给了东西之后","need":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}],"monster":2}],"monster":[0,1]},{"scene":[{"type":0,"name":"场景3-1","content":"场景3-1介绍"},{"type":1,"name":"场景3-2","content":"场景3-2介绍","drop":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}]},{"type":2,"name":"场景3-3","content":"场景3-3介绍","contentAfterGive":"场景3-3给了东西之后","need":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}],"monster":2}],"monster":[0,1]},{"scene":[{"type":0,"name":"场景4-1","content":"场景4-1介绍"},{"type":1,"name":"场景4-2","content":"场景4-2介绍","drop":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}]},{"type":2,"name":"场景4-3","content":"场景4-3介绍","contentAfterGive":"场景4-3给了东西之后","need":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}],"monster":2}],"monster":[0,1]},{"scene":[{"type":0,"name":"通关场景5-1","content":"通关场景5-1介绍"},{"type":1,"name":"通关场景5-2","content":"通关场景5-2介绍","drop":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}]},{"type":2,"name":"通关场景5-3","content":"通关场景5-3介绍","contentAfterGive":"通关场景5-3给了东西之后","need":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}],"monster":2}],"monster":[0,1]}],
			"batPortal":[{"scene":[{"type":0,"name":"场景1-1","content":"场景1-1介绍"},{"type":1,"name":"场景1-2","content":"场景1-2介绍","drop":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}]},{"type":2,"name":"场景1-3","content":"场景1-3介绍","contentAfterGive":"场景1-3给了东西之后","need":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}],"monster":2}],"monster":[0,1]},{"scene":[{"type":0,"name":"场景2-1","content":"场景2-1介绍"},{"type":1,"name":"场景2-2","content":"场景2-2介绍","drop":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}]},{"type":2,"name":"场景2-3","content":"场景2-3介绍","contentAfterGive":"场景2-3给了东西之后","need":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}],"monster":2}],"monster":[0,1]},{"scene":[{"type":0,"name":"场景3-1","content":"场景3-1介绍"},{"type":1,"name":"场景3-2","content":"场景3-2介绍","drop":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}]},{"type":2,"name":"场景3-3","content":"场景3-3介绍","contentAfterGive":"场景3-3给了东西之后","need":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}],"monster":2}],"monster":[0,1]},{"scene":[{"type":0,"name":"场景4-1","content":"场景4-1介绍"},{"type":1,"name":"场景4-2","content":"场景4-2介绍","drop":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}]},{"type":2,"name":"场景4-3","content":"场景4-3介绍","contentAfterGive":"场景4-3给了东西之后","need":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}],"monster":2}],"monster":[0,1]},{"scene":[{"type":0,"name":"通关场景5-1","content":"通关场景5-1介绍"},{"type":1,"name":"通关场景5-2","content":"通关场景5-2介绍","drop":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}]},{"type":2,"name":"通关场景5-3","content":"通关场景5-3介绍","contentAfterGive":"通关场景5-3给了东西之后","need":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}],"monster":2}],"monster":[0,1]}],
			"alienBase":[{"scene":[{"type":0,"name":"场景1-1","content":"场景1-1介绍"},{"type":1,"name":"场景1-2","content":"场景1-2介绍","drop":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}]},{"type":2,"name":"场景1-3","content":"场景1-3介绍","contentAfterGive":"场景1-3给了东西之后","need":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}],"monster":2}],"monster":[0,1]},{"scene":[{"type":0,"name":"场景2-1","content":"场景2-1介绍"},{"type":1,"name":"场景2-2","content":"场景2-2介绍","drop":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}]},{"type":2,"name":"场景2-3","content":"场景2-3介绍","contentAfterGive":"场景2-3给了东西之后","need":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}],"monster":2}],"monster":[0,1]},{"scene":[{"type":0,"name":"场景3-1","content":"场景3-1介绍"},{"type":1,"name":"场景3-2","content":"场景3-2介绍","drop":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}]},{"type":2,"name":"场景3-3","content":"场景3-3介绍","contentAfterGive":"场景3-3给了东西之后","need":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}],"monster":2}],"monster":[0,1]},{"scene":[{"type":0,"name":"场景4-1","content":"场景4-1介绍"},{"type":1,"name":"场景4-2","content":"场景4-2介绍","drop":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}]},{"type":2,"name":"场景4-3","content":"场景4-3介绍","contentAfterGive":"场景4-3给了东西之后","need":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}],"monster":2}],"monster":[0,1]},{"scene":[{"type":0,"name":"通关场景5-1","content":"通关场景5-1介绍"},{"type":1,"name":"通关场景5-2","content":"通关场景5-2介绍","drop":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}]},{"type":2,"name":"通关场景5-3","content":"通关场景5-3介绍","contentAfterGive":"通关场景5-3给了东西之后","need":[{"id":5,"odds":0.5,"number":5},{"id":9,"odds":0.5,"number":4}],"monster":2}],"monster":[0,1]}],
			}
		//{"cave":[{"scene":[{"name":"潮湿的洞穴","content":"这个洞穴那可是相当的潮湿"},{"name":"奇怪的洞穴","content":"洞穴中充满了各种奇怪的光晕，折射出一片很漂亮的景象"}],"monster":[1,2]},{"scene":[{"name":"潮湿的洞穴","content":"这个洞穴那可是相当的潮湿"},{"name":"奇怪的洞穴","content":"洞穴中充满了各种奇怪的光晕，折射出一片很漂亮的景象"}],"monster":[1,2]},{"scene":[{"name":"潮湿的洞穴","content":"这个洞穴那可是相当的潮湿"},{"name":"奇怪的洞穴","content":"洞穴中充满了各种奇怪的光晕，折射出一片很漂亮的景象"}],"monster":[1,2]},{"scene":[{"name":"潮湿的洞穴","content":"这个洞穴那可是相当的潮湿"},{"name":"奇怪的洞穴","content":"洞穴中充满了各种奇怪的光晕，折射出一片很漂亮的景象"}],"monster":[1,2]}],"batField":[],"crater":[],"batBase":[],"batRes":[],"batPortal":[],"alienBase":[]}
		
		cc.sys.localStorage.setItem("buildData",JSON.stringify(buildData));
		cc.sys.localStorage.setItem("articleData",JSON.stringify(articleData));
		cc.sys.localStorage.setItem("backPackData",JSON.stringify(backPackData));
		cc.sys.localStorage.setItem("skillData",JSON.stringify(skillData));
		cc.sys.localStorage.setItem("personnelData",JSON.stringify(personnelData));
		cc.sys.localStorage.setItem("backPackInfo",JSON.stringify(backPackInfo));
		cc.sys.localStorage.setItem("heroData",JSON.stringify(heroData));
		cc.sys.localStorage.setItem("monsterData",JSON.stringify(monsterData));
		cc.sys.localStorage.setItem("personnelInfo",JSON.stringify(personnelInfo));
		cc.sys.localStorage.setItem("massageData",JSON.stringify(massageData));
		cc.sys.localStorage.setItem("chillDownData",JSON.stringify(chillDownData));
		cc.sys.localStorage.setItem("randomEventData",JSON.stringify(randomEventData));
		cc.sys.localStorage.setItem("battleData",JSON.stringify(battleData));
		
		cc.log("reset complete");
	},
	
	creatBackPackData: function(articleData) {
	    var _backPackData = [];
	    var id = 0;
        for(var i = 0; i < articleData.length; ++i) {
			if(articleData[i].canUseToAdventure) {
				var canUseToHealing = false;
				var healingValue = 0;
				
				switch(articleData[i].id) {
				    case 0: 
				        canUseToHealing = true;
				        healingValue = 5;
				    break;
				    case 35:
				        canUseToHealing = true;
				        healingValue = 15;
				    break;
				}
				var itemData = {
					"id": id++,
					"articleId": articleData[i].id,
					"name": articleData[i].name,
					"number": 0,
					"weight": articleData[i].weight,
					"canUseToHealing":canUseToHealing,
					"healingValue": healingValue,
				};
				_backPackData.push(itemData);
				cc.log('id: ' + itemData.id);
				cc.log('name: ' + itemData.name);
			}
		}
		return _backPackData;
	},
	
	showJSON:function(){
		var buildData = JSON.parse(cc.sys.localStorage.getItem("buildData"));
		cc.log("buildData");
		cc.log(buildData);
		
		var articleData = JSON.parse(cc.sys.localStorage.getItem("articleData"));
		cc.log("articleDataData:");
		cc.log(articleData);
		
		var backPackData = JSON.parse(cc.sys.localStorage.getItem("backPackData"));
		cc.log("backPackData:");
		cc.log(backPackData);
		
		var skillData = JSON.parse(cc.sys.localStorage.getItem("skillData"));
		cc.log("skillData");
		cc.log(skillData);
		
		var personnelData = JSON.parse(cc.sys.localStorage.getItem("personnelData"));
		cc.log("personnelData");
		cc.log(personnelData);
		
		var backPackInfo = JSON.parse(cc.sys.localStorage.getItem("backPackInfo"));
		cc.log("backPackInfo");
		cc.log(backPackInfo);
		
		var heroData = JSON.parse(cc.sys.localStorage.getItem("heroData"));
		cc.log("heroData");
		cc.log(heroData);
		
		var monsterData = JSON.parse(cc.sys.localStorage.getItem("monsterData"));
		cc.log("monsterData");
		cc.log(monsterData);
		
		var personnelInfo = JSON.parse(cc.sys.localStorage.getItem("personnelInfo"));
		cc.log("personnelInfo");
		cc.log(personnelInfo);
		
		var massageData = JSON.parse(cc.sys.localStorage.getItem("massageData"));
		cc.log("massageData");
		cc.log(massageData);
		
		var chillDownData = JSON.parse(cc.sys.localStorage.getItem("chillDownData"));
		cc.log("chillDownData");
		cc.log(chillDownData);
		
		var battleData = JSON.parse(cc.sys.localStorage.getItem("battleData"));
		cc.log("battleData");
		cc.log(battleData);
	},
});
