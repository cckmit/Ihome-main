<!--
 * @Description: 批量/自动 开票
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-09 15:49:33
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-09 16:03:52
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="480px"
    :title="`${isAll ? '批量' : ''}自动开票`"
    class="text-left"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="ruleForm"
      label-width="130px"
      class="demo-ruleForm"
    >
      <el-form-item label="发票抬头">发票抬头</el-form-item>
      <el-form-item label="发票金额（含税）">发票金额（含税）</el-form-item>
      <el-form-item label="发票类型">
        <el-select v-model="form.xx"></el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        type="primary"
        @click="finish()"
      >保 存</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import { Form as ElForm } from "element-ui";

@Component({})
export default class AutoInvoice extends Vue {
  @Prop({ default: false }) isAll!: boolean;

  private dialogVisible = true;
  private form: any = {};
  private rules: any = {};

  cancel(): void {
    this.$emit("cancel", false);
  }
  finish(): void {
    (this.$refs["ruleForm"] as ElForm).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      //
    } else {
      return false;
    }
  }
}
</script>
