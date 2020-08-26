/*
 * @Descripttion:  
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-28 15:13:07
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-13 11:26:06
 */

import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'

export interface IDictionaries {
    test: any,
}

@Module({ dynamic: true, store, name: 'dictionaries', namespaced: true, })
class Dictionaries extends VuexModule implements IDictionaries {
    test: any = null;

    @Mutation
    private setModular() {
        console.log('Mutation')
    }
    @Action
    public getModular() {
        console.log('Action')
    }

}

export const DictionariesModule = getModule(Dictionaries)