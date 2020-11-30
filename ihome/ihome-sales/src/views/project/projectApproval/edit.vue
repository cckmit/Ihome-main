<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-27 17:15:27
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-30 16:58:09
-->
<template>
  <ih-page>
    <template v-slot:info>
      <el-scrollbar>
        <el-tabs
          type="border-card"
          v-model="tabActive"
        >
          <el-tab-pane
            label="基础信息"
            name="1"
          >
            <BasicInfo :typeStr="typeStr" />
          </el-tab-pane>
          <el-tab-pane
            label="甲方合同"
            name="2"
          >
            <PartyA />
          </el-tab-pane>
          <el-tab-pane
            label="报备规则"
            name="3"
          >
            <ReportedRules />
          </el-tab-pane>
          <el-tab-pane
            label="收派套餐"
            name="4"
          >
            <SetMeal />
          </el-tab-pane>
          <el-tab-pane
            label="结算条件"
            name="5"
          >
            <Close />
          </el-tab-pane>
          <el-tab-pane
            label="中介分销合同/优惠告知书"
            name="6"
          >
            <Notification />
          </el-tab-pane>
          <el-tab-pane
            label="立项测算表"
            name="7"
          >
            <Calculation />
          </el-tab-pane>
          <el-tab-pane
            label="其他配置"
            name="8"
          >
            <Other />
          </el-tab-pane>
          <el-tab-pane
            label="日志及OA附言"
            name="9"
          >
            <LogOA />
          </el-tab-pane>
        </el-tabs>
      </el-scrollbar>
    </template>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import BasicInfo from "./edit-tabs/basicInfo.vue";
import Calculation from "./edit-tabs/calculation.vue";
import Close from "./edit-tabs/close.vue";
import LogOA from "./edit-tabs/logOA.vue";
import Notification from "./edit-tabs/notification.vue";
import Other from "./edit-tabs/other.vue";
import PartyA from "./edit-tabs/partyA.vue";
import ReportedRules from "./edit-tabs/reportedRules.vue";
import SetMeal from "./edit-tabs/setMeal.vue";

Component.registerHooks(["beforeRouteEnter"]);
@Component({
  components: {
    BasicInfo,
    Calculation,
    Close,
    LogOA,
    Notification,
    Other,
    PartyA,
    ReportedRules,
    SetMeal,
  },
})
export default class ProjectApprovalEdit extends Vue {
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