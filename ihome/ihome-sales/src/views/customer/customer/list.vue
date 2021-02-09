<!--
 * @Description: 客户信息列表
 * @version: 1.0
 * @Author: yag
 * @Date: - 2021-02-05 11:11:54
 * @LastEditors: yag
 * @LastEditTime: - 2021-02-05 11:11:54
-->
<template>
  <ih-page>
    <template v-slot:form>
      <el-form ref="form" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="客户信息">
              <el-input
                placeholder="姓名或手机号"
                class="input-with-select"
                v-model="queryPageParameters.custInfo"
                @keyup.enter.native="getListMixin"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户来源">
              <el-select
                v-model="queryPageParameters.custOrg"
                clearable
                placeholder="请选择客户来源"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('CustOrg')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户类型">
              <el-select
                v-model="queryPageParameters.custType"
                clearable
                placeholder="请选择客户类型"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('CustType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="创建时间">
              <el-date-picker
                style="width: 100%"
                v-model="queryPageParameters.createTimeReal"
                type="daterange"
                align="left"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="$root.pickerOptions"
                value-format="yyyy-MM-dd"
                @change="createTimeRealChange"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template v-slot:btn>
      <el-row>
        <el-button type="info" @click="reset()">重置</el-button>
        <el-button type="primary" @click="search()">查询</el-button>
        <el-button
          v-has="'B.SALES.CUSTOMER.CUSTLIST.ADD'"
          type="success"
          @click="add()"
          >新增客户</el-button
        >
      </el-row>
    </template>
    <template v-slot:table>
      <br />
      <el-table
        class="ih-table"
        :data="resPageInfo.list"
        :default-sort="{ prop: 'id', order: 'descending' }"
        :empty-text="emptyText"
      >
        <el-table-column
          prop="custName"
          label="客户姓名"
          width="%10"
        ></el-table-column>
        <el-table-column
          prop="custTel"
          label="手机号码"
          width="%10"
        ></el-table-column>
        <el-table-column prop="custOrg" label="客户来源" width="%10">
          <template slot-scope="scope">{{
            $root.dictAllName(scope.row.custOrg, "CustOrg")
          }}</template>
        </el-table-column>
        <el-table-column prop="custType" label="客户类型" width="%10">
          <template slot-scope="scope">{{
            $root.dictAllName(scope.row.custType, "CustType")
          }}</template>
        </el-table-column>
        <el-table-column prop="cardType" label="证件类型" width="%10">
          <template slot-scope="scope">{{
            $root.dictAllName(scope.row.cardType, "CardType")
          }}</template>
        </el-table-column>
        <el-table-column
          prop="certificateNumber"
          label="证件编号"
          width="%10"
        ></el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="%10"
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="%10"
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

    <ih-dialog :show="dialogVisible" desc="客户信息新增">
      <CustomerAdd
        :data="addData"
        @cancel="() => (dialogVisible = false)"
        @finish="
          (data) => {
            dialogVisible = false;
            finish(data);
          }
        "
      />
    </ih-dialog>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CustomerAdd from "./add.vue";
import { post_customer_getCustList } from "../../../api/customer/index";
import PaginationMixin from "../../../mixins/pagination";

@Component({
  components: { CustomerAdd },
  mixins: [PaginationMixin],
})
export default class CustomerList extends Vue {
  queryPageParameters: any = {
    custInfo: null,
    custOrg: null,
    custType: null,
    createTimeReal: null,
    createTimeRealMax: null,
    createTimeRealMin: null,
  };

  resPageInfo: any = {
    total: null,
    list: [],
  };

  createTimeRealChange(dateArray: any) {
    if (dateArray) {
      this.queryPageParameters.createTimeRealMin = dateArray[0];
      this.queryPageParameters.createTimeRealMax = dateArray[1];
    } else {
      this.queryPageParameters.createTimeRealMin = null;
      this.queryPageParameters.createTimeRealMax = null;
    }
  }

  reset() {
    Object.assign(this.queryPageParameters, {
      custInfo: null,
      custOrg: null,
      custType: null,
      createTimeReal: null,
      createTimeRealMax: null,
      createTimeRealMin: null,
    });
  }

  addData: any = null;
  value: any = "";
  searchOpen = true;

  currentPage: any = 1;
  tableData: any = [];
  total: any = null;

  dialogVisible = false;

  add(data: any) {
    this.addData = data;
    this.dialogVisible = true;
  }

  async created() {
    this.getListMixin();
  }
  async getListMixin() {
    this.resPageInfo = await post_customer_getCustList(
      this.queryPageParameters
    );
  }

  search() {
    this.getListMixin();
  }

  finish() {
    this.getListMixin();
  }
}
</script>
<style lang="scss" scoped></style>
