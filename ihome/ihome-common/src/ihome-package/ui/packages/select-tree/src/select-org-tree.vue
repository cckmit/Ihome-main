<!--
 * @Descripttion: 下拉搜索归属组织数据tree
 * @version: 
 * @Author: zyc
 * @Date: 2021-01-18 14:39:10
 * @LastEditors: zyc
 * @LastEditTime: 2021-01-18 16:42:48
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
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { get_org_getAll } from "@/api/system/index";
@Component({
  components: {},
})
export default class IhSelectOrgTree extends Vue {
  @Prop() value!: string | number;
  currentId: any = null;
  listOrg: any = [];
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
    this.$emit("input", value);
    let curItem = null;
    for (let index = 0; index < this.listOrg.length; index++) {
      const item = this.listOrg[index];
      if (item[this.props.value] == value) {
        curItem = item;
        break;
      }
    }
    this.$emit("change", curItem); //选中后触发change事件
  }
  @Watch("value")
  valueWatch(val: any) {
    this.currentId = val;
  }

  async created() {
    this.currentId = this.value;
    this.listOrg = await get_org_getAll({ onlyValid: true });
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
}
</script>
<style lang="scss" scoped>
</style>