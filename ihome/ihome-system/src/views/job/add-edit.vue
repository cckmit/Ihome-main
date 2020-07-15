<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-14 09:48:18
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-15 09:33:22
--> 
<template>
  <el-dialog
  v-dialogDrag
    title="岗位"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="800px"
    style="text-align: left;"
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
      <el-form-item label="描述" prop="describe">
        <el-input type="textarea" show-word-limit maxlength="64" v-model="ruleForm.describe"></el-input>
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
import { DictionariesModule } from "../../store/modules/dictionaries";
@Component({
  components: {}
})
export default class JobAddEdit extends Vue {
  constructor() {
    super();
  }
  @Prop({ default: null }) data: any;
  dialogVisible = true;

  get typeList() {
    DictionariesModule.getModular();
    return DictionariesModule.modular;
  }

  ruleForm: any = {
    code: "",
    name: "",
    describe: null
  };
  rules: any = {
    type: [{ required: true, message: "请选择类型", trigger: "change" }],
    name: [
      { required: true, message: "请输入名称", trigger: "change" },
      { min: 1, max: 16, message: "长度在 1 到 16 个字符", trigger: "change" }
    ],
    code: [
      { required: true, message: "请输入编码", trigger: "change" },
      { min: 1, max: 16, message: "长度在 1 到 16 个字符", trigger: "change" }
    ]
  };

  cancel() {
    this.$emit("cancel", false);
  }

  finish(formName: any) {
    (this.$refs[formName] as ElForm).validate(valid => {
      if (valid) {
        alert("submit!");
        console.log(this.ruleForm);
        this.$emit("finish", {});
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  }

  created() {
    console.log(this.data);
    this.ruleForm = this.data;
  }
}
</script>
<style lang="scss" scoped>
</style>