<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2021-02-08 15:42:06
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-08 15:52:00
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
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="编码" prop="code">
        <el-input v-model="ruleForm.code"></el-input>
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
import { noTrim, isLetterValidato } from "ihome-common/util/base/form-ui";
import { post_role_add, post_role_update } from "@/api/system/index";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
function startR(rule: any, value: any, callback: any) {
  if (value.startsWith("R")) {
    callback();
  } else {
    callback(new Error("必须以R开头"));
    return;
  }
}
@Component({
  components: {},
})
export default class RoleAdd extends Vue {
  constructor() {
    super();
  }
  @Prop({ default: null }) data: any;
  dialogVisible = true;

  ruleForm: any = {
    id: null,
    name: "",
    code: "",
  };
  rules: any = {
    name: [
      { validator: noTrim, trigger: "change" },
      { required: true, message: "请输入名称", trigger: "change" },
      { min: 1, max: 16, message: "长度在 1 到 16 个字符", trigger: "change" },
    ],
    code: [
      { validator: noTrim, trigger: "change" },
      { required: true, message: "请输入编码", trigger: "change" },
      { min: 1, max: 32, message: "长度在 1 到 32 个字符", trigger: "change" },
      { validator: startR, trigger: "change" },
      { validator: isLetterValidato, trigger: "change" },
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
      console.log(this.ruleForm);
      if (this.ruleForm.id > 0) {
        const res = await post_role_update(this.ruleForm);
        this.$message.success("修改成功");
        this.$emit("finish", res);
      } else {
        const res = await post_role_add(this.ruleForm);
        this.$message.success("添加成功");
        this.$emit("finish", res);
      }
    } else {
      console.log("error submit!!");
      return false;
    }
  }
  resetForm(formName: any) {
    (this.$refs[formName] as ElForm).resetFields();
  }
  created() {
    this.ruleForm = this.$tool.deepClone(this.data);
    console.log(this.data);
  }
}
</script>
<style lang="scss" scoped>
</style>