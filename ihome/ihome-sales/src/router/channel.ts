/*
 * @Description: 渠道商路由
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-16 14:16:23
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-23 18:07:46
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
                meta: { title: '邀请码列表', icon: 'form', keepAlive: true }
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
    },
    // 渠道商路由
    {
        path: '/channels',
        meta: { title: '渠道商管理', icon: 'form' },
        redirect: '/channels/list',
        component: Layout,
        children: [
            {
                path: 'list',
                name: 'DistributorsList',
                component: () => import('../views/channel/channelBusiness/list.vue'),
                meta: { title: '渠道商列表', icon: 'form', keepAlive: true }
            },
            {
                path: 'info',
                name: 'DistributorsListInfo',
                component: () => import('../views/channel/channelBusiness/info.vue'),
                meta: { title: '渠道商详情', icon: 'form' }
            },
            {
                path: 'add',
                name: 'AddChannel',
                component: () => import('../views/channel/channelBusiness/modifyThe.vue'),
                meta: { title: '渠道商录入页', icon: 'form' }
            },
            {
                path: 'edit',
                name: 'EditChannel',
                component: () => import('../views/channel/channelBusiness/modifyThe.vue'),
                meta: { title: '渠道商修改页', icon: 'form' }
            },
            {
                path: 'confirm',
                name: 'ConfirmChannel',
                component: () => import('../views/channel/channelBusiness/info.vue'),
                meta: { title: '渠道商确认', icon: 'form' }
            },
            {
                path: 'revoke',
                name: 'RevokeChannel',
                component: () => import('../views/channel/channelBusiness/info.vue'),
                meta: { title: '渠道商起草撤回', icon: 'form' }
            },
            {
                path: 'change',
                name: 'ChangeChannel',
                component: () => import('../views/channel/channelBusiness/modifyThe.vue'),
                meta: { title: '渠道商变更信息', icon: 'form' }
            },
            {
                path: 'agent',
                name: 'MaintenanceOfChannels',
                component: () => import('../views/channel/channelBusiness/agent.vue'),
                meta: { title: '维护渠道经纪人', icon: 'form' }
            },
        ]
    },
    // 渠道基础信息变更管理
    {
        path: '/channelsChange',
        meta: { title: '渠道基础信息变更管理', icon: 'form' },
        redirect: '/channelsChange/list',
        component: Layout,
        children: [
            {
                path: 'list',
                name: 'ChannelsChangeList',
                component: () => import('../views/channel/channelChange/list.vue'),
                meta: { title: '渠道基础信息变更列表', icon: 'form', keepAlive: true }
            },
            {
                path: 'info',
                name: 'ChannelChangeInfo',
                component: () => import('../views/channel/channelChange/info.vue'),
                meta: { title: '渠道基础信息变更详情', icon: 'form' }
            },
            {
                path: 'edit',
                name: 'ChannelChangeEdit',
                component: () => import('../views/channel/channelChange/edit.vue'),
                meta: { title: '修改渠道商变更信息', icon: 'form' }
            },
            {
                path: 'confirm',
                name: 'ChannelChangeConfirm',
                component: () => import('../views/channel/channelChange/info.vue'),
                meta: { title: '渠道基础信息变更确认', icon: 'form' }
            },
            {
                path: 'examine',
                name: 'ChannelChangeExamine',
                component: () => import('../views/channel/channelChange/info.vue'),
                meta: { title: '渠道基础信息变更审核', icon: 'form' }
            },
            {
                path: 'revoke',
                name: 'ChannelChangeRevoke',
                component: () => import('../views/channel/channelChange/info.vue'),
                meta: { title: '渠道基础信息变更撤回', icon: 'form' }
            },
        ]
    },
    //城市等级列表
    {
        path: '/cityLevel',
        meta: { title: '城市等级列表', icon: 'form' },
        redirect: '/cityLevel/list',
        component: Layout,
        children: [
            {
                path: 'list',
                name: 'cityLevel',
                component: () => import('../views/channel/cityLevel/list.vue'),
                meta: { title: '城市等级列表', icon: 'form' }
            },
        ]
    },
    // 渠道评级标准列表
    {
        path: '/gradeStandard',
        meta: { title: '渠道评级标准列表', icon: 'form' },
        redirect: '/gradeStandard/list',
        component: Layout,
        children: [
            {
                path: 'list',
                name: 'gradeStandardList',
                component: () => import('../views/channel/channelRatings/list.vue'),
                meta: { title: '渠道评级标准列表', icon: 'form' }
            },
        ]
    },
    // 渠道等级信息
    {
        path: '/channelLevel',
        meta: { title: '渠道等级信息列表', icon: 'form' },
        redirect: '/ChannelLevel/list',
        component: Layout,
        children: [
            {
                path: 'list',
                name: 'channelLevelList',
                component: () => import('../views/channel/channelLevel/list.vue'),
                meta: { title: '渠道等级信息列表', icon: 'form', keepAlive: true }
            },
            {
                path: 'info',
                name: 'channelLevelInfo',
                component: () => import('../views/channel/channelLevel/info.vue'),
                meta: { title: '渠道等级信息详情', icon: 'form' }
            },
            {
                path: 'add',
                name: 'channelLevelAdd',
                component: () => import('../views/channel/channelLevel/edit.vue'),
                meta: { title: '渠道等级信息新增', icon: 'form' }
            },
            {
                path: 'edit',
                name: 'channelLevelEdit',
                component: () => import('../views/channel/channelLevel/edit.vue'),
                meta: { title: '渠道等级信息修改', icon: 'form' }
            },
            {
                path: 'recall',
                name: 'channelLevelRecall',
                component: () => import('../views/channel/channelLevel/info.vue'),
                meta: { title: '渠道等级信息撤回', icon: 'form' }
            },
            {
                path: 'audit',
                name: 'channelLevelAudit',
                component: () => import('../views/channel/channelLevel/info.vue'),
                meta: { title: '渠道等级信息审核', icon: 'form' }
            },
            {
                path: 'change',
                name: 'channelLevelChange',
                component: () => import('../views/channel/channelLevel/edit.vue'),
                meta: { title: '渠道等级变更信息', icon: 'form' }
            },
        ]
    },
    // 渠道等级变更管理
    {
        path: '/levelChange',
        meta: { title: '渠道等级变更管理', icon: 'form' },
        redirect: '/levelChange/list',
        component: Layout,
        children: [
            {
                path: 'list',
                name: 'LevelChangeList',
                component: () => import('../views/channel/channelLevelChange/list.vue'),
                meta: { title: '渠道等级信息变更列表', icon: 'form' }
            },
            {
                path: 'info',
                name: 'LevelChangeInfo',
                component: () => import('../views/channel/channelLevelChange/info.vue'),
                meta: { title: '渠道等级信息变更详情', icon: 'form' }
            },
            {
                path: 'edit',
                name: 'LevelChangeEdit',
                component: () => import('../views/channel/channelLevelChange/edit.vue'),
                meta: { title: '渠道等级信息变更修改', icon: 'form' }
            },
            {
                path: 'revoke',
                name: 'LevelChangeRevoke',
                component: () => import('../views/channel/channelLevelChange/info.vue'),
                meta: { title: '渠道等级信息变更修改', icon: 'form' }
            },
            {
                path: 'examine',
                name: 'LevelChangeExamine',
                component: () => import('../views/channel/channelLevelChange/info.vue'),
                meta: { title: '渠道等级信息变更审核', icon: 'form' }
            }
        ]
    },
];
export { channelRoutes }