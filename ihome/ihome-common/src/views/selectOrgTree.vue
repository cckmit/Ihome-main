<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2021-01-18 16:36:10
 * @LastEditors: zyc
 * @LastEditTime: 2021-01-18 16:45:53
-->
<template>
  <div class="width-400">
    <IhSelectOrgTree v-model="orgId" @change="change" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class SelectOrgTree extends Vue {
  orgId = 2;
  change(data: any) {
    console.log(data);
  }
}
</script>
<style lang="scss" scoped>
</style>