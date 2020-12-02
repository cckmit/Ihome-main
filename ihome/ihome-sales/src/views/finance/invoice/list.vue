<!--
 * @Description: 发票税率维护
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-01 10:38:45
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-02 15:40:53
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
          prop="companyName"
          label="名称"
          min-width="150"
        ></el-table-column>
        <el-table-column
          prop="taxpayerNo"
          label="纳税人识别号"
          width="155"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          min-width="200"
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
          <template v-slot="{}">
            <el-link
              type="success"
              class="margin-right-10"
            >详情</el-link>
            <el-link
              type="primary"
              class="margin-right-10"
            >修改</el-link>
            <el-link type="danger">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PaginationMixin from "../../../mixins/pagination";
import { post_invoiceConfig_getList } from "@/api/finance/index";

@Component({
  mixins: [PaginationMixin],
})
export default class InvoiceList extends Vue {
  queryPageParameters: any = {
    companyName: null,
    taxScale: null,
    taxpayerNo: null,
  };
  resPageInfo: any = {
    total: null,
    list: [],
  };

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
