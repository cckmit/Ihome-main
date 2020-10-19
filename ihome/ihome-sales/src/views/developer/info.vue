<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-10-16 12:34:50
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-19 11:08:09
-->

<template>
  <ih-page>
    <template v-slot:info>
      <el-scrollbar>
        <el-tabs type="border-card" v-model="tabActive">
          <el-tab-pane label="信息详情" name="1">
            <DetailsInfo :typeStr="typeStr" />
          </el-tab-pane>
          <el-tab-pane label="操作日志" name="2">
            <ChannelLog />
          </el-tab-pane>
        </el-tabs>
      </el-scrollbar> </template
  ></ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import ChannelLog from "./info-tabs/operationLog.vue";
import DetailsInfo from "./info-tabs/detailsInfo.vue";

Component.registerHooks(["beforeRouteEnter"]);
@Component({
  components: { DetailsInfo, ChannelLog },
})
export default class ChannelInfo extends Vue {
  tabActive: any = "1";
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