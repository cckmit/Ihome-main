<!--
 * @Description: 收款列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-09 19:24:59
 * @LastEditors: ywl
 * @LastEditTime: 2021-03-01 18:20:05
-->
<template>
  <IhPage label-width="100px">
    <template v-slot:form>
      <el-form
        ref="form"
        label-width="100px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="收款编号">
              <el-input
                v-model="queryPageParameters.payNo"
                placeholder="请输入收款编号"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款日期">
              <el-date-picker
                style="width:100%;"
                v-model="payDate"
                type="daterange"
                align="left"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="$root.pickerOptions"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态">
              <el-select
                v-model="queryPageParameters.status"
                placeholder="请选择状态"
                class="width--100"
                clearable
              >
                <el-option
                  v-for="(i, n) in $root.dictAllList('PaymentStatus')"
                  :key="n"
                  :value="i.code"
                  :label="i.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-collapse-transition>
          <div v-show="searchOpen">
            <el-row>
              <el-col :span="8">
                <el-form-item label="款项类型">
                  <el-select
                    v-model="queryPageParameters.foundType"
                    placeholder="请选择款项类型"
                    class="width--100"
                    clearable
                  >
                    <el-option
                      v-for="(i, n) in $root.dictAllList('FeeType')"
                      :key="n"
                      :value="i.code"
                      :label="i.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="支付时间">
                  <el-date-picker
                    style="width:100%;"
                    v-model="payTime"
                    type="daterange"
                    align="left"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="$root.pickerOptions"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="经办人">
                  <el-input
                    v-model="queryPageParameters.operator"
                    placeholder="请输入经办人"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="联动项目">
                  <IhSelectPageByProject
                    clearable
                    v-model="queryPageParameters.proId"
                    placeholder="请选择联动项目"
                  ></IhSelectPageByProject>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="房号">
                  <IhSelectPageByRoom
                    v-model="queryPageParameters.roomId"
                    :proId="queryPageParameters.proId"
                    placeholder="请选择房号"
                    clearable
                  ></IhSelectPageByRoom>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="立项周期">
                  <IhSelectPageByCycle
                    clearable
                    v-model="queryPageParameters.termId"
                    placeholder="请选择立项周期"
                  ></IhSelectPageByCycle>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="业主姓名">
                  <el-input
                    v-model="queryPageParameters.customerName"
                    placeholder="请输入业主姓名"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="付款方">
                  <el-select
                    v-model="queryPageParameters.payer"
                    placeholder="请选择付款方"
                    class="width--100"
                    clearable
                  >
                    <el-option
                      v-for="(i, n) in $root.dictAllList('PaymentPayer')"
                      :key="n"
                      :value="i.code"
                      :label="i.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="业务编号">
                  <el-input
                    v-model="queryPageParameters.businessCode"
                    placeholder="请输入业务编号"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="组织">
                  <IhSelectOrgTree v-model="queryPageParameters.groupId"></IhSelectOrgTree>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="对账时间">
                  <el-date-picker
                    style="width:100%;"
                    v-model="checkTime"
                    type="daterange"
                    align="left"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="$root.pickerOptions"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="确认时间">
                  <el-date-picker
                    style="width:100%;"
                    v-model="confirmTime"
                    type="daterange"
                    align="left"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="$root.pickerOptions"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="成交报告编号">
                  <el-input
                    v-model="queryPageParameters.dealCode"
                    placeholder="请输入成交报告编号"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="已关联成交">
                  <el-select
                    v-model="queryPageParameters.isRelation"
                    clearable
                    class="width--100"
                  >
                    <el-option
                      :value="0"
                      label="否"
                    ></el-option>
                    <el-option
                      :value="1"
                      label="是"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-collapse-transition>
      </el-form>
    </template>
    <template #btn>
      <el-row>
        <el-button
          type="primary"
          @click="search()"
        >查询</el-button>
        <el-button
          type="info"
          @click="reset()"
        >重置</el-button>
        <!-- <el-button
          @click="batchRelieve()"
          v-has="'B.SALES.FINANCE.PAYMENTLIST.ALLRELIEVE'"
        >批量解除关联</el-button> -->
        <el-link
          type="primary"
          class="float-right margin-right-40"
          @click="searchOpen = !searchOpen"
        >{{searchOpen?'收起':'展开'}}</el-link>
      </el-row>
    </template>
    <template #table>
      <br />
      <el-table
        class="ih-table"
        :data="resPageInfo.list"
        :empty-text="emptyText"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          fixed
          type="selection"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column
          fixed
          width="185"
        >
          <template #header>
            <div>收款编号</div>
            <div>收款日期</div>
          </template>
          <template v-slot="{ row }">
            <div>{{row.payNo || '-'}}</div>
            <div>{{row.payDate || '-'}}</div>
          </template>
        </el-table-column>
        <el-table-column width="120">
          <template #header>
            <div>收款金额</div>
            <div>款项类型</div>
          </template>
          <template v-slot="{ row }">
            <div>{{row.amount || '-'}}</div>
            <div>{{$root.dictAllName(row.foundType, 'FeeType') || '-'}}</div>
          </template>
        </el-table-column>
        <el-table-column min-width="175">
          <template #header>
            <div>联动项目</div>
            <div>房号</div>
          </template>
          <template v-slot="{ row }">
            <div>{{row.projectName || '-'}}</div>
            <div>{{row.roomNo || '-'}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="立项周期"
          prop="termName"
          width="275"
        >
        </el-table-column>
        <el-table-column
          label="状态"
          prop="status"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.status, 'PaymentStatus')}}
          </template>
        </el-table-column>
        <el-table-column
          label="经办人"
          prop="operatorName"
        >
        </el-table-column>
        <el-table-column width="185">
          <template #header>
            <div>店组</div>
            <div>成交报告编号</div>
          </template>
          <template v-slot="{ row }">
            <div>{{row.groupName || '-'}}</div>
            <div>{{row.dealCode || '-'}}</div>
          </template>
        </el-table-column>
        <el-table-column min-width="185">
          <template #header>
            <div>付款方</div>
            <div>业务编号</div>
          </template>
          <template v-slot="{ row }">
            <div>{{$root.dictAllName(row.payer, 'PaymentPayer') || '-'}}</div>
            <div>{{row.businessCode || '-'}}</div>
          </template>
        </el-table-column>
        <el-table-column min-width="155">
          <template #header>
            <div>凭证号</div>
            <div>支付时间</div>
          </template>
          <template v-slot="{ row }">
            <div>{{row.payCode || '-'}}</div>
            <div>{{row.payTime || '-'}}</div>
          </template>
        </el-table-column>
        <el-table-column min-width="155">
          <template #header>
            <div>对账时间</div>
            <div>确认时间</div>
          </template>
          <template v-slot="{ row }">
            <div>{{row.checkTime|| '-'}}</div>
            <div>{{row.confirmTime || '-'}}</div>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120px"
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              @click.native.prevent="$router.push(`/payment/info?id=${row.id}`)"
            >详情</el-link>
            <el-dropdown
              trigger="click"
              class="margin-left-15"
            >
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :class="{'ih-data-disabled': row.status !== 'NotCheck'}"
                  @click.native.prevent="checkPay(row)"
                  v-has="'B.SALES.FINANCE.PAYMENTLIST.ACCOUNTCHECK'"
                >对账</el-dropdown-item>
                <el-dropdown-item
                  :class="{'ih-data-disabled': row.status !== 'NotPaid' && row.status !== 'NotCheck'}"
                  @click.native.prevent="remove(row)"
                  v-has="'B.SALES.FINANCE.PAYMENTLIST.REMOVE'"
                >删除</el-dropdown-item>
                <!-- <el-dropdown-item
                  :class="{'ih-data-disabled': row.status !== 'Paid'}"
                  @click.native.prevent="handleRele(row)"
                  v-has="'B.SALES.FINANCE.PAYMENTLIST.RELEVANCE'"
                >关联成交</el-dropdown-item>
                <el-dropdown-item
                  :class="{'ih-data-disabled': row.status !== 'Paid'}"
                  @click.native.prevent="relieve(row)"
                  v-has="'B.SALES.FINANCE.PAYMENTLIST.RELIEVE'"
                >解除关联</el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template #pagination>
      <br />
      <el-pagination
        @size-change="handleSizeChangeMixin"
        @current-change="handleCurrentChangeMixin"
        :current-page.sync="queryPageParameters.pageNum"
        :page-sizes="$root.pageSizes"
        :page-size="queryPageParameters.pageSize"
        :layout="$root.paginationLayout"
        :total="resPageInfo.total"
      ></el-pagination>
    </template>
    <IhDialog :show="dialogVisible">
      <DealDialog
        :id="payId"
        @cancel="() => (dialogVisible = false)"
        @finish="() => {
          dialogVisible = false;
          getListMixin();
        }"
      />
    </IhDialog>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PaginationMixin from "../../../mixins/pagination";
