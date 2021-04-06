<!--
 * @Description: 非标联动销售确认书(启动函)申领
 * @version: 
 * @Author: ywl
 * @Date: 2021-04-01 17:49:15
 * @LastEditors: ywl
 * @LastEditTime: 2021-04-06 14:52:43
-->
<template>
  <IhPage class="text-left">
    <template #info>
      <p class="ih-info-title">非标联动销售确认书(启动函)申领</p>
      <el-form
        label-width="100px"
        class="padding-left-20"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="合同类型">非标联动销售确认书</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="合同标题">合同主标题</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称">项目名称</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="甲方公司">甲方公司</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方公司">乙方公司</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方渠道等级">乙方渠道等级</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合作期限">
              2020-09-01 -- 2020-09-30
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="合同跟进人">
              合同跟进人
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="合同电子版">
              <el-button type="success">预览电子版</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class NotSalesApply extends Vue {}
</script>

<style lang="scss" scoped>
.formItem {
  /deep/ .el-form-item__label {
    line-height: 20px;
  }
}
</style>
