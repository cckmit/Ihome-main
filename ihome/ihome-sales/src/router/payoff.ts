/*
 * @Descripttion:
 * @version:
 * @Author: wwq
 * @Date: 2020-12-26 11:17:06
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-26 14:55:21
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
        meta: { title: '付款单新增', icon: 'form', keepAlive: true }
      },
      {
        path: 'edit',
        name: 'payoffEdit',
        component: () => import('../views/payoff/payorder/edit.vue'),
        meta: { title: '付款单编辑', icon: 'form', keepAlive: true }
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