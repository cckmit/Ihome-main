<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-10-15 12:33:25
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-16 14:20:28
-->
<template>
  <div class="text-left">
    <p class="ih-info-title">基础信息</p>
    <el-form ref="form" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="渠道商" required align="left">
            <span class="text-ellipsis"
              >{{ resPageInfo.channelId
              }}<el-link
                style="margin-left: 5px"
                :href="`/web-sales/channels/info?id=${resPageInfo.channelId}`"
                type="primary"
                target="_blank"
                >详情</el-link
              ></span
            >
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="渠道等级" required align="left">
            <span>{{
              $root.dictAllName(resPageInfo.channelGrade, "ChannelLevel").name
            }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="渠道类型" required align="left">
            <span>{{
              $root.dictAllName(resPageInfo.channelType, "ChannelType").name
            }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-collapse-transition>
        <div v-show="searchOpen">
          <el-row>
            <el-col :span="8">
              <el-form-item label="业务开展省份" required align="left">
                <span>{{ $root.getAreaName(resPageInfo.province) }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="业务开展城市" required align="left">
                <span>{{ $root.getAreaName(resPageInfo.city) }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="城市等级" align="left">
                <span>{{
                  $root.dictAllName(resPageInfo.cityGrade, "CityLevel").name
                }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否特批入库" required align="left">
                <span>{{
                  $root.dictAllName(resPageInfo.special, "YesOrNoType").name
                }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="入库编号" align="left">
                <span>{{ resPageInfo.storageNum }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="状态" align="left">
                <span>{{
                  $root.dictAllName(resPageInfo.status, "ChannelStatus").name
                }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-collapse-transition>
    </el-form>

    <el-row>
      <el-link
        type="primary"
        class="float-right margin-right-40"
        @click="openToggle()"
        >{{ searchOpen ? "收起" : "展开" }}</el-link
      >
    </el-row>
    <p class="ih-info-title">
      评级信息
      <el-link
        style="margin-left: 15px; font-size: 15px"
        href="/web-sales/gradeStandard/list"
        type="primary"
        target="_blank"
        >查看所有标准</el-link
      >
    </p>
    <br />
    <el-table
      class="ih-table"
      :data="resPageInfo.channelGradeItems"
      style="width: 100%"
    >
      <el-table-column prop="cityGrade" label="城市等级">
        <template v-slot="{ row }">{{
          $root.dictAllName(row.cityGrade, "CityLevel").name
        }}</template>
      </el-table-column>
      <el-table-column prop="channelGrade" label="渠道等级">
        <template v-slot="{ row }">{{
          $root.dictAllName(row.channelGrade, "ChannelLevel").name
        }}</template>
      </el-table-column>
      <el-table-column prop="gradeItem" label="评级项"></el-table-column>
      <el-table-column prop="inputValue" label="录入信息"></el-table-column>
      <el-table-column prop="gradeStandard" label="评级标准"></el-table-column>
    </el-table>
    <br />
    <p class="ih-info-title">
      附件信息
      <el-link
        style="margin-left: 15px; font-size: 15px"
        href="http://zxgk.court.gov.cn/zhzxgk/"
        type="primary"
        target="_blank"
        >综合查询被执行人</el-link
      >
    </p>
    <br />
    <el-table
      class="ih-table"
      :data="resPageInfo.channelGradeAttachments"
      style="width: 100%"
    >
      <el-table-column prop="type" label="类型" width="200">
        <template v-slot="{ row }">{{
          $root.displayName("accessoryTpye", row.type)
        }}</template>
      </el-table-column>
      <el-table-column prop="fileId" label="附件">
        <IhUpload size="100px" :fileList="fileList" />
      </el-table-column>
    </el-table>
    <br />

    <div v-if="typeStr === 'channelLevlAudit'" class="text-left">
      <p class="ih-info-title">审核信息</p>
      <p class="msg-title">审核意见</p>
      <el-input
        type="textarea"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="remark"
      >
      </el-input>
      <el-button class="margin-top-30" @click="pass('Pass')" type="primary"
        >通过</el-button
      >
      <el-button class="margin-top-30" @click="pass('Reject')" type="primary"
        >驳回</el-button
      >
    </div>

    <div v-if="typeStr === 'channelLevlRecall'" class="text-left">
      <p class="ih-info-title">撤回信息</p>
      <p class="msg-title">撤回原因</p>
      <el-input
        type="textarea"
        :autosize="{ minRows: 5, maxRows: 10 }"
        placeholder="请输入内容"
        v-model="remark"
      >
      </el-input>
      <el-button class="margin-top-30" @click="pass('Revoke')" type="primary"
        >提交</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
//引入请求数据的api
import {
  get_channelGrade_get__id,
  post_channelGrade_approveRecord,
} from "../../../../api/channel/index";
@Component({
  components: {},
})
export default class Home extends Vue {
  @Prop() typeStr!: string;

  private get Id() {
    return this.$route.query.id;
  }
  private fileList = [];
  private info = [];
  private remark = "";
  searchOpen = true;

  resPageInfo: any = {
    channelId: null,
    channelGrade: null,
    channelType: null,
    province: null,
    city: null,
    cityGrade: null,
    special: null,
    storageNum: null,
    status: null,
    channelGradeItems: [],
    channelGradeAttachments: [],
  };

  openToggle() {
    this.searchOpen = !this.searchOpen;
  }

  async created() {
    this.getInfo();
  }

  async getInfo() {
    let id = this.$route.query.id;
    if (id) this.resPageInfo = await get_channelGrade_get__id({ id: id });
  }

  async pass(val: any) {
    if (this.remark) {
      await post_channelGrade_approveRecord({
        remark: this.remark,
        id: this.Id,
        result: val,
      });
      this.$message({
        type: "success",
        message: this.showMsg(val),
      });
    } else {
      this.$message({
        type: "warning",
        message: val === "Revoke" ? "请填写撤回原因" : "请填写审核意见",
      });
    }
  }

  showMsg(val: any): string {
    console.log(val, "msg");
    switch (val) {
      case "Pass":
        return "审核通过";
      case "Reject":
        return "驳回成功";
      case "Revoke":
        return "撤回成功";
      default:
        return "";
    }
  }
}
</script>

<style lang="scss" scoped>
.text-ellipsis {
  width: 100%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.msg-title {
  text-align: left;
  margin-left: 25px;
}
</style>