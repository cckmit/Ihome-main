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
          <el-table-column prop="suppContType" label="补充类型" width="170">
            <template slot-scope="scope">
              <div v-if="scope.row.suppContType">
                {{ $root.dictAllName(scope.row.suppContType, "SuppContType") }}
              </div>
              <div v-else>-</div>
            </template>
          </el-table-column>
          <el-table-column prop="receiveAmount" label="本单应收" width="180"></el-table-column>
          <el-table-column prop="achieveAmount" label="本单业绩" width="180"></el-table-column>
          <el-table-column prop="commAmount" label="本单应付" width="180"></el-table-column>
          <el-table-column prop="status" label="状态" width="200">
            <template slot-scope="scope">
              <div class="deal-status-dot">
                <span class="dot" :class="getStatusDot(scope.row.status)"></span>
                <span>{{ $root.dictAllName(scope.row.status, 'DealStatus') }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="approveTime" label="审核通过时间" width="180">
            <template slot-scope="scope">
              <div>{{scope.row.approveTime ? scope.row.approveTime : '-'}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="entryDate" label="录入日期" width="180">
            <template slot-scope="scope">
              <div>{{scope.row.entryDate ? getDateStr(scope.row.entryDate) : '-'}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="allotDate" label="业绩分配日期" width="180">
            <template slot-scope="scope">
              <div>{{scope.row.allotDate ? getDateStr(scope.row.allotDate) : '-'}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="achieveConfirmTime" label="业绩确认日期" width="180">
            <template slot-scope="scope">
              <div>{{scope.row.achieveConfirmTime ? getDateStr(scope.row.achieveConfirmTime) : '-'}}</div>
            </template>
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
  // 获取颜色
  getStatusDot(status: any = '') {
    if (status === 'Draft') {
      return 'warning';
    } else if (status === 'ReviewPassed') {
      return 'success';
    } else {
      return 'primary';
    }
  }
  // 获取日期年月日
  getDateStr(value: any = '') {
    if (value) {
      return value.substring(0, 10);
    }
  }
}
</script>
<style lang="scss" scoped>
.card-header {
  text-align: left;
  font-weight: 600;
  font-size: 18px;
}
.deal-status-dot {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;

  .dot {
    display:block;
    border-radius:50%;
    width:8px;
    height:8px;
    box-sizing: border-box;
    margin-right: 5px;
  }

  .warning {
    background: #e6a23c;
  }

  .primary {
    background: #409eff;
  }

  .success {
    background: #67c23a;
  }
}
</style>