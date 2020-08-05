/*
 * @Descripttion:  
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-28 15:13:07
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-05 11:48:58
 */

import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'

// import { getDictionaries } from '../../api/common'

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
    ];
    public departmentType: Dic[] = [
        { value: "Business", label: "营业线" },
        { value: "Function", label: "职能线" },
    ];
    public orgType: Dic[] = [
        { value: "Company", label: "公司" },
        { value: "Department", label: "部门" },
    ];
    public orgStatus: Dic[] = [
        { value: "Valid", label: "有效" },
        { value: "Invalid", label: "无效" },
    ];


    @Mutation
    private setModular(modular: Dic[]) {

        this.modularAll = this.defaultOption.concat(modular)
        console.log(this.modularAll)
    }
    @Action
    public getModular() {
        return this.modular;
    }
    @Mutation
    public getOrgTypeName(key: any) {
        let result = null;
        for (let index = 0; index < this.orgType.length; index++) {
            const element = this.orgType[index];
            if (element.value == key) {
                result = element;
                break;
            }
        }
        return result;
    }




}

export const DictionariesModule = getModule(Dictionaries)