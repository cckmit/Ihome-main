<!--
 * @Description: file content
 * @version: 
 * @Author: ywl
 * @Date: 2021-01-07 19:02:24
 * @LastEditors: ywl
 * @LastEditTime: 2021-02-02 14:53:16
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
    title="待请款列表"
    top="5vh"
  >
    <el-form label-width="130px">
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
        <!-- <el-col :span="8">
          <el-form-item label="项目名称">
            <el-input
              v-model="queryPageParameters.proName"
              placeholder="请输入成交报告编号"
              clearable
            ></el-input>
          </el-form-item>
        </el-col> -->
        <el-col :span="8">
          <el-form-item label="周期名称">
            <el-input
              v-model="queryPageParameters.termName"
              placeholder="请输入周期名称"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同类型">
            <el-select
              v-model="queryPageParameters.contType"
              placeholder="请选择合同类型"
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
        <el-col :span="8">
          <el-form-item label="是否达到请款条件">
            <el-select
              v-model="queryPageParameters.isCanApply"
              clearable
              class="width--100"
            >
              <el-option
                label="是"
                :value="1"
              ></el-option>
              <el-option
                label="否"
                :value="0"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="业绩确认时间">
            <el-date-picker
              style="width:100%;"
              v-model="timeList"
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
    </el-form>
    <div style="padding-left: 130px;">
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
      <template #amount>
        <el-table-column
          label="代理费金额"
          min-width="160"
        >
          <template v-slot="{ row }">
            <div>应收: {{row.receiveAmount}}</div>
            <div>已收: {{row.receivedAmount}}</div>
            <div>未收: {{row.noReceiveAmount}}</div>
          </template>
        </el-table-column>
      </template>
      <template #unit>
        <el-table-column
          label="成交单位"
          min-width="180"
        >
          <template v-slot="{ row }">
            <span v-if="row.buildingName && row.roomId">{{`${row.proName}-${row.buildingName}-${row.roomId}`}}</span>
            <span v-else>{{`${row.proName}`}}</span>
          </template>
        </el-table-column>
      </template>
      <template #sign>
        <el-table-column
          label="签约信息"
          min-width="180"
        >
          <template v-slot="{ row }">
            <div>签约金额: {{row.signPrice}}</div>
            <div>签约面积: {{row.area}}</div>
            <div>签约时间: {{row.signDate}}</div>
          </template>
        </el-table-column>
      </template>
      <template #contType>
        <el-table-column
          label="合同类型"
          width="120"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.contType, 'ContType')}}
          </template>
        </el-table-column>
      </template>
      <template #isCanApply>
        <el-table-column
          label="是否达到请款条件"
          width="135"
        >
          <template v-slot="{ row }">
            {{row.isCanApply ? '是' : '否'}}
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
import { post_deal_getList } from "../../../../api/apply/index";

@Component({})
export default class SelectDeal extends Vue {
  @Prop({
    default: () => [],
  })
  hasCheckedData!: any;
  @Prop() params!: any;

  queryPageParameters: any = {
    achieveConfirmTimeEnd: null,
    achieveConfirmTimeStart: null,
    contType: null,
    dealCode: null,
    isCanApply: null,
    proName: null,
    termName: null,
  };
  resPageInfo: any = {
    total: null,
    list: [],
  };
  selection: any = [];
  private timeList: any = [];
  private dialogVisible = true;
  private pageSize = 10;
  private pageNum = 1;
  private rowKey: any = "fromDealId";
  private tableMaxHeight: any = 350;
  private tableColumn = [
    {
      prop: "dealCode",
      label: "成交报告编号",
      minWidth: 170,
    },
    // {
    //   prop: "proName",
    //   label: "项目名称",
    //   minWidth: 120,
    // },
    {
      prop: "termName",
      label: "周期名称",
      minWidth: 200,
    },
    {
      slot: "amount",
    },
    {
      prop: "channelName",
      label: "渠道公司",
      minWidth: 120,
    },
    {
      prop: "customerName",
      label: "客户姓名",
      minWidth: 150,
    },
    {
      slot: "unit",
    },
    {
      slot: "contType",
    },
    {
      slot: "sign",
    },
    {
      prop: "subscribeDate",
      label: "认购时间",
      minWidth: 125,
    },
    {
      prop: "achieveConfirmTime",
      label: "业绩确认时间",
      minWidth: 165,
    },
    {
      slot: "isCanApply",
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
  private search() {
    let flag = this.timeList && this.timeList.length;
    this.queryPageParameters.achieveConfirmTimeStart = flag
      ? this.timeList[0]
      : null;
    this.queryPageParameters.achieveConfirmTimeEnd = flag
      ? this.timeList[1]
      : null;
    this.pageNum = 1;
    this.getList();
  }
  private reset() {
    Object.assign(this.queryPageParameters, {
      achieveConfirmTimeEnd: null,
      achieveConfirmTimeStart: null,
      contType: null,
      dealCode: null,
      isCanApply: null,
      proName: null,
      termName: null,
    });
    this.timeList = [];
  }
  // 获取选中项 --- 最后需要获取的数据
  private selectionChange(selection: any) {
    console.log(selection, "selectionChange");
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
    let res = await post_deal_getList({
      ...this.queryPageParameters,
      ...this.params,
      pageNum: this.pageNum,
      pageSize: this.pageSize,
    });
    this.resPageInfo = {
      ...res,
      list: res.list.map((i: any) => ({ ...i, fromDealId: i.id })),
    };
  }

  created() {
    this.getList();
  }
}
</script>

