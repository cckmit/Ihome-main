/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-09-08 09:56:09
 * @LastEditors: zyc
 * @LastEditTime: 2020-09-08 10:05:52
 */
import Cookies from 'js-cookie'

// App
const sidebarStatusKey = 'sidebar_status'
export const getSidebarStatus = () => Cookies.get(sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus: string) => Cookies.set(sidebarStatusKey, sidebarStatus)

// User
const tokenKey = 'ihome-main-token'
export const getToken = () => Cookies.get(tokenKey)
export const setToken = (token: string) => Cookies.set(tokenKey, token)
export const removeToken = () => Cookies.remove(tokenKey)