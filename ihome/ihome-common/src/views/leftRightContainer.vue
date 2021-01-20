<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-12-14 16:49:17
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-14 16:56:35
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-24 10:49:12
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-14 11:17:01
-->
<!--
 * @Description: 数据字典列表
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-21 15:16:14
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-07 15:27:22
-->
<template>
  <IhPage ref="ihPage">
    <template #container>
      <h1>鼠标悬停分割线</h1>
      <el-row>
        <IhLeftRightContainer :leftHeight="pageHeight" :leftWidth="400">
          <template slot="left">
            <div>
              <ul>
                <li>左边</li>
                <li>111111</li>
                <li>222222</li>
                <li>333333</li>
                <li>444444</li>
                <li>555555</li>
                <li>666666</li>
              </ul>
            </div>
          </template>
          <template slot="right">
            <div>
              <ul>
                <li>右边</li>
                <li>111111</li>
                <li>222222</li>
                <li>333333</li>
                <li>444444</li>
                <li>555555</li>
                <li>666666</li>
              </ul>
            </div>
          </template>
        </IhLeftRightContainer>
      </el-row>
    </template>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class LeftRightContainerDemo extends Vue {}
</script>

<style lang="scss" scoped>
</style>