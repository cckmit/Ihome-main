<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-01-18 16:30:42
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-08 14:43:38
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="85%"
    class="splitdialog text-left"
    title="流程进度图（未完成）"
  >
    <el-steps :active="currentIndex" align-center>
      <template v-for="(item, i) in dicts">
        <el-step
          v-if="!item.jump"
          :key="i"
          :title="item.name"
          :description="item.operateTime ? item.operateTime : '---'"
        ></el-step>
      </template>
    </el-steps>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Progress extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  private info: any = [];
  currentIndex=0;

  private dicts: any = [
    {
      name: "发起申请",
      code: "Unconfirm",
    },
    {
      name: "平台文员审核",
      code: "PlatformClerkUnreview",
    },
    {
      name: "一线业务审核",
      code: "OneLineUnreview",
    },
    {
      name: "分公司业管审核",
      code: "BranchBusinessManageUnreview",
    },
    {
      name: "分公司财务审核",
      code: "BranchFinanceUnreview",
    },
    {
      name: "0A流程审核",
      code: "OAReviewing",
    },
    {
      name: "支付推送",
      code: "ConfirmingPay",
    },
    {
      name: "支付成功",
      code: "PaymentSuccessful",
    },
  ];

  cancel() {
    this.$emit("cancel", false);
  }

  created() {
    console.log(this.data);
  }
}
</script>
<style lang="scss" scoped>
</style>