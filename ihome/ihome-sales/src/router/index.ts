/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 11:10:43
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-10 18:27:14
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
    ]
  },
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
  }, {
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
  }

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
