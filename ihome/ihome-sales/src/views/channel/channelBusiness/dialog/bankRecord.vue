<!--
 * @Description: 银行网点档案库弹窗
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-30 16:21:18
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-14 16:35:46
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    append-to-body
    width="80%"
    title="银行网点档案库"
  >
    <el-form label-width="80px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="省份">
            <!-- <IhCascader
              :level="2"
              v-model="provinceList"
            ></IhCascader> -->
            <el-input v-model="queryPageParameters.provinceName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="城市">
            <el-input v-model="queryPageParameters.cityName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="网点名称">
            <el-input v-model="queryPageParameters.branchName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="联行号">
            <el-input v-model="queryPageParameters.branchNo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="margin-left-80">
      <el-button
        type="primary"
        @click="handleSearch()"
      >查询</el-button>
      <el-button
        type="info"
        @click="handleReset()"
      >重置</el-button>
    </div>
    <br />
    <el-table
      class="ih-table"
      ref="table"
      :data="resPageInfo.list"
      @selection-change="handleSelectionChange"
      @select="handleSelect"
      @select-all="handleSelectAll"
    >
      <el-table-column
        fixed
        type="selection"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column
        label="联行号"
        prop="branchNo"
      ></el-table-column>
      <el-table-column
        label="网点名称"
        min-width="205"
        prop="branchName"
      ></el-table-column>
      <el-table-column
        label="省份"
        prop="provinceName"
      ></el-table-column>
      <el-table-column
        label="城市"
        prop="cityName"
      ></el-table-column>
      <el-table-column
        label="所属银行"
        prop="bankName"
      ></el-table-column>
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
    <template #footer>
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        type="primary"
        @click="finish()"
      >确 定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PaginationMixin from "../../../../mixins/pagination";
import { post_bankBranch_getList } from "@/api/finance/index";

@Component({
  mixins: [PaginationMixin],
})
export default class BankRecord extends Vue {
  private dialogVisible = true;
  private provinceList = [];
  private selection = [];
  public queryPageParameters: any = {
    provinceName: null,
    cityName: null,
    branchNo: null,
    branchName: null,
  };
  public resPageInfo: any = {
    total: null,
    list: [],
  };

  cancel(): void {
    this.$emit("cancel", false);
  }
  finish(): void {
    if (this.selection.length) {
      this.$emit("finish", this.selection[0]);
    } else {
      this.$message.warning("请先勾选表格数据");
    }
  }
  private handleSearch() {
    this.queryPageParameters.provinceName = this.provinceList[0];
    this.queryPageParameters.cityName = this.provinceList[1];
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
  private handleReset() {
    Object.assign(this.queryPageParameters, {
      provinceName: null,
      cityName: null,
      branchNo: null,
      branchName: null,
    });
    this.provinceList = [];
  }
  private handleSelectionChange(val: any) {
    this.selection = val;
  }
  private handleSelect(selection: any) {
    if (selection.length > 1) {
      let del_row = selection.shift();
      (this.$refs.table as any).toggleRowSelection(del_row, false);
    }
  }
  private handleSelectAll() {
    // this.$message.warning('只能单选喔~');
    (this.$refs.table as any).clearSelection();
  }
  async getListMixin() {
    this.resPageInfo = await post_bankBranch_getList(this.queryPageParameters);
  }

  async created() {
    this.getListMixin();
  }
}
</script>

<style lang="scss" scoped>
.ih-table {
  /deep/ .el-table__header {
    .el-checkbox {
      display: none !important;
    }
  }
}
</style>
