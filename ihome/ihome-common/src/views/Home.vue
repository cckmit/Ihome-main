<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-16 14:54:19
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-20 17:08:48
-->
<template>
  <div>
    <el-button
      type="primary"
      @click="routeTo('upload')"
    >upload组件实例</el-button>
    <el-button
      type="primary"
      @click="routeTo('table')"
    >table组件实例</el-button>
    <el-button
      type="primary"
      @click="routeTo('cascader')"
    >省市区级联选择</el-button>
    <el-button
      type="primary"
      @click="$router.push('/selectPage')"
    >下拉框-分页</el-button>
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
      case "cascader":
        this.$router.push("/cascader");
        break;
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
