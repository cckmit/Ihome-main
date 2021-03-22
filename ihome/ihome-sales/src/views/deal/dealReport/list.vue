<!--
 * @Description:
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-03 09:10:20
 * @LastEditors: lsj
 * @LastEditTime: 2021-03-22 15:29:13
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
            <el-form-item label="合同类型">
              <el-select
                v-model="queryPageParameters.contType"
                clearable
                placeholder="请选择"
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
            <el-form-item label="成交状态">
              <el-select
                v-model="queryPageParameters.status"
                clearable
                placeholder="请选择"
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
        </el-row>
        <el-collapse-transition>
          <div v-show="searchOpen">
            <el-row>
              <el-col :span="8">
                <el-form-item label="补充类型">
                  <el-select
                    v-model="queryPageParameters.suppContType"
                    clearable
                    placeholder="请选择"
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
                <el-form-item label="组织">
                  <IhSelectOrgTree
                    v-model="queryPageParameters.dealOrgId"
                  ></IhSelectOrgTree>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="录入人">
                  <IhSelectPageUser
                    v-model="queryPageParameters.entryPerson"
                    clearable>
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
                <el-form-item label="客户姓名">
                  <el-input
                    v-model="queryPageParameters.customerName"
                    clearable
                    placeholder="客户姓名"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="客户电话">
                  <el-input
                    v-model="queryPageParameters.customerPhone"
                    clearable
                    placeholder="客户电话"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="渠道公司">
                  <IhSelectPageByChannel
                    v-model="queryPageParameters.agencyId"
                    clearable
                    placeholder="请选择渠道公司"
                    class="width--100"
                  ></IhSelectPageByChannel>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="经纪人">
                  <IhSelectPageByBroker
                    v-model="queryPageParameters.broker"
                    @changeOption="(data) => {queryPageParameters.brokerId = data.userId}"
                    :proId="queryPageParameters.agencyId"
                    clearable
                    placeholder="经纪人"></IhSelectPageByBroker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="成交阶段">
                  <el-select
                    v-model="queryPageParameters.stage"
                    clearable
                    placeholder="请选择"
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
                <el-form-item label="栋座">
                  <IhSelectPageByBuild
                    v-model="queryPageParameters.buildingId"
                    :proId="queryPageParameters.proId"
                    placeholder="请选择栋座"
                    clearable
                  ></IhSelectPageByBuild>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="房号">
                  <IhSelectPageByRoom
                    v-model="queryPageParameters.roomNumberId"
                    :proId="queryPageParameters.proId"
                    :buildingId="queryPageParameters.buildingId"
                    placeholder="请选择房号"
                    clearable
                  ></IhSelectPageByRoom>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="查询时间">
                  <div class="search-time-wrapper">
                    <div class="time-type">
                      <el-select
                        v-model="queryPageParameters.timeType"
                        placeholder="请选择"
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
          :class="{ 'ih-data-disabled': hasDealAddAuth('ADD')}"
          v-has="'B.SALES.DEAL.DEALLIST.ADD'"
          type="success" @click="handleAdd('add')">添加</el-button>
        <el-button
          :class="{ 'ih-data-disabled': hasDealAddAuth('ACHIEVEDECLARE')}"
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
        class="ih-table"
        :empty-text="emptyText"
        :data="resPageInfo.list">
        <el-table-column prop="dealCode" label="成交报告编号" min-width="190"></el-table-column>
        <el-table-column prop="contType" label="房产信息" min-width="260">
          <template slot-scope="scope">
            <div>房号：{{scope.row.buildingName}} - {{scope.row.roomNo}}</div>
            <div>客户：{{scope.row.customerName}}</div>
            <div>客户电话：{{scope.row.customerPhone}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="contType" label="交易类型" min-width="180">
          <template slot-scope="scope">
            <div v-if="scope.row.contType">{{ $root.dictAllName(scope.row.contType, 'ContType') }}</div>
            <div v-if="scope.row.suppContType">{{ $root.dictAllName(scope.row.suppContType, 'SuppContType') }}</div>
            <div v-if="scope.row.status">状态：{{ $root.dictAllName(scope.row.status, 'DealStatus') }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="actualAmount" label="应收实收金额" min-width="190">
          <template slot-scope="scope">
            <div>应收：{{scope.row.receiveAmount}}</div>
            <div>实收：{{scope.row.actualAmount}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="commAmount" label="拆佣金额" min-width="190">
          <template slot-scope="scope">
            <div>总金额：{{scope.row.commAmount}}</div>
            <div>已付金额：{{scope.row.paidCommAmount}}</div>
            <div>未付金额：{{scope.row.unpaidCommAmount}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="commAmount" label="渠道信息" min-width="190">
          <template slot-scope="scope">
            <div>公司：{{scope.row.channelName}}</div>
            <div>经纪人：{{scope.row.brokerName}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="commAmount" label="项目周期信息" min-width="300">
          <template slot-scope="scope">
            <div>项目：{{scope.row.projectName}}</div>
            <div>周期：{{scope.row.termName}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="entryPerson" label="人员信息" min-width="200">
          <template slot-scope="scope">
            <div>录入人：{{scope.row.entryPerson}}</div>
            <div>业绩分配人：{{scope.row.alloter}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="dealOrg" label="组织信息" min-width="250"></el-table-column>
        <el-table-column prop="allotDate" label="签约/填写/业绩确认/审批日期" min-width="220">
          <template slot-scope="scope">
            <div>签约：{{scope.row.signDate}}</div>
            <div>填写：{{scope.row.createTime}}</div>
            <div>业绩：{{scope.row.allotDate}}</div>
            <div>审批：{{scope.row.approveTime}}</div>
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
                <el-dropdown-item
                  :class="{ 'ih-data-disabled': hasBtnRole(scope.row, 'VERIFY')}"
                  v-has="'B.SALES.DEAL.DEALLIST.VERIFY'"
                  @click.native.prevent="handleReview(scope)"
                >审核
                </el-dropdown-item>
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

  @Component({
    mixins: [PaginationMixin],
  })
  export default class DealReportList extends Vue {
    private searchOpen = true;
    queryPageParameters: any = {
      dealCode: null,
      contType: null,
      status: null,
      suppContType: null,
      dealOrgId: null,
      entryPerson: null,
      customerName: null,
      customerPhone: null,
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
      roomNumberId: null
    };
    selectTimeRange: any = [];

    resPageInfo: any = {
      total: null,
      list: [],
    };

    async created() {
      await this.getListMixin();
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
        contType: null,
        status: null,
        suppContType: null,
        dealOrgId: null,
        entryPerson: null,
        customerName: null,
        customerPhone: null,
        agencyId: null,
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
        pageNum: 1,
        pageSize: this.queryPageParameters.pageSize
      };
      this.selectTimeRange = [];
    }

    // 新增
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
</style>
