<!--
 * @Description: 事业部下拉分页
 * @version: 
 * @Author: ywl
 * @Date: 2020-10-20 15:03:13
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-10 15:53:17
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
        class="select-page-search"
        :placeholder="searchPlaceholder"
        v-model="filterText"
        clearable
        @keyup.enter.native="handleKeyup()"
      >
        <i
          slot="suffix"
          class="el-input__icon el-icon-loading"
          v-if="searchLoad"
        ></i>
      </el-input>
    </div>
    <!-- 下拉部分 -->
    <el-option
      v-for="(item, index) in tableList.list"
      :key="item[keyProp]"
      :label="item[labelProp]"
      :value="valueKey ? item : item[valueProp]"
      :disabled="item[disabledProp]"
    >
      <slot :data="item" :index="index"></slot>
    </el-option>
    <!-- 分页 -->
    <div style="bottom: 0; width: 100%; background: #fff">
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

import { post_org_getList } from "@/api/system/index";

const debounce = (function () {
  let timer: any;
  return function (fn: any, interval?: any) {
    clearTimeout(timer);
    timer = setTimeout(fn, interval || 200);
  };
})();

@Component({})
export default class IhSelectPageDivision extends Vue {
  @Prop() value!: any;
  @Prop() clearable?: boolean;
  @Prop() disabled?: boolean;
  @Prop() placeholder?: string;
  @Prop() valueKey?: string;
  @Prop() promiseFun?: Function;
  @Prop({
    default: false,
  })
  isKeyUp?: boolean;
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
  private searchLoad = false;

  @Watch("value", { immediate: true, deep: true })
  watchValue(val: any, old: any) {
    if (typeof old === "undefined" && val) {
      this.filterText = val.name;
    }
  }
  @Watch("filterText")
  filter(val: any) {
    if (val.length >= 2 && !this.isKeyUp) {
      debounce(this.getSelectList, 1000);
    } else if (!val.length) {
      this.getSelectList();
    }
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

  handleKeyup() {
    if (this.isKeyUp) {
      this.getSelectList();
    }
  }
  async getSelectList() {
    this.searchLoad = true;
    this.tableList = await post_org_getList({
      ...this.pageInfo,
      departmentType: null,
      orgType: "Department",
      parentId: null,
      status: "Valid",
      name: this.filterText,
    });
    this.searchLoad = false;
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
.select-page-search .el-input__suffix {
  width: 25px !important;
  overflow: hidden;
}
.ih-select-page-user .el-select-dropdown__wrap {
  max-height: none !important;
  margin: 0 !important;
  overflow: auto;
}
.ih-select-page-user .el-scrollbar {
  display: block !important;
}
</style>

