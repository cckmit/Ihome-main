<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2021-02-09 14:30:45
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-09 14:47:40
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="600px"
    class="splitdialog text-left"
    title="设置已退款"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="退款日期" required>
        <el-form-item prop="payTime">
          <el-date-picker
            type="date"
            placeholder="退款日期"
            v-model="ruleForm.payTime"
            value-format="yyyy-MM-dd"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import { post_refundItemPush_setUpARefund } from "../../../../api/finance/index";
@Component({
  components: {},
})
export default class SetUpARefund extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;

  ruleForm: any = {
    id: null,
    payTime: null,
  };
  rules: any = {
    payTime: [{ required: true, message: "退款日期必填", trigger: "change" }],
  };

  cancel() {
    this.$emit("cancel", false);
  }

  async finish(formName: any) {
    (this.$refs[formName] as any).validate(this.submit);
  }

  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      console.log(valid);
      await post_refundItemPush_setUpARefund(this.ruleForm);
      this.$message.success("设置成功");
      this.$emit("finish", true);
    } else {
      console.log("error submit!!");
      return false;
    }
  }

  created() {
    console.log(this.data);
    this.ruleForm = this.data;
  }
}
</script>
<style lang="scss" scoped>
</style>