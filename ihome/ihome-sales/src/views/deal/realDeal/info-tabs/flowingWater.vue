<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>流水总览</span>
      </div>
      <div>
        <el-row class="row-col-height">
          <!-- <el-col :span="6" v-for="(item, index) in waterList" :key="index">
            <div class="water-item">
              <div class="water-item-1">
                <div class="water-item-1-left">应收金额{{ item }}</div>
                <div class="water-item-1-right">开发商已签字</div>
              </div>
              <div class="water-item-2">70,000.00</div>
              <div class="water-item-3"></div>
              <div class="water-item-4">
                <span>服务费： </span>
                <span>10,000.00</span>

                <span style="margin-left: 10px">代理费：</span>
                <span>60,000.00</span>
              </div>
            </div>
          </el-col> -->
          <el-col :span="6">
            <div class="water-item">
              <div class="water-item-1">
                <div class="water-item-1-left">应收金额</div>
                <div class="water-item-1-right"></div>
              </div>
              <div class="water-item-2">{{ receiveAchieve.receiveAmount }}</div>
              <div class="water-item-3"></div>
              <div class="water-item-4">
                <span>服务费： </span>
                <span>{{ receiveAchieve.serReceiveAmount }}</span>
                <span style="margin-left: 10px">代理费：</span>
                <span>{{ receiveAchieve.ageReceiveAmount }}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="water-item">
              <div class="water-item-1">
                <div class="water-item-1-left">已收金额</div>
                <div class="water-item-1-right"></div>
              </div>
              <div class="water-item-2">{{ receiveAchieve.paidAmount }}</div>
              <div class="water-item-3"></div>
              <div class="water-item-4">
                <span>服务费： </span>
                <span>{{ receiveAchieve.serPaidAmount }}</span>
                <span style="margin-left: 10px">代理费：</span>
                <span>{{ receiveAchieve.agePaidAmount }}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="water-item">
              <div class="water-item-1">
                <div class="water-item-1-left">未收金额</div>
                <div class="water-item-1-right"></div>
              </div>
              <div class="water-item-2">
                {{ receiveAchieve.unreceiveAmount }}
              </div>
              <div class="water-item-3"></div>
              <div class="water-item-4">
                <span>服务费： </span>
                <span>{{ receiveAchieve.unreceiveServiceAmount }}</span>
                <span style="margin-left: 10px">代理费：</span>
                <span>{{ receiveAchieve.unreceiveAgentAmount }}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="water-item">
              <div class="water-item-1">
                <div class="water-item-1-left">退款金额</div>
                <div class="water-item-1-right"></div>
              </div>
              <div class="water-item-2">{{ receiveAchieve.refundAmount }}</div>
              <div class="water-item-3"></div>
              <div class="water-item-4">
                <span>已退款： </span>
                <span>{{ receiveAchieve.refundedAmount }}</span>
                <span style="margin-left: 10px">待退款：</span>
                <span>{{ receiveAchieve.waitRefundAmount }}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="water-item">
              <div class="water-item-1">
                <div class="water-item-1-left">应付金额</div>
                <div class="water-item-1-right"></div>
              </div>
              <div class="water-item-2">{{ receiveAchieve.payAmount }}</div>
              <div class="water-item-3"></div>
              <div class="water-item-4">
                <span>服务费： </span>
                <span>{{ receiveAchieve.payServiceAmount }}</span>
                <span style="margin-left: 10px">代理费：</span>
                <span>{{ receiveAchieve.payAgentAmount }}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="water-item">
              <div class="water-item-1">
                <div class="water-item-1-left">已付金额</div>
                <div class="water-item-1-right"></div>
              </div>
              <div class="water-item-2">
                {{ receiveAchieve.paidTotalAmount }}
              </div>
              <div class="water-item-3"></div>
              <div class="water-item-4">
                <span>服务费： </span>
                <span>{{ receiveAchieve.paidServiceAmount }}</span>
                <span style="margin-left: 10px">代理费：</span>
                <span>{{ receiveAchieve.paidAgentAmount }}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="water-item">
              <div class="water-item-1">
                <div class="water-item-1-left">未付金额</div>
                <div class="water-item-1-right"></div>
              </div>
              <div class="water-item-2">{{ receiveAchieve.unpaidAmount }}</div>
              <div class="water-item-3"></div>
              <div class="water-item-4">
                <span>服务费： </span>
                <span>{{ receiveAchieve.unpaidServiceAmount }}</span>
                <span style="margin-left: 10px">代理费：</span>
                <span>{{ receiveAchieve.unpaidAgentAmount }}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="water-item">
              <div class="water-item-1">
                <div class="water-item-1-left">付款额度</div>
                <div class="water-item-1-right" v-if="receiveAchieve.isSigned === 'Yes'">
                  <span style="color: #19be6b">●</span>
                  开发商已签字
                </div>
              </div>
              <div class="water-item-2">{{ receiveAchieve.payQuota }}</div>
              <div class="water-item-3"></div>
              <div class="water-item-4">
                <span>服务费： </span>
                <span>{{ receiveAchieve.servicePayQuota }}</span>
                <span style="margin-left: 10px">代理费：</span>
                <span>{{ receiveAchieve.agentPayQuota }}</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <br />
    <el-card class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>收款明细</span>
      </div>
      <div>
        <p class="p-title">
          <span>客户服务费</span>
          <span class="red"
            >【应收：{{
              info.servicePaymentInfos && info.servicePaymentInfos.receiveAmount
            }}
            已收：{{
              info.servicePaymentInfos &&
              info.servicePaymentInfos.receivedAmount
            }}
            未收：{{
              info.servicePaymentInfos &&
              info.servicePaymentInfos.unreceiveAmount
            }}】</span
          >
        </p>
        <el-table
          :data="info.servicePaymentInfos && (info.servicePaymentInfos.paymentInfos || [])"
          style="width: 100%">
          <el-table-column prop="payNo" label="收款编号" width="200">
            <template slot-scope="scope">
              <el-link type="primary" @click="gotoNew(scope.row, 'payNo')">
                {{ scope.row.payNo }}</el-link
              >
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="收款金额"> </el-table-column>
          <el-table-column prop="status" label="收款状态">
            <template slot-scope="scope">
              {{ $root.dictAllName(scope.row.status, "PaymentStatus") }}
            </template>
          </el-table-column>
          <el-table-column prop="operatorName" label="经办人"></el-table-column>
          <el-table-column prop="businessCode" label="业务编号" width="200">
            <template slot-scope="scope">
              <el-link
                type="primary"
                @click="gotoNew(scope.row, 'businessCode')">
                {{ scope.row.businessCode }}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="payCode" label="凭证号"> </el-table-column>
          <el-table-column prop="payTime" label="支付时间"> </el-table-column>
          <el-table-column prop="checkTime" label="对账时间"> </el-table-column>
          <el-table-column prop="confirmTime" label="确认时间"></el-table-column>
        </el-table>
      </div>
      <div v-for="(item, index) in info.agentPaymentInfos" :key="index">
        <p class="p-title">
          <span>{{ item.title }}</span>
          <span class="red">
            应收：{{ item.receiveAmount }} 已收：{{item.receivedAmount }}
            未收：{{ item.unreceiveAmount }}】</span>
        </p>
        <el-table :data="item.paymentInfos" style="width: 100%">
          <el-table-column prop="payNo" label="收款编号" width="200">
            <template slot-scope="scope">
              <el-link type="primary" @click="gotoNew(scope.row, 'payNo')">
                {{ scope.row.payNo }}</el-link
              >
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="收款金额"> </el-table-column>
          <el-table-column prop="status" label="收款状态">
            <template slot-scope="scope">
              {{ $root.dictAllName(scope.row.status, "PaymentStatus") }}
            </template>
          </el-table-column>
          <el-table-column prop="operatorName" label="经办人">
          </el-table-column>
          <el-table-column prop="businessCode" label="业务编号" width="200">
            <template slot-scope="scope">
              <el-link
                type="primary"
                @click="gotoNew(scope.row, 'businessCodeByAgency')">
                {{ scope.row.businessCode }}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="payCode" label="凭证号"> </el-table-column>
          <el-table-column prop="payTime" label="支付时间"> </el-table-column>
          <el-table-column prop="checkTime" label="对账时间"> </el-table-column>
          <el-table-column prop="confirmTime" label="确认时间"></el-table-column>
        </el-table>
      </div>
    </el-card>
    <br />
    <el-card class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>开票信息</span>
      </div>
      <div>
        <el-table :data="info.invoiceInfos" style="width: 100%">
          <el-table-column prop="businessNo" label="业务单号" width="200">
            <template slot-scope="scope">
              <el-link type="primary" @click="gotoNew(scope.row, 'businessNo')">
                {{ scope.row.businessNo }}</el-link
              >
            </template>
          </el-table-column>
          <el-table-column prop="invoiceTitle" label="发票抬头"></el-table-column>
          <el-table-column prop="invoiceType" label="发票类型" width="180">
            <template slot-scope="scope">
              <div>
                {{ $root.dictAllName(scope.row.invoiceType, "InvoiceType") }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="发票金额(含税)"></el-table-column>
          <el-table-column prop="taxRate" label="税率">
            <template slot-scope="scope">
              <div>
                {{scope.row.taxRate}}%
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="noTax" label="确认主营"></el-table-column>
          <el-table-column prop="tax" label="税额"></el-table-column>
          <el-table-column prop="payee" label="收款方"></el-table-column>
          <el-table-column prop="status" label="开票状态">
            <template slot-scope="scope">
              <div>
                {{$root.dictAllName(scope.row.status, "InvoiceOperationStatus")}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="operationDate" label="开票日期"></el-table-column>
        </el-table>
      </div>
    </el-card>
    <br />
    <el-card class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>付款明细</span>
      </div>
      <div>
        <p class="p-title">
          <span> {{ info.servicePays && info.servicePays.title }} </span>
          <span class="red">
            【应付：{{
              info.servicePays && info.servicePays.payAmount
            }}
            已付：{{ info.servicePays && info.servicePays.paidAmount }} 未付：{{
              info.servicePays && info.servicePays.unpaidAmount
            }}】
          </span>
        </p>
        <el-table
          :data="info.servicePays && info.servicePays.paymentInfos"
          style="width: 100%">
          <el-table-column prop="applyCode" label="付款单号">
            <template slot-scope="scope">
              <el-link type="primary" @click="gotoNew(scope.row, 'applyCode')">
                {{ scope.row.applyCode }}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="applyAmount" label="付款金额"></el-table-column>
          <el-table-column prop="status" label="付款状态">
            <template slot-scope="scope">
              <div>
                {{ $root.dictAllName(scope.row.status, "PayoffStatus") }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="makerName" label="经办人"></el-table-column>
          <el-table-column prop="companyKind" label="收款方类型">
            <template slot-scope="scope">
              <div>
                {{ $root.dictAllName(scope.row.companyKind, "CompanyKind") }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="agencyName" label="收款方">
            <template slot-scope="scope">
              <el-link type="primary" @click="gotoNew(scope.row, 'agencyName')">
                {{ scope.row.agencyName }}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="paymentDate" label="付款完成日期"></el-table-column>
        </el-table>
        <div v-for="(item, index) in info.agentPays" :key="index">
          <p class="p-title">
            <span>{{ item.title }} </span>
            <span class="red">
              【应付：{{ item.payAmount }} 已付：{{ item.paidAmount }} 未付：{{
                item.unpaidAmount
              }}】
            </span>
          </p>
          <el-table :data="item.paymentInfos" style="width: 100%">
            <el-table-column prop="applyCode" label="付款单号">
              <template slot-scope="scope">
                <el-link
                  type="primary"
                  @click="gotoNew(scope.row, 'applyCode')">
                  {{ scope.row.applyCode }}</el-link>
              </template>
            </el-table-column>
            <el-table-column prop="applyAmount" label="付款金额"></el-table-column>
            <el-table-column prop="status" label="付款状态">
              <template slot-scope="scope">
                <div>
                  {{ $root.dictAllName(scope.row.status, "PayoffStatus") }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="makerName" label="经办人"></el-table-column>
            <el-table-column prop="companyKind" label="收款方类型">
              <template slot-scope="scope">
                <div>
                  {{ $root.dictAllName(scope.row.companyKind, "CompanyKind") }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="agencyName" label="收款方">
              <template slot-scope="scope">
                <el-link type="primary" @click="gotoNew(scope.row, 'agencyName')">
                  {{ scope.row.agencyName }}</el-link>
              </template>
            </el-table-column>
            <el-table-column prop="paymentDate" label="付款完成日期"></el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>
    <br />
    <el-card class="box-card">
      <div slot="header" class="clearfix card-header">
        <span>退款明细</span>
      </div>
      <div>
        <el-table :data="info.refundItemInfos" style="width: 100%">
          <el-table-column prop="refundNo" label="待退款项编号"></el-table-column>
          <el-table-column prop="amount" label="退款金额"></el-table-column>
          <el-table-column prop="status" label="退款状态">
            <template slot-scope="scope">
              <div>
                {{ $root.dictAllName(scope.row.status, "FinRefundStatus") }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="refundName" label="退款人信息" width="300">
            <template slot-scope="scope">
              <div>收款人姓名：{{ scope.row.refundName }}</div>
              <div>收款帐号：{{ scope.row.refundAccount }}</div>
              <div>收款开户行：{{ scope.row.refundBankName }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="createDate" label="生成日期"></el-table-column>
          <el-table-column prop="refundedDate" label="退款完成日期"></el-table-column>
          <el-table-column prop="refundApplyNO" label="关联退款申请单编号">
            <template slot-scope="scope">
              <el-link type="primary" @click="gotoNew(scope.row, 'refundApplyNO')">
                {{ scope.row.refundApplyNO }}</el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { get_deal_getDealSumAmount__id } from "../../../../api/deal/index";
import { get_refundItem_getRefundApplyId__applyNo } from "../../../../api/finance/index";
@Component({
  components: {},
})
export default class FlowingWater extends Vue {
  tableData: any = [];
  waterList: any = [1, 2, 3, 4, 5, 6, 7, 8];
  info: any = {};
  receiveAchieve: any = {}; //流水汇总
  async created() {
    this.info = await get_deal_getDealSumAmount__id({
      id: this.$route.query.id,
    });
    this.receiveAchieve = this.info?.receiveAchieve || {};
    console.log(this.info);
  }
  gotoNew(row: any, type: any) {
    if (type == "businessNo") {
      if (row.feeType === 'ServiceFee') {
        // 服务费
        window.open(`/web-sales/dealReport/info?id=${row.businessId}&type=ID`);
      } else {
        // 代理费
        window.open(`/web-sales/applyRec/info?id=${row.businessId}`);
      }
    } else if (type == "payNo") {
      window.open(`/web-sales/payment/info?id=${row.id}`);
    } else if (type == "applyCode") {
      window.open(`/web-sales/payoff/info?id=${row.applyId}`);
    } else if (type == "refundApplyNO") {
      this.getIdAndGotoNew(row.refundApplyNO);
      // window.open(`/web-sales/refundApply/info?id=${row.id}`);
    } else if (type == "businessCode") {
      window.open(`/web-sales/discount/info?id=${row.businessId}`);
    } else if (type == "businessCodeByAgency") {
      window.open(`/web-sales/applyRec/info?id=${row.businessId}`);
    } else if (type == "agencyName") {
      if (row.companyKind === 'ChannelCompany') {
        // 付款明细 - 渠道公司类型 - 收款方
        window.open(`/web-sales/channelBusiness/info?id=${row.id}`);
      } else if (row.companyKind === 'AgencyCompany') {
        // 付款明细 - 一手代理公司类型 - 收款方
        window.open(`/web-sales/firstAgency/info?id=${row.id}`);
      }
    }
  }
  // 退款明细 - 根据退款申请单号获取退款申请ID后跳转
  async getIdAndGotoNew(applyNo: any = '') {
    let applyId: any = await get_refundItem_getRefundApplyId__applyNo({applyNo: applyNo});
    if (applyId) {
      window.open(`/web-sales/refundApply/info?id=${applyId}`);
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
.red {
  color: red;
  margin-left: 10px;
}
.p-title {
  font-weight: 600;
  text-align: left;
}
.water-item {
  margin: 10px;
  padding: 10px;
  border: 1px solid #eee;
}
.water-item-1 {
  display: flex;
}
.water-item-1-left {
  width: 80px;
}
.water-item-1-right {
  flex: 1;
  text-align: right;
}
.water-item-2 {
  text-align: left;
  font-weight: 500;
  font-size: 30px;
  padding-left: 5px;
}
.water-item-3 {
  border-top: 1px solid #ccc;
  margin-top: 10px;
  margin-bottom: 5px;
}
.water-item-4 {
  text-align: left;
  font-size: 13px;
}
.row-col-height {
  /deep/.el-col {
    height: 163px !important;
  }
}
</style>