<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-16 14:54:19
 * @LastEditors: wwq
 * @LastEditTime: 2020-09-21 16:25:50
-->
<template>
  <el-table-column v-if="option.children && option.children.length" v-bind="option">
    <table-column v-for="(child, index) in option.children" :option="child" :key="index"></table-column>
  </el-table-column>
  <el-table-column v-else v-bind="option"></el-table-column>
</template>
<script lang="ts">
// import { testApi, testPostApi } from "../api/test";
import { Component, Vue, Prop } from "vue-property-decorator";
import tableColumn from "./table-column.vue";
@Component({
  components: {
    tableColumn,
  },
})
export default class TableColumn extends Vue {
  @Prop() private option!: any;
}
</script>
<style lang="scss" scoped>
</style>  