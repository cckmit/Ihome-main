<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-16 14:54:19
 * @LastEditors: lgf
 * @LastEditTime: 2020-09-22 10:37:22
-->
<template>
  <div>
    <el-button type="primary" @click="routeTo">primary</el-button>
  </div>
</template>
<script lang="ts">
// import { testApi, testPostApi } from "../api/test";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Home extends Vue {
  routeTo() {
    this.$router.push("/upload");
  }
}
</script>
<style lang="scss" scoped>
</style>
