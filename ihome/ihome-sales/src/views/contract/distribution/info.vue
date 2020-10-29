<!--
 * @Description: 中介分销协议详情
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-27 10:46:14
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-29 18:53:00
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
              {{ruleForm.partyBCompany}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方渠道等级">
              乙方渠道等级
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方地址">
              {{ruleForm.partyBAddress}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方联系人">
              {{ruleForm.partyBContact}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方联系人电话">
              {{ruleForm.partyBMobile}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方账户名">
              {{ruleForm.partyBAccountName}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方账户">
              {{ruleForm.partyBAccountNo}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方开户行">
              {{ruleForm.partyBBank}}
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
                size="100px"
                :limit="1"
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
export default class DistributionDetail extends Vue {
  private ruleForm: any = {};
  private fileList: Array<object> = [];

  private async getInfo(): Promise<void> {
    let id = this.$route.query.id;
    this.ruleForm = await get_distribution_detail__id({ id: id });
  }

  created(): void {
    let id = this.$route.query.id;
    if (id) this.getInfo();
  }
}
</script>
