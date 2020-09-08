/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-24 09:30:41
 * @LastEditors: zyc
 * @LastEditTime: 2020-09-08 09:41:59
 */

import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { logout, getUserInfo, login } from '../../api/users'
import { getToken, setToken, removeToken } from '../../utils/cookies'

import store from '@/store'

export interface IUserState {
    token: string
    userInfo: any

}

@Module({ dynamic: true, store, name: 'user', namespaced: true, })
class User extends VuexModule implements IUserState {
    public token = getToken() || ''
    public userInfo = {}


    @Mutation
    private SET_TOKEN(token: string) {
        this.token = token
    }
    @Mutation
    private SET_USERINFO(userInfo: any) {
        this.userInfo = userInfo
    }


    @Action
    public async Login(data: any) {
         
        console.log(data)
        // username = username.trim()
        const res: any = await login({ username: data.username, password: data.password })
        // const res = {
        //     assess_token: 'xxxxxxxxxx'
        // }
        console.log(res);
        
        setToken(res.access_token)
        this.SET_TOKEN(res.access_token)
        this.SET_USERINFO({ id: 1, name: data.username })
        return res;
    }

    @Action
    public ResetToken() {
        removeToken()
        this.SET_TOKEN('')

    }

    @Action
    public async GetUserInfo() {
        if (this.token === '') {
            throw Error('GetUserInfo: token is undefined!')
        }
        const { data } = await getUserInfo()
        if (!data) {
            throw Error('Verification failed, please Login again.')
        }


    }

    @Action
    public async LogOut() {
        if (this.token === '') {
            throw Error('LogOut: token is undefined!')
        }
        await logout()
        removeToken()
        this.SET_TOKEN('')
    }
}

export const UserModule = getModule(User)
