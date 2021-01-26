<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 16:44:13
 * @LastEditors: zyc
 * @LastEditTime: 2021-01-26 10:37:56
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
      <h3
        style="text-align: center; margin: 10px; color: red"
        v-if="env != 'prd'"
      >
        {{ envName }}
      </h3>
      <h3 style="text-align: center; margin: 10px">居恒新房分销系统·登录</h3>

      <br />
      <el-form-item label="账号" prop="username">
        <el-input placeholder="账号" v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          placeholder="密码"
          v-model="ruleForm.password"
          type="password"
          @keyup.enter.native="submitForm('ruleForm')"
        ></el-input>
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
// import { UserModule } from "../store/modules/user";
import { Form as ElForm } from "element-ui";
import { defaultMountApp } from "../setting";
import { get_sessionUser_getSystemParam } from "../api/system/index";
import request from "ihome-common/util/api/http";
import { setToken } from "../utils/cookies";
@Component({
  components: {},
})
export default class Login extends Vue {
  loading: boolean = false;
  env = "prd";
  envName = "";
  ruleForm: any = {
    username: null,
    password: null,
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

          const auth_client = "UGM6c2FsZXMhMjAyMA==";
          let url = `/sales-api/sales-oauth2/oauth/token?grant_type=password&username=${this.ruleForm.username}&password=${this.ruleForm.password}&auth_client=${auth_client}`;
          const res: any = await request({
            url: url,
            method: "post",
          });

          // const res = await UserModule.Login(this.ruleForm);

          console.log(res);
          setToken(res.access_token);

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
  async created() {
      console.log(
      "RHeadBusinessManagement",
      this.$roleTool.RHeadBusinessManagement()
    );
    const res: any = await get_sessionUser_getSystemParam();
    if (res?.env) {
      this.env = res.env;
      this.envName = res.envName;
    }
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