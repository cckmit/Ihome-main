<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-09 15:03:17
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-06 15:15:39
--> 
<template>
  <el-dialog
    v-dialogDrag
    :title="'分配权限('+data.name+')'"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="800px"
    style="text-align: left;"
    class="dialog"
  >
    <div>
      <div>
        <el-select
          style="width:100%;"
          @change="selectChange()"
          v-model="selectType"
          clearable
          placeholder="请选择"
        >
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
          :default-checked-keys="defaultCheckedKeys"
          :highlight-current="true"
          node-key="id"
          show-checkbox
          @current-change="currentChange"
          ref="tree"
        ></el-tree>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
// import { getResourceCategory } from "../api/system/index2";
import {
  post_role_addRoleResourceBatch,
  get_resource_getAll,
  post_resource_getAllByRoleId,
} from "../api/system/index";
import { getListTool, modular } from "../util/enums/dic";
@Component({
  components: {},
})
export default class ResourcesCheck extends Vue {
  constructor() {
    super();
  }
  defaultCheckedKeys: any = [];
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  value: any = null;
  selectType: any = null;
  filterText: any = "";
  @Watch("filterText")
  filterTextWatch(val: any) {
    console.log(val);
    (this.$refs.tree as any).filter(val, this.selectType);
  }
  selectChange() {
    console.log("selectChange");
    (this.$refs.tree as any).filter(this.filterText, this.selectType);
  }
  dataTree: any = [];
  defaultProps: any = {
    children: "children",
    label: "name",
  };
  filterNode(value: any, data: any) {
    if (!value && !this.selectType) {
      return true;
    } else {
      if (value && this.selectType) {
        return (
          data[this.defaultProps.label].indexOf(value) !== -1 &&
          data.type.indexOf(this.selectType)
        );
      } else {
        if (value) {
          return data[this.defaultProps.label].indexOf(value) !== -1;
        } else {
          return data.type.indexOf(this.selectType);
        }
      }
    }
  }
  currentChange(item: any) {
    console.log(item);
  }
  get options() {
    return getListTool(modular);
  }
  async created() {
    console.log(this.data);
    let p: any = {
      key: null,
      roleId: this.data.id,
    };

    let [res, list] = await Promise.all([
      await get_resource_getAll(),
      await post_resource_getAllByRoleId(p),
    ]);

    res[0].parentId = 0;
    this.dataTree = this.$tool.listToGruop(res, { rootId: 0 });

    this.defaultCheckedKeys = list.map((item: any) => item.id);
  }
  cancel() {
    this.$emit("cancel", false);
  }

  async finish() {
    let list = (this.$refs.tree as any).getCheckedNodes() || [];
    console.log(list);
    let p = {
      resourceIds: list.map((item: any) => item.id),
      roleId: this.data.id,
    };
    const res = await post_role_addRoleResourceBatch(p);
    this.$message.success("操作成功");

    this.$emit("finish", res);
  }
}
</script>
<style lang="scss" scoped>
</style>
