<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 11:10:43
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-01 15:52:17
--> 
<template>
  <div>
    <el-button type="primary">primary</el-button>
  </div>
</template>
<script lang="ts">
import { testApi, testPostApi } from "../api/test";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {}
})
export default class Home extends Vue {}
</script>
<style lang="scss" scoped>
</style>