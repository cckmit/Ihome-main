<!--
 * @Description: 非标渠道分销合同申领
 * @version: 
 * @Author: ywl
 * @Date: 2021-04-01 18:11:20
 * @LastEditors: ywl
 * @LastEditTime: 2021-04-02 15:48:17
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
            <el-form-item label="乙方账户名">乙方账户名</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="乙方账号">乙方账号</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="乙方开户行">乙方开户行</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="合作期限">
              2020-09-01 -- 2020-09-30
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同跟进人">
              合同跟进人
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="渠道类型">
              大型中介/一级平台
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="代理费是否垫佣"
              class="formItem"
            >
              1个月＜回款周期≤3个月
            </el-form-item>
          </el-col>
        </el-row>
        <div>
          <el-table>
            <el-table-column
              label="物业类型"
              prop="fileCode"
            ></el-table-column>
            <el-table-column
              label="佣金分类"
              prop="fileCode"
              min-width="200"
            ></el-table-column>
            <el-table-column
              label="条件"
              prop="fileCode"
            ></el-table-column>
            <el-table-column
              label="派发佣金标准"
              prop="fileCode"
            ></el-table-column>
          </el-table>
          <br />
        </div>
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
export default class NotChannelApply extends Vue {}
</script>

<style lang="scss" scoped>
.formItem {
  /deep/ .el-form-item__label {
    line-height: 20px;
  }
}
</style>
