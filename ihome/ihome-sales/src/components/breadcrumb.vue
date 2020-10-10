<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-08-13 11:40:10
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-13 11:40:20
-->
<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item class="line">{{$route.meta.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class Home extends Vue {}
</script>
<style lang="scss" scoped>
.line {
  border-left: solid;
  color: #4cccec;
  padding-left: 7px;
}
</style>