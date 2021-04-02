/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 11:10:43
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-19 10:09:10
 */
import Vue from 'vue'
import VueRouter, { RouteConfig, Route } from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../components/Layout.vue'
(Layout);
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
    path: '/achievement',
    meta: { title: '报表管理', icon: 'form' },
    redirect: '/achievement/managerMonthlyReport',
    component: Layout,
    children: [
      {
        path: 'managerMonthlyReport',
        name: 'ManagerMonthlyReport',
        component: () => import('../views/achievement/managerMonthlyReport.vue'),
        meta: { title: '管理者月报', icon: 'form', keepAlive: true }
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
  if (to?.matched?.length === 0) {
    //encodeURIComponent,decodeURIComponent
    (window as any).location = "/web-sales/error404?source=" + encodeURIComponent((window as any).location.href);
  } else {
    // Start progress bar
    NProgress.start()
    next();
  }
})


router.afterEach(() => {
  // Finish progress bar
  NProgress.done()

  // set page title
  // document.title = to.meta && to.meta.title
})


export { router, routes }
