const path = require("path");
//导入在内存中生成html页面的插件
//只要是插件都要放到plugins节点中去
const HtmlWebpackPlugin = require("html-webpack-plugin");

//注册vue-loader　否则无法使用
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const config = {
    plugins:[ //配置插件的节点
        new HtmlWebpackPlugin({ //创建一个在内存中生成ＨＴＭＬ页面的插件
            template: path.join(__dirname,'./src/index.html'), //指定模板页面
            //将来会根据指定的页面路径去生成内存中的页面
            inject:true, //设为 true 表示把JS文件注入到body结尾，CSS文件注入到head中
            filename: 'index.html', //指定生成页面的名称
            minify: {
                removeComments:true  //表示删除模板的注释
            },

        }),
        //webpack4.x中注册vue-loader否则无法使用　
        new VueLoaderPlugin(),
    ],
    module:{//这个节点用于配置所有第三方模块的加载器
        rules:[//所有第三方模块的匹配规则
            {test:/\.css$/,use:['style-loader','css-loader']},
            //第三方loader规则
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            //导入处理scss文件的规则
            {test:/\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
            //这是配置处理less的第三方loader
            {test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader?limit=486000&name=[hash:8]-[name].[ext]'},//处理图片路径的loader
            //limit给定的值是图片的大小，单位是byte，如果我们引用的图片大于或等于limit值，则不会转换成base64
            //如果小于则会被转换为base64
            {test:/\.(ttf|eot|woff|woff2|svg|otf)$/,use:'url-loader'},//处理字体文件
            //babel的匹配规则
            {test:/\.js$/,loader:'babel-loader',exclude:/node_modules/},
            //处理.vue文件的匹配规则
            {test:/\.vue$/,use:'vue-loader'}


        ]
    },
    resolve:{
        alias:{//修改vue被导入时候包的路径
            //"vue$":"vue/dist/vue.js"
        }
    }

};


module.exports = config;