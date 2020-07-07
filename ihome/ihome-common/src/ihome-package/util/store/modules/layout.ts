/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-05-28 11:30:17
 * @LastEditors: zyc
 * @LastEditTime: 2020-06-16 09:49:30
 */
let state = {
    menuList: [],//导航菜单列表
    aside: { asideStatus: true },
    asideClose: false,
    asideWidth: '210px'
};
let mutations = {
    menuList(state: any, value: any) {
        state.menuList = state.menuList.concat(value);
    },
    menuInitList(state: any, value: any) {
        state.menuList = value;
    },
    aside(state: any, value: any) {
        state.aside = value;
    },
    asideClose(state: any, value: any) {
        state.asideClose = value;
    },
    asideWidth(state: any, value: any) {
        state.asideWidth = value;
    }
};
let actions = {
    actionMenuList(context: any, Object: any) {
        //处理异步操作
        setTimeout(() => {
            context.commit('menuList', Object)
        }, 500)
    }
};
let getters = {
    menuList: (_state: any) => _state.menuList,
    aside: (_state: any) => _state.aside,
    asideClose: (_state: any) => _state.asideClose,
    asideWidth: (_state: any) => _state.asideWidth,
};
export default {
    state,
    mutations,
    actions,
    getters,
}
