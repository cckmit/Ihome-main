<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-01-16 17:16:53
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-08 11:51:06
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="700px"
    class="splitdialog text-left"
    title="修改付款"
  >
    <el-form
      ref="form"
      :model="info"
      :rules="rules"
      label-width="150px"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="付款申请单编号:"
            prop="applyCode"
          >
            <el-input
              v-model="info.applyCode"
              placeholder="付款申请单编号"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="付款结算单号:"
            prop="settlementCode"
          >
            <el-input
              v-model="info.settlementCode"
              placeholder="付款结算单号"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="付款金额:"
            prop="actualAmount"
          >
            <el-input
              v-model="info.actualAmount"
              placeholder="付款金额"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="收款方名称:"
            prop="agencyName"
          >
            <el-input
              v-model="info.agencyName"
              placeholder="收款方名称"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="渠道收款账号"
            prop="receiveAccount"
          >
            <el-select
              v-model="info.receiveAccount"
              clearable
              placeholder="请选择账号"
              class="width--100"
            >
              <el-option
                v-for="item in channelAccountOptions"
                :key="item.id"
                :label="item.accountNo"
                :value="item.accountNo"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="付款方名称:"
            prop="companyName"
          >
            <IhSelectPageByPayer
              clearable
              v-model="info.companyId"
              :proId="info.belongOrgId"
              :search-name="info.companyName"
              @changeOption="getPayerInfo"
            ></IhSelectPageByPayer>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="付款方帐号:"
            prop="paymentAccount"
          >
            <el-select
              v-model="info.paymentAccount"
              clearable
              placeholder="请选择付款方帐号"
              class="width--100"
            >
              <el-option
                v-for="item in payerAccountOptions"
                :key="item.id"
                :label="item.accountNo"
                :value="item.accountNo"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="结算方式"
            prop="settlementMethod"
          >
            <el-select
              style="width: 100%"
              v-model="info.settlementMethod"
              placeholder="请选择结算方式"
              @change="settlementMethodChange"
            >
              <el-option
                v-for="item in $root.dictAllList('SettlementMethod')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="付款方式"
            prop="paymentMethod"
          >
            <el-select
              style="width: 100%"
              v-model="info.paymentMethod"
              placeholder="请选择付款方式"
              :disabled="paymentMethodDisabled"
            >
              <el-option
                v-for="item in $root.dictAllList('PaymentMethod')"
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
        :loading="editLoading"
        type="primary"
        @click="finish()"
      >保 存</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import { get_channel_get__id } from "@/api/channel/index";
import { post_payDetail_update } from "@/api/payoff";
import { post_bankAccount_getByOrgId__orgId } from "@/api/finance/index";
@Component({
  components: {},
})
export default class Edit extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  channelAccountOptions: any = [];
  paymentMethodDisabled: any = false;
  makingInfo: any = {};
  editLoading: any = false;

  info: any = {
    applyCode: null,
    settlementCode: null,
    actualAmount: null,
    agencyName: null,
    receiveAccount: null,
    companyId: null,
    companyName: null,
    paymentAccount: null,
    settlementMethod: null,
    paymentMethod: null,
  };
  payerAccountOptions: any = [];
  private rules: object = {
    receiveAccount: [
      { required: true, message: "请选择渠道收款账号", trigger: "change" },
    ],
    companyName: [
      { required: true, message: "请选择付款方名称", trigger: "change" },
    ],
    paymentAccount: [
      { required: true, message: "请选择付款方帐号", trigger: "change" },
    ],
    settlementMethod: [
      { required: true, message: "请选择结算方式", trigger: "change" },
    ],
    paymentMethod: [
      { required: true, message: "请选择付款方式", trigger: "change" },
    ],
  };

  async getPayerInfo(item: any) {
    this.info.payerName = item.companyName;
    const res = await post_bankAccount_getByOrgId__orgId({
      orgId: this.info.payerId,
    });
    this.payerAccountOptions = res;
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
      this.editLoading = true;
      try {
        await post_payDetail_update(this.info);
        this.editLoading = false;
        this.$emit("finish");
      } catch (err) {
        this.editLoading = false;
      }
    } else {
      console.log("error submit!!");
      return false;
    }
  }

  settlementMethodChange(val: any) {
    if (val === "OnlineBanking") {
      this.paymentMethodDisabled = true;
      this.info.paymentMethod = "Other";
    } else {
      this.paymentMethodDisabled = false;
      this.info.paymentMethod = "Cash";
    }
  }

  async created() {
    this.info = { ...this.data };
    const res = await get_channel_get__id({ id: this.info.agencyId });
    this.channelAccountOptions = res.channelBanks;
    const item = await post_bankAccount_getByOrgId__orgId({
      orgId: this.info.payerId,
    });
    this.payerAccountOptions = item;
    this.settlementMethodChange(this.info.settlementMethod);
  }
}
</script>
<style lang="scss" scoped>
.splitdialog {
  /deep/ .el-dialog {
    margin-top: 8vh !important;
  }
}
</style>