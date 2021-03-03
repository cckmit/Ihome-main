/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2021-03-03 09:46:25
 * @LastEditors: zyc
 * @LastEditTime: 2021-03-03 11:37:40
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

function jsLog(err: any) {
    try {
        let jsLogAppId: any = getJsLogAppId();
        if (jsLogAppId) {
            try {
                let postData = {
                    type: 'vue-Vue.config.errorHandler',
                    message: err.message,
                    stack: err.stack,
                    url: window.location.href,
                    operatingSystem: '',
                    browser: '',
                    cookies: document.cookie,
                    localStorage: JSON.stringify(window.localStorage),
                    sessionStorage: JSON.stringify((window as any).polyihomeData.userInfo),
                    userAgent: navigator.userAgent
                }
                //http://jslog.zhangdada666.com/api/log/vue
                //https://localhost:44359/api/log/vue
                http.post('https://jslog.zhangdada666.com/api/log/vue', postData, {
                    headers: {
                        jsLogAppId: jsLogAppId,
                    }
                }).then((res: any) => {
                    console.log(res)

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
export default jsLog;
