<!--
 * @Descripttion: 客户报备列表
 * @version: 1.0
 * @Author: yag
 * @Date: 2021年2月8日11:13:34
 * @LastEditors: yag
 * @LastEditTime: 2021年2月8日11:13:37
-->
<template>
  <IhPage label-width="100px">
    <template #form>
      <el-form label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="客户信息：">
              <el-input
                v-model="queryPageParameters.nameOrTel"
                placeholder="姓名或手机号"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="报备人信息：">
              <el-input
                v-model="queryPageParameters.reportNameOrTel"
                placeholder="姓名或手机号"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目周期：">
              <IhSelectPageByCycle
                clearable
                @changeOption="
                  (data) => {
                    queryPageParameters.proId = data.proId;
                  }
                "
                v-model="queryPageParameters.proCycleId"
                placeholder="请选择项目周期"
              ></IhSelectPageByCycle>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="报备时间：">
              <el-date-picker
                style="width: 100%"
                v-model="queryPageParameters.reportDate"
                type="daterange"
                align="left"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="$root.pickerOptions"
                value-format="yyyy-MM-dd"
                @change="reportDateChange"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事业部：">
              <IhSelectPageDivision
                v-model="queryPageParameters.departmentId"
                placeholder="请选择事业部"
                clearable
              ></IhSelectPageDivision>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="渠道商名称：">
              <IhSelectPageByChannel
                v-model="queryPageParameters.channelId"
                clearable
                placeholder="请选择渠道商"
              ></IhSelectPageByChannel>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="报备类型：">
              <el-select
                style="width: 100%"
                v-model="queryPageParameters.reportType"
                placeholder="请选择报备类型"
              >
                <el-option
                  v-for="item in $root.dictAllList('ReportType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目类型：">
              <el-select
                style="width: 100%"
                v-model="queryPageParameters.exMarket"
                placeholder="请选择项目类型"
              >
                <el-option label="市场化项目" value="1">市场化项目</el-option>
                <el-option label="非市场化项目" value="0">非市场化项目</el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template #btn>
      <el-row>
        <el-button type="primary" @click="search()">查询</el-button>
        <el-button type="info" @click="reset()">重置</el-button>
        <el-button
          type="success"
          @click="handleExport()"
          v-has="'B.SALES.CUSTOMER.CUSTREPORTLIST.EXPORTLIST'"
          >导出列表</el-button
        >
        <el-button
          type="danger"
          v-if="tabsValue === 'UnderReview'"
          @click="validOrInvalid(selection, 'batch', 'Valid')"
          v-has="'B.SALES.CUSTOMER.CUSTREPORTLIST.EFFECTIVE'"
          >批量有效</el-button
        >
        <el-button
          type="danger"
          v-if="tabsValue === 'UnderReview'"
          @click="validOrInvalidAll(selection, 'batch', 'Invalid')"
          v-has="'B.SALES.CUSTOMER.CUSTREPORTLIST.INVALID'"
          >批量无效</el-button
        >
      </el-row>
    </template>
    <template #table>
      <br />
      <!-- table-标签页 -->
      <el-tabs v-model="tabsValue" type="border-card" @tab-click="changTable">
        <template v-for="(i, n) in tabsList">
          <el-tab-pane :label="i.label" :name="i.name" :key="n">
            <!-- table-content -->
            <el-table
              class="ih-table"
              :empty-text="emptyText"
              :data="showTable"
              @selection-change="selectionChange"
            >
              <el-table-column
                v-if="i.name === 'UnderReview'"
                type="selection"
                width="50"
                align="center"
                :selectable="selectable"
              ></el-table-column>
              <el-table-column
                fixed
                type="index"
                label="序号"
                width="50"
              ></el-table-column>
              <el-table-column
                label="项目周期名称"
                prop="proCycle"
                width="220"
                fixed
              ></el-table-column>
              <el-table-column label="项目类型" width="110">
                <template v-slot="{ row }">
                  <div v-if="row.exMarket === 1">市场化项目</div>
                  <div v-if="row.exMarket === 0">非市场化项目</div>
                </template>
              </el-table-column>
              <el-table-column
                label="事业部"
                prop="proCycleDept"
                width="250"
              ></el-table-column>
              <el-table-column label="报备类型" prop="reportType" width="120">
                <template v-slot="{ row }">{{
                  $root.dictAllName(row.reportType, "ReportType")
                }}</template>
              </el-table-column>
              <el-table-column label="客户信息" width="200">
                <template v-slot="{ row }">
                  <div class="text-ellipsis" :title="row.name">
                    {{ `客户姓名：${row.name}` }}
                  </div>
                  <div class="text-ellipsis" :title="row.sex">
                    {{ `客户性别：`
                    }}{{ $root.dictAllName(row.sex, "SexType") }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="客户号码"
                prop="mobile"
                width="180"
              ></el-table-column>
              <el-table-column
                label="报备人姓名"
                prop="reportName"
                width="140"
                align="center"
              ></el-table-column>
              <el-table-column
                label="报备人号码"
                prop="reportMobile"
                width="140"
                align="center"
              ></el-table-column>
              <el-table-column
                label="渠道公司"
                prop="channelName"
                width="150"
              ></el-table-column>
              <el-table-column
                label="报备时间"
                prop="reportDate"
                width="120"
              ></el-table-column>
              <el-table-column
                v-if="i.name !== 'UnderReview'"
                label="审核人"
                prop="auditUserName"
                width="150"
              ></el-table-column>
              <el-table-column
                v-if="i.name !== 'UnderReview'"
                label="审核时间"
                prop="auditTime"
                width="150"
              ></el-table-column>
              <el-table-column
                v-if="i.name === 'InvalidReport'"
                label="无效原因"
                prop="comment"
                width="150"
              ></el-table-column>
              <el-table-column
                v-if="i.name === 'UnderReview'"
                label="操作"
                width="120"
                fixed="right"
                align="center"
              >
                <template v-slot="{ row }">
                  <el-link
                    type="primary"
                    v-if="row.exMarket === 0"
                    v-has="'B.SALES.CUSTOMER.CUSTREPORTLIST.SYNC'"
                    @click="synchronization(row)"
                    >同步状态</el-link
                  >
                  <el-link
                    type="primary"
                    v-if="row.exMarket === 1"
                    @click="validOrInvalid(row, 'nbatch', 'Valid')"
                    v-has="'B.SALES.CUSTOMER.CUSTREPORTLIST.EFFECTIVE'"
                    class="margin-right-10"
                    >有效&nbsp;</el-link
                  >
                  <el-link
                    type="primary"
                    v-if="row.exMarket === 1"
                    @click="validOrInvalidItem(row)"
                    v-has="'B.SALES.CUSTOMER.CUSTREPORTLIST.INVALID'"
                    >&nbsp;无效</el-link
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </template>
      </el-tabs>
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
    <!-- 弹窗 -->
    <IhDialog :show="dialogVisible">
      <BatchInvalid
        :data="itemData"
        @cancel="() => (dialogVisible = false)"
        @finish="
          () => {
            dialogVisible = false;
            getListMixin();
          }
        "
      />
    </IhDialog>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PaginationMixin from "../../../mixins/pagination";
import axios from "axios";
import { getToken } from "ihome-common/util/cookies";
import BatchInvalid from "./dialog/batchInvalid.vue";
import {
  post_report_getList,
  post_report_getYueJiaReport,
  post_report_reportValidOrInvalid,
} from "../../../api/customer/index";

@Component({
  mixins: [PaginationMixin],
  components: { BatchInvalid },
})
export default class ReturnConfirmList extends Vue {
  queryPageParameters: any = {
    nameOrTel: null,
    reportNameOrTel: null,
    proId: null,
    proCycleId: null,
    reportDate: null,
    reportDateStart: null,
    reportDateEnd: null,
    departmentId: null,
    channelId: null,
    reportType: null,
    exMarket: null,
    reportStatus: "UnderReview",
  };
  tabsValue: any = "UnderReview";
  tabsLabel: any = "待确认";
  dialogVisible = false;
  itemData: any = {
    ids: [],
    data: {},
  };
  resPageInfo: any = {
    total: null,
    list: [],
  };

  reportDateChange(dateArray: any) {
    if (dateArray) {
      this.queryPageParameters.reportDateStart = dateArray[0];
      this.queryPageParameters.reportDateEnd = dateArray[1];
    } else {
      this.queryPageParameters.reportDateStart = null;
      this.queryPageParameters.reportDateEnd = null;
    }
  }

  private handleExport() {
    const token: any = getToken();
    axios({
      method: "POST",
      url: `/sales-api/customer/report/exportReportData`,
      xsrfHeaderName: "Authorization",
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
      data: { ...this.queryPageParameters },
    }).then((res: any) => {
      const href = window.URL.createObjectURL(res.data);
      const $a = document.createElement("a");
      $a.href = href;
      $a.download = "客户报备" + this.tabsLabel + "列表.xlsx";
      $a.click();
      $a.remove();
    });
  }

  private tabsList: any = [
    {
      label: "待确认",
      name: "UnderReview",
    },
    {
      label: "报备有效",
      name: "ValidReport",
    },
    {
      label: "报备无效",
      name: "InvalidReport",
    },
  ];
  showTable: any = [];
  selection: any = [];

  async getListMixin() {
    this.resPageInfo = await post_report_getList(this.queryPageParameters);
    this.showTable = this.resPageInfo.list;
  }

  selectable(row: any) {
    if (row.exMarket === 0) {
      return false;
    } else {
      return true;
    }
  }

  created() {
    this.getListMixin();
  }

  changTable(tab: any) {
    this.tabsLabel = tab.label;
    this.search();
  }

  search() {
    this.queryPageParameters.pageNum = 1;
    this.queryPageParameters.reportStatus = this.tabsValue;
    this.getListMixin();
  }

  reset() {
    Object.assign(this.queryPageParameters, {
      nameOrTel: null,
      reportNameOrTel: null,
      proId: null,
      proCycleId: null,
      reportDate: null,
      reportDateStart: null,
      reportDateEnd: null,
      departmentId: null,
      channelId: null,
      reportType: null,
      exMarket: null,
    });
  }

  selectionChange(selection: any) {
    this.selection = selection;
  }

  // 同步状态
  async synchronization(data: any) {
    await post_report_getYueJiaReport({
      reportId: data.id,
    });
    this.$message.success("同步成功");
    this.search();
  }

  /**
   * @description: 无效弹窗--批量
   */
  private validOrInvalidAll() {
    if (this.selection.length) {
      this.dialogVisible = true;
      this.itemData.ids = this.selection.map((i: any) => i.id);
    } else {
      this.$message.warning("请先勾选表格数据");
      return;
    }
  }
  /**
   * @description: 无效弹窗--单条
   * @param {any} row
   */
  private validOrInvalidItem(row: any) {
    debugger;
    this.dialogVisible = true;
    this.itemData.ids = [row.id];
  }

  async validOrInvalid(data: any, type: any, valType: any) {
    let arr: any = [];
    if (type === "batch") {
      if (this.selection.length) {
        arr = this.selection.map((v: any) => v.id);
      } else {
        this.$notify({
          type: "error",
          title: "请勾选至少一条报备信息",
          message: "请勾选至少一条报备信息操作",
          position: "bottom-right",
        });
        return;
      }
    } else {
      arr = [data.id];
    }
    await post_report_reportValidOrInvalid({
      reportIds: arr,
      validOrInvalid: valType,
    });
    this.$message.success("操作成功");
    this.search();
  }
}
</script>
<style lang="scss" scoped>
.text-ellipsis {
  width: 100%;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>