<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-16 14:54:19
 * @LastEditors: wwq
 * @LastEditTime: 2020-09-21 18:06:45
-->
<template>
  <div class="tableDemo">
    <ih-table
      height="500"
      :data="tableData"
      :column="tableColumn"
      @row-dblclick="rowDblclick"
      @selection-change="selectionChange"
      @current-change="currentChange"
      :pageSize="pageSize"
      :pageCurrent="currentPage"
      :pageTotal="tableData.length"
      @page-change="pageChange"
      @size-change="sizeChange"
    >
      <template #operation>
        <el-table-column label="操作" width="150" align="left" fixed="right">
          <template v-slot="{row}">
            <el-link type="primary" @click.native.prevent="routerTo(row)">详情</el-link>
            <el-dropdown trigger="click" class="margin-left-15">
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native.prevent="routerTo(row)">编辑</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="routerTo(row)">删除角色</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="routerTo(row)">分配权限</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="routerTo(row)">批量分配岗位</el-dropdown-item>
                <el-dropdown-item @click.native.prevent="routerTo(row)">批量分配用户</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </template>
    </ih-table>
  </div>
</template>
<script lang="ts">
import { gender } from "@/util/enums/dic.ts";
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class TableDemo extends Vue {
  private tableData: any = [];
  private tableColumn = [
    {
      label: "名称",
      prop: "name",
      width: 100,
      fixed: true,
    },
    {
      label: "年龄",
      prop: "age",
      width: 500,
    },
    {
      label: "性别",
      prop: "gender",
      width: 500,
      formatter: (cell: any) => {
        // return (this.$root as any).$root.displayName("gender", row.gender);
        return gender[cell.gender];
      },
    },
    {
      label: "职业",
      prop: "profession",
      width: 500,
    },
    {
      slot: "operation",
    },
  ];
  private pageSize = 5;
  private currentPage = 1;
  private pageTotal = 0;
  private rowDblclick(row: any, column: any, event: any) {
    console.log(row, column, event, "rowDblclick");
  }
  private selectionChange(selection: any) {
    console.log(selection, "selectionChange");
  }
  private currentChange(currentRow: any, oldCurrentRow: any) {
    console.log(currentRow, oldCurrentRow, "currentChange");
  }
  private pageChange(index: number) {
    this.currentPage = index;
    this.getImage();
    console.log(index, "pageChange");
  }
  private sizeChange(val: any) {
    this.currentPage = 1;
    this.pageSize = val;
    this.getImage();
    console.log(val, "sizeChange");
  }
  routerTo(where: any) {
    console.log(where, "操作");
  }
  private getImage() {
    console.log(this.$root);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            name: "aaa",
            age: 18,
            gender: "1",
            profession: "aaa",
          },
          {
            name: "bbb",
            age: 19,
            gender: "0",
            profession: "bbb",
          },
          {
            name: "ccc",
            age: 20,
            gender: "1",
            profession: "ccc",
          },
          {
            name: "ddd",
            age: 21,
            gender: "0",
            profession: "ddd",
          },
          {
            name: "eee",
            age: 22,
            gender: "1",
            profession: "eee",
          },
          {
            name: "fff",
            age: 23,
            gender: "1",
            profession: "fff",
          },
          {
            name: "ggg",
            age: 24,
            gender: "1",
            profession: "ggg",
          },
        ]);
      });
    });
  }
  created() {
    this.getImage().then((res: any) => {
      this.tableData = res;
    });
  }
}
</script>
<style lang="scss" scoped>
.tableDemo {
  height: 700px;
}
</style>