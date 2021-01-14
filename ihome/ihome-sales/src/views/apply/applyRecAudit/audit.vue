<!--
 * @Description: 请佣申请审核详情
 * @version: 
 * @Author: ywl
 * @Date: 2021-01-14 19:09:51
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-14 19:28:18
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
              {{applyNo}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目名称">
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="甲方公司">

            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款公司">
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款账号">
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开票税率">
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请人">
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请日期">
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <p class="ih-info-title">待请款列表</p>
      <div class="padding-left-20">
        <el-table
          style="width: 100%"
          :data="form.dealList"
          class="deal-table"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            prop="dealCode"
            label="成交报告编号"
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
              <el-input
                v-model="row.subMoney"
                v-digits="2"
                clearable
              />
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
        </el-table>
      </div>
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
    </template>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class ApplyAudit extends Vue {
  private form: any = {};
}
</script>
