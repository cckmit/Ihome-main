<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-29 16:35:32
 * @LastEditors: zyc
 * @LastEditTime: 2021-01-14 17:14:13
--> 
<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-29 16:35:32
 * @LastEditors: zyc
 * @LastEditTime: 2020-09-29 15:18:06
--> 
<template>
  <div id="app" class="root">
    <keep-alive>
      <router-view
        class="router-view keep-alive"
        v-if="$route.meta.keepAlive"
      ></router-view>
    </keep-alive>
    <router-view
      class="router-view"
      v-if="!$route.meta.keepAlive"
    ></router-view>
    <!-- <router-view /> -->
  </div>
</template>
<script lang="ts">
function getCrumbs(curruntUrl: any, menuList: any[]) {
  let crumbs: any[] = [];
  for (let index = 0; index < menuList.length; index++) {
    const element: any = menuList[index];
    if (element?.url?.toLocaleLowerCase() == curruntUrl?.toLocaleLowerCase()) {
      if (element.parentId == "0") {
        crumbs = [{ name: element.name }];
      } else {
        for (let i = 0; i < menuList.length; i++) {
          const item = menuList[i];
          if (item.id == element.parentId) {
            crumbs = [{ name: item.name }, { name: element.name }];
            break;
          }
        }
      }
    }
  }
  return crumbs;
}

function getTopCrumb(curruntUrl: any, menuList: any[]) {
  let crumbs: any = null;
  for (let index = 0; index < menuList.length; index++) {
    const element: any = menuList[index];
    if (element?.url?.toLocaleLowerCase() == curruntUrl?.toLocaleLowerCase()) {
      if (element.parentId == "0") {
        crumbs = { name: element.name };
      } else {
        for (let i = 0; i < menuList.length; i++) {
          const item = menuList[i];
          if (item.id == element.parentId) {
            crumbs = { name: item.name };
            break;
          }
        }
      }
    }
  }
  return crumbs;
}

import { Component, Vue, Watch } from "vue-property-decorator";
import { routes } from "@/router/index";
@Component({
  components: {},
})
export default class App extends Vue {
  created() {
    //向主应用发送路由信息，用于面包屑展示
  }
  @Watch("$route")
  async route(newVal: any) {
    let menuList: any[] =
      (window as any).polyihomeData?.userInfo?.menuList || [];

    let curruntUrl = "";
    if (process.env.BASE_URL.endsWith("/")) {
      curruntUrl =
        process.env.BASE_URL.substring(0, process.env.BASE_URL.length - 1) +
        newVal.path;
    } else {
      curruntUrl = process.env.BASE_URL + newVal.path;
    }
    let crumbs: any[] = getCrumbs(curruntUrl, menuList);

    if (crumbs.length == 0) {
      //子页面，非后端返回菜单页面
      for (let index = 0; index < routes.length; index++) {
        const element = routes[index];
        let children: any[] = element.children || [];
        for (let i = 0; i < children.length; i++) {
          const item = children[i];
          const path = element.path + "/" + item.path;
          if (newVal.path == path) {
            if (element?.redirect) {
              let curruntUrl = element?.redirect;
              if (process.env.BASE_URL.endsWith("/")) {
                curruntUrl =
                  process.env.BASE_URL.substring(
                    0,
                    process.env.BASE_URL.length - 1
                  ) + element?.redirect;
              } else {
                curruntUrl = process.env.BASE_URL + element?.redirect;
              }
              let topCrumb: any = getTopCrumb(curruntUrl, menuList);
              if (topCrumb) {
                crumbs = [
                  { name: topCrumb.name },
                  { name: element?.meta?.title },
                  { name: item?.meta?.title },
                ];
              } else {
                crumbs = [
                  { name: element?.meta?.title },
                  { name: item?.meta?.title },
                ];
              }
            } else {
              crumbs = [
                { name: element?.meta?.title },
                { name: item?.meta?.title },
              ];
            }
          }
        }
      }
    }

    try {
       (this as any).$qiankun?.appRoutes(crumbs, routes);
    } catch (error) {
      console.log(error)
    }

   
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#app {
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
</style>
<style lang="scss" scoped>
.root {
  padding: 20px;
}
</style>