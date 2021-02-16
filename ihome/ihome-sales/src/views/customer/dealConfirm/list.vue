<!--
 * @Descripttion: 成交确认列表
 * @version: 1.0
 * @Author: yag
 * @Date: 2021年2月9日17:39:50
 * @LastEditors: yag
 * @LastEditTime: 2021年2月9日17:39:53
-->
<template>
  <IhPage label-width="100px">
    <template #form>
      <el-form label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="客户信息">
              <el-input
                v-model="queryPageParameters.nameOrTel"
                placeholder="姓名或手机号"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="报备人信息">
              <el-input
                v-model="queryPageParameters.reportNameOrTel"
                placeholder="姓名或手机号"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目周期">
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
            <el-form-item label="报备时间">
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
            <el-form-item label="事业部">
              <IhSelectPageDivision
                v-model="queryPageParameters.departmentId"
                placeholder="请选择事业部"
                clearable
              ></IhSelectPageDivision>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="渠道商名称">
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
            <el-form-item label="报备类型">
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
            <el-form-item label="项目类型">
              <el-select
                style="width: 100%"
                v-model="queryPageParameters.exMarket"
                placeholder="请选择项目类型"
              >
                <el-option label="是" value="1">市场化项目</el-option>
                <el-option label="否" value="0">非市场化项目</el-option>
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
          v-has="'B.SALES.CUSTOMER.DEALCONFIRM.EXPORTLIST'"
          >导出列表</el-button
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
              <el-table-column
                v-if="i.name === 'NewDeal'"
                label="项目类型"
                width="110"
              >
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
                label="到访时间"
                prop="visitDate"
                width="150"
              ></el-table-column>
              <el-table-column
                v-if="i.name === 'ValidDeal'"
                label="成交时间"
                prop="expectedTime"
                width="120"
              ></el-table-column>
              <el-table-column
                label="栋座房号"
                prop="roomNo"
                width="100"
              ></el-table-column>
              <el-table-column
                v-if="['ValidDeal', 'InvalidDeal'].includes(i.name)"
                label="审核人"
                prop="auditUserName"
                width="150"
              ></el-table-column>
              <el-table-column
                v-if="['ValidDeal', 'InvalidDeal'].includes(i.name)"
                label="审核时间"
                prop="auditTime"
                width="150"
              ></el-table-column>
              <el-table-column
                v-if="i.name === 'ValidDeal'"
                label="关联成交编号"
                prop="dealCode"
                min-width="120"
              >
                <template slot-scope="scope">
                  <el-link type="primary" @click="goToDealInfo(scope)">{{
                    scope.row.dealCode
                  }}</el-link>
                </template>
              </el-table-column>
              <el-table-column
                v-if="i.name === 'InvalidDeal'"
                label="无效原因"
                prop="comment"
                width="150"
              ></el-table-column>
              <el-table-column
                label="操作"
                width="120"
                fixed="right"
                align="center"
              >
                <template v-slot="{ row }">
                  <el-link
                    type="primary"
                    v-if="row.exMarket === 0 && i.name === 'NewDeal'"
                    v-has="'B.SALES.CUSTOMER.DEALCONFIRM.SYNC'"
                    @click="synchronization(row)"
                    >同步状态</el-link
                  >
                  <el-link
                    type="primary"
                    v-if="row.exMarket === 1 && i.name === 'NewDeal'"
                    @click="validDealOperation(row)"
                    v-has="'B.SALES.CUSTOMER.DEALCONFIRM.EFFECTIVE'"
                    class="margin-right-10"
                    >有效</el-link
                  >
                  <el-link
                    type="primary"
                    v-if="row.exMarket === 1 && i.name === 'NewDeal'"
                    @click="invalidDealOperation(row)"
                    v-has="'B.SALES.CUSTOMER.DEALCONFIRM.INVALID'"
                    >无效</el-link
                  >
                  <el-link
                    type="primary"
                    @click="fileDetailOperation(row)"
                    v-has="'B.SALES.CUSTOMER.DEALCONFIRM.FILEDETAIL'"
                    >附件详情</el-link
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
    <IhDialog :show="dialogVisibleValid">
      <ValidDeal
        :data="itemData"
        @cancel="() => (dialogVisibleValid = false)"
        @finish="
          () => {
            dialogVisibleValid = false;
            getListMixin();
          }
        "
      />
    </IhDialog>
    <IhDialog :show="dialogVisibleInvalid">
      <InvalidDeal
        :data="itemData"
        @cancel="() => (dialogVisibleInvalid = false)"
        @finish="
          () => {
            dialogVisibleInvalid = false;
            getListMixin();
          }
        "
      />
    </IhDialog>
    <IhDialog :show="dialogVisibleFile">
      <FileDetail
        :data="itemData"
        @cancel="() => (dialogVisibleFile = false)"
        @finish="
          () => {
            dialogVisibleFile = false;
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
import InvalidDeal from "./dialog/invalidDeal.vue";
import ValidDeal from "./dialog/validDeal.vue";
import FileDetail from "./dialog/fileDetail.vue";
import {
  post_report_getList,
  post_report_getYueJiaReport,
} from "../../../api/customer/index";

@Component({
  mixins: [PaginationMixin],
  components: { InvalidDeal, ValidDeal, FileDetail },
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
    reportStatus: "NewDeal",
  };
  tabsValue: any = "NewDeal";
  tabsLabel: any = "未确认";
  dialogVisibleValid = false;
  dialogVisibleInvalid = false;
  dialogVisibleFile = false;
  itemData: any = {
    reportId: null,
    validOrInvalid: null,
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
      $a.download = "成交确认" + this.tabsLabel + "列表.xlsx";
      $a.click();
      $a.remove();
    });
  }

  private tabsList: any = [
    {
      label: "未确认",
      name: "NewDeal",
    },
    {
      label: "已成交",
      name: "ValidDeal",
    },
    {
      label: "无效成交",
      name: "InvalidDeal",
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
   * @description: 成交有效
   * @param {any} row
   */
  private validDealOperation(row: any) {
    this.dialogVisibleValid = true;
    this.itemData.validOrInvalid = "Valid";
    this.itemData.reportId = row.id;
  }

  /**
   * @description: 成交无效
   * @param {any} row
   */
  private invalidDealOperation(row: any) {
    this.dialogVisibleInvalid = true;
    this.itemData.validOrInvalid = "Invalid";
    this.itemData.reportId = row.id;
  }

  /**
   * @description: 附件详情
   * @param {any} row
   */
  private fileDetailOperation(row: any) {
    this.dialogVisibleFile = true;
    this.itemData.reportId = row.id;
  }

  /**
   * @description: 查看成交详情
   * @param {any} row
   */
  goToDealInfo(scope: any) {
    let router = this.$router.resolve({
      path: `/dealReport/info`,
      query: {
        id: scope.row.dealCode,
        type: "CODE",
      },
    });
    window.open(router.href, "_blank");
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