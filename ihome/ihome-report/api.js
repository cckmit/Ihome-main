/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2021-01-20 14:29:38
 * @LastEditors: zyc
 * @LastEditTime: 2021-01-26 15:05:16
 */

 
//使用命令   npm run api --modular system
// system 是模块名称

let modularDefault = 'system';//模块名称
let handleSwagger = require('./node_modules/ihome-common/util/api/api-hangle');
function doneApi(modular) {
    //在这里配置要生成的api
    handleSwagger(modular)
}
module.exports = (api, projectOptions) => {
    api.registerCommand('api', {
        description: 'api plugin for vue cli 3',
        usage: 'vue-cli-service api',
        options: {}
    }, (args) => {
       
        Object.keys(args).forEach(k => {
            if (k == '_') {
                let arr = args[k];
                if (arr.length == 1) {
                    modularDefault = arr[0];
                }
            }
        })
        console.log('\033[42;30m  开始生成api文件... \033[40;32m 文档地址:' + process.env.PROXY_PROTOCOL + '://' + process.env.PROXY_IP + ':' + process.env.PROXY_PORT + '\033[0m');
        doneApi(modularDefault);
    })
}

