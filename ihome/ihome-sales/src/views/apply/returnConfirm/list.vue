<!--
 * @Description: 回款登记确认
 * @version: 
 * @Author: ywl
 * @Date: 2021-01-13 14:50:21
 * @LastEditors: ywl
 * @LastEditTime: 2021-03-25 09:41:50
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
                placeholder="请选择项目"
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
        <el-button
          v-has="'B.SALES.APPLY.RETURNCONFIRM.ALLRETPAY'"
          @click="handleAll()"
        >批量添加回款</el-button>
      </el-row>
    </template>
    <template #table>
      <br />
      <!-- table-标签页 -->
      <el-tabs
        v-model="queryPageParameters.status"
        @tab-click="tabChange"
      >
        <template v-for="(i, n) in tabsList">
          <el-tab-pane
            :name="i.name"
            :key="n"
          >
            <!-- label-slot -->
            <span
              slot="label"
              style="font-size: 16px; font-weight: 600;"
            >{{i.label}}</span>
            <!-- table-content -->
            <el-table
              class="ih-table"
              :empty-text="emptyText"
              :data="resPageInfo.list"
              v-loading="loading"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                v-if="i.name === 'Confirm'"
                type="selection"
                width="50"
                align="center"
              ></el-table-column>
              <el-table-column
                label="请款申请单号"
                prop="applyNo"
                width="185"
                fixed
              ></el-table-column>
              <el-table-column
                label="项目名称"
                prop="proName"
                min-width="165"
              ></el-table-column>
              <el-table-column
                label="甲方公司名称"
                prop="developName"
                min-width="215"
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
                width="135"
              ></el-table-column>
              <el-table-column
                label="回款信息"
                prop="applyNo"
                min-width="145"
              >
                <template v-slot="{ row }">
                  <div>应回款：{{row.shuoldReceMoney}}</div>
                  <div>已回款：{{row.receMoney}}</div>
                  <div>未回款：{{row.noReceMoney}}</div>
                </template>
              </el-table-column>
              <el-table-column
                label="申请人"
                min-width="165"
                prop="applyUserName"
              ></el-table-column>
              <el-table-column
                label="申请日期"
                prop="applyTime"
                width="165"
              ></el-table-column>
              <el-table-column
                label="审核日期"
                prop="auditTime"
                width="165"
              ></el-table-column>
              <el-table-column
                label="回款状态"
                prop="status"
                width="135"
              >
                <template v-slot="{ row }">
                  {{$root.dictAllName(row.status, 'ApplySatus')}}
                </template>
              </el-table-column>
              <el-table-column
                v-if="i.name !== 'Confirm'"
                label="回款确认人"
                prop="receiveUserName"
                min-width="165"
              ></el-table-column>
              <el-table-column
                v-if="i.name !== 'Confirm'"
                label="回款日期"
                prop="receiveTime"
                width="165"
              ></el-table-column>
              <el-table-column
                label="操作"
                width="120"
                fixed="right"
              >
                <template v-slot="{ row }">
                  <el-link
                    type="primary"
                    @click="$router.push(`/applyRec/info?id=${row.id}`)"
                  >查看</el-link>
                  <el-link
                    type="success"
                    class="margin-left-10"
                    @click="retPayment(row)"
                    v-has="'B.SALES.APPLY.RETURNCONFIRM.RETPAYMENT'"
                  >{{`${row.status === 'Confirm' ? '添加回款' : '回款详情'}`}}</el-link>
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
    <!-- dialog -->
    <IhDialog :show="dialogVisible">
      <Add
        :data="tableData"
        @cancel="() => (dialogVisible = false)"
        @finish="() => {
          dialogVisible = false;
          getListMixin();
        }"
      />
    </IhDialog>
    <IhDialog :show="allVisible">
      <AllAdd
        :data="selectTable"
        @cancel="() => (allVisible = false)"
        @finish="() => {
          allVisible = false;
          getListMixin();
        }"
      />
    </IhDialog>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PaginationMixin from "../../../mixins/pagination";
import Add from "./dialog/add.vue";
import AllAdd from "./dialog/allAdd.vue";
import { post_receConfirmDetail_getList } from "../../../api/apply/index";

@Component({
  components: { Add, AllAdd },
  mixins: [PaginationMixin],
})
export default class ReturnConfirmList extends Vue {
  queryPageParameters: any = {
    applyNo: null,
    applyTimeEnd: null,
    applyTimeStart: null,
    billTypeCode: null,
    developName: null,
    proId: null,
    status: "Confirm",
  };
  resPageInfo: any = {
    total: null,
    list: [],
  };
  private loading = false;
  private timeList: any = [];
  private tabsList: any = [
    {
      label: "回款待确认",
      name: "Confirm",
    },
    {
      label: "回款已确认",
      name: "Complete",
    },
    {
      label: "全部",
      name: "all",
    },
  ];
  private dialogVisible = false;
  private tableData: any = null;
  private allVisible = false;
  private selectTable: any = [];

  private reset() {
    Object.assign(this.queryPageParameters, {
      applyNo: null,
      applyTimeEnd: null,
      applyTimeStart: null,
      billTypeCode: null,
      developName: null,
      proId: null,
    });
    this.timeList = [];
  }
  private search() {
    let flag = this.timeList && this.timeList.length;
    this.queryPageParameters.applyTimeStart = flag ? this.timeList[0] : null;
    this.queryPageParameters.applyTimeEnd = flag ? this.timeList[1] : null;
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
  private handleAll() {
    if (this.selectTable.length) {
      this.allVisible = true;
    } else {
      this.$message.warning("请先勾选表格数据");
    }
  }
  private handleSelectionChange(val: any) {
    this.selectTable = val;
  }
  private retPayment(row: any) {
    this.dialogVisible = true;
    this.tableData = { ...row };
  }
  private tabChange() {
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
  async getListMixin() {
    this.loading = true;
    this.resPageInfo = await post_receConfirmDetail_getList({
      ...this.queryPageParameters,
      status:
        this.queryPageParameters.status === "all"
          ? ""
          : this.queryPageParameters.status,
    });
    this.loading = false;
  }

  created() {
    this.getListMixin();
  }
}
</script>
