/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-23 17:07:08
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-06 16:11:04
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
Mock.mock('/users/info', 'post', responseSuccess(testDataPost))

import { organization, userList } from './data/user'
Mock.mock('/users/organization', 'get', responseSuccess(organization))
Mock.mock('/users/list', 'get', responseSuccess(userList))
import { resourceList, resourceCategory } from './data/resources'

Mock.mock('/system/resource/list', 'get', responseSuccess(resourceList))
Mock.mock('/system/resource/category', 'get', responseSuccess(resourceCategory))



