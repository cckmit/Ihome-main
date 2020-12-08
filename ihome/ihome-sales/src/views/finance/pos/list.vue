<!--
 * @Description: POS机管理
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-01 10:39:24
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-08 14:58:52
-->
<template>
  <IhPage>
    <template v-slot:form>
      <el-form
        ref="form"
        label-width="80px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="序列号">
              <el-input
                v-model="queryPageParameters.branchName"
                placeholder="序列号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="账户名称">
              <el-input
                v-model="queryPageParameters.branchName"
                placeholder="账户名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态">
              <el-select
                v-model="queryPageParameters.branchName"
                placeholder="账户名称"
              ></el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template v-slot:btn>
      <el-row>
        <el-button type="primary">查询</el-button>
        <el-button type="info">重置</el-button>
        <el-button type="success">添加</el-button>
      </el-row>
    </template>
    <template v-slot:table>
      <br />
      <el-table
        class="ih-table"
        :empty-text="emptyText"
        :data="resPageInfo.list"
      >
        <el-table-column
          fixed
          prop="branchName"
          label="账户名称"
          min-width="200"
        ></el-table-column>
        <el-table-column
          prop="bankName"
          label="账号"
        ></el-table-column>
        <el-table-column
          prop="bankName"
          label="产品型号"
        ></el-table-column>
        <el-table-column
          prop="bankName"
          label="序列号"
        ></el-table-column>
        <el-table-column
          prop="bankName"
          label="当前保管人"
        ></el-table-column>
        <el-table-column
          prop="bankName"
          label="状态"
        ></el-table-column>
        <el-table-column
          prop="bankName"
          label="所在事业部"
        ></el-table-column>
        <el-table-column
          prop="bankName"
          label="所在店组"
        ></el-table-column>
        <el-table-column
          prop="bankName"
          label="所在项目"
        ></el-table-column>
        <el-table-column
          prop="bankName"
          label="经办日期"
        ></el-table-column>
        <el-table-column
          label="操作"
          width="215"
          fixed="right"
        >
          <template v-slot="{  }">
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
import PaginationMixin from "../../../mixins/pagination";

@Component({
  mixins: [PaginationMixin],
})
export default class POSList extends Vue {
  queryPageParameters: any = {};
  resPageInfo: any = {
    total: null,
    list: [],
  };
}
</script>
