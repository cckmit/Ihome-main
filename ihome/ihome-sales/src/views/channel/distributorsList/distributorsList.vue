<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-08-13 11:40:10
 * @LastEditors: lgf
 * @LastEditTime: 2020-09-15 18:19:01
-->
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item class="line">{{$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" label-width="90px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="名称">
            <el-input v-model="queryPageParameters.account" placeholder="名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="信用代码">
            <el-input v-model="queryPageParameters.name" placeholder="信用代码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="简称">
            <el-input v-model="queryPageParameters.account" placeholder="简称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="省份">
            <el-select
              v-model="queryPageParameters.status"
              clearable
              placeholder="请选择省份"
              class="width--100"
            >
              <el-option
                v-for="item in  $root.displayList('accountStatus')"
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
              v-model="queryPageParameters.status"
              clearable
              placeholder="请选择城市"
              class="width--100"
            >
              <el-option
                v-for="item in  $root.displayList('accountStatus')"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="行政区">
            <el-select
              v-model="queryPageParameters.status"
              clearable
              placeholder="行政区"
              class="width--100"
            >
              <el-option
                v-for="item in  $root.displayList('accountStatus')"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="渠道跟进人" label-width="90px">
            <el-input v-model="queryPageParameters.account" placeholder="渠道跟进人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态">
            <el-select
              v-model="queryPageParameters.status"
              clearable
              placeholder="状态"
              class="width--100"
            >
              <el-option
                v-for="item in  $root.displayList('accountStatus')"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="el-row">
      <el-button type="primary" @click="search()">查询</el-button>
      <el-button type="success" @click="add()">添加</el-button>
      <el-button type="info" @click="empty()">清空</el-button>
    </el-row>
    <br />
    <el-table
      class="ih-table"
      :data="resPageInfo.list"
      :default-sort="{prop: 'id', order: 'descending'}"
      @selection-change="handleSelectionChange"
    >
      <el-table-column fixed type="selection" label="名称" width="100"></el-table-column>
      <el-table-column fixed type="index" label="名称" width="100"></el-table-column>
      <el-table-column fixed prop="name" label="简称" width="90"></el-table-column>
      <el-table-column fixed prop="account" label="省份" width="150"></el-table-column>
      <el-table-column prop="mobilePhone" label="城市" width="120"></el-table-column>
      <el-table-column prop="accountType" label="行政区" width="120">
        <template slot-scope="scope">{{$root.displayName('accountType',scope.row.accountType)}}</template>
      </el-table-column>
      <el-table-column prop="orgName" label="跟进人" width="120"></el-table-column>
      <el-table-column prop="employeeCode" label="状态" width="150"></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-link type="primary" @click.native.prevent="info(scope)">详情</el-link>
          <el-dropdown trigger="click" style="margin-left:15px;">
            <span class="el-dropdown-link">
              更多
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native.prevent="change(scope)">修改</el-dropdown-item>
              <el-dropdown-item @click.native.prevent="confirm(scope)">确认</el-dropdown-item>
              <el-dropdown-item @click.native.prevent="changeinfo(scope)">变更信息</el-dropdown-item>
              <el-dropdown-item @click.native.prevent="maintenance(scope)">维护渠道经纪人</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChangeMixin"
      @current-change="handleCurrentChangeMixin"
      :current-page.sync="queryPageParameters.pageNum"
      :page-sizes="$root.pageSizes"
      :page-size="queryPageParameters.pageSize"
      :layout="$root.paginationLayout"
      :total="resPageInfo.total"
    ></el-pagination>
  </div>
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
    account: null,
    accountType: "Ihome",
    employeeCode: null,
    employeeStatus: "On",
    employeeType: "Formal",

    permissionOrgId: null,
    status: "Valid",
    workType: null,
  };

  resPageInfo: any = {
    total: 0,
    list: [],
  };
  search() {
    console.log("查询");
  }
  add() {
    console.log("添加");
  }
  empty() {
    console.log("清空");
  }
  //操作
  info() {
    console.log("详情");
  }
  change() {
    console.log("修改");
  }
  confirm() {
    console.log("确认");
  }
  changeinfo() {
    console.log("变更信息");
  }
  maintenance() {
    console.log("维护渠道经纪人");
  }
  created() {
    this.getListMixin();
  }

  //获取数据
  async getListMixin() {
    this.resPageInfo = await post_user_getList(this.queryPageParameters);
  }
  handleSelectionChange(val: any) {
    console.log(val);
  }
  handleSizeChangeMixin(val: any) {
    console.log("页码大小");
  }
  handleCurrentChangeMixin(val: any) {
    console.log("指定页码");
  }
}
</script>
<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
.line {
  border-left: solid;
  color: #4cccec;
  padding-left: 7px;
}
</style>