<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-16 14:54:19
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-19 18:24:03
-->
<template>
  <div class="cascaderDemo">
    <el-form label-width="80px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="省市区">
            <ih-cascader
              v-model="test"
              :level="3"
              :checkStrictly="true"
              @change="handleChange"
            ></ih-cascader>
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