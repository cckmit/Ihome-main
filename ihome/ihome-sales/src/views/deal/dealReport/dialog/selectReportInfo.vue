<!--
 * @Description:
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-03 15:28:12
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-26 17:06:10
-->
<template>
  <el-dialog
    v-dialogDrag
    title="选择已成交报备信息列表"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    :before-close="beforeFinish"
    append-to-body
    width="1000px"
    style="text-align: left"
    class="dialog dialog-wrapper">
    <div slot="title" class="title">选择已成交报备信息列表(分销模式下必选)</div>
    <el-form ref="form" label-width="100px" @submit.native.prevent>
      <el-row>
        <el-col :span="8">
          <el-form-item label="项目名称">
            <el-input
              v-model="queryPageParameters.proName"
              placeholder="项目周期名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="渠道公司">
            <el-input
              v-model="queryPageParameters.channelName"
              placeholder="渠道公司"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="报备人">
            <el-input
              v-model="queryPageParameters.name"
              placeholder="报备人"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="报备时间">
            <el-date-picker
              v-model="queryPageParameters.reportDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
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
      <!-- <el-button @click="cancel()">取 消</el-button>-->
      <el-button type="primary" @click="finish">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";

  import {post_report_getDealList} from "@/api/customer/index";
  import PaginationMixin from "@/mixins/pagination";

  @Component({
    components: {},
    mixins: [PaginationMixin],
  })
  export default class SelectReportInfo extends Vue {
    constructor() {
      super();
    }

    private rowKey: any = 'id'; // 选择项的标识
    private tableMaxHeight: any = 350;
    private tableColumn = [
      {
        prop: "proCycle",
        label: "周期名称",
        align: "left",
        minWidth: 200,
      },
      {
        prop: "proName",
        label: "报备项目",
        align: "left",
        minWidth: 100,
      },
      {
        prop: "reportType",
        label: "报备类型",
        align: "left",
        minWidth: 140,
      },
      {
        prop: "name",
        label: "客户信息",
        align: "left",
        minWidth: 140,
      },
      {
        prop: "mobile",
        label: "客户号码",
        align: "left",
        minWidth: 140,
      },
      {
        prop: "reportUser",
        label: "报备人",
        align: "left",
        minWidth: 140,
      },
      {
        prop: "channelName",
        label: "所属公司",
        align: "left",
        minWidth: 140,
      },
      {
        prop: "reportDate",
        label: "报备时间",
        align: "left",
        minWidth: 140,
      },
      {
        prop: "visitDate",
        label: "到访时间",
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
      dealStatus: 'ValidDeal',
      proName: null,
      channelName: null,
      name: null,
      reportDateStart: null,
      reportDateEnd: null,
      reportDate: []
    };
    currentSelection: any = []; // 当前选择的项

    created() {
      // console.log('proId', this.data);
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
          type: "warning",
          message: "请选择房号",
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
      this.queryPageParameters.proId = this.data; // 关联的项目周期id
      if (this.queryPageParameters.reportDate.length > 0) {
        this.queryPageParameters.reportDateStart = this.queryPageParameters.reportDate[0];
        this.queryPageParameters.reportDateEnd = this.queryPageParameters.reportDate[1];
      } else {
        this.queryPageParameters.reportDateStart = null;
        this.queryPageParameters.reportDateEnd = null;
      }
      const infoList = await post_report_getDealList(this.queryPageParameters);
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

    reset() {
      this.queryPageParameters = {
        proId: this.data,
        dealStatus: 'ValidDeal',
        proName: null,
        channelName: null,
        name: null,
        reportDateStart: null,
        reportDateEnd: null,
        reportDate: [],
        pageNum: 1,
        pageSize: this.queryPageParameters.pageSize
      };
    }
  }
</script>
<style lang="scss" scoped>
  .title {
    color: red;
    font-size: 22px;
  }

  .dialog-wrapper {
    /deep/.el-dialog__body {
      padding: 10px 20px !important;
    }
  }
</style>