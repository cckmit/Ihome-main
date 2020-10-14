<!--
 * @Descripttion: 
 * @version: 
 * @Author: lgf
 * @Date: 2020-09-28 14:08:15
 * @LastEditors: lgf
 * @LastEditTime: 2020-09-28 16:01:46
-->
<template>
  <div>
    <p class="ih-info-title">确认意见</p>
    <el-input
      type="textarea"
      :rows="2"
      placeholder="请输入内容"
      v-model="textarea"
    >
    </el-input>
    <div class="control">
      <el-button type="success">通过</el-button>
      <el-button type="primary">返回</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class Home extends Vue {
  textarea: any = "";
}
</script>
<style lang="scss" scoped>
.control {
  margin-top: 10px;
  text-align: left;
}
</style>
