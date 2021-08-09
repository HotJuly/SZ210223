import {jia} from './lodash';
// import jquery from 'jquery';
// console.log('这是main.js',jquery);
console.log('lodash',jia(1,6));

document.querySelector('#app').onclick=function(){
    // console.log(import("jquery"))
    import(/* webpackChunkName:"jq" */"jquery").then((jquery)=>{
        console.log('这是main.js',jquery);
    })
}