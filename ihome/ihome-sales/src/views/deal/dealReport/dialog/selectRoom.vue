<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-12-01 09:05:15
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-01 10:02:25
-->
<template>
  <el-dialog
    v-dialogDrag
    title="选择房号列表"
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
        <el-col :span="8">
          <el-form-item label="栋座">
            <el-input
              v-model="queryPageParameters.city"
              placeholder="栋座"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="房号">
            <el-input
              v-model="queryPageParameters.city"
              placeholder="房号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="户型">
            <el-select
              v-model="queryPageParameters.room"
              clearable
              placeholder="户型"
              class="width--100">
              <el-option
                v-for="item in $root.dictAllList('BusinessModel')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="朝向">
            <el-select
              v-model="queryPageParameters.room"
              clearable
              placeholder="朝向"
              class="width--100">
              <el-option
                v-for="item in $root.dictAllList('PositionEnum')"
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
            <el-button type="primary" @click="getListMixin()">查询</el-button>
            <el-button type="info" @click="reset()">重置</el-button>
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
      @size-change="sizeChange">
    </IhTableCheckBox>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="finish()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";

  import PaginationMixin from "@/mixins/pagination";
  import {post_term_getList} from "@/api/project";

  @Component({
    components: {},
    mixins: [PaginationMixin],
  })
  export default class SelectRoom extends Vue {
    constructor() {
      super();
    }

    private rowKey: any = 'termId'; // 选择项的标识
    private tableMaxHeight: any = 350;
    private tableColumn = [
      {
        prop: "termName",
        label: "周期名称",
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
      channelGrade: null,
      channelId: null,
      city: null,
      room: null,
      cityGrade: null,
      departmentOrgId: null,
      inputUser: null,
      province: null,
      special: null,
      status: null,
      storageNum: null,
    };
    currentSelection: any = []; // 当前选择的项

    created() {
      // this.getListMixin();
    }

    async beforeFinish() {
      this.$emit("cancel");
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

    async getListMixin() {
      const infoList = await post_term_getList(this.queryPageParameters);
      if (infoList.list.length > 0) {
        infoList.list.forEach((item: any) => {
          item.checked = false;
          if (item.busTypeEnum) {
            item.busTypeEnum = (this as any).$root.dictAllName(item.busTypeEnum, 'BusTypeEnum');
          }
        })
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
          })
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .content-wrapper {
    width: 100%;
    max-height: 500px;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;

    .content-tree-wrapper {
      /*width: 40%;*/
      width: 280px;
      max-height: 500px;
      overflow: auto;
      box-sizing: border-box;
      margin-right: 10px;
    }

    .content-transfer-wrapper {
      /*width: 60%;*/
      flex: 1;
      max-height: 500px;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
</style>