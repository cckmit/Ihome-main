<!--
 * @Description: 公司下拉框
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-15 14:42:05
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-08 14:19:05
-->
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

import IhSelectPageBase from "./select-page-base.vue";
import { post_company_getAll } from "@/api/system/index";

@Component({
  extends: IhSelectPageBase,
})
export default class IhSelectPageByCompany extends Vue {
  @Prop() proId?: any;
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

  @Watch("proId")
  watchOrgId(val: any) {
    if (val) this.getSelectList();
  }

  optionList: any = [];
  filterText = "";
  searchLoad = false;

  async getSelectList() {
    this.searchLoad = true;
    this.optionList = await post_company_getAll({
      orgId: this.proId,
      name: this.filterText,
    });
    this.searchLoad = false;
  }
}
</script>
