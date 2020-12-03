<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-27 17:27:57
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-03 18:55:51
-->
<template>
  <div>
    <div class="calculation">
      <p class="ih-info-title">立项测算信息</p>
      <div class="calculationButton">
        <el-button
          size="small"
          type="success"
          @click="enterTo"
        >+进入立项测算内页</el-button>
      </div>
    </div>
    <br />
    <el-form
      :model="info"
      label-width="120px"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="服务费总包模式-总包成交留存率">
            <el-input
              v-model="info.serviceFeeTotalByTotalRate"
              disabled
              placeholder="自动获取"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="代理费总包模式-总包成交留存率">
            <el-input
              v-model="info.agencyFeeTotalByTotalRate"
              disabled
              placeholder="自动获取"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="纯分销模式-代理费留存率">
            <el-input
              v-model="info.distributeAgencyRate"
              disabled
              placeholder="自动获取"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="服务费总包模式-分销成交留存率">
            <el-input
              v-model="info.serviceFeeTotalByDistrictbuteRate"
              disabled
              placeholder="自动获取"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="代理费总包模式-分销成交留存率">
            <el-input
              v-model="info.agencyFeeTotalByDistrictbuteRate"
              disabled
              placeholder="自动获取"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="纯分销模式-服务费留存率">
            <el-input
              v-model="info.distributeServiceRate"
              disabled
              placeholder="自动获取"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="项目综合留存率">
            <el-input
              v-model="info.termOverallRate"
              disabled
              placeholder="自动获取"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <ih-dialog :show="dialogVisible">
      <CalculationDialog
        @cancel="() => (dialogVisible = false)"
        @finish="(data) => enterFinish(data)"
      />
    </ih-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { get_calc_get__termId, post_calc_save } from "@/api/project/index";
import CalculationDialog from "../dialog/calculation-dialog/index.vue";
@Component({
  components: {
    CalculationDialog,
  },
})
export default class Calculation extends Vue {
  info: any = {
    serviceFeeTotalByTotalRate: null,
    agencyFeeTotalByTotalRate: null,
    distributeAgencyRate: null,
    serviceFeeTotalByDistrictbuteRate: null,
    agencyFeeTotalByDistrictbuteRate: null,
    distributeServiceRate: null,
    termOverallRate: null,
  };
  dialogVisible: any = false;

  private get termId() {
    return this.$route.query.id;
  }

  created() {
    this.getInfo();
  }

  async getInfo() {
    if (this.termId) {
      this.info = await get_calc_get__termId({
        termId: this.termId,
      });
    }
  }

  enterTo() {
    this.dialogVisible = true;
  }

  async enterFinish(data: any) {
    console.log(data);
    await post_calc_save(data);
    this.$message.success("保存成功");
    this.dialogVisible = false;
  }
}
</script>

<style lang="scss" scoped>
.calculation {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
}

.calculationButton {
  margin: 5px 0 0 20px;
}
</style>