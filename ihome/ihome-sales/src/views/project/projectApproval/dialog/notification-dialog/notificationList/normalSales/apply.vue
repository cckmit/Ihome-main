<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-04-06 09:35:57
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-08 11:58:31
-->
<template>
  <ih-page class="text-left">
    <template #info>
      <el-form
        ref="form"
        label-width="120px"
        :model="info"
        :rules="rules"
      >
        <div class="title">
          <div class="title-contant">标准联动销售确认书(启动函)模板</div>
          <div>编号：_____________________ </div>
        </div>
        <h2 class="text-center">{{`【${info.proName}】项目一二手联动销售确认书`}}</h2>
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
                clearable
                placeholder="请选择渠道类型"
                class="width--100"
                @change="queryUnderData(info.channelEnum, 'channel')"
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
                  clearable
                  placeholder="请选择公司种类"
                  class="width--100"
                  @change="companyKindChange"
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
                <IhSelectPageByChannel
                  v-model="info.designatedAgencyId"
                  clearable
                  placeholder="渠道商名称"
                  :params="searchConditon"
                  :search-name="info.designatedAgency"
                  @changeOption="getChannelInfo"
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
                :disabled="padCommissionEnumOptions.length === 1"
                @change="queryUnderData(info.padCommissionEnum, 'padCommission')"
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
        <div class="text-right padding-right-10">
          <el-button
            type="success"
            @click="add()"
          >增加</el-button>
        </div>
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
          <el-table-column
            fixed="right"
            label="操作"
            width="100"
            align="center"
          >
            <template v-slot="{ $index }">
              <el-button
                type="danger"
                size="small"
                @click="del($index)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <br />
        <div class="font-weight">四、客户确认及成交确认：</div>
        <div>
          <el-input
            show-word-limit
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
            :autosize="{ minRows: 4, maxRows: 8 }"
            placeholder="请输入代理费支付方式"
            v-model="info.agencyCostCondition"
          />
          <div>(2)</div>
          <el-input
            show-word-limit
            type="textarea"
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
              clearable
            />
          </el-form-item>
          /日的违约金支付给甲方，并承担甲方为主张权利而发生的律师费和差旅费等。
        </div>
        <div class="font-weight">六、其他：</div>
        <div>(1)本确认书自甲方加盖公章之日起生效。</div>
        <div>(2)本确认书一式两份，甲乙双方各执一份，具有同等法律效力。</div>
        <div>(3)本确认书未尽事宜，以甲乙双方最终签署的联动分销协议为准。</div>
        <br />
        <br />
        <div class="under">
          <div>{{info.partyCompany}}</div>
          <div>日期：年 &nbsp;&nbsp;&nbsp;&nbsp;月 &nbsp;&nbsp;&nbsp;&nbsp;日</div>
        </div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="合同电子版">
              <el-button
                type="primary"
                @click="viewElectronic"
              >预览电子版</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="text-center">
        <el-button
          type="success"
          @click="finish()"
          :loading="finishLoading"
        >提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </template>
    <ih-dialog :show="setmealDialogVisible">
      <SetMealDialog
        :searchdata="setMealDialogData"
        @cancel="() => (setmealDialogVisible = false)"
        @finish="(data) => setMealFinish(data)"
      />
    </ih-dialog>
  </ih-page>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import {
  post_distributContract_getCollectByCondition,
  post_distributContract_getCheckCollectByCondition,
  post_distributContract_addStandKindSaleConfirm,
  get_distributContract_getDistri__agencyContrictId,
} from "@/api/project/index";
import { get_company_get__id, post_dict_getAllByType } from "@/api/system";
import { Form as ElForm } from "element-ui";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import SetMealDialog from "../../setMealDialog.vue";
import axios from "axios";
import { getToken } from "ihome-common/util/cookies";
@Component({
  components: { SetMealDialog },
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
  };
  isShow: any = false;
  padCommissionEnumOptions: any = [];
  searchConditon: any = {};
  queryObj: any = {};
  setmealDialogVisible: any = false;
  setMealDialogData: any = {};
  finishLoading: any = false;
  rules: any = {
    timeList: [
      {
        required: true,
        message: "请选择合作期限",
        trigger: "change",
      },
    ],
    channelEnum: [
      {
        required: true,
        message: "请选择渠道类型",
        trigger: "change",
      },
    ],
    padCommissionEnum: [
      {
        required: true,
        message: "请选择垫佣周期",
        trigger: "change",
      },
    ],
    agencyFeeReturnTime: [
      {
        required: true,
        message: "请填写退回期限",
        trigger: "change",
      },
    ],
    agencyFeeReturnRate: [
      {
        required: true,
        message: "请填写违约金比例",
        trigger: "change",
      },
    ],
  };
  private companyKindOption: any = [];

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
    if (this.agencyContrictId) {
      const res = await get_distributContract_getDistri__agencyContrictId({
        agencyContrictId: this.agencyContrictId,
      });
      this.info = { ...res };
    } else {
      const res: any = sessionStorage.getItem("addContract");
      Object.assign(this.info, JSON.parse(res));
      if (this.info.preferentialPartyAId) {
        const item = await get_company_get__id({
          id: this.info.preferentialPartyAId,
        });
        this.info.partyCompany = item?.name;
        this.info.partyCompanyId = item?.id;
        this.info.partyaAddr = item?.address;
      }
    }
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

  getChannelInfo(item: any) {
    this.info.designatedAgency = item.name;
    this.info.designatedAgencyId = item.id;
    this.queryUnderData(this.info.designatedAgency, "business");
  }

  companyKindChange(val: any) {
    if (val) {
      switch (val) {
        case "ChannelCompany":
          this.searchConditon = {
            cycleCity: window.sessionStorage.getItem("shengshiqu"),
            departmentOrgId: window.sessionStorage.getItem("departmentOrgId"),
            // channelEnum: this.info.channelEnum,
          };
          break;
        case "InfieldCompany":
          this.searchConditon = {};
          break;
      }
    } else {
      this.info.designatedAgencyId = null;
      this.info.designatedAgency = null;
    }
  }

  // 根据渠道类型,垫佣周期,中介公司获取下表数据
  queryUnderData(data: any, type: any) {
    this.queryObj = {
      padCommissionEnum: this.info.padCommissionEnum,
      termId: this.info.termId,
      channelEnum: this.info.channelEnum,
      designatedAgency: null,
      designatedAgencyId: null,
      contractKind: "StandKindSaleConfirm",
    };
    if (type === "channel") {
      if (data === "Appoint" || data === "Strategic") {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    }
    if (this.isShow) {
      if (
        this.info.designatedAgency &&
        this.info.padCommissionEnum &&
        this.info.channelEnum
      ) {
        this.queryObj.designatedAgency = this.info.designatedAgency;
        this.queryObj.designatedAgencyId = this.info.designatedAgencyId;
        this.queryObj.companyKind = this.info.companyKind;
        this.queryCondition();
      }
    } else {
      this.info.designatedAgency = null;
      if (this.info.padCommissionEnum && this.info.channelEnum) {
        this.queryObj.designatedAgency = null;
        this.queryObj.designatedAgencyId = null;
        this.queryObj.companyKind = null;
        this.queryCondition();
      }
    }
  }

  // 表数据
  async queryCondition() {
    this.info.contractMxVOList = await post_distributContract_getCollectByCondition(
      this.queryObj
    );
  }

  add() {
    this.setMealDialogData.channelEnum = this.info.channelEnum;
    this.setMealDialogData.padCommissionEnum = this.info.padCommissionEnum;
    this.setMealDialogData.id = this.info.termId;
    this.setMealDialogData.contractKind = "StandKindSaleConfirm";
    this.setmealDialogVisible = true;
  }

  async del(index: number) {
    try {
      this.info.contractMxVOList.splice(index, 1);
      this.$message({
        type: "success",
        message: "删除成功!",
      });
    } catch (error) {
      console.log(error);
    }
  }

  async setMealFinish(data: any) {
    if (data.length) {
      let arr: any = [];
      arr = data.map((v: any) => v.packageMxId);
      this.queryObj.packMxIds = [
        ...new Set(
          arr.concat(this.info.contractMxVOList.map((v: any) => v.conditionId))
        ),
      ];
      this.queryObj.termId = this.info.termId;
      this.queryObj.channelEnum = this.info.channelEnum;
      this.queryObj.padCommissionEnum = this.info.padCommissionEnum;
      this.queryObj.contractKind = "StandKindSaleConfirm";
      if (this.isShow) {
        this.queryObj.designatedAgencyId = this.info.designatedAgencyId;
        this.queryObj.designatedAgency = this.info.designatedAgency;
        this.queryObj.companyKind = this.info.companyKind;
      }
      const item = await post_distributContract_getCheckCollectByCondition(
        this.queryObj
      );
      this.info.contractMxVOList = item;
      this.$message.success("新增成功");
      this.setmealDialogVisible = false;
    } else {
      this.$message.warning("请勾选详细收派标准信息");
    }
  }

  // 预览电子版
  viewElectronic() {
    if (this.agencyContrictId) {
      window.open(
        `/sales-api/sales-document-cover/file/browse/${this.info.fileId}`
      );
    } else {
      const token: any = getToken();
      axios({
        method: "POST",
        url: `/sales-api/project/distributContract/getPreView`,
        xsrfHeaderName: "Authorization",
        responseType: "blob",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + token,
        },
        data: {
          ...this.info,
          contractStartTime: this.info.timeList[0],
          contractEndTime: this.info.timeList[1],
        },
      }).then((res: any) => {
        const arr = new Blob([res.data], { type: "application/pdf" });
        const href = window.URL.createObjectURL(arr);
        window.open(href);
      });
    }
  }

  finish() {
    (this.$refs["form"] as ElForm).validate(this.submit);
  }

  @NoRepeatHttp()
  async submit(v: any) {
    if (v) {
      let obj: any = {};
      obj = { ...this.info };
      let flag = this.info.timeList && this.info.timeList.length;
      obj.contractStartTime = flag ? this.info.timeList[0] : null;
      obj.contractEndTime = flag ? this.info.timeList[1] : null;
      delete obj.timeList;
      console.log(obj);
      try {
        this.finishLoading = true;
        await post_distributContract_addStandKindSaleConfirm(obj);
        this.$message.success("模板添加成功");
        this.finishLoading = false;
        this.$router.push(`/projectApproval/edit?id=${this.info.termId}`);
      } catch (err) {
        this.finishLoading = false;
        console.log(err);
      }
    } else {
      setTimeout(() => {
        let isError: any = document.getElementsByClassName("is-error");
        if (isError != null) {
          isError[0].querySelector("input").focus();
        }
      }, 100);
      return false;
    }
  }

  cancel() {
    this.$router.push(`/projectApproval/edit?id=${this.info.termId}`);
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