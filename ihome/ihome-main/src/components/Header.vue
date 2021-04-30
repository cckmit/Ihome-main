<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-23 10:42:04
 * @LastEditors: zyc
 * @LastEditTime: 2021-01-25 09:01:04
--> 
<template>
  <div class="header-container">
    <div class="left-item">
      <i
        class="el-icon-s-fold close-btn"
        style="font-size: 20px; cursor: pointer; color: #999"
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
      <div class="breadcrumb" v-show="true">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(item, index) in crumbs" :key="index">{{
            item && item.name
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="right-item">
      <ul class="right-ul">
        <li class="right-li">
          <span class="userinfo"
            >欢迎你～
            <el-link :underline="false" @click="personal()">{{
              userInfo.name
            }}</el-link>
          </span>

          <span v-if="userInfo.jobName"> · {{ userInfo.jobName }}</span>
          <span v-if="env !== 'prd'" style="color: red"> ({{ envName }})</span>
        </li>
        <!-- <li class="right-li right-li-icon">
          <el-badge
            :value="12"
            class="item"
            style="top: 5px; position: relative"
          >
            <img style="width: 20px" src="../assets/layout/notice.png" alt="" />
          </el-badge>
        </li>
        <li class="right-li right-li-icon">
          <img style="width: 20px" src="../assets/layout/user.png" alt="" />
        </li> -->
        <li class="right-li right-li-icon" @click="loginOut()" title="退出">
          <img style="width: 20px" src="../assets/layout/loginout.png" alt="" />
        </li>
      </ul>

      <!-- <span class="userinfo">{{ userInfo.name }}</span>
      <el-popover
        placement="top-start"
        width="120"
        trigger="hover"
        style="text-align: left"
      >
        <ul class="head-ul">
          <li>个人中心</li>
          <li @click="loginOut()">退出</li>
        </ul>
        <el-avatar
          slot="reference"
          class="avatar"
          size="medium"
          :src="circleUrl"
        ></el-avatar>
      </el-popover> -->
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { UserModule } from "../store/modules/user";
import { AppModule } from "../store/modules/app";
import { headImg } from "../utils/base64-img";
import { defaultIsCollapse } from "../setting";
// import { allMenu } from "../api/users";
import {
  get_sessionUser_logout,
  get_sessionUser_getSystemParam,
} from "../api/system/index";
import { removeToken } from "../utils/cookies";
@Component({
  components: {},
})
export default class IhHeader extends Vue {
  // @Prop({
  //   required: true,
  // })
  // private isCollapse!: boolean;
  env = "prd";
  envName = "";

  breadcrumbList: any = [];
  circleUrl = headImg;

  get crumbs() {
    return UserModule.crumbs;
  }
  private isAside: boolean = defaultIsCollapse;
  // created() {}

  async loginOut() {
    try {
      await get_sessionUser_logout();
      removeToken();
    } catch (error) {
      removeToken();
    } finally {
      this.$router.push("/login");
    }
  }
  personal() {
    let userInfo = this.userInfo;
    if (this.$route.path != "/web-system/user/info") {
      this.$router.push({
        path: "/web-system/user/info",
        query: { id: userInfo.id },
      });
    }
  }
  get userInfo() {
    return (this.$root as any).userInfo || {};
  }
  private get isCollapse(): boolean {
    return AppModule.opened;
  }
  clickAside(): void {
    AppModule.toggleSideBar();
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
<style lang="scss" >
.header-container {
  .right-item {
    font-size: 14px;
    color: #666;
  }
  .right-ul {
    margin: 0;
  }
  .right-li {
    list-style-type: none;
    display: inline-block;
    margin: 0 20px;
    height: 50px;
    line-height: 50px;
  }
  .right-li-icon {
    cursor: pointer;
    top: 5px;
    position: relative;
  }

  .el-badge__content.is-fixed {
    position: absolute;
    top: 10px;
    right: 10px;
    transform: translateY(-50%) translateX(100%);
  }
}
</style>
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
  line-height: 50px;
  height: 50px;
  display: inline-block;
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
