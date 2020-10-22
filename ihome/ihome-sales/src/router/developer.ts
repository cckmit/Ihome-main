/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-16 14:16:23
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-19 11:48:21
 */

import { RouteConfig } from 'vue-router'

import Layout from '../components/Layout.vue';
/**开发商路由
 * @param {type} 
 * @return {type} 
 */
const developerRoutes: Array<RouteConfig> = [
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
        path: 'add',
        name: 'developerAdd',
        component: () => import('../views/developer/edit.vue'),
        meta: { title: '开发商信息录入添加', icon: 'form' }
      }, {
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
        path: 'info',
        name: 'developerInfo',
        component: () => import('../views/developer/info.vue'),
        meta: { title: '开发商信息详情', icon: 'form' }
      },
      {
        path: 'check',
        name: 'developerCheck',
        component: () => import('../views/developer/info.vue'),
        meta: { title: '开发商信息审核', icon: 'form' }
      },
      {
        path: 'revocation',
        name: 'developerRevocation',
        component: () => import('../views/developer/info.vue'),
        meta: { title: '开发商信息撤回', icon: 'form' }
      }
    ]
  },

];
export { developerRoutes }