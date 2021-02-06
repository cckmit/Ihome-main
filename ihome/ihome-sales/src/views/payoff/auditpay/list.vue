<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-26 11:11:28
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-06 20:25:29
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
              ></IhSelectPageByChannel>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="组织">
              <SelectOrganizationTree
                :v-model="queryPageParameters.belongOrgId"
                @callback="(id) => (queryPageParameters.belongOrgId = id)"
              />
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
                v-model="queryPageParameters.timeList"
                type="daterange"
                align="left"
                unlink-panels
                range-separator="到"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="$root.pickerOptions"
                value-format="yyyy-MM-dd"
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
          prop="maker"
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
import SelectOrganizationTree from "@/components/SelectOrganizationTree.vue";
import Progress from "../payorder/dialog/progress.vue";
import axios from "axios";
import { getToken } from "ihome-common/util/cookies";

@Component({
  components: { SelectOrganizationTree, Progress },
  mixins: [PaginationMixin],
})
export default class PayoffList extends Vue {
  queryPageParameters: any = {
    applyCode: null,
    belongOrgName: null,
    maker: null,
    agencyId: null,
    applyAmount: null,
    actualAmount: null,
    deductAmount: null,
    makerTime: null,
    beginMakerTime: null,
    endMakerTime: null,
    timeList: [],
  };
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

  checkChange(row: any) {
    console.log(row);
    // const status = row.status === "WaitAuditByBranchHead";
    // const roleList = (this.$root as any).userInfo.roleList.map(
    //   (v: any) => v.code
    // );
    // const fen = roleList.includes("RBusinessManagement");
    // const zong = roleList.includes("RHeadBusinessManagement");
    // return (fen || zong) && status;
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
    let arr: any = this.resPageInfo.list.map((v: any) => v.id);
    const token: any = getToken();
    axios({
      method: "POST",
      url: `/sales-api/payoff/file/excel/list`,
      xsrfHeaderName: "Authorization",
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
      data: arr,
    }).then((res: any) => {
      const href = window.URL.createObjectURL(res.data);
      const $a = document.createElement("a");
      $a.href = href;
      $a.download = "审核付款申请列表.xlsx";
      $a.click();
      $a.remove();
    });
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
      belongOrgName: null,
      maker: null,
      agencyId: null,
      applyAmount: null,
      actualAmount: null,
      deductAmount: null,
      makerTime: null,
      beginMakerTime: null,
      endMakerTime: null,
      timeList: [],
    });
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
    if (this.queryPageParameters.timeList.length) {
      this.queryPageParameters.beginMakerTime = this.queryPageParameters.timeList[0];
      this.queryPageParameters.endMakerTime = this.queryPageParameters.timeList[1];
    }
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
}
</script>
<style lang="scss" scoped>
</style>