<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-29 08:55:05
 * @LastEditors: wwq
 * @LastEditTime: 2020-10-22 12:14:21
-->
<template>
  <div class="cascader">
    <el-cascader
      :props="{
        label: 'name',
        value: 'code',
        checkStrictly: checkStrictly,
      }"
      ref="cascader"
      popper-class="ih-cascader"
      style="width: 100%"
      placeholder="请选择省市区"
      :options="provincesOptions"
      :filter-method="filterMethod"
      filterable
      clearable
      v-bind="$attrs"
      v-on="$listeners"
    ></el-cascader>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { get_area_getAll } from "@/api/system/index";
@Component({
  components: {},
})
export default class IhCascader extends Vue {
  @Prop({
    type: Number,
    default: 3,
  })
  level: any;
  @Prop({
    type: Boolean,
    default: true,
  })
  checkStrictly: any;
  private provincesOptions = [];

  @Watch("$attrs", { deep: true })
  clearValue(val: any) {
    (this.$refs.cascader as any).$refs.panel.activePath = [];
    if (!val?.value?.length) {
      (this.$refs.cascader as any).$refs.panel.clearCheckedNodes();
    }
  }

  async created() {
    this.getOptions();
  }

  async getOptions() {
    let data = await get_area_getAll();
    let first = this.$tool.deepClone(data[0]);
    data.splice(0, 1);
    switch (this.level) {
      case 1:
        data = data.filter((v: any) => v.level === 1);
        break;
      case 2:
        data = data.filter((v: any) => v.level !== 3);
        break;
    }
    this.provincesOptions = this.$tool.listToGruop(data, {
      rootId: first.code,
      id: "code",
      children: "children",
      parentId: "parentCode",
    });
  }

  filterMethod(node: any, keyword: any) {
    return (
      node.data.abbr.includes(keyword.toUpperCase()) ||
      node.data.name.includes(keyword)
    );
  }
}
</script>
<style lang="scss">
.ih-cascader {
  .el-cascader-menu__wrap {
    height: 366px;
  }
}
</style>