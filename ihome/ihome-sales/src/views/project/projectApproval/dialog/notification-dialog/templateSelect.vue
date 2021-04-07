<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-04-06 11:33:15
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-06 14:43:56
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="500px"
    class="templateDialog text-left"
    :show-close="false"
  >
    <div
      class="button"
      v-show="firstShow"
    >
      <el-button
        type="primary"
        @click="goSecond"
      >联动销售确认书(启动函)</el-button>
      <el-button
        type="primary"
        class="margin-top-10 margin"
        @click="goThird"
      >渠道分销合同</el-button>
      <el-button
        type="primary"
        class="margin-top-10 margin"
        @click="routerTo('notChannelApply')"
      >非渠道类合同</el-button>
      <el-button
        @click="cancel()"
        class="margin-top-10 margin"
      >取 消</el-button>
    </div>
    <div
      class="button"
      v-show="secondShow"
    >
      <el-button
        type="primary"
        @click="routerTo('normalSalesApply')"
      >标准联动销售确认书(启动函)</el-button>
      <el-button
        type="primary"
        @click="routerTo('notSalesApply')"
        class="margin-top-10 margin"
      >非标联动销售确认书(启动函)</el-button>
      <el-button
        class="margin-top-50 margin"
        @click="goBack('1')"
      >返 回</el-button>
    </div>
    <div
      class="button"
      v-show="thirdShow"
    >
      <el-button
        type="primary"
        @click="routerTo('normalDistributionApply')"
      >标准渠道分销合同</el-button>
      <el-button
        type="primary"
        @click="routerTo('notDistributionApply')"
        class="margin-top-10 margin"
      >非标渠道分销合同</el-button>
      <el-button
        class="margin-top-50 margin"
        @click="goBack('2')"
      >返 回</el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  components: {},
})
export default class TemplateSelect extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  firstShow: any = true;
  secondShow: any = false;
  thirdShow: any = false;

  goSecond() {
    this.firstShow = false;
    this.secondShow = true;
  }

  goThird() {
    this.firstShow = false;
    this.thirdShow = true;
  }

  goBack(val: any) {
    switch (val) {
      case "1":
        this.secondShow = false;
        break;
      case "2":
        this.thirdShow = false;
        break;
    }
    this.firstShow = true;
  }

  routerTo(where: any) {
    this.$router.push({
      path: `/projectApproval/${where}`,
    });
  }

  cancel() {
    this.$emit("cancel", false);
  }
}
</script>
<style lang="scss" scoped>
.templateDialog {
  /deep/ .el-dialog__body {
    padding-top: 0;
  }
}
.button {
  display: flex;
  flex-direction: column;
}
.margin {
  margin-left: 0 !important;
}
</style>