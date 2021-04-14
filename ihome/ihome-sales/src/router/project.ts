/*
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-10-22 14:45:15
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-14 10:38:04
 */
import { RouteConfig } from 'vue-router'

import Layout from '../components/Layout.vue';
/**项目管理路由
 * @param {type} 
 * @return {type} 
 */
const projectRoutes: Array<RouteConfig> = [
  {
    path: '/projects',
    meta: { title: '项目基础信息', icon: null },
    redirect: '/projects/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'projectList',
        component: () => import('../views/project/basicsInfo/list.vue'),
        meta: { title: '项目基础信息列表', icon: 'form', keepAlive: true }
      },
      {
        path: 'parentEdit',
        name: 'projectParentEdit',
        component: () => import('../views/project/basicsInfo/parentEdit.vue'),
        meta: { title: '项目基础信息父项目编辑', icon: 'form' }
      },
      {
        path: 'parentInfo',
        name: 'projectParentInfo',
        component: () => import('../views/project/basicsInfo/parentInfo.vue'),
        meta: { title: '项目基础信息父项目详情', icon: 'form' }
      },
      {
        path: 'parentAudit',
        name: 'projectParentAudit',
        component: () => import('../views/project/basicsInfo/parentInfo.vue'),
        meta: { title: '项目基础信息父项目审核', icon: 'form' }
      },
      {
        path: 'childAdd',
        name: 'projectChildAdd',
        component: () => import('../views/project/basicsInfo/childEdit.vue'),
        meta: { title: '项目基础信息子项目添加', icon: 'form' }
      },
      {
        path: 'childEdit',
        name: 'projectChildEdit',
        component: () => import('../views/project/basicsInfo/childEdit.vue'),
        meta: { title: '项目基础信息子项目编辑', icon: 'form' }
      },
      {
        path: 'childInfo',
        name: 'projectChildInfo',
        component: () => import('../views/project/basicsInfo/childInfo.vue'),
        meta: { title: '项目基础信息子项目详情', icon: 'form' }
      },
      {
        path: 'childAudit',
        name: 'projectChildAudit',
        component: () => import('../views/project/basicsInfo/childInfo.vue'),
        meta: { title: '项目基础信息子项目审核', icon: 'form' }
      }
    ]
  },
  {
    path: '/firstAgency',
    meta: { title: '一手代理公司', icon: null },
    redirect: '/firstAgency/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'firstAgencyList',
        component: () => import('../views/project/firstAgency/list.vue'),
        meta: { title: '一手代理公司列表', icon: 'form', keepAlive: true }
      },
      {
        path: 'add',
        name: 'firstAgencyAdd',
        component: () => import('../views/project/firstAgency/edit.vue'),
        meta: { title: '一手代理公司添加', icon: 'form' }
      },
      {
        path: 'edit',
        name: 'firstAgencyEdit',
        component: () => import('../views/project/firstAgency/edit.vue'),
        meta: { title: '一手代理公司编辑', icon: 'form' }
      },
      {
        path: 'change',
        name: 'firstAgencyChange',
        component: () => import('../views/project/firstAgency/edit.vue'),
        meta: { title: '一手代理公司变更', icon: 'form' }
      },
      {
        path: 'info',
        name: 'firstAgencyInfo',
        component: () => import('../views/project/firstAgency/info.vue'),
        meta: { title: '一手代理公司详情', icon: 'form' }
      },
      {
        path: 'check',
        name: 'firstAgencyCheck',
        component: () => import('../views/project/firstAgency/info.vue'),
        meta: { title: '一手代理公司审核', icon: 'form' }
      },
      {
        path: 'revocation',
        name: 'firstAgencyRevocation',
        component: () => import('../views/project/firstAgency/info.vue'),
        meta: { title: '一手代理公司撤回', icon: 'form' }
      }
    ]
  },
  {
    path: '/projectApproval',
    meta: { title: '立项周期管理', icon: null },
    redirect: '/projectApproval/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'projectApprovalList',
        component: () => import('../views/project/projectApproval/list.vue'),
        meta: { title: '立项周期列表', icon: 'form', keepAlive: true }
      },
      {
        path: 'edit',
        name: 'projectApprovalEdit',
        component: () => import('../views/project/projectApproval/edit.vue'),
        meta: { title: '立项呈批', icon: 'form' }
      },
      {
        path: 'contractApprovalEdit',
        name: 'contractApprovalEdit',
        component: () => import('../views/project/projectApproval/info.vue'),
        meta: { title: '合同呈批', icon: 'form' }
      },
      {
        path: 'businessManagementEdit',
        name: 'businessManagementEdit',
        component: () => import('../views/project/projectApproval/info.vue'),
        meta: { title: '业管修改', icon: 'form' }
      },
      {
        path: 'info',
        name: 'projectApprovalInfo',
        component: () => import('../views/project/projectApproval/info.vue'),
        meta: { title: '立项周期详情', icon: 'form' }
      },
      {
        path: 'audit',
        name: 'projectApprovalAudit',
        component: () => import('../views/project/projectApproval/info.vue'),
        meta: { title: '立项周期审核', icon: 'form' }
      },
      {
        path: 'apply',
        name: 'projectApprovalApply',
        component: () => import('../views/project/projectApproval/apply.vue'),
        meta: { title: '立项周期申领分销协议', icon: 'form' }
      },
      {
        path: 'history',
        name: 'projectApprovalHistory',
        component: () => import('../views/project/projectApproval/history.vue'),
        meta: { title: '立项周期查看快照', icon: 'form' }
      },
      {
        path: 'normalSalesApply',
        name: 'normalSalesApply',
        component: () => import('../views/project/projectApproval/dialog/notification-dialog/notificationList/normalSales/apply.vue'),
        meta: { title: '标准联动销售确认书(启动函)', icon: 'form' }
      },
      {
        path: 'notSalesApply',
        name: 'notSalesApply',
        component: () => import('../views/project/projectApproval/dialog/notification-dialog/notificationList/notSales/apply.vue'),
        meta: { title: '非标联动销售确认书(启动函)', icon: 'form' }
      },
      {
        path: 'normalDistributionApply',
        name: 'normalDistributionApply',
        component: () => import('../views/project/projectApproval/dialog/notification-dialog/notificationList/normalDistribution/apply.vue'),
        meta: { title: '标准渠道分销合同', icon: 'form' }
      },
      {
        path: 'notDistributionApply',
        name: 'notDistributionApply',
        component: () => import('../views/project/projectApproval/dialog/notification-dialog/notificationList/notDistribution/apply.vue'),
        meta: { title: '非标渠道分销合同', icon: 'form' }
      },
      {
        path: 'notChannelApply',
        name: 'notChannelApply',
        component: () => import('../views/project/projectApproval/dialog/notification-dialog/notificationList/notChannel/apply.vue'),
        meta: { title: '非渠道类合同', icon: 'form' }
      },
      {
        path: 'normalSalesInfo',
        name: 'normalSalesInfo',
        component: () => import('../views/project/projectApproval/dialog/notification-dialog/notificationList/normalSales/info.vue'),
        meta: { title: '标准联动销售确认书详情', icon: 'form' }
      },
      {
        path: 'notSalesInfo',
        name: 'notSalesInfo',
        component: () => import('../views/project/projectApproval/dialog/notification-dialog/notificationList/notSales/info.vue'),
        meta: { title: '非标联动销售确认书详情', icon: 'form' }
      },
      {
        path: 'normalDistributionInfo',
        name: 'normalDistributionInfo',
        component: () => import('../views/project/projectApproval/dialog/notification-dialog/notificationList/normalDistribution/info.vue'),
        meta: { title: '标准渠道分销合同详情', icon: 'form' }
      },
      {
        path: 'notDistributionInfo',
        name: 'notDistributionInfo',
        component: () => import('../views/project/projectApproval/dialog/notification-dialog/notificationList/notDistribution/info.vue'),
        meta: { title: '非标渠道分销合同详情', icon: 'form' }
      },
      {
        path: 'notChannelInfo',
        name: 'notChannelInfo',
        component: () => import('../views/project/projectApproval/dialog/notification-dialog/notificationList/notChannel/info.vue'),
        meta: { title: '非渠道类合同详情', icon: 'form' }
      },
      {
        path: 'copyNormalSalesApply',
        name: 'copyNormalSalesApply',
        component: () => import('../views/project/projectApproval/dialog/notification-dialog/notificationList/normalSales/apply.vue'),
        meta: { title: '标准联动销售确认书(复制)', icon: 'form' }
      },
      {
        path: 'copyNotSalesApply',
        name: 'copyNotSalesApply',
        component: () => import('../views/project/projectApproval/dialog/notification-dialog/notificationList/notSales/apply.vue'),
        meta: { title: '非标联动销售确认书(复制)', icon: 'form' }
      },
      {
        path: 'copyNormalDistributionApply',
        name: 'copyNormalDistributionApply',
        component: () => import('../views/project/projectApproval/dialog/notification-dialog/notificationList/normalDistribution/apply.vue'),
        meta: { title: '标准渠道分销合同(复制)', icon: 'form' }
      },
      {
        path: 'copyNotDistributionApply',
        name: 'copyNotDistributionApply',
        component: () => import('../views/project/projectApproval/dialog/notification-dialog/notificationList/notDistribution/apply.vue'),
        meta: { title: '非标渠道分销合同(复制)', icon: 'form' }
      },
      {
        path: 'copyNotChannelApply',
        name: 'copyNotChannelApply',
        component: () => import('../views/project/projectApproval/dialog/notification-dialog/notificationList/notChannel/apply.vue'),
        meta: { title: '非渠道类合同(复制)', icon: 'form' }
      },
    ]
  },

];
export { projectRoutes }