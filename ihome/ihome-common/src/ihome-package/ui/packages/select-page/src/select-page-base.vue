<!--
 * @Description: 下拉分页组件
 * @version: 
 * @Author: ywl
 * @Date: 2020-10-20 15:03:13
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-26 16:19:18
-->
<template>
  <el-select
    :value="value"
    @change="handleChange"
    :clearable="clearable"
    :disabled="disabled"
    :placeholder="placeholder"
    :value-key="valueKey"
  >
    <!-- 搜索 -->
    <el-input
      class="selectInput"
      :placeholder="searchPlaceholder"
      v-model="filterText"
    ></el-input>
    <!-- 下拉部分 -->
    <el-option
      v-for="(item, index) in tableList.list"
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
        :current-page.sync="tableList.pageNum"
        :page-size="tableList.pageSize"
        layout="prev,pager,next,total"
        :total="tableList.total"
      >
      </el-pagination>
    </div>
  </el-select>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({})
export default class IhSelectPage extends Vue {
  @Prop() value!: string | number;
  @Prop() clearable?: boolean;
  @Prop() disabled?: boolean;
  @Prop() placeholder?: string;
  @Prop() valueKey?: string;
  @Prop() promiseFun?: Function;
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
  tableList: any = {
    list: [],
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
    console.error("需要重写回调的方法");
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
    console.log(data);
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
