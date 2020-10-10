/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 11:10:43
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-10 15:55:24
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
    path: '/channels',
    meta: { title: '用户', icon: 'form' },
    redirect: '/channels/distributorsList',
    component: Layout,
    children: [
      // 渠道商部分的路由
      {
        path: 'distributorsList',
        name: 'DistributorsList',
        component: () => import('../views/channel/distributorsList/distributorsList.vue'),
        meta: { title: '渠道商列表', icon: 'form' }
      },
      {
        path: 'distributorsList/info',
        name: 'DistributorsListInfo',
        component: () => import('../views/channel/distributorsList/info.vue'),
        meta: { title: '渠道商详情', icon: 'form' }
      },
      {
        path: 'distributorsList/ModifyThe',
        name: 'ModifyThe',
        component: () => import('../views/channel/distributorsList/MoreOperations/ModifyThe.vue'),
        meta: { title: '渠道商录入修改页', icon: 'form' }
      },
      {
        path: 'distributorsList/confirm',
        name: 'confirm',
        component: () => import('../views/channel/distributorsList/MoreOperations/confirm.vue'),
        meta: { title: '渠道商确认', icon: 'form' }
      },
      {
        path: 'distributorsList/changeInfo',
        name: 'changeInfo',
        component: () => import('../views/channel/distributorsList/MoreOperations/changeInfo.vue'),
        meta: { title: '渠道商变更信息', icon: 'form' }
      },
      {
        path: 'distributorsList/MaintenanceOfChannels',
        name: 'MaintenanceOfChannels',
        component: () => import('../views/channel/distributorsList/MoreOperations/MaintenanceOfChannels.vue'),
        meta: { title: '维护渠道经纪人', icon: 'form' }
      },
      // 渠道等级信息变更列表
      {
        path: 'channelInfoList',
        name: 'ChannelInfoList',
        component: () => import('../views/channel/list/list.vue'),
        meta: { title: '渠道等级信息变更列表', icon: 'form' }
      },
      // 渠道评级标准列表
      {
        path: 'channelRatings',
        name: 'ChannelRatings',
        component: () => import('../views/channel/channelRatings/channelRatings.vue'),
        meta: { title: '渠道评级标准列表', icon: 'form' }
      },
      {
        path: 'channelRatings/upMethods',
        name: 'UpMethods',
        component: () => import('../views/channel/channelRatings/methodsPages/upMethods.vue'),
        meta: { title: '上传管理办法', icon: 'form' }
      },
      {
        path: 'channelRatings/viewMethods',
        name: 'ViewMethods',
        component: () => import('../views/channel/channelRatings/methodsPages/viewMethods.vue'),
        meta: { title: '查看管理办法', icon: 'form' }
      },
      // 渠道等级信息列表
      {
        path: 'channelLevel',
        name: 'ChannelLevel',
        component: () => import('../views/channel/channelLevel/channelLevel.vue'),
        meta: { title: '渠道等级信息列表', icon: 'form' }
      },
      {
        path: 'channelLevel/info',
        name: 'Info',
        component: () => import('../views/channel/channelLevel/info.vue'),
        meta: { title: '详情', icon: 'form' }
      },
      {
        path: 'channelLevel/modifyThe',
        name: 'ModifyThe',
        component: () => import('../views/channel/channelLevel/operation/ModifyThe.vue'),
        meta: { title: '等记信息录入修改页', icon: 'form' }
      },
      {
        path: 'channelLevel/levelInfoAudit',
        name: 'LevelInfoAudit',
        component: () => import('../views/channel/channelLevel/operation/levelInfoAudit.vue'),
        meta: { title: '等级信息审核页', icon: 'form' }
      },
      // 渠道呈批列表
      {
        path: 'channelAgroupOf',
        name: 'ChannelAgroupOf',
        component: () => import('../views/channel/ChannelAgroupOf/ChannelAgroupOf.vue'),
        meta: { title: '渠道呈批列表', icon: 'form' }
      },
      {
        path: 'channelAgroupOf/info',
        name: 'ChannelAgroupOfInfo',
        component: () => import('../views/channel/ChannelAgroupOf/info.vue'),
        meta: { title: '详情', icon: 'form' }
      },
      // 渠道基础信息变更列表
      {
        path: 'channelBasicInfoChange',
        name: 'ChannelBasicInfoChange',
        component: () => import('../views/channel/ChannelBasicInfoChange/ChannelBasicInfoChange.vue'),
        meta: { title: '渠道基础信息变更列表', icon: 'form' }
      },
      // 渠道邀请码列表
      {
        path: 'channelInviteCode',
        name: 'ChannelInviteCode',
        component: () => import('../views/channel/ChannelInviteCode/ChannelInviteCode.vue'),
        meta: { title: '渠道邀请码列表', icon: 'form' }
      },
      {
        path: 'channelInviteCode/addCode',
        name: 'AddChannelInviteCode',
        component: () => import('../views/channel/ChannelInviteCode/addCode.vue'),
        meta: { title: '添加渠道邀请码', icon: 'form' }
      },
      {
        path: 'channelInviteCode/info',
        name: 'channelInviteCodeInfo',
        component: () => import('../views/channel/ChannelInviteCode/info.vue'),
        meta: { title: '渠道邀请码详细信息', icon: 'form' }
      },
      // 城市等级列表
      {
        path: 'cityLevel',
        name: 'ChannelInviteCode',
        component: () => import('../views/channel/cityLevel/cityLevel.vue'),
        meta: { title: '城市等级列表', icon: 'form' }
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
