<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-07 15:36:27
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-08 11:28:14
--> 
<template>
  <div>
    <div style="text-align:right;">
      <el-input style="width:300px;" placeholder="名称 编码" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
      </el-input>
    </div>
    <br />
    <el-table :data="list" style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="name" label="名称" width="180"></el-table-column>
      <el-table-column prop="code" label="编码" width="180"></el-table-column>
      <el-table-column prop="createUser" label="创建人"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="updateUser" label="修改人"></el-table-column>
      <el-table-column prop="updateTime" label="修改时间"></el-table-column>
    </el-table>
    <el-pagination
      style="text-align: right;margin-top:20px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 50]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getRoleList } from "../../../api/system";
@Component({
  components: {}
})
export default class InfoRole extends Vue {
  list: any = [];
  total: any = null;
  currentPage = 1;
  handleSizeChange(a: any) {
    console.log(a);
  }
  handleCurrentChange(a: any) {
    console.log(a);
  }
  async search() {
    const { total, list } = await getRoleList();
    this.total = total;
    this.list = list;
  }
  async created() {
    this.search();
  }
}
</script>
<style lang="scss" scoped>
</style>
