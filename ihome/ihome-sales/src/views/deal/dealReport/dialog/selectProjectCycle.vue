<!--
 * @Description:
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-03 15:28:12
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-26 17:06:13
-->
<template>
  <el-dialog
    v-dialogDrag
    title="选择项目周期列表"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="beforeFinish"
    append-to-body
    width="1000px"
    style="text-align: left"
    class="dialog">
    <el-form ref="form" label-width="100px" @submit.native.prevent>
      <el-row>
        <el-col :span="8">
          <el-form-item label="周期名称">
            <el-input
              v-model="queryPageParameters.termName"
              clearable
              placeholder="周期名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称">
            <el-input
              v-model="queryPageParameters.proName"
              placeholder="项目名称"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="">
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button type="info" @click="reset()">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      ref="table"
      :max-height="350"
      class="ih-table table-dialog"
      :data="resPageInfo.list"
      @selection-change="handleSelectionChange"
      @select="handleSelect"
      @select-all="handleSelectAll">
      <el-table-column fixed type="selection" width="50" align="center"></el-table-column>
      <el-table-column label="周期名称" prop="termName" min-width="300"></el-table-column>
      <el-table-column label="归属项目" prop="proName" min-width="180"></el-table-column>
      <el-table-column label="业务类型" prop="busTypeEnum" min-width="100">
        <template slot-scope="scope">
          <div>{{$root.dictAllName(scope.row.busTypeEnum, 'BusType')}}</div>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" prop="termStart" min-width="130"></el-table-column>
      <el-table-column label="结束时间" prop="termEnd" min-width="130"></el-table-column>
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
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";

  import {post_term_getDealList} from "@/api/project/index";
  import PaginationMixin from "@/mixins/pagination";

  @Component({
    components: {},
    mixins: [PaginationMixin],
  })
  export default class SelectProjectCycle extends Vue {
    constructor() {
      super();
    }
    private dialogVisible = true;
    private selection = [];
    public queryPageParameters: any = {
      auditEnum: 'ConstractAdopt', // 只显示合同审核通过的
      state: 'Start', // 只显示启用
      termName: null,
      proName: null
    };
    public resPageInfo: any = {
      total: null,
      list: [],
    };
    @Prop({default: null}) data: any;

    created() {
      this.getListMixin();
    }

    async beforeFinish() {
      this.$emit("cancel", false);
    }

    // 取消
    cancel() {
      this.$emit("cancel", false);
    }

    async finish() {
      if (this.selection.length === 0) {
        this.$message({
          type: "warning",
          message: "请选择项目",
        });
        return
      }
      this.$emit("finish", this.selection);
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
      (this.$refs.table as any).clearSelection();
    }

    // 查询
    handleSearch() {
      this.queryPageParameters.pageNum = 1;
      this.getListMixin();
    }

    async getListMixin() {
      this.resPageInfo = await post_term_getDealList(this.queryPageParameters);
    }

    private reset() {
      Object.assign(this.queryPageParameters, {
        auditEnum: 'ConstractAdopt', // 只显示合同审核通过的
        state: 'Start', // 只显示启用
        termName: null,
        proName: null
      });
    }
  }
</script>
<style lang="scss" scoped>
  .search-col {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
</style>
<style lang="scss">
.ih-table.table-dialog {
  .el-table__header {
    .el-checkbox {
      display: none !important;
    }
  }
}
</style>