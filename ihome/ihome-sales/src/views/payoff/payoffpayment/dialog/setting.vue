<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-01-16 18:14:45
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-16 18:23:49
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="700px"
    class="splitdialog text-left"
    title="设置已付款"
  >
    <el-form
      ref="form"
      :model="info"
      :rules="rules"
      label-width="150px"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="付款日期:"
            prop="paymentDate"
          >
            <el-date-picker
              style="width: 100%"
              v-model="info.paymentDate"
              type="datetime"
              placeholder="付款日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        type="primary"
        @click="finish()"
      >保 存</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
@Component({
  components: {},
})
export default class Edit extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;

  private info: any = {};
  private rules: object = {
    paymentDate: [
      { required: true, message: "请选择付款日期", trigger: "change" },
    ],
  };

  cancel() {
    this.$emit("cancel", false);
  }
  finish() {
    (this.$refs["form"] as ElForm).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      this.$emit("finish", this.info);
    } else {
      console.log("error submit!!");
      return false;
    }
  }

  async created() {
    this.info = { ...this.data };
  }
}
</script>
<style lang="scss" scoped>
</style>