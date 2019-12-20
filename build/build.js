var path = require('path')
var ora = require('ora')
var chalk = require('chalk')
var webpack = require('webpack')

var buildWebpackConfig = require('./webpack.build.config.js')
var paceWebpackConfig = require('./webpack.pace.config.js')

var spinner = new ora('开始打包压缩包代码');
spinner.start();

webpack(buildWebpackConfig, function (err, stuts) {
	spinner.stop();
	if (err) throw err;

	process.stdout.write(stuts.toString({
		color: true,
		modules: false,
		children: false,
		chunks: false,
		chunkModules: false
	}) + '\n\n')

	console.log(chalk.cyan('压缩包打包成功。 \n'))

	packPace()
})

function packPace() {
	var spinner = new ora('开始打包未压缩包代码');
	spinner.start();

	webpack(paceWebpackConfig, function (err, stuts) {
		spinner.stop();
		if (err) throw err;

		process.stdout.write(stuts.toString({
			color: true,
			modules: false,
			children: false,
			chunks: false,
			chunkModules: false
		}) + '\n\n')

		console.log(chalk.cyan('未压缩包打包成功。 \n'))
	})
}
