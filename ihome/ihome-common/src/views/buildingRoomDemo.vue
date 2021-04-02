<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2021-04-02 15:38:34
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-02 15:38:35
-->
<template>
  <div class="cascaderDemo">
    <el-form label-width="80px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="栋座房号">
            <IhBuildingRoom
              v-model="test"
              :proId="proId"
              @change="handleChange"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class CascaderDemo extends Vue {
  private test = [];
  proId: any = "8097";

  handleChange(v: any) {
    console.log(v);
    console.log(this.test, "test");
  }
}
</script>
<style lang="scss" scoped>
</style>