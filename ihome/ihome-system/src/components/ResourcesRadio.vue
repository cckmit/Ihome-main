<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-09 15:03:17
 * @LastEditors: zyc
 * @LastEditTime: 2021-01-09 10:29:18
--> 
<template>
  <div>
    <div>
      <el-select
        style="width: 100%"
        @change="selectChange()"
        v-model="selectType"
        clearable
        placeholder="请选择"
      >
        <el-option
          v-for="item in $root.dictAllList('ResourceType', 'AllowAdjust')"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        ></el-option>
      </el-select>
    </div>
    <br />
    <div>
      <el-input
        clearable
        placeholder="输入关键字进行过滤"
        v-model="filterText"
      ></el-input>
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
        :expand-on-click-node="false"
        ref="tree"
      ></el-tree>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { get_resource_getAll } from "../api/system/index";
@Component({
  components: {},
})
export default class ResourcesRadio extends Vue {
  constructor() {
    super();
  }
  selectType: any = null;
  filterText: any = "";
  @Watch("filterText")
  filterTextWatch(val: any) {
    (this.$refs.tree as any).filter(val);
  }
  dataTree: any = [];
  defaultProps: any = {
    children: "children",
    label: "name",
  };
  selectChange() {
    (this.$refs.tree as any).filter(this.filterText);
  }
  filterNode(value: any, data: any) {
    value = value == "" ? null : value;
    let selectType = this.selectType == "" ? null : this.selectType;
    if (!value && !selectType) {
      return true;
    } else {
      if (value && selectType) {
        return (
          data[this.defaultProps.label].indexOf(value) !== -1 &&
          data.type.indexOf(selectType) !== -1
        );
      } else {
        if (value) {
          return data[this.defaultProps.label].indexOf(value) !== -1;
        } else {
          return data.type.indexOf(selectType) !== -1;
        }
      }
    }
  }
  currentChange(item: any) {
    this.$emit("select", item);
  }

  async created() {
    this.init();
    let ResourceType = (this as any).$root.dictAllList(
      "ResourceType",
      "AllowAdjust"
    );
    console.log(ResourceType);
  }
  async init() {
    const res = await get_resource_getAll();
    res.forEach((item: any) => {
      if (item.id == item.parentId) {
        item.parentId = 0;
      }
    });
    this.dataTree = this.$tool.listToGruop(res, { rootId: 0 });
  }
}
</script>
<style lang="scss" scoped>
</style>
