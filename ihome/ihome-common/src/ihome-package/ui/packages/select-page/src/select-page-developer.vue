<!--
 * @Description: 下拉开发商
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-15 15:03:46
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-15 15:05:48
-->
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import IhSelectPageBase from "./select-page-base.vue";
import { post_company_listAll } from "@/api/developer/index";

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

  optionList: any = [];
  filterText = "";
  async getSelectList() {
    this.optionList = await post_company_listAll({
      name: this.filterText,
    });
  }
}
</script>
