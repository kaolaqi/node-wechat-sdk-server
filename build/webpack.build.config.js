var path = require('path')
var merge = require('webpack-merge')
var CleanWebpackPlugin = require('clean-webpack-plugin');


var baseWebpckConfig = require('./webpack.base.config.js')


module.exports = merge(baseWebpckConfig, {
	mode: 'production',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].js',
		// library: '[name].js',
		// umdNamedDefine: true,
		libraryTarget: "umd"
	},
	plugins: [
		new CleanWebpackPlugin('./dist', {
			root: path.dirname(__dirname),
			verbose: true,
			dry: false
		})
	]
})