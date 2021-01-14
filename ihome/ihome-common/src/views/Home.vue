<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-16 14:54:19
 * @LastEditors: zyc
 * @LastEditTime: 2021-01-14 15:18:18
-->
<template>
  <div>
    <h1>公共组件库</h1>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="key" label="组件" width="150"> </el-table-column>
      <el-table-column prop="name" label="名称" width="300"></el-table-column>
      <el-table-column prop="desc" label="描述"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-link type="primary" @click.native.prevent="info(scope)"
            >详情demo</el-link
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
// import { testApi, testPostApi } from "../api/test";

import { Component, Vue } from "vue-property-decorator";
 
@Component({
  components: {},
})
export default class Home extends Vue {
  private abc!: boolean;
  tableData: any = [
    {
      key: "IhUpload",
      name: "文件上传组件",
      desc: "文件上传统一组件",
      path: "/upload",
    },
    {
      key: "IhCascader",
      name: "省市区组件",
      desc: "省市区组件，支持省，省市，省市区三种类型",
      path: "/cascader",
    },
    {
      key: "IhSelectPageUser",
      name: "下拉分页",
      desc: "下拉分页组件，支持多列，搜索，分页",
      path: "/selectPage",
    },
    //  {
    //   key: "IhSelectPageDivision",
    //   name: "事业部下拉分页",
    //   desc: "事业部下拉分页组件，支持多列，搜索，分页",
    //   path: "/SelectPageDivision",
    // },
    {
      key: "IhTableCheckBox",
      name: "表格多选",
      desc: "表格多选，支持回显，显示选择项",
      path: "/tableCheckBox",
    },
    {
      key: "v-inputDigits（自定义指令）",
      name: "input输入数字限制小数位数",
      desc: "限制input框只能输入数字，支持小数位数限制",
      path: "/inputDigits",
    },
    {
      key: "IhLeftRightContainer",
      name: "左右拖拽大小容器",
      desc: "鼠标经过分割线可拖拽左右宽度,参考字典页面",
      path: "/leftRightContainer",
    },
    {
      key: "IhFilePreview",
      name: "文件预览组件",
      desc: "图片，pdf，其他",
      path: "/filePreview",
    },
  ];
  info(scope: any) {
    this.$router.push(scope.row.path);
  }
 
}
</script>
<style lang="scss" scoped>
</style>
