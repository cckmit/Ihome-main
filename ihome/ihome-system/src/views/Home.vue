<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 11:10:43
 * @LastEditors: zyc
 * @LastEditTime: 2021-01-26 10:45:21
--> 
<template>
  <div>
    <p>路由导航·管理后台</p>
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
    console.log(this.$roleTool.RHeadBusinessManagement());
    this.data = routes;
    let a1 = this.$math.add(0.1, 0.2);
    let a2 = this.$math.sub(0.1, 0.2);
    let a3 = this.$math.multi(0.1, 0.2);
    let a4 = this.$math.div(0.1, 0.2);
    let a5 = this.$math.tofixed(13.37, 1);
    let a6 = this.$math.addArr([0.1, 0.2, 0.3]);
    console.log(a1, a2, a3, a4, a5, a6);
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