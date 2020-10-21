<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-09 14:31:23
 * @LastEditors: zyc
 * @LastEditTime: 2020-10-16 09:43:34
--> 
<template>
  <div>
    <p class="ih-info-title">基础信息</p>

    <el-row class="ih-info-line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">申请编号</el-col>
          <el-col :span="18" class="ih-info-item-right">
            {{ info.approvalNo }}</el-col
          >
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">发起人</el-col>
          <el-col :span="18" class="ih-info-item-right">{{
            info.approvalUser
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
          <el-col :span="18" class="ih-info-item-right">
            {{ info.inputTime }}</el-col
          >
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">状态</el-col>
          <el-col :span="18" class="ih-info-item-right">
            {{ $root.dictAllName(info.status, "ChannelApprovalStatus").name }}
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">OA发文文号</el-col>
          <el-col :span="18" class="ih-info-item-right">{{ info.oaNo }}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <p class="ih-info-title">渠道等级信息列表</p>
    <el-table
      :data="info.channelApprovalGrades"
      style="width: 100%; padding: 20px"
    >
      <el-table-column prop="storageNum" label="入库编号" width="180">
      </el-table-column>
      <el-table-column prop="channelName" label="渠道商名称" width="180">
      </el-table-column>
      <!-- <el-table-column prop="name" label="信用代码"> </el-table-column>
      <el-table-column prop="name" label="法定代表人"> </el-table-column> -->
      <el-table-column prop="special" label="特批入库"> </el-table-column>
      <el-table-column prop="city" label="业务开展城市"> </el-table-column>
      <el-table-column prop="cityGrade" label="城市等级"> </el-table-column>
      <el-table-column prop="channelGrade" label="渠道等级"> </el-table-column>
    </el-table>
    <p class="ih-info-title">附件信息</p>
    <el-table
      :data="info.channelApprovalAttachments"
      style="width: 100%; padding: 20px"
    >
      <el-table-column prop="date" label="类型" width="180"> </el-table-column>
      <el-table-column prop="name" label="渠道商名称" width="180">
      </el-table-column>
      <el-table-column prop="name" label="业务开展城市"> </el-table-column>
      <el-table-column prop="name" label="附件"> </el-table-column>
    </el-table>
    <p class="ih-info-title">推送OA附件清单</p>
    <div class="text-left margin-left-30">
      <el-link
        >爱家广州产成品及联动事业部渠道合格供应商名录（131）.xlsx</el-link
      >
    </div>
    <div class="text-left margin-left-30">
      <el-link
        >广州链家宝业房地产经纪有限公司_广州市_特批入库补充材料.rar</el-link
      >
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { get_channelApproval_get__id } from "../../../../api/channel/index";
@Component({
  components: {},
})
export default class InvitationCodeDetails extends Vue {
  info: any = {
    channelApprovalAttachments: [],
    channelApprovalGrades: [],
  };

  async created() {
    let id = this.$route.query.id;
    this.info = await get_channelApproval_get__id({ id: id });
  }
}
</script>
<style lang="scss" scoped>
.el-row {
  line-height: 30px;
}
</style>
