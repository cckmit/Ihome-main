<!--
 * @Description: POS机申领事项详情
 * @version: 
 * @Author: ywl
 * @Date: 2020-12-22 20:57:20
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-23 09:35:06
-->
<template>
  <IhPage class="text-left">
    <template #info>
      <p class="ih-info-title">POS机信息</p>
      <el-form label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="事项编号">xx</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请人">{{info.applyUser}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事项类别">{{$root.dictAllName(info.itemType, 'PosItemType')}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="状态">xx</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="立项周期">{{info.proId}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="事业部">{{info.departmentId}}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <p class="ih-info-title">POS机列表</p>
      <div class="padding-left-20">
        <el-table
          style="width: 100%"
          :data="info.posTerminals"
        >
          <el-table-column
            label="账户名称"
            prop="accountName"
            min-width="150"
          ></el-table-column>
          <el-table-column
            label="账号"
            prop="accountNo"
            min-width="130"
          ></el-table-column>
          <el-table-column
            label="产品型号"
            prop="productModel"
          ></el-table-column>
          <el-table-column
            label="序列号"
            prop="serialNo"
          ></el-table-column>
          <el-table-column
            label="状态"
            prop="status"
          >
            <template v-slot="{ row }">
              {{$root.dictAllName(row.status, 'PosTerminalStatus')}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <p class="ih-info-title">操作日志</p>
      <div class="padding-left-20">
        <el-table
          style="width: 100%"
          :data="info.records"
        >
          <el-table-column
            label="操作"
            prop="operation"
          >
            <template v-slot="{ row }">
              {{$root.dictAllName(row.operation, 'PosOperate')}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作人"
            prop="operator"
          ></el-table-column>
          <el-table-column
            label="操作时间"
            prop="operateTime"
          ></el-table-column>
          <el-table-column
            label="处理结果"
            prop="result"
          ></el-table-column>
          <el-table-column
            label="备注"
            prop="remark"
          ></el-table-column>
        </el-table>
      </div>
    </template>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { get_posApplyItem_getDetail__id } from "../../../api/finance/index";

@Component({})
export default class POSApplyInfo extends Vue {
  private info: any = {
    posTerminals: [],
    records: [],
  };

  private async getInfo() {
    let id = this.$route.query.id;
    if (id) {
      this.info = await get_posApplyItem_getDetail__id({ id });
    }
  }

  created() {
    this.getInfo();
  }
}
</script>
