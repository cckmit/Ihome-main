/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 14:34:07
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-13 16:34:53
 */

console.log('\033[42;30m 这是main ts主应用')
const path = require('path');
const { name } = require('./package');
const port = 8081; // dev port
let proxyAddress = process.env.PROXY_PROTOCOL + '://' + process.env.PROXY_IP + ':' + process.env.PROXY_PORT;//代理地址

if (process.env.NODE_ENV !== 'production') {
    const childProcess = require('child_process')
    const branch = childProcess.execSync('git rev-parse --abbrev-ref HEAD').toString().replace(/\s+/, '')
    let user_name = childProcess.execSync('git config user.name').toString().trim(); //当前用户名
    let user_email = childProcess.execSync('git config user.email').toString().trim(); //当前邮箱
    console.log('\033[42;30m ' + name + '子应用 git信息 \033[40;32m 用户名:' + user_name + '; 邮箱：' + user_email + '; 分支:' + branch + '\033[0m');

    let show_name = childProcess.execSync('git show -s --format=%cn').toString().trim(); //姓名
    let show_email = childProcess.execSync('git show -s --format=%ce').toString().trim(); //邮箱
    let show_date = new Date(childProcess.execSync('git show -s --format=%cd').toString()); //日期
    let show_message = childProcess.execSync('git show -s --format=%s').toString().trim(); //说明
    console.log('git提交记录信息  ', '用户名：' + show_name, '邮箱：' + show_email, '日期：', show_date, '说明：' + show_message);
    console.log('\033[40;32mapi接口代理地址：' + proxyAddress + '\033[0m');
}


function resolve(dir) {
    return path.join(__dirname, dir);
}




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
                target: proxyAddress
            },
            '/system/': {
                target: proxyAddress
            },
            '/channel-local/': { // 调试本地使用
                target: 'http://10.188.1.91:8610'
            },
            '/channel/': {
                target: proxyAddress,
                changeOrigin: true, //开启代理
                // pathRewrite: { '^/channel': '/channel-local' }  //路由重写
            },
            '/sales-oauth2': {
                target: proxyAddress
            },
            '/developer/': {
                target: proxyAddress
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