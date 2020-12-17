<!--
 * @Descripttion: 渠道商操作日志
 * @version: 
 * @Author: zyc
 * @Date: 2020-05-25 09:37:07
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-17 14:57:07
--> 
<template>
  <div>
    <el-table
      :data="list"
      style="width:100%"
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
import { get_channelRecordChange_getAll__channelId } from "@/api/channel/index";
@Component({
  components: {},
})
export default class ChannelLog extends Vue {
  private list: any = [];

  private async getLogList(id: any): Promise<void> {
    this.list = await get_channelRecordChange_getAll__channelId({
      channelId: id,
    });
  }

  created() {
    let id = this.$route.query.id;
    if (id) {
      this.getLogList(id);
    }
  }
}
</script>
