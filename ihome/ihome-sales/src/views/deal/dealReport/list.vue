<!--
 * @Description:
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-03 09:10:20
 * @LastEditors: lsj
 * @LastEditTime: 2021-04-09 14:19:20
-->
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
            <el-form-item label="项目周期">
              <IhSelectPageByCycle
                clearable
                @changeOption="(data) => {queryPageParameters.proId = data.proId}"
                v-model="queryPageParameters.projectCycle"
                placeholder="请选择立项周期"
              ></IhSelectPageByCycle>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="栋座房号">
              <IhBuildingRoom
                v-model="buildingRoomId"
                @change="changeBuildingRoom"
                :proId="queryPageParameters.proId"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-collapse-transition>
          <div v-show="searchOpen">
            <el-row>
              <el-col :span="8">
                <el-form-item label="客户信息">
                  <el-input
                    v-model="queryPageParameters.phoneOrCusName"
                    clearable
                    placeholder="客户姓名或手机号"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="归属组织">
                  <IhSelectOrgTree
                    v-model="queryPageParameters.dealOrgId"
                    placeholder="请选择归属组织"
                  ></IhSelectOrgTree>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="成交状态">
                  <el-select
                    v-model="queryPageParameters.status"
                    clearable
                    placeholder="请选择成交状态"
                    class="width--100">
                    <el-option
                      v-for="item in $root.dictAllList('DealStatus')"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同类型">
                  <el-select
                    v-model="queryPageParameters.contType"
                    clearable
                    placeholder="请选择合同类型"
                    class="width--100">
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
                    placeholder="请选择成交阶段"
                    class="width--100">
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
                <el-form-item label="补充类型">
                  <el-select
                    v-model="queryPageParameters.suppContType"
                    clearable
                    placeholder="请选择补充类型"
                    class="width--100">
                    <el-option
                      v-for="item in $root.dictAllList('SuppContType')"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
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
                    @changeOption="(data) => {queryPageParameters.brokerId = data.userId}"
                    :proId="queryPageParameters.agencyId"
                    clearable
                    placeholder="请选择经纪人"></IhSelectPageByBroker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="日期筛选">
                  <div class="search-time-wrapper">
                    <div class="time-type">
                      <el-select
                        v-model="queryPageParameters.timeType"
                        placeholder="日期类型"
                        clearable
                        class="width--100">
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
        <el-button
          :class="{ 'ih-data-disabled': !hasDealAddAuth('ADD')}"
          v-has="'B.SALES.DEAL.DEALLIST.ADD'"
          type="success" @click="handleAdd('add')">新增成交</el-button>
        <el-button
          :class="{ 'ih-data-disabled': !hasDealAddAuth('ACHIEVEDECLARE')}"
          v-has="'B.SALES.DEAL.DEALLIST.ACHIEVEDECLARE'"
          type="success" @click="handleAdd('declare')">业绩申报</el-button>
        <el-button type="info" @click="handleReset()">重置</el-button>
        <el-link
          type="primary"
          class="float-right margin-right-40"
          @click="openToggle()"
        >{{searchOpen?'收起':'展开'}}</el-link>
      </el-row>
    </template>
    <template v-slot:table>
      <br/>
      <el-table
        class="ih-table deal-table-expand"
        :empty-text="emptyText"
        :data="resPageInfo.list">
        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="table-expand-wrapper">
              <div class="expand-item">
                <div>周期项目：{{props.row.termName}}</div>
                <div>栋座房号：{{props.row.buildingName}} - {{props.row.roomNo}}</div>
                <div v-if="props.row.suppContType">补充类型：{{ $root.dictAllName(props.row.suppContType, 'SuppContType') }}</div>
                <div v-else>补充类型：-</div>
              </div>
              <div class="expand-item">
                <div>渠道公司：{{props.row.channelName}}</div>
                <div>客户姓名：{{props.row.customerName}}</div>
              </div>
              <div class="expand-item">
                <div>经纪人：{{props.row.brokerName}}</div>
                <div>客户电话：{{props.row.customerPhone}}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="dealCode" label="成交报告编号" min-width="220"></el-table-column>
        <el-table-column prop="contType" label="合同类型" min-width="110">
          <template slot-scope="scope">
            <div v-if="scope.row.contType">{{ $root.dictAllName(scope.row.contType, 'ContType') }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="receiveAmount" label="应收金额" align="right" min-width="180">
          <template slot-scope="scope">
            <div>{{scope.row.receiveAmount ? scope.row.receiveAmount : 0}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="actualAmount" label="已收金额" align="right" min-width="180">
          <template slot-scope="scope">
            <div>{{scope.row.actualAmount ? scope.row.actualAmount : 0}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="commAmount" label="应付金额" align="right" min-width="180">
          <template slot-scope="scope">
            <div>{{scope.row.commAmount ? scope.row.commAmount : 0}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="paidCommAmount" label="已付金额" align="right" min-width="180">
          <template slot-scope="scope">
            <div>{{scope.row.paidCommAmount ? scope.row.paidCommAmount : 0}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" min-width="150">
          <template slot-scope="scope">
            <div class="deal-status-dot">
              <span class="dot" :class="getStatusDot(scope.row.status)"></span>
              <span>{{ $root.dictAllName(scope.row.status, 'DealStatus') }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="dealOrg" label="组织信息" min-width="250"></el-table-column>
        <el-table-column prop="entryPerson" label="录入人" min-width="110"></el-table-column>
        <el-table-column prop="entryDate" label="录入日期" min-width="130">
          <template slot-scope="scope">
            <div>{{scope.row.entryDate ? getDateStr(scope.row.entryDate) : '-'}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="allotDate" label="业绩分配日期" min-width="130">
          <template slot-scope="scope">
            <div>{{scope.row.allotDate ? getDateStr(scope.row.allotDate) : '-'}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="subscribeDate" label="认购日期" min-width="130">
          <template slot-scope="scope">
            <div>{{scope.row.subscribeDate ? getDateStr(scope.row.subscribeDate) : '-'}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="signDate" label="签约日期" min-width="130">
          <template slot-scope="scope">
            <div>{{scope.row.signDate ? getDateStr(scope.row.signDate) : '-'}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="achieveConfirmTime" label="业绩确认日期" min-width="130">
          <template slot-scope="scope">
            <div>{{scope.row.achieveConfirmTime ? getDateStr(scope.row.achieveConfirmTime) : '-'}}</div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="130">
          <template slot-scope="scope">
            <el-link
              class="margin-right-10"
              type="primary"
              @click.native.prevent="handleInfo(scope)"
            >查看
            </el-link>
            <el-dropdown trigger="click" style="margin-left: 15px">
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :class="{ 'ih-data-disabled': hasBtnRole(scope.row, 'UPDATE')}"
                  v-has="'B.SALES.DEAL.DEALLIST.UPDATE'"
                  @click.native.prevent="handleEdit(scope)"
                >修改
                </el-dropdown-item>
                <el-dropdown-item
                  :class="{ 'ih-data-disabled': hasBtnRole(scope.row, 'DELETE')}"
                  v-has="'B.SALES.DEAL.DEALLIST.DELETE'"
                  @click.native.prevent="handleDelete(scope)"
                >删除
                </el-dropdown-item>
                <el-dropdown-item
                  :class="{ 'ih-data-disabled': hasBtnRole(scope.row, 'REVOKE')}"
                  v-has="'B.SALES.DEAL.DEALLIST.REVOKE'"
                  @click.native.prevent="handleRecall(scope)"
                >撤回
                </el-dropdown-item>
                <el-dropdown-item
                  :class="{ 'ih-data-disabled': hasBtnRole(scope.row, 'VERIFY')}"
                  v-has="'B.SALES.DEAL.DEALLIST.VERIFY'"
                  @click.native.prevent="handleReview(scope)"
                >审核
                </el-dropdown-item>
                <el-dropdown-item
                  v-if="scope.row.status !== 'Draft'"
                  @click.native.prevent="handleUpload(scope)"
                >补充附件
                </el-dropdown-item>
                <el-dropdown trigger="click" class="el-dropdown-menu__item" placement="top-start">
                  <span
                    v-has="'B.SALES.DEAL.DEALLIST.SUPPLEMENTDEAL'"
                    :class="{ 'ih-data-disabled': hasBtnRole(scope.row, 'SUPPLEMENTDEAL')}"
                    class="el-dropdown-link">
                  补充成交
                  <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native.prevent="handleChangeDealInfo(scope, 'ChangeBasicInf')"
                    >变更基础信息
                    </el-dropdown-item>
                    <el-dropdown-item @click.native.prevent="handleChangeDealInfo(scope, 'ChangeAchieveInf')"
                    >变更业绩信息
                    </el-dropdown-item>
                    <el-dropdown-item @click.native.prevent="handleChangeDealInfo(scope, 'RetreatRoom')"
                    >退房
                    </el-dropdown-item>
                    <el-dropdown-item @click.native.prevent="handleChangeDealInfo(scope, 'ChangeInternalAchieveInf')"
                    >内部员工业绩变更
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template v-slot:pagination>
      <br/>
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
  import {Component, Vue} from "vue-property-decorator";
  import {
    post_deal_getList,
    post_deal_delete__id,
    get_processRecord_withdraw__id
  } from "@/api/deal";

  import PaginationMixin from "@/mixins/pagination";
  import {post_dict_getAllByType} from "@/api/system";

  @Component({
    mixins: [PaginationMixin],
  })
  export default class DealReportList extends Vue {
    private searchOpen = true;
    companyKindOption: any = [];
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
    buildingRoomId: any = [];

    resPageInfo: any = {
      total: null,
      list: [],
    };

    async created() {
      await this.getCompanyTypeList();
      await this.getListMixin();
    }

    // 获取公司类型
    async getCompanyTypeList() {
      this.companyKindOption = await post_dict_getAllByType({
        tag:"Channel",
        type:"CompanyKind",
        valid:"Valid",
      });
    }

    // 查询条件折叠/展开
    private openToggle(): void {
      this.searchOpen = !this.searchOpen;
    }

    // 是否有新增按钮权限
    hasDealAddAuth(btnName: any = '') {
      let flag = true;
      switch (btnName) {
        case "ADD":
          // 添加 - 文员
          flag = (this as any).$roleTool.RFrontLineClerk();
          break;
        case "ACHIEVEDECLARE":
          // 业绩申报 - 案场
          flag = (this as any).$roleTool.RProjectSite();
          break;
      }
      return flag;
    }

    // 根据成交报告状态、是主成交还是补充成交、登录者的岗位来判断是否有操作按钮权限
    hasBtnRole(row: any, btnName: any = "") {
      // console.log('RProjectSite', (this as any).$roleTool.RProjectSite());
      let flag: any = true; // 是否禁用、默认禁用
      if (btnName) {
        switch (btnName) {
          case 'UPDATE':
            // 修改按钮权限
            if (row.id === row.parentId) {
              // 主成交
              if (row.status === 'Draft' && (this as any).$roleTool.RProjectSite()) {
                // 草稿、案场
                flag = false;
              }
              if (['AchieveDeclareUnconfirm', 'Reject'].includes(row.status) && (this as any).$roleTool.RFrontLineClerk()) {
                // 业绩申报待确认 + 驳回、文员
                flag = false;
              }
            } else {
              // 补充成交
              if (['Draft', 'Reject'].includes(row.status) && (this as any).$roleTool.RFrontLineClerk()) {
                // 草稿 + 驳回、文员
                flag = false;
              }
            }
            break;
          case 'DELETE':
            // 删除按钮权限
            if (row.id === row.parentId) {
              // 主成交
              if (row.status === 'Draft' && (this as any).$roleTool.RProjectSite()) {
                // 草稿、案场
                flag = false;
              }
              if (['AchieveDeclareUnconfirm', 'Reject'].includes(row.status) && (this as any).$roleTool.RFrontLineClerk()) {
                // 业绩申报待确认 + 驳回、文员
                flag = false;
              }
            } else {
              // 补充成交
              if (['Draft', 'Reject'].includes(row.status) && (this as any).$roleTool.RFrontLineClerk()) {
                // 草稿 + 驳回、文员
                flag = false;
              }
            }
            break;
          case 'REVOKE':
            // 撤回按钮权限
            if (row.status === 'PlatformClerkUnreview' && (this as any).$roleTool.RFrontLineClerk()) {
              // 平台文员待审核、文员
              flag = false;
            }
            if (row.status === 'HeadDepartUnreview' && (this as any).$roleTool.RPlatformClerk()) {
              // 事业部负责人待审核、平台文员
              flag = false;
            }
            if (row.status === 'BranchBusinessManageUnreview' && (this as any).$roleTool.RDepartmentLeader()) {
              // 分公司业管待审核、事业部负责人
              flag = false;
            }
            // 2021-02-22:这个权限要调整一下，一是后端没实现，临时做可能有问题，所以去掉了这个业管在“待签署生效”状态的撤回
            // if (row.status === 'NotSigned' && (this as any).$roleTool.RBusinessManagement()) {
            //   // 待签署生效、业务监管岗（分公司业管）
            //   flag = false;
            // }
            if (row.id === row.parentId && row.status === 'NotSigned' && (this as any).$roleTool.RBusinessManagement()) {
              // 主成交、待签署生效、业务监管岗（分公司业管）
              flag = false;
            }
            break;
          case 'SUPPLEMENTDEAL':
            // 补充成交按钮权限
            if (row.id === row.parentId && row.status === 'ReviewPassed' && (this as any).$roleTool.RFrontLineClerk() && !row.noApplySupp) {
              // 主成交、已审核、文员
              flag = false;
            }
            break;
          case 'VERIFY':
            // 审核按钮权限
            if (row.status === 'PlatformClerkUnreview' && (this as any).$roleTool.RPlatformClerk()) {
              // 平台文员待审核、平台文员
              flag = false;
            }
            if (row.status === 'HeadDepartUnreview' && (this as any).$roleTool.RDepartmentLeader()) {
              // 事业部负责人待审核、事业部负责人
              flag = false;
            }
            if (row.status === 'BranchBusinessManageUnreview' && (this as any).$roleTool.RBusinessManagement()) {
              // 分公司业管待审核、业务监管岗（分公司业管）
              flag = false;
            }
            break;
        }
      }
      return flag;
    }

    // 改变栋座房号
    changeBuildingRoom(value: any) {
      console.log('changeBuildingRoom:', value);
      if (value && value.length === 2) {
        this.queryPageParameters.buildingId = value[0];
        this.queryPageParameters.roomNumberId = value[1];
      } else {
        this.queryPageParameters.buildingId = null;
        this.queryPageParameters.roomNumberId = null;
      }
    }

    // 改变公司类型
    changeAgencyType() {
      this.queryPageParameters.agencyId = null;
    }

    // 获取日期年月日
    getDateStr(value: any = '') {
      if (value) {
        return value.substring(0, 10);
      }
    }

    // 获取颜色
    getStatusDot(status: any = '') {
      if (status === 'Draft') {
        return 'warning';
      } else if (status === 'ReviewPassed') {
        return 'success';
      } else {
        return 'primary';
      }
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
      if (this.queryPageParameters.timeType && this.selectTimeRange.length === 0) {
        this.$message({
          type: "warning",
          message: "请选择对应查询时间!",
        });
        return
      }
      if (!this.queryPageParameters.timeType && this.selectTimeRange && this.selectTimeRange.length) {
        this.$message({
          type: "warning",
          message: "请选择查询时间类型!",
        });
        return
      }
      this.resPageInfo = await post_deal_getList(this.queryPageParameters);
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
        pageSize: this.queryPageParameters.pageSize
      };
      this.selectTimeRange = [];
      this.buildingRoomId = [];
    }

    // 新增成交
    async handleAdd(type: any) {
      this.$router.push({
        path: "/dealReport/add",
        query: {btnType: type}
      });
    }

    // 查看
    async handleInfo(scope: any) {
      this.$router.push({
        path: "/dealReport/info",
        query: {
          id: scope.row.id,
          type: "ID"
        }
      });
    }

    // 修改
    async handleEdit(scope: any) {
      // 通过id和parentId是否相等来判断是主成交还是补充成交
      if (scope.row.id === scope.row.parentId) {
        // 主成交
        let type: any = '';
        if (scope.row.status === "Draft") {
          // 案场岗的录入编辑
          type = "declare"
        } else if (['Reject', 'AchieveDeclareUnconfirm'].includes(scope.row.status)) {
          // 文员岗的录入编辑
          type = "add"
        }
        if (!type) return;
        this.$router.push({
          path: "/dealReport/add",
          query: {
            id: scope.row.id,
            btnType: type
          }
        });
      } else {
        // 补充成交
        if (scope.row.suppContType && ['Draft', 'Reject'].includes(scope.row.status)) {
          this.$router.push({
            path: "/dealReport/suppDeal",
            query: {
              id: scope.row.id,
              type: scope.row.suppContType,
              btnType: 'edit' // 修改
            }
          });
        }
      }
    }

    // 删除
    async handleDelete(scope: any) {
      try {
        await this.$confirm("是否确定删除?", "提示");
        await post_deal_delete__id({id: scope.row.id});
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        await this.getListMixin();
      } catch (error) {
        console.log(error);
      }
    }

    // 撤回
    async handleRecall(scope: any) {
      try {
        await this.$confirm("是否确定撤回?", "提示");
        await get_processRecord_withdraw__id({id: scope.row.id});
        this.$message({
          type: "success",
          message: "撤回成功!",
        });
        await this.getListMixin();
      } catch (error) {
        console.log(error);
      }
    }

    // 补充附件
    handleUpload(scope: any) {
      this.$router.push({
        path: "/dealReport/uploadAttachment",
        query: {
          id: scope.row.id
        }
      });
    }

    // 审核
    async handleReview(scope: any) {
      console.log(scope);
      // 判断成交报告的类型
      let type: any = '';
      if (scope.row.id === scope.row.parentId) {
        // 主成交模式
        type = "mainDeal";
      } else {
        // 补充成交模式
        if (['ChangeAchieveInf', 'RetreatRoom'].includes(scope.row.suppContType)) {
          type = "mainDeal";
        }
        if (['ChangeBasicInf'].includes(scope.row.suppContType)) {
          type = "baseDeal";
        }
        if (['ChangeInternalAchieveInf'].includes(scope.row.suppContType)) {
          type = "achieveDeal";
        }
      }
      this.$router.push({
        path: "/dealReport/reviewDealInfo",
        query: {
          id: scope.row.id,
          type: type
        }
      });
    }

    /*
    * type: 变更成交按钮类型
    * ChangeBasicInf --- 变更基础信息
    * ChangeAchieveInf --- 变更业绩信息
    * RetreatRoom --- 退房
    * ChangeInternalAchieveInf --- 内部员工业绩变更
    * */
    async handleChangeDealInfo(scope: any, type: any) {
      // console.log(scope);
      // console.log(type);
      if (scope.row.id === scope.row.parentId) {
        // 这两个id一样，才是主成交报告，才能新增补充成交
        this.$router.push({
          path: "/dealReport/suppDeal",
          query: {
            id: scope.row.id,
            type: type,
            btnType: 'add' // 新增
          }
        });
      } else {
        this.$message.warning('非主成交报告，没有此操作');
      }
    }
  }
</script>
<style lang="scss" scoped>
  .search-time-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;

    .time-type {
      width: 29%;
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

  .deal-table-expand {
    /deep/.el-table__expanded-cell {
      padding: 10px 50px !important;
    }

    .table-expand-wrapper {
      width: 100%;
      display: flex;
      flex-direction: row;

      .expand-item {
        margin-right: 30px;

        div {
          padding: 5px 0px;
        }
      }
    }

    .deal-status-dot {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;

      .dot {
        display:block;
        border-radius:50%;
        width:8px;
        height:8px;
        box-sizing: border-box;
        margin-right: 5px;
      }

      .warning {
        background: #e6a23c;
      }

      .primary {
        background: #409eff;
      }

      .success {
        background: #67c23a;
      }
    }
  }

  .form-item-line-20 {
    /deep/.el-form-item__label {
      line-height: 20px !important;
    }
  }
</style>
