<!--
 * @Description: 手工开票录入
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-08 21:04:03
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-10 09:50:02
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
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发票金额（含税）">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="确认主营（不含税）">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="税额">
            <el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="发票类型">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开票日期">
            <el-select v-model="form.xx"></el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="NC凭证号">
            <el-input v-model="form.xx"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        v-for="(i, n) in form.code"
        :key="n"
      >
        <el-col :span="12">
          <el-form-item label="发票号码">
            <el-input v-model="form.xx"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="发票代码"
            class="code-item padding-right-20"
          >
            <el-input v-model="form.xx"></el-input>
            <i
              :class="['add-icon', {'el-icon-circle-plus-outline': n === 0}]"
              @click="handleAdd()"
            ></i>
            <i
              :class="['add-icon', {'el-icon-remove-outline': n !== 0}]"
              @click="handleRemove(n)"
            ></i>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="附件">
            <IhUpload
              size="100px"
              :file-list="fileList"
            ></IhUpload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input
              type="textarea"
              :rows="4"
              v-model="form.xx"
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
      >保 存</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import { Form as ElForm } from "element-ui";

@Component({})
export default class Handadel extends Vue {
  private dialogVisible = true;
  private form: any = {
    code: [{}],
  };
  private rules: any = {};
  fileList: any = [];

  cancel(): void {
    this.$emit("cancel", false);
  }
  finish(): void {
    (this.$refs["ruleForm"] as ElForm).validate(this.submit);
  }
  private handleAdd() {
    this.form.code.push({});
  }
  private handleRemove(index: number) {
    this.form.code.splice(index, 1);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      //
    } else {
      return false;
    }
  }
}
</script>

<style lang="scss" scoped>
.invoice-dialog {
  /deep/ .el-dialog {
    margin-top: 5vh !important;
  }
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
