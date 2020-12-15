/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-08-04 17:43:48
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-15 18:35:55
 */
let handleSwagger = require('./node_modules/ihome-common/util/api/api-hangle');
function doneApi() {
    //在这里配置要生成的api
    // handleSwagger('system');
    handleSwagger('channel');
    // handleSwagger('contract');
    // handleSwagger('developer');
    // handleSwagger('project');
    // handleSwagger('deal');
    // handleSwagger('customer');
    handleSwagger('finance');
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
