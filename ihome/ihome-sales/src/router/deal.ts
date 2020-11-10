/*
 * @Description: 成交路由
 * @version:
 * @Author: ywl
 * @Date: 2020-10-26 09:25:34
 * @LastEditors: lsj
 * @LastEditTime: 2020-10-26 10:05:18
 */

import { RouteConfig } from 'vue-router'

import Layout from '../components/Layout.vue';
/**成交路由
 * @param {type}
 * @return {type}
 */
const dealRoutes: Array<RouteConfig> = [
  // 业务模式路由
  {
    path: '/businessModel',
    meta: { title: '业务模式', icon: 'form' },
    redirect: '/businessModel/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'BusinessModelList',
        component: () => import('@/views/deal/businessModel/list.vue'),
        meta: { title: '业务模式列表', icon: 'form', keepAlive: true }
      }
    ]
  },
  // 业绩比例方案-分公司方案列表路由
  {
    path: '/achieveScaleScheme',
    meta: { title: '业务模式', icon: 'form' },
    redirect: '/achieveScaleScheme/companyList',
    component: Layout,
    children: [
      {
        path: 'companyList',
        name: 'CompanyList',
        component: () => import('@/views/deal/achieveScaleScheme/companyList.vue'),
        meta: { title: '分公司方案列表', icon: 'form', keepAlive: true }
      },
      {
        path: 'list',
        name: 'AchieveScaleSchemeList',
        component: () => import('@/views/deal/achieveScaleScheme/list.vue'),
        meta: { title: '分公司业绩比例管理列表', icon: 'form', keepAlive: true }
      },
      {
        path: 'add',
        name: 'AchieveScaleSchemeAdd',
        component: () => import('@/views/deal/achieveScaleScheme/add.vue'),
        meta: { title: '分公司业绩比例管理新增', icon: 'form' }
      },
      {
        path: 'info',
        name: 'AchieveScaleSchemeInfo',
        component: () => import('@/views/deal/achieveScaleScheme/info.vue'),
        meta: { title: '分公司业绩比例管理详情', icon: 'form' }
      },
    ]
  },
  // 成交报告列表
  {
    path: '/dealReport',
    meta: { title: '成交报告', icon: 'form' },
    redirect: '/dealReport/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'DealReportList',
        component: () => import('@/views/deal/dealReport/list.vue'),
        meta: { title: '成交报告列表', icon: 'form', keepAlive: true }
      },
      {
        path: 'add',
        name: 'DealReportAdd',
        component: () => import('@/views/deal/dealReport/add.vue'),
        meta: { title: '成交报告新增/修改', icon: 'form' }
      },
      {
        path: 'info',
        name: 'DealReportInfo',
        component: () => import('@/views/deal/dealReport/info.vue'),
        meta: { title: '成交报告详情', icon: 'form' }
      },
      {
        path: 'achieveAllotEntry',
        name: 'AchieveAllotEntry',
        component: () => import('@/views/deal/dealReport/achieveAllotEntry.vue'),
        meta: { title: '成交业绩分配录入', icon: 'form' }
      },
      {
        path: 'changeDealInfo',
        name: 'ChangeDealInfo',
        component: () => import('@/views/deal/dealReport/changeDealInfo.vue'),
        meta: { title: '成交信息变更', icon: 'form' }
      },
      {
        path: 'previewDealInfo',
        name: 'PreviewDealInfo',
        component: () => import('@/views/deal/dealReport/previewDealInfo.vue'),
        meta: { title: '成交信息变更', icon: 'form' }
      }
    ]
  }
];
export { dealRoutes }