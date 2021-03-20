/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-08 09:29:41
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-08 09:33:06
 */
import request from 'ihome-common/util/api/http'


/**字典列表*/
export async function getDictionaries(d?: any) {
    return request.get<any, any>('/system/dictionaries/list', { params: d })
}
