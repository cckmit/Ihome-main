/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-24 10:03:21
 * @LastEditors: zyc
 * @LastEditTime: 2020-06-24 10:29:27
 */
const Mock = require('mockjs')
Mock.setup({
    timeout: 100
})
const tokenRes = {
    "assess_token": "xxxxxxx",
    "token_type": "bearer",
    "refresh_token": "yyyyyyy",
    "expires_in": 4,
    "scope": "default-scope",
    "jti": "zzzzzz"
}
Mock.mock('/sales-oauth2/token', 'get', tokenRes)
// Mock.mock('/sales-oauth2/token?grant=password&client_id=test-client&client_secret=test_secret&username=admin&password=123456', 'get', tokenRes)
