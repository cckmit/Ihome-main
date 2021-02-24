<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-06-22 11:10:43
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-24 17:10:23
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
    this.data = routes;
    let a1 = this.$math.add(0.1, 0.2);
    let a2 = this.$math.sub(0.1, 0.2);
    let a3 = this.$math.multi(0.1, 0.2);
    let a4 = this.$math.div(0.1, 0.2);
    let a6 = this.$math.addArr([0.1, 0.2, 0.3]);
    let a7 = this.$math.div(10, 2);
    console.log(a1, a2, a3, a4, a6, a7);
    let b1 = this.$math.tofixed(-0.0564, 2);
      let b5 = this.$math.tofixed(-0.005, 2);
    let b2 = this.$math.tofixed(13.37, 1);
    let b3 = this.$math.tofixed(1.335, 2);
    let b4 = this.$math.tofixed(-1.355, 2);
  
    console.log(b1, b2, b3, b4, b5);
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