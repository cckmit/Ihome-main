<!--
 * @Description: 收款账号列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-01 10:37:53
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-02 14:46:20
-->
<template>
  <IhPage label-width="80px">
    <template v-slot:form>
      <el-form
        ref="form"
        label-width="80px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="账户名称">
              <el-input
                v-model="queryPageParameters.accountName"
                placeholder="账户名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="账号">
              <el-input
                v-model="queryPageParameters.accountNo"
                placeholder="账号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="账号类型">
              <el-select
                v-model="queryPageParameters.accountType"
                class="width--100"
                placeholder="请选择账号类型"
              ></el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template v-slot:btn>
      <el-row>
        <el-button
          type="primary"
          @click="search()"
        >查询</el-button>
        <el-button
          type="info"
          @click="reset()"
        >重置</el-button>
        <el-button
          type="success"
          @click="handleAdd()"
        >添加</el-button>
      </el-row>
    </template>
    <template v-slot:table>
      <br />
      <el-table
        class="ih-table"
        :data="resPageInfo.list"
      >
        <el-table-column
          fixed
          prop="accountName"
          label="账户名称"
          min-width="255"
        ></el-table-column>
        <el-table-column
          prop="accountNo"
          width="155"
          label="账号"
        ></el-table-column>
        <el-table-column
          prop="branchName"
          label="开户银行"
          min-width="345"
        ></el-table-column>
        <el-table-column
          prop="branchNo"
          label="联行号"
          width="155"
        ></el-table-column>
        <el-table-column
          prop="accountType"
          label="账号类型"
        ></el-table-column>
        <el-table-column
          label="操作"
          width="215"
          fixed="right"
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              class="margin-right-10"
              @click="handleEdit(row)"
            >修改</el-link>
            <el-link
              type="danger"
              class="margin-right-10"
              @click="remove(row)"
            >删除</el-link>
            <el-link
              type="success"
              @click="handleShowPay(row)"
            >维护在线支付信息</el-link>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template v-slot:pagination>
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
    </template>
    <!-- 弹窗 -->
    <IhDialog
      :show="dialogVisible"
      desc="收款账号"
    >
      <AddEdit
        :isAdd="isAdd"
        :data="tableData"
        @finish="handleFinish"
        @cancel="() => (dialogVisible = false)"
      />
    </IhDialog>
    <IhDialog
      :show="payVisble"
      desc="在线支付信息维护"
    >
      <PayInfo
        :data="tableData"
        @finish="() => (payVisble = false)"
        @cancel="() => (payVisble = false)"
      />
    </IhDialog>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AddEdit from "./dialog/addEdit.vue";
import PayInfo from "./dialog/payInfo.vue";
import {
  post_bankAccount_getList,
  post_bankAccount_delete__id,
} from "@/api/finance/index";

import PaginationMixin from "../../../mixins/pagination";

@Component({
  components: { AddEdit, PayInfo },
  mixins: [PaginationMixin],
})
export default class BankBranchList extends Vue {
  queryPageParameters: any = {
    accountName: null,
    accountNo: null,
    accountType: null,
  };
  resPageInfo: any = {
    total: null,
    list: [],
  };
  dialogVisible = false;
  payVisble = false;
  isAdd = true;
  tableData: any = {};

  private handleFinish(isAdd: boolean) {
    if (isAdd) this.queryPageParameters.pageNum = 1;
    this.dialogVisible = false;
    this.getListMixin();
  }
  private handleAdd() {
    this.isAdd = true;
    this.dialogVisible = true;
  }
  private handleEdit(row: any) {
    this.isAdd = false;
    this.tableData = { ...row };
    this.dialogVisible = true;
  }
  private handleShowPay(row: any) {
    this.tableData = { ...row };
    this.payVisble = true;
  }
  private async remove(row: any) {
    try {
      await this.$confirm("是否确定删除?", "提示");
      console.log(row);

      await post_bankAccount_delete__id({ id: row.id });
      // 删除list最后一条数据 返回前一页面
      if (this.resPageInfo.list.length === 1) {
        this.queryPageParameters.pageNum === 1
          ? (this.queryPageParameters.pageNum = 1)
          : this.queryPageParameters.pageNum--;
      }
      this.getListMixin();
      this.$message.success("删除成功");
    } catch (error) {
      console.log(error);
    }
  }
  private search() {
    if (
      this.queryPageParameters.accountName &&
      this.queryPageParameters.accountName.length < 2
    ) {
      this.$message.warning("账号名称至少输入2个字符");
      return;
    }
    if (
      this.queryPageParameters.accountNo &&
      this.queryPageParameters.accountNo.length < 2
    ) {
      this.$message.warning("账号至少输入2个字符");
      return;
    }
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
  private reset() {
    Object.assign(this.queryPageParameters, {
      accountName: null,
      accountNo: null,
      accountType: null,
    });
  }
  async getListMixin() {
    this.resPageInfo = await post_bankAccount_getList(this.queryPageParameters);
  }

  created() {
    this.getListMixin();
  }
}
</script>
