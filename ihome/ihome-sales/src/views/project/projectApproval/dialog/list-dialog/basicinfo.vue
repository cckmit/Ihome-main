<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-30 08:49:31
 * @LastEditors: wwq
 * @LastEditTime: 2021-03-26 16:31:28
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
    :title="`项目基础信息`"
    :append-to-body="true"
  >
    <el-form
      ref="form"
      label-width="100px"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="项目盘编">
            <el-input
              clearable
              v-model="queryPageParameters.proNo"
              placeholder="项目盘编"
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
        <!-- <el-col :span="8">
          <el-form-item label="周期名称">
            <el-input
              clearable
              v-model="queryPageParameters.termName"
              placeholder="周期名称"
            ></el-input>
          </el-form-item>
        </el-col> -->
        <el-col :span="8">
          <el-form-item label="省市区">
            <IhCascader
              v-model="provinceOption"
              clearable
              placeholder="请选择"
              class="width--100"
            />
          </el-form-item>
        </el-col>
        <!-- <el-col :span="8">
          <el-form-item label="业务类型">
            <el-select
              v-model="queryPageParameters.busTypeEnum"
              clearable
              placeholder="业务类型"
              class="width--100"
            >
              <el-option
                v-for="item in $root.dictAllList('BusType')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
        <el-col :span="8">
          <el-form-item label="项目审核状态">
            <el-select
              v-model="queryPageParameters.auditEnum"
              clearable
              placeholder="特批入库"
              class="width--100"
            >
              <el-option
                v-for="item in $root.dictAllList('ProAudit')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="margin-left-80">
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
      ref="multipleTable"
      :data="resPageInfo.list"
      :empty-text="emptyText"
      @selection-change="handleSelectionChange"
      @select="handleSelect"
    >
      <el-table-column
        type="selection"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column
        fixed
        prop="proNo"
        label="盘编"
        width="160"
      ></el-table-column>
      <el-table-column
        fixed
        prop="proName"
        label="项目名称"
        width="100"
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
        prop="proAddr"
        label="项目地址"
      > </el-table-column>
      <el-table-column
        prop="auditEnum"
        label="项目审核状态"
      >
        <template v-slot="{ row }">{{
            $root.dictAllName(row.auditEnum, "ProAudit")
          }}</template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template v-slot="{ row }">
          <el-link
            type="primary"
            @click.native.prevent="routerTo(row, 'info')"
          >详情</el-link>
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
import { Component, Vue } from "vue-property-decorator";
import PaginationMixin from "@/mixins/pagination";
import { post_project_getList } from "@/api/project/index";

@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class ProjectApprovalDialog extends Vue {
  dialogVisible = true;
  viewEditDialogVisible = false;
  queryPageParameters: any = {
    proNo: null,
    proId: null,
    termName: null,
    province: null,
    city: null,
    district: null,
    busTypeEnum: null,
    auditEnum: "Adopt",
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
    this.resPageInfo = await post_project_getList(this.queryPageParameters);
  }

  reset() {
    Object.assign(this.queryPageParameters, {
      proNo: null,
      proId: null,
      termName: null,
      province: null,
      city: null,
      district: null,
      busTypeEnum: null,
      auditEnum: null,
    });
    this.provinceOption = [];
  }

  cancel() {
    this.$emit("cancel");
  }

  handleSelectionChange(selection: any) {
    this.selection = selection;
  }
  handleSelect(selection: any) {
    if (selection.length > 1) {
      let row = selection.shift();
      (this.$refs.multipleTable as any).toggleRowSelection(row, false);
    }
  }

  search() {
    this.queryPageParameters.province = this.provinceOption[0];
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
    let where: any = "";
    switch (type) {
      case "info":
        if (row.exMinyuan) {
          if (!row.parentId) {
            where = "parentInfo";
          } else {
            where = "childInfo";
          }
        } else {
          where = "childInfo";
        }
        break;
    }
    const item = this.$router.resolve({
      path: `/projects/${where}`,
      query: {
        id: row.proId,
        proName: row.proName,
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
.ih-table {
  /deep/ .el-table__header {
    .el-checkbox {
      display: none !important;
    }
  }
}
</style>