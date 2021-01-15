<!--
 * @Description: 查看请佣详情
 * @version: 
 * @Author: ywl
 * @Date: 2021-01-15 15:29:09
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-15 15:31:17
-->
<template>
  <IhPage class="text-left">
    <template #info>
      <p class="ih-info-title">请款申请单信息</p>
      <el-form
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="请款申请单号">
              <el-input
                :value="form.applyNo"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目名称">
              <el-input
                :value="form.proName"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="甲方公司">
              <el-input
                :value="form.developName"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款公司">
              <IhSelectPageByCompany
                v-model="form.polyCompanyId"
                placeholder="请选择收款公司"
                clearable
                disabled
              ></IhSelectPageByCompany>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款账号">
              <el-select
                class="width--100"
                v-model="form.receAccountId"
                disabled
              ></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开票税率">
              <el-input
                v-model="form.taxRate"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请人">
              <el-input
                v-model="form.applyUserName"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请日期">
              <el-input
                v-model="form.applyTime"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <p class="ih-info-title">待请款列表</p>
      <div class="padding-left-20">
        <el-table
          style="width: 100%"
          :data="dealList"
          class="deal-table"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            prop="dealCode"
            label="成交报告编号"
            min-width="170"
          ></el-table-column>
          <el-table-column
            label="成交单位"
            min-width="150"
          >
            <template v-slot="{ row }">
              <span>{{`${row.proName}-${row.buildingName}-${row.roomName}`}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="area"
            label="成交面积"
          ></el-table-column>
          <el-table-column label="合同类型">
            <template v-slot="{ row }">
              {{$root.dictAllName(row.contType, 'ContType')}}
            </template>
          </el-table-column>
          <el-table-column
            prop="subscribeDate"
            label="认购日期"
            width="125"
          ></el-table-column>
          <el-table-column
            prop="signDate"
            label="签约日期"
            width="125"
          ></el-table-column>
          <el-table-column
            label="提佣金额"
            min-width="200"
          >
            <template v-slot="{ row }">
              <div>
                <div>应提金额: {{row.receiveAmount}}</div>
                <div>已提金额: {{row.receivedAmount}}</div>
                <div>未提金额: {{row.noReceiveAmount}}</div>
                <div>已提未回款金额: {{row.noConfirmAmount}}</div>
                <div>系统计算本次可提金额: {{row.canApplyAmountNow}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="本次请款金额"
            width="150"
          >
            <template v-slot="{ row }">
              <el-input
                v-model="row.applyMoney"
                v-digits="2"
                disabled
              />
            </template>
          </el-table-column>
          <el-table-column
            label="本次扣除金额"
            width="150"
          >
            <template v-slot="{ row }">
              <el-input
                v-model="row.subMoney"
                v-digits="2"
                disabled
              />
            </template>
          </el-table-column>
          <el-table-column
            label="扣除项类别"
            width="150"
          >
            <template v-slot="{ row }">
              <el-input
                v-model="row.subType"
                disabled
              />
            </template>
          </el-table-column>
          <el-table-column
            label="本次实际请款金额"
            min-width="175"
          >
            <template v-slot="{ row }">
              <div>
                <div>不含税金额: {{row.noTaxMoney}}</div>
                <div>税额: {{row.taxMoney}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="客户姓名"
            prop="customerName"
            width="135"
          ></el-table-column>
          <el-table-column label="签约类型">
            <template v-slot="{ row }">
              {{$root.dictAllName(row.signType, 'SignUp')}}
            </template>
          </el-table-column>
          <el-table-column
            label="合同编号"
            prop="propertyNo"
          ></el-table-column>
          <el-table-column
            label="签约总价/元"
            width="135"
            prop="signPrice"
          ></el-table-column>
          <el-table-column
            label="中介公司"
            prop="channelName"
          ></el-table-column>
          <el-table-column
            label="是否已达到请佣条件"
            width="150"
          >
            <template v-slot="{ row }">
              {{row.isCanApply ? '是' : '否'}}
            </template>
          </el-table-column>
          <el-table-column
            label="代理公司"
            prop="oneAgentTeamName"
            width="150"
          >
            <template v-slot="{ row }">
              <el-input
                v-model="row.oneAgentTeamName"
                disabled
              />
            </template>
          </el-table-column>
          <el-table-column
            label="中介业务员"
            prop="channelAgentName"
            width="150"
          >
            <template v-slot="{ row }">
              <el-input
                v-model="row.channelAgentName"
                disabled
              />
            </template>
          </el-table-column>
          <el-table-column
            label="项目现场销售"
            prop="sceneSales"
            width="150"
          >
            <template v-slot="{ row }">
              <el-input
                v-model="row.sceneSales"
                disabled
              />
            </template>
          </el-table-column>
          <el-table-column
            label="备注"
            width="180"
          >
            <template v-slot="{ row }">
              <el-input
                v-model="row.remark"
                type="textarea"
                resize="none"
                disabled
                :rows="4"
              />
            </template>
          </el-table-column>
        </el-table>
        <table
          class="apply-table"
          style="width: 100%"
        >
          <tr>
            <th colspan="8">合计</th>
          </tr>
          <tr>
            <td class="width-150">本批未提金额</td>
            <td width="150">{{totalNoReceiveAmount}}</td>
            <td class="width-150">本批申请请款金额</td>
            <td width="150">{{totalApplyMoney}}</td>
            <td class="width-150">本批扣除金额</td>
            <td width="150">{{totalSubMoney}}</td>
            <td class="width-150">本批实际请款金额</td>
            <td width="150">{{totalApplyMoney - totalSubMoney}}</td>
          </tr>
        </table>
      </div>
      <p class="ih-info-title">甲方公司应扣除代理费明细</p>
      <div class="padding-left-20">
        <el-table
          style="width: 100%"
          :data="agencyList"
          show-summary
          :summary-method="getSummaries"
        >
          <el-table-column label="成交报告编号">
            <template v-slot="{ row }">
              {{ row.suppDealCode || row.dealCode }}
            </template>
          </el-table-column>
          <el-table-column
            label="项目名称"
            prop="proName"
          ></el-table-column>
          <el-table-column
            label="周期名称"
            prop="termName"
            min-width="180"
          ></el-table-column>
          <el-table-column label="抵扣项类别">
            <template v-slot="{ row }">
              {{ row.subType || $root.dictAllName(row.suppContType, 'SuppContType')}}
            </template>
          </el-table-column>
          <el-table-column
            label="扣除代理费"
            prop="subMoney"
          >
            <template v-slot="{ row }">
              {{-row.subMoney}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <p class="ih-info-title">项目周期请款汇总</p>
      <div class="padding-left-20">
        <el-table
          style="width: 100%"
          :data="termList"
          show-summary
        >
          <el-table-column
            label="周期名称"
            prop="termName"
            min-width="185"
          ></el-table-column>
          <el-table-column
            label="所属项目"
            prop="proName"
            min-width="165"
          ></el-table-column>
          <el-table-column
            label="累计请款次数"
            min-width="115"
            prop="hisSumApplyNum"
          ></el-table-column>
          <el-table-column
            label="历史已申请请款金额（含税）"
            min-width="205"
            prop="hisSumApplyMoney"
          ></el-table-column>
          <el-table-column
            label="累计扣除金额（含税）"
            min-width="180"
            prop="hisSumSubMoney"
          ></el-table-column>
          <el-table-column
            label="历史实际请款金额（含税）"
            min-width="205"
            prop="hisSumActMoney"
          ></el-table-column>
          <el-table-column
            label="已回款金额（含税）"
            min-width="180"
            prop="hisSumReceMoney"
          ></el-table-column>
          <el-table-column
            label="本次实际请款金额（含税）"
            min-width="205"
            prop="actMoney"
          ></el-table-column>
          <el-table-column
            label="累计实际请款金额（含税）"
            min-width="205"
            prop="sumActMoney"
          ></el-table-column>
        </el-table>
      </div>
      <p class="ih-info-title">请款信息</p>
      <div class="padding-left-20">
        <table
          class="apply-table bg-color"
          style="width: 100%"
        >
          <tr>
            <td class="width-150">请款单位名称</td>
            <td colspan="3">{{form.developName}}</td>
            <td class="width-150">上次请款单号</td>
            <td class="width-150">{{form.lastApplyNo || '--'}}</td>
          </tr>
          <tr>
            <td class="width-150">本次请款金额</td>
            <td class="width-150">{{form.applyMoney}}</td>
            <td class="width-150">本次扣除金额</td>
            <td class="width-150">{{form.subMoney}}</td>
            <td class="width-150">本次扣罚金额</td>
            <td class="width-150 padding-0">
              {{form.fineMoney}}
            </td>
          </tr>
          <tr>
            <td>扣罚项类别</td>
            <td colspan="5">
              {{form.fineType || '--'}}
            </td>
          </tr>
          <tr>
            <td class="width-150">本次实际请款金额（含税）</td>
            <td class="width-150">{{form.actMoneyTax}}</td>
            <td class="width-150">本次实际请款金额（不含税）</td>
            <td class="width-150">{{form.actMoney}}</td>
            <td class="width-150">本次实际请款税额</td>
            <td class="width-150">{{form.taxMoney}}</td>
          </tr>
          <tr>
            <td class="width-150">累计实际请款金额</td>
            <td class="width-150">{{form.sumActMoneyTax}}</td>
            <td class="width-150">累计实际请款不含税金额</td>
            <td class="width-150">{{form.sumActMoney}}</td>
            <td class="width-150">累计实际请款税额</td>
            <td class="width-150">{{form.sumTaxMoney}}</td>
          </tr>
          <tr>
            <td class="width-150">发票类型</td>
            <td class="width-150">
              {{$root.dictAllName(form.billTypeCode, 'InvoiceType')}}
              <!-- <el-select
                v-model=""
                class="width--100"
              >
                <el-option
                  v-for="(i, n) in $root.dictAllList('InvoiceType')"
                  :key="n"
                  :label="i.name"
                  :value="i.code"
                ></el-option>
              </el-select> -->
            </td>
            <td class="width-150">开票税率</td>
            <td class="width-150">{{form.taxRate}}</td>
            <td class="width-150">纳税人识别号</td>
            <td class="width-150">{{form.sellerTaxNo}}</td>
          </tr>
          <tr>
            <td>收款单位名称</td>
            <td colspan="5">{{form.sellerName}}</td>
          </tr>
          <tr>
            <td class="width-150">开户行</td>
            <td colspan="5">{{form.sellerOpeningBankBranch}}</td>
            <!-- <td class="width-150">银行</td>
            <td class="width-150">{{form.sellerOpeningBankType}}</td>
            <td class="width-150">支行</td>
            <td class="width-150">{{form.sellerOpeningBankBranch}}</td> -->
          </tr>
          <tr>
            <td>银行帐号</td>
            <td colspan="5">{{form.sellerBankAccount}}</td>
          </tr>
          <tr>
            <td>经办部门意见</td>
            <td colspan="5">
              <div class="height-100 text-left padding-left-20">{{form.remark || '--'}}</div>
            </td>
          </tr>
        </table>
      </div>
      <p class="ih-info-title">上传附件</p>
      <div class="padding-left-20">
        <el-table
          style="width: 100%"
          :data="fileListType"
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
                :limit="row.fileList.length"
                :upload-show="!!row.fileList.length"
                :removePermi="false"
                size="100px"
              ></IhUpload>
            </template>
          </el-table-column>
        </el-table>
        <br />
      </div>
      <p class="ih-info-title">
        <span>操作日志</span>
      </p>
      <div class="padding-left-20">
        <el-table
          style="width: 100%"
          :data="opLogList"
        >
          <el-table-column label="操作">
            <template v-slot="{ row }">
              {{$root.dictAllName(row.op, 'ApplyOpLog')}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作人"
            prop="opUserName"
          ></el-table-column>
          <el-table-column
            label="岗位"
            prop="opUserJob"
          ></el-table-column>
          <el-table-column
            label="操作时间"
            prop="opTime"
            width="165"
          ></el-table-column>
          <el-table-column label="处理结果">
            <template v-slot="{ row }">
              <span v-if="row.result">{{row.result}}</span>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column
            label="备注"
            prop="remark"
          ></el-table-column>
        </el-table>
      </div>
      <br />
      <div class="text-center">
        <el-button @click="$router.go(-1)">返回</el-button>
      </div>
    </template>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  get_applyRec_getApplyRecById__applyId,
  post_applyRecFile_getAll,
  get_applyRecDeal_getAll__applyId,
  get_applyRecDealTerm_getAll__applyId,
  get_devAgentFee_getAll__applyId,
  get_opLog_getAllListByApplyId__applyId,
} from "../../../api/apply/index";

@Component({})
export default class ApplyAudit extends Vue {
  private form: any = {};
  private dealList: any = [];
  private agencyList: any = [];
  private termList: any = [];
  private fileListType: any = [];
  private opLogList: any = [];

  private get totalNoReceiveAmount() {
    let sum = 0;
    this.dealList.forEach((i: any) => {
      sum += i.noReceiveAmount;
    });
    return sum;
  }
  private get totalApplyMoney() {
    let sum = 0;
    this.dealList.forEach((i: any) => {
      sum += parseFloat(i.applyMoney) || 0;
    });
    // this.form.applyMoney = sum;
    return sum;
  }
  private get totalSubMoney() {
    let sum = 0;
    this.dealList.forEach((i: any) => {
      sum += parseFloat(i.subMoney) || 0;
    });
    return sum;
  }

  private getSummaries({ columns, data }: any) {
    const sums: any = [];
    columns.forEach((column: any, index: number) => {
      if (index === 0) {
        sums[index] = "合计";
        return;
      }
      const values = data.map((item: any) => Number(item[column.property]));
      if (!values.every((value: any) => isNaN(value))) {
        sums[index] = values.reduce((prev: any, curr: any) => {
          const value = Number(curr);
          if (!isNaN(value)) {
            return prev + curr;
          } else {
            return prev;
          }
        }, 0);
        sums[index] = `-${sums[index]}`;
      } else {
        sums[index] = "";
      }
    });
    return sums;
  }
  private tableRowClassName({ row }: any) {
    let className = row.isCanApply ? "" : "red-row";
    return className;
  }
  getFileListType(data: any) {
    const list = (this.$root as any)
      .dictAllList("ApplyFileType")
      .filter((i: any) => !i.code.includes("PDF"));
    this.fileListType = list.map((i: any) => {
      return {
        ...i,
        fileList: data
          .filter((j: any) => j.type === i.code)
          .map((h: any) => ({
            ...h,
            name: h.fileName,
          })),
      };
    });
  }
  private async getInfo(applyId: any) {
    try {
      const info = await get_applyRec_getApplyRecById__applyId({ applyId });
      this.form = info;
      let dealList = await get_applyRecDeal_getAll__applyId({ applyId });
      this.dealList = dealList.map((i: any) => ({
        taxRate: info.taxRate,
        ...i,
      }));
      this.termList = await get_applyRecDealTerm_getAll__applyId({
        applyId,
      });
      this.agencyList = await get_devAgentFee_getAll__applyId({ applyId });
      this.opLogList = await get_opLog_getAllListByApplyId__applyId({
        applyId,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async created() {
    let id = this.$route.query.id;
    if (id) {
      this.getInfo(id);
      let list = await post_applyRecFile_getAll({
        applyId: id,
        typeList: ["Contract", "Invoice", "ApplyReport"],
      });
      this.getFileListType(list);
    }
  }
}
</script>

<style lang="scss" scoped>
.ih-info-title {
  position: relative;
  .add-account {
    position: absolute;
    top: 0px;
    left: 120px;
    transform: translate(0, -30%);
  }
}
.deal-table {
  /deep/ .red-row {
    background-color: #fccccc;
  }
}
.apply-table {
  border-collapse: collapse;
  font-size: 14px;
  background-color: #f5f7fa;
  &.bg-color {
    background-color: #fff;
  }
  &,
  th,
  td {
    border: 1px solid #ebeef5;
  }
  th,
  td {
    padding: 10px 0;
    text-align: center;
  }
  .padding-0 {
    padding: 0;
  }
}
</style>
