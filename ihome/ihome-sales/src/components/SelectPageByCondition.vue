<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-24 18:16:33
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-24 18:30:45
-->
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { IhSelectPageBase } from "ihome-common/ui/packages/select-page/index";

import { post_channel_getListByName } from "@/api/channel/index";

@Component({
  extends: IhSelectPageBase,
})
export default class SelectPageByChannel extends Vue {
  @Prop({
    default: true,
  })
  switchHidePage?: boolean;
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
    if (!Object.values(val).includes("")) {
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

  async getSelectList() {
    let res = await post_channel_getListByName({
      name: this.filterText,
      pageSize: this.pageInfo.pageSize,
      pageNum: this.pageInfo.pageNum,
      ...this.params,
    });
    this.optionList = res.list;
    this.pageInfo = res;
  }
  created() {
    //
  }
}
</script>