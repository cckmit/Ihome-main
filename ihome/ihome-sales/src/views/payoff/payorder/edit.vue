<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-26 11:11:23
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-27 20:11:38
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
            <el-form-item label="付款单编号">
              <el-input
                disabled
                v-model="info.applyCode"
                placeholder="保存后生成"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="结佣项目"
              prop="projectId"
            >
              <IhSelectPageByProject
                v-model="info.projectId"
                :search-name="info.projectName"
                clearable
                @changeOption="(data) => {
                  info.projectName = data.proName;
                }"
              ></IhSelectPageByProject>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="事业部"
              prop="belongOrgId"
            >
              <IhSelectPageDivision
                clearable
                placeholder="事业部"
                v-model="info.belongOrgId"
                :search-name="info.belongOrgName"
                @changeOption="(data) => {
                  info.belongOrgName = data.name;
                }"
              >
              </IhSelectPageDivision>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="渠道商"
              prop="agencyId"
            >
              <IhSelectPageByChannel
                clearable
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
                clearable
                placeholder="请选择账号"
                class="width--100"
              >
                <el-option
                  v-for="item in channelAccountOptions"
                  :key="item.id"
                  :label="item.accountNo"
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
                clearable
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
                clearable
                placeholder="请选择发票税率"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('PayoffTaxRate')"
                  :key="item.code"
                  :label="item.name + '%'"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="当前状态">
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
        </el-row>
      </el-form>
    </template>
    <template v-slot:table>
      <div class="content">
        <p class="ih-info-title">待付款列表</p>
        <el-button
          @click="addContacts()"
          type="success"
          size="small"
        >添加成交报告</el-button>
      </div>
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
                :title="row.dealCode"
              >成交编号: {{row.dealCode}}</div>
              <div
                class="text-ellipsis"
                :title="row.address"
              >地址: {{row.address}}</div>
              <div
                class="text-ellipsis"
                :title="row.customer"
              >客户姓名: {{row.customer}}</div>
              <!-- <div
                class="text-ellipsis"
                :title="$root.dictAllName(row.busModel, 'BusinessModel')"
              >业务模式: {{$root.dictAllName(row.busModel, 'BusinessModel')}}</div> -->
            </template>
          </el-table-column>
          <el-table-column
            label="合同信息"
            width="250"
          >
            <template v-slot="{ row }">
              <div
                class="text-ellipsis"
                :title="row.contNo"
              >分销协议编号: {{row.contNo}}</div>
              <div class="text-ellipsis">是否垫佣: {{$root.dictAllName(row.isMat, 'YesOrNoType')}}</div>
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
              <div>未收: {{row.serUnpaidFees}}</div>
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
              <div>合计: {{$math.tofixed($math.add(Number(row.serCommFees), Number(row.ageCommFees)), 2)}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="已结佣付款金额"
            width="150"
          >
            <template v-slot="{ row }">
              <div>服务费: {{row.serSettledCommFees}}</div>
              <div>代理费: {{row.ageSettledCommFees}}</div>
              <div>合计: {{$math.tofixed($math.add(Number(row.serSettledCommFees), Number(row.ageSettledCommFees)), 2)}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="未结佣付款金额"
            width="150"
          >
            <template v-slot="{ row }">
              <div>服务费: {{row.serUnsetCommFees}}</div>
              <div>代理费: {{row.ageUnsetCommFees}}</div>
              <div>合计: {{$math.tofixed($math.add(Number(row.serUnsetCommFees), Number(row.ageUnsetCommFees)), 2)}}</div>
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
                  clearable
                  style="width: 70%"
                />
              </div>
              <div class="margin-top-5">
                代理费:
                <el-input
                  v-model="row.ageThisCommFees"
                  v-digits="2"
                  clearable
                  style="width: 70%"
                />
              </div>
              <div>合计: {{
                $math.tofixed($math.add(Number(row.serThisCommFees), Number(row.ageThisCommFees)), 2)
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
                clearable
                style="width: 70%"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="扣除项类别"
            width="200"
          >
            <template v-slot="{ row }">
              <el-input
                v-model="row.deductType"
                clearable
                style="width: 70%"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="本次实际付款金额"
            width="150"
          >
            <template v-slot="{ row }">
              <div>实际付款金额: {{practicalChange(row)}}</div>
              <div>不含税金额: {{noTaxAmountChange(row)}}</div>
              <div>税额: {{taxChange(row)}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="付款限额"
            width="150"
          >
            <template v-slot="{ row }">
              <div>服务费: {{row.serLimitFees}}</div>
              <div>代理费: {{row.ageLimitFees}}</div>
              <div>签字确认: {{row.signConfirm}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="本次支付比例(%)"
            prop="ratio"
            width="150"
          >
            <template v-slot="{ row }">
              {{ratioChange(row)}}
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
          >
            <template v-slot="{ $index }">
              <el-button
                type="danger"
                size="small"
                @click="delContacts($index)"
              > 移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <br />
      <p class="ih-info-title">本期需抵扣金额明细</p>
      <div class="padding-left-20">
        <el-table
          class="ih-table"
          :data="info.payDeductDetailResponseList"
          style="width: 100%"
          show-summary
        >
          <el-table-column
            label="成交报告编号"
            prop="dealCode"
          >
            <template v-slot="{ row }">
              <el-link @click="$router.push(`/dealReport/info?code=${row.dealCode}&&type=CODE`)">
                {{row.dealCode}}
              </el-link>
            </template>
          </el-table-column>
          <el-table-column
            label="项目周期"
            prop="cycleName"
          ></el-table-column>
          <el-table-column
            label="抵扣项类别"
            prop="deductType"
          >
            <template v-slot="{ row }">
              {{ $root.dictAllName(row.deductType, "SuppContType")}}
            </template>
          </el-table-column>
          <el-table-column
            label="扣除金额"
            prop="deductAmount"
          ></el-table-column>
          <el-table-column
            label="不含税金额"
            prop="noTaxAmount"
          >
            <template v-slot="{ row }">
              {{dataNoTaxAmountChange(row)}}
            </template>
          </el-table-column>
          <el-table-column
            label="税额"
            prop="tax"
          >
            <template v-slot="{ row }">
              {{dataTaxChange(row)}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <br />

      <div class="content">
        <p class="ih-info-title">其他扣除项</p>
        <el-button
          @click="addDeductionType()"
          type="success"
          size="small"
        >添加扣除项</el-button>
      </div>
      <div class="padding-left-20">
        <el-table
          class="ih-table"
          :data="info.otherDeductionDetailResponseList"
          style="width: 100%"
          show-summary
        >
          <el-table-column
            label="扣除类型"
            prop="otherDeductionType"
          >
            <template v-slot="{ row }">
              <el-select
                style="width: 100%"
                v-model="row.otherDeductionType"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in $root.dictAllList('OtherDeductionType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            label="项目周期"
            prop="projectName"
            width="250"
          >
            <template v-slot="{ row }">
              <IhSelectPageByProject
                v-model="row.cycleId"
                :search-name="row.cycleName"
                clearable
                @changeOption="(data) => {
                  row.cycleName = data.proName;
                }"
              ></IhSelectPageByProject>
            </template>
          </el-table-column>
          <el-table-column
            label="本期扣除金额"
            prop="deductAmount"
          >
            <template v-slot="{ row }">
              <el-input
                v-model="row.deductAmount"
                clearable
                placeholder="本期扣除金额"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="不含税金额"
            prop="noTaxAmount"
          >
            <template v-slot="{ row }">
              {{dataNoTaxAmountChange(row)}}
            </template>
          </el-table-column>
          <el-table-column
            label="税额"
            prop="tax"
          >
            <template v-slot="{ row }">
              {{dataTaxChange(row)}}
            </template>
          </el-table-column>
          <el-table-column
            label="备注"
            prop="remark"
            width="200"
          >
            <template v-slot="{ row }">
              <el-input
                v-model="row.remark"
                clearable
                placeholder="备注"
              />
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
          >
            <template v-slot="{ $index }">
              <el-button
                type="danger"
                size="small"
                @click="delOtherDeduction($index)"
              > 移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <br />
      <div style="width:100%;padding-left: 20px;box-sizing: border-box">
        <el-button
          style="width: 100%;"
          type="primary"
          @click="computedMsg"
        >点击计算结佣统计数据及成本归属明细</el-button>
      </div>
      <br />
      <p class="ih-info-title">结佣汇总清单</p>
      <div class="padding-left-20">
        <el-table
          class="ih-table"
          :data="info.paySummaryDetailsResponseList"
          style="width: 100%"
          show-summary
        >
          <el-table-column
            label="周期名称"
            prop="cycleName"
            width="200"
          >
            <template v-slot="{ row }">
              <el-link
                @click="$router.push(`/projectApproval/info?id=${row.cycleId}`)"
                :title="row.cycleName"
                class="text-ellipsis"
              >
                {{row.cycleName}}
              </el-link>
            </template>
          </el-table-column>
          <el-table-column
            label="合同信息"
            width="250"
          >
            <template v-slot="{ row }">
              <template v-for="(item, i) in row.paySummaryContractInfoList">
                <el-link
                  @click="$router.push(`/distribution/info?contractNo=${item.contNo}`)"
                  :key="i"
                  :title="`名称: ${item.title} 编号: ${item.contNo}`"
                  class="text-ellipsis"
                >
                  {{`名称: ${item.title} 编号: ${item.contNo}`}}
                </el-link>
              </template>
            </template>
          </el-table-column>
          <el-table-column
            label="模式属性"
            prop="modeAttributes"
            width="230"
          >
            <template v-slot="{ row }">
              {{$root.dictAllName(row.modeAttributes, 'Attribute')}}
            </template>
          </el-table-column>
          <el-table-column
            label="累计结佣次数（不含本次）"
            prop="grandTotalFrequency"
            width="120"
          ></el-table-column>
          <el-table-column
            label="历史申请付款金额（含税）"
            prop="historicalApplicationAmount"
            width="120"
          ></el-table-column>
          <el-table-column
            label="历史实际付款金额（含税）"
            prop="historicalActualAmount"
            width="120"
          ></el-table-column>
          <el-table-column
            label="本期申请付款金额（含税）"
            prop="currentApplication"
            width="120"
          ></el-table-column>
          <el-table-column
            label="本期扣除金额（含税）"
            prop="currentDeduction"
            width="120"
          ></el-table-column>
          <el-table-column
            label="本期扣罚金额（含税）"
            prop="currentFined"
            width="120"
          ></el-table-column>
          <el-table-column
            label="本期实际付款金额（含税）"
            prop="currentActual"
            width="120"
          ></el-table-column>
          <el-table-column
            label="累计申请付款金额（含税）"
            prop="cumulativeApplication"
            width="120"
          ></el-table-column>
          <el-table-column
            label="累计实际付款金额（含税）"
            prop="cumulativeActual"
            width="120"
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
            <td width="200">项目</td>
            <td width="200">{{info.projectName}}</td>
          </tr>
          <tr>
            <td
              width="200"
              height="50"
            >本期申请支付金额</td>
            <td width="200">{{info.applyAmount}}</td>
            <td width="200">本期扣除金额</td>
            <td width="200">{{info.deductAmount}}</td>
            <td width="200">本期扣罚金额</td>
            <td width="200">{{info.finedAmount}}</td>
          </tr>
          <tr>
            <td height="50">扣除类别项</td>
            <td colspan="5">{{info.deductionCategory}}</td>
          </tr>
          <tr>
            <td height="50">本期实际付款金额(含税)</td>
            <td>{{info.actualAmount}}</td>
            <td>本期实际付款金额（不含税）</td>
            <td>{{info.noTaxAmount}}</td>
            <td>本期实际付款税额</td>
            <td>
              <el-input
                class="inputClass"
                v-model="info.tax"
                placeholder="请输入"
                v-digits="2"
                clearable
                @change="taxinputChange"
              />
            </td>
          </tr>
          <tr>
            <td colspan="6">
              <div class="text-left padding-left-15">经办部门意见</div>
              <el-input
                class="inputClass"
                type="textarea"
                style="box-sizing: border-box"
                :autosize="{ minRows: 5, maxRows: 10 }"
                placeholder="请输入内容"
                v-model="info.description"
                maxlength="500"
                show-word-limit
              >
              </el-input>
            </td>
          </tr>
        </table>
      </div>
      <br />
      <div class="content">
        <p class="ih-info-title">上传附件</p>
        <div>
          <el-button
            @click="downloadTemplate('jiesuan')"
            type="success"
            size="small"
            icon="el-icon-download"
          >结算明细未盖章版</el-button>
          <el-button
            @click="downloadTemplate('qingyong')"
            type="success"
            size="small"
            icon="el-icon-download"
          >请款单未盖章版</el-button>
        </div>
      </div>
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
                :limit="row.limit && row.fileList.length"
                :upload-show="row.limit && !!row.fileList.length"
                @newFileList="queryNew"
              ></IhUpload>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <br />
      <div class="bottom">
        <el-button
          @click="submit('Unconfirm')"
          type="primary"
        >保存</el-button>
        <el-button
          @click="submit('PlatformClerkUnreview')"
          type="success"
        >提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </template>
    <ih-dialog :show="contactsDialogVisible">
      <Obligation
        :data="contactsData"
        @cancel="() => (contactsDialogVisible = false)"
        @finish=" (data) => contactsFinish(data)"
      />
    </ih-dialog>
  </IhPage>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  get_payApply_get__id,
  post_payApply_entryApply,
  post_payApply_updateApply,
  post_payApply_calculation_results,
  get_payDeductDetail_deduct_details__channelId,
} from "@/api/payoff/index";
import { get_channel_get__id } from "@/api/channel/index";
import { Form as ElForm } from "element-ui";
import Obligation from "./dialog/obligation.vue";

@Component({
  components: {
    Obligation,
  },
})
export default class PayoffEdit extends Vue {
  private fileList: Array<object> = [];
  info: any = {
    applyCode: null,
    projectId: null,
    projectName: null,
    belongOrgId: null,
    belongOrgName: null,
    agencyId: null,
    agencyName: null,
    receiveAccount: null,
    invoiceType: null,
    taxRate: null,
    status: null,
    maker: null,
    makerId: null,
    makerTime: null,
    payApplyDetailList: [],
    payDeductDetailResponseList: [],
    otherDeductionDetailResponseList: [
      {
        otherDeductionType: "",
        cycleName: "",
        cycleId: "",
        deductAmount: 0,
        noTaxAmount: 0,
        tax: 0,
        remark: "",
      },
    ],
    paySummaryDetailsResponseList: [],
    applyAmount: null,
    deductAmount: null,
    finedAmount: null,
    deductionCategory: null,
    actualAmount: null,
    noTaxAmount: null,
    tax: null,
    description: null,
    documentList: [],
  };
  channelAccountOptions: any = [];
  showTable: any = [];
  tabsValue: any = null;
  tabsList: any = [];
  fileListType: any = [];
  submitFile: any = {};
  contactsData: any = {};
  contactsDialogVisible = false;
  updateList: any = [];
  modify = false;

  private rules: any = {
    projectId: [
      {
        required: true,
        message: "请选择结佣项目",
        trigger: "change",
      },
    ],
    belongOrgId: [
      {
        required: true,
        message: "请选择事业部",
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
    applyCode: [
      {
        required: true,
        message: "请填写付款单编号",
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
  };

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

  // 实际付款金额(本次申请付款金额合计-本次应扣)
  practicalChange(row: any) {
    const total = this.$math.add(
      Number(row.serThisCommFees),
      Number(row.ageThisCommFees)
    );
    const deduct = Number(row.thisDeduct);
    const res = this.$math.sub(total, deduct);
    row.actualAmount = this.$math.tofixed(res, 2);
    return this.$math.tofixed(res, 2);
  }

  // 不含税金额(实际付款金额/(1+发票税率))
  noTaxAmountChange(row: any) {
    const practical = Number(row.actualAmount);
    const taxRate = this.info.taxRate
      ? this.$math.div(this.info.taxRate, 100)
      : 0;
    const shuier = this.$math.add(1, taxRate);
    const res = this.$math.div(practical, shuier);
    row.noTaxAmount = this.$math.tofixed(res, 2);
    return this.$math.tofixed(res, 2);
  }

  // 税额(实际付款金额-不含税金额)
  taxChange(row: any) {
    const practical = Number(row.actualAmount);
    const noTaxAmount = Number(row.noTaxAmount);
    const res = this.$math.sub(practical, noTaxAmount);
    row.tax = this.$math.tofixed(res, 2);
    return this.$math.tofixed(res, 2);
  }

  // 本次支付比例(%)( 本次申请付款金额 / 未结佣付款金额 * 100 )
  ratioChange(row: any) {
    const total1 = this.$math.add(
      Number(row.serThisCommFees),
      Number(row.ageThisCommFees)
    );
    const total2 = this.$math.add(
      Number(row.serUnsetCommFees),
      Number(row.ageUnsetCommFees)
    );
    const total3 = this.$math.div(total1, total2);
    const res = this.$math.multi(total3, 100);
    row.ratio = this.$math.tofixed(res, 2);
    return this.$math.tofixed(res, 2);
  }

  // 明细表-不含税金额(扣除金额/ (1+开票税率))
  dataNoTaxAmountChange(row: any) {
    const deductAmount = Number(row.deductAmount);
    const taxRate = this.info.taxRate
      ? this.$math.div(this.info.taxRate, 100)
      : 0;
    const shuier = this.$math.add(1, taxRate);
    const res = this.$math.div(deductAmount, shuier);
    row.noTaxAmount = this.$math.tofixed(res, 2);
    return this.$math.tofixed(res, 2);
  }

  // 明细表-税额(不含税金额 * 开票税率)
  dataTaxChange(row: any) {
    const noTaxAmount = row.noTaxAmount ? Number(row.noTaxAmount) : 0;
    const taxRate = this.info.taxRate
      ? this.$math.div(this.info.taxRate, 100)
      : 0;
    const shuier = this.$math.add(1, taxRate);
    const res = this.$math.multi(noTaxAmount, shuier);
    row.tax = this.$math.tofixed(res, 2);
    return this.$math.tofixed(res, 2);
  }

  searchOpen = true;
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

  taxinputChange(v: any) {
    console.log(v);
    this.modify = true;
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
        taxRate: res.taxRate + "",
        payApplyDetailList: res.payApplyDetailList.map((j: any) => ({
          ...j,
          cycleId: j.cycleId + "",
        })),
      };
      this.updateList = res.documentList;
      this.getFileListType(res.documentList);
      this.getChannelInfo(
        {
          id: res.agencyId,
          name: res.agencyName,
        },
        "clear"
      );
      this.filterTabs(this.info.payApplyDetailList);
    } else {
      this.info.maker = (this.$root as any).userInfo.name;
      this.info.makerId = (this.$root as any).userInfo.id;
      this.info.makerTime = (this.$tool as any).todayStr();
      this.info.status = "Unconfirm";
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
          })),
      };
    });
    this.fileListType = this.fileListType.map((v: any) => {
      if (["Contract", "BusinessLicense"].includes(v.code)) {
        return {
          ...v,
          limit: true,
          fileList: v.fileList.map((j: any) => ({
            ...j,
            exAuto: 1,
          })),
        };
      } else {
        return {
          ...v,
        };
      }
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

  // 计算
  async computedMsg() {
    let obj: any = {};
    obj.agencyId = this.info.agencyId;
    obj.agencyName = this.info.agencyName;
    obj.taxRate = Number(this.info.taxRate);
    obj.payApplyDetailList = this.info.payApplyDetailList;
    obj.otherDeductionDetailCalculationRequestList = this.info.otherDeductionDetailResponseList;
    obj.payDeductDetailCalculationRequestList = this.info.payDeductDetailResponseList;
    const res: any = await post_payApply_calculation_results(obj);
    this.info.actualAmount = res.actualAmount;
    this.info.applyAmount = res.applyAmount;
    this.info.deductAmount = res.deductAmount;
    this.info.deductionCategory = res.deductionCategory;
    this.info.finedAmount = res.finedAmount;
    this.info.noTaxAmount = res.noTaxAmount;
    this.info.tax = res.tax;
    this.info.paySummaryDetailsResponseList = res.paySummaryDetailsResponses;
    this.updateList.forEach((v: any) => {
      res.documentList.forEach((j: any) => {
        if (j.fileType === v.fileType) {
          v.fileId = j.fileId;
          v.fileName = j.fileName;
        }
      });
    });
    this.getFileListType(this.updateList);
    this.modify = true;
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

  addContacts() {
    if (this.info.agencyId && this.info.projectId) {
      this.contactsDialogVisible = true;
      this.contactsData = {
        agencyId: this.info.agencyId,
        hasCheckedData: this.info.payApplyDetailList,
        projectId: this.info.projectId,
      };
    } else {
      this.$message.warning("请选择结佣项目、渠道商");
    }
  }

  async delContacts(index: number) {
    this.showTable.splice(index, 1);
  }

  addDeductionType() {
    this.info.otherDeductionDetailResponseList.push({
      otherDeductionType: "",
      cycleName: "",
      cycleId: "",
      deductAmount: 0,
      noTaxAmount: 0,
      tax: 0,
      remark: "",
    });
  }

  async delOtherDeduction(index: number) {
    this.info.otherDeductionDetailResponseList.splice(index, 1);
  }

  downloadTemplate(type: any) {
    console.log(type);
  }

  contactsFinish(data: any) {
    let arr: any = data.map((v: any) => ({
      ...v,
      serThisCommFees: 0,
      ageThisCommFees: 0,
      thisDeduct: 0,
      cycleId: v.cycleId + "",
    }));
    if (this.info.payApplyDetailList.length) {
      let newArr: any = arr.concat(this.info.payApplyDetailList);
      const res = new Map();
      this.info.payApplyDetailList = newArr.filter(
        (v: any) => !res.has(v.cycleId) && res.set(v.cycleId, 1)
      );
    } else {
      this.info.payApplyDetailList = arr;
    }
    this.filterTabs(this.info.payApplyDetailList);
    this.contactsDialogVisible = false;
  }

  async getChannelInfo(item: any, type: any) {
    this.info.agencyName = item.name;
    let res = await get_channel_get__id({ id: item.id });
    this.channelAccountOptions = res.channelBanks;
    if (!type) this.info.receiveAccount = null;
    // 获取本期需抵扣金额明细
    this.queryDeductionData(item.id);
  }

  async queryDeductionData(id: any) {
    const res = await get_payDeductDetail_deduct_details__channelId({
      channelId: id,
    });
    this.info.payDeductDetailResponseList = res ? res : [];
  }

  submit(val: string) {
    (this.$refs["form"] as ElForm).validate(async (v: any) => {
      if (v) {
        let obj: any = {
          payApplyVO: {},
          payApplyDetailList: [],
        };
        obj.modify = this.modify;
        obj.payApplyVO.deductionCategory = this.info.deductionCategory;
        obj.payApplyVO.description = this.info.description;
        obj.payApplyVO.actualAmount = this.info.actualAmount;
        obj.payApplyVO.agencyId = this.info.agencyId;
        obj.payApplyVO.agencyName = this.info.agencyName;
        obj.payApplyVO.applyAmount = this.info.applyAmount;
        obj.payApplyVO.belongOrgId = this.info.belongOrgId;
        obj.payApplyVO.belongOrgName = this.info.belongOrgName;
        obj.payApplyVO.deductAmount = this.info.deductAmount;
        obj.payApplyVO.finedAmount = this.info.finedAmount;
        obj.payApplyVO.invoiceType = this.info.invoiceType;
        obj.payApplyVO.makerId = this.info.makerId;
        obj.payApplyVO.makerTime = this.info.makerTime;
        obj.payApplyVO.noTaxAmount = this.info.noTaxAmount;
        obj.payApplyVO.projectId = this.info.projectId;
        obj.payApplyVO.projectName = this.info.projectName;
        obj.payApplyVO.receiveAccount = this.info.receiveAccount;
        obj.payApplyVO.status = val;
        obj.payApplyVO.tax = this.info.tax;
        obj.payApplyVO.taxRate = Number(this.info.taxRate);
        obj.otherDeductionDetailCalculationRequestList = this.info.otherDeductionDetailResponseList;
        obj.payApplyDetailList = this.info.payApplyDetailList;
        obj.payDeductDetailCalculationRequestList = this.info.payDeductDetailResponseList;
        // obj.payApplyVO.area = this.info.area;
        // obj.payApplyVO.areaId = this.info.areaId;
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
          obj.documentList = arr.map((v: any) => ({
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

        // 假数据
        obj.payApplyVO.areaId = 15;
        obj.payApplyVO.belongOrgId = 15;
        if (this.$route.name === "payoffAdd") {
          await post_payApply_entryApply(obj);
        } else if (this.$route.name === "payoffEdit") {
          obj.payApplyVO.id = this.payoffId;
          obj.applyCode = this.info.applyCode;
          await post_payApply_updateApply(obj);
        }
        this.$goto({ path: `/payoff/list` });
        this.$message({
          type: "success",
          message: val === "Unconfirm" ? "保存成功!" : "提交成功!",
        });
      }
    });
  }
}
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.inputClass {
  /deep/ .el-textarea__inner,
  /deep/ .el-input__inner {
    border: none;
  }
}
</style>