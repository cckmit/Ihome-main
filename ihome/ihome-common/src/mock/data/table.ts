/*
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-07-08 11:47:42
 * @LastEditors: wwq
 * @LastEditTime: 2020-09-30 16:39:55
 */
const Mock = require('mockjs');

export const tableData = Mock.mock({
  "total": 80,
  "list|10": [
    {
      "code": /[a-z]{8}/,
      "age": /[0-9]{2}/,
      "gender": /[0-1]{1}/,
      "id": '@increment(1)',
      "name1|1": ['张三', '李四', '王五'],
      "name2|1": ['张三', '李四', '王五'],
      "name3|1": ['张三', '李四', '王五'],
      "profession|1": ['司机', '老司机', '小司机'],
      "createTime": '@DATETIME("yyyy-MM-dd HH:mm:ss")',
      "updateUser|1": ['张三', '李四', '王五'],
      "updateTime": '@DATETIME("yyyy-MM-dd HH:mm:ss")',
    }
  ]
})
