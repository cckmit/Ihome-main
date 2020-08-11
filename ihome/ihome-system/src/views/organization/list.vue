<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-14 11:26:26
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-11 17:58:42
--> 
<template>
  <ih-page class="organization-list">
    <template v-slot:container>
      <el-row>
        <el-col :span="6" style="border-right: 1px solid #e6e6e6;padding-right: 20px">
          <OrganizationTree @select="selectOrganizationTree" @edit="editTree" />
        </el-col>
        <el-col :span="18" class="padding-left-20">
          <el-form ref="form" label-width="80px" class="ih-form">
            <el-row>
              <el-col :span="8">
                <el-form-item label="名称">
                  <el-input v-model="queryPageParameters.name" placeholder="名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="组织层级">
                  <el-select
                    v-model="queryPageParameters.level"
                    clearable
                    placeholder="请选择组组织层级"
                    class="width--100"
                  >
                    <el-option
                      v-for="(item,index) in levelOptions"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="部门分类">
                  <el-select
                    v-model="queryPageParameters.departmentType"
                    clearable
                    placeholder="请选择部门分类"
                    class="width--100"
                  >
                    <el-option
                      v-for="item in departmentTypeOptions"
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
                  <el-select
                    v-model="queryPageParameters.orgType"
                    clearable
                    placeholder="请选择组织类型"
                    class="width--100"
                  >
                    <el-option
                      v-for="item in orgTypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否有效">
                  <el-select
                    v-model="queryPageParameters.status"
                    clearable
                    placeholder="请选择"
                    class="width--100"
                  >
                    <el-option
                      v-for="item in statusOptions"
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
            :data="resPageInfo.list"
            width="100%"
            class="ih-table"
            :default-sort="{prop: 'date', order: 'descending'}"
          >
            <!-- <el-table-column type="selection" width="50"></el-table-column> -->
            <!-- 名称 简称 层级 组织类型 -->
            <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
            <el-table-column fixed prop="name" label="名称" sortable></el-table-column>
            <el-table-column prop="shortName" label="简称" sortable width="90"></el-table-column>
            <el-table-column prop="level" label="层级" sortable width="90"></el-table-column>
            <el-table-column label="组织类型" width="120" sortable>
              <template slot-scope="scope">{{getOrgTypeName(scope.row.orgType)}}</template>
            </el-table-column>
            <el-table-column prop="createUserName" label="创建人" sortable width="90"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" sortable width="180"></el-table-column>
            <el-table-column prop="updateUserName" label="修改人" sortable width="90"></el-table-column>
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
            @size-change="handleSizeChangeMixin"
            @current-change="handleCurrentChangeMixin"
            :current-page.sync="queryPageParameters.pageNum"
            :page-sizes="$root.pageSizes"
            :page-size="queryPageParameters.pageSize"
            :layout="$root.paginationLayout"
            :total="resPageInfo.total"
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
import OrganizationTree from "@/components/OrganizationTree.vue";
import { DictionariesModule } from "../../store/modules/dictionaries";
import { Component, Vue } from "vue-property-decorator";
// import { getResourceList, getResourceCategory } from "../../api/system/index2";
import { post_org_getList, post_org_delete__id } from "../../api/system/index";
import PaginationMixin from "../../mixins/pagination";
import { orgType } from "../../util/enums/dic";

@Component({
  components: {
    OrganizationAdd,
    OrganizationTree,
  },
  mixins: [PaginationMixin],
  // filters: {
  //   filterName(value: string) {
  //     return orgType[value];

  //   },
  // },
})
export default class OrganizationList extends Vue {
  constructor() {
    super();
  }
  queryPageParameters: any = {
    departmentType: null,
    level: 0,
    name: null,
    orgType: null,
    parentId: 0,
    status: null,
  };

  resPageInfo: any = {
    total: 0,
    list: [],
  };
  leftItem: any = null;

  dialogVisible = false;
  dialogEdit = false;
  organizationItem: any = null;
  editData: any = null;
  getOrgTypeName(key: string) {
    return orgType[key];
  }
  async created() {
    console.log("created");
  }

  get departmentTypeOptions() {
    return DictionariesModule.departmentType;
  }
  get orgTypeOptions() {
    return DictionariesModule.orgType;
  }

  get statusOptions() {
    return DictionariesModule.orgStatus;
  }
  get levelOptions() {
    const list = [0, 1, 2, 3, 4, 5, 6, 7];
    return list;
  }
  async getListMixin() {
    console.log(this.queryPageParameters);
    this.resPageInfo = await post_org_getList(this.queryPageParameters);
    // res.list[0].code
    // const { total, list }  = await getResourceList();
  }

  add(data: any, isedit: boolean) {
    if (!isedit) {
      if (this.queryPageParameters.parentId === 0) {
        this.$message.warning("请先选择组织");
        return;
      } else {
        data.id = 0;
        data.parentId = this.leftItem.id;
        data.parentName = this.leftItem.name;
        data.level = this.leftItem.level + 1;
      }
    }
    this.organizationItem = data;
    this.dialogVisible = true;
  }

  edit(scope: any) {
    console.log(scope);
    this.add(scope.row, true);
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
      query: { id: scope.row.id },
    });
  }

  async remove(scope: any) {
    console.log(scope);

    try {
      await this.$confirm("是否确定删除?", "提示");
      await post_org_delete__id({ id: scope.row.id });
      this.resPageInfo.list.splice(scope.$index, 1);
      this.$message({
        type: "success",
        message: "删除成功!",
      });
    } catch (error) {
      console.log(error);
    }
  }
  selectOrganizationTree(item: any) {
    console.log("selectOrganizationTree");
    console.log(item);
    this.queryPageParameters.parentId = item.id;
    this.leftItem = item;
    this.queryPageParameters.level = item.level + 1;
    this.getListMixin();
  }
  async search() {
    if (this.queryPageParameters.parentId > 0) {
      this.getListMixin();
    } else {
      this.$message.warning("请先选择左边组织");
    }
  }
  editTree(node: any) {
    console.log('editTree')
    console.log(node);
  }
}
</script>
<style lang="scss" scoped>
.btn-list {
  text-align: left;
  margin-left: 80px;
}
</style>
 