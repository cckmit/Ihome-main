<!--
 * @Description:
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-09 14:31:23
 * @LastEditors: lsj
 * @LastEditTime: 2021-05-15 09:41:36
--> 
<template>
  <ih-page>
    <el-row class="ih-info-line">
      <el-col class="text-left">
        <h3>入库编号：{{ id ? postData.approvalNo : '保存后自动生成' }}</h3>
      </el-col>
    </el-row>
    <el-row class="ih-info-line">
      <el-col :span="18">
        <el-row>
          <el-col class="ih-info-item-right item-padding-left-0">
            发起人：{{id ? postData.inputTime : $root.userInfo.name}}
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6" class="text-right">
        <el-row>
          <el-col class="text-right">当前状态</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="ih-info-line">
      <el-col :span="18">
        <el-row>
          <el-col class="ih-info-item-right item-padding-left-0">
            发起日期：{{id ? postData.createTime : $tool.todayStr()}}
          </el-col>
        </el-row>
      </el-col>
      <el-col
        :span="6"
        class="text-right"
        style="font-weight: 700; font-size: 20px">
        <el-row>
          <el-col class="text-right">
            <div class="ih-status-dot flex-content" v-if="id ? postData.status : 'Draft'">
              <span class="dot" :class="getStatusDot(id ? postData.status : 'Draft')"></span>
              <span>{{ $root.dictAllName(id ? postData.status : 'Draft', "ChannelApprovalStatus") }}</span>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-form
      :model="postData"
      :rules="rules"
      ref="ruleForm"
      label-width="110px"
      class="demo-ruleForm">
<!--      <p class="ih-info-title">基础信息</p>-->
      <el-row class="ih-info-line">
