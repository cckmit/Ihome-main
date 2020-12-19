<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-09 15:03:17
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-19 16:34:19
--> 
<template>
  <el-dialog
    v-dialogDrag
    title="分配组织权限"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="800px"
    style="text-align: left"
    class="dialog OrganizationJurisdiction"
  >
    <el-row>
      <div style="margin-bottom: 30px" v-show="false">
        <b class="padding-right-20">操作关联选项：</b>
        <el-checkbox v-model="config.selectParent">选中-关联父级</el-checkbox>
        <el-checkbox v-model="config.selectChildren">选中-关联子级</el-checkbox>
        <el-checkbox v-model="config.cancelParent">取消-关联父级</el-checkbox>
        <el-checkbox v-model="config.cancelChildren">取消-关联子级</el-checkbox>
      </div>
      <el-col :span="24">
        <el-row>
          <el-col :span="6">
            <div class="text-left">
              <el-checkbox
                @change="selectChange"
                v-model="selectType"
                label="仅查询有效的组织"
                border
              ></el-checkbox>
            </div>
          </el-col>
          <el-col :span="18">
            <el-input
              clearable
              placeholder="输入关键字进行过滤"
              v-model="filterText"
            ></el-input>
          </el-col>
        </el-row>
        <div>
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
              :highlight-current="true"
              :default-checked-keys="defaultCheckedKeys"
              node-key="id"
              show-checkbox
              @current-change="currentChange"
              @check="handleCheck"
              ref="tree"
            >
              <span :class="getInvalid(node)" slot-scope="{ node }">
                <span class="left" :title="node.label">{{ node.label }}</span>
                <span class="right"> </span>
              </span>
            </el-tree>
          </div>
        </div>
      </el-col>

      <!-- <el-col :span="12" class="padding-left-40">
        <div style="height: 56px; width: 100%; text-align: center">
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
      </el-col> -->
    </el-row>

    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

import {
  get_org_getAll,
  post_user_addUserOrgBatch,
  post_user_getAllUserOrgByUserId__userId,
} from "../api/system/index";
@Component({
  components: {},
})
export default class OrganizationJurisdiction extends Vue {
  constructor() {
    super();
  }
  config: any = {
    selectParent: false,
    selectChildren: true,
    cancelParent: false,
    cancelChildren: true,
  };
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  value: any = null;
  selectType = true;
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
  defaultCheckedKeys: any = [];
  resList: any = [];
  preData: any = [];

  selectChange() {
    (this.$refs.tree as any).filter(this.filterText);
  }
  filterNode(value: any, data: any) {
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
    // return data[this.defaultProps.label].indexOf(value) !== -1;
  }
  currentChange(item: any) {
    this.$emit("select", item);
  }
  getInvalid(node: any) {
    let item = null;

    for (let index = 0; index < this.resList.length; index++) {
      const element = this.resList[index];
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

  async created() {
    const selectData = await post_user_getAllUserOrgByUserId__userId({
      userId: this.data.id,
    });
    this.defaultCheckedKeys = selectData.map((item: any) => {
      return item.id;
    });

    const res: any = await get_org_getAll({ onlyValid: false });
    if (res && res.length > 0) {
      res[0].parentId = 0;
    }
    this.resList = this.$tool.deepClone(res);

    this.dataTree = this.$tool.listToGruop(res, { rootId: 0 });
    this.$nextTick(() => {
      this.selectType = true;
      this.selectChange();
    });
  }
  cancel() {
    this.$emit("cancel", false);
  }

  async finish() {
    let list = (this.$refs as any).tree.getCheckedKeys();
    let p: any = {
      id: this.data.id,
      orgIds: list,
    };
    const res = await post_user_addUserOrgBatch(p);
    this.$message.success("操作成功");
    this.$emit("finish", res);
  }
}
</script>
<style lang="scss" >
.OrganizationJurisdiction {
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
