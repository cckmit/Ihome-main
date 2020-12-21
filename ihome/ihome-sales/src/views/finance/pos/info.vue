<!--
 * @Description: POS机详情
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-19 08:39:59
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-21 10:24:47
-->
<template>
  <IhPage class="text-left">
    <template #info>
      <p class="ih-info-title">POS机信息</p>
      <el-form
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="收款账户">
              <span>{{info.accountName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="账号">{{info.accountNo}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="产品型号">{{info.productModel}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="序列号">{{info.serialNo}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态">{{$root.dictAllName(info.status, 'PosTerminalStatus')}}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template v-for="(i, n) in info.merchants">
        <p
          class="ih-info-title"
          :key="n"
        >{{$root.dictAllName(i.type, 'PosMerchantType')}}</p>
        <el-form
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          :key="n + i.type"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="商户号">{{i.merchantNo}}</el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="终端号">{{i.terminalNo}}</el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
      <p class="ih-info-title">使用信息</p>
      <el-form
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="当前保管人">{{info.holderName}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所在事业部">{{info.departmentName}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所在店组">{{info.groupName}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="联动项目">{{info.proName}}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <p class="ih-info-title">操作日志</p>
      <div class="padding-left-20">
        <el-table
          style="width: 100%"
          :data="info.records"
        >
          <el-table-column
            prop="operation"
            label="操作"
          >
            <template v-slot="{ row }">
              {{$root.dictAllName(row.operation, 'PosOperate')}}
            </template>
          </el-table-column>
          <el-table-column
            prop="operator"
            label="操作人"
          ></el-table-column>
          <el-table-column
            prop="operateTime"
            label="操作时间"
          ></el-table-column>
          <el-table-column
            prop="result"
            label="处理结果"
          ></el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
          ></el-table-column>
        </el-table>
      </div>
    </template>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { get_posTerminal_getDetail__id } from "../../../api/finance/index";

@Component({})
export default class POSInfo extends Vue {
  private info: any = {
    merchants: [],
    records: [],
  };

  private async getInfo() {
    let id = this.$route.query.id;
    if (id) {
      this.info = await get_posTerminal_getDetail__id({ id });
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
