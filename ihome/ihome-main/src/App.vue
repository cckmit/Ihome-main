<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 11:46:23
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-11 16:55:22
--> 
<template>
  <div>
    <el-container v-show="!loginPage" id="main-root" class="root">
      <el-aside width="200px" :style="{'min-height':screenHeight+'px'}" class="ih-aside">
        <div class="container-logo">
          <img src="./assets/img/logo/logo.png" style="width:100%;" alt srcset />
        </div>

        <el-menu :default-openeds="['4']" class="el-menu-vertical-demo" :collapse="isCollapse">
          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-submenu index="1-4">
              <span slot="title">选项4</span>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
              <el-menu-item index="1-4-2">选项4-2</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>-->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-setting"></i>系统管理模块
            </template>

            <!-- <el-menu-item @click="goto('/web-system/')" index="4-3">系统管理模块导航</el-menu-item> -->
            <el-menu-item @click="goto('/web-system/user/list')" index="4-4">用户列表</el-menu-item>
            <el-menu-item @click="goto('/web-system/resources/list')" index="4-5">资源列表</el-menu-item>
            <el-menu-item @click="goto('/web-system/role/list')" index="4-6">角色列表</el-menu-item>
            <el-menu-item @click="goto('/web-system/job/list')" index="4-7">岗位列表</el-menu-item>
            <el-menu-item @click="goto('/web-system/organization/list')" index="4-8">组织架构</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container v-show="!loginPage">
        <div class="right-container">
          <IhHeader class="right-container-header" />
          <!-- v-loading="loading" -->
          <el-main class="right-container-body" :style="{'min-height':screenHeight-50+'px'}">
            <!-- <div  id="root-view" class="app-view-box" v-html="content"></div> -->
            <!-- <div id="root-ihome-web-cli" class="app-view-box" v-html="content"></div> -->
            <div id="root-ihome-web-system" class="app-view-box" v-html="content"></div>
            <div id="root-ihome-web-common" class="app-view-box" v-html="content"></div>
          </el-main>
        </div>
      </el-container>
    </el-container>
    <div class="layout-router" v-show="loginPage">
      <router-view />
    </div>
  </div>
</template>
 <script lang='ts'>
import IhHeader from "@/components/IhHeader.vue";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { UserModule } from "./store/modules/user";
@Component({
  components: { IhHeader },
})
export default class App extends Vue {
  @Prop({ required: true }) private loading!: boolean;
  @Prop({ required: true }) private content!: any;

  private loginPage: boolean = false;
  private screenWidth: any = document.body.clientWidth;
  private screenHeight: any = document.body.clientHeight;
  private timer: any = null;
  private isCollapse: boolean = false;

  created() {
    this.resize();
    this.loginPage = this.$route.path == "/login";
    this.login();
  }
  login() {
    if (UserModule.token.length > 0) {
      UserModule.token;
    } else {
      this.$router.push({
        path: "/login",
      });
    }
  }
  @Watch("$route")
  getWatch(newVal: any) {
    this.loginPage = newVal.path == "/login";
    this.login();
  }
  @Watch("screenHeight")
  screenHeightWatch(val: any) {
    if (!this.timer) {
      this.screenWidth = val;
      this.timer = true;
      setTimeout(() => {
        this.timer = false;
        this.resize();
      }, 200);
    }
  }
  @Watch("screenWidth")
  screenWidthWatch(val: any) {
    if (!this.timer) {
      this.screenWidth = val;
      this.timer = true;
      setTimeout(() => {
        this.timer = false;
        this.resize();
      }, 200);
    }
  }
  mounted() {
    window.addEventListener("resize", this.resize);
  }
  resize() {
    this.screenWidth =
      document.documentElement.clientWidth || document.body.clientWidth;
    this.screenHeight =
      document.documentElement.clientHeight || document.body.clientHeight;
    // console.log(this.screenWidth, this.screenHeight);
  }

  goto(path: string) {
    if (window.location.pathname != path) {
      this.$router.push({
        path: path,
      });
    }
  }
  changeState(value: any) {
    const that: any = this;
    that.$actions.setGlobalState({
      mt: value,
    });
  }
}
</script>
<style lang="scss">
$asideBg: #ef9d39;
$asideFontColor: #f5eed4;
$asideActive: #e29334;
body {
  margin: 0;
  padding: 0;
}
#container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 50px;
}

.el-aside {
  color: #333;
}
.el-menu .el-submenu,
.el-menu-item-group__title,
.el-menu-item,
.el-menu-item.is-disabled,
.el-menu-vertical-demo.el-menu {
  background: $asideBg !important;
}

.el-menu .el-submenu div,
.el-submenu i,
.el-menu-item {
  color: #fff !important;
}
.el-menu {
  border-right: solid 1px $asideBg !important;
}
.el-submenu :hover {
  color: #fff !important;
  background: #516f94 !important;
}
.el-menu-item.is-active {
  color: $asideFontColor !important;
  background: $asideActive !important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 199px;
  min-height: 400px;
}
</style>
<style scoped lang="scss">
$asideFontColor: #f5eed4;
$asideActive: #e29334;
.right-container-header {
  height: 50px;
  line-height: 50px;
  padding: 0;
  margin: 0;
  width: 100%;
  position: fixed;
  z-index: 100;
  background: #fff;
  padding-left: 210px !important;
  box-sizing: border-box;
  left: 0;
  right: 0;
}
.right-container {
  width: 100%;
}
.right-container-body {
  margin-top: 50px;
}
.container-logo {
  width: 200px;
  height: 50px;
  line-height: 50px;
  padding: 10px;
  box-sizing: border-box;
  // border-bottom: 1px solid #2c4e5a;
}
.el-main {
  padding: 0px;
}
.el-container {
  background: #f5f6f8;
}
.ih-aside {
  background-color: #ef9d39;
  z-index: 101;
  color: $asideFontColor !important;
}
.ih-aside i {
  // background-color: #ef9d39;
  z-index: 101;
  color: $asideFontColor !important;
}
.el-submenu :hover {
  color: $asideFontColor !important;
  background: $asideActive !important;
}
</style>
