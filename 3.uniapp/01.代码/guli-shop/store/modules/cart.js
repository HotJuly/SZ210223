import Vue from 'vue';
const state = {
	cartList:[{
		"selected":true,
		"count":3,
        "promId": 0,
        "showPoints": false,
        "itemTagList": [
            {
                "itemId": 1535004,
                "tagId": 128111157,
                "freshmanExclusive": false,
                "name": "暖冬特惠",
                "subType": 204,
                "forbidJump": false,
                "type": 2
            }
        ],
        "rank": 1,
        "id": 1535004,
        "sellVolume": 4001,
        "primaryPicUrl": "https://yanxuan-item.nosdn.127.net/f79906f1b1fe86420ea40473de66ec0e.png",
        "soldOut": false,
        "sortFlag": 0,
        "commentCount": 0,
        "onSaleTime": 1538101761748,
        "picMode": 1,
        "commentWithPicCount": 0,
        "underShelf": false,
        "status": 2,
        "couponConflict": true,
        "forbiddenBuy": false,
        "promotionDesc": "暖冬特惠",
        "limitedFlag": 204,
        "pieceNum": 0,
        "itemSizeTableDetailFlag": false,
        "forbidExclusiveCal": false,
        "rewardShareFlag": false,
        "updateTime": 1575893634989,
        "showCommentEntrance": true,
        "pieceUnitDesc": "件",
        "specialPromTag": "",
        "counterPrice": 299,
        "categoryL2Id": 0,
        "retailPrice": 209,
        "primarySkuPreSellPrice": 0,
        "preLimitFlag": 0,
        "itemPromValid": true,
        "promTag": "暖冬特惠",
        "source": 0,
        "points": 0,
        "primarySkuPreSellStatus": 0,
        "extraServiceFlag": 0,
        "flashPageLink": "",
        "autoOnsaleTimeLeft": 0,
        "innerData": {},
        "saleCenterSkuId": 0,
        "pointsStatus": 0,
        "extraPrice": "",
        "colorNum": 0,
        "showTime": 0,
        "autoOnsaleTime": 0,
        "preemptionStatus": 1,
        "isPreemption": 0,
        "zcSearchFlag": false,
        "name": "男式色拉姆内衣套装2.0",
        "appExclusiveFlag": false,
        "itemType": 1,
        "listPicUrl": "https://yanxuan-item.nosdn.127.net/c2eeb1b872af1b8efc179a7515aacdaa.png",
        "pointsPrice": 0,
        "simpleDesc": "色拉姆发热面料，加厚升级",
        "seoTitle": "",
        "newItemFlag": false,
        "buttonType": 0,
        "primarySkuId": 1636062,
        "displaySkuId": 1636056,
        "productPlace": "",
        "itemSizeTableFlag": false
    },
    {
		"selected":false,
		"count":7,
        "promId": 0,
        "showPoints": false,
        "itemTagList": [
            {
                "itemId": 1536001,
                "tagId": 128111157,
                "freshmanExclusive": false,
                "name": "暖冬特惠",
                "subType": 204,
                "forbidJump": false,
                "type": 2
            }
        ],
        "rank": 1,
        "id": 1536001,
        "sellVolume": 3634,
        "primaryPicUrl": "https://yanxuan-item.nosdn.127.net/32b8b2d07b1c4327593a4a70993eeac2.png",
        "soldOut": false,
        "sortFlag": 0,
        "commentCount": 0,
        "onSaleTime": 1538101896296,
        "picMode": 1,
        "commentWithPicCount": 0,
        "underShelf": false,
        "status": 2,
        "couponConflict": true,
        "forbiddenBuy": false,
        "promotionDesc": "暖冬特惠",
        "limitedFlag": 204,
        "pieceNum": 0,
        "itemSizeTableDetailFlag": false,
        "forbidExclusiveCal": false,
        "rewardShareFlag": false,
        "updateTime": 1575894115275,
        "showCommentEntrance": true,
        "pieceUnitDesc": "件",
        "specialPromTag": "",
        "counterPrice": 299,
        "categoryL2Id": 0,
        "retailPrice": 209,
        "primarySkuPreSellPrice": 0,
        "preLimitFlag": 0,
        "itemPromValid": true,
        "promTag": "暖冬特惠",
        "source": 0,
        "points": 0,
        "primarySkuPreSellStatus": 0,
        "extraServiceFlag": 0,
        "flashPageLink": "",
        "autoOnsaleTimeLeft": 0,
        "innerData": {},
        "saleCenterSkuId": 0,
        "pointsStatus": 0,
        "extraPrice": "",
        "colorNum": 0,
        "showTime": 0,
        "autoOnsaleTime": 0,
        "preemptionStatus": 1,
        "isPreemption": 0,
        "zcSearchFlag": false,
        "name": "女式色拉姆内衣套装2.0",
        "appExclusiveFlag": false,
        "itemType": 1,
        "listPicUrl": "https://yanxuan-item.nosdn.127.net/02b61fb5700aed6761b7524d98ed0837.png",
        "pointsPrice": 0,
        "simpleDesc": "色拉姆发热面料，加厚升级",
        "seoTitle": "",
        "newItemFlag": false,
        "buttonType": 0,
        "primarySkuId": 1634105,
        "displaySkuId": 1634104,
        "productPlace": "",
        "itemSizeTableFlag": false
    }
    ]
};

const mutations = {
	ADDSHOPITEMMUTATION(state,good){
		/*
			如果当前商品在购物车中不存在,需要将商品添加到购物车中
			如果当前商品在购物车中已经存在,只需要将该商品的数量+1即可
		*/
		// console.log('ADDSHOPITEMMUTATION')
		const cartList= state.cartList;
		const shopItem = cartList.find((shopItem)=>{
			return shopItem.id === good.id
		})
		
		if(shopItem){
			// console.log("+1",shopItem)
			shopItem.count+=1;
		}else{
			// good.count = 1;
			Vue.set(good,"count",1);
			// console.log("=1",good)
			cartList.push(good);
		}
	},
	CHANGECOUNTMUTATION(state,{index,flag}){
		// console.log(index,flag)
		/*
			如果商品数量大于1,那么本次操作就减少一个
			如果商品数量等于1,那么本此操作就将该商品删除
		*/
	   if(flag){
		state.cartList[index].count+=1;
	   }else{
		   if(state.cartList[index].count>1){
				state.cartList[index].count-=1;
		   }else{
				state.cartList.splice(index,1);
		   }
	   }
	},
	CHANGESELECTEDMUTATION(state,{selected,index}){
		state.cartList[index].selected = selected;
	},
	SELECTALLMUTATION(state,selected){
		state.cartList.forEach((shopItem)=>{
			shopItem.selected = selected
		})
	}
}

const actions = {
}

const getters = {
	isSelectedAll(state){
		/*
			1.返回值布尔值
			2.如果购物车列表中,所有商品都是选中状态,那么返回true
			3.如果购物车中,有至少一个商品是未选中状态,那么返回false
			4.如果购物车中没有商品,返回false
		*/
	   // state.cartList.some((shopItem)=>{
		  //  return !shopItem.selected
	   // })
	   if(!state.cartList.length)return false;
	   const result = state.cartList.every((shopItem)=>{
		   return shopItem.selected
	   })
	   return result;
	}
}

export default{
	state,
	mutations,
	actions,
	getters
}