/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 11:10:43
 * @LastEditors: wwq
 * @LastEditTime: 2020-09-21 08:58:42
 */
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'ts主页'
    }
  },
  {
    path: '/pre',
    name: 'Pre',
    component: () => import('../views/pre.vue'),
    meta: {
      title: '图片pdf预览'
    }
  },
  {
    path: '/upload',
    name: 'Upload',
    component: () => import('../views/uploadDemo.vue'),
    meta: {
      title: '上传组件Demo'
    }
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export { router, routes }
