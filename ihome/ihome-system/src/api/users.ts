/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-24 09:47:33
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-02 10:32:52
 */
import { IRes } from "./users.d";
import request from 'ihome-common/util/api/http'

/**响应数据结果处理
 * @param {type}
 * @return:
 */
function resHandle<T>(result: Promise<IRes<T>>) {
    return result.then((res: IRes<T>) => res.result)
        .catch((err: IRes<T>) => err)
}

/**获取用户信息
 * @param {type}
 * @return:
 */
export function userInfo<T>(d?: any) {
    return resHandle<T>(request.post<T, IRes<T>>('/users/info', d))
    // return request.post<T, IRes<T>>('/users/info', d)
    //   .then((res: IRes<T>) => res.data)
    //   .catch((err: IRes<T>) => err.data)
}
/**获取用户信息,返回原始数据
 * @param {type}
 * @return:
 */
export function userInfoRes<T>(d?: any) {
    return request.post<T, IRes<T>>('/users/info', d)
}
/**用户列表
 * @param {type}
 * @return:
 */
export function userList<T>(d?: any) {
    return resHandle<T>(request.get<T, IRes<T>>('/users/list', d))
}

/**归属组织
 * @param {type}
 * @return:
 */
export async function organization<T>(d?: any) {
    return resHandle<T>(request.get<T, IRes<T>>('/users/organization', d))
}




export const login = (data: any) => {
    const tokenRes = {
        "assess_token": "xxxxxxx",
        "token_type": "bearer",
        "refresh_token": "yyyyyyy",
        "expires_in": 4,
        "scope": "default-scope",
        "jti": "zzzzzz"
    }
    if (process.env.NODE_ENV == 'development') {
        return request({
            url: '/sales-oauth2/token',
            method: 'get',
            data
        })

    } else {
        return tokenRes;
    }

}

export async function logout() {
    // request({
    //     url: '/users/login',
    //     method: 'post',
    //     data
    // })
}


export const getUserInfo = () =>
    request({
        url: '/users/logout',
        method: 'post'
    })

