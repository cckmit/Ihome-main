/*
 * @Description: file content
 * @version:
 * @Author: ywl
 * @Date: 2021-01-07 10:29:54
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-07 16:33:36
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
  }
]

export { applyRoutes }
