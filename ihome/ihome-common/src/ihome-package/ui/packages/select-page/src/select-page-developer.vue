<!--
 * @Description: 下拉开发商
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-15 15:03:46
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-26 10:39:56
-->
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import IhSelectPageBase from "./select-page-base.vue";
import { post_company_getList } from "@/api/developer/index";

@Component({
  extends: IhSelectPageBase,
})
export default class IhSelectPageByDeveloper extends Vue {
  @Prop({
    default: () => {
      return {
        lable: "name",
        value: "id",
        key: "id",
        disabled: "disabled",
      };
    },
  })
  props?: any;
  @Prop({
    default: "Audited",
  })
  status?: any;

  optionList: any = [];
  // 分页信息
  pageInfo: any = {
    total: 0,
    pageNum: 1,
    pageSize: 10,
  };
  filterText = "";
  searchLoad = false;

  async getSelectList() {
    this.searchLoad = true;
    let res = await post_company_getList({
      name: this.filterText,
      pageSize: this.pageInfo.pageSize,
      pageNum: this.pageInfo.pageNum,
      status: this.status,
    });
    this.optionList = res.list;
    this.pageInfo = res;
    this.searchLoad = false;
  }
}
</script>
