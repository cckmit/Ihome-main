<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-10-22 15:16:54
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-01 14:17:43
-->
<template>
  <ih-page>
    <template v-slot:info>
      <el-scrollbar>
        <el-tabs
          class="tabClass"
          type="border-card"
          v-model="componetName"
          @tab-click="tabClick(componetName)"
          :before-leave="beforeLeave"
        >
          <el-tab-pane
            label="基础信息"
            name="EditBasicInfo"
            v-if="isShow"
          >
            <EditBasicInfo
              ref="editBasicInfo"
              :style="{'max-height': maxHeight, 'overflow-y': 'auto', 'padding-right': '15px'}"
              @cutOther="querybasicInfo"
              v-if="componetName === 'EditBasicInfo'"
              :info-data="infoData"
            />
          </el-tab-pane>
          <el-tab-pane
            label="基础信息"
            name="InfoBasicInfo"
            v-if="!isShow"
          >
            <InfoBasicInfo
              ref="infoBasicInfo"
              :style="{'max-height': maxHeight, 'overflow-y': 'auto', 'padding-right': '15px'}"
              @cutOther="querybasicInfo"
              v-if="componetName === 'InfoBasicInfo'"
              :info-data="infoData"
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

import EditBasicInfo from "./edit-tabs/basicInfo.vue";
import InfoBasicInfo from "./info-tabs/basicInfo.vue";
import HouseType from "./edit-tabs/houseType.vue";
import PopularizeInfo from "./edit-tabs/popularizeInfo.vue";
import ReportedRules from "./edit-tabs/reportedRules.vue";
import RoomNum from "./edit-tabs/roomNum.vue";
import { get_project_get__proId } from "@/api/project/index";

Component.registerHooks(["beforeRouteEnter"]);
@Component({
  components: {
    EditBasicInfo,
    InfoBasicInfo,
    HouseType,
    PopularizeInfo,
    RoomNum,
    ReportedRules,
  },
})
export default class ProjectChildEdit extends Vue {
  typeStr = "";
  componetName: any = "";
  isCut: any = true;
  infoData: any = {};
  isShow: any = true;

  private beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      vm.typeStr = to.name;
    });
  }
  private get projectId() {
    return this.$route.query.id;
  }
  tabClick(val: any) {
    this.componetName = val;
  }
  beforeLeave(activeName: any, oldActiveName: any) {
    if (oldActiveName === "BasicInfo") {
      if (!this.isCut || !this.projectId) {
        this.$confirm("请保存后再切换?", "提示", {
          confirmButtonText: "保存",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            await (this.$refs.editBasicInfo as any).submit("save");
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

  get maxHeight() {
    let h =
      (document.documentElement.clientHeight || document.body.clientHeight) -
      210 +
      "px";
    return h;
  }

  querybasicInfo(isCut: any) {
    this.isCut = isCut;
  }

  created() {
    this.getInfo();
  }

  async getInfo() {
    let editType = window.sessionStorage.getItem("editType");
    if (this.projectId) {
      const data = await get_project_get__proId({
        proId: this.projectId,
      });
      if (editType === "yeguanEdit") {
        this.componetName = "EditBasicInfo";
      } else {
        if (["Conduct", "Adopt"].includes(data.auditEnum)) {
          this.componetName = "InfoBasicInfo";
          this.isShow = false;
        } else {
          this.componetName = "EditBasicInfo";
          this.isShow = true;
        }
      }
      this.infoData = data;
    } else {
      this.componetName = "EditBasicInfo";
    }
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