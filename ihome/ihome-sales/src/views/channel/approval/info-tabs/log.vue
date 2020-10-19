<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-08-13 11:40:10
 * @LastEditors: zyc
 * @LastEditTime: 2020-10-16 10:25:28
-->
<template>
  <div>
    <p class="ih-info-title">操作日志列表</p>
    <el-table :data="logList" style="width: 100%; padding: 20px">
      <el-table-column prop="operation" label="操作" width="180"> </el-table-column>
      <el-table-column prop="operator" label="处理人" width="180">
      </el-table-column>

      <el-table-column prop="operateTime" label="处理时间"> </el-table-column>
      <el-table-column prop="result" label="处理结果"> </el-table-column>
      <el-table-column prop="remark" label="备注"> </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import { get_channelApprovalRecord_getAll__approvalId } from "../../../../api/channel/index";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class ApprovalInfoLog extends Vue {
  logList: any = [];
  async created() {
    let id = this.$route.query.id;
    console.log(id);
    this.logList = await get_channelApprovalRecord_getAll__approvalId({ approvalId: id });
  }
}
</script>
<style lang="scss" scoped>
</style>