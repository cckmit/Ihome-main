/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-07 09:25:17
 * @LastEditors: zyc
 * @LastEditTime: 2020-09-14 16:46:51
 */
import '../util/base/extend'
import Vue from 'vue'
import App from './App.vue'
import { router } from '@/router'
import store from '@/store'
import * as dic from '../util/enums/dic'
let $dic: any = Object.assign(dic,dic.dicModular);

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

import directives from '../util/vue/directives'
import filters from '../util/vue/filters'


let instance: any = null;

if (process.env.NODE_ENV !== 'production') {
  if (process.env.VUE_APP_FLAG === 'mock') {
    require('@/mock/index')
  }
  // require('@/mock/index')
}

function render() {
  instance = new Vue({
    store,
    router,
    methods: {
      displayName(source: any, key: any) {
        let item: any = $dic[source];
        if (item) {
          return item[key];
        } else {
          console.error(source, key, '枚举类型无法匹配')
          return null;
        }
      },
      displayList(source: any, key: any) {
        let item: any = $dic[source];
        if (item) {
          let list = $dic.getListTool(item);
          return list;
        } else {
          console.error(source, key, '枚举类型无法匹配.')
          return [];
        }
      },
    },
    data: {
      paginationLayout: "total, sizes, prev, pager, next, jumper",
      pageSizes: [10, 20, 50],
      pageSize: 10,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker: any) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker: any) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker: any) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      }
    },
    render: h => h(App),
  }).$mount('#app');
  directives(Vue, instance)
  filters(Vue, instance)
}

if (!(<any>window).__POWERED_BY_QIANKUN__) {
  render();
} else {
  directives(Vue, instance)
  filters(Vue, instance)
}

// export { bootstrap,mount, unmount } from './qiankun/index'
// export const bootstrap = bootstrapApp;
// export const bootstrap = async (data: any) => {
//   console.log('vue app bootstraped', data);
// };

export async function bootstrap(data: any) {
  (data)
  // console.log('vue app bootstraped', data);
}


export async function mount(props: any) {
  // console.log('props from main app', props);
  UserModule.SetToken(props.data.token)
  UserModule.SetUserInfo(props.data.userInfo)

  // 设置主应用下发的方法,挂载再$qiankun
  Vue.prototype.$qiankun = {};
  Object.keys(props.fns).forEach((key: any) => {
    Vue.prototype[`$qiankun`][key] = props.fns[key]
  })

  props.onGlobalStateChange((state: any, prev: any) => {
    (state);
    (prev);
    // state: 变更后的状态; prev 变更前的状态
    // console.log(state, prev);
  });

  Vue.prototype.$onGlobalStateChange = props.onGlobalStateChange
  Vue.prototype.$setGlobalState = props.setGlobalState
  render();
}

export async function unmount() {
  instance.$destroy();
  instance = null;
}

