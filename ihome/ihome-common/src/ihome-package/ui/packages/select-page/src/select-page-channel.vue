<!--
 * @Description: file content
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-10 18:09:24
 * @LastEditors: wwq
 * @LastEditTime: 2021-03-02 10:02:09
-->
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import IhSelectPageBase from "./select-page-base.vue";

import { post_channel_getListByName } from "@/api/channel/index";

@Component({
  extends: IhSelectPageBase,
})
export default class IhSelectPageByChannel extends Vue {
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
    default: () => ({}),
  })
  params?: any;

  @Watch("params")
  watchparams(val: any) {
    if (!Object.keys(val).includes("")) {
      this.getSelectList();
    }
  }

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
      ...this.params,
    });
    this.optionList = res.list;
    this.pageInfo = res;
    this.searchLoad = false;
  }
}
</script>
