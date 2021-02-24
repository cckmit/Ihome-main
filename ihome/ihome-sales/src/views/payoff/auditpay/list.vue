<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-26 11:11:28
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-24 08:56:08
-->
<template>
  <IhPage label-width="120px">
    <template v-slot:form>
      <el-form
        ref="form"
        label-width="120px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="付款申请单编号">
              <el-input
                v-model="queryPageParameters.applyCode"
                clearable
                placeholder="请填写付款申请单编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="渠道商">
              <IhSelectPageByChannel
                placeholder="请选择渠道商"
                clearable
                v-model="queryPageParameters.agencyId"
                @changeOption="(data) => {queryPageParameters.agencyName = data.name}"
              ></IhSelectPageByChannel>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="组织">
              <IhSelectPageDivision
                v-model="queryPageParameters.belongOrgId"
                placeholder="请选择组织"
                clearable
              ></IhSelectPageDivision>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="审核人">
              <IhSelectPageUser
                v-model="queryPageParameters.reviewerId"
                clearable
              >
              </IhSelectPageUser>
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
            <el-form-item label="制单人">
              <IhSelectPageUser
                v-model="queryPageParameters.makerId"
                clearable
              >
              </IhSelectPageUser>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="制单日期">
              <el-date-picker
                style="width: 100%"
                v-model="timeList"
                type="daterange"
                align="left"
                unlink-panels
                range-separator="到"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="$root.pickerOptions"
                value-format="yyyy-MM-dd HH:mm:ss"
                :default-time="['00:00:00', '23:59:59']"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="付款方式">
              <el-select
                style="width: 100%"
                v-model="queryPageParameters.paymentMethod"
                placeholder="请选择"
                clearable
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
        </el-row>
      </el-form>
    </template>

    <template v-slot:btn>
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
          @click="exportMsg()"
          v-has="'B.SALES.PAYOFF.PAYAPPLY.DCLB'"
        >导出</el-button>
      </el-row>
    </template>

    <template v-slot:table>
      <br />
      <el-table
        class="ih-table"
        :data="resPageInfo.list"
        :empty-text="emptyText"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          width="50"
          type="selection"
          align="center"
        ></el-table-column>
        <el-table-column
          label="付款申请单编号"
          prop="applyCode"
          width="180"
        ></el-table-column>
        <el-table-column
          label="所属组织"
          prop="belongOrgName"
          width="180"
        ></el-table-column>
        <el-table-column
          label="渠道商"
          prop="agencyName"
          width="150"
        ></el-table-column>
        <el-table-column
          label="申请支付金额"
          prop="applyAmount"
          width="120"
        ></el-table-column>
        <el-table-column
          label="扣除金额"
          prop="deductAmount"
        ></el-table-column>
        <el-table-column
          label="实际支付金额"
          prop="actualAmount"
          width="120"
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
          label="制单人"
          prop="makerName"
          width="120"
        ></el-table-column>
        <el-table-column
          label="制单日期"
          prop="makerTime"
          width="180"
        ></el-table-column>
        <el-table-column
          label="流程进度"
          fixed="right"
          width="120"
          align="center"
        >
          <template v-slot="{ row }">
            <el-link
              @click="showPlanPicture(row)"
              style="color: #409eff"
            >流程进度图</el-link>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="120"
          align="center"
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              :class="{'ih-data-disabled': !auditChange(row)}"
              @click.native.prevent="routeTo(row)"
              v-has="'B.SALES.PAYOFF.PAYAPPLY.SHLB'"
            >审核</el-link>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template v-slot:pagination>
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

    <ih-dialog :show="dialogVisible">
      <UpdateUser
        :data="selection"
        @cancel="() => (dialogVisible = false)"
        @finish="
          (data) => {
            dialogVisible = false;
            getListMixin()
          }
        "
      />
    </ih-dialog>
    <ih-dialog :show="prodialogVisible">
      <Progress
        :data="rogressData"
        @cancel="() => (prodialogVisible = false)"
      />
    </ih-dialog>
  </IhPage>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { post_payApply_review_list } from "@/api/payoff/index";
import PaginationMixin from "../../../mixins/pagination";
import Progress from "../payorder/dialog/progress.vue";
import axios from "axios";
import { getToken } from "ihome-common/util/cookies";

