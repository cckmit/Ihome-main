<template>
  <ih-page>
    <el-row class="ih-info-line">
      <el-col :span="12" class="text-left">
        <h3>成交报告编号：xxxx</h3>
      </el-col>
      <el-col :span="12" class="text-right">
        <h3>【居恒广州广钢案场管理部】</h3>
      </el-col>
    </el-row>
    <el-row class="ih-info-line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">录入人</el-col>
          <el-col :span="18" class="ih-info-item-right">xxx</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">业绩分配人</el-col>
          <el-col :span="18" class="ih-info-item-right">xxx</el-col>
        </el-row>
      </el-col>
      <el-col :span="8" class="text-right">
        <el-row>
          <el-col :span="8" class="text-right"> 状态</el-col>
          <el-col :span="8" class="text-right">计算方式 </el-col>
          <el-col :span="8" class="text-right"> 数据标志</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="ih-info-line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">录入时间</el-col>
          <el-col :span="18" class="ih-info-item-right">xxx</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">业绩分配时间</el-col>
          <el-col :span="18" class="ih-info-item-right">xxx</el-col>
        </el-row>
      </el-col>
      <el-col
        :span="8"
        class="text-right"
        style="font-weight: 700; font-size: 20px"
      >
        <el-row>
          <el-col :span="8" class="text-right"> xxx</el-col>
          <el-col :span="8" class="text-right">xxx </el-col>
          <el-col :span="8" class="text-right"> xxx</el-col>
        </el-row>
      </el-col>
    </el-row>
    <div style="margin-bottom: 50px">
      <el-tabs v-model="tabActive">
        <el-tab-pane label="成交详情" name="1">
          <RealDealDetails />
        </el-tab-pane>

        <el-tab-pane label="流水详情" name="2">
          <RealDealFlowingWater />
        </el-tab-pane>

        <el-tab-pane label="关联成交" name="3">
          <RealDealRelation />
        </el-tab-pane>
      </el-tabs>

      <div class="back-fixed">
        <el-button type="primary" @click="$router.go(-1)">返回</el-button>
      </div>
    </div>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RealDealDetails from "./info-tabs/details.vue";
import RealDealFlowingWater from "./info-tabs/flowingWater.vue";
import RealDealRelation from "./info-tabs/relation.vue";
@Component({
  components: { RealDealDetails, RealDealFlowingWater, RealDealRelation },
})
export default class RealDealInfo extends Vue {
  info: any = {};
  tabActive: any = null;
  created() {
    console.log(this.$route.query.id, this.$route.query.tab);
    this.tabActive = this.$route.query.tab || "1";
  }
}
</script>
<style lang="scss" scoped>
/deep/ .ih-info-line {
  padding: 0 10px 10px 10px;
}
/deep/ .el-card__header{
  background: #f9f9f9;
}
.back-fixed {
  position: fixed;
  bottom: 20px;
  right: 20px;
  text-align: right;
  padding-right: 20px;
  margin: 0 20px;
}
</style>