<!--
 * @Description: 收派信息
 * @version: 
 * @Author: lsj
 * @Date: 2021-05-18 11:20:11
 * @LastEditors: lsj
 * @LastEditTime: 2021-05-18 14:36:22
-->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>收派信息</span>
      </div>
      <div>
        <el-table
          :data="infoForm.receiveList"
          style="width: 100%"
          show-summary
          :summary-method="getReceiveSummaries"
          sum-text="合计">
          <el-table-column prop="type" label="类型" width="100">
            <template slot-scope="scope">
              <div>{{ $root.dictAllName(scope.row.type, "FeeType") }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="partyACustomerName"
            label="甲方/客户"
            width="250">
            <template slot-scope="scope">
              <div>
                <span v-if="scope.row.type === 'ServiceFee'">客户</span>
                <el-link
                  v-if="scope.row.type !== 'ServiceFee'"
                  type="primary"
                  @click="gotoNew(scope.row)">
                  {{ scope.row.partyACustomerName }}
                </el-link>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="receiveAmount"
            label="应收金额"
            min-width="180"
          ></el-table-column>
          <el-table-column
            prop="commAmount"
            label="派发佣金金额"
            min-width="180"
          ></el-table-column>
          <el-table-column
            prop="rewardAmount"
            label="派发内场金额"
            min-width="180"
          ></el-table-column>
          <el-table-column
            prop="totalPackageAmount"
            label="总包业绩金额"
            min-width="180"
          ></el-table-column>
          <el-table-column
            prop="distributionAmount"
            label="分销业绩金额"
            min-width="180"
          ></el-table-column>
          <el-table-column
            prop="otherChannelFees"
            label="其他渠道费用"
            min-width="180"
          ></el-table-column>
          <el-table-column fixed="right" label="操作" min-width="100">
            <template slot-scope="scope">
              <el-link v-if="scope.row.type === 'AgencyFee'" type="primary" @click="viewPackage(scope)">查看当前</el-link>
              <div v-else>-</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <br />
    <el-drawer
      title="套餐标准详情"
      :visible.sync="drawerFlag"
      :with-header="true">
      <el-form :model="packageForm" label-width="120px" label-position="left" class="package-wrapper">
        <el-form-item label="收派明细" style="font-weight: bold"></el-form-item>
        <el-form-item label="应收金额">
          <div class="color-red">{{packageForm.receivableAmout}} + {{packageForm.receivablePoint ? packageForm.receivablePoint : 0}}%</div>
        </el-form-item>
        <el-form-item label="派发佣金">
          <div class="color-red">{{packageForm.sendAmount}} + {{packageForm.sendPoint ? packageForm.sendPoint : 0}}%</div>
        </el-form-item>
        <el-form-item label="派发内场奖励">
          <div class="color-red">{{packageForm.sendInAmount}} + {{packageForm.sendInPoint ? packageForm.sendInPoint : 0}}%</div>
        </el-form-item>
        <el-form-item label="总包业绩">
          <div class="color-red">{{packageForm.generalAchieveAmount}} + {{packageForm.generalAchievePoint ? packageForm.generalAchievePoint : 0}}%</div>
        </el-form-item>
        <el-form-item label="分销业绩">
          <div class="color-red">{{packageForm.distributeAchieveAmount}} + {{packageForm.distributeAchievePoint ? packageForm.distributeAchievePoint : 0}}%</div>
        </el-form-item>
        <el-form-item label="其他渠道费用" style="border-bottom: 1px solid lightgray">
          <div class="color-red">{{packageForm.otherChannelAmount}}</div>
        </el-form-item>
        <el-form-item label="条件" style="font-weight: bold"></el-form-item>
        <div class="color-red padding-left-30">{{packageForm.condition}}</div>
      </el-form>
    </el-drawer>
  </div>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";

  @Component({
    components: {},
  })
  export default class ReceiveInfo extends Vue {
    @Prop() infoForm?: any;
    private drawerFlag: any = false;
    private packageForm: any = {};

    async created() {
      console.log('ReceiveInfo');
    }

    // 查看当前收派套餐信息
    viewPackage(scope: any) {
      console.log(scope);
      this.packageForm = scope.row.collectandsendDetailDealVO;
      this.drawerFlag = true;
    }

    // 链接跳转
    gotoNew(item: any) {
      window.open(`/web-sales/developers/info?id=${item.partyACustomer}`);
    }

    // 计算收派金额总计
    getReceiveSummaries(param: any) {
      const {columns, data} = param;
      const sums: any = [];
      columns.forEach((column: any, index: any) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        if (![0, 1].includes(index)) {
          const values = data.map((item: any) => Number(item[column.property]));
          if (!values.every((value: any) => isNaN(value))) {
            sums[index] = values.reduce((prev: any, curr: any) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                let total = (prev * 1 * 100 + curr * 1 * 100) / 100;
                return total;
              } else {
                return ((prev * 1 * 100) / 100);
              }
            }, 0);
            sums[index] = Math.round(sums[index] * 100) / 100; // 解决精度缺失问题
          } else {
            sums[index] = '';
          }
        } else {
          sums[index] = '';
        }
      });
      return sums;
    }
  }
</script>
<style lang="scss" scoped>
.color-red {
  color: red;
}
.padding-left-120 {
  padding-left: 120px;
  box-sizing: border-box;
}
.package-wrapper {
  /deep/.el-form-item {
    box-sizing: border-box;
    margin: 0px 30px;
    margin-bottom: 0px !important;
  }
}
</style>
