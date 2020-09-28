<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-30 09:21:17
 * @LastEditors: lgf
 * @LastEditTime: 2020-09-28 15:10:24
--> 
<template>
  <ih-page>
    <template v-slot:form>
      <el-form ref="form" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="渠道商名称">
              <el-select
                v-model="queryPageParameters.distributorsName"
                clearable
                placeholder="请选择"
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
          <el-col :span="8">
            <el-form-item label="录入人">
              <el-select
                v-model="queryPageParameters.enterPeople"
                clearable
                placeholder="请选择"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.displayList('enterPeople')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态">
              <el-select
                v-model="queryPageParameters.stated"
                clearable
                placeholder="请选择"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.displayList('stated')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="入库编号">
              <el-input
                v-model="queryPageParameters.account"
                placeholder="入库编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="变更日期">
              <el-input
                v-model="queryPageParameters.account"
                placeholder="入库编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事业部">
              <el-select
                v-model="queryPageParameters.division"
                clearable
                placeholder="请选择"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.displayList('division')"
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
        <el-button type="warning" @click="add()">清空</el-button>
        <el-button type="info" @click="reset()">添加</el-button>
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
        <el-table-column
          fixed
          type="index"
          label="渠道商名称"
          width="200"
        ></el-table-column>
        <el-table-column
          fixed
          prop="name"
          label="业务开展省份"
          width="170"
        ></el-table-column>
        <el-table-column
          fixed
          prop="account"
          label="业务开展城市"
          width="170"
        ></el-table-column>
        <el-table-column
          prop="mobilePhone"
          label="城市等级"
          width="170"
        ></el-table-column>
        <el-table-column prop="accountType" label="渠道等级" width="170">
          <template slot-scope="scope">{{
            $root.displayName("accountType", scope.row.accountType)
          }}</template>
        </el-table-column>
        <el-table-column
          prop="orgName"
          label="事业部"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="employeeCode"
          label="录入人"
          width="150"
        ></el-table-column>
        <el-table-column prop="status" label="状态" width="150">
          <template slot-scope="scope">{{
            $root.displayName("accountStatus", scope.row.status)
          }}</template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-link type="primary" @click.native.prevent="info(scope)"
              >详情</el-link
            >
            <el-dropdown trigger="click" style="margin-left: 15px">
              <span class="el-dropdown-link">
                更多操作
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native.prevent="edit(scope)"
                  >修改</el-dropdown-item
                >
                <el-dropdown-item @click.native.prevent="remove(scope)"
                  >删除</el-dropdown-item
                >
                <el-dropdown-item @click.native.prevent="locking(scope)"
                  >撤回</el-dropdown-item
                >
                <el-dropdown-item @click.native.prevent="activation(scope)"
                  >审核</el-dropdown-item
                >
                <el-dropdown-item @click.native.prevent="resetPassword(scope)"
                  >变更信息</el-dropdown-item
                >
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
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { post_channel_getList } from "../../../api/channel/index";
import PaginationMixin from "../../../mixins/pagination";

@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class UserList extends Vue {
  queryPageParameters: any = {
    account: null,
    distributorsName: "ruijia",
    cityLevel: "firstLevel",
    ChannelLevel: "bigPlatform",
    employeeCode: null,
    employeeStatus: "On",
    employeeType: "Formal",

    name: null,
    orgId: null,
    permissionOrgId: null,
    status: "Valid",
    workType: null,
  };
  jobVisibleData: any = null;
  OrganizationJurisdictionData: any = null;
  copyUserData: any = null;
  resPageInfo: any = {
    total: 0,
    list: [],
  };

  employmentDateChange(dateArray: any) {
    console.log(dateArray);
    this.queryPageParameters.employmentDateStart = dateArray[0];
    this.queryPageParameters.employmentDateEnd = dateArray[1];
  }

  reset() {
    this.queryPageParameters = {
      account: null,
      accountType: "Ihome",
      pageNum: this.queryPageParameters.pageNum,
      pageSize: this.queryPageParameters.pageSize,
    };
  }

  addData: any = null;
  value: any = "";
  searchOpen = true;

  organizationJurisdictionVisible = false;
  jobVisible = false;
  copyUserVisible = false;

  currentPage: any = 1;
  valuedate: any = new Date().getTime();
  // valuedate: any ='2020-07-01';
  tableData: any = [];
  total: any = null;

  formatter(row: any) {
    return row.name;
  }

  openToggle() {
    this.searchOpen = !this.searchOpen;
  }
  dialogVisible = false;

  add(data: any) {
    this.addData = data;
    this.dialogVisible = true;
  }

  finishJob(data: any) {
    console.log(data);
    this.search();
  }

  async created() {
    this.getListMixin();
  }
  async getListMixin() {
    this.resPageInfo = await post_channel_getList(this.queryPageParameters);
  }

  getValue(value: any) {
    this.queryPageParameters.orgId = value;
  }

  search() {
    this.getListMixin();
  }

  edit(scope: any) {
    this.add(scope.row);
  }
  jobRole(scope: any) {
    console.log(scope);
    this.jobVisibleData = scope.row;
    this.jobVisible = true;
  }
  pOrganization(scope: any) {
    console.log(scope);
    this.OrganizationJurisdictionData = scope.row;
    this.organizationJurisdictionVisible = true;
  }

  finishCopyUser(data: any) {
    console.log(data);
    this.search();
  }
  handleSelectionChange(val: any) {
    console.log(val);
    this.copyUserData = val;
  }
  //详情
  info(scope: any) {
    console.log("详情页跳转");
  }
}
</script>
<style lang="scss" scoped>
</style>
 