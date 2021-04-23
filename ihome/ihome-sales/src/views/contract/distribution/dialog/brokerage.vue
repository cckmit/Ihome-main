<!--
 * @Description: 佣金标准问题
 * @version: 
 * @Author: ywl
 * @Date: 2021-04-23 10:49:00
 * @LastEditors: ywl
 * @LastEditTime: 2021-04-23 10:56:46
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    append-to-body
    width="75%"
    title="佣金标准"
  >
    <el-table :data="list">
      <el-table-column
        label="物业类型"
        prop="propertyEnum"
      >
        <template v-slot="{ row }">
          {{$root.dictAllName(row.propertyEnum, 'Property')}}
        </template>
      </el-table-column>
      <el-table-column
        label="佣金分类"
        prop="costTypeEnum"
      >
        <template v-slot="{ row }">
          {{$root.dictAllName(row.costTypeEnum, 'FeeType')}}
        </template>
      </el-table-column>
      <el-table-column
        label="条件"
        prop="sendContext"
      >
        <template v-slot="{ row }">
          {{row.sendContext || '-'}}
        </template>
      </el-table-column>
      <el-table-column
        label="派发佣金标准"
        prop="sendStandard"
      >
        <template v-slot="{ row }">
          {{row.sendStandard || '-'}}
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class Brokerage extends Vue {
  @Prop() list!: any;
  private dialogVisible = true;

  cancel() {
    this.$emit("cancel", false);
  }
}
</script>
