<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-30 09:21:17
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-10 17:33:48
--> 
<template>
  <ih-page>
    <template v-slot:form>
      <el-form
        ref="form"
        label-width="100px"
      >
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
            <el-form-item label="渠道跟进人">
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
        <el-button
          type="primary"
          @click="search()"
        >查询</el-button>
        <el-button
          type="warning"
          @click="add()"
        >清空</el-button>
        <el-button
          type="info"
          @click="reset()"
        >变更录入人</el-button>
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
          type="selection"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column
          fixed
          poro=""
          label="渠道商名称"
          width="150"
        ></el-table-column>
        <el-table-column
          fixed
          prop="name"
          label="渠道跟进人"
          width="120"
        ></el-table-column>
        <el-table-column
          fixed
          prop="account"
          label="录入人"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="mobilePhone"
          label="变更日期"
          width="220"
        ></el-table-column>
        <el-table-column
          prop="accountType"
          label="状态"
          width="240"
        >
        </el-table-column>
        <el-table-column
          prop="orgName"
          label="变更原因"
          width="240"
        ></el-table-column>

        <el-table-column
          label="操作"
          width="150"
          fixed="right"
        >
          <template v-slot="{ row, $index }">
            <el-link
              type="primary"
              @click.native.prevent="info(row)"
            >详情</el-link>
            <el-dropdown
              trigger="click"
              style="margin-left: 15px"
            >
              <span class="el-dropdown-link">
                更多操作
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native.prevent="edit(row)">修改</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="remove(row, $index)">删除</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="resetPassword(row)">确认</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="activation(row)">审核</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="locking(row)">撤回</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="locking(row)">退回起草</el-dropdown-item>
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

import {
  post_user_getList,
  post_user_delete__id,
  post_user_lock__id,
  post_user_activate__id,
  post_user_resetPassword__id,
} from "../../../api/system/index";
import PaginationMixin from "../../../mixins/pagination";

@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class UserList extends Vue {
  queryPageParameters: any = {
    cityLevel: "firstLevel",
    ChannelLevel: "bigPlatform",
    employeeCode: null,
    employeeStatus: "On",
    employeeType: "Formal",

    name: null,
    orgId: null,

    status: "Valid",
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
    this.resPageInfo = await post_user_getList(this.queryPageParameters);
  }

  getValue(value: any) {
    this.queryPageParameters.orgId = value;
  }

  search() {
    this.getListMixin();
  }

  edit(row: any) {
    this.add(row);
  }
  jobRole(row: any) {
    console.log(row);
    this.jobVisibleData = row;
    this.jobVisible = true;
  }
  pOrganization(row: any) {
    console.log(row);
    this.OrganizationJurisdictionData = row;
    this.organizationJurisdictionVisible = true;
  }

  async row(row: any, index: number) {
    try {
      await this.$confirm("是否确定删除?", "提示");
      await post_user_delete__id({ id: row.id });
      this.resPageInfo.list.splice(index, 1);
      this.$message({
        type: "success",
        message: "删除成功!",
      });
    } catch (error) {
      console.log(error);
    }
  }
  async locking(row: any) {
    console.log(row);
    try {
      await this.$confirm("是否确定锁定用户?", "提示");
      await post_user_lock__id({ id: row.id });

      this.$message({
        type: "success",
        message: "锁定成功!",
      });
      this.search();
    } catch (error) {
      console.log(error);
    }
  }
  async activation(row: any) {
    console.log(row);
    try {
      await this.$confirm("是否确定激活用户?", "提示");
      await post_user_activate__id({ id: row.id });

      this.$message({
        type: "success",
        message: "激活成功!",
      });
      this.search();
    } catch (error) {
      console.log(error);
    }
  }
  async resetPassword(row: any) {
    console.log(row);
    try {
      await this.$confirm("是否确定重置密码?", "提示");
      const res = await post_user_resetPassword__id({ id: row.id });
      this.$alert(res, "密码重置成功");
    } catch (error) {
      console.log(error);
    }
  }
  copyUser() {
    if (this.copyUserData && this.copyUserData.length > 0) {
      this.copyUserVisible = true;
    } else {
      this.$message.warning("请先选择数据");
    }
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
  info(row: any) {
    console.log("详情页跳转", row);
  }
}
</script>
<style lang="scss" scoped>
</style>
 