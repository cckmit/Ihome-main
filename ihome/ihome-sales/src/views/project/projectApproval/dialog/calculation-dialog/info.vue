<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-01-30 11:28:32
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-30 11:38:48
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="85%"
    class="dialog text-center"
    :title="`${form.termCalcVo.termName}联动业务留存率测算表`"
  >
    <table
      border="1"
      cellspacing="0"
      cellpadding="0"
      width="100%"
      height="100%"
    >
      <tr>
        <td
          colspan="10"
          style="color: red; text-align: left;padding-left:10px"
        >1、项目关键指标</td>
      </tr>
      <tr>
        <td class="bold">周期时间</td>
        <td colspan="9">{{(form && form.termCalcVo && form.termCalcVo.termStart) + '~' + (form.termCalcVo && form.termCalcVo.termEnd)}}</td>
      </tr>
      <tr>
        <td class="bold">是否市场化项目</td>
        <td colspan="2">{{(form && form.termCalcVo && form.termCalcVo.exMarket) ? '是' : '否'}}</td>
        <td class="bold">业务模式</td>
        <td colspan="2">{{form && form.termCalcVo && $root.dictAllName(form.termCalcVo.busEnum, 'BusinessModel')}}</td>
        <td class="bold">收费类型</td>
        <td colspan="3">{{form && form.termCalcVo && $root.dictAllName(form.termCalcVo.chargeEnum, 'Charge')}}</td>
      </tr>
      <tr>
        <td class="bold">模式属性</td>
        <td colspan="5">{{form && form.termCalcVo && $root.dictAllName(form.termCalcVo.attributeEnum, 'Attribute')}}</td>
        <td class="bold">垫佣周期</td>
        <td colspan="3">{{form && form.termCalcVo && $root.dictAllName(form.termCalcVo.padCommissionEnum, 'PadCommission')}}</td>
      </tr>
      <tr>
        <td
          class="bold"
          colspan="2"
        >服务费总包模式-总包成交留存率</td>
        <td>{{(form && form.termCalcVo && form.termCalcVo.serviceFeeTotalByTotalRate || 0) + '%'}}</td>
        <td
          class="bold"
          colspan="2"
        >代理费总包模式-总包成交留存率</td>
        <td>{{(form && form.termCalcVo && form.termCalcVo.agencyFeeTotalByTotalRate || 0)  + '%'}}</td>
        <td class="bold">纯分销模式-代理费留存率</td>
        <td colspan="1">{{(form && form.termCalcVo && form.termCalcVo.distributeAgencyRate || 0)  + '%'}}</td>
        <td
          class="bold"
          rowspan="2"
        >项目综合留存率</td>
        <td rowspan="2">{{(form && form.termCalcVo && form.termCalcVo.termOverallRate || 0)  + '%'}}</td>
      </tr>
      <tr>
        <td
          class="bold"
          colspan="2"
        >服务费总包模式-分销成交留存率</td>
        <td>{{(form && form.termCalcVo && form.termCalcVo.serviceFeeTotalByDistrictbuteRate || 0)  + '%'}}</td>
        <td
          class="bold"
          colspan="2"
        >代理费总包模式-分销成交留存率</td>
        <td>{{(form && form.termCalcVo && form.termCalcVo.agencyFeeTotalByDistrictbuteRate || 0)  + '%'}}</td>
        <td class="bold">纯分销模式-服务费留存率</td>
        <td colspan="1">{{(form && form.termCalcVo && form.termCalcVo.distributeServiceRate || 0 ) + '%'}}</td>
      </tr>
      <tr>
        <td
          class="bold"
          colspan="2"
        >服务费可用留存</td>
        <td colspan="2">{{form && form.termCalcVo && form.termCalcVo.serviceBalance}}</td>
        <td colspan="2">万</td>
        <td class="bold">留存是否存在穿底</td>
        <td colspan="3">{{form && form.termCalcVo && yesOrNo(form.termCalcVo.exOver)}}</td>
      </tr>
      <tr>
        <td class="bold">项目物业类型</td>
        <td colspan="9">
          <template>
            <span
              v-for="(item, i) in form && form.termCalcVo && form.termCalcVo.properties"
              :key="i"
            >
              <span>{{$root.dictAllName(item, 'Property')}}</span>
              <span v-if="i !== form.termCalcVo.properties.length - 1">+</span>
            </span>
          </template>
        </td>
      </tr>
      <tr>
        <td class="bold">佣金收取标准描述</td>
        <td colspan="9">{{form && form.termCalcVo && form.termCalcVo.collectCommissionStandardSketch}}</td>
      </tr>
      <tr>
        <td class="bold">佣金派发标准描述</td>
        <td colspan="9">{{form && form.termCalcVo && form.termCalcVo.sendCommissionStandardSketch}}</td>
      </tr>
    </table>
    <br />
    <table
      border="1"
      cellspacing="0"
      cellpadding="0"
      width="100%"
      height="100%"
    >
      <tr>
        <td
          colspan="11"
          style="color: red; text-align: left;padding-left:10px"
        >2、项目成交情况</td>
      </tr>
      <template v-for="(item, i) in form && form.serviceCalcComplateModelVOS">
        <tr :key="i + Math.random()">
          <td>物业类型</td>
          <td colspan="10">{{$root.dictAllName(item.calcComplateVO.propertyEnum, 'Property')}}</td>
        </tr>
        <tr :key="i + Math.random()">
          <td>收费类型</td>
          <td colspan="2">{{$root.dictAllName(item.calcComplateVO.costTypeEnum, 'FeeType')}}</td>
          <td>每套均价</td>
          <td>{{item.calcComplateVO.estimatedTransactionPrice}}</td>
          <td>万</td>
          <td>成交总套数</td>
          <td>{{item.calcComplateVO.complateNum}}</td>
          <td colspan="3">套</td>
        </tr>
        <tr :key="i + Math.random()">
          <td>预计总收款</td>
          <td>{{item.calcComplateVO.estimatedTotalReceipt}}</td>
          <td>万</td>
          <td>预计总渠道派发</td>
          <td>{{item.calcComplateVO.estimatedChannelSend}}</td>
          <td>万</td>
          <td>其他渠道费用</td>
          <td>{{item.calcComplateVO.otherChannelAmount}}</td>
          <td colspan="3">万</td>
        </tr>
        <tr :key="i + Math.random()">
          <td>细分业务模式</td>
          <td>客户类型</td>
          <td>成交套数</td>
          <td>预计收取服务费总额</td>
          <td>预计支付渠道佣金总额</td>
          <td>其他外拆</td>
          <td>其他渠道费用</td>
          <td>平台留存率</td>
          <td colspan="3">备注</td>
        </tr>
        <template v-for="(data, key) in item.calcComplateMxVOS">
          <template v-for="(row, h) in data">
            <tr :key="h + Math.random()">
              <td
                :rowspan="data.length"
                v-if="h===0"
              >{{key}}</td>
              <td>{{row.transactionEnum ? $root.dictAllName(row.transactionEnum, 'Transaction') : `${key}成交合计`}}</td>
              <td>{{row.estimateComplateNum}}</td>
              <td>{{row.estimateReceiveAmount}}</td>
              <td>{{row.estimatePayChannelAmount}}</td>
              <td>{{row.otherDemolition}}</td>
              <td>{{row.otherChannelAmount}}</td>
              <td>{{(row.plateRate || 0) + '%'}}</td>
              <td colspan="3">{{row.remark}}</td>
            </tr>
          </template>
        </template>
      </template>
      <tr>
        <td colspan="2">服务费模式合计</td>
        <td>{{form && form.serviceSum && form.serviceSum.estimateComplateNum}}</td>
        <td>{{form && form.serviceSum && form.serviceSum.estimateReceiveAmount}}</td>
        <td>{{form && form.serviceSum && form.serviceSum.estimatePayChannelAmount}}</td>
        <td>{{form && form.serviceSum && form.serviceSum.otherDemolition}}</td>
        <td>{{form && form.serviceSum && form.serviceSum.otherChannelAmount}}</td>
        <td>{{(form && form.serviceSum && form.serviceSum.plateRate || 0) + '%'}}</td>
        <td colspan="3">{{form.serviceSum.remark}}</td>
      </tr>

      <template v-for="(item, i) in form && form.agencyCalcComplateModelVOS">
        <tr :key="i + Math.random()">
          <td>物业类型</td>
          <td colspan="10">{{$root.dictAllName(item.calcComplateVO.propertyEnum, 'Property')}}</td>
        </tr>
        <tr :key="i + Math.random()">
          <td>收费类型</td>
          <td colspan="2">{{$root.dictAllName(item.calcComplateVO.costTypeEnum, 'FeeType')}}</td>
          <td>每套均价</td>
          <td>{{item.calcComplateVO.estimatedTransactionPrice}}</td>
          <td>万</td>
          <td>成交总套数</td>
          <td>{{item.calcComplateVO.complateNum}}</td>
          <td colspan="3">套</td>
        </tr>
        <tr :key="i + Math.random()">
          <td>预计总收款</td>
          <td>{{item.calcComplateVO.estimatedTotalReceipt}}</td>
          <td>万</td>
          <td>预计总渠道派发</td>
          <td>{{item.calcComplateVO.estimatedChannelSend}}</td>
          <td>万</td>
          <td>预计垫佣比例</td>
          <td>
            {{item.calcComplateVO.estimatedPadCommissionRate}}
          </td>
          <td>垫佣金额预估</td>
          <td>{{item.calcComplateVO.estimatedPadCommission}}</td>
          <td>万</td>
        </tr>
        <tr :key="i + Math.random()">
          <td>细分业务模式</td>
          <td>客户类型</td>
          <td>成交套数</td>
          <td>预计收取代理费总额</td>
          <td>预计支付渠道佣金总额</td>
          <td>其他外拆</td>
          <td>-</td>
          <td>平台留存率</td>
          <td colspan="3">备注</td>
        </tr>
        <template v-for="(data, key) in item.calcComplateMxVOS">
          <template v-for="(row, h) in data">
            <tr :key="h + Math.random()">
              <td
                :rowspan="data.length"
                v-if="h===0"
              >{{key}}</td>
              <td>{{row.transactionEnum ? $root.dictAllName(row.transactionEnum, 'Transaction') : `${key}成交合计`}}</td>
              <td>{{row.estimateComplateNum}}</td>
              <td>{{row.estimateReceiveAmount}}</td>
              <td>{{row.estimatePayChannelAmount}}</td>
              <td>{{row.otherDemolition}}</td>
              <td>-</td>
              <td>{{(row.plateRate || 0) + '%'}}</td>
              <td colspan="3">{{row.remark}}</td>
            </tr>
          </template>
        </template>
      </template>
      <tr>
        <td colspan="2">代理费模式合计</td>
        <td>{{form && form.agencySum && form.agencySum.estimateComplateNum}}</td>
        <td>{{form && form.agencySum && form.agencySum.estimateReceiveAmount}}</td>
        <td>{{form && form.agencySum && form.agencySum.estimatePayChannelAmount}}</td>
        <td>{{form && form.agencySum && form.agencySum.otherDemolition}}</td>
        <td>-</td>
        <td>{{(form && form.agencySum && form.agencySum.plateRate || 0) + '%'}}</td>
        <td colspan="3">{{form.agencySum.remark}}</td>
      </tr>
    </table>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="cancel()">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { get_calc_getCalc__termId } from "@/api/project/index";

