<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-26 11:11:28
 * @LastEditors: ywl
 * @LastEditTime: 2021-05-15 15:50:40
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
            <el-form-item label="收款方类型">
              <el-select
                style="width: 100%"
                v-model="queryPageParameters.companyKind"
                clearable
                placeholder="请选择"
                @change="() => { queryPageParameters.agencyId = null}"
              >
                <el-option
                  v-for="item in $root.dictAllList('CompanyKind')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款方名称">
              <IhSelectPageByChannel
                clearable
                v-if="queryPageParameters.companyKind === 'ChannelCompany'"
                placeholder="请选择渠道商"
                v-model="queryPageParameters.agencyId"
              ></IhSelectPageByChannel>
              <IhSelectPageByCompany
                clearable
                v-else-if="queryPageParameters.companyKind === 'InfieldCompany'"
                placeholder="请选择内部公司"
                v-model="queryPageParameters.agencyId"
              ></IhSelectPageByCompany>
              <IhSelectPageByAgency
                clearable
                v-else-if="queryPageParameters.companyKind === 'AgencyCompany'"
                placeholder="请选择代理公司"
                v-model="queryPageParameters.agencyId"
              ></IhSelectPageByAgency>
              <el-input
                disabled
                v-else
                placeholder="请先选择收款方类型"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="归属组织">
              <IhSelectPageDivision
                v-model="queryPageParameters.belongOrgId"
                placeholder="请选择归属组织"
                clearable
              ></IhSelectPageDivision>
              <!-- <IhSelectOrgTree v-model="queryPageParameters.belongOrgId"></IhSelectOrgTree> -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态">
              <el-select
                style="width: 100%"
                v-model="queryPageParameters.status"
                clearable
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
          v-has="'B.SALES.PAYOFF.PAYOFFLIST.DCLB'"
        >导出</el-button>
        <el-dropdown
          trigger="click"
          style="margin: 0 10px 0 10px"
        >
          <el-button
            type="primary"
            v-has="'B.SALES.PAYOFF.PAYOFFLIST.FFZFSQ'"
          >发起申请<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <template v-for="(item, i) in $root.dictAllList('CompanyKind')">
              <el-dropdown-item
                :key="i"
                @click.native.prevent="add(item.code)"
              >{{item.name}}</el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button
          type="danger"
          @click="remove(null, 'duo')"
          v-has="'B.SALES.PAYOFF.PAYOFFLIST.PLSC'"
        >批量删除</el-button>
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
          label="收款方类型"
          prop="companyKind"
          width="150"
        >
          <template v-slot="{ row }">{{
            $root.dictAllName(row.companyKind, "CompanyKind")
          }}</template>
        </el-table-column>
        <el-table-column
          label="收款方名称"
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
          width="120"
        ></el-table-column>
        <el-table-column
          label="实际支付金额"
          prop="actualAmount"
          width="120"
        ></el-table-column>
        <el-table-column
          label="状态"
          prop="status"
          width="140"
          align="center"
        >
          <template v-slot="{ row }">
            <!-- <div :class="{ 'status-style': ['Unconfirm', 'BranchFinanceUnreview'].includes(row.status) && row.rejectionMark === 'Yes' }">
              {{$root.dictAllName(row.status, "PayoffStatus")}}
            </div> -->
            <IhStatusComponent
              :status="row.status"
              :status-obj="{
                warning: 'Unconfirm',
                success: 'PaymentSuccessful',
              }"
            >
              <div>{{row.status ? $root.dictAllName(row.status, "PayoffStatus") : '-'}}</div>
            </IhStatusComponent>
          </template>
        </el-table-column>
        <el-table-column
          label="所属组织"
          prop="belongOrgName"
          width="180"
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
              @click.native.prevent="routeTo(row, 'info')"
            >查看</el-link>
            <el-dropdown
              trigger="click"
              class="margin-left-15"
            >
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :class="{ 'ih-data-disabled': row.status !== 'Unconfirm'}"
                  @click.native.prevent="routeTo(row, 'edit')"
                  v-has="'B.SALES.PAYOFF.PAYOFFLIST.BJLB'"
                >编辑</el-dropdown-item>
                <el-dropdown-item
                  :class="{ 'ih-data-disabled': row.status !== 'Unconfirm'}"
                  @click.native.prevent="remove(row, '')"
                  v-has="'B.SALES.PAYOFF.PAYOFFLIST.SCLB'"
                >删除</el-dropdown-item>
                <el-dropdown-item
                  :class="{ 'ih-data-disabled': !row.jump }"
                  @click.native.prevent="routeTo(row, 'recall')"
                  v-has="'B.SALES.PAYOFF.PAYOFFLIST.CHLB'"
                >撤回
                </el-dropdown-item>
                <el-dropdown-item
                  :class="{'ih-data-disabled': !controlChange(row)}"
                  @click.native.prevent="routeTo(row, 'control')"
                  v-has="'B.SALES.PAYOFF.PAYOFFLIST.CWGK'"
                >管控
                </el-dropdown-item>
                <el-dropdown-item
                  :class="{'ih-data-disabled': !['Unconfirm', 'PlatformClerkUnreview', 'BranchBusinessManageUnreview', 'BranchFinanceUnreview'].includes(row.status)}"
                  @click.native.prevent="routeTo(row, 'replenish')"
                  v-has="'B.SALES.PAYOFF.PAYOFFLIST.BCLB'"
                >补充</el-dropdown-item>
                <el-dropdown-item
                  :class="{'ih-data-disabled': row.status !== 'Unconfirm'}"
                  @click.native.prevent="uploadList(row, 'billForm')"
                  v-has="'B.SALES.PAYOFF.PAYOFFLIST.DCJSMX'"
                >导出结算明细</el-dropdown-item>
                <el-dropdown-item
                  :class="{'ih-data-disabled': row.status !== 'Unconfirm'}"
                  @click.native.prevent="uploadList(row, 'requestForm')"
                  v-has="'B.SALES.PAYOFF.PAYOFFLIST.XZQKD'"
                >下载请款单</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
