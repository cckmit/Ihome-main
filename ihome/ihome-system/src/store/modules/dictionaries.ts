/*
 * @Descripttion:  
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-28 15:13:07
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-08 11:44:14
 */

import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'

import { getDictionaries } from '../../api/common'

interface Dic {
    code: string,
    name: string,
    label: string,
    value: string,
}

export interface IDictionaries {
    list: Dic[],
}

@Module({ dynamic: true, store, name: 'dictionaries', namespaced: true, })
class Dictionaries extends VuexModule implements IDictionaries {
    public list: Dic[] = [];
    public modular: Dic[] | null = null;
    public modularAll: Dic[] = [{
        code: "0",
        name: "所有资源",
        value: "0",
        label: "所有资源"
    }];

    @Mutation
    private setModular(modular: Dic[]) {

        modular.map((item: Dic) => {
            item.value = item.code;
            item.label = item.name;
            return item;
        })
        this.modular = modular;
        this.modularAll = this.modularAll.concat(modular)
        console.log(this.modularAll)
    }
    @Action
    public async getModular() {
        if (this.modular) {
            return this.modular;
        } else {
            const  list  = await getDictionaries();
        
            this.setModular(list)
        }
    }
}

export const DictionariesModule = getModule(Dictionaries)