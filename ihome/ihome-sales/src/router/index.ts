/*
 * @Description: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 11:10:43
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-16 17:23:48
 */
import Vue from 'vue'
import VueRouter, { RouteConfig, Route } from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../components/Layout.vue'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })


Vue.use(VueRouter);


import { channelRoutes } from './channel';
import { developerRoutes } from './developer';
import { contractRoutes } from './contract'

let routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '主页'
    }
  },
  {
    path: '/levelChange',
    meta: { title: '渠道等级变更管理', icon: 'form' },
    redirect: '/levelChange/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'LevelChangeList',
        component: () => import('../views/channel/channelLevelChange/list.vue'),
        meta: { title: '渠道等级信息变更列表', icon: 'form' }
      },
    ]
  },
]

routes = routes.concat(channelRoutes, developerRoutes, contractRoutes);

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
