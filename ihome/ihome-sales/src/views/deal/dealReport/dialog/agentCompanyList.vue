<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-03 15:28:12
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-23 20:11:25
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
    <el-table
      ref="table"
      :max-height="350"
      class="ih-table table-dialog"
      :data="resPageInfo.list"
      @selection-change="handleSelectionChange"
      @select="handleSelect"
      @select-all="handleSelectAll">
      <el-table-column fixed type="selection" width="50" align="center"></el-table-column>
      <el-table-column label="渠道公司" prop="channelName" min-width="250"></el-table-column>
      <el-table-column label="简称" prop="shortName" min-width="130"></el-table-column>
      <el-table-column label="渠道等级" prop="channelGrade" min-width="130">
        <template slot-scope="scope">
          <div>{{$root.dictAllName(scope.row.channelGrade, 'ChannelLevel')}}</div>
        </template>
      </el-table-column>
      <el-table-column label="省" prop="province" min-width="130">
        <template slot-scope="scope">
          <div>{{$root.getAreaName(scope.row.province)}}</div>
        </template>
      </el-table-column>
      <el-table-column label="城市" prop="city" min-width="130">
        <template slot-scope="scope">
          <div>{{$root.getAreaName(scope.row.city)}}</div>
        </template>
      </el-table-column>
      <el-table-column label="行政区" prop="county" min-width="130">
        <template slot-scope="scope">
          <div>{{$root.getAreaName(scope.row.county)}}</div>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="status" min-width="100">
        <template slot-scope="scope">
          <div>{{$root.dictAllName(scope.row.status, 'ChannelGradeStatus')}}</div>
        </template>
      </el-table-column>
    </el-table>
    <div class="text-right">
      <br />
      <el-pagination
        @size-change="handleSizeChangeMixin"
        @current-change="handleCurrentChangeMixin"
        :current-page.sync="queryPageParameters.pageNum"
        :page-sizes="$root.pageSizes"
        :page-size="queryPageParameters.pageSize"
        :layout="$root.paginationLayout"
        :total="resPageInfo.total"
      ></el-pagination>
    </div>
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
    private dialogVisible = true;
    private selection = [];
    public queryPageParameters: any = {
      channelName: null // 编号
    };
    public resPageInfo: any = {
      total: null,
      list: [],
    };
    @Prop({default: null}) data: any;

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
      if (this.selection.length === 0) {
        this.$message({
          type: "error",
          message: "请选择渠道公司",
        });
        return
      }
      this.$emit("finish", this.selection);
    }

    private handleSelectionChange(val: any) {
      this.selection = val;
    }

    private handleSelect(selection: any) {
      if (selection.length > 1) {
        let del_row = selection.shift();
        (this.$refs.table as any).toggleRowSelection(del_row, false);
      }
    }

    private handleSelectAll() {
      (this.$refs.table as any).clearSelection();
    }

    async getListMixin() {
      this.resPageInfo = await post_channelGrade_getChannelAndChannelGrade(this.queryPageParameters);
    }
  }
</script>
<style lang="scss" scoped>
  .col-bottom-20 {
    margin-bottom: 20px;
  }

  .dialog {
    /deep/.el-dialog__body {
      padding: 10px 20px 20px 20px;
    }
  }
</style>