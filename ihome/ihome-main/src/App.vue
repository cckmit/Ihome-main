<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 11:46:23
 * @LastEditors: zyc
 * @LastEditTime: 2021-01-06 15:24:15
--> 
<template>
  <div class="app">
    <el-container v-show="!loginPage" id="main-root" class="root">
      <el-aside
        :width="sidebarWidth"
        :style="{ height: screenHeight + 'px' }"
        class="ih-aside"
      >
        <div class="container-logo" v-show="!isCollapsed">
          <el-link href="/">
            <img class="logo-img" src="./assets/layout/logo-home.png" />
            <img src="./assets/layout/logo-text.png" style="width: 135px" />
            <!-- <span class="logo-title">新房分销系统</span> -->
          </el-link>
        </div>
        <div class="container-logo-lm" v-show="isCollapsed">
          <el-link href="/">
            <img src="./assets/layout/logo-icon.png" style="width: 100%" />
          </el-link>
        </div>

        <el-scrollbar
          class="scroll"
          :style="{ height: `calc(100% - ${isCollapsed ? '100' : '100'}px)` }"
        >
          <el-menu
            :default-openeds="defaultOpeneds"
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
            :collapse-transition="false"
            :collapse="isCollapsed"
            :class="{ 'is-collapse': isCollapsed }"
            :style="{ width: sidebarWidth }"
          >
            <template :index="item.id" v-for="item in groupMenuList">
              <el-menu-item
                :index="item.id"
                v-if="!item.children"
                @click="goto(item.url)"
                :key="item.id"
              >
                <i :class="item.icon || 'el-icon-folder'"></i>
                <span>{{ item.name }}</span>
              </el-menu-item>

              <el-submenu :index="item.id" v-if="item.children" :key="item.id">
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span>{{ item.name }}</span>
                </template>
                <template
                  v-for="(childrenItem, childrenIndex) in item.children"
                >
                  <el-submenu
                    :index="childrenItem.id"
                    :key="childrenIndex"
                    v-if="childrenItem.children"
                  >
                    <template slot="title">{{ childrenItem.name }}</template>
                    <el-menu-item
                      :index="cItem.id"
                      v-for="(cItem, cIndex) in childrenItem.children"
                      :key="cIndex"
                    >
                      {{ cItem.name }}</el-menu-item
                    >
                  </el-submenu>
                  <el-menu-item
                    style="padding-left: 50px"
                    v-else
                    :key="childrenIndex"
                    @click="goto(childrenItem.url)"
                    :index="childrenItem.id"
                    >{{ childrenItem.name }}</el-menu-item
                  >
                </template>
              </el-submenu>
            </template>
          </el-menu>
        </el-scrollbar>

        <div class="container-footer" v-show="!isCollapsed">
          <img src="./assets/layout/x.png" alt srcset />
        </div>
      </el-aside>

      <el-container v-show="!loginPage">
        <div class="right-container">
          <Header class="right-container-header" />
          <!-- v-loading="loading" -->
          <el-main
            class="right-container-body"
            :style="{ height: screenHeight - 50 + 'px' }"
          >
            <!-- <div  id="root-view" class="app-view-box" v-html="content"></div> -->
            <!-- <div id="root-ihome-web-cli" class="app-view-box" v-html="content"></div> -->
            <div
              id="root-ihome-web-system"
              class="app-view-box"
              v-html="content"
            ></div>
            <div
              id="root-ihome-web-common"
              class="app-view-box"
              v-html="content"
            ></div>
            <div
              id="root-ihome-web-sales"
              class="app-view-box"
              v-html="content"
            ></div>
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
import Header from "@/components/Header.vue";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { UserModule } from "./store/modules/user";
import { AppModule } from "./store/modules/app";
// import { allMenu } from "./api/users";
import { normalAsideWidth, stretchAsideWidth } from "./setting";
@Component({
  components: { Header },
})
export default class App extends Vue {
  @Prop({ required: true }) private loading!: boolean;
  @Prop({ required: true }) private content!: any;

  private loginPage: boolean = false;
  private screenWidth: any = document.body.clientWidth;
  private screenHeight: any = document.body.clientHeight;
  private timer: any = null;
  defaultOpeneds: any[] = []; //展开的菜单
  defaultActive: any = ""; //选中的菜单
  menuList: any = [];

  groupMenuList: any[] = [];
  onShfit = false;
  onCtrl = false;

  async created() {
    // this.menuList = await allMenu();
    // this.menuList = (this.$root as any).userInfo?.menuList || [];
    this.menuList = (window as any).polyihomeData?.userInfo?.menuList || [];
    this.setMenu();
  }

  setMenu() {
    let menuList = this.menuList;

    menuList.map((item: any) => {
      if (item.type && item.type == "Service") {
        item.parentId = 0;
      }
      item.id = item.id.toString();
      if (item.parentId === null) {
        item.parentId = "0";
      }
      item.parentId = item.parentId.toString();
      return item;
    });

    this.groupMenuList = this.listToGruop(menuList, { rootId: "0" });

    for (let index = 0; index < menuList.length; index++) {
      const element = menuList[index];
      if (element.url == this.$route.path) {
        this.defaultActive = element.id.toString(); //设置菜单选中
        this.defaultOpeneds = [element.parentId.toString()]; //设置当前菜单展开
        break;
      }
    }

    this.resize();
    this.loginPage = this.$route.path == "/login";
    this.login();
  }

  private get sidebarWidth(): string {
    return this.isCollapsed ? stretchAsideWidth : normalAsideWidth;
  }

