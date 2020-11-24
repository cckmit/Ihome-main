<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-09 16:05:00
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-09 16:05:00
-->
<template>
  <div class="ih-table-checkBox">
    <el-tabs type="border-card" v-model="tabActive">
      <el-tab-pane label="选择项" name="1">
        <div class="ih-table">
          <el-table
            ref="checkTable"
            :height="height"
            :max-height="maxHeight"
            :data="data"
            :border="border"
            :row-key="getRowKeys"
            @selection-change="handleSelectChange">
            <el-table-column
              fixed
              v-if="isSelection"
              :reserve-selection="true"
              width="50"
              min-width="50"
              type="selection"
              align="center"
            ></el-table-column>
            <el-table-column
              v-for="item in column"
              :key="item.prop"
              :prop="item.prop"
              :label="item.label"
              :min-width="item.minWidth"
              :align="item.align"
            ></el-table-column>
          </el-table>
        </div>
        <el-pagination
          class="ih-pagination"
          v-if="isPagination"
          :current-page="pageCurrent"
          :total="pageTotal"
          :page-sizes="[10, 20, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="pageChangeHandler"
          @size-change="pageSizeChangeHandler"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="已选项" name="2" v-if="isSelection">
        <el-table
          :height="height"
          :max-height="maxHeight"
          :data="checkedData"
          :border="border">
          <el-table-column
            v-for="item in column"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :min-width="item.minWidth"
            :align="item.align"
          ></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-link
                class="margin-right-10"
                type="primary"
                @click.native.prevent="remove(scope)"
              >删除
              </el-link>
            </template>
          </el-table-column>
        </el-table>
        <div class="el-pagination__total text-align">已选{{checkedData.length}}条</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";

  @Component({
    components: {},
  })
  export default class IhTableCheckBox extends Vue {
    @Prop() height?: string;
    @Prop() maxHeight?: string;
    @Prop() private data!: any; // 选择项
    @Prop() private hasCheckedData!: any; // 已选项
    @Prop() private rowKey!: any; // 选择项的标识
    @Prop() private column!: any; // 表头
    @Prop({
      default: false,
    })
    border!: boolean;
    @Prop({
      default: true,
    })
    isSelection!: boolean;
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
      default: 10,
    })
    pageSize!: number;

    private tabActive: any = null;
    private checkedData: any = [];
    private isPageChange = false;

    created() {
      this.tabActive = "1";
      this.init();
    }

    // 初始化回显
    init() {
      this.$nextTick(() => {
        if (this.hasCheckedData && this.hasCheckedData.length > 0) {
          this.hasCheckedData.forEach((data: any) => {
            (this as any).$refs.checkTable.toggleRowSelection(data, true);
          });
        }
      })
    }

    // 获取row的key值
    getRowKeys(row: any) {
      return row[this.rowKey];
    }

    // 勾选
    handleSelectChange(selection: any) {
      // console.log('selection', selection);
      this.$emit('selection-change', selection);
      if (selection && selection.length > 0) {
        this.checkedData = selection;
      } else {
        this.checkedData = [];
      }
    }

    pageSizeChangeHandler(val: any) {
      this.$emit("size-change", val);
    }

    pageChangeHandler(index: number) {
      this.isPageChange = true;
      this.$emit("page-change", index);
    }

    async remove(scope: any) {
      // console.log('scope', scope);
      try {
        await this.$confirm("是否确定删除?", "提示");
        // 取消选择项中对应的项
        (this as any).$refs.checkTable.toggleRowSelection(scope.row);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
</script>
<style lang="scss" scoped>
  .ih-table-checkBox {
    height: 100%;
  }

  .ih-table {
    width: 100%;
  }

  .ih-pagination {
    text-align: right;
    padding-top: 20px;
  }

  .text-align {
    text-align: right;
    box-sizing: border-box;
    padding-top: 20px;
    color: #F90;
  }
</style>