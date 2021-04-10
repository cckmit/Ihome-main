<!--
 * @Description: 代理公司下拉分页
 * @version: 
 * @Author: ywl
 * @Date: 2021-04-10 15:33:42
 * @LastEditors: ywl
 * @LastEditTime: 2021-04-10 15:38:35
-->
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import IhSelectPageBase from "./select-page-base.vue";
import { post_company_getFuzzyQuery } from "@/api/project/index";

@Component({
  extends: IhSelectPageBase,
})
export default class IhSelectPageByAgency extends Vue {
  @Prop({
    default: () => {
      return {
        lable: "companyName",
        value: "id",
        key: "id",
      };
    },
  })
  props?: any;

  @Prop({
    default: () => ({}),
  })
  params?: any;

  optionList: any = [];
  // 分页信息
  pageInfo: any = {
    total: 0,
    pageNum: 1,
    pageSize: 10,
  };
  filterText = null;
  searchLoad = false;

  async getSelectList() {
    this.searchLoad = true;
    let res = await post_company_getFuzzyQuery({
      companyName: this.filterText,
      pageSize: this.pageInfo.pageSize,
      pageNum: this.pageInfo.pageNum,
      ...this.params,
    });
    this.optionList = res.list;
    this.pageInfo = res;
    this.searchLoad = false;
  }
}
</script>