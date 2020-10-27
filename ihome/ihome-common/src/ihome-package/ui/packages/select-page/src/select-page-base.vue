<!--
 * @Description: 下拉分页组件
 * @version: 
 * @Author: ywl
 * @Date: 2020-10-20 15:03:13
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-27 14:55:40
-->
<template>
  <el-select
    :value="value"
    @change="handleChange"
    :clearable="clearable"
    :disabled="disabled"
    :placeholder="placeholder"
    :value-key="valueKey"
    :multiple="multiple"
    :collapse-tags="collapseTags"
    popper-class="ih-select-page"
  >
    <!-- 搜索 -->
    <el-input
      class="selectInput"
      :placeholder="searchPlaceholder"
      v-model="filterText"
    ></el-input>
    <!-- 下拉部分 -->
    <el-option
      v-for="(item, index) in optionList"
      :key="item[keyProp]"
      :label="item[labelProp]"
      :value="valueKey ? item : item[valueProp]"
      :disabled="item[disabledProp]"
      @click.native="handleClickOption(item)"
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
        @current-change="getSelectList"
        :hide-on-single-page="switchHidePage"
        :current-page.sync="pageInfo.pageNum"
        :page-size="pageInfo.pageSize"
        layout="prev,pager,next,total"
        :total="pageInfo.total"
      >
      </el-pagination>
    </div>
  </el-select>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({})
export default class IhSelectPage extends Vue {
  @Prop() value!: any;
  @Prop() clearable?: boolean;
  @Prop() disabled?: boolean;
  @Prop() placeholder?: string;
  @Prop() valueKey?: string;
  @Prop() multiple?: boolean;
  @Prop() collapseTags?: boolean;
  @Prop() promiseFun?: Function;
  @Prop({
    default: false,
  })
  switchHidePage?: boolean;
  @Prop({
    default: "检索关键字",
  })
  searchPlaceholder?: string;
  @Prop({
    default: () => {
      return {
        lable: "lable",
        value: "value",
        key: "key",
        disabled: "disabled",
      };
    },
  })
  props?: PropsType;

  private filterText = "";
  // 下拉列表
  optionList: any = [];
  // 分页信息
  pageInfo: any = {
    total: 0,
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
    return (this.props as PropsType).lable || "label";
  }
  private get valueProp(): string {
    return (this.props as PropsType).value || "value";
  }
  private get keyProp(): string {
    return (this.props as PropsType).key || "key";
  }
  private get disabledProp(): string {
    return (this.props as PropsType).disabled || "disabled";
  }

  async getSelectList() {
    console.error(
      "getSelectList是需要重写回调的方法， pageInfo: 分页信息-不是必要、optionList：下拉列表"
    );
    // console.log(this.promiseFun);
    // this.tableList = await post_user_getList({
    //   pageSize: this.tableList.pageSize,
    //   pageNum: this.tableList.pageNum,
    //   name: this.filterText,
    // });
  }
  handleChange(val: any) {
    this.$emit("change", val);
    this.$emit("input", val);
  }
  handleClickOption(data: any) {
    this.$emit("optionClick", data);
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
.ih-select-page {
  max-height: 400px;
}
.ih-select-page .el-scrollbar {
  display: block !important;
}
</style>
