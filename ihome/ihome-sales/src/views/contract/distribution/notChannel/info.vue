<!--
 * @Description: 非渠道合同申领
 * @version: 
 * @Author: ywl
 * @Date: 2021-04-02 09:24:21
 * @LastEditors: ywl
 * @LastEditTime: 2021-04-17 16:12:14
-->
<template>
  <IhPage class="text-left">
    <template #info>
      <p class="ih-info-title">非渠道合同详情</p>
      <el-form
        label-width="90px"
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
            <el-form-item
              label="是否涉及佣金标准"
              class="formItem"
            >{{form.exInvolvedCommiss === 'Yes' ? '是' : '否'}}</el-form-item>
          </el-col>
          <el-col
            :span="12"
            v-if="form.exInvolvedCommiss === 'Yes'"
          >
            <el-form-item label="佣金类型">{{$root.dictAllName(form.commissionKind, 'CommissionKind')}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="甲方公司">{{form.partyCompany}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方公司">{{form.channelCompanyName}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="乙方渠道等级"
              class="formItem"
            >{{$root.dictAllName(form.channelLevel, 'ChannelLevel')}}</el-form-item>
          </el-col>
          <el-col
            :span="12"
            v-if="form.exInvolvedCommiss === 'Yes'"
          >
            <el-form-item label="乙方账户名">{{form.channelAccountName}}</el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="form.exInvolvedCommiss === 'Yes'">
          <el-col :span="12">
            <el-form-item label="乙方账号">{{form.channelAccount}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方开户行">{{form.channelAccountBank}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="合作期限">
              {{form.contractStartTime}} -- {{form.contractEndTime}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同跟进人">{{form.handlerName}}</el-form-item>
          </el-col>
        </el-row>
        <div v-if="form.exInvolvedCommiss === 'Yes'">
          <el-table :data="form.distributionMxList">
            <el-table-column label="物业类型">
              <template v-slot="{ row }">
                {{$root.dictAllName(row.propertyEnum, 'Property')}}
              </template>
            </el-table-column>
            <el-table-column label="佣金分类">
              <template v-slot="{ row }">
                {{$root.dictAllName(row.costTypeEnum, 'FeeType')}}
              </template>
            </el-table-column>
            <el-table-column
              label="条件"
              prop="sendContext"
            >
              <template v-slot="{ row }">
                {{row.sendContext || '-'}}
              </template>
            </el-table-column>
            <el-table-column
              label="派发佣金标准"
              prop="sendStandard"
            >
              <template v-slot="{ row }">
                {{row.sendStandard || '-'}}
              </template>
            </el-table-column>
          </el-table>
          <br />
        </div>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="归档状态"
              :required="$route.name === 'NotChannelDuplicate'"
            >
              <template v-if="$route.name === 'NotChannelDuplicate'">
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
              :required="$route.name === 'NotChannelOriginal'"
            >
              <template v-if="$route.name === 'NotChannelOriginal'">
                <el-input v-model="archiveNo"></el-input>
              </template>
              <template>{{form.archiveNo}}</template>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="盖章版归档"
              :required="$route.name === 'NotChannelDuplicate'"
            >
              <IhUpload
                v-model="fileList"
                :limit="$route.name === 'NotChannelDuplicate' ? 99 : fileList.length"
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
        v-if="$route.name === 'NotChannelDuplicate'"
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
        v-if="$route.name === 'NotChannelOriginal'"
      >
        <el-button
          type="primary"
          @click="submitOriginal()"
        >提交</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
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
} from "@/api/contract/index";

@Component({})
export default class NotChannelInfo extends Vue {
  private form: any = {};
  private fileList: any[] = [];
  private electronicFile: any = [];
  private archiveStatus: any = null;
  private archiveNo: any = null;

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
      this.$message.warning("附件或归档状态不能为空");
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
