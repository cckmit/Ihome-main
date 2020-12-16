<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-12-16 10:26:34
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-16 10:28:38
-->
<template>
  <IhPage>
    <h2>
      <span style="margin-right: 20px">{{ userInfo.name }}</span>
      <span>欢迎您!</span>
    </h2>
  </IhPage>
</template>
<script lang="ts">
/* eslint-disable  @typescript-eslint/no-unused-vars */
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class HomeIndex extends Vue {
  get userInfo() {
    return (this as any).$root.userInfo || {};
  }
}
</script>
<style lang="scss" scoped>
</style>