/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-24 09:47:33
<<<<<<< HEAD
 * @LastEditors: lgf
 * @LastEditTime: 2020-09-25 14:18:39
=======
 * @LastEditors: ywl
 * @LastEditTime: 2020-09-18 11:04:27
>>>>>>> origin/develop
 */
import { IRes } from "./users.d";
// import request from '@/utils/http';
import request from 'ihome-common/util/api/http';


/**响应数据结果处理
 * @param {type}
 * @return:
 */
function resHandle<T>(result: Promise<IRes<T>>) {
    return result.then((res: IRes<T>) => res.data)
        .catch((err: IRes<T>) => err.data)
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
    return resHandle<T>(request.post<T, IRes<T>>('/users/list', d))
}
/**用户菜单
 * @param {type}
 * @return:
 */
export function userMenu<T>(d?: any) {
    return resHandle<T>(request.post<T, IRes<T>>('/system/users/menuList', d))
}
/**全部菜单
 * @param {type}
 * @return:
 */
export function allMenu<T>() {
    const menuList: any[] = [
        {
            id: 7,
            parentId: 0,
            title: "系统管理首页",
            icon: "el-icon-menu",
            path: "/web-system/",
        },
        {
            id: 1,
            parentId: 0,
            title: "系统管理模块",
            icon: "el-icon-setting",
            path: null,
        },
        {
            id: 2,
            parentId: 1,
            title: "用户列表",
            icon: null,
            path: "/web-system/user/list",
        },
        {
            id: 3,
            parentId: 1,
            title: "资源列表",
            icon: null,
            path: "/web-system/resources/list",
        },
        {
            id: 4,
            parentId: 1,
            title: "角色列表",
            icon: null,
            path: "/web-system/role/list",
        },
        {
            id: 5,
            parentId: 1,
            title: "岗位列表",
            icon: null,
            path: "/web-system/job/list",
        },
        {
            id: 6,
            parentId: 1,
            title: "组织架构",
            icon: null,
            path: "/web-system/organization/list",
        },
        {
            id: 101,
            parentId: 0,
            title: "新房系统业务模块",
            icon: "el-icon-setting",
            path: null,
        },
        {
            id: 102,
            parentId: 101,
            title: "首页导航",
            icon: null,
            path: "/web-sales/",
        },
        {
            id: 201,
            parentId: 0,
            title: "渠道管理",
            icon: "el-icon-setting",
            path: null,
        },
        {
            id: 203,
            parentId: 201,
            title: "渠道商列表",
            icon: null,
            path: "/web-sales/distributorsList",
        },
        {
            id: 202,
            parentId: 201,
            title: "渠道合作信息列表",
            icon: null,
            path: "/web-sales/list",
        },

        {
            id: 204,
            parentId: 201,
            title: "渠道评级标准列表",
            icon: null,
            path: "/web-sales/ChannelRatings",
        },
        {
            id: 205,
            parentId: 201,
            title: "渠道等级信息列表",
            icon: "el-icon-setting",
            path: "/web-sales/Channellevel",
        },
        {
            id: 206,
            parentId: 201,
            title: "渠道呈批列表",
            icon: "el-icon-setting",
            path: "/web-sales/ChannelAgroupOf",
        },
        {
            id: 207,
            parentId: 201,
            title: "渠道基础信息变更列表",
            icon: "el-icon-setting",
            path: "/web-sales/ChannelBasicInfoChange",
        },
        {
            id: 208,
            parentId: 201,
            title: "渠道邀请码列表",
            icon: "el-icon-setting",
            path: "/web-sales/ChannelInviteCode",
        },
        {
            id: 209,
            parentId: 201,
            title: "城市等级",
            icon: "el-icon-setting",
            path: "/web-sales/cityLevel",
        },
        {
            id: 401,
            parentId: 101,
            title: '合同管理',
            path: null,
        },
        {
            id: 402,
            parentId: 401,
            title: "甲方合同",
            icon: null,
            path: "/web-sales/project/list"
        }
    ];
    return menuList;
}
export const login = async (data: any) => {
    //http://localhost:8610/sales-oauth2/oauth/token?grant_type=password&client_id=sales-client-dev&client_secret=sales-dev&username=admin&password=123456

    let url = `/sales-oauth2/oauth/token?grant_type=password&client_id=sales-client-dev&client_secret=sales-dev&username=${data.username}&password=${data.password}`;

    const res: any = await request({
        url: url,
        method: 'post',
    })

    return res;

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
