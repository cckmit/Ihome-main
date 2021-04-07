<!--
 * @Description: 非标联动销售确认书(启动函)申领
 * @version: 
 * @Author: ywl
 * @Date: 2021-04-01 17:49:15
 * @LastEditors: ywl
 * @LastEditTime: 2021-04-07 19:12:44
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
          <el-col :span="24">
            <el-form-item label="合同类型">{{$root.dictAllName(form.contractKind, 'ContractKind')}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="合同标题">{{form.contractTitle}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称">{{form.projectName}}</el-form-item>
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
          <el-col :span="12">
            <el-form-item label="合作期限">
              {{form.contractStartTime}} -- {{form.contractEndTime}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="合同跟进人">
              {{form.handlerName}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="归档状态">
              <!-- <template v-if="$route.name === 'NormalDistributionDuplicate'">
                <el-select v-model="archiveStatus">
                  <el-option
                    v-for="(item, i) in $root.dictAllList('ArchiveStatus')"
                    :key="i"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </template> -->
              <template>{{$root.dictAllName(form.archiveStatus, 'ArchiveStatus')}}</template>
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
            <el-form-item label="归档编号">
              <!-- <template v-if="$route.name === 'NormalDistributionOriginal'">
                <el-input v-model="archiveNo"></el-input>
              </template> -->
              <template>{{form.archiveNo}}</template>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="盖章版归档">
              <IhUpload
                v-model="fileList"
                :limit="fileList.length"
                size="100px"
                class="upload"
              ></IhUpload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { get_distribution_detail__id } from "@/api/contract/index";

@Component({})
export default class NotSalesInfo extends Vue {
  private form: any = {};
  private fileList: any[] = [];
  private electronicFile: any = [];

  private async getInfo() {
    let id = this.$route.query.id;
    if (id) {
      let res = await get_distribution_detail__id({ id: id });
      this.form = { ...res };
      // this.archiveStatus = res.archiveStatus;
      // this.archiveNo = res.archiveNo;
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
}
</script>

<style lang="scss" scoped>
.formItem {
  /deep/ .el-form-item__label {
    line-height: 20px;
  }
}
</style>
