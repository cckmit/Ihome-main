/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-22 09:00:11
 * @LastEditors: zyc
 * @LastEditTime: 2021-03-04 16:01:11
 */
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
// import { UserModule } from '@/store/modules/user'
import { getToken, removeToken } from '../cookies'
const messageTime = 5000;//弹出消息的提示时间
const service = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API,
    timeout: 60000
});
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { jsLogHttp } from '../../app/js-log'

NProgress.configure({ showSpinner: false })
// Request interceptors
service.interceptors.request.use(
    (config) => {
        // console.log(config)
        // let a = config.url?.includes;
        let url: string = config.url || '';

        if (url.includes('}')) {
            if (config.method == 'get') {
                Object.keys(config.params || {}).forEach(k => {
                    let oldStr = '{' + k + '}'
                    let newStr = config.params[k]
                    config.url = url.replace(oldStr, newStr);
                    delete config.params[k];
                })
            } else {
                Object.keys(config.data || {}).forEach(k => {
                    let oldStr = '{' + k + '}'
                    let newStr = config.data[k]
                    config.url = url.replace(oldStr, newStr);
                    delete config.data[k];
                })
            }
        }
        const token: any = getToken();
        if (token) {
            config.headers['Authorization'] = 'bearer ' + token;
        }
        NProgress.start();
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)
// Response interceptors
service.interceptors.response.use(
    (response) => {

        NProgress.done();
        // if (response.config.url?.startsWith('/sales-oauth2/oauth/token') || response.config.url?.startsWith('/sales-api/sales-oauth2/oauth/token')) {
        //     return response.data
        // }

        const res: any = response.data
        if (res.code !== 'Success') {
            if (res.code == "E1500") {
                jsLogHttp(response, "http系统处理异常E1500");
            } else {
                jsLogHttp(response, "http业务异常上报_" + res.code + "_" + res.msg);
            }
            Message({
                message: res.msg || 'Error',
                type: 'error',
                duration: messageTime
            })
            return Promise.reject(res);
        } else {
            return res.data;
        }
    },
    (error: any) => {
        jsLogHttp(error?.response, "http上报非200");
        NProgress.done();
        if (error.response.status == 401) {
            if (!error.response.config.url?.startsWith('/sales-api/system/sessionUser/getUserInfo')) {
                Message({
                    message: '请先登录',
                    type: 'error',
                    duration: messageTime
                });
                removeToken();
                if (window.location.pathname != '/login') {
                    (window as any).location = '/login';
                }
            }
        } else if (error.response.status == 403) {
            Message({
                message: '权限不足',
                type: 'error',
                duration: messageTime
            });
            (window as any).location = "/web-sales/error403?source=" + encodeURIComponent((window as any).location.href) + "&api=" + encodeURIComponent(error.response.config.url);
        } else if (error.response.status == 404) {
            Message({
                message: '接口404',
                type: 'error',
                duration: messageTime
            })
        }
        else if (error.response.status >= 500) {
            Message({
                message: '系统异常' + error.response.status,
                type: 'error',
                duration: messageTime
            })
        } else {
            Message({
                message: `[${error.response.status}]` + error.message,
                type: 'error',
                duration: messageTime
            })
        }
        return Promise.reject(error)
    }
)

export default service