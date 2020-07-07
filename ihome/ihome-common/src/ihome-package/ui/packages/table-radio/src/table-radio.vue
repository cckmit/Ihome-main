<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-08 11:18:26
 * @LastEditors: zyc
 * @LastEditTime: 2020-06-30 15:44:02
--> 
<template>
  <div>
    <span v-if="radio" class="el-radio__input is-checked">
      <span class="el-radio__inner"></span>
      <input type="radio" aria-hidden="true" tabindex="-1" class="el-radio__original" />
    </span>

    <span v-if="!radio" class="el-radio__input">
      <span class="el-radio__inner"></span>
      <input type="radio" aria-hidden="true" tabindex="-1" class="el-radio__original" />
    </span>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  components: {}
})
export default class IhTableRadio extends Vue {
  @Prop({ default: false, type: Boolean }) radio!: boolean;
}
</script>
<style lang="css" scoped>
</style>
