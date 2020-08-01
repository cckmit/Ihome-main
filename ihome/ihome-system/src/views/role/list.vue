<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-09 10:21:50
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-17 14:21:18
--> 
<template>
  <ih-page>
    <template v-slot:form>
      <el-form ref="form" label-width="80px" @submit.native.prevent>
        <el-row>
          <el-col :span="2" class="text-left">
            <el-button @click="add({})" type="success">添加</el-button>
          </el-col>
          <el-col :span="22" class="text-right">
            <el-input
              style="width:300px;"
              placeholder="名称 编码"
              class="input-with-select"
              v-model="keyword"
              @keyup.enter.native="search"
            >
              <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
            </el-input>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template v-slot:table>
      <br />
      <el-table class="ih-table" :data="list" style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="名称" width="180"></el-table-column>
        <el-table-column prop="code" label="编码" width="180"></el-table-column>
        <el-table-column prop="createUser" label="创建人"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="updateUser" label="修改人"></el-table-column>
        <el-table-column prop="updateTime" label="修改时间"></el-table-column>

        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-link type="primary" @click.native.prevent="info(scope)">详情</el-link>
            <el-dropdown trigger="click" class="margin-left-15">
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native.prevent="edit(scope)">编辑</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="remove(scope)">删除角色</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="setJurisdiction(scope)">分配权限</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="batchOperationJob(scope)">批量分配岗位</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="batchOperationUser(scope)">批量分配用户</el-dropdown-item>
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

    <ih-dialog :show="dialogAdd">
      <RoleAdd
        :data="itemData"
        @cancel="()=>dialogAdd=false"
        @finish="(data)=>{dialogAdd=false;finish(data)}"
      />
    </ih-dialog>
    <ih-dialog :show="dialogResourcesCheck">
      <ResourcesCheck
        :data="dialogResourcesCheck"
        @cancel="()=>dialogResourcesCheck=false"
        @finish="(data)=>{dialogResourcesCheck=false;finishdialogResourcesCheck(data)}"
      />
    </ih-dialog>
    <ih-dialog :show="dialogBatchOperationJob">
      <BatchOperationJob
        :data="batchOperationJobData"
        @cancel="()=>dialogBatchOperationJob=false"
        @finish="(data)=>{dialogBatchOperationJob=false;finishBatchOperationJob(data)}"
      />
    </ih-dialog>
    <ih-dialog :show="dialogBatchOperationUser">
      <BatchOperationUser
        :data="batchOperationUserData"
        @cancel="()=>dialogBatchOperationUser=false"
        @finish="(data)=>{dialogBatchOperationUser=false;finishBatchOperationUser(data)}"
      />
    </ih-dialog>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getRoleList } from "../../api/system/index2";
import RoleAdd from "./add.vue";
import ResourcesCheck from "@/components/resourcesCheck.vue";
import BatchOperationJob from "./batch-operation-job.vue";
import BatchOperationUser from "./batch-operation-user.vue";
@Component({
  components: { RoleAdd, ResourcesCheck, BatchOperationJob, BatchOperationUser }
})
export default class RoleList extends Vue {
  dialogResourcesCheck = false;
  list: any[] = [];
  total: any = null;
  currentPage = 1;
  dialogAdd = false;
  batchOperationJobData: any = null;
  batchOperationUserData: any = null;
  dialogBatchOperationJob = false;
  dialogBatchOperationUser = false;
  itemData: any = null;
  keyword: any = null;
  value: any = null;
  handleSizeChange(a: any) {
    console.log(a);
  }
  handleCurrentChange(a: any) {
    console.log(a);
  }
  selectChange() {
    console.log(this.keyword);
    // this.search();
  }
  async search() {
    const { total, list } = await getRoleList();
    this.total = total;
    this.list = list;
  }
  add(data: any) {
    this.itemData = data;
    this.dialogAdd = true;
    console.log(data);
  }
  info(scope: any) {
    this.$router.push({
      path: "/role/info",
      query: { id: scope.row.id }
    });
  }
  edit(scope: any) {
    this.add(scope.row);
  }
  setJurisdiction(scope: any) {
    console.log(scope);
    this.dialogResourcesCheck = true;
  }
  async remove(scope: any) {
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
  finish(data: any) {
    console.log(data);
  }
  batchOperationJob(scope: any) {
    this.batchOperationJobData = scope.row;
    this.dialogBatchOperationJob = true;
  }
  batchOperationUser(scope: any) {
    this.batchOperationUserData = scope.row;
    this.dialogBatchOperationUser = true;
  }
  finishBatchOperationJob(data: any) {
    console.log(data);
  }
  finishBatchOperationUser(data: any) {
    console.log(data);
  }
  finishdialogResourcesCheck(data: any) {
    console.log(data);
  }
  async created() {
    this.search();
  }
}
</script>
<style lang="scss" scoped>
.btn-list {
  text-align: left;
  margin-left: 80px;
}
</style>

