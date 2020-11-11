<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-23 10:42:04
 * @LastEditors: zyc
 * @LastEditTime: 2020-11-11 14:20:41
--> 
<template>
  <div class="header-container">
    <div class="left-item">
      <i
        class="el-icon-s-fold close-btn"
        style="font-size: 20px; cursor: pointer"
        :class="isCollapse ? 'is-active' : ''"
        @click="clickAside()"
      ></i>
      <el-link
        :underline="false"
        @click="$router.go(-1)"
        style="margin-right: 20px"
      >
        <i class="el-icon-arrow-left"></i>
        返回</el-link
      >
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
          <el-breadcrumb-item
            v-for="(item, index) in breadcrumbList"
            :key="index"
            >{{ item && item.title }}</el-breadcrumb-item
          >
          <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
        </el-breadcrumb>
      </div>
    </div>
    <div class="right-item">
      <el-popover
        placement="top-start"
        width="120"
        trigger="hover"
        style="text-align: left"
      >
        <ul class="head-ul">
          <li>个人中心</li>
          <li @click="doc()">开发规范文档</li>
          <li @click="loginOut()">退出</li>
        </ul>
        <el-avatar
          slot="reference"
          class="avatar"
          size="medium"
          :src="circleUrl"
        ></el-avatar>
      </el-popover>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { UserModule } from "../store/modules/user";
import { AppModule } from "../store/modules/app";
import { headImg } from "../utils/base64-img";
import { defaultIsCollapse } from "@/setting";
import { allMenu } from "../api/users";
@Component({
  components: {},
})
export default class IhHeader extends Vue {
  // @Prop({
  //   required: true,
  // })
  // private isCollapse!: boolean;

  breadcrumbList: any = [];
  circleUrl = headImg;
  private isAside: boolean = defaultIsCollapse;
  // created() {}

  async loginOut() {
    try {
      await UserModule.LogOut();
      this.$router.push("/login");
    } catch (error) {
      console.log(error);
      this.$router.push("/login");
    }
  }
  private get isCollapse(): boolean {
    return AppModule.opened;
  }
  clickAside(): void {
    AppModule.toggleSideBar();
  }

  @Watch("$route")
  async getBreadcrumb(newVal: any) {
     
    let menuList: any = await allMenu();
    let arr = null;
    for (let index = 0; index < menuList.length; index++) {
      const element = menuList[index];
      if (newVal.path == element.path) {
        arr = element;
        break;
      }
    }
    let data = null;
    for (let index = 0; index < menuList.length; index++) {
      const element = menuList[index];
      if (arr?.parentId == element.id) {
        data = element;
        break;
      }
    }

    this.breadcrumbList = [data, arr];
    
    // newVal.matched.forEach((item: any) => {
    //   this.breadcrumbList.push({
    //     title: item.meta?.title,
    //     path: item.path,
    //   });
    // });
  }
  doc() {
    console.log("开发规范文档");
    window.open(
      "http://10.188.0.139:1999/%E6%96%B0%E6%88%BF%E5%89%8D%E7%AB%AF.pdf"
    );
  }
  created() {
    // this.breadcrumbList = [];
    // this.$route.matched.forEach((item: any) => {
    //   this.breadcrumbList.push({
    //     title: item.meta?.title,
    //     path: item.path,
    //   });
    // });
    this.getBreadcrumb(this.$route);
  }
}
</script>
<style lang="scss" scoped>
.header-container {
  width: 100%;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  padding: 0 10px !important;
  box-sizing: border-box;
}
.left-item {
  flex: 1;
  text-align: left;
  display: flex;
  line-height: 50px;
}
.close-btn {
  width: 40px;
  line-height: 50px;
}
.is-active {
  transform: rotate(180deg);
  text-align: right;
}
.breadcrumb {
  flex: 1;
  line-height: 50px;
  height: 50px;
}
.breadcrumb > .el-breadcrumb {
  line-height: 50px;
  height: 50px;
}
.right-item {
  flex: 1;
  text-align: right;
}
.avatar {
  margin: 7px 0px 0 10px;
}
.head-ul {
  text-align: left;
  margin: 0;
  padding: 0;
  li {
    line-height: 30px;
    cursor: pointer;
    list-style-type: none;
  }
  li:hover {
    color: #f90;
  }
}
</style>