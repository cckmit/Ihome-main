/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-02 09:47:51
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-07 15:53:19
 */
const Mock = require('mockjs');
import { treeList } from './tree'
export const organization = treeList;
export const usersList = Mock.mock({
    "total": 105,
    "list|10": [
        {
            "id": '@increment(1)',
            "name": "@ctitle",
            "address": "@cparagraph",
            "date": "@date(yyyy-MM-dd hh:mm:ss)"
        }
    ]
})

