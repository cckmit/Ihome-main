<!--
 * @Description: file content
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-10 17:01:33
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-17 10:50:02
-->
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { post_company_getPage } from "@/api/system/index";
import IhSelectPageBase from "./select-page-base.vue";

@Component({
  extends: IhSelectPageBase,
})
export default class SelectPageByPayer extends Vue {
  @Prop() proId?: any;
  @Prop({
    default: () => {
      return {
        lable: "name",
        value: "id",
        key: "id",
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

  pageInfo: any = {
    total: 0,
    pageNum: 1,
    pageSize: 10,
  };

  @Watch("proId")
  watchDepartmentID(val: any) {
    if (val) this.getSelectList();
  }

  handleMessage() {
    this.$message.warning("请先选择事业部");
  }

  optionList: any = [];
  filterText = "";
  searchLoad = false;

  async getSelectList() {
    if (this.proId || !this.isBlur) {
      this.searchLoad = true;
      let res = await post_company_getPage({
        orgId: this.proId,
        name: this.filterText,
        ...this.pageInfo,
        ...this.params,
      });
      this.optionList = res.list;
      this.pageInfo = res;
      this.searchLoad = false;
    }
  }
}
</script>