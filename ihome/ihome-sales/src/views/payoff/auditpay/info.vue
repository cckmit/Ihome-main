<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-26 11:11:19
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-11 16:17:17
-->
<template>
  <IhPage>
    <template v-slot:form>
      <p class="ih-info-title">付款申请单信息</p>
      <el-form
        ref="form"
        label-width="120px"
        :model="info"
        :rules="rules"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="付款单编号"
              prop="applyCode"
            >
              <el-input
                disabled
                v-model="info.applyCode"
                placeholder="付款单编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="制单人"
              prop="maker"
            >
              <el-input
                disabled
                v-model="info.maker"
                placeholder="制单人"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="制单日期"
              prop="makerTime"
            >
              <el-input
                disabled
                v-model="info.makerTime"
                placeholder="制单日期"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="当前状态"
              prop="status"
            >
              <el-select
                style="width: 100%"
                v-model="info.status"
                disabled
                placeholder="请选择"
              >
                <el-option
                  v-for="item in $root.dictAllList('PayoffStatus')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="渠道商"
              prop="agencyId"
            >
              <IhSelectPageByChannel
                disabled
                placeholder="请选择渠道商"
                v-model="info.agencyId"
                :search-name="info.agencyName"
                @changeOption="getChannelInfo"
              ></IhSelectPageByChannel>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="渠道收款账号"
              prop="receiveAccount"
            >
              <el-select
                v-model="info.receiveAccount"
                disabled
                placeholder="请选择账号"
                class="width--100"
              >
                <el-option
                  v-for="item in channelAccountOptions"
                  :key="item.id"
                  :label="item.accountName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="发票类型"
              prop="invoiceType"
            >
              <el-select
                v-model="info.invoiceType"
                disabled
                placeholder="请选择发票类型"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('PayoffInvoiceType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="发票税率"
              prop="taxRate"
            >
              <el-select
                v-model="info.taxRate"
                disabled
                placeholder="请选择发票税率"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('ChannelCompanyType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="结算方式"
              prop="settlementMethod"
            >
              <el-select
                style="width: 100%"
                v-model="info.settlementMethod"
                disabled
                placeholder="请选择结算方式"
              >
                <el-option
                  v-for="item in $root.dictAllList('SettlementMethod')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="付款方式"
              prop="paymentMethod"
            >
              <el-select
                style="width: 100%"
                v-model="info.paymentMethod"
                disabled
                placeholder="请选择"
              >
                <el-option
                  v-for="item in $root.dictAllList('PaymentMethod')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template v-slot:table>
      <p class="ih-info-title">待付款列表</p>
      <el-tabs
        class="margin-left-20"
        v-model="tabsValue"
        @tab-click="handleClick(tabsValue)"
      >
        <template v-for="(item, i) in tabsList">
          <el-tab-pane
            :name="item.value"
            :label="item.label"
            :key="i"
          ></el-tab-pane>
        </template>
      </el-tabs>
      <div class="padding-left-20">
        <el-table
          class="ih-table"
          :data="showTable"
          style="width: 100%"
          show-summary
          :summary-method="getSummaries"
        >
          <el-table-column
            type="index"
            width="50"
            label="序号"
            align="center"
          ></el-table-column>
          <el-table-column
            label="成交信息"
            width="250"
          >
            <template v-slot="{ row }">
              <div
                class="text-ellipsis"
                :title="row.customer"
              >客户姓名: {{row.customer}}</div>
              <div
                class="text-ellipsis"
                :title="row.dealCode"
              >成交编号: {{row.dealCode}}</div>
              <div
                class="text-ellipsis"
                :title="row.address"
              >地址: {{row.address}}</div>
              <div
                class="text-ellipsis"
                :title="$root.dictAllName(row.busModel, 'BusinessModel')"
              >业务模式: {{$root.dictAllName(row.busModel, 'BusinessModel')}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="周期合同信息"
            width="250"
          >
            <template v-slot="{ row }">
              <div class="text-ellipsis">是否垫佣: {{$root.dictAllName(row.isMat, 'YesOrNoType')}}</div>
              <div
                class="text-ellipsis"
                :title="row.contNo"
              >分销协议编号: {{row.contNo}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="签约价格"
            prop="signPrice"
          ></el-table-column>
          <el-table-column
            label="签约日期"
            prop="signDate"
            width="150"
          ></el-table-column>
          <el-table-column
            label="服务费情况"
            width="150"
          >
            <template v-slot="{ row }">
              <div>应收: {{row.serReceiveFees}}</div>
              <div>实收: {{row.serActualFees}}</div>
              <div>未收: {{row.serNoFees}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="代理费情况"
            width="150"
          >
            <template v-slot="{ row }">
              <div>应收: {{row.ageReceiveFees}}</div>
              <div>实收: {{row.ageActualFees}}</div>
              <div>未收: {{row.ageUnpaidFees}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="拆佣金额"
            width="150"
          >
            <template v-slot="{ row }">
              <div>服务费: {{row.serCommFees}}</div>
              <div>代理费: {{row.ageCommFees}}</div>
              <div>合计: {{row.allCommFees}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="已结佣付款金额"
            width="150"
          >
            <template v-slot="{ row }">
              <div>服务费: {{row.serSettledCommFees}}</div>
              <div>代理费: {{row.ageSettledCommFees}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="未结佣付款金额"
            width="150"
          >
            <template v-slot="{ row }">
              <div>服务费: {{row.serUnsetCommFees}}</div>
              <div>代理费: {{row.ageUnsetCommFees}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="本次付款金额"
            width="200"
          >
            <template v-slot="{ row }">
              <div>
                服务费:
                <el-input
                  v-model="row.serThisCommFees"
                  v-digits="2"
                  disabled
                  style="width: 70%"
                />
              </div>
              <div class="margin-top-5">
                代理费:
                <el-input
                  v-model="row.ageThisCommFees"
                  v-digits="2"
                  disabled
                  style="width: 70%"
                />
              </div>
              <div>合计: {{
                (Number(row.serThisCommFees?row.serThisCommFees:0) + 
                Number(row.ageThisCommFees?row.ageThisCommFees:0)).toFixed(2)
              }}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="本次应扣"
            width="150"
          >
            <template v-slot="{ row }">
              <el-input
                v-model="row.thisDeduct"
                v-digits="2"
                disabled
                style="width: 70%"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="扣除项类别"
            width="200"
          >
            <template v-slot="{ row }">
              <el-select
                v-model="row.deductType"
                disabled
                placeholder="请选择"
                style="width: 70%"
              >
                <el-option
                  v-for="item in $root.dictAllList('DeductStatus')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            label="本次实际付款金额"
            width="150"
          >
            <template v-slot="{ row }">
              <div>不含税金额: {{row.noTaxAmount}}</div>
              <div>税额: {{row.tax}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="付款限额"
            width="150"
          >
            <template v-slot="{ row }">
              <div>服务费: {{row.serLimitFees}}</div>
              <div>代理费: {{row.ageLimitFees}}</div>
              <div>签字确认: {{$root.dictAllName(row.signConfirm, 'YesOrNoType')}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="本次支付比例(%)"
            prop="ratio"
            width="150"
          ></el-table-column>
        </el-table>
      </div>
      <br />
      <p class="ih-info-title">本期扣除金额明细</p>
      <div class="padding-left-20">
        <el-table
          class="ih-table"
          :data="info.payDeductDetailInfos"
          style="width: 100%"
          show-summary
        >
          <el-table-column
            label="成交报告编号"
            prop="dealCode"
          ></el-table-column>
          <el-table-column
            label="项目周期"
            prop="cycleName"
          ></el-table-column>
          <el-table-column
            label="抵扣项类别"
            prop="deductType"
          >
            <template v-slot="{ row }">
              {{ $root.dictAllName(row.deductType, "DeductType")}}
            </template>
          </el-table-column>
          <el-table-column
            label="费用类型"
            prop="feeType"
          >
            <template v-slot="{ row }">
              {{ $root.dictAllName(row.feeType, "FeeType")}}
            </template>
          </el-table-column>
          <el-table-column
            label="扣除金额"
            prop="deductAmount"
          ></el-table-column>
        </el-table>
      </div>
      <br />
      <p class="ih-info-title">此渠道公司周期结佣汇总</p>
      <div class="padding-left-20">
        <el-table
          class="ih-table"
          :data="info.paySummaryList"
          style="width: 100%"
          show-summary
        >
          <el-table-column
            label="周期名称"
            prop="cycleName"
          ></el-table-column>
          <el-table-column
            label="所属项目"
            prop="projectName"
          ></el-table-column>
          <el-table-column
            label="累计结佣次数"
            prop="num"
          ></el-table-column>
          <el-table-column
            label="历史累计发生金额"
            prop="historyTotalPayFees"
          ></el-table-column>
          <el-table-column
            label="历史累计扣除金额"
            prop="historyTotalPdeductFees"
          ></el-table-column>
          <el-table-column
            label="本期实际付款金额"
            prop="actualAmount"
          ></el-table-column>
          <el-table-column
            label="本期扣除金额"
            prop="deductAmount"
          ></el-table-column>
          <el-table-column
            label="累计发生金额（含本期）"
            prop="totalPayFees"
          ></el-table-column>
          <el-table-column
            label="累计扣除金额（含本期）"
            prop="totalPdeductFees"
          ></el-table-column>
        </el-table>
      </div>
      <br />
      <p class="ih-info-title">成本归属列表</p>
      <div class="padding-left-20">
        <el-table
          class="ih-table"
          :data="info.costApportionList"
          style="width: 100%"
          show-summary
        >
          <el-table-column
            label="周期名称"
            prop="cycleName"
          ></el-table-column>
          <el-table-column
            label="成本归属区域"
            prop="ownedAreaName"
          ></el-table-column>
          <el-table-column
            label="成本归属门店"
            prop="ownedStoreId"
          ></el-table-column>
          <el-table-column
            label="应承担总成本"
            prop="shouldTotalCost"
          ></el-table-column>
          <el-table-column
            label="累计已分摊成本金额"
            prop="totalApportionCost"
          ></el-table-column>
          <el-table-column
            label="未分摊成本金额"
            prop="unapportionCost"
          ></el-table-column>
          <el-table-column
            label="本次分摊成本金额（合计）"
            prop="thisApportionCost"
          ></el-table-column>
          <el-table-column
            label="本次分摊不含税金额"
            prop="thisApportionNoTaxCost"
          ></el-table-column>
          <el-table-column
            label="本次分摊税额"
            prop="thisApportionTax"
          ></el-table-column>
        </el-table>
      </div>
      <br />
      <p class="ih-info-title">结佣信息</p>
      <div class="margin-left-20">
        <table
          border="1"
          cellspacing="0"
          cellpadding="0"
          width="100%"
          height="100%"
        >
          <tr>
            <td
              height="50"
              width="200"
            >领取单位</td>
            <td colspan="3">{{info.agencyName}}</td>
            <td width="200">区域</td>
            <td width="200">{{info.area}}</td>
          </tr>
          <tr>
            <td width="200">项目</td>
            <td width="200">{{info.projectName}}</td>
            <td
              width="200"
              height="50"
            >本期申请支付金额</td>
            <td width="200">{{info.applyAmount}}</td>
            <td width="200">本期扣除金额</td>
            <td width="200">{{info.deductAmount}}</td>
          </tr>
          <tr>
            <td height="50">本期实际付款金额</td>
            <td>{{info.actualAmount}}</td>
            <td>不含税金额（实付）</td>
            <td>{{info.noTaxAmount}}</td>
            <td>税额（实付）</td>
            <td>{{info.tax}}</td>
          </tr>
          <tr>
            <td height="50">累计付款金额</td>
            <td>{{info.totalPayFees}}</td>
            <td>累计扣除金额</td>
            <td>{{info.totalPdeductFees}}</td>
            <td>累计付款税额</td>
            <td>{{info.totalTax}}</td>
          </tr>
          <tr>
            <td
              colspan="6"
              height="50"
            >经办部门意见</td>
          </tr>
          <tr>
            <td colspan="6">
              <div style="height: 100px;text-align: left;padding: 5px">
                {{info.description}}
              </div>
            </td>
          </tr>
        </table>
      </div>
      <br />
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
          <el-table-column
            label="附件"
            v-if="$route.name==='payoffInfo'"
          >
            <template v-slot="{ row }">
              <IhUpload
                :file-list.sync="row.fileList"
                :file-size="10"
                :file-type="row.code"
                size="100px"
                :limit="row.fileList.length"
                :removePermi="false"
                :upload-show="!!row.fileList.length"
              ></IhUpload>
            </template>
          </el-table-column>
          <el-table-column
            label="附件"
            v-if="$route.name==='payoffReplenish'"
          >
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
      <br />
      <div class="top">
        <p class="ih-info-title">操作日志</p>
        <div class="right-button">
          <el-popover
            class="margin-right-10"
            placement="top"
            trigger="manual"
            :content="`姓名: ${operateName} 岗位: ${operatePost}`"
            v-model="operateVisible"
          >
            <el-button
              slot="reference"
              type="success"
              size="small"
              icon="el-icon-search"
              @click="searchPerson"
            >查询当前代办人</el-button>
          </el-popover>
          <el-button
            @click="updateOA"
            type="success"
            size="small"
            icon="el-icon-refresh"
          >同步OA审核日志</el-button>
        </div>
      </div>
      <div class="padding-left-20">
        <el-table
          class="ih-table"
          :data="info.processRecordList"
          style="width: 100%"
        >
          <el-table-column
            label="操作"
            prop="operate"
          >
            <template v-slot="{ row }">
              {{$root.dictAllName(row.operate, 'PayoffOperate')}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作后状态"
            prop="afterStatus"
          >
            <template v-slot="{ row }">
              {{$root.dictAllName(row.afterStatus, 'PayoffStatus')}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作人"
            prop="operaterName"
          ></el-table-column>
          <el-table-column
            label="岗位"
            prop="operaterJob"
          ></el-table-column>
          <el-table-column
            label="操作时间"
            prop="operateTime"
          ></el-table-column>
          <el-table-column
            label="处理结果"
            prop="result"
          >
            <template v-slot="{ row }">
              {{$root.dictAllName(row.result, 'PayoffProcessResult')}}
            </template>
          </el-table-column>
          <el-table-column
            label="系统"
            prop="system"
          >
            <template v-slot="{ row }">
              {{$root.dictAllName(row.system, 'PayoffSystem')}}
            </template>
          </el-table-column>
          <el-table-column
            label="审核意见"
            prop="remark"
          ></el-table-column>
        </el-table>
      </div>

      <div v-if="$route.name === 'payoffReplenish'">
        <p class="ih-info-title">附言</p>
        <el-input
          class="padding-left-20"
          style="box-sizing: border-box"
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 10 }"
          placeholder="请输入内容"
          v-model="info.postscript"
          maxlength="500"
          show-word-limit
        >
        </el-input>
      </div>

      <div class="bottom">
        <el-button
          v-if="$route.name==='payoffReplenish'"
          @click="submit()"
          type="success"
        >提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </template>
  </IhPage>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  get_payApply_get__id,
  get_processRecord_oa_review_person__applyId,
  get_processRecord_oa_review_log__applyId,
  post_payApply_payApplySuppFile,
} from "@/api/payoff/index";
import { get_channel_get__id } from "@/api/channel/index";
import { Form as ElForm } from "element-ui";

@Component({
  components: {},
})
export default class PayoffEdit extends Vue {
  private fileList: Array<object> = [];
  info: any = {
    applyCode: null,
    status: null,
    agencyId: null,
    receiveAccount: null,
    invoiceType: null,
    taxRate: null,
    maker: null,
    makerId: null,
    makerTime: null,
    payApplyDetailList: [],
    payDeductDetailList: [],
    costApportionList: [],
    documentList: [],
    paySummaryList: [],
    processRecordList: [],
    postscript: null,
  };
  channelAccountOptions: any = [];
  showTable: any = [];
  tabsValue: any = null;
  tabsList: any = [];
  fileListType: any = [];
  submitFile: any = {};
  operateName: any = "";
  operatePost: any = "";
  operateVisible: any = false;

  private rules: any = {
    applyCode: [
      {
        required: true,
        message: "请填写付款单编号",
        trigger: "change",
      },
    ],
    maker: [
      {
        required: true,
        message: "请填写制单人",
        trigger: "change",
      },
    ],
    makerTime: [
      {
        required: true,
        message: "请选择制单日期",
        trigger: "change",
      },
    ],
    status: [
      {
        required: true,
        message: "请选择当前状态",
        trigger: "change",
      },
    ],
    agencyId: [
      {
        required: true,
        message: "请选择渠道商",
        trigger: "change",
      },
    ],
    receiveAccount: [
      {
        required: true,
        message: "请选择渠道收款账号",
        trigger: "change",
      },
    ],
    invoiceType: [
      {
        required: true,
        message: "请选择发票类型",
        trigger: "change",
      },
    ],
    taxRate: [
      {
        required: true,
        message: "请选择发票税率",
        trigger: "change",
      },
    ],
    settlementMethod: [
      {
        required: true,
        message: "请选择结算方式",
        trigger: "change",
      },
    ],
    paymentMethod: [
      {
        required: true,
        message: "请选择付款方式",
        trigger: "change",
      },
    ],
  };

  // 过滤tab页数据
  filterTabs(val: any) {
    let obj: any = {};
    let arr: any = val.map((v: any) => ({
      label: v.cycleName,
      value: v.cycleId,
    }));
    this.tabsList = arr.reduce((preVal: any, curVal: any) => {
      obj[curVal.value] ? "" : (obj[curVal.value] = preVal.push(curVal));
      return preVal;
    }, []);
    this.tabsValue = this.tabsList[0].value;
    this.showTable = this.info.payApplyDetailList.filter(
      (v: any) => v.cycleId === this.tabsValue
    );
  }

  private get payoffId() {
    return this.$route.query.id;
  }

  handleClick(val: any) {
    this.showTable = this.info.payApplyDetailList.filter(
      (v: any) => v.cycleId === val
    );
  }

  cancel() {
    this.$router.push("/payoff/list");
  }

  async created() {
    this.getInfo();
  }
  async getInfo() {
    if (this.payoffId) {
      const res = await get_payApply_get__id({ id: this.payoffId });
      this.info = {
        ...res,
        receiveAccount: Number(res.receiveAccount),
        payApplyDetailList: res.payApplyDetailList.map((j: any) => ({
          ...j,
          cycleId: j.cycleId + "",
        })),
      };
      this.getFileListType(res.documentList);
      this.getChannelInfo({
        id: res.agencyId,
        name: res.agencyName,
      });
      this.filterTabs(this.info.payApplyDetailList);
    } else {
      this.getFileListType([]);
    }
  }

  getFileListType(data: any) {
    const list = (this.$root as any).dictAllList("PayoffFileType");
    this.fileListType = list.map((v: any) => {
      return {
        ...v,
        fileList: data
          .filter((j: any) => j.fileType === v.code)
          .map((h: any) => ({
            ...h,
            name: h.fileName,
            type: v.fileType,
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

  // 合计
  getSummaries(param: any) {
    const { columns, data } = param;
    let sums: any = [];
    columns.forEach((column: any, index: number) => {
      if (index === 0) {
        sums[index] = "合计";
        return;
      }
      const values = data.map((item: any) => Number(item[column.property]));
      if (!values.every((value: any) => isNaN(value))) {
        sums[index] = values.reduce((prev: number, curr: number) => {
          const value = Number(curr);
          if (!isNaN(value)) {
            return prev + curr;
          } else {
            return prev;
          }
        }, 0);
      } else {
        sums[index] = "--";
      }
    });
    return sums;
  }

  async getChannelInfo(item: any) {
    this.info.agencyName = item.name;
    let res = await get_channel_get__id({ id: item.id });
    this.channelAccountOptions = res.channelBanks;
  }

  async searchPerson() {
    if (!this.operateName || !this.operatePost) {
      const res = await get_processRecord_oa_review_person__applyId({
        applyId: this.payoffId,
      });
      this.operateName = res.name;
      this.operatePost = res.orgPostName;
    }
    this.operateVisible = true;
  }

  async updateOA() {
    const res = await get_processRecord_oa_review_log__applyId({
      applyId: this.payoffId,
    });
    this.info.processRecordList = res;
  }

  submit() {
    (this.$refs["form"] as ElForm).validate(async (v: any) => {
      if (v) {
        // 校验提示
        let obj: any = {};
        obj.id = this.payoffId;
        obj.postscript = this.info.postscript;
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
              .filter((j: any) => j.fileType === v.code)
              .map((h: any) => ({
                ...h,
                name: h.fileName,
                type: h.fileType,
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
          obj.documents = arr.map((v: any) => ({
            fileId: v.fileId,
            fileName: v.name,
            fileType: v.type,
          }));
        } else {
          this.$message({
            type: "warning",
            message: `${msgList.join(",")}项,请上传附件`,
          });
          return;
        }
        await post_payApply_payApplySuppFile(obj);
        this.$goto({ path: `/payoff/list` });
        this.$message({
          type: "success",
          message: "提交成功!",
        });
      }
    });
  }
}
</script>
<style lang="scss" scoped>
.content {
  position: relative;
  /deep/ .el-button {
    position: absolute;
    top: -10px;
    right: 0;
  }
}
.bottom {
  margin-top: 30px;
  text-align: center;
}

.text-ellipsis {
  width: 100%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    font-size: 15px;
    text-align: center;
  }
  .right-button {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>