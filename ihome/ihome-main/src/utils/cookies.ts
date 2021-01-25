/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-24 09:53:31
 * @LastEditors: zyc
 * @LastEditTime: 2021-01-25 08:54:27
 */
import Cookies from 'js-cookie'

// App
const sidebarStatusKey = 'sidebar_status'
export const getSidebarStatus = () => Cookies.get(sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus: string) => Cookies.set(sidebarStatusKey, sidebarStatus)

/**token  key
 * @param {*}
 * @return {*}
 */
const tokenKey = 'ihome-main-token'
/**获取token
 * @param {*}
 * @return {*}
 */
export const getToken = () => Cookies.get(tokenKey);
/**设置token
 * @param {string} token
 * @return {*}
 */
export const setToken = (token: string) => Cookies.set(tokenKey, token);
/**删除token
 * @param {*}
 * @return {*}
 */
export const removeToken = () => Cookies.remove(tokenKey)