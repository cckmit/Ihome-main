<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-09 14:29:02
 * @LastEditors: lgf
 * @LastEditTime: 2020-09-25 17:54:44
--> 
<template>
  <ih-page>
    <template v-slot:info>
      <el-tabs type="border-card" v-model="tabActive">
        <el-tab-pane label="详情信息" name="1">
          <DetailInfo />
        </el-tab-pane>

        <el-tab-pane label="操作日志" name="2">
          <OperationLog />
        </el-tab-pane>

        <el-tab-pane label="OA审批日志" name="3">
          <OAaudit />
        </el-tab-pane>
      </el-tabs>
    </template>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { getRoleList } from "../../api/system";
import OAaudit from "./info_tab/OAaudit";
import DetailInfo from "./info_tab/detailInfo";
import OperationLog from "./info_tab/operationLog";
@Component({
  components: { OAaudit, DetailInfo, OperationLog },
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
