<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-08 14:23:16
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-11 16:45:19
--> 
<template>
  <div>
    <p class="ih-info-title">账号信息</p>
    <el-row class="ih-info-line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">用户类型</el-col>
          <el-col :span="18" class="ih-info-item-right">{{getAccountTypeName(info.accountType)}}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">姓名</el-col>
          <el-col :span="18" class="ih-info-item-right">{{info.name}}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">登录账号</el-col>
          <el-col :span="18" class="ih-info-item-right">{{info.account}}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="ih-info-line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">手机号码</el-col>
          <el-col :span="18" class="ih-info-item-right">{{info.mobilePhone}}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">岗位</el-col>
          <el-col :span="18" class="ih-info-item-right">{{info.jobName}}</el-col>
        </el-row>
      </el-col>
    </el-row>

    <p class="ih-info-title">员工信息</p>
    <el-row class="ih-info-line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">员工工号</el-col>
          <el-col :span="18" class="ih-info-item-right">{{info.employeeCode}}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">雇员状态</el-col>
          <el-col :span="18" class="ih-info-item-right">{{getAccountTypeName(info.employeeStatus)}}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">入职日期</el-col>
          <el-col :span="18" class="ih-info-item-right">{{info.employmentDate}}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="ih-info-line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">离职日期</el-col>
          <el-col :span="18" class="ih-info-item-right">{{info.leaveDate}}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">职能类别</el-col>
          <el-col :span="18" class="ih-info-item-right">{{getWorkTypeName(info.workType)}}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">人员类型</el-col>
          <el-col :span="18" class="ih-info-item-right">{{getEmployeeTypeName(info.employeeType)}}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="ih-info-line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">email</el-col>
          <el-col :span="18" class="ih-info-item-right">{{info.email}}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">归属组织</el-col>
          <el-col :span="18" class="ih-info-item-right">{{info.orgName}}</el-col>
        </el-row>
      </el-col>
    </el-row>

    <p class="ih-info-title">状态信息</p>
    <el-row class="ih-info-line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">账号状态</el-col>
          <el-col :span="18" class="ih-info-item-right">{{getAccountStatusName(info.status)}}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">创建人</el-col>
          <el-col :span="18" class="ih-info-item-right">{{info.createUserName}}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">创建时间</el-col>
          <el-col :span="18" class="ih-info-item-right">{{info.createTime}}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="ih-info-line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">修改人</el-col>
          <el-col :span="18" class="ih-info-item-right">{{info.updateUserName}}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">修改时间</el-col>
          <el-col :span="18" class="ih-info-item-right">{{info.updateTime}}</el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { get_user_get__id } from "../../../api/system/index";
import {
  accountType,
  accountStatus,
  employeeStatus,
  employeeType,
  workType,
} from "../../../util/enums/dic";

@Component({
  components: {},
})
export default class UserInfoDetails extends Vue {
  info: any = {};

  async created() {
    let id = this.$route.query.id;
    this.info = await get_user_get__id({ id: id });
    console.log(this.info);
  }
  getAccountTypeName(key: string) {
    return accountType[key];
  }
  getAccountStatusName(key: string) {
    return accountStatus[key];
  }
  getEmployeeStatusName(key: string) {
    return employeeStatus[key];
  }

  getEmployeeTypeName(key: string) {
    return employeeType[key];
  }
  getWorkTypeName(key: string) {
    return workType[key];
  }
}
</script>
<style lang="scss" scoped>
.line {
  padding: 15px;
}
.ih-info-item-left {
  text-align: right;
  line-height: 21px;
}
.ih-info-item-right {
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
