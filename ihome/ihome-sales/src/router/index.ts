/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 11:10:43
 * @LastEditors: ywl
 * @LastEditTime: 2020-09-28 09:36:36
 */
import Vue from 'vue'
import VueRouter, { RouteConfig, Route } from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../components/Layout.vue'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })


Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '主页'
    }
  },
  // 二级路由列子
  // {
  //   path: '/user',
  //   meta: { title: '用户', icon: 'form' },
  //   redirect: '/user/list',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'UserList',
  //       component: () => import('../views/user/list.vue'),
  //       meta: { title: '用户列表', icon: 'form' }
  //     },
  //   ]
  // },
  {
    path: '/contract',
    meta: { title: '合同', icon: 'form' },
    redirect: '/contract/partyAList',
    component: Layout,
    children: [
      {
        path: 'partyAList',
        name: 'PartyAList',
        component: () => import( /* webpackChunkName: "PartyAList" */ '@/views/contract/partyA-list.vue'),
        meta: { title: '甲方合同列表', icon: 'form' }
      },
      {
        path: 'partyAadd',
        name: 'PartyAadd',
        component: () => import( /* webpackChunkName: "PartyAadd" */ '@/views/contract/partyA-add.vue'),
        meta: { title: '甲方合同录入', icon: 'form' }
      },
      {
        path: 'intermediaryList',
        name: 'IntermediaryList',
        component: () => import( /* webpackChunkName: "IntermediaryList" */ '@/views/contract/intermediary-list.vue'),
        meta: { title: '中介分销协议列表', icon: 'form' }
      },
      {
        path: 'intermediaryDetail',
        name: 'IntermediaryDetail',
        component: () => import( /* webpackChunkName: "IntermediaryList" */ '@/views/contract/intermediary-detail.vue'),
        meta: { title: '中介分销协议详情', icon: 'form' }
      },
      {
        path: 'strategyList',
        name: 'StrategyList',
        component: () => import( /* webpackChunkName: "StrategyList" */ '@/views/contract/strategy-list.vue'),
        meta: { title: '甲方/中介战略协议列表', icon: 'form' }
      },
      {
        path: 'strategyAdd',
        name: 'StrategyAdd',
        component: () => import( /* webpackChunkName: "StrategyAdd" */ '@/views/contract/strategy-add.vue'),
        meta: { title: '甲方/中介战略协议录入', icon: 'form' }
      },
      {
        path: 'strategyDetail',
        name: 'StrategyDetail',
        component: () => import( /* webpackChunkName: "StrategyDetail" */ '@/views/contract/strategy-detail.vue'),
        meta: { title: '甲方/中介战略协议详情', icon: 'form' }
      },
      {
        path: 'discountList',
        name: 'DiscountList',
        component: () => import( /* webpackChunkName: "DiscountList" */ '@/views/contract/discount-list.vue'),
        meta: { title: '优惠告知书列表', icon: 'form' }
      },
      {
        path: 'discountDetail',
        name: 'DiscountDetail',
        component: () => import( /* webpackChunkName: "DiscountDetail" */ '@/views/contract/discount-detail.vue'),
        meta: { title: '优惠告知书详情页', icon: 'form' }
      },
    ]
  },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})




router.beforeEach(async (to: Route, _: Route, next: any) => {
  // Start progress bar
  NProgress.start()
  next();

})

router.afterEach(() => {
  // Finish progress bar
  NProgress.done()

  // set page title
  // document.title = to.meta && to.meta.title
})

export { router, routes }
