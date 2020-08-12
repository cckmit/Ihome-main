/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 11:11:41
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-12 17:22:00
 */
const path = require('path');
const { name } = require('./package');
const port = 8085; // 端口

const childProcess = require('child_process')
const branch = childProcess.execSync('git rev-parse --abbrev-ref HEAD').toString().replace(/\s+/, '')
let git_email = childProcess.execSync('git show -s --format=%ce').toString().trim(); //邮箱
console.log('\033[42;30m ' + name + '子应用 git信息 \033[40;32m 邮箱:' + git_email + ' 分支:' + branch + '\033[0m');
function resolve(dir) {
	return path.join(__dirname, dir);
}

module.exports = {
	outputDir: 'dist',
	assetsDir: 'static',
	filenameHashing: true,
	publicPath: process.env.NODE_ENV === 'production' ? process.env.BASE_URL : process.env.BASE_URL,
	productionSourceMap: true,
	devServer: {
		// host: '0.0.0.0',
		hot: true,
		disableHostCheck: true,
		port,
		open: true,
		overlay: {
			warnings: false,
			errors: true,
		},
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		proxy: {
			'/system/v2/api-docs': {
				target: 'http://10.188.0.109:8610'
			},
			'/system/': {
				target: 'http://10.188.0.109:8610'
			}
		}
	},
	pages: {
		index: {
			// page 的入口
			entry: 'src/main.ts',
			// entry: 'node_modules/ihome-common/util/app-main.ts',

			// 模板来源
			template: 'public/index.html',
			// 在 dist/index.html 的输出
			filename: 'index.html',
			// 当使用 title 选项时，
			// template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
			// title: 'Index Page',
			staticDomain: 'http://jslog.zhangdada666.com',
			title: name,
			// 在这个页面中包含的块，默认情况下会包含
			// 提取出来的通用 chunk 和 vendor chunk。
			chunks: ['chunk-vendors', 'chunk-common', 'index']
		},
		// 当使用只有入口的字符串格式时，
		// 模板会被推导为 `public/subpage.html`
		// 并且如果找不到的话，就回退到 `public/index.html`。
		// 输出文件名会被推导为 `subpage.html`。
		// subpage: 'src/subpage/main.js'
	},
	// 自定义webpack配置

	configureWebpack: {

		resolve: {
			alias: {
				'@': resolve('src'),
			},
		},
		output: {
			// 把子应用打包成 umd 库格式
			library: `${name}-[name]`,
			libraryTarget: 'umd',
			jsonpFunction: `webpackJsonp_${name}`,
		},
	},
};
