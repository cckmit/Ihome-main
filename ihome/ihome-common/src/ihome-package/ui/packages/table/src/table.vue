<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-16 14:54:19
 * @LastEditors: wwq
 * @LastEditTime: 2020-09-21 17:05:54
-->
<template>
  <div class="box">
    <div class="table">
      <el-table
        ref="table"
        :height="height"
        :data="data"
        :border="border"
        :row-key="rowKey"
        :row-class-name="rowClassName"
        :highlight-current-row="highlightCurrentRow"
        @selection-change="(selection) => $emit('selection-change', selection)"
        @row-dblclick="(row, column, event) => $emit('row-dblclick', row, column, event)"
        @current-change="(currentRow, oldCurrentRow) => $emit('current-change', currentRow, oldCurrentRow)"
      >
        <el-table-column
          fixed
          v-if="columnCheck"
          width="40"
          min-width="40"
          type="selection"
          align="center"
        ></el-table-column>
        <el-table-column
          fixed
          v-if="columnIndex"
          width="50"
          label="序号"
          type="index"
          align="center"
          :index="indexHandler"
        ></el-table-column>
        <template v-for="(col, index) in column">
          <slot v-if="col.slot" :name="col.slot"></slot>
          <table-column v-else :option="col" :key="index" :fixed="col.fixed"></table-column>
        </template>
      </el-table>
    </div>
    <el-pagination
      class="pagination"
      v-if="isPagination"
      :current-page="pageCurrent"
      :total="pageTotal"
      :page-sizes="[5, 10, 20, 50, 100, 200]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="pageChangeHandler"
      @size-change="pageSizeChangeHandler"
    ></el-pagination>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import tableColumn from "./table-column.vue";
@Component({
  components: {
    tableColumn,
  },
})
export default class IhTable extends Vue {
  @Prop({
    default: "100%",
  })
  height!: string;
  @Prop() private data!: any;
  @Prop() private column!: any;
  @Prop({
    default: true,
  })
  border!: boolean;
  @Prop() private rowKey!: string;
  @Prop() private rowClassName!: any;
  @Prop({
    default: true,
  })
  highlightCurrentRow!: boolean;
  @Prop({
    default: true,
  })
  columnCheck!: boolean;
  @Prop({
    default: true,
  })
  columnIndex!: boolean;
  @Prop({
    default: true,
  })
  isPagination!: boolean;
  @Prop({
    default: 1,
  })
  pageCurrent!: number;
  @Prop({
    default: 1,
  })
  pageTotal!: number;
  @Prop({
    default: 20,
  })
  pageSize!: number;

  private selection: any = [];
  private isPageChange = false;

  @Watch("data")
  dataChange() {
    this.$nextTick(() => {
      if (this.isPageChange) {
        this.setSelection();
        this.isPageChange = false;
      }
    });
  }

  indexHandler(index: number) {
    return (this.pageCurrent - 1) * this.pageSize + index + 1;
  }
  pageSizeChangeHandler(val: any) {
    this.clearSelection();
    this.$emit("size-change", val);
  }
  pageChangeHandler(index: number) {
    this.isPageChange = true;
    this.$emit("page-change", index);
  }
  clearSelection() {
    this.selection = [];
    this.$emit("selection-change", []);
    (this.$refs as any).table.clearSelection();
  }
  setSelection() {
    const selection = this.selection[this.pageCurrent - 1];
    if (selection && selection.length) {
      selection.forEach((row: any) => {
        const currentRow = this.data.find((v: any) => this.isEqual(v, row));
        (this.$refs as any).table.toggleRowSelection(currentRow);
      });
    }
  }
  isEqual(obj1: any, obj2: any) {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
      return false;
    } else {
      for (let key in obj1) {
        if (obj2.hasOwnProperty(key)) {
          if (!Object.is(obj1[key], obj2[key])) {
            return false;
          }
        } else {
          return false;
        }
      }
      return true;
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  height: 100%;
  position: relative;
}
.table {
  position: absolute;
  top: 0;
  width: 100%;
}
.pagination {
  padding: 10px 0;
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>