<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-04 19:58:24
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-04 20:39:25
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="500px"
    class="dialog text-left"
    :append-to-body="true"
    title="条件编辑"
  >
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
    >
      <el-checkbox-group v-model="form.checkList">
        <el-checkbox label="复选框 A">
          <el-select
            style="width: 100%"
            v-model="form"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in $root.dictAllList('SubdivideEnum')"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-checkbox>
        <el-checkbox label="复选框 B"></el-checkbox>
        <el-checkbox label="复选框 C"></el-checkbox>
      </el-checkbox-group>
    </el-form>

    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        type="primary"
        @click="finish()"
      >确 定</el-button>
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
export default class UserAdd extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;

  form: any = {
    checkList: [],
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
      this.$emit("finish", this.form);
    } else {
      console.log("error submit!!");
      return false;
    }
  }
  async created() {
    console.log(this.data, "rules");
    // this.form = { ...this.data };
  }
}
</script>
<style lang="scss" scoped>
.ih-dialog {
  .el-form-item__content {
    margin-right: 40px;
  }
  .el-input,
  .el-select {
    width: 100%;
  }
}
</style>