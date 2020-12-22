<!--
 * @Description: 中介分销协议详情
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-27 10:46:14
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-22 09:45:53
-->
<template>
  <IhPage class="text-left distribution-info">
    <template v-slot:info>
      <p class="ih-info-title">渠道分销合同相关信息</p>
      <el-form
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="合同主标题">
              {{ruleForm.contractTitle}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同副标题">
              {{ruleForm.contractSubtitle}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="甲方公司">
              {{ruleForm.partyCompany}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="甲方地址">
              {{ruleForm.partyaAddr}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="甲方联系人">
              {{ruleForm.partyaMan}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="甲方联系人电话">
              {{ruleForm.partyaTel}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方公司">
              {{ruleForm.channelCompanyName}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方渠道等级">
              {{$root.dictAllName(ruleForm.channelLevel, 'ChannelLevel')}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方地址">
              {{ruleForm.channelAddress}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方联系人">
              {{ruleForm.channelContact}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方联系人电话">
              {{ruleForm.channelContactTel}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方账户名">
              {{ruleForm.channelAccountName}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方账户">
              {{ruleForm.channelAccount}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方开户行">
              {{ruleForm.channelAccountBank}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="合作期限">
              {{ruleForm.contractStartTime}} -- {{ruleForm.contractEndTime}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同跟进人">
              {{ruleForm.handlerName}}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm padding-left-30"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="代理费计付标准备注">
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 3}"
                v-model="ruleForm.agencyFeeRemark"
                placeholder="代理费计付标准备注"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="客户成交以及确认">
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 3}"
                v-model="ruleForm.consumerComplete"
                placeholder="客户成交以及确认"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="代理费结算条件">
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 3}"
                v-model="ruleForm.agencyCostCondition"
                placeholder="代理费结算条件"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="代理费结算方式">
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 3}"
                v-model="ruleForm.agencyCostSettleWay"
                placeholder="代理费结算方式"
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
                v-model="ruleForm.unContractLiability"
                placeholder="违约责任"
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
                v-model="ruleForm.supplementary"
                placeholder="补充条款"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="房屋未成交乙方退回代理费期限"
              label-width="280px"
            >
              {{ruleForm.agencyFeeReturnTime}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="房屋未成交乙方退回代理费逾期违约金比例"
              label-width="280px"
            >
              {{ruleForm.agencyFeeReturnRate}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="渠道类型">
              {{$root.dictAllName(ruleForm.channelEnum, 'ChannelType')}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="代理费是否垫佣">
              {{$root.dictAllName(ruleForm.padCommissionEnum, 'PadCommission')}}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="padding-left-30">
        <el-table :data="ruleForm.distributionMxList">
          <el-table-column
            label="物业类型"
            prop="propertyEnum"
          >
            <template v-slot="{ row }">
              {{$root.dictAllName(row.propertyEnum, 'Property')}}
            </template>
          </el-table-column>
          <el-table-column
            label="佣金分类"
            prop="costTypeEnum"
          >
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
      <el-form
        ref="ruleForm"
        label-width="150px"
        class="text-left"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="归档状态">
              {{$root.dictAllName(ruleForm.archiveStatus, 'ArchiveStatus')}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审核状态">
              {{$root.dictAllName(ruleForm.distributionState, 'DistributionState')}}
            </el-form-item>
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
            <el-form-item label="归档编号">
              <el-input
                v-model="ruleForm.archiveNo"
                placeholder="请输入归档编号"
                v-if="$route.name === 'DistributionOriginal'"
              ></el-input>
              <span v-else>{{ruleForm.archiveNo}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="盖章版归档">
              <IhUpload
                v-if="$route.name === 'DistributionDetail' ? true : fileList.length"
                :file-list="fileList"
                @newFileList="handleSealFile"
                :limit="$route.name === 'DistributionDetail' ? 10 : fileList.length"
                size="100px"
                class="upload"
              ></IhUpload>
              <el-button
                type="primary"
                class="upload-button"
                v-if="$route.name === 'DistributionDetail'"
                @click="duplicate()"
              >提交</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <div
          v-if="$route.name === 'DistributionDetail'"
          class="annotation padding-left-20"
        >*注：上传附件后请点击提交按钮保存</div>
      </el-form>
      <div
        v-if="$route.name === 'DistributionOriginal'"
        class="text-center"
      >
        <br />
        <el-button
          type="primary"
          @click="archive()"
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
  get_distribution_deal_detail__contractNo,
  post_distribution_original_archive,
  post_distribution_annex,
} from "@/api/contract/index";

@Component({})
export default class DistributionDetail extends Vue {
  private ruleForm: any = {
    archiveNo: null,
  };
  private sealFile: any = [];
  private fileList: any = [];

  private async archive() {
    if (!this.ruleForm.archiveNo) {
      this.$message.warning("归档编号不能为空");
      return;
    }
    await post_distribution_original_archive({
      distributionId: this.ruleForm.id,
      archiveNo: this.ruleForm.archiveNo,
    });
    this.$message.success("原件归档成功");
  }
  private handleSealFile(val: any) {
    this.sealFile = val
      .filter((i: any) => {
        return i.response;
      })
      .map((v: any) => ({
        type: "ArchiveAnnex",
        attachmentSuffix: v.name,
        fileNo: v.fileId,
      }));
  }
  private async duplicate() {
    if (!this.sealFile.length) {
      this.$message.warning("请先上传文件");
      return;
    }
    await post_distribution_annex({
      annexCreateListList: this.sealFile,
      distributionId: this.ruleForm.id,
    });
    this.$message.success("扫描件归档成功");
  }
  private preview() {
    window.open(
      `/sales-api/sales-document-cover/file/browse/${this.ruleForm.electronicContractNo}`
    );
  }
  private async getInfo(): Promise<void> {
    let id = this.$route.query.id;
    if (id) {
      let res = await get_distribution_detail__id({ id: id });
      this.ruleForm = { ...this.ruleForm, ...res };
      this.fileList = res.annexList.map((i: any) => ({
        name: i.attachmentSuffix,
        fileId: i.fileNo,
      }));
    }
    let contractNo = this.$route.query.contractNo;
    if (contractNo) {
      let res = await get_distribution_deal_detail__contractNo({ contractNo });
      this.ruleForm = { ...this.ruleForm, ...res };
      this.fileList = res.annexList.map((i: any) => ({
        name: i.attachmentSuffix,
        fileId: i.fileNo,
      }));
    }
  }

  created(): void {
    this.getInfo();
  }
}
</script>

<style lang="scss" scoped>
.distribution-info {
  /deep/ .upload {
    display: inline-block;
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