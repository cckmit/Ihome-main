<!--
 * @Description: 合同的原件归档页面
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-25 16:00:37
 * @LastEditors: ywl
 * @LastEditTime: 2021-03-22 17:02:38
-->
<template>
  <IhPage>
    <template v-slot:info>
      <p class="ih-info-title">甲方合同信息</p>
      <el-form
        :model="formData"
        ref="ruleForm"
        label-width="120px"
        class="text-left"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="合同标题"
              prop="title"
            >
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
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="合作项目">
              {{formData.cooperationProjectsName}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="合作时间">
              {{formData.cooperationTime}}
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
              :rules="[
                { required: true, message: '请填写归档编号', trigger: 'change' },
              ]"
            >
              <el-input
                v-model="formData.archiveNo"
                placeholder="请填写归档编号"
              ></el-input>
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
                v-if="contractList.length"
                :file-list="contractList"
                size="100px"
                :limit="1"
                :removePermi="false"
              ></IhUpload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="盖章版归档">
              <IhUpload
                v-if="archiveList.length"
                :file-list="archiveList"
                size="100px"
                :limit="1"
                :removePermi="false"
              ></IhUpload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="text-center">
              <el-button
                type="primary"
                @click="submit()"
              >提交</el-button>
              <el-button @click="$router.go(-1)">取消</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";

import {
  get_contract_detail__id,
  post_contract_original_archive,
} from "@/api/contract/index";

@Component({})
export default class PartyAadd extends Vue {
  private formData: any = {
    archiveNo: null,
  };
  private contractList: any = [];
  private archiveList: any = [];

  @NoRepeatHttp()
  private submit() {
    (this.$refs["ruleForm"] as ElForm).validate(async (val) => {
      if (val) {
        console.log(this.formData);
        if (!this.formData.archiveNo) {
          this.$message.warning("归档编号不能为空");
          return;
        }
        await post_contract_original_archive({
          contractId: this.formData.id,
          archiveNo: this.formData.archiveNo,
        });
        this.$goto({
          path: "/partyA/list",
        });
        this.$message.success("原件归档成功");
      }
    });
  }
  private async getInfo() {
    let id = this.$route.query.id;
    if (id) {
      let res = await get_contract_detail__id({ id: id });
      this.formData = { ...this.formData, ...res };
      res.fileList.forEach((i: any) => {
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