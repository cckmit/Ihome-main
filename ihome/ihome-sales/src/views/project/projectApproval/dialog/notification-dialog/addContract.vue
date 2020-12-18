<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-02 15:37:31
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-17 14:41:11
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
          <el-form-item
            label="合同副标题"
            prop="contractSubtitle"
          >
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
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="甲方联系人">
            <el-input
              v-model="info.partyaMan"
              placeholder="请输入甲方联系人"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="甲方联系人电话">
            <el-input
              v-model="info.partyaTel"
              placeholder="请输入甲方联系人电话"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="合作时间">
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
          <el-form-item label="代理费计付标准备注">
            <el-input
              show-word-limit
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8 }"
              placeholder="请输入代理费计付标准备注"
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
            <el-input
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
            label="违约责任"
            prop="unContractLiability"
          >
            <div class="editParty">
              <el-input
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
          <el-form-item label="补充条款">
            <el-input
              show-word-limit
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8 }"
              placeholder="请输入补充条款"
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
          >
            <el-input
              v-model="info.agencyFeeReturnTime"
              clearable
              placeholder="请输入房屋未成交乙方退回代理费期限"
              class="width--100"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="房屋未成交乙方退回代理费逾期违约金比例"
            prop="agencyFeeReturnRate"
          >
            <el-input
              v-model="info.agencyFeeReturnRate"
              clearable
              placeholder="请输入房屋未成交乙方退回代理费逾期违约金比例"
              class="width--100"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="渠道类型">
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
          <el-input
            placeholder="请选择中介公司"
            v-model="info.designatedAgency"
            class="input-with-select"
            readonly
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="businessDialogVisible = true"
            ></el-button>
          </el-input>
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
        @click="finish()"
      >提 交</el-button>
    </span>
    <ih-dialog :show="businessDialogVisible">
      <Business
        @cancel="() => (businessDialogVisible = false)"
        @finish="(data) => businessFinish(data)"
      />
    </ih-dialog>
    <ih-dialog :show="setmealDialogVisible">
      <SetMealDialog
        @cancel="() => (setmealDialogVisible = false)"
        @finish="(data) => setMealFinish(data)"
      />
    </ih-dialog>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import {
  get_distributContract_getDistri__agencyContrictId,
  post_distributContract_getCollectByCondition,
  post_distributContract_getCheckCollectByCondition,
} from "@/api/project/index";
import { Form as ElForm } from "element-ui";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";
import Business from "../notification-dialog/channelBusiness.vue";
import SetMealDialog from "./setMealDialog.vue";
import axios from "axios";
import { getToken } from "ihome-common/util/cookies";

@Component({
  components: {
    Business,
    SetMealDialog,
  },
})
export default class AddContract extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  businessDialogVisible = false;
  setmealDialogVisible = false;
  queryObj: any = {};
  info: any = {
    contractTitle: null,
    contractSubtitle: null,
    partyCompany: null,
    partyaAddr: null,
    partyaMan: null,
    partyaTel: null,
    timeList: [],
    contractStartTime: null,
    contractEndTime: null,
    agencyFeeRemark: null,
    consumerComplete: null,
    agencyCostCondition: null,
    agencyCostSettleWay: null,
    unContractLiability: null,
    supplementary: null,
    agencyFeeReturnTime: null,
    agencyFeeReturnRate: null,
    channelEnum: null,
    designatedAgency: null,
    padCommissionEnum: null,
    contractMxVOList: [],
  };
  rules: any = {
    contractTitle: [
      { required: true, message: "请输入合同主标题", trigger: "change" },
    ],
    contractSubtitle: [
      { required: true, message: "请输入合同副标题", trigger: "change" },
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
    unContractLiability: [
      { required: true, message: "请输入违约责任", trigger: "change" },
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
  private get termId() {
    return this.$route.query.id;
  }

  async created() {
    if (this.data.agencyContrictId) {
      this.getListMixin();
    } else {
      this.info.partyCompany = this.data.preferentialPartyA;
      this.info.partyaAddr = this.data.preferentialPartyAddr;
      this.padCommissionEnumOptions = [
        {
          code: "Veto",
          name: "否",
        },
        {
          code: this.data.padCommissionEnum,
          name: (this.$root as any).dictAllName(
            this.data.padCommissionEnum,
            "PadCommission"
          ),
        },
      ];
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
  }

  async getListMixin() {
    const item = await get_distributContract_getDistri__agencyContrictId({
      agencyContrictId: this.data.agencyContrictId,
    });
    this.info = {
      ...item,
      timeList: [item.contractStartTime, item.contractEndTime],
    };
    this.padCommissionEnumOptions = [
      {
        code: "Veto",
        name: "否",
      },
      {
        code: item.padCommissionEnum,
        name: (this.$root as any).dictAllName(
          item.padCommissionEnum,
          "PadCommission"
        ),
      },
    ];
  }

  // 预览电子版
  viewElectronic() {
    const token: any = getToken();
    axios({
      method: "POST",
      url: `/sales-api/project/distributContract/getPreView`,
      xsrfHeaderName: "Authorization",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
      data: this.info,
    }).then((res: any) => {
      if (res?.data?.fileId) {
        axios({
          method: "POST",
          url: `/sales-api/sales-document-cover/pdf/ftlToPdf/brow`,
          xsrfHeaderName: "Authorization",
          responseType: "blob",
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + token,
          },
          data: {
            data: res.data.parmas,
            fileId: res.data.fileId,
          },
        }).then((item: any) => {
          const arr = new Blob([item.data], { type: "application/pdf" });
          const href = window.URL.createObjectURL(arr);
          window.open(href);
        });
      }
    });
  }

  cancel() {
    this.$emit("cancel");
  }

  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      if (this.info.timeList.length) {
        this.info.contractStartTime = this.info.timeList[0];
        this.info.contractEndTime = this.info.timeList[1];
      }
      this.$emit("finish", this.info);
    } else {
      console.log("error submit!");
      return false;
    }
  }

  businessFinish(data: any) {
    this.info.designatedAgency = data[0].name;
    this.info.designatedAgencyId = data[0].id;
    this.businessDialogVisible = false;
    this.queryUnderData(this.info.designatedAgency, "business");
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
      termId: this.$route.query.id,
      channelEnum: this.info.channelEnum,
      consumerName: null,
      consumerId: null,
    };
    if (type === "channel") {
      this.isShow = data === "Appoint" || data === "Strategic" ? true : false;
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
      this.queryObj.termId = this.$route.query.id;
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
    bottom: 5px;
    right: 25px;
    font-size: 24px;
    cursor: pointer;
  }
}
</style>