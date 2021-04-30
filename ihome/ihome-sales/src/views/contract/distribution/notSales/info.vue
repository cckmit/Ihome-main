<!--
 * @Description: 非标联动销售确认书(启动函)申领
 * @version: 
 * @Author: ywl
 * @Date: 2021-04-01 17:49:15
 * @LastEditors: ywl
 * @LastEditTime: 2021-04-29 19:35:46
-->
<template>
  <IhPage class="text-left">
    <template #info>
      <p class="ih-info-title">非标联动销售确认书(启动函)详情</p>
      <el-form
        label-width="100px"
        class="padding-left-20"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="合同类型">{{$root.dictAllName(form.contractKind, 'ContractKind')}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="编号">{{form.contractNo}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="合同标题">{{form.contractTitle}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标题备注">{{form.titleOrRemark}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="项目名称">{{form.projectName}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="甲方公司">{{form.partyCompany}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方公司">
              <el-link
                type="primary"
                class="margin-left-10"
                style="display: inline;"
                v-if="form.channelCompanyKind == 'ChannelCompany'"
                :href="`/web-sales/channelBusiness/info?id=${form.channelCompanyId}`"
                target="_blank"
              >{{form.channelCompanyName}}</el-link>
              <el-link
                type="primary"
                class="margin-left-10"
                style="display: inline;"
                v-else-if="form.channelCompanyKind == 'AgencyCompany'"
                :href="`/web-sales/firstAgency/info?id=${form.channelCompanyId}`"
                target="_blank"
              >{{form.channelCompanyName}}</el-link>
              <span v-else>{{form.channelCompanyName}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方渠道等级">{{$root.dictAllName(form.channelLevel, 'ChannelLevel')}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="合作期限">
              {{form.contractStartTime}} -- {{form.contractEndTime}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同跟进人">
              {{form.handlerName}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="渠道类型">
              <template v-if="['Appoint', 'Strategic'].includes(form.channelEnum)">
                <div style="display: flex;">
                  <span>{{$root.dictAllName(form.channelEnum, 'ChannelCustomer')}}</span>
                  <el-link
                    type="primary"
                    class="margin-left-10"
                    style="display: inline;"
                    v-if="form.channelCompanyKind == 'ChannelCompany'"
                    :href="`/web-sales/channelBusiness/info?id=${form.channelCompanyId}`"
                    target="_blank"
                  >{{form.channelCompanyName}}</el-link>
                  <el-link
                    type="primary"
                    class="margin-left-10"
                    style="display: inline;"
                    v-else-if="form.channelCompanyKind == 'AgencyCompany'"
                    :href="`/web-sales/firstAgency/info?id=${form.channelCompanyId}`"
                    target="_blank"
                  >{{form.channelCompanyName}}</el-link>
                  <span v-else>{{form.channelCompanyName}}</span>
                </div>
              </template>
              <span v-else>{{$root.dictAllName(form.channelEnum, 'ChannelCustomer')}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="归档状态"
              :required="$route.name === 'NotSalesDuplicate'"
            >
              <template v-if="$route.name === 'NotSalesDuplicate'">
                <el-select v-model="archiveStatus">
                  <el-option
                    v-for="(item, i) in $root.dictAllList('ArchiveStatus')"
                    :key="i"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </template>
              <template v-else>{{$root.dictAllName(form.archiveStatus, 'ArchiveStatus')}}</template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审核状态">{{$root.dictAllName(form.distributionState, 'DistributionState')}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="合同电子版">
              <IhUpload
                v-model="electronicFile"
                :limit="electronicFile.length"
                size="100px"
                class="upload"
              ></IhUpload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="归档编号"
              :required="$route.name === 'NotSalesOriginal'"
            >
              <template v-if="$route.name === 'NotSalesOriginal'">
                <el-input v-model="archiveNo"></el-input>
              </template>
              <template v-else>{{form.archiveNo}}</template>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="盖章版归档"
              :required="$route.name === 'NotSalesDuplicate'"
            >
              <IhUpload
                v-model="fileList"
                :limit="$route.name === 'NotSalesDuplicate' ? 99 : fileList.length"
                size="100px"
                class="upload"
              ></IhUpload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 盖章版归档 -->
      <div
        class="text-center"
        v-if="$route.name === 'NotSalesDuplicate'"
      >
        <el-button
          type="primary"
          @click="submitDulicate()"
        >提交</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </div>
      <!-- 原件归档 -->
      <div
        class="text-center"
        v-if="$route.name === 'NotSalesOriginal'"
      >
        <el-button
          type="primary"
          @click="submitOriginal()"
        >提交</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </div>
      <!-- 审核 -->
      <div
        class="text-center"
        v-if="$route.name === 'NotSalesAudit'"
      >
        <el-button
          type="success"
          @click="checkSuccess()"
        >通过</el-button>
        <el-button
          type="danger"
          @click="checkReject()"
        >驳回</el-button>
      </div>
    </template>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  get_distribution_detail__id,
  post_distribution_duplicate,
  post_distribution_original_archive,
  post_distribution_review,
  post_distribution_disallowance,
} from "@/api/contract/index";

@Component({})
export default class NotSalesInfo extends Vue {
  private form: any = {};
  private fileList: any[] = [];
  private electronicFile: any = [];
  private archiveStatus: any = null;
  private archiveNo: any = null;

  private async checkSuccess() {
    try {
      await post_distribution_review({ ids: [this.form.id] });
      this.$message.success("审核通过");
      this.$goto({
        path: "/distribution/list",
      });
    } catch (error) {
      console.log(error);
    }
  }
  private async checkReject() {
    try {
      await post_distribution_disallowance({ ids: [this.form.id] });
      this.$message.success("驳回成功");
      this.$goto({
        path: "/distribution/list",
      });
    } catch (error) {
      console.log(error);
    }
  }
  private async submitOriginal() {
    if (!this.archiveNo) {
      this.$message.warning("归档编号不能为空");
      return;
    }
    try {
      await post_distribution_original_archive({
        distributionId: this.form.id,
        archiveNo: this.archiveNo,
      });
      this.$message.success("原件归档成功");
      const router: any = sessionStorage.getItem("gotoRouter");
      let path: any = null;
      switch (router) {
        case "MiddleAndBack":
          path = "/distribution/list";
          break;
        case "Business":
          path = "/distribution/listByBusiness";
          break;
      }
      this.$goto({ path });
      sessionStorage.removeItem("gotoRouter");
    } catch (error) {
      console.log(error);
    }
  }
  private async submitDulicate() {
    if (!this.fileList.length || !this.archiveStatus) {
      this.$message.warning("附件不能为空");
      return;
    }
    try {
      await post_distribution_duplicate({
        annexList: this.fileList.map((i: any) => ({
          attachmentSuffix: i.fileName,
          fileNo: i.fileId,
          type: "ArchiveAnnex",
        })),
        archiveStatus: this.archiveStatus,
        distributionId: this.$route.query.id,
      });
      this.$message.success("归档成功");
      const router: any = sessionStorage.getItem("gotoRouter");
      let path: any = null;
      switch (router) {
        case "MiddleAndBack":
          path = "/distribution/list";
          break;
        case "Business":
          path = "/distribution/listByBusiness";
          break;
      }
      this.$goto({ path });
      sessionStorage.removeItem("gotoRouter");
    } catch (error) {
      console.log(error);
    }
  }
  private async getInfo() {
    let id = this.$route.query.id;
    if (id) {
      let res = await get_distribution_detail__id({ id: id });
      this.form = { ...res };
      this.archiveStatus = res.archiveStatus;
      // 路由名称包含Duplicate -- 盖章版
      if (this.$route.name?.includes("Duplicate")) {
        this.archiveStatus = "ScansAreArchived";
      }
      this.archiveNo = res.archiveNo;
      this.electronicFile = res.annexList
        .filter((i: any) => i.type === "ChannelContractElectronicAnnex")
        .map((i: any) => ({
          fileName: i.attachmentSuffix,
          fileId: i.fileNo,
          exAuto: 1,
        }));
      this.fileList = res.annexList
        .filter((i: any) => i.type === "ArchiveAnnex")
        .map((i: any) => ({
          fileName: i.attachmentSuffix,
          fileId: i.fileNo,
          exAuto: 1,
        }));
    }
  }

  created(): void {
    this.getInfo();
  }
  beforeDestroy() {
    sessionStorage.removeItem("gotoRouter");
  }
}
</script>

<style lang="scss" scoped>
.formItem {
  /deep/ .el-form-item__label {
    line-height: 20px;
  }
}
</style>
