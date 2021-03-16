<!--
 * @Description: 代理费开票
 * @version: 
 * @Author: ywl
 * @Date: 2021-03-15 15:32:41
 * @LastEditors: ywl
 * @LastEditTime: 2021-03-15 16:22:29
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="680px"
    :title="`${isAll ? '批量' : ''}代理费自动开票`"
    class="text-left"
  >
    <el-form
      :model="form"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm"
    >
      <!-- <el-form-item label="发票金额（含税）">发票金额（含税）</el-form-item> -->
      <template v-for="(fItem, index) in form.invoiceList">
        <el-row :key="index">
          <el-col :span="12">
            <el-form-item label="发票抬头">
              <el-input
                v-model="fItem.invoiceTitle"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发票类型">
              <el-select
                v-model="fItem.invoiceType"
                :disabled="isAgencyFee"
                placeholder="请选择发票类型"
                class="width--100"
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
        </el-row>
      </template>
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
import { post_invoice_autoZPInvoicing } from "@/api/finance/index";

@Component({})
export default class AutoInvoice extends Vue {
  @Prop({ default: false }) isAll!: boolean;
  @Prop({ default: false }) isAgencyFee!: boolean;
  @Prop() data!: any;

  private dialogVisible = true;
  private form: any = {
    invoiceList: [],
  };
  private rules: any = {
    operationType: [
      { required: true, message: "请选择发票类型", trigger: "change" },
    ],
  };
  loading = false;

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
        this.loading = true;
        let ids = this.form.invoiceList.map((i: any) => i.id);
        const res = await post_invoice_autoZPInvoicing({ ids });
        this.$message.success(`开票成功${res}条`);
        this.loading = false;
        this.$emit("finish");
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    } else {
      return false;
    }
  }

  created() {
    console.log(this.data);
    this.form.invoiceList = this.data;
    // this.form.operationType = this.data.data.operationType;
    // this.form.ids = this.data.ids;
  }
}
</script>
