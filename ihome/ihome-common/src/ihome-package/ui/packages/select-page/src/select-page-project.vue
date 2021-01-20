<!--
 * @Description: file content
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-15 11:14:37
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-23 20:23:17
-->
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import IhSelectPageBase from "./select-page-base.vue";

import { post_project_getList } from "@/api/project/index";

@Component({
  extends: IhSelectPageBase,
})
export default class SelectPageByProject extends Vue {
  @Prop({
    default: true,
  })
  switchHidePage?: boolean;
  @Prop({
    default: () => {
      return {
        lable: "proName",
        value: "proId",
        key: "proId",
        disabled: "disabled",
      };
    },
  })
  props?: any;

  optionList: any = [];
  // 分页信息
  pageInfo: any = {
    total: 0,
    pageNum: 1,
    pageSize: 10,
  };
  filterText = null;
  searchLoad = false;

  async getSelectList() {
    this.searchLoad = true;
    let res = await post_project_getList({
      proName: this.filterText,
      pageSize: this.pageInfo.pageSize,
      pageNum: this.pageInfo.pageNum,
    });
    this.optionList = res.list;
    this.pageInfo = res;
    this.searchLoad = false;
  }
}
</script>
