/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 11:10:43
 * @LastEditors: lgf
 * @LastEditTime: 2020-09-16 10:27:09
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
        path: '/info',
        meta: { title: '用户', icon: 'form' },
        redirect: '/web-sales/',
        component: Layout,
        children: [
          {
            path: '/',
            name: 'info',
            component: () => import('../views/channel/distributorsList/info.vue'),
            meta: { title: '详情', icon: 'form' }
          },
        ]
      },
      {
        path: '/ModifyThe',
        meta: { title: '用户', icon: 'form' },
        redirect: '/web-sales/',
        component: Layout,
        children: [
          {
            path: '/',
            name: 'ModifyThe',
            component: () => import('../views/channel/distributorsList/MoreOperations/ModifyThe.vue'),
            meta: { title: '录入修改页', icon: 'form' }
          },
        ]
      },

      {
        path: '/confirm',
        meta: { title: '用户', icon: 'form' },
        redirect: '/web-sales/',
        component: Layout,
        children: [
          {
            path: '/',
            name: 'confirm',
            component: () => import('../views/channel/distributorsList/MoreOperations/confirm.vue'),
            meta: { title: '确认', icon: 'form' }
          },
        ]
      },
      {
        path: '/changeInfo',
        meta: { title: '用户', icon: 'form' },
        redirect: '/web-sales/',
        component: Layout,
        children: [
          {
            path: '/',
            name: 'changeInfo',
            component: () => import('../views/channel/distributorsList/MoreOperations/changeInfo.vue'),
            meta: { title: '变更信息', icon: 'form' }
          },
        ]
      },
      {
        path: '/MaintenanceOfChannels',
        meta: { title: '用户', icon: 'form' },
        redirect: '/web-sales/',
        component: Layout,
        children: [
          {
            path: '/',
            name: 'MaintenanceOfChannels',
            component: () => import('../views/channel/distributorsList/MoreOperations/MaintenanceOfChannels.vue'),
            meta: { title: '维护渠道经纪人', icon: 'form' }
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
