/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2021-03-03 09:46:25
 * @LastEditors: zyc
 * @LastEditTime: 2021-03-03 16:01:02
 */

import http from 'axios'
function getJsLogAppId() {
    let write = true;//配置上报参数
    let appid = null;
    if (write) {
        let arr = window.location.hostname.split('.');
        appid = 'JvHengPC_' + arr.join("_");
    }
    return appid;
}

function jsLog(err: any, type: any) {
    try {
        err = err || {};
        let jsLogAppId: any = getJsLogAppId();
        if (jsLogAppId) {
            let userInfo = (window as any).polyihomeData.userInfo || {};
            try {
                let postData = {
                    type: type || 'vue-Vue.config.errorHandler',
                    message: err.message,
                    stack: err.stack,
                    url: window.location.href,
                    operatingSystem: '',
                    browser: '',
                    cookies: document.cookie,
                    localStorage: '',
                    sessionStorage: "userInfo：id=" + userInfo.id + ",name=" + userInfo.name + ",account=" + userInfo.account,
                    userAgent: navigator.userAgent
                }
                //http://jslog.zhangdada666.com/api/log/vue
                //https://localhost:44359/api/log/vue
                http.post('https://jslog.zhangdada666.com/api/log/vue', postData, {
                    headers: {
                        jsLogAppId: jsLogAppId,
                    }
                }).then((res: any) => {
                    (res);
                    // console.log(res)

                }).catch((err: any) => {
                    console.log(err)
                })
            } catch (error) {
                console.log(error)
            }
        }

    } catch (error) {
        console.error('js上报异常', error);
    }
}
function jsLogHttp(response: any, type: string) {
    try {
        let jsLogAppId: any = getJsLogAppId();
        if (jsLogAppId) {
            let userInfo = (window as any).polyihomeData.userInfo || {};
            let config = response?.config || {};
            let request = response?.request || {};
            try {
                let postData = {
                    type: type || 'http请求数据',
                    url: window.location.href,
                    cookies: document.cookie,
                    localStorage: '',
                    userInfo: "userInfo：id=" + userInfo.id + ",name=" + userInfo.name + ",account=" + userInfo.account,
                    userAgent: navigator.userAgent,
                    StatusCode: response?.status + ' ' + config?.method,
                    RequestURL: config.responseURL,
                    RequestHeaders: JSON.stringify(config.headers),
                    RequestBody: config.data,
                    Response: request.responseText,
                    Remark: '',
                }
                let url = 'https://jslog.zhangdada666.com/api/log/Http'
                if (type == 'http系统处理异常E1500') {
                    url = 'https://jslog.zhangdada666.com/api/log/HttpError'
                }
                http.post(url, postData, {
                    headers: {
                        jsLogAppId: jsLogAppId,
                    }
                }).then((res: any) => {
                    (res);
                    // console.log(res)

                }).catch((err: any) => {
                    console.log(err)
                })
            } catch (error) {
                console.log(error)
            }
        }

    } catch (error) {
        console.error('js,http上报异常', error);
    }

}
export { jsLog, jsLogHttp };
