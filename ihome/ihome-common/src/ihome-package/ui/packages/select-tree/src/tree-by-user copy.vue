<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2021-02-17 14:44:40
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-17 15:07:09
-->
<template>
  <div>
    <el-tree
      :class="{
        'ih-el-tree-radio': type == 'radio',
        'ih-el-tree-checkbox': type == 'checkbox',
      }"
      :data="list"
      show-checkbox
      ref="DeviceGroupTree"
      node-key="id"
      :empty-text="tipText"
      @check="checkGroupNode"
      :props="defaultProps"
      :check-strictly="type == 'radio'"
      :default-checked-keys="defaultCheckedKeys"
      :default-expanded-keys="defaultExpandedKeys"
    ></el-tree>
  </div>
</template>
<script lang="ts">
import { post_org_getAllByUser } from "@/api/system/index";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
@Component({
  components: {},
})
export default class IhTree extends Vue {
  @Prop() value!: string | number;
  //checkbox=复选  radio=单选(默认)
  @Prop({ default: "radio" }) type!: string;
  defaultProps = {
    children: "children",
    label: "name",
  };
  @Watch("value")
  valueWatch(val: any) {
    console.log(val);
    this.defaultCheckedKeys = [val];
  }
  defaultCheckedKeys: any = [1];
  defaultExpandedKeys: any = [];
  listOrg: any = [];
  list: any = [];
  treeListData = [];
  tipText = "正在加载数据...";
  async created() {
    this.defaultCheckedKeys = [this.value];
    let d = await post_org_getAllByUser({ userId: 2, status: null });
    this.defaultExpandedKeys = d.expandedList;
    this.listOrg = d.orgPermissionList;
    if (this.listOrg && this.listOrg.length > 0) {
      this.listOrg[0].parentId = 0;
    }
    this.list = this.$tool.listToGruop(this.listOrg, {
      id: "id",
      children: "children",
      parentId: "parentId",
      rootId: 0,
    });
  }

  checkGroupNode(a: any, b: any) {
    let deviceGroupTreeRef: any = this.$refs.DeviceGroupTree;
    if (this.type == "radio") {
      if (b.checkedKeys.length > 0) {
        deviceGroupTreeRef.setCheckedKeys([a.id]);
      }
      this.defaultCheckedKeys = [a.id];
      this.$emit("input", a.id);
      this.$emit("change", a);
    }
  }
}
</script>