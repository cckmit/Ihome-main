<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-27 17:17:06
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-12 17:20:10
-->
<template>
  <div>
    <p class="ih-info-title">合作项目信息</p>
    <el-form
      :model="info"
      ref="ruleForm"
      label-width="140px"
      class="demo-ruleForm text-left"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="合作项目"
            class="formItem"
          >
            <div class="word-break line-height">{{ info.proName }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="项目地址"
            class="formItem"
          >
            <div class="word-break line-height">{{ info.proAddr }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="备案名称"
            class="formItem"
          >
            <div class="word-break line-height">{{ info.proRecord }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="开发商"
            class="formItem"
          >
            <div class="word-break line-height">{{ info.developerName }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="是否市场化项目"
            class="formItem"
          >
            <div class="word-break line-height">{{ info.exMarket?'是':'否' }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <p class="ih-info-title">联动周期信息</p>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="周期名称"
            class="formItem"
          >
            <div class="word-break line-height">{{ info.termName }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="周期时间"
            class="formItem"
          >
            <div class="word-break line-height">{{ info.timeList[0] + '~'+ info.timeList[1] }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="呈批文号"
            class="formItem"
          >
            <div class="word-break line-height">{{ info.approvalNo }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="启动事业部"
            class="formItem"
          >
            <div class="word-break line-height">{{ info.startDivision }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="业务模式"
            class="formItem"
          >
            <div class="word-break line-height">{{ $root.dictAllName(info.busEnum, "BusinessModel") }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="收费类型"
            class="formItem"
          >
            <div class="word-break line-height">{{ $root.dictAllName(info.chargeEnum, "Charge") }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="模式属性"
            class="formItem"
          >
            <div class="word-break line-height">{{ $root.dictAllName(info.attributeEnum, "Attribute") }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="垫佣周期"
            class="formItem"
          >
            <div class="word-break line-height">{{ $root.dictAllName(info.padCommissionEnum, "PadCommission") }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="业务类型"
            class="formItem"
          >
            <div class="word-break line-height">{{ $root.dictAllName(info.busTypeEnum, "BusType") }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="我司主体"
            class="formItem"
          >
            <div class="word-break line-height">{{ info.companyName }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="是否直签开发商"
            class="formItem"
          >
            <div class="word-break line-height">{{ info.exDirectDevelop?'是':'否' }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="项目委托方"
            class="formItem"
          >
            <div class="word-break line-height">{{ info.proClient }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="项目周期阶段"
            class="formItem"
          >
            <div class="word-break line-height">{{ $root.dictAllName(info.termStageEnum, "TermStage") }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="是否代销"
            class="formItem"
          >
            <div class="word-break line-height">{{ info.exConsignment?'是':'否' }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="允许其他渠道费用临时穿底"
            class="formItem"
          >
            <div class="word-break">{{ info.exOver?'是':'否' }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="往期业绩金额（万元）"
            class="formItem"
          >
            <div class="word-break">{{ info.preBusAmount }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="服务费可用其他渠道费用"
            class="formItem"
          >
            <div class="word-break">{{ info.serviceBalance }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="允许跨项目使用其他渠道费用"
            class="formItem"
          >
            <div class="word-break">{{ info.exOtherProChannelUse?'是':'否' }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="联动业务总开展期数"
            class="formItem"
          >
            <div class="word-break line-height">{{ info.totalCount }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="突破标准线期数"
            class="formItem"
          >
            <div class="word-break line-height">{{ info.overStandardCount }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="isShow">
        <el-col :span="8">
          <el-form-item
            label="认购书是否体现优惠折扣"
            class="formItem"
          >
            <div class="word-break">{{ info.exDiscount?'是':'否' }}</div>
          </el-form-item>
        </el-col>
        <el-col
          :span="8"
          v-if="info.exDiscount"
        >
          <el-form-item
            label="认购书优惠折扣体现方式"
            class="formItem"
          >
            <div class="word-break">{{ info.subscriDiscountModel }}</div>
          </el-form-item>
        </el-col>
        <el-col
          :span="8"
          v-if="info.exDiscount"
        >
          <el-form-item
            label="优惠告知书折扣体现方式"
            class="formItem"
          >
            <div class="word-break line-height">{{ info.notificDiscountModel }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="客户报备要求简述"
            class="formItem"
          >
            <div class="word-break line-height">{{ info.customerReportingRequire }}</div>
          </el-form-item>
        </el-col>
        <el-col
          :span="12"
          v-if="isShow"
        >
          <el-form-item
            label="【项目房款/车位款+服务费】>备案价"
            class="formItem"
          >
            <div class="word-break">{{ $root.dictAllName(info.houseandcarGtRecordEnum, "HouseandcarGtRecord") }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="收取佣金标准简述"
            class="formItem"
          >
            <div class="word-break line-height">{{ info.collectCommissionStandardSketch }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="收取佣金条件简述"
            class="formItem"
          >
            <div class="word-break line-height">{{ info.collectCommissionConditionSketch }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="派发佣金标准简述"
            class="formItem"
          >
            <div class="word-break line-height">{{ info.sendCommissionStandardSketch }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="派发佣金条件简述"
            class="formItem"
          >
            <div class="word-break line-height">{{ info.sendCommissionConditionSketch }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="业务背景"
            class="formItem"
          >
            <div class="word-break line-height">{{ info.busBackground }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="立项其他说明"
            class="formItem"
          >
            <div class="word-break line-height">{{ info.otherRemark }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <p class="ih-info-title">测算结果</p>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="服务费总包模式-总包成交留存率"
            class="formItem"
          >
            <div class="word-break">{{ info.serviceFeeTotalByTotalRate ?info.serviceFeeTotalByTotalRate + '%' : '-' }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="代理费总包模式-总包成交留存率"
            class="formItem"
          >
            <div class="word-break">{{ info.agencyFeeTotalByTotalRate ? info.agencyFeeTotalByTotalRate + '%' : '-' }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="纯分销模式-代理费留存率"
            class="formItem"
          >
            <div class="word-break">{{ info.distributeAgencyRate ? info.distributeAgencyRate + '%' : '-' }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="服务费总包模式-分销成交留存率"
            class="formItem"
          >
            <div class="word-break">{{ info.serviceFeeTotalByDistrictbuteRate ? info.serviceFeeTotalByDistrictbuteRate + '%' : '-' }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="代理费总包模式-分销成交留存率"
            class="formItem"
          >
            <div class="word-break">{{ info.agencyFeeTotalByDistrictbuteRate ? info.agencyFeeTotalByDistrictbuteRate + '%' : '-' }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="纯分销模式-服务费留存率"
            class="formItem"
          >
            <div class="word-break">{{ info.distributeServiceRate ? info.distributeServiceRate + '%' : '-' }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="项目综合留存率"
            class="formItem"
          >
            <div class="word-break line-height">{{ info.termOverallRate ? info.termOverallRate + '%' : '-' }}</div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <p class="ih-info-title">附件信息</p>
    <div class="padding-left-20">
      <el-table
        class="ih-table"
        :data="fileListType"
        style="width: 100%"
      >
        <el-table-column
          prop="type"
          width="180"
          label="类型"
          align="center"
        >
          <template v-slot="{ row }">
            <div><span
                style="color: red"
                v-if="row.subType"
              >*</span>{{row.name}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="附件">
          <template v-slot="{ row }">
            <IhUpload
              v-model="row.fileList"
              :file-size="10"
              :file-type="row.code"
              :limit="row.fileList.length"
              :upload-show="!!row.fileList.length"
              size="100px"
              :removePermi="false"
              :editPermi="false"
            ></IhUpload>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { get_his_term_get__termId } from "@/api/project/index";
@Component({
  components: {},
})
export default class FirstAgencyEdit extends Vue {
  info: any = {
    proName: null,
    proAddr: null,
    proRecord: null,
    developerName: null,
    exMarket: null,
    termName: null,
    timeList: [],
    approvalNo: null,
    startDivision: null,
    busEnum: null,
    chargeEnum: null,
    attributeEnum: null,
    padCommissionEnum: null,
    exDirectDevelop: null,
    proClient: null,
    busTypeEnum: null,
    termStageEnum: null,
    exConsignment: null,
    exOver: null,
    preBusAmount: null,
    serviceBalance: null,
    exOtherProChannelUse: null,
    totalCount: null,
    overStandardCount: null,
    exDiscount: null,
    subscriDiscountModel: null,
    notificDiscountModel: null,
    customerReportingRequire: null,
    houseandcarGtRecordEnum: null,
    collectCommissionStandardSketch: null,
    collectCommissionConditionSketch: null,
    sendCommissionStandardSketch: null,
    sendCommissionConditionSketch: null,
    busBackground: null,
    otherRemark: null,
    serviceFeeTotalByTotalRate: null,
    agencyFeeTotalByTotalRate: null,
    distributeAgencyRate: null,
    serviceFeeTotalByDistrictbuteRate: null,
    agencyFeeTotalByDistrictbuteRate: null,
    distributeServiceRate: null,
    termOverallRate: null,
    attachTermVOS: [],
    companyName: null,
    companyId: null,
  };
  fileListType: any = [];
  private attachTermVOS: any = [];
  isShow: any = true;
  auditMsg = "";
  exVoidServiceShow: any = true;

  @Watch("info.chargeEnum", { immediate: true })
  getIsShow(val: any) {
    if (val === "Agent") {
      this.isShow = false;
    } else {
      this.isShow = true;
    }
  }

  private get termId() {
    return this.$route.query.id;
  }

  async created() {
    this.getInfo();
  }

  async getInfo() {
    let id = this.$route.query.id;
    if (id) {
      let res: any = await get_his_term_get__termId({
        termId: id,
      });
      this.info = { ...res };
      this.info.timeList = [res.termStart, res.termEnd];
      this.info.companyId = res.companyId;
      window.sessionStorage.setItem("proId", res.proId);
      window.sessionStorage.setItem("padCommissionEnum", res.padCommissionEnum);
      this.getFileListType(res.attachTermVOS);
    }
  }

  getFileListType(data: any) {
    const list = (this.$root as any).dictAllList("TermAttach");
    this.fileListType = list.map((v: any) => {
      return {
        ...v,
        fileList: data.filter((j: any) => j.type === v.code),
      };
    });
  }
}
</script>
<style lang="scss" scoped>
.text-ellipsis {
  width: 100%;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.msg-title {
  text-align: left;
  margin-left: 25px;
}

.formItem {
  /deep/ .el-form-item__label {
    line-height: 20px;
  }
}

.word-break {
  word-break: break-all;
}
.line-height {
  line-height: 20px !important;
}
</style>