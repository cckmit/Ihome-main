<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-07-09 15:03:17
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-13 11:04:14
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
          <el-col :span="24">
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
              :default-checked-keys="defaultCheckedKeys"
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
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  value: any = null;

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
    return data[this.defaultProps.label].indexOf(value) !== -1;
  }
  currentChange(item: any) {
    this.$emit("select", item);
  }
  check() {
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
      this.check();
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
<style lang="scss" scoped>
</style>
