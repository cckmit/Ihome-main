<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-07-08 14:23:16
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-11 11:45:14
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
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="姓名"
            prop="contactName"
          >
            <el-input
              v-model="form.contactName"
              placeholder="姓名"
              maxlength="32"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item
            label="手机号码"
            prop="contactNum"
          >
            <el-input
              maxlength="16"
              v-model="form.contactNum"
              placeholder="手机号码"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item
            label="邮箱"
            prop="email"
          >
            <el-input
              v-model="form.email"
              placeholder="电子邮箱"
              maxlength="64"
            ></el-input>
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
      >确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";

import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import { phoneValidator } from "ihome-common/util/base/form-ui";
@Component({
  components: {},
})
export default class UserAdd extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;

  form: any = {
    contactName: null,
    contactNum: null,
    email: null,
  };
  rules: any = {
    contactName: [
      { required: true, message: "请输入名称", trigger: "change" },
      { min: 1, max: 32, message: "长度在 1 到 32 个字符", trigger: "change" },
    ],
    contactNum: [
      { required: true, message: "请输入手机号", trigger: "change" },
      { validator: phoneValidator, trigger: "change" },
    ],
    email: [
      { message: "请输入邮箱地址", trigger: "change" },
      {
        type: "email",
        message: "请输入正确的邮箱地址",
        trigger: "change",
      },
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
      if (valid) {
        this.$emit("finish", this.form);
      } else {
        console.log("error submit!!");
        return false;
      }
    }
  }
  created() {
    this.form = { ...this.data };
  }
}
</script>
<style lang="scss" scoped>
</style>
<style lang="scss" >
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