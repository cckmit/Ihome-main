<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-05-21 16:42:45
 * @LastEditors: wwq
 * @LastEditTime: 2021-04-10 10:43:37
--> 
<template>
  <div class="cascader">
    <el-cascader
      :props="{
        disabled: 'exDeal',
        checkStrictly: checkStrictly,
      }"
      ref="buildingRoom"
      popper-class="ih-cascader"
      style="width: 100%"
      :placeholder="placeholder"
      :options="buildingRoom"
      :filter-method="filterMethod"
      @visible-change="visibleChange"
      filterable
      clearable
      v-bind="$attrs"
      v-on="$listeners"
    ></el-cascader>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { get_project_getTree__proId } from "@/api/project/index";
@Component({
  components: {},
})
export default class IhBuildingRoom extends Vue {
  @Prop()
  proId!: any;
  @Prop({
    type: String,
    default: "请选择栋座房号",
  })
  placeholder: any;
  @Prop({
    type: Boolean,
    default: true,
  })
  checkStrictly?: any;
  @Prop({
    type: Boolean,
    default: false,
  })
  isFilter?: any;
  private buildingRoom: any = [];

  @Watch("$attrs", { deep: true })
  clearValue(val: any) {
    (this.$refs.buildingRoom as any).$refs.panel.activePath = [];
    if (!val?.value?.length) {
      (this.$refs.buildingRoom as any).$refs.panel.clearCheckedNodes();
    }
  }

  @Watch("proId", { immediate: true })
  hasProId(val: any) {
    if (val) this.getOptions();
  }

  visibleChange() {
    if (!this.proId) {
      (this.$refs.buildingRoom as any).dropDownVisible = false;
      this.$message.warning("请先选择项目");
    }
  }

  async getOptions() {
    let data = await get_project_getTree__proId({
      proId: this.proId,
    });
    this.buildingRoom = this.enume(data);
    console.log(this.buildingRoom);
  }

  enume(arr: any) {
    arr.forEach((v: any) => {
      if (v.children && v.children.length) {
        v.children = v.children.map((j: any) => ({
          ...j,
          exDeal: this.isFilter ? (j.exDeal ? true : false) : false,
        }));
      }
    });
    return arr;
  }

  filterMethod(node: any, keyword: any) {
    const item = node.text.replace(/\s/g, "");
    return item.includes(keyword);
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
 