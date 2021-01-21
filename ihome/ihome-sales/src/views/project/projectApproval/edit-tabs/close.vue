<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-27 17:26:20
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-21 20:22:09
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
          v-has="'B.SALES.PROJECT.TERMLIST.JYXZ'"
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
          label="中介性质"
          prop="agencyText"
        >
        </el-table-column>
        <el-table-column
          label="状态"
          prop="cancel"
        >
          <template v-slot="{ row }">
            {{row.cancel ? '作废' : '有效'}}
          </template>
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
              v-has="'B.SALES.PROJECT.TERMLIST.JYXG'"
            >修改</el-button>
            <el-button
              v-if="row.cancel"
              size="small"
              type="success"
              @click="start(row, 'making')"
              v-has="'B.SALES.PROJECT.TERMLIST.JYQY'"
            >启用</el-button>
            <el-button
              v-if="!row.cancel"
              size="small"
              type="danger"
              @click="cancellation(row, 'making')"
              v-has="'B.SALES.PROJECT.TERMLIST.JYZF'"
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
          v-has="'B.SALES.PROJECT.TERMLIST.QYXZ'"
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
          label="甲方名称"
          prop="partyAText"
        >
        </el-table-column>
        <el-table-column
          prop="settleName"
          label="状态"
        >
          <template v-slot="{ row }">
            {{row.cancel ? '作废' : '有效'}}
          </template>
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
              v-has="'B.SALES.PROJECT.TERMLIST.QYXG'"
            >修改</el-button>
            <el-button
              v-if="row.cancel"
              size="small"
              type="success"
              v-has="'B.SALES.PROJECT.TERMLIST.QYQY'"
              @click="start(row, 'please')"
            >启用</el-button>
            <el-button
              v-if="!row.cancel"
              size="small"
              type="danger"
              v-has="'B.SALES.PROJECT.TERMLIST.QYZF'"
              @click="cancellation(row, 'please')"
            >作废</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <ih-dialog :show="makingEditDialogVisible">
      <MakingEdit
        :data="makingData"
        @cancel="() => (makingEditDialogVisible = false)"
        @finish="makingEditFinish"
      />
    </ih-dialog>
    <ih-dialog :show="makingInfoDialogVisible">
      <MakingInfo
        :data="makingData"
        @cancel="() => (makingInfoDialogVisible = false)"
      />
    </ih-dialog>
    <ih-dialog :show="pleaseEditDialogVisible">
      <PleaseEdit
        :data="pleaseData"
        @cancel="() => (pleaseEditDialogVisible = false)"
        @finish="pleaseEditFinish"
      />
    </ih-dialog>
    <ih-dialog :show="pleaseInfoDialogVisible">
      <PleaseInfo
        :data="pleaseData"
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
import PleaseInfo from "../dialog/close-dialog/pleaseInfo.vue";
import {
  get_settleCondition_getPage__termId,
  post_settleCondition_cancelPlease,
  post_settleCondition_cancelMaking,
  post_settleCondition_startMaking,
  post_settleCondition_startPlease,
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
  info: any = {
    settlePleaseVOS: [],
    settleMakingVOS: [],
  };
  makingData: any = {};
  pleaseData: any = {};

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
      this.makingData = {
        id: "",
        chargeEnum: this.info.chargeEnum,
        padCommissionEnum: this.info.padCommissionEnum,
        proId: this.info.proId,
      };
      this.makingEditDialogVisible = true;
    } else {
      this.pleaseData = {
        id: "",
        chargeEnum: this.info.chargeEnum,
        padCommissionEnum: this.info.padCommissionEnum,
        proId: this.info.proId,
      };
      this.pleaseEditDialogVisible = true;
    }
  }

  edit(row: any, type: any) {
    if (type === "making") {
      this.makingData = {
        id: row.settleId,
        chargeEnum: this.info.chargeEnum,
        padCommissionEnum: this.info.padCommissionEnum,
        proId: this.info.proId,
      };
      this.makingEditDialogVisible = true;
    } else {
      this.pleaseData = {
        id: row.settleId,
        chargeEnum: this.info.chargeEnum,
        padCommissionEnum: this.info.padCommissionEnum,
        proId: this.info.proId,
      };
      this.pleaseEditDialogVisible = true;
    }
  }

  view(row: any, type: any) {
    if (type === "making") {
      this.makingData = {
        id: row.settleId,
        chargeEnum: this.info.chargeEnum,
        padCommissionEnum: this.info.padCommissionEnum,
        proId: this.info.proId,
      };
      this.makingInfoDialogVisible = true;
    } else {
      this.pleaseData = {
        id: row.settleId,
        chargeEnum: this.info.chargeEnum,
        padCommissionEnum: this.info.padCommissionEnum,
        proId: this.info.proId,
      };
      this.pleaseInfoDialogVisible = true;
    }
  }

  makingEditFinish() {
    this.makingEditDialogVisible = false;
    this.getInfo();
  }

  pleaseEditFinish() {
    this.pleaseEditDialogVisible = false;
    this.getInfo();
  }

  async start(data: any, type: any) {
    if (type === "making") {
      await post_settleCondition_startMaking({
        settleId: data.settleId,
        termId: this.$route.query.id,
      });
    } else {
      await post_settleCondition_startPlease({
        settleId: data.settleId,
        termId: this.$route.query.id,
      });
    }
    this.$message.success("启用成功");
    this.getInfo();
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