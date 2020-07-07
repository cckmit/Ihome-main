/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-29 16:35:01
 * @LastEditors: zyc
 * @LastEditTime: 2020-06-29 17:29:25
 */
import axios from 'axios'
import { Message } from 'element-ui'
import { UserModule } from '@/store/modules/user'

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
            //对{id}等参数进行替换
            Object.keys(config.params || {}).forEach(k => {
                let oldStr = '{' + k + '}'
                let newStr = config.params[k]
                config.url = url.replace(oldStr, newStr);
                delete config.params[k];
            })
        }
        // Add X-Access-Token header to every request, you can add other custom headers here
        if (UserModule.token) {
            config.headers['X-Access-Token'] = UserModule.token
        }
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)

// Response interceptors
service.interceptors.response.use(
    (response) => {
        if (response.config.url == '/sales-oauth2/token') {
            return response.data
        } else {
            const res = response.data
            if (res.code !== 0) {
                return Promise.reject(new Error(res.msg || 'Error'))
            } else {
                return response.data
            }
        }


    },
    (error) => {
        Message({
            message: error.msg,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service