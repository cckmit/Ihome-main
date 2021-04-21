<!--
 * @Description: 周期分页下拉框
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-04 16:33:16
 * @LastEditors: ywl
 * @LastEditTime: 2021-04-21 17:00:45
-->
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import IhSelectPageBase from "./select-page-base.vue";
import { post_term_fuzzySearch } from "@/api/project/index";

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
  @Prop({
    default: () => {
      return {};
    },
  })
  params?: any;

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
    let res = await post_term_fuzzySearch({
      termName: this.filterText,
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
