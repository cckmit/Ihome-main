<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-09 14:31:23
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-09 17:54:59
--> 
<template>
  <div>
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
          <el-col :span="6" class="ih-info-item-left">创建人</el-col>
          <el-col :span="18" class="ih-info-item-right">{{
            info.createUserName
          }}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="ih-info-line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">创建时间</el-col>
          <el-col :span="18" class="ih-info-item-right">{{
            info.createTime
          }}</el-col>
        </el-row>
      </el-col>
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
import { Component, Vue } from "vue-property-decorator";
import { get_role_get__id } from "../../../api/system/index";
@Component({
  components: {},
})
export default class RoleInfoDetails extends Vue {
  info: any = {};
  async created() {
    let id = this.$route.query.id;
    this.info = await get_role_get__id({ id: id });
  }
}
</script>
<style lang="scss" scoped>
.el-row {
  line-height: 30px;
}
</style>
