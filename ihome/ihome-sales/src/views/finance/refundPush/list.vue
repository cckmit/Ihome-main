 
<!--
 * @Description: 
 * @version: 
 * @Author: zyc
 * @Date: 2021-01-13 14:50:21
 * @LastEditors: wwq
 * @LastEditTime: 2021-03-09 15:59:30
-->
<template>
  <IhPage label-width="110px">
    <template #form>
      <el-form label-width="110px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="收款姓名">
              <el-input
                v-model="queryPageParameters.refundName"
                placeholder="收款姓名"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="付款方">
              <IhSelectPageByPayer
                clearable
                v-model="queryPageParameters.companyId"
                :isBlur="false"
              ></IhSelectPageByPayer>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="支付唯一编码">
              <el-input
                v-model="queryPageParameters.refundPayNo"
                placeholder="支付唯一编码"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="退款申请单编号">
              <el-input
                v-model="queryPageParameters.refundApplyNo"
                placeholder="退款申请单编号"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="结算方式">
              <el-select
                v-model="queryPageParameters.settlementType"
                clearable
                placeholder="结算方式"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('RefundSettlementType')"
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
                v-model="queryPageParameters.payType"
                clearable
                placeholder="付款方式"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('RefundPayType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="日期类型"
              style="text-align: left"
            >
              <el-select
                style="width: 30%"
                v-model="queryPageParameters.dateType"
                clearable
                placeholder="日期类型"
                @clear="dateTypeClear()"
              >
                <el-option
                  v-for="item in $root.dictAllList('PayDateType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>

              <el-date-picker
                style="width: 70%"
                v-model="queryPageParameters.expiresTime"
                type="daterange"
                align="left"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="$root.pickerOptions"
                value-format="yyyy-MM-dd"
                :disabled="!queryPageParameters.dateType"
                @change="expiresTimeChange"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template #btn>
      <el-row>
        <el-button
          type="primary"
          @click="searchMixin()"
        >查询</el-button>
        <el-button @click="reset()">重置</el-button>
      </el-row>
    </template>
    <template #table>
      <br />

      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        type="border-card"
      >
        <el-tab-pane
          v-for="(item, index) in tabList"
          :key="index"
          :label="item.label"
          :name="item.name"
        >
          <el-table
            class="ih-table"
            :empty-text="emptyText"
            :data="resPageInfo.list"
          >
            <el-table-column
              type="index"
              width="50"
              align="center"
              label="序号"
              fixed
            ></el-table-column>
            <el-table-column
              label="退款项编号"
              prop="refundNo"
              min-width="200"
              fixed
            ></el-table-column>
            <el-table-column
              label="退款申请单编号"
              min-width="200"
              prop="refundApplyNo"
            >
              <template slot-scope="scope">
                <el-link
                  type="primary"
                  @click="gotoRefundApplyNo(scope)"
                >
                  {{ scope.row.refundApplyNo }}</el-link>
              </template>
            </el-table-column>
            <el-table-column
              label="唯一支付编码"
              prop="refundPayNo"
              min-width="200"
            ></el-table-column>
            <el-table-column
              label="结算方式"
              prop="settlementType"
            >
              <template slot-scope="scope">{{
                $root.dictAllName(
                  scope.row.settlementType,
                  "RefundSettlementType"
                )
              }}</template>
            </el-table-column>
            <el-table-column
              label="付款方式"
              prop="payType"
            >
              <template slot-scope="scope">{{
                $root.dictAllName(scope.row.payType, "RefundPayType")
              }}</template>
            </el-table-column>
            <el-table-column
              label="退款金额"
              prop="amount"
            ></el-table-column>
            <el-table-column
              label="退款人信息"
              prop="refundName"
              width="300"
            >
              <template slot-scope="scope">
                <div>收款姓名:{{ scope.row.refundName }}</div>
                <div>收款帐号:{{ scope.row.refundAccount }}</div>
                <div>开户行:{{ scope.row.refundBankName }}</div>
              </template>
            </el-table-column>
            <el-table-column
              label="付款方信息"
              prop="accountName"
              width="400"
            >
              <template slot-scope="scope">
                <div>账户名称:{{ scope.row.accountName }}</div>
                <div>账户账号:{{ scope.row.accountNo }}</div>
                <div>开户行:{{ scope.row.branchName }}</div>
              </template>
            </el-table-column>
            <el-table-column
              label="状态"
              prop="status"
            >
              <template slot-scope="scope">{{
                $root.dictAllName(scope.row.status, "FinRefundItemPushStatus")
              }}</template>
            </el-table-column>
            <el-table-column
              label="备注信息"
              prop="remark"
              width="200"
            ></el-table-column>
            <el-table-column
              label="摘要"
              prop="digest"
              width="150"
            ></el-table-column>
            <el-table-column
              label="推送时间"
              prop="pushDate"
              width="100"
            ></el-table-column>
            <el-table-column
              label="支付时间"
              prop="payDate"
              width="200"
            ></el-table-column>
            <el-table-column
              label="操作"
              width="120"
              fixed="right"
            >
              <template v-slot="{ row }">
                <el-link
                  type="primary"
                  @click="refundPush(row)"
                  style="margin-right: 10px"
                  v-has="'B.SALES.FINANCE.REFUNDTOEXAMIN.REFUNDPUSH'"
                  v-if="row.settlementType == 'CentralizedPay'"
                  :class="{
                    'ih-data-disabled': [
                      'RefundedTicket',
                      'Paying',
                      'Paid',
                    ].includes(row.status),
                  }"
                >退款推送</el-link>
                <el-link
                  v-if="row.settlementType === 'OnlinePay'"
                  type="primary"
                  @click="setUpARefund(row)"
                  style="margin-right: 10px"
                  v-has="'B.SALES.FINANCE.REFUNDTOEXAMIN.SREFUNDED'"
                  :class="{
                    'ih-data-disabled':
                      ['RefundedTicket', 'Paying', 'Paid'].includes(
                        row.status
                      ) && row.settlementType === 'OnlinePay',
                  }"
                >设置已退款</el-link>
                <el-link
                  type="primary"
                  @click="edit(row)"
                  style="margin-right: 10px"
                  v-has="'B.SALES.FINANCE.REFUNDTOEXAMIN.EDIT'"
                  :class="{
                    'ih-data-disabled': [
                      'RefundedTicket',
                      'Paying',
                      'Paid',
                    ].includes(row.status),
                  }"
                >修改</el-link>
                <el-link
                  type="primary"
                  @click="syncStatus(row)"
                  style="margin-right: 10px"
                  v-has="'B.SALES.FINANCE.REFUNDTOEXAMIN.SYNC'"
                  :class="{
                    'ih-data-disabled': ['PendingPay'].includes(row.status),
                  }"
                >同步状态</el-link>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
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
    <!-- dialog -->
    <ih-dialog :show="prodialogVisible">
      <RefundPushEdit
        :data="editData"
        @cancel="() => (prodialogVisible = false)"
        @finish="refundPushEditFinish"
      />
    </ih-dialog>

    <ih-dialog :show="setUpARefundShow">
      <SetUpARefund
        :data="setUpARefundData"
        @cancel="() => (setUpARefundShow = false)"
        @finish="setUpARefundFinish"
      />
    </ih-dialog>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PaginationMixin from "../../../mixins/pagination";
