<!--
 * @Description: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-09 16:05:00
 * @LastEditors: lsj
 * @LastEditTime: 2021-05-14 10:29:22
-->
<template>
  <div class="ih-table-checkBox">
    <el-tabs
      type="border-card"
      v-model="tabActive"
    >
      <el-tab-pane
        label="选择项"
        name="1"
      >
        <div class="ih-table">
          <el-table
            ref="checkTable"
            :height="height"
            :max-height="maxHeight"
            :data="data"
            :border="border"
            :row-key="getRowKeys"
            :row-class-name="rowClassName"
            @selection-change="handleSelectChange"
          >
            <el-table-column
              fixed
              v-if="isSingle"
              width="50"
              min-width="50"
              align="center"
            >
              <template slot-scope="scope">
                <el-checkbox
                  v-model="scope.row.checked"
                  @change="changSingle($event, scope)"
                ></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column
              fixed
              v-else
              :reserve-selection="true"
              width="50"
              min-width="50"
              type="selection"
              :selectable="columnSelectable"
              align="center"
            ></el-table-column>
            <template v-for="(item, index) in column">
              <slot
                v-if="item.slot"
                :name="item.slot"
              ></slot>
              <el-table-column
                v-else
                :key="index"
                :prop="item.prop"
                :label="item.label"
                :min-width="item.minWidth"
                :align="item.align"
              ></el-table-column>
            </template>
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
      <el-tab-pane
        label="已选项"
        name="2"
        v-if="isSelection"
      >
        <el-table
          :height="height"
          :max-height="maxHeight"
          :data="checkedData"
          :border="border"
        >
          <template v-for="(item, index) in column">
            <slot
              v-if="item.slot"
              :name="item.slot"
            ></slot>
            <el-table-column
              v-else
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :min-width="item.minWidth"
              :align="item.align"
            ></el-table-column>
          </template>
          <el-table-column
            fixed="right"
            label="操作"
            width="100"
          >
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
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

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
    default: () => {
      return ""
    }
  })
  rowClassName: any; // 可将表格内容 highlight 显示，方便区分「成功、信息、警告、危险」等内容。
  @Prop({
    default: "id",
  })
  valueKey!: string; // 单选/多选用于匹配数据的唯一值，不传默认id
  @Prop({
    default: false,
  })
  isSingle!: boolean; // 是否单选
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
  @Prop() columnSelectable?: any; // 仅对 type=selection 的列有效，返回值用来决定这一行的 CheckBox 是否可以勾选

  private tabActive: any = null;
  private checkedData: any = [];
  private isPageChange = false;

  @Watch("data")
  dataChange() {
    if (this.isSingle) {
      // 单选
      if (this.checkedData.length > 0) {
        this.checkedData.forEach((data: any) => {
          this.data.forEach((item: any) => {
            if (data[this.valueKey] === item[this.valueKey]) {
              item.checked = true;
            } else {
              item.checked = false;
            }
          });
        });
      } else {
        this.data.forEach((item: any) => {
          item.checked = false;
        });
      }
    }
  }

  created() {
    this.tabActive = "1";
    this.init();
  }

  // 初始化回显
  init() {
    this.$nextTick(() => {
      // console.log(this.hasCheckedData);
      if (this.isSingle) {
        // 单选模式
        this.checkedData = JSON.parse(JSON.stringify(this.hasCheckedData));
        this.data.forEach((item: any) => {
          this.hasCheckedData.forEach((data: any) => {
            if (item[this.valueKey] === data[this.valueKey]) {
              item.checked = true;
            } else {
              item.checked = false;
            }
          });
        });
      } else {
        // 多选模式
        if (this.hasCheckedData && this.hasCheckedData.length > 0) {
          this.hasCheckedData.forEach((data: any) => {
            (this as any).$refs.checkTable.toggleRowSelection(data, true);
          });
          this.checkedData = JSON.parse(JSON.stringify(this.hasCheckedData));
        }
      }
    });
  }

  // 获取row的key值
  getRowKeys(row: any) {
    return row[this.rowKey];
  }

  // 勾选
  handleSelectChange(selection: any) {
    // console.log('selection', selection);
    if (selection && selection.length > 0) {
      this.checkedData = selection;
    } else {
      this.checkedData = [];
    }
    this.$emit("selection-change", selection);
  }

  // 改变每页长度
  pageSizeChangeHandler(val: any) {
    this.$emit("size-change", val);
  }

  // 改变页码
  pageChangeHandler(index: number) {
    this.isPageChange = true;
    this.$emit("page-change", index);
  }

  // 删除选择项
  async remove(scope: any) {
    // console.log('scope', scope);
    try {
      await this.$confirm("是否确定删除?", "提示");
      // 取消选择项中对应的项
      if (this.isSingle) {
        // 单选
        this.$nextTick(() => {
          this.data.forEach((item: any) => {
            if (item[this.valueKey] === scope.row[this.valueKey]) {
              item.checked = false;
            }
          });
        });
        this.checkedData = [];
        this.$emit("selection-change", this.checkedData);
      } else {
        // 多选
        this.checkedData = this.checkedData.filter((data: any) => {
          return data[this.valueKey] !== scope.row[this.valueKey];
        });
        this.$nextTick(() => {
          (this as any).$refs.checkTable.toggleRowSelection(scope.row);
        });
      }
      this.$message({
        type: "success",
        message: "删除成功!",
      });
    } catch (error) {
      console.log(error);
    }
  }

  // 单选模式，改变选项
  changSingle(e: any, scope: any) {
    // console.log(e);
    // console.log(scope);
    this.checkedData = [];
    if (e) {
      this.data.forEach((item: any, index: any) => {
        if (index !== scope.$index) {
          item.checked = false;
        } else {
          this.checkedData.push(item);
        }
      });
    }
    this.$emit("selection-change", this.checkedData);
  }

  // 多选模式下，取消全选
  handleClearSelection() {
    if (this.isSingle) return;
    (this as any).$refs.checkTable && (this as any).$refs.checkTable.clearSelection();
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
  color: #f90;
}
</style>