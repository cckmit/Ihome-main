<!--
 * @Description: 项目周期下拉分页
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-04 17:16:05
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-04 18:20:41
-->
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { IhSelectPageBase } from "ihome-common/ui/packages/select-page/index";

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

  async getSelectList() {
    let res = await post_project_getList({
      proName: this.filterText,
      pageSize: this.pageInfo.pageSize,
      pageNum: this.pageInfo.pageNum,
    });
    this.optionList = res.list;
    this.pageInfo = res;
  }
}
</script>