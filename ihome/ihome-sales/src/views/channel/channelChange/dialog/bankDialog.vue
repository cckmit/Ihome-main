<!--
 * @Description: 银行账号信息弹窗
 * @version: 
 * @Author: ywl
 * @Date: 2020-10-12 10:38:48
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-01 15:10:23
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    :title="bankType === 'new-add' ? '添加银行账户信息' : '编辑银行账户信息'"
    width="500px"
  >
    <el-form
      :model="Bankrule"
      :rules="rules"
      ref="Bankrule"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item
        label="账户名称"
        prop="accountName"
      >
        <el-input v-model="Bankrule.accountName"></el-input>
      </el-form-item>
      <el-form-item
        label="账号"
        prop="accountNo"
      >
        <el-input v-model="Bankrule.accountNo"></el-input>
      </el-form-item>
      <el-form-item
        label="开户银行"
        prop="branchName"
      >
        <el-input
          v-model="Bankrule.branchName"
          readonly
          @click.native="dialogFormVisible = true"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="联行号"
        prop="branchNo"
      >
        <el-input
          v-model="Bankrule.branchNo"
          readonly
          @click.native="dialogFormVisible = true"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="账户类型"
        prop="accountType"
      >
        <el-select
          v-model="Bankrule.accountType"
          clearable
          placeholder="请选择"
          class="width--100"
        >
          <el-option
            v-for="item in $root.dictAllList('AccountEnum')"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        type="primary"
        @click="finish()"
      >确 定</el-button>
    </div>
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
import { Form as ElForm } from "element-ui";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import { noTrim, isNumberValidato } from "ihome-common/util/base/form-ui";
// import { post_channelBank_add } from "@/api/channel/index";
import BankRecord from "./bankRecord.vue";

@Component({
  components: { BankRecord },
})
export default class BankDialog extends Vue {
  @Prop({ default: null }) data: any;
  @Prop({ default: "new-add" }) bankType!: string;

  private dialogVisible = true;
  private rules: object = {
    accountName: [
      { required: true, message: "请输入账户名称", trigger: "change" },
      { validator: noTrim, trigger: "change" },
      { max: 64, message: "字符长度不能大于64", trigger: "change" },
    ],
    accountNo: [
      { required: true, message: "请输入账号", trigger: "change" },
      { validator: noTrim, trigger: "change" },
      { validator: isNumberValidato, trigger: "change" },
      { max: 32, message: "字符长度不能大于32", trigger: "change" },
    ],
    accountType: [
      { required: true, message: "请选择账户类型", trigger: "change" },
    ],
    branchName: [
      { required: true, message: "请选择开户银行", trigger: "change" },
    ],
    branchNo: [{ required: true, message: "请选择联行号", trigger: "change" }],
  };
  private Bankrule: any = {
    accountName: null,
    accountNo: null,
    accountType: null,
    branchName: null,
    branchNo: null,
  };
  private dialogFormVisible = false;

  cancel(): void {
    this.$emit("cancel", false);
  }
  finish(): void {
    (this.$refs["Bankrule"] as ElForm).validate(this.submit);
  }
  handleFinish(data: any) {
    this.dialogFormVisible = false;
    this.Bankrule.branchName = data.branchName;
    this.Bankrule.branchNo = data.branchNo;
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      switch (this.bankType) {
        case "new-add":
          // 新添加数据
          this.$emit("finish", this.Bankrule, this.bankType);
          break;
        case "new-edit":
          this.$emit("finish", this.Bankrule, this.bankType);
          break;
      }
    } else {
      console.log("error submit!!");
      return false;
    }
  }

  created() {
    this.Bankrule = this.data;
  }
}
</script>
