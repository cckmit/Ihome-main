<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-30 09:21:17
 * @LastEditors: lgf
 * @LastEditTime: 2020-09-25 14:37:57
--> 
<template>
  <ih-page>
    <template v-slot:form>
      <el-form ref="form" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="省份">
              <el-select
                v-model="queryPageParameters.provinces"
                clearable
                placeholder="请选择"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.displayList('provinces')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="城市">
              <el-select
                v-model="queryPageParameters.city"
                clearable
                placeholder="请选择"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.displayList('city')"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="城市等级">
              <el-select
                v-model="queryPageParameters.cityLevel"
                clearable
                placeholder="请选择"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.displayList('cityLevel')"
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
        <el-button type="info" @click="reset()">修改</el-button>
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
          poro="provinces"
          label="省份"
          width="350"
        ></el-table-column>
        <el-table-column
          fixed
          prop="name"
          label="城市"
          width="350"
        ></el-table-column>
        <el-table-column
          fixed
          prop="account"
          label="城市等级"
          width="350"
        ></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link type="primary" @click.native.prevent="info(scope)"
              >修改</el-link
            >
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
    provinces: "",
    city: "",
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

  async remove(scope: any) {
    try {
      await this.$confirm("是否确定删除?", "提示");
      await post_user_delete__id({ id: scope.row.id });
      this.resPageInfo.list.splice(scope.$index, 1);
      this.$message({
        type: "success",
        message: "删除成功!",
      });
    } catch (error) {
      console.log(error);
    }
  }
  async locking(scope: any) {
    console.log(scope);
    try {
      await this.$confirm("是否确定锁定用户?", "提示");
      await post_user_lock__id({ id: scope.row.id });

      this.$message({
        type: "success",
        message: "锁定成功!",
      });
      this.search();
    } catch (error) {
      console.log(error);
    }
  }
  async activation(scope: any) {
    console.log(scope);
    try {
      await this.$confirm("是否确定激活用户?", "提示");
      await post_user_activate__id({ id: scope.row.id });

      this.$message({
        type: "success",
        message: "激活成功!",
      });
      this.search();
    } catch (error) {
      console.log(error);
    }
  }
  async resetPassword(scope: any) {
    console.log(scope);
    try {
      await this.$confirm("是否确定重置密码?", "提示");
      const res = await post_user_resetPassword__id({ id: scope.row.id });
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
  info(scope: any) {
    console.log("详情页跳转");
  }
}
</script>
<style lang="scss" scoped>
</style>
 