<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-02 15:37:31
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-27 11:42:48
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="70%"
    class="text-left dialog-table"
    :title="`中介分销合同相关信息`"
    :append-to-body="true"
  >
    <el-form
      ref="form"
      label-width="160px"
      :model="info"
      :rules="rules"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="合同主标题"
            prop="contractTitle"
          >
            <el-input
              v-model="info.contractTitle"
              placeholder="请输入主标题"
              clearable
              class="width--100"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同副标题">
            <el-input
              v-model="info.contractSubtitle"
              placeholder="请输入副标题"
              clearable
              class="width--100"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="甲方公司"
            prop="partyCompany"
          >
            <el-input
              v-model="info.partyCompany"
              disabled
              class="width--100"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="甲方地址"
            prop='partyaAddr'
          >
            <el-input
              v-model="info.partyaAddr"
              class="width--100"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="负责人"
            prop="dealMan"
          >
            <el-input
              v-model="info.dealMan"
              placeholder="请输入负责人"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="负责人电话"
            prop="dealTel"
          >
            <el-input
              v-model="info.dealTel"
              placeholder="请输入负责人电话"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="甲方联系人"
            prop="partyaMan"
          >
            <el-input
              v-model="info.partyaMan"
              placeholder="请输入甲方联系人"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="甲方联系人电话"
            prop="partyaTel"
          >
            <el-input
              v-model="info.partyaTel"
              placeholder="请输入甲方联系人电话"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="合作时间"
            prop="timeList"
          >
            <el-date-picker
              style="width:100%;"
              v-model="info.timeList"
              type="daterange"
              align="left"
              unlink-panels
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="$root.pickerOptions"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="备注"
            prop="agencyFeeRemark"
          >
            <el-input
              class="textareaClass"
              maxlength="2000"
              show-word-limit
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8 }"
              placeholder="请输入备注"
              v-model="info.agencyFeeRemark"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="客户成交以及确认"
            prop="consumerComplete"
          >
            <el-input
              class="textareaClass"
              maxlength="2000"
              show-word-limit
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8 }"
              placeholder="请输入客户成交以及确认"
              v-model="info.consumerComplete"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="代理费结算条件"
            prop='agencyCostCondition'
          >
            <el-select
              v-model="info.agencySettleCondtion"
              clearable
              placeholder="请选择"
              class="width--50"
              @change="agencySettleCondtionChange"
            >
              <el-option
                v-for="item in $root.dictAllList('AgencySettleCondtion')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
            <el-input
              class="textareaClass"
              maxlength="2000"
              show-word-limit
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8 }"
              placeholder="请输入代理费结算条件"
              v-model="info.agencyCostCondition"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="代理费结算方式"
            prop="agencyCostSettleWay"
          >
            <el-input
              class="textareaClass"
              maxlength="2000"
              show-word-limit
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8 }"
              placeholder="请输入代理费结算方式"
              v-model="info.agencyCostSettleWay"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="费用结算类型"
            prop='costSettleType'
          >
            <el-select
              v-model="info.costSettleType"
              clearable
              placeholder="请选择"
              style="width: 50%"
            >
              <el-option
                v-for="item in $root.dictAllList('CostSettleType')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="违约责任"
            prop="unContractLiability"
          >
            <div class="editParty">
              <el-input
                class="textareaClass"
                maxlength="2000"
                show-word-limit
                :disabled="unContractDisabled"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 8 }"
                placeholder="请输入违约责任"
                v-model="info.unContractLiability"
              >
              </el-input>
              <i
                class="el-icon-edit-outline tubiao"
                @click="unContractDisabled = !unContractDisabled"
              ></i>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="其他约定">
            <el-input
              class="textareaClass"
              maxlength="2000"
              show-word-limit
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8 }"
              placeholder="请输入其他约定"
              v-model="info.supplementary"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="房屋未成交乙方退回代理费期限"
            prop="agencyFeeReturnTime"
            class="formItem"
          >
            <el-input
              class="textareaClass"
              maxlength="2000"
              v-model="info.agencyFeeReturnTime"
              clearable
              placeholder="请输入房屋未成交乙方退回代理费期限"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="房屋未成交乙方退回代理费逾期违约金比例"
            prop="agencyFeeReturnRate"
            class="formItem"
          >
            <el-input
              class="textareaClass"
              maxlength="2000"
              v-model="info.agencyFeeReturnRate"
              clearable
              placeholder="请输入房屋未成交乙方退回代理费逾期违约金比例"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
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
        <el-col
          style="margin-left: 10px"
          :span='10'
          v-if="isShow"
        >
          <IhSelectPageByChannel
            v-model="info.designatedAgencyId"
            clearable
            placeholder="渠道商名称"
            :params="searchConditon"
            :search-name="info.designatedAgency"
            @changeOption="getChannelInfo"
          ></IhSelectPageByChannel>
        </el-col>
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
    </el-form>
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
        <template v-slot="{ row }">{{ row.propertyEnum ? $root.dictAllName(row.propertyEnum, "Property") : '-' }}</template>
      </el-table-column>
      <el-table-column
        label="佣金分类"
        prop="costTypeEnum"
      >
        <template v-slot="{ row }">{{ row.costTypeEnum ? $root.dictAllName(row.costTypeEnum, "FeeType") : '-' }}</template>
      </el-table-column>
      <el-table-column
        label="条件"
        prop="standardPay"
      >
        <template v-slot="{ row }">{{ row.standardPay ? row.standardPay : '-' }}</template>
      </el-table-column>
      <el-table-column
        label="派发佣金标准"
        prop="sendContext"
      >
        <template v-slot="{ row }">{{ row.sendContext ? row.sendContext : '-' }}</template>
      </el-table-column>
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
    <div class="bottom margin-left-20">
      <div>合同电子版</div>
      <el-button
        type="primary"
        class="margin-left-20"
        @click="viewElectronic"
      >预览电子版</el-button>
    </div>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        type="primary"
        :loading="finishLoading"
        @click="finish()"
      >提 交</el-button>
    </span>
    <ih-dialog :show="setmealDialogVisible">
      <SetMealDialog
        :searchdata="setMealDialogData"
        @cancel="() => (setmealDialogVisible = false)"
        @finish="(data) => setMealFinish(data)"
      />
    </ih-dialog>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import {
  get_distributContract_getDistri__agencyContrictId,
  post_distributContract_getCollectByCondition,
  post_distributContract_getCheckCollectByCondition,
  post_distributContract_update,
  post_distributContract_add,
} from "@/api/project/index";
import { get_company_get__id } from "@/api/system/index";
import { Form as ElForm } from "element-ui";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import SetMealDialog from "./setMealDialog.vue";
import axios from "axios";
import { getToken } from "ihome-common/util/cookies";
import { phoneValidator } from "ihome-common/util/base/form-ui";

