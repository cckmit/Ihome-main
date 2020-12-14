<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-03 15:28:12
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-09 17:28:20
-->
<template>
  <el-dialog
    v-dialogDrag
    title="选择渠道公司列表"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="beforeFinish"
    append-to-body
    width="1000px"
    style="text-align: left"
    class="dialog">
    <el-form>
      <el-row>
        <el-col class="col-bottom-20">
          <el-input
            style="width: 30%; margin-right: 20px"
            clearable
            v-model="queryPageParameters.channelName"
            placeholder="渠道公司"
          ></el-input>
          <el-button type="primary" @click="getListMixin()">查询</el-button>
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

  import {post_channelGrade_getChannelAndChannelGrade} from "@/api/channel";
  import PaginationMixin from "@/mixins/pagination";

  @Component({
    components: {},
    mixins: [PaginationMixin],
  })
  export default class AgentCompanyList extends Vue {
    constructor() {
      super();
    }

    private rowKey: any = 'id'; // 选择项的标识
    private tableMaxHeight: any = 350;
    private tableColumn = [
      {
        prop: "channelName",
        label: "渠道公司",
        align: "left",
        minWidth: 250,
      },
      {
        prop: "shortName",
        label: "简称",
        align: "left",
        minWidth: 130,
      },
      {
        prop: "channelGradeName",
        label: "渠道等级",
        align: "left",
        minWidth: 130,
      },
      {
        prop: "provinceName",
        label: "省份",
        align: "left",
        minWidth: 130,
      },
      {
        prop: "cityName",
        label: "城市",
        align: "left",
        minWidth: 130,
      },
      {
        prop: "countyName",
        label: "行政区",
        align: "left",
        minWidth: 130,
      },
      {
        prop: "statusName",
        label: "状态",
        align: "left",
        minWidth: 100,
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
      channelName: null
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
          message: "请选择渠道商",
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
      const infoList = await post_channelGrade_getChannelAndChannelGrade(this.queryPageParameters);
      if (infoList.list.length > 0) {
        infoList.list.forEach((item: any) => {
          item.checked = false;
          // 修改显示 ChannelGradeStatus
          if (item.channelGrade) {
            item.channelGradeName = (this as any).$root.dictAllName(item.channelGrade, 'ChannelLevel');
          }
          if (item.province) {
            item.provinceName = (this as any).$root.getAreaName(item.province);
          }
          if (item.city) {
            item.cityName = (this as any).$root.getAreaName(item.city);
          }
          if (item.county) {
            item.countyName = (this as any).$root.getAreaName(item.county);
          }
          if (item.status) {
            item.statusName = (this as any).$root.dictAllName(item.status, 'ChannelGradeStatus');
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
  .col-bottom-20 {
    margin-bottom: 20px;
  }
</style>