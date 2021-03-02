<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-12-29 11:04:59
 * @LastEditors: wwq
 * @LastEditTime: 2021-03-02 19:03:06
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    append-to-body
    width="85%"
    title="待付款成交列表"
    top="5vh"
  >
    <el-form label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="成交报告编号">
            <el-input
              v-model="info.dealCode"
              placeholder="请输入成交报告编号"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="周期名称">
            <el-input
              v-model="info.cycleName"
              placeholder="请输入周期名称"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户名称">
            <el-input
              v-model="info.customer"
              placeholder="请输入客户名称"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="是否可结佣">
            <el-select
              v-model="info.isComm"
              placeholder="请选择"
              clearable
              class="width--100"
            >
              <el-option
                v-for="(i, n) in $root.dictAllList('YesOrNoType')"
                :key="n"
                :label="i.name"
                :value="i.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="业务模式">
            <el-select
              v-model="info.busModel"
              placeholder="请选择"
              clearable
              class="width--100"
            >
              <el-option
                v-for="(i, n) in $root.dictAllList('BusinessModel')"
                :key="n"
                :label="i.name"
                :value="i.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同类型">
            <el-select
              v-model="info.contType"
              placeholder="请选择"
              clearable
              class="width--100"
            >
              <el-option
                v-for="(i, n) in $root.dictAllList('ContType')"
                :key="n"
                :label="i.name"
                :value="i.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="录入时间">
            <el-date-picker
              style="width: 100%"
              v-model="info.timeList"
              type="daterange"
              align="left"
              unlink-panels
              range-separator="到"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="$root.pickerOptions"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="padding-left-100">
      <el-button
        type="primary"
        @click="search()"
      >查询</el-button>
      <el-button
        type="info"
        @click="reset()"
      >重置</el-button>
    </div>
    <br />
    <IhTableCheckBox
      :data="resPageInfo.list"
      :hasCheckedData="hasCheckedData"
      :rowKey="rowKey"
      :column="tableColumn"
      :maxHeight="tableMaxHeight"
      @selection-change="selectionChange"
      :pageSize="pageSize"
      :pageCurrent="pageNum"
      :pageTotal="resPageInfo.total"
      @page-change="pageChange"
      @size-change="sizeChange"
    >
      <template #serReceive>
        <el-table-column
          label="服务费情况"
          width="150"
        >
          <template v-slot="{ row }">
            <div>应收: {{row.serReceiveFees}}</div>
            <div>实收: {{row.serActualFees}}</div>
            <div>未收: {{row.serNoFees}}</div>
          </template>
        </el-table-column>
      </template>
      <template #ageReceive>
        <el-table-column
          label="代理费情况"
          width="150"
        >
          <template v-slot="{ row }">
            <div>应收: {{row.ageReceiveFees}}</div>
            <div>实收: {{row.ageActualFees}}</div>
            <div>未收: {{row.ageUnpaidFees}}</div>
          </template>
        </el-table-column>
      </template>
      <template #excrete>
        <el-table-column
          label="拆佣金额"
          width="150"
        >
          <template v-slot="{ row }">
            <div>服务费: {{row.serCommFees}}</div>
            <div>代理费: {{row.ageCommFees}}</div>
            <div>合计: {{Number(row.serCommFees?row.serCommFees:0) + Number(row.ageCommFees?row.ageCommFees:0)}}</div>
          </template>
        </el-table-column>
      </template>
      <template #payoff>
        <el-table-column
          label="可结佣金额"
          width="150"
        >
          <template v-slot="{ row }">
            <div>服务费: {{row.serCanCommFees}}</div>
            <div>代理费: {{row.ageCanCommFees}}</div>
            <div>合计: {{Number(row.serCanCommFees?row.serCanCommFees:0) + Number(row.ageCanCommFees?row.ageCanCommFees:0)}}</div>
          </template>
        </el-table-column>
      </template>
      <template #payoffed>
        <el-table-column
          label="已结佣金额"
          width="150"
        >
          <template v-slot="{ row }">
            <div>服务费: {{row.serSettledCommFees}}</div>
            <div>代理费: {{row.ageSettledCommFees}}</div>
            <div>合计: {{Number(row.serSettledCommFees?row.serSettledCommFees:0) + Number(row.ageSettledCommFees?row.ageSettledCommFees:0)}}</div>
          </template>
        </el-table-column>
      </template>
      <template #notpayoff>
        <el-table-column
          label="未结佣金额"
          width="150"
        >
          <template v-slot="{ row }">
            <div>服务费: {{row.serUnsetCommFees}}</div>
            <div>代理费: {{row.ageUnsetCommFees}}</div>
            <div>合计: {{Number(row.serUnsetCommFees?row.serUnsetCommFees:0) + Number(row.ageUnsetCommFees?row.ageUnsetCommFees:0)}}</div>
          </template>
        </el-table-column>
      </template>
      <template #busModel>
        <el-table-column
          label="业务模式"
          width="120"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.busModel, 'BusinessModel')}}
          </template>
        </el-table-column>
      </template>
    </IhTableCheckBox>
    <template #footer>
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        type="primary"
        @click="finish()"
      >确 定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { post_payDeal_getList } from "@/api/payoff/index";

