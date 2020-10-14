<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-08-13 11:40:10
 * @LastEditors: zyc
 * @LastEditTime: 2020-10-14 20:38:39
-->
<template>
  <div>
    <p class="ih-info-title">操作日志列表</p>
    <el-table :data="logList" style="width: 100%; padding: 20px">
      <el-table-column prop="name" label="处理人" width="180">
      </el-table-column>
      <el-table-column prop="name" label="岗位" width="180"> </el-table-column>

      <el-table-column prop="name" label="处理时间"> </el-table-column>
      <el-table-column prop="name" label="处理结果"> </el-table-column>
      <el-table-column prop="name" label="处理意见"> </el-table-column>
    </el-table>
    <div class="text-left" style="margin: 20px">
      <el-button type="primary">查询当前待办人</el-button>
      <span> 姓名：张三，岗位：渠道专员 </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class ApprovalInfoOALog extends Vue {
  logList: any = [];
}
</script>
<style lang="scss" scoped>
</style>