<!--
 * @Description: file content
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-10 17:01:33
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-21 18:15:03
-->
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import { post_user_getList } from "@/api/system/index";
import IhSelectPageBase from "./select-page-base.vue";

@Component({
  extends: IhSelectPageBase,
})
export default class SelectPageByUser extends Vue {
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
  isTempOption?: boolean;
  @Prop({
    default: () => {
      return {
        label: "name",
        value: "employeeCode",
      };
    },
  })
  optionProps?: any;
  @Prop({ default: "Staff" }) userType?: any;

  pageInfo: any = {
    total: 0,
    pageNum: 1,
    pageSize: 10,
  };
  optionList: any = [];
  filterText = "";
  searchLoad = false;

  async getSelectList() {
    this.searchLoad = true;
    let res = await post_user_getList({
      ...this.pageInfo,
      name: this.filterText,
      userType: this.userType,
    });
    this.optionList = res.list;
    this.pageInfo = res;
    this.searchLoad = false;
  }
}
</script>