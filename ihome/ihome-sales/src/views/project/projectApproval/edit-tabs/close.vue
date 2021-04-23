<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-27 17:26:20
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-23 11:19:12
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
          width="120"
          fixed="right"
          align="center"
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              @click.native.prevent="view(row, 'making')"
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
                <el-dropdown-item @click.native.prevent="edit(row, 'making')">编辑</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="copy(row, 'making')">复制</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="del(row, 'making')">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
          width="120"
          fixed="right"
          align="center"
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              @click.native.prevent="view(row, 'please')"
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
                <el-dropdown-item @click.native.prevent="edit(row, 'please')">编辑</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="copy(row, 'please')">复制</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="del(row, 'please')">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
  post_settleCondition_deleteMaking,
  post_settleCondition_deletePlease,
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
        type: "edit",
      };
      this.makingEditDialogVisible = true;
    } else {
      this.pleaseData = {
        id: row.settleId,
        chargeEnum: this.info.chargeEnum,
        padCommissionEnum: this.info.padCommissionEnum,
        proId: this.info.proId,
        type: "edit",
      };
      this.pleaseEditDialogVisible = true;
    }
  }

  copy(row: any, type: any) {
    if (type === "making") {
      this.makingData = {
        id: row.settleId,
        chargeEnum: this.info.chargeEnum,
        padCommissionEnum: this.info.padCommissionEnum,
        proId: this.info.proId,
        type: "coyp",
      };
      this.makingEditDialogVisible = true;
    } else {
      this.pleaseData = {
        id: row.settleId,
        chargeEnum: this.info.chargeEnum,
        padCommissionEnum: this.info.padCommissionEnum,
        proId: this.info.proId,
        type: "coyp",
      };
      this.pleaseEditDialogVisible = true;
    }
  }

  async del(row: any, type: any) {
    try {
      await this.$confirm("是否确定删除?", "提示");
      if (type === "making") {
        await post_settleCondition_deleteMaking({
          termId: this.$route.query.id,
          settleId: row.settleId,
        });
      } else {
        await post_settleCondition_deletePlease({
          termId: this.$route.query.id,
          settleId: row.settleId,
        });
      }
      this.getInfo();
      this.$message({
        type: "success",
        message: "删除成功!",
      });
    } catch (error) {
      console.log(error);
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