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
    title="成交操作记录"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="beforeFinish"
    append-to-body
    width="1000px"
    style="text-align: left"
    class="dialog">
    <p class="ih-info-title">
      {{data.title === 'main' ? '主成交报告操作记录信息' : '补充成交报告操作记录信息'}}
    </p>
    <el-table
      style="padding-left: 20px"
      class="ih-table"
      :empty-text="emptyText"
      :data="data.list">
      <el-table-column prop="operate" label="操作" min-width="150"></el-table-column>
      <el-table-column prop="operaterName" label="操作人" min-width="130"></el-table-column>
      <el-table-column prop="operaterJob" label="岗位" min-width="130"></el-table-column>
      <el-table-column prop="afterStatus" label="操作后状态" min-width="150"></el-table-column>
      <el-table-column prop="operateTime" label="操作时间" min-width="150"></el-table-column>
      <el-table-column prop="result" label="处理结果" min-width="130"></el-table-column>
      <el-table-column prop="system" label="系统" min-width="120"></el-table-column>
      <el-table-column prop="remark" label="备注" min-width="150"></el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";

  import {post_processRecord_getProcessRecordList} from "@/api/deal";
  import PaginationMixin from "@/mixins/pagination";

  @Component({
    components: {},
    mixins: [PaginationMixin],
  })
  export default class ReviewDetailsDialog extends Vue {
    constructor() {
      super();
    }

    @Prop({default: null}) data: any;
    dialogVisible = true;
    resPageInfo: any = {
      total: null,
      list: [],
    };
    queryPageParameters: any = {
      dealId: null,
    }

    async beforeFinish() {
      this.$emit("cancel", false);
    }

    // 取消
    cancel() {
      this.$emit("cancel", false);
    }

    async finish() {
      this.$emit("finish", true);
    }

    created() {
      // this.getListMixin();
    }

    async getListMixin() {
      if (!this.data.dealId) return
      this.queryPageParameters.dealId = this.data.dealId;
      this.resPageInfo = await post_processRecord_getProcessRecordList(this.queryPageParameters);
    }
  }
</script>
<style lang="scss" scoped>
</style>