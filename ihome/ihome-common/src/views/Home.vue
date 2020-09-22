<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-16 14:54:19
 * @LastEditors: wwq
 * @LastEditTime: 2020-09-21 09:00:39
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
