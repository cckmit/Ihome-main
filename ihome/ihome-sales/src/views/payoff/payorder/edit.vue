<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-26 11:11:23
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-29 17:54:28
-->
<template>
  <ih-page>
    <template v-slot:form>
      <p class="ih-info-title">付款申请单信息</p>
      <el-form
        ref="form"
        label-width="120px"
        :model="info"
        :rules="rules"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="付款单编号"
              prop="applyCode"
            >
              <el-input
                disabled
                v-model="info.applyCode"
                placeholder="付款单编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="当前状态"
              prop="status"
            >
              <el-input
                disabled
                v-model="info.status"
                placeholder="当前状态"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="渠道商"
              prop="agencyId"
            >
              <IhSelectPageByChannel
                placeholder="请选择渠道商"
                v-model="info.agencyId"
                :search-name="info.agencyName"
                @changeOption="getChannelInfo"
              ></IhSelectPageByChannel>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="渠道收款账号"
              prop="receiveAccount"
            >
              <el-select
                v-model="info.receiveAccount"
                clearable
                placeholder="请选择账号"
                class="width--100"
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
          <el-col :span="8">
            <el-form-item
              label="渠道商发票类型"
              required
              prop="invoiceType"
            >
              <el-select
                v-model="info.invoiceType"
                clearable
                placeholder="请选择类型"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('InvoiceType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="发票税率"
              prop="taxRate"
            >
              <el-select
                v-model="info.taxRate"
                clearable
                placeholder="请选择发票税率"
                class="width--100"
              >
                <el-option
                  v-for="item in $root.dictAllList('ChannelCompanyType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="制单人"
              prop="makerId"
            >
              <el-input
                disabled
                v-model="info.makerId"
                placeholder="制单人"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="制单日期"
              prop="makerTime"
            >
              <el-input
                disabled
                v-model="info.makerTime"
                placeholder="制单日期"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template v-slot:table>
      <div class="content">
        <p class="ih-info-title">待付款列表</p>
        <el-button
          @click="addContacts()"
          type="success"
          size="small"
        >添加成交报告</el-button>
      </div>
      <div class="text-left margin-left-20 zhouqi">
        <div>归属周期</div>
        <el-radio-group
          v-model="radio"
          class="margin-left-20"
          @change="radioChange"
        >
          <template v-for="(item, i) in radioList">
            <el-radio-button
              :label="item.value"
              :key="i"
            >{{item.label}}</el-radio-button>
          </template>
        </el-radio-group>
      </div>
      <br />
      <div class="padding-left-20">
        <el-table
          class="ih-table"
          :data="showTable"
          style="width: 100%"
          show-summary
          :summary-method="getSummaries"
        >
          <el-table-column
            type="index"
            width="50"
            label="序号"
          ></el-table-column>
          <el-table-column
            label="成交信息"
            width="250"
            prop="1"
          >
            <template v-slot="{ row }">
              <div
                class="text-ellipsis"
                :title="row.customer"
              >客户姓名: {{row.customer}}</div>
              <div
                class="text-ellipsis"
                :title="row.dealCode"
              >成交编号: {{row.dealCode}}</div>
              <div
                class="text-ellipsis"
                :title="row.address"
              >地址: {{row.address}}</div>
              <div
                class="text-ellipsis"
                :title="$root.dictAllName(row.busModel, 'BusinessModel')"
              >业务模式: {{$root.dictAllName(row.busModel, 'BusinessModel')}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="周期合同信息"
            width="250"
            prop="2"
          >
            <template v-slot="{ row }">
              <div
                class="text-ellipsis"
                :title="row.cycleName"
              >周期名称: {{row.cycleName}}</div>
              <div class="text-ellipsis">是否垫佣: {{$root.dictAllName(row.isMat, 'YesOrNoType')}}</div>
              <div
                class="text-ellipsis"
                :title="row.contNo"
              >分销协议编号: {{row.contNo}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="签约价格"
            prop="signPrice"
          ></el-table-column>
          <el-table-column
            label="签约日期"
            prop="signDate"
            width="150"
          ></el-table-column>
          <el-table-column
            label="服务费情况"
            width="150"
            prop="5"
          >
            <template v-slot="{ row }">
              <div>应收: {{row.serReceiveFees}}</div>
              <div>实收: {{row.serActualFees}}</div>
              <div>未收: {{row.serNoFees}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="代理费情况"
            width="150"
            prop="6"
          >
            <template v-slot="{ row }">
              <div>应收: {{row.ageReceiveFees}}</div>
              <div>实收: {{row.ageActualFees}}</div>
              <div>未收: {{row.ageNoFees}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="拆佣金额"
            width="150"
            prop="7"
          >
            <template v-slot="{ row }">
              <div>服务费: {{row.serCommFees}}</div>
              <div>代理费: {{row.ageCommFees}}</div>
              <div>合计: {{row.allCommFees}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="已结佣付款金额"
            width="150"
            prop="8"
          >
            <template v-slot="{ row }">
              <div>服务费: {{row.serSettledCommFees}}</div>
              <div>代理费: {{row.ageSettledCommFees}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="未结佣付款金额"
            width="150"
            prop="9"
          >
            <template v-slot="{ row }">
              <div>服务费: {{row.serUnsetCommFees}}</div>
              <div>代理费: {{row.ageUnsetCommFees}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="本次付款金额"
            prop="10"
            width="200"
          >
            <template v-slot="{ row }">
              <div>
                服务费:
                <el-input
                  v-model="row.serNoCommFees"
                  v-digits="2"
                  clearable
                  style="width: 70%"
                />
              </div>
              <div class="margin-top-5">
                代理费:
                <el-input
                  v-model="row.ageNoCommFees"
                  v-digits="2"
                  clearable
                  style="width: 70%"
                />
              </div>
              <div>合计: {{
                Number(row.serNoCommFees?row.serNoCommFees:0) + 
                Number(row.ageNoCommFees?row.ageNoCommFees:0)
              }}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="不含税金额"
            width="150"
            prop="11"
          >
            <template v-slot="{ row }">
              <div>不含税金额: {{row.noTaxAmount}}</div>
              <div>税额: {{row.tax}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="付款限额"
            width="150"
            prop="12"
          >
            <template v-slot="{ row }">
              <div>服务费: {{row.serLimitFees}}</div>
              <div>代理费: {{row.ageLimitFees}}</div>
              <div>签字确认: {{$root.dictAllName(row.signConfirm, 'YesOrNoType')}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="扣除项类别"
            width="200"
          >
            <template v-slot="{ row }">
              <el-select
                v-model="row.deductType"
                clearable
                placeholder="请选择扣除项类别"
                style="width: 70%"
              >
                <el-option
                  v-for="item in $root.dictAllList('DeductStatus')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            label="本次应扣"
            width="150"
            prop="14"
          >
            <template v-slot="{ row }">
              <el-input
                v-model="row.thisDeduct"
                v-digits="2"
                clearable
                style="width: 70%"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="本次支付比例(%)"
            prop="ratio"
            width="150"
          ></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
          >
            <template v-slot="{ $index }">
              <el-button
                type="danger"
                size="small"
                @click="delContacts($index)"
              > 移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <br />
      <el-button type="primary">点击计算结佣统计数据及成本归属明细</el-button>
      <p class="ih-info-title">此渠道公司周期结佣汇总</p>
      <div class="padding-left-20">
        <el-table
          class="ih-table"
          :data="info.paySummaryList"
          style="width: 100%"
          show-summary
        >
          <el-table-column
            label="周期名称"
            prop="cycleName"
          ></el-table-column>
          <el-table-column
            label="所属项目"
            prop="projectName"
          ></el-table-column>
          <el-table-column
            label="累计结佣次数"
            prop="num"
          ></el-table-column>
          <el-table-column
            label="历史累计发生金额"
            prop="historyTotalPayFees"
          ></el-table-column>
          <el-table-column
            label="历史累计扣除金额"
            prop="historyTotalPdeductFees"
          ></el-table-column>
          <el-table-column
            label="本期实际付款金额"
            prop="actualAmount"
          ></el-table-column>
          <el-table-column
            label="本期扣除金额"
            prop="deductAmount"
          ></el-table-column>
          <el-table-column
            label="累计发生金额（含本期）"
            prop="totalPayFees"
          ></el-table-column>
          <el-table-column
            label="累计扣除金额（含本期）"
            prop="totalPdeductFees"
          ></el-table-column>
        </el-table>
      </div>
      <br />
      <p class="ih-info-title">成本归属列表</p>
      <div class="padding-left-20">
        <el-table
          class="ih-table"
          :data="info.costApportionList"
          style="width: 100%"
          show-summary
        >
          <el-table-column
            label="周期名称"
            prop="cycleName"
          ></el-table-column>
          <el-table-column
            label="成本归属区域"
            prop="ownedAreaName"
          ></el-table-column>
          <el-table-column
            label="成本归属门店"
            prop="ownedStoreId"
          ></el-table-column>
          <el-table-column
            label="应承担总成本"
            prop="shouldTotalCost"
          ></el-table-column>
          <el-table-column
            label="累计已分摊成本金额"
            prop="totalApportionCost"
          ></el-table-column>
          <el-table-column
            label="未分摊成本金额"
            prop="unapportionCost"
          ></el-table-column>
          <el-table-column
            label="本次分摊成本金额（合计）"
            prop="thisApportionCost"
          ></el-table-column>
          <el-table-column
            label="本次分摊不含税金额"
            prop="thisApportionNoTaxCost"
          ></el-table-column>
          <el-table-column
            label="本次分摊税额"
            prop="thisApportionTax"
          ></el-table-column>
        </el-table>
      </div>
      <br />
      <p class="ih-info-title">结佣信息</p>
      <div class="margin-left-20">
        <table
          border="1"
          cellspacing="0"
          cellpadding="0"
          width="100%"
          height="100%"
        >
          <tr>
            <td
              height="50"
              width="200"
            >领取单位</td>
            <td width="200">{{info.agencyName}}</td>
            <td width="200">区域</td>
            <td width="200">{{info.area}}</td>
            <td width="200">项目</td>
            <td width="200">{{info.projectName}}</td>
          </tr>
          <tr>
            <td height="50">本期申请支付金额</td>
            <td>{{info.applyAmount}}</td>
            <td>不含税金额（实付）</td>
            <td>{{info.noTaxAmount}}</td>
            <td>税额（实付）</td>
            <td>{{info.tax}}</td>
          </tr>
          <tr>
            <td height="50">本期实际付款金额</td>
            <td>{{info.actualAmount}}</td>
            <td>本期扣除金额</td>
            <td>{{info.deductAmount}}</td>
            <td colspan="2">
              <el-button>查看</el-button>
            </td>
          </tr>
          <tr>
            <td height="50">累计付款金额</td>
            <td>{{info.totalPayFees}}</td>
            <td>累计扣除金额</td>
            <td>{{info.totalPdeductFees}}</td>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td
              colspan="6"
              height="50"
            >经办部门意见</td>
          </tr>
          <tr>
            <td colspan="6">
              <el-input
                type="textarea"
                style="box-sizing: border-box"
                :autosize="{ minRows: 5, maxRows: 10 }"
                placeholder="请输入内容"
                v-model="info.description"
              >
              </el-input>
            </td>
          </tr>
        </table>
      </div>
      <p class="ih-info-title">附件信息</p>
      <div class="padding-left-20">
        <el-table
          class="ih-table"
          :data="info.documentList"
          style="width: 100%"
        >
          <el-table-column
            prop="type"
            width="180"
            label="类型"
            align="center"
          >
            <template v-slot="{ row }">
              <div><span
                  style="color: red"
                  v-if="row.subType"
                >*</span>{{row.name}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="附件">
            <template v-slot="{ row }">
              <IhUpload
                :file-list.sync="row.fileList"
                :file-size="10"
                :file-type="row.code"
                size="100px"
                @newFileList="queryNew"
              ></IhUpload>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <br />
      <div class="bottom">
        <el-button
          @click="submit('Draft')"
          type="primary"
        >保存</el-button>
        <el-button
          @click="submit('WaitAuditByBranchHead')"
          type="primary"
        >提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </template>
    <ih-dialog :show="contactsDialogVisible">
      <Obligation
        :data="contactsData"
        @cancel="() => (contactsDialogVisible = false)"
        @finish=" (data) => contactsFinish(data)"
      />
    </ih-dialog>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { get_payApply_get__id } from "@/api/payoff/index";
import { get_channel_get__id } from "@/api/channel/index";
import { Form as ElForm } from "element-ui";
import Obligation from "./dialog/obligation.vue";

@Component({
  components: {
    Obligation,
  },
})
export default class PayoffEdit extends Vue {
  private fileList: Array<object> = [];
  info: any = {
    applyCode: null,
    status: null,
    agencyId: null,
    receiveAccount: null,
    invoiceType: null,
    taxRate: null,
    makerId: null,
    makerTime: null,
    payApplyDetailList: [{}],
    payDeductDetailList: [{}],
    costApportionList: [{}],
    documentList: [{}],
    paySummaryList: [{}],
  };
  channelAccountOptions: any = [];
  showTable: any = [];
  radio: any = null;
  radioList: any = [];
  fileListType: any = [];
  submitFile: any = {};
  contactsData: any = {};
  contactsIndex: any;
  contactsDialogVisible = false;

  private rules: any = {
    name: [{ required: true, message: "请填写名称", trigger: "change" }],
    creditCode: [
      { required: true, message: "请填写信用代码", trigger: "change" },
    ],
    shortName: [{ required: true, message: "请填写简称", trigger: "change" }],
    type: [{ required: true, message: "请选择类型", trigger: "change" }],
    setupTime: [
      { required: true, message: "请选择成立日期", trigger: "change" },
    ],
    capital: [{ required: true, message: "请填写注册资本", trigger: "change" }],
    address: [{ required: true, message: "请填写住所", trigger: "change" }],
    legalPerson: [
      { required: true, message: "请填法定代表人", trigger: "change" },
    ],
  };

  @Watch("info.payApplyDetailList")
  getPayApplyDetailList(val: any) {
    let obj: any = {};
    let arr: any = val.map((v: any) => ({
      label: v.cycleName,
      value: v.cycleId,
    }));
    this.radioList = arr.reduce((preVal: any, curVal: any) => {
      obj[curVal.value] ? "" : (obj[curVal.value] = preVal.push(curVal));
      return preVal;
    }, []);
    this.radio = this.radioList[0].value;
    this.showTable = this.info.payApplyDetailList.filter(
      (v: any) => v.cycleId === this.radio
    );
  }

  searchOpen = true;
  private get payoffId() {
    return this.$route.query.id;
  }

  radioChange(val: any) {
    this.showTable = this.info.payApplyDetailList.filter(
      (v: any) => v.cycleId === val
    );
  }

  cancel() {
    this.$router.push("/payoff/list");
  }

  async created() {
    this.getInfo();
  }
  async getInfo() {
    if (this.payoffId) {
      const res = await get_payApply_get__id({ id: this.payoffId });
      this.info = { ...res };
      this.getFileListType(res.documentList);
      this.getChannelInfo({
        id: res.agencyId,
        name: res.agencyName,
      });
      // 假数据
      // this.info.payApplyDetailList = [
      //   {
      //     cycleId: 1,
      //     cycleName: "皮小强1",
      //   },
      //   {
      //     cycleId: 2,
      //     cycleName: "皮小强2",
      //   },
      //   {
      //     cycleId: 3,
      //     cycleName: "皮小强3",
      //   },
      //   {
      //     cycleId: 4,
      //     cycleName: "皮小强4",
      //   },
      //   {
      //     cycleId: 5,
      //     cycleName: "皮小强5",
      //   },
      //   {
      //     cycleId: 6,
      //     cycleName: "皮小强6",
      //   },
      //   {
      //     cycleId: 1,
      //     cycleName: "皮小强1",
      //   },
      // ];
    } else {
      this.getFileListType([]);
    }
  }

  getFileListType(data: any) {
    const list = (this.$root as any).dictAllList("PayoffFileType");
    this.fileListType = list.map((v: any) => {
      return {
        ...v,
        fileList: data
          .filter((j: any) => j.type === v.code)
          .map((h: any) => ({
            ...h,
            name: h.fileName,
          })),
      };
    });
    let obj: any = {};
    this.fileListType.forEach((h: any) => {
      obj[h.code] = h.fileList;
    });
    this.submitFile = { ...obj };
  }

  queryNew(data: any, type?: any) {
    let obj: any = {};
    obj[type] = data;
    this.submitFile = { ...this.submitFile, ...obj };
  }

  // 合计
  getSummaries(param: any) {
    console.log(param);
    const { columns, data } = param;
    let sums: any = [];
    columns.forEach((column: any, index: number) => {
      if (index === 0) {
        sums[index] = "合计";
        return;
      }
      const values = data.map((item: any) => Number(item[column.property]));
      if (!values.every((value: any) => isNaN(value))) {
        sums[index] = values.reduce((prev: number, curr: number) => {
          const value = Number(curr);
          if (!isNaN(value)) {
            return prev + curr;
          } else {
            return prev;
          }
        }, 0);
      } else {
        sums[index] = "--";
      }
    });
    return sums;
  }

  addContacts() {
    if (this.info.agencyId) {
      this.contactsDialogVisible = true;
      this.contactsData.agencyId = this.info.agencyId;
    } else {
      this.$message.warning("请选择渠道商");
    }
  }

  async delContacts(index: number) {
    try {
      await this.$confirm("是否确定移除?", "提示");
      this.info.contactList.splice(index, 1);
      this.$message({
        type: "success",
        message: "移除成功!",
      });
    } catch (err) {
      console.log(err);
    }
  }

  contactsFinish(data: any) {
    console.log(data);
    // this.info.contactList.push(data);
    // this.$set(this.info.contactList, this.contactsIndex, data);
  }

  async getChannelInfo(item: any) {
    let res = await get_channel_get__id({ id: item.id });
    this.channelAccountOptions = res.channelBanks;
    this.info.receiveAccount = "";
  }

  submit(val: string) {
    (this.$refs["form"] as ElForm).validate(async (v: any) => {
      if (v) {
        this.info.status = val;
        // 校验提示
        let arr: any = [];
        Object.values(this.submitFile).forEach((v: any) => {
          if (v.length) {
            arr = arr.concat(v);
          }
        });
        // 以下操作仅仅是为了校验必上传项
        let submitList: any = this.fileListType.map((v: any) => {
          return {
            ...v,
            fileList: arr
              .filter((j: any) => j.type === v.code)
              .map((h: any) => ({
                ...h,
                name: h.fileName,
              })),
          };
        });
        let isSubmit = true;
        let msgList: any = [];
        submitList.forEach((v: any) => {
          if (v.subType && !v.fileList.length) {
            msgList.push(v.name);
            isSubmit = false;
          }
        });
        if (isSubmit) {
          this.info.attachmentList = arr.map((v: any) => ({
            fileId: v.fileId,
            fileName: v.name,
            type: v.type,
          }));
        } else {
          this.$message({
            type: "warning",
            message: `${msgList.join(",")}项,请上传附件`,
          });
          return;
        }
        switch (this.$route.name) {
          case "developerAdd":
            // await post_company_add(this.info);
            break;
          case "developerEdit":
            // await post_company_updateDraft(this.info);
            break;
          case "developerChange":
            // await post_company_update(this.info);
            break;
        }
        this.$goto({ path: `/developers/list` });
        this.$message({
          type: "success",
          message: val === "Draft" ? "保存成功!" : "提交成功!",
        });
      }
    });
  }
}
</script>
<style lang="scss" scoped>
.content {
  position: relative;
  /deep/ .el-button {
    position: absolute;
    top: -10px;
    right: 0;
  }
}
.bottom {
  margin-top: 30px;
  text-align: center;
}
.zhouqi {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.text-ellipsis {
  width: 100%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>