<!--
 * @Description: 
 * @version: 
 * @Author: zyc
 * @Date: 2021-02-08 14:34:29
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-20 11:37:58
-->
<template>
  <IhPage>
    <template v-slot:info>
      <p class="ih-info-title">退款申请单信息</p>
      <el-form
        ref="form"
        label-width="120px"
        :model="info"
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
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="事业部"
              prop="orgId"
            >
              <IhSelectPageDivision
                disabled
                placeholder="事业部"
                v-model="info.orgId"
                :search-name="info.departmentName"
                @changeOption="(data) => {
                  info.departmentName = data.name;
                }"
              >
              </IhSelectPageDivision>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="付款方账户名称"
              prop="accountId"
            >
              <IhSelectPageByPayer
                disabled
                placeholder="付款方账户名称"
                v-model="info.accountId"
                :proId="info.orgId"
                :search-name="info.accountName"
              ></IhSelectPageByPayer>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="付款方账户账号"
              prop="accountNo"
            >
              <el-select
                v-model="info.accountNo"
                disabled
                placeholder="请选择付款方账户账号"
                class="width--100"
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
        </el-row>
        <el-row>
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
        </el-row>
        <el-row>
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
      <p class="ih-info-title">待退款列表</p>
      <div class="padding-left-20">
        <el-table
          class="ih-table"
          :data="info.refundItems"
          style="width: 100%"
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
                >收款姓名: {{row.dealCustomerName}}
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
            label="付款附件"
            width="100"
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
        </el-table>
        <br />
      </div>
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
        <br />
      </div>
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
            <td>{{info.refundInfo.amount}}</td>
          </tr>
          <tr>
            <td colspan="6">
              <div class="text-left padding-left-15">申请事由：</div>
              <el-input
                class="inputClass"
                type="textarea"
                style="box-sizing: border-box"
                :autosize="{ minRows: 5, maxRows: 10 }"
                placeholder="请输入内容"
                v-model="info.applyReason"
                maxlength="500"
                show-word-limit
                readonly
              >
              </el-input>
            </td>
          </tr>
        </table>
        <br />
      </div>
      <div class="content">
        <p class="ih-info-title">操作日志</p>
        <div class="right-button">
          <el-button
            slot="reference"
            type="success"
            size="small"
            icon="el-icon-search"
            @click="searchPerson"
          >查询当前代办人</el-button>
          <el-button
            @click="updateOA"
            type="success"
            size="small"
            icon="el-icon-refresh"
          >同步OA审核日志</el-button>
        </div>
      </div>
      <div class="padding-left-20">
        <el-table
          class="ih-table"
          :data="info.refundRecords"
          style="width: 100%"
        >
          <el-table-column
            label="操作"
            prop="operation"
          >
            <!-- <template v-slot="{ row }">
              {{$root.dictAllName(row.operation, 'FinRefundApplyStatus')}}
            </template> -->
          </el-table-column>
          <el-table-column
            label="操作后状态"
            prop="afterStatus"
          >
            <template v-slot="{ row }">
              {{$root.dictAllName(row.afterStatus, 'FinRefundApplyStatus')}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作人"
            prop="operatorUsername"
          ></el-table-column>
          <el-table-column
            label="岗位"
            prop="operatorDept"
          ></el-table-column>
          <el-table-column
            label="操作时间"
            prop="operateTime"
          ></el-table-column>
          <el-table-column
            label="处理结果"
            prop="result"
          >
            <!-- <template v-slot="{ row }">
              {{$root.dictAllName(row.result, 'PayoffProcessResult')}}
            </template> -->
          </el-table-column>
          <el-table-column
            label="系统"
            prop="systemType"
          >
            <template v-slot="{ row }">
              {{$root.dictAllName(row.systemType, 'PayoffSystem')}}
            </template>
          </el-table-column>
          <el-table-column
            label="审核意见"
            prop="remark"
          ></el-table-column>
        </el-table>
        <br />
      </div>
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
                :file-list.sync="row.fileList"
                :file-size="10"
                :file-type="row.code"
                size="100px"
                :removePermi="false"
                :upload-show="!!row.fileList.length"
                :limit="row.fileList.length"
              ></IhUpload>
            </template>
          </el-table-column>
        </el-table>
        <br />
      </div>
      <p class="ih-info-title">审核意见</p>
      <div class="padding-left-20">
        <el-input
          type="textarea"
          style="box-sizing: border-box;"
          placeholder="输入内容"
          v-model="remark"
          :autosize="{ minRows: 5, maxRows: 8 }"
          maxlength="500"
          show-word-limit
        ></el-input>
      </div>
      <br />
      <div class="text-center">
        <el-button
          type="primary"
          @click="submit('TemporaryStorage')"
        >暂存</el-button>
        <el-button
          type="danger"
          @click="submit('Reject')"
        >驳回</el-button>
        <el-button
          type="success"
          @click="submit('Through')"
        >通过</el-button>
        <el-button @click="$router.go(-1)">返回</el-button>
      </div>
    </template>
    <IhDialog :show="uploadDialogVisible">
      <UploadList
        :data="uploadData"
        @cancel="() => (uploadDialogVisible = false)"
      />
    </IhDialog>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UploadList from "../refundApply/dialog/uploadList.vue";
import {
  get_refundApply_get__id,
  post_refundApply_queryOaApprovalUser__id,
  post_refundApply_getFlowCommentList__id,
  post_bankAccount_getByOrgId__orgId,
  post_refundApply_notFinancialAudit,
  get_invoice_getInvoiceId__businessNo,
} from "@/api/finance/index";

@Component({
  components: { UploadList },
})
export default class RefundToExamineToExamine extends Vue {
  info: any = {
    refundApplyNo: null,
    inputUser: null,
    inputUserName: null,
    createDate: null,
    orgId: null,
    departmentName: null,
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
  uploadData: any = {};
  uploadDialogVisible = false;
  payerAccountOptions: any = [];
  showUploadIndex: any = 0;
  remark: any = null;

  private get returnId() {
    return this.$route.query.id;
  }

  routeTo(row: any, where: any) {
    let router: any = null;
    switch (where) {
      case "deal":
        router = this.$router.resolve({
          path: `/dealReport/info`,
          query: {
            id: row.dealCode,
            type: "CODE",
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
        window.sessionStorage.setItem("businessId", row.businessId);
        router = this.$router.resolve({
          path: `/payment/list`,
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
        get_invoice_getInvoiceId__businessNo({
          businessNo: row.invoiceNo,
        }).then((res: any) => {
          router = this.$router.resolve({
            path: `/invoice/info`,
            query: {
              id: res,
            },
          });
        });
        break;
    }
    window.open(router.href, "_blank");
  }
  async submit(buttonType: any) {
    if (["TemporaryStorage", "Reject"].includes(buttonType) && !this.remark) {
      this.$message.warning("审核意见不能为空");
      return;
    }
    let typeStr = "";
    switch (buttonType) {
      case "TemporaryStorage":
        typeStr = "暂存";
        break;
      case "Through":
        typeStr = "通过";
        break;
      case "Reject":
        typeStr = "驳回";
        break;
    }
    try {
      await post_refundApply_notFinancialAudit({
        buttonType,
        id: this.returnId,
        remark: this.remark,
        status: this.info.status,
      });
      this.$message.success(`${typeStr}成功`);
      this.$goto({
        path: "/refundToExamine/list",
      });
    } catch (error) {
      console.log(error);
    }
  }
  showUploadList(data: any, index: number) {
    this.uploadData = {
      data: data.attachmentVOs,
      type: "view",
    };
    this.showUploadIndex = index;
    this.uploadDialogVisible = true;
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
  getFileListType(data: any) {
    const list = (this.$root as any).dictAllList("RefundApplyAttachment");
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
  async searchPerson() {
    const res: any = await post_refundApply_queryOaApprovalUser__id({
      id: this.returnId,
    });
    this.$alert(res, "当前待办人", {
      confirmButtonText: "确定",
    });
  }
  async updateOA() {
    const res = await post_refundApply_getFlowCommentList__id({
      id: this.returnId,
    });
    this.info.refundRecords = res;
  }

  created() {
    this.getInfo();
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
</style>