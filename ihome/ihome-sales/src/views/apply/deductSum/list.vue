<!--
 * @Description: 
 * @version: 
 * @Author: ywl
 * @Date: 2021-01-13 10:33:10
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-13 14:22:33
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
          width="215"
          fixed
        ></el-table-column>
        <el-table-column
          label="已产生抵扣项费用(元)"
          prop="sumSubMoney"
          width="165"
        ></el-table-column>
        <el-table-column
          label="已冲正抵扣项费用(元)"
          prop="completeSumSubMoney"
          width="165"
        ></el-table-column>
        <el-table-column
          label="待冲正抵扣项费用(元)"
          prop="waitSumSubMoney"
          width="165"
        ></el-table-column>
        <el-table-column
          label="冲正中抵扣项费用(元)"
          prop="ongoingSumSubMoney"
          width="165"
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
import { post_devDeductDetail_getListSumByDev } from "../../../api/apply/index";

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
  }

  created() {
    this.getListMixin();
  }
}
</script>
