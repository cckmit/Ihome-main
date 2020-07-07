/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-29 17:39:46
 * @LastEditors: zyc
 * @LastEditTime: 2020-06-29 18:12:45
 */
import { IRes } from './base.d'

/**响应数据结果处理
 * @param {type}
 * @return:
 */
function resHandle<T>(result: Promise<IRes<T>>) {
    return result.then((res: IRes<T>) => res.data)
        .catch((err: IRes<T>) => err.data)
}