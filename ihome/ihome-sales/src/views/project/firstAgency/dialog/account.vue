<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-07-08 14:23:16
 * @LastEditors: wwq
 * @LastEditTime: 2021-05-13 18:25:31
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
    title="账户信息"
  >
    <el-form
      ref="form"
      :model="info"
      :rules="rules"
      label-width="80px"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="账户名称"
            prop="name"
          >
            <el-input
              v-model="info.name"
              placeholder="账户名称"
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
              v-model="info.number"
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
              v-model="info.bank"
              placeholder="开户银行"
              readonly
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click.native="dialogFormVisible = true"
              ></el-button>
            </el-input>
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
              v-model="info.type"
              clearable
              placeholder="账号类型"
            >
              <el-option
                v-for="item in $root.dictAllList('AccountType')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <IhDialog
      :show="dialogFormVisible"
      desc="银行网点档案库"
    >
      <BankRecord
        @cancel="() => (dialogFormVisible = false)"
        @finish="handleFinish"
      />
    </IhDialog>

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
import BankRecord from "@/components/bankRecord.vue";
@Component({
  components: {
    BankRecord,
  },
})
export default class UserAdd extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  dialogFormVisible = false;

  private info: any = {
    bank: null,
    name: null,
    number: null,
    type: null,
    bankId: null,
  };
  private rules: object = {
    name: [
      { validator: noTrim, trigger: "change" },
      { required: true, message: "请输入名称", trigger: "change" },
    ],
    number: [
      { validator: noTrim, trigger: "change" },
      { required: true, message: "请输入账号", trigger: "change" },
      { validator: isNumberOrStrikethrough, trigger: "change" },
    ],
    bank: [{ required: true, message: "请选择开户银行", trigger: "change" }],
    type: [{ required: true, message: "账号类型必选", trigger: "change" }],
  };

  handleFinish(data: any) {
    this.dialogFormVisible = false;
    this.info.bank = data.branchName;
    this.info.bankId = data.id;
  }

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
    if (Object.keys(this.data).length) {
      this.info = { ...this.data };
    }
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
