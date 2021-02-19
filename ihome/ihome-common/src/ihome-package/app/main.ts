
/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-07 09:25:17
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-19 14:32:04
 */
/* eslint-disable  no-console  */
/* eslint-disable  no-extra-semi  */
import '../util/base/extend'
import Vue from 'vue'
import App from './App.vue'
import { router } from '@/router'
import { Location } from 'vue-router/types/router.d'
import store from '@/store'
// import * as dic from '../util/enums/dic'
// let $dic: any = Object.assign(dic, dic.dicModular);

import { get_dict_getAll, get_area_getAll, post_sessionUser_getUserInfo } from '@/api/system'

// import '@/public-path'
if ((<any>window).__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = (<any>window).__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}


import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// import '../ihome-theme/theme/index.css'
import '../ihome-theme/theme/index.css'
import { MyMath } from '../util/math'
import '../ui/css/ihome-ui.scss'
import { UserModule } from '@/store/modules/user'

import registerIhomeCommon from '../ui/src/index';
registerIhomeCommon(Vue);

import { Tool } from '../util/tool'
import { RoleTool } from '../util/roleTool'
import VueCropper from 'vue-cropper'

Vue.use(VueCropper)

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$tool = new Tool();
Vue.prototype.$roleTool = new RoleTool();
Vue.prototype.$math = new MyMath();
Vue.prototype.$goto = function (location: Location) {
  (window as any).activatedRefresh = location.path;
  this.$router.push(location)
}
import directives from '../util/vue/directives'
import filters from '../util/vue/filters'


let instance: any = null;

if (process.env.NODE_ENV !== 'production') {
  if (process.env.VUE_APP_FLAG === 'mock') {
    require('@/mock/index')
  }
  // require('@/mock/index')
}


function newVue() {
  let areaAll: any = (window as any).polyihomeData?.areaAll || {};//全部行政区数据
  let dictAll: any = (window as any).polyihomeData?.dictAll || [];//存在后端加载的所有字典数据
  let userInfo: any = (window as any).polyihomeData?.userInfo || {};//用户信息
  instance = new Vue({
    store,
    router,
    methods: {
      /**根据字典类别获取该分类的列表
       * @param {type} 
       * @return {type} 
       */
      dictAllList(category: any, tag?: any) {
        let list: any[] = dictAll[category];
        if (list) {
          if (tag) {
            let listTag = list.filter((item: any) => {
              if (item.tag == tag) {
                return true;
              } else {
                return false;
              }
            })
            return listTag;

          } else {
            return list;
          }

        } else {
          console.error(category, '字典类型无法匹配.')
          return [];
        }
      },
      /**根据字典code和类别获取对应的name
       * @param {type} 
       * @return {type} 
       */
      dictAllName(data: any, category: any) {
        if (data === undefined || data === null) {
          return null;
        } else {
          let list: any[] = dictAll[category];
          if (list) {
            let item: any = list.filter((i: any) => {
              if (i.code == data) {
                return true;
              } else {
                return false;
              }
            })
            if (item && item.length == 1) {
              return item[0].name;
            } else if (item && item.length > 1) {
              console.error(data, category, item, '字典匹配到多项.返回第一项');
              return item[0].name;
            } else {
              console.error(data, category, '字典无法匹配到数据');
              return null;
            }
          } else {
            console.error(category, '字典类型无法匹配.')
            return null;
          }
        }
      },
      /**根据字典code和类别获取对应的name
      * @param {type} 
      * @return {type} 
      */
      dictAllItem(data: any, category: any) {
        if (data === undefined || data === null) {
          return {}
        } else {
          let list: any[] = dictAll[category];
          if (list) {
            let item: any = list.filter((i: any) => {
              if (i.code == data) {
                return true;
              } else {
                return false;
              }
            })
            if (item && item.length == 1) {
              return item[0]
            } else if (item && item.length > 1) {
              console.error(data, category, item, '字典匹配到多项.返回第一项');
              return item[0]
            } else {
              console.error(data, category, '字典无法匹配到数据');
              return {};
            }
          } else {
            console.error(category, '字典类型无法匹配.')
            return {};
          }
        }
      },
      /**根据行政区code获取对应的name
       * @param {type} 
       * @return {type} 
       */
      getAreaName(code: string) {
        if (areaAll) {
          let areaName = null;
          for (let index = 0; index < areaAll.length; index++) {
            const element = areaAll[index];
            if (element.code == code) {
              areaName = element.name;
              break;
            }
          }
          return areaName;

        } else {
          return null;
        }
      },
      /**根据行政区code获取对应的该项数据
      * @param {type} 
      * @return {type} 
      */
      getArea(code: string) {
        if (areaAll) {
          let area = null;
          for (let index = 0; index < areaAll.length; index++) {
            const element = areaAll[index];
            if (element.code == code) {
              area = element;
              break;
            }
          }
          return area;
        } else {
          return null;
        }
      }
    },
    data: {
      userInfo: userInfo,
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
  directives(Vue)
  filters(Vue, instance)
};
async function render() {

  //window全局变量共享数据


  try {
    if (!(<any>window).isQianKunMain) {
      (window as any).polyihomeData = {
        userInfo: {},
        areaAll: [],
        dictAll: {}
      };
      (window as any).polyihomeData.userInfo = await post_sessionUser_getUserInfo({ terminalType: "Pc" });
    }

  } catch (error) {
    console.log(error)

  } finally {
    if (!(<any>window).isQianKunMain) {
      Promise.all([get_area_getAll(), get_dict_getAll()]).then((res: any) => {
        //window全局变量共享数据
        ; (window as any).polyihomeData.areaAll = res[0];
        ; (window as any).polyihomeData.dictAll = res[1];

      }).catch((err: any) => {
        console.error('子项目初始化数据异常', err)

      }).finally(() => {
        newVue();
      })
    } else {
      newVue();
    }


  }


}

if (!(<any>window).isQianKunMain) {
  render();
} else {
  directives(Vue)
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

