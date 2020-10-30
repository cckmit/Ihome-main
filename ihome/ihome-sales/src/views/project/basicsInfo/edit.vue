<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-10-22 15:16:54
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-30 10:20:12
-->
<template>
  <ih-page>
    <template v-slot:info>
      <el-scrollbar>
        <el-tabs type="border-card" v-model="tabActive">
          <el-tab-pane label="基础信息" name="1">
            <BasicInfo :typeStr="typeStr" />
          </el-tab-pane>
          <el-tab-pane label="楼盘户型" name="2">
            <HouseType />
          </el-tab-pane>
          <el-tab-pane label="栋座房号" name="3">
            <RoomNum />
          </el-tab-pane>
          <el-tab-pane label="推广信息" name="4">
            <PopularizeInfo />
          </el-tab-pane>
        </el-tabs>
      </el-scrollbar> </template
  ></ih-page>
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
export default class ProjectEdit extends Vue {
  tabActive: any = "3";
  typeStr = "";

  private beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      vm.typeStr = to.name;
    });
  }
}
</script>
<style lang="scss" scoped>
.ih-page {
  overflow: hidden;
}
</style>