<!--
 * @Descripttion: 下拉搜索归属组织数据tree
 * @version: 
 * @Author: zyc
 * @Date: 2021-01-18 14:39:10
 * @LastEditors: zyc
 * @LastEditTime: 2021-02-17 16:08:43
-->
<template>
  <IhSelectTreeByUser
    min-height="400px"
    class="width--100"
    :props="props"
    :options="list"
    :value="currentId"
    :clearable="true"
    :accordion="true"
    :type="type"
    @getValue="getValue($event)"
  ></IhSelectTreeByUser>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { post_org_getAllByUser } from "@/api/system/index";
import IhSelectTreeByUser from "./select-tree-by-user.vue";
@Component({
  components: { IhSelectTreeByUser },
})
export default class IhSelectOrgTreeByUser extends Vue {
  @Prop() value!: string | number;

  @Prop() type!: string;
  currentId: any = null;
  listOrg: any = [];
  list: any = [];
  props: any = {
    // 配置项（必选）
    value: "id",
    label: "name",
    children: "children",
    defaultExpandedKeys: [],
  };
  getValue(value: any) {
    if (value) {
      this.currentId = value.id;
    } else {
      this.currentId = null;
    }
    this.$emit("input", this.currentId);
    this.$emit("change", value); //选中后触发change事件
  }
  @Watch("value")
  valueWatch(val: any) {
    this.currentId = val;
  }

  async created() {
    this.currentId = this.value;
    // this.listOrg = await get_org_getAll({ onlyValid: true });
    let d = await post_org_getAllByUser({ userId: null, status: null });
    this.props.defaultExpandedKeys = d.expandedList;
    this.listOrg = d.orgPermissionList;
    if (this.listOrg && this.listOrg.length > 0) {
      this.listOrg[0].parentId = 0;
      // this.listOrg[2].disabled = true;
    }
    this.list = this.$tool.listToGruop(this.listOrg, {
      id: "id",
      children: "children",
      parentId: "parentId",
      rootId: 0,
    });
  }
}
</script>
<style lang="scss" scoped>
</style>