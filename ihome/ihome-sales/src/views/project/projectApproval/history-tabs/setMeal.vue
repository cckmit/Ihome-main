<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-27 17:22:45
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-23 10:50:51
-->
<template>
  <div>
    <p class="ih-info-title">收派套餐</p>
    <div class="padding-left-20">
      <el-table
        class="ih-table"
        :data="info"
        style="width: 100%"
      >
        <el-table-column
          prop="packageName"
          label="套餐名称"
        ></el-table-column>
        <el-table-column
          label="物业类型"
          prop="propertyEnum"
        >
          <template v-slot="{ row }">{{
            $root.dictAllName(row.propertyEnum, "Property")
          }}</template>
        </el-table-column>
        <el-table-column
          label="基准费用类型"
          width="120"
        >
          <template v-slot="{ row }">{{
            $root.dictAllName(row.baseCostEnum, "BaseCost")
          }}</template>
        </el-table-column>
        <el-table-column
          label="套餐有效时间"
          width="180"
        >
          <template v-slot="{ row }">
            {{row.startTime + '~' + row.endTime}}</template>
        </el-table-column>
        <el-table-column
          prop="estimatedTransactionPrice"
          label="假定成交均价(万元)"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="state"
          label="状态"
        >
          <template v-slot="{ row }">{{$root.dictAllName(row.state, 'Oper')}}</template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120"
          fixed="right"
          align="center"
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              @click.native.prevent="view(row)"
            >查看</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <ih-dialog :show="viewDialogVisible">
      <info
        :data="infoData"
        @cancel="() => (viewDialogVisible = false)"
      />
    </ih-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Info from "../dialog/setMeal-dialog/historyInfo.vue";
import { post_his_collectandsend_getAllByTerm } from "@/api/project/index.ts";
@Component({
  components: {
    Info,
  },
})
export default class SetMeal extends Vue {
  dialogVisible = false;
  viewDialogVisible = false;
  info: any = [];
  infoData: any = {};

  created() {
    this.getInfo();
  }

  async getInfo() {
    const id = this.$route.query.id;
    if (id) {
      this.info = await post_his_collectandsend_getAllByTerm({
        termId: id,
      });
    }
  }

  view(row: any) {
    this.viewDialogVisible = true;
    this.infoData.id = row.packageId;
  }
}
</script>
<style lang="scss" scoped>
</style>