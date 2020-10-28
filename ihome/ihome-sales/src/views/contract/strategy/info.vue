<!--
 * @Description: 甲方/中介战略协议详情页
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-27 14:41:06
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-28 16:05:55
-->
<template>
  <IhPage class="text-left">
    <template #info>
      <p class="ih-info-title">基础信息</p>
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="padding-left-30"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="标题">
              {{ruleForm.title}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="甲方">
              {{ruleForm.partyA}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方">
              {{ruleForm.partyB}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="协议时间">
              {{ruleForm.beginTime}} 至 {{ruleForm.endTime}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="协议编号">
              {{ruleForm.strategyCode}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="归档编号">
              {{ruleForm.fileCode}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="归档状态">
              <el-select
                v-model="ruleForm.fileState"
                placeholder="归档状态"
                clearable
                class="width--100"
                disabled
              ></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="当前状态">
              <el-select
                v-model="ruleForm.state"
                placeholder="当前状态"
                clearable
                class="width--100"
                disabled
              ></el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="未盖章扫描件">
              <IhUpload
                :file-list="fileList"
                size="100px"
                :limit="1"
              ></IhUpload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="盖章版归档">
              <IhUpload
                :file-list="fileList2"
                size="100px"
                :limit="1"
              ></IhUpload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { get_strategy_detail__id } from "@/api/contract/index";

@Component({})
export default class StrategyDetail extends Vue {
  private ruleForm: any = {};
  private fileList: Array<object> = [];
  private fileList2: Array<object> = [];

  private async getInfo(): Promise<void> {
    let id = this.$route.query.id;
    if (id) {
      this.ruleForm = await get_strategy_detail__id({ id: id });
    }
  }

  created() {
    this.getInfo();
  }
}
</script>
