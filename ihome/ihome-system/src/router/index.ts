/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 11:10:43
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-10 09:49:33
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
  {
    path: '/api',
    name: 'api',
    component: () => import('../views/api.vue'),
    meta: {
      title: 'api'
    }
  },
  {
    path: '/user',
    meta: { title: '用户', icon: 'form' },
    redirect: '/user/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'UserList',
        component: () => import('../views/user/list.vue'),
        meta: { title: '用户列表', icon: 'form' }
      },
      {
        path: 'info',
        name: 'UserInfo',
        component: () => import('../views/user/info.vue'),
        meta: { title: '用户详情', icon: 'form' }
      },
    ]
  },
  {
    path: '/resources',
    meta: { title: '资源', icon: 'form' },
    redirect: '/resources/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'ResourcesList',
        component: () => import('../views/resources/list.vue'),
        meta: { title: '资源列表', icon: 'form' }
      },
      {
        path: 'info',
        name: 'ResourcesInfo',
        component: () => import('../views/resources/info.vue'),
        meta: { title: '资源详情', icon: 'form' }
      },
    ]
  },
  {
    path: '/role',
    meta: { title: '资源', icon: 'form' },
    redirect: '/role/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'RoleList',
        component: () => import('../views/role/list.vue'),
        meta: { title: '角色列表', icon: 'form' }
      },
      {
        path: 'info',
        name: 'RoleInfo',
        component: () => import('../views/role/info.vue'),
        meta: { title: '角色详情', icon: 'form' }
      },
    ]
  },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})




router.beforeEach(async (to: Route, _: Route, next: any) => {
  console.log(to, _, next)
  // Start progress bar
  NProgress.start()
  next();

})

router.afterEach((to: Route) => {
  console.log(to)
  // Finish progress bar
  NProgress.done()

  // set page title
  // document.title = to.meta && to.meta.title
})

export { router, routes }
