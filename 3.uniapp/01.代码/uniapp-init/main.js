import Vue from 'vue'
import App from './App'

// 关闭Vue的警告提示
Vue.config.productionTip = false

// mp->mini program type->类型
// 告知uniapp,App组件代表整个小程序(应用)
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
