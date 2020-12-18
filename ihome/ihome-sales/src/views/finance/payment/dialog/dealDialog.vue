<!--
 * @Description: 成交报告弹窗
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-18 10:12:10
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-18 14:20:41
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
    title="关联成交报告"
  >
    <el-form label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="成交报告编号">
            <el-input v-model="queryPageParameters.branchName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="成交日期">
            <el-input v-model="queryPageParameters.bankName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="录入人">
            <el-input v-model="queryPageParameters.branchNo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="联动项目">
            <el-input v-model="queryPageParameters.provinceName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="房号">
            <el-input v-model="queryPageParameters.cityName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="立项周期">
            <el-input v-model="queryPageParameters.cityName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="组织">
            <el-input v-model="queryPageParameters.cityName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="业主姓名">
            <el-input v-model="queryPageParameters.cityName"></el-input>
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
      class="ih-table table-dialog"
      ref="table"
      :data="resPageInfo.list"
      @selection-change="handleSelectionChange"
      @select="handleSelect"
    >
      <el-table-column
        fixed
        type="selection"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column
        label="成交报告编号"
        prop="branchName"
      ></el-table-column>
      <el-table-column
        label="成交日期"
        prop="bankName"
      ></el-table-column>
      <el-table-column
        label="录入人"
        prop="provinceName"
      ></el-table-column>
      <el-table-column
        label="联动项目"
        prop="cityName"
      ></el-table-column>
      <el-table-column
        label="房号"
        prop="branchNo"
      ></el-table-column>
      <el-table-column
        label="立项周期"
        prop="branchNo"
      ></el-table-column>
      <el-table-column
        label="店组"
        prop="branchNo"
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
import { post_deal_getList } from "../../../../api/deal/index";
import { post_payment_relevanceDeal } from "../../../../api/finance/index";

@Component({
  mixins: [PaginationMixin],
})
export default class DealDialog extends Vue {
  private dialogVisible = true;
  private selection = [];
  public queryPageParameters: any = {};
  public resPageInfo: any = {
    total: null,
    list: [],
  };

  cancel(): void {
    this.$emit("cancel", false);
  }
  async finish() {
    if (this.selection.length) {
      await post_payment_relevanceDeal();
      this.$emit("finish");
    } else {
      this.$message.warning("请先勾选表格数据");
    }
  }
  private search() {
    //
  }
  private reset() {
    //
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
  async getListMixin() {
    this.resPageInfo = await post_deal_getList(this.queryPageParameters);
  }

  async created() {
    this.getListMixin();
  }
}
</script>

<style lang="scss">
.ih-table.table-dialog {
  .el-table__header {
    .el-checkbox {
      display: none !important;
    }
  }
}
</style>
