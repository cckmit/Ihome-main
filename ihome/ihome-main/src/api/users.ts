/*
 * @Description: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-24 09:47:33
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-16 15:00:35
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
            id: 10001,
            parentId: 0,
            name: "主页",
            icon: "el-icon-s-home",
            url: null,
        },
        {
            id: 10002,
            parentId: 10001,
            name: "首页",
            icon: "el-icon-s-home",
            url: "/web-sales/home/index",
        },

        {
            id: 1,
            parentId: 0,
            name: "系统管理",
            icon: "el-icon-setting",
            url: null,
        },
        {
            id: 2,
            parentId: 1,
            name: "用户列表",
            icon: null,
            url: "/web-system/user/list",
        },
        {
            id: 3,
            parentId: 1,
            name: "资源列表",
            icon: null,
            url: "/web-system/resources/list",
        },
        {
            id: 4,
            parentId: 1,
            name: "角色列表",
            icon: null,
            url: "/web-system/role/list",
        },
        {
            id: 5,
            parentId: 1,
            name: "岗位列表",
            icon: null,
            url: "/web-system/job/list",
        },
        {
            id: 6,
            parentId: 1,
            name: "组织架构",
            icon: null,
            url: "/web-system/organization/list",
        },
        {
            id: 7,
            parentId: 1,
            name: "数据字典",
            icon: null,
            url: "/web-system/dic/list",
        },
        // {
        //     id: 101,
        //     parentId: 0,
        //     name: "新房系统业务模块",
        //     icon: "el-icon-setting",
        //     url: null,
        // },
        // {
        //     id: 102,
        //     parentId: 101,
        //     name: "首页导航",
        //     icon: null,
        //     url: "/web-sales/",
        // },
        {

            id: 201,
            parentId: 0,
            name: "渠道管理",
            icon: "el-icon-setting",
            url: null,
        },
        {
            id: 208,
            parentId: 201,
            name: "渠道邀请码列表",
            icon: "el-icon-setting",
            url: "/web-sales/invitationCode/list",
        },
        {
            id: 209,
            parentId: 201,
            name: "城市等级列表",
            icon: "el-icon-setting",
            url: "/web-sales/cityLevel/list",
        },
        {
            id: 204,
            parentId: 201,
            name: "渠道评级标准列表",
            icon: null,
            url: "/web-sales/channelRatings/list",
        },
        {
            id: 203,
            parentId: 201,
            name: "渠道商列表",
            icon: null,
            url: "/web-sales/channelBusiness/list",
        },
        {
            id: 205,
            parentId: 201,
            name: "渠道等级信息列表",
            icon: "el-icon-setting",
            url: "/web-sales/channelLevel/list",
        },
        {
            id: 206,
            parentId: 201,
            name: "渠道呈批列表",
            icon: "el-icon-setting",
            url: "/web-sales/approval/list",
        },
        {
            id: 207,
            parentId: 201,
            name: "渠道基础信息变更列表",
            icon: "el-icon-setting",
            url: "/web-sales/channelChange/list",
        },
        {
            id: 202,
            parentId: 201,
            name: "渠道等级信息变更列表",
            icon: null,
            url: "/web-sales/channelLevelChange/list",
        },
        {
            id: 301,
            parentId: 0,
            name: '开发商管理模块',
            icon: 'el-icon-setting',
            url: null,
        },
        {
            id: 302,
            parentId: 301,
            name: "开发商列表",
            icon: null,
            url: "/web-sales/developers/list"
        },
        {
            id: 401,
            parentId: 0,
            name: '合同管理',
            icon: "el-icon-setting",
            url: null,
        },
        {
            id: 402,
            parentId: 401,
            name: "甲方合同列表",
            icon: null,
            url: "/web-sales/partyA/list"
        },
        {
            id: 403,
            parentId: 401,
            name: "渠道分销协议列表",
            icon: null,
            url: "/web-sales/distribution/list"
        },
        {
            id: 404,
            parentId: 401,
            name: "甲方/渠道战略协议列表",
            icon: null,
            url: "/web-sales/strategy/list"
        },
        {
            id: 405,
            parentId: 401,
            name: "优惠告知书列表",
            icon: null,
            url: "/web-sales/discount/list"
        },
        {
            id: 501,
            parentId: 0,
            name: "项目基础信息管理",
            icon: 'el-icon-setting',
            url: null,
        },
        {
            id: 502,
            parentId: 501,
            name: "项目基础信息列表",
            icon: null,
            url: "/web-sales/projects/list",
        },
        {
            id: 503,
            parentId: 501,
            name: "一手代理公司列表",
            icon: null,
            url: "/web-sales/firstAgency/list",
        },
        {
            id: 601,
            parentId: 0,
            name: "立项周期管理",
            icon: 'el-icon-setting',
            url: null,
        },
        {
            id: 602,
            parentId: 601,
            name: "立项周期列表",
            icon: null,
            url: "/web-sales/projectApproval/list",
        },
        {
            id: 701,
            parentId: 0,
            name: '成交管理模块',
            icon: 'el-icon-setting',
            url: null,
        },
        {
            id: 702,
            parentId: 701,
            name: "业务模式列表",
            icon: null,
            url: "/web-sales/businessModel/list"
        },
        {
            id: 703,
            parentId: 701,
            name: "分公司方案列表",
            icon: null,
            url: "/web-sales/achieveScaleScheme/companyList"
        },
        {
            id: 704,
            parentId: 701,
            name: "成交报告列表",
            icon: null,
            url: "/web-sales/dealReport/list"
        },
        {
            id: 801,
            parentId: 0,
            title: '财务管理模块',
            icon: 'el-icon-setting',
            path: null,
        },
        {
            id: 802,
            parentId: 801,
            title: "银行网点列表",
            icon: null,
            path: "/web-sales/bankBranch/list"
        },
        {
            id: 803,
            parentId: 801,
            title: "收款账号列表",
            icon: null,
            path: "/web-sales/receiptAccount/list"
        },
        {
            id: 804,
            parentId: 801,
            title: "发票税率维护",
            icon: null,
            path: "/web-sales/invoiceTax/list"
        },
        {
            id: 805,
            parentId: 801,
            title: "POS机管理列表",
            icon: null,
            path: "/web-sales/pos/list"
        },
        {
            id: 806,
            parentId: 801,
            title: '开票列表',
            icon: null,
            path: '/web-sales/invoice/list'
        },
        {
            id: 807,
            parentId: 801,
            title: '收款列表',
            icon: null,
            path: '/web-sales/receipt/list'
        }
    ];
    return menuList;
}
export const login = async (data: any) => {
    //http://localhost:8610/sales-oauth2/oauth/token?grant_type=password&client_id=sales-client-dev&client_secret=sales-dev&username=admin&password=123456


    // let url = `/sales-api/sales-oauth2/oauth/token?grant_type=password&client_id=sales-client-dev&client_secret=sales-dev&username=${data.username}&password=${data.password}`;
    const auth_client = 'UGM6c2FsZXMhMjAyMA==';
    let url = `/sales-api/sales-oauth2/oauth/token?grant_type=password&username=${data.username}&password=${data.password}&auth_client=${auth_client}`
    const res: any = await request({
        url: url,
        method: 'post',
    });

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
