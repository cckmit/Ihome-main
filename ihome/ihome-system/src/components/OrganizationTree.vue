<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-08-04 15:23:09
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-30 11:27:29
--> 
<template>
  <div class="OrganizationTree">
    <div class="text-left">
      <el-checkbox
        @change="selectChange"
        v-model="selectType"
        label="仅查询有效的组织"
        border
      ></el-checkbox>
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
        style="width: 100%"
        class="filter-tree"
        :expand-on-click-node="false"
        :data="dataTree"
        :props="defaultProps"
        :default-expand-all="false"
        :default-expanded-keys="defaultExpandedKeys"
        :filter-node-method="filterNode"
        :highlight-current="true"
        node-key="id"
        :show-checkbox="false"
        @current-change="currentChange"
        ref="tree"
      >
        <span :class="getInvalid(node)" slot-scope="{ node }">
          <span class="left" :title="node.label">{{ node.label }}</span>
          <span class="right">
            <el-button
              style="float: right"
              type="text"
              size="mini"
              @click="edit(node)"
              >编辑</el-button
            >
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { get_org_getAll } from "../api/system/index";

@Component({
  components: {},
})
export default class OrganizationTree extends Vue {
  constructor() {
    super();
  }
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  selectType = false;
  value: any = null;
  filterText: any = null;
  defaultExpandedKeys: any[] = [];

  list: any = [];
  mapList: any = new Map();
  getInvalid(node: any) {
    let status = this.mapList.get(node.key).status;
    if (status == "Valid") {
      return `el-tree-node__label`;
    } else {
      return "el-tree-node__label invalid";
    }

    // let item = null;
    // for (let index = 0; index < this.list.length; index++) {
    //   const element = this.list[index];
    //   if (node.key == element.id) {
    //     item = element;
    //     break;
    //   }
    // }
    // if (item && item.status == "Valid") {
    //   return `el-tree-node__label`;
    // } else {
    //   return "el-tree-node__label invalid";
    // }
  }

  edit(node: any) {
    this.$emit("edit", node);
  }
  dataTree: any = [];
  defaultProps: any = {
    children: "children",
    label: "name",
  };
  @Watch("filterText")
  filterTextWatch(val: string) {
    (this.$refs.tree as any).filter(val);
  }
  selectChange() {
    (this.$refs.tree as any).filter(this.filterText, this.selectType);
  }
  filterNode(value: string, data: any) {
    if (!value && !this.selectType) {
      return true;
    } else {
      if (value && this.selectType) {
        return (
          data[this.defaultProps.label].indexOf(value) !== -1 &&
          data.status == (this.selectType ? "Valid" : "Invalid")
        );
      } else {
        if (value) {
          return data[this.defaultProps.label].indexOf(value) !== -1;
        } else {
          return data.status == (this.selectType ? "Valid" : "Invalid");
        }
      }
    }
  }
  currentChange(item: any) {
    this.$emit("select", item);
  }
  async init() {
    const res: any = await get_org_getAll({ onlyValid: false });
    this.list = res;
    if (res && res.length > 0) {
      res[0].parentId = 0;
      this.defaultExpandedKeys = [res[0].id];
    }
    let map = new Map();
    for (let index = 0; index < this.list.length; index++) {
      const element = this.list[index];

      map.set(element.id, element);
    }
    this.mapList = map;
    this.dataTree = this.$tool.listToGruop(res, { rootId: 0 });
    this.$nextTick(() => {
      this.selectType = true;
      this.selectChange();
    });
  }

  async created() {
    this.init();
  }
}
</script>
<style lang="scss" >
.OrganizationTree {
  width: 100%;
  min-width: 350px;
  .right {
    display: none;
  }
  .is-current > * > * > .right {
    // display: block;
    display: none;
  }
  .invalid {
    color: red;
    text-decoration: line-through;
  }
  .el-tree-node__label {
    width: 100%;
    display: flex;
    line-height: 30px;
  }
  .el-tree-node__label > .left {
    flex: 1;
    text-align: left;
    line-height: 30px;
  }
  .el-tree-node__label > .right {
    width: 40px;
    text-align: right;
    margin-right: 5px;

    line-height: 30px;
  }
}
</style>
