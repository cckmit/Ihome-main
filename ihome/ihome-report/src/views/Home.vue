<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 11:10:43
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-19 10:08:16
--> 
<template>
  <div>
    <p>路由导航·报表</p>
    <div>
      <el-tree
        :default-expand-all="true"
        :data="data"
        :props="defaultProps"
        @node-click="handleNodeClick"
      ></el-tree>
    </div>
  </div>
</template>
<script lang="ts">
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
    this.data = routes;

    // let countChildren = 0;
    // routes.forEach((item: any) => {
    //   if (item.children && item.children.length > 0) {
    //     countChildren += item.children.length;
    //   }
    // });
    // console.log(`二级路由:${countChildren}`);
  }
  handleNodeClick(data: any) {
    // console.log(data);
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