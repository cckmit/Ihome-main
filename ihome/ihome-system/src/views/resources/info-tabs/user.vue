<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-07 15:36:27
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-01 16:50:41
--> 
<template>
  <div>
    <div style="text-align:right;">
      <el-input style="width:300px;" placeholder="登录账号 姓名" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
      </el-input>
    </div>
    <br />
    <el-table :data="resPageInfo.list" style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="account" label="登录账号" width="180"></el-table-column>
      <el-table-column prop="mobilePhone" label="手机号码" width="180"></el-table-column>
      <el-table-column prop="employeeType" label="用户类型"></el-table-column>
      <el-table-column prop="orgId" label="归属组织"></el-table-column>
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
import PaginationMixin from "../../../mixins/pagination";
import { post_user_getListByResourceId } from "../../../api/system/index";
@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class InfoUser extends Vue {
  queryPageParameters: any = {
    key: null,
    resourceId: 0,
  };
  resPageInfo: any = {
    list: [],
    total: 0,
  };

  async search() {
    this.resPageInfo = await post_user_getListByResourceId(
      this.queryPageParameters
    );
  }
  async created() {
    let id = this.$route.query.id;
    this.queryPageParameters.resourceId = id;
    this.search();
  }
}
</script>
<style lang="scss" scoped>
</style>
