<!--
 * @Descripttion: 
 * @version: 
 * @Author: lgf
 * @Date: 2020-09-16 14:05:21
 * @LastEditors: lgf
 * @LastEditTime: 2020-09-25 17:18:47
-->

<template>
  <div class="detailInfo">
    <p class="ih-info-title">基础信息</p>
    <el-row class="ih-info-line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">申请编号</el-col>
          <el-col :span="18" class="ih-info-item-right">{{
            info.approvalNo
          }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">发起人</el-col>
          <el-col :span="18" class="ih-info-item-right">{{
            info.inputUser
          }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">事业部</el-col>
          <el-col :span="18" class="ih-info-item-right">{{
            info.departmentOrgId
          }}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="ih-info-line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">发起日期</el-col>
          <el-col :span="18" class="ih-info-item-right">{{
            info.inputTime
          }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">状态</el-col>
          <el-col :span="18" class="ih-info-item-right">{{
            info.status
          }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">OA发文文号</el-col>
          <el-col :span="18" class="ih-info-item-right">{{ info.oaNo }}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <p class="ih-info-title">
      <span>渠道人等级信息列表</span>
    </p>
    <!-- 对话框 -->

    <el-table :data="info.channelBanks" border style="width: 100%">
      <el-table-column
        prop="accountName"
        label="入库编号"
        width="200"
      ></el-table-column>
      <el-table-column prop="accountNum" label="账号"> </el-table-column>
      <el-table-column
        prop="bank"
        label="渠道商名称"
        width="300"
      ></el-table-column>
      <el-table-column
        prop="type"
        label="信用代码"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="type"
        label="法定代表人"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="type"
        label="特批入库"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="city"
        label="业务开展城市"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="type"
        label="城市等级"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="type"
        label="渠道等级"
        width="200"
      ></el-table-column>
    </el-table>

    <p class="ih-info-title">附件信息</p>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
//引入请求数据的api
import {
  get_channelApproval_get__id,
  get_channelGrade_get__id,
} from "../../../../api/channel/index";
// import PaginationMixin from "../../../../mixins/pagination";
@Component({
  components: {},
})
export default class Home extends Vue {
  info: any = {};
  GradeInfo: any = {};

  async created() {
    this.getInfo();
    console.log("4444");
  }
  async getInfo() {
    let id = this.$route.query.id;
    this.info = await get_channelApproval_get__id({ id: id });
    this.GradeInfo = await get_channelGrade_get__id({ id: id });
    // console.log(this.info);
    console.log(this.GradeInfo);
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
