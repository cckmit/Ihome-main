<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-08-12 10:12:11
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-16 10:56:18
-->
<template>
  <IhSelectTree
    min-height="400px"
    class="width--100"
    :props="props"
    :options="list"
    :value="currentId"
    :clearable="true"
    :accordion="true"
    @getValue="getValue($event)"
    ref="tree"
  ></IhSelectTree>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { get_org_getAll } from "../api/system/index";
@Component({
  components: {},
})
export default class SelectOrganizationTree extends Vue {
  @Prop({ default: null }) orgId: any;
  currentId: any = null;
  list: any = [];
  props = {
    // 配置项（必选）
    value: "id",
    label: "name",
    children: "children",
    defaultExpandedKeys: [1],
  };

  // 清空判断 当传入参数为null是 清空组件
  @Watch("orgId")
  watchOrgId(val: any) {
    if (!val) {
      (this.$refs.tree as any).clearHandle();
    }
  }

  getValue(value: any) {
    this.currentId = value;
    this.$emit("callback", value);
  }
  async created() {
    this.currentId = this.orgId;
    let listOrg = await get_org_getAll({ onlyValid: true });
    if (listOrg && listOrg.length > 0) {
      listOrg[0].parentId = 0;
    }
    this.list = this.$tool.listToGruop(listOrg, {
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