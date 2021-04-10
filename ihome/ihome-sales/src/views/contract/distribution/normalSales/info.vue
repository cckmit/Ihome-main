<!--
 * @Description: 标准联动销售确认书(启动函)申领
 * @version: 
 * @Author: ywl
 * @Date: 2021-04-01 16:53:25
 * @LastEditors: ywl
 * @LastEditTime: 2021-04-10 10:17:34
-->
<template>
  <IhPage class="text-left">
    <template #info>
      <p class="ih-info-title">标准联动销售确认书(启动函)详情</p>
      <el-form
        label-width="90px"
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
            <el-form-item label="合同跟进人">{{form.handlerName}}</el-form-item>
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
            <el-form-item label="归档状态">
              {{$root.dictAllName(form.archiveStatus, 'ArchiveStatus')}}
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
              :required="$route.name === 'NormalSalesOriginal'"
            >
              <template v-if="$route.name === 'NormalSalesOriginal'">
                <el-input v-model="archiveNo"></el-input>
              </template>
              <template v-else>{{form.archiveNo}}</template>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="盖章版归档">
              <IhUpload
                v-model="fileList"
                size="100px"
                class="upload"
              ></IhUpload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 原件归档 -->
      <div
        class="text-center"
        v-if="$route.name === 'NormalSalesOriginal'"
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
  post_distribution_original_archive,
} from "@/api/contract/index";

@Component({})
export default class SalesApply extends Vue {
  private form: any = {};
  private fileList: any[] = [];
  private electronicFile: any = [];
  private archiveNo: any = null;

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
    this.$goto({
      path: "/distribution/list",
    });
  }
  private preview() {
    window.open(
      `/sales-api/sales-document-cover/file/browse/${this.electronicFile[0].fileId}`
    );
  }
  private async getInfo() {
    let id = this.$route.query.id;
    if (id) {
      let res = await get_distribution_detail__id({ id: id });
      this.form = { ...res };
      // this.archiveStatus = res.archiveStatus;
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
}
</script>

<style lang="scss" scoped>
.formItem {
  /deep/ .el-form-item__label {
    line-height: 20px;
  }
}
</style>
