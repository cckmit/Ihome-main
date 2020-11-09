<!--
 * @Description: 添加、修改字典弹窗
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-09 15:15:30
 * @LastEditors: ywl
 * @LastEditTime: 2020-11-09 15:38:45
-->
<template>
  <el-dialog
    v-dialogDrag
    title="添加字典类型"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    class="text-left"
    width="500px"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="dictFrom"
      label-width="100px"
      class="text-left"
    >
      <el-form-item label="字典类型"></el-form-item>
      <el-form-item label="编码">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="子类型">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="标签">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="顺序">
        <el-input-number
          v-model="form.num"
          :min="1"
          :max="99"
          class="width--100"
        ></el-input-number>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        type="primary"
        @click="finish()"
      >确 定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import { Form as ElForm } from "element-ui";

@Component({})
export default class DictItemDialog extends Vue {
  @Prop() isAdd!: boolean;

  private dialogVisible = true;
  private form: any = {};
  private rules: any = {};

  cancel(): void {
    this.$emit("cancel", false);
  }
  finish(): void {
    (this.$refs["dictFrom"] as ElForm).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      //
    } else {
      console.log("error submit!!");
      return false;
    }
  }
}
</script>
