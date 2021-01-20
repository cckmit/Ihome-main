<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-10 11:42:19
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-20 08:55:05
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="80%"
    class="viewApproval text-center"
    :title="`${info.termName} 立项呈批`"
  >
    <div class="title">
      <div>发起人：{{info.inputMan}}</div>
      <div>发起时间：{{info.inputTime}}</div>
      <div>{{`编号：（${info.approvalNo}）`}}</div>
    </div>
    <table
      border="1"
      cellspacing="0"
      cellpadding="0"
      width="100%"
      height="100%"
    >
      <tr>
        <td rowspan="10">项目启动基本信息</td>
        <td>业务背景</td>
        <td colspan="5">{{info.busBackground}}</td>
      </tr>
      <tr>
        <td>启动事业部</td>
        <td>{{info.startDivision}}</td>
        <td>启动城市</td>
        <td>{{info.cityName}}</td>
        <td>开展周期</td>
        <td>{{info.termStart + '~' + info.termEnd}}</td>
      </tr>
      <tr>
        <td>周期名称</td>
        <td>{{info.termName}}</td>
        <td>业务模式</td>
        <td>{{$root.dictAllName(info.busEnum, 'BusinessModel')}}</td>
        <td>收费类型</td>
        <td>{{$root.dictAllName(info.chargeEnum, 'Charge')}}</td>
      </tr>
      <tr>
        <td>模式属性</td>
        <td colspan="3">{{$root.dictAllName(info.attributeEnum, "Attribute")}}</td>
        <td>垫佣周期</td>
        <td>{{$root.dictAllName(info.padCommissionEnum, "PadCommission")}}</td>
      </tr>
      <tr>
        <td>项目推广名称</td>
        <td>{{info.proName}}</td>
        <td>备案名称</td>
        <td>{{info.proRecord}}</td>
        <td>开发商名称</td>
        <td>{{info.developerName}}</td>
      </tr>
      <tr>
        <td>项目地址</td>
        <td colspan="3">{{info.proAddr}}</td>
        <td style="color: #D9001B">是否直签开发商</td>
        <td>{{info.exDirectDevelop?'是':'否'}}</td>
      </tr>
      <tr>
        <td>是否市场化项目</td>
        <td>{{info.exMarket?'是':'否'}}</td>
        <td>业务类型</td>
        <td>{{$root.dictAllName(info.busTypeEnum, "BusType")}}</td>
        <td style="color: #D9001B">项目委托方</td>
        <td>{{info.proClient}}</td>
      </tr>
      <tr>
        <td>项目周期阶段</td>
        <td>{{$root.dictAllName(info.termStageEnum, "TermStage")}}</td>
        <td>是否代销</td>
        <td>{{info.exConsignment?'是':'否'}}</td>
        <td style="color: #D9001B">往期业绩金额（万元）</td>
        <td>{{info.preBusAmount}}</td>
      </tr>
      <tr>
        <td>是否允许跨项目使用其他渠道费用</td>
        <td>{{info.exOtherProChannelUse?'是':'否'}}</td>
        <td>联动业务总开展期数</td>
        <td>{{info.totalCount}}</td>
        <td style="color: #D9001B">服务费可用其他渠道费用（万元）</td>
        <td>{{info.serviceBalance}}</td>
      </tr>
      <tr>
        <td>突破标准线期数</td>
        <td>{{info.overStandardCount}}</td>
        <td colspan="4"></td>
      </tr>
      <tr>
        <td rowspan="4">佣金标准与结算条件</td>
        <td>认购书是否体现优惠折扣</td>
        <td>{{info.exDiscount?'是':'否'}}</td>
        <td>认购书优惠折扣体现方式</td>
        <td>{{info.subscriDiscountModel}}</td>
        <td>优惠告知书折扣体现方式</td>
        <td>{{info.notificDiscountModel}}</td>
      </tr>
      <tr>
        <td>【项目房款/车位款+服务费】＞备案价</td>
        <td>{{$root.dictAllName(info.houseandcarGtRecordEnum, "HouseandcarGtRecord")}}</td>
        <td colspan="4"></td>
      </tr>
      <tr>
        <td>收取佣金标准简述</td>
        <td colspan="2">{{info.collectCommissionStandardSketch}}</td>
        <td>收取佣金条件简述</td>
        <td colspan="2">{{info.collectCommissionConditionSketch}}</td>
      </tr>
      <tr>
        <td>派发佣金标准简述</td>
        <td colspan="2">{{info.sendCommissionStandardSketch}}</td>
        <td>派发佣金条件简述</td>
        <td colspan="2">{{info.sendCommissionConditionSketch}}</td>
      </tr>
      <tr>
        <td>立项其他说明</td>
        <td colspan="6">{{info.otherRemark}}</td>
      </tr>
      <tr>
        <td rowspan="3">项目测算数据</td>
        <td>服务费总包模式-总包成交留存率</td>
        <td>{{info.serviceFeeTotalByTotalRate}}</td>
        <td>代理费总包模式-总包成交留存率</td>
        <td>{{info.agencyFeeTotalByTotalRate}}</td>
        <td>纯分销模式-代理费留存率</td>
        <td>{{info.distributeAgencyRate}}</td>
      </tr>
      <tr>
        <td>服务费总包模式-分销成交留存率</td>
        <td>{{info.serviceFeeTotalByDistrictbuteRate}}</td>
        <td>代理费总包模式-分销成交留存率</td>
        <td>{{info.agencyFeeTotalByDistrictbuteRate}}</td>
        <td>纯分销模式-服务费留存率</td>
        <td>{{info.distributeServiceRate}}</td>
      </tr>
      <tr>
        <td>项目综合留存率</td>
        <td>{{info.termOverallRate}}</td>
        <td colspan="4"></td>
      </tr>
      <!-- <tr>
        <td rowspan="2">审核情况</td>
        <td
          colspan="3"
          class="text-left"
        >
          <div class="padding-5">
            <div class="bold">事业部/分公司负责人</div>
            <div>【同意】同意。呈领导批示！</div>
            <div class="text-right"> [冯晓君 2019-11-07 11:25]</div>
          </div>
        </td>
        <td
          colspan="3"
          class="text-left"
        >
          <div class="padding-5">
            <div class="bold">业务管理部</div>
            <div>【同意】同意。呈领导批示！</div>
            <div class="text-right">[马碧莹 2019-11-07 11:25]</div>
          </div>
        </td>
      </tr> -->
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
import { get_term_getOATermFrom__termId } from "@/api/project/index";

@Component({
  components: {},
})
export default class ViewApproval extends Vue {
  dialogVisible = true;
  info: any = {};

  yesOrNo(data: string) {
    if (data) return "是";
    else return "否";
  }

  inputBlur(v: any) {
    this.$nextTick(() => {
      if (v === "serviceSum") {
        (this.$refs as any)[v].focus();
      } else {
        (this.$refs as any)[v][0].focus();
      }
    });
  }

  async getInfo() {
    const item = await get_term_getOATermFrom__termId({
      termId: this.$route.query.id,
    });
    this.info = item ? item : {};
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
.viewApproval {
  /deep/ .el-dialog {
    margin-top: 5vh !important;
  }
  /deep/ .el-dialog__body {
    padding-top: 10px;
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

.title {
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
}

.bold {
  font-weight: bold;
}
</style>