@Component({
  components: {
    SetMealDialog,
  },
})
export default class AddContract extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  setmealDialogVisible = false;
  finishLoading = false;
  queryObj: any = {};
  setMealDialogData: any = {};
  searchConditon: any = {};
  info: any = {
    agencySettleCondtion: null,
    contractTitle: null,
    contractSubtitle: null,
    partyCompany: null,
    partyaAddr: null,
    partyaMan: null,
    partyaTel: null,
    timeList: [],
    contractStartTime: null,
    contractEndTime: null,
    agencyFeeRemark:
      "成交时间节点判断以客户签订《认购书》为准。（根据实际情况添加）",
    consumerComplete:
      "系统内项目一般以悦家云系统确认客户，系统外项目以与开发商签订的合同为基础确定确认方式。客户成交及确认条款一般与开发商对我司的销售代理协议一致或严于该。（须要修改）",
    agencyCostCondition: null,
    agencyCostSettleWay:
      "乙方具备上述条件后X个工作日内，甲方向乙方结算首期代理费，首期代理费标准为【】。甲方在开发商收到乙方客户的银行按揭剩余回款后，甲方30个工作日内向乙方结算尾期代理费 （须要修改）。",
    unContractLiability: null,
    supplementary: null,
    agencyFeeReturnTime: null,
    agencyFeeReturnRate: null,
    channelEnum: null,
    designatedAgency: null,
    padCommissionEnum: null,
    dealMan: null,
    dealTel: null,
    contractMxVOList: [],
    termId: this.termId,
  };
  rules: any = {
    agencyFeeRemark: [
      {
        required: true,
        message: "请输入备注",
        trigger: "change",
      },
    ],
    contractTitle: [
      { required: true, message: "请输入合同主标题", trigger: "change" },
    ],
    partyCompany: [
      { required: true, message: "请输入甲方公司", trigger: "change" },
    ],
    partyaAddr: [
      { required: true, message: "请输入甲方地址", trigger: "change" },
    ],
    consumerComplete: [
      { required: true, message: "请输入客户成交以及确认", trigger: "change" },
    ],
    agencyCostCondition: [
      { required: true, message: "请输入代理费结算条件", trigger: "change" },
    ],
    agencyCostSettleWay: [
      { required: true, message: "请输入代理费结算方式", trigger: "change" },
    ],
    costSettleType: [
      {
        required: true,
        message: "请选择费用结算类型",
        trigger: "change",
      },
    ],
    unContractLiability: [
      { required: true, message: "请输入违约责任", trigger: "change" },
    ],
    dealMan: [{ required: true, message: "请输入负责人", trigger: "change" }],
    dealTel: [
      { required: true, message: "请输入负责人电话", trigger: "change" },
      { validator: phoneValidator, trigger: "change" },
    ],
    partyaMan: [
      { required: true, message: "请输入甲方联系人", trigger: "change" },
    ],
    partyaTel: [
      { required: true, message: "请输入甲方联系人电话", trigger: "change" },
      { validator: phoneValidator, trigger: "change" },
    ],
    timeList: [
      { required: true, message: "请选择合作时间", trigger: "change" },
    ],
    channelEnum: [
      {
        required: true,
        message: "请选择渠道类型",
        trigger: "change",
      },
    ],
    agencyFeeReturnTime: [
      {
        required: true,
        message: "请输入房屋未成交乙方退回代理费期限",
        trigger: "change",
      },
    ],
    agencyFeeReturnRate: [
      {
        required: true,
        message: "请输入房屋未成交乙方退回代理费逾期违约金比例",
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
  };
  isShow: any = false;
  unContractDisabled: any = true;
  padCommissionEnumOptions: any = [];

  @Watch("info.channelEnum", { immediate: true })
  getIsShow(val: any) {
    if (val === "Appoint" || val === "Strategic") {
      this.isShow = true;
      this.searchConditon = {
        cycleCity: window.sessionStorage.getItem("shengshiqu"),
        departmentOrgId: window.sessionStorage.getItem("departmentOrgId"),
        // channelEnum: this.info.channelEnum,
      };
    } else {
      this.isShow = false;
    }
  }

  agencySettleCondtionChange(val: any) {
    if (val === "ComNoPad") {
      this.info.agencyCostCondition = `乙方引荐客户支付首期房款，签订《商品房买卖合同》及其相关配套的法律文书（须要修改），乙方提交齐备的代理费核算文件（。。。。。。）及增值税发票的前提下，且甲方收到项目开发商或委托方相应代理费后，具备代理费结算条件。`;
    } else if (val === "ComPad") {
      this.info.agencyCostCondition = `乙方引荐客户支付首期房款，签订《商品房买卖合同》及其相关配套的法律文书（须要修改），开发商完成结算明细确认（即开发商明源系统转签约且项目开发商相关营销负责人书面签字确认），乙方提交齐备的代理费核算文件（。。。。。。）及增值税发票的前提下，具备代理费结算条件。`;
    } else if (val === "SpecialDiscount") {
      this.info.agencyCostCondition = `乙方引荐客户支付首期房款，签订《商品房买卖合同》及其相关配套的法律文书（须要修改），且开发商完成结算明细确认（即项目开发商总经理书面签字确认）后，乙方提交齐备的代理费核算文件（。。。。。。）及增值税发票的前提下，具备代理费结算条件。`;
    } else {
      this.info.agencyCostCondition = "";
    }
  }

  getChannelInfo(item: any) {
    this.info.designatedAgency = item.name;
    this.info.designatedAgencyId = item.id;
    this.queryUnderData(this.info.designatedAgency, "business");
  }

  private get termId() {
    return this.$route.query.id;
  }

  async created() {
    if (this.data.agencyContrictId) {
      this.getListMixin();
    } else {
      const item = await get_company_get__id({
        id: this.data.id,
      });
      this.info.partyCompany = item.name;
      this.info.partyaAddr = item.address;
      // this.info.padCommissionEnum = this.data.padCommissionEnum;
      this.info.unContractLiability = `乙方在销售过程中有下列行为之一时，甲方有权解除本协议，乙方需向甲方赔偿因此行为对甲方造成的
        所有损失（包括但不限于律师费、诉讼费、公证费、差旅费等费用），并向甲方支付实际应付代理费总额的20%作为违约金：
        8.1.1 对客户做出任何虚假承诺或擅自向客户收取费用；
        8.1.2 乙方人员与甲方现场销售人员或其他人员相互勾结，将原本属于自然到访客户通过不正当手段转化为乙方客户；
        8.1.3 乙方人员在项目周边直径1公里范围以内，有揽客、举牌、打街霸活动的；
        8.1.4 乙方人员在销售现场不服从甲方人员管理的且拒不改正；
        8.1.5 乙方人员在销售现场出现争客抢客、打架斗殴行为；
        8.1.6 乙方人员带客到现场，未经甲方代表确认，私自带客户进入项目；
        8.1.7 擅自将甲方提供的资料及在工作过程中知悉的甲方商业秘密对外披露、提供、发布等；
        8.1.8 其他有损害甲方及其关联公司合法权益和声誉的行为。`;
    }
    let options: any = sessionStorage.getItem("padCommissionEnum");
    this.padCommissionEnumOptions = JSON.parse(options);
  }

  async getListMixin() {
    const item = await get_distributContract_getDistri__agencyContrictId({
      agencyContrictId: this.data.agencyContrictId,
    });
    this.info = {
      ...item,
      timeList: [item.contractStartTime, item.contractEndTime],
    };
  }

  // 预览电子版
  viewElectronic() {
    if (this.data.agencyContrictId) {
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

  cancel() {
    this.$emit("cancel");
  }

  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      this.finishLoading = true;
      if (this.info.timeList.length) {
        this.info.contractStartTime = this.info.timeList[0];
        this.info.contractEndTime = this.info.timeList[1];
      }
      this.info.termId = this.$route.query.id;
      if (this.data.agencyContrictId) {
        this.info.agencyContrictId = this.data.agencyContrictId;
        try {
          await post_distributContract_update(this.info);
          this.finishLoading = false;
          this.$emit("finish");
        } catch (err) {
          this.finishLoading = false;
        }
      } else {
        try {
          this.info.partyCompanyId = this.data.id;
          await post_distributContract_add(this.info);
          this.finishLoading = false;
          this.$emit("finish");
        } catch (err) {
          this.finishLoading = false;
        }
      }
    } else {
      setTimeout(() => {
        let isError: any = document.getElementsByClassName("is-error");
        if (isError != null) {
          isError[0].querySelector("input").focus();
        }
      }, 100);
      console.log("error submit!");
      return false;
    }
  }

  finish() {
    (this.$refs["form"] as ElForm).validate(this.submit);
  }

  async del(index: number) {
    try {
      await this.$confirm("是否确定删除?", "提示");
      this.info.contractMxVOList.splice(index, 1);
      this.$message({
        type: "success",
        message: "删除成功!",
      });
    } catch (error) {
      console.log(error);
    }
  }

  // 根据渠道类型,垫佣周期,中介公司获取下表数据
  queryUnderData(data: any, type: any) {
    this.queryObj = {
      padCommissionEnum: this.info.padCommissionEnum,
      termId: this.termId,
      channelEnum: this.info.channelEnum,
      consumerName: null,
      consumerId: null,
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
        this.queryObj.consumerName = this.info.designatedAgency;
        this.queryObj.consumerId = this.info.designatedAgencyId;
        this.queryCondition();
      }
    } else {
      this.info.designatedAgency = null;
      if (this.info.padCommissionEnum && this.info.channelEnum) {
        this.queryObj.consumerName = null;
        this.queryObj.consumerId = null;
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
    this.setmealDialogVisible = true;
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
      this.queryObj.termId = this.termId;
      this.queryObj.channelEnum = this.info.channelEnum;
      this.queryObj.padCommissionEnum = this.info.padCommissionEnum;
      if (this.isShow) {
        this.queryObj.consumerId = this.info.designatedAgencyId;
        this.queryObj.consumerName = this.info.designatedAgency;
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
}
</script>
<style lang="scss" scoped>
.dialog-table {
  /deep/ .el-dialog {
    margin-top: 5vh !important;
  }
  /deep/ .el-dialog__body {
    padding: 10px 30px 10px 20px;
  }
}
.bottom {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.editParty {
  position: relative;
  .tubiao {
    position: absolute;
    bottom: 20px;
    right: 25px;
    font-size: 24px;
    cursor: pointer;
  }
}
.textareaClass {
  /deep/ .el-input__count {
    background: transparent;
    bottom: -5px;
    right: 20px;
  }
}
.formItem {
  /deep/ .el-form-item__label {
    line-height: 20px;
  }
}
</style>