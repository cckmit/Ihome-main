<!--
 * @Description: 开票详情
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-08 19:55:43
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-08 20:53:31
-->
<template>
  <IhPage class="text-left">
    <template v-slot:info>
      <p class="ih-info-title">开票信息</p>
      <el-form label-width="145px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="业务单号">QK-202012070001</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发票抬头">富力集团有限公司</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="费用类型">代理费</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="金额（含税）">5000</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="税额">5000</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="确认主营（不含税）">470000</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="开票类型">自动开票</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开票日期">2020-12-08</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发票类型">增值税专用发票（电子）</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="发票代码">发票代码</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="NC凭证号">NC凭证号</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款方">
              <span
                class="text-ellipsis"
                title=""
              >西藏保利爱家房地产经纪有限公司广州分公司</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="状态">状态</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="税率">6%</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="备注">备注备注备注</el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <p class="ih-info-title">发票信息</p>
      <div class="padding-left-20">
        <el-table style="width: 100%">
          <el-table-column
            prop="accountName"
            label="发票号码"
          ></el-table-column>
          <el-table-column
            prop="accountNo"
            label="金额（含税）"
          > </el-table-column>
          <el-table-column
            prop="branchName"
            label="确认主营（不含税）"
          ></el-table-column>
          <el-table-column
            prop="branchNo"
            label="税额"
          ></el-table-column>
          <el-table-column
            prop="accountType"
            label="发票类别"
          ></el-table-column>
          <el-table-column
            prop="accountType"
            label="航天开票流水号"
          ></el-table-column>
        </el-table>
      </div>
      <p class="ih-info-title">附件信息</p>
      <div class="margin-left-20">
        <IhUpload
          :file-list="fileList"
          size="100px"
        ></IhUpload>
      </div>
      <p class="ih-info-title">开票历史记录</p>
      <div class="padding-left-20">
        <el-table style="width: 100%">
          <el-table-column
            prop="accountName"
            label="开票时间"
            min-width="200"
          ></el-table-column>
          <el-table-column
            prop="accountNo"
            label="开票人"
            min-width="200"
          > </el-table-column>
          <el-table-column
            prop="branchName"
            label="操作"
          ></el-table-column>
          <el-table-column
            prop="branchNo"
            label="备注"
          ></el-table-column>
        </el-table>
        <br />
      </div>
      <div class="text-center">
        <el-button type="success">红冲</el-button>
      </div>
    </template>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class InvoiceInfo extends Vue {
  fileList: any = [];
}
</script>

<style lang="scss" scoped>
.text-ellipsis {
  display: inline-block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
