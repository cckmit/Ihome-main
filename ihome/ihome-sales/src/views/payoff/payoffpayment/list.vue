<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-01-15 10:45:53
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-15 15:55:36
-->
<template>
  <IhPage label-width="100px">
    <template #form>
      <el-form label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="渠道商">
              <el-input
                v-model="queryPageParameters.agencyName"
                placeholder="请输入渠道商"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结算方式">
              <el-select
                style="width: 100%"
                v-model="queryPageParameters.settlementMethod"
                clearable
                placeholder="请选择"
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
            <el-form-item label="付款方式">
              <el-select
                style="width: 100%"
                v-model="queryPageParameters.paymentMethod"
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
            <el-form-item label="付款申请单号">
              <el-input
                v-model="queryPageParameters.applyCode"
                placeholder="请输入付款申请单号"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="支付唯一编码">
              <el-input
                v-model="queryPageParameters.paymentCode"
                placeholder="请输入支付唯一编码"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="日期类型">
              <el-select
                style="width: 100%"
                v-model="queryPageParameters.payDateType"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in $root.dictAllList('PayDateType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-date-picker
              style="width:100%;"
              v-model="timeList"
              type="daterange"
              align="left"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="$root.pickerOptions"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template #btn>
      <el-row>
        <el-button
          type="primary"
          @click="search()"
        >查询</el-button>
        <el-button
          type="info"
          @click="reset()"
        >重置</el-button>
        <el-button type="success">合并付款推送</el-button>
      </el-row>
    </template>
    <template #table>
      <br />
      <!-- table-标签页 -->
      <el-tabs
        v-model="tabsValue"
        type="border-card"
        @tab-click="handleClick(tabsValue)"
      >
        <template v-for="(i, n) in tabsList">
          <el-tab-pane
            :label="i.label"
            :name="i.name"
            :key="n"
          >
            <!-- table-content -->
            <el-table
              class="ih-table"
              :empty-text="emptyText"
              :data="showTable"
            >
              <el-table-column
                v-if="i.name === 'PendingPayment'"
                type="selection"
                width="50"
                align="center"
              ></el-table-column>
              <el-table-column
                label="付款结算单号"
                prop="settlementCode"
                fixed
              ></el-table-column>
              <el-table-column
                label="付款申请单编号"
                prop="applyCode"
              ></el-table-column>
              <el-table-column
                label="结算方式"
                prop="settlementMethod"
              >
                <template v-slot="{ row }">{{
                  $root.dictAllName(row.settlementMethod, "SettlementMethod")
                }}</template>
              </el-table-column>
              <el-table-column
                label="付款方式"
                prop="paymentMethod"
                width="120"
              >
                <template v-slot="{ row }">{{
                  $root.dictAllName(row.paymentMethod, "PaymentMethod")
                }}</template>
              </el-table-column>
              <el-table-column
                label="付款金额"
                prop="actualAmount"
              ></el-table-column>
              <el-table-column label="收款方信息">
                <template v-slot="{ row }">
                  <div>{{`渠道公司：${row.agencyName}`}}</div>
                  <div>{{`收款帐号：${row.receiveAccount}`}}</div>
                </template>
              </el-table-column>
              <el-table-column label="付款方信息">
                <template v-slot="{ row }">
                  <div>{{`公司名称：${row.companyName}`}}</div>
                  <div>{{`付款账户：${row.paymentAccount}`}}</div>
                </template>
              </el-table-column>
              <el-table-column
                label="状态"
                prop="paymentStatus"
                width="140"
                align="center"
              >
                <template v-slot="{ row }">
                  <div>
                    {{$root.dictAllName(row.paymentStatus, "PayoffStatus")}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="i.name !== 'PendingPayment'"
                label="支付唯一编码"
                prop="paymentCode"
              ></el-table-column>
              <el-table-column
                v-if="['', 'Paying'].includes(i.name)"
                label="推送时间"
                prop="pushDate"
              ></el-table-column>
              <el-table-column
                v-if="!['PendingPayment', 'Paying'].includes(i.name)"
                label="付款时间"
                prop="paymentDate"
              ></el-table-column>
              <el-table-column
                v-if="['', 'PaymentFail', 'TicketRefunded'].includes(i.name)"
                label="失败原因"
                prop="reason"
              ></el-table-column>
              <el-table-column
                v-if="!['PaymentSuccess', 'Paying'].includes(i.name)"
                label="操作"
                width="auto"
                fixed="right"
                align="center"
              >
                <template v-slot="{  }">
                  <el-link type="primary">拆分</el-link>
                  <el-link type="primary">付款推送</el-link>
                  <el-link type="primary">设置已付款</el-link>
                  <el-link type="primary">修改</el-link>
                  <el-link type="primary">同步状态</el-link>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </template>
      </el-tabs>
    </template>
    <template #pagination>
      <br />
      <el-pagination
        @size-change="handleSizeChangeMixin"
        @current-change="handleCurrentChangeMixin"
        :current-page.sync="queryPageParameters.pageNum"
        :page-sizes="$root.pageSizes"
        :page-size="queryPageParameters.pageSize"
        :layout="$root.paginationLayout"
        :total="resPageInfo.total"
      ></el-pagination>
    </template>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PaginationMixin from "../../../mixins/pagination";
import { post_payDetail_getList } from "@/api/payoff/index";

@Component({
  mixins: [PaginationMixin],
})
export default class ReturnConfirmList extends Vue {
  queryPageParameters: any = {
    agencyName: null,
    settlementMethod: null,
    paymentMethod: null,
    applyCode: null,
    paymentCode: null,
    beginDate: null,
    endDate: null,
    paymentStatusList: [
      "PendingPayment",
      "Paying",
      "PaymentSuccess",
      "PaymentFail",
      "TicketRefunded",
    ],
  };
  tabsValue: any = "";
  resPageInfo: any = {
    total: null,
    list: [],
  };
  private timeList: any = [];
  private tabsList: any = [
    {
      label: "全部",
      name: "",
    },
    {
      label: "待付款",
      name: "PendingPayment",
    },
    {
      label: "付款中",
      name: "Paying",
    },
    {
      label: "付款成功",
      name: "PaymentSuccess",
    },
    {
      label: "付款失败",
      name: "PaymentFail",
    },
    {
      label: "已退票",
      name: "TicketRefunded",
    },
  ];
  showTable: any = [];

  async getListMixin() {
    this.resPageInfo = await post_payDetail_getList(this.queryPageParameters);
    this.resPageInfo.list = [{}];
  }

  created() {
    this.getListMixin();
  }

  handleClick(val: any) {
    this.showTable = this.resPageInfo.list.filter(
      (v: any) => v.paymentStatus === val
    );
  }

  search() {
    if (this.timeList.length) {
      this.queryPageParameters.beginDate = this.timeList[0];
      this.queryPageParameters.endDate = this.timeList[1];
    }
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }

  reset() {
    Object.assign(this.queryPageParameters, {
      agencyName: null,
      settlementMethod: null,
      paymentMethod: null,
      applyCode: null,
      paymentCode: null,
      beginDate: null,
      endDate: null,
    });
    this.timeList = [];
  }
}
</script>