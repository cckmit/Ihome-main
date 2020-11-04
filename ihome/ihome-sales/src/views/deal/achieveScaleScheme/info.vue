<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-10-30 17:06:35
 * @LastEditors: lsj
 * @LastEditTime: 2020-10-30 17:16:35
-->
<template>
  <ih-page class="text-left">
    <p class="ih-info-title">业绩比例详情</p>
    <el-form
      :model="infoForm"
      ref="ruleForm"
      label-width="140px"
      class="demo-ruleForm">
      <el-row>
        <el-col :span="6">
          <el-form-item label="业务模式">{{infoForm.modelName}}</el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="合同类型">{{infoForm.contType}}</el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否市场化项目">{{infoForm.isMarketProject}}</el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="分销同步总包">{{infoForm.isSame}}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="物业类型">{{infoForm.achievePropertyTypeList}}</el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="关联项目">
            <el-tag
              v-for="tag in infoForm.achieveProjectList"
              :key="tag.name">
              {{tag.name}}
            </el-tag>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注说明">{{infoForm.remarks}}</el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      style="padding-left: 20px"
      class="ih-table"
      :data="infoList">
      <el-table-column
        prop="modelName"
        label="类别"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="角色"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="拆分比例 (%)"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="角色缺失处理方式"
        min-width="120"
      ></el-table-column>
      <el-table-column
        prop="contType"
        label="备注"
        min-width="150"
      ></el-table-column>
    </el-table>
  </ih-page>
</template>
<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {get_achieveScaleScheme_get__id} from "@/api/deal";

  @Component({})
  export default class AchieveScaleSchemeInfo extends Vue {
    infoForm: any = {};
    infoList: any = [];

    async created() {
      let id = this.$route.query.id;
      if (id) {
        this.infoForm = await get_achieveScaleScheme_get__id({id: id});
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
