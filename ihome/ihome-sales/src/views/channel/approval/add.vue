<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-09 14:31:23
 * @LastEditors: zyc
 * @LastEditTime: 2020-10-14 20:41:43
--> 
<template>
  <ih-page>
    <p class="ih-info-title">基础信息</p>
    <el-row class="ih-info-line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">申请编号</el-col>
          <el-col :span="18" class="ih-info-item-right"> xxx</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">发起人</el-col>
          <el-col :span="18" class="ih-info-item-right">xxx</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">事业部</el-col>
          <el-col :span="18" class="ih-info-item-right">
            <el-select
              v-model="postData.departmentOrgId"
              clearable
              placeholder="事业部"
              class="width--100"
            >
              <el-option
                v-for="item in divisionList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div class="ih-info-title">
      <div>渠道等级信息列表</div>
      <div class="info-btn-list">
        <el-button type="primary" @click="addChannelApprovalGrades()"
          >添加</el-button
        >
        <el-button type="success" @click="addChannelApprovalGradesChange()"
          >添加变更信息</el-button
        >

        <a
          class="margin-left-20 el-link el-link--primary is-underline"
          href="javascript:;"
          >预览供应商名录</a
        >
      </div>
    </div>

    <el-table :data="channelApprovalGrades" style="width: 100%; padding: 20px">
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
      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <el-link
            style="color: #409eff"
            class="margin-right-10"
            type="primary"
            @click.native.prevent="remove(scope)"
            >移除</el-link
          >
        </template>
      </el-table-column>
    </el-table>
    <p class="ih-info-title">附件信息</p>
    <el-table
      :data="channelApprovalAttachmentsList"
      style="width: 100%; padding: 20px"
    >
      <el-table-column prop="date" label="类型" width="180"> </el-table-column>
      <el-table-column prop="name" label="渠道商名称" width="180">
      </el-table-column>
      <el-table-column prop="name" label="业务开展城市"> </el-table-column>
      <el-table-column prop="name" label="附件"> </el-table-column>
    </el-table>
    <p class="ih-info-title">呈批信息</p>
    <el-row class="ih-info-line">
      <el-form ref="form" label-width="80px">
        <el-form-item label="呈批标题">
          <el-input
            maxlength="64"
            v-model="postData.approvalTitle"
            placeholder="呈批标题"
          ></el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row class="ih-info-line text-left">
      <span style="padding: 10px; line-height: 40px"> 呈批说明 </span>
      <span>
        <el-input
          type="textarea"
          :rows="10"
          placeholder="呈批说明"
          v-model="postData.approvalDesc"
        >
        </el-input>
      </span>
    </el-row>
    <div>
      <el-button type="primary">保存</el-button>
      <el-button type="success">提交</el-button>
    </div>
    <ih-dialog :show="dialogAdd" desc="渠道合作信息列表">
      <ChannelApprovalGradesList
        @cancel="() => (dialogAdd = false)"
        @finish="
          (data) => {
            dialogAdd = false;
            finishAdd(data);
          }
        "
      />
    </ih-dialog>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChannelApprovalGradesList from "@/views/channel/approval/channel-approval-grades/list.vue";
@Component({
  components: { ChannelApprovalGradesList },
})
export default class ApprovalAdd extends Vue {
  divisionList: any = [];
  departmentOrgId: any = null;
  input: any = null;
  textarea: any = null;
  dialogAdd: any = false;
  channelApprovalGrades: any = [];
  channelApprovalAttachmentsList: any = [];
  postData: any = {
    approvalDesc: null,
    approvalTitle: null,
    channelApprovalAttachments: [
      {
        approvalId: null,
        id: null,
      },
    ],
    channelApprovalGrades: [
      {
        approvalId: null,

        id: null,
      },
    ],
    departmentOrgId: null,
  };

  async created() {
    let id = this.$route.query.id;
    console.log(id);
  }
  addChannelApprovalGrades() {
    this.dialogAdd = true;
  }
  finishAdd(data: any) {
    console.log(data);
    this.channelApprovalGrades = data;
  }
  addChannelApprovalGradesChange() {
    this.dialogAdd = true;
  }
  remove(scope: any) {
    this.channelApprovalGrades.splice(scope.$index, 1);
  }
}
</script>
<style lang="scss" scoped>
.ih-info-item-left,
.ih-info-item-right {
  line-height: 40px;
}
.info-btn-list {
  float: left;
  margin-left: 150px;
  margin-top: -25px;
}
</style>
