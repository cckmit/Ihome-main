/**
 * @Description: 客户信息路由
 * @version:
 * @Author: yag
 * @Date:  - 2021-02-05 11:11:54
 * @LastEditors: yag
 * @LastEditTime:  - 2021-02-05 11:11:54
 */
import { RouteConfig } from 'vue-router'
import Layout from '../components/Layout.vue';
/**
 * 客户管理路由
 * @param {type}
 * @return {type}
 */
const customerRoutes: Array<RouteConfig> = [
    {
        path: '/customer',
        meta: { title: '客户列表', icon: null },
        component: Layout,
        redirect: '/customer/list',
        children: [
            {
                path: 'list',
                name: 'getCustList',
                component: () => import('../views/customer/customer/list.vue'),
                meta: { title: '客户列表', icon: 'form', keepAlive: true }
            }
        ]
    },
    {
        path: '/report',
        meta: { title: '客户报备列表', icon: null },
        component: Layout,
        redirect: '/report/list',
        children: [
            {
                path: 'list',
                name: 'getList',
                component: () => import('../views/customer/report/list.vue'),
                meta: { title: '客户报备列表', icon: 'form', keepAlive: true }
            }
        ]
    },
    {
        path: '/report',
        meta: { title: '到访确认列表', icon: null },
        component: Layout,
        redirect: '/report/visitConfirmList',
        children: [
            {
                path: 'visitConfirmList',
                name: 'getList',
                component: () => import('../views/customer/visitConfirm/list.vue'),
                meta: { title: '到访确认列表', icon: 'form', keepAlive: true }
            }
        ]
    },
    {
        path: '/report',
        meta: { title: '成交确认列表', icon: null },
        component: Layout,
        redirect: '/report/dealConfirmList',
        children: [
            {
                path: 'dealConfirmList',
                name: 'getList',
                component: () => import('../views/customer/dealConfirm/list.vue'),
                meta: { title: '成交确认列表', icon: 'form', keepAlive: true }
            }
        ]
    }
]
export { customerRoutes }
