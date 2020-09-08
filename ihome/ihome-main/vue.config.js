/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 14:34:07
 * @LastEditors: zyc
 * @LastEditTime: 2020-09-08 09:33:28
 */

console.log('\033[42;30m 这是main ts主应用')
const path = require('path');
const { name } = require('./package');

const childProcess = require('child_process')
const branch = childProcess.execSync('git rev-parse --abbrev-ref HEAD').toString().replace(/\s+/, '')
let git_email = childProcess.execSync('git show -s --format=%ce').toString().trim(); //邮箱
console.log('\033[42;30m ' + name + '子应用 git信息 \033[40;32m 邮箱:' + git_email + ' 分支:' + branch + '\033[0m');
function resolve(dir) {
    return path.join(__dirname, dir);
}


const port = 8081; // dev port

module.exports = {
    /**
     * You will need to set publicPath if you plan to deploy your site under a sub path,
     * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then publicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     * Detail: https://cli.vuejs.org/config/#publicpath
     */
    outputDir: 'dist',
    assetsDir: 'static',
    filenameHashing: true,
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    // tweak internal webpack configuration.
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
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
            },
            '/sales-oauth2': {
                target: 'http://10.188.0.109:8610'
            },
        }
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