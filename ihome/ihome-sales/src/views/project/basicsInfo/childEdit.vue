<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-10-22 15:16:54
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-15 08:27:20
-->
<template>
  <ih-page>
    <template v-slot:info>
      <el-scrollbar>
        <el-tabs
          type="border-card"
          v-model="tabActive"
          @tab-click="tabClick(tabActive)"
        >
          <el-tab-pane
            label="基础信息"
            name="BasicInfo"
          >
            <BasicInfo v-if="componetName === 'BasicInfo'" />
          </el-tab-pane>
          <el-tab-pane
            label="楼盘户型"
            name="HouseType"
          >
            <HouseType v-if="componetName === 'HouseType'" />
          </el-tab-pane>
          <el-tab-pane
            label="栋座房号"
            name="RoomNum"
          >
            <RoomNum v-if="componetName === 'RoomNum'" />
          </el-tab-pane>
          <el-tab-pane
            label="推广信息"
            name="PopularizeInfo"
          >
            <PopularizeInfo v-if="componetName === 'PopularizeInfo'" />
          </el-tab-pane>
        </el-tabs>
      </el-scrollbar>
    </template>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import BasicInfo from "./edit-tabs/basicInfo.vue";
import HouseType from "./edit-tabs/houseType.vue";
import PopularizeInfo from "./edit-tabs/popularizeInfo.vue";
import RoomNum from "./edit-tabs/roomNum.vue";

Component.registerHooks(["beforeRouteEnter"]);
@Component({
  components: { BasicInfo, HouseType, PopularizeInfo, RoomNum },
})
export default class ProjectChildEdit extends Vue {
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
}
</script>
<style lang="scss" scoped>
.ih-page {
  overflow: hidden;
}
</style>