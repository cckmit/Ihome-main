<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-11-27 17:20:24
 * @LastEditors: wwq
 * @LastEditTime: 2020-11-30 11:54:44
-->
<template>
  <div>
    <p class="ih-info-title">甲方合同信息</p>
    <el-button
      size="small"
      type="success"
      style="
            display: inline-block;
            position: absolute;
            top: 25px;
            left: 145px;
          "
      @click="addFirstAgency"
    >从系统中选取合同</el-button>
    <el-button
      size="small"
      type="success"
      style="
            display: inline-block;
            position: absolute;
            top: 25px;
            left: 145px;
          "
      @click="addFirstAgency"
    >新增录入合同</el-button>
    <div class="padding-left-20">
      <el-table
        class="ih-table"
        :data="partyAData"
        style="width: 100%"
      >
        <el-table-column
          prop="agencyName"
          label="合同标题"
        ></el-table-column>
        <el-table-column
          prop="simpleName"
          label="甲方"
        ></el-table-column>
        <el-table-column
          prop="province"
          label="乙方"
        >
          <template v-slot="{ row }">{{
                $root.getAreaName(row.province)
              }}</template>
        </el-table-column>
        <el-table-column
          prop="city"
          label="执行时间"
        >
          <template v-slot="{ row }">{{
                $root.getAreaName(row.city)
              }}</template>
        </el-table-column>
        <el-table-column
          prop="city"
          label="合同跟进人"
        >
          <template v-slot="{ row }">{{
                $root.getAreaName(row.city)
              }}</template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120"
          fixed="right"
        >
          <template v-slot="{ $index }">
            <el-button
              size="small"
              @click="delFirstAgencyCompanys($index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <p class="ih-info-title">栋座归属信息</p>
    <el-button
      size="small"
      type="success"
      style="
            display: inline-block;
            position: absolute;
            top: 25px;
            left: 145px;
          "
      @click="addFirstAgency"
    >修改</el-button>
    <div class="padding-left-20">
      <el-table
        class="ih-table"
        :data="dongzuoData"
        style="width: 100%"
      >
        <el-table-column
          prop="agencyName"
          label="甲方名称"
        ></el-table-column>
        <el-table-column
          prop="province"
          label="项目栋座"
        >
          <template v-slot="{ row }">{{
                $root.getAreaName(row.province)
              }}</template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class PartyA extends Vue {
  partyAData = [];
  dongzuoData = [];
  addFirstAgency() {
    console.log();
  }
}
</script>