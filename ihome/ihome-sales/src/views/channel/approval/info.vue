<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-14 20:10:35
 * @LastEditors: zyc
 * @LastEditTime: 2020-10-21 10:39:47
-->
<template>
  <ih-page>
    <template v-slot:info>
      <el-tabs type="border-card" v-model="tabActive">
        <el-tab-pane label="详情信息" name="1">
          <ApprovalDetails />
        </el-tab-pane>

        <el-tab-pane label="操作日志" name="2">
          <ApprovalInfoLog />
        </el-tab-pane>
        <el-tab-pane label="OA审批日志" name="3"> 
            <ApprovalInfoOALog/>
        </el-tab-pane>
      </el-tabs>
    </template>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ApprovalDetails from "./info-tabs/details.vue";
import ApprovalInfoLog from "./info-tabs/log.vue";
import ApprovalInfoOALog from "./info-tabs/oaLog.vue";

@Component({
  components: { ApprovalDetails, ApprovalInfoLog, ApprovalInfoOALog },
})
export default class ApprovalInfo extends Vue {
  tabActive: any = null;
  created() {
    this.tabActive = this.$route.query.tab || "1";
  }
}
</script>
<style lang="scss" scoped>
</style>
