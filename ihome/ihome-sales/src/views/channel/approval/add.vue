<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-09 14:31:23
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-17 21:10:42
--> 
<template>
  <ih-page>
    <el-form
      :model="postData"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <p class="ih-info-title">基础信息</p>
      <el-row class="ih-info-line">
        <el-col :span="8">
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
            <!-- <el-col :span="6" class="ih-info-item-left">事业部</el-col> -->
            <el-col
              :span="24"
              class="ih-info-item-right"
              style="margin-left: 0px"
            >
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
          </el-row>
        </el-col>
      </el-row>
      <div class="ih-info-title">
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
          <span class="padding-left-20"
            ><el-link type="success">预览供应商名录</el-link></span
          >
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
        <!-- <el-table-column prop="name" label="信用代码"> </el-table-column>
      <el-table-column prop="name" label="法定代表人"> </el-table-column> -->
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
        <!-- <el-table-column prop="storageNum" label="编号" width="180">
        </el-table-column> -->
        <el-table-column prop="type" label="类型" width="180">
          <template slot-scope="scope">
            {{ $root.dictAllName(scope.row.type, "ChannelGradeAttachment") }}
          </template>
        </el-table-column>
        <el-table-column prop="channelName" label="渠道商名称" width="180">
        </el-table-column>
        <el-table-column prop="city" label="业务开展城市">
          <template slot-scope="scope">
            {{ $root.getAreaName(scope.row.city) }}
          </template>
        </el-table-column>
        <el-table-column prop="attachmentDetails" label="附件">
          <template slot-scope="scope">
            <div v-for="(cItem, cIndex) in scope.row.attachmentDetails" :key="cIndex">
              {{ $tool.getFileUrl(cItem.fileId) }}
            </div>
          </template>
        </el-table-column>
      </el-table>
      <p class="ih-info-title">呈批信息</p>
      <el-row class="ih-info-line">
        <el-form-item label="呈批标题" prop="approvalTitle">
          <el-input
            maxlength="64"
            v-model="postData.approvalTitle"
            placeholder="呈批标题"
          ></el-input>
        </el-form-item>
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
        <el-button type="primary" @click="save()">保存为草稿</el-button>
        <el-button type="success" @click="submit()">提交呈批</el-button>
      </div>
      <ih-dialog :show="dialogAdd" desc="渠道合作信息列表">
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
    </el-form>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChannelApprovalGradesList from "@/views/channel/approval/channel-approval-grades/list.vue";
import {
  post_channelApproval_add,
  post_channelApproval_edit,
  get_channelApproval_get__id,
  post_channelGrade_getChannelGradeAttachmentByType,
} from "../../../api/channel/index";
import { get_org_getUserDepartmentList } from "../../../api/system/index";
import { Form as ElForm } from "element-ui";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
@Component({
  components: { ChannelApprovalGradesList },
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

  rules: any = {
    approvalTitle: [
      { required: true, message: "呈批标题必填", trigger: "change" },
    ],
    departmentOrgId: [
      { required: true, message: "事业部必选", trigger: "change" },
    ],
  };

  postData: any = {
    approvalDesc: null,
    approvalTitle: null,
    channelApprovalAttachments: [],
    channelApprovalGrades: [],
    departmentOrgId: null,
    operateType: null, //1保存2提交
  };

  showChannelApprovalAttachments: any = []; //展示选择的渠道等级
  showChannelApprovalGrades: any[] = []; //展示附件信息

  async created() {
    this.id = this.$route.query.id;
    this.departmentList = await get_org_getUserDepartmentList();
    if (this.id) {
      const res: any = await get_channelApproval_get__id({ id: this.id });
      this.postData = res;
      res.channelApprovalGrades.forEach((item: any) => {
        this.showChannelApprovalGrades.push(item);
        this.loadAttachments(item, item.gradeType);
      });
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
    list.forEach(async (item: any) => {
      item.gradeId = item.id;
      item.gradeType = gradeType;
      if (!this.isExis(this.postData.channelApprovalGrades, item)) {
        this.postData.channelApprovalGrades.push({
          gradeId: item.id,
          gradeType: gradeType,
        });
        this.showChannelApprovalGrades.push(item);
        this.loadAttachments(item, gradeType);
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

      // let editData = {
      //   approvalDesc: this.postData.approvalDesc,
      //   approvalTitle: this.postData.approvalTitle,
      //   channelApprovalAttachments: this.channelApprovalAttachmentsList.map(
      //     (item: any) => {
      //       return {
      //         approvalId: this.id,
      //         channelId: item.channelId,
      //         city: item.city,
      //         fileId: item.fileId,
      //         type: item.type,
      //       };
      //     }
      //   ),
      //   channelApprovalGrades: this.channelApprovalGrades.map((item: any) => {
      //     return {
      //       gradeId: item.id,
      //       gradeType: "Basic",
      //     };
      //     // return {
      //     //   approvalId: this.id,
      //     //   channelId: item.channelId,
      //     //   city: item.city,
      //     //   fileId: item.fileId,
      //     //   type: item.type,
      //     // };
      //   }),
      //   departmentOrgId: this.postData.departmentOrgId,
      //   id: this.postData.id,
      //   operateType: this.postData.operateType,
      // };
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
    (this.$refs["ruleForm"] as ElForm).validate(this.submitApi);
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
    } else {
      this.$message.warning("请先填好数据再保存");
      return false;
    }
  }
  goInfo(scope: any) {
    window.open(`/web-sales/channelLevel/info?id=${scope.row.id}`);
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
