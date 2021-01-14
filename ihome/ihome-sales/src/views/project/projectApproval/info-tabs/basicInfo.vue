<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-27 17:17:06
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-14 17:16:44
-->
<template>
  <IhPage>
    <template v-slot:form>
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
              prop="proName"
            >
              <span
                class="text-ellipsis"
                :title="info.proName"
              >{{ info.proName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="项目地址"
              prop="proAddr"
            >
              <span
                class="text-ellipsis"
                :title="info.proAddr"
              >{{ info.proAddr }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="备案名称"
              prop="proRecord"
            >
              <span
                class="text-ellipsis"
                :title="info.proRecord"
              >{{ info.proRecord }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开发商">
              <span
                class="text-ellipsis"
                :title="info.developerName"
              >{{ info.developerName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="是否市场化项目"
              prop="exMarket"
            >
              <span class="text-ellipsis">{{ info.exMarket?'是':'否' }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <p class="ih-info-title">联动周期信息</p>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="周期名称"
              prop="termName"
            >
              <span
                class="text-ellipsis"
                :title="info.termName"
              >{{ info.termName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="周期时间"
              prop="timeList"
            >
              <span
                class="text-ellipsis"
                :title="info.timeList[0] + '~'+ info.timeList[1]"
              >{{ info.timeList[0] + '~'+ info.timeList[1] }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="呈批文号"
              prop="approvalNo"
            >
              <span
                class="text-ellipsis"
                :title="info.approvalNo"
              >{{ info.approvalNo }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="启动事业部"
              prop="startDivision"
            >
              <span
                class="text-ellipsis"
                :title="info.startDivision"
              >{{ info.startDivision }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="业务模式"
              prop="busEnum"
            >
              <span
                class="text-ellipsis"
                :title="$root.dictAllName(info.busEnum, 'BusinessModel')"
              >{{ $root.dictAllName(info.busEnum, "BusinessModel") }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="收费类型"
              prop="chargeEnum"
            >
              <span
                class="text-ellipsis"
                :title="$root.dictAllName(info.chargeEnum, 'Charge')"
              >{{ $root.dictAllName(info.chargeEnum, "Charge") }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="模式属性"
              prop="attributeEnum"
            >
              <span
                class="text-ellipsis"
                :title="$root.dictAllName(info.attributeEnum, 'Attribute')"
              >{{ $root.dictAllName(info.attributeEnum, "Attribute") }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="垫佣周期"
              prop="padCommissionEnum"
            >
              <span
                class="text-ellipsis"
                :title="$root.dictAllName(info.padCommissionEnum, 'PadCommission')"
              >{{ $root.dictAllName(info.padCommissionEnum, "PadCommission") }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="业务类型"
              prop="busTypeEnum"
            >
              <span
                class="text-ellipsis"
                :title="$root.dictAllName(info.busTypeEnum, 'BusType')"
              >{{ $root.dictAllName(info.busTypeEnum, "BusType") }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="我司主体">
              <span
                class="text-ellipsis"
                :title="info.companyName"
              >{{ info.companyName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="是否直签开发商"
              prop="exDirectDevelop"
            >
              <span class="text-ellipsis">{{ info.exDirectDevelop?'是':'否' }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="项目委托方"
              prop="proClient"
            >
              <span
                class="text-ellipsis"
                :title="info.proClient"
              >{{ info.proClient }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="项目周期阶段"
              prop="termStageEnum"
            >
              <span
                class="text-ellipsis"
                :title="$root.dictAllName(info.termStageEnum, 'TermStage')"
              >{{ $root.dictAllName(info.termStageEnum, "TermStage") }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="是否代销"
              prop="exConsignment"
            >
              <span class="text-ellipsis">{{ info.exConsignment?'是':'否' }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="允许其他渠道费用临时穿底"
              class="formItem"
            >
              <span class="text-ellipsis">{{ info.exOver?'是':'否' }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="往期业绩金额（万元）"
              prop="preBusAmount"
              class="formItem"
            >
              <span class="text-ellipsis">{{ info.preBusAmount }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="服务费可用其他渠道费用"
              prop="serviceBalance"
              class="formItem"
            >
              <span class="text-ellipsis">{{ info.serviceBalance }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="允许跨项目使用其他渠道费用"
              class="formItem"
            >
              <span class="text-ellipsis">{{ info.exOtherProChannelUse?'是':'否' }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="联动业务总开展期数"
              prop="totalCount"
            >
              <span class="text-ellipsis">{{ info.totalCount }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="突破标准线期数"
              prop="overStandardCount"
            >
              <span class="text-ellipsis">{{ info.overStandardCount }}</span>
            </el-form-item>
          </el-col>
          <el-col
            :span="8"
            v-if="isShow"
          >
            <el-form-item
              label="是否免收服务费"
              prop="exVoidService"
            >
              <span class="text-ellipsis">{{ info.exVoidService?'是':'否' }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="isShow">
          <el-col :span="8">
            <el-form-item
              label="认购书是否体现优惠折扣"
              class="formItem"
            >
              <span class="text-ellipsis">{{ info.exDiscount?'是':'否' }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="认购书优惠折扣体现方式"
              class="formItem"
            >
              <span class="text-ellipsis">{{ info.subscriDiscountModel }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="优惠告知书折扣体现方式"
              class="formItem"
            >
              <span class="text-ellipsis">{{ info.notificDiscountModel }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="客户报备要求简述">
              <span class="text-ellipsis">{{ info.customerReportingRequire }}</span>
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
              <span class="text-ellipsis">{{ $root.dictAllName(info.houseandcarGtRecordEnum, "YesOrNoType") }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="收取佣金标准简述">
              <span class="text-ellipsis">{{ info.collectCommissionStandardSketch }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收取佣金条件简述">
              <span class="text-ellipsis">{{ info.collectCommissionConditionSketch }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="派发佣金标准简述"
              prop="sendCommissionStandardSketch"
            >
              <span class="text-ellipsis">{{ info.sendCommissionStandardSketch }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="派发佣金条件简述"
              prop="sendCommissionConditionSketch"
            >
              <span class="text-ellipsis">{{ info.sendCommissionConditionSketch }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="业务背景"
              prop="busBackground"
            >
              <span class="text-ellipsis">{{ info.busBackground }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="立项其他说明"
              prop="otherRemark"
            >
              <span class="text-ellipsis">{{ info.otherRemark }}</span>
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
              <span class="text-ellipsis">{{ info.serviceFeeTotalByTotalRate }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="代理费总包模式-总包成交留存率"
              class="formItem"
            >
              <span class="text-ellipsis">{{ info.agencyFeeTotalByTotalRate }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="纯分销模式-代理费留存率"
              class="formItem"
            >
              <span class="text-ellipsis">{{ info.distributeAgencyRate }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="服务费总包模式-分销成交留存率"
              class="formItem"
            >
              <span class="text-ellipsis">{{ info.serviceFeeTotalByDistrictbuteRate }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="代理费总包模式-分销成交留存率"
              class="formItem"
            >
              <span class="text-ellipsis">{{ info.agencyFeeTotalByDistrictbuteRate }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="纯分销模式-服务费留存率"
              class="formItem"
            >
              <span class="text-ellipsis">{{ info.distributeServiceRate }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="项目综合留存率"
              prop="termOverallRate"
            >
              <span class="text-ellipsis">{{ info.termOverallRate }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>

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
              :file-list.sync="row.fileList"
              :file-size="10"
              :file-type="row.code"
              :limit="row.fileList.length"
              :upload-show="!!row.fileList.length"
              size="100px"
              :removePermi="false"
            ></IhUpload>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </IhPage>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { get_term_get__termId } from "@/api/project/index";
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
    exVoidService: null,
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
      this.info.exVoidService = null;
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
      let res: any = await get_term_get__termId({
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
        fileList: data
          .filter((j: any) => j.type === v.code)
          .map((h: any) => ({
            ...h,
            name: h.fileName,
          })),
      };
    });
  }
}
</script>
<style lang="scss" scoped>
.text-ellipsis {
  width: 100%;
  display: inline-block;
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
</style>