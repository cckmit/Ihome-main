/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-29 16:35:01
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-01 16:43:44
 */
import axios from 'axios'
import { Message } from 'element-ui'
import { UserModule } from '@/store/modules/user'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: true, minimum: 0.2 })
const service = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API,
    timeout: 50000
})

// Request interceptors
service.interceptors.request.use(
    (config) => {
        console.log(config)

        // let a = config.url?.includes;
        let url: string = config.url || '';
        if (url.includes('}')) {
            if (config.method == 'get') {
                //对{id}等参数进行替换
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
        if (UserModule.token) {
            config.headers['X-Access-Token'] = UserModule.token
        }
        NProgress.start()
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)

// Response interceptors
service.interceptors.response.use(
    (response) => {
        NProgress.done()
        if (response.config.url == '/sales-oauth2/token') {
            return response.data
        } else {
            const res = response.data
            if (res.code !== 'Success') {
                Message({
                    message: res.msg,
                    type: 'warning',
                    duration: 5 * 1000
                })
                return Promise.reject(res)
            } else {
                return response.data.data;
            }
        }


    },
    (error) => {
        NProgress.done()


        if (error.response.status == 401 || error.response.status == 403) {
            Message({
                message: '请重新登录',
                type: 'error',
                duration: 5 * 1000
            })

        } else {
            var originalRequest = error.config;
            if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout') != -1 && !originalRequest._retry) {
                originalRequest._retry = true;
                console.error('请求超时:' + originalRequest.timeout + ';url=' + originalRequest.url)
                return axios.request(originalRequest);
            }
            let message = '系统异常';
            if (error && error.response) {
                message += error.response.status;
            }
            Message({
                message: message,
                type: 'error',
                duration: 5 * 1000
            })

            return Promise.reject({
                err: -1,
                error: error
            });

        }

        return Promise.reject(error)
    }
)

export default service