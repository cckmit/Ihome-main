<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-09 15:03:17
 * @LastEditors: zyc
 * @LastEditTime: 2020-07-09 16:39:24
--> 
<template>
  <div>
    <div>
      <el-select style="width:100%;" v-model="value" placeholder="请选择">
        <el-option
          v-for="(item,index) in options"
          :key="index"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <br />
    <div>
      <el-input clearable placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
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
import { getResourceCategory } from "../api/system";
import { DictionariesModule } from "../store/modules/dictionaries";
@Component({
  components: {}
})
export default class ResourcesRadio extends Vue {
  constructor() {
    super();
  }
  value: any = null;
  filterText: any = "";
  @Watch("filterText")
  filterTextWatch(val: any) {
    console.log(val);
    (this.$refs.tree as any).filter(val);
  }
  dataTree: any = [];
  defaultProps: any = {
    children: "children",
    label: "name"
  };
  filterNode(value: any, data: any) {
    if (!value) return true;
    return data[this.defaultProps.label].indexOf(value) !== -1;
  }
  currentChange(item: any) {
    console.log(item);
  }
  get options() {
    DictionariesModule.getModular();
    return DictionariesModule.modularAll;
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
