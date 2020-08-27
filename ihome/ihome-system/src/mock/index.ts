/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-23 17:07:08
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-27 11:33:57
 */
const Mock = require('mockjs');
Mock.setup({
    timeout: 2000
})
function responseSuccess(result: any) {
    return {
        code: 'Success',
        msg: '成功',
        data: result
    }
}
// function responseError(result: any) {
//     return {
//         code: 1,
//         msg: '失败',
//         result: result
//     }
// }

import { dictionariesList, organization, usersList } from './data/common'

/**归属组织列表*/
Mock.mock('/user/organization', 'get', responseSuccess(organization))
/**用户列表*/
Mock.mock('/user/list', 'get', responseSuccess(usersList))
/**字典数据列表*/
Mock.mock('/system/dictionaries/list', 'get', responseSuccess(dictionariesList))





import { resourceList, resourceCategory, roleList, jobList, userList } from './data/system'
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







