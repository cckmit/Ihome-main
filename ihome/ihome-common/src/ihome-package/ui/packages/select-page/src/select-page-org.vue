<!--
 * @Description: 下拉分页获取组织
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-24 11:14:30
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-24 11:26:25
-->
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import IhSelectPageBase from "./select-page-base.vue";

import { post_org_getList } from "@/api/system/index";

@Component({
  extends: IhSelectPageBase,
})
export default class SelectPageByChannel extends Vue {
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
    default: "Group",
  })
  orgType?: string;

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
    let res = await post_org_getList({
      name: this.filterText,
      orgType: this.orgType,
      pageSize: this.pageInfo.pageSize,
      pageNum: this.pageInfo.pageNum,
    });
    this.optionList = res.list;
    this.pageInfo = res;
    this.searchLoad = false;
  }
}
</script>