<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-27 17:26:20
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-23 11:21:52
-->
<template>
  <div>
    <p class="ih-info-title">结佣结算条件</p>
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
          </template>
        </el-table-column>
      </el-table>
    </div>
    <br />
    <p class="ih-info-title">请佣结算条件</p>
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
              @click.native.prevent="view(row, 'please')"
            >查看</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <ih-dialog :show="makingInfoDialogVisible">
      <MakingInfo
        :data="makingData"
        @cancel="() => (makingInfoDialogVisible = false)"
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
import MakingInfo from "../dialog/close-dialog/historyMakingInfo.vue";
import PleaseInfo from "../dialog/close-dialog/historyPleaseInfo.vue";
import { get_his_settleCondition_getPage__termId } from "@/api/project/index.ts";
@Component({
  components: {
    MakingInfo,
    PleaseInfo,
  },
})
export default class Close extends Vue {
  makingInfoDialogVisible = false;
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
      this.info = await get_his_settleCondition_getPage__termId({
        termId: id,
      });
    }
  }

  view(row: any, type: any) {
    if (type === "making") {
      this.makingData = {
        id: row.settleId,
        chargeEnum: this.info.chargeEnum,
        padCommissionEnum: this.info.padCommissionEnum,
      };
      this.makingInfoDialogVisible = true;
    } else {
      this.pleaseData = {
        id: row.settleId,
        chargeEnum: this.info.chargeEnum,
        padCommissionEnum: this.info.padCommissionEnum,
      };
      this.pleaseInfoDialogVisible = true;
    }
  }
}
</script>
<style lang="scss" scoped>
</style>