<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-08-04 15:23:09
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-11 18:02:23
--> 
<template>
  <div class="OrganizationTree">
    <div class="text-left">
      <el-checkbox @change="selectChange" v-model="selectType" label="仅查询有效的组织" border></el-checkbox>
    </div>
    <br />
    <div>
      <el-input clearable placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
    </div>
    <br />
    <div>
      <el-tree
        class="filter-tree"
        :expand-on-click-node="false"
        :data="dataTree"
        :props="defaultProps"
        :default-expand-all="true"
        :filter-node-method="filterNode"
        :highlight-current="true"
        node-key="id"
        :show-checkbox="false"
        @current-change="currentChange"
        ref="tree"
      >
        <span :class="getInvalid(node)" slot-scope="{ node  }">
          <span class="left">{{ node.label }}</span>
          <span class="right">
            <el-button style="float:right;" type="text" size="mini" @click="edit(node)">编辑</el-button>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { get_org_getAll } from "../api/system/index";
import { DictionariesModule } from "../store/modules/dictionaries";
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
  @Watch("filterText")
  filterTextWatch(val: any) {
    (this.$refs.tree as any).filter(val, this.selectType);
  }
  list: any = [];
  getInvalid(node: any) {
    let item = null;
    for (let index = 0; index < this.list.length; index++) {
      const element = this.list[index];
      if (node.key == element.id) {
        item = element;
        break;
      }
    }
    if (item && item.status == "Valid") {
      return `el-tree-node__label`;
    } else {
      return "el-tree-node__label invalid";
    }
  }

  edit(node: any) {
    console.log("edit");
    this.$emit("edit", node);
  }
  dataTree: any = [];
  defaultProps: any = {
    children: "children",
    label: "name",
  };
  selectChange() {
    (this.$refs.tree as any).filter(this.filterText, this.selectType);
  }
  filterNode(value: any, data: any) {
    if (!value && !this.selectType) {
      return true;
    } else {
      if (this.selectType) {
        if (value) {
          let r =
            data[this.defaultProps.label].indexOf(value) !== -1 &&
            data.status == "Valid";
          return r;
        } else {
          let r = data.status == "Valid";
          return r;
        }
      } else {
        return data[this.defaultProps.label].indexOf(value) !== -1;
      }
    }
  }
  currentChange(item: any) {
    this.$emit("select", item);
  }
  get options() {
    return DictionariesModule.modular;
  }
  async created() {
    const res: any = await get_org_getAll({ onlyValid: false });
    this.list = res;
    if (res && res.length > 0) {
      res[0].parentId = 0;
    }

    this.dataTree = this.$tool.listToGruop(res, { rootId: 0 });
  }
}
</script>
<style lang="scss" >
.OrganizationTree {
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
