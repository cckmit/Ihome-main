/*
 * @Description: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 11:10:43
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-16 09:49:35
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
      // 渠道呈批列表 --- start
      {
        path: 'channelAgroupOf',
        name: 'ChannelAgroupOf',
        component: () => import('../views/channel/channelAgroupOf/channelAgroupOf.vue'),
        meta: { title: '渠道呈批列表', icon: 'form' }
      },
      {
        path: 'channelAgroupOf/info',
        name: 'ChannelAgroupOfInfo',
        component: () => import('../views/channel/channelAgroupOf/info.vue'),
        meta: { title: '详情', icon: 'form' }
      },
      // 渠道呈批列表 --- end

      // 渠道基础信息变更列表 --- start
      {
        path: 'channelBasicInfoChange',
        name: 'ChannelBasicInfoChange',
        component: () => import('../views/channel/channelBasicInfoChange/channelBasicInfoChange.vue'),
        meta: { title: '渠道基础信息变更列表', icon: 'form' }
      },
      // 渠道基础信息变更列表 --- end

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
    path: '/partyA',
    meta: { title: '甲方合同', icon: 'form' },
    redirect: '/partyA/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'PartyAList',
        component: () => import( /* webpackChunkName: "PartyAList" */ '@/views/contract/partyA-list.vue'),
        meta: { title: '甲方合同列表', icon: 'form' }
      },
      {
        path: 'add',
        name: 'PartyAadd',
        component: () => import( /* webpackChunkName: "PartyAadd" */ '@/views/contract/partyA-add.vue'),
        meta: { title: '甲方合同录入', icon: 'form' }
      },
    ]
  },
  {
    path: '/intermediary',
    meta: { title: '中介分销协议', icon: 'form' },
    redirect: '/intermediary/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'IntermediaryList',
        component: () => import( /* webpackChunkName: "IntermediaryList" */ '@/views/contract/intermediary-list.vue'),
        meta: { title: '中介分销协议列表', icon: 'form' }
      },
      {
        path: 'detail',
        name: 'IntermediaryDetail',
        component: () => import( /* webpackChunkName: "IntermediaryList" */ '@/views/contract/intermediary-detail.vue'),
        meta: { title: '中介分销协议详情', icon: 'form' }
      },
    ]
  },
  {
    path: '/strategy',
    meta: { title: '甲方/中介战略协议', icon: 'form' },
    redirect: '/strategy/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'StrategyList',
        component: () => import( /* webpackChunkName: "StrategyList" */ '@/views/contract/strategy-list.vue'),
        meta: { title: '甲方/中介战略协议列表', icon: 'form' }
      },
      {
        path: 'add',
        name: 'StrategyAdd',
        component: () => import( /* webpackChunkName: "StrategyAdd" */ '@/views/contract/strategy-add.vue'),
        meta: { title: '甲方/中介战略协议录入', icon: 'form' }
      },
      {
        path: 'detail',
        name: 'StrategyDetail',
        component: () => import( /* webpackChunkName: "StrategyDetail" */ '@/views/contract/strategy-detail.vue'),
        meta: { title: '甲方/中介战略协议详情', icon: 'form' }
      },
    ]
  },
  {
    path: '/discount',
    meta: { title: '甲方/中介战略协议', icon: 'form' },
    redirect: '/discount/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'DiscountList',
        component: () => import( /* webpackChunkName: "DiscountList" */ '@/views/contract/discount-list.vue'),
        meta: { title: '优惠告知书列表', icon: 'form' }
      },
      {
        path: 'detail',
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
  },
  {
    path: '/invitationCode',
    meta: { title: '邀请码', icon: null },
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'invitationCodeList',
        component: () => import('../views/channel/invitationCode/list.vue'),
        meta: { title: '邀请码列表', icon: 'form' }
      },
      {
        path: 'info',
        name: 'invitationCodeInfo',
        component: () => import('../views/channel/invitationCode/info.vue'),
        meta: { title: '邀请码详情', icon: 'form' }
      }
    ]
  },
  {
    path: '/approval',
    meta: { title: '渠道呈批', icon: null },
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'ApprovalList',
        component: () => import('../views/channel/approval/list.vue'),
        meta: { title: '渠道呈批列表', icon: 'form' }
      },
      {
        path: 'add',
        name: 'ApprovalAdd',
        component: () => import('../views/channel/approval/add.vue'),
        meta: { title: '渠道呈批新增', icon: 'form' }
      },
      {
        path: 'info',
        name: 'ApprovalInfo',
        component: () => import('../views/channel/approval/info.vue'),
        meta: { title: '渠道呈批详情', icon: 'form' }
      },

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
