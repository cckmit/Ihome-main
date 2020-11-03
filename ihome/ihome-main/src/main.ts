/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 11:46:23
 * @LastEditors: zyc
 * @LastEditTime: 2020-11-03 10:57:57
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'ihome-common/ihome-theme/orange/theme/index.css'
// import 'element-ui/lib/theme-chalk/index.css';
import { registerMicroApps, setDefaultMountApp, start } from "qiankun"
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


import * as Sentry from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";
import { Integrations } from "@sentry/tracing";

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: "https://d77cd04f9e2e438695e2f8625bb0e427@o467117.ingest.sentry.io/5493023",
    integrations: [
      new VueIntegration({
        Vue,
        tracing: true,
      }),
      new Integrations.BrowserTracing(),
    ],
    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });
}




function render({ appContent, loading }: any = {}) {
  if (!app) {
    app = new Vue({
      el: "#container",
      router,
      store,
      data() {
        return {
          content: appContent,
          loading
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
}


function initApp() {
  render({ appContent: '', loading: false });
}

initApp();



// 注册子应用
registerMicroApps(apps, lifeCycles);

// 设置默认子应用,与 genActiveRule中的参数保持一致
setDefaultMountApp(defaultMountApp);

// 启动
start();