import {
  post_refundItemPush_refundPush,
  post_refundItemPush_getList,
  post_refundItemPush_syncStatus,
  get_refundItem_getRefundApplyId__applyNo,
} from "../../../api/finance/index";

import RefundPushEdit from "./edit.vue";
import SetUpARefund from "./dialog/setUpARefund.vue";
@Component({
  components: { RefundPushEdit, SetUpARefund },
  mixins: [PaginationMixin],
})
export default class RefundPushList extends Vue {
  queryPageParameters: any = {
    beginTime: null,
    companyId: null,
    dateType: null,
    endTime: null,
    payType: null,
    refundApplyNo: null,
    refundName: null,
    refundPayNo: null,
    settlementType: null,
    status: null,
    expiresTime: null,
  };
  resPageInfo: any = {
    total: null,
    list: [],
  };
  editData = {};
  prodialogVisible = false;
  setUpARefundShow = false;
  setUpARefundData = {};
  activeName = "PendingPay";
  tabList = [
    { name: "all", label: "全部" },
    { name: "PendingPay", label: "待退款" },
    //{ name: "RefundedTicket", label: "已退票" },
    { name: "Paying", label: "付款中" },
    { name: "Paid", label: "付款成功" },
  ];

  customLoading() {
    return this.$loading({
      lock: true,
      text: "加载中....",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.6)",
      customClass: "ih-loading-spinner",
    });
  }

  edit(row: any) {
    this.editData = row;
    this.prodialogVisible = true;
  }

  private tableData: any = null;
  refundPushEditFinish() {
    this.prodialogVisible = false;
    this.getListMixin();
  }
  setUpARefundFinish() {
    this.setUpARefundShow = false;
    this.getListMixin();
  }

  expiresTimeChange(dateArray: any) {
    if (dateArray) {
      this.queryPageParameters.beginTime = dateArray[0];
      this.queryPageParameters.endTime = dateArray[1];
    } else {
      this.queryPageParameters.beginTime = null;
      this.queryPageParameters.endTime = null;
    }
  }

  handleClick(tab: any) {
    console.log(tab.name, tab.label);
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }

  private reset() {
    Object.assign(this.queryPageParameters, {
      beginTime: null,
      companyId: null,
      dateType: null,
      endTime: null,
      payType: null,
      refundApplyNo: null,
      refundName: null,
      refundPayNo: null,
      settlementType: null,
      status: null,
      expiresTime: null,
    });
  }

  async getListMixin() {
    this.queryPageParameters.status =
      this.activeName === "all" ? "" : this.activeName;
    this.resPageInfo = await post_refundItemPush_getList(
      this.queryPageParameters
    );
  }

  created() {
    this.getListMixin();
  }
  toExamine(row: any) {
    this.$router.push({
      path: "/refundToExamine/toExamine",
      query: { id: row.id },
    });
  }
  async gotoRefundApplyNo(scope: any) {
    const dataId: any = await get_refundItem_getRefundApplyId__applyNo({
      applyNo: scope.row.refundApplyNo,
    });
    window.open(`/web-sales/refundApply/info?id=${dataId}`);
  }
  //设置已退款
  async setUpARefund(row: any) {
    this.setUpARefundData = {
      id: row.id,
      payTime: row.payTime || null,
    };
    this.setUpARefundShow = true;
  }

  //退款推送
  async refundPush(row: any) {
    try {
      this.customLoading();
      let msg: any = await post_refundItemPush_refundPush({
        id: row.id,
        refundPayNo: row.refundPayNo,
      });
      this.customLoading().close();
      if (msg) {
        this.$message.error(msg);
      } else {
        this.$message.success("推送成功");
      }
      this.getListMixin();
    } catch (err) {
      this.customLoading().close();
    }
  }
  //同步状态
  async syncStatus(row: any) {
    try {
      this.customLoading();
      const res = await post_refundItemPush_syncStatus({
        id: row.id,
        refundPayNo: row.refundPayNo,
      });
      this.customLoading().close();
      if (res.status) {
        this.$message.success("同步成功");
      } else {
        this.$message.error(res.reason);
      }
      this.getListMixin();
    } catch (err) {
      this.customLoading().close();
    }
  }
  dateTypeClear() {
    if (!this.queryPageParameters.dateType) {
      this.queryPageParameters.expiresTime = null;
      this.queryPageParameters.beginTime = null;
      this.queryPageParameters.endTime = null;
    }
  }
}
</script>
<style lang="scss">
.ih-loading-spinner {
  .el-icon-loading,
  .el-loading-text {
    color: #fff;
  }
}
</style>
