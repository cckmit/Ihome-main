<!--
 * @Description: 下拉搜索栋座
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-05 08:54:07
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-15 12:01:02
-->
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import IhSelectPageBase from "./select-page-base.vue";

import { post_building_getFuzzySearch } from "@/api/project/index";

@Component({
  extends: IhSelectPageBase,
})
export default class SelectPageByBuild extends Vue {
  @Prop() proId?: any;
  @Prop({
    default: true,
  })
  switchHidePage?: boolean;
  @Prop({
    default: () => {
      return {
        lable: "buildingName",
        value: "buildingId",
        key: "buildingId",
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

  optionList: any = [];
  filterText = null;

  handleMessage() {
    this.$message.warning("请先选择项目");
  }
  async getSelectList() {
    if (this.proId || !this.isBlur) {
      this.optionList = await post_building_getFuzzySearch({
        buildingName: this.filterText,
        proId: this.proId,
      });
    }
  }
}
</script>