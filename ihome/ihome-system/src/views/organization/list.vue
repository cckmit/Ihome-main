<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-14 11:26:26
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-20 09:16:24
--> 
<template>
  <ih-page class="organization-list">
    <template v-slot:container>
      <el-row>
        <el-col :span="6" style="border-right: 1px solid #e6e6e6;padding-right: 20px">
          <resourcesRadio />
        </el-col>
        <el-col :span="18" class="padding-left-20">
          <el-form ref="form" label-width="80px" class="ih-form">
            <el-row>
              <el-col :span="8">
                <el-form-item label="名称">
                  <el-input placeholder="名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="组织层级">
                  <el-select v-model="value" clearable placeholder="请选择组组织层级" class="width--100">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="部门分类">
                  <el-select v-model="value" clearable placeholder="请选择部门分类" class="width--100">
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
                <el-form-item label="组织类型">
                  <el-select v-model="value" clearable placeholder="请选择组织类型" class="width--100">
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

            <el-row class="btn-list">
              <el-button type="primary" @click="search()">查询</el-button>
              <el-button type="success" @click="add({})">添加</el-button>
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
            <!-- 名称 简称 层级 组织类型 -->
            <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
            <el-table-column fixed prop="name" label="名称" sortable></el-table-column>
            <el-table-column prop="code" label="简称" sortable width="90"></el-table-column>

            <el-table-column prop="type" label="层级" sortable width="90"></el-table-column>
            <el-table-column prop="url" label="组织类型" width="120" sortable></el-table-column>

            <el-table-column prop="createUser" label="创建人" sortable width="90"></el-table-column>

            <el-table-column prop="createTime" label="创建时间" sortable width="180"></el-table-column>

            <el-table-column prop="updateUser" label="修改人" sortable width="90"></el-table-column>

            <el-table-column prop="updateTime" label="修改人时间" sortable width="180"></el-table-column>

            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-link
                  style="color:#409eff;"
                  class="margin-right-10"
                  type="primary"
                  @click.native.prevent="edit(scope)"
                >编辑</el-link>
                <el-link style="color:#f66;" type="primary" @click.native.prevent="remove(scope)">删除</el-link>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            style="text-align: right;margin-top:20px;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="$root.pageSizes"
            :page-size="$root.pageSize"
            :layout="$root.paginationLayout"
            :total="total"
          ></el-pagination>
        </el-col>
      </el-row>
    </template>
    <ih-dialog :show="dialogVisible">
      <OrganizationAdd
        :data="organizationItem"
        @cancel="()=>dialogVisible=false"
        @finish="(data)=>{dialogVisible=false;finish(data)}"
      />
    </ih-dialog>
  </ih-page>
</template>
<script lang="ts">
import OrganizationAdd from "./add.vue";
import resourcesRadio from "@/components/resourcesRadio.vue";
import { DictionariesModule } from "../../store/modules/dictionaries";
import { Component, Vue } from "vue-property-decorator";
import { getResourceList, getResourceCategory } from "../../api/system/index2";

@Component({
  components: {
    OrganizationAdd,
    resourcesRadio
  }
})
export default class OrganizationList extends Vue {
  resourceList: any[] = [];
  total: any = null;
  input3: any = "";

  currentPage: any = 1;
  dialogVisible = false;
  dialogEdit = false;
  organizationItem: any = null;
  editData: any = null;

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
  search() {
    this.getList();
  }

  add(data: any) {
    this.organizationItem = data;
    this.dialogVisible = true;
  }

  edit(scope: any) {
    console.log(scope);
    this.add(scope.row);
  }
  finish(data: any) {
    console.log(data);
  }
  finishEdit(data: any) {
    console.log(data);
  }

  info(scope: any) {
    console.log(scope);
    this.$router.push({
      path: "/resources/info",
      query: { id: scope.row.id }
    });
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
 