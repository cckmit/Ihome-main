<!--
 * @Description: 发起请佣申请页
 * @version: 
 * @Author: ywl
 * @Date: 2021-01-07 16:30:03
 * @LastEditors: ywl
 * @LastEditTime: 2021-03-17 15:44:04
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
                :value="applyNo"
                placeholder="保存后自动生成"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目名称">
              <IhSelectPageByProject
                v-model="form.proId"
                :searchName="paramProName"
                placeholder="请选择联动项目"
                @changeOption="(data) => {
                  dealParams.proId = data.proId;
                }"
              ></IhSelectPageByProject>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事业部">
              <IhSelectPageDivision
                v-model="form.orgId"
                placeholder="请选择所在事业部"
              ></IhSelectPageDivision>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="甲方公司">
              <IhSelectPageByDeveloper
                v-model="form.developId"
                :searchName="paramDevName"
                placeholder="请选择甲方公司"
                @changeOption="(data) => {
                  dealParams.developId = data.id;
                  form.developName = data.name;
                  getWaitList(data.id)
                }"
              ></IhSelectPageByDeveloper>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款公司">
              <IhSelectPageByCompany
                v-model="form.polyCompanyId"
                placeholder="请选择收款公司"
                clearable
                @changeOption="(data) => {
                  dealParams.polyCompanyId = data.id
                  form.sellerTaxNo = data.creditCode
                  getAccount(data.id)
                }"
              ></IhSelectPageByCompany>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款账号">
              <el-select
                v-model="accountData"
                class="width--100"
                placeholder="请选择收款账号"
                value-key="id"
                ref="accountSelect"
                @visible-change="selectVisibleChange"
                @change="(data) => {
                  dealParams.receAccountId = data.id
                  form.receAccountId = data.id
                  getBankInfo(data.id)
                }"
              >
                <el-option
                  v-for="(i, n) in accountList"
                  :key="n"
                  :label="i.accountName"
                  :value="i"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发票类型">
              <el-select
                v-model="form.billTypeCode"
                class="width--100"
                placeholder="请选择开票类型"
                clearable
              >
                <el-option
                  v-for="(i, n) in $root.dictAllList('InvoiceOperationType')"
                  :key="n"
                  :value="i.code"
                  :label="i.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发票税率">
              <el-input
                v-model="form.taxRate"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请人">
              <el-input
                v-model="form.applyUserName"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请日期">
              <el-input disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <p class="ih-info-title">
        <span>待请款列表</span>
        <el-button
          type="primary"
          class="add-account"
          size="small"
          @click="handleAddDeal()"
        >添加成交报告</el-button>
      </p>
      <div class="padding-left-20">
        <el-table
          style="width: 100%"
          :data="form.dealList"
          class="deal-table"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            prop="序号"
            type="index"
            width="50"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="dealCode"
            label="项目周期"
            min-width="170"
          ></el-table-column>
          <el-table-column
            label="成交单位"
            min-width="150"
          >
            <template v-slot="{ row }">
              <span>{{`${row.proName}-${row.buildingName}-${row.roomName}`}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="area"
            label="成交面积"
          ></el-table-column>
          <el-table-column label="合同类型">
            <template v-slot="{ row }">
              {{$root.dictAllName(row.contType, 'ContType')}}
            </template>
          </el-table-column>
          <el-table-column
            prop="subscribeDate"
            label="认购日期"
            width="125"
          ></el-table-column>
          <el-table-column
            prop="signDate"
            label="签约日期"
            width="125"
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
                <div>系统计算本次可提金额: {{row.canApplyAmountNow}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="本次请款金额"
            width="150"
          >
            <template v-slot="{ row }">
              <el-input
                v-model="row.applyMoney"
                v-digits="2"
                clearable
              />
            </template>
          </el-table-column>
          <el-table-column
            label="本次扣除金额"
            width="150"
          >
            <template v-slot="{ row }">
              <el-input-number
                v-model="row.subMoney"
                controls-position="right"
                :min="0"
                v-digits="2"
                clearable
                class="width--100"
              ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column
            label="扣除项类别"
            width="150"
          >
            <template v-slot="{ row }">
              <el-input
                v-model="row.subType"
                clearable
              />
            </template>
          </el-table-column>
          <el-table-column
            label="本次实际请款金额"
            min-width="175"
          >
            <template v-slot="{ row }">
              <div>
                <div>不含税金额: {{noTaxMoneySum(row)}}</div>
                <div>税额: {{taxMoneySum(row)}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="客户姓名"
            prop="customerName"
            width="135"
          ></el-table-column>
          <el-table-column label="签约类型">
            <template v-slot="{ row }">
              {{$root.dictAllName(row.signType, 'SignUp')}}
            </template>
          </el-table-column>
          <el-table-column
            label="合同编号"
            prop="propertyNo"
          ></el-table-column>
          <el-table-column
            label="签约总价/元"
            width="135"
            prop="signPrice"
          ></el-table-column>
          <el-table-column
            label="中介公司"
            prop="channelName"
          ></el-table-column>
          <el-table-column
            label="是否已达到请佣条件"
            width="150"
          >
            <template v-slot="{ row }">
              {{row.isCanApply ? '是' : '否'}}
            </template>
          </el-table-column>
          <el-table-column
            label="代理公司"
            prop="oneAgentTeamName"
            width="150"
          >
            <template v-slot="{ row }">
              <el-input
                v-model="row.oneAgentTeamName"
                clearable
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
              />
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="80"
          >
            <template v-slot="{ $index }">
              <el-link
                type="danger"
                @click="dealRemove($index)"
              >移除</el-link>
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
            <td class="width-150">本批未提金额</td>
            <td width="150">{{totalNoReceiveAmount}}</td>
            <td class="width-150">本批申请请款金额</td>
            <td width="150">{{totalApplyMoney}}</td>
            <td class="width-150">本批扣除金额</td>
            <td width="150">{{totalSubMoney}}</td>
            <td class="width-150">本批实际请款金额</td>
            <td width="150">{{totalApplyMoney - totalSubMoney}}</td>
          </tr>
        </table>
      </div>
      <p class="ih-info-title">甲方公司应扣除代理费明细</p>
      <div class="padding-left-20">
        <el-table
          style="width: 100%"
          :data="agencyList"
          show-summary
          :summary-method="getSummaries"
        >
          <el-table-column label="成交报告编号">
            <template v-slot="{ row }">
              {{ row.suppDealCode || row.dealCode }}
            </template>
          </el-table-column>
          <el-table-column
            label="项目名称"
            prop="proName"
          ></el-table-column>
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
            label="扣除代理费"
            prop="subMoney"
          >
            <template v-slot="{ row }">
              {{-row.subMoney}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="120"
            fixed="right"
          >
            <template v-slot="{ row }">
              <el-link
                type="danger"
                v-if="row.id"
              >移除</el-link>
              <span v-else>--</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="padding-left-20">
        <br />
        <el-button
          type="primary"
          class="width--100"
          :loading="uploadLoad"
          @click="handleUpdateInfo()"
        >点击刷新预览项目周期请款汇总信息和请款信息</el-button>
      </div>
      <br />
      <p class="ih-info-title">项目周期请款汇总</p>
      <div class="padding-left-20">
        <el-table
          style="width: 100%"
          :data="form.termList"
          show-summary
        >
          <el-table-column
            label="周期名称"
            prop="termName"
            min-width="185"
          ></el-table-column>
          <el-table-column
            label="所属项目"
            prop="proName"
            min-width="165"
          ></el-table-column>
          <el-table-column
            label="累计请款次数"
            min-width="115"
            prop="hisSumApplyNum"
          ></el-table-column>
          <el-table-column
            label="历史已申请请款金额（含税）"
            min-width="205"
            prop="hisSumApplyMoney"
          ></el-table-column>
          <el-table-column
            label="累计扣除金额（含税）"
            min-width="180"
            prop="hisSumSubMoney"
          ></el-table-column>
          <el-table-column
            label="历史实际请款金额（含税）"
            min-width="205"
            prop="hisSumActMoney"
          ></el-table-column>
          <el-table-column
            label="已回款金额（含税）"
            min-width="180"
            prop="hisSumReceMoney"
          ></el-table-column>
          <el-table-column
            label="本次实际请款金额（含税）"
            min-width="205"
            prop="actMoney"
          ></el-table-column>
          <el-table-column
            label="累计实际请款金额（含税）"
            min-width="205"
            prop="sumActMoney"
          ></el-table-column>
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
            <td class="width-150">{{form.lastApplyNo}}</td>
          </tr>
          <tr>
            <td class="width-150">本次请款金额</td>
            <td class="width-150">{{totalApplyMoney}}</td>
            <td class="width-150">本次扣除金额</td>
            <td class="width-150">{{subMoneySum()}}</td>
            <td class="width-150">本次扣罚金额</td>
            <td class="width-150 padding-0">
              <el-input
                v-model="form.fineMoney"
                v-digits="2"
                clearable
              />
            </td>
          </tr>
          <tr>
            <td>扣罚项类别</td>
            <td
              colspan="5"
              class="padding-0"
            >
              <el-input
                v-model="form.fineType"
                placeholder="如有扣罚请录入扣罚项类别"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td class="width-150">本次实际请款金额（含税）</td>
            <td class="width-150">{{actMoneyTaxSum()}}</td>
            <td class="width-150">本次实际请款金额（不含税）</td>
            <td class="width-150">{{actMoneySum()}}</td>
            <td class="width-150">本次实际请款税额</td>
            <td class="width-150">{{totalTaxMoneySum()}}</td>
          </tr>
          <tr>
            <td class="width-150">累计实际请款金额</td>
            <td class="width-150">{{totalActMoneyTax}}</td>
            <td class="width-150">累计实际请款不含税金额</td>
            <td class="width-150">{{totalActMoney}}</td>
            <td class="width-150">累计实际请款税额</td>
            <td class="width-150">{{totalTaxMoney}}</td>
          </tr>
          <tr>
            <td class="width-150">发票类型</td>
            <td class="width-150 padding-0">
              <el-select
                v-model="form.billTypeCode"
                class="width--100"
              >
                <el-option
                  v-for="(i, n) in $root.dictAllList('InvoiceType')"
                  :key="n"
                  :label="i.name"
                  :value="i.code"
                ></el-option>
              </el-select>
            </td>
            <td class="width-150">开票税率</td>
            <td class="width-150">{{form.taxRate}}</td>
            <td class="width-150">纳税人识别号</td>
            <td class="width-150">{{form.sellerTaxNo}}</td>
          </tr>
          <tr>
            <td>收款单位名称</td>
            <td colspan="5">{{form.sellerName}}</td>
          </tr>
          <tr>
            <td class="width-150">开户行</td>
            <td colspan="5">{{form.sellerOpeningBankBranch}}</td>
            <!-- <td class="width-150">银行</td>
            <td class="width-150">{{form.sellerOpeningBankType}}</td>
            <td class="width-150">支行</td>
            <td class="width-150">{{form.sellerOpeningBankBranch}}</td> -->
          </tr>
          <tr>
            <td>银行帐号</td>
            <td colspan="5">{{form.sellerBankAccount}}</td>
          </tr>
          <tr>
            <td>经办部门意见</td>
            <td
              colspan="5"
              class="padding-0"
            >
              <el-input
                type="textarea"
                :rows="4"
                v-model="form.remark"
                resize="none"
                placeholder="请输入内容"
              ></el-input>
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
                size="100px"
                @newFileList="queryNew"
              ></IhUpload>
            </template>
          </el-table-column>
        </el-table>
        <br />
      </div>
      <div
        class="padding-left-20"
        v-if="form.status === 'InvoiceApply'"
      >
        <el-alert
          type="warning"
          center
        >
          <template #title>
            <div class="text-center">发起开票申请提示</div>
          </template>
          <template>
            <div class="text-center">没有修改请款申请单信息请点击“发起开票申请”按钮发起申请。</div>
            <div class="text-center">如修改了请款申请单信息请点击“保存并发起开票申请”按钮发起申请。</div>
          </template>
        </el-alert>
        <br />
      </div>
      <div class="text-center">
        <el-button
          type="primary"
          v-if="form.status === 'BusinessDepart'"
          @click="cancel()"
        >撤销</el-button>
        <template v-else-if="form.status === 'InvoiceApply'">
          <el-button
            type="success"
            @click="invoiceApply()"
          >发起开票申请</el-button>
          <el-button
            type="primary"
            @click="submit('SaveAndInvoiceApply')"
          >保存并发起开票申请</el-button>
        </template>
        <template v-else>
          <el-button
            type="primary"
            @click="submit('')"
          >暂存</el-button>
          <el-button
            type="success"
            @click="submit('Submit')"
          >提交</el-button>
        </template>
        <el-button @click="$router.go(-1)">返回</el-button>
      </div>
    </template>
    <IhDialog :show="selectVisible">
      <SelectDeal
        :params="dealParams"
        :hasCheckedData="form.dealList"
        @cancel="() => (selectVisible = false)"
        @finish="dealConfirm"
      />
    </IhDialog>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SelectDeal from "./dialog/selectDeal.vue";
import {
  get_bankAccount_get__companyId,
  get_bankAccount_getBankInfoByAccountId__accountId,
} from "../../../api/finance/index";
import {
  // get_devDeductDetail_getListAllByWait__developId,
  // post_applyRecDeal_getTermTotalList,
  // post_applyRec_getHisRec,
  post_applyRec_save,
  get_applyRec_getApplyRecById__applyId,
  get_applyRecDeal_getAll__applyId,
  get_applyRecDealTerm_getAll__applyId,
  // get_devAgentFee_getAll__applyId,
  post_applyRecFile_getAll,
  post_applyRec_cancel__applyId,
  // post_applyRec_InvoiceApply__applyId,
} from "../../../api/apply/index";

@Component({
  components: { SelectDeal },
})
export default class ApplyRecAdd extends Vue {
  private form: any = {
    applyTime: null,
    applyUserName: null,
    developId: null,
    developName: null,
    polyCompanyId: null,
    receAccountId: null,
    proId: null,
    orgId: null,
    branchNo: null,
    sellerTaxNo: null,
    taxRate: null,
    remark: null,
    sellerBankAccount: null,
    sellerName: null,
    sellerOpeningBankBranch: null,
    sellerOpeningBankType: null,
    fineType: null,
    lastApplyNo: null,
    billTypeCode: null,
    applyMoney: 0, // 本次请款金额
    subMoney: 0, // 本次扣除金额
    fineMoney: 0, // 本次扣罚金额
    actMoneyTax: 0, // 本次实际请款金额(含税)
    actMoney: 0, // 本次实际请款金额(不含税)
    taxMoney: 0, // 本次实际请款税额
    sumActMoneyTax: 0, // 累计实际请款金额 - 添加时要算
    sumActMoney: 0, // 累计实际请款不含税金额 - 添加时要算
    sumTaxMoney: 0, // 累计实际请款税额 - 添加时要算
    agentFeeFromDeductIdList: [],
    // devAgentFeeAddFromPageVO: {
    //   applyRecDealList: [],
    //   devDeductDetailIdList: [],
    // },
    dealList: [],
    termList: [],
    fileList: {
      fileList: [],
    },
    status: null,
  };
  private fileListType: any = [];
  private submitFile: any = {};
  private hisInfo: any = {
    lastApplyNo: null,
    sumActMoney: 0,
    sumActMoneyTax: 0,
    sumTaxMoney: 0,
  };
  private accountData: any = null;
  private selectVisible = false;
  private accountList: any = [];
  private dealParams: any = {
    developId: null,
    polyCompanyId: null,
    receAccountId: null,
    proId: null,
  };
  private waitList: any = [];
  private uploadLoad = false;
  private paramDevName: any = "";
  private paramProName: any = "";
  private applyNo: any = null;

  private get agencyList() {
    // 应扣除代理费明细
    this.form.agentFeeFromDeductIdList = this.waitList.map((i: any) => i.id);
    let list = this.form.dealList
      .filter((val: any) => this.$math.tofixed(parseFloat(val.subMoney), 2) > 0)
      .map((i: any) => ({
        dealCode: i.dealCode,
        dealId: i.id,
        developId: this.form.developId,
        proId: i.proId,
        proName: i.proName,
        subMoney: i.subMoney,
        subType: i.subType,
        termId: i.termId,
        termName: i.termName,
      }));
    // this.form.devAgentFeeAddFromPageVO.applyRecDealList = list;
    return this.waitList.concat(list);
  }
  private get totalNoReceiveAmount() {
    let sum = 0;
    this.form.dealList.forEach((i: any) => {
      sum += i.noReceiveAmount;
    });
    return sum;
  }
  private get totalApplyMoney() {
    let sum = 0;
    this.form.dealList.forEach((i: any) => {
      sum += parseFloat(i.applyMoney) || 0;
    });
    // this.form.applyMoney = sum;
    return sum;
  }
  private get totalSubMoney() {
    let sum = 0;
    this.form.dealList.forEach((i: any) => {
      sum += parseFloat(i.subMoney) || 0;
    });
    return sum;
  }

  private get totalActMoneyTax() {
    let sum =
      (parseFloat(this.actMoneyTaxSum()) || 0) +
      (parseFloat(this.hisInfo.sumActMoneyTax) || 0);
    // this.form.sumActMoneyTax = sum.toFixed(2);
    return sum.toFixed(2);
  }
  private get totalActMoney() {
    let sum =
      (parseFloat(this.actMoneySum()) || 0) +
      (parseFloat(this.hisInfo.sumActMoney) || 0);
    // this.form.sumActMoney = sum.toFixed(2);
    return sum.toFixed(2);
  }
  private get totalTaxMoney() {
    let sum =
      (parseFloat(this.totalTaxMoneySum()) || 0) +
      (parseFloat(this.hisInfo.sumTaxMoney) || 0);
    // this.form.sumTaxMoney = sum.toFixed(2);
    return sum.toFixed(2);
  }
  private noTaxMoneySum(row: any) {
    // 计算不含税金额
    let num =
      (parseFloat(row.applyMoney) || 0) - (parseFloat(row.subMoney) || 0);
    let num2 = (parseFloat(row.taxRate) || 0) + 1;
    row.noTaxMoney = parseFloat((num / num2).toFixed(2));
    return row.noTaxMoney;
  }
  private taxMoneySum(row: any) {
    // 计算税额
    let num =
      (parseFloat(row.applyMoney) || 0) - (parseFloat(row.subMoney) || 0);
    row.taxMoney = parseFloat(
      (num - (parseFloat(row.noTaxMoney) || 0)).toFixed(2)
    );
    return row.taxMoney;
  }
  private subMoneySum() {
    let sum = 0;
    this.agencyList.forEach((i: any) => {
      sum += parseFloat(i.subMoney) || 0;
    });
    // this.form.subMoney = sum.toFixed(2);
    return sum.toFixed(2);
  }
  private actMoneyTaxSum() {
    let sum = 0;
    sum =
      (this.totalApplyMoney || 0) -
      (parseFloat(this.subMoneySum()) || 0) -
      (parseFloat(this.form.fineMoney) || 0);
    // this.form.actMoneyTax = sum.toFixed(2);
    return sum.toFixed(2);
  }
  private actMoneySum() {
    let sum = 0;
    sum =
      (parseFloat(this.actMoneyTaxSum()) || 0) /
      (1 + (parseFloat(this.form.taxRate) || 0));
    // this.form.actMoney = sum.toFixed(2);
    return sum.toFixed(2);
  }
  private totalTaxMoneySum() {
    let sum =
      (parseFloat(this.actMoneyTaxSum()) || 0) -
      (parseFloat(this.actMoneySum()) || 0);
    // this.form.taxMoney = sum.toFixed(2);
    return sum.toFixed(2);
  }
  /**
   * @description: 甲方公司应扣除代理费明细合计
   * @param {*} param
   * @return {array} sums
   */
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
  private selectVisibleChange(val: any) {
    if (val && !this.form.polyCompanyId) {
      (this.$refs.accountSelect as any).blur();
      this.$message.warning("请先选择收款公司");
    }
  }
  private handleAddDeal() {
    if (
      this.dealParams.developId &&
      this.dealParams.polyCompanyId &&
      this.dealParams.receAccountId &&
      this.dealParams.proId
    ) {
      this.selectVisible = true;
    } else {
      this.$message.warning("请先选择项目名称, 甲方公司, 收款公司和收款账号");
    }
  }
  private dealRemove(index: number) {
    this.form.dealList.splice(index, 1);
  }
  private async getWaitList(developId: any) {
    try {
      // this.waitList = await get_devDeductDetail_getListAllByWait__developId({
      //   developId,
      // });
    } catch (error) {
      console.log(error);
    }
  }
  private dealConfirm(arr: any) {
    this.selectVisible = false;
    this.form.dealList = arr.map((i: any) => ({
      applyMoney: i.canApplyAmountNow,
      noTaxMoney: 0,
      subMoney: 0,
      taxMoney: 0,
      remark: null,
      subType: null,
      fromDealId: i.id,
      taxRate: this.form.taxRate,
      ...i,
    }));
  }
  private tableRowClassName({ row }: any) {
    let className = row.isCanApply ? "" : "red-row";
    return className;
  }
  private async getAccount(companyId: any) {
    this.accountList = await get_bankAccount_get__companyId({ companyId });
  }
  private async getBankInfo(accountId: any) {
    const info = await get_bankAccount_getBankInfoByAccountId__accountId({
      accountId,
    });
    this.form.branchNo = info.branchNo;
    this.form.taxRate = info.taxRate;
    this.form.sellerOpeningBankBranch = info.branchName;
    this.form.sellerOpeningBankType = info.bankName;
    this.form.sellerBankAccount = info.accountNo;
    this.form.sellerName = info.accountName;
  }
  private async handleUpdateInfo() {
    if (
      this.dealParams.developId &&
      this.dealParams.polyCompanyId &&
      this.dealParams.receAccountId &&
      this.form.dealList.length
    ) {
      try {
        await this.getTermTotalList({
          developId: this.dealParams.developId,
          polyCompanyId: this.dealParams.polyCompanyId,
          termProList: this.form.dealList.map((i: any) => ({
            proId: i.proId,
            termId: i.termId,
          })),
        });
        await this.getHisRec({
          developId: this.dealParams.developId,
          polyCompanyId: this.dealParams.polyCompanyId,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      this.$message.warning("请完成上面操作再更新页面");
    }
  }
  /**
   * @description: 加载项目周期请款汇总数据
   * @param {*} param
   */
  private async getTermTotalList(param: any) {
    try {
      // let list = await post_applyRecDeal_getTermTotalList(param);
      // console.log(list);
      // this.form.termList = list.map((i: any) => {
      //   let actMoney = 0;
      //   this.form.dealList
      //     .filter((item: any) => item.termId === i.termId)
      //     .forEach((newItem: any) => {
      //       parseFloat(
      //         (actMoney += newItem.noTaxMoney + newItem.taxMoney)
      //       ).toFixed(2);
      //     });
      //   return {
      //     ...i,
      //     actMoney,
      //     sumActMoney: parseFloat(i.hisSumActMoney + actMoney).toFixed(2),
      //   };
      // });
    } catch (error) {
      console.log(error);
    }
  }
  private async getHisRec(param: any) {
    try {
      // const res = await post_applyRec_getHisRec(param);
      // console.log(res);
      // this.hisInfo = res;
      // this.form.lastApplyNo = res.lastApplyNo;
    } catch (error) {
      console.log(error);
    }
  }
  queryNew(data: any, type?: any) {
    let obj: any = {};
    obj[type] = data;
    this.submitFile = { ...this.submitFile, ...obj };
  }
  getFileListType(data: any) {
    const list = (this.$root as any)
      .dictAllList("ApplyFileType")
      .filter((i: any) => !i.code.includes("PDF"));
    console.log(list);
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
    let obj: any = {};
    this.fileListType.forEach((h: any) => {
      obj[h.code] = h.fileList;
    });
    this.submitFile = { ...obj };
  }
  private async submit(type: any) {
    console.log(type);
    this.form.op = type;
    this.form.applyMoney = this.totalApplyMoney;
    this.form.sumActMoneyTax = this.totalActMoneyTax;
    this.form.sumActMoney = this.totalActMoney;
    this.form.sumTaxMoney = this.totalTaxMoney;
    this.form.subMoney = this.subMoneySum();
    this.form.actMoneyTax = this.actMoneyTaxSum();
    this.form.actMoney = this.actMoneySum();
    this.form.taxMoney = this.totalTaxMoneySum();
    this.form.termList = this.form.termList.map((i: any) => ({
      developId: this.dealParams.developId,
      polyCompanyId: this.dealParams.polyCompanyId,
      receAccountId: this.dealParams.receAccountId,
      ...i,
    }));

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
      this.form.fileList.fileList = arr.map((v: any) => ({
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

    console.log(this.form);

    try {
      await post_applyRec_save(this.form);
      let msg = "";
      switch (type) {
        case "SaveAndInvoiceApply":
          msg = "保存并发起开票申请";
          break;
        case "":
          msg = "暂存";
          break;
        default:
          msg = "提交";
          break;
      }
      this.$message.success(`${msg}成功`);
      this.$goto({
        path: "/applyRec/list",
      });
    } catch (error) {
      console.log(error);
    }
  }
  private async cancel() {
    try {
      await post_applyRec_cancel__applyId({ applyId: this.form.id });
      this.$message.success("撤销成功");
      this.$goto({
        path: "/applyRec/list",
      });
    } catch (error) {
      console.log(error);
    }
  }
  private async invoiceApply() {
    let applyId = this.$route.query.id;
    try {
      // await post_applyRec_InvoiceApply__applyId({ applyId });
      this.$message.success("发起开票成功");
      this.$goto({
        path: "/applyRec/list",
      });
    } catch (error) {
      console.log(error);
    }
  }
  private async getInfo(applyId: any) {
    try {
      const info = await get_applyRec_getApplyRecById__applyId({ applyId });
      this.paramDevName = info.developName;
      this.paramProName = info.proName;
      this.applyNo = info.applyNo;
      this.getAccount(info.polyCompanyId);
      this.accountData = { id: info.receAccountId };
      this.form = { ...this.form, ...info };
      this.dealParams = {
        developId: info.developId,
        polyCompanyId: info.polyCompanyId,
        receAccountId: info.receAccountId,
        proId: info.proId,
      };
      let dealList = await get_applyRecDeal_getAll__applyId({ applyId });
      this.form.dealList = dealList.map((i: any) => ({
        taxRate: info.taxRate,
        ...i,
      }));
      this.form.termList = await get_applyRecDealTerm_getAll__applyId({
        applyId,
      });
      // let feeList = await get_devAgentFee_getAll__applyId({ applyId });
      // console.log(feeList);

      if (this.form.status === "Draft") {
        await this.getHisRec({
          developId: info.developId,
          polyCompanyId: info.polyCompanyId,
        });
      }
      console.log(this.form);
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
    } else {
      this.getFileListType([]);
      this.form.applyUserName = (this.$root as any).userInfo.name;
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
