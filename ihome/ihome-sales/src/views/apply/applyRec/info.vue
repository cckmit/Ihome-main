<!--
 * @Description: 查看请佣详情
 * @version: 
 * @Author: ywl
 * @Date: 2021-01-15 15:29:09
 * @LastEditors: ywl
 * @LastEditTime: 2021-02-09 14:55:31
-->
<template>
  <IhPage class="text-left">
    <template #info>
      <p class="ih-info-title">请款申请单信息</p>
      <el-form
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="请款申请单号">
              <el-input
                :value="form.applyNo"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目名称">
              <el-input
                :value="form.proName"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事业部">
              <IhSelectPageDivision
                v-model="form.orgId"
                placeholder="请选择所在事业部"
                disabled
              ></IhSelectPageDivision>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="甲方公司">
              <el-input
                :value="form.developName"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="甲方开票帐号">
              <el-input
                v-model="form.developAccount"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款公司">
              <IhSelectPageByCompany
                v-model="form.polyCompanyId"
                placeholder="请选择收款公司"
                clearable
                disabled
              ></IhSelectPageByCompany>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款账号">
              <el-input
                class="width--100"
                v-model="form.receBankAccount"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发票类型">
              <el-select
                v-model="form.billTypeCode"
                class="width--100"
                placeholder="请选择开票类型"
                disabled
                clearable
              >
                <el-option
                  v-for="(i, n) in $root.dictAllList('InvoiceType')"
                  :key="n"
                  :value="i.code"
                  :label="i.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开票税率">
              <el-input
                :value="form.taxRate | percent"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请人">
              <el-input
                :value="form.applyUserName"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请日期">
              <el-input
                v-model="form.applyTime"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <p class="ih-info-title">待请款列表</p>
      <div class="padding-left-20">
        <el-table
          style="width: 100%"
          :data="dealList"
          class="deal-table"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            label="序号"
            type="index"
            width="50"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="termName"
            label="项目周期"
            min-width="170"
          ></el-table-column>
          <el-table-column
            label="成交信息"
            min-width="280"
          >
            <template v-slot="{ row }">
              <div>成交报告编号：{{row.dealCode}}</div>
              <div v-if="row.buildingName && row.roomName">成交单位：{{`${row.proName}-${row.buildingName}-${row.roomName}`}}</div>
              <div v-else>成交单位：{{`${row.proName}-`}}</div>
              <div>成交面积：{{row.area}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="合同/签约类型"
            min-width="155"
          >
            <template v-slot="{ row }">
              <div>合同类型：{{$root.dictAllName(row.contType, 'ContType')}}</div>
              <div>签约类型：{{$root.dictAllName(row.signType, 'SignUp')}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="认购/签约日期"
            width="165"
          >
            <template v-slot="{ row }">
              <div>认购时间：{{row.subscribeDate}}</div>
              <div>签约时间：{{row.signDate}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="签约总价(元)"
            width="120"
            prop="signPrice"
          ></el-table-column>
          <el-table-column
            label="提佣金额"
            min-width="200"
          >
            <template v-slot="{ row }">
              <div>
                <div>应提金额: {{row.receiveAmount}}</div>
                <div>已提金额: {{row.receivedAmount}}</div>
                <div>未提金额: {{row.noReceiveAmount}}</div>
                <div>已提未回款金额: {{row.noConfirmAmount}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="系统计算本次可提金额"
            width="175"
            prop="canApplyAmountNow"
          ></el-table-column>
          <el-table-column
            label="本次请款金额"
            width="150"
          >
            <template v-slot="{ row }">
              <el-input
                v-model="row.applyMoney"
                v-digits="2"
                clearable
                disabled
              />
            </template>
          </el-table-column>
          <el-table-column
            label="不含税金额"
            min-width="120"
          >
            <template v-slot="{ row }">
              <span>{{row.noTaxMoney}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="税额"
            min-width="100"
          >
            <template v-slot="{ row }">
              <span>{{row.taxMoney}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="本次请款比例"
            min-width="155"
          >
            <template v-slot="{ row }">
              {{row.applyPercent | percent}}
            </template>
          </el-table-column>
          <el-table-column
            label="客户姓名"
            prop="customerName"
            width="135"
          ></el-table-column>
          <el-table-column
            label="预售合同编号"
            width="120"
          >
            <template v-slot="{ row }">
              {{row.propertyNo || '-'}}
            </template>
          </el-table-column>
          <el-table-column
            label="是否已达到请佣条件"
            width="150"
          >
            <template v-slot="{ row }">
              {{row.isCanApply ? '是' : '否'}}
            </template>
          </el-table-column>
          <el-table-column
            label="中介公司"
            prop="channelName"
          ></el-table-column>
          <el-table-column
            label="代理公司"
            prop="oneAgentTeamName"
            width="150"
          >
            <template v-slot="{ row }">
              <el-input
                v-model="row.oneAgentTeamName"
                clearable
                disabled
              />
            </template>
          </el-table-column>
          <el-table-column
            label="中介业务员"
            prop="channelAgentName"
            width="150"
          >
            <template v-slot="{ row }">
              <el-input
                v-model="row.channelAgentName"
                clearable
                disabled
              />
            </template>
          </el-table-column>
          <el-table-column
            label="项目现场销售"
            prop="sceneSales"
            width="150"
          >
            <template v-slot="{ row }">
              <el-input
                v-model="row.sceneSales"
                clearable
                disabled
              />
            </template>
          </el-table-column>
          <el-table-column
            label="备注"
            width="180"
          >
            <template v-slot="{ row }">
              <el-input
                v-model="row.remark"
                type="textarea"
                resize="none"
                clearable
                :rows="4"
                disabled
              />
            </template>
          </el-table-column>
        </el-table>
        <table
          class="apply-table"
          style="width: 100%"
        >
          <tr>
            <th colspan="8">合计</th>
          </tr>
          <tr>
            <td width="150">本批应提金额</td>
            <td width="150">{{totalReceive}}</td>
            <td width="150">本批已提金额</td>
            <td width="150">{{totalReceived}}</td>
            <td class="width-150">本批未提金额</td>
            <td width="150">{{totalNoReceiveAmount}}</td>
            <td class="width-150">本批已提未回款金额</td>
            <td width="150">{{totalNoConfirm}}</td>
          </tr>
          <tr>
            <td class="width-150">本批系统计算本次可提金额</td>
            <td width="150">{{totalApplyAmountNow}}</td>
            <td class="width-150">本批申请请款金额</td>
            <td width="150">{{totalApplyMoney}}</td>
            <td width="150">本批不含税金额</td>
            <td width="150">{{totalNoTaxMoneySum}}</td>
            <td width="150">本批税额</td>
            <td width="150">{{totalTax}}</td>
          </tr>
        </table>
      </div>
      <p class="ih-info-title">本期需抵扣金额明细</p>
      <div class="padding-left-20">
        <el-table
          style="width: 100%"
          :data="waitList"
          show-summary
          :summary-method="getSummaries"
        >
          <el-table-column label="成交报告编号">
            <template v-slot="{ row }">
              {{ row.suppDealCode || row.dealCode }}
            </template>
          </el-table-column>
          <el-table-column
            label="周期名称"
            prop="termName"
            min-width="180"
          ></el-table-column>
          <el-table-column label="抵扣项类别">
            <template v-slot="{ row }">
              {{ row.subType || $root.dictAllName(row.suppContType, 'SuppContType')}}
            </template>
          </el-table-column>
          <el-table-column
            label="扣除金额"
            prop="subMoney"
          >
            <template v-slot="{ row }">
              {{row.subMoney}}
            </template>
          </el-table-column>
          <el-table-column label="不含税金额">
          </el-table-column>
          <el-table-column label="税额">
          </el-table-column>
        </el-table>
      </div>
      <p class="ih-info-title">其他扣除项</p>
      <div class="padding-left-20">
        <el-table
          style="width: 100%"
          :data="otherSubList"
          show-summary
        >
          <el-table-column label="扣除类型">
            <template v-slot="{ row }">
              <el-select
                v-model="row.subType"
                disabled
              >
                <el-option
                  v-for="(i, n) in $root.dictAllList('ApplySubType')"
                  :key="n"
                  :label="i.name"
                  :value="i.code"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="项目周期">
            <template v-slot="{ row }">
              <el-input
                v-model="row.termName"
                disabled
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="本期扣除金额"
            prop="subMoney"
          >
            <template v-slot="{ row }">
              <el-input
                v-model="row.subMoney"
                v-digits="2"
                disabled
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="不含税金额"
            prop="subMoneyNoTax"
          >
            <template v-slot="{ row }">
              {{row.subMoneyNoTax}}
            </template>
          </el-table-column>
          <el-table-column
            label="税额"
            prop="subMoneyTax"
          >
            <template v-slot="{ row }">
              {{row.subMoney}}
            </template>
          </el-table-column>
          <el-table-column label="原因及扣罚依据">
            <template v-slot="{ row }">
              <el-input
                v-model="row.reason"
                disabled
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <p class="ih-info-title">请款汇总清单</p>
      <div class="padding-left-20">
        <el-table
          style="width: 100%"
          :data="termList"
          show-summary
        >
          <el-table-column
            label="周期名称"
            prop="termName"
            min-width="185"
          ></el-table-column>
          <el-table-column
            min-width="115"
            prop="hisSumApplyNum"
          >
            <template #header>
              <div>累计请款次数</div>
              <div>（不含本次）</div>
            </template>
          </el-table-column>
          <el-table-column
            min-width="180"
            prop="hisSumApplyMoney"
          >
            <template #header>
              <div>历史已申请请款金额</div>
              <div>（含税）</div>
            </template>
          </el-table-column>
          <el-table-column
            min-width="205"
            prop="hisSumActMoney"
          >
            <template #header>
              <div>历史实际请款金额</div>
              <div>（含税）</div>
            </template>
          </el-table-column>
          <el-table-column
            min-width="180"
            prop="hisSumReceMoney"
          >
            <template #header>
              <div>已回款金额</div>
              <div>（含税）</div>
            </template>
          </el-table-column>
          <el-table-column
            min-width="180"
            prop="applyMoney"
          >
            <template #header>
              <div>本期申请请款金额</div>
              <div>（含税）</div>
            </template>
          </el-table-column>
          <el-table-column
            min-width="180"
            prop="subMoney"
          >
            <template #header>
              <div>本期扣除金额</div>
              <div>（含税）</div>
            </template>
          </el-table-column>
          <el-table-column
            min-width="180"
            prop="fineMoney"
          >
            <template #header>
              <div>本期扣罚金额</div>
              <div>（含税）</div>
            </template>
          </el-table-column>
          <el-table-column
            min-width="180"
            prop="actMoney"
          >
            <template #header>
              <div>本期实际请款金额</div>
              <div>（含税）</div>
            </template>
          </el-table-column>
          <el-table-column
            min-width="180"
            prop="sumApplyMoney"
          >
            <template #header>
              <div>累计申请请款金额</div>
              <div>（含税）</div>
            </template>
          </el-table-column>
          <el-table-column
            min-width="180"
            prop="sumActMoney"
          >
            <template #header>
              <div>累计实际请款金额</div>
              <div>（含税）</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <p class="ih-info-title">请款信息</p>
      <div class="padding-left-20">
        <table
          class="apply-table bg-color"
          style="width: 100%"
        >
          <tr>
            <td class="width-150">请款单位名称</td>
            <td colspan="3">{{form.developName}}</td>
            <td class="width-150">上次请款单号</td>
            <td class="width-150">{{form.lastApplyNo || '--'}}</td>
          </tr>
          <tr>
            <td class="width-150">本次请款金额</td>
            <td class="width-150">{{form.applyMoney}}</td>
            <td class="width-150">本次扣除金额</td>
            <td class="width-150">{{form.subMoney}}</td>
            <td class="width-150">本次扣罚金额</td>
            <td class="width-150 padding-0">
              {{form.fineMoney}}
            </td>
          </tr>
          <tr>
            <td>扣罚项类别</td>
            <td colspan="5">
              {{form.fineType || '--'}}
            </td>
          </tr>
          <tr>
            <td class="width-150">本次实际请款金额（含税）</td>
            <td class="width-150">{{form.actMoneyTax}}</td>
            <td class="width-150">本次实际请款金额（不含税）</td>
            <td class="width-150">{{form.actMoney}}</td>
            <td class="width-150">本次实际请款税额</td>
            <td class="width-150">{{form.taxMoney}}</td>
          </tr>
          <tr>
            <td class="width-150">发票类型</td>
            <td class="width-150">
              {{$root.dictAllName(form.billTypeCode, 'InvoiceType')}}
            </td>
            <td class="width-150">开票税率</td>
            <td class="width-150">{{form.taxRate | percent}}</td>
            <td class="width-150">纳税人识别号</td>
            <td class="width-150">{{form.developTaxNo}}</td>
          </tr>
          <tr>
            <td>发票抬头</td>
            <td colspan="5">{{form.invoiceTitle}}</td>
          </tr>
          <tr>
            <td class="width-150">开户行</td>
            <td colspan="2">{{form.developOpenBank}}</td>
            <td class="width-150">银行帐号</td>
            <td colspan="2">{{form.developAccount}}</td>
          </tr>
          <tr>
            <td>住所(地址)</td>
            <td colspan="2">{{form.developAddress}}</td>
            <td>电话</td>
            <td colspan="2">{{form.developPhone}}</td>
          </tr>
          <tr>
            <td>经办部门意见</td>
            <td colspan="5">
              <div class="height-100 text-left padding-left-20">{{form.remark || '--'}}</div>
            </td>
          </tr>
        </table>
      </div>
      <p class="ih-info-title">上传附件</p>
      <div class="padding-left-20">
        <el-table
          style="width: 100%"
          :data="fileListType"
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
                :removePermi="false"
                size="100px"
              ></IhUpload>
            </template>
          </el-table-column>
        </el-table>
        <br />
      </div>
      <p class="ih-info-title">发票信息</p>
      <div class="padding-left-20">
        <el-table
          style="width: 100%"
          :data="invoiceList"
        >
          <el-table-column
            label="业务单号"
            prop="businessNo"
          ></el-table-column>
          <el-table-column
            label="发票抬头"
            prop="invoiceTitle"
          ></el-table-column>
          <el-table-column label="发票类型">
            <template v-slot="{ row }">
              {{$root.dictAllName(row.invoiceType, 'InvoiceType')}}
            </template>
          </el-table-column>
          <el-table-column
            label="发票金额（含税）"
            prop="amount"
            width="150"
          ></el-table-column>
          <el-table-column label="税率">
            <template v-slot="{ row }">
              {{row.taxRate | percent}}
            </template>
          </el-table-column>
          <el-table-column
            label="确认主营（不含税）"
            prop="noTax"
            width="200"
          ></el-table-column>
          <el-table-column
            label="税额"
            prop="tax"
          ></el-table-column>
          <el-table-column
            label="收款方"
            prop="payee"
          ></el-table-column>
          <el-table-column
            label="NC凭证号"
            prop="ncCode"
            width="120"
          ></el-table-column>
          <el-table-column label="开票状态">
            <template v-slot="{ row }">
              {{$root.dictAllName(row.status, 'InvoiceOperationStatus')}}
            </template>
          </el-table-column>
          <el-table-column
            label="开票日期"
            prop="operationDate"
            min-width="155"
          ></el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
          >
            <template v-slot="{  }">
              <el-link>详情</el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <p class="ih-info-title">
        <span>操作日志</span>
      </p>
      <div class="padding-left-20">
        <el-table
          style="width: 100%"
          :data="opLogList"
        >
          <el-table-column label="操作">
            <template v-slot="{ row }">
              {{$root.dictAllName(row.op, 'ApplyOpLog')}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作人"
            prop="opUserName"
          ></el-table-column>
          <el-table-column
            label="岗位"
            prop="opUserJob"
          ></el-table-column>
          <el-table-column
            label="操作时间"
            prop="opTime"
            width="165"
          ></el-table-column>
          <el-table-column label="处理结果">
            <template v-slot="{ row }">
              <span v-if="row.result">{{row.result}}</span>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column
            label="备注"
            prop="remark"
          ></el-table-column>
        </el-table>
      </div>
      <br />
      <div class="text-center">
        <el-button @click="$router.go(-1)">返回</el-button>
      </div>
    </template>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { get_invoice_getInvoiceInfo__businessCode } from "../../../api/finance/index";
import {
  get_applyRec_getApplyRecById__applyId,
  post_applyRecFile_getAll,
  get_applyRecDeal_getAll__applyId,
  get_applyRecDealTerm_getAll__applyId,
  get_opLog_getAllListByApplyId__applyId,
  get_devDeductRec_getAll__applyId,
  get_devOtherSub_getAll__applyId,
} from "../../../api/apply/index";

@Component({})
export default class ApplyAudit extends Vue {
  private form: any = {};
  private dealList: any = [];
  private agencyList: any = [];
  private termList: any = [];
  private fileListType: any = [];
  private opLogList: any = [];
  private waitList: any = [];
  private otherSubList: any = [];
  private invoiceList: any = [];

  private get totalReceive() {
    let sum = 0;
    this.dealList.forEach((i: any) => {
      sum += parseFloat(i.receiveAmount);
    });
    return this.$math.tofixed(sum, 2);
  }
  private get totalReceived() {
    let sum = 0;
    this.dealList.forEach((i: any) => {
      sum += parseFloat(i.receivedAmount);
    });
    return this.$math.tofixed(sum, 2);
  }
  private get totalNoConfirm() {
    let sum = 0;
    this.dealList.forEach((i: any) => {
      sum += parseFloat(i.noConfirmAmount);
    });
    return this.$math.tofixed(sum, 2);
  }
  private get totalApplyAmountNow() {
    let sum = 0;
    this.dealList.forEach((i: any) => {
      sum += parseFloat(i.canApplyAmountNow);
    });
    return this.$math.tofixed(sum, 2);
  }
  private get totalNoTaxMoneySum() {
    let sum = 0;
    this.dealList.forEach((i: any) => {
      sum += parseFloat(i.noTaxMoney);
    });
    return this.$math.tofixed(sum, 2);
  }
  private get totalTax() {
    let sum = 0;
    this.dealList.forEach((i: any) => {
      sum += parseFloat(i.taxMoney);
    });
    return this.$math.tofixed(sum, 2);
  }
  private get totalNoReceiveAmount() {
    let sum = 0;
    this.dealList.forEach((i: any) => {
      sum += i.noReceiveAmount;
    });
    return sum;
  }
  private get totalApplyMoney() {
    let sum = 0;
    this.dealList.forEach((i: any) => {
      sum += parseFloat(i.applyMoney) || 0;
    });
    // this.form.applyMoney = sum;
    return sum;
  }

  private getSummaries({ columns, data }: any) {
    const sums: any = [];
    columns.forEach((column: any, index: number) => {
      if (index === 0) {
        sums[index] = "合计";
        return;
      }
      const values = data.map((item: any) => Number(item[column.property]));
      if (!values.every((value: any) => isNaN(value))) {
        sums[index] = values.reduce((prev: any, curr: any) => {
          const value = Number(curr);
          if (!isNaN(value)) {
            return prev + curr;
          } else {
            return prev;
          }
        }, 0);
        sums[index] = `-${sums[index]}`;
      } else {
        sums[index] = "";
      }
    });
    return sums;
  }
  private tableRowClassName({ row }: any) {
    let className = row.isCanApply ? "" : "red-row";
    return className;
  }
  getFileListType(data: any) {
    const list = (this.$root as any)
      .dictAllList("ApplyFileType")
      .filter((i: any) => !i.code.includes("Pdf"));
    this.fileListType = list.map((i: any) => {
      return {
        ...i,
        fileList: data
          .filter((j: any) => j.type === i.code)
          .map((h: any) => ({
            ...h,
            name: h.fileName,
          })),
      };
    });
  }
  private async getInfo(applyId: any) {
    try {
      const info = await get_applyRec_getApplyRecById__applyId({ applyId });
      this.form = info;
      let dealList = await get_applyRecDeal_getAll__applyId({ applyId });
      this.dealList = dealList.map((i: any) => ({
        taxRate: info.taxRate,
        ...i,
      }));
      this.termList = await get_applyRecDealTerm_getAll__applyId({
        applyId,
      });
      // this.agencyList = await get_devAgentFee_getAll__applyId({ applyId });
      this.otherSubList = await get_devOtherSub_getAll__applyId({ applyId });
      this.waitList = await get_devDeductRec_getAll__applyId({ applyId });
      this.opLogList = await get_opLog_getAllListByApplyId__applyId({
        applyId,
      });
      let invoiceInfo = await get_invoice_getInvoiceInfo__businessCode({
        businessCode: info.applyNo,
      });
      this.invoiceList = [invoiceInfo];
      console.log(invoiceInfo);
    } catch (error) {
      console.log(error);
    }
  }

  async created() {
    let id = this.$route.query.id;
    if (id) {
      this.getInfo(id);
      let list = await post_applyRecFile_getAll({
        applyId: id,
        typeList: ["Contract", "Invoice", "ApplyReport"],
      });
      this.getFileListType(list);
    }
  }
}
</script>

<style lang="scss" scoped>
.ih-info-title {
  position: relative;
  .add-account {
    position: absolute;
    top: 0px;
    left: 120px;
    transform: translate(0, -30%);
  }
}
.deal-table {
  /deep/ .red-row {
    background-color: #fccccc;
  }
}
.apply-table {
  border-collapse: collapse;
  font-size: 14px;
  background-color: #f5f7fa;
  &.bg-color {
    background-color: #fff;
  }
  &,
  th,
  td {
    border: 1px solid #ebeef5;
  }
  th,
  td {
    padding: 10px 0;
    text-align: center;
  }
  .padding-0 {
    padding: 0;
  }
}
</style>
