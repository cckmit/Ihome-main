<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-07-08 14:23:16
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-19 15:07:51
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
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="账户姓名" prop="name">
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
          <el-form-item label="账号" prop="number">
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
          <el-form-item label="开户银行" prop="bank">
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
          <el-form-item label="账号类型">
            <el-select
              style="width: 100%"
              v-model="form.type"
              clearable
              placeholder="账号类型"
            >
              <el-option
                v-for="item in $root.dictAllList('BankAccountTypeEnum')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish()">确 定</el-button>
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
    bank: null,
    name: null,
    number: null,
    type: null,
  };
  rules: any = {
    name: [{ required: true, message: "请输入名称", trigger: "blur" }],
    number: [{ required: true, message: "请输入账号", trigger: "blur" }],
    bank: [{ required: true, message: "请输入开户银行", trigger: "blur" }],
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
