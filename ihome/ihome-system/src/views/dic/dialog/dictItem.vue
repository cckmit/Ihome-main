<!--
 * @Description: 添加、修改字典弹窗
 * @version: 
 * @Author: ywl
 * @Date: 2020-11-09 15:15:30
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-07 15:21:58
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
      <el-form-item label="字典类型">
        <el-select v-model="form.type">
          <el-option
            v-for="item in select"
            :key="item.id"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </el-form-item>
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
      <el-form-item
        label="子类型"
        prop="subType"
      >
        <el-input
          v-model="form.subType"
          placeholder="子类型中多个单词使用驼峰写法"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="标签"
        prop="tag"
      >
        <el-input
          v-model="form.tag"
          placeholder="多个标签使用逗号分隔"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="顺序"
        prop="seq"
      >
        <el-input-number
          v-model="form.seq"
          :min="1"
          :max="99"
          class="width--100"
        ></el-input-number>
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
import { Form as ElForm } from "element-ui";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import { noTrim } from "ihome-common/util/base/form-ui";

import { post_dict_add, post_dict_update } from "@/api/system/index";

@Component({})
export default class DictItemDialog extends Vue {
  @Prop() isAdd!: boolean;
  @Prop() data!: any;
  @Prop() select!: any;

  private dialogVisible = true;
  private form: any = {
    code: null,
    name: null,
    seq: 1,
    subType: null,
    tag: null,
    type: null,
  };
  private rules: any = {
    code: [
      { required: true, message: "请输入编码", trigger: "blur" },
      { validator: noTrim, trigger: ["change", "blur"] },
      { pattern: /([A-Z])([a-z0-9]+)/, message: "请首字母大写，使用驼峰命名" },
    ],
    name: [
      { required: true, message: "请输入名称", trigger: "blur" },
      { validator: noTrim, trigger: ["change", "blur"] },
      // { validator: isChineseValidato, trigger: ["change", "blur"] },
    ],
    subType: [
      { validator: noTrim, trigger: ["change", "blur"] },
      { pattern: /([A-Z])([a-z0-9]+)/, message: "请首字母大写，使用驼峰命名" },
    ],
    tag: [{ validator: noTrim, trigger: ["change", "blur"] }],
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
        await post_dict_add(this.form);
        this.$message.success("添加成功");
      } else {
        await post_dict_update(this.form);
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
        seq: 1,
        subType: null,
        tag: null,
        type: null,
        ...this.data,
      });
    } else {
      console.log(this.isAdd, this.data);
      this.form = { ...this.data };
    }
  }
}
</script>
