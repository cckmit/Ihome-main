/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-08-04 17:43:48
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-10 18:08:55
 */
let handleSwagger = require('./api-handle');
function doneApi() {
    //在这里配置要生成的api
    // handleSwagger('system');
    // handleSwagger('channel');
    handleSwagger('developer');
}
module.exports = (api, projectOptions) => {
    api.registerCommand('api', {
        description: 'api plugin for vue cli 3',
        usage: 'vue-cli-service api',
        options: {

        }
    }, (args) => {

        console.log('\033[42;30m  开始生成api文件... \033[40;32m 文档地址:' + process.env.PROXY_PROTOCOL + '://' + process.env.PROXY_IP + ':' + process.env.PROXY_PORT + '\033[0m');
        doneApi();
    })
}
