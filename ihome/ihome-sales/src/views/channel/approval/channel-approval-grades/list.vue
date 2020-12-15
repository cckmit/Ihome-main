<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-11-24 10:49:09
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-15 11:25:48
-->

<!--
 * @Descripttion: 
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-13 19:06:12
 * @LastEditors: zyc
 * @LastEditTime: 2020-12-11 16:36:15
-->
<template>
  <el-dialog
    v-dialogDrag
    :title="title"
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
            <IhSelectPageByChannel
              placeholder="渠道商"
              v-model="queryPageParameters.channelId"
            ></IhSelectPageByChannel>
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
            <ih-cascader
              placeholder="省市"
              v-model="queryPageParameters.provinceCity"
              :level="2"
              :checkStrictly="true"
              @change="handleChange"
            ></ih-cascader>
            <!-- <el-input
              v-model="queryPageParameters.city"
              placeholder="申请编号"
            ></el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="录入人">
            <IhSelectPageUser v-model="queryPageParameters.inputUser" clearable>
              <template v-slot="{ data }">
                <span style="float: left">{{ data.name }}</span>
                <span
                  style="
                    margin-left: 20px;
                    float: right;
                    color: #8492a6;
                    font-size: 13px;
                  "
                  >{{ data.account }}</span
                >
              </template>
            </IhSelectPageUser>
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
      <el-table-column prop="province" label="业务开展省份" width="180">
        <template slot-scope="scope">
          {{ $root.getAreaName(scope.row.province) }}
        </template>
      </el-table-column>
      <el-table-column prop="city" label="业务开展城市" width="180">
        <template slot-scope="scope">
          {{ $root.getAreaName(scope.row.city) }}
        </template>
      </el-table-column>
      <el-table-column prop="cityGrade" label="城市等级" width="180">
        <template slot-scope="scope">
          {{ $root.dictAllName(scope.row.cityGrade, "CityLevel") }}
        </template></el-table-column
      >
      <el-table-column prop="channelGrade" label="渠道等级" width="180">
        <template slot-scope="scope">
          {{ $root.dictAllName(scope.row.channelGrade, "ChannelLevel") }}
        </template></el-table-column
      >
      <el-table-column prop="special" label="特批入库" width="180">
        <template slot-scope="scope">
          {{ $root.dictAllName(scope.row.special, "YesOrNoType") }}
        </template>
      </el-table-column>

      <el-table-column
        prop="inputUserName"
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

import {
  post_channelGrade_getList,
  post_channelGradeChange_getList,
} from "../../../../api/channel/index";
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
  title = "渠道合作信息列表";
  resPageInfo: any = {
    total: 0,
    list: [],
  };

  channelList: any = []; //渠道商列表
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
    provinceCity: null,
  };

  cancel() {
    this.$emit("finish", false);
  }
  reset() {
    this.queryPageParameters = {
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
      provinceCity: null,
    };
  }

  async finish() {
    if (this.selectList && this.selectList.length > 0) {
      this.$emit("finish", this.selectList, this.data);
    } else {
      this.$message.warning("请先勾选数据");
    }
  }

  created() {
    console.log(this.data);
    if (this.data == "Change") {
      this.title = "渠道合作信息列表(变更信息)";
    }
    this.getListMixin();
  }
  handleSelectionChange(val: any) {
    console.log(val);
    this.selectList = val;
  }
  async getListMixin() {
    if (this.data == "Change") {
      this.resPageInfo = await post_channelGradeChange_getList(
        this.queryPageParameters
      );
    } else {
      this.resPageInfo = await post_channelGrade_getList(
        this.queryPageParameters
      );
    }
  }
  handleChange(v: any) {
    console.log(v);
    if (v) {
      if (v.length == 1) {
        this.queryPageParameters.province = v[0];
        this.queryPageParameters.city = null;
      } else {
        this.queryPageParameters.province = v[0];
        this.queryPageParameters.city = v[1];
      }
    } else {
      this.queryPageParameters.province = null;
      this.queryPageParameters.city = null;
    }
  }
}
</script>
<style lang="scss" scoped>
</style>