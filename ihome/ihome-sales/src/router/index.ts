/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 11:10:43
 * @LastEditors: lgf
 * @LastEditTime: 2020-09-29 14:13:33
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
  //渠道商信息列表
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
      //渠道合作信息列表
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
      //渠道评级标准信息列表
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
      //渠道商等级信息列表
      {
        path: '/channelLevel',
        meta: { title: '用户', icon: 'form' },
        redirect: '/web-sales/',
        component: Layout,
        children: [
          {
            path: '/',
            name: 'channelLevel',
            component: () => import('../views/channel/channelLevel/channelLevel.vue'),
            meta: { title: '渠道商等级信息列表', icon: 'form' }
          },

        ]
      },
      //渠道商等级即将跳转的路由
      {
        path: '/channelLevel/info',
        meta: { title: '用户', icon: 'form' },
        redirect: '/web-sales/',
        component: Layout,
        children: [
          {
            path: '/',
            name: 'info',
            component: () => import('../views/channel/channelLevel/info.vue'),
            meta: { title: '详情', icon: 'form' }
          },
        ]
      },
      {
        path: '/channelLevel/ModifyThe',
        meta: { title: '用户', icon: 'form' },
        redirect: '/web-sales/',
        component: Layout,
        children: [
          {
            path: '/',
            name: 'info',
            component: () => import('../views/channel/channelLevel/operation/ModifyThe.vue'),
            meta: { title: '等记信息录入修改页', icon: 'form' }
          },
        ]
      },
      {
        path: '/channelLevel/levelInfoAudit',
        meta: { title: '用户', icon: 'form' },
        redirect: '/web-sales/',
        component: Layout,
        children: [
          {
            path: '/',
            name: 'info',
            component: () => import('../views/channel/channelLevel/operation/levelInfoAudit.vue'),
            meta: { title: '等级信息审核页', icon: 'form' }
          },
        ]
      },
      //渠道呈批列表
      {
        path: '/ChannelAgroupOf',
        meta: { title: '用户', icon: 'form' },
        redirect: '/web-sales/',
        component: Layout,
        children: [
          {
            path: '/',
            name: 'ChannelAgroupOf',
            component: () => import('../views/channel/ChannelAgroupOf/ChannelAgroupOf.vue'),
            meta: { title: '渠道呈批列表', icon: 'form' }
          },

        ]
      },
      //渠道呈批列表即将跳转路由
      {
        path: '/ChannelAgroupOf/info',
        meta: { title: '用户', icon: 'form' },
        redirect: '/web-sales/',
        component: Layout,
        children: [
          {
            path: '/',
            name: 'info',
            component: () => import('../views/channel/ChannelAgroupOf/info.vue'),
            meta: { title: '详情', icon: 'form' }
          },
        ]
      },

      //渠道基础信息变更列表
      {
        path: '/ChannelBasicInfoChange',
        meta: { title: '用户', icon: 'form' },
        redirect: '/web-sales/',
        component: Layout,
        children: [
          {
            path: '/',
            name: 'ChannelBasicInfoChange',
            component: () => import('../views/channel/ChannelBasicInfoChange/ChannelBasicInfoChange.vue'),
            meta: { title: '渠道基础信息变更列表', icon: 'form' }
          },

        ]
      },

      //渠道邀请码列表
      {
        path: '/ChannelInviteCode',
        meta: { title: '用户', icon: 'form' },
        redirect: '/web-sales/',
        component: Layout,
        children: [
          {
            path: '/',
            name: 'ChannelInviteCode',
            component: () => import('../views/channel/ChannelInviteCode/ChannelInviteCode.vue'),
            meta: { title: '渠道邀请码列表', icon: 'form' }
          },

        ]
      },
      {
        path: '/cityLevel',
        meta: { title: '用户', icon: 'form' },
        redirect: '/web-sales/',
        component: Layout,
        children: [
          {
            path: '/',
            name: 'ChannelInviteCode',
            component: () => import('../views/channel/cityLevel/cityLevel.vue'),
            meta: { title: '城市等级列表', icon: 'form' }
          },

        ]
      },
      //渠道邀请码即将跳转的路由
      {
        path: '/ChannelInviteCode/addCode',
        meta: { title: '用户', icon: 'form' },
        redirect: '/web-sales/',
        component: Layout,
        children: [
          {
            path: '/',
            name: 'ChannelInviteCode',
            component: () => import('../views/channel/ChannelInviteCode/addCode.vue'),
            meta: { title: '添加渠道邀请码', icon: 'form' }
          },

        ]
      },
      {
        path: '/info',
        meta: { title: '用户', icon: 'form' },
        redirect: '/web-sales/',
        component: Layout,
        children: [
          {
            path: '/',
            name: 'info',
            component: () => import('../views/channel/ChannelInviteCode/info.vue'),
            meta: { title: '详细信息', icon: 'form' }
          },

        ]
      },

      //渠道商页面即将跳转的路由
      {
        path: '/distributorsList/info',
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
        path: '/distributorsList/confirm',
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
