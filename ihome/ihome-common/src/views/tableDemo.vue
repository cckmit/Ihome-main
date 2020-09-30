<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-16 14:54:19
 * @LastEditors: wwq
 * @LastEditTime: 2020-09-30 16:52:07
-->
<template>
  <div class="tableDemo">
    <ih-table
      :data="tableData"
      :column="tableColumn"
      :isPeri="true"
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
          <template v-slot="{ row }">
            <el-link type="primary" @click.native.prevent="routerTo(row)"
              >详情</el-link
            >
            <el-dropdown trigger="click" class="margin-left-15">
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native.prevent="routerTo(row)"
                  >编辑</el-dropdown-item
                >
                <el-dropdown-item @click.native.prevent="routerTo(row)"
                  >删除角色</el-dropdown-item
                >
                <el-dropdown-item @click.native.prevent="routerTo(row)"
                  >分配权限</el-dropdown-item
                >
                <el-dropdown-item @click.native.prevent="routerTo(row)"
                  >批量分配岗位</el-dropdown-item
                >
                <el-dropdown-item @click.native.prevent="routerTo(row)"
                  >批量分配用户</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </template>
      <template #age>
        <el-table-column label="年龄" width="500" align="left">
          <template v-slot="{ row }">
            <span :class="{ red: row.age > 20 }">{{ row.age }}</span>
          </template>
        </el-table-column>
      </template>
    </ih-table>
  </div>
</template>
<script lang="ts">
import { gender } from "@/util/enums/dic.ts";
import { Component, Vue } from "vue-property-decorator";
import { tableApi } from "@/api/test";
@Component({})
export default class TableDemo extends Vue {
  private tableData: any = [];
  private tableColumn = [
    {
      label: "名称",
      align: "center",
      fixed: true,
      minWidth: 640,
      children: [
        {
          label: "名称1",
          align: "center",
          children: [
            {
              label: "名称1-1",
              prop: "name1",
              peri: "111",
            },
            {
              label: "名称1-2",
              prop: "name2",
              peri: "111",
            },
          ],
        },
        {
          label: "名称2",
          prop: "name2",
          peri: "222",
        },
        {
          label: "名称3",
          align: "center",
          children: [
            {
              label: "名称3-1",
              align: "center",
              children: [
                {
                  label: "名称3-1-1",
                  width: 100,
                  align: "center",
                  prop: "name3",
                  peri: "333",
                },
                {
                  label: "名称3-1-2",
                  width: 100,
                  align: "center",
                  prop: "name3",
                  peri: "333",
                },
              ],
            },
            {
              label: "名称3-2",
              align: "center",
              children: [
                {
                  label: "名称3-2-1",
                  prop: "name3",
                  width: 100,
                  align: "center",
                  peri: "333",
                },
                {
                  label: "名称3-2-2",
                  prop: "name3",
                  width: 100,
                  align: "center",
                  peri: "333",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      slot: "age",
    },
    {
      label: "性别",
      prop: "gender",
      minWidth: 500,
      formatter: (cell: any) => {
        // return (this.$root as any).$root.displayName("gender", row.gender);
        return gender[cell.gender];
      },
      peri: "gender",
    },
    {
      label: "职业",
      prop: "profession",
      width: 500,
      peri: "profession",
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
  created() {
    tableApi().then((res: any) => {
      console.log(res);
      this.tableData = res.list;
    });
  }
}
</script>
<style lang="scss" scoped>
.red {
  color: #ff455b;
}
</style>