<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-01-16 15:10:14
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-16 17:17:16
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
    title="拆分付款单"
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
            label="收款方帐号:"
            prop="receiveAccount"
          >
            <el-input
              v-model="info.receiveAccount"
              placeholder="收款方帐号"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="付款方名称:"
            prop="companyName"
          >
            <el-input
              v-model="info.companyName"
              placeholder="付款方名称"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="付款方帐号:"
            prop="paymentAccount"
          >
            <el-input
              v-model="info.paymentAccount"
              placeholder="付款方帐号"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <template v-for="(item, i) in info.splitAmounts">
        <el-row :key="i">
          <el-col
            :span="24"
            class="amountClass"
          >
            <el-form-item
              :label="i === 0 ? '拆分金额:' : ''"
              :prop="`splitAmounts.${i}.num`"
              :rules="[
               {required: true, message: '请输入拆分金额', trigger: 'change'}
              ]"
            >
              <el-input
                v-model="item.num"
                placeholder="拆分金额"
                v-digits="2"
              ></el-input>
              <i
                class="el-icon-delete deletes"
                v-if="i !== 0"
                @click="delNum(i)"
              ></i>
            </el-form-item>
          </el-col>
        </el-row>
      </template>

      <el-row>
        <el-col :span="24">
          <el-form-item>
            <el-button
              style="width: 100%"
              @click="addSplitAmounts"
            >
              <i class="el-icon-circle-plus-outline"></i>
              添加拆分
            </el-button>
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
      >保 存</el-button>
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
export default class Split extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;

  private info: any = {
    applyCode: null,
    settlementCode: null,
    actualAmount: null,
    agencyName: null,
    receiveAccount: null,
    companyName: null,
    paymentAccount: null,
    splitAmounts: [],
  };
  private rules: object = {
    // name: [{ required: true, message: "请输入名称", trigger: "change" }],
    // number: [{ required: true, message: "请输入账号", trigger: "change" }],
    // bank: [{ required: true, message: "请选择开户银行", trigger: "change" }],
    // type: [{ required: true, message: "账号类型必选", trigger: "change" }],
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
      let obj: any = {};
      obj = {
        ...this.info,
        splitAmounts: this.info.splitAmounts.map((v: any) => Number(v.num)),
      };
      this.$emit("finish", obj);
    } else {
      console.log("error submit!!");
      return false;
    }
  }

  addSplitAmounts() {
    this.info.splitAmounts.push({
      num: "",
    });
  }

  delNum(i: number) {
    this.info.splitAmounts.splice(i, 1);
  }

  async created() {
    this.info = { ...this.data, splitAmounts: [{ num: "" }] };
  }
}
</script>
<style lang="scss" scoped>
.splitdialog {
  /deep/ .el-dialog {
    margin-top: 8vh !important;
  }
}

.amountClass {
  position: relative;
  .deletes {
    font-size: 20px;
    position: absolute;
    right: -30px;
    top: 10px;
    cursor: pointer;
  }
}
</style>