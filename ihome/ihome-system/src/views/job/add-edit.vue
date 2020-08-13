<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-14 09:48:18
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-13 10:27:20
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
      <el-form-item label="描述" prop="remark">
        <el-input type="textarea" show-word-limit maxlength="128" v-model="ruleForm.remark"></el-input>
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
import { post_job_add, post_job_update } from "../../api/system/index";
@Component({
  components: {},
})
export default class JobAddEdit extends Vue {
  constructor() {
    super();
  }
  @Prop({ default: null }) data: any;
  dialogVisible = true;

 
  ruleForm: any = {
    id: 0,
    code: null,
    name: null,
    remark: null,
  };
  rules: any = {
    type: [{ required: true, message: "请选择类型", trigger: "change" }],
    name: [
      { required: true, message: "请输入名称", trigger: "change" },
      { min: 1, max: 16, message: "长度在 1 到 16 个字符", trigger: "change" },
    ],
    code: [
      { required: true, message: "请输入编码", trigger: "change" },
      { min: 1, max: 32, message: "长度在 1 到 32 个字符", trigger: "change" },
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
          const res = await post_job_update(this.ruleForm);
          this.$message.success("操作成功");
          this.$emit("finish", res);
        } else {
          const res = await post_job_add(this.ruleForm);
          this.$message.success("操作成功.");

          this.$emit("finish", res);
        }
      } else {
        this.$message.warning("请先填好数据");
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