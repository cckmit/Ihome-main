/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 11:10:43
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-14 16:50:22
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
  },
  {
    path: '/table',
    name: 'Table',
    component: () => import('../views/tableDemo.vue'),
    meta: {
      title: '上传组件Demo'
    }
  },
  {
    path: '/cascader',
    name: 'Cascader',
    component: () => import('../views/cascaderDemo.vue'),
    meta: {
      title: '省市区级联选择Demo'
    }
  },
  {
    path: '/selectPage',
    name: 'SelectPage',
    component: () => import('../views/selectPageDemo.vue'),
    meta: {
      title: '下拉框分页Demo'
    }
  },
  {
    path: '/selectPageDivision',
    name: 'selectPageDivision',
    component: () => import('../views/selectPageDivision.vue'),
    meta: {
      title: '下拉框分页Demo'
    }
  },

  {
    path: '/tableCheckBox',
    name: 'tableCheckBox',
    component: () => import('../views/tableCheckBoxDemo.vue'),
    meta: {
      title: '表格多选'
    }
  },
  {
    path: '/inputDigits',
    name: 'InputDigits',
    component: () => import('../views/inputDigitsDemo.vue'),
    meta: {
      title: 'input输入框限制输入小数'
    }
  },
  {
    path: '/leftRightContainer',
    name: 'leftRightContainer',
    component: () => import('../views/leftRightContainer.vue'),
    meta: {
      title: '左右拖动'
    }
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export { router, routes }
