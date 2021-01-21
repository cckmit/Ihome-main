<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-27 17:22:45
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-21 11:34:03
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
          v-has="'B.SALES.PROJECT.TERMLIST.SPTCXZ'"
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
          width="220"
          fixed="right"
          align="center"
        >
          <template v-slot="{ row }">
            <el-button
              size="small"
              type="primary"
              @click="view(row)"
            >查看</el-button>
            <el-button
              size="small"
              type="success"
              @click="edit(row)"
              v-has="'B.SALES.PROJECT.TERMLIST.SPTCXG'"
            >修改</el-button>
            <el-button
              v-if="row.state === 'Cancel'"
              size="small"
              type="success"
              @click="start(row)"
              v-has="'B.SALES.PROJECT.TERMLIST.SPTCQY'"
            >启用</el-button>
            <el-button
              v-if="row.state === 'Start'"
              size="small"
              type="danger"
              v-has="'B.SALES.PROJECT.TERMLIST.SPTCZF'"
              @click="cancellation(row)"
            >作废</el-button>
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
      <info
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
  post_collectandsend_start,
  post_collectandsend_cancel,
  post_collectandsend_add,
  post_collectandsend_update,
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
    this.dialogVisible = true;
  }

  view(row: any) {
    this.viewDialogVisible = true;
    this.infoData.id = row.packageId;
  }

  async addFinish(data: any) {
    data.termId = this.$route.query.id;
    data.colletionandsendMxs.forEach((v: any) => {
      v.colletionandsendDetails = v.colletionandsendDetails.map((j: any) => ({
        ...j,
        transactionEnumOptions: JSON.stringify(j.transactionEnumOptions),
      }));
    });
    if (this.editData.id) {
      data.packageId = this.editData.id;
      await post_collectandsend_update(data);
      this.$message.success("修改成功");
    } else {
      await post_collectandsend_add(data);
      this.$message.success("新增成功");
    }
    this.dialogVisible = false;
    this.getInfo();
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