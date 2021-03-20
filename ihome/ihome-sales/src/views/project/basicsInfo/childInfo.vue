<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-02 15:19:19
 * @LastEditors: wwq
 * @LastEditTime: 2021-03-19 16:26:39
-->
<template>
  <ih-page>
    <template v-slot:info>
      <el-scrollbar>
        <el-tabs
          class="tabClass"
          type="border-card"
          v-model="tabActive"
          @tab-click="tabClick(tabActive)"
        >
          <el-tab-pane
            label="基础信息"
            name="BasicInfo"
          >
            <BasicInfo
              :typeStr="typeStr"
              v-if="componetName === 'BasicInfo'"
              :style="{'max-height': maxHeight, 'overflow-y': 'auto', 'padding-right': '15px'}"
            />
          </el-tab-pane>
          <el-tab-pane
            label="楼盘户型"
            name="HouseType"
          >
            <HouseType
              v-if="componetName === 'HouseType'"
              :style="{'max-height': maxHeight, 'overflow-y': 'auto', 'padding-right': '15px'}"
            />
          </el-tab-pane>
          <el-tab-pane
            label="栋座房号"
            name="RoomNum"
          >
            <RoomNum
              v-if="componetName === 'RoomNum'"
              :style="{'max-height': maxHeight, 'overflow-y': 'auto', 'padding-right': '15px'}"
            />
          </el-tab-pane>
          <el-tab-pane
            label="报备规则"
            name="ReportedRules"
          >
            <ReportedRules
              v-if="componetName === 'ReportedRules'"
              :style="{'max-height': maxHeight, 'overflow-y': 'auto', 'padding-right': '15px'}"
            />
          </el-tab-pane>
          <el-tab-pane
            label="推广信息"
            name="PopularizeInfo"
          >
            <PopularizeInfo
              v-if="componetName === 'PopularizeInfo'"
              :style="{'max-height': maxHeight, 'overflow-y': 'auto', 'padding-right': '15px'}"
            />
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
import ReportedRules from "./info-tabs/reportedRules.vue";

Component.registerHooks(["beforeRouteEnter"]);
@Component({
  components: { BasicInfo, HouseType, PopularizeInfo, RoomNum, ReportedRules },
})
export default class ProjectChildInfo extends Vue {
  tabActive: any = "BasicInfo";
  typeStr = "";
  componetName: any = "BasicInfo";

  private beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      vm.typeStr = to.name;
    });
  }

  tabClick(val: any) {
    this.componetName = val;
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