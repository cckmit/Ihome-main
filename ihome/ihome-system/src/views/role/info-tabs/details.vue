<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-09 14:31:23
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-09 14:45:14
--> 
<template>
  <div>
    <el-row class="b-padding-15">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="b-text-right">名称</el-col>
          <el-col :span="18" class="b-text-left b-padding-left-20">创建用户</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="b-text-right">编码</el-col>
          <el-col :span="18" class="b-text-left b-padding-left-20">B.SALES.USER.CREATE</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="b-text-right">创建人</el-col>
          <el-col :span="18" class="b-text-left b-padding-left-20">admin</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="b-text-right">创建时间</el-col>
          <el-col :span="18" class="b-text-left b-padding-left-20">2020-07-09 08:00:00</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="b-text-right">修改人</el-col>
          <el-col :span="18" class="b-text-left b-padding-left-20">admin</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="b-text-right">修改时间</el-col>
          <el-col :span="18" class="b-text-left b-padding-left-20">2020-07-09 08:00:00</el-col>
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
export default class RoleInfoDetails extends Vue {}
</script>
<style lang="scss" scoped>
 .el-row{
   line-height: 30px;
 }
</style>
