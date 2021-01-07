<!--
 * @Description: 发起请佣申请页
 * @version: 
 * @Author: ywl
 * @Date: 2021-01-07 16:30:03
 * @LastEditors: ywl
 * @LastEditTime: 2021-01-07 20:44:48
-->
<template>
  <IhPage class="text-left">
    <template #info>
      <p class="ih-info-title">请款申请单信息</p>
      <el-form
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="请款申请单号">
              <el-input
                placeholder="保存后自动生成"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="甲方公司">
              <IhSelectPageByDeveloper
                v-model="form.developId"
                placeholder="请选择甲方"
                clearable
              ></IhSelectPageByDeveloper>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款公司">
              <IhSelectPageByCompany
                v-model="form.polyCompanyId"
                clearable
                placeholder="请选择乙方"
              ></IhSelectPageByCompany>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款账号">
              <el-select
                v-model="form.xx"
                class="width--100"
                placeholder="请选择收款账号"
              ></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开票税率">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请人">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请日期">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <p class="ih-info-title">
        <span>待请款列表</span>
        <el-button
          type="primary"
          class="add-account"
          size="small"
        >添加成交报告</el-button>
      </p>
      <div class="padding-left-20">
        <el-table style="width: 100%">
          <el-table-column
            prop="accountName"
            label="成交报告编号"
          ></el-table-column>
          <el-table-column
            prop="accountName"
            label="成交单位"
          ></el-table-column>
          <el-table-column
            prop="accountName"
            label="成交面积"
          ></el-table-column>
          <el-table-column
            prop="accountName"
            label="合同类型"
          ></el-table-column>
          <el-table-column
            prop="accountName"
            label="认购日期"
          ></el-table-column>
          <el-table-column
            prop="accountName"
            label="签约日期"
          ></el-table-column>
          <el-table-column label="提佣金额"></el-table-column>
          <el-table-column label="本次请款金额"></el-table-column>
          <el-table-column label="本次扣除金额"></el-table-column>
          <el-table-column label="本次实际请款金额"></el-table-column>
          <el-table-column label="客户姓名"></el-table-column>
          <el-table-column label="签约类型"></el-table-column>
          <el-table-column label="合同编号"></el-table-column>
          <el-table-column label="签约总价/元"></el-table-column>
          <el-table-column label="中介公司"></el-table-column>
          <el-table-column label="是否已达到请佣条件"></el-table-column>
          <el-table-column label="代理公司"></el-table-column>
          <el-table-column label="中介业务员"></el-table-column>
          <el-table-column label="项目现场销售"></el-table-column>
          <el-table-column label="备注"></el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="80"
          >
            <template v-slot="{}">
              <el-link type="danger">移除</el-link>
            </template>
          </el-table-column>
        </el-table>
        <table
          class="apply-table"
          style="width: 100%"
        >
          <tr>
            <th colspan="8">合计</th>
          </tr>
          <tr>
            <td class="width-150">本批未提金额</td>
            <td>0</td>
            <td class="width-150">本批申请请款金额</td>
            <td>0</td>
            <td class="width-150">本批扣除金额</td>
            <td>0</td>
            <td class="width-150">本批实际请款金额</td>
            <td>0</td>
          </tr>
        </table>
      </div>
    </template>
    <IhDialog :show="selectVisible">
      <SelectDeal />
    </IhDialog>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SelectDeal from "./dialog/selectDeal.vue";

@Component({
  components: { SelectDeal },
})
export default class ApplyRecAdd extends Vue {
  private form: any = {
    polyCompanyId: null,
    developId: null,
  };
  private selectVisible = false;
}
</script>

<style lang="scss" scoped>
.ih-info-title {
  position: relative;
  .add-account {
    position: absolute;
    top: 0px;
    left: 120px;
    transform: translate(0, -30%);
  }
}
.apply-table {
  border-collapse: collapse;
  &,
  th,
  td {
    border: 1px solid #ebeef5;
  }
  th,
  td {
    padding: 10px 0;
    text-align: center;
  }
}
</style>
