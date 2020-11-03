<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-25 17:59:09
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-03 18:11:12
-->
<template>
  <ih-page>
    <template v-slot:form>
      <el-form ref="form" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="名称">
              <el-input v-model="queryPageParameters.name" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="信用代码">
              <el-input
                v-model="queryPageParameters.creditCode"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态">
              <el-select
                style="width: 100%"
                v-model="queryPageParameters.status"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in $root.dictAllList('CompanyStatusEnum')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="省市区">
              <IhCascader v-model="provinceOption"></IhCascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="录入人">
              <el-input
                v-model="queryPageParameters.inputUser"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>

    <template v-slot:btn>
      <el-row>
        <el-button type="primary" @click="search()">查询</el-button>
        <el-button type="success" @click="add()">添加</el-button>
        <el-button type="info" @click="reset()">重置</el-button>
        <el-button @click="updata()">变更录入人</el-button>
      </el-row>
    </template>

    <template v-slot:table>
      <br />
      <el-table
        class="ih-table"
        :data="resPageInfo.list"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          width="50"
          type="selection"
          align="center"
        ></el-table-column>
        <el-table-column prop="name" label="名称" width="250"></el-table-column>
        <el-table-column
          prop="creditCode"
          label="信用代码"
          width="180"
        ></el-table-column>
        <el-table-column prop="province" label="省份">
          <template v-slot="{ row }">{{
            $root.getAreaName(row.province)
          }}</template>
        </el-table-column>
        <el-table-column prop="city" label="城市">
          <template v-slot="{ row }">{{
            $root.getAreaName(row.city)
          }}</template>
        </el-table-column>
        <el-table-column prop="county" label="行政区">
          <template v-slot="{ row }">{{
            $root.getAreaName(row.county)
          }}</template>
        </el-table-column>
        <el-table-column prop="inputUser" label="录入人"></el-table-column>
        <el-table-column prop="status" label="状态" width="150">
          <template v-slot="{ row }">{{
            $root.dictAllName(row.status, "CompanyStatusEnum")
          }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template v-slot="{ row }">
            <el-link type="primary" @click.native.prevent="routeTo(row, 'info')"
              >详情</el-link
            >
            <el-dropdown trigger="click" class="margin-left-15">
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :disabled="row.status === 'Audited'"
                  @click.native.prevent="routeTo(row, 'edit')"
                  >修改</el-dropdown-item
                >
                <el-dropdown-item
                  :disabled="row.status !== 'Draft'"
                  @click.native.prevent="remove(row)"
                  >删除</el-dropdown-item
                >
                <el-dropdown-item
                  :disabled="row.status !== 'WaitAuditByBranchHead'"
                  @click.native.prevent="routeTo(row, 'revocation')"
                  >撤回
                </el-dropdown-item>
                <el-dropdown-item
                  :disabled="row.status !== 'WaitAuditByBranchHead'"
                  @click.native.prevent="routeTo(row, 'check')"
                  >审核</el-dropdown-item
                >
                <el-dropdown-item
                  :disabled="row.status !== 'Audited'"
                  @click.native.prevent="routeTo(row, 'change')"
                  >变更信息</el-dropdown-item
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

    <ih-dialog :show="dialogVisible" desc="变更录入人">
      <UpdateUser
        :data="selection"
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
import { Component, Vue } from "vue-property-decorator";
import UpdateUser from "./dialog/updateUser.vue";
import {
  post_company_getList,
  get_company_delete__id,
} from "../../api/developer/index";
import PaginationMixin from "../../mixins/pagination";

@Component({
  components: {
    UpdateUser,
  },
  mixins: [PaginationMixin],
})
export default class DeveloperList extends Vue {
  queryPageParameters: any = {
    name: null,
    creditCode: null,
    status: null,
    inputUser: null,
    province: null,
    city: null,
  };
  provinceOption: any = [];
  selection: any = [];
  resPageInfo: any = {
    total: 0,
    list: [],
  };
  dialogVisible = false;

  async created() {
    this.getListMixin();
  }
  async getListMixin() {
    this.resPageInfo = await post_company_getList(this.queryPageParameters);
  }

  reset() {
    Object.assign(this.queryPageParameters, {
      name: null,
      creditCode: null,
      status: null,
      inputUser: null,
      province: null,
      city: null,
    });
    this.provinceOption = [];
  }

  async remove(row: any) {
    try {
      await this.$confirm("是否确定删除?", "提示");
      await get_company_delete__id({ id: row.id });
      this.getListMixin();
      this.$message({
        type: "success",
        message: "删除成功!",
      });
    } catch (error) {
      console.log(error);
    }
  }

  routeTo(row: any, where: string) {
    this.$router.push({
      path: `/developers/${where}`,
      query: {
        id: row.id,
      },
    });
  }

  add() {
    this.$router.push("/developers/add");
  }

  updata() {
    if (this.selection.length) this.dialogVisible = true;
    else this.$message.warning("请先勾选表格数据");
  }

  handleSelectionChange(val: any) {
    this.selection = val.map((v: any) => ({
      name: v.name,
      id: v.id,
    }));
  }

  search() {
    this.queryPageParameters.province = this.provinceOption[0];
    this.queryPageParameters.city = this.provinceOption[1];
    this.queryPageParameters.county = this.provinceOption[2];
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
}
</script>
<style lang="scss" scoped>
</style>
