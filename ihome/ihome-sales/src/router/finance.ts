/*
 * @Description: 财务管理路由
 * @version:
 * @Author: ywl
 * @Date: 2020-12-01 15:49:07
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-06 09:02:36
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
    redirect: '/bankBranch/list',
    children: [
      {
        path: 'list',
        name: 'bankBranchList',
        component: () => import('../views/finance/bankBranch/list.vue'),
        meta: { title: '银行网点列表', icon: 'form', keepAlive: true }
      }
    ]
  },
  {
    path: '/receiptAccount',
    meta: { title: '收款账号', icon: null },
    component: Layout,
    redirect: '/receiptAccount/list',
    children: [
      {
        path: 'list',
        name: 'receiptAccountList',
        component: () => import('../views/finance/receiptAccount/list.vue'),
        meta: { title: '收款账号列表', icon: 'form', keepAlive: true }
      }
    ]
  },
  {
    path: '/invoiceTax',
    meta: { title: '发票税率维护', icon: null },
    component: Layout,
    redirect: '/invoiceTax/list',
    children: [
      {
        path: 'list',
        name: 'InvoiceTaxList',
        component: () => import('../views/finance/invoiceTax/list.vue'),
        meta: { title: '发票税率维护列表', icon: 'form', keepAlive: true }
      },
      // {
      //   path: 'add',
      //   name: 'InvoiceAdd',
      //   component: () => import('../views/finance/invoice/add.vue'),
      //   meta: { title: '发票税率维护添加', icon: 'form' }
      // },
      {
        path: 'info',
        name: 'InvoiceTaxInfo',
        component: () => import('../views/finance/invoiceTax/info.vue'),
        meta: { title: '发票税率维护详情', icon: 'form' }
      }
    ]
  },
  {
    path: '/pos',
    meta: { title: 'POS机管理', icon: null },
    component: Layout,
    redirect: '/pos/list',
    children: [
      {
        path: 'list',
        name: 'POSList',
        component: () => import('../views/finance/pos/list.vue'),
        meta: { title: 'POS机管理列表', icon: 'form', keepAlive: true }
      },
      {
        path: 'info',
        name: 'POSInfo',
        component: () => import('../views/finance/pos/info.vue'),
        meta: { title: 'POS机详情', icon: 'form' }
      },
    ]
  },
  {
    path: '/posApply',
    meta: { title: 'POS申请事项', icon: null },
    component: Layout,
    redirect: '/posApply/list',
    children: [
      {
        path: 'list',
        name: 'POSApplyList',
        component: () => import('../views/finance/posApply/list.vue'),
        meta: { title: 'POS申请事项列表', icon: 'form', keepAlive: true }
      },
      {
        path: 'info',
        name: 'POSApplyInfo',
        component: () => import('../views/finance/posApply/info.vue'),
        meta: { title: 'POS申请事项详情', icon: 'form' }
      },
    ]
  },
  {
    path: '/invoice',
    meta: { title: '开票', icon: null },
    component: Layout,
    redirect: '/invoice/list',
    children: [
      {
        path: 'list',
        name: 'invoiceList',
        component: () => import('../views/finance/invoice/list.vue'),
        meta: { title: '开票列表', icon: 'form', keepAlive: true }
      },
      {
        path: 'info',
        name: 'invoiceInfo',
        component: () => import('../views/finance/invoice/info.vue'),
        meta: { title: '开票详情', icon: 'form' }
      }
    ]
  },
  {
    path: '/payment',
    meta: { title: '收款', icon: null },
    component: Layout,
    redirect: '/payment/list',
    children: [
      {
        path: 'list',
        name: 'paymentList',
        component: () => import('../views/finance/payment/list.vue'),
        meta: { title: '收款列表', icon: 'form', keepAlive: true }
      },
      {
        path: 'info',
        name: 'paymentInfo',
        component: () => import('../views/finance/payment/info.vue'),
        meta: { title: '收款详情', icon: 'form' }
      },
    ]
  }
]
export { financeRoutes }
