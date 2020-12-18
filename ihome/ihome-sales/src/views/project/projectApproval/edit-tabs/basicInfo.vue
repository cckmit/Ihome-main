<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-27 17:17:06
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-18 08:56:55
-->
<template>
  <div>
    <p class="ih-info-title">合作项目信息</p>
    <el-form
      :model="info"
      :rules="rules"
      ref="ruleForm"
      label-width="140px"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="合作项目"
            prop="proName"
          >
            <el-input
              v-model="info.proName"
              clearable
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="项目地址"
            prop="proAddr"
          >
            <el-input
              v-model="info.proAddr"
              clearable
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="备案名称"
            prop="proRecord"
          >
            <el-input
              v-model="info.proRecord"
              clearable
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开发商">
            <el-input
              v-model="info.developerName"
              clearable
              disabled
              placeholder="请输入开发商"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="是否市场化项目"
            prop="exMarket"
          >
            <el-select
              v-model="info.exMarket"
              clearable
              disabled
              placeholder="请选择"
              class="width--100"
            >
              <el-option
                v-for="item in YesOrNoType"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
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
            <el-input
              v-model="info.termName"
              clearable
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="周期时间"
            prop="timeList"
          >
            <el-date-picker
              v-model="info.timeList"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="$root.pickerOptions"
              value-format="yyyy-MM-dd"
              style="width:100%"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="呈批文号"
            prop="approvalNo"
          >
            <el-input
              v-model="info.approvalNo"
              clearable
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="启动事业部"
            prop="startDivision"
          >
            <el-input
              v-model="info.startDivision"
              clearable
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="业务模式"
            prop="busEnum"
          >
            <el-select
              v-model="info.busEnum"
              clearable
              placeholder="请选择"
              class="width--100"
              @change="busEnumChange"
            >
              <el-option
                v-for="item in $root.dictAllList('BusinessModel')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="收费类型"
            prop="chargeEnum"
          >
            <el-select
              v-model="info.chargeEnum"
              clearable
              placeholder="请选择"
              class="width--100"
              @change="chargeEnumChange"
            >
              <el-option
                v-for="item in $root.dictAllList('Charge')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="模式属性"
            prop="attributeEnum"
          >
            <el-select
              v-model="info.attributeEnum"
              clearable
              placeholder="请选择"
              class="width--100"
            >
              <el-option
                v-for="item in attributeEnumOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="垫佣周期"
            prop="padCommissionEnum"
          >
            <el-select
              v-model="info.padCommissionEnum"
              clearable
              placeholder="请选择"
              class="width--100"
              @change="padCommissionEnumChange"
            >
              <el-option
                v-for="item in padCommissionEnumOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="业务类型"
            prop="busTypeEnum"
          >
            <el-select
              v-model="info.busTypeEnum"
              clearable
              placeholder="请选择"
              class="width--100"
            >
              <el-option
                v-for="item in $root.dictAllList('BusType')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="我司主体">
            <el-input
              v-model="info.companyName"
              clearable
              disabled
              class="width--100"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="是否直签开发商"
            prop="exDirectDevelop"
          >
            <el-select
              v-model="info.exDirectDevelop"
              clearable
              disabled
              placeholder="请选择"
              class="width--100"
            >
              <el-option
                v-for="item in YesOrNoType"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="项目委托方"
            prop="proClient"
          >
            <el-input
              v-model="info.proClient"
              clearable
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="项目周期阶段"
            prop="termStageEnum"
          >
            <el-select
              v-model="info.termStageEnum"
              clearable
              placeholder="请选择"
              class="width--100"
            >
              <el-option
                v-for="item in $root.dictAllList('TermStage')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="是否代销"
            prop="exConsignment"
          >
            <el-select
              v-model="info.exConsignment"
              clearable
              placeholder="请选择"
              class="width--100"
            >
              <el-option
                v-for="item in YesOrNoType"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="允许其他渠道费用临时穿底">
            <el-select
              v-model="info.exOver"
              clearable
              disabled
              placeholder="请选择"
              class="width--100"
            >
              <el-option
                v-for="item in YesOrNoType"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="往期业绩金额（万元）"
            prop="preBusAmount"
          >
            <el-input
              v-model="info.preBusAmount"
              disabled
              placeholder="自动带出"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="服务费可用其他渠道费用"
            prop="serviceBalance"
          >
            <el-input
              v-model="info.serviceBalance"
              disabled
              placeholder="自动带出"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="允许跨项目使用其他渠道费用">
            <el-select
              v-model="info.exOtherProChannelUse"
              clearable
              disabled
              placeholder="请选择"
              class="width--100"
            >
              <el-option
                v-for="item in YesOrNoType"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="联动业务总开展期数"
            prop="totalCount"
          >
            <el-input
              v-model="info.totalCount"
              disabled
              placeholder="自动获取"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="突破标准线期数"
            prop="overStandardCount"
          >
            <el-input
              v-model="info.overStandardCount"
              disabled
              placeholder="自动获取"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="isShow">
        <el-col :span="8">
          <el-form-item
            label="认购书是否体现优惠折扣"
            prop="exDiscount"
          >
            <el-select
              v-model="info.exDiscount"
              clearable
              placeholder="请选择"
              class="width--100"
            >
              <el-option
                v-for="item in YesOrNoType"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="认购书优惠折扣体现方式"
            prop="subscriDiscountModel"
          >
            <el-input
              v-model="info.subscriDiscountModel"
              placeholder="（内容会推送到OA）"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="优惠告知书折扣体现方式"
            prop="notificDiscountModel"
          >
            <el-input
              v-model="info.notificDiscountModel"
              placeholder="（内容会推送到OA）"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="客户报备要求简述"
            prop="customerReportingRequire"
          >
            <el-input
              v-model="info.customerReportingRequire"
              placeholder="（内容会推送到OA）"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col
          :span="12"
          v-if="isShow"
        >
          <el-form-item
            label="【项目房款/车位款+服务费】>备案价"
            prop="houseandcarGtRecordEnum"
          >
            <el-select
              v-model="info.houseandcarGtRecordEnum"
              clearable
              placeholder="请选择"
              class="width--100"
            >
              <el-option
                v-for="item in $root.dictAllList('YesOrNoType')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="收取佣金标准简述"
            prop="collectCommissionStandardSketch"
          >
            <el-input
              v-model="info.collectCommissionStandardSketch"
              placeholder="（内容会推送到OA）"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="收取佣金条件简述"
            prop="collectCommissionConditionSketch"
          >
            <el-input
              v-model="info.collectCommissionConditionSketch"
              placeholder="（内容会推送到OA）"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="派发佣金标准简述"
            prop="sendCommissionStandardSketch"
          >
            <el-input
              v-model="info.sendCommissionStandardSketch"
              placeholder="（内容会推送到OA）"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="派发佣金条件简述"
            prop="sendCommissionConditionSketch"
          >
            <el-input
              v-model="info.sendCommissionConditionSketch"
              placeholder="（内容会推送到OA）"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="业务背景"
            prop="busBackground"
          >
            <el-input
              v-model="info.busBackground"
              placeholder="（内容会推送到OA）"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="立项其他说明"
            prop="otherRemark"
          >
            <el-input
              v-model="info.otherRemark"
              placeholder="（内容会推送到OA）"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <p class="ih-info-title">联动周期信息</p>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="服务费总包模式-总包成交留存率"
            prop="serviceFeeTotalByTotalRate"
          >
            <el-input
              v-model="info.serviceFeeTotalByTotalRate"
              disabled
              placeholder="自动获取"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="代理费总包模式-总包成交留存率"
            prop="agencyFeeTotalByTotalRate"
          >
            <el-input
              v-model="info.agencyFeeTotalByTotalRate"
              disabled
              placeholder="自动获取"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="纯分销模式-代理费留存率"
            prop="distributeAgencyRate"
          >
            <el-input
              v-model="info.distributeAgencyRate"
              disabled
              placeholder="自动获取"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="服务费总包模式-分销成交留存率"
            prop="serviceFeeTotalByDistrictbuteRate"
          >
            <el-input
              v-model="info.serviceFeeTotalByDistrictbuteRate"
              disabled
              placeholder="自动获取"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="代理费总包模式-分销成交留存率"
            prop="agencyFeeTotalByDistrictbuteRate"
          >
            <el-input
              v-model="info.agencyFeeTotalByDistrictbuteRate"
              disabled
              placeholder="自动获取"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="纯分销模式-服务费留存率"
            prop="distributeServiceRate"
          >
            <el-input
              v-model="info.distributeServiceRate"
              disabled
              placeholder="自动获取"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="项目综合留存率"
            prop="termOverallRate"
          >
            <el-input
              v-model="info.termOverallRate"
              disabled
              placeholder="自动获取"
            ></el-input>
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
              :file-list.sync="row.fileList"
              :file-size="10"
              :file-type="row.code"
              size="100px"
              @newFileList="queryNew"
            ></IhUpload>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <br />
      <!-- <el-button
        v-if="$route.name === 'projectApprovalAudit'"
        type="success"
        @click="submit()"
      >提交审核</el-button> -->
      <el-button
        v-if="$route.name === 'projectApprovalEdit'"
        type="primary"
        @click="save()"
      >保存</el-button>
      <el-button @click="viewApprovalDialogVisible = true">预览OA立项表单</el-button>
      <el-button @click="viewContractDialogVisible = true">预览OA合同表单</el-button>
    </div>
    <ih-dialog :show="viewApprovalDialogVisible">
      <ViewApproval @cancel="() => (viewApprovalDialogVisible = false)" />
    </ih-dialog>
    <ih-dialog :show="viewContractDialogVisible">
      <ViewContract @cancel="() => (viewContractDialogVisible = false)" />
    </ih-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";
