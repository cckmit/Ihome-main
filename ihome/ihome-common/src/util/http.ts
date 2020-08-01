/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-23 17:15:45
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-01 09:59:39
 */
import axios from "axios";
import { Message } from 'element-ui';


axios.defaults.maxContentLength = 100000000;
axios.defaults.timeout = 0; //响应时间
axios.defaults.baseURL = '';   //配置接口地址

//  axios.defaults.headers['Content-type'] = 'application/x-www-form-urlencoded';

axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.error("request error", error);
        return Promise.reject(error);
    }
);

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
    res => {
        const data = res.data;
        if (data.code === 0) {
            return data.result;
        }
        else {
            return Promise.reject(data);
        }
    },
    error => {
        Message.error('系统异常：' + error.response.status);
        console.log(error)
        if (error.response.status == 401 || error.response.status == 403) {
            console.log('未登录：' + error.response.status)
        }
    }
);
//所有的ajax请求，非200，401,403响应的，直接抛出 系统异常+状态码
//get,post,put,delete,all需要自己处理异常
//$get,$post,$put,$delete,$all不需要自己处理异常，异常直接弹出提示


// export default axios;
export default {
    /**get请求，需要处理业务异常
     * @param {type} 
     * @return: 
     */
    get(url: string, params: any | null) {
        return axios.get(url, { params: params })
    },
    /**post请求，需要处理业务异常
     * @param {type} 
     * @return: 
     */
    post(url: string, params: any | null) {
        return axios.post(url, params)
    },
    /**put请求，需要处理业务异常
    * @param {type} 
    * @return: 
    */
    put(url: string, params: any | null) {
        return axios.put(url, params)
    },
    /**delete请求，需要处理业务异常
    * @param {type} 
    * @return: 
    */
    delete(url: string, params: any | null) {
        return axios.delete(url, params)
    },
    /**合并请求，需要处理业务异常
    * @param {type} 
    * @return: 
    */
    all(arr: any) {
        return axios.all(arr)
    },


    /**get请求，业务异常自动弹出
     * @param {type} 
     * @return: 
     */
    $get(url: string, params: any | null) {
        return new Promise((resolve, reject) => {
            axios.get(url, { params: params }).then(res => {
                return resolve(res);
            }).catch(err => {
                Message({
                    message: err.msg,
                    type: 'warning'
                });
                return reject(err);
            })
        })
    },
    /**post请求，业务异常自动弹出
     * @param {type} 
     * @return: 
     */
    $post(url: string, params: any | null) {
        return new Promise((resolve, reject) => {
            axios.post(url, params).then(res => {
                return resolve(res);
            }).catch(err => {
                Message({
                    message: err.msg,
                    type: 'warning'
                });
                return reject(err);
            })
        })
    },
    /**put请求，业务异常自动弹出
     * @param {type} 
     * @return: 
     */
    $put(url: string, params: any | null) {
        return new Promise((resolve, reject) => {
            axios.put(url, params).then(res => {
                return resolve(res);
            }).catch(err => {
                Message({
                    message: err.msg,
                    type: 'warning'
                });
                return reject(err);
            })
        })
    },
    /**delete请求，业务异常自动弹出
     * @param {type} 
     * @return: 
     */
    $delete(url: string, params: any | null) {
        return new Promise((resolve, reject) => {
            axios.delete(url, params).then(res => {
                return resolve(res);
            }).catch(err => {
                Message({
                    message: err.msg,
                    type: 'warning'
                });
                return reject(err);
            })
        })
    },
    /**合并请求，业务异常自动弹出
     * @param {type} 
     * @return: 
     */
    $all(arr: any) {
        return new Promise((resolve, reject) => {
            axios.all(arr).then(res => {
                return resolve(res);
            }).catch(err => {
                Message({
                    message: err.msg,
                    type: 'warning'
                });
                return reject(err);
            })
        })
    },
    interceptors: axios.interceptors
}