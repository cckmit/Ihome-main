<!--
 * @Description: 发票信息
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
        <span>发票信息</span>
      </div>
      <div>
        <el-row>
          <el-col>
            <el-table
              class="ih-table"
              :data="infoForm.invoiceList">
              <el-table-column prop="businessNo" label="业务单号" min-width="120"></el-table-column>
              <el-table-column prop="invoiceTitle" label="发票抬头" min-width="100"></el-table-column>
              <el-table-column prop="invoiceType" label="发票类型" min-width="100">
                <template slot-scope="scope">
                  {{$root.dictAllName(scope.row.invoiceType, 'InvoiceType')}}
                </template>
              </el-table-column>
              <el-table-column prop="amount" label="发票金额（含税）" min-width="150"></el-table-column>
              <el-table-column prop="taxRate" label="税率" min-width="120"></el-table-column>
              <el-table-column prop="noTax" label="确认主营（不含税）" min-width="150"></el-table-column>
              <el-table-column prop="tax" label="税额" min-width="120"></el-table-column>
              <el-table-column prop="payee" label="收款方" min-width="120"></el-table-column>
              <el-table-column prop="ncCode" label="NC凭证号" min-width="120"></el-table-column>
              <el-table-column prop="status" label="开票状态" min-width="100">
                <template slot-scope="scope">
                  {{$root.dictAllName(scope.row.invoiceType, 'InvoiceOperationStatus')}}
                </template>
              </el-table-column>
              <el-table-column prop="operationDate" label="开票日期" min-width="150"></el-table-column>
              <el-table-column fixed="right" label="操作" width="90">
                <template slot-scope="scope">
                  <el-link
                    class="margin-right-10"
                    type="primary"
                    @click.native.prevent="viewInvoiceDetail(scope)"
                  >查看详情
                  </el-link>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";

  @Component({
    components: {},
  })
  export default class InvoiceInfo extends Vue {
    @Prop() infoForm?: any;

    async created() {
      console.log('InvoiceInfo');
    }

    // 查看开票详情
    viewInvoiceDetail(scope: any) {
      // console.log(scope);
      let router = this.$router.resolve({
        path: `/invoice/info`,
        query: {
          id: scope.row.id
        },
      });
      window.open(router.href, "_blank");
    }
  }
</script>
<style lang="scss" scoped>
</style>
