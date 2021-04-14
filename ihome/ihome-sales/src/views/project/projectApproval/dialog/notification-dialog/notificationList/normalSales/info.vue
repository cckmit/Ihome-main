<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-04-06 10:02:47
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-14 17:50:06
-->
<template>
  <ih-page class="text-left">
    <template #info>
      <el-form
        ref="form"
        label-width="120px"
        :model="info"
      >
        <div class="title">
          <div class="title-contant">标准联动销售确认书(启动函)模板</div>
          <div>编号：_____________________ </div>
        </div>
        <h2 class="text-center">{{`【${info.proName}】项目一二手联动销售确认书`}}</h2>
        <el-form-item
          label="标题备注"
          label-width="80px"
          class="width-300 text-center"
          style="margin: 0 auto"
        >
          <el-input
            class="title-sub"
            v-model="info.titleOrRemark"
            placeholder="请输入标题备注"
            readonly
          ></el-input>
        </el-form-item>
        <div>致：___________________</div>
        <br />
        <div>{{`贵我双方经友好协商，现就我司（下称“甲方”）委托贵司（下称“乙方”）就  ${info.proName}  项目提供渠道服务事宜达成一致如下：`}}</div>
        <div>
          <span class="font-weight"> 一、合作项目：</span>
          <u>{{info.proName}}</u> （备案名称： <u>{{info.proRecord}}</u> ）
        </div>
        <div class="padding-top-10 padding-bottom-10">
          <span class="font-weight">二、合作期限：</span> 自
          <el-form-item
            prop='timeList'
            label=" "
            class="inline-block"
            label-width="20px"
          >
            <el-date-picker
              v-model="info.timeList"
              readonly
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="font-weight">三、代理费计算标准：</div>
        <div>
          <el-input
            show-word-limit
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 8 }"
            placeholder="请输入代理费计算标准"
            v-model="info.agencyFeeRemark"
            readonly
          />
        </div>
        <br />
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="渠道类型"
              prop="channelEnum"
            >
              <el-select
                v-model="info.channelEnum"
                placeholder="请选择渠道类型"
                class="width--100"
                disabled
              >
                <el-option
                  v-for="item in $root.dictAllList('ChannelCustomer')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <div v-if="isShow">
            <el-col
              :span='6'
              class="width-200"
            >
              <el-form-item
                prop="companyKind"
                label-width="20px"
              >
                <el-select
                  v-model="info.companyKind"
                  disabled
                  placeholder="请选择公司种类"
                  class="width--100"
                >
                  <el-option
                    v-for="item in companyKindOption"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span='6'>
              <el-form-item label-width="10px">
                <IhSelectPageByCompany
                  v-if="info.companyKind === 'InfieldCompany'"
                  style="flex: 1;max-width: 300px;"
                  disabled
                  :search-name="info.designatedAgency"
                  v-model="info.designatedAgencyId"
                ></IhSelectPageByCompany>
                <IhSelectPageByChannel
                  v-else-if="info.companyKind === 'ChannelCompany'"
                  v-model="info.designatedAgencyId"
                  disabled
                  :params="searchConditon"
                  :search-name="info.designatedAgency"
                ></IhSelectPageByChannel>
              </el-form-item>
            </el-col>
          </div>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="垫佣周期"
              prop="padCommissionEnum"
            >
              <el-select
                v-model="info.padCommissionEnum"
                clearable
                placeholder="请选择垫佣周期"
                class="width--100"
                disabled
              >
                <el-option
                  v-for="item in padCommissionEnumOptions"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <br />
        <el-table
          class="ih-table partyA-table"
          :data="info.contractMxVOList"
        >
          <el-table-column
            label="物业类型"
            prop="propertyEnum"
          >
            <template v-slot="{ row }">{{
            $root.dictAllName(row.propertyEnum, "Property")
          }}</template>
          </el-table-column>
          <el-table-column
            label="佣金分类"
            prop="costTypeEnum"
          >
            <template v-slot="{ row }">{{
            $root.dictAllName(row.costTypeEnum, "FeeType")
          }}</template>
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
        <div class="font-weight">四、客户确认及成交确认：</div>
        <div>
          <el-input
            show-word-limit
            readonly
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 8 }"
            placeholder="请输入客户确认及成交确认"
            v-model="info.consumerComplete"
          />
        </div>
        <br />
        <div class="font-weight">五、代理费支付方式：</div>
        <div>
          <div>(1)</div>
          <el-input
            show-word-limit
            type="textarea"
            readonly
            :autosize="{ minRows: 4, maxRows: 8 }"
            placeholder="请输入代理费支付方式"
            v-model="info.agencyCostCondition"
          />
          <div>(2)</div>
          <el-input
            show-word-limit
            type="textarea"
            readonly
            :autosize="{ minRows: 4, maxRows: 8 }"
            placeholder="请输入代理费支付方式"
            v-model="info.agencyCostSettleWay"
          />
        </div>
        <div>(3) 无论出现任何原因导致客户无法成交或客户发生退房、挞定情形的，或发生投诉、诉讼导致甲方需退回
          <u><i class="font-weight">开发商或委托方代理费/客户服务费</i> </u>，
          在甲方提供客户退房、投诉等依据后，乙方应在
          <el-form-item
            prop="agencyFeeReturnTime"
            class="inline-block"
            label=" "
            label-width="20px"
          >
            <el-input
              v-model="info.agencyFeeReturnTime"
              placeholder="退回期限"
              class="width-100"
              v-digits="0"
              readonly
            />
          </el-form-item>
          个工作日内退回已支付的代理费，甲方亦有权在未结算的代理费中直接抵扣。
          如乙方在收到甲方退回代理费的通知后未按约退回应退的款项，则乙方按应付未付总金额
          <el-form-item
            prop="agencyFeeReturnRate"
            class="inline-block"
            label=" "
            label-width="20px"
          >
            <el-input
              v-model="info.agencyFeeReturnRate"
              placeholder="违约金比例"
              class="width-120"
              readonly
            />
          </el-form-item>
          /日的违约金支付给甲方，并承担甲方为主张权利而发生的律师费和差旅费等。
        </div>
        <div class="font-weight">六、其他：</div>
        <div>(1)本确认书自甲方加盖公章之日起生效。</div>
        <div>(2)本确认书一式两份，甲乙双方各执一份，具有同等法律效力。</div>
        <div>(3)本确认书未尽事宜，以甲乙双方最终签署的联动分销协议为准。</div>
        <br />
        <div class="under">
          <div>{{info.partyCompany}}</div>
          <div>日期：年 &nbsp;&nbsp;&nbsp;&nbsp;月 &nbsp;&nbsp;&nbsp;&nbsp;日</div>
        </div>
        <el-row v-if="agencyContrictId">
          <el-col :span="24">
            <el-form-item
              label="合同电子版"
              required
            >
              <IhUpload
                v-model="fileList"
                size="100px"
                :upload-show="!!fileList.length"
                :limit="fileList.length"
                :editPermi="false"
                :removePermi="false"
              ></IhUpload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="text-center">
        <el-button @click="cancel">返 回</el-button>
      </div>
    </template>
  </ih-page>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { get_distributContract_getDistri__agencyContrictId } from "@/api/project/index";
