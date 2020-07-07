<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-07 15:36:27
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-07 16:00:31
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
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="account" label="登录账号" width="180"></el-table-column>
        <el-table-column prop="phone" label="手机号码" width="180"></el-table-column>
      <el-table-column prop="userType" label="用户类型"></el-table-column>
      <el-table-column prop="organization" label="归属组织"></el-table-column>
    
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
import { getUserList } from "../../../api/system/resource";
@Component({
  components: {}
})
export default class InfoUser extends Vue {
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
    const { result } = await getUserList();
    const { total, list } = result;
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
