<!--
 * @Description:
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-03 15:28:12
 * @LastEditors: lsj
 * @LastEditTime: 2021-01-19 08:58:12
-->
<template>
  <el-dialog
    v-dialogDrag
    title="操作记录信息"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="beforeFinish"
    append-to-body
    width="1000px"
    style="text-align: left"
    class="dialog">
    <el-table
      style="padding-left: 20px"
      class="ih-table"
      :max-height="300"
      :empty-text="emptyText"
      :data="data">
      <el-table-column prop="operate" label="操作" min-width="150">
        <template slot-scope="scope">
          <div>{{$root.dictAllName(scope.row.operate, 'CustType')}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="operaterName" label="操作人" min-width="130"></el-table-column>
      <el-table-column prop="operaterJob" label="岗位" min-width="130"></el-table-column>
      <el-table-column prop="afterStatus" label="操作后状态" min-width="150">
        <template slot-scope="scope">
          <div>{{$root.dictAllName(scope.row.afterStatus, 'DealStatus')}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="operateTime" label="操作时间" min-width="150"></el-table-column>
      <el-table-column prop="result" label="处理结果" min-width="130">
        <template slot-scope="scope">
          <div>{{scope.row.result ? scope.row.result : '---'}}</div>
        </template>
      </el-table-column>
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

  @Component({
    components: {},
    mixins: [],
  })
  export default class ReviewDetailsDialog extends Vue {
    constructor() {
      super();
    }

    @Prop({default: null}) data: any;
    dialogVisible = true;

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
      console.log('审核详情表格')
    }
  }
</script>
<style lang="scss" scoped>
</style>