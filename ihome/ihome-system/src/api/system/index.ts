/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-03 14:14:41
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-03 14:15:41
 */
/* eslint-disable camelcase */
import { IRes } from "@/api/users.d";
import request from 'ihome-common/util/api/http'
/**根据id查询资源详情*/
export function getResourceByIdUsingGET(d?: any) {
    return request.get<any, any>('/system/resource/get/{id}', { params: d })
}
/**激活用户*/
export function activateUsingPOST(d?: any) {
    return request.post<any, any>('/system/user/activate', d)
}
/**复制用户岗位及角色*/
export function copyJobAndRoleUsingPOST(d?: any) {
    return request.post<any, any>('/system/user/copyJobAndRole', d)
}
/**复制用户组织权限*/
export function copyUserOrgUsingPOST(d?: any) {
    return request.post<any, any>('/system/user/copyUserOrg', d)
}
/**删除用户*/
export function deleteUsingPOST(d?: any) {
    return request.post<any, any>('/system/user/delete', d)
}
/**根据id查询用户详情*/
export function getUserByIdUsingGET(d?: any) {
    return request.get<any, any>('/system/user/get/{id}', { params: d })
}
/**查询用户资源*/
export function getResourceUsingGET(d?: any) {
    return request.get<any, any>('/system/user/getResource/{id}', { params: d })
}
/**锁定用户*/
export function lockUsingPOST(d?: any) {
    return request.post<any, any>('/system/user/lock', d)
}
/**保存用户*/
export function saveUsingPOST(d?: any) {
    return request.post<any, any>('/system/user/save', d)
}
/**保存用户岗位及角色*/
export function saveJobAndRoleUsingPOST(d?: any) {
    return request.post<any, any>('/system/user/saveJobAndRole', d)
}
/**保存用户组织权限*/
export function saveUserOrgUsingPOST(d?: any) {
    return request.post<any, any>('/system/user/saveUserOrg', d)
}
/**修改用户*/
export function updateUsingPOST(d?: any) {
    return request.post<any, any>('/system/user/update', d)
}
//=========================================================
/**ApiResult模型*/
export interface ApiResult<T> {
    /**是否成功（0 是 -1 否）*/
    code: number;
    /**响应信息*/
    msg: string;
    /**返回对象*/
    result: T;
}

/**PageInfo模型*/
export interface PageInfo<T> {
    /**结果集*/
    list: T;
    /**总记录数*/
    total: number;
}

/**undefined*/
export interface ResourceVO {
    /**编码 */
    code: string;
    /**创建时间 */
    createTime: string;
    /**创建人 */
    createUser: number;
    /**已删除*/
    deleted: number;
    /**ID */
    id: number;
    /**名称 */
    name: string;
    /**父资源ID */
    parentId: number;
    /**类型 */
    type: string;
    /**修改时间 */
    updateTime: string;
    /**修改人 */
    updateUser: number;
    /**URL */
    url: string;
}

/**undefined*/
export interface RoleVO {
    /**创建时间 */
    createTime: string;
    /**创建人 */
    createUser: number;
    /**已删除*/
    deleted: number;
    /**修改时间 */
    updateTime: string;
    /**修改人 */
    updateUser: number;
}

/**undefined*/
export interface UserVO {
    /**登录账号 */
    account: string;
    /**用户类型 */
    accountType: string;
    /**创建时间 */
    createTime: string;
    /**创建人 */
    createUser: number;
    /**已删除*/
    deleted: number;
    /**email */
    email: string;
    /**员工工号 */
    employeeCode: string;
    /**人员类型 */
    employeeType: string;
    /**入职日期 */
    employmentDate: string;
    /**ID */
    id: number;
    /**岗位ID */
    jobId: string;
    /**离职日期 */
    leaveDate: string;
    /**姓名 */
    name: string;
    /**归属组织 */
    orgId: number;
    /**密码 */
    password: string;
    /**undefined*/
    roleList: undefined[];
    /**状态 */
    status: string;
    /**修改时间 */
    updateTime: string;
    /**修改人 */
    updateUser: number;
    /**职能类别 */
    workType: string;
}
