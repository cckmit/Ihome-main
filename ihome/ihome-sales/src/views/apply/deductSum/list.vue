<!--
 * @Description: 
 * @version: 
 * @Author: ywl
 * @Date: 2021-01-13 10:33:10
 * @LastEditors: ywl
 * @LastEditTime: 2021-02-23 17:03:12
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
              v-model="queryPageParameters.developName"
              placeholder="甲方公司名称"
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
        :summary-method="getSummaries"
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
          label="甲方公司名称"
          prop="developName"
          min-width="215"
          fixed
        ></el-table-column>
        <el-table-column
          label="已产生抵扣项费用(元)"
          prop="sumSubMoney"
          min-width="165"
        ></el-table-column>
        <el-table-column
          label="已冲正抵扣项费用(元)"
          prop="completeSumSubMoney"
          min-width="165"
        ></el-table-column>
        <el-table-column
          label="待冲正抵扣项费用(元)"
          prop="waitSumSubMoney"
          min-width="165"
        ></el-table-column>
        <el-table-column
          label="冲正中抵扣项费用(元)"
          prop="ongoingSumSubMoney"
          min-width="165"
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
import {
  post_devDeductDetail_getListSumByDev,
  post_devDeductDetail_getTotal,
} from "../../../api/apply/index";

@Component({
  mixins: [PaginationMixin],
})
export default class DeductSumList extends Vue {
  queryPageParameters: any = {
    developName: null,
  };
  resPageInfo: any = {
    total: null,
    list: [],
  };
  totalSum: any = {};

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
  private getSummaries(param: any) {
    const { columns } = param;
    const sums: any = [];
    columns.forEach((i: any, n: number) => {
      if (n === 0) {
        sums[n] = "合计";
        return;
      }
      if (n === 2) {
        sums[n] = this.totalSum?.sumSubMoney || 0;
      }
      if (n === 3) {
        sums[n] = this.totalSum?.completeSumSubMoney || 0;
      }
      if (n === 4) {
        sums[n] = this.totalSum?.waitSumSubMoney || 0;
      }
      if (n === 5) {
        sums[n] = this.totalSum?.ongoingSumSubMoney || 0;
      }
    });
    return sums;
  }
  private handleTo(row: any) {
    this.$router.push("/deduct/list");
    let params = JSON.stringify({
      developId: row.developId,
      developName: row.developName,
    });
    sessionStorage.setItem("deductParams", params);
  }
  async getListMixin() {
    this.resPageInfo = await post_devDeductDetail_getListSumByDev(
      this.queryPageParameters
    );
    let res = await post_devDeductDetail_getTotal(this.queryPageParameters);
    this.totalSum = res || {};
  }

  created() {
    this.getListMixin();
  }
}
</script>
