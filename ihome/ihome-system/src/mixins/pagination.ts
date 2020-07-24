/*
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-24 17:08:03
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-24 18:28:20
 */
interface IPageBase {
    pageNum: number,
    pageSize: number,
}
import { IPageInfo } from "../api/system/base.d";
import { Vue, Component } from 'vue-property-decorator'
declare module 'vue/types/vue' {
    interface Vue {
        /**分页列表的查询参数
         * @param {type} 
         * @return: 
         */
        queryPageParameters: IPageBase;
        /**返回分页数据
         * @param {type} 
         * @return: 
         */
        resPageInfo: IPageInfo<any>
    }
}

/**
* mixins
*/
@Component
export default class PaginationMixin extends Vue {
    getListMixin(queryP?: IPageBase) {
        console.error('请在页面中实现getListMixin方法')
        console.log(queryP)
    }
    queryPageParameters: IPageBase = {
        "pageNum": 1,
        "pageSize": 10,
    }
    resPageInfo: IPageInfo<any> = {
        total: 0,
        list: []
    }
    handleSizeChangeMixin(pageNum: number) {
        console.log('handleSizeChange', pageNum);
        this.queryPageParameters.pageNum = 1;
        this.getListMixin(this.queryPageParameters);
    }
    handleCurrentChangeMixin(pageSize: number) {
        console.log('handleCurrentChange', pageSize);
        this.getListMixin(this.queryPageParameters);
    }
}
