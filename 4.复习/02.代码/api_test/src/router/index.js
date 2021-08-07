import Vue from 'vue';
import VueRouter from 'vue-router';
import MyRouter from '../myRouter';
import routes from './routes.js';


// Vue.use(VueRouter);
// export default new VueRouter({
//     mode:"history",
//     routes
// })


Vue.use(MyRouter);
export default new MyRouter({
    routes
})