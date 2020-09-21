<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-16 14:54:19
 * @LastEditors: wwq
 * @LastEditTime: 2020-09-21 16:10:51
-->
<template>
  <div>
    <el-button type="primary" @click="routeTo('upload')">upload组件实例</el-button>
    <el-button type="primary" @click="routeTo('table')">table组件实例</el-button>
  </div>
</template>
<script lang="ts">
// import { testApi, testPostApi } from "../api/test";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class Home extends Vue {
  private abc!: boolean;
  routeTo(type: string) {
    switch (type) {
      case "upload":
        this.$router.push("/upload");
        break;
      case "table":
        this.$router.push("/table");
        break;
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
