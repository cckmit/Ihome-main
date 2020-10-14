<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-08 14:22:25
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-13 10:44:50
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
            label="详细信息"
            name="1"
          >
            <DetailsInfo />
          </el-tab-pane>
          <el-tab-pane
            label="注册用户列表"
            name="2"
          >
            <UsersList />
          </el-tab-pane>
        </el-tabs>
      </el-scrollbar>
    </template>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { getRoleList } from "../../api/system";

import DetailsInfo from "./info-tabs/detailsInfo.vue";
import UsersList from "./info-tabs/usersList.vue";
@Component({
  components: { DetailsInfo, UsersList },
})
export default class UserInfo extends Vue {
  tabActive: any = null;
  async created() {
    console.log(this.$route.query.id, this.$route.query.tab);
    this.tabActive = this.$route.query.tab || "1";
    // let invitationCode = this.$route.params.invitationCode;
  }
}
</script>
<style lang="scss" scoped>
.ih-page {
  overflow: hidden;
}
</style>
