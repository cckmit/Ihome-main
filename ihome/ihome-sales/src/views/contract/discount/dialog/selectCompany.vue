<!--
 * @Description: 选择公司
 * @version: 
 * @Author: ywl
 * @Date: 2021-03-03 21:06:29
 * @LastEditors: ywl
 * @LastEditTime: 2021-03-06 11:07:52
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    append-to-body
    width="85%"
    title="客户列表"
    top="5vh"
  >
    <el-form label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="客户姓名">
            <el-input
              v-model="queryPageParameters.custName"
              placeholder="请输入客户姓名"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户号码">
            <el-input
              v-model="queryPageParameters.custTel"
              placeholder="请输入客户号码"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户类型">
            <el-select
              disabled
              v-model="queryPageParameters.custType"
              placeholder="客户类型"
              class="width--100"
            >
              <el-option
                v-for="item in $root.dictAllList('CustType')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="timeList"
              type="daterange"
              align="left"
              unlink-panels
              range-separator="到"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户来源">
            <el-select
              clearable
              v-model="queryPageParameters.custOrg"
              placeholder="客户来源"
              class="width--100"
            >
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
    </el-form>
    <div style="padding-left: 100px;">
      <el-button
        type="default"
        @click="update"
      >刷新</el-button>
      <el-button
        type="success"
        @click="handleGoto"
      >添加</el-button>
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
      ref="table"
      :max-height="350"
      class="ih-table table-dialog"
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
        label="客户姓名"
        prop="custName"
        min-width="120"
      ></el-table-column>
      <el-table-column
        label="手机号码"
        prop="custTel"
        min-width="180"
      ></el-table-column>
      <el-table-column
        label="客户来源"
        prop="custOrg"
        min-width="130"
      >
        <template slot-scope="scope">
          <div>{{$root.dictAllName(scope.row.custOrg, 'CustomerOrg')}}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="客户类型"
        prop="custType"
        min-width="100"
      >
        <template slot-scope="scope">
          <div>{{$root.dictAllName(scope.row.custType, 'CustType')}}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="证件类型"
        prop="cardType"
        min-width="120"
      >
        <template slot-scope="scope">
          <div>{{$root.dictAllName(scope.row.cardType, 'CardType')}}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="证件编号"
        prop=""
        min-width="250"
      >
        <template slot-scope="scope">
          <div>{{scope.row.certificateNumber ? scope.row.certificateNumber : '—'}}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="邮箱"
        prop="email"
        min-width="150"
      >
        <template slot-scope="scope">
          <div>{{scope.row.email ? scope.row.email : '—'}}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="createTime"
        min-width="180"
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
import { post_customer_getCustList } from "@/api/customer";
import PaginationMixin from "@/mixins/pagination";

@Component({
  mixins: [PaginationMixin],
})
export default class SelectCompany extends Vue {
  queryPageParameters: any = {
    createTimeRealMax: null,
    createTimeRealMin: null,
    custCode: null,
    custInfo: null,
    custName: null,
    custOrg: null,
    custTel: null,
    custType: "Company",
  };
  resPageInfo: any = {
    total: null,
    list: [],
  };
  selection = [];
  private timeList: any[] = [];
  private dialogVisible = true;

  // 取消
  cancel() {
    this.$emit("cancel", false);
  }
  private search() {
    let flag = this.timeList && this.timeList.length;
    this.queryPageParameters.createTimeRealMin = flag ? this.timeList[0] : null;
    this.queryPageParameters.createTimeRealMax = flag ? this.timeList[1] : null;
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
  private reset() {
    Object.assign(this.queryPageParameters, {
      createTimeRealMax: null,
      createTimeRealMin: null,
      custCode: null,
      custInfo: null,
      custName: null,
      custOrg: null,
      custTel: null,
    });
    this.timeList = [];
  }
  private update() {
    this.reset();
    this.search();
  }
  private handleGoto() {
    let router = this.$router.resolve({
      path: "/customer/list",
    });
    window.open(router.href, "_blank");
  }
  async finish() {
    if (this.selection.length === 0) {
      this.$message({
        type: "warning",
        message: "请先勾选表格数据",
      });
      return;
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
  async getListMixin() {
    this.resPageInfo = await post_customer_getCustList(
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
</style>
