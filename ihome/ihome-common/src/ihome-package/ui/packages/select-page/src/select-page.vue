<!--
 * @Description: 下拉分页组件
 * @version: 
 * @Author: ywl
 * @Date: 2020-10-20 15:03:13
 * @LastEditors: ywl
 * @LastEditTime: 2020-11-03 16:54:00
-->
<template>
  <el-select
    :value="value"
    @change="handleChange"
    @visible-change="handleVisible"
    :clearable="clearable"
    :disabled="disabled"
    :placeholder="placeholder"
    :value-key="valueKey"
    popper-class="ih-select-page-user"
    class="width--100"
  >
    <!-- 搜索 -->
    <div class="selectInput">
      <el-input
        ref="search"
        :placeholder="searchPlaceholder"
        v-model="filterText"
        clearable
      ></el-input>
    </div>
    <!-- 下拉部分 -->
    <el-option
      v-for="(item, index) in tableList.list"
      :key="item[keyProp]"
      :label="item[labelProp]"
      :value="valueKey ? item : item[valueProp]"
      :disabled="item[disabledProp]"
    >
      <slot
        :data="item"
        :index="index"
      ></slot>
    </el-option>
    <!-- 分页 -->
    <div style="bottom: 0;width: 100%;background: #fff">
      <el-pagination
        small
        :hide-on-single-page="true"
        @current-change="getSelectList"
        :current-page.sync="pageInfo.pageNum"
        :page-size="pageInfo.pageSize"
        layout="prev,pager,next,total"
        :total="tableList.total"
      >
      </el-pagination>
    </div>
  </el-select>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

import { post_user_getList } from "@/api/system/index";

@Component({})
export default class IhSelectPage extends Vue {
  @Prop() value!: string | number;
  @Prop() clearable?: boolean;
  @Prop() disabled?: boolean;
  @Prop() placeholder?: string;
  @Prop() valueKey?: string;
  @Prop() promiseFun?: Function;
  @Prop({
    default: "请输入两个关键字检索",
  })
  searchPlaceholder?: string;
  @Prop({
    default: () => {
      return {
        lable: "name",
        value: "id",
        key: "id",
        disabled: "disabled",
      };
    },
  })
  props?: PropsType;

  private filterText = "";
  private tableList: any = {
    list: [],
    total: 0,
  };
  private pageInfo = {
    pageNum: 1,
    pageSize: 10,
  };

  @Watch("value", { immediate: true, deep: true })
  watchValue(val: any, old: any) {
    if (typeof old === "undefined" && val) {
      this.filterText = val.name;
    }
  }
  @Watch("filterText")
  filter(val: any) {
    console.log(val);
    if (val.length >= 2 || !val.length) this.getSelectList();
  }

  private get labelProp(): string {
    return (this.props as PropsType).lable || "name";
  }
  private get valueProp(): string {
    return (this.props as PropsType).value || "id";
  }
  private get keyProp(): string {
    return (this.props as PropsType).key || "id";
  }
  private get disabledProp(): string {
    return (this.props as PropsType).disabled || "disabled";
  }

  async getSelectList() {
    this.tableList = await post_user_getList({
      ...this.pageInfo,
      name: this.filterText,
    });
  }
  handleVisible(val: any): void {
    if (val && this.filterText) {
      this.$nextTick(() => {
        (this.$refs.search as any).focus();
      });
    }
  }
  handleChange(val: any) {
    this.$emit("input", val);
  }

  mounted() {
    this.getSelectList();
  }
}
interface PropsType {
  lable: string;
  key: string;
  value: string;
  disabled: string;
}
</script>

<style scoped>
.selectInput {
  padding: 0 8px;
  box-sizing: border-box;
}
</style>
<style>
.ih-select-page-user .el-select-dropdown__wrap {
  max-height: none !important;
  margin: 0 !important;
  overflow: auto;
}
.ih-select-page-user .el-scrollbar {
  display: block !important;
}
</style>

