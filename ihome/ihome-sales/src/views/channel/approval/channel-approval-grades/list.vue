<!--
 * @Description:
 * @version: 
 * @Author: zyc
 * @Date: 2020-10-13 19:06:12
 * @LastEditors: lsj
 * @LastEditTime: 2021-05-14 09:07:12
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
    <el-form
      ref="form"
      label-width="100px"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="渠道商">
            <IhSelectPageByChannel
              placeholder="渠道商"
              clearable
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
            <IhSelectPageUser
              v-model="queryPageParameters.inputUser"
              clearable
            >
              <template v-slot="{ data }">
                <span style="float: left">{{ data.name }}</span>
                <span style="
                    margin-left: 20px;
                    float: right;
                    color: #8492a6;
                    font-size: 13px;
                  ">{{ data.account }}</span>
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
            <el-button
              type="primary"
              @click="getListMixin()"
            >查询</el-button>

            <el-button
              type="info"
              @click="reset()"
            >重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      class="ih-table"
      :data="resPageInfo.list"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        :selectable="selectEnable"
      > </el-table-column>
      <el-table-column
        prop="storageNum"
        label="入库编号"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="channelName"
        label="渠道商名称"
        width="250"
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
        label="开展业务省市"
        width="150">
        <template slot-scope="scope">
          {{ $root.getAreaName(scope.row.province) }}/{{ $root.getAreaName(scope.row.city) }}
        </template>
      </el-table-column>
<!--      <el-table-column
        prop="province"
        label="开展业务省份"
        width="130">
        <template slot-scope="scope">
          {{ $root.getAreaName(scope.row.province) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="city"
        label="业务开展城市"
        width="180">
        <template slot-scope="scope">
          {{ $root.getAreaName(scope.row.city) }}
        </template>
      </el-table-column>-->
      <el-table-column
        prop="cityGrade"
        label="城市等级"
        width="120"
      >
        <template slot-scope="scope">
          {{ $root.dictAllName(scope.row.cityGrade, "CityLevel") }}
        </template>
      </el-table-column>
      <el-table-column
        prop="channelGrade"
        label="渠道等级"
        width="130"
      >
        <template slot-scope="scope">
          {{ $root.dictAllName(scope.row.channelGrade, "ChannelLevel") }}
        </template>
      </el-table-column>
      <el-table-column
        prop="special"
        label="特批入库"
        width="90"
      >
        <template slot-scope="scope">
          {{ $root.dictAllName(scope.row.special, "YesOrNoType") }}
        </template>
      </el-table-column>
      <el-table-column
        prop="special"
        label="状态"
        width="110">
        <template slot-scope="scope">
          <IhStatusComponent
            :status="scope.row.status"
            :status-obj="{
                warning: 'DRAFT',
                success: 'PASS'
              }">
            <div>{{$root.dictAllName(scope.row.status, "ChannelGradeStatus")}}</div>
          </IhStatusComponent>
        </template>
      </el-table-column>
      <el-table-column
        prop="inputUserName"
        label="录入人"
        width="180"
      ></el-table-column>
    </el-table>
    <div class="page-check-wrapper">
      <div class="check">
        <el-checkbox v-model="showFlag" @change="changeStatus">仅展示可申请呈批信息</el-checkbox>
      </div>
      <div class="page">
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
    </div>

    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="cancel()">取 消</el-button>
      <el-button
        type="primary"
        @click="finish()"
      >确 定</el-button>
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
  @Prop({ default: null }) departmentOrgId: any;
  dialogVisible = true;
  title = "选择申请呈批信息";
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
    status: "PASS",
    storageNum: null,
    provinceCity: null,
  };
  showFlag: any = true

  cancel() {
    this.$emit("cancel", false);
  }
  reset() {
    Object.assign(this.queryPageParameters, {
      channelGrade: null,
      channelId: null,
      city: null,
      cityGrade: null,
      departmentOrgId: null,
      inputUser: null,
      province: null,
      special: null,
      status: "PASS",
      storageNum: null,
      provinceCity: null,
    });
  }

  changeStatus(value: any) {
    console.log(value);
    this.queryPageParameters.pageNum = 1;
    this.$nextTick(async () => {
      await this.getListMixin();
    });
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
      this.title = "选择申请呈批信息(变更信息)";
    }
    this.getListMixin();
  }
  // 禁用多选框函数
  selectEnable(row: any) {
    console.log(row);
    if (row.status !== 'PASS') {
      return false;
    } else {
      return true;
    }
  }
  handleSelectionChange(val: any) {
    console.log(val);
    this.selectList = val;
  }
  async getListMixin() {
    this.queryPageParameters.departmentOrgId = this.departmentOrgId;
    this.queryPageParameters.status = this.showFlag ? 'PASS' : null;
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
.page-check-wrapper {
  width: 96%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;

  .check {
    //flex: 1;
    text-align: left;
  }

  .page {
    text-align: right;
  }
}
</style>