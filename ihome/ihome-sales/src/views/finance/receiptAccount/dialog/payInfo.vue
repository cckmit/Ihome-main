<!--
 * @Description: 在线支付信息维护弹窗
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-02 11:31:40
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-02 14:45:47
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="500px"
    title="在线支付信息维护"
    class="text-left"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="payInfo"
      label-width="100px"
      class="text-left"
    >
      <el-form-item label="账户名称">
        {{data.accountName}}
      </el-form-item>
      <el-form-item label="账户">
        {{data.accountNo}}
      </el-form-item>
      <el-form-item
        label="商户ID"
        prop="merId"
      >
        <el-input
          v-model="form.merId"
          placeholder="请输入商户ID"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="秘钥"
        prop="secret"
      >
        <el-input
          v-model="form.secret"
          placeholder="请输入秘钥"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="对账账号"
        prop="checkUser"
      >
        <el-input
          v-model="form.checkUser"
          placeholder="请输入对账账号"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="对账密码"
        prop="checkPasswd"
      >
        <el-input
          v-model="form.checkPasswd"
          placeholder="请输入对账密码"
        ></el-input>
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
import { noTrim } from "ihome-common/util/base/form-ui";
import { post_accountOnlinePay_add } from "@/api/finance/index";

@Component({})
export default class PayInfo extends Vue {
  @Prop() data: any;

  private dialogVisible = true;
  form: any = {
    accountId: null,
    checkUser: null,
    merId: null,
    secret: null,
    checkPasswd: null,
  };
  private rules: any = {
    merId: [
      { required: true, message: "请输入商户ID", trigger: "change" },
      { validator: noTrim, trigger: "change" },
      {
        pattern: /^[a-zA-Z0-9]*$/,
        message: "请输入字母或者数字",
        trigger: "change",
      },
      { max: 16, message: "商户ID字符长度不能大于16位", trigger: "change" },
    ],
    secret: [
      { required: true, message: "请输入秘钥", trigger: "change" },
      { validator: noTrim, trigger: "change" },
      {
        pattern: /^[a-zA-Z0-9]*$/,
        message: "请输入字母或者数字",
        trigger: "change",
      },
      { max: 32, message: "秘钥字符长度不能大于32位", trigger: "change" },
    ],
    checkUser: [
      { required: true, message: "请输入对账账号", trigger: "change" },
      { validator: noTrim, trigger: "change" },
      {
        pattern: /^[a-zA-Z0-9]*$/,
        message: "请输入字母或者数字",
        trigger: "change",
      },
      { max: 16, message: "对账账号字符长度不能大于16位", trigger: "change" },
    ],
    checkPasswd: [
      { required: true, message: "请输入对账密码", trigger: "change" },
      { validator: noTrim, trigger: "change" },
      { max: 16, message: "对账密码字符长度不能大于16位", trigger: "change" },
    ],
  };

  cancel(): void {
    this.$emit("cancel", false);
  }
  finish(): void {
    (this.$refs["payInfo"] as ElForm).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      await post_accountOnlinePay_add(this.form);
      this.$message.success("保存成功");
      this.$emit("finish");
    } else {
      return;
    }
  }

  created() {
    this.form.accountId = this.data.id;
  }
}
</script>
