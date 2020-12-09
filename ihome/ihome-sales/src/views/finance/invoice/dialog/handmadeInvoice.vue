<!--
 * @Description: 手工开票录入
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-08 21:04:03
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-08 21:09:37
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    class="text-left"
  ></el-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Handadel extends Vue {
  dialogVisible = true;
}
</script>
