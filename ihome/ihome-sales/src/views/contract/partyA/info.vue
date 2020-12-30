<!--
 * @Description: 合同的详情页面
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-25 16:00:37
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-30 19:12:36
-->
<template>
  <IhPage class="text-left partyA-info">
    <template v-slot:info>
      <p class="ih-info-title">甲方合同信息</p>
      <el-form
        :model="formData"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="合同标题">
              {{formData.title}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="甲方">
              <template v-for="(item, index) in formData.partyA">
                <span :key="item.id">
                  {{item.userName}}
                  <span v-if="index !== (formData.partyA.length-1)">、</span>
                </span>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方">
              {{formData.partyBName}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方收款账号">
              {{formData.receivingAccount}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="合作项目">
              {{formData.cooperationProjectsName}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="归属组织">
              {{formData.organizationName}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="合作时间">
              {{ formData.cooperationTime && formData.cooperationEnd ? `${formData.cooperationTime} ~ ${formData.cooperationEnd}` : '' }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="合同跟进人"
              label-width="160px"
            >
              {{formData.handlerName}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="成交确认人">
              {{formData.confirmer}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="成交确认人联系方式"
              label-width="160px"
            >
              {{formData.confirmerContact}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="合同编号">
              {{formData.contractNo}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="归档编号"
              label-width="160px"
            >
              {{formData.archiveNo}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="归档状态">
              {{ $root.dictAllName(formData.archiveStatus, 'ArchiveStatus')}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="审核状态"
              label-width="160px"
            >
              {{ $root.dictAllName(formData.approvalStatus, 'ApprovalStatus') }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="甲方合同附件">
              <IhUpload
                :file-list="contractList"
                size="100px"
                @newFileList="handleContract"
              ></IhUpload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="盖章版归档">
              <IhUpload
                :file-list="archiveList"
                size="100px"
                class="upload"
                @newFileList="handleArchive"
              ></IhUpload>
              <el-button
                type="primary"
                class="upload-button"
                @click="submit()"
              >提交</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="annotation padding-left-20">*注：上传附件后请点击提交按钮保存</div>
        <!-- <el-row>
          <el-col :span="24">
            <div>
              <el-button type="primary">提交</el-button>
              <el-button>取消</el-button>
            </div>
          </el-col>
        </el-row> -->
      </el-form>
      <p class="ih-info-title">甲方合同已关联周期</p>
      <div class="padding-left-20">
        <el-table
          class="ih-table partyA-table"
          :data="formData.cycleList"
        >
          <el-table-column
            label="周期编号"
            prop="approvalNo"
            min-width="180"
          ></el-table-column>
          <el-table-column
            label="周期名称"
            prop="termName"
            min-width="250"
          ></el-table-column>
          <el-table-column
            label="周期时间"
            width="185"
          >
            <template v-slot="{row}">
              <span>{{`${row.termStart} ~ ${row.termEnd}`}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="周期审核状态"
            prop="auditEnum"
            width="120"
          >
            <template v-slot="{ row }">
              {{ $root.dictAllName(row.auditEnum, "Audit") }}
            </template>
          </el-table-column>
          <el-table-column
            label="业务类型"
            prop="busTypeEnum"
          >
            <template v-slot="{ row }">
              {{ $root.dictAllName(row.busTypeEnum, "BusType") }}
            </template>
          </el-table-column>
          <el-table-column
            label="归属项目"
            prop="proName"
          ></el-table-column>
          <el-table-column
            label="省份"
            prop="province"
          >
            <template v-slot="{ row }">
              {{$root.getAreaName(row.province)}}
            </template>
          </el-table-column>
          <el-table-column
            label="城市"
            prop="city"
          >
            <template v-slot="{ row }">
              {{$root.getAreaName(row.city)}}
            </template>
          </el-table-column>
          <el-table-column
            label="行政区"
            prop="district"
          >
            <template v-slot="{ row }">
              {{$root.getAreaName(row.district)}}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </template>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import {
  get_contract_detail__id,
  post_contract_annex,
} from "@/api/contract/index";

@Component({})
export default class PartyAadd extends Vue {
  private formData: any = {};
  private contractList: any = [];
  private archiveList: any = [];
  private addContract: any = [];
  private addArchive: any = [];

  private handleContract(val: any) {
    this.addContract = val
      .filter((i: any) => {
        return i.response;
      })
      .map((item: any) => ({
        attachmentSuffix: item.name,
        fileNo: item.fileId,
        type: "ContractAnnex",
      }));
  }
  private handleArchive(val: any) {
    this.addArchive = val
      .filter((i: any) => {
        return i.response;
      })
      .map((item: any) => ({
        attachmentSuffix: item.name,
        fileNo: item.fileId,
        type: "ArchiveAnnex",
      }));
    console.log(this.addArchive);
  }
  private async submit() {
    if (this.addContract.length || this.addArchive.length) {
      try {
        await post_contract_annex({
          contractId: this.formData.id,
          annexList: this.addContract.concat(this.addArchive),
        });
        this.$message.success("提交附件成功");
      } catch (err) {
        console.log(err);
      }
    } else {
      this.$message.warning("请先上传附件");
    }
  }
  private async getInfo() {
    let id = this.$route.query.id;
    if (id) {
      this.formData = await get_contract_detail__id({ id: id });
      this.formData.fileList.forEach((i: any) => {
        if (i.type === "ContractAnnex") {
          this.contractList.push({
            name: i.attachmentSuffix,
            fileId: i.fileNo,
          });
        }
        if (i.type === "ArchiveAnnex") {
          this.archiveList.push({
            name: i.attachmentSuffix,
            fileId: i.fileNo,
          });
        }
      });
    }
  }

  created() {
    this.getInfo();
  }
}
</script>

<style lang="scss" scoped>
.partyA-info {
  /deep/ .upload {
    display: inline-block;
    line-height: normal;
  }
  .upload-button {
    position: absolute;
    bottom: 0;
    margin-left: 15px;
  }
  .annotation {
    color: #d9001b;
    font-size: 14px;
  }
}
</style>