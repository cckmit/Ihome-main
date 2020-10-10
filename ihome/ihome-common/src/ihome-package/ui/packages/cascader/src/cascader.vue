<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-29 08:55:05
 * @LastEditors: wwq
 * @LastEditTime: 2020-09-30 11:56:55
-->
<template>
  <div class="cascader">
    <el-cascader
      :props="{
        label: 'name',
        value: 'code',
        checkStrictly: true,
      }"
      ref="cascader"
      popper-class="ih-cascader"
      style="width: 100%"
      placeholder="请选择省市区"
      :options="provincesOptions"
      :filter-method="filterMethod"
      filterable
      clearable
      v-model="provincesValue"
      v-bind="$attrs"
      v-on="$listeners"
    ></el-cascader>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import request from "../../../../util/api/http";
@Component({
  components: {},
})
export default class IhCascader extends Vue {
  private provincesValue = [];
  private provincesOptions = [];

  @Watch("provincesValue", { deep: true })
  clearValue() {
    (this.$refs.cascader as any).$refs.panel.clearCheckedNodes();
    (this.$refs.cascader as any).$refs.panel.activePath = [];
  }

  async created() {
    this.getOptions();
  }

  async getOptions() {
    const data = await this.get_area_getAll();
    let first = this.$tool.deepClone(data[0]);
    data.splice(0, 1);
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

  /**查询所有行政区划信息*/
  async get_area_getAll(d?: any) {
    return await request.get<AreaBaseVO[], AreaBaseVO[]>(
      "/system/area/getAll",
      { params: d }
    );
  }
}
interface AreaBaseVO {
  /**拼音简称*/
  abbr: string;
  /**编码*/
  code: string;
  /**层级*/
  level: number;
  /**名称*/
  name: string;
  /**父编码*/
  parentCode: string;
}
</script>
<style lang="scss">
.ih-cascader {
  .el-cascader-menu__wrap {
    height: 366px;
  }
}
</style>