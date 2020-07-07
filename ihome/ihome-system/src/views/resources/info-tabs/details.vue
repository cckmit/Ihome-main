<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-07 15:42:42
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-07 15:43:27
--> 
<template>
   <div>
        <el-row class="line">
          <el-col :span="8">
            <el-row>
              <el-col :span="6" class="item-left">名称</el-col>
              <el-col :span="18" class="item-right">创建用户</el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="6" class="item-left">编码</el-col>
              <el-col :span="18" class="item-right">B.SALES.USER.CREATE</el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="6" class="item-left">类型</el-col>
              <el-col :span="18" class="item-right">按钮</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="8">
            <el-row>
              <el-col :span="6" class="item-left">URL</el-col>
              <el-col :span="18" class="item-right">/xxx/xxx</el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="6" class="item-left">父资源</el-col>
              <el-col :span="18" class="item-right">用户管理</el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="6" class="item-left">创建人</el-col>
              <el-col :span="18" class="item-right">admin</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="8">
            <el-row>
              <el-col :span="6" class="item-left">创建时间</el-col>
              <el-col :span="18" class="item-right">2020-06-22 08:00:00</el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="6" class="item-left">修改人</el-col>
              <el-col :span="18" class="item-right">张三疯</el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="6" class="item-left">修改时间</el-col>
              <el-col :span="18" class="item-right">2020-06-22 08:00:00</el-col>
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
export default class InfoDetails extends Vue {}
</script>
<style lang="scss" scoped>
.line {
  padding: 15px;
}
.item-left {
  text-align: right;
  line-height: 21px;
}
.item-right {
  text-align: left;
  padding-left: 20px;
  line-height: 21px;
}
</style>
