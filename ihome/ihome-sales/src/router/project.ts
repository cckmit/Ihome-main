/*
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-10-22 14:45:15
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-22 15:35:55
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
        component: () => import('../views/project/list.vue'),
        meta: { title: '项目基础信息列表', icon: 'form' }
      },
      {
        path: 'add',
        name: 'projectAdd',
        component: () => import('../views/project/edit.vue'),
        meta: { title: '项目基础信息添加', icon: 'form' }
      },
      {
        path: 'edit',
        name: 'projectEdit',
        component: () => import('../views/project/edit.vue'),
        meta: { title: '项目基础信息编辑', icon: 'form' }
      }
    ]
  },

];
export { projectRoutes }