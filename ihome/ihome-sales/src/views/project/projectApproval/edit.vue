<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-27 17:15:27
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-13 14:48:12
-->
<template>
  <ih-page>
    <template v-slot:info>
      <el-scrollbar>
        <el-tabs
          class="tabClass"
          type="border-card"
          v-model="componetName"
          stretch
          @tab-click="tabClick(componetName)"
          :before-leave="beforeLeave"
        >
          <el-tab-pane
            label="基础信息"
            name="BasicInfo"
          >
            <BasicInfo
              ref="basicInfo"
              :style="{'max-height': maxHeight, 'overflow-y': 'auto', 'padding-right': '15px'}"
              v-if="componetName === 'BasicInfo'"
              @cutOther="querybasicInfo"
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
          <el-tab-pane
            label="日志及OA附言"
            name="LogOA"
          >
            <LogOA
              v-if="componetName === 'LogOA'"
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
import BasicInfo from "./edit-tabs/basicInfo.vue";
import Calculation from "./edit-tabs/calculation.vue";
import Close from "./edit-tabs/close.vue";
import LogOA from "./edit-tabs/logOA.vue";
import Notification from "./edit-tabs/notification.vue";
import Other from "./edit-tabs/other.vue";
import PartyA from "./edit-tabs/partyA.vue";
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
    SetMeal,
  },
})
export default class ProjectApprovalEdit extends Vue {
  typeStr = "";
  componetName: any = "";
  isCut: any = true;

  get maxHeight() {
    let h =
      (document.documentElement.clientHeight || document.body.clientHeight) -
      210 +
      "px";
    return h;
  }

  private beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      vm.typeStr = to.name;
    });
  }

  created() {
    this.componetName = window.sessionStorage.getItem("tabStatus")
      ? window.sessionStorage.getItem("tabStatus")
      : "BasicInfo";
  }

  destroyed() {
    window.sessionStorage.removeItem("tabStatus");
  }

  tabClick(val: any) {
    this.componetName = val;
  }

  beforeLeave(activeName: any, oldActiveName: any) {
    if (oldActiveName === "BasicInfo") {
      if (!this.isCut) {
        this.$confirm("请保存后再切换?", "提示", {
          confirmButtonText: "保存",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            (this.$refs.basicInfo as any).submit("save");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消",
            });
          });
        return false;
      }
    }
  }

  querybasicInfo(isCut: any) {
    this.isCut = isCut;
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