import { get_term_get__termId, post_term_update } from "@/api/project/index";
import { post_dict_getAllByType } from "@/api/system/index";
import ViewApproval from "../dialog/basicInfo-dialog/viewApproval.vue";
import ViewContract from "../dialog/basicInfo-dialog/viewContract.vue";
@Component({
  components: {
    ViewApproval,
    ViewContract,
  },
})
export default class FirstAgencyEdit extends Vue {
  viewApprovalDialogVisible = false;
  viewContractDialogVisible = false;
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
  submitFile: any = {};
  attributeEnumOptions: any = [];
  private attachTermVOS: any = [];
  private rules: any = {
    proName: [
      {
        required: true,
        message: "请输入合作项目",
        trigger: "change",
      },
    ],
    proAddr: [
      {
        required: true,
        message: "请输入项目地址",
        trigger: "change",
      },
    ],
    proRecord: [
      {
        required: true,
        message: "请输入周期名称",
        trigger: "change",
      },
    ],
    developerName: [
      {
        required: true,
        message: "请输入周期名称",
        trigger: "change",
      },
    ],
    exMarket: [
      {
        required: true,
        message: "请选择是否市场化",
        trigger: "change",
      },
    ],
    termName: [
      {
        required: true,
        message: "请输入周期名称",
        trigger: "change",
      },
    ],
    timeList: [
      {
        required: true,
        message: "请输入周期时间",
        trigger: "change",
      },
    ],
    startDivision: [
      {
        required: true,
        message: "请输入启动事业部",
        trigger: "change",
      },
    ],
    busEnum: [
      {
        required: true,
        message: "请选择业务模式",
        trigger: "change",
      },
    ],
    chargeEnum: [
      {
        required: true,
        message: "请选择收费类型",
        trigger: "change",
      },
    ],
    attributeEnum: [
      {
        required: true,
        message: "请选择模式属性",
        trigger: "change",
      },
    ],
    padCommissionEnum: [
      {
        required: true,
        message: "请选择垫佣周期",
        trigger: "change",
      },
    ],
    busTypeEnum: [
      {
        required: true,
        message: "请选择业务类型",
        trigger: "change",
      },
    ],
    termStageEnum: [
      {
        required: true,
        message: "请选择项目周期阶段",
        trigger: "change",
      },
    ],
    exOver: [
      {
        required: true,
        message: "请选择是否允许其他渠道费用临时穿底",
        trigger: "change",
      },
    ],
    exOtherProChannelUse: [
      {
        required: true,
        message: "请选择是否允许跨项目使用其他渠道费用",
        trigger: "change",
      },
    ],
    exDiscount: [
      {
        required: true,
        message: "请选择是否认购书是否体现优惠折扣",
        trigger: "change",
      },
    ],
    customerReportingRequire: [
      {
        required: true,
        message: "请填写客户报备要求简述",
        trigger: "change",
      },
    ],
    houseandcarGtRecordEnum: [
      {
        required: true,
        message: "请选择【项目房款/车位款+服务费】>备案价",
        trigger: "change",
      },
    ],
    collectCommissionStandardSketch: [
      {
        required: true,
        message: "请填写收取佣金标准简述",
        trigger: "change",
      },
    ],
    collectCommissionConditionSketch: [
      {
        required: true,
        message: "请填写收取佣金条件简述",
        trigger: "change",
      },
    ],
    sendCommissionStandardSketch: [
      {
        required: true,
        message: "请填写派发佣金标准简述",
        trigger: "change",
      },
    ],
    sendCommissionConditionSketch: [
      {
        required: true,
        message: "请填写派发佣金条件简述",
        trigger: "change",
      },
    ],
    companyName: [
      {
        required: true,
        message: "请填写我司主体",
        trigger: "change",
      },
    ],
  };

