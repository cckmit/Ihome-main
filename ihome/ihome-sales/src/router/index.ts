/*
 * @Description: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 11:10:43
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-16 15:31:11
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
  // 渠道商路由
  {
    path: '/channels',
    meta: { title: '渠道商管理', icon: 'form' },
    redirect: '/channels/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'DistributorsList',
        component: () => import('../views/channel/distributorsList/list.vue'),
        meta: { title: '渠道商列表', icon: 'form' }
      },
      {
        path: 'info',
        name: 'DistributorsListInfo',
        component: () => import('../views/channel/distributorsList/info.vue'),
        meta: { title: '渠道商详情', icon: 'form' }
      },
      {
        path: 'add',
        name: 'AddChannel',
        component: () => import('../views/channel/distributorsList/modifyThe.vue'),
        meta: { title: '渠道商录入页', icon: 'form' }
      },
      {
        path: 'edit',
        name: 'EditChannel',
        component: () => import('../views/channel/distributorsList/modifyThe.vue'),
        meta: { title: '渠道商修改页', icon: 'form' }
      },
      {
        path: 'confirm',
        name: 'ConfirmChannel',
        component: () => import('../views/channel/distributorsList/info.vue'),
        meta: { title: '渠道商确认', icon: 'form' }
      },
      {
        path: 'revoke',
        name: 'RevokeChannel',
        component: () => import('../views/channel/distributorsList/info.vue'),
        meta: { title: '渠道商起草撤回', icon: 'form' }
      },
      {
        path: 'change',
        name: 'ChangeChannel',
        component: () => import('../views/channel/distributorsList/modifyThe.vue'),
        meta: { title: '渠道商变更信息', icon: 'form' }
      },
      {
        path: 'agent',
        name: 'MaintenanceOfChannels',
        component: () => import('../views/channel/distributorsList/agent.vue'),
        meta: { title: '维护渠道经纪人', icon: 'form' }
      },
    ]
  },
  // 渠道基础信息变更管理
  {
    path: '/channelsChange',
    meta: { title: '渠道基础信息变更管理', icon: 'form' },
    redirect: '/channelsChange/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'ChannelsChangeList',
        component: () => import('../views/channel/channelChange/list.vue'),
        meta: { title: '渠道基础信息变更列表', icon: 'form' }
      },
      {
        path: 'info',
        name: 'ChannelChangeInfo',
        component: () => import('../views/channel/channelChange/info.vue'),
        meta: { title: '渠道基础信息变更详情', icon: 'form' }
      },
      {
        path: 'edit',
        name: 'ChannelChangeEdit',
        component: () => import('../views/channel/channelChange/edit.vue'),
        meta: { title: '修改渠道商变更信息', icon: 'form' }
      },
      {
        path: 'confirm',
        name: 'ChannelChangeConfirm',
        component: () => import('../views/channel/channelChange/info.vue'),
        meta: { title: '渠道基础信息变更确认', icon: 'form' }
      },
      {
        path: 'examine',
        name: 'ChannelChangeExamine',
        component: () => import('../views/channel/channelChange/info.vue'),
        meta: { title: '渠道基础信息变更审核', icon: 'form' }
      },
      {
        path: 'revoke',
        name: 'ChannelChangeRevoke',
        component: () => import('../views/channel/channelChange/info.vue'),
        meta: { title: '渠道基础信息变更撤回', icon: 'form' }
      },
    ]
  },

  //城市等级列表
  {
    path: '/cityLevel',
    meta: { title: '城市等级列表', icon: 'form' },
    redirect: '/cityLevel/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'cityLevel',
        component: () => import('../views/channel/cityLevel/list.vue'),
        meta: { title: '城市等级列表', icon: 'form' }
      },
    ]
  },
  // 渠道评级标准列表
  {
    path: '/gradeStandard',
    meta: { title: '渠道评级标准列表', icon: 'form' },
    redirect: '/gradeStandard/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'gradeStandardList',
        component: () => import('../views/channel/channelRatings/list.vue'),
        meta: { title: '渠道评级标准列表', icon: 'form' }
      },
    ]
  },
  // 渠道等级信息
  {
    path: '/channelLevel',
    meta: { title: '渠道等级信息列表', icon: 'form' },
    redirect: '/ChannelLevel/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'channelLevelList',
        component: () => import('../views/channel/channelLevel/list.vue'),
        meta: { title: '渠道等级信息列表', icon: 'form' }
      },
      {
        path: 'info',
        name: 'channelLevelInfo',
        component: () => import('../views/channel/channelLevel/info.vue'),
        meta: { title: '渠道等级信息详情', icon: 'form' }
      },
      {
        path: 'add',
        name: 'channelLevelAdd',
        component: () => import('../views/channel/channelLevel/edit.vue'),
        meta: { title: '渠道等级信息新增', icon: 'form' }
      },
      {
        path: 'edit',
        name: 'channelLevelEdit',
        component: () => import('../views/channel/channelLevel/edit.vue'),
        meta: { title: '渠道等级信息修改', icon: 'form' }
      },
      {
        path: 'recall',
        name: 'channelLevlRecall',
        component: () => import('../views/channel/channelLevel/info.vue'),
        meta: { title: '渠道等级信息撤回', icon: 'form' }
      },
      {
        path: 'audit',
        name: 'channelLevlAudit',
        component: () => import('../views/channel/channelLevel/info.vue'),
        meta: { title: '渠道等级信息审核', icon: 'form' }
      },
      {
        path: 'change',
        name: 'channelLevlChange',
        component: () => import('../views/channel/channelLevel/edit.vue'),
        meta: { title: '渠道等级变更信息', icon: 'form' }
      },
    ]
  },
  {
    path: '/xx',
    meta: { title: '用户', icon: 'form' },
    redirect: '/xx/distributorsList',
    component: Layout,
    children: [
      // 渠道等级信息变更列表 --- start
      {
        path: 'channelInfoList',
        name: 'ChannelInfoList',
        component: () => import('../views/channel/list/list.vue'),
        meta: { title: '渠道等级信息变更列表', icon: 'form' }
      },
      // 渠道等级信息变更列表 --- end
    ]
  },
  {
    path: '/developers',
    meta: { title: '开发商管理', icon: null },
    redirect: '/developers/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'developerList',
        component: () => import('../views/developer/list.vue'),
        meta: { title: '开发商列表', icon: 'form' }
      },
      {
        path: 'edit',
        name: 'developerEdit',
        component: () => import('../views/developer/edit.vue'),
        meta: { title: '开发商信息录入修改', icon: 'form' }
      },
      {
        path: 'change',
        name: 'developerChange',
        component: () => import('../views/developer/edit.vue'),
        meta: { title: '开发商信息变更', icon: 'form' }
      },
      {
        path: 'details',
        name: 'developerDetails',
        component: () => import('../views/developer/details.vue'),
        meta: { title: '开发商信息详情', icon: 'form' }
      },
      {
        path: 'check',
        name: 'developerCheck',
        component: () => import('../views/developer/details.vue'),
        meta: { title: '开发商信息审核', icon: 'form' }
      },
      {
        path: 'revocation',
        name: 'developerRevocation',
        component: () => import('../views/developer/details.vue'),
        meta: { title: '开发商信息撤回', icon: 'form' }
      }
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
