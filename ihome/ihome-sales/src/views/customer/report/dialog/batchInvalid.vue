<!--
 * @Description: 报备无效弹窗
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-09 16:47:26
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-30 11:41:56
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="560px"
    :title="`报备无效`"
    class="text-left"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="ruleForm"
      label-width="10px"
      class="demo-ruleForm"
    >
      <el-form-item label="" prop="comment">
        <el-input
          type="textarea"
          :rows="5"
          v-model="form.comment"
          placeholder="无效原因"
          maxlength="500"
          show-word-limit
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish()" :loading="loading"
        >确 认</el-button
      >
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import { Form as ElForm } from "element-ui";
import { post_report_reportValidOrInvalid } from "../../../../api/customer/index";

@Component({})
export default class BatchInvalid extends Vue {
  @Prop() isHandmade!: any;
  @Prop() data!: any;

  private dialogVisible = true;
  private form: any = {
    comment: null,
    validOrInvalid: null,
    reportIds: [],
  };
  private rules: any = {
    comment: [{ required: true, message: "请输入无效原因", trigger: "change" }],
  };

  loading = false;

  cancel(): void {
    this.$emit("cancel", false);
  }

  finish() {
    (this.$refs["ruleForm"] as ElForm).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    debugger;
    if (valid) {
      const res = await post_report_reportValidOrInvalid(this.form);
      this.$message.success("报备无效成功");
      this.$emit("finish", res);
    } else {
      console.log("error submit!!");
      return false;
    }
  }
  created() {
    this.form.reportIds = this.data.ids;
    this.form.validOrInvalid = "Invalid";
  }
}
</script>

<style lang="scss" scoped>
.red-content {
  .item {
    padding-bottom: 20px;
  }
}
</style>
