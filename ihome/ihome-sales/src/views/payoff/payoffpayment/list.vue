<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-01-15 10:45:53
 * @LastEditors: wwq
 * @LastEditTime: 2021-03-17 16:13:05
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
              :default-time="['00:00:00', '23:59:59']"
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
          @click="exportList()"
        >导出</el-button>
        <el-button
          type="success"
          v-if="tabsValue === 'PendingPayment'"
          @click="mergePush(selection, 'merge')"
          v-has="'B.SALES.PAYOFF.PAYOFFPAYMENT.HBFKTS'"
        >合并付款推送</el-button>
      </el-row>
    </template>
    <template #table>
      <br />
      <el-tabs
        v-model="tabsValue"
        @tab-click="search"
      >
        <template v-for="(i, n) in tabsList">
          <el-tab-pane
            :key="n"
            :name="i.name"
          >
            <span
              slot="label"
              style="font-size: 16px; font-weight: 600"
            >{{i.label}}</span>
            <el-table
              class="ih-table"
              :empty-text="emptyText"
              :data="resPageInfo.list"
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
                width="200"
                fixed
              ></el-table-column>
              <el-table-column
                label="付款申请单编号"
                prop="applyCode"
                width="200"
              >
                <template v-slot="{ row }">
                  <el-link
                    :href="`/web-sales/payoff/info?id=${row.payApplyId}`"
                    type="primary"
                    target="_blank"
                  >
                    {{row.applyCode}}
                  </el-link>
                </template>
              </el-table-column>
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
                width="300"
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
                width="300"
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
                label="摘要"
                prop="summary"
                width="250"
              >
              </el-table-column>
              <el-table-column
                v-if="i.name !== 'PendingPayment'"
                label="支付唯一编码"
                prop="paymentCode"
                width="200"
              >
                <template v-slot="{ row }">
                  <span v-if="row.paymentCode">{{row.paymentCode}}</span>
                  <span v-else>---</span>
                </template>
              </el-table-column>
              <el-table-column
                v-if="['all', 'Paying'].includes(i.name)"
                label="推送时间"
                prop="pushDate"
                width="120"
              >
                <template v-slot="{ row }">
                  <span v-if="row.pushDate">{{row.pushDate}}</span>
                  <span v-else>---</span>
                </template>
              </el-table-column>
              <el-table-column
                v-if="!['PendingPayment', 'Paying'].includes(i.name)"
                label="付款时间"
                prop="paymentDate"
                width="120"
              >
                <template v-slot="{ row }">
                  <span v-if="row.paymentDate">{{row.paymentDate}}</span>
                  <span v-else>---</span>
                </template>
              </el-table-column>
              <el-table-column
                v-if="['all'].includes(i.name)"
                label="失败原因"
                prop="reason"
                width="150"
              >
                <template v-slot="{ row }">
                  <span v-if="row.reason">{{row.reason}}</span>
                  <span v-else>---</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="90"
                fixed="right"
                align="center"
              >
                <template v-slot="{ row }">
                  <el-link
                    type="primary"
                    v-if="['PendingPayment'].includes(row.paymentStatus) && row.settlementMethod === 'Centralization'"
                    @click="splitChange(row)"
                    v-has="'B.SALES.PAYOFF.PAYOFFPAYMENT.CFLB'"
                  >拆分</el-link>
                  <el-link
                    type="primary"
                    v-if="['PendingPayment'].includes(row.paymentStatus) && row.settlementMethod === 'Centralization'"
                    @click="mergePush(row, 'single')"
                    v-has="'B.SALES.PAYOFF.PAYOFFPAYMENT.FKTZ'"
                  >付款推送</el-link>
                  <el-link
                    type="primary"
                    v-if="['PendingPayment'].includes(row.paymentStatus) && row.settlementMethod === 'OnlineBanking'"
                    @click="setting(row)"
                    v-has="'B.SALES.PAYOFF.PAYOFFPAYMENT.SZYFK'"
                  >设置已付款</el-link>
                  <el-link
                    type="primary"
                    v-if="['PendingPayment'].includes(row.paymentStatus)"
                    @click="editChange(row)"
                    v-has="'B.SALES.PAYOFF.PAYOFFPAYMENT.EDIT'"
                  >修改</el-link>
                  <el-link
                    v-if="['Paying', 'PaymentSuccess'].includes(row.paymentStatus) && ['Centralization'].includes(row.settlementMethod)"
                    type="primary"
                    v-has="'B.SALES.PAYOFF.PAYOFFPAYMENT.TBZT'"
                    @click="synchronization(row)"
                  >同步状态
                  </el-link>
                  <span v-if="['Paying', 'PaymentSuccess'].includes(row.paymentStatus) && ['OnlineBanking'].includes(row.settlementMethod)">---</span>
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
    <ih-dialog :show="dialogFormVisible">
      <Split
        :data="splitData"
        @cancel="() => (dialogFormVisible = false)"
        @finish="(data) => splitFinish(data)"
      />
    </ih-dialog>
    <ih-dialog :show="editdialogFormVisible">
      <Edit
        :data="editData"
        @cancel="() => (editdialogFormVisible = false)"
        @finish="(data) => editFinish(data)"
      />
    </ih-dialog>
    <ih-dialog :show="setdialogFormVisible">
      <Setting
        :data="setData"
        @cancel="() => (setdialogFormVisible = false)"
        @finish="(data) => setFinish(data)"
      />
    </ih-dialog>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PaginationMixin from "../../../mixins/pagination";
