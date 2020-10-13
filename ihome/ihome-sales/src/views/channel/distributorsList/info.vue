<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-08 14:22:25
 * @LastEditors: lgf
 * @LastEditTime: 2020-09-28 15:43:12
--> 
<template>
  <ih-page>
    <template v-slot:info>
      <el-scrollbar>
        <el-tabs
          type="border-card"
          v-model="tabActive"
        >
          <el-tab-pane
            label="信息详情"
            name="1"
          >
            <DetailsInfo />
          </el-tab-pane>
          <el-tab-pane
            label="操作日志"
            name="2"
          >
            <OperationLog />
          </el-tab-pane>
        </el-tabs>
      </el-scrollbar>
    </template>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { getRoleList } from "../../api/system";

// import DetailsInfo from "./info-tabs/detailsInfo.vue";
import OperationLog from "./info-tabs/operationLog.vue";
import DetailsInfo from "@/components/detailsInfo.vue";
// import ModifyThe from "./MoreOperations/ModifyThe";
@Component({
  components: { DetailsInfo, OperationLog },
})
export default class UserInfo extends Vue {
  tabActive: any = null;

  async created() {
    console.log(this.$route.query.id, this.$route.query.tab);
    this.tabActive = this.$route.query.tab || "1";
  }
}
</script>
<style lang="scss" scoped>
.ih-page {
  overflow: hidden;
}
</style>
