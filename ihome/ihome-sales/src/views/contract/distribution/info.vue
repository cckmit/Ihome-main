<!--
 * @Description: 中介分销协议详情
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-27 10:46:14
 * @LastEditors: ywl
 * @LastEditTime: 2020-11-11 17:07:56
-->
<template>
  <IhPage class="text-left">
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
              {{ruleForm.title}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同副标题">
              {{ruleForm.subtitle}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="甲方公司">
              {{ruleForm.partyACompany}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="甲方地址">
              {{ruleForm.partyAAddress}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="甲方联系人">
              {{ruleForm.partyAContact}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="甲方联系人电话">
              {{ruleForm.partyAMobile}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方公司">
              {{business.channelBusinessId}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方渠道等级">
              {{business.channelLevel}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方地址">
              {{business.channelBusinessAddress}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方联系人">
              {{business.contactPerson}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方联系人电话">
              {{business.contactNumber}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方账户名">
              {{business.accountName}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方账户">
              {{business.partyBAccountNo}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方开户行">
              {{business.accountBank}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="合作期限">
              {{ruleForm.beginTime | timestampToDate('YYYY-MM-DD')}} -- {{ruleForm.endTime | timestampToDate('YYYY-MM-DD')}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同跟进人">
              {{ruleForm.handler}}
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
                v-model="ruleForm.paymentStandard"
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
                v-model="ruleForm.customerTransaction"
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
                v-model="ruleForm.settlementCondition"
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
                v-model="ruleForm.settlementMethod"
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
                v-model="ruleForm.breachOfContract"
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
                v-model="ruleForm.supplementaryProvision"
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
              {{ruleForm.refundPeriod}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="房屋未成交乙方退回代理费逾期违约金比例"
              label-width="280px"
            >
              {{ruleForm.refundRatio}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="渠道类型">
              {{$root.dictAllName(ruleForm.channelType, 'DistributionEnum.ChannelType')}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="代理费是否垫佣">
              {{$root.dictAllName(ruleForm.advancePayment, 'DistributionEnum.AdvancePayment')}}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="padding-left-30">
        <el-table :data="ruleForm.chargeList">
          <el-table-column
            label="物业类型"
            prop="estateType"
          >
            <template v-slot="{ row }">
              {{$root.dictAllName(row.estateType, 'DistributionChargeEnum.EstateType')}}
            </template>
          </el-table-column>
          <el-table-column
            label="佣金分类"
            prop="costType"
          >
            <template v-slot="{ row }">
              {{$root.dictAllName(row.costType, 'DistributionChargeEnum.CostType')}}
            </template>
          </el-table-column>
          <el-table-column label="条件">
          </el-table-column>
          <el-table-column label="派发佣金标准"></el-table-column>
        </el-table>
        <br />
      </div>
      <el-form
        ref="ruleForm"
        label-width="150px"
        class="padding-left-30"
      >
        <el-row>
          <el-col :span="18">
            <el-form-item
              label="合同电子版"
              class="text-left"
            >
              <el-button type="success">预览电子版</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="扫描件归档">
              <IhUpload
                :file-list="fileList"
                @newFileList="handleSealFile"
                size="100px"
                :limit="1"
              ></IhUpload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="归档编号">
              <el-input
                v-model="ruleForm.fileCode"
                :disabled="$route.name !== 'DistributionOriginal'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
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
        <el-button @click="$router.push(-1)">取消</el-button>
      </div>
      <div
        v-if="$route.name === 'DistributionArchived'"
        class="text-center"
      >
        <br />
        <el-button
          type="primary"
          @click="duplicate()"
        >提交</el-button>
        <el-button @click="$router.push(-1)">取消</el-button>
      </div>

    </template>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import {
  get_distribution_detail__id,
  post_distribution_original_archive,
  post_distribution_duplicate,
} from "@/api/contract/index";

@Component({})
export default class DistributionDetail extends Vue {
  private ruleForm: any = {
    fileCode: null,
  };
  private business: any = {};
  private sealFile: any = [];
  private fileList: any = [];

  private async archive() {
    if (!this.ruleForm.fileCode) {
      this.$message.warning("归档编号不能为空");
      return;
    }
    await post_distribution_original_archive({
      distributionId: this.ruleForm.id,
      fileCode: this.ruleForm.fileCode,
    });
    this.$message.success("原件归档成功");
  }
  private handleSealFile(val: any) {
    this.sealFile = val.map((v: any) => ({
      type: "Seal",
      attachmentSuffix: v.name,
      fileNo: v.fileId,
    }));
  }
  private async duplicate() {
    if (!this.sealFile.length) {
      return;
    }
    await post_distribution_duplicate({
      annexList: this.sealFile,
      distributionId: this.ruleForm.id,
    });
    this.$message.success("扫描件归档成功");
  }
  private async getInfo(): Promise<void> {
    let id = this.$route.query.id;
    if (id) {
      let res = await get_distribution_detail__id({ id: id });
      this.ruleForm = { ...this.ruleForm, ...res };
      this.ruleForm.businessList.length
        ? (this.business = this.ruleForm.businessList[0])
        : (this.business = {});
      console.log(this.ruleForm, this.business);
    }
  }

  created(): void {
    this.getInfo();
  }
}
</script>
