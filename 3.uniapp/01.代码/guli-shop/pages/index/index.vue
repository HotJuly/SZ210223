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
	</view>
	
	
	<!-- 首先,uniapp支持小程序和h5的标签,但是对小程序的标签支持的比较好-->
	<!-- <div>indexContainer1</div> -->
	<!-- <div>
	<i>123</i>
	<i>123</i>
	</div> -->
</template>

<script>
	export default {
		data() {
			return {
				title :'Hello'
			}
		},
		onLoad() {

		},
		methods :{

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
</style>
