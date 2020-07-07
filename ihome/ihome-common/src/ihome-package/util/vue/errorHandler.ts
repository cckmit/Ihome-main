/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-02 15:45:15
 * @LastEditors: zyc
 * @LastEditTime: 2020-06-02 15:49:42
 */
/**vue异常捕获
 * @param {type} 
 * @return: 
 */
export default (Vue: any, VM: any, name: string) => {
    //异常配置捕获  errorHandler,warnHandler,renderError,errorCaptured
    Vue.config.errorHandler = function (err: any, vm: any, info: any) {
        console.log(`main.ts=> Vue.config.errorHandler------ Error: ${err.toString()};`);
        console.log(err.message, err.stack);
        console.log(err, vm, info);
    }
};