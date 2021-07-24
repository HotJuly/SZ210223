<script>
	import req from './utils/req.js';
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef MP-WEIXIN
			wx.login({
				async success({code}){
					// code使用户登录之后的临时凭证,可以通过他换取用户唯一标识openid
					// 注意:code每次获取都不一样
					// console.log(code)
					const result = await req('/getOpenId',{code});
					// console.log(result)
					uni.setStorage({
						key:"token",
						data:result
					});
				}
			})
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="stylus">
	@import url('/static/iconfont/iconfont.styl')
	page
		height 100%
	/*每个页面公共css */
</style>
