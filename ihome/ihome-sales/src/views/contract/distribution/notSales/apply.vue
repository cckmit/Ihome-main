<!--
 * @Description: 非标联动销售确认书(启动函)申领
 * @version: 
 * @Author: ywl
 * @Date: 2021-04-01 17:49:15
 * @LastEditors: ywl
 * @LastEditTime: 2021-04-23 16:57:09
-->
<template>
  <IhPage class="text-left">
    <template #info>
      <p class="ih-info-title">非标联动销售确认书(启动函)申领</p>
      <el-form
        ref="Form"
        label-width="100px"
        class="padding-left-20"
        :model="form"
        :rules="rules"
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
            <el-form-item
              label="乙方公司"
              prop="channelCompanyId"
            >
              <div style="display: flex;">
                <el-select
                  class="width-150 margin-right-10"
                  v-model="form.channelCompanyKind"
                  placeholder="请选择公司类型"
                  :disabled="['Appoint', 'Strategic'].includes(form.channelEnum)"
                  @change="changeCompanyKind"
                >
                  <el-option
                    v-for="(i, n) in companyKindOption"
                    :key="n"
                    :label="i.name"
                    :value="i.code"
                  ></el-option>
                </el-select>
                <template v-if="form.channelCompanyKind === 'InfieldCompany'">
                  <span v-if="['Appoint', 'Strategic'].includes(form.channelEnum)">{{form.channelCompanyName}}</span>
                  <IhSelectPageByCompany
                    v-else
                    style="flex: 1;max-width: 250px;"
                    v-model="form.channelCompanyId"
                  ></IhSelectPageByCompany>
                </template>
                <template v-else-if="form.channelCompanyKind === 'ChannelCompany'">
                  <span v-if="['Appoint', 'Strategic'].includes(form.channelEnum)">{{form.channelCompanyName}}</span>
                  <IhSelectPageByChannel
                    v-else
                    placeholder="请选择渠道公司"
                    style="flex: 1;max-width: 250px;"
                    v-model="form.channelCompanyId"
                    @changeOption="getChannelInfo"
                    :params="searchParams"
                  ></IhSelectPageByChannel>
                  <el-link
                    class="margin-left-10"
                    v-show="form.channelCompanyId"
                    type="primary"
                    :underline="false"
                    :href="`/web-sales/channelBusiness/info?id=${form.channelCompanyId}`"
                    target="_blank"
                  >详情</el-link>
                </template>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方渠道等级">
              <span v-if="form.channelCompanyKind === 'InfieldCompany'">-</span>
              <span v-else-if="form.channelCompanyKind === 'ChannelCompany'">{{$root.dictAllName(form.channelLevel, 'ChannelLevel')}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="合作期限">
              {{form.contractStartTime}} -- {{form.contractEndTime}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="合同跟进人"
              prop="handlerId"
            >
              <IhSelectPageUser
                style="max-width: 250px;"
                v-model="form.handlerId"
                :search-name="handlerName"
              ></IhSelectPageUser>
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
                    :href="`/web-sales/channelBusiness/info?id=${form.channelCompanyId}`"
                    target="_blank"
                  >{{form.channelCompanyName}}</el-link>
                </div>
              </template>
              <span v-else>{{$root.dictAllName(form.channelEnum, 'ChannelCustomer')}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="合同电子版">
              <IhUpload
                v-model="fileList"
                size="100px"
                :limit="fileList.length"
                class="upload"
                :editPermi="false"
                :removePermi="false"
              ></IhUpload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="text-center">
        <el-button
          type="primary"
          @click="submit()"
        >提交</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </div>
    </template>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Form as ElForm } from "element-ui";
import { get_distributContract_getDistri__agencyContrictId } from "@/api/project/index";
// import { get_bankAccount_get__companyId } from "@/api/finance/index";
import { post_distribution_create } from "@/api/contract/index";
import {
  get_channel_get__id,
  post_channelGrade_getOne,
} from "@/api/channel/index";

@Component({})
export default class NotSalesApply extends Vue {
  private fileList: any[] = [];
  private form: any = {
    agencyCostCondition: null,
    agencyCostSettleWay: null,
    agencyFeeRemark: null,
    agencyFeeReturnRate: null,
    agencyFeeReturnTime: null,
    agencyId: null,
    annexList: [],
    archiveStatus: "ScansAreNotArchived",
    channelAccount: null,
    channelAccountBank: null,
    channelAccountName: null,
    channelAddress: null,
    channelCompanyId: null,
    channelCompanyKind: "ChannelCompany",
    channelContact: null,
    channelContactTel: null,
    channelEnum: null,
    channelLevel: null,
    commissionKind: null,
    companyKind: null,
    consumerComplete: null,
    contractEndTime: null,
    contractKind: null,
    contractStartTime: null,
    contractSubtitle: null,
    contractTitle: null,
    costSettleType: null,
    cycleId: null,
    designatedAgency: null,
    designatedAgencyId: null,
    distributionMxList: [],
    distributionState: null,
    exInvolvedCommiss: null,
    handlerId: null,
    organizationId: null,
    padCommissionEnum: null,
    partyCompanyId: null,
    partyaAddr: null,
    partyaMan: null,
    partyaTel: null,
    supplementary: null,
    unContractLiability: null,
    titleOrRemark: null,
  };
  private channelForm: any = {
    channelCompanyId: null,
    channelCompanyName: null,
  };
  private startDivisionId: any = null; //启动事业部ID
  private cityCode: any = null; //城市code
  private rules: any = {
    handlerId: [
      {
        required: true,
        message: "请选择合同跟进人",
        trigger: "change",
      },
    ],
    channelCompanyId: [
      {
        required: true,
        message: "请选择乙方公司",
        trigger: "change",
      },
    ],
  };
  private handlerName: string = (this.$root as any).userInfo.name;
  private companyKindOption: any[] = [];
  // private accountOption: any[] = [];
  private searchParams: any = {};

  private changeCompanyKind() {
    Object.assign(this.form, {
      channelAccount: null,
      channelAccountBank: null,
      channelAccountName: null,
      channelAddress: null,
      channelCompanyId: null,
      channelLevel: null,
    });
    if (
      ["Appoint", "Strategic"].includes(this.form.channelEnum) &&
      this.form.channelCompanyKind === "ChannelCompany"
    ) {
      Object.assign(this.form, this.channelForm);
    }
  }
  private async getChannelInfo(data: any) {
    try {
      const res = await get_channel_get__id({ id: data.id });
      // 获取渠道等级
      const channelData = await post_channelGrade_getOne({
        pageNum: 1,
        pageSize: 10,
        channelId: res.id,
        departmentOrgId: this.startDivisionId,
        city: this.cityCode,
      });
      if (channelData) {
        this.form.channelLevel = channelData.channelGrade;
      }
    } catch (error) {
      console.log(error);
    }
  }
  private async submit() {
    (this.$refs["Form"] as ElForm).validate(async (valid: any) => {
      if (valid) {
        let loading = this.$loading({
          lock: true,
          text: "请耐心等待...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.6)",
          customClass: "ih-loading-spinner",
        });
        try {
          await post_distribution_create(this.form);
          loading.close();
          this.$message.success("申领成功");
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
          loading.close();
        }
      } else {
        return false;
      }
    });
  }
  private async getInfo() {
    const agencyContrictId = this.$route.query.id;
    if (agencyContrictId) {
      try {
        const res = await get_distributContract_getDistri__agencyContrictId({
          agencyContrictId,
        });
        Object.assign(this.form, {
          agencyCostCondition: res.agencyCostCondition,
          agencyCostSettleWay: res.agencyCostSettleWay,
          agencyFeeRemark: res.agencyFeeRemark,
          agencyFeeReturnRate: res.agencyFeeReturnRate,
          agencyFeeReturnTime: res.agencyFeeReturnTime,
          agencyId: res.agencyContrictId,
          annexList: res.attachTermItemVOS.map((i: any) => ({
            attachmentSuffix: i.fileName,
            fileNo: i.originalPdfId,
            type: "OriginalChannelContractElectronicAnnex",
          })),
          channelCompanyId: res.designatedAgencyId,
          channelCompanyName: res.designatedAgency,
          channelEnum: res.channelEnum,
          // channelCompanyKind: res.companyKind,
          consumerComplete: res.consumerComplete,
          contractEndTime: res.contractEndTime,
          contractKind: res.contractKind,
          contractStartTime: res.contractStartTime,
          contractSubtitle: res.contractSubtitle,
          contractTitle: res.contractTitle,
          costSettleType: res.costSettleType,
          cycleId: res.termId,
          designatedAgency: res.designatedAgency,
          designatedAgencyId: res.designatedAgencyId,
          distributionMxList: res.contractMxVOList.map((i: any) => ({
            ...i,
            sendContext: i.standardPay,
            sendStandard: i.sendContext,
          })),
          // distributionState: "",
          // exInvolvedCommiss: "",
          handlerId: (this.$root as any).userInfo.id,
          // organizationId: res.groupId,
          padCommissionEnum: res.padCommissionEnum,
          partyCompany: res.partyCompany,
          partyCompanyId: res.partyCompanyId,
          partyaAddr: res.partyaAddr,
          partyaMan: res.partyaMan,
          partyaTel: res.partyaTel,
          supplementary: res.supplementary,
          unContractLiability: res.unContractLiability,
          titleOrRemark: res.titleOrRemark,
          projectName: res.proName,
        });
        this.startDivisionId = res.startDivisionId;
        this.cityCode = res.city;
        this.searchParams = {
          cycleCity: res.city,
          channelEnum: res.channelEnum,
          departmentOrgId: res.startDivisionId,
        };
        this.fileList = res.attachTermItemVOS.map((i: any) => ({
          fileId: i.fileId,
          fileName: i.fileName,
          exAuto: 1,
        }));
        if (["Appoint", "Strategic"].includes(res.channelEnum)) {
          if (res.companyKind === "ChannelCompany") {
            // let resParams = await this.getInfieldCompany({
            //   id: res.designatedAgencyId,
            // });
            // this.getCompanyInfo(resParams);
            this.getChannelInfo({ id: res.designatedAgencyId });
          }
          this.channelForm = {
            channelCompanyId: res.designatedAgencyId,
            channelCompanyName: res.designatedAgency,
          };
          Object.assign(this.form, {
            channelCompanyKind: res.companyKind,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  created() {
    this.getInfo();
    this.companyKindOption = (this.$root as any)
      .dictAllList("CompanyKind")
      .filter((i: any) => i.tag === "Channel");
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
<style lang="scss">
.ih-loading-spinner {
  .el-icon-loading,
  .el-loading-text {
    color: #fff;
  }
}
</style>
