<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-01-09 16:23:04
 * @LastEditors: wwq
 * @LastEditTime: 2021-01-09 16:24:22
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
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="合同主标题">
            <span
              class="text-ellipsis"
              :title="info.contractTitle"
            >{{info.contractTitle}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同副标题">
            <span
              class="text-ellipsis"
              :title="info.contractSubtitle"
            >{{info.contractSubtitle}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="甲方公司">
            <span
              class="text-ellipsis"
              :title="info.partyCompany"
            >{{info.partyCompany}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="甲方地址">
            <span
              class="text-ellipsis"
              :title="info.partyaAddr"
            >{{info.partyaAddr}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="甲方联系人">
            <span
              class="text-ellipsis"
              :title="info.partyaMan"
            >{{info.partyaMan}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="甲方联系人电话">
            <span
              class="text-ellipsis"
              :title="info.partyaTel"
            >{{info.partyaTel}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="负责人">
            <span
              class="text-ellipsis"
              :title="info.dealMan"
            >{{info.dealMan}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="负责人电话">
            <span
              class="text-ellipsis"
              :title="info.dealTel"
            >{{info.dealTel}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="合作时间">
            <span
              class="text-ellipsis"
              :title="info.contractStartTime + info.contractEndTime"
            >{{info.contractStartTime + '~' + info.contractEndTime}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="代理费计付标准备注">
            <pre
              class="pre-style"
              :title="info.agencyFeeRemark"
            >{{info.agencyFeeRemark}}</pre>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="客户成交以及确认">
            <pre
              class="pre-style"
              :title="info.consumerComplete"
            >{{info.consumerComplete}}</pre>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="代理费结算条件">
            <pre
              class="pre-style"
              :title="info.agencyCostCondition"
            >{{info.agencyCostCondition}}</pre>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="代理费结算方式">
            <pre
              class="pre-style"
              :title="info.agencyCostSettleWay"
            >{{info.agencyCostSettleWay}}</pre>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="违约责任">
            <pre
              class="pre-style"
              :title="info.unContractLiability"
            >{{info.unContractLiability}}</pre>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="补充条款">
            <pre
              class="pre-style"
              :title="info.supplementary"
            >{{info.supplementary}}</pre>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="房屋未成交乙方退回代理费期限"
            prop="agencyFeeReturnTime"
          >
            <span
              class="text-ellipsis"
              :title="info.agencyFeeReturnTime"
            >{{info.agencyFeeReturnTime}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="房屋未成交乙方退回代理费逾期违约金比例">
            <span
              class="text-ellipsis"
              :title="info.agencyFeeReturnRate"
            >{{info.agencyFeeReturnRate}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="渠道类型">
            <span
              class="text-ellipsis"
              :title="$root.dictAllName(info.channelEnum, 'ChannelCustomer')"
            >{{$root.dictAllName(info.channelEnum, 'ChannelCustomer')}}</span>
          </el-form-item>
        </el-col>
        <el-col
          style="margin-left: 10px"
          :span='10'
          v-if="isShow"
        >
          <el-form-item label="中介公司">
            <span
              class="text-ellipsis"
              :title="info.designatedAgency"
            >{{info.designatedAgency}}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="垫佣周期"
            prop="padCommissionEnum"
          >
            <span
              class="text-ellipsis"
              :title="$root.dictAllName(info.padCommissionEnum, 'PadCommission')"
            >{{$root.dictAllName(info.padCommissionEnum, 'PadCommission')}}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
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
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { get_his_distributContract_getDistri__agencyContrictId } from "@/api/project/index";
import axios from "axios";
import { getToken } from "ihome-common/util/cookies";

@Component({
  components: {},
})
export default class AddContract extends Vue {
  @Prop({ default: null }) data: any;
  dialogVisible = true;
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
    dealMan: null,
    dealTel: null,
    designatedAgency: null,
    padCommissionEnum: null,
    contractMxVOList: [],
    termId: this.termId,
  };
  isShow: any = false;
  unContractDisabled: any = true;
  private get termId() {
    return this.$route.query.id;
  }

  @Watch("info.channelEnum", { immediate: true })
  getIsShow(val: any) {
    if (val === "Appoint") {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  async created() {
    if (this.data.agencyContrictId) {
      this.getListMixin();
    }
  }

  async getListMixin() {
    const item = await get_his_distributContract_getDistri__agencyContrictId({
      agencyContrictId: this.data.agencyContrictId,
    });
    this.info = { ...item };
  }

  cancel() {
    this.$emit("cancel");
  }

  // 预览电子版
  viewElectronic() {
    const token: any = getToken();
    axios({
      method: "POST",
      url: `/sales-api/project/his/distributContract/getPreView`,
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
.text-ellipsis {
  width: 100%;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.pre-style {
  white-space: pre-wrap;
  margin: 0;
}
</style>