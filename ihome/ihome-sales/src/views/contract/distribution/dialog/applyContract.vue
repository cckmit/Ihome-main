<!--
 * @Description: 分销合同模板弹窗
 * @version: 
 * @Author: ywl
 * @Date: 2020-10-30 09:53:42
 * @LastEditors: ywl
 * @LastEditTime: 2021-04-07 20:16:11
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    append-to-body
    width="75%"
    title="申领渠道合同"
    top="5vh"
  >
    <el-form label-width="80px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="周期">
            <IhSelectPageByCycle
              v-model="queryPageParameters.termId"
              placeholder="请选择周期"
              clearable
            ></IhSelectPageByCycle>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="合同主标题"
            class="formItem"
          >
            <el-input
              v-model="queryPageParameters.contractTitle"
              placeholder="请输入关键字"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="渠道合同类型"
            class="formItem"
          >
            <el-select
              v-model="queryPageParameters.contractKind"
              clearable
            >
              <el-option
                v-for="(i, n) in $root.dictAllList('ContractKind')"
                :key="n"
                :label="i.name"
                :value="i.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="margin-left-80">
      <el-button type="primary">查询</el-button>
      <el-button type="info">重置</el-button>
    </div>
    <br />
    <el-table
      class="ih-table"
      ref="table"
      :data="resPageInfo.list"
      @selection-change="handleSelectionChange"
      @select="handleSelect"
      max-height="45vh"
    >
      <el-table-column
        fixed
        type="selection"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column label="合同类型">
        <template v-slot="{ row }">
          {{$root.dictAllName(row.contractKind, 'ContractKind')}}
        </template>
      </el-table-column>
      <el-table-column
        label="合同主标题"
        prop="contractTitle"
        min-width="150"
      ></el-table-column>
      <el-table-column
        label="甲方公司"
        prop="partyCompany"
      ></el-table-column>
      <el-table-column label="是否垫佣">
        <template v-slot="{ row }">
          {{$root.dictAllName(row.padCommissionEnum, 'PadCommission')}}
        </template>
      </el-table-column>
      <el-table-column label="渠道类型">
        <template v-slot="{ row }">
          {{$root.dictAllName(row.channelEnum, 'Channel')}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        width="80"
      >
        <template v-slot="{ }">
          <el-link type="primary">查看</el-link>
          <el-link type="success">预览</el-link>
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
    <template #footer>
      <el-button @click="cancel()">取消</el-button>
      <el-button type="primary">下一步</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import PaginationMixin from "@/mixins/pagination";
import { post_distributContract_applyDistract } from "@/api/project/index";

@Component({
  mixins: [PaginationMixin],
})
export default class ApplyContract extends Vue {
  @Prop() data!: any;
  queryPageParameters: any = {
    contractTitle: null,
    termId: null,
    contractKind: null,
  };
  resPageInfo: any = {
    total: null,
    list: [],
  };
  private dialogVisible = true;
  private selection: any[] = [];

  cancel() {
    this.$emit("cancel", false);
  }
  handleOption(row: any) {
    this.$emit("finish", row);
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
    this.resPageInfo = await post_distributContract_applyDistract(
      this.queryPageParameters
    );
  }

  created() {
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
.formItem {
  /deep/ .el-form-item__label {
    line-height: 20px;
  }
}
</style>
