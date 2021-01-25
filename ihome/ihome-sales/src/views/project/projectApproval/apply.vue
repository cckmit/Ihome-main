<template>
  <IhPage class="text-left">
    <template #info>
      <p class="ih-info-title">申领渠道分销合同</p>
      <el-form
        ref="Form"
        label-width="120px"
        class="demo-ruleForm"
        :model="info"
        :rules="rules"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="周期">
              <el-select
                v-model="info.cycleId"
                placeholder="周期"
                clearable
                disabled
                filterable
                style="width: 70%"
              >
                <el-option
                  v-for="item in dropOption"
                  :key="item.termId"
                  :label="item.termName"
                  :value="item.termId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :span="12"
            class="text-right"
          >
            <el-button
              type="primary"
              class="margin-bottom-17"
              @click="handleOpen()"
            >选择分销合同模板</el-button>
          </el-col>
        </el-row>
        <el-row>
          <div class="padding-left-30">
            <el-table :data="templateData">
              <el-table-column
                label="合同主标题"
                prop="contractTitle"
              ></el-table-column>
              <el-table-column
                label="甲方公司"
                prop="partyCompany"
                min-width="160"
              ></el-table-column>
              <el-table-column
                prop="padCommissionEnum"
                label="是否垫佣"
              >
                <template v-slot="{ row }">{{
                  $root.dictAllName(row.padCommissionEnum, "PadCommission")
                }}</template>
              </el-table-column>
              <el-table-column
                prop="channelEnum"
                label="渠道类型"
              >
                <template v-slot="{ row }">{{
                  $root.dictAllName(row.channelEnum, "ChannelCustomer")
                }}</template>
              </el-table-column>
              <el-table-column
                label="操作"
                fixed="right"
                width="150"
              >
                <template v-slot="{ row }">
                  <el-link
                    type="primary"
                    class="margin-right-15"
                    @click="viewTemplate(row)"
                  >查看参数</el-link>
                  <el-link
                    type="primary"
                    @click="previewTop(row)"
                  >预览合同</el-link>
                </template>
              </el-table-column>
            </el-table>
            <br />
          </div>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="合同跟进人"
              prop="handlerId"
            >
              <IhSelectPageUser
                v-model="info.handlerId"
                clearable
                value-key="id"
                style="width: 70%"
                :search-name="handler.name"
                @changeOption="(data) => {handler = data}"
              >
                <template v-slot="{ data }">
                  <span style="float: left">{{ data.name }}</span>
                  <span style="margin-left: 20px;float: right; color: #8492a6; font-size: 13px">{{ data.account }}</span>
                </template>
              </IhSelectPageUser>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider></el-divider>
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
          <el-row>
            <el-col :span="12">
              <el-form-item label="负责人">
                <span :title="info.dealMan">{{info.dealMan}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="负责人电话">
                <span :title="info.dealTel">{{info.dealTel}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="乙方(渠道)公司"
              prop="channelCompanyId"
            >
              <SelectPageByCondition
                v-if="!(searchConditon.channelEnum === 'Appoint' || searchConditon.channelEnum === 'Strategic')"
                v-model="info.channelCompanyId"
                clearable
                :disabled="SelectPageByConditionDisabled"
                style="width: 70%"
                placeholder="渠道商名称"
                :params="searchConditon"
                @changeOption="getChannelInfo"
              ></SelectPageByCondition>
              <span v-else>{{info.channelCompanyName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方渠道等级">
              <!-- <span v-if="!['Appoint', 'Strategic'].includes(searchConditon.channelEnum)">
                {{$root.dictAllName(info.channelLevel, 'ChannelLevel')}}
              </span>
              <span v-else>{{$root.dictAllName(info.channelLevel, 'ChannelCustomer')}}</span> -->
              <span>{{$root.dictAllName(info.channelLevel, 'ChannelLevel')}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方地址">
              <span>{{info.channelAddress}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="乙方联系人"
              prop="channelContact"
            >
              <el-input
                placeholder="乙方联系人"
                style="width: 70%"
                v-model="info.channelContact"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="乙方联系人电话"
              prop="channelContactTel"
            >
              <el-input
                placeholder="乙方联系人电话"
                style="width: 70%"
                v-model="info.channelContactTel"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="乙方账号名"
              prop="channelAccountName"
            >
              <el-select
                v-model="info.channelAccountName"
                placeholder="乙方账号名"
                clearable
                style="width: 70%"
                value-key="id"
                @change="channelAccountChange"
              >
                <el-option
                  v-for="item in channelAccountOptions"
                  :key="item.id"
                  :label="item.accountName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="乙方账号"
              prop="channelAccount"
            >
              <span>{{info.channelAccount}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="乙方开户行"
              prop="channelAccountBank"
            >
              <span>{{info.channelAccountBank}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="合作期限">
              <span
                class="text-ellipsis"
                :title="info.contractStartTime + info.contractEndTime"
              >{{info.contractStartTime + '~' + info.contractEndTime}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同跟进人">
              {{handler ? handler.name : '--'}}
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
                show-word-limit
                type="textarea"
                disabled
                :autosize="{ minRows: 4, maxRows: 8 }"
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
              class="formItem"
            >
              <el-input
                disabled
                show-word-limit
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 8 }"
                v-model="info.consumerComplete"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="代理费结算条件">
              <el-input
                disabled
                show-word-limit
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 8 }"
                v-model="info.agencyCostCondition"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="代理费结算方式">
              <el-input
                disabled
                show-word-limit
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 8 }"
                v-model="info.agencyCostSettleWay"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="违约责任">
              <el-input
                show-word-limit
                disabled
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 8 }"
                v-model="info.unContractLiability"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="补充条款">
              <el-input
                disabled
                show-word-limit
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 8 }"
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
              class="formItem"
            >
              <span
                class="text-ellipsis"
                :title="info.agencyFeeReturnTime"
              >{{info.agencyFeeReturnTime}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="房屋未成交乙方退回代理费逾期违约金比例"
              class="formItem"
            >
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
            <el-form-item label="代理费是否垫佣">
              <span
                class="text-ellipsis"
                :title="$root.dictAllName(info.padCommissionEnum, 'PadCommission')"
              >{{$root.dictAllName(info.padCommissionEnum, 'PadCommission')}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="padding-left-30">
        <el-table :data="info.contractMxVOList">
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
      </div>
      <div class="bottom margin-left-20">
        <div>合同电子版</div>
        <el-button
          type="primary"
          class="margin-left-20"
          @click="viewElectronic"
        >预览电子版</el-button>
      </div>
      <div class="text-center">
        <el-button
          type="primary"
          :loading="submitLoading"
          @click="finish()"
        >提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </template>

    <ih-dialog :show="dialogFormVisible">
      <TemplateDailog
        :data="editData"
        @cancel="() => (dialogFormVisible = false)"
        @finish="(data) => templateFinish(data)"
      />
    </ih-dialog>
    <ih-dialog :show="viewDialogVisible">
      <ViewContract
        :data="viewData"
        @cancel="() => (viewDialogVisible = false)"
      />
    </ih-dialog>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

import TemplateDailog from "./dialog/apply-dialog/templateDialog.vue";
import {
  post_term_getDropDown,
  get_distributContract_getDistri__agencyContrictId,
} from "@/api/project/index";
import {
  get_channel_get__id,
  post_channelGrade_getOne,
} from "@/api/channel/index";
import { post_distribution_create } from "@/api/contract/index";
import ViewContract from "./dialog/notification-dialog/viewContract.vue";
import axios from "axios";
import { getToken } from "ihome-common/util/cookies";
import SelectPageByCondition from "@/components/SelectPageByCondition.vue";
import { phoneValidator } from "ihome-common/util/base/form-ui";
import { Form as ElForm } from "element-ui";
import { NoRepeatHttp } from "ihome-common/util/aop/no-repeat-http";

@Component({
  components: { TemplateDailog, ViewContract, SelectPageByCondition },
})
export default class Apply extends Vue {
  dialogFormVisible = false;
  viewDialogVisible = false;
  viewData: any = {};
  dropOption: any = [];
  channelData: any = null;
  handler: any = {
    name: null,
    id: null,
  };
  templateData: any = [];
  editData: any = {};
  info: any = {
    cycleId: null,
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
    handlerId: null,
    contractMxVOList: [],
    channelLevel: null,
    channelCompanyId: null,
    channelCompanyName: null,
    channelAccountName: null,
  };

  isShow = false;
  channelAccountOptions: any = [];
  searchConditon: any = {};
  submitLoading: any = false;
  SelectPageByConditionDisabled: any = true;
  rules: any = {
    handlerId: [
      {
        required: true,
        message: "请选择合同跟进人",
        trigger: "change",
      },
    ],
    channelCompanyId: [
      {
        required: true,
        message: "请选择乙方(渠道)公司",
        trigger: "change",
      },
    ],
    channelContact: [
      {
        required: true,
        message: "请填写乙方联系人",
        trigger: "change",
      },
    ],
    channelContactTel: [
      {
        required: true,
        message: "请填写乙方联系人电话",
        trigger: "change",
      },
      { validator: phoneValidator, trigger: "change" },
    ],
    channelAccountName: [
      {
        required: true,
        message: "请选择乙方账号名",
        trigger: "change",
      },
    ],
    channelAccount: [
      {
        required: true,
        message: "乙方账号为必填项",
        trigger: "change",
      },
    ],
    channelAccountBank: [
      {
        required: true,
        message: "乙方开户行为必填项",
        trigger: "change",
      },
    ],
  };

  @Watch("info.channelEnum", { immediate: true })
  getIsShow(val: any) {
    if (val === "Appoint") {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  viewTemplate(data: any) {
    this.viewData.agencyContrictId = data.agencyContrictId;
    this.viewDialogVisible = true;
  }

  private handleOpen(): void {
    if (!this.info.cycleId) {
      this.$message.warning("请选择周期信息");
      return;
    }
    this.editData.id = this.info.cycleId;
    this.dialogFormVisible = true;
  }

  templateFinish(data: any) {
    this.info.channelCompanyId = null;
    this.SelectPageByConditionDisabled = false;
    this.searchConditon = {
      cycleCity: data.city,
      channelEnum: data.channelEnum,
      departmentOrgId: data.departmentOrgId,
    };
    this.getApplyInfo(data.agencyContrictId);
    this.dialogFormVisible = false;
    this.info.agencyId = data.agencyContrictId;
    this.templateData = [data];
  }

  // 获取详情信息
  async getApplyInfo(id: any) {
    const item = await get_distributContract_getDistri__agencyContrictId({
      agencyContrictId: id,
    });
    if (item.designatedAgencyId && item.designatedAgency) {
      this.info = {
        ...this.info,
        ...item,
        channelCompanyId: item.designatedAgencyId,
        channelCompanyName: item.designatedAgency,
        // channelLevel: item.channelEnum,
      };
      this.getChannelInfo({
        id: item.designatedAgencyId,
        name: item.designatedAgency,
      });
    } else {
      this.info = {
        ...this.info,
        ...item,
      };
    }
  }

  private async getDropDown(): Promise<void> {
    this.dropOption = await post_term_getDropDown();
  }
  private async getChannelInfo(item: any) {
    let res = await get_channel_get__id({ id: item.id });
    this.channelAccountOptions = res.channelBanks;
    this.info.channelAddress = res.address;
    // this.info.channelAccountName = "";
    this.info.channelCompanyId = item.id;
    // 以下操作仅仅是为了获取渠道等级
    let list = this.dropOption.find((v: any) => v.termId === this.info.cycleId);
    let obj: any = {
      pageNum: 1,
      pageSize: 10,
      channelId: res.id,
      departmentOrgId: list.startDivisionId,
      city: list.city,
    };
    let channelList: any = await post_channelGrade_getOne(obj);
    this.info.channelLevel = channelList?.channelGrade;
    this.info.organizationId = window.sessionStorage.getItem("groupId");
  }

  // 预览电子版
  async viewElectronic() {
    const token: any = getToken();
    axios({
      method: "POST",
      url: `/sales-api/contract/template/distribution/preview`,
      xsrfHeaderName: "Authorization",
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
      data: this.info,
    }).then((res: any) => {
      const arr = new Blob([res.data], { type: "application/pdf" });
      const href = window.URL.createObjectURL(arr);
      window.open(href);
    });
  }

  previewTop(row: any) {
    // const token: any = getToken();
    // axios({
    //   method: "POST",
    //   url: `/sales-api/project/distributContract/getPreViewOut/${row.agencyContrictId}`,
    //   xsrfHeaderName: "Authorization",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "bearer " + token,
    //   },
    // }).then((res: any) => {
    //   const arr = new Blob([res.data], { type: "application/pdf" });
    //   const href = window.URL.createObjectURL(arr);
    //   window.open(href);
    // });
    window.open(
      `/sales-api/sales-document-cover/file/browse/${row.scanningContract}`
    );
  }

  channelAccountChange(val: any) {
    const item = this.channelAccountOptions.find((v: any) => v.id === val);
    this.info.channelAccount = item.accountNo;
    this.info.channelAccountBank = item.branchName;
    this.info.channelAccountName = item.accountName;
  }

  @NoRepeatHttp()
  async submit(valid: any) {
    if (valid) {
      this.submitLoading = true;
      try {
        let obj: any = {
          ...this.info,
          distributionMxList: this.info.contractMxVOList.map((v: any) => ({
            ...v,
            sendStandard: v.sendContext,
            sendContext: v.standardPay,
          })),
        };
        delete obj.contractMxVOList;
        await post_distribution_create(obj);
        this.submitLoading = false;
        this.$message.success("申领成功");
        this.$goto({
          path: "/distribution/list",
        });
      } catch (err) {
        this.submitLoading = false;
      }
    }
  }

  finish() {
    (this.$refs["Form"] as ElForm).validate(this.submit);
  }

  async created() {
    await this.getDropDown();
    this.info.cycleId = Number(this.$route.query.id);
    this.info.handlerId = (this.$root as any).userInfo.id;
    this.handler = {
      name: (this.$root as any).userInfo.name,
      id: (this.$root as any).userInfo.id,
    };
  }

  cancel() {
    this.$goto({
      path: "/projectApproval/list",
    });
  }
}
</script>
<style lang="scss" scoped>
.text-ellipsis {
  width: 100%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bottom {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.formItem {
  /deep/ .el-form-item__label {
    line-height: 20px;
  }
}
</style>