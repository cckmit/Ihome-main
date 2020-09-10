import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
// import { UserModule } from '@/store/modules/user'
import { getToken, removeToken } from '../cookies'

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
        const token: any = getToken();
        if (token) {
            config.headers['Authorization'] = 'bearer ' + token;
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

        if (response.config.url?.startsWith('/sales-oauth2/oauth/token')) {
            return response.data
        } else {
            const res: any = response.data
            if (res.code !== 'Success') {
                Message({
                    message: res.msg || 'Error',
                    type: 'error',
                    duration: 5 * 1000
                })
                if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                    MessageBox.confirm(
                        'You have been logged out, try to login again.',
                        'Log out',
                        {
                            confirmButtonText: 'Relogin',
                            cancelButtonText: 'Cancel',
                            type: 'warning'
                        }
                    ).then(() => {
                        removeToken();
                        location.reload() // To prevent bugs from vue-router
                    })
                }
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
                duration: 5 * 1000
            })

        } else if (error.response.status == 403) {
            Message({
                message: '权限不足',
                type: 'error',
                duration: 5 * 1000
            })

        } else if (error.response.status >= 500) {
            Message({
                message: '系统异常' + error.response.status,
                type: 'error',
                duration: 5 * 1000
            })
        } else {
            Message({
                message: error.message,
                type: 'error',
                duration: 5 * 1000
            })

        }

        return Promise.reject(error)
    }
)

export default service