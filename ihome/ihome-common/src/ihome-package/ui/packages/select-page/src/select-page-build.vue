<!--
 * @Description: 下拉搜索栋座
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-05 08:54:07
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-23 20:24:53
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
  @Prop() propertyEnum?: any; // 物业类型
  @Prop() cascadeType?: any; // 级联类型 --- 栋座build/房间号room
  @Prop({
    default: false,
  })
  isCascade?: boolean; // 是否级联(栋座需要物业类型情况下)
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
    if (this.isCascade) {
      if (val && this.propertyEnum) {
        this.getSelectList();
      }
    } else {
      if (val) this.getSelectList();
    }
  }

  @Watch("propertyEnum")
  watchPropertyEnum(val: any) {
    if (this.isCascade) {
      if (val) {
        this.getSelectList();
      }
    }
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
      if (!this.propertyEnum) {
        this.$message.warning("请先选择物业类型");
        return;
      }
    } else {
      this.$message.warning("请先选择项目");
    }
  }
  async getSelectList() {
    if (this.proId || !this.isBlur) {
      this.searchLoad = true;
      let postData: any = null;
      if (this.isCascade) {
        postData = {
          buildingName: this.filterText,
          proId: this.proId,
          propertyEnum: this.propertyEnum
        }
      } else {
        postData = {
          buildingName: this.filterText,
          proId: this.proId
        }
      }
      this.optionList = await post_building_getFuzzySearch(postData);
      this.searchLoad = false;
    }
  }
}
</script>