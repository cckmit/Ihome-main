/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-22 09:00:11
 * @LastEditors: zyc
 * @LastEditTime: 2020-10-26 17:57:54
 */
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
// import { UserModule } from '@/store/modules/user'
import { getToken, removeToken } from '../cookies'
const messageTime = 3000;//弹出消息的提示时间
const service = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API,
    timeout: 60000
});
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

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


        // Add X-Access-Token header to every request, you can add other custom headers here
        const token: any = getToken();

        if (token) {
            config.headers['Authorization'] = 'bearer ' + token;
        }

        // if (token) {
        //     if (config.url?.startsWith('http://filesvr.polyihome.test/aist-filesvr-web/webUploader/uploadAll')) {
        //         // console.log(config.url)
        //     } else {
        //         config.headers['Authorization'] = 'bearer ' + token;
        //     }
        // }
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

        if (response.config.url?.startsWith('/sales-oauth2/oauth/token') || response.config.url?.startsWith('/sales-api/sales-oauth2/oauth/token')) {
            return response.data
        }
        //  else if (response.config.url?.startsWith('http://filesvr.polyihome.test/aist-filesvr-web/webUploader/uploadAll')) {
        //     return response.data
        // } 
        else {
            const res: any = response.data
            if (res.code !== 'Success') {
                Message({
                    message: res.msg || 'Error',
                    type: 'error',
                    duration: messageTime
                })
                // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                //     MessageBox.confirm(
                //         'You have been logged out, try to login again.',
                //         'Log out',
                //         {
                //             confirmButtonText: 'Relogin',
                //             cancelButtonText: 'Cancel',
                //             type: 'warning'
                //         }
                //     ).then(() => {
                //         removeToken();
                //         location.reload() // To prevent bugs from vue-router
                //     })
                // }
                return Promise.reject(new Error(res.msg || 'Error'))
            } else {
                return res.data;
            }
        }


    },
    (error) => {
        // console.log(error);
        // console.log(error.response);
        // console.log(error.message);
        if (error.response.status == 401) {
            Message({
                message: '请先登录',
                type: 'error',
                duration: messageTime
            });
            removeToken();
            if (window.location.pathname != '/login') {
                (window as any).location = '/login';
            }


        } else if (error.response.status == 403) {
            Message({
                message: '权限不足',
                type: 'error',
                duration: messageTime
            })

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
                message: error.message,
                type: 'error',
                duration: messageTime
            })

        }

        return Promise.reject(error)
    }
)

export default service