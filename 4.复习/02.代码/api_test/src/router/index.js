import Vue from 'vue';
// import VueRouter from 'vue-router';
import MyRouter from '../myRouter';
import routes from './routes.js';

console.log(2222)
Vue.use(MyRouter);

// export default new VueRouter({
//     mode:"history",
//     routes
// })
console.log(1234)
export default new MyRouter({
    routes
})