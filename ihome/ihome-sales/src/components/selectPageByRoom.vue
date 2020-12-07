<!--
 * @Description: 下拉搜索房号
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-05 10:52:22
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-05 14:15:05
-->
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { IhSelectPageBase } from "ihome-common/ui/packages/select-page/index";

import { post_room_getFuzzySearch } from "@/api/project/index";

@Component({
  extends: IhSelectPageBase,
  components: { IhSelectPageBase },
})
export default class SelectPageByBuild extends Vue {
  @Prop() proId?: any;
  @Prop() buildingId?: any;
  @Prop({
    default: true,
  })
  switchHidePage?: boolean;
  @Prop({
    default: () => {
      return {
        lable: "roomNo",
        value: "roomId",
        key: "roomId",
        disabled: "disabled",
      };
    },
  })
  props?: any;
  @Prop({
    default: true,
  })
  isBlur?: boolean;

  @Watch("proId")
  watchProId(val: any) {
    if (val) this.getSelectList();
  }
  @Watch("buildingId")
  watchBuildId(val: any) {
    if (val && this.proId) this.getSelectList();
  }

  optionList: any = [];
  filterText = null;

  handleMessage() {
    this.$message.warning("请先选择项目");
  }
  async getSelectList() {
    if (this.proId) {
      this.optionList = await post_room_getFuzzySearch({
        roomNo: this.filterText,
        proId: this.proId,
        buildingId: this.buildingId,
      });
    }
  }
}
</script>
