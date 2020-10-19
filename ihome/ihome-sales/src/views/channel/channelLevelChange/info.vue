<!--
 * @Description: file content
 * @version: 
 * @Author: ywl
 * @Date: 2020-10-19 09:04:33
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-19 10:04:25
-->
<template>
  <IhPage>
    <template v-slot:info>
      <el-scrollbar>
        <el-tabs
          type="border-card"
          v-model="tabActive"
        >
          <el-tab-pane
            label="信息详情"
            name="1"
          >
            <DetailsInfo />
          </el-tab-pane>
          <el-tab-pane
            label="操作日志"
            name="2"
          >
            <ChannelLog />
          </el-tab-pane>
        </el-tabs>
      </el-scrollbar>
    </template>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import ChannelLog from "./info-tabs/operationLog.vue";
import DetailsInfo from "./info-tabs/detailsInfo.vue";

@Component({
  components: { DetailsInfo, ChannelLog },
})
export default class ChannelInfo extends Vue {
  tabActive: any = "1";
}
</script>

<style lang="scss" scoped>
.ih-page {
  overflow: hidden;
}
</style>
