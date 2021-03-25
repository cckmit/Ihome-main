<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-30 09:22:49
 * @LastEditors: zyc
 * @LastEditTime: 2020-06-30 09:24:42
--> 
<template>
  <div>
    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class Layout extends Vue {}
</script>
<style lang="scss" scoped>
</style>