<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-26 11:11:19
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-26 08:45:11
-->
<template>
  <IhPage>
    <template v-slot:form>
      <p class="ih-info-title">付款申请单信息</p>
      <el-form
        ref="form"
        label-width="120px"
        :model="info"
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
                disabled
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
      <p class="ih-info-title">待付款列表</p>
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
                <el-link
                  type="primary"
                  @click="routeToDistribution(row)"
                >{{row.contNo}}
                </el-link>
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
            <template v-slot="{ row }">
              <div>服务费: {{row.serThisCommFees}}</div>
              <el-tooltip placement="top">
                <div
                  slot="content"
                  v-html="filterMsg(row.ageThisCommFeesList)"
                ></div>
                <div style="cursor: pointer; color: #4881f9">代理费: {{row.ageThisCommFees}}</div>
              </el-tooltip>
              <div>合计: {{
                $math.tofixed($math.add(Number(row.serThisCommFees), Number(row.ageThisCommFees)), 2)
              }}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="本次应扣"
            width="150"
            prop="thisDeduct"
          >
          </el-table-column>
          <el-table-column
            label="扣除项类别"
            width="200"
            prop="deductType"
          >
          </el-table-column>
          <el-table-column
            label="本次实际付款金额"
            width="150"
          >
            <template v-slot="{ row }">
              <div>实际付款金额: {{row.actualAmount}}</div>
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
              <div>签字确认: {{row.signConfirm}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="本次支付比例(%)"
            prop="ratio"
            width="150"
          ></el-table-column>
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
            ></el-table-column>
            <el-table-column
              label="税额"
              prop="tax"
            ></el-table-column>
          </el-table>
        </div>
      </div>
      <br />
      <p class="ih-info-title">其他扣除项</p>
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
              <span v-if="row.otherDeductionType">{{$root.dictAllName(row.otherDeductionType, 'OtherDeductionType')}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="项目周期"
            width="250"
          >
            <template v-slot="{ row }">
              <span
                :title="row.cycleName"
                class="text-ellipsis"
              >{{row.cycleName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="本期扣除金额"
            prop="deductAmount"
          >
          </el-table-column>
          <el-table-column
            label="不含税金额"
            prop="noTaxAmount"
          >
          </el-table-column>
          <el-table-column
            label="税额"
            prop="tax"
          >
          </el-table-column>
          <el-table-column
            label="备注"
            prop="remark"
            width="200"
          >
          </el-table-column>
        </el-table>
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
            <td>{{info.tax}}</td>
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
              <el-button
                v-if="$route.name === 'payoffReplenish' && row.code === 'SetteDetail'"
                @click="downloadTemplate('billForm')"
                type="success"
                size="small"
                icon="el-icon-download"
              >下载未盖章版</el-button>
              <el-button
                v-if="$route.name === 'payoffReplenish' && row.code === 'RequestForm'"
                @click="downloadTemplate('requestForm')"
                type="success"
                size="small"
                icon="el-icon-download"
              >下载未盖章版</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="附件"
            v-if="['payoffInfo', 'payoffRecall'].includes($route.name)"
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
                :limit="row.limit ? row.fileList.length : 999"
                :upload-show="row.limit && !!row.fileList.length"
                @newFileList="queryNew"
              ></IhUpload>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <br />
      <div class="content">
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
          :data="info.processRecordResponseList"
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
        >提 交</el-button>
        <el-button
          v-if="$route.name==='payoffRecall'"
          @click="recall()"
          type="success"
        >撤 回</el-button>
        <el-button @click="cancel">返 回</el-button>
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
  post_payApply_withdrawSubmit,
} from "@/api/payoff/index";
import { Form as ElForm } from "element-ui";
import axios from "axios";
import { getToken } from "ihome-common/util/cookies";

@Component({
  components: {},
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
    processRecordResponseList: [],
  };
  channelAccountOptions: any = [];
  showTable: any = [];
  tabsValue: any = null;
  tabsList: any = [];
  fileListType: any = [];
  submitFile: any = {};
  operateVisible: any = false;

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

  filterMsg(arr: any) {
    let msg = `含: <br/>`;
    arr.forEach((v: any) => {
      msg += `甲方公司:${v.partyAName} 代理费:${v.agencyFeesAmount}<br/>`;
    });
    return msg;
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
        taxRate: res.taxRate + "",
        payApplyDetailList: res.payApplyDetailList.map((j: any) => ({
          ...j,
          cycleId: j.cycleId + "",
        })),
      };
      this.getFileListType(res.documentList);
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
            exAuto: 1,
          })),
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

  downloadTemplate(type: any) {
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
    this.info.processRecordResponseList = res;
  }

  // 撤回
  async recall() {
    await post_payApply_withdrawSubmit({
      id: this.payoffId,
    });
    this.$message({
      type: "success",
      message: "撤回成功!",
    });
    this.$goto({ path: `/payoff/list` });
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
          arr = arr.filter((v: any) => !v.exAuto);
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