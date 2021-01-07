<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-03 15:28:12
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-23 20:18:09
-->
<template>
  <el-dialog
    v-dialogDrag
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="beforeFinish"
    append-to-body
    width="80%"
    style="text-align: left"
    class="dialog">
    <el-table
      ref="table"
      :max-height="350"
      class="ih-table table-dialog"
      :data="resPageInfo.list"
      @selection-change="handleSelectionChange"
      @select="handleSelect"
      @select-all="handleSelectAll">
      <el-table-column fixed type="selection" width="50" align="center"></el-table-column>
      <el-table-column label="类型" prop="typeName" min-width="100"></el-table-column>
      <el-table-column label="合同类型" prop="contractEnum" min-width="100">
        <template slot-scope="scope">
          <div>{{$root.dictAllName(scope.row.contractEnum, 'ContType')}}</div>
        </template>
      </el-table-column>
      <el-table-column label="客户类型" prop="transactionEnum" min-width="100">
        <template slot-scope="scope">
          <div>{{$root.dictAllName(scope.row.transactionEnum, 'Transaction')}}</div>
        </template>
      </el-table-column>
      <el-table-column label="条件" prop="condition" min-width="200"></el-table-column>
      <el-table-column label="应收金额" prop="receivableAmout" min-width="100">
        <template slot-scope="scope">
          <div>金额：{{scope.row.receivableAmout}}</div>
          <div>点数：{{scope.row.receivablePoint}}</div>
        </template>
      </el-table-column>
      <el-table-column label="派发佣金" prop="sendAmount" min-width="100">
        <template slot-scope="scope">
          <div>金额：{{scope.row.sendAmount}}</div>
          <div>点数：{{scope.row.sendPoint}}</div>
        </template>
      </el-table-column>
      <el-table-column label="派发内场奖励" prop="sendInAmount" min-width="150">
        <template slot-scope="scope">
          <div>金额：{{scope.row.sendInAmount}}</div>
          <div>点数：{{scope.row.sendInPoint}}</div>
        </template>
      </el-table-column>
      <el-table-column label="总包业绩" prop="generalAchieveAmount" min-width="100">
        <template slot-scope="scope">
          <div>金额：{{scope.row.generalAchieveAmount}}</div>
          <div>点数：{{scope.row.generalAchievePoint}}</div>
        </template>
      </el-table-column>
      <el-table-column label="分销业绩" prop="distributeAchieveAmount" min-width="100">
        <template slot-scope="scope">
          <div>金额：{{scope.row.distributeAchieveAmount}}</div>
          <div>点数：{{scope.row.distributeAchievePoint}}</div>
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
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";
  import PaginationMixin from "@/mixins/pagination";
  import {
    // post_collectandsend_getCollectadnsendMxByIds,
    post_term_getCollectPackageByDeal
  } from "@/api/project"; // 根据可选IDS获取收派套餐
  import {
    post_pageData_initSelectablePackage
  } from "@/api/deal"; // 获取收派套餐

  @Component({
    mixins: [PaginationMixin]
  })
  export default class SelectReceivePackage extends Vue {
    constructor() {
      super();
    }
    private dialogVisible = true;
    private selection = [];
    public queryPageParameters: any = {};
    public resPageInfo: any = {
      total: null,
      list: [],
    };
    @Prop({default: null}) data: any;
    dialogTitle: any = null; // 弹窗标题

    async created() {
      console.log('data', this.data);
      // 判断套餐类型
      this.dialogTitle = `选择${(this as any).$root.dictAllName(this.data.feeType, 'FeeType')}收派套餐标准`;
      await this.getListMixin();
      // if (this.data.hasRecord) {
      //   // 分销模式
      //   this.queryPageParameters.packageMxIds = this.data.idList;
      //   await this.getListMixin();
      // } else {
      //   // 非分销模式
      //   await this.getPackageIds(this.data.postObj);
      // }
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

    async getPackageIds(postData: any = {}) {
      const list: any = await post_term_getCollectPackageByDeal(postData);
      // console.log(list);
      let idsList: any = [];
      if (list && list.length) {
        list.forEach((item: any) => {
          idsList.push(item.packageMxId);
        })
      }
      this.queryPageParameters.packageMxIds = idsList;
      await this.getListMixin();
    }

    async getListMixin() {
      let self = this;
      self.queryPageParameters = {
        ...self.queryPageParameters,
        ...self.data
      }
      let infoList: any = await post_pageData_initSelectablePackage(self.queryPageParameters);
      if (infoList && infoList.list && infoList.list.length) {
        infoList.list.forEach((item: any) => {
          // 类型
          item.typeName = (self as any).$root.dictAllName(self.data.feeType, 'FeeType');
        })
      }
      self.resPageInfo = infoList;
    }

    async finish() {
      if (this.selection.length) {
        this.$emit("finish", this.selection);
      } else {
        this.$message.warning("请先勾选表格数据");
      }
    }

    // 取消之前
    async beforeFinish() {
      this.$emit("cancel", false);
    }

    // 取消
    cancel() {
      this.$emit("cancel", false);
    }
  }
</script>
<style lang="scss" scoped>
  .title {
    width: 100%;
    height: 30px;
    line-height: 30px;
    color: #f90;
    box-sizing: border-box;
    margin-bottom: 10px;
  }

  .dialog {
    /deep/.el-dialog__body {
      padding: 10px 20px 20px 20px;
    }
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