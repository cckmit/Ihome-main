<!--
 * @Description:
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-03 15:28:12
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-26 17:03:26
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
              clearable
              v-model="queryPageParameters.custName"
              placeholder="客户姓名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码">
            <el-input
              clearable
              v-model="queryPageParameters.custTel"
              placeholder="手机号码"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户类型">
            <el-select
              clearable
              v-model="queryPageParameters.custType"
              placeholder="客户类型"
              class="width--100">
              <el-option
                v-for="item in $root.dictAllList('CustType')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="queryPageParameters.timeList"
              type="daterange"
              align="left"
              unlink-panels
              range-separator="到"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户来源">
            <el-select
              clearable
              v-model="queryPageParameters.custOrg"
              placeholder="客户来源"
              class="width--100">
              <el-option
                v-for="item in $root.dictAllList('CustOrg')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="">
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button type="success" @click="add">添加</el-button>
            <el-button type="default" @click="handleSearch">刷新</el-button>
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
      <el-table-column label="客户姓名" prop="custName" min-width="120"></el-table-column>
      <el-table-column label="手机号码" prop="custTel" min-width="180"></el-table-column>
      <el-table-column label="客户来源" prop="custOrg" min-width="130">
        <template slot-scope="scope">
          <div>{{$root.dictAllName(scope.row.custOrg, 'CustomerOrg')}}</div>
        </template>
      </el-table-column>
      <el-table-column label="客户类型" prop="custType" min-width="100">
        <template slot-scope="scope">
          <div>{{$root.dictAllName(scope.row.custType, 'CustType')}}</div>
        </template>
      </el-table-column>
      <el-table-column label="证件类型" prop="cardType" min-width="120">
        <template slot-scope="scope">
          <div>{{$root.dictAllName(scope.row.cardType, 'CardType')}}</div>
        </template>
      </el-table-column>
      <el-table-column label="证件编号" prop="" min-width="250">
        <template slot-scope="scope">
          <div>{{scope.row.certificateNumber ? scope.row.certificateNumber : '—'}}</div>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" prop="email" min-width="150">
        <template slot-scope="scope">
          <div>{{scope.row.email ? scope.row.email : '—'}}</div>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" min-width="180"></el-table-column>
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
    <ih-dialog :show="dialogEnter" desc="添加客户">
      <EnterCustomer
        @cancel="() => (dialogEnter = false)"
        @finish="finishAddCustomer"/>
    </ih-dialog>
  </el-dialog>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";
  import EnterCustomer from "@/views/deal/dealReport/dialog/enterCustomer.vue";

  import {post_customer_getCustList} from "@/api/customer";
  import PaginationMixin from "@/mixins/pagination";

  @Component({
    components: {EnterCustomer},
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
      custTel: null,
      custType: null,
      timeList: [],
      custOrg: null
    };
    public resPageInfo: any = {
      total: null,
      list: [],
    };
    @Prop({default: null}) data: any;
    dialogEnter: any = false; // 添加客户

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
          type: "warning",
          message: "请选择客户",
        });
        return
      }
      this.$emit("finish", this.selection);
    }

    // 确定选择客户
    async finishAddCustomer() {
      this.dialogEnter = false;
      await this.handleSearch();
    }

    // 查询
    async handleSearch() {
      this.queryPageParameters.pageNum = 1;
      await this.getListMixin();
    }

    async getListMixin() {
      let postData: any = {
        createTimeRealMax: null,
        createTimeRealMin: null,
        custName: this.queryPageParameters.custName,
        custTel: this.queryPageParameters.custTel,
        custType: this.queryPageParameters.custType,
        custOrg: this.queryPageParameters.custOrg,
        pageNum: this.queryPageParameters.pageNum,
        pageSize: this.queryPageParameters.pageSize
      }
      if (this.queryPageParameters.timeList && this.queryPageParameters.timeList.length) {
        postData.createTimeRealMax = this.queryPageParameters.timeList[1];
        postData.createTimeRealMin = this.queryPageParameters.timeList[0];
      }
      this.resPageInfo = await post_customer_getCustList(postData);
    }

    // 添加
    add() {
      this.dialogEnter = !this.dialogEnter;
    }

    private reset() {
      Object.assign(this.queryPageParameters, {
        custName: null,
        custTel: null,
        custType: null,
        timeList: [],
        custOrg: null
      });
    }
  }
</script>
<style lang="scss" scoped>
</style>