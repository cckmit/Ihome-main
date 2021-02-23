<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2021-02-05 15:23:39
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-23 15:50:14
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
        <el-button type="primary" @click="searchMixin()">查询</el-button>
        <el-button
          type="success"
          @click="download()"
          v-has="'B.SALES.FINANCE.TOBEREFUNDED.EXPORT'"
          >导出</el-button
        >
        <el-button type="info" @click="reset()">重置</el-button>
      </el-row>
    </template>

    <template v-slot:table>
      <br />
      <el-table
        class="ih-table"
        :data="resPageInfo.list"
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

        <el-table-column prop="projectName" label="项目名称">
          <template slot-scope="scope">
            <el-link type="primary" @click="gotoNew(scope.row, 'projectName')">
              {{ scope.row.projectName }}</el-link
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="noticeAmount"
          label="优惠告知书收款金额"
          width="160"
        >
          <template slot-scope="scope">
            <el-link type="primary" @click="gotoNew(scope.row, 'noticeAmount')">
              {{ scope.row.noticeAmount }}</el-link
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="amount"
          label="退款金额"
          width="100"
        ></el-table-column>

        <el-table-column prop="" label="退款人信息" width="300">
          <template slot-scope="scope">
            <div>
              <p>收款姓名：{{ scope.row.refundName }}</p>
              <p>收款帐号：{{ scope.row.refundAccount }}</p>
              <p>收款开户行：{{ scope.row.refundBankName }}</p>
            </div>
            <div v-if="scope.row.dealId === null"></div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="退款状态">
          <template slot-scope="scope">{{
            $root.dictAllName(scope.row.status, "FinRefundStatus")
          }}</template>
        </el-table-column>
        <el-table-column
          prop="createDate"
          width="100"
          label="生成日期"
        ></el-table-column>
        <el-table-column prop="refundedDate" label="退款完成日期" width="120">
          <template slot-scope="scope">{{
            scope.row.refundedDate | emptyShow
          }}</template>
        </el-table-column>
        <el-table-column
          prop="refundApplyNO"
          label="关联退款申请单编号"
          width="160"
        >
          <template slot-scope="scope">
            <el-link
              v-if="scope.row.refundApplyNO !== null"
              type="primary"
              @click="gotoNew(scope.row, 'refundApplyNO')"
            >
              {{ scope.row.refundApplyNO }}</el-link
            >
            <span v-if="scope.row.refundApplyNO === null"> —— </span>
          </template>
        </el-table-column>
        <el-table-column width="200" label="成交信息">
          <template slot-scope="scope">
            <div v-if="scope.row.dealId !== null">
              <p>客户姓名：{{ scope.row.dealCustomerName }}</p>
              <p>
                成交报告编号：
                <el-link type="primary" @click="gotoNew(scope.row, 'dealNo')">
                  {{ scope.row.dealNo }}</el-link
                >
              </p>
              <p>成交单位：{{ scope.row.dealCompany }}</p>
            </div>
            <div v-if="scope.row.dealId === null"></div>
          </template>
        </el-table-column>
        <el-table-column prop="contType" label="合同类型" width="120">
          <template slot-scope="scope">{{
            $root.dictAllName(scope.row.contType, "ContType") | emptyShow
          }}</template>
        </el-table-column>
        <el-table-column width="150" label="服务费情况">
          <template slot-scope="scope">
            <div v-if="scope.row.dealId !== null">
              <p>应收：{{ scope.row.receivableAmount }}</p>
              <p>实收：{{ scope.row.actualAmount }}</p>
              <p>未收：{{ scope.row.uncollectedAmount }}</p>
            </div>
            <div v-if="scope.row.dealId === null">——</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="confirmationTime"
          label="业绩确认时间"
          width="120"
        >
          <template slot-scope="scope">
            {{ scope.row.confirmationTime | emptyShow }}
          </template>
        </el-table-column>
        <el-table-column prop="invoiceNo" label="发票业务单号" width="120">
          <template slot-scope="scope">
            <el-link
              v-if="scope.row.invoiceNo !== null"
              type="primary"
              @click="gotoNew(scope.row, 'invoiceNo')"
            >
              {{ scope.row.invoiceNo }}</el-link
            >
            <span v-if="scope.row.invoiceNo === null">——</span>
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
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import { getToken } from "ihome-common/util/cookies";
import { post_refundItem_getList } from "../../../api/finance/index";
import PaginationMixin from "../../../mixins/pagination";
@Component({
  components: {},
  mixins: [PaginationMixin],
  filters: {
    emptyShow(data: any) {
      if (data === "" || data === null) {
        return "——";
      } else {
        return data;
      }
    },
  },
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
  gotoNew(item: any, type: string) {
    if (type == "projectName") {
      window.open(
        `/web-sales/projects/childInfo?id=${item.proId}&proName=${item.projectName}`
      );
    } else if (type == "noticeAmount") {
      window.open("/web-sales/payment/list"); //缺失参数
    } else if (type == "refundApplyNO") {
      console.error("未实现");
    } else if (type == "dealNo") {
      window.open(`/web-sales/dealReport/info?id=${item.dealId}&type=ID`);
    } else if (type == "invoiceNo") {
      window.open(`/web-sales/invoice/info?id=${item.invoiceNo}`);
    }
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

  reset() {
    Object.assign(this.queryPageParameters, {
      beginTime: null,
      endTime: null,
      proId: null,
      refundApplyNO: null,
      refundName: null,
      status: null,
      expiresTime: null,
    });
  }

  async download() {
    const token: any = getToken();
    axios({
      method: "POST",
      url: `/sales-api/finance/refundItem/exportData`,
      xsrfHeaderName: "Authorization",
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
      data: this.queryPageParameters,
    }).then((res: any) => {
      const arr = new Blob([res.data], { type: "application/vnd.ms-excel" });
      const href = window.URL.createObjectURL(arr);
      window.open(href);
    });
  }
}
</script>
<style lang="scss" scoped>
</style>
