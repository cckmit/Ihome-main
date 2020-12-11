<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-27 17:26:20
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-11 18:53:16
-->
<template>
  <div>
    <div class="setMeal">
      <p class="ih-info-title">结佣结算条件</p>
      <div class="setMealButton">
        <el-button
          size="small"
          type="success"
          @click="add('making')"
        >+增加</el-button>
      </div>
    </div>
    <div class="padding-left-20">
      <el-table
        class="ih-table"
        :data="info.settlePleaseVOS"
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
            $root.dictAllName(row.propertyEnum, "Property")
          }}</template>
        </el-table-column>
        <el-table-column
          label="优先级"
          prop="priorityEnum"
        >
          <template v-slot="{ row }">{{
            $root.dictAllName(row.priorityEnum, "Priority")
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
              @click="view(row, 'making')"
            >查看</el-button>
            <el-button
              size="small"
              type="success"
              @click="edit(row, 'making')"
            >修改</el-button>
            <el-button
              size="small"
              type="danger"
              @click="cancellation(row, 'making')"
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
          @click="add('please')"
        >+增加</el-button>
      </div>
    </div>
    <div class="padding-left-20">
      <el-table
        class="ih-table"
        :data="info.settleMakingVOS"
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
            $root.dictAllName(row.propertyEnum, "Property")
          }}</template>
        </el-table-column>
        <el-table-column
          label="优先级"
          prop="priorityEnum"
        >
          <template v-slot="{ row }">{{
            $root.dictAllName(row.priorityEnum, "Priority")
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
              @click="view(row, 'please')"
            >查看</el-button>
            <el-button
              size="small"
              type="success"
              @click="edit(row, 'please')"
            >修改</el-button>
            <el-button
              size="small"
              type="danger"
              @click="cancellation(row, 'please')"
            >作废</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <ih-dialog :show="makingEditDialogVisible">
      <MakingEdit
        :data="editData"
        @cancel="() => (makingEditDialogVisible = false)"
        @finish="(data) => makingEditFinish(data)"
      />
    </ih-dialog>
    <ih-dialog :show="makingInfoDialogVisible">
      <MakingInfo
        :data="editData"
        @cancel="() => (makingInfoDialogVisible = false)"
      />
    </ih-dialog>
    <ih-dialog :show="pleaseEditDialogVisible">
      <PleaseEdit
        :data="editData"
        @cancel="() => (pleaseEditDialogVisible = false)"
        @finish="(data) => addFinish(data)"
      />
    </ih-dialog>
    <ih-dialog :show="pleaseInfoDialogVisible">
      <PleaseInfo
        :data="editData"
        @cancel="() => (pleaseInfoDialogVisible = false)"
      />
    </ih-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MakingEdit from "../dialog/close-dialog/makingEdit.vue";
import MakingInfo from "../dialog/close-dialog/makingInfo.vue";
import PleaseEdit from "../dialog/close-dialog/pleaseEdit.vue";
import PleaseInfo from "../dialog/close-dialog/pleaseEdit.vue";
import {
  get_settleCondition_getPage__termId,
  post_settleCondition_cancelPlease,
  post_settleCondition_cancelMaking,
} from "@/api/project/index.ts";
@Component({
  components: {
    MakingEdit,
    MakingInfo,
    PleaseEdit,
    PleaseInfo,
  },
})
export default class Close extends Vue {
  makingEditDialogVisible = false;
  makingInfoDialogVisible = false;
  pleaseEditDialogVisible = false;
  pleaseInfoDialogVisible = false;
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
      this.info = await get_settleCondition_getPage__termId({
        termId: id,
      });
    }
  }

  add(type: any) {
    if (type === "making") {
      this.makingEditDialogVisible = true;
    } else {
      this.pleaseEditDialogVisible = true;
    }
  }

  edit(row: any, type: any) {
    if (type === "making") {
      this.makingEditDialogVisible = true;
    } else {
      this.pleaseEditDialogVisible = true;
    }
    console.log(row, type);
  }

  view(row: any, type: any) {
    if (type === "making") {
      this.makingEditDialogVisible = true;
    } else {
      this.pleaseEditDialogVisible = true;
    }
  }

  makingEditFinish(data: any) {
    // data.termId = this.$route.query.id;
    console.log(data);
    // this.makingEditDialogVisible = false;
    // this.getInfo();
  }

  async cancellation(data: any, type: any) {
    if (type === "making") {
      await post_settleCondition_cancelMaking({
        settleId: data.settleId,
        termId: this.$route.query.id,
      });
    } else {
      await post_settleCondition_cancelPlease({
        settleId: data.settleId,
        termId: this.$route.query.id,
      });
    }
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