const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: 'eval-source-map',
	 entry: __dirname + "/app/main.js", //'webpack-dex-server/client?http://localhost:8080',,	//已多次提及的唯一入口文件
	output: {
		// publicPath: 'http://localhost:8080/build/',
		path: __dirname + "/build",	//打包后的文件存放的地方
		filename: "bundle.js"	//打包后输出文件的文件名
	},
	devtool: "eval-source-map",
	devServer: {
	    contentBase: "./build",	//本地服务器所加载的页面所在的目录
	    historyApiFallback: true,	//不跳转
	    inline: true,	//实时刷新
		port: 8080
  	},
	module: {
        loaders: [
            {
                test: /(\.jsx|\.js)$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
			{
				test: /\.html$/,
				loader: "html-withimg-loader"
			},
			{
				test: /\.less$/,
				loader: "style-loader!css-loader!less-loader"
			},
			{
				test: /\.css$/,
				loader: "style-loader!css-loader"
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
            	loader: "file-loader"
			}
        ]
    },
	plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html",	//new 一个这个插件的实例，并传入相关的参数
			favicon: __dirname + '/app/imgs/favico.ico'
        })
    ],
}
