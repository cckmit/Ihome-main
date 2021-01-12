/*
 * @Descripttion:
 * @version:
 * @Author: wwq
 * @Date: 2020-12-26 11:17:06
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-12 16:58:01
 */
import { RouteConfig } from 'vue-router'
import Layout from '../components/Layout.vue';
const payoffRoutes: Array<RouteConfig> = [
  {
    path: '/payoff',
    meta: { title: '结佣付款管理', icon: null },
    redirect: '/payoff/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'payoffList',
        component: () => import('../views/payoff/payorder/list.vue'),
        meta: { title: '付款单列表', icon: 'form', keepAlive: true }
      },
      {
        path: 'add',
        name: 'payoffAdd',
        component: () => import('../views/payoff/payorder/edit.vue'),
        meta: { title: '付款单新增', icon: 'form' }
      },
      {
        path: 'edit',
        name: 'payoffEdit',
        component: () => import('../views/payoff/payorder/edit.vue'),
        meta: { title: '付款单编辑', icon: 'form' }
      },
      {
        path: 'info',
        name: 'payoffInfo',
        component: () => import('../views/payoff/payorder/info.vue'),
        meta: { title: '付款单查看', icon: 'form' }
      },
      {
        path: 'replenish',
        name: 'payoffReplenish',
        component: () => import('../views/payoff/payorder/info.vue'),
        meta: { title: '付款单补充', icon: 'form' }
      },
    ]
  },
  {
    path: '/auditpay',
    meta: { title: '结佣付款管理', icon: null },
    redirect: '/auditpay/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'auditpayList',
        component: () => import('../views/payoff/auditpay/list.vue'),
        meta: { title: '审核付款申请列表', icon: 'form', keepAlive: true }
      },
      {
        path: 'audit',
        name: 'auditpayAudit',
        component: () => import('../views/payoff/auditpay/edit.vue'),
        meta: { title: '付款单审核', icon: 'form' }
      },
    ]
  },
  {
    path: '/deduction',
    meta: { title: '抵扣项费用汇总', icon: null },
    redirect: '/deduction/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'deductionList',
        component: () => import('../views/payoff/deduction/list.vue'),
        meta: { title: '抵扣项费用明细', icon: 'form', keepAlive: true }
      },
    ]
  },

];
export { payoffRoutes }