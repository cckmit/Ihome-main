<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-09 16:35:00
 * @LastEditors: ywl
 * @LastEditTime: 2020-12-29 09:19:46
-->
<template>
  <div class="table-checkbox-demo">
    <IhTableCheckBox
      :isSingle="true"
      valueKey="code"
      :data="tableData"
      :hasCheckedData="hasCheckedData"
      :rowKey="rowKey"
      :column="tableColumn"
      :maxHeight="tableMaxHeight"
      @selection-change="selectionChange"
      :pageSize="pageSize"
      :pageCurrent="currentPage"
      :pageTotal="pageTotal"
      @page-change="pageChange"
      @size-change="sizeChange"
    >
      <template #city>
        <el-table-column
          label="市"
          prop="city"
        ></el-table-column>
      </template>
    </IhTableCheckBox>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class TableDemo extends Vue {
  private tableData: any = [];
  private hasCheckedData: any = []; // 已选数据
  private rowKey: any = null; // 选择项的标识
  private tableMaxHeight: any = 500;
  private tableColumn = [
    {
      prop: "code",
      label: "盘编",
      align: "left",
      minWidth: 100,
    },
    {
      prop: "name",
      label: "项目名称",
      align: "left",
      minWidth: 100,
    },
    {
      prop: "private",
      label: "省",
      align: "left",
      minWidth: 100,
    },
    {
      slot: "city",
    },
    {
      prop: "area",
      label: "区",
      align: "left",
      minWidth: 100,
    },
  ];
  private pageSize = 10;
  private currentPage = 1;
  private pageTotal = 0;
  private allTableData: any = [];

  // 获取选中项 --- 最后需要获取的数据
  private selectionChange(selection: any) {
    console.log(selection, "selectionChange");
  }

  private pageChange(index: number) {
    this.currentPage = index;
    // console.log(index, "pageChange");
    // 假分页
    if (index === 1) {
      this.tableData = this.allTableData.slice(0, this.pageSize);
    } else {
      this.tableData = this.allTableData.slice(
        (index - 1) * this.pageSize,
        index * this.pageSize
      );
    }
  }

  private sizeChange(val: any) {
    this.currentPage = 1;
    this.pageSize = val;
    // console.log(val, "sizeChange");
    // 假分页
    this.tableData = this.allTableData.slice(0, this.pageSize);
  }

  created() {
    // 初始化数据 --- 假的
    for (let i = 0; i <= 50; i++) {
      let obj = {
        code: i,
        name: `项目${i}`,
        private: `省${i}`,
        city: `市${i}`,
        area: `区${i}`,
        checked: false,
      };
      this.allTableData.push(obj);
    }
    this.rowKey = "code";
    this.pageTotal = this.allTableData.length;
    if (this.allTableData.length > 0) {
      this.tableData = this.allTableData.slice(0, this.pageSize);
      // 多选-初始化勾选-回显勾选
      // this.allTableData.forEach((data: any) => {
      //   if ([0, 3, 6, 20].includes(data.code)) {
      //     this.hasCheckedData.push(data);
      //   }
      // })
      // 单选-初始化勾选
      // this.allTableData.forEach((data: any) => {
      //   if (data.checked) {
      //     this.hasCheckedData.push(data);
      //   }
      // })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>