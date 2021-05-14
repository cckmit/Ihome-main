<template>
  <IhPage class="text-left">
    <template #info>
      <p class="ih-info-title">标准渠道分销合同详情</p>
      <el-form
        label-width="95px"
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
            <el-form-item label="合同主标题">{{form.contractTitle}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同副标题">{{form.contractSubtitle}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="标题备注">{{form.titleOrRemark}}</el-form-item>
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
          <el-col :span="12">
            <el-form-item
              label="乙方渠道等级"
              class="formItem"
            >{{$root.dictAllName(form.channelLevel, 'ChannelLevel')}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方地址">{{form.channelAddress}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方联系人">{{form.channelContact}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="乙方联系人电话"
              class="formItem"
            >{{form.channelContactTel}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方账户名"> {{form.channelAccountName}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方账号">{{form.channelAccount}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方开户行"> {{form.channelAccountBank}}</el-form-item>
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
            <el-form-item
              label="代理费计付标准条款"
              class="formItem"
            >
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 3}"
                v-model="form.agencyFeeCalculation"
                disabled
              ></el-input>
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
            <el-form-item
              label="发票开具条款"
              class="formItem"
            >
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 3}"
                v-model="form.invoiceConditions"
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
                  <span
                    v-else
                    class="margin-left-10"
                  >{{form.channelCompanyName}}</span>
                </div>
              </template>
              <span v-else>{{$root.dictAllName(form.channelEnum, 'ChannelCustomer')}}</span>
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
              :required="$route.name === 'NormalDistributionDuplicate'"
            >
              <template v-if="$route.name === 'NormalDistributionDuplicate'">
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
              <el-button
                type="success"
                @click="preview()"
              >预览电子版</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="归档编号"
              :required="$route.name === 'NormalDistributionOriginal'"
            >
              <template v-if="$route.name === 'NormalDistributionOriginal'">
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
              :required="$route.name === 'NormalDistributionDuplicate'"
            >
              <IhUpload
                v-model="fileList"
                size="100px"
                :limit="$route.name === 'NormalDistributionDuplicate' ? 99 : fileList.length"
                class="upload"
              ></IhUpload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 盖章版归档 -->
      <div
        class="text-center"
        v-if="$route.name === 'NormalDistributionDuplicate'"
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
        v-if="$route.name === 'NormalDistributionOriginal'"
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
        v-if="$route.name === 'NormalDistributionAudit'"
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
  get_distribution_deal_detail__contractNo,
} from "@/api/contract/index";

@Component({})
export default class DistributionInfo extends Vue {
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
        distributionId: this.form.id,
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
  private preview() {
    window.open(
      `/sales-api/sales-document-cover/file/browse/${this.electronicFile[0].fileId}`
    );
  }
  private async getInfo() {
    let id = this.$route.query.id;
    let contractNo = this.$route.query.contractNo;
    let res: any = {
      archiveNo: null,
      annexList: [],
    };
    if (id) {
      res = await get_distribution_detail__id({ id: id });
    } else if (contractNo) {
      res = await get_distribution_deal_detail__contractNo({ contractNo });
    } else {
      this.$message.warning("id或编号不能为空");
      return;
    }
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
