<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-08 14:23:49
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-13 11:12:58
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
import { get_resource_getAll } from "../../../api/system/index";
@Component({
  components: {},
})
export default class UserResources extends Vue {
  filterText: any = "";
  dataTree: any = [];
  defaultProps: any = {
    children: "children",
    label: "name",
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
    const res: any = await get_resource_getAll();
    console.log(res);
    if (res && res.length > 0) {
      res[0].parentId = 0;
    }
    this.dataTree = this.$tool.listToGruop(res, { rootId: 0 });
  }
}
</script>
<style lang="scss" scoped>
</style>
