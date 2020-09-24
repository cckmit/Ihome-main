<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-16 14:54:19
 * @LastEditors: wwq
 * @LastEditTime: 2020-09-23 16:48:49
-->
<template>
  <el-table-column v-if="option.children && option.children.length && option.peri" v-bind="option">
    <template v-for="(child, index) in option.children">
      <TableColumn :option="child" :key="index" v-if="child.peri"></TableColumn>
    </template>
  </el-table-column>
  <el-table-column v-else-if="option.peri" v-bind="option"></el-table-column>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  components: {},
})
export default class TableColumn extends Vue {
  @Prop() private option!: any;
}
</script>
<style lang="scss" scoped>
</style>  