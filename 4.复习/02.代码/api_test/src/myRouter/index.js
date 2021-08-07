import Vue from 'vue';
import install from './install';

function deepMapRoutes(routes){
    routes.forEach((route)=>{
        this[route.path] = route.component;
        if(route.children instanceof Array&&route.children.length>0){
            deepMapRoutes.call(this,route.children);
        }
    })
}

class MyRouter{
    constructor(options){
        this.routes = options.routes;

        // 这用于存储映射路由
        this.mapRoutes = {};

        this.history = window.history;

        /*  var path = "/about";
         [
             {
                 path:"/home",
                 component:"Home",
                 children:[
                    {
                        path:"/home/xixi",
                        component:"XIXI"
                    }
                 ]
             },
             {
                 path:"/about",
                 component:"About"
             }
         ]
         find

            转换结构
            {
                "/home":Home,
                "/about":About,
                "/home/xixi":XIXI
            }
            obj[path]
        */

        // 通过该函数,将routes数组处理成较为方便读取的结构
        deepMapRoutes.call(this.mapRoutes,this.routes);
        // console.log('mapRoutes',this.mapRoutes);

        // 给Vue原型链提供两个核心对象
        Vue.prototype.$router = this;
        // 此处将$route从一个普通对象,变成响应式对象,以后如果有修改该对象的path属性,会直接导致router-view组件重新渲染
        Vue.prototype.$route = Vue.observable({
            path:window.location.pathname
        })

        // 监视浏览器的前进后退按钮
        window.addEventListener('popstate',function(){
            
            // 当用户 点击前进或者后退按钮导致地址发生变化,将当前最新地址传给响应式属性
            // 修改响应式属性的值,可以促使router-view组件渲染出最新的路由组件
            Vue.prototype.$route.path = window.location.pathname;
        })
    }
    push(path){
        // 通过pushState方法控制页面地址栏的变化
        this.history.pushState({},"",path)

        // 修改响应式属性的值,可以促使router-view组件渲染出最新的路由组件
        Vue.prototype.$route.path = path;
    }
}

// var router = new MyRouter({
//     routes:[
//         {
//             path:"/home",
//             component:"Home",
//             children:[
//                {
//                    path:"/home/xixi",
//                    component:"XIXI"
//                }
//             ]
//         },
//         {
//             path:"/about",
//             component:"About"
//         }
//     ]
// })

MyRouter.install = install;

export default MyRouter