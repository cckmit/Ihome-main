<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-27 17:22:45
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-23 15:05:12
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
          width="150"
          fixed="right"
          align="center"
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              @click.native.prevent="view(row)"
            >查看</el-link>
            <el-dropdown
              v-if="businessManagementChange"
              trigger="click"
              class="margin-left-15"
            >
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  @click.native.prevent="start(row)"
                  v-if="row.state === 'Cancel'"
                >启用</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="cancellation(row)"
                  v-if="row.state === 'Start'"
                >作废</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
import Info from "../dialog/setMeal-dialog/info.vue";
import {
  post_collectandsend_getAllByTerm,
  post_collectandsend_start,
  post_collectandsend_cancel,
} from "@/api/project/index.ts";
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

  private get businessManagementChange() {
    const businessManagementEdit =
      this.$route.name === "businessManagementEdit"; //路由判断
    return businessManagementEdit;
  }

  created() {
    this.getInfo();
  }

  async getInfo() {
    const id = this.$route.query.id;
    if (id) {
      this.info = await post_collectandsend_getAllByTerm({
        termId: id,
      });
    }
  }

  async start(row: any) {
    await post_collectandsend_start({
      packageId: row.packageId,
    });
    this.$message.success("启用成功");
    this.getInfo();
  }

  async cancellation(data: any) {
    await post_collectandsend_cancel({
      packageId: data.packageId,
    });
    this.$message.success("作废成功");
    this.getInfo();
  }

  view(row: any) {
    this.viewDialogVisible = true;
    this.infoData.id = row.packageId;
  }
}
</script>
<style lang="scss" scoped>
</style>