import Split from "./dialog/split.vue";
import Edit from "./dialog/edit.vue";
import Setting from "./dialog/setting.vue";
import {
  post_payDetail_getList,
  post_payDetail_push,
  post_payDetail_sys_status__paymentCode,
} from "@/api/payoff/index";
import axios from "axios";
import { getToken } from "ihome-common/util/cookies";

@Component({
  mixins: [PaginationMixin],
  components: {
    Split,
    Edit,
    Setting,
  },
})
export default class ReturnConfirmList extends Vue {
  queryPageParameters: any = {
    agencyName: null,
    settlementMethod: null,
    paymentMethod: null,
    applyCode: null,
    paymentCode: null,
    payDateType: null,
    beginDate: null,
    endDate: null,
    paymentStatusList: ["PendingPayment"],
  };
  tabsValue: any = "PendingPayment";
  splitData: any = {};
  editData: any = {};
  setData: any = {};
  dialogFormVisible: any = false;
  editdialogFormVisible: any = false;
  setdialogFormVisible: any = false;
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
  ];
  selection: any = [];

  customLoading() {
    return this.$loading({
      lock: true,
      text: "加载中....",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.6)",
      customClass: "ih-loading-spinner",
    });
  }

  async getListMixin() {
    this.resPageInfo = await post_payDetail_getList(this.queryPageParameters);
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

  search() {
    let flag = this.timeList && this.timeList.length;
    this.queryPageParameters.beginDate = flag ? this.timeList[0] : null;
    this.queryPageParameters.endDate = flag ? this.timeList[1] : null;
    this.queryPageParameters.pageNum = 1;
    if (this.tabsValue !== "all") {
      this.queryPageParameters.paymentStatusList = [this.tabsValue];
    } else {
      this.queryPageParameters.paymentStatusList = [
        "PendingPayment",
        "Paying",
        "PaymentSuccess",
      ];
    }
    this.getListMixin();
  }

  reset() {
    Object.assign(this.queryPageParameters, {
      agencyName: null,
      settlementMethod: null,
      paymentMethod: null,
      applyCode: null,
      paymentCode: null,
      payDateType: null,
      beginDate: null,
      endDate: null,
    });
    this.timeList = [];
  }

  selectionChange(selection: any) {
    this.selection = selection;
  }

  // 导出
  exportList() {
    if (!this.resPageInfo.list.length) {
      this.$message.warning("暂无数据");
      return;
    } else {
      const token: any = getToken();
      axios({
        method: "POST",
        url: `/sales-api/payoff/file/excel/detail/list`,
        xsrfHeaderName: "Authorization",
        responseType: "blob",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
        },
        data: this.queryPageParameters,
      }).then((res: any) => {
        const href = window.URL.createObjectURL(res.data);
        const $a = document.createElement("a");
        $a.href = href;
        $a.download = "待付款推送列表.xlsx";
        $a.click();
        $a.remove();
      });
    }
  }

  // 合并推送
  async mergePush(data: any, type: any) {
    (this.$notify as any).closeAll();
    let arr: any = [];
    if (type === "merge") {
      if (this.selection.length) {
        const sameAgency = this.isAllEqual(
          this.selection.map((v: any) => v.agencyId)
        );
        const sameReceiveAccount = this.isAllEqual(
          this.selection.map((v: any) => v.receiveAccount)
        );
        const isOnlineBanking = this.selection.some(
          (v: any) => v.settlementMethod === "OnlineBanking"
        );
        if (sameAgency && sameReceiveAccount) {
          arr = this.selection.map((v: any) => v.settlementCode);
        } else {
          this.$message.warning("合并推送请勾选同一付款渠道公司及同一账号");
          return;
        }
        if (isOnlineBanking) {
          this.$message.warning("结算方式为网银支付不可合并推送");
          return;
        }
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
    try {
      this.customLoading();
      const res = await post_payDetail_push(arr);
      this.customLoading().close();
      if (res.status) {
        this.$notify({
          type: "success",
          title: "推送成功",
          message: "付款推送成功",
          position: "bottom-right",
        });
        this.search();
      } else {
        this.$message.error(res.reason);
        return;
      }
    } catch (err) {
      this.customLoading().close();
      console.log(err);
    }
  }

  // 判断数组的值是否全部相同
  isAllEqual(arr: any) {
    if (arr.length > 0) {
      return !arr.some((v: any) => {
        return v !== arr[0];
      });
    } else {
      return true;
    }
  }

  // 拆分
  splitChange(data: any) {
    this.splitData = { ...data };
    this.dialogFormVisible = true;
  }

  // 拆分成功
  async splitFinish() {
    this.$message.success("拆分成功");
    this.search();
    this.dialogFormVisible = false;
  }

  // 修改
  editChange(data: any) {
    this.editData = { ...data };
    this.editdialogFormVisible = true;
  }

  // 修改成功
  async editFinish() {
    this.$message.success("修改成功");
    this.search();
    this.editdialogFormVisible = false;
  }

  // 同步状态
  async synchronization(data: any) {
    try {
      this.customLoading();
      await post_payDetail_sys_status__paymentCode({
        paymentCode: data.paymentCode,
      });
      this.customLoading().close();
      this.$message.success("同步成功");
      this.search();
    } catch (err) {
      this.customLoading().close();
    }
  }

  // 设置已付款
  setting(data: any) {
    this.setData.id = data.id;
    this.setData.paymentDate = data.paymentDate;
    this.setdialogFormVisible = true;
  }

  // 设置已付款完成
  async setFinish() {
    this.$message.success("设置成功");
    this.search();
    this.setdialogFormVisible = false;
  }
}
</script>
<style lang="scss" scoped>
.text-ellipsis {
  width: 100%;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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