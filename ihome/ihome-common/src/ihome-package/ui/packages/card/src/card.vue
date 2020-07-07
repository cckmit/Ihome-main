<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-30 14:49:35
 * @LastEditors: zyc
 * @LastEditTime: 2020-06-30 19:06:07
--> 
<template>
  <div class="ih-card">
    <slot />
  </div>
</template>

<!-- 
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {}
})
export default class IhCard extends Vue {}
</script>
--> 

<script>
export default {
  name: "IhCard"
};
</script>
<style lang="scss" scope >
</style>