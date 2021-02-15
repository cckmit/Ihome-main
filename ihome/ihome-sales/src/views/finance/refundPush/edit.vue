<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2021-02-08 15:42:06
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-15 15:19:34
-->
<template>
  <el-dialog
    v-dialogDrag
    title="修改退款"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="800px"
    style="text-align: left"
    class="dialog"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="退款申请单编号" prop="refundApplyNo">
        <el-input v-model="ruleForm.refundApplyNo" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="支付唯一编码" prop="refundPayNo">
        <el-input v-model="ruleForm.refundPayNo" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="退款金额" prop="amount">
        <el-input v-model="ruleForm.amount" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="收款方名称" prop="refundName">
        <el-input v-model="ruleForm.refundName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="收款方帐号" prop="refundAccount">
        <el-input v-model="ruleForm.refundAccount"></el-input>
      </el-form-item>
      <el-form-item label="付款方名称" prop="companyId">
        <IhSelectPageByPayer
          clearable
          v-model="ruleForm.companyId"
          :isBlur="false"
          :search-name="ruleForm.accountName"
          @change="accountNameChange"
        ></IhSelectPageByPayer>
      </el-form-item>
      <el-form-item label="付款方帐号" prop="accountNo">
        <el-select
          v-model="ruleForm.accountNo"
          clearable
          placeholder="付款方帐号"
          class="width--100"
        >
          <el-option
            v-for="item in accountNoList"
            :key="item.id"
            :label="item.accountNo"
            :value="item.accountNo"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="结算方式" prop="settlementType">
        <el-select
          v-model="ruleForm.settlementType"
          clearable
          placeholder="结算方式"
          class="width--100"
          @change="settlementTypeChange()"
        >
          <el-option
            v-for="item in $root.dictAllList('RefundSettlementType')"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="付款方式" prop="payType">
        <el-select
          v-model="ruleForm.payType"
          clearable
          placeholder="付款方式"
          class="width--100"
          :disabled="ruleForm.settlementType == 'OnlinePay'"
        >
          <el-option
            v-for="item in $root.dictAllList('RefundPayType')"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";
import { noTrim } from "ihome-common/util/base/form-ui";
import {
  post_refundItemPush_update,
  post_bankAccount_getByOrgId__orgId,
} from "../../../api/finance/index";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";

@Component({
  components: {},
})
export default class RefundPushEdit extends Vue {
  constructor() {
    super();
  }
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  accountNoList = [];
  ruleForm: any = {
    accountNo: null,
    companyId: null,
    id: null,
    payType: null,
    refundAccount: null,
    settlementType: null,
  };
  rules: any = {
    refundAccount: [
      { validator: noTrim, trigger: "change" },
      { required: true, message: "收款方帐号必填", trigger: "change" },
    ],
    companyId: [
      { validator: noTrim, trigger: "change" },
      { required: true, message: "付款方名称必选", trigger: "change" },
    ],
    accountNo: [
      { validator: noTrim, trigger: "change" },
      { required: true, message: "付款方帐号必选", trigger: "change" },
    ],
    settlementType: [
      { validator: noTrim, trigger: "change" },
      { required: true, message: "结算方式必选", trigger: "change" },
    ],
    payType: [
      { validator: noTrim, trigger: "change" },
      { required: true, message: "付款方式必选", trigger: "change" },
    ],
  };

  cancel() {
    this.$emit("cancel", false);
  }

  async finish(formName: any) {
    (this.$refs[formName] as ElForm).validate(this.submit);
  }

  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      console.log(valid);
      await post_refundItemPush_update(this.ruleForm);
      this.$message.success("修改成功");
      this.$emit("finish", true);
    } else {
      console.log("error submit!!");
      return false;
    }
  }
  resetForm(formName: any) {
    (this.$refs[formName] as ElForm).resetFields();
  }
  async created() {
    this.ruleForm = this.$tool.deepClone(this.data);

    console.log(this.data);

    const res: any = await post_bankAccount_getByOrgId__orgId({
      orgId: this.ruleForm.companyId,
    });
    console.log(res);
    this.accountNoList = res;
  }
  settlementTypeChange() {
    if (this.ruleForm.settlementType == "OnlinePay") {
      this.ruleForm.payType = "OtherPay";
    }
  }
  async accountNameChange(data: any) {
    console.log(data);

    this.ruleForm.accountNo = null;
    if (data) {
      const res: any = await post_bankAccount_getByOrgId__orgId({
        orgId: data,
      });
      console.log(res);
      this.accountNoList = res;
    } else {
      this.accountNoList = [];
    }
  }
}
</script>
<style lang="scss" scoped>
</style>