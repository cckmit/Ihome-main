<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-03 15:28:12
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-23 18:10:20
-->
<template>
  <el-dialog
    v-dialogDrag
    title="选择客户列表"
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
          <el-form-item label="客户姓名">
            <el-input
              v-model="queryPageParameters.custName"
              placeholder="客户姓名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户类型">
            <el-input
              v-model="queryPageParameters.custType"
              placeholder="客户类型"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户编号">
            <el-input
              v-model="queryPageParameters.custCode"
              placeholder="客户编号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码">
            <el-input
              v-model="queryPageParameters.custTel"
              placeholder="手机号码"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="">
            <el-button type="primary" @click="getListMixin()">查询</el-button>
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
      <el-table-column label="客户编号" prop="custCode" min-width="250"></el-table-column>
      <el-table-column label="客户姓名" prop="custName" min-width="110"></el-table-column>
      <el-table-column label="客户类型" prop="custType" min-width="110">
        <template slot-scope="scope">
          <div>{{$root.dictAllName(scope.row.custType, 'CustType')}}</div>
        </template>
      </el-table-column>
      <el-table-column label="手机号码" prop="custTel" min-width="160"></el-table-column>
      <el-table-column label="证件类型" prop="cardType" min-width="120">
        <template slot-scope="scope">
          <div>{{$root.dictAllName(scope.row.cardType, 'CardType')}}</div>
        </template>
      </el-table-column>
      <el-table-column label="证件号码" prop="certificateNumber" min-width="180"></el-table-column>
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

  import {post_customer_getCustList} from "@/api/customer";
  import PaginationMixin from "@/mixins/pagination";

  @Component({
    components: {},
    mixins: [PaginationMixin],
  })
  export default class AddCustomer extends Vue {
    constructor() {
      super();
    }
    private dialogVisible = true;
    private selection = [];
    public queryPageParameters: any = {
      custName: null,
      custType: null,
      custCode: null,
      custTel: null
    };
    public resPageInfo: any = {
      total: null,
      list: [],
    };
    @Prop({default: null}) data: any;

    created() {
      this.getListMixin();
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
          type: "error",
          message: "请选择客户",
        });
        return
      }
      this.$emit("finish", this.selection);
    }

    async getListMixin() {
      this.resPageInfo = await post_customer_getCustList(this.queryPageParameters);
    }

    private reset() {
      Object.assign(this.queryPageParameters, {
        custName: null,
        custType: null,
        custCode: null,
        custTel: null,
      });
    }
  }
</script>
<style lang="scss" scoped>
</style>