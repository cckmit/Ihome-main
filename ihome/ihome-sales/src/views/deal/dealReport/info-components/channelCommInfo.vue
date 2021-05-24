<!--
 * @Description: 拆佣信息
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
        <span>拆佣信息</span>
      </div>
      <div>
        <el-table
          style="width: 100%"
          key=""
          show-summary
          :summary-method="getSummariesByComm"
          sum-text="合计"
          :data="infoForm.channelCommList">
          <el-table-column prop="target" label="拆佣对象" min-width="120">
            <template slot-scope="scope">
              <div>
                {{ $root.dictAllName(scope.row.target, "CommObjectType") }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="agencyName"
            label="收款方"
            min-width="120"
          ></el-table-column>
          <el-table-column prop="feeType" label="费用类型" min-width="120">
            <template slot-scope="scope">
              <div>{{ $root.dictAllName(scope.row.feeType, "FeeType") }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="partyACustomerName"
            label="费用来源"
            min-width="120"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.feeType === 'ServiceFee'">客户</div>
              <div v-else>{{ scope.row.partyACustomerName }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="amount"
            label="金额"
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="remarks"
            label="备注"
            min-width="150"
          ></el-table-column>
        </el-table>
      </div>
    </el-card>
    <br />
  </div>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";

  @Component({
    components: {},
  })
  export default class ChannelCommInfo extends Vue {
    @Prop() infoForm?: any;

    async created() {
      console.log('ChannelCommInfo');
    }

    // 拆佣合计
    getSummariesByComm(param: any) {
      const {columns, data} = param;
      const sums: any = [];
      columns.forEach((column: any, index: any) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        if ([4].includes(index)) {
          const values = data.map((item: any) => Number(item[column.property]));
          if (!values.every((value: any) => isNaN(value))) {
            sums[index] = values.reduce((prev: any, curr: any) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                let total = (this as any).$math.tofixed((this as any).$math.add(prev * 1, curr * 1), 2);
                return total;
              } else {
                return ((this as any).$math.tofixed(prev * 1, 2));
              }
            }, 0);
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
</style>
