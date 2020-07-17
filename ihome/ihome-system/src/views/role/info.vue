<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-09 14:29:02
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-17 14:22:40
--> 
<template>
  <ih-page>
    <template v-slot:info>
      <el-tabs type="border-card"   v-model="tabActive">
        <el-tab-pane label="角色详情" name="1">
          <RoleInfoDetails />
        </el-tab-pane>

        <el-tab-pane label="岗位列表" name="2">
          <RoleInfoJob />
        </el-tab-pane>

        <el-tab-pane label="用户列表" name="3">
          <RoleInfoUser />
        </el-tab-pane>
      </el-tabs>
    </template>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { getRoleList } from "../../api/system";
import RoleInfoDetails from "./info-tabs/details.vue";
import RoleInfoJob from "./info-tabs/job.vue";
import RoleInfoUser from "./info-tabs/user.vue";
@Component({
  components: { RoleInfoDetails, RoleInfoJob, RoleInfoUser }
})
export default class ResourcesInfo extends Vue {
  tabActive: any = null;
  created() {
    console.log(this.$route.query.id, this.$route.query.tab);
    this.tabActive = this.$route.query.tab || "1";
  }
}
</script>
<style lang="scss" scoped>
</style>
