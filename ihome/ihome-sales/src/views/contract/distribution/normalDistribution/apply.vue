<template>
  <IhPage class="text-left">
    <template #info>
      <p class="ih-info-title">标准渠道分销合同申领</p>
      <el-form
        label-width="90px"
        class="padding-left-20"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="合同类型"></el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="合同主标题">{{form.contractTitle}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同副标题">{{form.contractSubtitle}}</el-form-item>
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
            <el-form-item label="甲方地址">{{form.partyaAddr}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="甲方联系人">{{form.partyaMan}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="甲方联系人电话"
              class="formItem"
            >{{form.partyaTel}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方公司">
              <div style="display: flex;">
                <el-select class="width-100"></el-select>
                <el-select style="flex: 1;"></el-select>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="乙方渠道等级"
              class="formItem"
            >乙方渠道等级</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方地址">乙方地址</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方联系人">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="乙方联系人电话"
              class="formItem"
            >
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方账户名">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方账号">乙方账号</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方开户行">乙方开户行</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="合作期限">
              2020-09-01 -- 2020-09-30
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同跟进人">

            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="代理费计付标准备注"
              class="formItem"
            >
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 3}"
                v-model="form.agencyFeeRemark"
                disabled
              ></el-input>
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
          <el-col :span="24">
            <el-form-item label="违约责任">
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 3}"
                v-model="form.unContractLiability"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="补充条款">
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 3}"
                v-model="form.supplementary"
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
              大型中介/一级平台
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
              prop="sendContext"
            ></el-table-column>
            <el-table-column
              label="派发佣金标准"
              prop="sendStandard"
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
        <el-button>取消</el-button>
      </div>
    </template>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { get_distributContract_getDistri__agencyContrictId } from "@/api/project/index";

@Component({})
export default class DistributionApply extends Vue {
  private fileList: any[] = [];
  private form: any = {
    agencyCostCondition: null,
    agencyCostSettleWay: null,
    agencyFeeRemark: null,
    agencyFeeReturnRate: null,
    agencyFeeReturnTime: null,
    agencyId: null,
    annexList: [],
    archiveStatus: null,
    channelAccount: null,
    channelAccountBank: null,
    channelAccountName: null,
    channelAddress: null,
    channelCompanyId: null,
    channelCompanyKind: null,
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

  private submit() {
    //
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
          // agencyId
          // annexList
          // archiveStatus
          // channelAccount:
          // channelAccountBank:
          // channelAccountName: "",
          // channelAddress: "",
          // channelCompanyId: 0,
          // channelCompanyKind: "",
          // channelContact: "",
          // channelContactTel: "",
          // channelEnum: "",
          // channelLevel: "",
          // commissionKind: "",
          // companyKind: "",
          consumerComplete: res.consumerComplete,
          contractEndTime: res.contractEndTime,
          // contractKind: res.contractKind,
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
          // organizationId: 0,
          padCommissionEnum: res.padCommissionEnum,
          partyCompany: res.partyCompany,
          partyCompanyId: res.partyCompanyId,
          partyaAddr: res.partyaAddr,
          partyaMan: res.partyaMan,
          partyaTel: res.partyaTel,
          supplementary: res.supplementary,
          unContractLiability: res.unContractLiability,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  created() {
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
