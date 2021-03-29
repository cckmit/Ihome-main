<!--
 * @Description: 手工开票录入
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-08 21:04:03
 * @LastEditors: ywl
 * @LastEditTime: 2021-03-29 09:26:12
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="860px"
    title="手工开票"
    class="text-left invoice-dialog"
    top="5vh"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="ruleForm"
      label-width="145px"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="发票抬头">
            <el-input
              :value="data.invoiceTitle"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发票金额（含税）">
            <el-input
              :value="data.amount"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="确认主营（不含税）">
            <el-input
              :value="data.amount - form.tax"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="税额"
            prop="tax"
          >
            <el-input
              v-model="form.tax"
              placeholder="请输入税额"
              v-digits="2"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="发票类型"
            prop="invoiceType"
          >
            <el-select
              v-model="form.invoiceType"
              placeholder="请选择发票类型"
              :disabled="isAgencyFee"
            >
              <el-option
                v-for="(i, n) in $root.dictAllList('InvoiceType')"
                :key="n"
                :value="i.code"
                :label="i.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="开票日期"
            prop="operationDate"
          >
            <el-date-picker
              type="date"
              placeholder="选择开票日期"
              v-model="form.operationDate"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="NC凭证号"
            prop="ncCode"
          >
            <el-input
              v-model="form.ncCode"
              placeholder="请输入NC凭证号"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        v-for="(i, n) in form.invoiceNoAndInvoiceCodeMap"
        :key="n"
      >
        <el-col :span="12">
          <el-form-item
            label="发票号码"
            :prop="`invoiceNoAndInvoiceCodeMap.${n}.key`"
            :rules="[
              {required: true, message: '请输入发票号码', trigger: 'change'},
              {max: 16, message: '发票号码长度不能大于16位', trigger: 'change'},
              {pattern: /^[a-zA-Z0-9]*$/, message: '请输入字母或者数字', trigger: 'change'},
            ]"
          >
            <el-input
              v-model="i.key"
              placeholder="请输入发票号码"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="发票代码"
            class="code-item padding-right-20"
            :prop="`invoiceNoAndInvoiceCodeMap.${n}.value`"
            :rules="[
              {required: true, message: '请输入发票代码', trigger: 'change'},
              {max: 16, message: '发票代码长度不能大于16位', trigger: 'change'},
              {pattern: /^[a-zA-Z0-9]*$/, message: '请输入字母或者数字', trigger: 'change'},
            ]"
          >
            <el-input
              v-model="i.value"
              placeholder="请输入发票代码"
            ></el-input>
            <i
              :class="['add-icon', {'el-icon-circle-plus-outline': n === 0}]"
              @click="handleAdd()"
            ></i>
            <i
              :class="['add-icon', {'el-icon-circle-close': n !== 0}]"
              @click="handleRemove(n)"
            ></i>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="附件"
            required
          >
            <IhUpload
              size="100px"
              v-model="fileList"
              @newFileList="handleFile"
            ></IhUpload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="备注"
            prop="remark"
          >
            <el-input
              type="textarea"
              :rows="4"
              v-model="form.remark"
              placeholder="备注"
              maxlength="200"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        type="primary"
        @click="finish()"
        :loading="loading"
      >保 存</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import { Form as ElForm } from "element-ui";
import { post_invoice_handInvoicing } from "../../../../api/finance/index";

function checkTax(rule: any, value: any, callback: any) {
  if (Number(value) > 9999999999999.99) {
    callback(new Error("最大不能超过9999999999999.99"));
  } else {
    callback();
  }
}

@Component({})
export default class Handadel extends Vue {
  @Prop() data!: any;
  @Prop({
    default: false,
  })
  isAgencyFee!: boolean;

  private dialogVisible = true;
  private form: any = {
    attachments: [],
    invoiceId: null,
    invoiceNoAndInvoiceCodeMap: [{ key: null, value: null }],
    invoiceType: null,
    ncCode: null,
    operationDate: null,
    remark: null,
    tax: null,
  };
  private rules: any = {
    tax: [
      { required: true, message: "请输入税额", trigger: "change" },
      { validator: checkTax, trigger: "change" },
    ],
    invoiceType: [
      { required: true, message: "请选择发票类型", trigger: "change" },
    ],
    operationDate: [
      { required: true, message: "请选择开票日期", trigger: "change" },
    ],
    remark: [
      { required: true, message: "开票备注不能为空", trigger: "change" },
    ],
    ncCode: [
      { max: 32, message: "NC凭证长度不能大于32位", trigger: "change" },
      {
        pattern: /^[a-zA-Z0-9]*$/,
        message: "请输入字母或者数字",
        trigger: "change",
      },
    ],
    // attachments: [
    //   { required: true, message: "开票附件不能为空", trigger: "change" },
    // ],
  };
  fileList: any = [];
  private loading = false;

  cancel(): void {
    this.$emit("cancel", false);
  }
  finish(): void {
    (this.$refs["ruleForm"] as ElForm).validate(this.submit);
  }
  private handleFile(list: any) {
    this.form.attachments = list.map((i: any) => {
      let index = i.fileName.lastIndexOf(".");
      return {
        // fileId: i.fileId,
        // fileName: i.name,
        ...i,
        type: i.fileName.substring(index + 1, i.fileName.length),
      };
    });
  }
  private handleAdd() {
    this.form.invoiceNoAndInvoiceCodeMap.push({ key: null, value: null });
  }
  private handleRemove(index: number) {
    this.form.invoiceNoAndInvoiceCodeMap.splice(index, 1);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      if (!this.form.attachments.length) {
        this.$message.warning("开票附件不能为空");
        return;
      }
      let map: any = {};
      this.form.invoiceNoAndInvoiceCodeMap.forEach((i: any) => {
        map[i.key] = i.value;
      });
      try {
        this.loading = true;
        const res = await post_invoice_handInvoicing({
          ...this.form,
          invoiceNoAndInvoiceCodeMap: map,
        });
        this.$message.success(`手工开票成功${res}条`);
        this.loading = false;
        this.$emit("finish");
      } catch (err) {
        console.log(err);
        this.loading = false;
      }
    } else {
      return false;
    }
  }

  created() {
    this.form.tax = this.data.tax;
    this.form.invoiceId = this.data.id;
    if (this.isAgencyFee) {
      this.form.invoiceType = this.data.invoiceType;
    }
  }
}
</script>

<style lang="scss" scoped>
.invoice-dialog {
  .code-item {
    position: relative;
  }
  .add-icon {
    position: absolute;
    font-size: 25px;
    top: 8px;
    right: -30px;
    cursor: pointer;
  }
}
</style>
