<!--
 * @Description: 请佣申请审核
 * @version: 
 * @Author: ywl
 * @Date: 2021-01-14 18:20:57
 * @LastEditors: ywl
 * @LastEditTime: 2021-02-16 18:04:24
-->
<template>
  <IhPage label-width="100px">
    <template #form>
      <el-form label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="请款申请单号">
              <el-input
                v-model="queryPageParameters.applyNo"
                placeholder="请输入请款申请单号"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="甲方公司名称">
              <el-input
                v-model="queryPageParameters.developName"
                placeholder="请输入甲方公司名称"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发票类型">
              <el-select
                v-model="queryPageParameters.billTypeCode"
                placeholder="请选择发票类型"
                class="width--100"
                clearable
              >
                <el-option
                  v-for="(i, n) in $root.dictAllList('InvoiceType')"
                  :key="n"
                  :label="i.name"
                  :value="i.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="项目名称">
              <IhSelectPageByProject
                v-model="queryPageParameters.proId"
                placeholder="请选择联动项目"
                clearable
              ></IhSelectPageByProject>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请日期">
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
            </el-form-item>
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
      </el-row>
    </template>
    <template #table>
      <br />
      <el-table
        class="ih-table"
        :empty-text="emptyText"
        :data="resPageInfo.list"
      >
        <el-table-column
          label="请款申请单号"
          prop="applyNo"
          width="185"
          fixed
        ></el-table-column>
        <el-table-column
          label="项目名称"
          prop="proName"
          min-width="200"
        ></el-table-column>
        <el-table-column
          label="甲方公司名称"
          prop="developName"
          min-width="200"
        ></el-table-column>
        <el-table-column
          label="请款金额"
          prop="applyMoney"
        ></el-table-column>
        <el-table-column
          label="扣除金额"
          prop="subMoney"
        ></el-table-column>
        <el-table-column
          label="扣罚金额"
          prop="fineMoney"
        ></el-table-column>
        <el-table-column
          label="实际请款金额"
          prop="actMoneyTax"
          min-width="120"
        ></el-table-column>
        <el-table-column
          label="成交报告份数"
          prop="dealCount"
          min-width="120"
        ></el-table-column>
        <el-table-column
          label="申请人"
          prop="applyUserName"
          min-width="165"
        ></el-table-column>
        <el-table-column
          label="申请时间"
          prop="applyTime"
          width="155"
        ></el-table-column>
        <el-table-column
          label="流程进度"
          width="120"
          fixed="right"
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              @click="() => { stepsVisible = true; applyId = row.id; }"
            >流程进度图</el-link>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="80"
        >
          <template v-slot="{ row }">
            <el-link
              type="success"
              v-has="'B.SALES.APPLY.APPLYRECAUDIT.AUDITAPPLY'"
              :class="{ 'ih-data-disabled': !auditChange(row) }"
              @click="$router.push(`/applyRecAudit/audit?id=${row.id}`)"
            >审核</el-link>
          </template>
        </el-table-column>
      </el-table>
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
    <!-- 弹窗 -->
    <IhDialog :show="stepsVisible">
      <Steps
        :data="applyId"
        @cancel="() => (stepsVisible = false)"
      />
    </IhDialog>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PaginationMixin from "../../../mixins/pagination";
import Steps from "../applyRec/dialog/steps.vue";
import { post_applyRec_getAuditList } from "../../../api/apply/index";

@Component({
  components: { Steps },
  mixins: [PaginationMixin],
})
export default class ApplyRecAuditList extends Vue {
  queryPageParameters: any = {
    applyNo: null,
    applyTimeStart: null,
    applyTimeEnd: null,
    billTypeCode: null,
    developName: null,
    proId: null,
    queryIsAudit: false,
  };
  resPageInfo: any = {
    total: null,
    list: [],
  };
  private timeList: any = [];
  private stepsVisible = false;
  private applyId: any = null;

  private auditChange(row: any) {
    console.log(row);
    let isPlatformClerk = row.status === "PlatformClerk"; // 待平台文员审核
    let isBusinessMan = row.status === "BusinessMan"; // 待分公司业管审核
    let isBranchAccount = row.status === "BranchAccount"; // 待分公司财务审核
    let isBusinessManAgain = row.status === "BusinessManAgain"; // 待分公司业管复审
    let isInvoiceClerk = row.status === "InvoiceClerk"; // 待开票员审核
    const RFinancialOfficer = this.$roleTool.RFinancialOfficer(); // 分公司财务
    const RBusinessManagement = this.$roleTool.RBusinessManagement(); // 分公司业管
    const RPlatformClerk = this.$roleTool.RPlatformClerk(); // 平台文员
    const RInvoiceClerk = this.$roleTool.RInvoiceClerk(); // 开票员
    return (
      (isPlatformClerk && RPlatformClerk) ||
      (isBusinessMan && RBusinessManagement) ||
      (isBranchAccount && RFinancialOfficer) ||
      (isBusinessManAgain && RBusinessManagement) ||
      (isInvoiceClerk && RInvoiceClerk)
    );
  }

  private search() {
    let flag = this.timeList && this.timeList.length;
    this.queryPageParameters.applyTimeStart = flag ? this.timeList[0] : null;
    this.queryPageParameters.applyTimeEnd = flag ? this.timeList[1] : null;
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
  private reset() {
    Object.assign(this.queryPageParameters, {
      applyNo: null,
      applyTimeStart: null,
      applyTimeEnd: null,
      billTypeCode: null,
      developName: null,
      proId: null,
    });
    this.timeList = [];
  }
  async getListMixin() {
    this.resPageInfo = await post_applyRec_getAuditList(
      this.queryPageParameters
    );
  }

  created() {
    this.getListMixin();
  }
}
</script>
