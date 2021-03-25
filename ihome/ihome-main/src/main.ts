/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 11:46:23
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-25 18:57:30
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'ihome-common/ihome-theme/theme/index.css'
// import 'element-ui/lib/theme-chalk/index.css';
import { registerMicroApps, setDefaultMountApp, start, addGlobalUncaughtErrorHandler } from "qiankun"
import { apps, lifeCycles } from './qiankun/register-app'
import { actions } from './qiankun/actions'
import { defaultMountApp } from './setting'

Vue.config.productionTip = false
if (process.env.NODE_ENV == 'development') {
  // require('./mock/index')
  // if (process.env.VUE_APP_FLAG === 'mock') {
  //   require('./mock/index')
  // }
} else {
  // require('./mock/index')
}
// require('./mock/index')
Vue.use(ElementUI);


// 将action对象绑到Vue原型上，为了项目中其他地方使用方便
Vue.prototype.$actions = actions
let app: any = null;
import { get_dict_getAll, get_area_getAll, post_sessionUser_getUserInfo } from '@/api/system'


//异常配置捕获  errorHandler,warnHandler,renderError,errorCaptured
// Vue.config.errorHandler = function (err, vm, info) {
//   console.log(`main.ts=> Vue.config.errorHandler------ Error: ${err.toString()};`);
//   console.log(err.message, err.stack);
//   console.log(err, vm, info);
// };



/** 
 * Sentry异常监控部分
// import * as Sentry from "@sentry/browser";
// import { Vue as VueIntegration } from "@sentry/integrations";
// import { Integrations } from "@sentry/tracing";

// if (process.env.NODE_ENV === 'production') {
//   Sentry.init({
//     dsn: "https://d77cd04f9e2e438695e2f8625bb0e427@o467117.ingest.sentry.io/5493023",
//     integrations: [
//       new VueIntegration({
//         Vue,
//         tracing: true,
//       }),
//       new Integrations.BrowserTracing(),
//     ],
//     // We recommend adjusting this value in production, or using tracesSampler
//     // for finer control
//     tracesSampleRate: 1.0,
//   });
// }
*/



//window全局变量共享数据
(window as any).polyihomeData = {
  userInfo: {},
  areaAll: [],
  dictAll: {}
};
let systemToast = false;//提示一次
let salesToast = false;//提示一次
let reportToast = false;//提示一次
//全局异常捕获
addGlobalUncaughtErrorHandler((event: any) => {

  let errMsg = event?.message;
  if (errMsg) {
    if (errMsg.includes("application 'ihome-web-sales' died in status LOADING_SOURCE_CODE")) {
      if (!salesToast) {
        ElementUI.Message({
          message: 'sales模块加载失败',
          type: 'error'
        });
        salesToast = true;
        console.log('qiankun-sales全局异常捕获');
        console.log(event);
      }

    } else if (errMsg.includes("application 'ihome-web-system' died in status LOADING_SOURCE_CODE")) {
      if (!systemToast) {
        ElementUI.Message({
          message: 'system模块加载失败',
          type: 'error'
        });
        systemToast = true;
        console.log('qiankun-system全局异常捕获');
        console.log(event);
      }
    }
    else if (errMsg.includes("application 'ihome-web-report' died in status LOADING_SOURCE_CODE")) {
      if (!reportToast) {
        ElementUI.Message({
          message: 'report模块加载失败',
          type: 'error'
        });
        reportToast = true;
        console.log('qiankun-report全局异常捕获');
        console.log(event);
      }
    }
  } else {
    console.log(event);
  }

});

async function render({ appContent, loading }: any = {}) {

  // Promise.all([post_sessionUser_getUserInfo()]).then((res: any) => {
  //   userInfo = res[0];
  //   (window as any).polyihomeData.userInfo = userInfo;
  // })
  try {
    const resUserInfo: any = await post_sessionUser_getUserInfo({ terminalType: "Pc" });
    (window as any).polyihomeData.userInfo = resUserInfo;
  } catch (error) {
    (error);
  } finally {
    Promise.all([get_area_getAll(), get_dict_getAll()]).then((res: any) => {
      (window as any).polyihomeData.areaAll = res[0];
      (window as any).polyihomeData.dictAll = res[1];

    })
      .catch((err: any) => {
        console.error('系统初始化数据存在异常', err)
      }).finally(() => {
        if (!app) {
          app = new Vue({
            el: "#container",
            router,
            store,
            data() {
              return {
                content: appContent,
                loading,
                userInfo: (window as any).polyihomeData.userInfo,
                crumbs: [{ name: '' }]
              };
            },
            render(h) {
              return h(App, {
                props: {
                  content: (<any>this).content,
                  loading: (<any>this).loading
                }
              });
            }
          });
        } else {
          app.content = appContent;
          app.loading = loading;
        }
        // 注册子应用
        registerMicroApps(apps, lifeCycles);

        // 设置默认子应用,与 genActiveRule中的参数保持一致
        setDefaultMountApp(defaultMountApp);

        // 启动
        start();

      })
  }


}

(window as any).isQianKunMain = true;//此参数用于子项目是否嵌套主项目，还是单独运行
function initApp() {
  render({ appContent: '', loading: false });
}

initApp();




