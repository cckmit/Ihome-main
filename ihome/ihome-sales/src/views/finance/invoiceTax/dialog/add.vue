<!--
 * @Description: 发票税率录入修改
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-02 15:53:23
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-02 18:32:41
-->
<template>
  <!-- <IhPage> -->
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="860px"
    :title="`${isAdd ? '添加' : '修改'}发票税率`"
    class="text-left"
  >
    <div>
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        label-width="130px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="名称"
              prop="companyItem"
            >
              <el-select
                v-model="form.companyItem"
                @change="changeCompany"
                class="width--100"
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
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="纳税人识别号"
              prop="taxpayerNo"
            >
              <el-input
                v-model="form.taxpayerNo"
                placeholder="请输入纳税人识别号"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="地址"
              prop="address"
            >
              <el-input
                v-model="form.address"
                placeholder="请输入地址"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="电话"
              prop="phone"
            >
              <el-input
                v-model="form.phone"
                placeholder="请输入电话"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="税率"
              prop="taxRate"
            >
              <el-input
                v-model="form.taxRate"
                placeholder="请输入税率"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="开票员"
              prop="invoiceClerk"
            >
              <el-input
                v-model="form.invoiceClerk"
                placeholder="请输入开票员"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="收款员"
              prop="cashier"
            >
              <el-input
                v-model="form.cashier"
                placeholder="请输入收款员"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="复核人"
              prop="checker"
            >
              <el-input
                v-model="form.checker"
                placeholder="请输入复核人"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="项目名称"
              prop="itemName"
            >
              <el-input
                v-model="form.itemName"
                placeholder="请输入项目名称"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="项目单位"
              prop="itemUnits"
            >
              <el-input
                v-model="form.itemUnits"
                placeholder="请输入项目单位"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="商品分类编码"
              prop="categoryCode"
            >
              <el-input
                v-model="form.categoryCode"
                placeholder="请输入商品分类编码"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="纳税人规模"
              prop="taxScale"
            >
              <el-select
                v-model="form.taxScale"
                placeholder="请选择纳税人规模"
                class="width--100"
              >
                <el-option
                  v-for="i in $root.dictAllList('TaxScale')"
                  :key="i.code"
                  :value="i.code"
                  :label="i.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <template #footer>
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        type="primary"
        @click="finish()"
      >保 存</el-button>
    </template>
  </el-dialog>
  <!-- </IhPage> -->
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import { Form as ElForm } from "element-ui";
import { noTrim } from "ihome-common/util/base/form-ui";
import { post_company_getAll } from "@/api/system/index";
import {
  post_invoiceConfig_add,
  post_invoiceConfig_update,
} from "@/api/finance/index";

@Component({})
export default class InvoiceAdd extends Vue {
  @Prop() isAdd!: boolean;
  @Prop() data!: any;

  private dialogVisible = true;
  private form: any = {
    address: null,
    cashier: null,
    categoryCode: null,
    checker: null,
    companyId: null,
    companyName: null,
    invoiceClerk: null,
    itemName: null,
    itemUnits: null,
    phone: null,
    taxRate: null,
    taxScale: null,
    taxpayerNo: null,
    companyItem: null, // 公司主体
  };
  private rules: any = {
    companyItem: [
      { required: true, message: "请选择公司主体", trigger: "change" },
    ],
    taxpayerNo: [
      { required: true, message: "请输入纳税人识别号", trigger: "change" },
      { validator: noTrim, trigger: "change" },
      {
        max: 18,
        message: "纳税人识别号字符长度不能大于18位",
        trigger: "change",
      },
    ],
    address: [
      { required: true, message: "请输入地址", trigger: "change" },
      { validator: noTrim, trigger: "change" },
      { max: 64, message: "地址字符长度不能大于64位", trigger: "change" },
    ],
    phone: [
      { required: true, message: "请输入电话", trigger: "change" },
      { validator: noTrim, trigger: "change" },
      {
        pattern: /^[0-9\-]+$/,
        message: "电话号码格式不正确",
        trigger: "change",
      },
      { max: 16, message: "电话字符长度不能大于16位", trigger: "change" },
    ],
    taxRate: [
      { required: true, message: "请输入税率", trigger: "change" },
      { validator: noTrim, trigger: "change" },
      {
        pattern: /^\d+$|^\d*\.\d+$/g,
        message: "税率只能数值和小数点",
        trigger: "change",
      },
      { max: 8, message: "税率字符长度不能大于8位", trigger: "change" },
    ],
    invoiceClerk: [
      { required: true, message: "请输入开票员", trigger: "change" },
      { validator: noTrim, trigger: "change" },
      { max: 16, message: "开票员字符长度不能大于16位", trigger: "change" },
    ],
    cashier: [
      { required: true, message: "请输入收款员", trigger: "change" },
      { validator: noTrim, trigger: "change" },
      { max: 16, message: "收款员字符长度不能大于16位", trigger: "change" },
    ],
    checker: [
      { required: true, message: "请输入复核人", trigger: "change" },
      { validator: noTrim, trigger: "change" },
      { max: 16, message: "复核人字符长度不能大于16位", trigger: "change" },
    ],
    itemName: [
      { required: true, message: "请输入项目名称", trigger: "change" },
      { validator: noTrim, trigger: "change" },
      { max: 32, message: "项目名称字符长度不能大于32位", trigger: "change" },
    ],
    itemUnits: [
      { required: true, message: "请输入项目单位", trigger: "change" },
      { validator: noTrim, trigger: "change" },
      { max: 16, message: "项目单位字符长度不能大于16位", trigger: "change" },
    ],
    categoryCode: [
      { required: true, message: "请输入商品分类编码", trigger: "change" },
      { validator: noTrim, trigger: "change" },
      {
        max: 16,
        message: "商品分类编码字符长度不能大于16位",
        trigger: "change",
      },
    ],
    taxScale: [
      { required: true, message: "请选择纳税人规模", trigger: "change" },
    ],
  };
  private companyList: any = [];

  private changeCompany(i: any) {
    this.form.companyId = i.id;
    this.form.companyName = i.name;
    this.form.taxpayerNo = i.creditCode;
    this.form.address = i.address;
  }
  cancel(): void {
    this.$emit("cancel", false);
  }
  finish(): void {
    (this.$refs["ruleForm"] as ElForm).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      this.isAdd
        ? await post_invoiceConfig_add(this.form)
        : await post_invoiceConfig_update(this.form);
      this.$message.success(`${this.isAdd ? "添加" : "修改"}发票税率成功`);
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
