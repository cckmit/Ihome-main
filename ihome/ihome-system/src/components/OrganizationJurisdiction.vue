<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-09 15:03:17
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-01 09:38:49
--> 
<template>
  <el-dialog
    v-dialogDrag
    title="分配组织权限"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="1000px"
    style="text-align: left;"
    class="dialog"
  >
    <el-row>
      <el-col :span="12">
        <el-row>
          <el-col :span="12">
            <el-select style="width:90%;" v-model="value" placeholder="请选择">
              <el-option
                v-for="(item,index) in options"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-input clearable placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
          </el-col>
        </el-row>
        <div>
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
              show-checkbox
              @current-change="currentChange"
              @check="check"
              ref="tree"
            ></el-tree>
          </div>
        </div>
      </el-col>

      <el-col :span="12" class="padding-left-40">
        <div style="height:56px;width:100%;text-align: center;">
          <b>预览</b>
        </div>
        <el-tree
          class="filter-tree"
          :data="preData"
          :props="defaultProps"
          :default-expand-all="true"
          node-key="id"
          ref="preTree"
        ></el-tree>
      </el-col>
    </el-row>

    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { getResourceCategory } from "../api/system/index2";
import { DictionariesModule } from "../store/modules/dictionaries";
@Component({
  components: {}
})
export default class OrganizationJurisdiction extends Vue {
  constructor() {
    super();
  }
  @Prop({ default: null }) data: any;
  dialogVisible = true;
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
  resList: any = [];
  preData: any = [];
  filterNode(value: any, data: any) {
    if (!value) return true;
    return data[this.defaultProps.label].indexOf(value) !== -1;
  }
  currentChange(item: any) {
    console.log(item);
  }
  check() {
    const tree: any = this.$refs.tree;
    let list = tree.getCheckedKeys().concat(tree.getHalfCheckedKeys());
    console.log(list);
    let all: any = [];
    this.resList.forEach((item: any) => {
      list.forEach((element: any) => {
        if (item.id == element) {
          all.push(item);
        }
      });
    });
    console.log(all);
    this.preData = this.$tool.listToGruop(all, { rootId: 0 });
  }
  get options() {
    DictionariesModule.getModular();
    return DictionariesModule.modularAll;
  }
  async created() {
    const res: any = await getResourceCategory();
    this.resList = this.$tool.deepClone(res);
    console.log(res);
    this.dataTree = this.$tool.listToGruop(res, { rootId: 0 });
  }
  cancel() {
    this.$emit("cancel", false);
  }

  finish() {
    this.$emit("finish", {});
  }
}
</script>
<style lang="scss" scoped>
</style>
