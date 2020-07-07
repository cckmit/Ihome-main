/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-23 17:07:08
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-07 15:53:33
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
/**用户详情*/
Mock.mock('/users/info', 'post', responseSuccess(testDataPost))

import { organization, usersList } from './data/user'
/**归属组织列表*/
Mock.mock('/users/organization', 'get', responseSuccess(organization))
/**用户列表*/
Mock.mock('/users/list', 'get', responseSuccess(usersList))
import { resourceList, resourceCategory, roleList, jobList, userList } from './data/resources'
/**资源列表*/
Mock.mock('/system/resource/list', 'get', responseSuccess(resourceList))
/**资源类别*/
Mock.mock('/system/resource/category', 'get', responseSuccess(resourceCategory))
/**角色列表*/
Mock.mock('/system/role/list', 'get', responseSuccess(roleList))
/**岗位列表*/
Mock.mock('/system/job/list', 'get', responseSuccess(jobList))
/**用户列表*/
Mock.mock('/system/user/list', 'get', responseSuccess(userList))



