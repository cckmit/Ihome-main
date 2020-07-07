/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 11:10:43
 * @LastEditors: zyc
 * @LastEditTime: 2020-06-28 16:36:31
 */

import Vue from 'vue'
import Vuex from 'vuex'
import { IUserState } from './modules/user'
Vue.use(Vuex)
export interface IRootState {
  main: IUserState
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({})