<!--
 * @Description: 添加、修改字典类型弹窗
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-09 14:55:48
 * @LastEditors: ywl
 * @LastEditTime: 2020-11-09 16:55:58
-->
<template>
  <el-dialog
    v-dialogDrag
    :title="`${isAdd ? '添加' : '编辑'}字典类型`"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    class="text-left"
    width="500px"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="dictFrom"
      label-width="100px"
      class="text-left"
    >
      <el-form-item
        label="编码"
        prop="code"
      >
        <el-input
          v-model="form.code"
          placeholder="编码中多个单词使用驼峰写法"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="名称"
        prop="name"
      >
        <el-input
          v-model="form.name"
          placeholder="请输入名称"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        type="primary"
        @click="finish()"
      >确 定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import { Form as ElForm } from "element-ui";
import { noTrim, isChineseValidato } from "ihome-common/util/base/form-ui";

import {
  post_dict_addDictType,
  post_dict_updateDictType,
} from "@/api/system/index";

@Component({})
export default class DictTypeDialog extends Vue {
  @Prop() isAdd!: boolean;
  @Prop() data!: any;

  private dialogVisible = true;
  private form: any = {
    code: null,
    name: null,
  };
  private rules: any = {
    code: [
      { required: true, message: "请输入编码", trigger: "blur" },
      { validator: noTrim, trigger: ["change", "blur"] },
    ],
    name: [
      { required: true, message: "请输入名称", trigger: "blur" },
      { validator: isChineseValidato, trigger: ["change", "blur"] },
    ],
  };

  cancel(): void {
    this.$emit("cancel", false);
  }
  finish(): void {
    (this.$refs["dictFrom"] as ElForm).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      if (this.isAdd) {
        await post_dict_addDictType(this.form);
        this.$message.success("添加成功");
      } else {
        await post_dict_updateDictType(this.form);
        this.$message.success("修改成功");
      }
      this.$emit("finish");
    } else {
      console.log("error submit!!");
      return false;
    }
  }

  created() {
    if (this.isAdd) {
      Object.assign(this.form, {
        code: null,
        name: null,
      });
    } else {
      this.form = { ...this.data };
    }
  }
}
</script>
