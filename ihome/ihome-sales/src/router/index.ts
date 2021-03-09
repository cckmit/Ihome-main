/*
 * @Description: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 11:10:43
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-14 16:00:11
 */
import Vue from 'vue'
import VueRouter, { RouteConfig, Route } from 'vue-router'
// import Home from '../views/Home.vue'
import Layout from '../components/Layout.vue'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })


Vue.use(VueRouter);


import { channelRoutes } from './channel';
import { developerRoutes } from './developer';
import { contractRoutes } from './contract';
import { projectRoutes } from './project';
import { dealRoutes } from './deal';
import { applyRoutes } from './apply';
import { financeRoutes } from './finance'
import { payoffRoutes } from './payoff'
import { capitalRoutes } from './capital'
import { customerRoutes } from './customer'

let routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/home/index',
  },
  {
    path: '/home',
    meta: { title: '主页', icon: null },
    redirect: '/home/index',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'HomeIndex',
        component: () => import('../views/home/index.vue'),
        meta: { title: '首页', icon: 'form', keepAlive: true }
      },

    ]
  },
  {
    path: '/Error403',
    name: 'Error403',
    component: () => import('../views/home/403.vue'),
    meta: {
      title: '无权限',
      layout: false
    }
  },
  {
    path: '/Error404',
    name: 'Error404',
    component: () => import('../views/home/404.vue'),
    meta: {
      title: '找不到页面',
      layout: false
    }
  }
]

routes = routes.concat(channelRoutes, developerRoutes, contractRoutes, projectRoutes, dealRoutes, financeRoutes, payoffRoutes, applyRoutes, capitalRoutes, customerRoutes);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to: Route, _: Route, next: any) => {
  if (to?.matched?.length === 0) {
    //encodeURIComponent,decodeURIComponent
    (window as any).location = "/web-sales/error404?source=" + encodeURIComponent((window as any).location.href);
  } else {
    // Start progress bar
    NProgress.start()
    next();
  }
})

router.afterEach(() => {
  // Finish progress bar
  NProgress.done()

  // set page title
  // document.title = to.meta && to.meta.title
})

export { router, routes }
