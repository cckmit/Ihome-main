<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-03 15:28:12
 * @LastEditors: wwq
 * @LastEditTime: 2020-12-11 08:48:13
-->
<template>
  <el-dialog
    v-dialogDrag
    title="选择项目周期列表"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="beforeFinish"
    append-to-body
    width="1000px"
    style="text-align: left"
    class="dialog"
  >
    <el-form
      ref="form"
      label-width="100px"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="项目周期名称">
            <el-input
              v-model="queryPageParameters.termName"
              placeholder="项目周期名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="业务类型">
            <el-select
              v-model="queryPageParameters.busTypeEnum"
              clearable
              placeholder="业务类型"
            >
              <el-option
                v-for="item in $root.dictAllList('BusinessType')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="">
            <el-button
              type="primary"
              @click="getListMixin()"
            >查询</el-button>
            <el-button
              type="info"
              @click="reset()"
            >重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <IhTableCheckBox
      :isSingle="true"
      :valueKey="rowKey"
      :data="resPageInfo.list"
      :hasCheckedData="hasCheckedData"
      :rowKey="rowKey"
      :column="tableColumn"
      :maxHeight="tableMaxHeight"
      @selection-change="selectionChange"
      :pageSize="pageSize"
      :pageCurrent="currentPage"
      :pageTotal="resPageInfo.total"
      @page-change="pageChange"
      @size-change="sizeChange"
    >
    </IhTableCheckBox>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="primary"
        @click="finish"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import { post_term_getList } from "@/api/project/index";
import PaginationMixin from "@/mixins/pagination";

@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class SelectProjectCycle extends Vue {
  constructor() {
    super();
  }

  private rowKey: any = "id"; // 选择项的标识
  private tableMaxHeight: any = 500;
  private tableColumn = [
    {
      prop: "termName",
      label: "栋座",
      align: "left",
      minWidth: 200,
    },
    {
      prop: "busTypeEnum",
      label: "房号",
      align: "left",
      minWidth: 100,
    },
    {
      prop: "termStart",
      label: "户型",
      align: "left",
      minWidth: 140,
    },
    {
      prop: "termEnd",
      label: "房型",
      align: "left",
      minWidth: 140,
    },
    {
      prop: "termEnd",
      label: "面积",
      align: "left",
      minWidth: 140,
    },
    {
      prop: "termEnd",
      label: "朝向",
      align: "left",
      minWidth: 140,
    },
  ];
  private pageSize = 10;
  private currentPage = 1;

  @Prop({ default: null }) data: any;
  @Prop({
    default: () => [],
  })
  hasCheckedData!: any;
  dialogVisible = true;
  resPageInfo: any = {
    total: null,
    list: [],
  };

  queryPageParameters: any = {
    termName: null,
    busTypeEnum: null,
  };
  currentSelection: any = []; // 当前选择的项

  created() {
    this.getListMixin();
  }

  async beforeFinish() {
    this.$emit("cancel");
  }

  async finish() {
    if (this.currentSelection.length === 0) {
      this.$message({
        type: "error",
        message: "请选择房号",
      });
      return;
    }
    this.$emit("finish", this.currentSelection);
  }

  // 获取选中项 --- 最后需要获取的数据
  private selectionChange(selection: any) {
    console.log(selection, "selectionChange");
    this.currentSelection = selection;
  }

  private pageChange(index: number) {
    this.currentPage = index;
    this.queryPageParameters.pageNum = index;
    this.getListMixin();
  }

  private sizeChange(val: any) {
    this.currentPage = 1;
    this.pageSize = val;
    this.queryPageParameters.pageNum = 1;
    this.queryPageParameters.pageSize = val;
    this.getListMixin();
  }

  // 在数据字典中获取对应的中文名
  private getNameByDict(key: any, type: any) {
    if (!key || !type) return;
    let name = "";
    let list = (this as any).$root.dictAllList(key);
    list.forEach((item: any) => {
      if (item.code === type) {
        name = item.name;
      }
    });
    return name;
  }

  async getListMixin() {
    const infoList = await post_term_getList(this.queryPageParameters);
    if (infoList.list.length > 0) {
      infoList.list.forEach((item: any) => {
        item.checked = false;
        if (item.busTypeEnum) {
          item.busTypeEnum = this.getNameByDict("BusType", item.busTypeEnum);
        }
      });
    }
    this.resPageInfo = JSON.parse(JSON.stringify(infoList));
    // 勾选回显
    if (this.resPageInfo.list.length > 0 && this.hasCheckedData.length > 0) {
      this.hasCheckedData.forEach((data: any) => {
        this.resPageInfo.list.forEach((list: any) => {
          if (list[this.rowKey] === data[this.rowKey]) {
            list.checked = true;
            this.currentSelection = [...list];
          }
        });
      });
    }
  }

  reset() {
    this.queryPageParameters = {
      termName: null,
      busTypeEnum: null,
      pageNum: 1,
      pageSize: this.queryPageParameters.pageSize,
    };
  }
}
</script>
<style lang="scss" scoped>
</style>