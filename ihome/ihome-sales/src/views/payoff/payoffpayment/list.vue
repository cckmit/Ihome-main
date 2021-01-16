<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-01-15 10:45:53
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-16 14:50:18
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
        <el-button
          type="success"
          v-if="tabsValue === 'PendingPayment'"
          @click="mergePush(selection, 'merge')"
        >合并付款推送</el-button>
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
              @selection-change="selectionChange"
            >
              <el-table-column
                v-if="i.name === 'PendingPayment'"
                type="selection"
                width="50"
                align="center"
                :selectable="selectable"
              ></el-table-column>
              <el-table-column
                label="付款结算单号"
                prop="settlementCode"
                width="150"
                fixed
              ></el-table-column>
              <el-table-column
                label="付款申请单编号"
                prop="applyCode"
                width="150"
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
              <el-table-column
                label="收款方信息"
                width="180"
              >
                <template v-slot="{ row }">
                  <div
                    class="text-ellipsis"
                    :title="row.agencyName"
                  >{{`渠道公司：${row.agencyName}`}}</div>
                  <div
                    class="text-ellipsis"
                    :title="row.receiveAccount"
                  >{{`收款帐号：${row.receiveAccount}`}}</div>
                </template>
              </el-table-column>
              <el-table-column
                label="付款方信息"
                width="180"
              >
                <template v-slot="{ row }">
                  <div
                    class="text-ellipsis"
                    :title="row.companyName"
                  >{{`公司名称：${row.companyName}`}}</div>
                  <div
                    class="text-ellipsis"
                    :title="row.paymentAccount"
                  >{{`付款账户：${row.paymentAccount}`}}</div>
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
                    {{$root.dictAllName(row.paymentStatus, "PayStatus")}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="i.name !== 'PendingPayment'"
                label="支付唯一编码"
                prop="paymentCode"
                width="150"
              ></el-table-column>
              <el-table-column
                v-if="['all', 'Paying'].includes(i.name)"
                label="推送时间"
                prop="pushDate"
                width="120"
              ></el-table-column>
              <el-table-column
                v-if="!['PendingPayment', 'Paying'].includes(i.name)"
                label="付款时间"
                prop="paymentDate"
                width="120"
              ></el-table-column>
              <el-table-column
                v-if="['all', 'PaymentFail', 'TicketRefunded'].includes(i.name)"
                label="失败原因"
                prop="reason"
                width="150"
              ></el-table-column>
              <el-table-column
                v-if="!['PaymentSuccess', 'Paying'].includes(i.name)"
                label="操作"
                width="90"
                fixed="right"
                align="center"
              >
                <template v-slot="{ row }">
                  <el-link
                    type="primary"
                    v-if="['PendingPayment'].includes(row.paymentStatus) && row.settlementMethod === 'Centralization'"
                  >拆分</el-link>
                  <el-link
                    type="primary"
                    v-if="['PendingPayment'].includes(row.paymentStatus) && row.settlementMethod === 'Centralization'"
                    @click="mergePush(row, 'single')"
                  >付款推送</el-link>
                  <el-link
                    type="primary"
                    v-if="row.settlementMethod === 'OnlineBanking'"
                  >设置已付款</el-link>
                  <el-link
                    type="primary"
                    v-if="['PendingPayment'].includes(row.paymentStatus)"
                  >修改</el-link>
                  <el-link
                    type="primary"
                    v-if="['PaymentFail', 'TicketRefunded'].includes(row.paymentStatus)"
                  >同步状态</el-link>
                  <span v-if="['Paying', 'PaymentSuccess'].includes(row.paymentStatus)">---</span>
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
import {
  post_payDetail_getList,
  post_payDetail_push,
} from "@/api/payoff/index";

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
  tabsValue: any = "all";
  resPageInfo: any = {
    total: null,
    list: [],
  };
  private timeList: any = [];
  private tabsList: any = [
    {
      label: "全部",
      name: "all",
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
  selection: any = [];

  async getListMixin() {
    this.resPageInfo = await post_payDetail_getList(this.queryPageParameters);
    this.showTable = this.resPageInfo.list;
  }

  selectable(row: any) {
    if (row.settlementMethod !== "Centralization") {
      return false;
    } else {
      return true;
    }
  }

  created() {
    this.getListMixin();
  }

  handleClick(val: any) {
    if (val !== "all") {
      this.showTable = this.resPageInfo.list.filter(
        (v: any) => v.paymentStatus === val
      );
    } else {
      this.showTable = this.resPageInfo.list;
    }
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

  selectionChange(selection: any) {
    this.selection = selection;
  }

  // 合并推送
  async mergePush(data: any, type: any) {
    (this.$notify as any).closeAll();
    let arr: any = [];
    if (type === "merge") {
      if (this.selection.length) {
        arr = this.selection.map((v: any) => v.settlementCode);
      } else {
        this.$notify({
          type: "error",
          title: "请勾选至少一条付款结算单",
          message: "至少勾选一条付款结算单推送",
          position: "bottom-right",
        });
        return;
      }
    } else {
      arr = [data.settlementCode];
    }
    await post_payDetail_push(arr);
    this.$notify({
      type: "success",
      title: "推送成功",
      message: "付款推送成功",
      position: "bottom-right",
    });
  }
}
</script>
<style lang="scss" scoped>
.text-ellipsis {
  width: 100%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>