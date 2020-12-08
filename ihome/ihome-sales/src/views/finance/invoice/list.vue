<!--
 * @Description: 开票列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-08 17:45:05
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-08 19:59:07
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
            <el-form-item label="业务单号">
              <el-input
                v-model="queryPageParameters.companyName"
                placeholder="请输入业务单号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发票抬头">
              <el-input
                v-model="queryPageParameters.companyName"
                placeholder="请输入发票抬头"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="费用类型">
              <el-select
                v-model="queryPageParameters.companyName"
                class="width--100"
                placeholder="请选择费用类型"
              ></el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="开票状态">
              <el-select
                v-model="queryPageParameters.companyName"
                class="width--100"
                placeholder="请选择开票状态"
              ></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开票日期">
              <el-select
                v-model="queryPageParameters.companyName"
                class="width--100"
              ></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开票类型">
              <el-select
                v-model="queryPageParameters.companyName"
                class="width--100"
                placeholder="请选择开票类型"
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
        <el-button>批量自动开票</el-button>
        <el-button>批量自动红冲</el-button>
        <el-button>批量手工红冲</el-button>
        <el-button>批量下载发票</el-button>
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
          type="selection"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column
          fixed
          prop="companyName"
          label="业务单号"
          min-width="255"
        ></el-table-column>
        <el-table-column
          prop="companyName"
          label="发票抬头"
        ></el-table-column>
        <el-table-column
          prop="companyName"
          label="费用类型"
        ></el-table-column>
        <el-table-column
          prop="companyName"
          label="金额（含税）"
        ></el-table-column>
        <el-table-column
          prop="companyName"
          label="税额"
        ></el-table-column>
        <el-table-column
          prop="companyName"
          label="收款方"
        ></el-table-column>
        <el-table-column
          prop="companyName"
          label="收款方账号"
        ></el-table-column>
        <el-table-column
          prop="companyName"
          label="状态"
        ></el-table-column>
        <el-table-column
          prop="companyName"
          label="开票类型"
        ></el-table-column>
        <el-table-column
          prop="companyName"
          label="开票日期"
        ></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120"
        >
          <template v-slot="{  }">
            <el-link
              type="primary"
              @click="$router.push('/invoice/info')"
            >详情</el-link>
            <el-dropdown
              trigger="click"
              class="margin-left-15"
            >
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>自动开票</el-dropdown-item>
                <el-dropdown-item>手动开票</el-dropdown-item>
                <el-dropdown-item>下载发票</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
export default class InvoiceList extends Vue {
  queryPageParameters: any = {};
}
</script>
