<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-10-15 12:33:25
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-23 17:35:58
-->
<template>
  <div class="text-left">
    <p class="ih-info-title">基础信息</p>
    <el-form
      ref="form"
      label-width="120px"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="渠道商"
            required
            align="left"
          >
            <span class="text-ellipsis">{{ resPageInfo.channelId
              }}<el-link
                style="margin-left: 5px"
                :href="`/web-sales/channels/info?id=${resPageInfo.channelId}`"
                type="primary"
                target="_blank"
              >详情</el-link></span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="渠道等级"
            required
            align="left"
          >
            <span>{{
              $root.dictAllName(resPageInfo.channelGrade, "ChannelLevel")
            }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="渠道类型"
            required
            align="left"
          >
            <span>{{
              $root.dictAllName(resPageInfo.channelType, "ChannelType")
            }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="业务开展省份"
            required
            align="left"
          >
            <span>{{ $root.getAreaName(resPageInfo.province) }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="业务开展城市"
            required
            align="left"
          >
            <span>{{ $root.getAreaName(resPageInfo.city) }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="城市等级"
            align="left"
          >
            <span>{{
                  $root.dictAllName(resPageInfo.cityGrade, "CityLevel")
                }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="是否特批入库"
            required
            align="left"
          >
            <span>{{
                  $root.dictAllName(resPageInfo.special, "YesOrNoType")
                }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="入库编号"
            align="left"
          >
            <span>{{ resPageInfo.storageNum }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="状态"
            align="left"
          >
            <span>{{
                  $root.dictAllName(resPageInfo.status, "ChannelStatus")
                }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <p class="ih-info-title">
      评级信息
      <el-link
        class="margin-left-15"
        href="/web-sales/gradeStandard/list"
        type="success"
        target="_blank"
      >查看所有标准</el-link>
    </p>
    <div class="padding-left-20">
      <el-table
        class="ih-table"
        :data="resPageInfo.channelGradeItemChanges"
        style="width: 100%"
      >
        <el-table-column
          prop="cityGrade"
          label="城市等级"
        >
          <template v-slot="{ row }">{{
          $root.dictAllName(row.cityGrade, "CityLevel")
        }}</template>
        </el-table-column>
        <el-table-column
          prop="channelGrade"
          label="渠道等级"
        >
          <template v-slot="{ row }">{{
          $root.dictAllName(row.channelGrade, "ChannelLevel")
        }}</template>
        </el-table-column>
        <el-table-column
          prop="gradeItem"
          label="评级项"
        ></el-table-column>
        <el-table-column
          prop="inputValue"
          label="录入信息"
        ></el-table-column>
        <el-table-column
          prop="gradeStandard"
          label="评级标准"
        ></el-table-column>
      </el-table>
      <br />
    </div>
    <p class="ih-info-title">
      附件信息
      <el-link
        class="margin-left-15"
        href="http://zxgk.court.gov.cn/zhzxgk/"
        type="success"
        target="_blank"
      >综合查询被执行人</el-link>
    </p>
    <div class="padding-left-20">
      <el-table
        class="ih-table"
        :data="resPageInfo.channelGradeAttachmentChanges"
        style="width: 100%"
      >
        <el-table-column
          prop="type"
          label="类型"
          width="200"
        >
          <template v-slot="{ row }">{{
          $root.displayName("accessoryTpye", row.type)
        }}</template>
        </el-table-column>
        <el-table-column
          prop="fileId"
          label="附件"
        >
          <IhUpload
            size="100px"
            :fileList="fileList"
          />
        </el-table-column>
      </el-table>
      <br />
    </div>

    <p class="ih-info-title">变更原因</p>
    <div class="padding-left-20">{{resPageInfo.changeReason}}</div>

    <template v-if="pageName === 'LevelChangeExamine'">
      <p class="ih-info-title">审核意见</p>
      <div class="padding-left-20">
        <el-input
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 10 }"
          placeholder="请输入内容"
          v-model="remark"
        >
        </el-input>
      </div>
      <div class="text-center">
        <el-button
          class="margin-top-30"
          @click="pass('Pass')"
          type="primary"
        >通过</el-button>
        <el-button
          class="margin-top-30"
          @click="pass('Reject')"
          type="primary"
        >驳回</el-button>
      </div>
    </template>

    <template v-if="pageName === 'LevelChangeRevoke'">
      <p class="ih-info-title">撤回原因</p>
      <div class="padding-left-20">
        <el-input
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 10 }"
          placeholder="请输入内容"
          v-model="remark"
        >
        </el-input>
      </div>
      <div class="text-center">
        <el-button
          class="margin-top-30"
          @click="pass('Revoke')"
          type="primary"
        >提交</el-button>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
//引入请求数据的api
import {
  get_channelGradeChange_get__id,
  post_channelGradeChange_approveRecord,
} from "../../../../api/channel/index";
@Component({
  components: {},
})
export default class Home extends Vue {
  private get pageName(): string | null | undefined {
    return this.$route.name;
  }
  private get Id() {
    return this.$route.query.id;
  }

  private fileList = [];
  private info = [];
  private remark = "";

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

  async pass(val: any) {
    if (this.remark) {
      await post_channelGradeChange_approveRecord({
        remark: this.remark,
        id: this.Id,
        result: val,
      });
      this.$message({
        type: "success",
        message: this.showMsg(val),
      });
      this.$router.push("list");
    } else {
      this.$message({
        type: "warning",
        message: val === "Revoke" ? "请填写撤回原因" : "请填写审核意见",
      });
    }
  }
  showMsg(val: any): string {
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
  async getInfo() {
    let id = this.$route.query.id;
    if (id) this.resPageInfo = await get_channelGradeChange_get__id({ id: id });
  }

  async created() {
    this.getInfo();
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