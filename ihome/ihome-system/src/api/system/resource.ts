/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-06 11:49:23
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-06 16:13:46
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