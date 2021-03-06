<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-26 11:11:28
 * @LastEditors: wwq
 * @LastEditTime: 2021-03-05 17:28:37
-->
<template>
  <IhPage label-width="100px">
    <template #form>
      <div>
        <el-row>
          <el-col
            :span="24"
            class="text-right"
          >
            <el-input
              v-model="queryPageParameters.agencyName"
              placeholder="渠道公司名称"
              class="width-250"
              @keyup.enter.native="search"
              clearable
            ></el-input>
            <el-button
              type="primary"
              class="margin-left-20"
              @click="search()"
            >查询</el-button>
          </el-col>
        </el-row>
      </div>
    </template>
    <template #table>
      <br />
      <el-table
        class="ih-table"
        show-summary
        :empty-text="emptyText"
        :data="resPageInfo.list"
      >
        <el-table-column
          label="序号"
          type="index"
          :index="typeIndex"
          width="60"
          align="center"
          fixed
        ></el-table-column>
        <el-table-column
          label="渠道公司名称"
          prop="agencyName"
          fixed
        ></el-table-column>
        <el-table-column
          label="已产生抵扣项费用(元)"
          prop="generatedAmount"
        ></el-table-column>
        <el-table-column
          label="已冲正抵扣项费用(元)"
          prop="deductedAmount"
        ></el-table-column>
        <el-table-column
          label="待冲正抵扣项费用(元)"
          prop="undeductionAmount"
        ></el-table-column>
        <el-table-column
          label="冲正中抵扣项费用(元)"
          prop="deductingAmount"
        ></el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="80"
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              @click="handleTo(row)"
            >查看明细</el-link>
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
import { post_payDeductDetail_summary_list } from "@/api/payoff/index";

@Component({
  mixins: [PaginationMixin],
})
export default class DeductSumList extends Vue {
  queryPageParameters: any = {
    agencyName: null,
  };
  resPageInfo: any = {
    total: null,
    list: [],
  };

  private search() {
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
  private typeIndex(index: number) {
    return (
      (this.queryPageParameters.pageNum - 1) *
        this.queryPageParameters.pageSize +
      index +
      1
    );
  }
  private handleTo(row: any) {
    this.$router.push("/deductionDetail/list");
    let params = JSON.stringify({
      agencyName: row.agencyName,
    });
    sessionStorage.setItem("deductionDetailParams", params);
  }
  async getListMixin() {
    this.resPageInfo = await post_payDeductDetail_summary_list(
      this.queryPageParameters
    );
  }

  created() {
    this.getListMixin();
  }
}
</script>