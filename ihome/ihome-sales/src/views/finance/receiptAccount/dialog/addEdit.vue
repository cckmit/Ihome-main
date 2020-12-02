<!--
 * @Description: 收款账号录入/修改
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-01 18:20:03
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-02 11:47:02
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="500px"
    :title="`${isAdd ? '添加' : '修改'}收款账号`"
    class="text-left"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="receipt"
      label-width="100px"
      class="text-left"
    >
      <el-form-item
        label="公司主体"
        prop="companyItem"
      >
        <el-select
          v-model="form.companyItem"
          @change="companyChange"
          value-key="id"
          clearable
        >
          <el-option
            v-for="(item) in companyList"
            :key="item.id"
            :label="item.name"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="账户名称"
        prop="accountName"
      >
        <el-input
          disabled
          v-model="form.accountName"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="账号"
        prop="accountNo"
      >
        <el-input
          v-model="form.accountNo"
          placeholder="请输入账号"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item
        label="开户银行"
        prop="branchName"
      >
        <el-input
          v-model="form.branchName"
          placeholder="请输入开户银行"
          readonly
          @click.native="dialogFormVisible = true"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="账号类型"
        prop="accountType"
      >
        <el-select
          v-model="form.accountType"
          placeholder="请选择账号类型"
          clearable
        >
          <el-option
            v-for="i in $root.dictAllList('AccountType')"
            :key="i.code"
            :value="i.code"
            :label="i.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="账户类别"
        prop="category"
      >
        <el-select
          v-model="form.category"
          placeholder="请选择账户类别"
          clearable
        >
          <el-option
            v-for="i in $root.dictAllList('AccountCategory')"
            :key="i.code"
            :value="i.code"
            :label="i.name"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        type="primary"
        @click="finish()"
      >确 定</el-button>
    </template>
    <IhDialog
      :show="dialogFormVisible"
      desc="银行网点档案库"
    >
      <BankRecord
        @cancel="() => (dialogFormVisible = false)"
        @finish="handleFinish"
      />
    </IhDialog>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import { Form as ElForm } from "element-ui";
import { noTrim } from "ihome-common/util/base/form-ui";
import BankRecord from "../../bankBranch/dialog/bankRecord.vue";
import { post_company_getAll } from "@/api/system/index";
import {
  post_bankAccount_add,
  post_bankAccount_update,
} from "@/api/finance/index";

@Component({
  components: { BankRecord },
})
export default class AddEdit extends Vue {
  @Prop() isAdd!: boolean;
  @Prop() data: any;

  private dialogVisible = true;
  private dialogFormVisible = false;
  form: any = {
    accountName: null,
    accountNo: null,
    accountType: null,
    branchName: null,
    branchNo: null,
    category: null,
    companyId: null,
    companyItem: null,
  };
  private rules: any = {
    companyItem: [
      { required: true, message: "请选择公司主体", trigger: "change" },
    ],
    accountName: [
      { required: true, message: "请选择公司主体", trigger: "change" },
    ],
    accountNo: [
      { required: true, message: "请输入账号", trigger: "change" },
      { validator: noTrim, trigger: "change" },
      {
        pattern: /^(?!\-)(?!.*\-$)[0-9\-]+$/,
        message: "只能录入数字或者中划线，不能以中划线开头或者结尾",
        trigger: "change",
      },
      { max: 32, message: "账号字符长度不能大于32", trigger: "change" },
    ],
    branchName: [
      { required: true, message: "请输入开户银行", trigger: "change" },
      { max: 64, message: "开户银行字符长度不能大于64", trigger: "change" },
    ],
    accountType: [
      { required: true, message: "请选择账号类型", trigger: "change" },
    ],
    category: [
      { required: true, message: "请选择账户类别", trigger: "change" },
    ],
  };
  private companyList: any = [];

  private companyChange(i: any) {
    this.form.companyId = i.id;
    this.form.accountName = i.name;
  }
  cancel(): void {
    this.$emit("cancel", false);
  }
  finish(): void {
    (this.$refs["receipt"] as ElForm).validate(this.submit);
  }
  handleFinish(data: any) {
    this.dialogFormVisible = false;
    this.form.branchName = data.branchName;
    this.form.branchNo = data.branchNo;
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      this.isAdd
        ? await post_bankAccount_add(this.form)
        : await post_bankAccount_update(this.form);
      this.$message.success(`${this.isAdd ? "添加" : "修改"}收款账号成功`);
      this.$emit("finish", this.isAdd);
    } else {
      return false;
    }
  }
  private async getCompanyList() {
    this.companyList = await post_company_getAll({ name: "" });
  }

  created() {
    this.getCompanyList();
    if (!this.isAdd)
      this.form = { ...this.data, companyItem: { id: this.data.companyId } };
  }
}
</script>
