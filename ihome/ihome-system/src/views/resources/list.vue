<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-06 09:41:43
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-10 14:29:25
--> 
<template>
  <div>
    <el-card class="ih-card-form">
      <el-row>
        <el-col :span="6" style="border-right: 1px solid #e6e6e6;padding-right: 20px">
          <resourcesRadio />
        </el-col>
        <el-col :span="18" style="padding-left:20px;">
          <!-- <el-form ref="form" label-width="80px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="名称">
                  <el-input placeholder="名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="编码">
                  <el-input placeholder="编码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="类型">
                  <el-select v-model="value" clearable placeholder="请选择类型" style="width:100%;">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="url">
                  <el-input placeholder="url"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="btn-list">
              <el-button type="primary">查询</el-button>
              <el-button @click="add()" type="success">添加</el-button>
               
            </el-row>
          </el-form>-->
          <el-form ref="form" label-width="80px">
            <el-row>
              <el-col :span="2" class="b-text-left">
                <el-button @click="add({})" type="success">添加</el-button>
              </el-col>
              <el-col :span="22" class="b-text-right">
                <el-select style="width:120px;margin-right:20px;" v-model="value" clearable placeholder="请选择类型" @change="search()">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-input style="width:300px;" placeholder="名称 编码 URL" class="input-with-select"  @keyup.enter.native="search">
                  <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
                </el-input>
              </el-col>
            </el-row>
          </el-form>
          <br />
          <el-table
            :data="resourceList"
            width="100%"
            class="ih-table"
            :default-sort="{prop: 'date', order: 'descending'}"
          >
            <!-- <el-table-column type="selection" width="50"></el-table-column> -->
            <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
            <el-table-column fixed prop="name" label="名称" sortable width="180"></el-table-column>
            <el-table-column prop="code" label="编码" sortable width="90"></el-table-column>

            <el-table-column prop="type" label="类型" sortable width="90"></el-table-column>
            <el-table-column prop="url" label="URL" sortable></el-table-column>
            <el-table-column prop="parentName" label="父资源" sortable width="180"></el-table-column>

            <el-table-column prop="createUser" label="创建人" sortable width="90"></el-table-column>

            <el-table-column prop="createTime" label="创建时间" sortable width="180"></el-table-column>

            <el-table-column prop="updateUser" label="修改人" sortable width="90"></el-table-column>

            <el-table-column prop="updateTime" label="修改人时间" sortable width="180"></el-table-column>

            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-link type="primary" @click.native.prevent="info(scope)">详情</el-link>
                <el-dropdown trigger="click" style="margin-left:15px;">
                  <span class="el-dropdown-link" style>
                    更多
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native.prevent="edit(scope)">编辑</el-dropdown-item>
                    <el-dropdown-item @click.native.prevent="remove(scope)">删除</el-dropdown-item>
                    <el-dropdown-item @click.native.prevent="batchOperationRole(scope)">批量分配角色</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
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
        </el-col>
      </el-row>
    </el-card>
    <ih-dialog :show="dialogVisible">
      <ResourcesAdd
        data="xxx"
        @cancel="()=>dialogVisible=false"
        @finish="(data)=>{dialogVisible=false;finish(data)}"
      />
    </ih-dialog>
    <ih-dialog :show="dialogEdit">
      <ResourcesEdit
        :data="editData"
        @cancel="()=>dialogEdit=false"
        @finish="(data)=>{dialogEdit=false;finishEdit(data)}"
      />
    </ih-dialog>
    <ih-dialog :show="dialogBatchOperationRole">
      <BatchOperationRole
        :data="batchOperationRoleData"
        @cancel="()=>dialogBatchOperationRole=false"
        @finish="(data)=>{dialogBatchOperationRole=false;finishBatchOperationRole(data)}"
      />
    </ih-dialog>
  </div>
</template>
<script lang="ts">
import ResourcesAdd from "./add.vue";
import ResourcesEdit from "./edit.vue";
import resourcesRadio from "@/components/resourcesRadio.vue";
import { DictionariesModule } from "../../store/modules/dictionaries";
import { Component, Vue } from "vue-property-decorator";
import { getResourceList, getResourceCategory } from "../../api/system";
import BatchOperationRole from "./batch-operation-role.vue";
@Component({
  components: {
    ResourcesAdd,
    ResourcesEdit,
    BatchOperationRole,
    resourcesRadio
  }
})
export default class ResourcesList extends Vue {
  resourceList: any[] = [];
  total: any = null;
  input3: any = "";

  currentPage: any = 1;
  dialogVisible = false;
  dialogEdit = false;
  editData: any = null;
  batchOperationRoleData: any = null;
  dialogBatchOperationRole = false;

  async created() {
    const res: any = await getResourceCategory();
    console.log(res);

    this.getList();
  }
  currentChange(item: any) {
    console.log(item);
  }

  handleSizeChange(a: any) {
    console.log(a);
    this.getList();
  }
  handleCurrentChange(a: any) {
    console.log(a);
    this.getList();
  }
  value: any = null;
  get options() {
    DictionariesModule.getModular();
    return DictionariesModule.modularAll;
  }
  async getList() {
    const res = await getResourceList();
    // res.list[0].code
    // const { total, list }  = await getResourceList();

    this.resourceList = res.list;
    this.total = res.total;
  }
  search(){
     this.getList();
  }

  add() {
    this.dialogVisible = true;
  }
  edit(scope: any) {
    console.log(scope);
    this.editData = scope.row;
    this.dialogEdit = true;
  }
  finish(data: any) {
    console.log(data);
  }
  finishEdit(data: any) {
    console.log(data);
  }
  finishBatchOperationRole(data: any) {
    console.log(data);
  }

  info(scope: any) {
    console.log(scope);
    this.$router.push({
      path: "/resources/info",
      query: { id: scope.row.id }
    });
  }
  batchOperationRole(scope: any) {
    this.batchOperationRoleData = scope.row;
    this.dialogBatchOperationRole = true;
  }
  async remove(scope: any) {
    console.log(scope);

    try {
      await this.$confirm("是否确定删除?", "提示");
      this.resourceList.splice(scope.$index, 1);
      this.$message({
        type: "success",
        message: "删除成功!"
      });
    } catch (error) {
      console.log(error);
    }
  }
}
</script>
<style lang="scss" scoped>
.btn-list {
  text-align: left;
  margin-left: 80px;
}
</style>
