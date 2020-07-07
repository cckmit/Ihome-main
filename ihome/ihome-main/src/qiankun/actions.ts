/*
 * @Descripttion: 监听变化
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-28 14:10:41
 * @LastEditors: zyc
 * @LastEditTime: 2020-06-28 15:36:17
 */
import { initGlobalState } from "qiankun"
const actions = initGlobalState({
    mt: 'init' // 初始化state
})

// 在项目中任何需要监听的地方进行监听，在这里监听是为了方便
actions.onGlobalStateChange((state, prev) => {
    console.log('main state change', state, prev);
})
export { actions }