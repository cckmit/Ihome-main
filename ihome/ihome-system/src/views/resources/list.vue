<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-06 09:41:43
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-16 14:58:35
--> 
<template>
  <ih-page>
    <template v-slot:container>
      <el-row>
        <IhLeftRightContainer :leftHeight="pageHeight" :leftWidth="400">
          <template slot="left">
            <el-col :span="24">
              <resourcesRadio ref="resourcesRadio" @select="selectResources" />
            </el-col>
          </template>
          <template slot="right">
            <el-col :span="24" class="padding-left-20">
              <el-form ref="form" label-width="80px">
                <el-row>
                  <el-col :span="2" class="text-left">
                    <el-button @click="add({})" type="success">添加</el-button>
                  </el-col>
                  <el-col :span="22" class="text-right">
                    <el-select
                      style="width: 120px; margin-right: 20px"
                      v-model="queryPageParameters.type"
                      clearable
                      placeholder="请选择类型"
                      @change="search()"
                    >
                      <el-option
                        v-for="item in $root.dictAllList('ResourceType')"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                      ></el-option>
                    </el-select>
                    <el-input
                      style="width: 200px"
                      placeholder="名称 编码 URL"
                      clearable
                      class="input-with-select"
                      @keyup.enter.native="search"
                      v-model="queryPageParameters.key"
                    ></el-input>
                    <el-button
                      class="margin-left-20"
                      type="primary"
                      @click="search()"
                      >查询</el-button
                    >
                  </el-col>
                </el-row>
              </el-form>
              <br />
              <el-table
                :data="resPageInfo.list"
                width="100%"
                class="ih-table"
                :default-sort="{ prop: 'date', order: 'descending' }"
                :height="pageHeight-25"
              >
                <!-- <el-table-column type="selection" width="50"></el-table-column> -->
                <el-table-column
                  fixed
                  type="index"
                  label="序号"
                  width="50"
                ></el-table-column>
                <el-table-column
                  fixed
                  prop="name"
                  label="名称"
                  width="180"
                ></el-table-column>
                <el-table-column prop="code" label="编码" width="180">
                  <!-- <template slot="header">
                <span>编码</span>
                <el-tooltip class="item" effect="light" content="编码" placement="top">
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </template>-->
                </el-table-column>

                <el-table-column prop="type" label="类型" width="90">
                  <!-- <template slot="header">
                <span>类型</span>
                <el-tooltip class="item" effect="light" placement="top">
                  <div slot="content">
                    <p>第一行内容</p>
                    <p>第二行内容</p>
                  </div>
                  <i class="el-icon-info"></i>
                </el-tooltip>
              </template>-->
                  <template slot-scope="scope">
                    <span>{{
                      $root.dictAllName(scope.row.type, "ResourceType")
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="url" label="URL"></el-table-column>
                <el-table-column prop="icon" label="ICON"></el-table-column>
                <el-table-column
                  prop="seq"
                  label="排序"
                  width="180"
                ></el-table-column>
                <el-table-column
                  prop="parentName"
                  label="父资源"
                  width="180"
                ></el-table-column>

                <el-table-column
                  prop="createUserName"
                  label="创建人"
                  width="90"
                ></el-table-column>

                <el-table-column
                  prop="createTime"
                  label="创建时间"
                  width="180"
                ></el-table-column>

                <el-table-column
                  prop="updateUserName"
                  label="修改人"
                  width="90"
                ></el-table-column>

                <el-table-column
                  prop="updateTime"
                  label="修改人时间"
                  width="180"
                ></el-table-column>

                <el-table-column fixed="right" label="操作" width="120">
                  <template slot-scope="scope">
                    <el-link type="primary" @click.native.prevent="info(scope)"
                      >详情</el-link
                    >
                    <el-dropdown trigger="click" style="margin-left: 15px">
                      <span class="el-dropdown-link" style>
                        更多
                        <i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native.prevent="edit(scope)"
                          >修改</el-dropdown-item
                        >
                        <el-dropdown-item @click.native.prevent="remove(scope)"
                          >删除</el-dropdown-item
                        >
                        <el-dropdown-item
                          @click.native.prevent="batchOperationRole(scope)"
                          >批量分配角色</el-dropdown-item
                        >
                      </el-dropdown-menu>
                    </el-dropdown>
                  </template>
                </el-table-column>
              </el-table>

              <div class="text-right margin-top-20">
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
            </el-col>
          </template>
        </IhLeftRightContainer>
      </el-row>
    </template>
    <ih-dialog :show="dialogVisible" desc="新增资源">
      <ResourcesAdd
        :data="resourcesAddData"
        @cancel="() => (dialogVisible = false)"
        @finish="
          (data) => {
            dialogVisible = false;
            finish(data);
          }
        "
      />
    </ih-dialog>
    <ih-dialog :show="dialogEdit" desc="修改资源">
      <ResourcesEdit
        :data="editData"
        @cancel="() => (dialogEdit = false)"
        @finish="
          (data) => {
            dialogEdit = false;
            finishEdit(data);
          }
        "
      />
    </ih-dialog>
    <ih-dialog :show="dialogBatchOperationRole" desc="批量分配角色">
      <BatchOperationRole
        :data="batchOperationRoleData"
        @cancel="() => (dialogBatchOperationRole = false)"
        @finish="
          (data) => {
            dialogBatchOperationRole = false;
            finishBatchOperationRole(data);
          }
        "
      />
    </ih-dialog>
  </ih-page>
</template>
<script lang="ts">
import ResourcesAdd from "./add.vue";
import ResourcesEdit from "./edit.vue";
import ResourcesRadio from "@/components/ResourcesRadio.vue";
// import { DictionariesModule } from "../../store/modules/dictionaries";
import { Component, Vue } from "vue-property-decorator";
import PaginationMixin from "../../mixins/pagination";
import {
  post_resource_getList,
  post_resource_delete__id,
} from "../../api/system/index";
import BatchOperationRole from "./batch-operation-role.vue";

@Component({
  components: {
    ResourcesAdd,
    ResourcesEdit,
    BatchOperationRole,
    ResourcesRadio,
  },
  mixins: [PaginationMixin],
})
export default class ResourcesList extends Vue {
  constructor() {
    super();
  }
  queryPageParameters: any = {
    key: null,
    parentId: 0,
    type: "",
  };
  resourcesAddData: any = {
    parentId: null,
    parentName: null,
    parentCode: null,
  };
  resPageInfo: any = {
    total: 0,
    list: [],
  };

  dialogVisible = false;
  dialogEdit = false;
  editData: any = null;
  batchOperationRoleData: any = null;
  dialogBatchOperationRole = false;

  async created() {
    // this.getList();
  }

  async getListMixin() {
    this.resPageInfo = await post_resource_getList(this.queryPageParameters);
  }
  search() {
    if (this.queryPageParameters.parentId === 0) {
      this.$message({
        message: "请先选择左边列表",
        type: "warning",
      });
      return;
    }
    this.getListMixin();
  }

  add() {
    if (this.queryPageParameters.parentId === 0) {
      this.$message({
        message: "请先选择左边列表",
        type: "warning",
      });
      return;
    }
    this.dialogVisible = true;
  }
  edit(scope: any) {
    console.log(scope);
    this.editData = scope.row;
    this.dialogEdit = true;
  }
  finish(data: any) {
    console.log(data);
    (this.$refs as any).resourcesRadio.init();
  }
  finishEdit(data: any) {
    console.log(data);
    (this.$refs as any).resourcesRadio.init();
    this.getListMixin();
  }
  finishBatchOperationRole(data: any) {
    console.log(data);
  }

  info(scope: any) {
    console.log(scope);
    this.$router.push({
      path: "/resources/info",
      query: { id: scope.row.id },
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
      await post_resource_delete__id({ id: scope.row.id });

      this.resPageInfo.list.splice(scope.$index, 1);
      this.$message({
        type: "success",
        message: "删除成功!",
      });
       (this.$refs as any).resourcesRadio.init();
    } catch (error) {
      console.log(error);
    }
  }
  selectResources(item: any) {
    console.log("selectResources", item);
    this.queryPageParameters.parentId = item.id;
    this.resourcesAddData.parentId = item.id;
    this.resourcesAddData.parentName = item.name;
    this.resourcesAddData.parentCode = item.code;
    this.getListMixin();
  }
  private get pageHeight() {
    let h =
      (document.documentElement.clientHeight || document.body.clientHeight) -
      (90 + 90) -
      50;
    return h;
  }
}
</script>
<style lang="scss" scoped>
.btn-list {
  text-align: left;
  margin-left: 80px;
}
</style>
