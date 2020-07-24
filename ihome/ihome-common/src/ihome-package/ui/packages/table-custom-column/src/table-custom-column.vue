<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-09 16:22:31
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-24 09:54:27
--> 
<template>
  <el-popover placement="top-start" width="200" trigger="hover">
    <template>
      <li tabindex="-1" class="el-dropdown-menu__item">
        <el-row>
          <el-col :span="12">自定义列</el-col>
          <el-col :span="12" style="text-align: right;">
            <span @click="resetColumn()">重置</span>
          </el-col>
        </el-row>
      </li>
      <li
        v-for="(item,index) in columnData"
        :key="index"
        tabindex="-1"
        class="el-dropdown-menu__item"
      >
        <el-checkbox v-model="item.show">{{item.label}}</el-checkbox>
      </li>
    </template>
    <el-button slot="reference" type="primary" icon="el-icon-setting" size="mini"></el-button>
  </el-popover>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  components: {}
})
export default class IhTableCustomColumn extends Vue {
  initColumn = [];
  columnData = [];
  @Prop({ default: [], type: Array }) columns: any;
  // @Watch("columns")
  // getColumns(newVal: any) {
  //   console.log(newVal);
  //   this.columnData = newVal;
  // }
  created() {
    this.initColumn = this.$tool.deepClone(this.columns);
    // this.initColumn = this.columns;
    console.log(this.initColumn);
    debugger;
    this.columnData = this.columns;
  }
  resetColumn() {
    console.log(this.initColumn);
    this.columnData = this.initColumn;
    this.$emit("change", this.columnData);
  }
}
</script>
<style lang="css" scoped>
</style>