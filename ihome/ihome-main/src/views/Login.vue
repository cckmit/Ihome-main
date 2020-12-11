<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 16:44:13
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-11 14:09:36
--> 
<template >
  <div class="main">
    <el-form
      style="
        background: #eee;
        padding: 20px 20px;
        margin-top: 200px;
        width: 500px !important;
        border-radius: 5px;
        border: 1px solid #eee;
      "
      class="demo-ruleForm"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <h3 style="text-align: center; margin: 10px">登录页面</h3>
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
          :loading="loading"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
 
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { UserModule } from "../store/modules/user";
import { Form as ElForm } from "element-ui";
import { defaultMountApp } from "../setting";
@Component({
  components: {},
})
export default class Login extends Vue {
  loading: boolean = false;
  ruleForm: any = {
    username: "admin",
    password: "123456",
  };
  rules: any = {
    username: [{ required: true, message: "请输入账号", trigger: "blur" }, {}],
    password: [
      { required: true, message: "请输入密码", trigger: "blur" },
      // { min: 6, max: 30, message: "长度在最少6位", trigger: "change" },
    ],
  };
  private submitForm() {
    // that.$refs[formName].validate((valid: any)
    (this.$refs.ruleForm as ElForm).validate(async (valid: boolean) => {
      if (valid) {
        this.loading = true;
        try {
          console.log(this.ruleForm);

          const res = await UserModule.Login(this.ruleForm);

          console.log(res);

          this.loading = false;
          (window as any).location = defaultMountApp;
          // this.$router.push({
          //   path: defaultMountApp,
          // });
        } catch (error) {
          this.loading = false;
        }

        // setTimeout(() => {
        //   this.loading = false;
        //   this.$router.push({
        //     path: "/app/"
        //   });
        // }, 500);
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  }
  resetForm(formName: any) {
    const that: any = this;
    that.$refs[formName].resetFields();
  }
}
</script>
<style>
.layout-router {
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
}
.main {
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
}
.box {
  background: #eee;
  padding: 20px 20px;
  margin-top: 200px;
  width: 500px !important;
  border-radius: 5px;
  border: 1px solid #eee;
}
</style>