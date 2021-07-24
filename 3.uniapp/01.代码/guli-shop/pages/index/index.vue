<template>
	<view class="indexContainer">
		<view class="header">
			<image class="logo" src="../../static/images/logo.png" mode=""></image>
			<view class="search">
				<view class="iconfont icon-sousuo"></view>
				<input class="seachInput" type="text" value="" placeholder-class="placeholder"  placeholder="搜索商品"/>
			</view>
			<button class="username">七月</button>
		</view>
		
		<scroll-view 
		class="navScroll" 
		scroll-x="true" 
		enable-flex="true" 
		v-if="indexData.kingKongModule">
			<view 
			class="navItem" 
			:class="currentIndex===-1?'active':''"
			@click="changeCurrentIndex(-1)">推荐</view>
			<view 
			class="navItem" 
			:class="currentIndex===index?'active':''"
			v-for="(item,index) in indexData.kingKongModule.kingKongList" 
			:key="item.L1Id"
			@click="changeCurrentIndex(index)"
			>{{item.text}}</view>
		</scroll-view>
		
		<scroll-view class="contentScroll" scroll-y="true">
			<Recommend v-if="currentIndex === -1"/>
			<CateList :navIndex="currentIndex" v-else/>
		</scroll-view>
		
	</view>
	
	
	
	<!-- 首先,uniapp支持小程序和h5的标签,但是对小程序的标签支持的比较好-->
	<!-- <div>indexContainer1</div> -->
	<!-- <div>
	<i>123</i>
	<i>123</i>
	</div> -->
</template>

<script>
	import {mapState} from 'vuex';
	import req from '../../utils/req.js';
	import Recommend from '../../components/Recommend/Recommend.vue';
	import CateList from '../../components/CateList/CateList.vue';
	export default {
		data() {
			return {
				title :'Hello',
				// indexData:{},
				currentIndex:-1
			}
		},
		// uniapp支持小程序的生命周期,也支持Vue的声明周期
		// 个人建议使用Vue的
		async mounted(){
			// console.log('mounted')
			/*
				1.在哪发
					mounted
				2.怎么发
					使用request方法
					此处会发现,uniapp兼容小程序的API
					但是推荐使用uni,因为uni是全局对象,uniapp根据当前运行环境,进行多端的适配
					例如:uni.request在小程序上就是wx.request,在h5上就是ajax
				3.往哪发
					自己创建的服务器和路由接口
			*/
		   // uni.request({
			  //  // url:"/api/getIndexData",
			  //  url:"http://localhost:3001/getIndexData",
			  //  success:(res)=>{
					// // console.log('res',res)
					// this.indexData = res.data;
			  //  }
		   // })
			// console.log('$store',this.$store.state.home.initData)
			// const result =await req("/getIndexData");
			// this.indexData = result;
			this.$store.dispatch('getIndexData');
		},
		// onLoad() {
		// 	console.log('onLoad')
		// },
		methods :{
			changeCurrentIndex(index){
				this.currentIndex = index;
			}
		},
		computed:{
			// indexData(){
			// 	return this.$store.state.home.indexData
			// }
			...mapState({
				indexData:state=>state.home.indexData
			})
			// mapState(["indexData"])
		},
		components:{
			CateList,
			Recommend
		}
	}
</script>

<!-- stylus特点
	1.stylus可以不写{},用tab缩进来确定层级关系
	2.不需要写;
	3.不需要写:
	注意:stylus兼容less语法
	
	想使用less或者stylus,必须做的事情,安装loader
	流程:工具->插件安装->less编译或者stylus编译
 -->
<style lang="stylus">
	.indexContainer
		.header
			display flex
			align-items  center
			padding-top 20upx
			.logo
				width 118upx
				height 40upx
				margin  0 20upx
				flex-shrink  0
			.search
				background #ccc
				height 60upx
				flex-grow 1
				flex-shrink  1
				position relative
				padding-left 60upx
				border-radius 15upx
				.iconfont
					position absolute
					left 20upx
					top 50%
					transform translateY(-50%)
				.seachInput
					font-size 24upx
					.placeholder
						text-align center
						text-indent -60upx
			.username
				width 130upx
				height 60upx
				font-size 26upx
				line-height 60upx
				color red
				flex-shrink  0
				margin  0 20upx
		.navScroll
			// display flex
			white-space nowrap
			.navItem
				display inline-block
				width 140upx
				height 80upx
				font-size 28upx
				text-align center
				line-height 80upx
				&.active
					border-bottom 3upx solid red
		.contentScroll
			// 小程序height计算:height = 屏幕百分百高度 - header高度 - nav高度
			// h5项目height计算:height = 屏幕百分百高度 - header高度 - nav高度 - 导航栏高度 - tabBar高度
			// height calc(100vh - 80upx - 83upx - var(--window-top) - var(--window-bottom))
			/* #ifdef H5 */
			height calc(100vh - 80upx - 83upx - 88upx - 100upx)
			/* #endif */
			/* #ifdef MP-WEIXIN */
			height calc(100vh - 80upx - 83upx)
			/* #endif */
</style>
