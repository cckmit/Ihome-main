<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-08 14:23:49
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-08 14:48:13
--> 
<template>
  <div>
    <div style="text-align: left;">
      <el-input style="width:300px;" clearable placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
    </div>
    <br />

    <div>
      <el-tree
        class="filter-tree"
        :data="dataTree"
        :props="defaultProps"
        :default-expand-all="true"
        :filter-node-method="filterNode"
        :highlight-current="true"
        node-key="id"
        @current-change="currentChange"
        ref="tree"
      ></el-tree>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { getResourceCategory } from "../../../api/system";
@Component({
  components: {}
})
export default class UserResources extends Vue {
  filterText: any = "";
  dataTree: any = [];
  defaultProps: any = {
    children: "children",
    label: "name"
  };
  @Watch("filterText")
  filterTextWatch(val: any) {
    console.log(val);
    (this.$refs.tree as any).filter(val);
  }
  filterNode(value: any, data: any) {
    if (!value) return true;
    return data[this.defaultProps.label].indexOf(value) !== -1;
  }

  currentChange(item: any) {
    console.log(item);
  }
  async created() {
    const res: any = await getResourceCategory();
    console.log(res);
    this.dataTree = this.$tool.listToGruop(res, { rootId: 0 });
  }
}
</script>
<style lang="scss" scoped>
</style>
