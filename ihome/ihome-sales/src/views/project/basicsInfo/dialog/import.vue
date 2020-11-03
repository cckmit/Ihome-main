<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-03 17:00:29
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-03 18:09:31
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
    :before-close="cancel"
    width="700px"
    class="dialog text-left"
    title="快捷导入房号"
  >
    <el-button>下载附件</el-button>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">返 回</el-button>
      <el-button type="primary" @click="finish()">提 交</el-button>
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
export default class HouseTypeEdit extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;

  form: any = {};

  cancel() {
    this.$emit("cancel", false);
  }
  finish() {
    (this.$refs["form"] as ElForm).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      this.$emit("finish", this.form);
    } else {
      console.log("error submit!!");
      return false;
    }
  }
  async created() {
    this.form = { ...this.data };
  }
}
</script>
<style lang="scss" scoped>
</style>