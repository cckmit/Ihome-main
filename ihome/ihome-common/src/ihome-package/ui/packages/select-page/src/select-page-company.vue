<!--
 * @Description: 公司下拉框
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-15 14:42:05
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-15 14:54:51
-->
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import IhSelectPageBase from "./select-page-base.vue";
import { post_company_getAll } from "@/api/system/index";

@Component({
  extends: IhSelectPageBase,
})
export default class IhSelectPageByCompany extends Vue {
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

  optionList: any = [];
  filterText = "";
  async getSelectList() {
    this.optionList = await post_company_getAll({
      name: this.filterText,
    });
  }
}
</script>
