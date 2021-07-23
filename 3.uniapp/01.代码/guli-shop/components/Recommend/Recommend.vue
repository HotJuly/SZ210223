<template>
	<view class="recommendContainer">
		<swiper class="bannerSwiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item class="bannerItem">
				<image class="bannerImg" src="/static/images/index/1.webp" mode=""></image>
			</swiper-item>
			<swiper-item class="bannerItem">
				<image class="bannerImg"  src="/static/images/index/2.webp" mode=""></image>
			</swiper-item>
			<swiper-item class="bannerItem">
				<image class="bannerImg"  src="/static/images/index/3.webp" mode=""></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default{
		name:"recommend"
	}
</script>

<style lang="stylus">
	.recommendContainer
		.bannerSwiper
			height 300upx
			.bannerItem
				.bannerImg
					width 100%
					height 100%
</style>
