<!--
 * @Descripttion: 
 * @version: 
 * @Author: lgf
 * @Date: 2020-09-18 09:14:40
 * @LastEditors: lgf
 * @LastEditTime: 2020-09-21 18:11:57
-->
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item class="line">{{$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <ih-page>
      <template v-slot:form>
        <el-form ref="form" label-width="80px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="邀请码">
                <el-input v-model="queryPageParameters.account" placeholder="邀请码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="创建人">
                <el-select
                  v-model="queryPageParameters.workType"
                  clearable
                  placeholder="创建人"
                  class="width--100"
                >
                  <el-option
                    v-for="item in $root.displayList('workType')"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="失效日期">
                <el-date-picker
                  v-model="queryPageParameters.value1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <template v-slot:btn>
        <el-row>
          <el-button type="primary" @click="search(scope)">查询</el-button>
          <el-button type="success" @click="add(scope)">添加</el-button>
          <el-button type="info" @click="reset(scope)">重置</el-button>
        </el-row>
      </template>
      <br />
      <template v-slot:table>
        <br />
        <el-table
          class="ih-table"
          :data="resPageInfo.list"
          :default-sort="{prop: 'id', order: 'descending'}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column prop="employmentDate" label="邀请码" width="120"></el-table-column>
          <el-table-column prop="leaveDate" label="失效日期" width="120"></el-table-column>
          <el-table-column prop="employeeType" label="创建人"></el-table-column>
          <el-table-column prop="creatTime" label="创建时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-link type="primary" class="detail" @click.native.prevent="info(scope)">详情</el-link>
              <el-link type="primary" @click.native.prevent="deleted(scope)">删除</el-link>
            </template>
          </el-table-column>d
        </el-table>
      </template>
      <!-- 分页 -->
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
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { post_user_getList } from "../../../api/system/index";
import PaginationMixin from "../../../mixins/pagination";
@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class Home extends Vue {
  queryPageParameters: any = {
    account: "",
    workType: "",
    value1: "",
  };
  resPageInfo: any = {
    total: 0,
    list: [],
  };

  currentPage: any = 1;
  add(scope: any) {
    console.log("跳转至添加邀请码页面");

    this.$router.push({
      path: "/ChannelInviteCode/addCode",
    });
  }
  info(scope: any) {
    console.log("详情");
  }
  deleted(scope: any) {
    console.log("删除");
  }
  async created() {
    this.getListMixin();
  }
  async getListMixin() {
    this.resPageInfo = await post_user_getList(this.queryPageParameters);
  }
  handleSelectionChange(val: any) {
    console.log(val);
    // this.copyUserData = val;
  }
}
</script>
<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
  .line {
    border-left: solid;
    color: #4cccec;
    padding-left: 7px;
  }
}
.detail {
  margin-right: 5px;
  color: #000;
}
</style>