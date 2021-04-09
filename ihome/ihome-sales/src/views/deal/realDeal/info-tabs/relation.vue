<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>关联成交报告</span>
      </div>
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="dealCode" label="成交报告编号" width="200">
            <template slot-scope="scope">
              <el-link type="primary" @click="gotoNew(scope.row)">
                {{ scope.row.dealCode }}</el-link
              >
            </template>
          </el-table-column>
          <el-table-column prop="suppContType" label="补充类型" width="200">
            <template slot-scope="scope">
              <div>
                {{ $root.dictAllName(scope.row.suppContType, "SuppContType") }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="receiveAmount" label="本单应收" width="200">
          </el-table-column>
          <el-table-column prop="achieveAmount" label="本单业绩" width="200">
          </el-table-column>
          <el-table-column prop="commAmount" label="本单应付">
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <div>
                {{ $root.dictAllName(scope.row.status, "DealStatus") }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="填写时间">
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { get_deal_listByParent__id } from "../../../../api/deal/index";
@Component({
  components: {},
})
export default class Relation extends Vue {
  tableData: any = [];
  async created() {
    this.tableData = await get_deal_listByParent__id({
      id: this.$route.query.id,
    });
  }
  gotoNew(row: any) {
    window.open(`/web-sales/dealReport/info?id=${row.id}&type=ID`);
  }
}
</script>
<style lang="scss" scoped>
.card-header {
  text-align: left;
  font-weight: 600;
  font-size: 18px;
}
</style>