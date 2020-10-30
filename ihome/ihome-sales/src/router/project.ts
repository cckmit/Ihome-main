/*
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-10-22 14:45:15
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-29 09:29:36
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
        path: 'add',
        name: 'projectAdd',
        component: () => import('../views/project/basicsInfo/edit.vue'),
        meta: { title: '项目基础信息添加', icon: 'form' }
      },
      {
        path: 'edit',
        name: 'projectEdit',
        component: () => import('../views/project/basicsInfo/edit.vue'),
        meta: { title: '项目基础信息编辑', icon: 'form' }
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