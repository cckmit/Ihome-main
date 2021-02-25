<!--
 * @Description: 发起请佣申请页
 * @version: 
 * @Author: ywl
 * @Date: 2021-01-07 16:30:03
 * @LastEditors: ywl
 * @LastEditTime: 2021-02-25 18:18:25
-->
<template>
  <IhPage class="text-left">
    <template #info>
      <p class="ih-info-title">请款申请单信息</p>
      <el-form
        ref="ruleForm"
        label-width="120px"
        :rules="rules"
        :model="form"
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
            <el-form-item
              label="项目名称"
              prop="proId"
            >
              <IhSelectPageByProject
                v-model="form.proId"
                :searchName="paramProName"
                placeholder="请选择联动项目"
                @changeOption="(data) => {
                  dealParams.proId = data.proId;
                }"
                :params="{
                  auditEnum: 'Adopt'
                }"
              ></IhSelectPageByProject>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="事业部"
              prop="orgId"
            >
              <IhSelectPageDivision
                v-model="form.orgId"
                placeholder="请选择所在事业部"
                @changeOption="(data) => {
                  dealParams.termOrgId = data.id
                }"
              ></IhSelectPageDivision>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="甲方公司"
              prop="developId"
            >
              <IhSelectPageByDeveloper
                v-model="form.developId"
                :searchName="paramDevName"
                placeholder="请选择甲方公司"
                @changeOption="(data) => {
                  dealParams.developId = data.id;
                  form.developName = data.name;
                  form.invoiceTitle = data.name;
                  getWaitList(data.id)
                  getListAccount(data.id)
                }"
              ></IhSelectPageByDeveloper>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="甲方开票帐号"
              required
            >
              <el-select
                v-model="devAccountData"
                class="width--100"
                placeholder="请选择甲方开票帐号"
                value-key="bankId"
                @change="(data) => {
                  form.developAccount = data.number;
                  form.developAccountId = data.bankId;
                  getDevBankInfo(data.bankId);
                }"
              >
                <el-option
                  v-for="(i, n) in devAccount"
                  :key="n"
                  :label="i.number"
                  :value="i"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="收款公司"
              prop="polyCompanyId"
            >
              <IhSelectPageByPayer
                clearable
                placeholder="请选择收款公司"
                v-model="form.polyCompanyId"
                :proId="form.orgId"
                @changeOption="(data) => {
                  dealParams.polyCompanyId = data.id
                  form.sellerTaxNo = data.creditCode
                  getAccount(data.id)
                }"
              ></IhSelectPageByPayer>
              <!-- <IhSelectPageByCompany
                v-model="form.polyCompanyId"
                placeholder="请选择收款公司"
                clearable
                @changeOption="(data) => {
                  dealParams.polyCompanyId = data.id
                  form.sellerTaxNo = data.creditCode
                  getAccount(data.id)
                }"
              ></IhSelectPageByCompany> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="收款账号"
              required
            >
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
                  getWaitList(form.developId)
                }"
              >
                <el-option
                  v-for="(i, n) in accountList"
                  :key="n"
                  :label="i.accountNo"
                  :value="i"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="发票类型"
              prop="billTypeCode"
            >
              <el-select
                v-model="form.billTypeCode"
                class="width--100"
                placeholder="请选择开票类型"
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
            <el-form-item label="发票税率">
              <el-input
                :value="form.taxRate | percent"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
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
              <el-input
                disabled
                :value="form.applyTime"
              ></el-input>
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
                @input="handleInput($event, row)"
                v-digits="2"
                clearable
              />
            </template>
          </el-table-column>
          <el-table-column
            label="不含税金额"
            min-width="120"
          >
            <template v-slot="{ row }">
              <template v-if="row.noTaxMoneyNew">
                <del>{{noTaxMoneySum(row)}}</del>
                <div style="color: red">{{row.noTaxMoneyNew}}</div>
              </template>
              <span v-else>{{noTaxMoneySum(row)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="税额"
            min-width="100"
          >
            <template v-slot="{ row }">
              <template v-if="row.taxMoneyNew || row.taxMoneyNew === 0">
                <del>{{taxMoneySum(row)}}</del>
                <div style="color: red">{{row.taxMoneyNew}}</div>
              </template>
              <span v-else>{{taxMoneySum(row)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="本次请款比例"
            min-width="155"
          >
            <template v-slot="{ row }">
              <span v-if="applyPercentSum(row)">{{applyPercentSum(row) | percent}}</span>
              <span v-else>0%</span>
            </template>
          </el-table-column>
          <!-- <el-table-column
            label="本次实际请款金额"
            min-width="175"
          >
            <template v-slot="{ row }">
              <div>
                <div>不含税金额: {{noTaxMoneySum(row)}}</div>
                <div>税额: {{taxMoneySum(row)}}</div>
              </div>
            </template>
          </el-table-column> -->
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
            <template v-slot="{ row, $index }">
              <el-link
                type="danger"
                @click="dealRemove(row, $index)"
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
            <td width="150">
              <template v-if="totalNoTaxMoneyNewSum()">
                <del>{{totalNoTaxMoneySum}}</del>
                <div style="color: red;">{{totalNoTaxMoneyNewSum()}}</div>
              </template>
              <span v-else>{{totalNoTaxMoneySum}}</span>
            </td>
            <td width="150">本批税额</td>
            <td width="150">
              <template v-if="totalTaxNew()">
                <del>{{totalTax}}</del>
                <div style="color: red;">{{totalTaxNew()}}</div>
              </template>
              <span v-else>{{totalTax}}</span>
            </td>
            <!-- <td class="width-150">本批扣除金额</td>
            <td width="150">{{totalSubMoney}}</td>
            <td class="width-150">本批实际请款金额</td>
            <td width="150">{{totalApplyMoney - totalSubMoney}}</td> -->
          </tr>
        </table>
      </div>
      <p class="ih-info-title">本期需抵扣金额明细</p>
      <div class="padding-left-20">
        <el-table
          style="width: 100%"
          :data="waitList"
          show-summary
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
              {{ row.subType ? $root.dictAllName(row.subType, 'SuppContType') : $root.dictAllName(row.suppContType, 'SuppContType')}}
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
          <el-table-column
            label="不含税金额"
            prop="subMoneyNoTax"
          >
          </el-table-column>
          <el-table-column
            label="税额"
            prop="subMoneyTax"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            width="80"
            fixed="right"
          >
            <template v-slot="{ $index }">
              <el-link
                type="danger"
                @click="waitListDelect($index)"
              >移除</el-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <p class="ih-info-title">
        <span>其他扣除项</span>
        <el-button
          type="primary"
          class="add-account"
          size="small"
          @click="handleAddOther"
        >添加扣除项</el-button>
      </p>
      <div class="padding-left-20">
        <el-table
          style="width: 100%"
          :data="form.otherSubList"
          show-summary
          :summary-method="getSummaries"
        >
          <el-table-column label="扣除类型">
            <template v-slot="{ row }">
              <el-select v-model="row.subType">
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
              <el-select
                v-model="row.termObj"
                value-key="termId"
                @change="(data) => {
                  row.termId = data.termId;
                  row.termName = data.termName
                }"
              >
                <el-option
                  v-for="(i, n) in otherDealList"
                  :key="n"
                  :value="i"
                  :label="i.termName"
                ></el-option>
              </el-select>
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
              >
                <i
                  slot="prefix"
                  style="line-height: 40px;color: #000;"
                >-</i>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="不含税金额"
            prop="subMoneyNoTax"
          >
            <template v-slot="{ row }">
              {{otherSubMoneyNoTax(row)}}
            </template>
          </el-table-column>
          <el-table-column
            label="税额"
            prop="subMoneyTax"
          >
            <template v-slot="{ row }">
              {{otherSubMoney(row)}}
            </template>
          </el-table-column>
          <el-table-column label="原因及扣罚依据">
            <template v-slot="{ row }">
              <el-input v-model="row.reason" />
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
                @click="removeOther($index)"
              >移除</el-link>
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
        >点击计算请款统计数据并生成请款汇总清单</el-button>
      </div>
      <br />
      <p class="ih-info-title">请款汇总清单</p>
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
            <td class="width-150">{{form.lastApplyNo}}</td>
          </tr>
          <tr>
            <td class="width-150">本期请款金额</td>
            <td class="width-150">{{totalApplyMoney}}</td>
            <td class="width-150">本期扣除金额</td>
            <td class="width-150">{{subMoneySum()}}</td>
            <td class="width-150">本期扣罚金额</td>
            <td class="width-150 padding-0">{{fineMoneySum()}}</td>
          </tr>
          <tr>
            <td>扣罚项类别</td>
            <td
              colspan="5"
              class="padding-0"
            >
              {{form.fineType}}
            </td>
          </tr>
          <tr>
            <td class="width-150">本期实际请款金额（含税）</td>
            <td class="width-150">{{actMoneyTaxSum()}}</td>
            <td class="width-150">本期实际请款金额（不含税）</td>
            <td class="width-150">{{actMoneySum()}}</td>
            <td class="width-150">本期实际请款税额</td>
            <td class="width-150">
              <el-input-number
                controls-position="right"
                v-model="form.taxMoney"
                :min="globalTaxMoney-10"
                :max="globalTaxMoney+10"
                :precision="2"
                @change="taxMoneyChange"
                :step="0.01"
              ></el-input-number>
              <div style="font-size: 14px; color: red;">(上下浮动不能超过10)</div>
            </td>
          </tr>
          <!-- <tr>
            <td class="width-150">累计实际请款不含税金额</td>
            <td class="width-150">{{totalActMoney}}</td>
            <td class="width-150">累计实际请款税额</td>
          </tr> -->
          <tr>
            <td class="width-150">发票类型</td>
            <td class="width-150">{{$root.dictAllName(form.billTypeCode, 'InvoiceType')}}</td>
            <td class="width-150">开票税率</td>
            <td class="width-150">{{form.taxRate | percent}}</td>
            <td class="width-150">纳税人识别号</td>
            <td class="width-150">
              <el-input
                v-model="form.developTaxNo"
                class="table-input"
                placeholder="请输入纳税人识别号"
              />
            </td>
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
            <!-- <td class="width-150">银行</td>
            <td class="width-150">{{form.sellerOpeningBankType}}</td>
            <td class="width-150">支行</td>
            <td class="width-150">{{form.sellerOpeningBankBranch}}</td> -->
          </tr>
          <tr>
            <td class="width-150">住所(地址)</td>
            <td colspan="2">
              <el-input
                v-model="form.developAddress"
                class="table-input"
                placeholder="请输入住所"
              />
            </td>
            <td class="width-150">电话</td>
            <td colspan="2">
              <el-input
                v-model="form.developPhone"
                class="table-input"
                placeholder="请输入电话"
              />
            </td>
          </tr>
          <tr>
            <td>经办部门意见</td>
            <td colspan="5">
              <el-input
                class="table-input"
                type="textarea"
                :rows="4"
                v-model="form.remark"
                resize="none"
                placeholder="请输入内容"
                maxlength="1000"
                show-word-limit
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
        <template v-if="form.status === 'InvoiceApply'">
          <el-button
            type="success"
            @click.stop="invoiceApply()"
          >发起开票申请</el-button>
          <el-button
            type="primary"
            @click.stop="submit('SaveAndInvoiceApply')"
          >保存并发起开票申请</el-button>
        </template>
        <template v-else>
          <el-button
            type="primary"
            @click.stop="submit('')"
          >暂存</el-button>
          <el-button
            type="success"
            @click.stop="submit('Submit')"
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
  get_company_getCompanyBankInfo__bankId,
  get_company_listAccount__id,
} from "../../../api/developer";
import {
  get_bankAccount_get__companyId,
  get_bankAccount_getBankInfoByAccountId__accountId,
} from "../../../api/finance/index";
import {
  post_devDeductDetail_getListAllByWait,
  post_applyRecDealTerm_getTermTotalList,
  post_applyRec_getLastApplyNo,
  // post_applyRecDeal_getTermTotalList,
  // post_applyRec_getHisRec,
  post_applyRec_save,
  get_applyRec_getApplyRecById__applyId,
  get_applyRecDeal_getAll__applyId,
  get_applyRecDealTerm_getAll__applyId,
  get_devDeductRec_getAll__applyId,
  get_devOtherSub_getAll__applyId,
  post_applyRecFile_getAll,
  post_applyRec_InvoiceApply__applyId,
} from "../../../api/apply/index";

@Component({
  components: { SelectDeal },
})
export default class ApplyRecAdd extends Vue {
  private form: any = {
    applyTime: null, //
    applyUserName: null, //
    developId: null, // 甲方ID
    developName: null, // 甲方名称
    developAccount: null, // 甲方开票账号
    developAccountId: null, // 甲方开票账号ID
    developAddress: null, // 甲方住所
    developOpenBank: null, // 甲方开户行
    developPhone: null, // 甲方电话
    developTaxNo: null, // 甲方纳税人识别号
    proId: null, // 项目ID
    orgId: null, // 事业部ID
    invoiceTitle: null, // 发票抬头
    // branchNo: null,
    // sellerTaxNo: null,
    taxRate: null, // 发票税率
    remark: null, // 意见
    // sellerBankAccount: null,
    // sellerOpeningBankBranch: null,
    // sellerOpeningBankType: null,
    polyCompanyId: null, // 收款公司ID-我司
    receAccountId: null, // 收款账号ID
    receBankAccount: null, // 收款账号
    receBranchNo: null, // 联行号
    fineType: "", // 扣罚类别
    lastApplyNo: null, // 上传请款单号
    billTypeCode: null, // 发票类型
    applyMoney: 0, // 本次请款金额
    subMoney: 0, // 本次扣除金额 -- 添加
    fineMoney: 0, // 本次扣罚金额
    actMoneyTax: 0, // 本次实际请款金额(含税)
    actMoney: 0, // 本次实际请款金额(不含税)
    taxMoney: 0, // 本次实际请款税额
    // sumActMoneyTax: 0, // 累计实际请款金额 - 添加时要算
    // sumActMoney: 0, // 累计实际请款不含税金额 - 添加时要算
    // sumTaxMoney: 0, // 累计实际请款税额 - 添加时要算
    dealList: [],
    termList: [],
    otherSubList: [],
    deductRecList: [],
    fileList: [],
    status: null,
  };
  private fileListType: any = [];
  private submitFile: any = {};
  private hisInfo: any = null;
  private accountData: any = null;
  private selectVisible = false;
  private accountList: any = [];
  private devAccount: any = [];
  private devAccountData: any = {};
  private dealParams: any = {
    developId: null,
    polyCompanyId: null,
    receAccountId: null,
    proId: null,
    termOrgId: null,
  };
  private waitList: any = [];
  private uploadLoad = false;
  private paramDevName: any = "";
  private paramProName: any = "";
  private applyNo: any = null;
  private globalTaxMoney: any = 0;
  private rules: any = {
    proId: [{ required: true, message: "请选择项目", trigger: "change" }],
    orgId: [{ required: true, message: "请选择事业部", trigger: "change" }],
    developId: [
      { required: true, message: "请选择甲方公司", trigger: "change" },
    ],
    polyCompanyId: [
      { required: true, message: "请选择收款公司", trigger: "change" },
    ],
    billTypeCode: [
      { required: true, message: "请选择开票类型", trigger: "change" },
    ],
  };

  private get otherDealList() {
    let obj: any = {},
      newArr: any = [];
    newArr = this.form.dealList.reduce((item: any, next: any) => {
      obj[next.termId] ? " " : (obj[next.termId] = true && item.push(next));
      return item;
    }, []);
    return newArr;
  }
  private get totalNoReceiveAmount() {
    let sum = 0;
    this.form.dealList.forEach((i: any) => {
      sum += i.noReceiveAmount;
    });
    return sum;
  }
  private get totalReceive() {
    let sum = 0;
    this.form.dealList.forEach((i: any) => {
      sum += parseFloat(i.receiveAmount);
    });
    return this.$math.tofixed(sum, 2);
  }
  private get totalReceived() {
    let sum = 0;
    this.form.dealList.forEach((i: any) => {
      sum += parseFloat(i.receivedAmount);
    });
    return this.$math.tofixed(sum, 2);
  }
  private get totalNoConfirm() {
    let sum = 0;
    this.form.dealList.forEach((i: any) => {
      sum += parseFloat(i.noConfirmAmount);
    });
    return this.$math.tofixed(sum, 2);
  }
  private get totalApplyAmountNow() {
    let sum = 0;
    this.form.dealList.forEach((i: any) => {
      sum += parseFloat(i.canApplyAmountNow);
    });
    return this.$math.tofixed(sum, 2);
  }
  private get totalNoTaxMoneySum() {
    let sum = 0;
    this.form.dealList.forEach((i: any) => {
      sum += parseFloat(i.noTaxMoney);
    });
    return this.$math.tofixed(sum, 2);
  }
  private get totalTax() {
    let sum = 0;
    this.form.dealList.forEach((i: any) => {
      sum += parseFloat(i.taxMoney);
    });
    return this.$math.tofixed(sum, 2);
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
  // private get totalActMoneyTax() {
  //   let sum =
  //     (this.actMoneyTaxSum() || 0) +
  //     (parseFloat(this.hisInfo.sumActMoneyTax) || 0);
  //   // this.form.sumActMoneyTax = sum.toFixed(2);
  //   return sum.toFixed(2);
  // }
  private get totalActMoney() {
    let sum =
      (this.actMoneySum() || 0) + (parseFloat(this.hisInfo.sumActMoney) || 0);
    // this.form.sumActMoney = sum.toFixed(2);
    return sum.toFixed(2);
  }
  // 计算不含税金额 -- 其他扣除项
  private otherSubMoneyNoTax(row: any) {
    let subMoneyNoTax = this.$math.div(
      row.subMoney,
      1 + Number(this.form.taxRate)
    );
    row.subMoneyNoTax = this.$math.tofixed(subMoneyNoTax * -1, 2);
    return row.subMoneyNoTax;
  }
  // 计算税额 -- 其他扣除项
  private otherSubMoney(row: any) {
    let subMoneyTax = this.$math.add(row.subMoney, row.subMoneyNoTax);
    row.subMoneyTax = this.$math.tofixed(subMoneyTax * -1, 2);
    return row.subMoneyTax;
  }
  // 本次请款比例
  private applyPercentSum(row: any) {
    let sum = 0;
    sum = this.$math.div(row.applyMoney, row.receiveAmount);
    row.applyPercent = this.$math.tofixed(sum, 4);
    return row.applyPercent;
  }
  // 计算不含税金额
  private noTaxMoneySum(row: any) {
    let num = parseFloat(row.applyMoney) || 0;
    let num2 = (parseFloat(row.taxRate) || 0) + 1;
    row.noTaxMoney = this.$math.tofixed(num / num2, 2);
    return row.noTaxMoney;
  }
  private taxMoneySum(row: any) {
    // 计算税额
    let num = parseFloat(row.applyMoney) || 0;
    row.taxMoney = this.$math.tofixed(num - row.noTaxMoney, 2);
    return row.taxMoney;
  }
  // 本次扣除金额
  private subMoneySum() {
    let sum = 0;
    this.form.termList.forEach((i: any) => {
      sum = this.$math.add(sum, parseFloat(i.subMoney));
    });
    return this.$math.tofixed(sum * -1, 2);
  }
  // 本期扣罚金额
  private fineMoneySum() {
    let sum = 0;
    this.form.termList.forEach((i: any) => {
      sum = this.$math.add(sum, parseFloat(i.fineMoney));
    });
    return this.$math.tofixed(sum * -1, 2);
  }
  // 本期实际请款金额（含税）
  private actMoneyTaxSum() {
    let sum = 0;
    this.form.termList.forEach((i: any) => {
      sum = this.$math.add(sum, parseFloat(i.actMoney));
    });
    return this.$math.tofixed(sum, 2);
  }
  // 本期实际请款金额(不含税)
  private actMoneySum() {
    let sum = 0;
    // sum =
    //   (this.actMoneyTaxSum() || 0) / (1 + (parseFloat(this.form.taxRate) || 0));
    sum = this.$math.sub(this.actMoneyTaxSum(), this.form.taxMoney);
    // this.form.actMoney = sum.toFixed(2);
    return this.$math.tofixed(sum, 2);
  }
  // 加减计算过后的本批不含税金额
  private totalNoTaxMoneyNewSum() {
    let sum = 0;
    let sumNew = 0;
    let isNew = false;
    this.form.dealList.forEach((i: any) => {
      if (i.noTaxMoneyNew) {
        isNew = true;
        sum = this.$math.add(sum, i.noTaxMoneyNew);
      } else {
        sum = this.$math.add(sum, i.noTaxMoney);
      }
    });
    isNew ? (sumNew = this.$math.tofixed(sum, 2)) : (sumNew = 0);
    return sumNew;
  }
  // 加减计算过后的税额的本批税额
  private totalTaxNew() {
    let sum = 0;
    let sumNew = 0;
    let isNew = false;
    this.form.dealList.forEach((i: any) => {
      if (i.taxMoneyNew) {
        isNew = true;
        sum = this.$math.add(sum, i.taxMoneyNew);
      } else {
        sum = this.$math.add(sum, i.taxMoney);
      }
    });
    isNew ? (sumNew = this.$math.tofixed(sum, 2)) : (sumNew = 0);
    return sumNew;
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
            return this.$math.add(prev, curr);
          } else {
            return prev;
          }
        }, 0);
        if (index === 2) {
          sums[index] = `-${sums[index]}`;
        } else {
          sums[index] = `${sums[index]}`;
        }
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
  /**
   * @description: 计算税额公式
   * @param {*} money
   * @param {*} taxRate
   * @return {*} 税额
   */
  private countTaxMoney(money: number, taxRate: number) {
    let sum = this.$math.tofixed(
      this.$math.sub(money, money / (1 + taxRate)),
      2
    );
    return sum;
  }
  private handleAddDeal() {
    if (
      this.dealParams.developId &&
      this.dealParams.polyCompanyId &&
      this.dealParams.receAccountId &&
      this.dealParams.proId &&
      this.dealParams.termOrgId
    ) {
      this.selectVisible = true;
    } else {
      this.$message.warning(
        "请先选择项目名称, 事业部, 甲方公司, 收款公司和收款账号"
      );
    }
  }
  private handleAddOther() {
    this.form.otherSubList.push({
      subMoney: 0,
      subMoneyNoTax: 0,
      subMoneyTax: 0,
      subType: null,
      termId: null,
      termName: null,
      reason: null,
      termObj: {},
    });
  }
  private removeOther(index: number) {
    this.form.otherSubList.splice(index, 1);
  }
  private dealRemove(row: any, index: number) {
    this.form.dealList.splice(index, 1);
    let list = this.form.dealList.map((i: any) => i.termId);
    if (!list.includes(row.termId)) {
      let otherSubList: any = [];
      this.form.otherSubList.forEach((i: any) => {
        if (i.termId !== row.termId) {
          otherSubList.push(i);
        }
      });
      this.form.otherSubList = otherSubList;
    }
  }
  // 获取本期抵扣金额明细
  private async getWaitList(developId: any) {
    try {
      let list = await post_devDeductDetail_getListAllByWait({
        correctType: "Apply",
        developId,
      });
      this.waitList = list.map((i: any) => {
        let subMoneyNoTax = this.$math.tofixed(
          this.$math.div(i.subMoney, 1 + parseFloat(this.form.taxRate)),
          2
        );
        let subMoneyTax = this.$math.tofixed(
          this.$math.sub(i.subMoney, subMoneyNoTax),
          2
        );
        return {
          ...i,
          subMoneyNoTax,
          subMoneyTax,
          dataSourceId: i.id,
        };
      });
    } catch (error) {
      console.log(error);
    }
  }
  // 本期抵扣金额明细删除
  private waitListDelect(index: number) {
    this.waitList.splice(index, 1);
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
      applyPercent: 0,
      ...i,
    }));
  }
  private handleInput(e: any, row: any) {
    if (parseFloat(row.applyMoney) > parseFloat(row.canApplyAmountNow)) {
      row.isCanApply = 0;
    } else {
      row.isCanApply = 1;
    }
    delete row.noTaxMoneyNew;
    delete row.taxMoneyNew;
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
    console.log(info);

    this.form.branchNo = info.branchNo;
    // this.form.taxRate = 0.0001;
    this.form.taxRate = info.taxRate;
    this.form.receBankAccount = info.accountNo;
    this.form.receBranchNo = info.branchNo;
    // this.form.sellerOpeningBankBranch = info.branchName;
    // this.form.sellerOpeningBankType = info.bankName;
    // this.form.sellerBankAccount = info.accountNo;
    // this.form.sellerName = info.accountName;
  }
  private async handleUpdateInfo() {
    if (
      this.dealParams.developId &&
      this.dealParams.polyCompanyId &&
      this.dealParams.receAccountId &&
      this.dealParams.proId &&
      this.dealParams.termOrgId &&
      this.form.dealList.length
    ) {
      this.uploadLoad = true;
      let newTermIdList = this.form.dealList
        .concat(this.waitList)
        .map((i: any) => i.termId);
      this.form.fineType = "";
      this.form.otherSubList.forEach((item: any) => {
        if (item.subType === "Fine") {
          this.form.fineType += `${item.termName}(${item.reason});`;
        }
      });
      try {
        await this.getTermTotalList({
          developId: this.dealParams.developId,
          polyCompanyId: this.dealParams.polyCompanyId,
          orgId: this.dealParams.termOrgId,
          proId: this.dealParams.proId,
          receAccountId: this.dealParams.receAccountId,
          termIdList: [...new Set(newTermIdList)],
        });
        this.form.taxMoney = this.countTaxMoney(
          this.actMoneyTaxSum(),
          parseFloat(this.form.taxRate)
        );
        // this.$math.sub(
        //   this.actMoneyTaxSum(),
        //   (this.actMoneyTaxSum() || 0) /
        //     (1 + (parseFloat(this.form.taxRate) || 0))
        // );
        this.globalTaxMoney = this.form.taxMoney;
        await this.getHisRec({
          developId: this.dealParams.developId,
          polyCompanyId: this.dealParams.polyCompanyId,
        });
        this.taxMoneyChange(this.form.taxMoney);
        this.uploadLoad = false;
      } catch (error) {
        console.log(error);
        this.uploadLoad = false;
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
      let list = await post_applyRecDealTerm_getTermTotalList(param);
      this.form.termList = list.map((i: any) => {
        let applyMoney = 0;
        let subMoney1 = 0; // 本期需要抵扣金额明细扣除金额
        let subMoney2 = 0; // 抵扣模块税额差和其他的扣除金额
        let fineMoney = 0; // 本次扣罚金额
        this.form.dealList
          .filter((item: any) => item.termId === i.termId)
          .forEach((newItem: any) => {
            applyMoney = this.$math.tofixed(
              this.$math.add(applyMoney, newItem.applyMoney),
              2
            );
          });
        this.waitList
          .filter((item: any) => item.termId === i.termId)
          .forEach((newI: any) => {
            subMoney1 = this.$math.tofixed(
              this.$math.add(subMoney1, newI.subMoney),
              2
            );
          });
        let otherSubList = this.form.otherSubList.map((i: any) => ({
          ...i,
          subMoney: i.subMoney * -1,
        }));
        otherSubList
          .filter((it: any) => {
            return (
              it.termId === i.termId &&
              (it.subType === "Tax" || it.subType === "Other")
            );
          })
          .forEach((nItem: any) => {
            subMoney2 = this.$math.tofixed(
              this.$math.add(subMoney2, nItem.subMoney),
              2
            );
          });
        otherSubList
          .filter((item: any) => {
            return item.termId === i.termId && item.subType === "Fine";
          })
          .forEach((nItem: any) => {
            fineMoney = this.$math.tofixed(
              this.$math.add(fineMoney, nItem.subMoney),
              2
            );
          });
        console.log(applyMoney, fineMoney, subMoney1, subMoney2);

        return {
          ...i,
          applyMoney,
          fineMoney: fineMoney,
          subMoney: this.$math.add(subMoney1, subMoney2),
          actMoney: this.$math.add(
            applyMoney,
            this.$math.addArr([fineMoney, subMoney1, subMoney2])
          ),
          sumActMoney:
            i.hisSumActMoney +
            this.$math.add(
              applyMoney,
              this.$math.addArr([fineMoney, subMoney1, subMoney2])
            ),
          sumApplyMoney: this.$math.add(applyMoney, i.hisSumApplyMoney),
        };
      });
    } catch (error) {
      console.log(error);
    }
  }
  private async getHisRec(param: any) {
    try {
      const res = await post_applyRec_getLastApplyNo(param);
      this.hisInfo = res;
      this.form.lastApplyNo = res;
    } catch (error) {
      console.log(error);
    }
  }
  private async getListAccount(id: any) {
    try {
      this.devAccount = await get_company_listAccount__id({ id });
      if (this.devAccount) {
        this.devAccountData = this.devAccount.find(
          (i: any) => i.type === "Basic"
        );
        this.form.developAccount = this.devAccountData.number;
        this.form.developAccountId = this.devAccountData.bankId;
        this.getDevBankInfo(this.devAccountData.bankId);
      }
    } catch (error) {
      console.log(error);
    }
  }
  private async getDevBankInfo(bankId: any) {
    try {
      const res: any = await get_company_getCompanyBankInfo__bankId({ bankId });
      this.form.developAddress = res.address;
      this.form.developPhone = res.phone;
      this.form.developTaxNo = res.creditCode;
      this.form.developOpenBank = res.bank;
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
      .filter((i: any) => !i.code.includes("Pdf"));
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
  // 税额修改
  private taxMoneyChange(number: any) {
    if (!number) {
      this.form.taxMoney = this.globalTaxMoney - 10;
    }
    let val = this.form.taxMoney;
    let sub = this.globalTaxMoney - val; // 差额
    console.log(val, sub, number, this.globalTaxMoney);
    let listArr: any = [];
    let isSub = true;
    if (sub === 0) {
      isSub = false;
    } else {
      isSub = true;
    }
    for (let index = 0; index < this.form.dealList.length; index++) {
      const element = this.form.dealList[index];
      // 税额
      let thisTaxMoney = this.countTaxMoney(
        element.applyMoney,
        parseFloat(this.form.taxRate)
      );
      // this.$math.tofixed(
      //   this.$math.sub(
      //     element.applyMoney,
      //     element.applyMoney / (1 + parseFloat(this.form.taxRate) || 0)
      //   ),
      //   2
      // );
      // 不含税金额
      let thisNoTaxMoney = this.$math.tofixed(
        this.$math.sub(element.applyMoney, thisTaxMoney),
        2
      );
      if (isSub) {
        let taxMoneyNew = this.$math.tofixed(
          this.$math.sub(thisTaxMoney, sub),
          2
        );
        if (taxMoneyNew > 0) {
          element.taxMoneyNew = taxMoneyNew;
          element.noTaxMoneyNew = this.$math.tofixed(
            this.$math.add(thisNoTaxMoney, sub),
            2
          );
          isSub = false;
          listArr.push(element);
        } else {
          element.taxMoneyNew = 0;
          element.noTaxMoneyNew = this.$math.tofixed(
            this.$math.add(thisNoTaxMoney, thisTaxMoney),
            2
          );
          sub = this.$math.tofixed(this.$math.sub(sub, element.taxMoney), 2);
          isSub = true;
          listArr.push(element);
        }
      } else {
        delete element.taxMoneyNew;
        delete element.noTaxMoneyNew;
        listArr.push(element);
      }
    }
    this.form.dealList = listArr;
  }
  private async submit(type: any) {
    console.log(type);
    this.form.op = type;
    this.form.applyMoney = this.totalApplyMoney;
    this.form.actMoney = this.actMoneySum();
    this.form.actMoneyTax = this.actMoneyTaxSum();
    this.form.deductRecList = this.waitList;
    let subMoney = this.subMoneySum();
    let fineMoney = this.fineMoneySum();
    let otherSubList = this.form.otherSubList.map((i: any) => ({
      ...i,
      subMoney: i.subMoney * -1,
    }));
    let termList = this.form.termList.map((i: any) => ({
      ...i,
      // subMoney: i.subMoney * -1,
      // fineMoney: i.fineMoney * -1,
    }));
    let dealList = this.form.dealList.map((i: any) => ({
      ...i,
      noTaxMoney: i.noTaxMoneyNew ? i.noTaxMoneyNew : i.noTaxMoney,
      taxMoney:
        i.taxMoneyNew || i.taxMoneyNew === 0 ? i.taxMoneyNew : i.taxMoney,
    }));
    // this.form.actMoneyTax = this.actMoneyTaxSum();
    // this.form.actMoney = this.actMoneySum();
    // this.form.termList = this.form.termList.map((i: any) => ({
    //   developId: this.dealParams.developId,
    //   polyCompanyId: this.dealParams.polyCompanyId,
    //   receAccountId: this.dealParams.receAccountId,
    //   ...i,
    // }));

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
      this.form.fileList = arr.map((v: any) => ({
        fileId: v.fileId,
        fileName: v.name,
        type: v.type,
      }));
    } else {
      this.$message({
        type: "warning",
        message: `${msgList.join(";")}, 请上传附件`,
      });
      return;
    }

    console.log(this.form);
    let loading = this.$loading({
      lock: true,
      text: "请耐心等待...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.6)",
      customClass: "ih-loading-spinner",
    });
    try {
      await post_applyRec_save({
        ...this.form,
        subMoney,
        fineMoney,
        otherSubList,
        termList,
        dealList,
      });
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
      loading.close();
      this.$goto({
        path: "/applyRec/list",
      });
    } catch (error) {
      console.log(error);
      loading.close();
    }
  }
  private async invoiceApply() {
    let applyId = this.$route.query.id;
    let loading = this.$loading({
      lock: true,
      text: "请耐心等待...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.6)",
      customClass: "ih-loading-spinner",
    });
    try {
      await post_applyRec_InvoiceApply__applyId({ applyId });
      this.$message.success("发起开票成功");
      loading.close();
      this.$goto({
        path: "/applyRec/list",
      });
    } catch (error) {
      loading.close();
      console.log(error);
    }
  }
  private async getInfo(applyId: any) {
    try {
      const info: any = await get_applyRec_getApplyRecById__applyId({
        applyId,
      });
      this.paramDevName = info.developName;
      this.paramProName = info.proName;
      this.applyNo = info.applyNo;
      // 税额
      this.globalTaxMoney = this.countTaxMoney(info.actMoneyTax, info.taxRate);
      // this.$math.tofixed(
      //   this.$math.sub(
      //     info.actMoneyTax,
      //     info.actMoneyTax / (1 + info.taxRate || 0)
      //   ),
      //   2
      // );
      this.getListAccount(info.developId);
      this.getAccount(info.polyCompanyId);
      this.accountData = { id: info.receAccountId };
      this.devAccountData = { bankId: info.developAccountId };
      this.dealParams = {
        developId: info.developId,
        polyCompanyId: info.polyCompanyId,
        receAccountId: info.receAccountId,
        proId: info.proId,
        termOrgId: info.orgId,
      };
      let dealList = await get_applyRecDeal_getAll__applyId({ applyId });
      this.form.dealList = dealList.map((i: any) => ({
        taxRate: info.taxRate,
        ...i,
      }));
      let termList = await get_applyRecDealTerm_getAll__applyId({
        applyId,
      });
      this.form.termList = termList.map((i: any) => ({
        ...i,
        // subMoney: i.subMoney * -1,
        // fineMoney: i.fineMoney * -1,
      }));
      let otherSubList = await get_devOtherSub_getAll__applyId({ applyId });
      console.log(otherSubList);
      this.form.otherSubList = otherSubList.map((i: any) => ({
        ...i,
        subMoney: i.subMoney * -1,
        // subMoneyNoTax: i.subMoneyNoTax * -1,
        // subMoneyTax: i.subMoneyTax * -1,
        termObj: {
          termId: i.termId,
        },
      }));
      this.waitList = await get_devDeductRec_getAll__applyId({ applyId });
      this.form = { ...this.form, ...info };
      this.taxMoneyChange(info.taxMoney);
      // if (this.form.status === "Draft") {
      //   await this.getHisRec({
      //     developId: info.developId,
      //     polyCompanyId: info.polyCompanyId,
      //   });
      // }
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
      this.form.applyTime = (this.$tool as any).todayLongStr();
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
// .table-input {
//   /deep/ .el-input__inner {
//     border: none;
//   }
//   /deep/ .el-textarea__inner {
//     border: none;
//   }
// }
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
<style lang="scss">
.ih-loading-spinner {
  .el-icon-loading,
  .el-loading-text {
    color: #fff;
  }
}
</style>
