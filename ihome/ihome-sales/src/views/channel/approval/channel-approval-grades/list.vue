
<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-13 19:06:12
 * @LastEditors: zyc
 * @LastEditTime: 2020-10-14 19:22:27
-->
<template>
  <el-dialog
    v-dialogDrag
    title="渠道合作信息列表"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="cancel"
    width="1000px"
    style="text-align: left"
    class="dialog"
  >
    <el-form ref="form" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="渠道商">
            <el-select
              v-model="queryPageParameters.channelId"
              clearable
              placeholder="事业部"
              class="width--100"
            >
              <el-option
                v-for="item in channelList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="渠道等级">
            <el-select
              v-model="queryPageParameters.channelGrade"
              clearable
              placeholder="渠道等级"
              class="width--100"
            >
              <el-option
                v-for="item in $root.dictAllList('ChannelLevel')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="城市等级">
            <el-select
              v-model="queryPageParameters.cityGrade"
              clearable
              placeholder="城市等级"
              class="width--100"
            >
              <el-option
                v-for="item in $root.dictAllList('CityLevel')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="业务开展省市">
            <el-input
              v-model="queryPageParameters.city"
              placeholder="申请编号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="录入人">
            <el-select
              v-model="queryPageParameters.inputUser"
              clearable
              placeholder="状态"
              class="width--100"
            >
              <el-option
                v-for="item in inputUserList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="特批入库">
            <el-select
              v-model="queryPageParameters.special"
              clearable
              placeholder="特批入库"
              class="width--100"
            >
              <el-option
                v-for="item in $root.dictAllList('YesOrNoType')"
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
    <el-table
      class="ih-table"
      :data="resPageInfo.list"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>

      <el-table-column
        prop="storageNum"
        label="入库编号"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="channelName"
        label="渠道商名称"
        width="180"
      ></el-table-column>
      <!-- <el-table-column
        prop="creditCode"
        label="信用代码"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="legalPerson"
        label="法定代表人"
        width="180"
      ></el-table-column> -->
      <el-table-column
        prop="province"
        label="业务开展省份"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="city"
        label="业务开展城市"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="cityGrade"
        label="城市等级"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="channelGrade"
        label="渠道等级"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="special"
        label="特批入库"
        width="180"
      ></el-table-column>

      <!-- <el-table-column label="状态" width="120">
        <template slot-scope="scope">{{
          $root.dictAllName(scope.row.status, "ChannelApprovalStatus")
        }}</template>
      </el-table-column> -->
      <el-table-column
        prop="inputUser"
        label="录入人"
        width="180"
      ></el-table-column>
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
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="finish()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import { post_channelGrade_getList } from "../../../../api/channel/index";
import PaginationMixin from "../../../../mixins/pagination";
@Component({
  components: {},
  mixins: [PaginationMixin],
})
export default class ChannelApprovalGradesList extends Vue {
  constructor() {
    super();
  }
  @Prop({ default: null }) data: any;
  dialogVisible = true;
  resPageInfo: any = {
    total: 0,
    list: [],
  };

  channelList: any = []; //渠道商列表
  inputUserList: any = []; //录入人列表
  selectList: any = [];
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

  cancel() {
    this.$emit("finish", true);
  }

  async finish() {
    if (this.selectList && this.selectList.length > 0) {
      this.$emit("finish", this.selectList);
    } else {
      this.$message.warning("请先勾选数据");
    }
  }

  created() {
    this.getListMixin();
  }
  handleSelectionChange(val: any) {
    console.log(val);
    this.selectList = val;
  }
  async getListMixin() {
    this.resPageInfo = await post_channelGrade_getList(
      this.queryPageParameters
    );
  }
}
</script>
<style lang="scss" scoped>
</style>