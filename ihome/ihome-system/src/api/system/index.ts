/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-08 10:38:09
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-08 11:45:12
 */
import { IPageList } from "./base.d";

import { request } from './base'

/**归属组织*/
export async function organization(d?: any) {
    return request.get<IPageList<any>, IPageList<any>>('/user/organization', d)
}
/**用户列表*/
export function userList(d?: any) {
    return request.get<IPageList<any>, IPageList<any>>('/user/list', d)
}


export interface IResource {
    /**id*/
    id: string,
    /**编码*/
    code: string,
    name: string,
    type: string,
    url: string,
    parentName: string,
    createUser: string,
    createTime: string,
    updateUser: string,
    updateTime: string,

}

/**获取资源列表*/
export async function getResourceList(d?: any) {
    return request.get<IPageList<IResource>, IPageList<IResource>>('/system/resource/list', { params: d })
}

/**获取资源类别*/
export async function getResourceCategory(d?: any) {
    return request.get<any[], any[]>('/system/resource/category', { params: d })
}
/**获取角色列表*/
export async function getRoleList(d?: any) {
    return request.get<IPageList<IResource>, IPageList<IResource>>('/system/role/list', { params: d })
}
/**获取岗位列表*/
export async function getJobList(d?: any) {
    return request.get<IPageList<IResource>, IPageList<IResource>>('/system/job/list', { params: d })
}
/**获取用户列表*/
export async function getUserList(d?: any) {
    return request.get<IPageList<IResource>, IPageList<IResource>>('/system/user/list', { params: d })
}



