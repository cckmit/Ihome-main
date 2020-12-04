<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { IhSelectPageBase } from "ihome-common/ui/packages/select-page/index";

import { post_channel_getList } from "@/api/channel/index";

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

  optionList: any = [];
  // 分页信息
  pageInfo: any = {
    total: 0,
    pageNum: 1,
    pageSize: 10,
  };
  filterText = "";

  async getSelectList() {
    let res = await post_channel_getList({
      name: this.filterText,
      pageSize: this.pageInfo.pageSize,
      pageNum: this.pageInfo.pageNum,
    });
    this.optionList = res.list;
    this.pageInfo = res;
  }
}
</script>