<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-12-09 09:45:59
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-17 10:05:36
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-14 11:26:26
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-14 11:10:20
--> 
<template>
  <ih-page class="organization-list">
    <template v-slot:container>
      <el-row>
        <IhLeftRightContainer :leftHeight="pageHeight" :leftWidth="400">
          <template slot="left">
            <el-col :span="24" class="organization-list-left">
              <OrganizationTree
                ref="organizationTree"
                @select="selectOrgTree"
                @edit="editTree"
              />
            </el-col>
          </template>
          <template slot="right">
            <el-col :span="24" class="padding-left-20">
              <el-form ref="form" label-width="80px" class="ih-form">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="名称">
                      <el-input
                        v-model="queryPageParameters.name"
                        placeholder="名称"
                        clearable
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <!-- <el-col :span="8">
                <el-form-item label="组织层级">
                  <el-select
                    v-model="queryPageParameters.level"
                    clearable
                    placeholder="请选择组组织层级"
                    class="width--100"
                  >
                    <el-option
                      v-for="(item, index) in levelOptions"
                      :key="index"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col> -->
                  <el-col :span="8">
                    <el-form-item label="组织类型">
                      <el-select
                        v-model="queryPageParameters.orgType"
                        clearable
                        placeholder="组织类型"
                        class="width--100"
                      >
                        <el-option
                          v-for="(item, index) in $root.dictAllList(
                            'OrgType',
                            'RealOrg'
                          )"
                          :key="index"
                          :label="item.name"
                          :value="item.code"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="部门分类">
                      <el-select
                        v-model="queryPageParameters.departmentType"
                        clearable
                        placeholder="部门分类"
                        class="width--100"
                      >
                        <el-option
                          v-for="(item, index) in $root.dictAllList(
                            'DepartmentType'
                          )"
                          :key="index"
                          :label="item.name"
                          :value="item.code"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="是否有效">
                      <el-select
                        v-model="queryPageParameters.status"
                        clearable
                        placeholder="请选择"
                        class="width--100"
                      >
                        <el-option
                          v-for="(item, index) in $root.dictAllList(
                            'ValidType'
                          )"
                          :key="index"
                          :label="item.name"
                          :value="item.code"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row class="btn-list">
                  <el-button type="primary" @click="search()">查询</el-button>
                  <el-button
                    type="success"
                    @click="add({})"
                    v-has="'B.SALES.SYSTEM.ORGLIST.ADD'"
                    >添加</el-button
                  >
                </el-row>
              </el-form>
              <br />
              <el-table
                :data="resPageInfo.list"
                width="100%"
                class="ih-table"
                :height="pageHeight - 150"
                :default-sort="{ prop: 'date', order: 'descending' }"
              >
                <!-- <el-table-column type="selection" width="50"></el-table-column> -->
                <!-- 名称 简称 层级 组织类型 -->
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
                ></el-table-column>
                <el-table-column
                  prop="shortName"
                  label="简称"
                  width="90"
                ></el-table-column>
                <el-table-column
                  prop="shortNameAbbr"
                  label="简称首字母"
                  width="90"
                ></el-table-column>
                <el-table-column label="组织类型" width="120">
                  <template slot-scope="scope">{{
                    $root.dictAllName(scope.row.orgType, "OrgType")
                  }}</template>
                </el-table-column>

                <el-table-column label="部门分类" width="120">
                  <template slot-scope="scope">{{
                    $root.dictAllName(
                      scope.row.departmentType,
                      "DepartmentType"
                    )
                  }}</template>
                </el-table-column>
                <el-table-column
                  prop="oaChar"
                  label="OA呈字"
                  width="90"
                ></el-table-column>

                <el-table-column
                  prop="updateUserName"
                  label="修改人"
                  width="90"
                ></el-table-column>
                <el-table-column
                  prop="updateTime"
                  label="修改人时间"
                  width="155"
                ></el-table-column>
                <el-table-column fixed="right" label="操作" width="120">
                  <template slot-scope="scope">
                    <el-link
                      style="color: #409eff"
                      class="margin-right-10"
                      type="primary"
                      @click.native.prevent="edit(scope)"
                      v-has="'B.SALES.SYSTEM.ORGLIST.UPDATE'"
                      >修改</el-link
                    >
                    <el-link
                      style="color: #f66"
                      type="primary"
                      v-has="'B.SALES.SYSTEM.ORGLIST.ADD'"
                      @click.native.prevent="remove(scope)"
                      >删除</el-link
                    >
                  </template>
                </el-table-column>
              </el-table>
              <div class="text-right">
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
              </div>
            </el-col>
          </template>
        </IhLeftRightContainer>
      </el-row>
    </template>
    <ih-dialog :show="dialogVisible">
      <OrganizationAdd
        :show-confirm-button="true"
        :show-cancel-button="true"
        :data="organizationItem"
        @cancel="() => (dialogVisible = false)"
        @finish="
          (data) => {
            dialogVisible = false;
            finish(data);
          }
        "
      />
    </ih-dialog>
  </ih-page>
</template>
<script lang="ts">
import OrganizationAdd from "./add.vue";
import OrganizationTree from "@/components/OrganizationTree.vue";
import { Component, Vue } from "vue-property-decorator";
import { post_org_getList, post_org_delete__id } from "../../api/system/index";
import PaginationMixin from "../../mixins/pagination";
// import LeftRightContainer from "../../components/LeftRightContainer.vue";
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

  get levelOptions() {
    const list = [0, 1, 2, 3, 4, 5, 6, 7];
    return list;
  }
  async getListMixin() {
    this.resPageInfo = await post_org_getList(this.queryPageParameters);
  }

  add(data: any, isedit: boolean) {
    if (!isedit) {
      if (this.queryPageParameters.parentId === 0) {
        this.$message.warning("请先选择组织");
        return;
      } else {
        data.id = 0;
        data.parentId = this.leftItem.id;
        data.parentOrgName = this.leftItem.name;
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
    this.getListMixin();
    (this.$refs as any).organizationTree.init();
  }
  // finishEdit(data: any) {
  //   console.log(data);
  //   this.getListMixin();
  //   (this.$refs as any).organizationTree.init();
  // }

  info(scope: any) {
    this.$router.push({
      path: "/resources/info",
      query: { id: scope.row.id },
    });
  }

  async remove(scope: any) {
    try {
      await this.$confirm("是否确定删除?", "提示");
      await post_org_delete__id({ id: scope.row.id });
      this.resPageInfo.list.splice(scope.$index, 1);
      this.$message({
        type: "success",
        message: "删除成功!",
      });
      (this.$refs as any).organizationTree.init();
    } catch (error) {
      console.log(error);
    }
  }
  selectOrgTree(item: any) {
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
    console.log(node);
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
.organization-list-left {
  // border-right: 1px solid #e6e6e6;
  // padding-right: 20px;
  overflow: auto;
}
</style>
 