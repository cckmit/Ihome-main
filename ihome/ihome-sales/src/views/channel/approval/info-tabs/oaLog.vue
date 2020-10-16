<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-08-13 11:40:10
 * @LastEditors: zyc
 * @LastEditTime: 2020-10-16 10:32:52
-->
<template>
  <div>
    <p class="ih-info-title">操作日志列表</p>
    <el-table :data="logList" style="width: 100%; padding: 20px">
      <el-table-column prop="operator" label="处理人" width="180">
      </el-table-column>
      <el-table-column prop="stations" label="岗位" width="180">
      </el-table-column>

      <el-table-column prop="operateTime" label="处理时间"> </el-table-column>
      <el-table-column prop="result" label="处理结果"> </el-table-column>
      <el-table-column prop="remark" label="处理意见"> </el-table-column>
    </el-table>
    <div class="text-left" style="margin: 20px">
      <el-button type="primary" @click="currentUserBtn()"
        >查询当前待办人</el-button
      >
      <span class="margin-left-20">{{ currentUser }} </span>
      <!-- <span> 姓名：张三，岗位：渠道专员 </span> -->
    </div>
  </div>
</template>
<script lang="ts">
import {
  get_channelApprovalOaRecord_getAll__approvalId,
  get_channelApprovalOaRecord_getCurrentToDoUser__approvalId,
} from "../../../../api/channel/index";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class ApprovalInfoOALog extends Vue {
  logList: any = [];
  id: any = null;
  currentUser: any = null;

  async created() {
    this.id = this.$route.query.id;

    this.logList = await get_channelApprovalOaRecord_getAll__approvalId({
      approvalId: this.id,
    });
  }
  async currentUserBtn() {
    this.currentUser = await get_channelApprovalOaRecord_getCurrentToDoUser__approvalId(
      { approvalId: this.id }
    );
  }
}
</script>
<style lang="scss" scoped>
</style>