import { post_dict_getAllByType } from "@/api/system";
@Component({
  components: {},
})
export default class NormalSalesApply extends Vue {
  private info: any = {
    proId: null,
    proName: null,
    proRecord: null,
    padCommissionEnum: null,
    termId: null,
    contractStartTime: null,
    contractEndTime: null,
    agencyFeeRemark:
      "甲方按乙方实际完成的销售金额/套数计付代理费，实际完成的销售金额/套数指乙方在代理期内客户签订《商品房买卖合同》的签约总金额/套数：",
    timeList: [],
    channelEnum: null,
    designatedAgencyId: null,
    designatedAgency: null,
    contractMxVOList: [],
    consumerComplete:
      "（根据开发商与爱家间确认函的客户确认条款制定和填写爱家与中介方的客户确认条款。）",
    agencyCostCondition:
      "乙方引荐客户支付首期房款，签订《商品房买卖合同》及其相关配套的法律文书后(可根据实际情况更改条件)，并提交齐备的代理费核算文件及增值税专用发票的前提下，甲方在收到开发商相应单元代理费后，具备代理费结算条件。",
    agencyCostSettleWay:
      "乙方具备上述条件后X个工作日内，甲方向乙方结算首期代理费。甲方在开发商收到乙方客户的银行按揭剩余回款后，甲方30个工作日内向乙方结算尾期代理费 (可根据实际情况更改条件)。",
    agencyFeeReturnTime: null,
    agencyFeeReturnRate: null,
    partyCompany: "西藏保利爱家房地产经纪有限公司XX分公司",
    partyCompanyId: null,
    partyaAddr: null,
    companyKind: null,
    titleOrRemark: null,
  };
  isShow: any = false;
  padCommissionEnumOptions: any = [];
  searchConditon: any = {};
  private companyKindOption: any = [];
  private fileList: any = [];

  @Watch("info.channelEnum", { immediate: true })
  async getIsShow(val: any) {
    if (val === "Appoint" || val === "Strategic") {
      this.isShow = true;
      this.companyKindOption = await post_dict_getAllByType({
        tag: "Channel",
        type: "CompanyKind",
        valid: "Valid",
      });
    } else {
      this.isShow = false;
      this.info.companyKind = null;
      this.companyKindOption = [];
    }
  }

  get agencyContrictId() {
    return this.$route.query.id;
  }

  created() {
    this.getInfo();
  }

  async getInfo() {
    const res: any = sessionStorage.getItem("addContract");
    const data = await get_distributContract_getDistri__agencyContrictId({
      agencyContrictId: this.agencyContrictId,
    });
    this.info = {
      ...data,
      ...JSON.parse(res),
    };
    this.info.timeList = [data.contractStartTime, data.contractEndTime];
    this.fileList = data.attachTermItemVOS.map((v: any) => ({
      fileId: v.fileId,
      fileName: v.fileName,
      type: v.type,
      exAuto: v.exAuto,
    }));
    if (this.info?.padCommissionEnum) {
      if (this.info?.padCommissionEnum !== "Veto") {
        this.padCommissionEnumOptions = [
          {
            code: "Veto",
            name: "否",
          },
          {
            code: this.info.padCommissionEnum,
            name: (this.$root as any).dictAllName(
              this.info.padCommissionEnum,
              "PadCommission"
            ),
          },
        ];
      } else {
        this.info.padCommissionEnum = "Veto";
        this.padCommissionEnumOptions = [
          {
            code: "Veto",
            name: "否",
          },
        ];
      }
    } else {
      this.info.padCommissionEnum = "Veto";
      this.padCommissionEnumOptions = [
        {
          code: "Veto",
          name: "否",
        },
      ];
    }
  }

  cancel() {
    window.sessionStorage.setItem("tabStatus", "Notification");
    this.$router.go(-1);
  }
}
</script>
<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
  .title-contant {
    font-size: 18px;
    font-weight: 600;
  }
}

.font-weight {
  font-weight: 600;
}

.under {
  text-align: right;
}

.inline-block {
  display: inline-block;
  margin-bottom: 10px;
}
</style>