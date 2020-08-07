<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-05-21 17:11:10
 * @LastEditors: zyc
 * @LastEditTime: 2020-06-30 15:42:54
--> 
<template>
  <input class="el-input" v-model="msg" />
</template>
<script lang="ts">
import { Component,   Vue } from 'vue-property-decorator';

@Component
export default class IhInput extends Vue {
 
 msg="xxx";
}
</script>
<style scoped lang="scss">
 .ih-buttom{
   color: green;
   background: #fff;
 }
</style>
