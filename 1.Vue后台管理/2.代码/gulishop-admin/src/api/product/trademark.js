import request from '@/utils/request';

export default 100;

export const a = 100;
export const b = 200;

/*
一共有几种模块化语法:4种
    1.commonjs->仅用于Node
    2.AMD->运用于浏览器
    3.CMD->运用于浏览器
    4.ES6 modules

es6模块化语法关键字:
    1.import
    2.export
    3.default

es6暴露方式:
    1.默认暴露      =>暴露出去的是什么东西?     对象
        export default 100;

        真正暴露的内容:对象
            {
                default:100
            }
        引入方式

        完整语法:import {default as a} from './path'
        简写语法:import a from './path'

    2.分别暴露      =>暴露出去的是什么东西?     对象
        export const a = 100;
        export const b = 100;

        真正暴露的内容:对象
            {
                a:100,
                b:200
            }

        引入方式
        完整语法:import * as obj from './path'
        简写语法:import {a,b} from './path'

        问题:分别暴露和默认暴露可不可以同时使用?
        export default 100;
        export const a = 100;
        export const b = 100;

        真正暴露的内容:对象
            {
                default:100,
                a:100,
                b:200
            }

        引入方式
        语法:import { default as c , a ,b} from '@/api/product/trademark';

    3.统一暴露
        export default {
            a:100,
            b:200
        };
*/