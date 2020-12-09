<!--
 * @Description: 发票税率维护
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-01 10:38:45
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-09 10:24:58
-->
<template>
  <IhPage label-width="100px">
    <template v-slot:form>
      <el-form
        ref="form"
        label-width="100px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="名称">
              <el-input
                v-model="queryPageParameters.companyName"
                placeholder="名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="纳税人识别号">
              <el-input
                v-model="queryPageParameters.taxpayerNo"
                placeholder="纳税人识别号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="纳税人规模">
              <el-select
                v-model="queryPageParameters.taxScale"
                placeholder="请选择纳税人规模"
                class="width--100"
              >
                <el-option
                  v-for="i in $root.dictAllList('TaxScale')"
                  :key="i.code"
                  :value="i.code"
                  :label="i.name"
                ></el-option>
              </el-select>
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
        :empty-text="emptyText"
        :data="resPageInfo.list"
      >
        <el-table-column
          fixed
          prop="companyName"
          label="名称"
          min-width="255"
        ></el-table-column>
        <el-table-column
          prop="taxpayerNo"
          label="纳税人识别号"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          min-width="455"
        ></el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          width="145"
        ></el-table-column>
        <el-table-column
          prop="taxScale"
          label="纳税人规模"
          width="135"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.taxScale, 'TaxScale')}}
          </template>
        </el-table-column>
        <el-table-column
          prop="taxRate"
          label="税率"
        ></el-table-column>
        <el-table-column
          label="操作"
          width="135"
          fixed="right"
        >
          <template v-slot="{ row }">
            <el-link
              type="success"
              class="margin-right-10"
              @click="handleTo(row)"
            >详情</el-link>
            <el-link
              type="primary"
              class="margin-right-10"
              @click="handleEdit(row)"
            >修改</el-link>
            <el-link
              type="danger"
              @click="remove(row)"
            >删除</el-link>
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
    <IhDialog :show="dialogVisible">
      <Add
        :isAdd="isAdd"
        :data="tableData"
        @finish="handleFinish"
        @cancel="() => (dialogVisible = false)"
      />
    </IhDialog>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PaginationMixin from "../../../mixins/pagination";
import {
  post_invoiceConfig_getList,
  post_invoiceConfig_delete__id,
} from "@/api/finance/index";
import Add from "./dialog/add.vue";

@Component({
  components: { Add },
  mixins: [PaginationMixin],
})
export default class InvoiceTaxList extends Vue {
  queryPageParameters: any = {
    companyName: null,
    taxScale: null,
    taxpayerNo: null,
  };
  resPageInfo: any = {
    total: null,
    list: [],
  };
  dialogVisible = false;
  isAdd = true;
  tableData: any = {};

  private handleFinish(isAdd: boolean) {
    if (isAdd) this.queryPageParameters.pageNum = 1;
    this.dialogVisible = false;
    this.getListMixin();
  }
  private async remove(row: any) {
    try {
      await this.$confirm("是否确定删除?", "提示");
      await post_invoiceConfig_delete__id({ id: row.id });
      // 删除list最后一条数据 返回前一页面
      if (this.resPageInfo.list.length === 1) {
        this.queryPageParameters.pageNum === 1
          ? (this.queryPageParameters.pageNum = 1)
          : this.queryPageParameters.pageNum--;
      }
      this.getListMixin();
      this.$message.success("删除成功");
    } catch (err) {
      console.log(err);
    }
  }
  private handleTo(row: any) {
    this.$router.push({
      path: "/invoiceTax/info",
      query: {
        id: row.id,
      },
    });
  }
  private handleAdd() {
    this.isAdd = true;
    this.dialogVisible = true;
  }
  private handleEdit(row: any) {
    this.isAdd = false;
    this.dialogVisible = true;
    this.tableData = { ...row };
  }
  private search() {
    if (
      this.queryPageParameters.companyName &&
      this.queryPageParameters.companyName.length < 2
    ) {
      this.$message.warning("名称至少输入2个字符");
      return;
    }
    if (
      this.queryPageParameters.taxpayerNo &&
      this.queryPageParameters.taxpayerNo.length < 2
    ) {
      this.$message.warning("纳税人识别号至少输入2个字符");
      return;
    }
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
  private reset() {
    Object.assign(this.queryPageParameters, {
      companyName: null,
      taxScale: null,
      taxpayerNo: null,
    });
  }
  async getListMixin() {
    this.resPageInfo = await post_invoiceConfig_getList(
      this.queryPageParameters
    );
  }

  created() {
    this.getListMixin();
  }
}
</script>
