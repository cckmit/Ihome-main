<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-14 10:49:41
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-08 09:10:55
--> 
<template>
  <div>
    <p class="ih-info-title">岗位信息</p>
    <el-row class="ih-info-line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">名称</el-col>
          <el-col :span="18" class="ih-info-item-right">{{ info.name }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">编码</el-col>
          <el-col :span="18" class="ih-info-item-right">{{ info.code }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">数据权限</el-col>
          <el-col :span="18" class="ih-info-item-right">
            {{ $root.dictAllName(info.dataLimit, "DataLimit") }}</el-col
          >
        </el-row>
      </el-col>
    </el-row>
    <el-row class="ih-info-line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">描述</el-col>
          <el-col :span="18" class="ih-info-item-right">{{
            info.remark
          }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">创建人</el-col>
          <el-col :span="18" class="ih-info-item-right">{{
            info.createUserName
          }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">创建时间</el-col>
          <el-col :span="18" class="ih-info-item-right">{{
            info.createTime
          }}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="ih-info-line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">修改人</el-col>
          <el-col :span="18" class="ih-info-item-right">{{
            info.updateUserName
          }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">修改时间</el-col>
          <el-col :span="18" class="ih-info-item-right">{{
            info.updateTime
          }}</el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { get_job_get__id } from "../../../api/system/index";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class JobInfoDetails extends Vue {
  info = {};
  async created() {
    let id = this.$route.query.id;
    this.info = await get_job_get__id({ id: id });
  }
}
</script>
<style lang="scss" scoped>
</style>
