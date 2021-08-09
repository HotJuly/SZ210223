/*
    code split
    多入口文件
        当前多个入口文件同时依赖于一个包,那么默认这个包的代码会同时呗两个入口文件编译携带
        解决:
            配置optimization.splitChunks.chunks="all",可以将多个入口文件重复的依赖单独提取成一个文件,大家共享
            配置optimization.splitChunks.minSize=1,可以将小于1B的依赖文件全部抽取成单独文件
    
    单入口文件
        组件懒加载
        webpack编译的时候,如果检测到使用import函数引入的依赖,会将该依赖单独拆成一个js文件

*/

const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
    // entry:{
    //     main:"./src/main.js",
    //     home:"./src/home.js"
    // },
    entry:"./src/main.js",
    output:{
        filename:"[name].js",
        path:resolve(__dirname,'./build')
    },
    module:{
        rules:[
            {
                test:/\.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:"./public/index.html"
        })
    ],
    mode:"development",
    resolve:{
        extensions:[".js",".json",".vue",".less"],
        alias:{
            "@":resolve(__dirname,"./src")
        }
    },
    optimization:{
        splitChunks:{
            chunks:"all",
            minSize: 1,
        }
    }
}