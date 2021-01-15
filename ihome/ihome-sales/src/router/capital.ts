/*
 * @Description: 其他渠道费用管理
 * @version:
 * @Author: lsj
 * @Date: 2021-01-14 21:45:50
 * @LastEditors: lsj
 * @LastEditTime: 2021-01-14 21:55:22
 */

import { RouteConfig } from 'vue-router'

import Layout from '../components/Layout.vue';
/**
 * 其他渠道费用路由
 * @param {type}
 * @return {type}
 */
const capitalRoutes: Array<RouteConfig> = [
  // 其他渠道费用明细
  {
    path: '/details',
    meta: { title: '其他渠道费用明细', icon: 'form' },
    redirect: '/details/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'DetailsList',
        component: () => import('@/views/capital/details/list.vue'),
        meta: { title: '其他渠道费用明细列表', icon: 'form', keepAlive: true }
      }
    ]
  },
  // 其他渠道费用汇总
  {
    path: '/summary',
    meta: { title: '其他渠道费用汇总', icon: 'form' },
    redirect: '/summary/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'SummaryList',
        component: () => import('@/views/capital/summary/list.vue'),
        meta: { title: '其他渠道费用汇总列表', icon: 'form', keepAlive: true }
      }
    ]
  },
  // 其他渠道费用报表
  {
    path: '/report',
    meta: { title: '成交报告', icon: 'form' },
    redirect: '/report/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'ReportList',
        component: () => import('@/views/capital/report/list.vue'),
        meta: { title: '其他渠道费用报表列表', icon: 'form', keepAlive: true }
      }
    ]
  }
];
export { capitalRoutes }