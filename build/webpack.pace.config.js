var path = require('path')
var merge = require('webpack-merge')

var baseWebpckConfig = require('./webpack.base.config.js')

module.exports = merge(baseWebpckConfig, {
	mode: 'development',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].js',
		libraryTarget: 'umd',
	}
})
