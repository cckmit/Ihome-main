<!--
 * @Description: 下拉搜索房号
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-05 10:52:22
 * @LastEditors: lsj
 * @LastEditTime: 2021-02-03 16:42:10
-->
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import IhSelectPageBase from "./select-page-base.vue";

import { post_room_getFuzzySearch } from "@/api/project/index";

@Component({
  extends: IhSelectPageBase,
})
export default class SelectPageByBuild extends Vue {
  @Prop() proId?: any;
  @Prop() buildingId?: any;
  @Prop({
    default: false,
  })
  isCascade?: boolean; // 是否级联(栋座需要物业类型情况下)
  @Prop() cascadeType?: any; // 级联类型 --- 栋座build/房间号room
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
  @Prop({
    default: () => {
      return {};
    }
  })
  params?: object;

  @Watch("proId")
  watchProId(val: any) {
    if (this.isCascade) {
      if (val && this.buildingId) {
        this.getSelectList();
      }
    } else {
      if (val) this.getSelectList();
    }
  }
  @Watch("buildingId")
  watchBuildId(val: any) {
    if (val && this.proId) this.getSelectList();
  }

  optionList: any = [];
  filterText = null;
  searchLoad = false;

  handleMessage() {
    if (this.isCascade) {
      if (!this.proId) {
        this.$message.warning("请先选择项目");
        return;
      }
      if (!this.buildingId) {
        this.$message.warning("请先选择栋座");
        return;
      }
    } else {
      this.$message.warning("请先选择项目");
    }
  }
  async getSelectList() {
    if (this.proId || !this.isBlur) {
      this.searchLoad = true;
      this.optionList = await post_room_getFuzzySearch({
        roomNo: this.filterText,
        proId: this.proId,
        buildingId: this.buildingId,
        ...this.params,
      });
      this.searchLoad = false;
    }
  }
}
</script>
