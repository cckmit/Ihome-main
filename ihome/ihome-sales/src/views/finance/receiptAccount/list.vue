<!--
 * @Description: 收款账号列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-01 10:37:53
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-01 17:55:29
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
        <el-button type="success">添加</el-button>
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
          <template>
            <el-link
              type="primary"
              class="margin-right-10"
            >修改</el-link>
            <el-link
              type="danger"
              class="margin-right-10"
            >删除</el-link>
            <el-link type="success">维护在线支付信息</el-link>
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
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { post_bankAccount_getList } from "@/api/finance/index";

import PaginationMixin from "../../../mixins/pagination";

@Component({
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
