<!--
 * @Description: 添加客户
 * @version: 
 * @Author: ywl
 * @Date: 2021-03-03 19:03:40
 * @LastEditors: ywl
 * @LastEditTime: 2021-03-06 19:03:39
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
    title="客户列表"
    top="5vh"
  >
    <el-form label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="客户姓名">
            <el-input
              v-model="queryPageParameters.custName"
              placeholder="请输入客户姓名"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户号码">
            <el-input
              v-model="queryPageParameters.custTel"
              placeholder="请输入客户号码"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户类型">
            <el-select
              disabled
              v-model="queryPageParameters.custType"
              placeholder="客户类型"
              class="width--100"
            >
              <el-option
                v-for="item in $root.dictAllList('CustType')"
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
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="timeList"
              type="daterange"
              align="left"
              unlink-panels
              range-separator="到"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户来源">
            <el-select
              clearable
              v-model="queryPageParameters.custOrg"
              placeholder="客户来源"
              class="width--100"
            >
              <el-option
                v-for="item in $root.dictAllList('CustOrg')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="padding-left: 100px;">
      <el-button
        type="default"
        @click="update"
      >刷新</el-button>
      <el-button
        type="success"
        @click="enterVisible = true"
      >添加</el-button>
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
      v-loading="loading"
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
      <template #custOrg>
        <el-table-column
          label="客户来源"
          min-width="130"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.custOrg, 'CustomerOrg')}}
          </template>
        </el-table-column>
      </template>
      <template #custType>
        <el-table-column
          label="客户类型"
          min-width="100"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.custType, 'CustType')}}
          </template>
        </el-table-column>
      </template>
      <template #cardType>
        <el-table-column
          label="证件类型"
          min-width="120"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.cardType, 'CardType')}}
          </template>
        </el-table-column>
      </template>
      <template #certificateNumber>
        <el-table-column
          label="证件编号"
          min-width="250"
        >
          <template v-slot="{ row }">
            {{row.certificateNumber || '—'}}
          </template>
        </el-table-column>
      </template>
      <template #email>
        <el-table-column
          label="邮箱"
          min-width="150"
        >
          <template v-slot="{ row }">
            {{row.email || '—'}}
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
    <IhDialog :show="enterVisible">
      <EnterCustomer
        @cancel="() => (enterVisible = false)"
        @finish="handleFinish"
      />
    </IhDialog>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { post_customer_getCustList } from "@/api/customer";
import EnterCustomer from "@/views/deal/dealReport/dialog/enterCustomer.vue";

@Component({
  components: { EnterCustomer },
})
export default class SelectOwner extends Vue {
  @Prop({
    default: () => [],
  })
  hasCheckedData!: any;

  queryPageParameters: any = {
    createTimeRealMax: null,
    createTimeRealMin: null,
    custCode: null,
    custInfo: null,
    custName: null,
    custOrg: null,
    custTel: null,
    custType: "Individual",
  };
  resPageInfo: any = {
    total: null,
    list: [],
  };
  selection: any = [];
  private loading = false;
  private timeList: any = [];
  private rowKey: any = "id";
  private dialogVisible = true;
  private pageSize = 10;
  private pageNum = 1;
  private tableMaxHeight: any = 350;
  private tableColumn = [
    {
      prop: "custName",
      label: "客户姓名",
      minWidth: 120,
    },
    {
      prop: "custTel",
      label: "手机号码",
      minWidth: 170,
    },
    {
      slot: "custOrg",
    },
    {
      slot: "custType",
    },
    {
      slot: "cardType",
    },
    {
      slot: "certificateNumber",
    },
    {
      slot: "email",
    },
    {
      prop: "createTime",
      label: "创建时间",
      minWidth: 180,
    },
  ];
  private enterVisible = false;

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
    this.queryPageParameters.createTimeRealMin = flag ? this.timeList[0] : null;
    this.queryPageParameters.createTimeRealMax = flag ? this.timeList[1] : null;
    this.pageNum = 1;
    this.getList();
  }
  private reset() {
    Object.assign(this.queryPageParameters, {
      createTimeRealMax: null,
      createTimeRealMin: null,
      custCode: null,
      custInfo: null,
      custName: null,
      custOrg: null,
      custTel: null,
    });
    this.timeList = [];
  }
  private update() {
    this.reset();
    this.search();
  }
  private handleGoto() {
    let router = this.$router.resolve({
      path: "/customer/list",
    });
    window.open(router.href, "_blank");
  }
  private selectionChange(selection: any) {
    this.selection = selection;
  }
  private handleFinish() {
    this.enterVisible = false;
    this.search();
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
    try {
      this.loading = true;
      this.resPageInfo = await post_customer_getCustList({
        ...this.queryPageParameters,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      });
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  }

  created() {
    this.getList();
  }
}
</script>
