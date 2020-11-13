<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-13 14:00:00
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-13 14:20:06
-->
<template>
  <div style="text-align: left">
    <el-form label-width="80px">
      <el-form-item label="小数位数:">
        限制输入的小数为：
        <el-input
          v-model="inputDigits"
          clearable
          @change="changeDigits"
          style="width: 80px"></el-input>
        位
      </el-form-item>
      <el-form-item label="示例结果:">
        <el-input
          v-if="isShow"
          clearable
          v-inputDigits="inputDigits"
          v-model="inputValue"
          style="width: 500px"></el-input>
      </el-form-item>
    </el-form>
    <div>使用描述：在Input或者InputNumber组件中直接用自定义指令：v-inputDigits="需要限制的小数位数"即可。</div>
    <div>注意事项：只能在Input或者InputNumber组件中使用。</div>
  </div>
</template>
<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";

  @Component({})
  export default class InputDigits extends Vue {
    private inputDigits: any = null;
    private inputValue: any = null;
    private isShow: any = true;

    changeDigits() {
      this.inputValue = "";
      this.isShow = false;
      this.$nextTick(() => {
        this.isShow = true;
      })
    }

    created() {
      this.inputDigits = 2
    }
  }
</script>
<style lang="scss" scoped>
</style>