import Vue from 'vue';
export default {
    name:"RouterView",
    functional:true,
    render:(_,{parent})=>{
        // 用于获取父组件的创建虚拟DOM方法
        const createElement = parent.$createElement;

        const path = Vue.prototype.$route.path;

        const component = Vue.prototype.$router.mapRoutes[path];

        return createElement(component)
    }
}