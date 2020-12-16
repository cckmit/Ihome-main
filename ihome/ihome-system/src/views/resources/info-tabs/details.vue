<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-07 15:42:42
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-16 14:59:12
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
          <el-col :span="6" class="ih-info-item-left">类型</el-col>
          <el-col :span="18" class="ih-info-item-right">{{
            $root.dictAllName(info.type, "ResourceType")
          }}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="ih-info-line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">URL</el-col>
          <el-col :span="18" class="ih-info-item-right">{{ info.url }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">ICON</el-col>
          <el-col :span="18" class="ih-info-item-right">{{ info.icon }}</el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">排序</el-col>
          <el-col :span="18" class="ih-info-item-right">{{ info.seq }}</el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="ih-info-line">
      <el-col :span="8">
        <el-row>
          <el-col :span="6" class="ih-info-item-left">父资源</el-col>
          <el-col :span="18" class="ih-info-item-right">{{
            info.parentCode
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
import { get_resource_get__id } from "../../../api/system/index";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class InfoDetails extends Vue {
  info: any = {};
  async created() {
    let id = this.$route.query.id;
    this.info = await get_resource_get__id({ id: id });
    console.log(this.info);
  }
}
</script>
<style lang="scss" scoped>
</style>
