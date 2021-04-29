<!--
 * @Description:
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 16:44:13
 * @LastEditors: lsj
 * @LastEditTime: 2021-03-20 15:40:12
--> 
<template >
  <div class="main login-bg">
    <div class="login-wrapper">
      <div class="title margin-20">
        <img src="../assets/img/login/title-zh.png" />
      </div>
      <div class="title margin-47">
        <img src="../assets/img/login/title-en.png" />
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
            label-width="100px"
          >
            <el-form-item label="" prop="username" label-width="0">
              <el-input placeholder="请输入登录ID" v-model="ruleForm.username">
                <img
                  slot="prefix"
                  src="../assets/img/login/user-icon.png"
                  width="19px"
                  height="19px"
                />
              </el-input>
            </el-form-item>
            <el-form-item label="" prop="password" label-width="0">
              <el-input
                placeholder="请输入密码"
                v-model="ruleForm.password"
                type="password"
                show-password
                @keyup.enter.native="submitForm('ruleForm')"
              >
                <img
                  slot="prefix"
                  src="../assets/img/login/pwd-icon.png"
                  width="19px"
                  height="19px"
                />
              </el-input>
            </el-form-item>
            <el-form-item label-width="0">
              <el-button
                class="btn"
                type="success"
                @click="submitForm('ruleForm')"
                :loading="loading"
                >登录</el-button
              >
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
function getChromeVersion() {
  let arr = navigator.userAgent.split(" ");
  let chromeVersion = "";
  for (let i = 0; i < arr.length; i++) {
    if (/chrome/i.test(arr[i])) chromeVersion = arr[i];
  }
  if (chromeVersion) {
    return Number(chromeVersion.split("/")[1].split(".")[0]);
  } else {
    return false;
  }
}
function isWeChat() {
  let ua: any = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    let system = {
      win: false,
      mac: false,
    };
    //检测平台
    let p = navigator.platform;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    if (system.win || system.mac) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

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
    if (isWeChat()) {
      alert("微信内置浏览器无法访问系统，请使用谷歌浏览器访问");
    } else {
      if (navigator.userAgent.toLowerCase().indexOf("chrome") == -1) {
        this.$alert("请使用谷歌浏览器", "提示消息", {
          confirmButtonText: "确定",
        });
      } else {
        if (getChromeVersion()) {
          let version = getChromeVersion();
          if (version < 70) {
            this.$alert(
              `您使用的谷歌浏览器内核版本v${version}过低，为了更好地体验请将浏览器升级到最新版本！`,
              "提示消息",
              {
                confirmButtonText: "确定",
              }
            );
          }
        }
      }
    }

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
  background: url("../assets/img/login/login-bg.jpg") center no-repeat;
  zoom: 1;
  //background-size: 100% 100%;
  background-size: cover;
  //background-position: center;
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

    .title {
      text-align: center;
    }
    .margin-20 {
      box-sizing: border-box;
      margin-bottom: 18px;

      img {
        width: 310px;
        height: 40px;
      }
    }

    .margin-47 {
      box-sizing: border-box;
      margin-bottom: 40px;

      img {
        width: 310px;
        height: 11px;
      }
    }

    .login-form {
      //width: 28.5%;
      width: 547px;
      height: 360px;
      background-image: url("../assets/img/login/login-form-bg.png");
      zoom: 1;
      background-size: 100% 100%;
      background-position: center;
      margin-bottom: 130px;

      .login-tip {
        width: 100%;
        height: 30px;
        font-size: 25px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #85f2fb;
        line-height: 25px;
        text-align: center;
        box-sizing: border-box;
        margin-top: 32px;
      }

      .form-wrapper {
        width: 100%;
        box-sizing: border-box;
        margin-top: 32px;
        padding: 0px 9.18%;

        .el-form .el-input {
          background-color: #003b99 !important;
        }

        .el-form .el-input {
          input::-webkit-input-placeholder {
            /* placeholder颜色 */
            color: #85f2fb !important;
            /* placeholder字体大小 */
            font-size: 16px !important;
          }

          input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px #003b99 inset !important; /**通过边框阴影遮挡住背景*/
            -webkit-text-fill-color: #85f2fb !important;
          }
        }

        .el-form .el-input .el-input__inner {
          width: 100% !important;
          height: 46px !important;
          background-color: #003b99 !important;
          border: 1px solid #85f2fb !important;
          opacity: 0.7 !important;
          font-size: 16px !important;
          font-family: Source Han Sans CN;
          font-weight: 400 !important;
          color: #85f2fb !important;
          line-height: 25px !important;
          padding-left: 51px !important;
        }

        .el-form .el-input .el-input__prefix {
          display: inline-block !important;
          width: 47px !important;
          line-height: 55px !important;
        }

        .btn {
          width: 100%;
          box-sizing: border-box;
          margin-top: 20px;
          font-size: 20px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #ffffff;
        }
      }
    }
  }

  @media screen and(max-width: 1280px) {
    .login-wrapper .login-form {
      //width: 40% !important;
    }
  }

  @media screen and(max-width: 1024px) {
    .login-wrapper .login-form {
      //width: 50% !important;
    }
  }

  @media screen and(max-width: 768px) {
    .login-wrapper .title {
      img {
        width: 100% !important;
      }
    }

    .login-wrapper .login-form {
      width: 70% !important;
    }
  }

  @media screen and(max-width: 460px) {
    .login-wrapper {
      .title {
        img {
          width: 60% !important;
        }
      }

      .margin-20 {
        margin-bottom: 10px;
        img {
          height: 20px;
        }
      }

      .margin-47 {
        margin-bottom: 25px;
        img {
          height: 8px;
        }
      }
    }

    .login-wrapper .login-form {
      width: 85% !important;
      height: auto;
      margin-bottom: 0px !important;

      .login-tip {
        font-size: 15px;
        margin-top: 15px;
      }

      .form-wrapper {
        padding: 0px 15px;
        margin-top: 20px;

        .el-form .el-input {
          input::-webkit-input-placeholder {
            /* placeholder颜色 */
            color: #85f2fb !important;
            /* placeholder字体大小 */
            font-size: 14px !important;
          }
        }

        .el-form .el-input .el-input__inner {
          height: 37px !important;
          font-size: 15px !important;
          line-height: 25px !important;
          padding-left: 47px !important;
        }

        .el-form .el-input .el-input__prefix {
          width: 43px !important;
          line-height: 44px !important;

          img {
            width: 15px !important;
            height: 15px !important;
          }
        }

        .btn {
          margin-top: 0px;
          font-size: 15px;
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