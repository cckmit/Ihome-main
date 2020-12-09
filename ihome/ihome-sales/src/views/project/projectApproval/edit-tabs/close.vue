<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-27 17:26:20
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-09 21:10:55
-->
<template>
  <div>
    <div class="setMeal">
      <p class="ih-info-title">结佣结算条件</p>
      <div class="setMealButton">
        <el-button
          size="small"
          type="success"
          @click="add"
        >+增加</el-button>
      </div>
    </div>
    <div class="padding-left-20">
      <el-table
        class="ih-table"
        :data="info"
        style="width: 100%"
      >
        <el-table-column
          prop="settleName"
          label="名称"
        ></el-table-column>
        <el-table-column
          label="中介性质"
          prop="propertyEnum"
        >
          <template v-slot="{ row }">{{
            $root.dictAllName(row.propertyEnum, "PropertyEnum")
          }}</template>
        </el-table-column>
        <el-table-column label="优先级">
          <template v-slot="{ row }">{{
            $root.dictAllName(row.priority, "Priority")
          }}</template>
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
            >修改</el-button>
            <el-button
              size="small"
              type="danger"
              @click="cancellation(row)"
            >作废</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <br />
    <div class="setMeal">
      <p class="ih-info-title">请佣结算条件</p>
      <div class="setMealButton">
        <el-button
          size="small"
          type="success"
          @click="add"
        >+增加</el-button>
      </div>
    </div>
    <div class="padding-left-20">
      <el-table
        class="ih-table"
        :data="info"
        style="width: 100%"
      >
        <el-table-column
          prop="settleName"
          label="名称"
        ></el-table-column>
        <el-table-column
          label="甲方名称"
          prop="propertyEnum"
        >
          <template v-slot="{ row }">{{
            $root.dictAllName(row.propertyEnum, "PropertyEnum")
          }}</template>
        </el-table-column>
        <el-table-column label="优先级">
          <template v-slot="{ row }">{{
            $root.dictAllName(row.priority, "Priority")
          }}</template>
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
            >修改</el-button>
            <el-button
              size="small"
              type="danger"
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
import Edit from "../dialog/close-dialog/edit.vue";
import Info from "../dialog/close-dialog/info.vue";
import {
  post_collectandsend_getAllByTerm,
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
export default class Close extends Vue {
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
    console.log(row);
    // this.editData.id = row.packageId;
    this.dialogVisible = true;
  }

  view(row: any) {
    this.viewDialogVisible = true;
    this.infoData.id = row.packageId;
  }

  async addFinish(data: any) {
    data.termId = this.$route.query.id;
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