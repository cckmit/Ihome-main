<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-07-08 14:23:16
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-10 18:05:47
--> 
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="500px"
    class="dialog text-left"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="账户姓名" prop="name">
            <el-input v-model="form.name" placeholder="账户姓名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="账号" prop="number">
            <el-input v-model="form.number" placeholder="账号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="开户银行" prop="name">
            <el-input v-model="form.name" placeholder="开户银行"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="账号类型">
            <el-select
              style="width: 100%"
              v-model="form.type"
              clearable
              placeholder="账号类型"
            >
              <el-option
                v-for="item in $root.displayList('accountTypes')"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";

import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import {
  emailOrNullValidato,
  phoneValidator,
} from "ihome-common/util/base/form-ui";
@Component({
  components: {},
})
export default class UserAdd extends Vue {
  constructor() {
    super();
  }
  @Prop({ default: null }) data: any;
  dialogVisible = true;

  form: any = {
    bank: null,
    name: null,
    number: null,
    type: null,
  };
  rules: any = {
    name: [
      { required: true, message: "请输入名称", trigger: "change" },
      { min: 1, max: 32, message: "长度在 1 到 32 个字符", trigger: "change" },
    ],
    mobilePhone: [
      { required: true, message: "请输入手机号码", trigger: "change" },

      { validator: phoneValidator, trigger: "change" },
    ],
    email: [
      { trigger: "change" },
      { validator: emailOrNullValidato, trigger: "change" },
    ],
  };

  cancel() {
    this.$emit("cancel", false);
  }
  finish() {
    (this.$refs["form"] as ElForm).validate(this.submit);
  }
  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      // console.log(this.form);
      // if (this.form.id > 0) {
      //   const res = await post_user_update(this.form);
      //   this.$message.success("修改成功");
      //   this.$emit("finish", res);
      // } else {
      //   const res = await post_user_add(this.form);
      //   this.$alert(res, "用户新增成功，密码是：");
      //   this.$emit("finish", res);
      // }
    } else {
      console.log("error submit!!");
      return false;
    }
  }
  async created() {
    this.form = this.data;
  }
}
</script>
<style lang="scss" scoped>
</style>
<style lang="scss" >
.ih-dialog {
  .el-form-item__content {
    margin-right: 40px;
  }
  .el-input,
  .el-select {
    width: 100%;
  }
}
</style>