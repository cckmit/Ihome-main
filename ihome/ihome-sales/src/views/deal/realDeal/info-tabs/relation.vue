<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>关联成交报告</span>
      </div>
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="xxx" label="成交报告编号" width="200">
          </el-table-column>
          <el-table-column prop="xxx" label="补充类型" width="200">
          </el-table-column>
          <el-table-column prop="xxx" label="本单应收" width="200">
          </el-table-column>
          <el-table-column prop="xxx" label="本单业绩" width="200">
          </el-table-column>
          <el-table-column prop="xxx" label="本单应付"> </el-table-column>
          <el-table-column prop="xxx" label="状态"> </el-table-column>
          <el-table-column prop="xxx" label="填写时间"> </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class Relation extends Vue {
  tableData: any = [];
}
</script>
<style lang="scss" scoped>
.card-header {
  text-align: left;
  font-weight: 600;
  font-size: 18px;
}
</style>