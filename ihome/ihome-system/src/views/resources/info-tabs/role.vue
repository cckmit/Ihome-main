<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-07 15:36:27
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-14 15:30:33
--> 
<template>
  <div>
    <div style="text-align: right">
      <el-input
        style="width: 300px"
        placeholder="名称 编码"
        class="input-with-select"
        v-model="queryPageParameters.key"
        clearable
        @keyup.enter.native="search"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="search()"
        ></el-button>
      </el-input>
    </div>
    <br />
    <el-table :data="resPageInfo.list" style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="name" label="名称" width="180"></el-table-column>
      <el-table-column prop="code" label="编码" width="180"></el-table-column>
      <el-table-column prop="createUserName" label="创建人"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="updateUserName" label="修改人"></el-table-column>
      <el-table-column prop="updateTime" label="修改时间"></el-table-column>
    </el-table>
    <el-pagination
      class="text-right margin-top-20"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 50]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="resPageInfo.total"
    ></el-pagination>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { post_role_getListByResourceId } from "../../../api/system/index";
import PaginationMixin from "../../../mixins/pagination";
@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class InfoRole extends Vue {
  queryPageParameters: any = {
    key: null,
    resourceId: 0,
  };
  resPageInfo: any = {
    list: [],
    total: 0,
  };

  currentPage = 1;
  handleSizeChange(a: any) {
    console.log(a);
  }
  handleCurrentChange(a: any) {
    console.log(a);
  }
  async search() {
    this.resPageInfo = await post_role_getListByResourceId(
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
