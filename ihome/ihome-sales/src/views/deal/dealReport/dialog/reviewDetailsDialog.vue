<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-03 15:28:12
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-03 15:30:12
-->
<template>
  <el-dialog
    v-dialogDrag
    title="成交审核记录"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="finish"
    width="1000px"
    style="text-align: left"
    class="dialog">
    <p class="ih-info-title">主成交报告审核信息</p>
    <el-table
      class="ih-table"
      :data="resPageInfo.list">
      <el-table-column
        prop="storageNum"
        label="操作后状态"
        min-width="180"
      ></el-table-column>
      <el-table-column
        prop="channelName"
        label="操作者（岗位）"
        min-width="180"
      ></el-table-column>
      <el-table-column
        prop="province"
        label="操作说明"
        min-width="180"
      ></el-table-column>
      <el-table-column
        prop="city"
        label="审核意见"
        min-width="180"
      ></el-table-column>
      <el-table-column
        prop="cityGrade"
        label="操作时间"
        min-width="180"
      ></el-table-column>
    </el-table>
    <p class="ih-info-title">补充成交报告审核信息</p>
    <el-table
      class="ih-table"
      :data="resPageInfo.list">
      <el-table-column
        prop="storageNum"
        label="操作后状态"
        min-width="180"
      ></el-table-column>
      <el-table-column
        prop="channelName"
        label="操作者（岗位）"
        min-width="180"
      ></el-table-column>
      <el-table-column
        prop="province"
        label="操作说明"
        min-width="180"
      ></el-table-column>
      <el-table-column
        prop="city"
        label="审核意见"
        min-width="180"
      ></el-table-column>
      <el-table-column
        prop="cityGrade"
        label="操作时间"
        min-width="180"
      ></el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="finish()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";

  import {post_channelGrade_getList} from "@/api/channel";

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
    resPageInfo: any = {
      total: 0,
      list: [],
    };

    async finish() {
      this.$emit("finish", true);
    }

    created() {
      // this.getListMixin();
    }

    async getListMixin() {
      this.resPageInfo = await post_channelGrade_getList(this.queryPageParameters);
    }
  }
</script>
<style lang="scss" scoped>
</style>