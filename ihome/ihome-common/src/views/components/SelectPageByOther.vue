<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { post_role_getList } from "@/api/system/index";
import { IhSelectPageBase } from "../../ihome-package/ui/packages/select-page/index";

@Component({
  extends: IhSelectPageBase,
})
export default class SelectPageByOther extends Vue {
  tableList: any = {
    list: [],
    total: 0,
    pageNum: 1,
    pageSize: 10,
  };
  filterText = "";
  async getSelectList() {
    this.tableList = await post_role_getList({
      pageSize: this.tableList.pageSize,
      pageNum: this.tableList.pageNum,
      name: this.filterText,
    });
  }
}
</script>