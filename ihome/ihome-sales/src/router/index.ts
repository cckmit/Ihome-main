/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 11:10:43
 * @LastEditors: wwq
 * @LastEditTime: 2020-09-25 08:57:16
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
  {
    path: '/developer',
    meta: { title: '开发商管理', icon: null },
    redirect: '/developer/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'developerList',
        component: () => import('../views/developer/list.vue'),
        meta: { title: '开发商列表', icon: 'form' }
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
