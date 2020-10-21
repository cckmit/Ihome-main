<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-13 19:40:35
 * @LastEditors: zyc
 * @LastEditTime: 2020-10-13 19:56:11
-->
<template>
  <ih-page>
    <template v-slot:info>
      <el-tabs type="border-card" v-model="tabActive">
        <el-tab-pane label="详情信息" name="1">
          <InvitationCodeDetails
        /></el-tab-pane>

        <el-tab-pane label="注册用户列表" name="2">
          <RegisterUserList />
        </el-tab-pane>
      </el-tabs>
    </template>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import  InvitationCodeDetails from "./info-tabs/details.vue";
import RegisterUserList from "./info-tabs/register-user-list.vue";
@Component({
  components: { InvitationCodeDetails, RegisterUserList },
})
export default class InvitationCodeInfo extends Vue {
  tabActive: any = null;
  created() {
    this.tabActive = this.$route.query.tab || "1";
  }
}
</script>
<style lang="scss" scoped>
</style>
