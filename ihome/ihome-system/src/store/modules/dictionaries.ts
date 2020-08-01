/*
 * @Descripttion:  
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-28 15:13:07
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-01 15:20:43
 */

import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'

import { getDictionaries } from '../../api/common'

interface Dic {

    label: string,
    value: string,
}

export interface IDictionaries {
    list: Dic[],
}

@Module({ dynamic: true, store, name: 'dictionaries', namespaced: true, })
class Dictionaries extends VuexModule implements IDictionaries {
    public list: Dic[] = [];
    public modular: Dic[] = [
        { value: 'Root', label: '资源根节点' },
        { value: 'System', label: '系统' },
        { value: 'Service', label: '服务模块' },
        { value: 'Menu', label: '功能菜单' },
        { value: 'Api', label: 'API' },
        { value: 'Button', label: '按钮' },
        { value: 'Element', label: '元素' },
    ];
    public defaultModular = '';
    public defaultOption = [{

        value: "",
        label: "请选择"
    }]
    public modularAll: Dic[] = [
        { value: '', label: '请选择' },
        { value: 'Root', label: '资源根节点' },
        { value: 'System', label: '系统' },
        { value: 'Service', label: '服务模块' },
        { value: 'Menu', label: '功能菜单' },
        { value: 'Api', label: 'API' },
        { value: 'Button', label: '按钮' },
        { value: 'Element', label: '元素' },
    ];;

    @Mutation
    private setModular(modular: Dic[]) {

        // modular.map((item: Dic) => {
        //     item.value = item.code;
        //     item.label = item.name;
        //     return item;
        // })
        // this.modular = modular;
        this.modularAll = this.defaultOption.concat(modular)
        console.log(this.modularAll)
    }
    @Action
    public async getModular() {
        if (this.modular) {
            return this.modular;
        } else {
            // const list = await getDictionaries();
            //Root-资源根节点、System-系统、Service-服务模块、Menu-功能菜单、Api-API、Button-按钮、Element-元素
           
        }
    }
}

export const DictionariesModule = getModule(Dictionaries)