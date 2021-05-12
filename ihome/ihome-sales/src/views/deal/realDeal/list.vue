<template>
  <ih-page label-width="100px">
    <template v-slot:form>
      <el-form ref="form" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="成交报告编号">
              <el-input
                v-model="queryPageParameters.dealCode"
                clearable
                placeholder="请输入成交报告编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户信息">
              <el-input
                  v-model="queryPageParameters.phoneOrCusName"
                  placeholder="客户姓名或手机"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="成交状态">
              <el-select
                  v-model="queryPageParameters.status"
                  clearable
                  placeholder="请选择"
                  class="width--100"
              >
                <el-option
                    v-for="item in $root.dictAllList('DealStatus')"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-collapse-transition>
          <div v-show="searchOpen">
            <el-row>
              <el-col :span="8">
                <el-form-item label="合同类型">
                  <el-select
                      v-model="queryPageParameters.contType"
                      clearable
                      placeholder="请选择"
                      class="width--100"
                  >
                    <el-option
                        v-for="item in $root.dictAllList('ContType')"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="成交阶段">
                  <el-select
                      v-model="queryPageParameters.stage"
                      clearable
                      placeholder="请选择"
                      class="width--100"
                  >
                    <el-option
                        v-for="item in $root.dictAllList('DealStage')"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="项目周期">
                  <IhSelectPageByCycle
                      clearable
                      @change="handleChangeCycle"
                      @changeOption="
                  (data) => {
                    queryPageParameters.proId = data.proId;
                  }
                "
                      v-model="queryPageParameters.projectCycle"
                      placeholder="请选择立项周期"
                  ></IhSelectPageByCycle>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="栋座房号">
                  <IhBuildingRoom
                      v-model="buildingRoom"
                      :proId="queryPageParameters.proId"
                      @change="buildingRoomChange"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="归属组织">
                  <IhSelectOrgTree
                    placeholder="请选择"
                    v-model="queryPageParameters.dealOrgId"
                  ></IhSelectOrgTree>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="渠道公司">
                  <div class="agency-wrapper">
                    <div class="left">
                      <el-select
                          v-model="queryPageParameters.companyKind"
                          clearable
                          placeholder="公司类型"
                          @change="changeAgencyType"
                          class="width--100">
                        <el-option
                            v-for="item in companyKindOption"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code"
                        ></el-option>
                      </el-select>
                    </div>
                    <div class="right">
                      <IhSelectPageByChannelCompany
                          v-model="queryPageParameters.agencyId"
                          :proId="queryPageParameters.companyKind"
                          placeholder="请选择渠道公司"
                          clearable
                      ></IhSelectPageByChannelCompany>
                    </div>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="经纪人">
                  <IhSelectPageByBroker
                    v-model="queryPageParameters.broker"
                    @changeOption="
                      (data) => {
                        queryPageParameters.brokerId = data.userId;
                      }
                    "
                    :proId="queryPageParameters.agencyId"
                    clearable
                    placeholder="经纪人"
                  ></IhSelectPageByBroker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="日期筛选">
                  <div class="search-time-wrapper">
                    <div class="time-type">
                      <el-select
                        v-model="queryPageParameters.timeType"
                        placeholder="请选择"
                        clearable
                        class="width--100"
                      >
                        <el-option
                          v-for="item in $root.dictAllList('DealTimeType')"
                          :key="item.code"
                          :label="item.name"
                          :value="item.code"
                        ></el-option>
                      </el-select>
                    </div>
                    <div class="time-range">
                      <el-date-picker
                        v-model="selectTimeRange"
                        type="daterange"
                        align="left"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="$root.pickerOptions"
                        value-format="yyyy-MM-dd"
                        @change="inputTimeChange"
                      ></el-date-picker>
                    </div>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-collapse-transition>
      </el-form>
    </template>
    <template v-slot:btn>
      <el-row>
        <el-button type="primary" @click="getListMixin()">查询</el-button>
        <el-button type="info" @click="handleReset()">重置</el-button>
        <el-link
          type="primary"
          class="float-right margin-right-40"
          @click="openToggle()"
          >{{ searchOpen ? "收起" : "展开" }}</el-link
        >
      </el-row>
    </template>
    <template v-slot:table>
      <br />
      <el-table
        class="ih-table"
        :empty-text="emptyText"
        :data="resPageInfo.list">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div>
              <div class="expand-content">
                项目周期：{{ scope.row.termName }}
              </div>
              <div class="expand-content">
                渠道公司：{{ scope.row.companyKind === 'InfieldCompany' ? scope.row.companyName : scope.row.channelName }}
              </div>
              <div class="expand-content">
                经纪人：{{ scope.row.brokerName ? scope.row.brokerName : '-' }}
              </div>
              <br />
              <div class="expand-content">
                栋座房号：{{ scope.row.buildingName }} {{ scope.row.roomNo }}
              </div>
              <div class="expand-content">
                客户姓名：{{ scope.row.customerName }}
              </div>
              <div class="expand-content">
                客户电话：{{ scope.row.customerPhone }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="dealCode"
          label="成交报告编号"
          min-width="190"
        ></el-table-column>
        <el-table-column prop="contType" label="合同类型" min-width="190">
          <template slot-scope="scope">
            {{ $root.dictAllName(scope.row.contType, "ContType") }}
          </template>
        </el-table-column>
        <el-table-column
          prop="receiveAmount"
          label="应收金额"
          min-width="150"
        ></el-table-column>
        <el-table-column
          prop="paidAmount"
          label="已收金额"
          min-width="150"
        ></el-table-column>
        <el-table-column prop="commAmount" label="应付金额" min-width="150">
          <template slot-scope="scope">
            <div>{{scope.row.commAmount ? scope.row.commAmount : 0}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="paidCommAmount"
          label="已付金额"
          min-width="150"
        ></el-table-column>
        <el-table-column prop="status" label="状态" min-width="190">
          <template slot-scope="scope">
            <StatusComponent
              :status="scope.row.status"
              :status-obj="{
                warning: 'Draft',
                success: 'ReviewPassed'
              }">
              <div>{{ $root.dictAllName(scope.row.status, 'DealStatus') }}</div>
            </StatusComponent>
          </template>
        </el-table-column>
        <el-table-column
          prop="dealOrg"
          label="组织信息"
          width="300"
        ></el-table-column>
<!--        <el-table-column-->
<!--          prop="entryPerson"-->
<!--          label="录入人"-->
<!--          min-width="80"-->
<!--        ></el-table-column>-->
<!--        <el-table-column-->
<!--          prop="createTime"-->
<!--          label="录入日期"-->
<!--          min-width="130"-->
<!--        ></el-table-column>-->
        <el-table-column
          prop="subscribeDate"
          label="认购日期"
          min-width="130"
        ></el-table-column>
        <el-table-column
          prop="signDate"
          label="签约日期"
          min-width="130"
        ></el-table-column>
<!--        <el-table-column-->
<!--          prop="achieveConfirmTime"-->
<!--          min-width="130"-->
<!--          label="业绩确认日期"-->
<!--        ></el-table-column>-->
        <!-- 
        <el-table-column prop="contType" label="房产信息" min-width="260">
          <template slot-scope="scope">
            <div>
              房号：{{ scope.row.buildingName }} - {{ scope.row.roomNo }}
            </div>
            <div>客户：{{ scope.row.customerName }}</div>
            <div>客户电话：{{ scope.row.customerPhone }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="contType" label="交易类型" min-width="180">
          <template slot-scope="scope">
            <div v-if="scope.row.contType">
              {{ $root.dictAllName(scope.row.contType, "ContType") }}
            </div>
            <div v-if="scope.row.suppContType">
              {{ $root.dictAllName(scope.row.suppContType, "SuppContType") }}
            </div>
            <div v-if="scope.row.status">
              状态：{{ $root.dictAllName(scope.row.status, "DealStatus") }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="actualAmount"
          label="应收实收金额"
          min-width="190"
        >
          <template slot-scope="scope">
            <div>应收：{{ scope.row.receiveAmount }}</div>
            <div>实收：{{ scope.row.actualAmount }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="commAmount" label="拆佣金额" min-width="190">
          <template slot-scope="scope">
            <div>总金额：{{ scope.row.commAmount }}</div>
            <div>已付金额：{{ scope.row.paidCommAmount }}</div>
            <div>未付金额：{{ scope.row.unpaidCommAmount }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="commAmount" label="渠道信息" min-width="190">
          <template slot-scope="scope">
            <div>公司：{{ scope.row.channelName }}</div>
            <div>经纪人：{{ scope.row.brokerName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="commAmount" label="项目周期信息" min-width="300">
          <template slot-scope="scope">
            <div>项目：{{ scope.row.projectName }}</div>
            <div>周期：{{ scope.row.termName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="entryPerson" label="人员信息" min-width="200">
          <template slot-scope="scope">
            <div>录入人：{{ scope.row.entryPerson }}</div>
            <div>业绩分配人：{{ scope.row.alloter }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="dealOrg"
          label="组织信息"
          min-width="250"
        ></el-table-column>
        <el-table-column
          prop="allotDate"
          label="签约/填写/业绩确认/审批日期"
          min-width="220"
        >
          <template slot-scope="scope">
            <div>签约：{{ scope.row.signDate }}</div>
            <div>填写：{{ scope.row.createTime }}</div>
            <div>业绩：{{ scope.row.allotDate }}</div>
            <div>审批：{{ scope.row.approveTime }}</div>
          </template>
        </el-table-column> -->
        <el-table-column fixed="right" label="操作" width="80">
          <template slot-scope="scope">
            <el-link
              class="margin-right-10"
              type="primary"
              @click.native.prevent="handleInfo(scope)"
              >查看
            </el-link>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template v-slot:pagination>
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
    </template>
  </ih-page>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PaginationMixin from "../../../mixins/pagination";
import { post_deal_getSumList } from "@/api/deal";
import {post_dict_getAllByType} from "@/api/system";

@Component({
  mixins: [PaginationMixin],
})
export default class RealDealList extends Vue {
  private searchOpen = false;
  companyKindOption: any = [];
  buildingRoom: any = [];
  queryPageParameters: any = {
    dealCode: null,
    phoneOrCusName: null,
    contType: null,
    status: null,
    suppContType: null,
    dealOrgId: null,
    agencyId: null, // 渠道商id
    stage: null,
    projectCycle: null,
    proId: null,
    buildingId: null,
    broker: null,
    brokerId: null,
    timeType: null,
    beginTime: null,
    endTime: null,
    roomNumberId: null,
    companyKind: null,
  };
  selectTimeRange: any = [];
  resPageInfo: any = {
    total: null,
    list: [],
  };

  async created() {
    await this.getCompanyTypeList();
    await this.getListMixin();
  }

  // 查询条件折叠/展开
  private openToggle(): void {
    this.searchOpen = !this.searchOpen;
  }

  // 是否有新增按钮权限
  hasDealAddAuth(btnName: any = "") {
    let flag = true;
    switch (btnName) {
      case "ADD":
        // 添加 - 平台文员
        flag = (this as any).$roleTool.RProjectSite();
        break;
      case "ACHIEVEDECLARE":
        // 业绩申报 - 案场
        flag = (this as any).$roleTool.RFrontLineClerk();
        break;
    }
    return flag;
  }

  // 改变项目周期
  handleChangeCycle() {
    console.log(123)
    this.queryPageParameters.proId = null;
    this.queryPageParameters.buildingId = null;
    this.queryPageParameters.roomNumberId = null;
    this.buildingRoom = [];
  }

  // 改变公司类型
  changeAgencyType() {
    this.queryPageParameters.agencyId = null;
  }

  // 获取公司类型
  async getCompanyTypeList() {
    this.companyKindOption = await post_dict_getAllByType({
      tag:"Channel",
      type:"CompanyKind",
      valid:"Valid",
    });
  }

  // 改变查询时间
  inputTimeChange(dateArray: any) {
    // console.log('dateArray', dateArray);
    if (dateArray && dateArray.length === 2) {
      this.queryPageParameters.beginTime = dateArray[0];
      this.queryPageParameters.endTime = dateArray[1];
    } else {
      this.queryPageParameters.beginTime = null;
      this.queryPageParameters.endTime = null;
    }
  }

  // 获取成交报告列表
  async getListMixin() {
    if (
      this.queryPageParameters.timeType &&
      this.selectTimeRange.length === 0
    ) {
      this.$message({
        type: "warning",
        message: "请选择对应查询时间!",
      });
      return;
    }
    if (
      !this.queryPageParameters.timeType &&
      this.selectTimeRange &&
      this.selectTimeRange.length
    ) {
      this.$message({
        type: "warning",
        message: "请选择查询时间类型!",
      });
      return;
    }
    // this.queryPageParameters.isMainDealOnly = true;
    this.queryPageParameters.isConfirmed = true;
    this.resPageInfo = await post_deal_getSumList(this.queryPageParameters);
  }

  // 重置
  handleReset() {
    this.queryPageParameters = {
      dealCode: null,
      phoneOrCusName: null,
      contType: null,
      status: null,
      suppContType: null,
      dealOrgId: null,
      agencyId: null, // 渠道商id
      stage: null,
      projectCycle: null,
      proId: null,
      buildingId: null,
      broker: null,
      brokerId: null,
      timeType: null,
      beginTime: null,
      endTime: null,
      roomNumberId: null,
      companyKind: null,
      pageNum: 1,
      pageSize: this.queryPageParameters.pageSize,
    };
    this.buildingRoom = [];
    this.selectTimeRange = [];
  }

  // 新增
  async handleAdd(type: any) {
    this.$router.push({
      path: "/dealReport/add",
      query: { btnType: type },
    });
  }

  // 查看
  async handleInfo(scope: any) {
    this.$router.push({
      path: "/realdeal/info",
      query: {
        id: scope.row.id,
      },
    });
  }
  buildingRoomChange(data: any) {
    console.log(data);
    if (data && data.length == 1) {
      this.queryPageParameters.buildingId = data[0];
      this.queryPageParameters.roomNumberId = null;
    } else if (data && data.length == 2) {
      this.queryPageParameters.buildingId = data[0];
      this.queryPageParameters.roomNumberId = data[1];
    } else {
      this.queryPageParameters.buildingId = null;
      this.queryPageParameters.roomNumberId = null;
    }
  }
}
</script>
<style lang="scss" scoped>
.agency-wrapper {
  width: 100%;
  display: flex;

  div {
    flex: 1;
  }

  .right {
    flex: 2;
  }
}

.search-time-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;

  .time-type {
    width: 120px;
    box-sizing: border-box;
    margin-right: 5px;
  }

  .time-range {
    flex: 1;

    /deep/.el-date-editor {
      width: 100% !important;
    }
  }
}
.expand-content {
  display: inline-block;
  width: 400px;
  line-height: 25px;
}
</style>
