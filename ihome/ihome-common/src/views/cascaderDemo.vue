<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-16 14:54:19
 * @LastEditors: lgf
 * @LastEditTime: 2020-09-29 14:20:59
-->
<template>
  <div class="cascaderDemo">
    <el-form label-width="80px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="省市区">
            <ih-cascader v-model="test" @change="handleChange"></ih-cascader>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class CascaderDemo extends Vue {
  private test = [];

  handleChange(v: any) {
    console.log(v);
    console.log(this.test, "test");
  }
}
</script>
<style lang="scss" scoped>
</style>