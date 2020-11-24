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
    title="选择收派套餐列表"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="finish"
    append-to-body
    width="1000px"
    style="text-align: left"
    class="dialog">
    <div>
      <div v-if="data.type === 'service'" class="title">服务费收派套餐</div>
      <div v-else class="title">代理费收派套餐</div>
      <el-table
        class="ih-table"
        :data="resPageInfo.list"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          prop="storageNum"
          label="类型"
          min-width="180"
        ></el-table-column>
        <el-table-column
          prop="channelName"
          label="合同类型"
          min-width="180"
        ></el-table-column>
        <el-table-column
          prop="province"
          label="客户类型"
          min-width="180"
        ></el-table-column>
        <el-table-column
          prop="province"
          label="条件"
          min-width="180"
        ></el-table-column>
        <el-table-column prop="province" label="应收金额" min-width="180">
          <template slot-scope="scope">
            <div>金额：{{scope}}</div>
            <div>点数：{{scope}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="province" label="派发佣金" min-width="180">
          <template slot-scope="scope">
            <div>金额：{{scope}}</div>
            <div>点数：{{scope}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="province" label="派发内场奖励" min-width="180">
          <template slot-scope="scope">
            <div>金额：{{scope}}</div>
            <div>点数：{{scope}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="province" label="总包业绩" min-width="180">
          <template slot-scope="scope">
            <div>金额：{{scope}}</div>
            <div>点数：{{scope}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="province" label="分销业绩" min-width="180">
          <template slot-scope="scope">
            <div>金额：{{scope}}</div>
            <div>点数：{{scope}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="province" label="其他渠道费用" min-width="180" v-if="data.type === 'service'">
          <template slot-scope="scope">
            <div>金额：{{scope}}</div>
            <div>点数：{{scope}}</div>
          </template>
        </el-table-column>
      </el-table>
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
      <el-button type="primary" @click="finish()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";

  import {post_channelGrade_getList} from "@/api/channel";
  import PaginationMixin from "@/mixins/pagination";

  @Component({
    components: {},
    mixins: [PaginationMixin],
  })
  export default class SelectReceivePackage extends Vue {
    constructor() {
      super();
    }

    @Prop({default: null}) data: any;
    dialogVisible = true;
    resPageInfo: any = {
      total: 0,
      list: [],
    };

    queryPageParameters: any = {
      channelGrade: null,
      channelId: null,
      city: null,
      cityGrade: null,
      departmentOrgId: null,
      inputUser: null,
      province: null,
      special: null,
      status: null,
      storageNum: null,
    };

    async finish() {
      this.$emit("finish", true);
    }

    created() {
      // this.getListMixin();
      console.log('datadata', this.data);
    }

    handleSelectionChange(val: any) {
      console.log(val);
      // this.selectList = val;
    }

    async getListMixin() {
      this.resPageInfo = await post_channelGrade_getList(this.queryPageParameters);
    }
  }
</script>
<style lang="scss" scoped>
  .title {
    width: 100%;
    height: 30px;
    line-height: 30px;
    color: #f90;
    box-sizing: border-box;
    margin-bottom: 10px;
  }
</style>