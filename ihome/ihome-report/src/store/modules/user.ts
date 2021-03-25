/*
 * @Descripttion: main应用下发的数据和回调  
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-28 15:13:07
 * @LastEditors: zyc
 * @LastEditTime: 2020-06-28 16:26:59
 */

import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'

export interface IUserState {
    token: string,
    userInfo: any
}

@Module({ dynamic: true, store, name: 'user', namespaced: true, })
class User extends VuexModule implements IUserState {
    public token = '';
    public userInfo = null;

    @Mutation
    private SETUSERINFO(userInfo: any) {
        this.userInfo = userInfo
    }
    @Mutation
    private SETTOKEN(token: string) {
        this.token = token
    }

    @Action
    public SetUserInfo(userInfo: any) {
        this.SETUSERINFO(userInfo)
    }
    @Action
    public SetToken(token: string) {
        this.SETTOKEN(token)
    }

    // @Action
    // public async LogOut() {

    // }
}

export const UserModule = getModule(User)