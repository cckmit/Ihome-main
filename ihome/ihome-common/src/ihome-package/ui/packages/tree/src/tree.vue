<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-05-28 16:56:24
 * @LastEditors: zyc
 * @LastEditTime: 2020-06-02 09:17:03
--> 
<template>
  <div>
    <el-tree
      :class="{'ih-el-tree-radio':type=='radio','ih-el-tree-checkbox':type=='checkbox'}"
      :data="groupTreeData"
      show-checkbox
      ref="DeviceGroupTree"
      node-key="id"
      :empty-text="tipText"
      @check="checkGroupNode"
      :props="defaultProps"
      :check-strictly="type=='radio'"
    ></el-tree>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  components: {}
})
export default class IhTree extends Vue {
  //checkbox=复选  radio=单选
  @Prop({ default: "checkbox" }) type!: string;
  defaultProps = {
    children: "subs",
    label: "name"
  };

  groupTreeData = [];
  treeListData = [];
  tipText = "正在加载数据...";
  async created() {
    this.treeList();
  }
  async groupTree() {
    this.groupTreeData = await this.$http.get("/getTreeDataList");
    if (this.groupTreeData.length == 0) {
      this.tipText = "暂无数据";
    }
  }
  async treeList() {
    this.groupTreeData = await this.$http.get("/treeList");
    if (this.treeListData.length == 0) {
      this.tipText = "暂无数据";
    }
  }
  checkGroupNode(a: any, b: any) {
    let deviceGroupTreeRef: any = this.$refs.DeviceGroupTree;
    if (this.type == "radio") {
      if (b.checkedKeys.length > 0) {
        deviceGroupTreeRef.setCheckedKeys([a.id]);
      }
    }
  }
}
</script>