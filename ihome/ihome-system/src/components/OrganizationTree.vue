<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-08-04 15:23:09
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-04 17:25:03
--> 
<template>
  <div>
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
        <span class="el-tree-node__label" slot-scope="{ node }" v-html="renderItem(node)"></span>
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

    res[0].parentId = 0;
    this.dataTree = this.$tool.listToGruop(res, { rootId: 0 });
  }
  renderItem(node: any) {
    let item = null;
    for (let index = 0; index < this.list.length; index++) {
      const element = this.list[index];
      if (node.key == element.id) {
        item = element;
        break;
      }
    }
    if (item) {
      if (item.status == "Valid") {
        return `<span  >${node.label}</span>`;
      } else {
        return `<span style="color:red;text-decoration:line-through;">${node.label}</span>`;
      }
    } else {
      return `<span >${node.label}</span>`;
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
