<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-14 10:49:41
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-14 10:59:40
--> 
<template>
  <div>
    <p class="ih-info-title">岗位信息</p>
    <el-row class="ih-info-line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">名称</el-col>
          <el-col :span="18" class="ih-info-item-right">案场岗</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-tem-left">编码</el-col>
          <el-col :span="18" class="ih-info-item-right">ABC</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">描述</el-col>
          <el-col :span="18" class="ih-info-item-right">xxxx</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="ih-info-line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">创建人</el-col>
          <el-col :span="18" class="ih-info-item-right">admin</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">创建时间</el-col>
          <el-col :span="18" class="ih-info-item-right">2020-07-12 08:00:00</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">修改人</el-col>
          <el-col :span="18" class="ih-info-item-right">admin</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="ih-info-line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">修改时间</el-col>
          <el-col :span="18" class="ih-info-item-right">2020-07-12 08:00:00</el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {}
})
export default class JobInfoDetails extends Vue {}
</script>
<style lang="scss" scoped>
</style>
