<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-01 10:58:54
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-14 16:28:10
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="600px"
    class="dialog text-left"
    :title="`${data.title}`"
  >
    <el-form
      ref="form"
      :model="form"
      label-width="130px"
    >
      <el-row>
        <el-col
          :span="24"
          v-if="data.title === '甲方退款天数'"
        >
          <el-form-item :label="`${data.title}`">
            <el-input
              :placeholder="`请输入${data.title}`"
              v-model="form.value"
              v-digits="0"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col
          :span="24"
          v-else
        >
          <el-form-item :label="`${data.title}`">
            <el-input
              show-word-limit
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8 }"
              :placeholder="`请输入${data.title}`"
              v-model="form.value"
            >
            </el-input>
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
export default class PartyADialog extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;

  form: any = {
    value: null,
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
      this.$emit("finish", this.form.value);
    } else {
      console.log("error submit!!");
      return false;
    }
  }
  async created() {
    this.form.value = this.data.value;
  }
}
</script>
<style lang="scss" scoped>
</style>