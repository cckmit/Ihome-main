<!--
 * @Description: 银行账号信息弹窗
 * @version: 
 * @Author: ywl
 * @Date: 2020-10-12 10:38:48
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-13 20:17:06
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
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
        <el-input
          v-model="Bankrule.accountName"
          maxlength="64"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item
        label="账号"
        prop="accountNum"
      >
        <el-input
          v-model="Bankrule.accountNum"
          maxlength="32"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item
        label="开户银行"
        prop="bank"
      >
        <el-input
          v-model="Bankrule.bank"
          maxlength="64"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item
        label="账户类型"
        prop="type"
      >
        <el-select
          v-model="Bankrule.type"
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
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import { post_channelBank_add } from "../../../../api/channel/index";

@Component({})
export default class BankDialog extends Vue {
  @Prop({ default: null }) data: any;
  @Prop({ default: "new-add" }) bankType!: string;

  private dialogVisible = true;
  private rules: object = {
    accountName: [
      { required: true, message: "请输入账户名称", trigger: "blur" },
    ],
    accountNum: [
      { required: true, max: 32, message: "请输入账号", trigger: "blur" },
    ],
    bank: [
      { required: true, max: 64, message: "请输入开户银行", trigger: "blur" },
    ],
    bankType: [{ required: true, message: "请选择账户类型", trigger: "blur" }],
  };
  private Bankrule: any = {
    accountName: "",
    accountNum: "",
    bank: "",
    type: "",
  };

  cancel(): void {
    this.$emit("cancel", false);
  }
  finish(): void {
    (this.$refs["Bankrule"] as ElForm).validate(this.submit);
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
      }
      if (this.bankType) {
        // 是否是新增
      } else {
        post_channelBank_add(this.Bankrule);
      }
    } else {
      console.log("error submit!!");
      return false;
    }
  }

  async created() {
    this.Bankrule = this.data;
  }
}
</script>
