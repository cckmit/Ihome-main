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
    title="选择渠道经纪人列表"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="finish"
    append-to-body
    width="1000px"
    style="text-align: left"
    class="dialog">
    <el-form ref="form" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="经纪人姓名">
            <el-input
              v-model="queryPageParameters.city"
              placeholder="经纪人姓名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="渠道公司">
            <el-input
              v-model="queryPageParameters.city"
              placeholder="渠道公司"
            ></el-input>
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
    <el-table
      class="ih-table"
      :data="resPageInfo.list"
      :empty-text="emptyText"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="storageNum" label="经纪人姓名" min-width="180"></el-table-column>
      <el-table-column prop="channelName" label="渠道公司" min-width="180"></el-table-column>
      <el-table-column prop="province" label="公司渠道等级" min-width="180"></el-table-column>
      <el-table-column prop="city" label="门店名称" min-width="180"></el-table-column>
      <el-table-column prop="cityGrade" label="岗位" min-width="180"></el-table-column>
      <el-table-column prop="cityGrade" label="状态" min-width="180"></el-table-column>
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
  export default class AddBroker extends Vue {
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
</style>