@Component({})
export default class Obligation extends Vue {
  @Prop({
    default: () => [],
  })
  @Prop()
  data!: any;

  info: any = {
    dealCode: null,
    cycleName: null,
    customer: null,
    isComm: null,
    busModel: null,
    contType: null,
    beginTime: null,
    endTime: null,
    timeList: [],
    agencyId: null,
    projectId: null,
  };
  resPageInfo: any = {
    total: null,
    list: [],
  };
  hasCheckedData: any = [];
  selection: any = [];
  private dialogVisible = true;
  private pageSize = 10;
  private pageNum = 1;
  private rowKey: any = "id";
  private tableMaxHeight: any = 350;
  private tableColumn = [
    {
      label: "成交报告编号",
      prop: "dealCode",
      minWidth: 150,
    },
    {
      label: "周期名称",
      prop: "cycleName",
      minWidth: 150,
    },
    {
      slot: "busModel",
    },
    {
      label: "渠道商",
      prop: "agencyName",
      minWidth: 150,
    },
    {
      slot: "serReceive",
    },
    {
      slot: "ageReceive",
    },
    {
      slot: "excrete",
    },
    {
      slot: "payoff",
    },
    {
      slot: "payoffed",
    },
    {
      slot: "notpayoff",
    },
    {
      label: "累计扣款",
      prop: "countDeduction",
    },
    {
      label: "客户名称",
      prop: "customer",
    },
    {
      label: "认购日期",
      prop: "subscribeDate",
      minWidth: 160,
    },
    {
      label: "签约日期",
      prop: "signDate",
      minWidth: 160,
    },
    {
      label: "录入日期",
      prop: "entryDate",
      minWidth: 160,
    },
  ];

  private cancel(): void {
    this.$emit("cancel", false);
  }
  private finish(): void {
    if (this.selection.length) {
      this.$emit("finish", this.selection);
    } else {
      this.$message.warning("请先勾选表格数据");
    }
  }
  private reset() {
    Object.assign(this.info, {
      dealCode: null,
      cycleName: null,
      customer: null,
      isComm: null,
      busModel: null,
      contType: null,
      beginTime: null,
      endTime: null,
      timeList: [],
    });
  }
  private search() {
    let flag = this.info.timeList && this.info.timeList.length;
    this.info.beginTime = flag ? this.info.timeList[0] : null;
    this.info.endTime = flag ? this.info.timeList[1] : null;
    this.pageNum = 1;
    this.getList();
  }
  // 获取选中项 --- 最后需要获取的数据
  private selectionChange(selection: any) {
    this.selection = selection;
  }
  private pageChange(val: number) {
    this.pageNum = val;
    this.getList();
  }
  private sizeChange(val: any) {
    this.pageSize = val;
    this.getList();
  }
  private async getList() {
    this.resPageInfo = await post_payDeal_getList({
      ...this.info,
      pageNum: this.pageNum,
      pageSize: this.pageSize,
    });
  }

  created() {
    this.info.agencyId = this.data.agencyId;
    this.info.projectId = this.data.projectId;
    this.hasCheckedData = this.data.hasCheckedData;
    this.getList();
  }
}
</script>