<!--        <el-col :span="8">
          <el-row>
            <el-col :span="6" class="ih-info-item-left">申请编号</el-col>
            <el-col :span="18" class="ih-info-item-right">
              {{ postData.approvalNo }}</el-col
            >
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="6" class="ih-info-item-left">发起人</el-col>
            <el-col :span="18" class="ih-info-item-right">{{
              postData.approvalUserName
            }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            &lt;!&ndash; <el-col :span="6" class="ih-info-item-left">事业部</el-col> &ndash;&gt;
            <el-col
              :span="24"
              class="ih-info-item-right"
              style="margin-left: 0px"
            >
              <el-form-item
                label="事业部"
                prop="departmentOrgId"
                class="width&#45;&#45;100"
              >
                <el-select
                  v-model="postData.departmentOrgId"
                  @change="changeDepartment()"
                  filterable
                  placeholder="请选择事业部"
                  class="width&#45;&#45;100"
                >
                  <el-option
                    v-for="item in departmentList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
                &lt;!&ndash; <IhSelectPageDivision
                  v-model="postData.departmentOrgId"
                  :searchName="postData.departmentName"
                  clearable
                  value-key="id"
                >
                </IhSelectPageDivision> &ndash;&gt;
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>-->
        <el-col
          :span="8"
          class="ih-info-item-right"
          style="margin-left: 0px">
          <el-form-item
            label="事业部"
            prop="departmentOrgId"
            class="width--100"
          >
            <el-select
              v-model="postData.departmentOrgId"
              @change="changeDepartment()"
              filterable
              placeholder="请选择事业部"
              class="width--100"
            >
              <el-option
                v-for="item in departmentList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <!-- <IhSelectPageDivision
              v-model="postData.departmentOrgId"
              :searchName="postData.departmentName"
              clearable
              value-key="id"
            >
            </IhSelectPageDivision> -->
          </el-form-item>
        </el-col>
        <el-col
          :span="24"
          class="ih-info-item-right"
          style="margin-left: 0px">
          <el-form-item
            label="待呈批列表"
            class="width--100">
            <div style="margin-bottom: 5px">
              <el-button
                size="small"
                type="primary"
                @click="addChannelApprovalGrades()"
              >添加新增信息</el-button>
              <el-button
                size="small"
                type="success"
                @click="addChannelApprovalGradesChange()"
              >添加变更信息</el-button>
              <span v-if="false" class="padding-left-20" @click="preFileName()">
            <el-link type="success">预览供应商名录</el-link>
          </span>
            </div>
            <el-table
              :data="showChannelApprovalGrades"
              style="width: 100%">
              <el-table-column prop="storageNum" label="入库编号" width="180">
                <template slot-scope="scope">
                  <el-link
                    class="margin-right-10"
                    type="primary"
                    @click.native.prevent="goInfo(scope)"
                  >{{ scope.row.storageNum }}</el-link>
                </template>
              </el-table-column>
              <el-table-column prop="channelName" label="渠道商名称" min-width="130">
              </el-table-column>
              <el-table-column prop="gradeType" label="申请类型" min-width="120">
                <template slot-scope="scope">
                  {{ $root.dictAllName(scope.row.gradeType, "ChannelGradeChangeType") }}
                </template>
              </el-table-column>
              <el-table-column prop="channelGrade" label="渠道等级" min-width="120">
                <template slot-scope="scope">
                  {{ $root.dictAllName(scope.row.channelGrade, "ChannelLevel") }}
                </template>
              </el-table-column>
              <el-table-column prop="city" label="业务开展城市" min-width="140">
                <template slot-scope="scope">
                  {{ $root.getAreaName(scope.row.city) }}
                </template>
              </el-table-column>
              <el-table-column prop="cityGrade" label="城市等级" min-width="110">
                <template slot-scope="scope">
                  {{ $root.dictAllName(scope.row.cityGrade, "CityLevel") }}
                </template>
              </el-table-column>
              <el-table-column prop="special" label="特批入库" width="90">
                <template slot-scope="scope">
                  {{ $root.dictAllName(scope.row.special, "YesOrNoType") }}
                </template>
              </el-table-column>
              <el-table-column prop="channelApprovalAttachments" label="特批入库材料" min-width="200">
                <template slot-scope="scope">
                  <div class="attach-file-wrapper">
                    <div
                      class="file-width"
                      v-for="(cItem, cIndex) in scope.row.channelApprovalAttachments"
                      :key="cIndex">
                      <IhFilePreview :data="cItem"></IhFilePreview>
                    </div>
                  </div>
                </template>
              </el-table-column>
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
          </el-form-item>
        </el-col>
        <el-col
          :span="24"
          class="ih-info-item-right"
          style="margin-left: 0px">
          <el-form-item
            label="经办部门意见"
            class="width--100">
            <el-input
              type="textarea"
              :rows="10"
              placeholder="经办部门意见"
              v-model="postData.approvalDesc"
              maxlength="512"
              show-word-limit>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>


<!--      <div class="ih-info-title">
        <div>渠道等级信息列表</div>
        <div class="info-btn-list">
          <el-button
            size="small"
            type="primary"
            @click="addChannelApprovalGrades()"
            >添加</el-button
          >
          <el-button
            size="small"
            type="success"
            @click="addChannelApprovalGradesChange()"
            >添加变更信息</el-button
          >
          <span v-if="false" class="padding-left-20" @click="preFileName()">
            <el-link type="success">预览供应商名录</el-link>
          </span>
        </div>
      </div>
      <el-table
        :data="showChannelApprovalGrades"
        style="width: 100%; padding: 20px"
      >
        <el-table-column prop="storageNum" label="入库编号" width="180">
          <template slot-scope="scope">
            <el-link
              class="margin-right-10"
              type="primary"
              @click.native.prevent="goInfo(scope)"
              >{{ scope.row.storageNum }}</el-link
            >
          </template>
        </el-table-column>
        <el-table-column prop="channelName" label="渠道商名称" width="180">
        </el-table-column>
        &lt;!&ndash; <el-table-column prop="name" label="信用代码"> </el-table-column>
      <el-table-column prop="name" label="法定代表人"> </el-table-column> &ndash;&gt;
        <el-table-column prop="special" label="特批入库">
          <template slot-scope="scope">
            {{ $root.dictAllName(scope.row.special, "YesOrNoType") }}
          </template>
        </el-table-column>
        <el-table-column prop="city" label="业务开展城市">
          <template slot-scope="scope">
            {{ $root.getAreaName(scope.row.city) }}
          </template>
        </el-table-column>
        <el-table-column prop="cityGrade" label="城市等级">
          <template slot-scope="scope">
            {{ $root.dictAllName(scope.row.cityGrade, "CityLevel") }}
          </template>
        </el-table-column>
        <el-table-column prop="channelGrade" label="渠道等级">
          <template slot-scope="scope">
            {{ $root.dictAllName(scope.row.channelGrade, "ChannelLevel") }}
          </template>
        </el-table-column>
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
        :data="showChannelApprovalAttachments"
        style="width: 100%; padding: 20px"
      >
        &lt;!&ndash; <el-table-column prop="storageNum" label="编号" width="180">
        </el-table-column> &ndash;&gt;
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
      <p class="ih-info-title">呈批信息</p>
      <el-row class="ih-info-line text-left">
        <el-form-item label="经办部门意见" prop="approvalDesc">
          <el-input
            type="textarea"
            :rows="10"
            placeholder="经办部门意见"
            v-model="postData.approvalDesc"
            maxlength="512"
            show-word-limit
          ></el-input>
        </el-form-item>

        &lt;!&ndash; <span style="padding: 10px; line-height: 40px" prop="approvalDesc">
          经办部门意见
        </span>
        <span>
          <el-input
            type="textarea"
            :rows="10"
            placeholder="经办部门意见"
            v-model="postData.approvalDesc"
            maxlength="512"
            show-word-limit
          >
          </el-input>
        </span> &ndash;&gt;
      </el-row>-->
      <div>
        <el-button type="primary" @click="save()" :disabled="infoFinish"
          >保存为草稿</el-button
        >
        <el-button type="success" @click="submit()" :disabled="infoFinish"
          >提交呈批</el-button
        >
      </div>
      <ih-dialog :show="dialogAdd" desc="选择申请呈批信息">
        <ChannelApprovalGradesList
          :data="dialogAddGradeType"
          :departmentOrgId="postData.departmentOrgId"
          @cancel="() => (dialogAdd = false)"
          @finish="
            (data, gradeType) => {
              dialogAdd = false;
              finishAdd(data, gradeType);
            }
          "
        />
      </ih-dialog>
      <ih-dialog
        v-if="showOaSubmit"
        :show="showOaSubmit"
        desc="提交呈批确认信息"
      >
        <OaSubmit :data="postData" @cancel="() => (showOaSubmit = false)" />
      </ih-dialog>
    </el-form>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChannelApprovalGradesList from "@/views/channel/approval/channel-approval-grades/list.vue";
import OaSubmit from "./dialog/oa-submit.vue";

import {
  post_channelApproval_add,
  post_channelApproval_edit,
  get_channelApproval_get__id,
  post_channelGrade_getChannelGradeAttachmentByType,
  post_channelApproval_previewDirectoryFile,
} from "../../../api/channel/index";
import { get_org_getUserDepartmentList } from "../../../api/system/index";
import { Form as ElForm } from "element-ui";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
@Component({
  components: { ChannelApprovalGradesList, OaSubmit },
})
export default class ApprovalAdd extends Vue {
  departmentOrgId: any = null;
  input: any = null;
  textarea: any = null;
  dialogAdd: any = false;
  dialogAddGradeType: any = null;
  channelApprovalGrades: any[] = []; //渠道等级信息列表,页面显示字段
  channelApprovalAttachmentsList: any = []; //附件信息
  departmentList: any = []; //事业部下拉框
  id: any = null;
  showOaSubmit = false;
  infoFinish = false;

  rules: any = {
    departmentOrgId: [
      { required: true, message: "事业部必选", trigger: "change" },
    ],
    approvalDesc: [
      { required: true, message: "经办部门意见必填", trigger: "change" },
    ],
  };

  postData: any = {
    approvalDesc: `公司领导：
2020年XX分公司已入库渠道公司XX家（已通过OA呈批入库的数量，如果0就删除），本次申请入库XX家，业务系统已上传相关资料且均已审核通过，其中大平台/大型中介/一级平台共X家，中型中介/二级平台共X家，小型中介共X家。
本次甄选合格的公司详见附件1：《爱家XX分公司渠道合格供应商名录》。
1、如有不符合供应商管理办法的特殊情况公司，请补充说明申请入库理由，例如公司资质、实力、规模、以往代表项目及业绩等情况；
2、如入库公司数量较少，建议补充说明入库公司的情况，尤其是大平台/大型中介/一级平台情况
附件1：《爱家XX分公司渠道合格供应商名录》
附件2：《XX渠道公司特批入库补充材料》
特此申请！ 
妥否，请领导批示！`,
    channelApprovalAttachments: [],
    channelApprovalGrades: [],
    departmentOrgId: null,
    operateType: null, //1保存2提交
    approvalUserName: (this as any).$root.userInfo.name,
  };

  showChannelApprovalAttachments: any = []; //展示选择的渠道等级
  showChannelApprovalGrades: any[] = []; //展示附件信息

  async created() {
    this.id = this.$route.query.id;
    this.departmentList = await get_org_getUserDepartmentList();
    if (this.id) {
      try {
        const res: any = await get_channelApproval_get__id({ id: this.id });
        this.infoFinish = false;
        this.postData = res;

        res.channelApprovalGrades.forEach((item: any) => {
          this.showChannelApprovalGrades.push(item);
          // this.loadAttachments(item, item.gradeType);
        });
      } catch (error) {
        this.infoFinish = false;
      }
    } else {
      this.infoFinish = false;
    }
  }
  // 获取颜色
  getStatusDot(status: any = '') {
    if (status === 'Draft') {
      return 'warning';
    } else if (status === 'Approved') {
      return 'success';
    } else if (status === 'ApprovalFailed') {
      return 'error';
    } else {
      return 'primary';
    }
  }
  changeDepartment() {
    this.postData.channelApprovalGrades = [];
    this.showChannelApprovalGrades = [];
    this.showChannelApprovalAttachments = [];
  }
  isExis(list: any[], item: any) {
    let r = false;
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      if (element.gradeId == item.id && element.gradeType == item.gradeType) {
        r = true;
        break;
      }
    }
    return r;
  }

  async finishAdd(list: any, gradeType: string) {
    list.forEach((item: any) => {
      item.gradeId = item.id;
      item.gradeType = gradeType;
      if (!this.isExis(this.postData.channelApprovalGrades, item)) {
        this.postData.channelApprovalGrades.push({
          gradeId: item.id,
          gradeType: gradeType,
        });
        this.showChannelApprovalGrades.push(item);
        // this.loadAttachments(item, gradeType);
      }
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
  addChannelApprovalGrades() {
    if (this.postData.departmentOrgId) {
      this.dialogAddGradeType = "Basic";
      this.dialogAdd = true;
    } else {
      this.$message.warning("请先选择事业部");
    }
  }
  addChannelApprovalGradesChange() {
    if (this.postData.departmentOrgId) {
      this.dialogAddGradeType = "Change";
      this.dialogAdd = true;
    } else {
      this.$message.warning("请先选择事业部");
    }
  }
  remove(scope: any) {
    let tempList: any[] = [];
    this.showChannelApprovalAttachments.forEach((item: any) => {
      if (item.storageNum != scope.row.storageNum) {
        tempList.push(item);
      }
    });
    this.showChannelApprovalAttachments = tempList;
    this.postData.channelApprovalGrades.splice(scope.$index, 1);

    this.showChannelApprovalGrades.splice(scope.$index, 1);
  }
  async save() {
    if (
      this.postData.channelApprovalGrades &&
      this.postData.channelApprovalGrades.length > 0
    ) {
      if (this.id) {
        (this.$refs["ruleForm"] as ElForm).validate(this.editSave);
      } else {
        (this.$refs["ruleForm"] as ElForm).validate(this.addSave);
      }
    } else {
      this.$message.warning("请先添加渠道等级数据");
    }
  }
  @NoRepeatHttp()
  async addSave(valid: any) {
    if (valid) {
      this.postData.operateType = 1;
      await post_channelApproval_add(this.postData);
      this.$message.success("新增成功");
      this.$goto({
        path: "/approval/list",
      });
    } else {
      return false;
    }
  }
  @NoRepeatHttp()
  async editSave(valid: any) {
    if (valid) {
      this.postData.operateType = 1;

      console.log(this.postData);
      await post_channelApproval_edit(this.postData);
      this.$message.success("修改成功");
      this.$goto({
        path: "/approval/list",
      });
    } else {
      this.$message.warning("请先填好数据再保存");
      return false;
    }
  }
  async submit() {
    if (
      this.postData.channelApprovalGrades &&
      this.postData.channelApprovalGrades.length > 0
    ) {
      (this.$refs["ruleForm"] as ElForm).validate((valid: any) => {
        if (valid) {
          this.showOaSubmit = true;
        }
      });
    } else {
      this.$message.warning("请先添加渠道等级数据");
    }
  }
  @NoRepeatHttp()
  async submitApi(valid: any) {
    if (valid) {
      this.postData.operateType = 2;
      if (this.id) {
        await post_channelApproval_edit(this.postData);
        this.$message.success("提交成功");
        this.$goto({
          path: "/approval/list",
        });
      } else {
        await post_channelApproval_add(this.postData);
        this.$message.success("提交成功");
        this.$goto({
          path: "/approval/list",
        });
      }
    }
  }
  goInfo(scope: any) {
    // 判断跳转的页面
    if (scope.row.gradeType === 'Basic') {
      // 需要跳转到渠道等级信息详情
      window.open(`/web-sales/channelLevel/info?id=${scope.row.id || scope.row.gradeId}`);
    } else if (scope.row.gradeType === 'Change') {
      // 需要跳转到渠道等级信息变更详情
      window.open(`/web-sales/channelLevelChange/info?id=${scope.row.id || scope.row.gradeId}`);
    }
  }
  async preFileName() {
    const res: any = await post_channelApproval_previewDirectoryFile(
      this.postData
    );

    let url = this.$tool.downloadLongFileUrl(res);
    console.log(url);
    (window as any).open(url);
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
.ih-page {
  overflow: hidden;
}
.item-padding-left-0 {
  padding-left: 0px;
}
/deep/ .ih-info-line {
  padding: 0 10px 10px 10px;
}
/deep/ .el-card__header {
  background: #f9f9f9;
}
.flex-content {
  justify-content: flex-end;
}
.file-width {
  /deep/ .el-image {
    width: 60px !important;
  }
}
.attach-file-wrapper {
  display: flex;
  flex-wrap: wrap;
}
</style>
