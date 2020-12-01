/*
 * @Description: 财务管理路由
 * @version:
 * @Author: ywl
 * @Date: 2020-12-01 15:49:07
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-01 16:54:00
 */
import { RouteConfig } from 'vue-router'

import Layout from '../components/Layout.vue';
/**
 * 财务管理路由
 * @param {type} 
 * @return {type} 
 */
const financeRoutes: Array<RouteConfig> = [
  {
    path: '/bankBranch',
    meta: { title: '银行网点', icon: null },
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'bankBranchList',
        component: () => import('../views/finance/bankBranch/list.vue'),
        meta: { title: '邀请码列表', icon: 'form', keepAlive: true }
      }
    ]
  },
  {
    path: '/receiptAccount',
    meta: { title: '收款账号', icon: null },
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'receiptAccountList',
        component: () => import('../views/finance/receiptAccount/list.vue'),
        meta: { title: '收款账号列表', icon: 'form', keepAlive: true }
      }
    ]
  }
]
export { financeRoutes }
