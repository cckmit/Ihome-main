<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-30 09:21:17
 * @LastEditors: lgf
 * @LastEditTime: 2020-09-30 11:39:46
--> 
<template>
  <ih-page>
    <template v-slot:form>
      <el-form ref="form" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="姓名">
              <el-input
                v-model="queryPageParameters.username"
                placeholder="姓名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号码">
              <el-input
                v-model="queryPageParameters.mobile"
                placeholder="手机号码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="渠道商名称">
              <el-select
                v-model="queryPageParameters.companyName"
                clearable
                placeholder="渠道商名称"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.displayList('distributorsName')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>

    <template v-slot:btn>
      <el-row>
        <el-button type="primary" @click="search()">查询</el-button>
        <el-button type="warning" @click="reset()">清空</el-button>
      </el-row>
    </template>

    <template v-slot:table>
      <br />
      <el-table
        class="ih-table"
        :data="resPageInfo.list"
        :default-sort="{ prop: 'id', order: 'descending' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column fixed type="selection" width="100"></el-table-column>
        <el-table-column
          fixed
          poro="username"
          label="姓名"
          width="350"
        ></el-table-column>
        <el-table-column
          fixed
          prop="mobile"
          label="手机号码"
          width="350"
        ></el-table-column>
        <el-table-column
          fixed
          prop="companyName"
          label="公司名称"
          width="350"
        ></el-table-column>
        <el-table-column
          fixed
          prop="registTime"
          label="注册日期"
          width="350"
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

import { post_channelRegistUser_getList } from "../../../../../src/api/channel/index";
import PaginationMixin from "../../../../mixins/pagination";

@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class UserList extends Vue {
  queryPageParameters: any = {
    username: "",
    mobile: "",
    distributorsName: "",
    pageNum: 1,
    pageSize: 10,
  };
  jobVisibleData: any = null;
  OrganizationJurisdictionData: any = null;
  copyUserData: any = null;
  resPageInfo: any = {
    total: 0,
    list: [],
  };

  // employmentDateChange(dateArray: any) {
  //   console.log(dateArray);
  //   this.queryPageParameters.employmentDateStart = dateArray[0];
  //   this.queryPageParameters.employmentDateEnd = dateArray[1];
  // }

  reset() {
    this.queryPageParameters = {
      name: null,
      phone: null,
      distributorsName: null,
      pageNum: this.queryPageParameters.pageNum,
      pageSize: this.queryPageParameters.pageSize,
      invitationCode: "",
    };
  }

  addData: any = null;
  value: any = "";

  currentPage: any = 1;

  // valuedate: any ='2020-07-01';
  tableData: any = [];
  total: any = null;

  add(data: any) {
    this.addData = data;
  }

  async created() {
    this.getListMixin();
  }
  async getListMixin() {
    let invitationCode = this.$route.query.invitationCode;
    console.log(invitationCode);
    this.resPageInfo = await post_channelRegistUser_getList(
      this.queryPageParameters
    );
  }

  // getValue(value: any) {
  //   this.queryPageParameters.orgId = value;
  // }

  // search() {
  //   this.getListMixin();
  // }

  // pOrganization(scope: any) {
  //   console.log(scope);
  //   this.OrganizationJurisdictionData = scope.row;
  //   this.organizationJurisdictionVisible = true;
  // }

  // finishCopyUser(data: any) {
  //   console.log(data);
  //   this.search();
  // }
  handleSelectionChange(val: any) {
    console.log(val);
    this.copyUserData = val;
  }
  //详情
  // info() {
  //   console.log("详情页跳转");
  // }
}
</script>
<style lang="scss" scoped>
</style>
 