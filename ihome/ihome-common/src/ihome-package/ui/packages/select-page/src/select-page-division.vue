<!--
 * @Description: 事业部下拉分页
 * @version: 
 * @Author: ywl
 * @Date: 2020-10-20 15:03:13
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-10 17:49:29
-->
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import IhSelectPageBase from "./select-page-base.vue";

import { post_org_getList } from "@/api/system/index";

@Component({
  extends: IhSelectPageBase,
})
export default class IhSelectPageDivision extends Vue {
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

  filterText = "";
  optionList: any = [];
  pageInfo: any = {
    total: 0,
    pageNum: 1,
    pageSize: 10,
  };
  searchLoad = false;

  async getSelectList() {
    this.searchLoad = true;
    let res = await post_org_getList({
      ...this.pageInfo,
      departmentType: null,
      orgType: "Department",
      parentId: null,
      status: "Valid",
      name: this.filterText,
    });
    this.optionList = res.list;
    this.pageInfo = res;
    this.searchLoad = false;
  }
}
</script>
