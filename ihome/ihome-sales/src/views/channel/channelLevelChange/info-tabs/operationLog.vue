<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-10-15 12:33:37
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-17 14:59:21
-->
<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        prop="operation"
        label="操作"
      ></el-table-column>
      <el-table-column
        prop="operatorName"
        label="处理人"
      ></el-table-column>
      <el-table-column
        prop="operateTime"
        label="处理时间"
      ></el-table-column>
      <el-table-column
        prop="result"
        label="处理结果"
        width="100"
      >
        <template v-slot="{ row }">
          {{ $root.dictAllName(row.result, 'ApproveResult') || '-' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
      ></el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { get_channelGradeRecordChange_getAll__gradeId } from "@/api/channel/index";
@Component({
  components: {},
})
export default class ChannelLog extends Vue {
  private list: any = [];

  created() {
    let id = this.$route.query.id;
    if (id) {
      this.getLogList(id);
    }
  }

  private async getLogList(id: any): Promise<void> {
    this.list = await get_channelGradeRecordChange_getAll__gradeId({
      gradeId: id,
    });
  }
}
</script>
<style lang="scss" scoped>
</style>