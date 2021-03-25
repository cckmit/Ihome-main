/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-08 11:47:42
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-08 11:51:11
 */ 
const Mock = require('mockjs');
export const resourceCategory: any = [
    { id: 1, name: '资源管理', parentId: 0 },
    { id: 2, name: '新房销售系统', parentId: 1 },
    { id: 3, name: '系统管理', parentId: 2 },
    { id: 4, name: '渠道管理', parentId: 2 },
    { id: 5, name: '项目管理', parentId: 2 },
    { id: 6, name: '开发商管理', parentId: 2 },
    { id: 7, name: '客户管理', parentId: 2 },
    { id: 8, name: '成交管理', parentId: 2 },
    { id: 9, name: '合同管理', parentId: 2 },
    { id: 10, name: '实收管理', parentId: 2 },
    { id: 11, name: '付款管理', parentId: 2 },
    { id: 12, name: '请佣管理', parentId: 2 },
    { id: 13, name: '佣金管理', parentId: 2 },
    { id: 14, name: '用户管理', parentId: 3 },
    { id: 15, name: '岗位管理', parentId: 3 },
    { id: 16, name: '角色管理', parentId: 3 },
    { id: 17, name: '资源管理', parentId: 3 },
    { id: 18, name: '数据字典', parentId: 3 },
    { id: 19, name: '系统参数', parentId: 3 },
    { id: 20, name: '创建用户', parentId: 10 },
    { id: 21, name: '修改用户', parentId: 10 },
    { id: 22, name: '锁定用户', parentId: 10 },
    { id: 23, name: '保存用户', parentId: 10 },
    { id: 24, name: '查询用户', parentId: 10 },
];


export const resourceList = Mock.mock({
    "total": 105,
    "list|10": [
        {
            "code": /[a-z]{8}/,
            "id": '@increment(1)',
            "name": "@ctitle",
            "parentId": 0,
            "parentName": "@ctitle",
            "type|1": ['菜单', '按钮', '接口', '系统', '模块'],
            "url": "/api/xxx",
            "createUser|1": ['张三', '李四', '王五'],
            "createTime": '@DATETIME("yyyy-MM-dd HH:mm:ss")',
            "updateUser|1": ['张三', '李四', '王五'],
            "updateTime": '@DATETIME("yyyy-MM-dd HH:mm:ss")',
        }
    ]
})

export const roleList = Mock.mock({
    "total": 80,
    "list|10": [
        {
            "code": /[a-z]{8}/,
            "id": '@increment(1)',
            "name": "@ctitle",
            "createUser|1": ['张三', '李四', '王五'],
            "createTime": '@DATETIME("yyyy-MM-dd HH:mm:ss")',
            "updateUser|1": ['张三', '李四', '王五'],
            "updateTime": '@DATETIME("yyyy-MM-dd HH:mm:ss")',
        }
    ]
})
export const jobList = Mock.mock({
    "total": 68,
    "list|10": [
        {
            "code": /[a-z]{8}/,
            "id": '@increment(1)',
            "name": "@ctitle",
            "describe": "@ctitle",
            "createUser|1": ['张三', '李四', '王五'],
            "createTime": '@DATETIME("yyyy-MM-dd HH:mm:ss")',
            "updateUser|1": ['张三', '李四', '王五'],
            "updateTime": '@DATETIME("yyyy-MM-dd HH:mm:ss")',
        }
    ]
})
export const userList = Mock.mock({
    "total": 75,
    "list|10": [
        {
            "code": /[a-z]{8}/,
            "id": '@increment(1)',
            "name": "@cname",
            "account": /[a-z]{12}/,
            "phone":  /^135[0-9]{8}|188[0-9]{8}$/,
            "userType|1": ['爱家员工', '保顾兼职', '居恒员工', '个人客户', '渠道用户'],
            "organization|1": ['爱家广州存量事业部', '居恒广州产成品及联动事业部', '爱家广州产成品及联动事业部'],
            "createUser|1": ['张三', '李四', '王五'],
            "createTime": '@DATETIME("yyyy-MM-dd HH:mm:ss")',
            "updateUser|1": ['张三', '李四', '王五'],
            "updateTime": '@DATETIME("yyyy-MM-dd HH:mm:ss")',
        }
    ]
})

