<!--
 * @Description:
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-14 20:10:35
 * @LastEditors: lsj
 * @LastEditTime: 2021-05-12 15:11:33
-->
<template>
  <ih-page>
    <el-row class="ih-info-line">
      <el-col class="text-left">
        <h3>入库编号：{{ info.approvalNo }}</h3>
      </el-col>
    </el-row>
    <el-row class="ih-info-line">
      <el-col :span="18">
        <el-row>
          <el-col class="ih-info-item-right item-padding-left-0">发起人：{{info.inputTime }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="6" class="text-right">
        <el-row>
          <el-col class="text-right">当前状态</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="ih-info-line">
      <el-col :span="18">
        <el-row>
          <el-col class="ih-info-item-right item-padding-left-0">发起日期：{{info.createTime }}</el-col>
        </el-row>
      </el-col>
      <el-col
        :span="6"
        class="text-right"
        style="font-weight: 700; font-size: 20px">
        <el-row>
          <el-col class="text-right">
            <div class="ih-status-dot flex-content" v-if="info.status">
              <span class="dot" :class="getStatusDot(info.status)"></span>
              <span>{{ $root.dictAllName(info.status, "ChannelApprovalStatus") }}</span>
            </div>
            <div v-else>-</div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div style="margin-bottom: 50px">
      <el-tabs v-model="tabActive">
        <el-tab-pane label="详情信息" name="1">
          <ApprovalDetails :info="info" />
        </el-tab-pane>
        <el-tab-pane label="操作日志" name="2">
          <ApprovalInfoLog />
        </el-tab-pane>
      </el-tabs>
      <div class="back-fixed">
        <el-button type="primary" @click="$router.go(-1)">返回</el-button>
      </div>
    </div>
<!--    <template v-slot:info>
      <el-tabs type="border-card" v-model="tabActive">
        <el-tab-pane label="详情信息" name="1">
          <ApprovalDetails />
        </el-tab-pane>

        <el-tab-pane label="操作日志" name="2">
          <ApprovalInfoLog />
        </el-tab-pane>
      </el-tabs>
    </template>-->
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ApprovalDetails from "./info-tabs/details.vue";
import ApprovalInfoLog from "./info-tabs/log.vue";
import {
  get_channelApproval_get__id
} from "../../../api/channel/index";

@Component({
  components: { ApprovalDetails, ApprovalInfoLog },
})
export default class ApprovalInfo extends Vue {
  info: any = {
    channelApprovalAttachments: [],
    channelApprovalGrades: [],
    oaAttachmentVOs: [],
  };
  tabActive: any = null;
  async created() {
    this.tabActive = this.$route.query.tab || "1";
    let id = this.$route.query.id;
    this.info = await get_channelApproval_get__id({ id: id });
  }
  // 获取颜色
  getStatusDot(status: any = '') {
    if (status === 'DRAFT') {
      return 'warning';
    } else if (status === 'Approved') {
      return 'success';
    } else {
      return 'primary';
    }
  }
}
</script>
<style lang="scss" scoped>
.ih-page {
  overflow: hidden;
}
/deep/ .ih-info-line {
  padding: 0 10px 10px 10px;
}
/deep/ .el-card__header {
  background: #f9f9f9;
}
.back-fixed {
  position: fixed;
  bottom: 20px;
  right: 20px;
  text-align: right;
  padding-right: 20px;
  margin: 0 20px;
}
.item-padding-left-0 {
  padding-left: 0px;
}
.flex-content {
  justify-content: flex-end;
}
</style>
