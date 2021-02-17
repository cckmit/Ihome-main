<!--
 * @Description: 下拉分页组件
 * @version: 
 * @Author: ywl
 * @Date: 2020-10-20 15:03:13
 * @LastEditors: wwq
 * @LastEditTime: 2021-02-17 09:55:23
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
    :multiple="multiple"
    ref="selectPage"
    :collapse-tags="collapseTags"
    popper-class="ih-select-page"
    class="width--100"
    :loading="searchLoad"
  >
    <!-- 搜索 -->
    <div class="selectInput">
      <el-input
        class="select-page-search"
        :placeholder="searchPlaceholder"
        v-model="filterText"
        :validate-event="false"
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
      v-for="(item) in optionList"
      :key="item[keyProp]"
      :label="item[labelProp]"
      :value="item[valueProp]"
      :disabled="item[disabledProp]"
      @click.native="handleClickOption(item)"
    >
      <template v-if="isTempOption">
        <span style="float: left">{{ item[optionProps.label] }}</span>
        <span
          class="margin-left-30"
          style="float: right; color: #8492a6; font-size: 13px"
        >{{ item[optionProps.value] }}</span>
      </template>
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

const debounce = (function () {
  let timer: any;
  return function (fn: any, interval?: any) {
    clearTimeout(timer);
    timer = setTimeout(fn, interval || 200);
  };
})();

@Component({})
export default class IhSelectPage extends Vue {
  @Prop() value!: string | number;
  @Prop() clearable?: boolean;
  @Prop() disabled?: boolean;
  @Prop() placeholder?: string;
  @Prop() valueKey?: string;
  @Prop() multiple?: boolean;
  @Prop() collapseTags?: boolean;
  @Prop() promiseFun?: Function;
  @Prop() searchName?: string;
  @Prop() proId?: any;
  @Prop() buildingId?: any;
  @Prop() propertyEnum?: any; // 物业类型
  @Prop() cascadeType?: any; // 级联类型 --- 栋座build/房间号room
  @Prop({
    default: false,
  })
  isCascade?: boolean; // 是否级联(栋座需要物业类型情况下)
  @Prop({
    default: false,
  })
  isTempOption?: boolean;
  @Prop({
    default: false,
  })
  isBlur?: boolean;
  @Prop({
    default: true,
  })
  switchHidePage?: boolean;
  @Prop({
    default: false,
  })
  isKeyUp?: boolean;
  @Prop({
    default: true,
  })
  isInit?: boolean;
  @Prop({
    default: "请输入两个关键字检索",
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
  props?: any;
  @Prop({
    default: () => {
      return {
        label: "label",
        value: "value",
      };
    },
  })
  optionProps?: any;

  private filterText = "";
  // 下拉列表
  optionList: any = [];
  // 分页信息
  pageInfo: any = {
    total: 0,
    pageNum: 1,
    pageSize: 10,
  };
  searchLoad = false;
  searchOne = false;

  // @Watch("value", { immediate: true, deep: true })
  // watchValue(val: any, old: any) {
  //   if (typeof old === "undefined" && val) {
  //     this.filterText = val.name;
  //   }
  // }
  @Watch("filterText")
  filter(val: any) {
    if (val.length >= 2 && !this.isKeyUp) {
      if (this.searchOne) {
        this.getSelectList();
        this.searchOne = false;
      } else {
        debounce(this.getSelectList, 500);
      }
    } else if (!val.length && this.isInit) {
      this.getSelectList();
    }
  }
  @Watch("searchName", { immediate: true })
  watchSearch(val: any) {
    if (val) {
      this.filterText = val;
      this.searchOne = true;
    }
  }

  private get labelProp(): string {
    return (this.props as any).lable || "label";
  }
  private get valueProp(): string {
    return (this.props as any).value || "value";
  }
  private get keyProp(): string {
    return (this.props as any).key || "key";
  }
  private get disabledProp(): string {
    return (this.props as any).disabled || "disabled";
  }

  handleVisible(val: any): void {
    if (this.isCascade) {
      if (val) {
        // 判断是栋座还是房间号
        switch (this.cascadeType) {
          case "build":
            // 栋座：项目id + 物业类型
            if (this.isBlur && (!this.proId || !this.propertyEnum)) {
              (this.$refs.selectPage as any).blur();
              this.handleMessage();
            }
            return;
          case "room":
            // 房间号：项目id + 栋座
            if (this.isBlur && (!this.proId || !this.buildingId)) {
              (this.$refs.selectPage as any).blur();
              this.handleMessage();
            }
            return;
        }
      }
    } else {
      if (val) {
        if (this.isBlur && !this.proId) {
          (this.$refs.selectPage as any).blur();
          this.handleMessage();
        }
      }
    }
  }
  handleMessage() {
    // 不能点击时候的提醒 -- 需要重写
  }
  handleKeyup() {
    if (this.isKeyUp) {
      this.getSelectList();
    }
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
    this.$emit("changeOption", data);
  }

  mounted() {
    if (this.isInit) {
      this.getSelectList();
    }
  }
}
</script>

<style scoped>
.selectInput {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 4px 9px;
  box-sizing: border-box;
  z-index: 100;
}
</style>
<style>
.select-page-search .el-input__suffix {
  width: 25px !important;
  overflow: hidden;
}
.ih-select-page .el-select-dropdown__list {
  padding-top: 46px !important;
}
.ih-select-page .el-select-dropdown__wrap {
  max-height: 500px !important;
}
.ih-select-page .el-scrollbar {
  display: block !important;
}
</style>
