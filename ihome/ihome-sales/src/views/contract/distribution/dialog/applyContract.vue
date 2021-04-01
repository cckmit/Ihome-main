<!--
 * @Description: 分销合同模板弹窗
 * @version: 
 * @Author: ywl
 * @Date: 2020-10-30 09:53:42
 * @LastEditors: ywl
 * @LastEditTime: 2021-04-01 14:37:01
-->
<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="75%"
    title="申领渠道合同"
    class="text-left"
    top="5vh"
  >
    <el-form label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="周期">
            <el-input
              v-model="queryPageParameters.provinceName"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同主标题">
            <el-input
              v-model="queryPageParameters.provinceName"
              placeholder="请输入关键字"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="渠道合同类型">
            <el-input
              v-model="queryPageParameters.provinceName"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="margin-left-100">
      <el-button type="primary">查询</el-button>
      <el-button type="info">重置</el-button>
    </div>
    <br />
    <el-table
      :data="resInfo"
      max-height="50vh"
    >
      <el-table-column
        label="合同类型"
        prop="contractTitle"
      ></el-table-column>
      <el-table-column
        label="合同主标题"
        prop="partyCompany"
        min-width="150"
      ></el-table-column>
      <el-table-column label="甲方公司"></el-table-column>
      <el-table-column
        label="是否垫佣"
        prop="padCommissionEnum"
      >
        <template v-slot="{ row }">
          {{$root.dictAllName(row.padCommissionEnum, 'PadCommission')}}
        </template>
      </el-table-column>
      <el-table-column
        label="渠道类型"
        prop="channelEnum"
      >
        <template v-slot="{ row }">
          {{$root.dictAllName(row.channelEnum, 'Channel')}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        width="80"
      >
        <template v-slot="{ }">
          <el-link type="primary">查看</el-link>
          <el-link type="success">预览</el-link>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <el-button @click="cancel()">取消</el-button>
      <el-button type="primary">下一步</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class ApplyContract extends Vue {
  @Prop() data!: any;
  queryPageParameters: any = {};
  private dialogVisible = true;

  private resInfo: any = [];

  cancel() {
    this.$emit("cancel", false);
  }
  handleOption(row: any) {
    this.$emit("finish", row);
  }
}
</script>