  YesOrNoType = [
    {
      code: 1,
      name: "是",
    },
    {
      code: 0,
      name: "否",
    },
  ];
  isShow: any = true;

  @Watch("info.chargeEnum", { immediate: true })
  getIsShow(val: any) {
    if (val === "Agent") {
      this.isShow = false;
    } else {
      this.isShow = true;
    }
  }

  private get padCommissionEnumOptions() {
    let arr = (this.$root as any).dictAllList("PadCommission");
    if (Number(this.info.exMarket)) {
      return arr.slice(0, 7);
    } else {
      return arr;
    }
  }

  async created() {
    this.getInfo();
  }

  busEnumChange(val: any) {
    this.info.attributeEnum = null;
    if (val && this.info.chargeEnum) {
      this.getAttributeEnumOptions();
    }
  }

  chargeEnumChange(val: any) {
    this.info.attributeEnum = null;
    if (val && this.info.busEnum) {
      this.getAttributeEnumOptions();
    }
  }

  async getAttributeEnumOptions() {
    this.attributeEnumOptions = await post_dict_getAllByType({
      type: "Attribute",
      tag: `${this.info.busEnum},${this.info.chargeEnum}`,
      valid: "Valid",
    });
  }

  padCommissionEnumChange(val: any) {
    window.sessionStorage.setItem("padCommissionEnum", val);
  }

