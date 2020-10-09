<!--
 * @Descripttion: 
 * @version: 
 * @Author: wwq
 * @Date: 2020-09-16 14:54:19
 * @LastEditors: lgf
 * @LastEditTime: 2020-09-30 11:20:35
-->
<template>
  <div class="ih-table-box">
    <div class="ih-table">
      <el-table
        ref="table"
        :height="height"
        :data="data"
        :border="border"
        :row-key="rowKey"
        :isPeri="isPeri"
        :row-class-name="rowClassName"
        :highlight-current-row="highlightCurrentRow"
        @selection-change="(selection) => $emit('selection-change', selection)"
        @row-dblclick="
          (row, column, event) => $emit('row-dblclick', row, column, event)
        "
        @current-change="
          (currentRow, oldCurrentRow) =>
            $emit('current-change', currentRow, oldCurrentRow)
        "
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
        <template v-for="(col, index) in columns">
          <slot v-if="col.slot" :name="col.slot"></slot>
          <table-column
            v-else
            :option="col"
            :isPeri="isPeri"
            :key="index"
          ></table-column>
        </template>
      </el-table>
    </div>
    <el-pagination
      class="ih-pagination"
      v-if="isPagination"
      :current-page="pageCurrent"
      :total="pageTotal"
      :page-sizes="[20, 50, 100, 200]"
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
  @Prop() height?: string;
  @Prop() private data!: any;
  @Prop() private column!: any;
  @Prop({
    default: true,
  })
  border!: boolean;
  @Prop() private rowKey?: string;
  @Prop() private rowClassName?: any;
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
  @Prop({
    default: false,
  })
  isPeri!: boolean;

  private selection: any = [];
  private isPageChange = false;
  private columns: any = [];

  @Watch("data")
  dataChange() {
    this.$nextTick(() => {
      if (this.isPageChange) {
        this.setSelection();
        this.isPageChange = false;
      }
    });
  }
  @Watch("column", { immediate: true, deep: true })
  columnChange(column: any) {
    const enume = (arr: any) => {
      arr.forEach((v: any) => {
        if (v.children && v.children.length) {
          v.children.forEach((j: any) => {
            enume(v.children);
            if (j.peri) v.peri = "-";
          });
        }
      });
      return arr;
    };
    this.columns = enume(column);
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
.ih-table-box {
  height: 100%;
}
.ih-table {
  width: 100%;
}
.ih-pagination {
  text-align: right;
  padding-top: 20px;
}
</style>