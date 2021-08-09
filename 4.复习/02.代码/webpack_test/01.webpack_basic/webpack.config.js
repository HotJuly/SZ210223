/*
    webpack五大核心概念:
    1.入口entry
    2.出口output
        - 输出的文件名称
        - 输出的文件路径
    3.loader
    4.plugin
    5.mode(模式)

    面试题:loader和plugin的区别
        webpack只认识js文件,那么也就是说在我们项目引入的过程中,会出现很多文件webpack无法识别
        例如:less文件
            less官方出了一个核心库可以解析less文件变成css文件,核心库名称叫做less
            webpack想要调用less的核心库,没办法直接调用,需要一个中间的过渡桥梁,这个桥梁就是loader
            例如:想要使用less核心库,就必须使用less-loader

            而plugin一般是用于扩展一套特定的能力的插件
*/

const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
    entry:"./src/main.js",
    output:{
        filename:"index.js",
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
    devServer:{
        port:8089,
        proxy:{
            "/v2/api":{
                target:"http://www.baidu.com",
                pathRewrite:{
                    '^/v2/api':""
                }
            }
        },
        // hot:true,hot是热模替换同时,还会刷新当前项目,而hotOnly不会刷新项目
        hotOnly:true
    },
    resolve:{
        extensions:[".js",".json",".vue",".less"],
        alias:{
            "@":resolve(__dirname,"./src")
        }
    }
}