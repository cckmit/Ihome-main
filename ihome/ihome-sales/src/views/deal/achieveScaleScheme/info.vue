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
      label-width="140px"
      class="demo-ruleForm">
      <el-row>
        <el-col :span="6">
          <el-form-item label="业务模式">{{$root.dictAllName(infoForm.modelCode, 'BusinessModel')}}</el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="合同类型">{{$root.dictAllName(infoForm.contType, 'ContType')}}</el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否市场化项目">
            {{infoForm.isMarketProject === 'Yes' ? "是" : "否"}}
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="分销与总包一致">
            {{infoForm.isSame === 'Yes' ? "是" : "否"}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="物业类型">{{infoForm.achievePropertyTypeStr}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否特殊方案">
            {{infoForm.isSpecial === 'Yes' ? "是" : "否"}}
          </el-form-item>
        </el-col>
        <el-col class="tag-wrapper" :span="24" v-if="infoForm.isSpecial === 'Yes'">
          <el-form-item label="关联项目">
            <el-tag
              v-for="item in infoForm.projects"
              :key="item.termId">
              {{item.termName}}
            </el-tag>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注说明">{{infoForm.remarks}}</el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row style="padding-left: 20px">
      <el-col>
        <el-table
          class="ih-table"
          :data="infoForm.achieveScaleConfigList">
          <el-table-column prop="type" label="类别" min-width="120"></el-table-column>
          <el-table-column prop="role" label="角色" min-width="120"></el-table-column>
          <el-table-column prop="ratio" label="拆分比例 (%)" min-width="120"></el-table-column>
          <el-table-column prop="missingRole" label="角色缺失处理方式" min-width="120"></el-table-column>
          <el-table-column prop="remarks" label="备注" min-width="150"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </ih-page>
</template>
<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {get_achieveScaleScheme_get__id} from "@/api/deal";

  @Component({})
  export default class AchieveScaleSchemeInfo extends Vue {
    infoForm: any = {
      modelId: null,
      contType: null,
      isMarketProject: null,
      isSame: null,
      remarks: null,
      achievePropertyTypeStr: null, // 物业类型
      achieveProjectList: [], // 关联项目
      achieveScaleConfigList: [], // 业绩比例配置
      projects: [] // 关联的项目
    };

    async created() {
      let id = this.$route.query.id;
      if (id) {
        this.infoForm = await get_achieveScaleScheme_get__id({id: id});
        let propertyList = (this as any).$root.dictAllList('Property'); // 物业类型
        // 处理数据
        // 物业类型
        if (this.infoForm.achievePropertyTypeList && this.infoForm.achievePropertyTypeList.length > 0) {
          let achieveNameArr: any = [];
          this.infoForm.achievePropertyTypeList.forEach((list: any) => {
            if (propertyList && propertyList.length > 0) {
              propertyList.forEach((propertyItem: any) => {
                if (list.propertyType === propertyItem.code) {
                  achieveNameArr.push(propertyItem.name);
                }
              })
            }
          })
          if (achieveNameArr.length > 0) {
            this.infoForm.achievePropertyTypeStr = achieveNameArr.join('，');
          } else {
            this.infoForm.achievePropertyTypeStr = "";
          }
        }
        // 业绩比例配置
        if (this.infoForm.achieveScaleConfigList && this.infoForm.achieveScaleConfigList.length > 0) {
          let roleList = (this as any).$root.dictAllList('DealRole');
          this.infoForm.achieveScaleConfigList.forEach((list: any) => {
            // 类别
            if (list.type) {
              list.type = list.type === "TotalBag" ? "总包" : "分销";
            }
            // 角色
            if (list.role) {
              if (roleList && roleList.length > 0) {
                roleList.forEach((roleItem: any) => {
                  if (roleItem.code === list.role) {
                    list.role = roleItem.name;
                  }
                })
              } else {
                list.role = "";
              }
            }
            // 角色缺失处理方式
            if (list.missingRole) {
              if (roleList && roleList.length > 0) {
                roleList.forEach((roleItem: any) => {
                  if (roleItem.code === list.missingRole) {
                    list.missingRole = `计入${roleItem.name}业绩`;
                  }
                })
              } else {
                list.missingRole = "";
              }
            }
          })
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .tag-wrapper {
    /deep/.el-tag {
      margin-right: 10px;
    }
  }
</style>
