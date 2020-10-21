<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 11:10:43
 * @LastEditors: zyc
 * @LastEditTime: 2020-10-21 14:35:29
--> 

<template>
  <div>
    <p>路由导航·新房业务系统</p>
    <el-tree
      :default-expand-all="true"
      :data="data"
      :props="defaultProps"
      @node-click="handleNodeClick"
    ></el-tree>
  </div>
</template>
<script lang="ts">
/* eslint-disable  @typescript-eslint/no-unused-vars */
import { Component, Vue } from "vue-property-decorator";
import { routes } from "../router/index";
@Component({
  components: {},
})
export default class Home extends Vue {
  private data: any = [];
  defaultProps: any = {
    children: "children",
    label: "path",
  };
  created() {
    console.log(routes);
    this.data = routes;
    let list = (this.$root as any).dictAllList("AccountEnum"); //获取字典列表：参数是类别的key
    let dicName = (this.$root as any).dictAllName("Base", "AccountEnum"); //获取某个字典下根据code获取该数据项：第一个参数是code，第二个参数是类别的key

    let areaName = (this.$root as any).getAreaName("440000000000"); //根据行政区code获取name
    let area = (this.$root as any).getArea("440000000000"); //根据行政区code获取该项数据

    // console.log("后端给全部字典数据的用法列子看这里", list, item);
    // console.log("省市区获取名称看这里", areaName, area);
  }
  handleNodeClick(data: any) {
    console.log(data);
    if (!data.children) {
      this.$router.push({
        name: data.name,
      });
    }
  }
}
</script>
<style lang="scss" scoped>
</style>