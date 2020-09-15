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