<!--
 * @Description:
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 16:44:13
 * @LastEditors: lsj
 * @LastEditTime: 2021-03-18 19:26:11
--> 
<template >
  <div class="main login-bg">
    <div class="login-wrapper">
      <div class="title margin-20">
        <img src="../assets/img/login/title-zh.png" width="310px" height="46px">
      </div>
      <div class="title margin-47">
        <img src="../assets/img/login/title-en.png" width="310px" height="14px">
      </div>
      <div class="login-form">
        <div class="login-tip">
          用户登录
          <span v-if="env !== 'prd'" style="color: red">({{ envName }})</span>
        </div>
        <div class="form-wrapper">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px">
            <el-form-item label="" prop="username" label-width="0">
              <el-input placeholder="账号" v-model="ruleForm.username">
                <img
                  class="icon-img"
                  slot="prefix"
                  src="../assets/img/login/user-icon.png"
                  width="24px" height="24px">
              </el-input>
            </el-form-item>
            <el-form-item label="" prop="password" label-width="0">
              <el-input
                placeholder="密码"
                v-model="ruleForm.password"
                type="password"
                @keyup.enter.native="submitForm('ruleForm')">
                <img
                  class="icon-img"
                  slot="prefix"
                  src="../assets/img/login/pwd-icon.png"
                  width="24px" height="24px">
              </el-input>
            </el-form-item>
            <el-form-item label-width="0">
              <el-button
                class="btn"
                type="success"
                @click="submitForm('ruleForm')"
                :loading="loading"
              >登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
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
 
    const res: any = await get_sessionUser_getSystemParam();
    if (res?.env) {
      this.env = res.env;
      this.envName = res.envName;
    }
  }
}
</script>
<style lang="scss">
.login-bg {
  background-image: url('../assets/img/login/login-bg.jpg');
  zoom: 1;
  background-size: 100% 100%;
  background-position: center;
  position: relative;
  top: 0;
  left: 0;
  align-items: normal !important;

  .login-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    //margin-left: 98px;
    //margin-bottom: 190px;

    .title {
      text-align: center;
    }
    .margin-20 {
      box-sizing: border-box;
      margin-bottom: 20px;
      //margin-bottom: 1.94%;
    }

    .margin-47 {
      box-sizing: border-box;
      margin-bottom: 47px;
      //margin-bottom: 4.35%;
    }

    .login-form {
      //width: 621px;
      width: 32.9%;
      //width: 100%;
      height: 431px;
      //height: 40.54%;
      background-image: url('../assets/img/login/login-form-bg.png');
      zoom: 1;
      background-size: 100% 100%;
      background-position: center;
      //position: relative;

      .login-tip {
        //width: 147px;
        width: 100%;
        height: 30px;
        //height: 6.86%;
        font-size: 32px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #85F2FB;
        line-height: 25px;
        text-align: center;
        box-sizing: border-box;
        margin-top: 40px;
        //margin-top: 8.92%;
        //position: absolute;
      }

      .form-wrapper {
        width: 100%;
        box-sizing: border-box;
        //position: absolute;
        //margin-top: 107px;
        margin-top: 37px;
        //margin-top: 24.26%;
        padding: 0px 58px;
        //padding: 0px 9.19%;

        /deep/.el-form-item {
          margin-bottom: 24px;
          //margin-bottom: 2.42%;
        }

        /deep/.el-input__inner {
          //width: 515px;
          width: 100%;
          height: 56px;
          //height: 12.77%;
          background: #003B99 !important;
          border: 1px solid #85F2FB !important;;
          opacity: 0.7;
          font-size: 18px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #85F2FB;
          line-height: 25px;
          padding-left: 62px;
          //padding-left: 18.6%;
        }

        /deep/.el-input__prefix {
          display: inline-block;
          width: 60px;
          line-height: 70px;
        }

        .icon-img {
          box-sizing: border-box;
          //margin: 16px 10px 15px 18px;
        }

        .btn {
          width: 100%;
          height: 56px;
          //height: 12.77%;
          box-sizing: border-box;
          margin-top: 30px;
          //margin-top: 3.15%;
          font-size: 24px;
        }
      }
    }
  }
}

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