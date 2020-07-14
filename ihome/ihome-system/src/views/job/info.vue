<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-14 09:23:40
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-14 10:52:14
--> 
<template>
  <el-tabs type="border-card" style="min-height:800px;" v-model="tabActive">
    <el-tab-pane label="岗位详情" name="1">
      <JobInfoDetails />
    </el-tab-pane>
    <el-tab-pane label="用户列表" name="2">
      <JobInfoUser />
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { getRoleList } from "../../api/system";

import JobInfoDetails from "./info-tabs/details.vue";
import JobInfoUser from "./info-tabs/user.vue";
@Component({
  components: { JobInfoDetails, JobInfoUser }
})
export default class JobInfo extends Vue {
  tabActive: any = null;
  created() {
    console.log(this.$route.query.id, this.$route.query.tab);
    this.tabActive = this.$route.query.tab || "1";
  }
}
</script>
<style lang="scss" scoped>
</style>
