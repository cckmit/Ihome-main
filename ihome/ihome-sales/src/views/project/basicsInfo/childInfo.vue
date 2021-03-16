<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-02 15:19:19
 * @LastEditors: wwq
 * @LastEditTime: 2021-03-16 16:42:51
-->
<template>
  <ih-page>
    <template v-slot:info>
      <el-scrollbar>
        <el-tabs
          class="tabClass"
          type="border-card"
          v-model="tabActive"
        >
          <el-tab-pane
            label="基础信息"
            name="1"
          >
            <BasicInfo
              :typeStr="typeStr"
              :style="{'max-height': maxHeight, 'overflow-y': 'auto', 'padding-right': '15px'}"
            />
          </el-tab-pane>
          <el-tab-pane
            label="楼盘户型"
            name="2"
          >
            <HouseType :style="{'max-height': maxHeight, 'overflow-y': 'auto', 'padding-right': '15px'}" />
          </el-tab-pane>
          <el-tab-pane
            label="栋座房号"
            name="3"
          >
            <RoomNum :style="{'max-height': maxHeight, 'overflow-y': 'auto', 'padding-right': '15px'}" />
          </el-tab-pane>
          <el-tab-pane
            label="推广信息"
            name="4"
          >
            <PopularizeInfo :style="{'max-height': maxHeight, 'overflow-y': 'auto', 'padding-right': '15px'}" />
          </el-tab-pane>
        </el-tabs>
      </el-scrollbar>
    </template>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import BasicInfo from "./info-tabs/basicInfo.vue";
import HouseType from "./info-tabs/houseType.vue";
import PopularizeInfo from "./info-tabs/popularizeInfo.vue";
import RoomNum from "./info-tabs/roomNum.vue";

Component.registerHooks(["beforeRouteEnter"]);
@Component({
  components: { BasicInfo, HouseType, PopularizeInfo, RoomNum },
})
export default class ProjectChildInfo extends Vue {
  tabActive: any = "1";
  typeStr = "";

  private beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      vm.typeStr = to.name;
    });
  }

  get maxHeight() {
    let h =
      (document.documentElement.clientHeight || document.body.clientHeight) -
      210 +
      "px";
    return h;
  }
}
</script>
<style lang="scss" scoped>
.ih-page {
  overflow: hidden;
  /deep/ .el-image-viewer__wrapper {
    right: 75px;
  }
}
.tabClass {
  /deep/ .el-tabs__content {
    padding-right: 0;
  }
}
</style>