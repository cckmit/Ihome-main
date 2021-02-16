<!--
 * @Description: 添加POS机弹窗
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-19 11:19:23
 * @LastEditors: ywl
 * @LastEditTime: 2021-02-16 17:08:20
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
              value-key="accountNo"
              @change="bankChange"
            >
              <el-option
                v-for="(i, n) in bankOption"
                :key="n"
                :label="i.accountName"
                :value="i"
              ></el-option>
            </el-select>
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
              disabled
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
        >{{$root.dictAllName(i.type, 'PosMerchantType')}}</p>
        <el-row :key="n + i.type">
          <el-col :span="12">
            <el-form-item
              label="商户号"
              :prop="`merchants.${n}.merchantNo`"
              :rules="[
                { required: true, message: '请输入商户号', trigger: 'change' },
                { pattern: /^[0-9]*$/, message: '只能录入数值', trigger: 'change' },
                { max: 32, message: '字符长度不能大于32', trigger: 'change' }
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
                {required: true, message: '请输入终端号', trigger: 'change'},
                { pattern: /^[0-9]*$/, message: '只能录入数值', trigger: 'change' },
                { max: 32, message: '字符长度不能大于32', trigger: 'change' }
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
import {
  post_posTerminal_add,
  post_posTerminal_update,
  get_bankAccount_getAll,
  get_posTerminal_get__id,
} from "../../../../api/finance/index";

@Component({})
export default class POSAdd extends Vue {
  @Prop({ default: true }) isAdd!: boolean;
  @Prop() data!: any;

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
      { max: 32, message: "字符长度不能大于32", trigger: "change" },
    ],
    serialNo: [
      { required: true, message: "请输入序列号", trigger: "change" },
      {
        pattern: /^[a-zA-Z0-9]*$/,
        message: "只能录入数值、大小写英文字母",
        trigger: "change",
      },
    ],
  };
  private dialogVisible = true;
  private bankOption: any = [];

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
        this.isAdd
          ? await post_posTerminal_add(this.form)
          : await post_posTerminal_update(this.form);
        this.$message.success(`${this.isAdd ? "添加" : "修改"}成功`);
        this.$emit("finish");
      } catch (error) {
        console.log(error);
      }
    } else {
      return false;
    }
  }
  private bankChange(val: any) {
    this.form.accountName = val.accountName;
    this.form.accountNo = val.accountNo;
  }
  async getAllBank() {
    this.bankOption = await get_bankAccount_getAll();
  }
  async getPosInfo(id: any) {
    const res = await get_posTerminal_get__id({ id });
    this.form.merchants = res;
  }

  created() {
    this.getAllBank();
    if (!this.isAdd) {
      this.form.account = {
        accountName: this.data.accountName,
        accountNo: this.data.accountNo,
      };
      this.form.accountName = this.data.accountName;
      this.form.accountNo = this.data.accountNo;
      this.form.productModel = this.data.productModel;
      this.form.serialNo = this.data.serialNo;
      this.form.id = this.data.id;
      this.getPosInfo(this.data.id);
    }
  }
}
</script>
