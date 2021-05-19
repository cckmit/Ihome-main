<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-26 11:11:23
 * @LastEditors: ywl
 * @LastEditTime: 2021-05-19 12:57:37
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
                clearable
                @changeOption="(data) => {
                  info.projectName = data.proName;
                  projectCity = data.city;
                  channelSearch = {
                    cycleCity: data.city,
                    departmentOrgId: info.belongOrgId,
                  }
                  showTable = [];
                  info.payApplyDetailList = [];
                }"
              ></IhSelectPageByProject>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="事业部"
              prop="belongOrgId"
            >
              <el-select
                v-model="info.belongOrgId"
                clearable
                placeholder="请选择事业部"
                class="width--100"
                @change="belongOrgIdChange"
              >
                <el-option
                  v-for="item in divisionOptins"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
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
                clearable
                placeholder="请选择渠道商"
                v-model="info.agencyId"
                :search-name="info.agencyName"
                :params="channelSearch"
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
                @change="receiveAccountChange"
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
                @change="taxRateChange"
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
              <el-select
                v-model="info.payerId"
                clearable
                placeholder="付款方"
                class="width--100"
                @change="companyChange"
              >
                <el-option
                  v-for="item in accountOptins"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
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
                placeholder="付款帐号"
                class="width--100"
                @change="accountNoChange"
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
      <div
        class="tabClass"
        v-if="tabsList.length"
      >
        <span class="tabClass-title">联动周期</span>
        <el-tabs
          class="tabClass-tab"
          v-model="tabsValue"
          @tab-click="handleClick(tabsValue)"
        >
          <template v-for="(item, i) in tabsList">
            <el-tab-pane
              :name="item.value"
              :label="item.label | filterClieName"
              :key="i"
            ></el-tab-pane>
          </template>
        </el-tabs>
      </div>
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
            width="300"
          >
            <template v-slot="{ row }">
              <div :title="row.contNo">分销协议编号:
                <!-- <el-link
                  type="primary"
                  @click="routeToDistribution(row)"
                >{{row.contNo}}
                </el-link> -->
                <div>{{row.contNo}}</div>
              </div>
              <div class="text-ellipsis">是否垫佣: {{$root.dictAllName(row.isMat, 'PadCommission')}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="签约价格"
            prop="signPrice"
            width="120"
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
            <template v-slot="{ row }">
              <div>
                服务费:
                <el-input
                  v-model="row.serThisCommFees"
                  v-digits="2"
                  clearable
                  style="width: 70%"
                  @input="payApplyDetailListNumberChange(row, 'del')"
                />
              </div>
              <div class="margin-top-5">
                代理费:
                <el-input
                  v-model="row.ageThisCommFees"
                  v-digits="2"
                  readonly
                  style="width: 70%"
                  @click.native="agencyEdit(row)"
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
                @input="payApplyDetailListNumberChange(row, 'del')"
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
                @input="payApplyDetailListNumberChange(row, '')"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="本次实际付款金额"
            width="250"
          >
            <template v-slot="{ row }">
              <div>实际付款金额: {{practicalChange(row)}}</div>
              <div>
                <template v-if="row.noTaxAmountNew || row.noTaxAmountNew === 0">
                  <span>不含税金额: <del>{{noTaxAmountChange(row)}}</del></span>
                  <span style="color: red">{{` ${row.noTaxAmountNew}`}}</span>
                </template>
                <span v-else>不含税金额: {{noTaxAmountChange(row)}}</span>
              </div>
              <div>
                <template v-if="row.taxNew || row.taxNew === 0">
                  <span>税额: <del>{{taxChange(row)}}</del></span>
                  <span style="color: red">{{` ${row.taxNew}`}}</span>
                </template>
                <span v-else>税额: {{taxChange(row)}}</span>
              </div>
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
              {{ratioChange(row)+'%'}}
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
          >
            <template v-slot="{ row, $index }">
              <el-button
                type="danger"
                size="small"
                @click="delContacts(row, $index)"
              > 移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="info.payDeductDetailResponseList.length">
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
                @change="isAgainComputed = false;"
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
                @input="isAgainComputed = false"
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
        >点击计算结佣统计数据并生成结佣汇总清单</el-button>
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
                  <!-- <el-link
                    type="primary"
                    @click="routeToDistribution(item)"
                    :title="`编号: ${item.contNo}`"
                    class="text-ellipsis"
                  >
                    {{`编号: ${item.contNo}`}}
                  </el-link> -->
                  <div
                    class="text-ellipsis"
                    :title="`编号: ${item.contNo}`"
                  >{{`编号: ${item.contNo}`}}</div>
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
            <td>{{underNoTaxAmountChange()}}</td>
            <td>本期实际付款税额</td>
            <td>
              <el-input-number
                controls-position="right"
                class="inputClass"
                v-model="info.tax"
                :min="globalTaxMoney-10 < 0 ? 0 : globalTaxMoney-10"
                :max="globalTaxMoney+10"
                :precision="2"
                :step="0.01"
                placeholder="请输入"
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
                maxlength="2000"
                show-word-limit
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
              <div>
                <span
                  style="color: red"
                  v-if="row.subType"
                >*</span>{{row.name}}
              </div>
              <el-button
                v-if="$route.name !== 'payoffAdd' && row.code === 'SetteDetail'"
                @click="downloadTemplate('billForm')"
                type="success"
                size="small"
                icon="el-icon-download"
              >下载未盖章版</el-button>
              <el-button
                v-if="$route.name !== 'payoffAdd' && row.code === 'RequestForm'"
                @click="downloadTemplate('requestForm')"
                type="success"
                size="small"
                icon="el-icon-download"
              >下载未盖章版</el-button>
            </template>
          </el-table-column>
          <el-table-column label="附件">
            <template v-slot="{ row }">
              <IhUpload
                v-model="row.fileList"
                :file-size="10"
                :file-type="row.code"
                size="100px"
                :limit="row.limit ? row.fileList.length : 999"
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
          :loading="finishLoading"
          @click="submit('Unconfirm')"
          type="primary"
        >保存</el-button>
        <el-button
          :loading="submitLoading"
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
import { Component, Vue, Watch } from "vue-property-decorator";
import {
  get_payApply_get__id,
  post_payApply_entryApply,
  post_payApply_updateApply,
  post_payApply_calculation_results,
  post_payDeductDetail_deduct_details,
} from "@/api/payoff/index";
import { post_bankAccount_getByOrgId__orgId } from "@/api/finance/index";
import { get_channelBank_getAll__channelId } from "@/api/channel/index";
import {
  get_org_getUserDepartmentList,
  post_company_getAll,
} from "@/api/system/index";
import { post_project_getList } from "@/api/project/index";
import { Form as ElForm } from "element-ui";
import Obligation from "./dialog/obligation.vue";
import axios from "axios";
import { getToken } from "ihome-common/util/cookies";
import AgencyEdit from "./dialog/agencyEdit.vue";

@Component({
  components: {
    Obligation,
    AgencyEdit,
  },
  filters: {
    filterClieName(val: any) {
      const reg = /(?<=\().*?(?=\))/;
      const arr = val.match(reg);
      return arr[0];
    },
  },
})
export default class PayoffEdit extends Vue {
  private fileList: Array<object> = [];
  info: any = {
    payerId: null,
    payerName: null,
    paymentAccount: null,
    payerAccountBank: null,
    applyCode: null,
    projectId: null,
    projectName: null,
    belongOrgId: null,
    belongOrgName: null,
    agencyId: null,
    agencyName: null,
    receiveAccount: null,
    agencyAccountBank: null,
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
    tax: 0,
    description: null,
    documentList: [],
  };
  agencyDialogVisible: any = false;
  agencyData: any = [];
  channelAccountOptions: any = [];
  showTable: any = [];
  tabsValue: any = null;
  tabsList: any = [];
  fileListType: any = [];
  submitFile: any = {};
  contactsData: any = {};
  contactsDialogVisible = false;
  modify = false;
  computedLoading: any = false;
  submitLoading: any = false;
  finishLoading: any = false;
  globalTaxMoney: any = 0;
  agencyEditDealCode: any = null;

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
  isAgainComputed: any = true;
  oldTaxRate: any = null;
  divisionOptins: any = [];
  accountOptins: any = [];
  payerAccountOptions: any = [];
  projectCity: any = null;
  channelSearch: any = {
    cycleCity: null,
    departmentOrgId: null,
  };

  @Watch("info.belongOrgId", { deep: true })
  getAccountOptins(val: any) {
    if (val) {
      this.getAccount(val);
    } else {
      this.info.belongOrgName = null;
      this.info.payerId = null;
      this.info.payerName = null;
      this.info.payerAccountBank = null;
      this.info.paymentAccount = null;
      this.accountOptins = [];
      this.payerAccountOptions = [];
    }
  }

  @Watch("info.payerId", { deep: true })
  getPayerAccountOptions(val: any) {
    if (val) {
      this.getPayerInfo(val);
    } else {
      this.info.payerName = null;
      this.info.payerAccountBank = null;
      this.info.paymentAccount = null;
      this.payerAccountOptions = [];
    }
  }

  // 获取事业部
  async getDivision() {
    let res = await get_org_getUserDepartmentList({
      orgType: "Department",
      status: "Valid",
    });
    this.divisionOptins = res;
    if (res.length === 1) {
      this.info.orgId = res[0].id;
    }
  }

  belongOrgIdChange(val: any) {
    if (val) {
      const item = this.divisionOptins.find((v: any) => v.id === val);
      this.info.belongOrgId = item.id;
      this.info.belongOrgName = item.name;
      this.channelSearch = {
        cycleCity: this.projectCity,
        departmentOrgId: item.id,
      };
    }
  }

  // 获取付款方
  async getAccount(orgId: any) {
    let res = await post_company_getAll({
      orgId,
    });
    this.accountOptins = res;
    if (res.length === 1) {
      this.info.payerId = res[0].id;
      this.info.payerName = res[0].name;
    }
  }

  companyChange(val: any) {
    if (val) {
      const item = this.accountOptins.find((v: any) => v.id === val);
      this.info.payerId = item.id;
      this.info.payerName = item.name;
    }
  }

  // 获取付款账号
  async getPayerInfo(val: any) {
    const res = await post_bankAccount_getByOrgId__orgId({
      orgId: val,
    });
    this.payerAccountOptions = res;
    if (res.length === 1) {
      this.info.paymentAccount = res[0].accountNo;
      this.accountNoChange(res[0].accountNo);
    }
  }

  accountNoChange(data: any) {
    if (data) {
      const item = this.payerAccountOptions.find(
        (v: any) => v.accountNo === data
      );
      this.info.payerAccountBank = item.branchName;
      // this.info.paymentAccount = item.accountNo;
    } else {
      this.info.payerAccountBank = null;
      this.info.paymentAccount = null;
    }
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

  otherCycleChange(val: any) {
    const item = this.tabsList.find((v: any) => v.value === val.cycleId);
    val.cycleName = item.label;
    val.cycleId = item.value;
  }

  filterMsg(arr: any) {
    let msg = `含: <br/>`;
    arr.forEach((v: any) => {
      msg += `甲方公司:${v.partyAName} 代理费:${v.agencyFeesAmount}<br/>`;
    });
    return msg;
  }

  agencyEdit(data: any) {
    this.agencyEditDealCode = data.dealCode;
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
    let sum: any = 0;
    data.forEach((v: any) => {
      sum += Number(v.agencyFeesAmount);
    });
    const listIndex = this.info.payApplyDetailList.findIndex(
      (v: any) => v.dealCode === this.agencyEditDealCode
    );
    this.showTable = this.showTable.map((v: any) => {
      delete v.noTaxAmountNew;
      delete v.taxNew;
      if (v.dealCode === this.agencyEditDealCode) {
        return {
          ...v,
          ageThisCommFees: sum,
          ageThisCommFeesList: data,
        };
      } else {
        return {
          ...v,
        };
      }
    });
    const item = this.showTable.find(
      (v: any) => v.dealCode === this.agencyEditDealCode
    );
    this.$set(this.info.payApplyDetailList, listIndex, item);
    this.agencyDialogVisible = false;
    this.isAgainComputed = false;
    this.$message.success("保存成功");
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

  // 实际付款金额(本次申请付款金额合计-本次应扣)
  practicalChange(row: any) {
    const total = this.$math.add(
      Number(row.serThisCommFees),
      Number(row.ageThisCommFees)
    );
    const deduct = row.thisDeduct ? Number(row.thisDeduct) : 0;
    const res = this.$math.sub(total, deduct);
    row.actualAmount = this.$math.tofixed(res, 2);
    return this.$math.tofixed(res, 2);
  }

  // 税率变化
  taxRateChange(val: any) {
    if (Number(val) === Number(this.oldTaxRate)) {
      this.isAgainComputed = true;
    } else {
      this.isAgainComputed = false;
    }
  }

  // 待付款列表数据变化
  payApplyDetailListNumberChange(row: any, isdel: any) {
    this.info.payApplyDetailList = this.info.payApplyDetailList.map(
      (v: any) => {
        if (isdel) {
          delete v.noTaxAmountNew;
          delete v.taxNew;
        }
        return v.dealCode === row.dealCode ? row : v;
      }
    );
    if (isdel) {
      this.isAgainComputed = false;
    }
  }

  // 不含税金额(实际付款金额/(1+发票税率))
  noTaxAmountChange(row: any) {
    const practical = row.actualAmount ? Number(row.actualAmount) : 0;
    const taxRate = this.info.taxRate
      ? this.$math.div(this.info.taxRate, 100)
      : 0;
    const shuier = this.$math.add(1, taxRate);
    const res = this.$math.div(practical, shuier);
    row.noTaxAmount = this.$math.tofixed(res, 2);
    const index = this.info.payApplyDetailList.findIndex(
      (v: any) => v.dealCode === row.dealCode
    );
    this.info.payApplyDetailList[index].noTaxAmount = this.$math.tofixed(
      res,
      2
    );
    return this.$math.tofixed(res, 2);
  }

  // 税额(实际付款金额-不含税金额)
  taxChange(row: any) {
    const practical = row.actualAmount ? Number(row.actualAmount) : 0;
    const noTaxAmount = row.noTaxAmount ? Number(row.noTaxAmount) : 0;
    const res = this.$math.sub(practical, noTaxAmount);
    row.tax = this.$math.tofixed(res, 2);
    const index = this.info.payApplyDetailList.findIndex(
      (v: any) => v.dealCode === row.dealCode
    );
    this.info.payApplyDetailList[index].tax = this.$math.tofixed(res, 2);
    return this.$math.tofixed(res, 2);
  }

  // 本次支付比例(%)( 本次申请付款金额 / 拆佣金额 * 100 )
  ratioChange(row: any) {
    const total1 = this.$math.add(
      Number(row.serThisCommFees),
      Number(row.ageThisCommFees)
    );
    const total2 = this.$math.add(
      Number(row.serCommFees),
      Number(row.ageCommFees)
    );
    const total3 = isNaN(this.$math.div(total1, total2))
      ? 0
      : this.$math.div(total1, total2);
    const res = total3 ? this.$math.multi(total3, 100) : 0;
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
    const noTaxAmount = row.noTaxAmount ? Number(row.noTaxAmount) : 0;
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

  handleClick(val: any) {
    this.showTable = this.info.payApplyDetailList.filter(
      (v: any) => v.cycleId === val
    );
  }

  cancel() {
    this.$router.push("/payoff/list");
  }

  // 税额修改
  taxinputChange(number: any) {
    this.modify = true;
    if (!number) {
      this.info.tax =
        this.globalTaxMoney - 10 < 0 ? 0 : this.globalTaxMoney - 10;
    }
    let val = this.info.tax;
    let sub = this.$math.sub(this.globalTaxMoney, val);
    let listArr: any = [];
    let isSub = true;
    if (sub === 0) {
      isSub = false;
    } else {
      isSub = true;
    }
    for (let index = 0; index < this.info.payApplyDetailList.length; index++) {
      const element = this.info.payApplyDetailList[index];
      if (isSub) {
        let taxNew = this.$math.tofixed(this.$math.sub(element.tax, sub), 2);
        let noTaxAmountNew = this.$math.tofixed(
          this.$math.add(element.noTaxAmount, sub),
          2
        );
        if (taxNew > 0 && noTaxAmountNew > 0) {
          element.taxNew = taxNew;
          element.noTaxAmountNew = noTaxAmountNew;
          isSub = false;
          listArr.push(element);
        } else if (taxNew < 0) {
          element.taxNew = 0;
          element.noTaxAmountNew = this.$math.tofixed(
            this.$math.add(element.noTaxAmount, element.tax),
            2
          );
          sub = this.$math.tofixed(this.$math.sub(sub, element.tax), 2);
          isSub = true;
          listArr.push(element);
        } else {
          element.noTaxAmountNew = 0;
          element.taxNew = this.$math.tofixed(
            this.$math.add(element.noTaxAmount, element.tax),
            2
          );
          let newSub = this.$math.add(sub, element.noTaxAmount);
          sub = this.$math.tofixed(newSub, 2);
          isSub = true;
          listArr.push(element);
        }
      } else {
        delete element.taxNew;
        delete element.noTaxAmountNew;
        listArr.push(element);
      }
    }
    this.info.payApplyDetailList = listArr;
    this.showTable = this.info.payApplyDetailList.filter(
      (v: any) => v.cycleId === this.tabsValue
    );
  }

  // 本期实际付款金额（不含税）
  underNoTaxAmountChange() {
    let sum = 0;
    let actualAmount = this.info.actualAmount ? this.info.actualAmount : 0;
    sum = this.$math.sub(actualAmount, this.info.tax);
    this.info.noTaxAmount = sum;
    return this.$math.tofixed(sum, 2);
  }

  async created() {
    this.getInfo();
    this.getDivision();
  }

  async getInfo() {
    if (this.payoffId) {
      const res = await get_payApply_get__id({ id: this.payoffId });
      this.info = {
        ...res,
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
      this.globalTaxMoney = this.$math.tofixed(
        this.$math.sub(
          res.actualAmount,
          res.actualAmount / (1 + res.taxRate / 100 || 0)
        ),
        2
      );
      this.oldTaxRate = res.taxRate;
      this.getFileListType(res.documentList);
      this.getChannelInfo(
        {
          id: res.agencyId,
          name: res.agencyName,
        },
        "clear"
      );
      const projectItem = await post_project_getList({
        proId: res.projectId,
        pageNum: 1,
        pageSize: 20,
      });
      this.projectCity = projectItem?.list[0]?.city;
      this.belongOrgIdChange(res.belongOrgId);
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
        fileList: data.filter((j: any) => j.fileType === v.code),
      };
    });
    this.fileListType = this.fileListType.map((v: any) => {
      if (["Contract", "BusinessLicense"].includes(v.code)) {
        return {
          ...v,
          limit: true,
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
    this.computedLoading = true;
    let obj: any = {};
    obj.agencyId = this.info.agencyId;
    obj.agencyName = this.info.agencyName;
    obj.taxRate = Number(this.info.taxRate);
    obj.applyId = Number(this.payoffId);
    obj.payApplyDetailList = this.info.payApplyDetailList.map((v: any) => ({
      ...v,
      serThisCommFees: v.serThisCommFees ? v.serThisCommFees : 0,
      ageThisCommFees: v.ageThisCommFees ? v.ageThisCommFees : 0,
      thisDeduct: v.thisDeduct ? v.thisDeduct : 0,
    }));
    let otherArr: any = this.info.otherDeductionDetailResponseList.map(
      (v: any) => ({
        ...v,
        deductAmount: v.deductAmount ? Number(v.deductAmount) * -1 : 0,
      })
    );
    otherArr = otherArr.filter((v: any) => v.otherDeductionType);
    obj.otherDeductionDetailCalculationRequestList = otherArr;
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
      this.globalTaxMoney = this.$math.tofixed(
        this.$math.sub(
          res.actualAmount,
          res.actualAmount / (1 + this.info.taxRate / 100 || 0)
        ),
        2
      );
      this.info.paySummaryDetailsResponseList = res.paySummaryDetailsResponses;
      this.info.payApplyDetailList = this.info.payApplyDetailList.map(
        (v: any) => {
          delete v.taxNew;
          delete v.noTaxAmountNew;
          return {
            ...v,
          };
        }
      );
      this.showTable = this.showTable.map((v: any) => {
        delete v.taxNew;
        delete v.noTaxAmountNew;
        return {
          ...v,
        };
      });
      let arr: any = [];
      for (let item in this.submitFile) {
        if (
          !["Contract", "BusinessLicense"].includes(item) &&
          this.submitFile[item].length
        ) {
          let hasArr: any = this.submitFile[item].map((v: any) => ({
            exAuto: 0,
            fileId: v.fileId,
            fileName: v.fileName,
            fileType: v.type,
          }));
          arr.push(...hasArr);
        }
      }
      this.getFileListType(arr.concat(res.documentList));
      this.modify = true;
      this.isAgainComputed = true;
    } catch (err) {
      this.computedLoading = false;
    }
  }

  getSummaries(param: any) {
    const { columns, data } = param;
    let sums: any = [];
    columns.forEach((column: any, index: number) => {
      if (index === 0) {
        sums[index] = "合计";
        return;
      }
      if (index === 3) {
        let sum = 0;
        data.forEach((v: any) => {
          sum += Number(v.signPrice);
        });
        sums[index] = sum;
      } else if (index === 5) {
        let serviceSum = 0;
        let agencySum = 0;
        let hejiSum = 0;
        data.forEach((v: any) => {
          serviceSum += v.serReceiveFees;
          agencySum += v.serActualFees;
          hejiSum += v.serUnpaidFees;
        });
        sums[
          index
        ] = `应收: ${serviceSum} \n 实收: ${agencySum} \n 未收: ${hejiSum}`;
      } else if (index === 6) {
        let serviceSum = 0;
        let agencySum = 0;
        let hejiSum = 0;
        data.forEach((v: any) => {
          serviceSum += v.ageReceiveFees;
          agencySum += v.ageActualFees;
          hejiSum += v.ageUnpaidFees;
        });
        sums[
          index
        ] = `应收: ${serviceSum} \n 实收: ${agencySum} \n 未收: ${hejiSum}`;
      } else if (index === 7) {
        let serviceSum = 0;
        let agencySum = 0;
        let hejiSum = 0;
        data.forEach((v: any) => {
          serviceSum += v.serCommFees;
          agencySum += v.ageCommFees;
          hejiSum += v.serCommFees + v.ageCommFees;
        });
        sums[
          index
        ] = `服务费: ${serviceSum} \n 代理费: ${agencySum} \n 合计: ${hejiSum}`;
      } else if (index === 8) {
        let serviceSum = 0;
        let agencySum = 0;
        let hejiSum = 0;
        data.forEach((v: any) => {
          serviceSum += v.serSettledCommFees;
          agencySum += v.ageSettledCommFees;
          hejiSum += v.serSettledCommFees + v.ageSettledCommFees;
        });
        sums[
          index
        ] = `服务费: ${serviceSum} \n 代理费: ${agencySum} \n 合计: ${hejiSum}`;
      } else if (index === 9) {
        let serviceSum = 0;
        let agencySum = 0;
        let hejiSum = 0;
        data.forEach((v: any) => {
          serviceSum += v.serUnsetCommFees;
          agencySum += v.ageUnsetCommFees;
          hejiSum += v.serUnsetCommFees + v.ageUnsetCommFees;
        });
        sums[
          index
        ] = `服务费: ${serviceSum} \n 代理费: ${agencySum} \n 合计: ${hejiSum}`;
      } else if (index === 10) {
        let serviceSum = 0;
        let agencySum = 0;
        let hejiSum = 0;
        data.forEach((v: any) => {
          serviceSum += v.serCanCommFees;
          agencySum += v.ageCanCommFees;
          hejiSum += v.serCanCommFees + v.ageCanCommFees;
        });
        sums[
          index
        ] = `服务费: ${serviceSum} \n 代理费: ${agencySum} \n 合计: ${hejiSum}`;
      } else if (index === 11) {
        let serviceSum = 0;
        let agencySum = 0;
        let hejiSum = 0;
        data.forEach((v: any) => {
          serviceSum += Number(v.serThisCommFees);
          agencySum += Number(v.ageThisCommFees);
          hejiSum += Number(v.serThisCommFees) + Number(v.ageThisCommFees);
        });
        sums[
          index
        ] = `服务费: ${serviceSum} \n 代理费: ${agencySum} \n 合计: ${hejiSum}`;
      } else if (index === 12) {
        let sum = 0;
        data.forEach((v: any) => {
          sum += Number(v.thisDeduct);
        });
        sums[index] = sum;
      } else if (index === 14) {
        let actualAmount = 0;
        let noTaxAmount = 0;
        let tax = 0;
        data.forEach((v: any) => {
          actualAmount += Number(v.actualAmount);
          noTaxAmount += v.noTaxAmountNew
            ? Number(v.noTaxAmountNew)
            : Number(v.noTaxAmount);
          tax += v.taxNew ? Number(v.taxNew) : Number(v.tax);
        });
        sums[
          index
        ] = `实际付款金额: ${actualAmount} \n 不含税金额： ${noTaxAmount} \n 税额: ${tax}`;
      } else if (index === 15) {
        let sum = 0;
        data.forEach((v: any) => {
          sum += Number(v.serLimitFees) + Number(v.ageLimitFees);
        });
        sums[index] = sum;
      } else if (index === 16) {
        sums[index] = "--";
      } else {
        sums[index] = "--";
      }
    });
    return sums;
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
            return this.$math.tofixed(prev + curr, 2);
          } else {
            return this.$math.tofixed(prev, 2);
          }
        }, 0);
        if (index === 2) {
          let total = this.$math.tofixed(sums[index], 2);
          sums[index] = `-${total}`;
        }
        if (index === 3) {
          let total = this.$math.tofixed(sums[index], 2);
          if (!total) {
            sums[index] = `-${total}`;
          } else {
            sums[index] = total;
          }
        }
        if (index === 5) {
          sums[index] = "--";
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

  async delContacts(data: any, index: number) {
    if (this.showTable.length === 1) {
      let otherArr = this.info.otherDeductionDetailResponseList;
      this.showTable = [];
      this.tabsValue = "";
      this.tabsList = this.tabsList.filter(
        (v: any) => v.value !== data.cycleId
      );
      this.info.payApplyDetailList = this.info.payApplyDetailList.filter(
        (v: any) => v.cycleId !== data.cycleId
      );
      this.info.otherDeductionDetailResponseList = otherArr.filter((v: any) => {
        if (v.cycleId !== data.cycleId) {
          return {
            ...v,
          };
        }
      });
    } else {
      this.showTable.splice(index, 1);
      this.info.payApplyDetailList = this.info.payApplyDetailList.filter(
        (v: any) => v.dealCode !== data.dealCode
      );
    }
    if (this.tabsList.length) {
      this.tabsValue = this.tabsList[0].value;
      this.handleClick(this.tabsValue);
    }
    this.isAgainComputed = false;
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
    this.isAgainComputed = false;
  }

  async delOtherDeduction(index: number) {
    this.info.otherDeductionDetailResponseList.splice(index, 1);
    this.isAgainComputed = false;
  }

  async downloadTemplate(type: any) {
    const fileId = this.info[type];
    if (fileId) {
      const token: any = getToken();
      axios({
        method: "GET",
        url: `/sales-api/sales-document-cover/file/download/${fileId}`,
        xsrfHeaderName: "Authorization",
        responseType: "blob",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
        },
      }).then((res: any) => {
        const href = window.URL.createObjectURL(res.data);
        const $a = document.createElement("a");
        $a.href = href;
        if (type === "requestForm") {
          $a.download = `请款单.pdf`;
        } else {
          $a.download = `结算明细.xlsx`;
        }
        $a.click();
        $a.remove();
      });
    }
  }

  contactsFinish(data: any) {
    let arr: any = data.map((v: any) => ({
      ...v,
      thisDeduct: 0,
      cycleId: v.cycleId + "",
      serThisCommFees: v.serCanCommFees,
      ageThisCommFees: v.ageCanCommFees,
      ageThisCommFeesList: v.canCommFeesList.map((j: any) => ({
        ...j,
        agencyFeesType: "ThisCommFees",
      })),
    }));
    this.info.payApplyDetailList = arr;
    this.filterTabs(this.info.payApplyDetailList);
    this.contactsDialogVisible = false;
    this.isAgainComputed = false;
  }

  async getChannelInfo(item: any, type: any) {
    if (this.info.projectId && this.info.belongOrgId) {
      this.info.agencyName = item.name;
      let res = await get_channelBank_getAll__channelId({ channelId: item.id });
      this.channelAccountOptions = res;
      if (!type) {
        this.info.receiveAccount = null;
        this.showTable = [];
        this.info.payApplyDetailList = [];
        // 获取本期需抵扣金额明细
        this.queryDeductionData(item.id, this.info.projectId);
      }
      if (res.length === 1) {
        this.info.receiveAccount = res[0].accountNo;
        this.info.agencyAccountBank = res[0].branchName;
      }
    } else {
      this.$message.warning("请先选择结佣项目、事业部");
      this.info.agencyId = null;
      this.info.agencyName = null;
      return;
    }
  }

  receiveAccountChange(data: any) {
    const item = this.channelAccountOptions.find(
      (v: any) => v.accountNo === data
    );
    this.info.agencyAccountBank = item.branchName;
  }

  async queryDeductionData(channelId: any, projectId: any) {
    const res = await post_payDeductDetail_deduct_details({
      channelId,
      projectId,
    });
    this.info.payDeductDetailResponseList = res
      ? res.map((v: any) => ({
          ...v,
          noTaxAmount: v.noTaxAmount ? v.noTaxAmount : 0,
          tax: v.tax ? v.tax : 0,
        }))
      : [];
  }

  submit(val: string) {
    if (this.isAgainComputed) {
      (this.$refs["form"] as ElForm).validate(async (v: any) => {
        if (v) {
          if (val === "Unconfirm") this.finishLoading = true;
          else this.submitLoading = true;
          let obj: any = {
            payApplyVO: {},
            payApplyDetailList: [],
          };
          obj.modify = this.modify;
          obj.payApplyVO.payerId = this.info.payerId;
          obj.payApplyVO.payerName = this.info.payerName;
          obj.payApplyVO.paymentAccount = this.info.paymentAccount;
          obj.payApplyVO.payerAccountBank = this.info.payerAccountBank;
          obj.payApplyVO.deductionCategory = this.info.deductionCategory;
          obj.payApplyVO.description = this.info.description;
          obj.payApplyVO.actualAmount = this.info.actualAmount;
          obj.payApplyVO.agencyId = this.info.agencyId;
          obj.payApplyVO.agencyName = this.info.agencyName;
          obj.payApplyVO.applyAmount = this.info.applyAmount;
          obj.payApplyVO.agencyAccountBank = this.info.agencyAccountBank;
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
          obj.payApplyDetailList = this.info.payApplyDetailList.map(
            (v: any) => ({
              ...v,
              noTaxAmount: v.noTaxAmountNew ? v.noTaxAmountNew : v.noTaxAmount,
              tax: v.taxNew ? v.taxNew : v.tax,
              serThisCommFees: v.serThisCommFees ? v.serThisCommFees : 0,
              ageThisCommFees: v.ageThisCommFees ? v.ageThisCommFees : 0,
              thisDeduct: v.thisDeduct ? v.thisDeduct : 0,
            })
          );
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
              fileList: arr.filter((j: any) => j.fileType === v.code),
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
            let filterDocumentList = arr.map((v: any) => ({
              fileId: v.fileId,
              fileName: v.fileName,
              fileType: v.fileType,
              exAuto: v.exAuto ? v.exAuto : 0,
            }));
            obj.documentList = filterDocumentList.filter((v: any) => !v.exAuto);
          } else {
            this.$message({
              type: "warning",
              message: `${msgList.join(",")}项,请上传附件`,
            });
            return;
          }
          let otherArr: any = this.info.otherDeductionDetailResponseList.map(
            (v: any) => ({
              ...v,
              deductAmount: v.deductAmount ? Number(v.deductAmount) * -1 : 0,
            })
          );
          otherArr = otherArr.filter((v: any) => v.otherDeductionType);
          if (this.$route.name === "payoffAdd") {
            obj.otherDeductionDetailCalculationRequestList = otherArr;
            obj.payDeductDetailCalculationRequestList = this.info.payDeductDetailResponseList;
            try {
              await post_payApply_entryApply(obj);
              this.finishLoading = false;
              this.submitLoading = false;
            } catch (err) {
              this.finishLoading = false;
              this.submitLoading = false;
              return;
            }
          } else if (this.$route.name === "payoffEdit") {
            obj.otherDeductionDetailResponseList = otherArr;
            obj.payDeductDetailResponseList = this.info.payDeductDetailResponseList;
            obj.payApplyVO.id = this.payoffId;
            obj.applyCode = this.info.applyCode;
            try {
              await post_payApply_updateApply(obj);
              this.finishLoading = false;
              this.submitLoading = false;
            } catch (err) {
              this.finishLoading = false;
              this.submitLoading = false;
              return;
            }
          }
          this.$goto({ path: `/payoff/list` });
          this.$message({
            type: "success",
            message: val === "Unconfirm" ? "保存成功!" : "提交成功!",
          });
        } else {
          setTimeout(() => {
            let isError: any = document.getElementsByClassName("is-error");
            if (isError != null) {
              isError[0].querySelector("input").focus();
            }
          }, 100);
          return false;
        }
      });
    } else {
      this.$message.warning("请点击计算结佣统计数据及成本归属明细");
    }
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
  display: block;
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

.tableprefix {
  line-height: 40px;
  color: #000;
  /deep/ .el-input__prefix {
    left: 10px;
  }
}

.tabClass {
  display: flex;
  flex-flow: row nowrap;
  margin-left: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  &-title {
    width: 100px;
    margin-top: 10px;
  }
}
</style>