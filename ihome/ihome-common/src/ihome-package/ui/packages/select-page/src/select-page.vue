<!--
 * @Description: 下拉分页组件
 * @version: 
 * @Author: ywl
 * @Date: 2020-10-20 15:03:13
 * @LastEditors: ywl
 * @LastEditTime: 2020-10-21 10:47:30
-->
<template>
  <el-select
    :value="value"
    @change="handle"
    :clearable="clearable"
    :disabled="disabled"
  >
    <!-- 搜索 -->
    <el-input
      class="selectInput"
      placeholder="检索关键字"
      v-model="filterText"
    ></el-input>
    <!-- 下拉部分 -->
    <el-option
      v-for="(item, index) in tableList.list"
      :key="item[keyProp]"
      :label="item[labelProp]"
      :value="item[valueProp]"
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
  @Prop() promiseFun?: Function;
  @Prop({
    default: {
      lable: "lable",
      value: "value",
      key: "key",
      disabled: "disabled",
    },
  })
  props?: PropsType;

  private filterText = "";
  private optionsList = [1];
  private tableList: any = {
    list: [],
    total: 0,
  };
  private pageInfo = {
    pageNum: 1,
    pageSize: 1,
  };

  @Watch("value")
  watchValue(val: any) {
    console.log(val);
  }
  @Watch("filterText")
  filter(val: any) {
    console.log(val);
    this.getSelectList();
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
    // console.log(this.promiseFun);
    if (this.promiseFun) {
      this.tableList = await this.promiseFun({
        ...this.pageInfo,
        name: this.filterText,
      });
    } else {
      this.tableList = await post_user_getList({
        ...this.pageInfo,
        name: this.filterText,
      });
    }
  }
  handle(val: any) {
    this.$emit("input", val);
    console.log(val, this.value);
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
  padding: 0 5px;
  box-sizing: border-box;
}
</style>
