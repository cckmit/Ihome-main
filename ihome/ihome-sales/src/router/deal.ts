/*
 * @Description: 成交路由
 * @version:
 * @Author: ywl
 * @Date: 2020-10-26 09:25:34
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-26 10:05:18
 */

import { RouteConfig } from 'vue-router'

import Layout from '../components/Layout.vue';

const dealRoutes: Array<RouteConfig> = [
  {
    path: '/business',
    meta: { title: '业务模式', icon: 'form' },
    redirect: '/business/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'BusinessList',
        meta: { title: '业务模式列表', icon: 'form', keepAlive: true }
      }
    ]
  }
]