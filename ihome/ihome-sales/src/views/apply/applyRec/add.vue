<!--
 * @Description: 发起请佣申请页
 * @version: 
 * @Author: ywl
 * @Date: 2021-01-07 16:30:03
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-09 17:53:19
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
                placeholder="保存后自动生成"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="甲方公司">
              <IhSelectPageByDeveloper
                v-model="form.developId"
                placeholder="请选择甲方公司"
                clearable
                @changeOption="(data) => {
                  dealParams.developId = data.id;
                  getWaitList(data.id)
                }"
              ></IhSelectPageByDeveloper>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款公司">
              <IhSelectPageByCompany
                v-model="form.polyCompanyId"
                placeholder="请选择收款公司"
                clearable
                @changeOption="(data) => {
                  dealParams.polyCompanyId = data.id
                  getAccount(data.id)
                }"
              ></IhSelectPageByCompany>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款账号">
              <el-select
                v-model="accountData"
                class="width--100"
                placeholder="请选择收款账号"
                value-key="id"
                ref="accountSelect"
                @visible-change="selectVisibleChange"
                @change="(data) => {
                  dealParams.receAccountId = data.id
                  form.receAccountId = data.id
                  getBankInfo(data.id)
                }"
              >
                <el-option
                  v-for="(i, n) in accountList"
                  :key="n"
                  :label="i.accountName"
                  :value="i"
                ></el-option>
              </el-select>
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
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请日期">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <p class="ih-info-title">
        <span>待请款列表</span>
        <el-button
          type="primary"
          class="add-account"
          size="small"
          @click="handleAddDeal()"
        >添加成交报告</el-button>
      </p>
      <div class="padding-left-20">
        <el-table
          style="width: 100%"
          :data="form.dealList"
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
                v-model.number="row.applyMoney"
                v-digits="2"
                clearable
              />
            </template>
          </el-table-column>
          <el-table-column
            label="本次扣除金额"
            width="150"
          >
            <template v-slot="{ row }">
              <el-input
                v-model.number="row.subMoney"
                v-digits="2"
                clearable
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
                clearable
              />
            </template>
          </el-table-column>
          <el-table-column
            label="本次实际请款金额"
            min-width="175"
          >
            <template v-slot="{ row }">
              <div>
                <div>不含税金额: {{noTaxMoneySum(row)}}</div>
                <div>税额: {{taxMoneySum(row)}}</div>
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
                clearable
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
                clearable
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
                clearable
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
                clearable
                :rows="4"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="80"
          >
            <template v-slot="{ $index }">
              <el-link
                type="danger"
                @click="dealRemove($index)"
              >移除</el-link>
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
          <el-table-column
            label="操作"
            width="120"
            fixed="right"
          >
            <template v-slot="{ row }">
              <el-link
                type="danger"
                v-if="row.id"
              >移除</el-link>
              <span v-else>--</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="padding-left-20">
        <br />
        <el-button
          type="primary"
          class="width--100"
          :loading="uploadLoad"
          @click="handleUpdateInfo()"
        >点击刷新预览项目周期请款汇总信息和请款信息</el-button>
      </div>
      <br />
      <p class="ih-info-title">项目周期请款汇总</p>
      <div class="padding-left-20">
        <el-table style="width: 100%">
          <el-table-column label="周期名称"></el-table-column>
          <el-table-column label="所属项目"></el-table-column>
          <el-table-column
            label="累计请款次数"
            min-width="115"
          ></el-table-column>
          <el-table-column
            label="历史已申请请款金额（含税）"
            min-width="205"
          ></el-table-column>
          <el-table-column
            label="累计扣除金额（含税）"
            min-width="180"
          ></el-table-column>
          <el-table-column
            label="历史实际请款金额（含税）"
            min-width="205"
          ></el-table-column>
          <el-table-column
            label="已回款金额（含税）"
            min-width="180"
          ></el-table-column>
          <el-table-column
            label="本次实际请款金额（含税）"
            min-width="205"
          ></el-table-column>
          <el-table-column
            label="累计实际请款金额（含税）"
            min-width="205"
          ></el-table-column>
        </el-table>
      </div>
    </template>
    <IhDialog :show="selectVisible">
      <SelectDeal
        :params="dealParams"
        :hasCheckedData="form.dealList"
        @cancel="() => (selectVisible = false)"
        @finish="dealConfirm"
      />
    </IhDialog>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SelectDeal from "./dialog/selectDeal.vue";
import {
  get_bankAccount_get__companyId,
  get_bankAccount_getBankInfoByAccountId__accountId,
} from "../../../api/finance/index";
import {
  get_devDeductDetail_getListAllByWait__developId,
  post_applyRecDeal_getTermTotalList,
} from "../../../api/apply/index";

