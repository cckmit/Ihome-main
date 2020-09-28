<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-16 14:54:19
 * @LastEditors: wwq
 * @LastEditTime: 2020-09-25 11:26:04
-->
<template>
  <el-table-column
    v-if="option.children && option.children.length"
    v-bind="option"
  >
    <template v-for="(child, index) in option.children">
      <TableColumn
        :option="child"
        :key="index"
        v-if="(isPeri || !isPeri) && child.peri"
      ></TableColumn>
    </template>
  </el-table-column>
  <el-table-column
    v-else-if="(isPeri && option.peri) || !isPeri"
    v-bind="option"
  ></el-table-column>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  components: {},
})
export default class TableColumn extends Vue {
  @Prop() private option!: any;
  @Prop() private isPeri!: boolean;
}
</script>
<style lang="scss" scoped>
</style>  