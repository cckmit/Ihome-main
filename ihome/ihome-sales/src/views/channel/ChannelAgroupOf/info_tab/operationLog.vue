<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-05-25 09:37:07
 * @LastEditors: lgf
 * @LastEditTime: 2020-09-25 17:20:08
--> 
<template>
  <div>
    <el-table :data="resPageInfo.list" border style="width: 100%">
      <el-table-column prop="date" label="操作"></el-table-column>
      <el-table-column prop="name" label="处理人"></el-table-column>
      <el-table-column prop="address" label="处理时间"></el-table-column>
      <el-table-column
        prop="address"
        label="处理结果"
        width="100"
      ></el-table-column>
      <el-table-column prop="note" label="备注"></el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class Home extends Vue {
  resPageInfo: any = {
    total: 0,
    list: [
      {
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄",
        note: "通过",
      },
      {
        date: "2016-05-04",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1517 弄",
        note: "通过",
      },
      {
        date: "2016-05-01",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1519 弄",
        note: "通过",
      },
      {
        date: "2016-05-03",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1516 弄",
        note: "通过",
      },
    ],
  };
}
</script>
<style lang="scss" scoped>
</style>
