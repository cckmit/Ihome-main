<!--
 * @Description: 周期分页下拉框
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-04 16:33:16
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-05 16:01:22
-->
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { IhSelectPageBase } from "ihome-common/ui/packages/select-page/index";

import { post_term_getList } from "@/api/project/index";

@Component({
  extends: IhSelectPageBase,
})
export default class SelectPageByCycle extends Vue {
  @Prop({
    default: true,
  })
  switchHidePage?: boolean;
  @Prop({
    default: () => {
      return {
        lable: "termName",
        value: "termId",
        key: "termId",
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

  async getSelectList() {
    let res = await post_term_getList({
      termName: this.filterText,
      pageSize: this.pageInfo.pageSize,
      pageNum: this.pageInfo.pageNum,
    });
    this.optionList = res.list;
    this.pageInfo = res;
  }
}
</script>
