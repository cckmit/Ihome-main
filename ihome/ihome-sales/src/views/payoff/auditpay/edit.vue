<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-26 11:11:23
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-17 11:47:09
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
                :params="{
                  auditEnum: 'Adopt'
                }"
                v-model="info.projectId"
                :search-name="info.projectName"
                disabled
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
                disabled
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
                clearable
                placeholder="请选择账号"
                class="width--100"
              >
                <el-option
                  v-for="item in channelAccountOptions"
                  :key="item.id"
                  :label="item.accountNo"
                  :value="item.accountNo"
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
              label="付款方"
              prop="payerId"
            >
              <IhSelectPageByPayer
                clearable
                v-model="info.payerId"
                :proId="info.belongOrgId"
                :search-name="info.payerName"
                @changeOption="getPayerInfo"
              ></IhSelectPageByPayer>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="付款帐号"
              prop="paymentAccount"
            >
              <el-select
                v-model="info.paymentAccount"
                clearable
                placeholder="请选择付款帐号"
                class="width--100"
              >
                <el-option
                  v-for="item in payerAccountOptions"
                  :key="item.id"
                  :label="item.accountNo"
                  :value="item.accountNo"
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
                clearable
                placeholder="请选择结算方式"
                @change="settlementMethodChange"
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
                :disabled="paymentMethodDisabled"
                clearable
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
              >成交编号: <el-link
                  type="primary"
                  @click="routeToDeal(row)"
                >
                  {{row.dealCode}}
                </el-link>
              </div>
              <div
                class="text-ellipsis"
                :title="row.address"
              >地址: {{row.address}}</div>
              <div
                class="text-ellipsis"
                :title="row.customer"
              >客户姓名: {{row.customer}}</div>
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
              >分销协议编号: <el-link
                  type="primary"
                  @click="routeToDistribution(row)"
                >{{row.contNo}}</el-link>
              </div>
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
              <el-tooltip placement="top">
                <div
                  slot="content"
                  v-html="filterMsg(row.commFeesList)"
                ></div>
                <div style="cursor: pointer; color: #4881f9">代理费: {{row.ageCommFees}}</div>
              </el-tooltip>
              <div>合计: {{$math.tofixed($math.add(Number(row.serCommFees), Number(row.ageCommFees)), 2)}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="已结佣付款金额"
            width="150"
          >
            <template v-slot="{ row }">
              <div>服务费: {{row.serSettledCommFees}}</div>
              <el-tooltip placement="top">
                <div
                  slot="content"
                  v-html="filterMsg(row.settledCommFeesList)"
                ></div>
                <div style="cursor: pointer; color: #4881f9">代理费: {{row.ageSettledCommFees}}</div>
              </el-tooltip>
              <div>合计: {{$math.tofixed($math.add(Number(row.serSettledCommFees), Number(row.ageSettledCommFees)), 2)}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="未结佣付款金额"
            width="150"
          >
            <template v-slot="{ row }">
              <div>服务费: {{row.serUnsetCommFees}}</div>
              <el-tooltip placement="top">
                <div
                  slot="content"
                  v-html="filterMsg(row.unsetCommFeesList)"
                ></div>
                <div style="cursor: pointer; color: #4881f9">代理费: {{row.ageUnsetCommFees}}</div>
              </el-tooltip>
              <div>合计: {{$math.tofixed($math.add(Number(row.serUnsetCommFees), Number(row.ageUnsetCommFees)), 2)}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="可结佣付款金额"
            width="150"
          >
            <template v-slot="{ row }">
              <div>服务费: {{row.serCanCommFees}}</div>
              <el-tooltip placement="top">
                <div
                  slot="content"
                  v-html="filterMsg(row.canCommFeesList)"
                ></div>
                <div style="cursor: pointer; color: #4881f9">代理费: {{row.ageCanCommFees}}</div>
              </el-tooltip>
              <div>合计: {{$math.tofixed($math.add(Number(row.serCanCommFees), Number(row.ageCanCommFees)), 2)}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="本次付款金额"
            width="200"
          >
            <template v-slot="{ row, $index }">
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
                  readonly
                  style="width: 70%"
                  @click.native="agencyEdit(row, $index)"
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
              <el-link
                type="primary"
                @click="routeToDeal(row)"
              >
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
              {{dataNoTaxAmountChange(row, '')}}
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
          :summary-method="othergetSummaries"
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
              <el-select
                style="width: 100%"
                v-model="row.cycleId"
                placeholder="请选择"
                @change="otherCycleChange(row)"
              >
                <el-option
                  v-for="item in tabsList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            label="本期扣除金额"
            prop="deductAmount"
          >
            <template v-slot="{ row }">
              <el-input
                class="tableprefix"
                v-model="row.deductAmount"
                clearable
                v-digits="2"
                placeholder="本期扣除金额"
              ><i
                  class="tableprefix"
                  slot="prefix"
                >-</i>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="不含税金额"
            prop="noTaxAmount"
          >
            <template v-slot="{ row }">
              {{dataNoTaxAmountChange(row, 'other')}}
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
          :loading="computedLoading"
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
                type="primary"
                @click="routeToCycle(row)"
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
                <div :key='i'>
                  <div :title="item.title">
                    {{`名称: ${item.title}`}}
                  </div>
                  <el-link
                    type="primary"
                    @click="routeToDistribution(item)"
                    :title="`编号: ${item.contNo}`"
                    class="text-ellipsis"
                  >
                    {{`编号: ${item.contNo}`}}
                  </el-link>
                </div>
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
                readonly
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
                readonly
              >
              </el-input>
            </td>
          </tr>
        </table>
      </div>
      <br />
      <p class="ih-info-title">上传附件</p>
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
                :upload-show="!!row.fileList.length"
                :removePermi="false"
                :limit="row.fileList.length"
                size="100px"
              ></IhUpload>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <br />
      <div class="top">
        <p class="ih-info-title">操作日志</p>
        <div class="right-button">
          <el-button
            slot="reference"
            type="success"
            size="small"
            icon="el-icon-search"
            @click="searchPerson"
          >查询当前代办人</el-button>
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

      <p class="ih-info-title">审核意见</p>
      <el-input
        class="padding-left-20"
        style="box-sizing: border-box"
        type="textarea"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="info.auditOpinion"
        maxlength="500"
        show-word-limit
      >
      </el-input>
      <br />
      <div class="bottom">
        <el-button
          v-if="['auditpayAudit', 'auditpayInfo'].includes($route.name)"
          @click="submit('TemporaryStorage')"
          type="primary"
        >暂存</el-button>
        <el-button
          v-if="['auditpayAudit', 'auditpayInfo'].includes($route.name)"
          @click="submit('Through')"
          type="success"
        >通过</el-button>
        <el-button
          v-if="['auditpayAudit', 'auditpayInfo'].includes($route.name)"
          @click="submit('Reject')"
          type="danger"
        >驳回</el-button>
        <el-button
          v-if="$route.name === 'payoffControl'"
          @click="submit('Saving')"
          type="success"
        >保存</el-button>
        <el-button @click="cancel">返回</el-button>
      </div>
    </template>
    <ih-dialog :show="contactsDialogVisible">
      <Obligation
        :data="contactsData"
        @cancel="() => (contactsDialogVisible = false)"
        @finish=" (data) => contactsFinish(data)"
      />
    </ih-dialog>
    <ih-dialog :show="agencyDialogVisible">
      <AgencyEdit
        :data="agencyData"
        @cancel="() => (agencyDialogVisible = false)"
        @finish=" (data) => agencyFinish(data)"
      />
    </ih-dialog>
  </IhPage>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  get_payApply_get__id,
  post_payApply_calculation_results,
  post_payApply_financeReviewApply,
  post_payApply_notFinanceReviewApply,
  get_processRecord_oa_review_person__applyId,
  get_processRecord_oa_review_log__applyId,
} from "@/api/payoff/index";
import { post_bankAccount_getByOrgId__orgId } from "@/api/finance/index";
import { Form as ElForm } from "element-ui";
import Obligation from "../payorder/dialog/obligation.vue";
import { get_channel_get__id } from "@/api/channel/index";
import AgencyEdit from "../payorder/dialog/agencyEdit.vue";

@Component({
  components: {
    Obligation,
    AgencyEdit,
  },
})
export default class PayoffEdit extends Vue {
  private fileList: Array<object> = [];
  info: any = {
    applyCode: null,
    status: null,
    agencyId: null,
    receiveAccount: null,
    payerId: null,
    payerName: null,
    paymentAccount: null,
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
    description: null,
    auditOpinion: null,
    projectId: null,
    projectName: null,
    settlementMethod: null,
    paymentMethod: null,
  };
  submitFile: any = {};
  operateVisible: any = false;
  channelAccountOptions: any = [];
  paymentMethodDisabled: any = false;
  showTable: any = [];
  tabsValue: any = null;
  tabsList: any = [];
  fileListType: any = [];
  contactsData: any = {};
  contactsDialogVisible = false;

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
    payerId: [
      {
        required: true,
        message: "请选择付款方",
        trigger: "change",
      },
    ],
    paymentAccount: [
      {
        required: true,
        message: "请选择付款帐号",
        trigger: "change",
      },
    ],
  };

  agencyDialogVisible: any = false;
  agencyEditIndex: any = 0;
  agencyData: any = {};
  modify: any = false;
  computedLoading: any = false;
  submitLoading: any = false;
  finishLoading: any = false;
  isChaneClick: any = false;
  isChangeObj: any = {};
  payerAccountOptions: any = [];

  taxinputChange() {
    this.modify = true;
  }

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

  routeToDeal(row: any) {
    let router = this.$router.resolve({
      path: `/dealReport/info`,
      query: {
        id: row.dealCode,
        type: "CODE",
      },
    });
    window.open(router.href, "_blank");
  }

  routeToDistribution(row: any) {
    let router = this.$router.resolve({
      path: `/distribution/info`,
      query: {
        contractNo: row.contNo,
      },
    });
    window.open(router.href, "_blank");
  }

  routeToCycle(row: any) {
    let router = this.$router.resolve({
      path: `/projectApproval/info`,
      query: {
        id: row.cycleId,
      },
    });
    window.open(router.href, "_blank");
  }

  filterMsg(arr: any) {
    let msg = `含: <br/>`;
    arr.forEach((v: any) => {
      msg += `甲方公司:${v.partyAName} 代理费:${v.agencyFeesAmount}<br/>`;
    });
    return msg;
  }

  agencyEdit(data: any, index: number) {
    this.agencyEditIndex = index;
    let arr: any = [];
    if (!data.ageThisCommFeesList?.length) {
      arr = data.canCommFeesList.map((v: any) => ({
        ...v,
        agencyFeesType: "ThisCommFees",
        partyAName: v.partyAName,
        kejie: v.agencyFeesAmount,
        agencyFeesAmount: 0,
      }));
    } else {
      arr = data.ageThisCommFeesList.map((v: any, i: number) => ({
        ...v,
        partyAName: v.partyAName,
        kejie: data.canCommFeesList[i].agencyFeesAmount,
        agencyFeesAmount: v.agencyFeesAmount,
      }));
    }
    this.agencyData = arr;
    this.agencyDialogVisible = true;
  }

  agencyFinish(data: any) {
    this.info.payApplyDetailList[this.agencyEditIndex].ageThisCommFeesList = [
      ...data,
    ];
    let sum: any = 0;
    data.forEach((v: any) => {
      sum += Number(v.agencyFeesAmount);
    });
    this.info.payApplyDetailList[this.agencyEditIndex].ageThisCommFees = sum;
    this.showTable[this.agencyEditIndex].ageThisCommFeesList = [...data];
    this.showTable[this.agencyEditIndex].ageThisCommFees = sum;
    this.agencyDialogVisible = false;
    this.$message.success("保存成功");
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

  // 本次支付比例(%)( 本次申请付款金额 / 可结佣付款金额 * 100 )
  ratioChange(row: any) {
    const total1 = this.$math.add(
      Number(row.serThisCommFees),
      Number(row.ageThisCommFees)
    );
    const total2 = this.$math.add(
      Number(row.serCanCommFees),
      Number(row.ageCanCommFees)
    );
    const total3 = isNaN(this.$math.div(total1, total2))
      ? 0
      : this.$math.div(total1, total2);
    const res = this.$math.multi(total3, 100);
    row.ratio = this.$math.tofixed(res, 2);
    return this.$math.tofixed(res, 2);
  }

  // 明细表-不含税金额(扣除金额/ (1+开票税率))
  dataNoTaxAmountChange(row: any, type: any) {
    const deductAmount = Number(row.deductAmount);
    const taxRate = this.info.taxRate
      ? this.$math.div(this.info.taxRate, 100)
      : 0;
    const shuier = this.$math.add(1, taxRate);
    const res = this.$math.div(deductAmount, shuier);
    row.noTaxAmount = type
      ? `-${this.$math.tofixed(res, 2)}`
      : this.$math.tofixed(res, 2);
    return row.noTaxAmount;
  }

  // 明细表-税额(不含税金额 * 开票税率)
  dataTaxChange(row: any) {
    const noTaxAmount = Number(row.noTaxAmount);
    const taxRate = this.info.taxRate
      ? this.$math.div(this.info.taxRate, 100)
      : 0;
    const res = this.$math.multi(noTaxAmount, taxRate);
    row.tax = this.$math.tofixed(res, 2);
    return row.tax;
  }

  searchOpen = true;
  private get payoffId() {
    return this.$route.query.id;
  }

  async getChannelInfo(item: any) {
    this.info.agencyName = item.name;
    let res = await get_channel_get__id({ id: item.id });
    this.channelAccountOptions = res.channelBanks;
  }

  async getPayerInfo(item: any) {
    this.info.payerName = item.companyName;
    const res = await post_bankAccount_getByOrgId__orgId({
      orgId: this.info.payerId,
    });
    this.payerAccountOptions = res;
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
        taxRate: res.taxRate + "",
        payApplyDetailList: res.payApplyDetailList.map((j: any) => ({
          ...j,
          cycleId: j.cycleId + "",
        })),
        otherDeductionDetailResponseList: res.otherDeductionDetailResponseList.map(
          (j: any) => ({
            ...j,
            cycleId: j.cycleId + "",
            deductAmount: Number(j.deductAmount) * -1,
          })
        ),
      };
      this.isChangeObj = {
        ...res,
        receiveAccount: Number(res.receiveAccount),
        taxRate: res.taxRate + "",
        payApplyDetailList: res.payApplyDetailList.map((j: any) => ({
          ...j,
          cycleId: j.cycleId + "",
        })),
        otherDeductionDetailResponseList: res.otherDeductionDetailResponseList.map(
          (j: any) => ({
            ...j,
            cycleId: j.cycleId + "",
            deductAmount: Number(j.deductAmount) * -1,
          })
        ),
      };
      this.getFileListType(res.documentList);
      this.filterTabs(this.info.payApplyDetailList);
      this.settlementMethodChange(res.settlementMethod);
    } else {
      this.info.maker = (this.$root as any).userInfo.name;
      this.info.makerId = (this.$root as any).userInfo.id;
      this.info.makerTime = (this.$tool as any).todayStr();
      this.info.status = "Unconfirm";
      this.info.settlementMethod = "Centralization";
      this.info.paymentMethod = "Cash";
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
    let obj: any = {};
    this.fileListType.forEach((h: any) => {
      obj[h.code] = h.fileList;
    });
    this.submitFile = { ...obj };
  }

  async searchPerson() {
    const res: any = await get_processRecord_oa_review_person__applyId({
      applyId: this.payoffId,
    });
    this.$alert(res.result, "当前待办人", {
      confirmButtonText: "确定",
    });
  }

  async updateOA() {
    const res = await get_processRecord_oa_review_log__applyId({
      applyId: this.payoffId,
    });
    this.info.processRecordList = res;
  }

  settlementMethodChange(val: any) {
    if (val === "OnlineBanking") {
      this.paymentMethodDisabled = true;
      this.info.paymentMethod = "Other";
    } else {
      this.paymentMethodDisabled = false;
      this.info.paymentMethod = "Cash";
    }
  }

  // 计算
  async computedMsg() {
    this.computedLoading = true;
    let obj: any = {};
    obj.agencyId = this.info.agencyId;
    obj.agencyName = this.info.agencyName;
    obj.taxRate = Number(this.info.taxRate);
    obj.payApplyDetailList = this.info.payApplyDetailList;
    obj.otherDeductionDetailCalculationRequestList = this.info.otherDeductionDetailResponseList.map(
      (v: any) => ({
        ...v,
        deductAmount: Number(v.deductAmount) * -1,
      })
    );
    obj.payDeductDetailCalculationRequestList = this.info.payDeductDetailResponseList;
    try {
      const res: any = await post_payApply_calculation_results(obj);
      this.computedLoading = false;
      this.info.actualAmount = res.actualAmount;
      this.info.applyAmount = res.applyAmount;
      this.info.deductAmount = res.deductAmount;
      this.info.deductionCategory = res.deductionCategory;
      this.info.finedAmount = res.finedAmount;
      this.info.noTaxAmount = res.noTaxAmount;
      this.info.tax = res.tax;
      this.info.paySummaryDetailsResponseList = res.paySummaryDetailsResponses;
      this.getFileListType(res.documentList);
      this.modify = true;
      this.isChaneClick = true;
    } catch (err) {
      this.computedLoading = false;
    }
  }

  othergetSummaries(param: any) {
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
        if (index === 2) {
          sums[index] = `-${sums[index]}`;
        }
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

  contactsFinish(data: any) {
    let arr: any = data.map((v: any) => ({
      ...v,
      serThisCommFees: 0,
      ageThisCommFees: 0,
      thisDeduct: 0,
      cycleId: v.cycleId + "",
    }));
    this.info.payApplyDetailList = arr;
    this.filterTabs(this.info.payApplyDetailList);
    this.contactsDialogVisible = false;
  }

  submit(val: string) {
    (this.$refs["form"] as ElForm).validate(async (v: any) => {
      if (v) {
        let obj: any = {};
        obj.applyId = this.payoffId;
        obj.auditOpinion = this.info.auditOpinion;
        obj.payoffApproval = val;
        if (
          ["ReviewPass", "BranchFinanceUnreview"].includes(this.info.status)
        ) {
          obj.reviewUpdateMainBody = {};
          obj.payApplyDetailList = [];
          obj.otherDeductionDetailCalculationRequestList = [];
          obj.modify = this.modify;
          obj.reviewUpdateMainBody.deductionCategory = this.info.deductionCategory;
          obj.reviewUpdateMainBody.payerId = this.info.payerId;
          obj.reviewUpdateMainBody.payerName = this.info.payerName;
          obj.reviewUpdateMainBody.description = this.info.description;
          obj.reviewUpdateMainBody.actualAmount = this.info.actualAmount;
          obj.reviewUpdateMainBody.agencyId = this.info.agencyId;
          obj.reviewUpdateMainBody.agencyName = this.info.agencyName;
          obj.reviewUpdateMainBody.applyAmount = this.info.applyAmount;
          obj.reviewUpdateMainBody.belongOrgId = this.info.belongOrgId;
          obj.reviewUpdateMainBody.belongOrgName = this.info.belongOrgName;
          obj.reviewUpdateMainBody.deductAmount = this.info.deductAmount;
          obj.reviewUpdateMainBody.finedAmount = this.info.finedAmount;
          obj.reviewUpdateMainBody.invoiceType = this.info.invoiceType;
          obj.reviewUpdateMainBody.makerId = this.info.makerId;
          obj.reviewUpdateMainBody.makerTime = this.info.makerTime;
          obj.reviewUpdateMainBody.noTaxAmount = this.info.noTaxAmount;
          obj.reviewUpdateMainBody.projectId = this.info.projectId;
          obj.reviewUpdateMainBody.projectName = this.info.projectName;
          obj.reviewUpdateMainBody.receiveAccount = this.info.receiveAccount;
          obj.reviewUpdateMainBody.status = this.info.status;
          obj.reviewUpdateMainBody.paymentAccount = this.info.paymentAccount;
          obj.reviewUpdateMainBody.paymentMethod = this.info.paymentMethod;
          obj.reviewUpdateMainBody.settlementMethod = this.info.settlementMethod;
          obj.reviewUpdateMainBody.tax = this.info.tax;
          obj.reviewUpdateMainBody.taxRate = Number(this.info.taxRate);
          obj.payApplyDetailList = this.info.payApplyDetailList;
          obj.payDeductDetailCalculationRequestList = this.info.payDeductDetailResponseList;
          obj.otherDeductionDetailCalculationRequestList = this.info.otherDeductionDetailResponseList.map(
            (v: any) => ({
              ...v,
              deductAmount: Number(v.deductAmount) * -1,
            })
          );
          // 校验提示
          let arr: any = [];
          Object.values(this.submitFile).forEach((v: any) => {
            if (v.length) {
              arr = arr.concat(v);
            }
          });
          obj.documentList = arr.map((v: any) => ({
            fileId: v.fileId,
            fileName: v.name,
            fileType: v.type,
          }));
        }
        switch (val) {
          case "TemporaryStorage":
          case "Reject":
          case "Through":
          case "Saving":
            if (!this.info.auditOpinion) {
              this.$message.warning("请填写审核意见");
              return;
            }
            break;
        }
        switch (this.info.status) {
          case "PlatformClerkUnreview":
          case "BranchBusinessManageUnreview":
            delete obj.applyId;
            obj.id = this.payoffId;
            await post_payApply_notFinanceReviewApply(obj);
            break;
          case "BranchFinanceUnreview":
          case "ReviewPass":
            await post_payApply_financeReviewApply(obj);
            break;
        }
        this.$message({
          type: "success",
          message: `${this.messageChange(val)}`,
        });
        if (this.$route.name === "payoffControl") {
          this.$goto({ path: `/payoff/list` });
        } else {
          this.$goto({ path: `/auditpay/list` });
        }
      }
    });
  }
  messageChange(val: any) {
    switch (val) {
      case "TemporaryStorage":
        return "暂存成功";
      case "Through":
        return "通过成功";
      case "Reject":
        return "驳回成功";
      case "Saving":
        return "保存成功";
    }
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
  display: block;
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

.inputClass {
  /deep/ .el-textarea__inner,
  /deep/ .el-input__inner {
    border: none;
  }
}

.tableprefix {
  line-height: 40px;
  color: #000;
  /deep/ .el-input__prefix {
    left: 10px;
  }
}
</style>