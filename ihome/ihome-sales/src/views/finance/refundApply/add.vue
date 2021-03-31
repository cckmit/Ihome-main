<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2021-02-06 16:29:34
 * @LastEditors: wwq
 * @LastEditTime: 2021-03-31 12:01:42
-->
<template>
  <IhPage>
    <template v-slot:form>
      <p class="ih-info-title">退款申请单信息</p>
      <el-form
        ref="form"
        label-width="120px"
        :model="info"
        :rules="rules"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="退款申请单编号">
              <el-input
                disabled
                v-model="info.refundApplyNo"
                placeholder="保存后生成"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="制单人">
              <el-input
                disabled
                v-model="info.inputUserName"
                placeholder="制单人"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="制单日期">
              <el-input
                disabled
                v-model="info.createDate"
                placeholder="制单日期"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="事业部"
              prop="orgId"
            >
              <el-select
                v-model="info.orgId"
                clearable
                placeholder="请选择事业部"
                class="width--100"
                @change="computedDisabled = false;isAgainComputed = false"
              >
                <el-option
                  v-for="item in divisionOptins"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="付款方账户名称"
              prop="companyId"
            >
              <el-select
                v-model="info.companyId"
                clearable
                placeholder="付款方账户名称"
                class="width--100"
                @change="companyChange"
              >
                <el-option
                  v-for="item in accountOptins"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="付款方账户账号"
              prop="accountNo"
            >
              <el-select
                v-model="info.accountNo"
                clearable
                placeholder="请选择付款方账户账号"
                class="width--100"
                @change="accountNoChange($event, 'clear')"
              >
                <el-option
                  v-for="item in payerAccountOptions"
                  :key="item.id"
                  :label="item.accountNo"
                  :value="item.accountNo"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="付款方开户行">
              <el-input
                disabled
                v-model="info.branchName"
                placeholder="付款方开户行"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联行号">
              <el-input
                disabled
                v-model="info.branchNo"
                placeholder="联行号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="当前状态">
              <el-select
                style="width: 100%"
                v-model="info.status"
                disabled
                placeholder="请选择"
              >
                <el-option
                  v-for="item in $root.dictAllList('FinRefundApplyStatus')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="结算方式"
              prop="settlementType"
            >
              <el-select
                style="width: 100%"
                v-model="info.settlementType"
                disabled
                placeholder="请选择结算方式"
              >
                <el-option
                  v-for="item in $root.dictAllList('RefundSettlementType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="付款方式"
              prop="payType"
            >
              <el-select
                style="width: 100%"
                v-model="info.payType"
                disabled
                placeholder="请选择付款方式"
              >
                <el-option
                  v-for="item in $root.dictAllList('RefundPayType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template v-slot:table>
      <div class="content">
        <p class="ih-info-title">待退款列表</p>
        <el-button
          @click="addContacts()"
          type="success"
          size="small"
        >添加待退款项</el-button>
      </div>
      <div class="padding-left-20">
        <el-table
          class="ih-table"
          :data="info.refundItems"
          style="width: 100%"
          show-summary
          :summary-method="getSummaries"
        >
          <el-table-column
            type="index"
            width="50"
            label="序号"
            align="center"
          ></el-table-column>
          <el-table-column
            label="退款项编号"
            prop="refundNo"
            width="150"
          ></el-table-column>
          <el-table-column
            label="项目名称"
            prop="projectName"
            width="120"
          >
            <template v-slot="{ row }">
              <el-link
                type="primary"
                @click="routeTo(row, 'project')"
              >{{row.projectName}}</el-link>
            </template>
          </el-table-column>
          <el-table-column
            label="优惠告知书收款金额"
            prop="noticeAmount"
            width="100"
          >
            <template v-slot="{ row }">
              <el-link
                v-if="row.noticeAmount"
                type="primary"
                @click="routeTo(row, 'notification')"
              >{{row.noticeAmount}}</el-link>
              <span v-else>0.00</span>
            </template>
          </el-table-column>
          <el-table-column
            label="本次申请退款金额"
            prop="amount"
            width="100"
          >
            <template v-slot="{ row }">
              <span>{{row.amount ? row.amount : 0.00}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="退款人信息"
            width="250"
          >
            <template v-slot="{ row }">
              <template v-if="row.refundName && row.refundAccount && row.refundBankName">
                <div
                  class="text-ellipsis"
                  :title="row.refundName"
                >收款姓名: {{row.refundName}}
                </div>
                <div
                  class="text-ellipsis"
                  :title="row.refundAccount"
                >收款帐号: {{row.refundAccount}}</div>
                <div
                  class="text-ellipsis"
                  :title="row.refundBankName"
                >收款开户行: {{row.refundBankName}}</div>
              </template>
              <template v-else>——</template>
            </template>
          </el-table-column>
          <el-table-column
            label="成交信息"
            width="250"
          >
            <template v-slot="{ row }">
              <template v-if="row.dealCustomerName && row.dealNo && row.dealCompany">
                <div
                  class="text-ellipsis"
                  :title="row.dealCustomerName"
                >客户姓名: {{row.dealCustomerName}}
                </div>
                <div
                  class="text-ellipsis"
                  :title="row.dealNo"
                >成交报告编号: <el-link
                    type="primary"
                    @click="routeTo(row, 'deal')"
                  >{{row.dealNo}}</el-link>
                </div>
                <div
                  class="text-ellipsis"
                  :title="row.dealCompany"
                >成交单位: {{row.dealCompany}}
                </div>
              </template>
              <template v-else>——</template>
            </template>
          </el-table-column>
          <el-table-column
            label="合同类型"
            prop="contType"
          >
            <template v-slot="{ row }">
              <span>{{row.contType ? $root.dictAllName(row.contType, 'ContType')  : '——'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="服务费情况"
            width="150"
          >
            <template v-slot="{ row }">
              <div>应收: {{row.receivableAmount ? row.receivableAmount : 0.00}}</div>
              <div>实收: {{row.actualAmount ? row.actualAmount : 0.00}}</div>
              <div>未收: {{row.uncollectedAmount ? row.uncollectedAmount : 0.00}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="业绩确认时间"
            prop="confirmationTime"
            width="150"
          >
            <template v-slot="{ row }">
              <span>{{row.confirmationTime ? row.confirmationTime : '——'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="已付对外拆佣"
            prop="commission"
            width="120"
          >
            <template v-slot="{ row }">
              <span>{{row.commission ? row.commission : 0.00}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="已结佣付款单号"
            prop="payNo"
            width="120"
          >
            <template v-slot="{ row }">
              <template v-if="row.payVOs.length">
                <template v-for="(item, i) in row.payVOs">
                  <span :key="i">
                    <el-link
                      type="primary"
                      @click="routeTo(item, 'payNo')"
                    >
                      {{item.payNo}}
                    </el-link>
                    <span v-if="i !== row.payVOs.length - 1">; </span>
                  </span>
                </template>
              </template>
              <span v-else>——</span>
            </template>
          </el-table-column>
          <el-table-column
            label="发票业务单号"
            prop="invoiceNo"
            width="120"
          >
            <template v-slot="{ row }">
              <el-link
                v-if="row.invoiceNo"
                type="primary"
                @click="routeTo(row, 'invoiceNo')"
              >{{row.invoiceNo}}</el-link>
              <span v-else>——</span>
            </template>
          </el-table-column>
          <el-table-column
            label="退款附件"
            width="100"
            fixed="right"
            align="center"
          >
            <template v-slot="{ row, $index }">
              <el-link
                v-if="!row.attachmentComplete"
                type="warning"
                @click="showUploadList(row, $index)"
              >待补充</el-link>
              <el-link
                v-else
                type="primary"
                @click="showUploadList(row, $index)"
              >附件已提供</el-link>
            </template>
          </el-table-column>
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
      <div style="width:100%;padding-left: 20px;box-sizing: border-box">
        <el-button
          style="width: 100%;"
          type="primary"
          :loading="computedLoading"
          :disabled="computedDisabled"
          @click="computedMsg"
        >点击计算退款统计数据并生成退款汇总清单</el-button>
      </div>
      <br />
      <p class="ih-info-title">退款汇总清单</p>
      <div class="padding-left-20">
        <el-table
          class="ih-table"
          :data="info.countVOs"
          style="width: 100%"
          show-summary
        >
          <el-table-column
            label="项目名称"
            prop="proName"
            width="150"
          >
          </el-table-column>
          <el-table-column
            label="退款笔数"
            prop="total"
          >
            <template v-slot="{ row }">
              <span>{{row.total ? row.total : 0.00}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="历史已退款金额"
            prop="totalRefundedAmount"
          >
            <template v-slot="{ row }">
              <span>{{row.totalRefundedAmount ? row.totalRefundedAmount : 0.00}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="本期退款金额"
            prop="refundAmount"
          >
            <template v-slot="{ row }">
              <span>{{row.refundAmount ? row.refundAmount : 0.00}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="累计退款金额"
            prop="totalAmount"
          >
            <template v-slot="{ row }">
              <span>{{row.totalAmount ? row.totalAmount : 0.00}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <br />
      <p class="ih-info-title">退款信息</p>
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
            >退款申请人</td>
            <td>{{info.refundInfo.refundItemUser}}</td>
            <td width="200">业务类型</td>
            <td width="200">{{`新房/产成品`}}</td>
          </tr>
          <tr>
            <td
              width="200"
              height="50"
            >收款人（退款人）</td>
            <td width="200">{{info.refundInfo.refundName}}</td>
            <td width="200">收款方开户方及银行账号</td>
            <td width="200">{{info.refundInfo.refundAccount}}</td>
          </tr>
          <tr>
            <td height="50">付款方（我司）</td>
            <td colspan="5">{{info.refundInfo.accountName}}</td>
          </tr>
          <tr>
            <td height="50">付款方开户行</td>
            <td>{{info.refundInfo.branchName}}</td>
            <td>付款银行账号</td>
            <td>{{info.refundInfo.accountNo}}</td>
          </tr>
          <tr>
            <td height="50">合同成交单位</td>
            <td colspan="5">{{info.refundInfo.transactionUnit}}</td>
          </tr>
          <tr>
            <td height="50">原收款金额</td>
            <td>{{info.refundInfo.contAmount}}</td>
            <td>本次申请退款金额</td>
            <td>
              <div>{{info.refundInfo.capitalizedAmount}}</div>
              <div>{{info.refundInfo.lowercaseAmount}}</div>
            </td>
          </tr>
          <tr>
            <td colspan="6">
              <div class="text-left padding-left-15">经办部门意见：</div>
              <el-input
                class="inputClass"
                type="textarea"
                style="box-sizing: border-box"
                :autosize="{ minRows: 5, maxRows: 10 }"
                placeholder="请输入内容"
                v-model="info.applyReason"
                maxlength="500"
                show-word-limit
              >
              </el-input>
            </td>
          </tr>
        </table>
      </div>
      <br />
      <p class="ih-info-title">上传附件</p>
      <div class="padding-left-20">
        <el-table
          class="ih-table"
          :data="fileListType"
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
                v-model="row.fileList"
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
          @click="submit(0)"
          type="primary"
        >保存</el-button>
        <el-button
          @click="submit(1)"
          type="success"
        >提交</el-button>
        <el-button @click="cancel">返回</el-button>
      </div>
    </template>
    <ih-dialog :show="addFefundDialogVisible">
      <AddFefund
        :data="fefundData"
        @cancel="() => (addFefundDialogVisible = false)"
        @finish=" (data) => addFefundFinish(data)"
      />
    </ih-dialog>
    <ih-dialog :show="uploadDialogVisible">
      <UploadList
        :data="uploadData"
        @cancel="() => (uploadDialogVisible = false)"
        @finish=" (data) => uploadFinish(data)"
      />
    </ih-dialog>
  </IhPage>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import {
  get_refundApply_get__id,
  post_refundApply_collect,
  post_refundApply_add,
  post_refundApply_update,
  get_invoice_getInvoiceId__businessNo,
} from "@/api/finance/index";
import { post_bankAccount_getByOrgId__orgId } from "@/api/finance/index";
import {
  get_org_getUserDepartmentList,
  post_company_getAll,
} from "@/api/system/index";
import { Form as ElForm } from "element-ui";
import AddFefund from "./dialog/addFefund.vue";
import UploadList from "./dialog/uploadList.vue";

@Component({
  components: {
    AddFefund,
    UploadList,
  },
})
export default class RefundApplyEdit extends Vue {
  private fileList: Array<object> = [];
  info: any = {
    refundApplyNo: null,
    inputUser: null,
    inputUserName: null,
    createDate: null,
    orgId: null,
    accountId: null,
    accountName: null,
    companyId: null,
    accountNo: null,
    branchName: null,
    branchNo: null,
    status: null,
    settlementType: null,
    payType: null,
    refundItems: [], // 待退款列表
    countVOs: [], //退款汇总清单
    refundAttachments: [], //退款申请附件
    refundInfo: {},
  };
  submitFile: any = {};
  fileListType: any = [];
  fefundData: any = {};
  uploadData: any = {};
  addFefundDialogVisible = false;
  computedDisabled = false;
  uploadDialogVisible = false;
  divisionOptins: any = [];
  accountOptins: any = [];
  payerAccountOptions: any = [];

  private rules: any = {
    orgId: [
      {
        required: true,
        message: "请选择事业部",
        trigger: "change",
      },
    ],
    companyId: [
      {
        required: true,
        message: "请选择付款方账户名称",
        trigger: "change",
      },
    ],
    accountNo: [
      {
        required: true,
        message: "请选择付款方账户账号",
        trigger: "change",
      },
    ],
  };

  computedLoading: any = false;
  showUploadIndex: any = 0;
  isAgainComputed: any = true;
  checkSet: any = new Set();
  checkSetNotice: any = new Set();

  @Watch("info.orgId", { deep: true })
  getAccountOptins(val: any) {
    if (val) {
      this.getAccount(val);
    } else {
      this.info.companyId = null;
      this.info.accountId = null;
      this.info.accountName = null;
      this.info.accountNo = null;
      this.info.branchName = null;
      this.info.branchNo = null;
      this.payerAccountOptions = [];
      this.accountOptins = [];
    }
  }

  @Watch("info.companyId", { deep: true })
  getPayerAccountOptions(val: any) {
    if (val) {
      this.getPayerInfo(val);
    } else {
      this.info.accountName = null;
      this.info.accountId = null;
      this.info.accountNo = null;
      this.info.branchName = null;
      this.info.branchNo = null;
      this.payerAccountOptions = [];
    }
  }

  async routeTo(row: any, where: any) {
    let router: any = null;
    let res: any = null;
    switch (where) {
      case "deal":
        router = this.$router.resolve({
          path: `/dealReport/info`,
          query: {
            id: row.dealId,
            type: "ID",
          },
        });
        break;
      case "project":
        router = this.$router.resolve({
          path: `/projects/childInfo`,
          query: {
            id: row.proId,
          },
        });
        break;
      case "notification":
        router = this.$router.resolve({
          path: `/payment/list?businessId=${row.businessId}`,
        });
        break;
      case "payNo":
        router = this.$router.resolve({
          path: `/payoff/info`,
          query: {
            id: row.payId,
          },
        });
        break;
      case "invoiceNo":
        res = await get_invoice_getInvoiceId__businessNo({
          businessNo: row.invoiceNo,
        });
        router = this.$router.resolve({
          path: `/invoice/info`,
          query: {
            id: res,
          },
        });
        break;
    }
    window.open(router.href, "_blank");
  }

  searchOpen = true;
  private get returnId() {
    return this.$route.query.id;
  }

  showUploadList(data: any, index: number) {
    this.uploadData = {
      data: data.attachmentVOs,
      type: "edit",
    };
    this.showUploadIndex = index;
    this.uploadDialogVisible = true;
  }

  uploadFinish(data: any) {
    let arr: any = [];
    Object.values(data.submitFile).forEach((v: any) => {
      if (v.length) {
        arr = arr.concat(v);
      }
    });
    // 以下操作仅仅是为了校验必上传项
    let submitList: any = data.fileListType.map((v: any) => {
      return {
        ...v,
        fileList: arr.filter((j: any) => j.type === v.code),
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
    this.info.refundItems[this.showUploadIndex].attachmentVOs = arr.map(
      (v: any) => ({
        fileId: v.fileId,
        fileName: v.fileName,
        type: v.type,
      })
    );
    if (isSubmit) {
      this.info.refundItems[this.showUploadIndex].attachmentComplete = 1;
    } else {
      this.info.refundItems[this.showUploadIndex].attachmentComplete = 0;
    }
    this.uploadDialogVisible = false;
  }

  cancel() {
    this.$router.push("/refundApply/list");
  }

  async created() {
    this.getInfo();
    this.getDivision();
  }
  async getInfo() {
    if (this.returnId) {
      const res = await get_refundApply_get__id({ id: this.returnId });
      this.info = {
        ...res,
      };
      // 获取付款方账号
      const item = await post_bankAccount_getByOrgId__orgId({
        orgId: this.info.accountId,
      });
      this.payerAccountOptions = item;
      this.getFileListType(res.refundAttachments);
    } else {
      this.info.inputUserName = (this.$root as any).userInfo.name;
      this.info.inputUser = (this.$root as any).userInfo.id;
      this.info.createDate = (this.$tool as any).todayStr();
      this.info.status = "Draft";
      this.info.settlementType = "CentralizedPay";
      this.info.payType = "CashPay";
      this.getFileListType([]);
    }
  }

  // 获取事业部
  async getDivision() {
    let res = await get_org_getUserDepartmentList({
      orgType: "Department",
      status: "Valid",
    });
    if (res.length === 1) {
      this.info.orgId = res[0].id;
    }
    this.divisionOptins = res;
  }

  // 获取付款方
  async getAccount(orgId: any) {
    let res = await post_company_getAll({
      orgId,
    });
    if (res.length === 1) {
      this.info.companyId = res[0].id;
      this.info.accountName = res[0].name;
    }
    this.accountOptins = res;
  }

  companyChange(val: any) {
    this.computedDisabled = false;
    this.isAgainComputed = false;
    if (val) {
      const item = this.accountOptins.find((v: any) => v.id === val);
      this.info.companyId = item.id;
      this.info.accountName = item.name;
    }
  }

  // 获取付款账号
  async getPayerInfo(val: any) {
    const res = await post_bankAccount_getByOrgId__orgId({
      orgId: val,
    });
    this.payerAccountOptions = res;
    if (res.length === 1) {
      this.info.accountNo = res[0].accountNo;
      this.info.accountId = res[0].id;
      this.accountNoChange(res[0].accountNo, "");
    }
  }

  accountNoChange(data: any, type: any) {
    if (type) {
      this.isAgainComputed = false;
      this.computedDisabled = false;
    }
    if (data) {
      const item = this.payerAccountOptions.find(
        (v: any) => v.accountNo === data
      );
      this.info.branchName = item.branchName;
      this.info.branchNo = item.branchNo;
      this.info.accountId = item.id;
    } else {
      this.info.branchName = null;
      this.info.branchNo = null;
    }
  }

  private getSummaries({ columns, data }: any) {
    const sums: any = [];
    columns.forEach((column: any, index: number) => {
      if (index === 0) {
        sums[index] = "合计";
        return;
      }
      if (index === 3) {
        let amount = 0;
        data.forEach((i: any) => {
          if (!this.checkSetNotice.has(i.dealNo)) {
            amount += i.noticeAmount;
            this.checkSetNotice.add(i.dealNo);
          }
        });
        sums[index] = amount;
      } else if (index === 4) {
        let amount = 0;
        data.forEach((i: any) => {
          amount += i.amount;
        });
        sums[index] = amount;
      } else if (index === 8) {
        let receivableAmount = 0,
          actualAmount = 0,
          uncollectedAmount = 0;
        data.forEach((i: any) => {
          receivableAmount += i.receivableAmount;
          uncollectedAmount += i.uncollectedAmount;
          if (!this.checkSet.has(i.dealNo)) {
            actualAmount += i.actualAmount;
            this.checkSet.add(i.dealNo);
          }
        });
        sums[index] = `应收: ${this.$math.tofixed(receivableAmount, 2)} \n
          实收: ${this.$math.tofixed(actualAmount, 2)} 
          未收: ${this.$math.tofixed(uncollectedAmount, 2)} 
          `;
      } else if (index === 10) {
        let amount = 0;
        data.forEach((i: any) => {
          amount += i.commission;
        });
        sums[index] = amount;
      } else {
        sums[index] = "-";
      }
    });
    return sums;
  }

  getFileListType(data: any) {
    const list = (this.$root as any).dictAllList("RefundApplyAttachment");
    this.fileListType = list.map((v: any) => {
      return {
        ...v,
        fileList: data.filter((j: any) => j.type === v.code),
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

  // 计算
  async computedMsg() {
    if (!this.info.refundItems.length) {
      this.$message.warning("待退款列表不能为空");
      return;
    }
    let obj: any = {};
    let noticeSum: any = 0;
    let amountSum: any = 0;
    obj.accountNo = this.info.accountNo;
    obj.branchName = this.info.branchName;
    obj.collectParamVOs = this.info.refundItems.map((v: any) => ({
      proId: v.proId,
      proName: v.projectName,
      refundAmount: v.amount,
      refundApplyNo: v.refundNo,
    }));
    let set = new Set();
    this.info.refundItems.forEach((v: any) => {
      if (!set.has(v.dealNo)) {
        noticeSum += v.noticeAmount;
        set.add(v.dealNo);
      }
      amountSum += v.amount;
    });
    obj.amount = amountSum;
    obj.contAmount = noticeSum;
    obj.payName = this.info.refundItems[0]?.refundName;
    obj.payer = this.info.accountName;
    try {
      this.computedLoading = true;
      const res: any = await post_refundApply_collect(obj);
      this.computedDisabled = true;
      this.$message.success("操作成功，已展示最新数据");
      this.computedLoading = false;
      this.info.countVOs = res.countVOs;
      this.info.refundInfo = { ...res.refundInfo };
      this.isAgainComputed = true;
    } catch (err) {
      this.computedLoading = false;
    }
  }

  addContacts() {
    this.addFefundDialogVisible = true;
    this.fefundData = {
      hasCheckedData: this.info.refundItems,
    };
  }

  async delContacts(index: number) {
    this.info.refundItems.splice(index, 1);
    this.computedDisabled = false;
    this.isAgainComputed = false;
    this.$message.success("点击计算退款统计数据并生成退款汇总清单");
    this.checkSetNotice = new Set();
    this.checkSet = new Set();
  }

  addFefundFinish(data: any) {
    this.info.refundItems = data;
    this.addFefundDialogVisible = false;
    this.computedDisabled = false;
    this.isAgainComputed = false;
    this.$message.success("点击计算退款统计数据并生成退款汇总清单");
    this.checkSetNotice = new Set();
    this.checkSet = new Set();
  }

  submit(val: any) {
    if (this.isAgainComputed) {
      (this.$refs["form"] as ElForm).validate(async (j: any) => {
        if (j) {
          let obj: any = {};
          obj = { ...this.info };
          delete obj.refundItems;
          delete obj.refundAttachments;
          obj.itemAttachmentVOs = this.info.refundItems.map((v: any) => ({
            attachmentVOs: v.attachmentVOs,
            itemID: v.id,
            attachmentComplete: v.attachmentComplete,
          }));
          obj.buttonType = val;
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
              fileList: arr.filter((j: any) => j.type === v.code),
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
            obj.approvalForms = arr.map((v: any) => ({
              fileId: v.fileId,
              fileName: v.fileName,
              type: v.fileType,
            }));
          } else {
            this.$message({
              type: "warning",
              message: `${msgList.join(",")}项,请上传附件`,
            });
            return;
          }
          if (!this.returnId) {
            try {
              await post_refundApply_add(obj);
              this.$message({
                type: "success",
                message: `新增成功`,
              });
              this.$goto({ path: `/refundApply/list` });
            } catch (err) {
              console.log(err);
            }
          } else {
            try {
              obj.refundApplyNo = this.info.refundApplyNo;
              await post_refundApply_update(obj);
              this.$message({
                type: "success",
                message: `修改成功`,
              });
              this.$goto({ path: `/refundApply/list` });
            } catch (err) {
              console.log(err);
            }
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
      });
    } else {
      this.$message.warning("点击计算退款统计数据并生成退款汇总清单");
    }
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

.text-ellipsis {
  width: 100%;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.inputClass {
  /deep/ .el-textarea__inner,
  /deep/ .el-input__inner {
    border: none;
  }
}

.tableprefix {
  line-height: 40px;
  color: #000;
  /deep/ .el-input__prefix {
    left: 10px;
  }
}
</style>