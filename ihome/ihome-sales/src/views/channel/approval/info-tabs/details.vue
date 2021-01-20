<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-09 14:31:23
 * @LastEditors: zyc
 * @LastEditTime: 2021-01-13 15:42:59
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
            info.approvalUserName
          }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">事业部</el-col>
          <el-col :span="18" class="ih-info-item-right">{{
            info.departmentName
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
            {{ $root.dictAllName(info.status, "ChannelApprovalStatus") }}
          </el-col>
        </el-row>
      </el-col>
      <!-- <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">OA发文文号</el-col>
          <el-col :span="18" class="ih-info-item-right">{{ info.oaNo }}</el-col>
        </el-row>
      </el-col> -->
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
      <el-table-column prop="special" label="特批入库">
        <template slot-scope="scope">{{
          $root.dictAllName(scope.row.special, "YesOrNoType")
        }}</template>
      </el-table-column>
      <el-table-column prop="city" label="业务开展城市">
        <template v-slot="{ row }">
          {{ $root.getAreaName(row.city) }}
        </template>
      </el-table-column>
      <el-table-column prop="cityGrade" label="城市等级">
        <template slot-scope="scope">{{
          $root.dictAllName(scope.row.cityGrade, "CityLevel")
        }}</template>
      </el-table-column>
      <el-table-column prop="channelGrade" label="渠道等级">
        <template slot-scope="scope">{{
          $root.dictAllName(scope.row.channelGrade, "ChannelLevel")
        }}</template>
      </el-table-column>
    </el-table>
    <p class="ih-info-title">附件信息</p>
    <el-table
      :data="showChannelApprovalAttachments"
      style="width: 100%; padding: 20px"
    >
      <!-- <el-table-column prop="storageNum" label="编号" width="180">
        </el-table-column> -->
      <el-table-column prop="type" label="类型" width="180">
        <template slot-scope="scope">
          {{ $root.dictAllName(scope.row.type, "ChannelGradeAttachment") }}
        </template>
      </el-table-column>
      <el-table-column prop="channelName" label="渠道商名称" width="180">
      </el-table-column>
      <el-table-column prop="city" label="业务开展城市" width="180">
        <template slot-scope="scope">
          {{ $root.getAreaName(scope.row.city) }}
        </template>
      </el-table-column>
      <el-table-column prop="attachmentDetails" label="附件">
        <template slot-scope="scope">
          <span
            class="margin-right-10"
            v-for="(cItem, cIndex) in scope.row.attachmentDetails"
            :key="cIndex"
          >
            <IhFilePreview :data="cItem"></IhFilePreview>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <p class="ih-info-title">推送OA附件清单</p>
    <div class="text-left margin-left-30" style="color: #999">
      {{ info.oaAttachmentVOs && info.oaAttachmentVOs.length > 0 ? "" : "无" }}
    </div>
    <div
      class="text-left margin-left-30"
      v-for="(item, index) in info.oaAttachmentVOs"
      :key="index"
      @click="down(item)"
    >
      <el-link>{{ item.fileName }}</el-link>
    </div>
    <!-- <div class="text-left margin-left-30">
      <el-link>广州链家宝业房地产经纪有限公司_广州市_特批入库补充材料.rar</el-link>
    </div> -->
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  get_channelApproval_get__id,
  post_channelGrade_getChannelGradeAttachmentByType,
} from "../../../../api/channel/index";
@Component({
  components: {},
})
export default class InvitationCodeDetails extends Vue {
  info: any = {
    channelApprovalAttachments: [],
    channelApprovalGrades: [],
    oaAttachmentVOs: [],
  };
  showChannelApprovalAttachments: any[] = [];

  async created() {
    let id = this.$route.query.id;
    this.info = await get_channelApproval_get__id({ id: id });
    this.showChannelApprovalAttachments = [];
    (this.info.channelApprovalGrades || []).forEach((item: any) => {
      this.loadAttachments(item, item.gradeType);
    });
  }
  async loadAttachments(item: any, gradeType: any) {
    const res: any = await post_channelGrade_getChannelGradeAttachmentByType({
      gradeId: item.gradeId,
      gradeType: gradeType,
    });
    console.log(res);
    if (res.channelId) {
      this.showChannelApprovalAttachments.push(res);
    }

    // res.forEach((element: any) => {
    //   element.storageNum = item.storageNum;

    // });
  }
  down(item: any) {
    let url = this.$tool.downloadLongFileUrl(item.fileId, item);
    console.log(url);
    (window as any).open(url);
  }
}
</script>
<style lang="scss" scoped>
.el-row {
  line-height: 30px;
}
</style>
