<!--
 * @Description: file content
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-10 17:01:33
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-07 11:50:09
-->
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

import { post_bankAccount_getByOrgId } from "@/api/finance/index";
import IhSelectPageBase from "./select-page-base.vue";

@Component({
  extends: IhSelectPageBase,
})
export default class SelectPageByPayer extends Vue {
  @Prop() proId?: any;
  @Prop({
    default: () => {
      return {
        lable: "companyName",
        value: "companyId",
        key: "companyId",
      };
    },
  })
  props?: any;

  @Prop({
    default: true,
  })
  isBlur?: boolean;

  @Prop({
    default: () => {
      return {};
    },
  })
  params?: object;

  @Watch("proId")
  watchDepartmentID(val: any) {
    if (val) this.getSelectList();
  }

  optionList: any = [];
  filterText = "";
  searchLoad = false;

  handleMessage() {
    if (!this.proId) {
      this.$message.warning("请先选择事业部");
    }
  }

  async getSelectList() {
    if (this.proId || !this.isBlur) {
      this.searchLoad = true;
      let res = await post_bankAccount_getByOrgId({
        departmentID: this.proId,
        name: this.filterText,
        ...this.params,
      });
      this.optionList = res;
      this.searchLoad = false;
    }
  }
}
</script>