<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-09 15:03:17
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-19 16:33:48
--> 
<template>
  <el-dialog
    v-dialogDrag
    :title="'分配权限(' + data.name + ')'"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="800px"
    style="text-align: left"
    class="dialog"
  >
    <div>
      <div style="margin-bottom: 30px">
        <b class="padding-right-20">操作关联选项：</b>
        <el-checkbox v-model="config.selectParent">选中-关联父级</el-checkbox>
        <el-checkbox v-model="config.selectChildren">选中-关联子级</el-checkbox>
        <el-checkbox v-model="config.cancelParent">取消-关联父级</el-checkbox>
        <el-checkbox v-model="config.cancelChildren">取消-关联子级</el-checkbox>
      </div>
      <div>
        <el-row>
          <el-col :span="12" class="padding-right-40">
            <el-select
              style="width: 100%"
              @change="selectChange()"
              v-model="selectType"
              clearable
              placeholder="请选择资源类型"
            >
              <el-option
                v-for="(item, index) in $root.dictAllList(
                  'ResourceType',
                  'AllowAdjust'
                )"
                :key="index"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="12" class="padding-right-40">
            <el-input
              clearable
              placeholder="输入关键字进行过滤"
              v-model="filterText"
            ></el-input>
          </el-col>
        </el-row>
      </div>

      <br />
      <div>
        <el-tree
          class="filter-tree"
          :check-strictly="true"
          :expand-on-click-node="false"
          :data="dataTree"
          :props="defaultProps"
          :default-expand-all="true"
          :filter-node-method="filterNode"
          :default-checked-keys="defaultCheckedKeys"
          :highlight-current="true"
          node-key="id"
          show-checkbox
          @current-change="currentChange"
          @check="handleCheck"
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
import {
  post_role_addRoleResourceBatch,
  get_resource_getAll,
  post_resource_getAllByRoleId,
} from "../api/system/index";
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
  resList: any = [];

  config: any = {
    selectParent: true,
    selectChildren: false,
    cancelParent: true,
    cancelChildren: true,
  };
  preData: any = [];
  @Watch("filterText")
  filterTextWatch(val: any) {
    (this.$refs.tree as any).filter(val, this.selectType);
  }
  selectChange() {
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
    const tree: any = this.$refs.tree;
    let list = tree.getCheckedKeys().concat(tree.getHalfCheckedKeys());
    let all: any = [];
    this.resList.forEach((item: any) => {
      list.forEach((element: any) => {
        if (item.id == element) {
          all.push(item);
        }
      });
    });
    this.preData = this.$tool.listToGruop(all, { rootId: 0 });
  }
  handleCheck(currentNode: any, treeStatus: any) {
    // console.log(currentNode, treeStatus);
    const tree: any = this.$refs.tree;
    /**
     * @des 根据父元素的勾选或取消勾选，将所有子级处理为选择或非选中状态
     * @param { node: Object }  当前节点
     * @param { status: Boolean } （true ： 处理为勾选状态 ； false： 处理非选中）
     */
    const setChildStatus = (node: any, status: any) => {
      /* 这里的 id children 也可以是其它字段，根据实际的业务更改 */
      tree.setChecked(node.id, status);
      if (node.children) {
        /* 循环递归处理子节点 */
        for (let i = 0; i < node.children.length; i++) {
          setChildStatus(node.children[i], status);
        }
      }
    };
    /* 设置父节点为选中状态 */
    const setParentStatus = (nodeObj: any, status: boolean) => {
      /* 拿到tree组件中的node,使用该方法的原因是第一次传入的 node 没有 parent */
      const node = tree.getNode(nodeObj);
      if (node.parent.key) {
        tree.setChecked(node.parent, status);
        setParentStatus(node.parent, status);
      }
    };

    /* 判断当前点击是选中还是取消选中操作 */
    if (treeStatus.checkedKeys.includes(currentNode.id)) {
      if (this.config.selectParent) {
        setParentStatus(currentNode, true);
      }
      if (this.config.selectChildren) {
        setChildStatus(currentNode, true);
      }
    } else {
      /* 取消选中 */
      if (this.config.cancelParent) {
        //取消父级
        setParentStatus(currentNode, false);
      }
      if (this.config.cancelChildren) {
        setChildStatus(currentNode, false);
      }
    }
  }
  checkChange1(item: any, node: any) {
    const tree: any = this.$refs.tree;
    console.log(item, node);
    if (node) {
      //选中
      if (this.config.selectParent) {
        //选中，父级选上
        if (item.parentId) {
          console.log(item.parentId);
          let list = (this.$refs.tree as any).getCheckedNodes() || [];
          list.push(item.parentId);
          tree.setCheckedNodes(list);
        }
      }
      if (this.config.selectChildren) {
        //选中，子级选上
      }
    } else {
      //取消
      if (this.config.cancelParent) {
        //取消，父级取消
      }
      if (this.config.cancelChildren) {
        //取消，子级取消
      }
    }
  }

  async created() {
    console.log(this.data);
    let p: any = {
      key: null,
      roleId: this.data.id,
    };

    let [res, list] = await Promise.all([
      get_resource_getAll(),
      post_resource_getAllByRoleId(p),
    ]);

    res.forEach((item: any) => {
      if (item.id == item.parentId) {
        item.parentId = 0;
      }
    });

    this.dataTree = this.$tool.listToGruop(res, { rootId: 0 });

    this.defaultCheckedKeys = list.map((item: any) => item.id);
  }
  cancel() {
    this.$emit("cancel", false);
  }

  async finish() {
    //  const tree: any = this.$refs.tree;
    // let list = tree.getCheckedKeys().concat(tree.getHalfCheckedKeys());
    // console.log(list);
    // let p = {
    //   resourceIds: list,
    //   roleId: this.data.id,
    // };
    let list = (this.$refs.tree as any).getCheckedNodes() || [];
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
