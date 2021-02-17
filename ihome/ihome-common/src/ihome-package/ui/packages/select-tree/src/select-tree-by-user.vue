<template>
  <el-select
    :value="valueTitle"
    :clearable="true"
    @clear="clearHandle"
    popper-class="ihome-tree"
    class="ih-select-tree"
  >
    <el-input
      class="selectInput"
      :placeholder="placeholder"
      v-model="filterText"
      clearable
    ></el-input>

    <el-option
      :value="valueTitle"
      :label="valueTitle"
      class="options"
      style="max-height: 400px"
    >
      <el-tree
        ref="selectTree"
        :class="{
          'ih-el-tree-radio': type == 'radio',
          'ih-el-tree-checkbox': type == 'checkbox',
        }"
        :data="options"
        show-checkbox
        node-key="id"
        :empty-text="tipText"
        @check="checkGroupNode"
        @node-click="nodeClick"
        :props="defaultProps"
        :check-strictly="type == 'radio'"
        :default-checked-keys="defaultCheckedKeys"
        :default-expanded-keys="props.defaultExpandedKeys"
        :check-on-click-node="true"
        :expand-on-click-node="false"
        :highlight-current="true"
      ></el-tree>
    </el-option>
    <!-- <el-option value="0" label="0" class="fengeline">
      <span
        style="float: right; color: #8492a6; font-size: 13px;margin-right: 10px;"
        @click="OK()"
      >确定</span>
    </el-option>-->
  </el-select>
</template>

<script>
export default {
  name: "IhSelectTreeByUser",
  props: {
    /* 配置项 */
    props: {
      type: Object,
      default: () => {
        return {
          value: "id", // ID字段名
          label: "title", // 显示名称
          children: "children", // 子级字段名
        };
      },
    },
    //单选框radio或复选框checkbox
    type: {
      type: String,
      default: () => {
        return "radio";
      },
    },
    /* 选项列表数据(树形结构的对象数组) */
    options: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /* 初始值 */
    value: {
      type: Number | String,
      default: () => {
        return null;
      },
    },
    /* 可清空选项 */
    clearable: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    clearableInput: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    /* 自动收起 */
    accordion: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    placeholder: {
      type: String,
      default: () => {
        return "检索关键字";
      },
    },
  },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "name",
      },
      tipText: "正在加载数据...",
      filterText: "",
      valueId: this.value, // 初始值
      valueTitle: "",
      defaultExpandedKey: [],
      defaultCheckedKeys: [],
      defaultExpandedKeys: [],
    };
  },
  mounted() {
    this.initHandle();
  },
  created() {
    this.defaultCheckedKeys = [this.value];
  },
  methods: {
    nodeClick(item) {
      console.log(item);
      if (item.disabled) {
        this.$nextTick(function () {
          this.$refs["selectTree"].setCurrentKey([item.id]);
        });
      }
    },
    checkGroupNode(a, b) {
      let deviceGroupTreeRef = this.$refs.selectTree;
      if (this.type == "radio") {
        if (b.checkedKeys.length > 0) {
          deviceGroupTreeRef.setCheckedKeys([a.id]);
        }
        this.defaultCheckedKeys = [a.id];
        this.$emit("input", a.id);
        this.$emit("getValue", a);
      }
    },
    deepQuery(tree, id) {
      const that = this;
      //this.props.children
      let isGet = false;
      let retNode = null;
      function deepSearch(tree, id) {
        for (let i = 0; i < tree.length; i++) {
          if (
            tree[i][that.props.children] &&
            tree[i][that.props.children].length > 0
          ) {
            deepSearch(tree[i][that.props.children], id);
          }
          if (id === tree[i][that.props.value] || isGet) {
            isGet || (retNode = tree[i]);
            isGet = true;
            break;
          }
        }
      }
      deepSearch(tree, id);
      return retNode;
    },
    // 初始化值
    initHandle() {
      if (this.valueId) {
        const nodeData = this.deepQuery(this.options, this.valueId);

        if (nodeData) {
          setTimeout(() => {
            this.valueTitle = nodeData[this.props.label]; // 初始化显示
            this.$refs.selectTree.setCurrentKey(this.valueId);
          }, 0);
        }

        // this.valueTitle = this.$refs.selectTree.getNode(this.valueId)?.data[
        //   this.props.label
        // ]; // 初始化显示

        // this.$refs.selectTree.setCurrentKey(this.valueId); // 设置默认选中
        this.defaultExpandedKey = [this.valueId]; // 设置默认展开
      } else {
        this.valueTitle = "";
      }
      this.initScroll();
    },
    // 初始化滚动条
    initScroll() {
      this.$nextTick(() => {
        let scrollWrap = document.querySelectorAll(
          ".ihome-tree .el-scrollbar .el-select-dropdown__wrap"
        )[0];
        let scrollBar = document.querySelectorAll(
          ".ihome-tree .el-scrollbar .el-scrollbar__bar"
        );
        scrollWrap.style.cssText =
          "margin: 0px; max-height: none; overflow: hidden;";
        scrollBar.forEach((ele) => (ele.style.width = 0));
      });
    },
    // 切换选项
    handleNodeClick(node) {
      this.valueTitle = node[this.props.label];
      this.valueId = node[this.props.value];
      this.$emit("getValue", this.valueId);
      this.defaultExpandedKey = [];
    },
    // 清除选中
    clearHandle() {
      this.valueTitle = "";
      this.valueId = null;
      this.defaultCheckedKeys = [];
      this.clearSelected();
      this.$refs.selectTree.setCheckedKeys([]);
      this.$emit("getValue", null);
    },
    /* 清空选中样式 */
    clearSelected() {
      let allNode = document.querySelectorAll("#tree-option .el-tree-node");
      allNode.forEach((element) => element.classList.remove("is-current"));
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    cancel() {
      console.log(this.valueId);
    },
    OK() {
      console.log(this.valueId);
    },
  },
  watch: {
    value() {
      this.valueId = this.value;
      this.initHandle();
    },
    options: {
      handler(newVal) {
        this.options = newVal;
        this.initHandle();
      },
      immediate: true,
    },

    filterText(val) {
      this.$refs.selectTree.filter(val);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
.ihome-tree .el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  max-height: 274px;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
}
.el-select-dropdown__item.selected {
  font-weight: normal;
}
ul li >>> .el-tree .el-tree-node__content {
  height: auto;
  padding: 0 20px;
}
.el-tree-node__label {
  font-weight: normal;
}
.el-tree >>> .is-current .el-tree-node__label {
  color: #003894;
  font-weight: 700;
}
.el-tree >>> .is-current .el-tree-node__children .el-tree-node__label {
  color: #606266;
  font-weight: normal;
}
.selectInput {
  padding: 0 5px;
  box-sizing: border-box;
}
.fengeline {
  border-top: 1px solid #eaeaea;
}
</style>
 