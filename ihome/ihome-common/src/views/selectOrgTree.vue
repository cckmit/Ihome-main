<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2021-01-18 16:36:10
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-18 14:39:32
-->
<template>
  <div>
    <div class="width-400">
      <p>所有组织</p>
      <IhSelectOrgTree v-model="orgId" @change="change" />
    </div>
    <div class="width-400">
      <p>当前登录账号权限组织(单选)</p>
      <IhSelectOrgTreeByUser @change="changeMy" v-model="orgId2" type="radio" />
    </div>
    <div class="width-400">
      <p>当前登录账号权限组织(多选，未完成功能)</p>
      <IhSelectOrgTreeByUser
        @change="changeMy3"
        v-model="orgId3"
        type="checkbox"
      />
    </div>
  </div>
</template>
<script lang="ts">
// import { IhSelectOrgTreeByUser } from "../ihome-package/ui/packages/select-tree/index";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class SelectOrgTree extends Vue {
  orgId = 2;
  orgId2 = null;
  orgId3 = 2;
  change(data: any) {
    console.log(data);
  }
  changeMy(data: any) {
    console.log(data);
    console.log(this.orgId2);
  }
  changeMy3(data: any) {
    console.log(data);
    console.log(this.orgId2);
  }
}
</script>
<style lang="scss" scoped>
</style>