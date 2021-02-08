 
<!--
 * @Description: 
 * @version: 
 * @Author: zyc
 * @Date: 2021-01-13 14:50:21
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-08 11:53:52
-->
<template>
  <IhPage label-width="110px">
    <template #form>
      <el-form label-width="110px">
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
            <el-form-item label="事业部">
              <IhSelectPageDivision
                v-model="queryPageParameters.orgId"
              ></IhSelectPageDivision>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="制单人">
              <IhSelectPageUser
                placeholder="制单人"
                v-model="queryPageParameters.inputUser"
                clearable
              >
              </IhSelectPageUser>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="制单日期">
              <el-date-picker
                style="width: 100%"
                v-model="queryPageParameters.expiresTime"
                type="daterange"
                align="left"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="$root.pickerOptions"
                value-format="yyyy-MM-dd"
                @change="expiresTimeChange"
              ></el-date-picker>
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
      </el-form>
    </template>
    <template #btn>
      <el-row>
        <el-button type="primary" @click="search()">查询</el-button>
        <el-button type="info" @click="reset()">重置</el-button>
      </el-row>
    </template>
    <template #table>
      <br />
      <el-table
        class="ih-table"
        :empty-text="emptyText"
        :data="resPageInfo.list"
        v-loading="loading"
      >
        <el-table-column
          type="index"
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
        <el-table-column label="请款金额" prop="applyMoney"></el-table-column>
        <el-table-column label="扣除金额" prop="subMoney"></el-table-column>
        <el-table-column label="扣罚金额" prop="fineMoney"></el-table-column>
        <el-table-column
          label="实际请款金额"
          prop="actMoneyTax"
          width="135"
        ></el-table-column>

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

        <el-table-column label="操作" width="120" fixed="right">
          <template v-slot="{ row }">
            <el-link
              type="primary"
              @click="$router.push(`/applyRec/info?id=${row.id}`)"
              >查看</el-link
            >
            <el-link
              type="success"
              class="margin-left-10"
              @click="retPayment(row)"
              >添加回款</el-link
            >
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
    <!-- dialog -->
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PaginationMixin from "../../../mixins/pagination";

import { post_receConfirmDetail_getList } from "../../../api/apply/index";

@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class RefundToExamineList extends Vue {
  queryPageParameters: any = {
    beginTime: null,
    companyId: null,
    endTime: null,
    inputUser: null,
    orgId: null,
    payType: null,
    refundApplyNo: null,
    settlementType: null,
    status: null,
  };
  resPageInfo: any = {
    total: null,
    list: [],
  };
  private loading = false;

  private tabsList: any = [
    {
      label: "待审核",
      name: "Confirm",
    },
    {
      label: "已审核",
      name: "Complete",
    },
    {
      label: "全部",
      name: "",
    },
  ];

  private tableData: any = null;

  expiresTimeChange(dateArray: any) {
    if (dateArray) {
      this.queryPageParameters.beginTime = dateArray[0];
      this.queryPageParameters.endTime = dateArray[1];
    } else {
      this.queryPageParameters.beginTime = null;
      this.queryPageParameters.endTime = null;
    }
  }
  private tabChange() {
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }

  private reset() {
    Object.assign(this.queryPageParameters, {
      beginTime: null,
      companyId: null,
      endTime: null,
      inputUser: null,
      orgId: null,
      payType: null,
      refundApplyNo: null,
      settlementType: null,
      status: null,
    });
  }
  private search() {
    this.getListMixin();
  }

  async getListMixin() {
    this.loading = true;
    this.resPageInfo = await post_receConfirmDetail_getList(
      this.queryPageParameters
    );
    this.loading = false;
  }

  created() {
    this.getListMixin();
  }
}
</script>
