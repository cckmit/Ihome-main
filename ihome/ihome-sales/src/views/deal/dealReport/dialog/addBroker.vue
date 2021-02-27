<!--
 * @Description:
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-03 15:28:12
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-26 17:01:19
-->
<template>
  <el-dialog
    v-dialogDrag
    title="选择渠道经纪人列表"
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
        <el-col class="col-bottom-20">
          <el-input
            style="width: 30%; margin-right: 20px"
            clearable
            v-model="queryPageParameters.name"
            placeholder="经纪人姓名"
          ></el-input>
          <el-button type="primary" @click="handleSearch">查询</el-button>
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
      <el-table-column label="经纪人姓名" prop="name" min-width="250"></el-table-column>
      <el-table-column label="手机号码" prop="mobile" min-width="250"></el-table-column>
      <el-table-column label="渠道公司" prop="channelName" min-width="130"></el-table-column>
      <el-table-column label="状态" prop="status" min-width="130">
        <template slot-scope="scope">
          {{$root.dictAllName(scope.row.status, 'ValidType')}}
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

  import {post_channelAgent_getDealChannelAgentList} from "@/api/channel";
  import PaginationMixin from "@/mixins/pagination";

  @Component({
    components: {},
    mixins: [PaginationMixin],
  })
  export default class AddBroker extends Vue {
    constructor() {
      super();
    }
    @Prop({default: null}) data: any;
    dialogVisible = true;
    private selection = [];
    public queryPageParameters: any = {
      channelId: null,
      name: null,
      status: 'Valid'
    };
    public resPageInfo: any = {
      total: null,
      list: [],
    };

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
          type: "warning",
          message: "请选择经纪人",
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

    // 查询
    handleSearch() {
      this.queryPageParameters.pageNum = 1;
      this.getListMixin();
    }

    async getListMixin() {
      if (!this.data) return;
      this.queryPageParameters.channelId = this.data;
      this.resPageInfo = await post_channelAgent_getDealChannelAgentList(this.queryPageParameters);
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