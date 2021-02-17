<!--
 * @Description: 公司下拉框
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-15 14:42:05
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-17 09:53:35
-->
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

import IhSelectPageBase from "./select-page-base.vue";
import { post_company_getPageByOrg } from "@/api/system/index";

@Component({
  extends: IhSelectPageBase,
})
export default class IhSelectPageByOrgCompany extends Vue {
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

  @Prop({
    default: true,
  })
  isBlur?: boolean;

  @Watch("proId")
  watchOrgId(val: any) {
    if (val) this.getSelectList();
  }

  handleMessage() {
    this.$message.warning("请先选择启动事业部");
  }

  optionList: any = [];
  filterText = "";
  searchLoad = false;

  async getSelectList() {
    if (this.proId || !this.isBlur) {
      this.searchLoad = true;
      this.optionList = await post_company_getPageByOrg({
        orgId: this.proId,
        name: this.filterText,
      });
      this.searchLoad = false;
    }
  }
}
</script>
