<!--
 * @Description: 开票列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-08 17:45:05
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-30 14:43:33
-->
<template>
  <IhPage label-width="80px">
    <template v-slot:form>
      <el-form
        ref="form"
        label-width="80px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="业务单号">
              <el-input
                v-model="queryPageParameters.businessNo"
                placeholder="请输入业务单号"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发票抬头">
              <el-input
                v-model="queryPageParameters.invoiceTitle"
                placeholder="请输入发票抬头"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="费用类型">
              <el-select
                v-model="queryPageParameters.feeType"
                class="width--100"
                placeholder="请选择费用类型"
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
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="开票状态">
              <el-select
                v-model="queryPageParameters.status"
                class="width--100"
                placeholder="请选择开票状态"
                clearable
              >
                <el-option
                  v-for="(i, n) in $root.dictAllList('InvoiceOperationStatus')"
                  :key="n"
                  :value="i.code"
                  :label="i.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开票日期">
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
          <el-col :span="8">
            <el-form-item label="开票类型">
              <el-select
                v-model="queryPageParameters.operationType"
                class="width--100"
                placeholder="请选择开票类型"
                clearable
              >
                <el-option
                  v-for="(i, n) in $root.dictAllList('InvoiceOperationType')"
                  :key="n"
                  :value="i.code"
                  :label="i.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template v-slot:btn>
      <el-row>
        <el-button
          type="primary"
          @click="search()"
        >查询</el-button>
        <el-button
          type="info"
          @click="reset()"
        >重置</el-button>
        <el-button
          @click="handleAutoAll()"
          v-has="'B.SALES.FINANCE.INVOICELIST.ALLAUTOINVOICE'"
        >批量自动开票</el-button>
        <el-button
          @click="handleHCByAuto()"
          v-has="'B.SALES.FINANCE.INVOICELIST.ALLAUTORED'"
        >批量自动红冲</el-button>
        <el-button
          @click="handleHCByHandmade()"
          v-has="'B.SALES.FINANCE.INVOICELIST.ALLHANDRED'"
        >批量手工红冲</el-button>
        <el-button
          @click="handleDownload()"
          v-has="'B.SALES.FINANCE.INVOICELIST.ALLDOWNLOAD'"
        >批量下载发票</el-button>
      </el-row>
    </template>
    <template v-slot:table>
      <br />
      <el-table
        class="ih-table"
        :empty-text="emptyText"
        :data="resPageInfo.list"
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
          prop="businessNo"
          label="业务单号"
          min-width="120"
        ></el-table-column>
        <el-table-column
          prop="invoiceTitle"
          label="发票抬头"
          min-width="200"
        ></el-table-column>
        <el-table-column
          prop="feeType"
          label="费用类型"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.feeType, 'FeeType')}}
          </template>
        </el-table-column>
        <el-table-column
          prop="amount"
          label="金额（含税）"
          width="130"
        ></el-table-column>
        <el-table-column
          prop="tax"
          label="税额"
          width="130"
        ></el-table-column>
        <el-table-column
          prop="payee"
          label="收款方"
          min-width="255"
        ></el-table-column>
        <el-table-column
          prop="payeeAccountNo"
          label="收款方账号"
          width="195"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="状态"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.status, 'InvoiceOperationStatus')}}
          </template>
        </el-table-column>
        <el-table-column
          prop="operationType"
          label="开票类型"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.operationType, 'InvoiceOperationType')}}
          </template>
        </el-table-column>
        <el-table-column
          prop="operationDate"
          label="开票日期"
          width="125"
        ></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120"
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              @click="$router.push(`/invoice/info?id=${row.id}`)"
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
                  @click.native.prevent="handleAutoItem(row)"
                  :disabled="row.status === 'Done'"
                  v-has="'B.SALES.FINANCE.INVOICELIST.AUTOINVOICE'"
                >自动开票</el-dropdown-item>
                <el-dropdown-item
                  :disabled="row.status === 'Done'"
                  @click.native.prevent="handleHand(row)"
                  v-has="'B.SALES.FINANCE.INVOICELIST.HANDINVOICE'"
                >手工开票</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="downloadFile([row.id])"
                  v-has="'B.SALES.FINANCE.INVOICELIST.DOWNLOAD'"
                >下载发票</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template v-slot:pagination>
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
      <HandmadelInvoice
        :data="itemData.data"
        @cancel="() => (dialogVisible = false)"
        @finish="() => {
          dialogVisible = false;
          getListMixin();
        }"
      />
    </IhDialog>
    <IhDialog :show="autoVisble">
      <AutoInvoice
        :data="itemData"
        :isAll="isAll"
        @cancel="() => (autoVisble = false)"
        @finish="() => {
          autoVisble = false;
          getListMixin();
        }"
      />
    </IhDialog>
    <IhDialog :show="redVisble">
      <RedDashed
        :data="itemData"
        :isHandmade="isHandmade"
        @cancel="() => (redVisble = false)"
        @finish="() => {
          redVisble = false;
          getListMixin();
        }"
      />
    </IhDialog>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PaginationMixin from "../../../mixins/pagination";
