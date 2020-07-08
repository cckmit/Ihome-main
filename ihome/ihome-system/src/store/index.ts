/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 11:10:43
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-08 09:39:29
 */

import Vue from 'vue'
import Vuex from 'vuex'
import { IUserState } from './modules/user'
import { IDictionaries } from './modules/dictionaries'
Vue.use(Vuex)
export interface IRootState {
  main: IUserState,
  dictionaries: IDictionaries
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({})