<!--
 * @Description:
 * @version: 
 * @Author: lsj
 * @Date: 2020-12-01 09:05:15
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-26 17:05:11
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
    <el-form ref="form" label-width="100px" @submit.native.prevent>
      <el-row>
        <el-col :span="8">
          <el-form-item label="栋座">
            <el-input
              v-model="queryPageParameters.buildingName"
              placeholder="栋座"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="房号">
            <el-input
              v-model="queryPageParameters.roomNo"
              placeholder="房号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="户型">
            <el-select
              v-model="queryPageParameters.houseTypeId"
              clearable
              placeholder="户型"
              class="width--100">
              <el-option
                v-for="item in roomTypeList"
                :key="item.houseTypeId"
                :label="item.houseName"
                :value="item.houseTypeId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="朝向">
            <el-select
              v-model="queryPageParameters.positionEnum"
              clearable
              placeholder="朝向"
              class="width--100">
              <el-option
                v-for="item in $root.dictAllList('Position')"
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
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";

  import PaginationMixin from "@/mixins/pagination";
  import {
    get_houseType_getItemsByProperty__proId,
    post_project_getBuildingRoomByPro
  } from "@/api/project";

  @Component({
    components: {},
    mixins: [PaginationMixin],
  })
  export default class SelectRoom extends Vue {
    constructor() {
      super();
    }

    private rowKey: any = 'roomId'; // 选择项的标识
    private tableMaxHeight: any = 350;
    private tableColumn = [
      {
        prop: "buildingName",
        label: "栋座",
        align: "left",
        minWidth: 200,
      },
      {
        prop: "roomNo",
        label: "房号",
        align: "left",
        minWidth: 100,
      },
      {
        prop: "houseName",
        label: "户型",
        align: "left",
        minWidth: 140,
      },
      {
        prop: "roomType",
        label: "房型",
        align: "left",
        minWidth: 140,
      },
      {
        prop: "space",
        label: "面积",
        align: "left",
        minWidth: 140,
      },
      {
        prop: "positionEnumName",
        label: "朝向",
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

    private roomTypeList: any = []; // 户型下拉框
    queryPageParameters: any = {
      roomNo: null,
      buildingName: null,
      houseTypeId: null,
      positionEnum: null
    };
    currentSelection: any = []; // 当前选择的项

    async created() {
      await this.getRoomTypeList();
      await this.getListMixin();
    }

    // 获取户型下拉选项
    async getRoomTypeList() {
      this.roomTypeList = await get_houseType_getItemsByProperty__proId({proId: this.data});
      console.log('this.roomTypeList', this.roomTypeList);
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
          type: "warning",
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
      let self = this;
      self.queryPageParameters.proId = self.data;
      const infoList = await post_project_getBuildingRoomByPro(this.queryPageParameters);
      if (infoList.list.length > 0) {
        infoList.list.forEach((item: any) => {
          item.checked = false;
          if (item.positionEnum) {
            item.positionEnumName = (this as any).$root.dictAllName(item.busTypeEnum, 'Position');
          }
          // 户型
          item.roomType = `${item.room}室${item.hall}厅${item.kitchen}厨`;
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

    reset() {
      this.queryPageParameters = {
        proId: this.data,
        roomNo: null,
        buildingName: null,
        houseTypeId: null,
        positionEnum: null,
        pageNum: 1,
        pageSize: this.queryPageParameters.pageSize
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