import HandmadelInvoice from "./dialog/handmadeInvoice.vue";
import AutoInvoice from "./dialog/autoInvoice.vue";
import RedDashed from "./dialog/redDashed.vue";
import axios from "axios";
import { getToken } from "ihome-common/util/cookies";
import {
  post_invoice_getList,
  post_invoice_downloadFile,
  post_invoice_handHCInvoicing,
  post_invoice_autoHCInvoicing,
} from "../../../api/finance/index";

@Component({
  components: { HandmadelInvoice, AutoInvoice, RedDashed },
  mixins: [PaginationMixin],
})
export default class InvoiceList extends Vue {
  queryPageParameters: any = {
    businessNo: null,
    endTime: null,
    feeType: null,
    invoiceTitle: null,
    operationType: null,
    startTime: null,
    status: null,
  };
  resPageInfo: any = {
    total: null,
    list: [],
  };
  timeList: any = [];
  dialogVisible = false;
  autoVisble = false;
  redVisble = false;
  itemData: any = {
    ids: [],
    data: {},
  };
  isAll = false;
  isHandmade = true;
  private selection: any = [];

  private handleDownload() {
    if (this.selection.length) {
      let ids = this.selection.map((i: any) => i.id);
      this.downloadFile(ids);
    } else {
      this.$message.warning("请先勾选表格数据");
      return;
    }
  }
  private async downloadFile(ids: any) {
    try {
      const res = await post_invoice_downloadFile({ ids: ids });
      console.log(res);
      if (res.length) {
        const token: any = getToken();
        axios({
          method: "POST",
          url: `/sales-api/sales-document-cover/file/download/batch`,
          xsrfHeaderName: "Authorization",
          responseType: "blob",
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + token,
          },
          data: { fileIds: res },
        }).then((res: any) => {
          const href = window.URL.createObjectURL(res.data);
          const $a = document.createElement("a");
          $a.href = href;
          $a.download = "发票附件.zip";
          $a.click();
          $a.remove();
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * @description: 自动红冲-批量
   */
  private async handleHCByAuto() {
    if (this.selection.length) {
      // 判断已开票且开票类型为自动开票的数据
      if (
        !this.selection.map((i: any) => i.status).includes("NotDone") &&
        !this.selection.map((i: any) => i.operationType).includes("Hand")
      ) {
        this.itemData.ids = this.selection.map((i: any) => i.id);
        this.isHandmade = false;
        // 判断费用类型
        if (
          this.selection
            .map((i: any) => i.feeType)
            .every((item: any) => item === "AgencyFee")
        ) {
          // 代理费批量红冲
          this.redVisble = true;
        } else if (
          this.selection
            .map((i: any) => i.feeType)
            .every((item: any) => item === "ServiceFee")
        ) {
          // 服务费批量红冲
          try {
            await this.$confirm("是否确定红冲?", "提示");
            const loading = this.$loading({
              lock: true,
              text: "红冲中, 请耐心等待...",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.6)",
              customClass: "invoice-loading-spinner",
            });
            const res = await post_invoice_autoHCInvoicing({
              ids: this.itemData.ids,
            });
            loading.close();
            this.$message.success(`服务费红冲成功${res}条`);
            this.getListMixin();
          } catch (error) {
            console.log(error);
          }
        } else {
          this.$message.warning("请筛选一致的费用类型");
        }
      } else {
        this.$message.warning(
          "请勾选开票状态为已开票且开票类型为自动开票的数据"
        );
        return;
      }
    } else {
      this.$message.warning("请先勾选表格数据");
      return;
    }
  }
  /**
   * @description: 手工红冲-批量
   */
  private async handleHCByHandmade() {
    if (this.selection.length) {
      if (
        !this.selection.map((i: any) => i.status).includes("NotDone") &&
        !this.selection.map((i: any) => i.operationType).includes("Auto")
      ) {
        this.isHandmade = true;
        this.itemData.ids = this.selection.map((i: any) => i.id);
        // 判断费用类型
        if (
          this.selection
            .map((i: any) => i.feeType)
            .every((item: any) => item === "AgencyFee")
        ) {
          // 代理费批量红冲
          this.redVisble = true;
        } else if (
          this.selection
            .map((i: any) => i.feeType)
            .every((item: any) => item === "ServiceFee")
        ) {
          // 服务费批量红冲
          try {
            await this.$confirm("是否确定红冲?", "提示");
            const loading = this.$loading({
              lock: true,
              text: "红冲中, 请耐心等待...",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.6)",
              customClass: "invoice-loading-spinner",
            });
            const res = await post_invoice_handHCInvoicing({
              ids: this.itemData.ids,
            });
            this.$message.success(`服务费红冲成功${res}条`);
            loading.close();
            this.getListMixin();
          } catch (error) {
            console.log(error);
          }
        } else {
          this.$message.warning("请筛选一致的费用类型");
        }
      } else {
        this.$message.warning(
          "请勾选开票状态为已开票且开票类型为手工开票的数据"
        );
      }
    } else {
      this.$message.warning("请先勾选表格数据");
      return;
    }
  }
  private handleHand(row: any) {
    this.dialogVisible = true;
    this.itemData.data = { ...row };
  }
  /**
   * @description: 自动开票弹窗--批量
   */
  private handleAutoAll() {
    if (this.selection.length) {
      if (!this.selection.map((i: any) => i.status).includes("Done")) {
        this.itemData.ids = this.selection.map((i: any) => i.id);
        this.isAll = true;
        this.autoVisble = true;
      } else {
        this.$message.warning("请选择开票状态为未开票的数据");
      }
    } else {
      this.$message.warning("请先勾选表格数据");
      return;
    }
  }
  /**
   * @description: 自动开票弹窗--单条
   * @param {any} row
   */
  private handleAutoItem(row: any) {
    this.itemData.ids = [row.id];
    this.isAll = false;
    this.autoVisble = true;
  }
  private handleSelectionChange(val: any) {
    this.selection = val;
  }
  private search() {
    let flag = this.timeList && this.timeList.length;
    this.queryPageParameters.startTime = flag ? this.timeList[0] : null;
    this.queryPageParameters.endTime = flag ? this.timeList[1] : null;
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
  private reset() {
    Object.assign(this.queryPageParameters, {
      businessNo: null,
      endTime: null,
      feeType: null,
      invoiceTitle: null,
      operationType: null,
      startTime: null,
      status: null,
    });
    this.timeList = [];
  }
  async getListMixin() {
    this.resPageInfo = await post_invoice_getList(this.queryPageParameters);
  }

  created() {
    this.getListMixin();
  }
}
</script>

<style lang="scss">
.invoice-loading-spinner {
  .el-icon-loading,
  .el-loading-text {
    color: #fff;
  }
}
</style>
