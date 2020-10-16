/*
 * @Description: 合同管理路由
 * @version: 
 * @Author: ywl
 * @Date: 2020-10-16 15:19:48
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-16 15:23:02
 */
import { RouteConfig } from 'vue-router'

import Layout from '../components/Layout.vue';

const contractRoutes: Array<RouteConfig> = [
  {
    path: '/partyA',
    meta: { title: '甲方合同', icon: 'form' },
    redirect: '/partyA/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'PartyAList',
        component: () => import( /* webpackChunkName: "PartyAList" */ '@/views/contract/partyA-list.vue'),
        meta: { title: '甲方合同列表', icon: 'form' }
      },
      {
        path: 'add',
        name: 'PartyAadd',
        component: () => import( /* webpackChunkName: "PartyAadd" */ '@/views/contract/partyA-add.vue'),
        meta: { title: '甲方合同录入', icon: 'form' }
      },
    ]
  },
  {
    path: '/intermediary',
    meta: { title: '中介分销协议', icon: 'form' },
    redirect: '/intermediary/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'IntermediaryList',
        component: () => import( /* webpackChunkName: "IntermediaryList" */ '@/views/contract/intermediary-list.vue'),
        meta: { title: '中介分销协议列表', icon: 'form' }
      },
      {
        path: 'detail',
        name: 'IntermediaryDetail',
        component: () => import( /* webpackChunkName: "IntermediaryList" */ '@/views/contract/intermediary-detail.vue'),
        meta: { title: '中介分销协议详情', icon: 'form' }
      },
    ]
  },
  {
    path: '/strategy',
    meta: { title: '甲方/中介战略协议', icon: 'form' },
    redirect: '/strategy/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'StrategyList',
        component: () => import( /* webpackChunkName: "StrategyList" */ '@/views/contract/strategy-list.vue'),
        meta: { title: '甲方/中介战略协议列表', icon: 'form' }
      },
      {
        path: 'add',
        name: 'StrategyAdd',
        component: () => import( /* webpackChunkName: "StrategyAdd" */ '@/views/contract/strategy-add.vue'),
        meta: { title: '甲方/中介战略协议录入', icon: 'form' }
      },
      {
        path: 'detail',
        name: 'StrategyDetail',
        component: () => import( /* webpackChunkName: "StrategyDetail" */ '@/views/contract/strategy-detail.vue'),
        meta: { title: '甲方/中介战略协议详情', icon: 'form' }
      },
    ]
  },
  {
    path: '/discount',
    meta: { title: '甲方/中介战略协议', icon: 'form' },
    redirect: '/discount/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'DiscountList',
        component: () => import( /* webpackChunkName: "DiscountList" */ '@/views/contract/discount-list.vue'),
        meta: { title: '优惠告知书列表', icon: 'form' }
      },
      {
        path: 'detail',
        name: 'DiscountDetail',
        component: () => import( /* webpackChunkName: "DiscountDetail" */ '@/views/contract/discount-detail.vue'),
        meta: { title: '优惠告知书详情页', icon: 'form' }
      },
    ]
  },
];
export { contractRoutes }