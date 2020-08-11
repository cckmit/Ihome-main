<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-14 10:51:31
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-11 15:57:41
--> 
<template>
  <div>
    <div style="text-align:right;">
      <el-input
        style="width:300px;"
        placeholder="登录账号 姓名"
        class="input-with-select"
        v-model="queryPageParameters.key"
      >
        <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
      </el-input>
    </div>
    <br />
    <el-table :data="resPageInfo.list" style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="account" label="登录账号" width="180"></el-table-column>
      <el-table-column prop="mobilePhone" label="手机号码" width="180"></el-table-column>
      <el-table-column prop="userType" label="用户类型">
        <template slot-scope="scope">{{getAccountTypeName(scope.row.accountType)}}</template>
      </el-table-column>
      <el-table-column prop="orgName" label="归属组织"></el-table-column>
    </el-table>

    <el-pagination
      style="text-align: right;margin-top:20px;"
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
// import { getUserList } from "../../../api/system/index2";
import { post_user_getListByJobId } from "../../../api/system/index";
import PaginationMixin from "../../../mixins/pagination";
import { accountType } from "../../../util/enums/dic";
@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class JobInfoUser extends Vue {
  resPageInfo: any = {
    total: 0,
    list: [],
  };
  queryPageParameters: any = {
    jobId: 0,
    key: null,
  };
  getAccountTypeName(key: string) {
    return accountType[key];
  }

  async search() {
    this.getListMixin();
  }
  async getListMixin() {
    this.resPageInfo = await post_user_getListByJobId(this.queryPageParameters);
  }
  async created() {
    let id = this.$route.query.id;
    this.queryPageParameters.jobId = id;
    this.search();
  }
}
</script>
<style lang="scss" scoped>
</style>
