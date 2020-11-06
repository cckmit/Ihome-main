<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-03 18:39:23
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-04 16:25:23
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
    :title="`一手代理公司列表`"
  >
    <el-form ref="form" label-width="80px">
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
          <el-form-item label="省市">
            <IhCascader v-model="provinceOption" :level="2"></IhCascader>
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
                v-for="item in $root.dictAllList('AgencyAuditEnum')"
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
      <el-button type="primary" @click="search()">查询</el-button>
      <el-button type="info" @click="reset()">重置</el-button>
    </div>
    <br />
    <el-table
      class="ih-table"
      :data="resPageInfo.list"
      style="width: 100%"
      @selection-change="selectionChange"
    >
      <el-table-column
        type="selection"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="agencyName"
        label="名称"
        width="200"
      ></el-table-column>
      <el-table-column prop="simpleName" label="简称"></el-table-column>
      <el-table-column prop="province" label="省份">
        <template v-slot="{ row }">{{
          $root.getAreaName(row.province)
        }}</template>
      </el-table-column>
      <el-table-column prop="city" label="城市">
        <template v-slot="{ row }">{{ $root.getAreaName(row.city) }}</template>
      </el-table-column>
      <el-table-column prop="followMan" label="跟进人"></el-table-column>
      <el-table-column prop="agencyAuditEnum" label="状态" width="150">
        <template v-slot="{ row }">{{
          $root.dictAllName(row.agencyAuditEnum, "AgencyAuditEnum")
        }}</template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template v-slot="{ row }">
          <el-link
            type="primary"
            class="margin-left-16"
            :href="`/web-sales/firstAgency/info?id=${row.agencyId}`"
            target="_blank"
            >详情</el-link
          >
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
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PaginationMixin from "@/mixins/pagination";
import { post_firstAgencyCompany_getList } from "@/api/project/index";

@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class FirstAgencyDialog extends Vue {
  dialogVisible = true;
  viewEditDialogVisible = false;
  queryPageParameters: any = {
    agencyName: null,
    creditCode: null,
    simpleName: null,
    province: null,
    city: null,
    followMan: null,
    agencyAuditEnum: null,
  };
  provinceOption: any = [];
  editData: any = {};

  resPageInfo: any = {
    list: [{}],
    total: 0,
  };
  selection: any = [];

  async created() {
    this.getListMixin();
  }
  async getListMixin() {
    this.resPageInfo = await post_firstAgencyCompany_getList(
      this.queryPageParameters
    );
  }

  reset() {
    this.queryPageParameters = {
      agencyName: null,
      creditCode: null,
      simpleName: null,
      province: null,
      city: null,
      followMan: null,
      agencyAuditEnum: null,
      pageNum: this.queryPageParameters.pageNum,
      pageSize: this.queryPageParameters.pageSize,
    };
    this.provinceOption = [];
  }

  cancel() {
    this.$emit("cancel");
  }

  selectionChange(selection: any) {
    this.selection = selection;
  }

  search() {
    this.queryPageParameters.province = this.provinceOption[0];
    this.queryPageParameters.city = this.provinceOption[1];
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