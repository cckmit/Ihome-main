/*
 * @Description: file content
 * @version:
 * @Author: ywl
 * @Date: 2021-01-07 10:29:54
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-13 15:08:48
 */
import { RouteConfig } from 'vue-router'

import Layout from '../components/Layout.vue';
/**
 * 请佣管理路由
 * @param {type} 
 * @return {type} 
 */
const applyRoutes: Array<RouteConfig> = [
  {
    path: '/applyRec',
    meta: { title: '请佣申请列表', icon: null },
    component: Layout,
    redirect: '/applyRec/list',
    children: [
      {
        path: 'list',
        name: 'applyRecList',
        component: () => import('../views/apply/applyRec/list.vue'),
        meta: { title: '请佣申请列表', icon: 'form', keepAlive: true }
      },
      {
        path: 'add',
        name: 'applyRecAdd',
        component: () => import('../views/apply/applyRec/add.vue'),
        meta: { title: '发起请佣申请', icon: 'form' }
      }
    ]
  },
  {
    path: '/returnConfirm',
    meta: { title: '回款登记确认', icon: null },
    component: Layout,
    redirect: '/returnConfirm/list',
    children: [
      {
        path: 'list',
        name: 'returnConfirm',
        component: () => import('../views/apply/returnConfirm/list.vue'),
        meta: { title: '回款登记确认', icon: 'form', keepAlive: true }
      },
    ]
  },
  {
    path: '/deductSum',
    meta: { title: '抵扣项费用汇总', icon: null },
    component: Layout,
    redirect: '/deductSum/list',
    children: [
      {
        path: 'list',
        name: 'deductList',
        component: () => import('../views/apply/deductSum/list.vue'),
        meta: { title: '抵扣项费用汇总', icon: 'form', keepAlive: true }
      },
    ]
  },
  {
    path: '/deduct',
    meta: { title: '抵扣项费用明细', icon: null },
    component: Layout,
    redirect: '/deduct/list',
    children: [
      {
        path: 'list',
        name: 'deductList',
        component: () => import('../views/apply/deduct/list.vue'),
        meta: { title: '抵扣项费用明细', icon: 'form', keepAlive: true }
      },
    ]
  }
]

export { applyRoutes }
