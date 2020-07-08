<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-08 14:22:25
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-08 14:48:58
--> 
<template>
  <el-tabs type="border-card" style="min-height:800px;" v-model="tabActive">
    <el-tab-pane label="用户详情" name="1">
      <UserInfoDetails />
    </el-tab-pane>
    <el-tab-pane label="资源权限" name="2">
      <UserResources />
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { getRoleList } from "../../api/system";

import UserInfoDetails from "./info-tabs/details.vue";
import UserResources from "./info-tabs/resources.vue";
@Component({
  components: { UserResources, UserInfoDetails }
})
export default class UserInfo extends Vue {
  tabActive: any = null;
  created() {
    console.log(this.$route.query.id, this.$route.query.tab);
    this.tabActive = this.$route.query.tab || "1";
  }
}
</script>
<style lang="scss" scoped>
</style>
