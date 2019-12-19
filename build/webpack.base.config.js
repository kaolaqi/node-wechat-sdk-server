var path = require('path')


module.exports = {
	module: {
		rules: [{
			test: /\.js$/,
			include: path.resolve(__dirname, '../src'),
			use: ['babel-loader']
		}, {
        	//读取模板
            test: /\.html$/,
            include: path.resolve(__dirname, '../src'),
            use: [{
                loader:'html-css-scope-loader',
                options: {
                    minimize: true
                }
            }]
        }, {
			//处理html图片
			test: /\.html$/,
            include: path.resolve(__dirname, '../src'),
            use: [{
                loader: 'html-withimg-loader'
            }]
        }, {
			test: /\.(png|jpe?g|gif|svg)$/i,
			include: path.resolve(__dirname, '../src'),
			use: [{
				loader: 'url-loader',
				options: {
					limit: 2000,
					name: '[name].[hash:8].[ext]'
				}
			}]
		}]
	},
	devtool: 'cheap-module-source-map',
	resolve: {
		alias: {
			'@': './src'
		},
		extensions: ['.js', '.json']
	}
}