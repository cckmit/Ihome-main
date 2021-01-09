<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-27 17:11:14
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-09 17:10:00
-->
<template>
  <IhPage label-width="100px">
    <template v-slot:form>
      <el-form
        ref="form"
        label-width="100px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="项目盘编">
              <el-input
                v-model="queryPageParameters.proNo"
                clearable
                placeholder="请输入项目盘编"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目名称">
              <IhSelectPageByProject
                v-model="queryPageParameters.proId"
                clearable
                :props="{
                  value: 'proId',
                  key: 'proId',
                  lable: 'proName'
                }"
              ></IhSelectPageByProject>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="周期名称">
              <el-input
                v-model="queryPageParameters.termName"
                clearable
                placeholder="请输入周期名称"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="业务类型">
              <el-select
                style="width: 100%"
                v-model="queryPageParameters.busTypeEnum"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in $root.dictAllList('BusType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="省市区">
              <IhCascader v-model="provinceOption"></IhCascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="周期审核状态">
              <el-select
                style="width: 100%"
                v-model="queryPageParameters.auditEnum"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in $root.dictAllList('Audit')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="可用状态">
              <el-select
                style="width: 100%"
                v-model="queryPageParameters.state"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in $root.dictAllList('TermState')"
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
          @click="dialogVisible = true"
          v-has="'B.SALES.PROJECT.TERMLIST.ADD'"
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
          prop="district"
          label="行政区"
        >
          <template v-slot="{ row }">{{
            $root.getAreaName(row.district)
          }}</template>
        </el-table-column>
        <el-table-column
          prop="proName"
          label="归属项目"
        ></el-table-column>
        <el-table-column
          prop="proNo"
          label="项目盘编"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="termName"
          label="周期名称"
          width="220"
        ></el-table-column>
        <el-table-column
          prop="busTypeEnum"
          label="业务类型"
        >
          <template v-slot="{ row }">{{
            $root.dictAllName(row.busTypeEnum, "BusType")
          }}</template>
        </el-table-column>
        <el-table-column
          label="周期时间"
          width="180"
        >
          <template v-slot="{ row }">{{
            row.termStart + '至' + row.termEnd
          }}</template>
        </el-table-column>
        <el-table-column
          prop="auditEnum"
          label="周期审核状态"
          width="150"
        >
          <template v-slot="{ row }">{{
            $root.dictAllName(row.auditEnum, "Audit")
          }}</template>
        </el-table-column>
        <el-table-column
          prop="auditEnum"
          label="可用状态"
          width="120"
        >
          <template v-slot="{ row }">{{
            $root.dictAllName(row.state, "TermState")
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
            >查看</el-link>
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
                  @click.native.prevent="routeTo(row, 'edit')"
                  :class="{'ih-data-disabled': !editChange(row)}"
                  v-has="'B.SALES.PROJECT.TERMLIST.UPDATE'"
                >修改</el-dropdown-item>
                <el-dropdown-item
                  :class="{'ih-data-disabled': row.auditEnum !== 'ConstractAdopt'}"
                  @click.native.prevent="routeTo(row, 'apply')"
                  v-has="'B.SALES.PROJECT.TERMLIST.APPLYDISTRIBUT'"
                >申领分销协议</el-dropdown-item>
                <el-dropdown-item
                  :class="{'ih-data-disabled': row.auditEnum !== 'ConstractAdopt'}"
                  @click.native.prevent="replenish(row)"
                  v-has="'B.SALES.PROJECT.TERMLIST.EDITDISTRIBUT'"
                >补充协议</el-dropdown-item>
                <el-dropdown-item
                  v-if="row.state === 'Stop'"
                  @click.native.prevent="start(row)"
                >启用周期</el-dropdown-item>
                <el-dropdown-item
                  v-if="row.state === 'Start'"
                  @click.native.prevent="stop(row)"
                >作废周期</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="remove(row)"
                  :class="{'ih-data-disabled': !delChange(row)}"
                  v-has="'B.SALES.PROJECT.TERMLIST.DELETE'"
                >删除</el-dropdown-item>
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
    <ih-dialog :show="dialogVisible">
      <Add
        @cancel="() => (dialogVisible = false)"
        @finish="(data) => addFinish(data)"
      />
    </ih-dialog>
  </IhPage>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  post_term_getList,
  post_term_del__termId,
  get_term_applyTerm__termId,
  post_term_start__termId,
  post_term_stop__termId,
} from "@/api/project/index";
import PaginationMixin from "@/mixins/pagination";
import Add from "./dialog/basicInfo-dialog/add.vue";

@Component({
  components: { Add },
  mixins: [PaginationMixin],
})
export default class ProjectApproval extends Vue {
  queryPageParameters: any = {
    proNo: null,
    proId: null,
    termName: null,
    busTypeEnum: null,
    province: null,
    city: null,
    district: null,
    auditEnum: null,
    state: null,
  };
  provinceOption: any = [];
  selection: any = [];
  resPageInfo: any = {
    total: null,
    list: [],
  };
  dialogVisible = false;

  // 权限控制
  editChange(row: any) {
    const Draft = row.auditEnum === "Draft";
    const TermAdopt = row.auditEnum === "TermAdopt";
    const TermReject = row.auditEnum === "TermReject";
    const ConstractAdopt = row.auditEnum === "ConstractAdopt";
    const ConstractReject = row.auditEnum === "ConstractReject";
    const ConstractWait = row.auditEnum === "ConstractWait";
    return (
      Draft ||
      TermAdopt ||
      TermReject ||
      ConstractAdopt ||
      ConstractReject ||
      ConstractWait
    );
  }

  delChange(row: any) {
    const Draft = row.auditEnum === "Draft";
    const TermReject = row.auditEnum === "TermReject";
    return Draft || TermReject;
  }

  get emptyText() {
    return this.resPageInfo.total === null ? "正在加载数据..." : "暂无数据";
  }

  async created() {
    this.getListMixin();
  }
  async getListMixin() {
    this.resPageInfo = await post_term_getList(this.queryPageParameters);
  }

  reset() {
    Object.assign(this.queryPageParameters, {
      proNo: null,
      proId: null,
      termName: null,
      busTypeEnum: null,
      province: null,
      city: null,
      district: null,
      auditEnum: null,
      state: null,
    });
    this.provinceOption = [];
  }

  async start(data: any) {
    await post_term_start__termId({
      termId: data.termId,
    });
    this.getListMixin();
    this.$message({
      type: "success",
      message: "启用成功!",
    });
  }

  async stop(data: any) {
    await post_term_stop__termId({
      termId: data.termId,
    });
    this.getListMixin();
    this.$message({
      type: "success",
      message: "作废成功!",
    });
  }

  routeTo(row: any, where: string) {
    this.$router.push({
      path: `/projectApproval/${where}`,
      query: {
        id: row.termId,
      },
    });
    if (where === "apply") {
      window.sessionStorage.setItem("groupId", row.startDivisionId);
    }
  }

  async remove(row: any) {
    try {
      await this.$confirm("是否确定删除?", "提示");
      await post_term_del__termId({ termId: row.termId });
      this.getListMixin();
      this.$message({
        type: "success",
        message: "删除成功!",
      });
    } catch (error) {
      console.log(error);
    }
  }

  search() {
    this.queryPageParameters.province = this.provinceOption[0];
    this.queryPageParameters.city = this.provinceOption[1];
    this.queryPageParameters.county = this.provinceOption[2];
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
  addFinish(data: any) {
    this.dialogVisible = false;
    this.$router.push({
      path: `/projectApproval/edit`,
      query: {
        id: data.termId,
      },
    });
  }
  async replenish(data: any) {
    const item = await get_term_applyTerm__termId({
      termId: data.termId,
    });
    this.$router.push({
      path: `/projectApproval/edit`,
      query: {
        id: item.toString(),
      },
    });
  }
}
</script>
<style lang="scss" scoped>
</style>