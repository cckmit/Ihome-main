<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-07-08 14:23:16
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-11 09:25:13
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
            label="账户姓名"
            prop="name"
          >
            <el-input
              v-model="form.name"
              placeholder="账户姓名"
              maxlength="64"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item
            label="账号"
            prop="number"
          >
            <el-input
              v-model="form.number"
              placeholder="账号"
              maxlength="32"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item
            label="开户银行"
            prop="bank"
          >
            <el-input
              v-model="form.bank"
              placeholder="开户银行"
              maxlength="64"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item
            label="账号类型"
            prop="type"
          >
            <el-select
              style="width: 100%"
              v-model="form.type"
              clearable
              placeholder="账号类型"
            >
              <el-option
                v-for="item in $root.dictAllList('BankAccountType')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
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
function isNumberOrStrikethrough(rule: any, value: any, callback: any) {
  let reg = /[0-9]|-$/;
  if (value != "" && !reg.test(value)) {
    callback(new Error("只能输入数字或-，以数字开头"));
    return;
  } else {
    if (value.startsWith("-") || value.endsWith("-")) {
      callback(new Error("不能以-开头和结尾"));
      return;
    } else {
      callback();
    }
  }
}
import { Component, Vue, Prop } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";
import { noTrim } from "ihome-common/util/base/form-ui";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
@Component({
  components: {},
})
export default class UserAdd extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;

  form: any = {
    bank: null,
    name: null,
    number: null,
    type: null,
  };
  rules: any = {
    name: [
      { validator: noTrim, trigger: "change" },
      { required: true, message: "请输入名称", trigger: "change" },
    ],
    number: [
      { validator: noTrim, trigger: "change" },
      { required: true, message: "请输入账号", trigger: "change" },
      { validator: isNumberOrStrikethrough, trigger: "change" },
    ],
    bank: [
      { validator: noTrim, trigger: "change" },
      { required: true, message: "请输入开户银行", trigger: "change" },
    ],
    type: [{ required: true, message: "账号类型必选", trigger: "change" }],
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
