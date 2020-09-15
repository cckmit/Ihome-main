/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 11:10:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-15 18:14:40
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
  {
    path: '/channel',
    meta: { title: '用户', icon: 'form' },
    redirect: '/web-sales/',
    component: Layout,
    children: [
      {
        path: '/distributorsList',
        name: 'channel',
        component: () => import('../views/channel/distributorsList/distributorsList.vue'),
        meta: { title: '渠道商信息列表', icon: 'form' }
      },

      {
        path: '/list',
        meta: { title: '用户', icon: 'form' },
        redirect: '/web-sales/',
        component: Layout,
        children: [
          {
            path: '/list',
            name: 'list',
            component: () => import('../views/channel/list/list.vue'),
            meta: { title: '渠道合作信息列表', icon: 'form' }
          },

        ]
      },
      {
        path: '/channelRatings',
        meta: { title: '用户', icon: 'form' },
        redirect: '/web-sales/',
        component: Layout,
        children: [
          {
            path: '/',
            name: 'channelRatings',
            component: () => import('../views/channel/channelRatings/channelRatings.vue'),
            meta: { title: '渠道评级标准信息列表', icon: 'form' }
          },

        ]
      },
      //渠道商页面即将跳转的路由
      {
        path: '/change',
        meta: { title: '用户', icon: 'form' },
        redirect: '/web-sales/',
        component: Layout,
        children: [
          {
            path: '/',
            name: 'change',
            component: () => import('../views/channel/distributorsList/change.vue'),
            meta: { title: '录入修改页', icon: 'form' }
          },
        ]
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

    ]
  }]
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
