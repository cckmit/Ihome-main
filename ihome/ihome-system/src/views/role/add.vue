<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-09 14:08:24
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-04 18:08:46
--> 
<template>
  <el-dialog
    v-dialogDrag
    title="角色"
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
import { noTrim } from "ihome-common/util/base/form-ui";
import { post_role_add, post_role_update } from "../../api/system/index";
@Component({
  components: {},
})
export default class RoleAdd extends Vue {
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
    id: null,
    name: "",
    code: "",
  };
  rules: any = {
    name: [
      { required: true, message: "请输入名称", trigger: "change" },
      { min: 1, max: 16, message: "长度在 1 到 16 个字符", trigger: "change" },
    ],
    code: [
      { required: true, message: "请输入编码", trigger: "change" },
      { min: 1, max: 16, message: "长度在 1 到 16 个字符", trigger: "change" },
      { validator: noTrim, trigger: "change" },
    ],
  };

  cancel() {
    this.$emit("cancel", false);
  }

  async finish(formName: any) {
    (this.$refs[formName] as ElForm).validate(async (valid) => {
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
    });
  }
  resetForm(formName: any) {
    (this.$refs[formName] as ElForm).resetFields();
  }
  created() {
    this.ruleForm = this.data;
    console.log(this.data);
  }
}
</script>
<style lang="scss" scoped>
</style>