  save() {
    (this.$refs["ruleForm"] as ElForm).validate(async (v: any) => {
      if (v) {
        let infoObj = { ...this.info };
        if (this.info.timeList.length) {
          infoObj.termStart = this.info.timeList[0];
          infoObj.termEnd = this.info.timeList[1];
        }
        switch (this.$route.name) {
          case "firstAgencyEdit":
            infoObj.proId = this.$route.query.id;
            break;
        }
        // 校验提示
        let arr: any = [];
        Object.values(this.submitFile).forEach((v: any) => {
          if (v.length) {
            arr = arr.concat(v);
          }
        });
        // 以下操作仅仅是为了校验必上传项
        let submitList: any = this.fileListType.map((v: any) => {
          return {
            ...v,
            fileList: arr
              .filter((j: any) => j.type === v.code)
              .map((h: any) => ({
                ...h,
                name: h.fileName,
              })),
          };
        });
        let isSubmit = true;
        let msgList: any = [];
        submitList.forEach((v: any) => {
          if (v.subType && !v.fileList.length) {
            msgList.push(v.name);
            isSubmit = false;
          }
        });
        if (isSubmit) {
          infoObj.attachTermVOS = arr.map((v: any) => ({
            fileId: v.fileId,
            fileName: v.name,
            type: v.type,
          }));
        } else {
          this.$message({
            type: "warning",
            message: `${msgList.join(",")}项,请上传附件`,
          });
          return;
        }
        await post_term_update(infoObj);
        this.$message.success("保存成功");
        this.$goto({ path: "/projectApproval/list" });
      }
    });
  }
  submit() {
    this.$message.warning("接口未提供,功能未实现");
  }

  async getInfo() {
    let id = this.$route.query.id;
    if (id) {
      let res: any = await get_term_get__termId({
        termId: id,
      });
      if (res.termStart && res.termEnd) {
        res.timeList = [res.termStart, res.termEnd];
      } else {
        res.timeList = [];
      }
      this.info = { ...res };
      this.info.termStageEnum = "Subscription";
      this.info.companyId = res.companyId;
      window.sessionStorage.setItem("proId", res.proId);
      window.sessionStorage.setItem("padCommission", res.padCommissionEnum);
      if (this.info.chargeEnum && this.info.busEnum) {
        this.getAttributeEnumOptions();
      }
      this.getFileListType(res.attachTermVOS);
    } else {
      this.getFileListType([]);
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
    let obj: any = {};
    this.fileListType.forEach((h: any) => {
      obj[h.code] = h.fileList;
    });
    this.submitFile = { ...obj };
  }

  queryNew(data: any, type?: any) {
    let obj: any = {};
    obj[type] = data;
    this.submitFile = { ...this.submitFile, ...obj };
  }

  queryFiles(data: any) {
    this.attachTermVOS = data.map((v: any) => ({
      attachAddr: `/sales-api/sales-document-cover/file/browse/${v.fileId}`,
      attachName: v.name,
      attachId: v.fileId,
    }));
  }
}
</script>