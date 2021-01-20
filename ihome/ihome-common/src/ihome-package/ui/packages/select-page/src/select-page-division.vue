<!--
 * @Description: 事业部下拉分页
 * @version: 
 * @Author: ywl
 * @Date: 2020-10-20 15:03:13
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-14 19:22:37
-->
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import IhSelectPageBase from "./select-page-base.vue";

import { get_org_getUserDepartmentList } from "@/api/system/index";

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
  searchLoad = false;

  async getSelectList() {
    this.searchLoad = true;
    let res = await get_org_getUserDepartmentList({
      departmentType: null,
      orgType: "Department",
      parentId: null,
      status: "Valid",
      name: this.filterText,
    });
    this.optionList = res;
    this.searchLoad = false;
  }
}
</script>
