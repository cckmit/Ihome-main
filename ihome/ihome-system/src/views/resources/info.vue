<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-07 11:47:24
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-07 17:00:00
--> 
<template>
  <el-tabs type="border-card" style="min-height:800px;" v-model="tabActive">
    <el-tab-pane label="资源详情" name="1">
      <InfoDetails />
    </el-tab-pane>
    <el-tab-pane label="角色列表" name="2">
      <InfoRole />
    </el-tab-pane>
    <el-tab-pane label="岗位列表" name="3">
      <InfoJob />
    </el-tab-pane>
    <el-tab-pane label="用户列表" name="4">
      <InfoUser />
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { getRoleList } from "../../api/system";
import InfoRole from "./info-tabs/role.vue";
import InfoDetails from "./info-tabs/details.vue";
import InfoJob from "./info-tabs/job.vue";
import InfoUser from "./info-tabs/user.vue";
@Component({
  components: { InfoRole, InfoDetails, InfoJob, InfoUser }
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
