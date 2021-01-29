<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-27 17:27:57
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-09 16:08:41
-->
<template>
  <div>
    <p class="ih-info-title">立项测算信息</p>
    <br />
    <el-form
      :model="info"
      label-width="120px"
      class="text-left"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="服务费总包模式-总包成交留存率">
            <span class="text-ellipsis">{{ info.serviceFeeTotalByTotalRate }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="代理费总包模式-总包成交留存率">
            <span class="text-ellipsis">{{ info.agencyFeeTotalByTotalRate }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="纯分销模式-代理费留存率">
            <span class="text-ellipsis">{{ info.distributeAgencyRate }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="服务费总包模式-分销成交留存率">
            <span class="text-ellipsis">{{ info.serviceFeeTotalByDistrictbuteRate }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="代理费总包模式-分销成交留存率">
            <span class="text-ellipsis">{{ info.agencyFeeTotalByDistrictbuteRate }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="纯分销模式-服务费留存率">
            <span class="text-ellipsis">{{ info.distributeServiceRate }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="项目综合留存率">
            <span class="text-ellipsis">{{ info.termOverallRate }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { get_his_calc_get__termId } from "@/api/project/index";
@Component({
  components: {},
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

  private get termId() {
    return this.$route.query.id;
  }

  created() {
    this.getInfo();
  }

  async getInfo() {
    if (this.termId) {
      this.info = await get_his_calc_get__termId({
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
</style>