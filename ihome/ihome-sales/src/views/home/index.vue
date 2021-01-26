<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-12-16 10:26:34
 * @LastEditors: zyc
 * @LastEditTime: 2021-01-26 17:17:34
-->
<template>
  <IhPage>
    <div style="margin-top: 150px">
      <img src="../../assets/homepage.png" alt="" />
    </div>
  </IhPage>
</template>
<script lang="ts">
/* eslint-disable  @typescript-eslint/no-unused-vars */
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class HomeIndex extends Vue {
  // get userInfo() {
  //   return (this as any).$root.userInfo || {};
  // }
  created(){
    let a = this.$roleTool.RHeadBusinessManagement();
    console.log(a);
  }
}
</script>
<style lang="scss" scoped>
</style>