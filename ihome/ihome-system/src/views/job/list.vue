<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-14 09:23:40
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-17 14:16:22
--> 
--> 
<template>
  <ih-page>
    <template v-slot:form>
      <el-form ref="form" label-width="80px">
        <el-row>
          <el-col :span="2" class="text-left">
            <el-button @click="add({})" type="success">添加</el-button>
          </el-col>
          <el-col :span="22" class="text-right">
            <el-input style="width:300px;" placeholder="名称 编码" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
            </el-input>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template v-slot:table>
      <br />
      <el-table class="ih-table" :data="list">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="名称" width="180"></el-table-column>
        <el-table-column prop="code" label="编码" width="180"></el-table-column>
        <el-table-column prop="describe" label="描述"></el-table-column>
        <el-table-column prop="createUser" label="创建人" width="90"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="150"></el-table-column>
        <el-table-column prop="updateUser" label="修改人" width="90"></el-table-column>
        <el-table-column prop="updateTime" label="修改时间" width="150"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-link type="primary" @click.native.prevent="info(scope)">详情</el-link>
            <el-dropdown trigger="click" style="margin-left:15px;">
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native.prevent="edit(scope)">编辑</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="remove(scope)">删除</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="assignRole(scope)">分配角色</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template v-slot:pagination>
      <br />
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="$root.pageSizes"
        :page-size="$root.pageSize"
        :layout="$root.paginationLayout"
        :total="total"
      ></el-pagination>
    </template>

    <ih-dialog :show="dialogAddEdit">
      <JobAddEdit
        :data="editData"
        @cancel="()=>dialogAddEdit=false"
        @finish="(data)=>{dialogAddEdit=false;finishAddEdit(data)}"
      />
    </ih-dialog>
    <ih-dialog :show="dialogAssignRole">
      <AssignRole
        :data="dialogAssignRole"
        @cancel="()=>dialogAssignRole=false"
        @finish="(data)=>{dialogAssignRole=false;finishAssignRole(data)}"
      />
    </ih-dialog>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getJobList } from "../../api/system";
import JobAddEdit from "./add-edit.vue";
import AssignRole from "./assign-role.vue";
@Component({
  components: { JobAddEdit, AssignRole }
})
export default class JobInfo extends Vue {
  list: any = [];
  total: any = null;
  currentPage = 1;
  editData: any = null;
  dialogAddEdit = false;
  dialogAssignRole = false;
  handleSizeChange(a: any) {
    console.log(a);
  }
  handleCurrentChange(a: any) {
    console.log(a);
  }
  async search() {
    const { total, list } = await getJobList();
    this.total = total;
    this.list = list;
  }
  async add(data: any) {
    console.log(data);
    this.editData = data;

    this.dialogAddEdit = true;
  }
  async edit(scope: any) {
    console.log(scope);
    this.add(scope.row);
  }
  async remove(scope: any) {
    console.log(scope);

    try {
      await this.$confirm("是否确定删除?", "提示");
      this.list.splice(scope.$index, 1);
      this.$message({
        type: "success",
        message: "删除成功!"
      });
    } catch (error) {
      console.log(error);
    }
  }
  info(scope: any) {
    console.log(scope);
    this.$router.push({
      path: "/job/info",
      query: { id: scope.row.id }
    });
  }
  async assignRole(scope: any) {
    console.log(scope);
    this.dialogAssignRole = true;
  }
  async finishAddEdit(data: any) {
    console.log(data);
  }
  async finishAssignRole(data: any) {
    console.log(data);
  }
  async created() {
    this.search();
  }
}
</script>
<style lang="scss" scoped>
</style>
