/*
 * @Description: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 11:10:43
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-01 15:55:38
 */
import Vue from 'vue'
import VueRouter, { RouteConfig, Route } from 'vue-router'
import Home from '../views/Home.vue'
// import Layout from '../components/Layout.vue'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })


Vue.use(VueRouter);


import { channelRoutes } from './channel';
import { developerRoutes } from './developer';
import { contractRoutes } from './contract';
import { projectRoutes } from './project';
import { dealRoutes } from './deal';
import { financeRoutes } from './finance'

let routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '主页'
    }
  },
]

routes = routes.concat(channelRoutes, developerRoutes, contractRoutes, projectRoutes, dealRoutes, financeRoutes);

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