import DealDialog from "./dialog/dealDialog.vue";
import {
  post_payment_getList,
  post_payment_delete__id,
  post_payment_checkPayment__id,
  post_payment_batchRelieveDeal,
} from "../../../api/finance/index";

@Component({
  components: { DealDialog },
  mixins: [PaginationMixin],
})
export default class ReceiptList extends Vue {
  queryPageParameters: any = {
    businessCode: null,
    customerName: null,
    endCheckTime: null,
    endConfirmTime: null,
    endPayDate: null,
    endPayTime: null,
    foundType: null,
    groupId: null,
    operator: null,
    payNo: null,
    payType: null,
    payer: null,
    proId: null,
    roomId: null,
    startCheckTime: null,
    startConfirmTime: null,
    startPayDate: null,
    startPayTime: null,
    status: null,
    termId: null,
    isRelation: null,
    dealCode: null,
  };
  resPageInfo: any = {
    total: null,
    list: [],
  };
  private payDate: any = []; // 支付日期
  private payTime: any = []; // 支付时间
  private checkTime: any = []; // 对账时间
  private confirmTime: any = []; // 确认时间
  private searchOpen = true;
  private dialogVisible = false;
  private selection: any = [];
  private payId: any = null;

  private async batchRelieve() {
    if (this.selection.length) {
      if (
        this.selection
          .map((i: any) => i.status)
          .every((v: any) => v === "Paid") &&
        !this.selection
          .map((i: any) => i.dealCode || "")
          .every((v: any) => v === "")
      ) {
        try {
          let ids = this.selection.map((i: any) => i.id);
          await this.$confirm(
            `确认批量解除${this.selection.length}条付款记录的成交报告?`,
            "提示"
          );
          await post_payment_batchRelieveDeal({ ids });
          this.getListMixin();
          this.$message.success("解除成功");
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$message.warning("请选择状态为已支付且关联成交报告的数据");
        return;
      }
    } else {
      this.$message.warning("请先勾选表格数据");
      return;
    }
  }
  private async relieve(row: any) {
    try {
      await this.$confirm("确认解除该条付款记录的成交报告?", "提示");
      await post_payment_batchRelieveDeal({ ids: [row.id] });
      this.getListMixin();
      this.$message.success("解除成功");
    } catch (error) {
      console.log(error);
    }
  }
  private handleRele(row: any) {
    this.payId = row.id;
    this.dialogVisible = true;
  }
  private async checkPay(row: any) {
    try {
      await this.$confirm("确认是否对该付款记录进行对账?", "提示");
      await post_payment_checkPayment__id({ id: row.id });
      this.getListMixin();
      this.$message.success("对账成功");
    } catch (error) {
      console.log(error);
    }
  }
  private async remove(row: any) {
    try {
      await this.$confirm("确认要删除该付款记录?", "提示");
      await post_payment_delete__id({ id: row.id });
      // 删除list最后一条数据 返回前一页面
      if (this.resPageInfo.list.length === 1) {
        this.queryPageParameters.pageNum === 1
          ? (this.queryPageParameters.pageNum = 1)
          : this.queryPageParameters.pageNum--;
      }
      this.getListMixin();
      this.$message.success("删除成功");
    } catch (error) {
      console.log(error);
    }
  }
  private search() {
    let payDFlog = this.payDate && this.payDate.length;
    let payTFlog = this.payTime && this.payTime.length;
    let checkFlog = this.checkTime && this.checkTime.length;
    let confirmFlog = this.confirmTime && this.confirmTime.length;
    this.queryPageParameters.startPayDate = payDFlog ? this.payDate[0] : null;
    this.queryPageParameters.endPayDate = payDFlog ? this.payDate[1] : null;
    this.queryPageParameters.startPayTime = payTFlog ? this.payTime[0] : null;
    this.queryPageParameters.endPayTime = payTFlog ? this.payTime[1] : null;
    this.queryPageParameters.startCheckTime = checkFlog
      ? this.checkTime[0]
      : null;
    this.queryPageParameters.endCheckTime = checkFlog
      ? this.checkTime[1]
      : null;
    this.queryPageParameters.startConfirmTime = confirmFlog
      ? this.confirmTime[0]
      : null;
    this.queryPageParameters.endConfirmTime = confirmFlog
      ? this.confirmTime[1]
      : null;
    this.getListMixin();
  }
  private reset() {
    Object.assign(this.queryPageParameters, {
      businessCode: null,
      customerName: null,
      endCheckTime: null,
      endConfirmTime: null,
      endPayDate: null,
      endPayTime: null,
      foundType: null,
      groupId: null,
      operator: null,
      payNo: null,
      payType: null,
      payer: null,
      proId: null,
      roomId: null,
      startCheckTime: null,
      startConfirmTime: null,
      startPayDate: null,
      startPayTime: null,
      status: null,
      termId: null,
      isRelation: null,
      dealCode: null,
    });
    this.payDate = [];
    this.payTime = [];
    this.checkTime = [];
    this.confirmTime = [];
  }
  handleSelectionChange(val: any) {
    this.selection = val;
  }
  async getListMixin() {
    let businessId = this.$route.query.businessId;
    let params = {};
    if (businessId) {
      params = {
        ...this.queryPageParameters,
        businessId,
      };
    } else {
      params = {
        ...this.queryPageParameters,
      };
    }
    this.resPageInfo = await post_payment_getList(params);
  }

  created() {
    this.getListMixin();
  }
}
</script>
