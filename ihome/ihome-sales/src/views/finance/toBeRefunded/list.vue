<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2021-02-05 15:23:39
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-05 16:24:20
-->


<template>
  <ih-page>
    <template v-slot:form>
      <el-form ref="form" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="项目名称">
              <IhSelectPageByProject
                v-model="queryPageParameters.proId"
                clearable
                :props="{
                  value: 'proId',
                  key: 'proId',
                  lable: 'proName',
                }"
              ></IhSelectPageByProject>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款姓名">
              <el-input
                v-model="queryPageParameters.refundName"
                placeholder="收款姓名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="退款状态">
              <el-select
                v-model="queryPageParameters.status"
                clearable
                placeholder="退款状态"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('FinRefundStatus')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="生成日期">
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
        </el-row>
      </el-form>
    </template>

    <template v-slot:btn>
      <el-row>
        <el-button type="primary" @click="getListMixin()">查询</el-button>
        <el-button type="success">导出</el-button>
        <el-button type="info" @click="reset()">重置</el-button>
      </el-row>
    </template>

    <template v-slot:table>
      <br />
      <el-table
        class="ih-table"
        :data="resPageInfo.list"
        @selection-change="handleSelectionChange"
        :empty-text="emptyText"
      >
        <el-table-column
          fixed
          type="index"
          label="序号"
          width="50"
        ></el-table-column>
        <el-table-column
          fixed
          prop="refundNo"
          label="退款项编号"
          width="150"
        ></el-table-column>

        <el-table-column prop="projectName" label="项目名称"></el-table-column>
        <el-table-column
          prop="noticeAmount"
          label="优惠告知书收款金额"
        ></el-table-column>
        <el-table-column
          prop="amount"
          label="退款金额"
          width="180"
        ></el-table-column>

        <el-table-column
          prop="projectName"
          label="退款人信息"
        ></el-table-column>
        <el-table-column prop="status" label="退款状态">
          <template slot-scope="scope">{{
            $root.dictAllName(scope.row.status, "FinRefundStatus")
          }}</template>
        </el-table-column>
        <el-table-column prop="createDate" label="生成日期"></el-table-column>
        <el-table-column
          prop="refundedDate"
          label="退款完成日期"
        ></el-table-column>
        <el-table-column
          prop="refundApplyNO"
          label="关联退款申请单编号"
        ></el-table-column>
        <el-table-column width="200" label="成交信息">
          <template slot-scope="scope">
            <p>客户姓名：{{ scope.row.dealCustomerName }}</p>
            <p>成交报告编号：{{ scope.row.dealNo }}</p>
            <p>成交单位：{{ scope.row.dealCompany }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="contType" label="合同类型">
          <template slot-scope="scope">{{
            $root.dictAllName(scope.row.contType, "Contract")
          }}</template>
        </el-table-column>
        <el-table-column width="150" label="服务费情况">
          <template slot-scope="scope">
            <p>应收：{{ scope.row.receivableAmount }}</p>
            <p>实收：{{ scope.row.actualAmount }}</p>
            <p>未收：{{ scope.row.uncollectedAmount }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="confirmationTime"
          label="业绩确认时间"
        ></el-table-column>
        <el-table-column
          prop="invoiceNo"
          label="发票业务单号"
        ></el-table-column>
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
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { post_refundItem_getList } from "../../../api/finance/index";
import PaginationMixin from "../../../mixins/pagination";
@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class ToBeRefundedList extends Vue {
  constructor() {
    super();
    console.log("constructor");
  }
  queryPageParameters: any = {
    beginTime: null,
    endTime: null,
    proId: null,
    refundApplyNO: null,
    refundName: null,
    status: null,
  };
  toVoidList: any = [];
  createUserList: any = []; //创建人列表
  divisionList: any = []; //事业部列表

  resPageInfo: any = {
    total: null,
    list: [],
  };
  dialogAdd = false;

  async getListMixin() {
    this.resPageInfo = await post_refundItem_getList(this.queryPageParameters);
  }

  async created() {
    console.log("created");
    this.getListMixin();
  }

  async mounted() {
    console.log("mounted");
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

  info(scope: any) {
    this.$router.push({
      path: "/invitationCode/info",
      query: { id: scope.row.id },
    });
  }
  reset() {
    Object.assign(this.queryPageParameters, {
      departmentOrgId: null,
      expiresTime: null,
      expiresTimeBegin: null,
      expiresTimeEnd: null,
      invitationCode: null,
      invitationUserId: null,
      status: null,
    });
  }

  handleSelectionChange(val: any) {
    this.toVoidList = val;
  }
}
</script>
<style lang="scss" scoped>
</style>
