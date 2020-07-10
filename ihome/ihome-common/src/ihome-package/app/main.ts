/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-29 16:35:15
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-10 09:52:56
 */
/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-28 17:38:36
 * @LastEditors: zyc
 * @LastEditTime: 2020-06-28 17:38:49
 */
import Vue from 'vue'
import App from './App.vue'
import { router } from '@/router'
import store from '@/store'
// import '@/public-path'
if ((<any>window).__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = (<any>window).__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}


import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import '../ihome-theme/theme/index.css'

import '../ui/css/ihome-ui.scss'
import { UserModule } from '@/store/modules/user'

import IhHome from '../ui/src/index'
import { Tool } from '../util/tool'

Vue.use(IhHome);
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$tool = new Tool();

let instance: any = null;
require('@/mock/index')
// if (process.env.NODE_ENV !== 'production') {
//   if (process.env.VUE_APP_FLAG === 'mock') {
//     require('@/mock/index')
//   }
// }

function render() {
  instance = new Vue({
    store,
    router,
    render: h => h(App),
  }).$mount('#app');
}

if (!(<any>window).__POWERED_BY_QIANKUN__) {
  render();
}

// export { bootstrap,mount, unmount } from './qiankun/index'
// export const bootstrap = bootstrapApp;
// export const bootstrap = async (data: any) => {
//   console.log('vue app bootstraped', data);
// };

export async function bootstrap(data: any) {
  console.log('vue app bootstraped', data);
}


export async function mount(props: any) {
  console.log('props from main app', props);
  UserModule.SetToken(props.data.token)
  UserModule.SetUserInfo(props.data.userInfo)

  // 设置主应用下发的方法,挂载再$qiankun
  Vue.prototype.$qiankun = {};
  Object.keys(props.fns).forEach((key: any) => {
    Vue.prototype[`$qiankun`][key] = props.fns[key]
  })

  props.onGlobalStateChange((state: any, prev: any) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev);
  });

  Vue.prototype.$onGlobalStateChange = props.onGlobalStateChange
  Vue.prototype.$setGlobalState = props.setGlobalState
  render();
}

export async function unmount() {
  instance.$destroy();
  instance = null;
}

