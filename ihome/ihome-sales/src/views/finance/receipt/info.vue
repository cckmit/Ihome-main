<!--
 * @Description: 收款详情
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-17 19:43:20
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-17 20:52:13
-->
<template>
  <IhPage class="text-left">
    <template #info>
      <p class="ih-info-title">收款信息</p>
      <el-form label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="收款编号">{{info.payment.payNo}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款日期">{{info.payment.payDate}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经办人">{{info.payment.operator}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="店组">{{info.payment.groupName}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="款项类型">{{$root.dictAllName(info.payment.foundType, 'FeeType')}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="支付方式">{{$root.dictAllName(info.payment.payType, 'PayType')}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="支付金额">{{info.payment.amount}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="付款方">{{$root.dictAllName(info.payment.payer, 'PaymentPayer')}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务编号">{{info.payment.businessId}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="收款账户">
              <span
                class="text-ellipsis"
                :title="info.payment.payeeName"
              >{{info.payment.payeeName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款账号">{{info.payment.payeeAccount}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="立项周期">{{info.payment.termName}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="联动项目">{{info.payment.projectName}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="房号">{{info.payment.roomNo}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="凭证号">{{info.payment.payCode}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="支付时间">{{info.payment.payTime}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="对账时间">{{info.payment.checkTime}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="确认时间">{{info.payment.confirmTime}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="录入终端">{{$root.dictAllName(info.payment.terminal, 'PaymentTerminal')}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="成交报告编号">{{info.payment.operator}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="状态">{{$root.dictAllName(info.payment.status, 'PaymentStatus')}}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <p class="ih-info-title">操作日志</p>
      <div class="padding-left-20">
        <el-table
          style="width: 100%"
          :data="info.recordVOs"
        >
          <el-table-column
            label="操作"
            prop="operation"
          ></el-table-column>
          <el-table-column
            label="操作人"
            prop="operatorName"
          ></el-table-column>
          <el-table-column
            label="操作时间"
            prop="operateTime"
          ></el-table-column>
          <el-table-column
            label="处理结果"
            prop="result"
          ></el-table-column>
          <el-table-column
            label="备注"
            prop="remark"
          ></el-table-column>
        </el-table>
      </div>
    </template>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { get_payment_getDetail__id } from "../../../api/finance/index";

@Component({})
export default class ReceiptInfo extends Vue {
  private info: any = {
    payment: {},
    recordVOs: [],
  };

  private async getInfo() {
    let id = this.$route.query.id;
    if (id) {
      this.info = await get_payment_getDetail__id({ id });
    }
  }
  created() {
    this.getInfo();
  }
}
</script>

<style lang="scss" scoped>
.text-ellipsis {
  display: block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  // line-height: normal;
}
</style>
