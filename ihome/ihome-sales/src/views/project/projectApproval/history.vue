<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-01-09 15:45:15
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-01 09:35:01
-->
<template>
  <ih-page>
    <template v-slot:info>
      <el-scrollbar>
        <el-tabs
          class="tabClass"
          type="border-card"
          v-model="tabActive"
          stretch
          @tab-click="tabClick(tabActive)"
        >
          <el-tab-pane
            label="基础信息"
            name="BasicInfo"
          >
            <BasicInfo
              v-if="componetName === 'BasicInfo'"
              :style="{'max-height': maxHeight, 'overflow-y': 'auto', 'padding-right': '15px'}"
            />
          </el-tab-pane>
          <el-tab-pane
            label="甲方合同"
            name="PartyA"
          >
            <PartyA
              v-if="componetName === 'PartyA'"
              :style="{'max-height': maxHeight, 'overflow-y': 'auto', 'padding-right': '15px'}"
            />
          </el-tab-pane>
          <el-tab-pane
            label="收派套餐"
            name="SetMeal"
          >
            <SetMeal
              v-if="componetName === 'SetMeal'"
              :style="{'max-height': maxHeight, 'overflow-y': 'auto', 'padding-right': '15px'}"
            />
          </el-tab-pane>
          <el-tab-pane
            label="结算条件"
            name="Close"
          >
            <Close
              v-if="componetName === 'Close'"
              :style="{'max-height': maxHeight, 'overflow-y': 'auto', 'padding-right': '15px'}"
            />
          </el-tab-pane>
          <el-tab-pane
            label="渠道合同/优惠告知书"
            name="Notification"
          >
            <Notification
              v-if="componetName === 'Notification'"
              :style="{'max-height': maxHeight, 'overflow-y': 'auto', 'padding-right': '15px'}"
            />
          </el-tab-pane>
          <el-tab-pane
            label="其他配置"
            name="Other"
          >
            <Other
              v-if="componetName === 'Other'"
              :style="{'max-height': maxHeight, 'overflow-y': 'auto', 'padding-right': '15px'}"
            />
          </el-tab-pane>
          <el-tab-pane
            label="立项测算表"
            name="Calculation"
          >
            <Calculation
              v-if="componetName === 'Calculation'"
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

import BasicInfo from "./history-tabs/basicInfo.vue";
import Calculation from "./history-tabs/calculation.vue";
import Close from "./history-tabs/close.vue";
import Notification from "./history-tabs/notification.vue";
import Other from "./history-tabs/other.vue";
import PartyA from "./history-tabs/partyA.vue";
import SetMeal from "./history-tabs/setMeal.vue";

Component.registerHooks(["beforeRouteEnter"]);
@Component({
  components: {
    BasicInfo,
    Calculation,
    Close,
    Notification,
    Other,
    PartyA,
    SetMeal,
  },
})
export default class ProjectApprovalInfo extends Vue {
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