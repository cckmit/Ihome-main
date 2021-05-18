<!--
 * @Description: 表格多选，支持回显，显示选择项
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-09 16:05:00
 * @LastEditors: lsj
 * @LastEditTime: 2021-05-18 09:38:28
-->
<template>
  <div class="ih-table-checkBox">
    <el-tabs
      type="border-card"
      v-model="tabActive">
      <el-tab-pane
        label="选择项"
        name="1">
        <div class="ih-table">
          <el-table
            class="ih-table"
            ref="checkTable"
            :height="height"
            :max-height="maxHeight"
            :data="data"
            :border="border"
            :stripe="stripe"
            :size="size"
            :row-key="getRowKeys"
            :row-class-name="rowClassName"
            @selection-change="handleSelectChange">
            <el-table-column
              fixed
              v-if="isSingle"
              width="50"
              min-width="50"
              align="center">
              <template slot-scope="scope">
                <el-checkbox
                  class="single-checkbox"
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
                v-if="item.slot && item.type !== 'selection'"
                :name="item.slot"
              ></slot>
              <el-table-column
                v-else
                :key="index"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :min-width="item.minWidth"
                :align="item.align"
              ></el-table-column>
            </template>
            <el-table-column
              v-if="operation.length"
              fixed="right"
              label="操作"
              width="120">
              <template slot-scope="scope">
                <div v-if="operation.length > 2">
                  <el-link
                    class="margin-right-10"
                    type="primary"
                    @click.native.prevent="operation[0].btnMethods(scope)"
                  >{{operation[0].btnName}}
                  </el-link>
                  <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    更多
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        v-for="(item, index) in moreOperation" :key="index"
                        @click.native.prevent="item.btnMethods(scope)"
                      >{{item.btnName}}
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
                <div v-else>
                  <el-link
                    v-for="(item, index) in operation" :key="index"
                    class="margin-right-10"
                    type="primary"
                    @click.native.prevent="item.btnMethods(scope)">{{item.btnName}}
                  </el-link>
                </div>
              </template>
            </el-table-column>
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
        :label="checkedData.length ? `已选项(${checkedData.length})条` : '已选项'"
        name="2"
        v-if="isSelection">
        <el-table
          class="ih-table"
          :height="height"
          :max-height="maxHeight"
          :data="checkedData"
          :stripe="stripe"
          :size="size"
          :border="border">
          <template v-for="(item, index) in column">
            <slot
              v-if="item.slot && item.type !== 'selection'"
              :name="item.slot"
            ></slot>
            <el-table-column
              v-else
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :min-width="item.minWidth"
              :align="item.align"
            ></el-table-column>
          </template>
          <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <div v-if="operation.length">
                <el-link
                  class="margin-right-10"
                  type="primary"
                  @click.native.prevent="remove(scope)">移除
                </el-link>
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    更多
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      v-for="(item, index) in operation" :key="index"
                      @click.native.prevent="item.btnMethods(scope)"
                    >{{item.btnName}}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div v-else>
                <el-link
                  class="margin-right-10"
                  type="primary"
                  @click.native.prevent="remove(scope)">移除
                </el-link>
              </div>
            </template>
          </el-table-column>
        </el-table>
<!--        <div class="el-pagination__total text-align">已选{{checkedData.length}}条</div>-->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
/**
 * actionSheet 表格多选，支持回显，显示选择项
 * @description 本组件基于Table组件的二次封装，主要用于显示已选择项。支持单选多选模式。
 * @property {Array<Object>} operation 表格操作菜单按钮数组。没有则默认在已选项中显示一个【移除】按钮。
 * @property {String/Number} height Table的高度，默认为自动高度。
 * @property {String/Number} maxHeight Table的最大高度。
 * @property {Array} data Table的选择项
 * @property {Array} hasCheckedData Table的已选项
 * @property {String} rowKey Table行数据的 Key，用来优化 Table 的渲染
 * @property {Boolean} border 是否带有纵向边框，（默认false）。
 * @property {Array<Object>} column Table的表头
 * @property {Array<Object>} rowClassName 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。
 * @property {String} valueKey 单选/多选用于匹配数据的唯一值，不传默认id
 * @property {Boolean} isSingle 是否单选，默认（默认false多选）。
 * @property {Boolean} stripe 是否为斑马纹 table，（默认false）。
 * @property {String} size Table 的尺寸
 * @property {Boolean} isSelection 是否显示已选项，默认true。
 * @property {Boolean} isPagination 是否显示分页组件，默认true。
 * @property {Function(row, index)} columnSelectable 仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选
 * @property {Function(selection)} selection-change 当选择项发生变化时会触发该事件
 */

import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({
  components: {},
})
export default class IhTableCheckBox extends Vue {
  @Prop({
    default: () => {
      return [];
    }
  })
  operation?: any; // 表格操作栏按钮，数组对象，key：btnName --- 按钮名字；btnMethods --- 按钮方法。回参scope。
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
    default: false,
  })
  stripe!: boolean;
  @Prop({
    default: '',
  })
  size!: string;
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

  get moreOperation() {
    let list: any = [];
    if (this.operation && this.operation.length > 1) {
      this.operation.forEach((item: any, index: any) => {
        if (index !== 0) {
          list.push(item);
        }
      });
    }
    // console.log('moreOperation', list);
    return list;
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
    /*this.$message({
      type: "success",
      message: "删除成功!",
    });*/
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
.single-checkbox {
  /deep/.el-checkbox__inner {
    width: 16px;
    height: 16px;
    border-radius: 8px;
  }
  /deep/.el-checkbox__inner::after {
    left: 5px;
    top: 2px;
  }
}
</style>