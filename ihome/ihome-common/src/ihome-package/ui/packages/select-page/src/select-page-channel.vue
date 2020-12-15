<!--
 * @Description: file content
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-10 18:09:24
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-15 11:10:42
-->
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import IhSelectPageBase from "./select-page-base.vue";

import { post_channel_getListByName } from "@/api/channel/index";

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
    let res = await post_channel_getListByName({
      name: this.filterText,
      pageSize: this.pageInfo.pageSize,
      pageNum: this.pageInfo.pageNum,
    });
    this.optionList = res.list;
    this.pageInfo = res;
    this.searchLoad = false;
  }
}
</script>