@Component({
  components: { SelectDeal },
})
export default class ApplyRecAdd extends Vue {
  private form: any = {
    developId: null,
    polyCompanyId: null,
    receAccountId: null,
    branchNo: null,
    sellerTaxNo: null,
    taxRate: null,
    devAgentFeeAddFromPageVO: {
      applyRecDealList: [],
      devDeductDetailIdList: [],
    },
    dealList: [],
  };
  private accountData: any = null;
  private selectVisible = false;
  private accountList: any = [];
  private dealParams: any = {
    developId: null,
    polyCompanyId: null,
    receAccountId: null,
  };
  private waitList: any = [];
  private uploadLoad = false;

  private get agencyList() {
    // 应扣除代理费明细
    this.form.devAgentFeeAddFromPageVO.devDeductDetailIdList = this.waitList.map(
      (i: any) => i.id
    );
    let list = this.form.dealList.map((i: any) => ({
      dealCode: i.dealCode,
      dealId: i.id,
      developId: i.channelId,
      proId: i.proId,
      proName: i.proName,
      subMoney: i.subMoney,
      subType: i.subType,
      termId: i.termId,
      termName: i.termName,
    }));
    this.form.devAgentFeeAddFromPageVO.applyRecDealList = list;
    return this.waitList.concat(list);
  }
  private get totalNoReceiveAmount() {
    let sum = 0;
    this.form.dealList.forEach((i: any) => {
      sum += i.noReceiveAmount;
    });
    return sum;
  }
  private get totalApplyMoney() {
    let sum = 0;
    this.form.dealList.forEach((i: any) => {
      sum += parseFloat(i.applyMoney) || 0;
    });
    return sum;
  }
  private get totalSubMoney() {
    let sum = 0;
    this.form.dealList.forEach((i: any) => {
      sum += parseFloat(i.subMoney) || 0;
    });
    return sum;
  }

  private noTaxMoneySum(row: any) {
    // 计算不含税金额
    let num =
      (parseFloat(row.applyMoney) || 0) - (parseFloat(row.subMoney) || 0);
    let num2 = (parseFloat(row.taxRate) || 0) + 1;
    row.noTaxMoney = parseFloat((num / num2).toFixed(2));
    return row.noTaxMoney;
  }
  private taxMoneySum(row: any) {
    // 计算税额
    let num =
      (parseFloat(row.applyMoney) || 0) - (parseFloat(row.subMoney) || 0);
    row.taxMoney = parseFloat(
      (num - (parseFloat(row.noTaxMoney) || 0)).toFixed(2)
    );
    return row.taxMoney;
  }
  /**
   * @description: 甲方公司应扣除代理费明细合计
   * @param {*} param
   * @return {array} sums
   */
  private getSummaries({ columns, data }: any) {
    const sums: any = [];
    columns.forEach((column: any, index: number) => {
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
  private selectVisibleChange(val: any) {
    if (val && !this.form.polyCompanyId) {
      (this.$refs.accountSelect as any).blur();
      this.$message.warning("请先选择收款公司");
    }
  }
  private handleAddDeal() {
    if (
      this.dealParams.developId &&
      this.dealParams.polyCompanyId &&
      this.dealParams.receAccountId
    ) {
      this.selectVisible = true;
    } else {
      this.$message.warning("请先选择甲方公司, 收款公司和收款账号");
    }
  }
  private dealRemove(index: number) {
    this.form.dealList.splice(index, 1);
  }
  private async getWaitList(developId: any) {
    try {
      this.waitList = await get_devDeductDetail_getListAllByWait__developId({
        developId,
      });
    } catch (error) {
      console.log(error);
    }
  }
  private dealConfirm(arr: any) {
    this.selectVisible = false;
    this.form.dealList = arr.map((i: any) => ({
      applyMoney: i.canApplyAmountNow,
      noTaxMoney: 0,
      subMoney: 0,
      taxMoney: 0,
      remark: null,
      subType: null,
      applyDealId: i.id,
      taxRate: this.form.taxRate,
      ...i,
    }));
  }
  private tableRowClassName({ row }: any) {
    let className = row.isCanApply ? "" : "red-row";
    return className;
  }
  private async getAccount(companyId: any) {
    this.accountList = await get_bankAccount_get__companyId({ companyId });
  }
  private async getBankInfo(accountId: any) {
    const info = await get_bankAccount_getBankInfoByAccountId__accountId({
      accountId,
    });
    console.log(info);
    this.form.branchNo = info.branchNo;
    this.form.taxRate = info.taxRate;
  }
  private handleUpdateInfo() {
    if (
      this.dealParams.developId &&
      this.dealParams.polyCompanyId &&
      this.dealParams.receAccountId &&
      this.form.dealList.length
    ) {
      //
    } else {
      this.$message.warning("请完成上面操作再更新页面");
    }
  }
  /**
   * @description: 加载项目周期请款汇总数据
   * @param {*} param
   */
  private async getTermTotalList(param: any) {
    try {
      await post_applyRecDeal_getTermTotalList(param);
    } catch (error) {
      console.log(error);
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
}
</style>
