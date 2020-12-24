<!--
 * @Description: 开票详情
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-08 19:55:43
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-24 14:09:12
-->
<template>
  <IhPage class="text-left">
    <template v-slot:info>
      <p class="ih-info-title">开票信息</p>
      <el-form label-width="145px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="业务单号">{{info.invoiceInfo.businessNo}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发票抬头">{{info.invoiceInfo.invoiceTitle}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="费用类型">{{$root.dictAllName(info.invoiceInfo.feeType, 'FeeType')}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="金额（含税）">{{info.invoiceInfo.amount}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="税额">{{info.invoiceInfo.tax}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="确认主营（不含税）">{{info.invoiceInfo.noTax}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="开票类型">{{$root.dictAllName(info.invoiceInfo.operationType, 'InvoiceOperationType')}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开票日期">{{info.invoiceInfo.operationDate}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发票类型">{{$root.dictAllName(info.invoiceInfo.invoiceType, 'InvoiceType')}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="税率">{{info.invoiceInfo.taxRate}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="NC凭证号">{{info.invoiceInfo.ncCode}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款方">
              <span
                class="text-ellipsis"
                :title="info.invoiceInfo.payee"
              >{{info.invoiceInfo.payee}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="状态">{{$root.dictAllName(info.invoiceInfo.status, 'InvoiceOperationStatus')}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="备注">{{info.invoiceInfo.remark}}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <p class="ih-info-title">发票信息</p>
      <div class="padding-left-20">
        <el-table
          style="width: 100%"
          :data="info.invoiceBillInfos"
        >
          <el-table-column
            prop="invoiceNo"
            label="发票号码"
          ></el-table-column>
          <el-table-column
            label="发票代码"
            prop="invoiceCode"
            width="120"
          ></el-table-column>
          <el-table-column
            prop="amount"
            label="金额（含税）"
            width="110"
          > </el-table-column>
          <el-table-column
            prop="noTax"
            label="确认主营（不含税）"
            width="155"
          ></el-table-column>
          <el-table-column
            prop="tax"
            label="税额"
          ></el-table-column>
          <el-table-column
            prop="invoiceType"
            label="发票类别"
          >
            <template v-slot="{ row }">
              {{row.invoiceType == 1 ? '正票' : '红票'}}
            </template>
          </el-table-column>
          <el-table-column
            prop="serialNo"
            label="航天开票流水号"
            min-width="265"
          ></el-table-column>
        </el-table>
      </div>
      <p class="ih-info-title">附件信息</p>
      <div class="margin-left-20">
        <IhUpload
          :file-list="fileList"
          size="100px"
          :upload-show="!!fileList.length"
          :limit="fileList.length"
          v-if="fileList.length"
          :removePermi="false"
        ></IhUpload>
      </div>
      <p class="ih-info-title">开票历史记录</p>
      <div class="padding-left-20">
        <el-table
          style="width: 100%"
          :data="info.invoiceRecords"
        >
          <el-table-column
            prop="operateTime"
            label="开票时间"
          ></el-table-column>
          <el-table-column
            prop="operatorName"
            label="开票人"
          > </el-table-column>
          <el-table-column
            prop="operation"
            label="操作"
          >
            <template v-slot="{ row }">
              {{$root.dictAllName(row.operation, 'InvoiceOperation')}}
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            min-width="200"
          ></el-table-column>
        </el-table>
        <br />
      </div>
      <div class="text-center">
        <el-button
          type="danger"
          @click="handHInvoice(info.invoiceInfo.feeType)"
        >红冲</el-button>
      </div>
    </template>
    <!-- 弹窗 -->
    <IhDialog :show="redVisble">
      <RedDashed
        :data="itemData"
        :isHandmade="isHandmade"
        @cancel="() => (redVisble = false)"
        @finish="() => {
          redVisble = false;
          $goto('/invoice/list');
        }"
      />
    </IhDialog>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RedDashed from "./dialog/redDashed.vue";
import {
  get_invoice_get__id,
  post_invoice_handHCInvoicing,
  post_invoice_autoHCInvoicing,
  post_invoice_downloadFile,
} from "../../../api/finance/index";

@Component({
  components: { RedDashed },
})
export default class InvoiceInfo extends Vue {
  fileList: any = [];
  private info: any = {
    invoiceBillInfos: [],
    invoiceInfo: {},
    invoiceRecords: [],
    attachmentVOs: [],
  };
  private isHandmade = true;
  private redVisble = false;
  private itemData: any = {
    ids: [],
  };

  private async getInfo() {
    let id = this.$route.query.id;
    if (id) {
      await post_invoice_downloadFile({ ids: [id] });
      this.info = await get_invoice_get__id({ id });
      this.fileList = this.info.attachmentVOs.map((i: any) => ({
        fileId: i.fileId,
        name: i.fileName,
      }));
    }
  }
  private async handHInvoice(type: any) {
    let flag = this.info.invoiceInfo.operationType === "Auto";
    flag ? (this.isHandmade = false) : (this.isHandmade = true);
    if (type === "ServiceFee") {
      try {
        await this.$confirm("是否确定红冲?", "提示");
        !flag
          ? await post_invoice_handHCInvoicing({
              ids: [this.info.invoiceInfo.id],
            })
          : await post_invoice_autoHCInvoicing({
              ids: [this.info.invoiceInfo.id],
            });
        this.$message.success("红冲成功");
        this.$goto("/invoice/list");
      } catch (error) {
        console.log(error);
      }
    } else {
      this.itemData.ids = [this.info.invoiceInfo.id];
      this.redVisble = true;
    }
  }

  created() {
    this.getInfo();
  }
}
</script>

<style lang="scss" scoped>
.text-ellipsis {
  display: block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
