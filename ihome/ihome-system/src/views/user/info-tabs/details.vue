<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-08 14:23:16
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-08 14:40:18
--> 
<template>
  <div>
    <p class="title">账号信息</p>
    <el-row class="line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="item-left">用户类型</el-col>
          <el-col :span="18" class="item-right">爱家员工</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="item-left">姓名</el-col>
          <el-col :span="18" class="item-right">张三</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="item-left">登录账号</el-col>
          <el-col :span="18" class="item-right">zhangsan12341</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="item-left">手机号码</el-col>
          <el-col :span="18" class="item-right">15512345678</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="item-left">岗位</el-col>
          <el-col :span="18" class="item-right">案场岗</el-col>
        </el-row>
      </el-col>
    </el-row>

    <p class="title">员工信息</p>
    <el-row class="line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="item-left">员工工号</el-col>
          <el-col :span="18" class="item-right">zhangsan</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="item-left">雇员状态</el-col>
          <el-col :span="18" class="item-right">在职</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="item-left">入职日期</el-col>
          <el-col :span="18" class="item-right">2020-06-30</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="item-left">离职日期</el-col>
          <el-col :span="18" class="item-right"></el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="item-left">职能类别</el-col>
          <el-col :span="18" class="item-right">一线</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="item-left">人员类型</el-col>
          <el-col :span="18" class="item-right">正式工</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="item-left">email</el-col>
          <el-col :span="18" class="item-right">zhangsan@qq.com</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="item-left">归属组织</el-col>
          <el-col :span="18" class="item-right">爱家广州产成品及联动事业部</el-col>
        </el-row>
      </el-col>
    </el-row>

    <p class="title">状态信息</p>
    <el-row class="line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="item-left">状态</el-col>
          <el-col :span="18" class="item-right">激活</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="item-left">创建人</el-col>
          <el-col :span="18" class="item-right">admin</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="item-left">创建时间</el-col>
          <el-col :span="18" class="item-right">2020-06-30 08:00:00</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="item-left">修改人</el-col>
          <el-col :span="18" class="item-right">admin</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="item-left">修改时间</el-col>
          <el-col :span="18" class="item-right">2020-06-30 08:00:00</el-col>
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
export default class UserInfoDetails extends Vue {}
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
.title {
  font-weight: 600;
  text-align: left;
  margin-left: 20px;
}
</style>
