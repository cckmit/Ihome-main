/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 11:46:23
 * @LastEditors: ywl
 * @LastEditTime: 2020-09-18 15:20:50
 */
import Vue from 'vue'
import Vuex from 'vuex'
import { IUserState } from './modules/user'
import { IAppState } from './modules/app'
Vue.use(Vuex)
export interface IRootState {
  user: IUserState
  app: IAppState
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({})