import {
  post_payApply_getList,
  post_payApply_delete_ids,
} from "@/api/payoff/index";
import PaginationMixin from "../../../mixins/pagination";
import Progress from "./dialog/progress.vue";
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
    belongOrgId: null,
    settlementMethod: null,
    makerId: null,
    status: null,
    beginMakerTime: null,
    endMakerTime: null,
    paymentMethod: null,
    companyKind: null,
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

  controlChange(row: any) {
    const ReviewPass = row.status === "ReviewPass"; // 终审通过
    return ReviewPass;
  }

  recallChange(row: any) {
    const PlatformClerkUnreview = row.status === "PlatformClerkUnreview"; // 待平台文员审核
    const BranchBusinessManageUnreview =
      row.status === "BranchBusinessManageUnreview"; // 待分公司业管审核
    const BranchFinanceUnreview = row.status === "BranchFinanceUnreview"; // 待分公司财务审核
    const RFrontLineClerk = this.$roleTool.RFrontLineClerk(); // 文员
    const RPlatformClerk = this.$roleTool.RPlatformClerk(); // 平台文员
    const RBusinessManagement = this.$roleTool.RBusinessManagement(); // 分公司业管
    return (
      (PlatformClerkUnreview && RFrontLineClerk) ||
      (BranchBusinessManageUnreview && RPlatformClerk) ||
      (BranchFinanceUnreview && RBusinessManagement)
    );
  }

  showPlanPicture(data: any) {
    this.rogressData = {
      id: data.id,
      status: data.status,
    };
    this.prodialogVisible = true;
  }

  get emptyText() {
    return this.resPageInfo.total === null ? "正在加载数据..." : "暂无数据";
  }

  async created() {
    this.getListMixin();
  }
  async getListMixin() {
    this.resPageInfo = await post_payApply_getList(this.queryPageParameters);
  }

  reset() {
    Object.assign(this.queryPageParameters, {
      applyCode: null,
      agencyId: null,
      belongOrgId: null,
      settlementMethod: null,
      makerId: null,
      status: null,
      beginMakerTime: null,
      endMakerTime: null,
      paymentMethod: null,
      companyKind: null,
    });
    this.timeList = [];
  }

  // 导出
  async exportMsg() {
    if (!this.resPageInfo.list.length) {
      this.$message.warning("至少勾选一条付款申请");
      return;
    } else {
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
        data: this.queryPageParameters,
      }).then((res: any) => {
        const href = window.URL.createObjectURL(res.data);
        const $a = document.createElement("a");
        $a.href = href;
        $a.download = "付款申请列表.xlsx";
        $a.click();
        $a.remove();
      });
    }
  }

  // 导出明细和下载请款单
  uploadList(data: any, type: any) {
    const fileId = data[type];
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
        console.log(res, "res");
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

  async remove(data: any, type: any) {
    try {
      let arr: any = [];
      if (type) {
        if (this.selection.length) {
          const isUnconfirm = this.selection.every(
            (v: any) => v.status === "Unconfirm"
          );
          if (isUnconfirm) {
            arr = this.selection.map((v: any) => v.id);
          } else {
            this.$message.warning("只能批量删除附件待确认状态的数据");
            return;
          }
        } else {
          this.$message.warning("请勾选表格数据");
          return;
        }
      } else {
        arr = [data.id];
      }
      await this.$confirm("是否确定删除?", "提示");
      await post_payApply_delete_ids(arr);
      this.getListMixin();
      this.$message({
        type: "success",
        message: "删除成功!",
      });
    } catch (error) {
      console.log(error);
    }
  }

  routeTo(row: any, where: string) {
    if (where === "control") {
      this.$router.push({
        path: `/payoff/control`,
        query: {
          id: row.id,
        },
      });
    } else {
      this.$router.push({
        path: `/payoff/${where}`,
        query: {
          id: row.id,
        },
      });
    }
  }

  add(type: any) {
    this.$router.push({
      path: `/payoff/add`,
      query: {
        type: type,
      },
    });
  }

  handleSelectionChange(selection: any) {
    this.selection = selection;
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
.status-style {
  z-index: 10;
  overflow: hidden;
  &::after {
    content: "驳回";
    position: absolute;
    top: 0;
    right: -14px;
    width: 50px;
    height: 20px;
    background: red;
    color: #fff;
    text-align: center;
    transform: rotate(45deg);
    font-size: 12px;
    opacity: 0.7;
  }
}
.ih-table {
  /deep/ .is-center {
    overflow: hidden;
  }
}
</style>