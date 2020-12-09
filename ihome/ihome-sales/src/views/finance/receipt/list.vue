<!--
 * @Description: 收款列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-09 19:24:59
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-09 20:38:22
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
            <el-form-item label="收款编号">
              <el-input
                v-model="queryPageParameters.companyName"
                placeholder="请输入收款编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款日期">
              <el-input
                v-model="queryPageParameters.companyName"
                placeholder="请输入收款编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态">
              <el-select
                v-model="queryPageParameters.companyName"
                placeholder="请选择状态"
              ></el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-collapse-transition>
          <div v-show="searchOpen">
            <el-row>
              <el-col :span="8">
                <el-form-item label="款项类型">
                  <el-select
                    v-model="queryPageParameters.companyName"
                    placeholder="请选择款项类型"
                  ></el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="支付时间">
                  <el-select
                    v-model="queryPageParameters.companyName"
                    placeholder="请选择款项类型"
                  ></el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="经办人">
                  <el-input
                    v-model="queryPageParameters.companyName"
                    placeholder="请输入经办人"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="联动项目">
                  <el-input
                    v-model="queryPageParameters.companyName"
                    placeholder="请选择联动项目"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="房号">
                  <el-input
                    v-model="queryPageParameters.companyName"
                    placeholder="请选择房号"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="立项周期">
                  <el-input
                    v-model="queryPageParameters.companyName"
                    placeholder="请选择立项周期"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="业主姓名">
                  <el-input
                    v-model="queryPageParameters.companyName"
                    placeholder="请输入业主姓名"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="付款方">
                  <el-select
                    v-model="queryPageParameters.companyName"
                    placeholder="请选择付款方"
                  ></el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="业务编号">
                  <el-input
                    v-model="queryPageParameters.companyName"
                    placeholder="请输入业务编号"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="组织">
                  <el-input
                    v-model="queryPageParameters.companyName"
                    placeholder="请输入业务编号"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="对账时间">
                  <el-input
                    v-model="queryPageParameters.companyName"
                    placeholder="请输入业务编号"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="确认时间">
                  <el-input
                    v-model="queryPageParameters.companyName"
                    placeholder="请输入业务编号"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-collapse-transition>
      </el-form>
    </template>
    <template #btn>
      <el-row>
        <el-button type="primary">查询</el-button>
        <el-button type="info">重置</el-button>
        <el-button>批量解除关联</el-button>
        <el-link
          type="primary"
          class="float-right margin-right-40"
          @click="searchOpen = !searchOpen"
        >{{searchOpen?'收起':'展开'}}</el-link>
      </el-row>
    </template>
    <template #table>
      <br />
      <el-table
        class="ih-table"
        :data="resPageInfo.list"
        :empty-text="emptyText"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          fixed
          type="selection"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column fixed>
          <template #header>
            <div>收款编号</div>
            <div>收款日期</div>
          </template>
        </el-table-column>
        <el-table-column>
          <template #header>
            <div>收款金额</div>
            <div>款项类型</div>
          </template>
        </el-table-column>
        <el-table-column>
          <template #header>
            <div>联动项目</div>
            <div>房号</div>
          </template>
        </el-table-column>
        <el-table-column label="立项周期">
        </el-table-column>
        <el-table-column label="状态">
        </el-table-column>
        <el-table-column label="经办人">
        </el-table-column>
        <el-table-column label="店组">
        </el-table-column>
        <el-table-column>
          <template #header>
            <div>付款方</div>
            <div>业务编号</div>
          </template>
        </el-table-column>
        <el-table-column>
          <template #header>
            <div>凭证号</div>
            <div>支付时间</div>
          </template>
        </el-table-column>
        <el-table-column>
          <template #header>
            <div>对账时间</div>
            <div>确认时间</div>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120"
        >
          <template v-slot="{  }">
            <el-link type="primary">详情</el-link>
            <el-dropdown
              trigger="click"
              class="margin-left-15"
            >
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>对账</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
                <el-dropdown-item>关联成交</el-dropdown-item>
                <el-dropdown-item>解除关联</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template #pagination>
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
export default class ReceiptList extends Vue {
  queryPageParameters: any = {};
  resPageInfo: any = {
    total: null,
    list: [],
  };
  private searchOpen = true;

  handleSelectionChange(val: any) {
    console.log(val);
  }
}
</script>
