/*
 * @Description: 合同管理路由
 * @version: 
 * @Author: ywl
 * @Date: 2020-10-16 15:19:48
 * @LastEditors: ywl
 * @LastEditTime: 2021-03-18 10:26:14
 */
import { RouteConfig } from 'vue-router'

import Layout from '../components/Layout.vue';

const contractRoutes: Array<RouteConfig> = [
  {
    path: '/partyA',
    meta: { title: '甲方合同列表', icon: 'form' },
    redirect: '/partyA/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'PartyAList',
        component: () => import( /* webpackChunkName: "PartyAList" */ '@/views/contract/partyA/list.vue'),
        meta: { title: '甲方合同列表', icon: 'form', keepAlive: true }
      },
      {
        path: 'edit',
        name: 'PartyAEdit',
        component: () => import( /* webpackChunkName: "PartyAEdit" */ '@/views/contract/partyA/edit.vue'),
        meta: { title: '甲方合同编辑', icon: 'form' }
      },
      {
        path: 'info',
        name: 'PartyAInfo',
        component: () => import( /* webpackChunkName: "PartyAInfo" */ '@/views/contract/partyA/info.vue'),
        meta: { title: '甲方合同详情', icon: 'form' }
      }
    ]
  },
  {
    path: '/distribution',
    meta: { title: '渠道分销协议列表', icon: 'form' },
    redirect: '/distribution/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'DistributionList',
        component: () => import( /* webpackChunkName: "DistributionList" */ '@/views/contract/distribution/list.vue'),
        meta: { title: '渠道分销协议列表', icon: 'form', keepAlive: true }
      },
      {
        path: 'apply',
        name: 'DistributionApply',
        component: () => import(/* webpackChunkName: "DistributionApply" */ '@/views/contract/distribution/apply.vue'),
        meta: { title: '渠道分销协议申领', icon: 'form' }
      },
      {
        path: 'info',
        name: 'DistributionDetail',
        component: () => import( /* webpackChunkName: "DistributionDetail" */ '@/views/contract/distribution/info.vue'),
        meta: { title: '渠道分销协议详情', icon: 'form' }
      },
      {
        path: 'duplicate',
        name: 'DistributionDuplicate',
        component: () => import( /* webpackChunkName: "DistributionDuplicate" */ '@/views/contract/distribution/info.vue'),
        meta: { title: '渠道分销协议盖章版归档', icon: 'form' }
      },
      {
        path: 'original',
        name: 'DistributionOriginal',
        component: () => import(/* webpackChunkName: "DistributionOriginal" */ '@/views/contract/distribution/info.vue'),
        meta: { title: '渠道分销协议原件归档', icon: 'form' }
      }
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
        component: () => import( /* webpackChunkName: "StrategyList" */ '@/views/contract/strategy/list.vue'),
        meta: { title: '甲方/中介战略协议列表', icon: 'form', keepAlive: true }
      },
      {
        path: 'add',
        name: 'StrategyAdd',
        component: () => import( /* webpackChunkName: "StrategyAdd" */ '@/views/contract/strategy/add.vue'),
        meta: { title: '甲方/中介战略协议录入', icon: 'form' }
      },
      {
        path: 'edit',
        name: 'StrategyEdit',
        component: () => import( /* webpackChunkName: "StrategyEdit" */ '@/views/contract/strategy/add.vue'),
        meta: { title: '甲方/中介战略协议编辑', icon: 'form' }
      },
      {
        path: 'info',
        name: 'StrategyDetail',
        component: () => import( /* webpackChunkName: "StrategyDetail" */ '@/views/contract/strategy/info.vue'),
        meta: { title: '甲方/中介战略协议详情', icon: 'form' }
      },
      {
        path: 'archived',
        name: 'scanArchived',
        component: () => import( /* webpackChunkName: "ScanArchived" */ '@/views/contract/strategy/info.vue'),
        meta: { title: '甲方/中介战略协议扫描件归档', icon: 'form' }
      }
    ]
  },
  {
    path: '/discount',
    meta: { title: '优惠告知书列表', icon: 'form' },
    redirect: '/discount/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'DiscountList',
        component: () => import( /* webpackChunkName: "DiscountList" */ '@/views/contract/discount/list.vue'),
        meta: { title: '优惠告知书列表', icon: 'form', keepAlive: true }
      },
      {
        path: 'info',
        name: 'DiscountDetail',
        component: () => import( /* webpackChunkName: "DiscountDetail" */ '@/views/contract/discount/info.vue'),
        meta: { title: '优惠告知书详情页', icon: 'form' }
      },
      {
        path: 'replenish',
        name: 'DiscountReplenish',
        component: () => import( /* webpackChunkName: "DiscountReplenish" */ '@/views/contract/discount/replenish.vue'),
        meta: { title: '发起补充协议', icon: 'form' }
      },
      {
        path: 'audit',
        name: 'DiscountAudit',
        component: () => import( /* webpackChunkName: "DiscountAudit" */ '@/views/contract/discount/audit.vue'),
        meta: { title: '优惠告知书业管审核', icon: 'form' }
      },
    ]
  },
];
export { contractRoutes }