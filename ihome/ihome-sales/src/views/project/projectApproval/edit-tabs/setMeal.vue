<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-27 17:22:45
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-23 11:15:33
-->
<template>
  <div>
    <div class="setMeal">
      <p class="ih-info-title">收派套餐</p>
      <div class="setMealButton">
        <el-button
          size="small"
          type="success"
          @click="add"
        >+增加收派套餐</el-button>
      </div>
    </div>
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
            <el-dropdown
              trigger="click"
              class="margin-left-15"
            >
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native.prevent="edit(row)">编辑</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="copy(row)">复制</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="del(row)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <ih-dialog :show="dialogVisible">
      <Edit
        :data="editData"
        @cancel="() => (dialogVisible = false)"
        @finish="(data) => addFinish(data)"
      />
    </ih-dialog>
    <ih-dialog :show="viewDialogVisible">
      <Info
        :data="infoData"
        @cancel="() => (viewDialogVisible = false)"
      />
    </ih-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Edit from "../dialog/setMeal-dialog/edit.vue";
import Info from "../dialog/setMeal-dialog/info.vue";
import {
  post_collectandsend_getAllByTerm,
  post_collectandsend_delete,
} from "@/api/project/index.ts";
@Component({
  components: {
    Edit,
    Info,
  },
})
export default class SetMeal extends Vue {
  dialogVisible = false;
  viewDialogVisible = false;
  info: any = [];
  editData: any = {};
  infoData: any = {};

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

  add() {
    this.editData.id = "";
    this.dialogVisible = true;
  }

  edit(row: any) {
    this.editData.id = row.packageId;
    this.editData.type = "edit";
    this.dialogVisible = true;
  }

  copy(row: any) {
    this.editData.id = row.packageId;
    this.editData.type = "copy";
    this.dialogVisible = true;
  }

  async del(row: any) {
    try {
      await this.$confirm("是否确定删除?", "提示");
      await post_collectandsend_delete({
        termId: row.termId,
        packageId: row.packageId,
      });
      this.getInfo();
      this.$message({
        type: "success",
        message: "删除成功!",
      });
    } catch (error) {
      console.log(error);
    }
  }

  view(row: any) {
    this.viewDialogVisible = true;
    this.infoData.id = row.packageId;
  }

  async addFinish() {
    this.dialogVisible = false;
    this.getInfo();
  }
}
</script>
<style lang="scss" scoped>
.setMeal {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
}
.setMealButton {
  margin: 5px 0 0 20px;
}
</style>