@Component({
  components: {},
})
export default class CalculationDialog extends Vue {
  dialogVisible = true;
  form: any = {
    termCalcVo: {}, //测算指标
    agencyCalcComplateModelVOS: [], //代理费
    agencySum: {}, //代理费合计
    serviceCalcComplateModelVOS: [], //服务费
    serviceSum: {}, // 服务费合计
  };

  yesOrNo(data: string) {
    if (data) return "是";
    else return "否";
  }

  async getInfo() {
    const item = await get_calc_getCalc__termId({
      termId: this.$route.query.id,
    });
    this.form = item
      ? item
      : {
          termCalcVo: {}, //测算指标
          agencyCalcComplateModelVOS: [], //代理费
          agencySum: [], //代理费合计
          serviceCalcComplateModelVOS: [], //服务费
          serviceSum: [], // 服务费合计
        };
  }

  cancel() {
    this.$emit("cancel", false);
  }

  created() {
    this.getInfo();
  }
}
</script>
<style lang="scss" scoped>
.dialog {
  /deep/ .el-dialog {
    margin-top: 5vh !important;
  }
  /deep/ .el-dialog__body {
    padding: 10px 20px 0 20px;
  }
}

table {
  text-align: center;
  tr {
    height: 30px;
    td {
      width: 150px;
      padding: 0;
    }
  }
}
.bold {
  font-weight: bold;
}
</style>