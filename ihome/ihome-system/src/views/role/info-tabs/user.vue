<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-09 14:30:56
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-14 17:29:24
--> 
<template>
  <div>
    <div style="text-align: right">
      <el-input
        style="width: 300px"
        placeholder="登录账号 姓名"
        class="input-with-select"
        clearable
        v-model="queryPageParameters.key"
        @keyup.enter.native="getListMixin()"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="getListMixin()"
        ></el-button>
      </el-input>
    </div>
    <br />
    <el-table :data="resPageInfo.list" style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column
        prop="account"
        label="登录账号"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="mobilePhone"
        label="手机号码"
        width="180"
      ></el-table-column>
      <el-table-column prop="userType" label="用户类型">
        <template slot-scope="scope">{{
          $root.displayName("accountType", scope.row.accountType)
        }}</template>
      </el-table-column>
      <el-table-column prop="orgName" label="归属组织"></el-table-column>
    </el-table>
    <div class="text-right">
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
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { post_user_getListByRoleId } from "../../../api/system/index";
import PaginationMixin from "../../../mixins/pagination";
@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class RoleInfoUser extends Vue {
  queryPageParameters: any = {
    key: null,
    roleId: 0,
  };

  resPageInfo: any = {
    total: 0,
    list: [],
  };

  async getListMixin() {
    this.resPageInfo = await post_user_getListByRoleId(
      this.queryPageParameters
    );
  }
  async created() {
    let id = this.$route.query.id;
    this.queryPageParameters.roleId = id;
    this.getListMixin();
  }
}
</script>
<style lang="scss" scoped>
</style>
