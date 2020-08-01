<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-03 09:00:13
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-01 09:39:43
--> 

<template>
  <el-dialog
    v-dialogDrag
    title="归属组织"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="50%"
    style="text-align: left;"
    class="dialog"
  >
    <div style="max-height:600px;">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
      <p style="text-align: center;" v-if="!dataList">正在加载数据...</p>
      <el-tree
        empty-text
        style="max-height:500px;overflow: auto;"
        class="filter-tree"
        :data="dataList"
        :highlight-current="true"
        :expand-on-click-node="false"
        :props="defaultProps"
        :filter-node-method="filterNode"
        @node-click="nodeClick"
        node-key="id"
        :current-node-key="currentNodeKey"
        :default-expanded-keys="defaultExpandedKeys"
        element-loading-text="数据加载中"
        ref="tree"
      ></el-tree>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script  >
import { organization } from "../api/system/index2";
export default {
  name: "MyOrganization",
  props: {
    currentId: null
  },
  data() {
    return {
      dialogVisible: true,
      filterText: "",
      currentNodeKey: "1D29BB468F504774ACE653B946A393EE",
      defaultExpandedKeys: [], // ["1D29BB468F504774ACE653B946A393EE"],
      dataList: null,
      defaultProps: {
        children: "subs",
        label: "name"
      }
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    cancel() {
      this.$emit("cancel", false);
    },
    finish() {
      const currentNode = this.$refs.tree.getCurrentNode();
      console.log(currentNode);
      this.$emit("finish", currentNode);
    },
    filterNode(value, data) {
      console.log(value, data);
      if (!value) return true;
      return data[this.defaultProps.label].indexOf(value) !== -1;
    },
    nodeClick(a, b) {
      console.log(a, b);
    }
  },
  async created() {
    console.log(this.currentId);
    const organizationDTree = await organization();
    console.log(organizationDTree);
    this.dataList = organizationDTree;
    this.$nextTick(() => {
      const currentNode = this.$refs.tree.getCurrentNode();
      console.log(currentNode);
      this.defaultExpandedKeys = [currentNode?.pId];
    });
  }
  //   async mounted() {

  //   }
};
</script>
<style  >
</style>
 