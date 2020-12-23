<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-08 19:26:43
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-23 20:52:45
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="80%"
    class="text-left dialog-table"
    :title="`周期信息`"
    :append-to-body="true"
  >
    <el-form
      ref="form"
      label-width="100px"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="省市区">
            <IhCascader v-model="provinceOption"></IhCascader>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="盘编">
            <el-input
              v-model="queryPageParameters.proNo"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称">
            <el-input
              v-model="queryPageParameters.proName"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="周期名称">
            <el-input
              v-model="queryPageParameters.termName"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="margin-left-100">
      <el-button
        type="primary"
        @click="search()"
      >查询</el-button>
      <el-button
        type="info"
        @click="reset()"
      >重置</el-button>
    </div>
    <br />
    <el-table
      class="ih-table"
      :data="resPageInfo.list"
      :empty-text="emptyText"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        fixed
        type="selection"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="termName"
        label="周期名称"
        width="250"
      ></el-table-column>
      <el-table-column
        prop="proNo"
        label="盘编"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="proName"
        label="项目名称"
        width="150"
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
        prop="district"
        label="行政区"
      >
        <template v-slot="{ row }">{{
            $root.getAreaName(row.district)
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
            @click.native.prevent="routerTo(row, 'info')"
          >查看详情</el-link>
        </template>
      </el-table-column>
    </el-table>
    <br />
    <el-pagination
      class="text-right"
      style="margin-right: 40px"
      @size-change="handleSizeChangeMixin"
      @current-change="handleCurrentChangeMixin"
      :current-page.sync="queryPageParameters.pageNum"
      :page-sizes="$root.pageSizes"
      :page-size="queryPageParameters.pageSize"
      :layout="$root.paginationLayout"
      :total="resPageInfo.total"
    ></el-pagination>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        type="primary"
        @click="finish()"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import PaginationMixin from "@/mixins/pagination";
import { post_term_getListAccrossTerm } from "@/api/project/index";

@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class ProjectApproval extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  queryPageParameters: any = {
    termName: null,
    proNo: null,
    proName: null,
    province: null,
    city: null,
    district: null,
  };
  provinceOption: any = [];
  resPageInfo: any = {
    list: [],
    total: 0,
  };
  selection: any = [];

  get emptyText() {
    return this.resPageInfo.total === null ? "正在加载数据..." : "暂无数据";
  }

  async created() {
    this.getListMixin();
  }
  async getListMixin() {
    this.queryPageParameters.exOver = this.data.exOver;
    this.queryPageParameters.proId = this.data.proId;
    this.resPageInfo = await post_term_getListAccrossTerm(
      this.queryPageParameters
    );
  }

  reset() {
    Object.assign(this.queryPageParameters, {
      termName: null,
      proNo: null,
      proName: null,
      province: null,
      city: null,
      district: null,
    });
    this.provinceOption = [];
  }

  cancel() {
    this.$emit("cancel");
  }

  handleSelectionChange(selection: any) {
    this.selection = selection;
  }

  search() {
    this.queryPageParameters.provinces = this.provinceOption[0];
    this.queryPageParameters.city = this.provinceOption[1];
    this.queryPageParameters.district = this.provinceOption[2];
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }

  finish() {
    if (this.selection.length) {
      this.$emit("finish", this.selection);
    } else {
      this.$message.warning("请先勾选表格数据");
    }
  }

  routerTo(row: any, type: string) {
    const item = this.$router.resolve({
      path: `/projectApproval/${type}`,
      query: {
        id: row.termId,
      },
    });
    window.open(item.href, "_blank");
  }
}
</script>
<style lang="scss" scoped>
.dialog-table {
  /deep/ .el-dialog {
    margin-top: 5vh !important;
  }
  /deep/ .el-dialog__body {
    padding: 10px 20px;
  }
}
</style>