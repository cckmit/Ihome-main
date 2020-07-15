<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-07 10:29:16
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-15 09:34:10
--> 
 
<template>
  <el-dialog
  v-dialogDrag
    title="资源编辑"
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
      <el-form-item label="资源名称">
        <div>{{data.name}}</div>
      </el-form-item>
      <el-form-item label="父编码" prop="parentCode">
        <div>{{ruleForm.parentCode}}</div>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择类型">
          <el-option
            v-for="(item,index) in typeList"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="编码" prop="code">
        <el-input v-model="ruleForm.code"></el-input>
      </el-form-item>
      <el-form-item label="URL" :prop="ruleForm.type=='1'||ruleForm.type=='3'?'url':null">
        <el-input type="url" v-model="ruleForm.url"></el-input>
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
export default class ResourcesEdit extends Vue {
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
    type: DictionariesModule.defaultModular,
    name: "",
    parentCode: "M.NEWSALES.SYSTEM.USER",
    code: "",
    url: ""
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
    ],
    url: [
      { required: true, message: "请输入URL", trigger: "change" },
      { validator: this.validateUrl, trigger: "change" }
    ]
  };
  validateUrl(rule: any, value: any, callback: any) {
    //const reg = /[-A-Za-z0-9]/;
    // if (!reg.test(value)) {
    //   callback(new Error("url只能包含【字母,数字,/,-,_】"));
    // } else
    if (value.length > 64) {
      callback(new Error("url不能超过64字符"));
    } else {
      callback();
    }
  }

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
  resetForm(formName: any) {
    (this.$refs[formName] as ElForm).resetFields();
  }
  created() {
    console.log(this.data);
  }
}
</script>
<style lang="scss" scoped>
</style>