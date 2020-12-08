<!--
 * @Description: 发票税率详情
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-02 18:21:19
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-02 18:43:04
-->
<template>
  <IhPage>
    <el-form
      label-width="130px"
      class="text-left"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="名称">
            {{form.companyName}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="纳税人识别号">
            {{form.taxpayerNo}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="地址">
            {{form.address}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="电话">
            {{form.phone}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="税率">
            {{form.taxRate}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="开票员">
            {{form.invoiceClerk}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收款员">
            {{form.cashier}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="复核人">
            {{form.checker}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目名称">
            {{form.itemName}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="项目单位">
            {{form.itemUnits}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品分类编码">
            {{form.categoryCode}}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="纳税人规模">
            {{$root.dictAllName(form.taxScale, 'TaxScale')}}
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { get_invoiceConfig_get__id } from "@/api/finance/index";

@Component({})
export default class InvoiceInfo extends Vue {
  private form: any = {};

  private async getInfo() {
    let id = this.$route.query.id;
    if (id) this.form = await get_invoiceConfig_get__id({ id });
  }

  created() {
    this.getInfo();
  }
}
</script>