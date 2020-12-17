<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-08-13 11:40:10
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-17 15:48:39
-->
<template>
  <div>
    <div class="text-left">
      <el-button type="primary" @click="selectOaBtn()"
        >查询OA审批日志</el-button
      >
      <el-button type="success" @click="currentUserBtn()"
        >查询OA当前待办人</el-button
      >
    </div>

    <p class="ih-info-title">操作日志</p>
    <el-table :data="logList" style="width: 100%; padding: 20px">
      <el-table-column prop="operation" label="操作" width="180">
      </el-table-column>
      <el-table-column prop="operatorUsername" label="操作人" width="180">
      </el-table-column>
      <el-table-column prop="operatorDept" label="岗位" width="180">
      </el-table-column>
      <el-table-column prop="operateTime" label="操作时间"> </el-table-column>
      <el-table-column prop="result" label="处理结果"> </el-table-column>
      <el-table-column prop="systemType" label="系统"> </el-table-column>
      <el-table-column prop="remark" label="备注"> </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import {
  get_channelApprovalRecord_getAll__approvalId,
  post_channelApproval_queryOaApprovalUser__id,
  post_channelApproval_getFlowCommentList__id,
} from "../../../../api/channel/index";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class ApprovalInfoLog extends Vue {
  logList: any = [];
  id: any = null;
  async created() {
    this.id = this.$route.query.id;
    this.logList = await get_channelApprovalRecord_getAll__approvalId({
      approvalId: this.id,
    });
  }
  async currentUserBtn() {
    const res: any = await post_channelApproval_queryOaApprovalUser__id({
      id: this.id,
    });
    this.$alert(res, "OA当前待办人", {
      confirmButtonText: "确定",
    });
  }
  async selectOaBtn() {
    this.logList = await post_channelApproval_getFlowCommentList__id({
      id: this.id,
    });
    this.$message.success("OA日志更新成功");
  }
}
</script>
<style lang="scss" scoped>
</style>