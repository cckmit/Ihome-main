<!--
 * @Description: 标准联动销售确认书(启动函)申领
 * @version: 
 * @Author: ywl
 * @Date: 2021-04-01 16:53:25
 * @LastEditors: ywl
 * @LastEditTime: 2021-04-09 16:00:28
-->
<template>
  <IhPage class="text-left">
    <template #info>
      <p class="ih-info-title">标准联动销售确认书(启动函)申领</p>
      <el-form
        ref="Form"
        label-width="95px"
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
                  @change="changeCompanyKind"
                >
                  <el-option
                    v-for="(i, n) in companyKindOption"
                    :key="n"
                    :label="i.name"
                    :value="i.code"
                  ></el-option>
                </el-select>
                <IhSelectPageByCompany
                  v-if="form.channelCompanyKind === 'InfieldCompany'"
                  style="flex: 1;max-width: 250px;"
                  v-model="form.channelCompanyId"
                ></IhSelectPageByCompany>
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
                </template>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="乙方渠道等级"
              class="formItem"
            >
              <span v-if="form.channelCompanyKind === 'InfieldCompany'">-</span>
              <span v-else-if="form.channelCompanyKind === 'ChannelCompany'">{{$root.dictAllName(form.channelLevel, 'ChannelLevel')}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合作期限">
              {{form.contractStartTime}} -- {{form.contractEndTime}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
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
            <el-form-item
              label="客户成交以及确认"
              class="formItem"
            >
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 3}"
                v-model="form.consumerComplete"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="代理费结算条件"
              class="formItem"
            >
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 3}"
                v-model="form.agencyCostCondition"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="代理费结算方式"
              class="formItem"
            >
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 3}"
                v-model="form.agencyCostSettleWay"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="房屋未成交乙方退回代理费期限"
              class="formItem"
              label-width="160px"
            >
              {{form.agencyFeeReturnTime}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="房屋未成交乙方退回代理费逾期违约金比例"
              class="formItem"
              label-width="160px"
            >
              {{form.agencyFeeReturnRate}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="渠道类型">
              {{$root.dictAllName(form.channelEnum, 'ChannelCustomer')}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="代理费是否垫佣"
              class="formItem"
            >
              {{$root.dictAllName(form.padCommissionEnum, 'PadCommission')}}
            </el-form-item>
          </el-col>
        </el-row>
        <div>
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
              prop="standardPay"
            ></el-table-column>
            <el-table-column
              label="派发佣金标准"
              prop="sendContext"
            ></el-table-column>
          </el-table>
          <br />
        </div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="合同电子版">
              <el-button type="success">预览电子版</el-button>
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
export default class SalesApply extends Vue {
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
    });
  }
  // private async getCompanyInfo(data: any) {
  //   try {
  //     const res = await get_bankAccount_get__companyId({ companyId: data.id });
  //     this.accountOption = res;
  //     this.form.channelAddress = data.address;
  //     let account = res.find((i: any) => i.defaultFlag);
  //     if (account) {
  //       this.form.channelAccountData = { id: account.id };
  //       Object.assign(this.form, {
  //         channelAccount: account.accountNo,
  //         channelAccountBank: account.branchName,
  //         channelAccountName: account.accountName,
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  private async getChannelInfo(data: any) {
    try {
      const res = await get_channel_get__id({ id: data.id });
      // this.accountOption = res.channelBanks.map((i: any) => ({
      //   accountName: i.accountName,
      //   accountNo: i.branchNo,
      //   branchName: i.branchName,
      //   id: i.id,
      // }));
      // this.form.channelAddress = res.address;
      // let account = res.channelBanks.find((i: any) => i.accountType === "Base");
      // if (account) {
      //   this.form.channelAccountData = { id: account.id };
      //   Object.assign(this.form, {
      //     channelAccount: account.branchNo,
      //     channelAccountBank: account.branchName,
      //     channelAccountName: account.accountName,
      //   });
      // }
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
          this.$goto({
            path: "/distribution/list",
          });
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
          // annexList
          // archiveStatus
          // channelAccount:
          // channelAccountBank:
          // channelAccountName: "",
          // channelAddress: "",
          channelCompanyId: res.designatedAgencyId,
          channelCompanyName: res.designatedAgency,
          // channelCompanyKind: "",
          // channelContact: "",
          // channelContactTel: "",
          channelEnum: res.channelEnum,
          // channelLevel: "",
          // commissionKind: "",
          // companyKind: "",
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
          distributionMxList: res.contractMxVOList,
          // distributionState: "",
          // exInvolvedCommiss: "",
          handlerId: (this.$root as any).userInfo.id,
          organizationId: res.groupId,
          padCommissionEnum: res.padCommissionEnum,
          partyCompany: res.partyCompany,
          partyCompanyId: res.partyCompanyId,
          partyaAddr: res.partyaAddr,
          partyaMan: res.partyaMan,
          partyaTel: res.partyaTel,
          supplementary: res.supplementary,
          unContractLiability: res.unContractLiability,
          projectName: res.proName,
        });
        this.startDivisionId = res.startDivisionId;
        this.cityCode = res.city;
        this.searchParams = {
          cycleCity: res.city,
          channelEnum: res.channelEnum,
          departmentOrgId: res.startDivisionId,
        };
        if (["Appoint", "Strategic"].includes(res.channelEnum)) {
          this.getChannelInfo({ id: res.designatedAgencyId });
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
}
</script>

<style lang="scss" scoped>
.formItem {
  /deep/ .el-form-item__label {
    line-height: 20px;
  }
}
</style>
