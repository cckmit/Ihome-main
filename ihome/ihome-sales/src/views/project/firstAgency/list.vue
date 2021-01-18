<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-10-28 15:34:27
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-16 18:53:59
-->
<template>
  <ih-page>
    <template v-slot:form>
      <el-form
        ref="form"
        label-width="80px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="名称">
              <el-input
                v-model="queryPageParameters.agencyName"
                clearable
              ></el-input>
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
            <el-form-item label="简称">
              <el-input
                v-model="queryPageParameters.simpleName"
                clearable
              ></el-input>
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
            <el-form-item label="跟进人">
              <el-input
                v-model="queryPageParameters.followMan"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态">
              <el-select
                style="width: 100%"
                v-model="queryPageParameters.agencyAuditEnum"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in $root.dictAllList('AgencyAudit')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>

    <template v-slot:btn>
      <el-row>
        <el-button
          type="primary"
          @click="search()"
        >查询</el-button>
        <el-button
          type="success"
          @click="add()"
          v-has="'B.SALES.PROJECT.AGENCYLIST.ADD'"
        >添加</el-button>
        <el-button
          type="info"
          @click="reset()"
        >重置</el-button>
      </el-row>
    </template>

    <template v-slot:table>
      <br />
      <el-table
        class="ih-table"
        :data="resPageInfo.list"
        :empty-text="emptyText"
      >
        <el-table-column
          prop="agencyName"
          label="名称"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="creditCode"
          label="信用代码"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="simpleName"
          label="简称"
        ></el-table-column>
        <el-table-column
          prop="province"
          label="省份"
        >
          <template v-slot="{ row }">{{
            $root.getAreaName(row.province)
          }}</template>
        </el-table-column>
        <el-table-column
          prop="city"
          label="城市"
        >
          <template v-slot="{ row }">{{
            $root.getAreaName(row.city)
          }}</template>
        </el-table-column>
        <el-table-column
          prop="area"
          label="行政区"
        >
          <template v-slot="{ row }">{{
            $root.getAreaName(row.area)
          }}</template>
        </el-table-column>
        <el-table-column
          prop="followMan"
          label="跟进人"
        ></el-table-column>
        <el-table-column
          prop="agencyAuditEnum"
          label="状态"
          width="150"
        >
          <template v-slot="{ row }">{{
            $root.dictAllName(row.agencyAuditEnum, "AgencyAudit")
          }}</template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120"
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              @click.native.prevent="routeTo(row, 'info')"
            >详情</el-link>
            <el-dropdown
              trigger="click"
              class="margin-left-15"
            >
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :class="{ 'ih-data-disabled': !editChange(row) }"
                  @click.native.prevent="routeTo(row, 'edit')"
                  v-has="'B.SALES.PROJECT.AGENCYLIST.UPDATE'"
                >修改</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="audit(row)"
                  :class="{'ih-data-disabled': !checkChange(row)}"
                  v-has="'B.SALES.PROJECT.AGENCYLIST.VERIFY'"
                >审核</el-dropdown-item>
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
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  post_firstAgencyCompany_getList,
  post_firstAgencyCompany_audit__agencyId,
} from "@/api/project/index";
import PaginationMixin from "@/mixins/pagination";

@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class FirstAgencyList extends Vue {
  queryPageParameters: any = {
    agencyName: null,
    creditCode: null,
    simpleName: null,
    province: null,
    city: null,
    area: null,
    followMan: null,
    agencyAuditEnum: null,
  };
  provinceOption: any = [];
  selection: any = [];
  resPageInfo: any = {
    total: null,
    list: [],
  };

  checkChange(row: any) {
    const WaitByBranch = row.agencyAuditEnum === "WaitByBranch";
    const roleList = (this.$root as any).userInfo.roleList.map(
      (v: any) => v.code
    );
    const fen = roleList.includes("RBusinessManagement");
    const zong = roleList.includes("RHeadBusinessManagement");
    return (fen || zong) && WaitByBranch;
  }

  editChange(row: any) {
    const Draft = row.agencyAuditEnum === "Draft";
    const dangqian = (this.$root as any).userInfo.id === row.followManId;
    return Draft && dangqian;
  }

  get emptyText() {
    return this.resPageInfo.total === null ? "正在加载数据..." : "暂无数据";
  }

  async created() {
    this.getListMixin();
  }
  async getListMixin() {
    this.resPageInfo = await post_firstAgencyCompany_getList(
      this.queryPageParameters
    );
  }

  reset() {
    Object.assign(this.queryPageParameters, {
      agencyName: null,
      creditCode: null,
      simpleName: null,
      province: null,
      city: null,
      area: null,
      followMan: null,
      agencyAuditEnum: null,
    });
    this.provinceOption = [];
  }

  routeTo(row: any, where: string) {
    this.$router.push({
      path: `/firstAgency/${where}`,
      query: {
        id: row.agencyId,
      },
    });
  }

  async audit(data: any) {
    await post_firstAgencyCompany_audit__agencyId({
      agencyId: data.agencyId,
    });
    this.$message.success("审核成功");
    this.getListMixin();
  }

  add() {
    this.$router.push("/firstAgency/add");
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