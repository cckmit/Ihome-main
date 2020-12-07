<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-08-12 10:12:11
 * @LastEditors: zyc
 * @LastEditTime: 2020-08-12 14:10:56
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
  ></IhSelectTree>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { get_org_getAll } from "@/api/system/index";
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
  getValue(value: any) {
    this.currentId = value;
    this.$emit("callback", value);
  }
  async created() {
      this.currentId=this.orgId;
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