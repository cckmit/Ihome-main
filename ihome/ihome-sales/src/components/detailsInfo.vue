<!--
 * @Descripttion: 
 * @version: 
 * @Author: lgf
 * @Date: 2020-09-16 14:05:21
 * @LastEditors: lgf
 * @LastEditTime: 2020-09-28 15:57:21
-->

<template>
  <div class="detailInfo">
    <p class="ih-info-title">基础信息</p>
    <el-row class="ih-info-line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">名称</el-col>
          <el-col :span="18" class="ih-info-item-right">{{ info.name }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">信用代码</el-col>
          <el-col :span="18" class="ih-info-item-right">{{
            info.creditCode
          }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">简称</el-col>
          <el-col :span="18" class="ih-info-item-right">{{
            info.shortName
          }}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="ih-info-line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">类型</el-col>
          <el-col :span="18" class="ih-info-item-right">{{ info.type }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">法定代表人</el-col>
          <el-col :span="18" class="ih-info-item-right">{{
            info.legalPerson
          }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">法人身份证号码</el-col>
          <el-col :span="18" class="ih-info-item-right">{{ info.id }}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="ih-info-line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">成立日期</el-col>
          <el-col :span="18" class="ih-info-item-right">{{
            info.setupTime
          }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">注册资本</el-col>
          <el-col :span="18" class="ih-info-item-right">{{
            info.capital
          }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">营业期限</el-col>
          <el-col :span="18" class="ih-info-item-right">{{
            info.businessTime
          }}</el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row class="ih-info-line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">省份</el-col>
          <el-col :span="18" class="ih-info-item-right">{{
            info.province
          }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">城市</el-col>
          <el-col :span="18" class="ih-info-item-right">{{ info.city }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">行政区</el-col>
          <el-col :span="18" class="ih-info-item-right">{{
            info.county
          }}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="ih-info-line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">住所</el-col>
          <el-col :span="18" class="ih-info-item-right">{{
            info.address
          }}</el-col>
        </el-row>
      </el-col>

      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">跟进人</el-col>
          <el-col :span="18" class="ih-info-item-right">{{
            info.followUserId
          }}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="ih-info-line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">状态</el-col>
          <el-col :span="18" class="ih-info-item-right">{{
            info.status
          }}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <p class="ih-info-title">
      <span>银行账号信息</span>
    </p>
    <!-- 对话框 -->

    <el-table :data="info.channelBanks" border style="width: 100%">
      <el-table-column
        prop="accountName"
        label="账户名称"
        width="400"
      ></el-table-column>
      <el-table-column prop="accountNum" label="账号"> </el-table-column>
      <el-table-column
        prop="bank"
        label="开户银行"
        width="400"
      ></el-table-column>
      <el-table-column
        prop="type"
        label="账号类型"
        width="300"
      ></el-table-column>
    </el-table>
    <p class="ih-info-title">负责人信息</p>
    <el-row class="ih-info-line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">姓名</el-col>
          <el-col :span="18" class="ih-info-item-right">{{
            info.inputUser
          }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">手机号码</el-col>
          <el-col :span="18" class="ih-info-item-right">{{
            info.bobile
          }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">身份证号码</el-col>
          <el-col :span="18" class="ih-info-item-right">{{ info.id }}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="ih-info-line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">电子邮箱</el-col>
          <el-col :span="18" class="ih-info-item-right">{{
            info.email
          }}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <p class="ih-info-title">附件信息</p>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
//引入请求数据的api
import { get_channel_get__id } from "../api/channel/index";
// import PaginationMixin from "../../../../mixins/pagination";
@Component({
  components: {},
})
export default class Home extends Vue {
  info: any = {};

  async created() {
    this.getInfo();
    console.log("4444");
  }
  async getInfo() {
    let id = this.$route.query.id;
    this.info = await get_channel_get__id({ id: id });
    console.log(this.info);
  }
}
</script>
<style lang="scss" scoped>
.ih-info-title {
  border-left: 5px solid #4cccec;
  .add {
    color: #000;
    margin-left: 20px;
    cursor: pointer;
  }
}
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
  height: 500px;
}
.el-input__inner {
  width: 1060px;
}
</style>
