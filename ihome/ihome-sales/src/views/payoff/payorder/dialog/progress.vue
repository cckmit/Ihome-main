<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-01-18 16:30:42
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-07 17:13:19
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="90%"
    class="splitdialog text-left"
    title="流程进度图"
  >
    <el-steps
      :active="currentIndex"
      align-center
    >
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
import { get_processRecord_process_node__applyId } from "@/api/payoff/index";
@Component({
  components: {},
})
export default class Progress extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;

  private info: any = [];
  private form: any = {
    id: null,
    status: null,
  };
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

  get currentIndex() {
    let index: any = null;
    index = this.dicts.findIndex((v: any) => v.code === this.form.status);
    return index;
  }

  async getInfo() {
    const res = await get_processRecord_process_node__applyId({
      applyId: this.form.id,
    });
    this.dicts.forEach((v: any, i: number) => {
      res.forEach((j: any) => {
        if (v.code === j.afterStatus) {
          this.$set(this.dicts, i, { ...v, ...j });
        }
      });
    });
  }

  created() {
    if (["ReviewPass", "ReviewReject"].includes(this.data.status)) {
      this.form = { ...this.data, status: "OAReviewing" };
    } else {
      this.form = { ...this.data };
    }
    if (this.form.id) {
      this.getInfo();
    }
  }
}
</script>
<style lang="scss" scoped>
</style>