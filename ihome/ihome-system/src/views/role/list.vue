<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-09 10:21:50
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-17 08:53:34
--> 
<template>
  <ih-page>
    <template v-slot:form>
      <el-form ref="form" label-width="80px" @submit.native.prevent>
        <el-row>
          <el-col :span="2" class="text-left">
            <el-button @click="add({})" type="success" v-has="'B.SALES.SYSTEM.ROLELIST.ADD'">添加</el-button>
          </el-col>
          <el-col :span="22" class="text-right">
            <el-input
              style="width: 200px"
              placeholder="名称 编码"
              class="input-with-select"
              v-model="queryPageParameters.key"
              @keyup.enter.native="getListMixin"
              clearable
            ></el-input>
            <el-button
              type="primary"
              class="margin-left-20"
              @click="getListMixin()"
              >查询</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template v-slot:table>
      <br />
      <el-table
        class="ih-table"
        :data="resPageInfo.list"
        style="width: 100%"
        :empty-text="emptyText"
      >
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="名称" width="180"></el-table-column>
        <el-table-column prop="code" label="编码" width="180"></el-table-column>
        <el-table-column prop="createUserName" label="创建人"></el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="155"
        ></el-table-column>
        <el-table-column prop="updateUserName" label="修改人"></el-table-column>
        <el-table-column
          prop="updateTime"
          label="修改时间"
          width="155"
        ></el-table-column>

        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-link type="primary" @click.native.prevent="info(scope)"
              >详情</el-link
            >
            <el-dropdown trigger="click" class="margin-left-15">
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-has="'B.SALES.SYSTEM.ROLELIST.UPDATE'" @click.native.prevent="edit(scope)"
                  >修改</el-dropdown-item
                >
                <el-dropdown-item v-has="'B.SALES.SYSTEM.ROLELIST.DELETE'" @click.native.prevent="remove(scope)"
                  >删除</el-dropdown-item
                >
                <el-dropdown-item v-has="'B.SALES.SYSTEM.ROLELIST.ADDAUTH'" @click.native.prevent="setJurisdiction(scope)"
                  >分配权限</el-dropdown-item
                >
                <el-dropdown-item v-has="'B.SALES.SYSTEM.ROLELIST.ADDTOJOB'"
                  @click.native.prevent="batchOperationJob(scope)"
                  >批量分配岗位</el-dropdown-item
                >
                <el-dropdown-item v-has="'B.SALES.SYSTEM.ROLELIST.ADDTOUSER'"
                  @click.native.prevent="batchOperationUser(scope)"
                  >批量分配用户</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </template>
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

    <ih-dialog :show="dialogAdd" desc="角色新增修改">
      <RoleAdd
        :data="itemData"
        @cancel="() => (dialogAdd = false)"
        @finish="
          (data) => {
            dialogAdd = false;
            finish(data);
          }
        "
      />
    </ih-dialog>
    <ih-dialog :show="dialogResourcesCheck" desc="分配权限，资源多选">
      <ResourcesCheck
        :data="resourcesCheckData"
        @cancel="() => (dialogResourcesCheck = false)"
        @finish="
          (data) => {
            dialogResourcesCheck = false;
            finishdialogResourcesCheck(data);
          }
        "
      />
    </ih-dialog>
    <ih-dialog :show="dialogBatchOperationJob" desc="分配岗位">
      <BatchOperationJob
        :data="batchOperationJobData"
        @cancel="() => (dialogBatchOperationJob = false)"
        @finish="
          (data) => {
            dialogBatchOperationJob = false;
            finishBatchOperationJob(data);
          }
        "
      />
    </ih-dialog>
    <ih-dialog :show="dialogBatchOperationUser" desc="批量分配用户">
      <BatchOperationUser
        :data="batchOperationUserData"
        @cancel="() => (dialogBatchOperationUser = false)"
        @finish="
          (data) => {
            dialogBatchOperationUser = false;
            finishBatchOperationUser(data);
          }
        "
      />
    </ih-dialog>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RoleAdd from "./add.vue";
import ResourcesCheck from "@/components/ResourcesCheck.vue";
import BatchOperationJob from "./batch-operation-job.vue";
import BatchOperationUser from "./batch-operation-user.vue";
import PaginationMixin from "../../mixins/pagination";

import {
  post_role_getList,
  post_role_delete__id,
} from "../../api/system/index";

@Component({
  components: {
    RoleAdd,
    ResourcesCheck,
    BatchOperationJob,
    BatchOperationUser,
  },
  mixins: [PaginationMixin],
})
export default class RoleList extends Vue {
  dialogResourcesCheck = false;
  resourcesCheckData: any = null;
  queryPageParameters: any = {
    key: null,
  };

  resPageInfo: any = {
    total: null,
    list: [],
  };
  currentPage = 1;
  dialogAdd = false;
  batchOperationJobData: any = null;
  batchOperationUserData: any = null;
  dialogBatchOperationJob = false;
  dialogBatchOperationUser = false;
  itemData: any = null;
  keyword: any = null;
  value: any = null;

  selectChange() {
    console.log(this.keyword);
    // this.search();
  }
  async getListMixin() {
    this.resPageInfo = await post_role_getList(this.queryPageParameters);
  }
  add(data: any) {
    this.itemData = data;
    this.dialogAdd = true;
    console.log(data);
  }
  info(scope: any) {
    this.$router.push({
      path: "/role/info",
      query: { id: scope.row.id },
    });
    this.$tool.deepClone;
  }
  edit(scope: any) {
    this.add(scope.row);
  }
  setJurisdiction(scope: any) {
    console.log(scope);
    this.resourcesCheckData = scope.row;
    this.dialogResourcesCheck = true;
  }
  async remove(scope: any) {
    try {
      await this.$confirm("是否确定删除?", "提示");
      await post_role_delete__id({ id: scope.row.id });
      this.resPageInfo.list.splice(scope.$index, 1);
      this.$message.success("删除成功!");
    } catch (error) {
      console.log(error);
    }
  }
  finish(data: any) {
    console.log(data);
    this.getListMixin();
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
    this.getListMixin();
  }
  finishBatchOperationUser(data: any) {
    console.log(data);
    this.getListMixin();
  }
  finishdialogResourcesCheck(data: any) {
    console.log(data);
    this.getListMixin();
  }
  async created() {
    this.getListMixin();
  }
}
</script>
<style lang="scss" scoped>
.btn-list {
  text-align: left;
  margin-left: 80px;
}
</style>

