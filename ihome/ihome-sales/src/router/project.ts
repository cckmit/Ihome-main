/*
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-10-22 14:45:15
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-10 15:49:49
 */
import { RouteConfig } from 'vue-router'

import Layout from '../components/Layout.vue';
/**开发商路由
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
        meta: { title: '项目基础信息列表', icon: 'form' }
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
        meta: { title: '一手代理公司列表', icon: 'form' }
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
        path: 'info',
        name: 'firstAgencyInfo',
        component: () => import('../views/project/firstAgency/info.vue'),
        meta: { title: '一手代理公司详情', icon: 'form' }
      }
    ]
  },

];
export { projectRoutes }