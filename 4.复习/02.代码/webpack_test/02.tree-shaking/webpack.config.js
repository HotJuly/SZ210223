

/*
    功能:tree-shaking
    问题:由于平常开发中,可能会出现一个依赖文件中暴露多个内容,但是实际只是用内部其中的一个内容,
        但是打包的时候,还是会将其他没用上的内容自动携带上
    目的:在编译的时候,将多余的无用代码去除,减小项目的体积,从而提高页面渲染速度
    实现:
        将mode改为production即可
            该模式下自动启用TerserPlugin,该插件可以实现树摇效果
            注意:引入语法必须是ES6

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
    mode:"production",
    resolve:{
        extensions:[".js",".json",".vue",".less"],
        alias:{
            "@":resolve(__dirname,"./src")
        }
    },
    // optimization: {
    //   minimizer: [new TerserPlugin()],
    // }
}