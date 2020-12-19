<!--
 * @Description: 添加POS机弹窗
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-19 11:19:23
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-19 17:23:50
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="750px"
    :title="`${isAdd ? '录入' : '修改'}POS机信息`"
    class="text-left"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="ruleForm"
      label-width="90px"
      class="demo-ruleForm padding-left-10"
    >
      <p class="ih-info-title">POS机信息</p>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="收款账户"
            prop="account"
          >
            <el-select
              v-model="form.account"
              placeholder="请选择收款账户"
            ></el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="账号"
            prop="accountNo"
          >
            <el-input
              v-model="form.accountNo"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="产品型号"
            prop="productModel"
          >
            <el-input
              v-model="form.productModel"
              placeholder="请输入产品型号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="序列号"
            prop="serialNo"
          >
            <el-input
              v-model="form.serialNo"
              placeholder="请输入序列号"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <template v-for="(i, n) in form.merchants">
        <p
          class="ih-info-title"
          :key="n"
        >{{i.type === 'Card' ? '银行卡收款信息' : 'POS通信息'}}</p>
        <el-row :key="n + i.type">
          <el-col :span="12">
            <el-form-item
              label="商户号"
              :prop="`merchants.${n}.merchantNo`"
              :rules="[
                {required: true, message: '请输入商户号', trigger: 'change'}
              ]"
            >
              <el-input
                v-model="i.merchantNo"
                placeholder="请输入商户号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="终端号"
              :prop="`merchants.${n}.terminalNo`"
              :rules="[
                {required: true, message: '请输入终端号', trigger: 'change'}
              ]"
            >
              <el-input
                v-model="i.terminalNo"
                placeholder="请输入终端号"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
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
import { post_posTerminal_add } from "../../../../api/finance/index";

@Component({})
export default class POSAdd extends Vue {
  @Prop({ default: true }) isAdd!: boolean;
  private form: any = {
    account: null,
    accountName: null,
    accountNo: null,
    merchants: [
      {
        merchantNo: null,
        terminalNo: null,
        type: "Card",
      },
      {
        merchantNo: null,
        terminalNo: null,
        type: "Pos",
      },
    ],
    productModel: null,
    serialNo: null,
  };
  private rules: any = {
    account: [{ required: true, message: "请选择收款账号", trigger: "change" }],
    accountNo: [
      { required: true, message: "请选择收款账号", trigger: "change" },
    ],
    productModel: [
      { required: true, message: "请输入产品型号", trigger: "change" },
    ],
    serialNo: [{ required: true, message: "请输入序列号", trigger: "change" }],
  };
  private dialogVisible = true;

  cancel(): void {
    this.$emit("cancel", false);
  }
  finish(): void {
    (this.$refs["ruleForm"] as ElForm).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      try {
        await post_posTerminal_add(this.form);
        this.$message.success("添加成功");
      } catch (error) {
        console.log(error);
      }
      this.$emit("finish");
    } else {
      return false;
    }
  }
}
</script>
