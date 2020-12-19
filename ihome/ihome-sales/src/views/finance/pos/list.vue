<!--
 * @Description: POS机管理
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-01 10:39:24
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-19 17:22:51
-->
<template>
  <IhPage label-width="90px">
    <template v-slot:form>
      <el-form
        ref="form"
        label-width="90px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="序列号">
              <el-input
                v-model="queryPageParameters.serialNo"
                placeholder="请输入序列号"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="账户名称">
              <el-input
                v-model="queryPageParameters.accountName"
                placeholder="请输入账户名称"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态">
              <el-select
                v-model="queryPageParameters.status"
                placeholder="请选择账户名称"
                clearable
                class="width--100"
              >
                <el-option
                  v-for="(i, n) in $root.dictAllList('PosTerminalStatus')"
                  :key="n"
                  :label="i.name"
                  :value="i.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-collapse-transition>
          <div v-show="searchOpen">
            <el-row>
              <el-col :span="8">
                <el-form-item label="商户号">
                  <el-input
                    v-model="queryPageParameters.merchantNo"
                    placeholder="请输入商户号"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="终端号">
                  <el-input
                    v-model="queryPageParameters.terminalNo"
                    placeholder="请输入终端号"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联动项目">
                  <el-input
                    v-model="queryPageParameters.proId"
                    placeholder="请选择联动项目"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="所在事业部">
                  <el-input
                    v-model="queryPageParameters.departmentId"
                    placeholder="请选择所在事业部"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所在店组">
                  <el-input
                    v-model="queryPageParameters.groupId"
                    placeholder="请选择所在店组"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="当前保管人">
                  <el-input
                    v-model="queryPageParameters.holder"
                    placeholder="请输入当前保管人"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-collapse-transition>
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
        <el-link
          type="primary"
          class="float-right margin-right-40"
          @click="searchOpen = !searchOpen"
        >{{searchOpen?'收起':'展开'}}</el-link>
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
          prop="accountName"
          label="账户名称"
          min-width="250"
        ></el-table-column>
        <el-table-column
          prop="accountNo"
          label="账号"
          min-width="165"
        ></el-table-column>
        <el-table-column
          prop="productModel"
          label="产品型号"
          min-width="155"
        ></el-table-column>
        <el-table-column
          prop="serialNo"
          label="序列号"
          width="160"
        ></el-table-column>
        <el-table-column
          prop="holderName"
          label="当前保管人"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="120"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.status, 'PosTerminalStatus')}}
          </template>
        </el-table-column>
        <el-table-column
          prop="departmentName"
          label="所在事业部"
          min-width="165"
        ></el-table-column>
        <el-table-column
          prop="groupName"
          label="所在店组"
        ></el-table-column>
        <el-table-column
          prop="proName"
          label="联动项目"
        ></el-table-column>
        <el-table-column
          label="操作"
          width="115"
          fixed="right"
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              @click.native.prevent="$router.push(`/pos/info?id=${row.id}`)"
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
    <IhDialog :show="dialogVisible">
      <AddPos
        :isAdd="isAdd"
        @cancel="() => (dialogVisible = false)"
        @finish="() => {
          queryPageParameters.pageNum = 1;
          getListMixin();
        }"
      />
    </IhDialog>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PaginationMixin from "../../../mixins/pagination";
import { post_posTerminal_getList } from "../../../api/finance/index";
import AddPos from "./dialog/addPos.vue";

@Component({
  components: { AddPos },
  mixins: [PaginationMixin],
})
export default class POSList extends Vue {
  queryPageParameters: any = {
    accountName: null,
    departmentId: null,
    groupId: null,
    holder: null,
    merchantNo: null,
    proId: null,
    serialNo: null,
    status: null,
    terminalNo: null,
  };
  resPageInfo: any = {
    total: null,
    list: [],
  };
  private searchOpen = true;
  private dialogVisible = false;
  private isAdd = true;

  private handleAdd() {
    this.isAdd = true;
    this.dialogVisible = true;
  }
  private search() {
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
  private reset() {
    Object.assign(this.queryPageParameters, {
      accountName: null,
      departmentId: null,
      groupId: null,
      holder: null,
      merchantNo: null,
      proId: null,
      serialNo: null,
      status: null,
      terminalNo: null,
    });
  }
  async getListMixin() {
    this.resPageInfo = await post_posTerminal_getList(this.queryPageParameters);
  }

  created() {
    this.getListMixin();
  }
}
</script>
