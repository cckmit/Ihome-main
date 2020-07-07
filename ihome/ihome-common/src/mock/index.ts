/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-23 17:07:08
 * @LastEditors: zyc
 * @LastEditTime: 2020-06-23 17:29:56
 */
const Mock = require('mockjs');
Mock.setup({
    timeout: 200
})
function responseSuccess(result: any) {
    return {
        code: 0,
        msg: '成功',
        result: result
    }
}
// function responseError(result: any) {
//     return {
//         code: 1,
//         msg: '失败',
//         result: result
//     }
// }
// 创建模拟数据
const testData = {
    testData: '测试mock'
}
const testDataPost = {
    testData: '测试postmock'
}

Mock.mock('/getMockData', 'get', responseSuccess(testData))
Mock.mock('/getMockDataPost', 'post', responseSuccess(testDataPost))
