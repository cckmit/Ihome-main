/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-24 09:30:41
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-06 17:01:38
 */

import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { logout, getUserInfo } from '../../api/users'
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
    public async Login(username: string, password: string) {
        console.log(username, password)
        // username = username.trim()
        // const res: any = await login({ username, password, "grant": "password", "client_id": "test-client", "client_secret": "test_secret" })
        const res = {
            assess_token: 'xxxxxxxxxx'
        }
        setToken(res.assess_token)
        this.SET_TOKEN(res.assess_token)
        this.SET_USERINFO({ id: 1, name: 'zyc' })
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