  private get isCollapsed(): boolean {
    return AppModule.opened;
  }

  login() {
    if (UserModule.token.length > 0) {
      UserModule.token;
    } else {
      if (!this.loginPage) {
        this.$router.push({
          path: "/login",
        });
      }
    }
  }
  @Watch("$route")
  getWatch(newVal: any) {
    this.loginPage = newVal.path == "/login";
    this.login();
    this.setMenu();
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
    const setKeyStatus = (keyCode: any, status: any) => {
      switch (keyCode) {
        case 16:
          if (this.onShfit === status) return;

          this.onShfit = status;
          break;
        case 17:
          if (this.onCtrl === status) return;

          this.onCtrl = status;
          break;
      }
    };
    document.onkeydown = (e: any) => {
      setKeyStatus(e.keyCode, true);
    };
    document.onkeyup = (e: any) => {
      setKeyStatus(e.keyCode, false);
    };
  }
  resize() {
    this.screenWidth =
      document.documentElement.clientWidth || document.body.clientWidth;
    this.screenHeight =
      document.documentElement.clientHeight || document.body.clientHeight;
  }

  goto(url: string) {
    if (window.location.pathname != url) {
      if (this.onCtrl) {
        (window as any).open(url);
        // this.$router.push({
        //   path: url,
        // });
      } else {
        this.$router.push({
          path: url,
        });
      }
    }
  }
  changeState(value: any) {
    const that: any = this;
    that.$actions.setGlobalState({
      mt: value,
    });
  }
  listToGruop(list: any[], config: any) {
    const defaultConfig = {
      id: "id",
      children: "children",
      parentId: "parentId",
      rootId: null,
    };
    Object.assign(defaultConfig, config);
    let tree = [];
    let temp;
    for (let i = 0; i < list.length; i++) {
      if (list[i][defaultConfig.parentId] == defaultConfig.rootId) {
        let obj = list[i];
        temp = this.listToGruop(list, {
          id: defaultConfig.id,
          children: defaultConfig.children,
          parentId: defaultConfig.parentId,
          rootId: obj[defaultConfig.id],
        });
        if (temp.length > 0) {
          obj[defaultConfig.children] = temp;
        }
        tree.push(obj);
      }
    }
    return tree;
  }
}
</script>
<style lang="scss">
.container-footer {
  text-align: center;
  line-height: 66px;
  height: 28px;
  width: 100%;
  color: #d1defb;
}
$asideBg: #003894;
$asideFontColor: #d1defb;
$asideActive: #4881f9;

.el-submenu.is-active.is-opened > div {
  background: #4881f9 !important;
}
.el-submenu.is-active.is-opened > ul > li {
  background: #002f7b !important;
}
.el-submenu.is-active {
  background: $asideActive !important;
}
.el-menu-item {
  background: #fff !important;
}
// .el-menu-item.is-active {
//   color: #9DE5FC !important;
// }

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

.scroll {
  height: 100%;
  .el-scrollbar__wrap {
    overflow: hidden;
    overflow-y: auto;
  }
  .el-scrollbar__bar.is-horizontal {
    height: 0;
  }
  .el-scrollbar__bar.is-vertical {
    width: 6px !important;
  }
}

.el-menu-vertical-demo.el-menu,
.el-menu-item {
  background: $asideBg !important;
}

.el-menu .el-submenu div,
.el-submenu i,
.el-menu-item {
  color: #d1defb !important;
  font-family: Source Han Sans CN;
}

.el-menu {
  border-right: solid 1px $asideBg !important;
  &.is-collapse {
    text-align: center;
  }
}

.el-menu-item.is-active {
  background: $asideActive !important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 199px;
  min-height: 400px;
}
</style>
<style scoped lang="scss">
$asideFontColor: #d1defb;
$asideActive: #4881f9;
$asideBg: #003894;
.right-container-header {
  height: 50px;
  line-height: 50px;
  padding: 0;
  margin: 0;
  width: 100%;
  // position: fixed;
  z-index: 100;
  background: #fff;
  // padding-left: 210px !important;
  box-sizing: border-box;
  // left: 0;
  // right: 0;
  // background: #4881f9;
  // color: #fff !important;
}
.right-container {
  width: 100%;
}
// .right-container-body {
//   margin-top: 50px;
// }
.container-logo {
  width: 220px;
  height: 50px;
  line-height: 50px;
  box-sizing: border-box;
  margin: 0 auto;
  text-align: center;
}
.container-logo-lm {
  width: 64px;
  height: 64px;
  line-height: 64px;
  padding: 12px;
  box-sizing: border-box;
  margin: 0 auto;
}
.el-main {
  padding: 0px;
}
.el-container {
  background: #f5f6f8;
}
.ih-aside {
  background-color: $asideBg;
  z-index: 101;
  color: $asideFontColor !important;
  transition: width 0.28s;
  overflow: hidden;
}
.ih-aside i {
  // background-color: #ef9d39;
  z-index: 101;
  color: $asideFontColor !important;
}
.el-submenu :hover {
  background: #255dc7 !important;
}
.el-menu-item.is-active {
  color: #9de5fc !important;
}
.logo-title {
  font-size: 20px;
  height: 50px;
  line-height: 50px;
  display: inline-block;
  width: 134px;
  color: #fff;
}
.logo-img {
  position: relative;
  top: 4px;
}
.is-opened .el-menu-item {
  height: 45px;
  line-height: 45px;
}
</style>
