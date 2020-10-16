/*
 * @Description: 渠道商路由
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-16 14:16:23
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-16 15:01:44
 */

import { RouteConfig } from 'vue-router'

import Layout from '../components/Layout.vue';
/**渠道路由
 * @param {type} 
 * @return {type} 
 */
const channelRoutes: Array<RouteConfig> = [
    {
        path: '/invitationCode',
        meta: { title: '邀请码', icon: null },
        component: Layout,
        children: [
            {
                path: 'list',
                name: 'invitationCodeList',
                component: () => import('../views/channel/invitationCode/list.vue'),
                meta: { title: '邀请码列表', icon: 'form' }
            },
            {
                path: 'info',
                name: 'invitationCodeInfo',
                component: () => import('../views/channel/invitationCode/info.vue'),
                meta: { title: '邀请码详情', icon: 'form' }
            }
        ]
    },
    {
        path: '/approval',
        meta: { title: '渠道呈批', icon: null },
        component: Layout,
        children: [
            {
                path: 'list',
                name: 'ApprovalList',
                component: () => import('../views/channel/approval/list.vue'),
                meta: { title: '渠道呈批列表', icon: 'form' }
            },
            {
                path: 'add',
                name: 'ApprovalAdd',
                component: () => import('../views/channel/approval/add.vue'),
                meta: { title: '渠道呈批新增', icon: 'form' }
            },
            {
                path: 'info',
                name: 'ApprovalInfo',
                component: () => import('../views/channel/approval/info.vue'),
                meta: { title: '渠道呈批详情', icon: 'form' }
            },

        ]
    }
];
export { channelRoutes }