@Component({
  components: { Progress },
  mixins: [PaginationMixin],
})
export default class PayoffList extends Vue {
  queryPageParameters: any = {
    applyCode: null,
    agencyId: null,
    agencyName: null,
    belongOrgId: null,
    reviewerId: null,
    settlementMethod: null,
    makerId: null,
    status: null,
    beginMakerTime: null,
    endMakerTime: null,
    paymentMethod: null,
  };
  timeList: any = [];
  prodialogVisible: any = false;
  rogressData: any = {};
  selection: any = [];
  resPageInfo: any = {
    total: null,
    list: [],
  };
  dialogVisible = false;

  editChange(row: any) {
    const status = row.status === "Draft";
    const dangqian = (this.$root as any).userInfo.id === row.inputUser;
    return status && dangqian;
  }

  auditChange(row: any) {
    const PlatformClerkUnreview = row.status === "PlatformClerkUnreview"; // 待平台文员审核
    const BranchBusinessManageUnreview =
      row.status === "BranchBusinessManageUnreview"; // 待分公司业管审核
    const BranchFinanceUnreview = row.status === "BranchFinanceUnreview"; // 待分公司财务审核
    const ReviewPass = row.status === "ReviewPass"; // 终审通过
    const PaymentFailed = row.status === "PaymentFailed"; // 支付失败
    const RFinanceCashier = this.$roleTool.RFinanceCashier(); // 出纳
    const RFinanceFund = this.$roleTool.RFinanceFund(); // 资金岗
    const RFinancialOfficer = this.$roleTool.RFinancialOfficer(); // 分公司财务
    const RHeadFinancialOfficer = this.$roleTool.RHeadFinancialOfficer(); // 总公司财务
    const RPlatformClerk = this.$roleTool.RPlatformClerk(); // 平台文员
    const RBusinessManagement = this.$roleTool.RBusinessManagement(); // 分公司业管
    return (
      (PlatformClerkUnreview && RPlatformClerk) ||
      (BranchBusinessManageUnreview && RBusinessManagement) ||
      (BranchFinanceUnreview && (RFinancialOfficer || RHeadFinancialOfficer)) ||
      (ReviewPass && RFinanceCashier) ||
      (PaymentFailed && RFinanceFund)
    );
  }

  showPlanPicture(data: any) {
    this.rogressData = {
      id: data.id,
      status: data.status,
    };
    this.prodialogVisible = true;
  }

  // 导出
  async exportMsg() {
    if (!this.resPageInfo.list.length) {
      this.$message.warning("暂无数据");
      return;
    } else {
      const token: any = getToken();
      axios({
        method: "POST",
        url: `/sales-api/payoff/file/excel/review/list`,
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
        $a.download = "审核付款申请列表.xlsx";
        $a.click();
        $a.remove();
      });
    }
  }

  get emptyText() {
    return this.resPageInfo.total === null ? "正在加载数据..." : "暂无数据";
  }

  async created() {
    this.getListMixin();
  }
  async getListMixin() {
    this.resPageInfo = await post_payApply_review_list(
      this.queryPageParameters
    );
  }

  reset() {
    Object.assign(this.queryPageParameters, {
      applyCode: null,
      agencyId: null,
      agencyName: null,
      belongOrgId: null,
      reviewerId: null,
      settlementMethod: null,
      makerId: null,
      status: null,
      beginMakerTime: null,
      endMakerTime: null,
      paymentMethod: null,
    });
    this.timeList = [];
  }

  routeTo(row: any) {
    const RPlatformClerk = this.$roleTool.RPlatformClerk();
    const RBusinessManagement = this.$roleTool.RBusinessManagement();
    const RFinancialOfficer = this.$roleTool.RFinancialOfficer();
    if (
      RFinancialOfficer &&
      ["BranchFinanceUnreview", "ReviewPass"].includes(row.status)
    ) {
      this.$router.push({
        path: `/auditpay/audit`,
        query: {
          id: row.id,
        },
      });
    } else if (RPlatformClerk || RBusinessManagement) {
      this.$router.push({
        path: `/auditpay/info`,
        query: {
          id: row.id,
        },
      });
    }
  }

  handleSelectionChange(val: any) {
    this.selection = val.map((v: any) => ({
      name: v.name,
      id: v.id,
    }));
  }

  search() {
    let flag = this.timeList && this.timeList.length;
    this.queryPageParameters.beginMakerTime = flag ? this.timeList[0] : null;
    this.queryPageParameters.endMakerTime = flag ? this.timeList[1] : null;
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
}
</script>
<style lang="scss" scoped>
</style>