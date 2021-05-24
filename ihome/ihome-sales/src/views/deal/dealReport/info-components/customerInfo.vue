<!--
 * @Description: 客户信息
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
        <span>客户信息</span>
      </div>
      <div>
        <el-table :data="infoForm.customerList" style="width: 100%">
          <el-table-column
            prop="customerNo"
            label="客户编号"
            min-width="120"
          ></el-table-column>
          <el-table-column prop="customerType" label="客户类型" min-width="120">
            <template slot-scope="scope">
              <div>
                {{ $root.dictAllName(scope.row.customerType, "CustType") }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="customerName"
            label="客户名称"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="customerPhone"
            label="手机号码"
            min-width="120"
          ></el-table-column>
          <el-table-column prop="cardType" label="证件类型" min-width="150">
            <template slot-scope="scope">
              <div>{{ $root.dictAllName(scope.row.cardType, "CardType") }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="cardNo"
            label="证件编号"
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
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
  export default class CustomerInfo extends Vue {
    @Prop() infoForm?: any;

    async created() {
      console.log('CustomerInfo');
    }
  }
</script>
<style lang="scss" scoped>
</style>
