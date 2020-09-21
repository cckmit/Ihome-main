/*
 * @Description: file content
 * @version:
 * @Author: ywl
 * @Date: 2020-09-18 14:49:57
 * @LastEditors: ywl
 * @LastEditTime: 2020-09-21 09:24:49
 */
import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
// import Cookies from 'js-cookie'
import { defaultIsCollapse } from '@/setting'

export interface IAppState {
  opened: boolean
}

@Module({ dynamic: true, store, name: 'app', namespaced: true, })
class App extends VuexModule implements IAppState {
  public opened = sessionStorage.getItem('opened') ? sessionStorage.getItem('opened') === '1' : defaultIsCollapse;

  @Mutation
  private TOGGLE_SIDEBAR(): void {
    this.opened = !this.opened
    if (this.opened) {
      sessionStorage.setItem('opened', '1')
    } else {
      sessionStorage.setItem('opened', '0')
    }
  }

  @Action
  public toggleSideBar(): void {
    this.TOGGLE_SIDEBAR()
  }
}

export const AppModule = getModule(App)