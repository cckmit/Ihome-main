<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-03 15:28:12
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-15 20:25:33
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
    class="dialog">
    <el-form ref="form" label-width="100px">
      <el-row>
        <el-col :span="8" class="search-col">
          <el-input
            v-model="queryPageParameters.termName"
            clearable
            placeholder="项目周期名称"
          ></el-input>
          <el-button type="primary" class="margin-left-20" @click="getListMixin()">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <IhTableCheckBox
      :isSingle="true"
      :isSelection="false"
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
      @size-change="sizeChange">
    </IhTableCheckBox>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";

  import {post_term_getList} from "@/api/project/index";
  import PaginationMixin from "@/mixins/pagination";

  @Component({
    components: {},
    mixins: [PaginationMixin],
  })
  export default class SelectProjectCycle extends Vue {
    constructor() {
      super();
    }

    private rowKey: any = 'termId'; // 选择项的标识
    private tableMaxHeight: any = 350;
    private tableColumn = [
      {
        prop: "termName",
        label: "项目周期名称",
        align: "left",
        minWidth: 200,
      },
      {
        prop: "busTypeEnum",
        label: "业务类型",
        align: "left",
        minWidth: 100,
      },
      {
        prop: "termStart",
        label: "开始时间",
        align: "left",
        minWidth: 140,
      },
      {
        prop: "termEnd",
        label: "结束时间",
        align: "left",
        minWidth: 140,
      }
    ];
    private pageSize = 10;
    private currentPage = 1;

    @Prop({default: null}) data: any;
    @Prop({
      default: ()=>[]
    })
    hasCheckedData!: any;
    dialogVisible = true;
    resPageInfo: any = {
      total: null,
      list: [],
    };

    queryPageParameters: any = {
      termName: null
    };
    currentSelection: any = []; // 当前选择的项

    created() {
      this.getListMixin();
    }

    async beforeFinish() {
      this.$emit("cancel", false);
    }

    // 取消
    cancel() {
      this.$emit("cancel", false);
    }

    async finish() {
      if (this.currentSelection.length === 0) {
        this.$message({
          type: "error",
          message: "请选择项目",
        });
        return
      }
      this.$emit("finish", this.currentSelection);
    }

    // 获取选中项 --- 最后需要获取的数据
    private selectionChange(selection: any) {
      // console.log(selection, "selectionChange");
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

    async getListMixin() {
      let self = this;
      self.currentSelection = [];
      const infoList = await post_term_getList(this.queryPageParameters);
      if (infoList.list.length > 0) {
        infoList.list.forEach((item: any) => {
          item.checked = false;
          // 修改显示
          if (item.busTypeEnum) {
            item.busTypeEnum = (this as any).$root.dictAllName(item.busTypeEnum, 'BusType');
          }
        })
      }
      self.resPageInfo = JSON.parse(JSON.stringify(infoList));
      // 勾选回显
      if (self.resPageInfo.list.length > 0 && self.hasCheckedData.length > 0) {
        self.hasCheckedData.forEach((data: any) => {
          self.resPageInfo.list.forEach((list: any) => {
            if (list[self.rowKey] === data[self.rowKey]) {
              list.checked = true;
              self.currentSelection.push(list);
            }
          })
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .search-col {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
</style>