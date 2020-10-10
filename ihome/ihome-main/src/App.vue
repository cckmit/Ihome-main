<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 11:46:23
 * @LastEditors: lgf
 * @LastEditTime: 2020-09-22 10:34:05
--> 
<template>
  <div>
    <el-container v-show="!loginPage" id="main-root" class="root">
      <el-aside :width="sidebarWidth" :style="{'height':screenHeight+'px'}" class="ih-aside">
        <div class="container-logo" v-show="!isCollapsed">
          <img src="./assets/img/logo/logo.png" style="width:100%;" alt srcset />
        </div>
        <div class="container-logo-lm" v-show="isCollapsed">
          <img src="./assets/img/logo/ihome.jpg" style="width:100%;" alt srcset />
        </div>

        <el-scrollbar
          class="scroll"
          :style="{'height': `calc(100% - ${isCollapsed ? '64' : '50'}px)`}"
        >
          <el-menu
            :default-openeds="defaultOpeneds"
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
            background-color="#ef9d39"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse-transition="false"
            :collapse="isCollapsed"
            :class="{'is-collapse': isCollapsed}"
            :style="{'width': sidebarWidth}"
          >
            <template :index="item.id" v-for="(item) in groupMenuList">
              <el-menu-item
                :index="item.id"
                v-if="!item.children"
                @click="goto(item.path)"
                :key="item.id"
              >
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </el-menu-item>

              <el-submenu :index="item.id" v-if="item.children" :key="item.id">
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span>{{item.title}}</span>
                </template>
                <template v-for="(childrenItem,childrenIndex) in item.children">
                  <el-submenu
                    :index="childrenItem.id"
                    :key="childrenIndex"
                    v-if="childrenItem.children"
                  >
                    <template slot="title">{{childrenItem.title}}</template>
                    <el-menu-item
                      :index="cItem.id"
                      v-for="(cItem, cIndex) in childrenItem.children"
                      :key="cIndex"
                    >{{cItem.title}}</el-menu-item>
                  </el-submenu>
                  <el-menu-item
                    v-else
                    :key="childrenIndex"
                    @click="goto(childrenItem.path)"
                    :index="childrenItem.id"
                  >{{childrenItem.title}}</el-menu-item>
                </template>
              </el-submenu>
            </template>
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <el-container v-show="!loginPage">
        <div class="right-container">
          <IhHeader class="right-container-header" />
          <!-- v-loading="loading" -->
          <el-main class="right-container-body" :style="{'height':screenHeight-50+'px'}">
            <!-- <div  id="root-view" class="app-view-box" v-html="content"></div> -->
            <!-- <div id="root-ihome-web-cli" class="app-view-box" v-html="content"></div> -->
            <div id="root-ihome-web-system" class="app-view-box" v-html="content"></div>
            <div id="root-ihome-web-common" class="app-view-box" v-html="content"></div>
            <div id="root-ihome-web-sales" class="app-view-box" v-html="content"></div>
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
import { AppModule } from "@/store/modules/app";
import { allMenu } from "./api/users";
import { normalAsideWidth, stretchAsideWidth } from "@/setting";
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
  defaultOpeneds: any[] = []; //展开的菜单
  defaultActive: any = ""; //选中的菜单

  groupMenuList: any[] = [];

  async created() {
    let menuList: any = await allMenu();

    menuList.map((item: any) => {
      item.id = item.id.toString();
      item.parentId = item.parentId.toString();
      return item;
    });

    this.groupMenuList = this.listToGruop(menuList, { rootId: "0" });
    for (let index = 0; index < menuList.length; index++) {
      const element = menuList[index];
      if (element.path == this.$route.path) {
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
    console.log(newVal);
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
// .el-menu .el-submenu,
// .el-menu-item-group__title,
// .el-menu-item,
// .el-menu-item.is-disabled,
// .el-menu-vertical-demo.el-menu {
//   background: $asideBg !important;
// }

.el-menu .el-submenu div,
.el-submenu i,
.el-menu-item {
  color: #fff !important;
}
.el-menu {
  border-right: solid 1px $asideBg !important;
  &.is-collapse {
    // width: calc(100% - 17px) !important;
    // margin: 0 auto !important;
    text-align: center;
  }
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
// 滚动条整体样式
// ::-webkit-scrollbar {
//   width: 6px;
//   height: 6px;
// }
// ::-webkit-scrollbar-thumb {
//   border-radius: 12px;
//   box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
//   background: rgba(144, 147, 153, 0.3);
// }
// ::-webkit-scrollbar-track {
//   box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
//   border-radius: 12px;
//   background: #ededed;
// }
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
  // position: fixed;
  z-index: 100;
  background: #fff;
  // padding-left: 210px !important;
  box-sizing: border-box;
  // left: 0;
  // right: 0;
}
.right-container {
  width: 100%;
}
// .right-container-body {
//   margin-top: 50px;
// }
.container-logo {
  width: 200px;
  height: 50px;
  line-height: 50px;
  padding: 10px;
  box-sizing: border-box;
  margin: 0 auto;
  // border-bottom: 1px solid #2c4e5a;
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
  background-color: #ef9d39;
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
  color: $asideFontColor !important;
  background: $asideActive !important;
}
</style>
