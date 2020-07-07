/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-06 11:49:23
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-07 15:52:04
 */
import request from 'ihome-common/util/api/http'


/**获取资源列表*/
export async function getResourceList(d?: any) {
    return request.get<any, any>('/system/resource/list', { params: d })
}
/**获取资源类别*/
export async function getResourceCategory(d?: any) {
    return request.get<any, any>('/system/resource/category', { params: d })
}
/**获取角色列表*/
export async function getRoleList(d?: any) {
    return request.get<any, any>('/system/role/list', { params: d })
}
/**获取岗位列表*/
export async function getJobList(d?: any) {
    return request.get<any, any>('/system/job/list', { params: d })
}
/**获取用户列表*/
export async function getUserList(d?: any) {
    return request.get<any, any>('/system/user/list', { params: d })
}