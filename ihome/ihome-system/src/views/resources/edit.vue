<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-07 10:29:16
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-06 11:24:40
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
      <el-form-item label="URL" :prop="ruleForm.type=='Menu'||ruleForm.type=='Api'?'url':null">
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
import { getListTool, modular } from "../../util/enums/dic";
import { post_resource_update } from "../../api/system/index";
import { isUpperLetterValidato } from "ihome-common/util/base/form-ui";
@Component({
  components: {},
})
export default class ResourcesEdit extends Vue {
  constructor() {
    super();
  }
  @Prop({ default: null }) data: any;
  dialogVisible = true;

  get typeList() {
    let list = getListTool(modular);
    return list;
  }

  // ruleForm: any = {
  //   type: DictionariesModule.defaultModular,
  //   name: "",
  //   parentCode: "M.NEWSALES.SYSTEM.USER",
  //   code: "",
  //   url: "",
  // };
  ruleForm: any = {
    code: "",
    id: 0,
    name: "",
    parentId: 0,
    parentCode: null,
    type: "",
    url: "",
  };
  rules: any = {
    type: [{ required: true, message: "请选择类型", trigger: "change" }],
    name: [
      { required: true, message: "请输入名称", trigger: "change" },
      { min: 1, max: 16, message: "长度在 1 到 16 个字符", trigger: "change" },
    ],
    code: [
      { required: true, message: "请输入编码", trigger: "change" },
      { min: 1, max: 16, message: "长度在 1 到 16 个字符", trigger: "change" },
      { validator: isUpperLetterValidato, trigger: "change" },
    ],
    url: [
      { required: true, message: "请输入URL", trigger: "change" },
      { validator: this.validateUrl, trigger: "change" },
    ],
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

  async finish(formName: any) {
    (this.$refs[formName] as ElForm).validate(async (valid) => {
      if (valid) {
        console.log(this.ruleForm);
        let p = {
          code: this.ruleForm.code,
          id: this.ruleForm.id,
          name: this.ruleForm.name,
          parentId: this.ruleForm.parentId,
          type: this.ruleForm.type,
          url: this.ruleForm.url,
        };
        await post_resource_update(p);
        this.$message({
          type: "success",
          message: "修改成功!",
        });
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
    this.ruleForm = this.$tool.deepClone(this.data);
    this.ruleForm.code = this.ruleForm.codeSuffix; //codeSuffix和code做转换
  }
}
</script>
<style lang="scss" scoped>
</style>