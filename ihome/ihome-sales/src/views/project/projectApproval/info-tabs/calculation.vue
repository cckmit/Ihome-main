<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-27 17:27:57
 * @LastEditors: wwq
 * @LastEditTime: 2021-03-02 17:53:14
-->
<template>
  <div>
    <div class="calculation">
      <p class="ih-info-title">立项测算信息</p>
      <div class="calculationButton">
        <el-button
          size="small"
          type="success"
          @click="dialogVisible = true;"
        >查看立项测算内页</el-button>
      </div>
    </div>
    <br />
    <el-form
      :model="info"
      label-width="120px"
      class="text-left"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="服务费总包模式-总包成交留存率"
            class="formItem"
          >
            <span class="text-ellipsis">{{ info.serviceFeeTotalByTotalRate ?info.serviceFeeTotalByTotalRate + '%' : '-' }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="代理费总包模式-总包成交留存率"
            class="formItem"
          >
            <span class="text-ellipsis">{{ info.agencyFeeTotalByTotalRate ? info.agencyFeeTotalByTotalRate + '%' : '-' }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="纯分销模式-代理费留存率"
            class="formItem"
          >
            <span class="text-ellipsis">{{ info.distributeAgencyRate ? info.distributeAgencyRate + '%' : '-' }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="服务费总包模式-分销成交留存率"
            class="formItem"
          >
            <span class="text-ellipsis">{{ info.serviceFeeTotalByDistrictbuteRate ? info.serviceFeeTotalByDistrictbuteRate + '%' : '-' }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="代理费总包模式-分销成交留存率"
            class="formItem"
          >
            <span class="text-ellipsis">{{ info.agencyFeeTotalByDistrictbuteRate ? info.agencyFeeTotalByDistrictbuteRate + '%' : '-' }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="纯分销模式-服务费留存率"
            class="formItem"
          >
            <span class="text-ellipsis">{{ info.distributeServiceRate ? info.distributeServiceRate + '%' : '-' }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="项目综合留存率">
            <span class="text-ellipsis">{{ info.termOverallRate ? info.termOverallRate + '%' : '-' }}</span>
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
import { get_calc_get__termId } from "@/api/project/index";
import CalculationDialog from "../dialog/calculation-dialog/info.vue";
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
  dialogVisible = false;

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
}
</script>

<style lang="scss" scoped>
.text-ellipsis {
  width: 100%;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.formItem {
  /deep/ .el-form-item__label {
    line-height: 20px;
  }
}

.calculation {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
}

.calculationButton {
  margin: 5px 0 0 20px;
}
</style>