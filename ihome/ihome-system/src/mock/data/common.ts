/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-08 11:47:49
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-17 11:05:51
 */

const Mock = require('mockjs');
import { treeList } from './tree'
export const organization = treeList;
export const usersList = Mock.mock({
    "total": 205,
    "list|10": [
        {
            "id": '@increment(1)',
            "name": "@cname",//姓名
            "account": /[a-z]{12}/,//账号
            "phone": /^135[0-9]{8}|188[0-9]{8}$/,//手机号码
            "accountType|1": ['爱家员工', '保顾兼职', '居恒员工', '个人客户', '渠道用户'],//用户类型
            "createTime": '@DATETIME("yyyy-MM-dd HH:mm:ss")',//创建时间
            "createUser": "@cname",//创建人
            "deleted": 0,//删除标识
            "email": "@email",//邮箱
            "employeeCode": /[a-z]{12}/,//员工工号
            "employeeType": null,//员工类型
            "xxx|1": ['在职', '离职'],//雇员状态
            "xxxx|1": ['正式工', '试用'],//人员类型
            "employmentDate": '@DATETIME("yyyy-MM-dd")',//入职日期
            "leaveDate": null,//离职日期
            "orgId": 0,//归属组织id
            "orgName|1": ['爱家广州存量事业部', '居恒广州产成品及联动事业部', '爱家广州产成品及联动事业部'],//归属组织名称
            "password": null,//密码
            "status|1": ['激活', '锁定'],//状态
            "updateTime": '@DATETIME("yyyy-MM-dd HH:mm:ss")',//修改时间
            "updateUser": "@cname",//修改人
            "workType|1": ['非一线', '一线'],//职能类别
        }
    ]
})
export const dictionariesList: any[] = [
    {
        code: "1",
        name: "菜单"
    },
    {
        code: "2",
        name: "按钮"
    },
    {
        code: "3",
        name: "接口"
    },
    {
        code: "4",
        name: "系统"
    },
    {
        code: "5",
        name: "模块"
    }
]