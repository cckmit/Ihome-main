<!--
 * @Description: POS机管理
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-01 10:39:24
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-20 16:26:21
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
                placeholder="请选择状态"
                clearable
                class="width--100"
              >
                <el-option
                  v-for="(i, n) in posStatusList"
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
                  <IhSelectPageByProject
                    v-model="queryPageParameters.proId"
                    placeholder="请选择联动项目"
                    clearable
                  ></IhSelectPageByProject>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="所在事业部">
                  <IhSelectPageDivision
                    v-model="queryPageParameters.departmentId"
                    placeholder="请选择所在事业部"
                    clearable
                  ></IhSelectPageDivision>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所在店组">
                  <IhSelectPageOrg
                    v-model="queryPageParameters.groupId"
                    placeholder="请选择所在店组"
                    clearable
                  ></IhSelectPageOrg>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="当前保管人">
                  <IhSelectPageUser
                    v-model="queryPageParameters.holder"
                    clearable
                  ></IhSelectPageUser>
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
          v-has="'B.SALES.FINANCE.POSLIST.ADD'"
        >入库</el-button>
        <el-button
          type="success"
          @click="importVisble = true"
          v-has="'B.SALES.FINANCE.POSLIST.IMPORTADD'"
        >入库导入</el-button>
        <el-button
          @click="revoke()"
          v-has="'B.SALES.FINANCE.POSLIST.BACKOUT'"
        >撤机</el-button>
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="50"
          align="center"
          fixed
        ></el-table-column>
        <el-table-column
          fixed
          prop="accountName"
          label="账户名称"
          min-width="270"
        ></el-table-column>
        <el-table-column
          prop="accountNo"
          label="账号"
          min-width="195"
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
          min-width="215"
        ></el-table-column>
        <el-table-column
          prop="groupName"
          label="所在店组"
          min-width="180"
        ></el-table-column>
        <el-table-column
          prop="proName"
          label="联动项目"
          min-width="180"
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
                <el-dropdown-item
                  :class="{'is-disabled': row.status !== 'Stop'}"
                  @click.native.prevent="remove(row)"
                  v-has="'B.SALES.FINANCE.POSLIST.REMOVE'"
                >删除</el-dropdown-item>
                <el-dropdown-item
                  :class="{'is-disabled': row.status !== 'CentralStock' && row.status !== 'BranchStock'}"
                  @click.native.prevent="handleEdit(row)"
                  v-has="'B.SALES.FINANCE.POSLIST.EDIT'"
                >修改</el-dropdown-item>
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
        :data="rowData"
        @cancel="() => (dialogVisible = false)"
        @finish="() => {
          dialogVisible = false;
          queryPageParameters.pageNum = 1;
          getListMixin();
        }"
      />
    </IhDialog>
    <IhDialog :show="importVisble">
      <ImportPos
        @cancel="() => (importVisble = false)"
        @finish="() => {
          importVisble = false;
          getListMixin();
        }"
      />
    </IhDialog>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PaginationMixin from "../../../mixins/pagination";
import AddPos from "./dialog/addPos.vue";
import ImportPos from "./dialog/importPos.vue";
import {
  post_posTerminal_getList,
  post_posTerminal_delete__id,
  post_posTerminal_revoke,
} from "../../../api/finance/index";

@Component({
  components: { AddPos, ImportPos },
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
  rowData: any = null;
  private selection: any = [];
  private searchOpen = true;
  private dialogVisible = false;
  private importVisble = false;
  private isAdd = true;

  private get posStatusList() {
    const list = (this.$root as any).dictAllList("PosTerminalStatus");
    return list.filter((i: any) => i.tag.includes("PosTerminal"));
  }

  private async revoke() {
    if (this.selection.length) {
      if (
        this.selection
          .map((i: any) => i.status)
          .every((v: any) => v === "CentralStock")
      ) {
        try {
          await this.$confirm(
            `确认对${this.selection.length}条POS机数据进行撤机操作`,
            "提示"
          );
          const res = await post_posTerminal_revoke(
            this.selection.map((i: any) => i.id)
          );
          this.$message.success(`成功撤机${res}条数据`);
          this.getListMixin();
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$message.warning("请选择状态为总部库存的数据");
      }
    } else {
      this.$message.warning("请先勾选表格数据");
      return;
    }
  }
  private handleSelectionChange(val: any) {
    this.selection = val;
  }
  private async remove(row: any) {
    try {
      await this.$confirm("确认删除该POS机信息吗?", "提示");
      await post_posTerminal_delete__id({ id: row.id });
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
  private handleEdit(row: any) {
    this.rowData = { ...row };
    this.isAdd = false;
    this.dialogVisible = true;
  }
  private handleAdd() {
    this.rowData = null;
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
