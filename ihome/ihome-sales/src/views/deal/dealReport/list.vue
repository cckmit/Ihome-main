<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-03 09:10:20
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-09 17:28:20
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
                placeholder="成交报告编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同类型">
              <el-select
                v-model="queryPageParameters.contType"
                clearable
                placeholder="合同类型"
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
                placeholder="成交状态"
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
            <el-form-item label="补充类型">
              <el-select
                v-model="queryPageParameters.suppContType"
                clearable
                placeholder="补充类型"
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
              <SelectOrganizationTree
                :orgId="queryPageParameters.dealOrg"
                @callback="(id) => (queryPageParameters.dealOrg = id)"
              />
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
              <el-input
                v-model="queryPageParameters.agencyName"
                clearable
                placeholder="渠道公司"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经纪人">
              <SelectByBroker
                v-model="queryPageParameters.broker"
                :isKeyUp="true"
                :props="{
                  value: 'id',
                  key: 'id',
                  lable: 'name'}"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="成交阶段">
              <el-select
                v-model="queryPageParameters.stage"
                clearable
                placeholder="成交阶段"
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
              <SelectByCycle
                v-model="queryPageParameters.projectCycle"
                :isKeyUp="true"
                :props="{
                  value: 'id',
                  key: 'id',
                  lable: 'name'}"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="栋座">
              <SelectByTower
                v-model="queryPageParameters.agencyName"
                :isKeyUp="true"
                :props="{
                  value: 'id',
                  key: 'id',
                  lable: 'name'}"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="房号">
              <el-input
                v-model="queryPageParameters.agencyName"
                clearable
                placeholder="房号"
              ></el-input>
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
      </el-form>
    </template>
    <template v-slot:btn>
      <el-row>
        <el-button type="primary" @click="getListMixin()">查询</el-button>
        <el-button type="info" @click="handleReset()">重置</el-button>
        <el-button type="success" @click="handleAdd()">业绩申报</el-button>
        <el-button type="success" @click="handleAdd()">新增</el-button>
      </el-row>
    </template>
    <template v-slot:table>
      <br/>
      <el-table
        class="ih-table"
        :empty-text="emptyText"
        :data="resPageInfo.list">
        <el-table-column prop="dealCode" label="成交报告编号" min-width="260"></el-table-column>
        <el-table-column prop="contType" label="房产信息" min-width="260">
          <template slot-scope="scope">
            <div>地址：{{scope.row.address}}</div>
            <div>客户：{{scope.row.customerName}}</div>
            <div>客户电话：{{scope.row.customerPhone}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="contType" label="交易类型" min-width="180">
          <template slot-scope="scope">
            <div v-if="scope.row.contType">{{ $root.dictAllName(scope.row.contType, 'ContType') }}</div>
            <div v-if="scope.row.suppContType">{{ $root.dictAllName(scope.row.suppContType, 'SuppContType') }}</div>
            <div>状态：{{ $root.dictAllName(scope.row.status, 'DealStatus') }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="actualAmount" label="应收实收金额" min-width="190">
          <template slot-scope="scope">
            <div>应收：{{scope.row.receiveAmount}}</div>
            <div>实收：{{scope.row.actualAmount}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="commAmount" label="拆用金额" min-width="190">
          <template slot-scope="scope">
            <div>总金额：{{scope.row.commAmount}}</div>
            <div>已付金额：{{scope.row.paidCommAmount}}</div>
            <div>未付金额：{{scope.row.unpaidCommAmount}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="commAmount" label="渠道信息" min-width="190">
          <template slot-scope="scope">
            <div>公司：{{scope.row.commAmount}}</div>
            <div>经纪人：{{scope.row.paidCommAmount}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="commAmount" label="项目周期信息" min-width="180">
          <template slot-scope="scope">
            <div>项目：{{scope.row.commAmount}}</div>
            <div>周期：{{scope.row.paidCommAmount}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="entryPerson" label="人员信息" min-width="180">
          <template slot-scope="scope">
            <div>录入人：{{scope.row.entryPerson}}</div>
            <div>业绩分配人：{{scope.row.alloter}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="dealOrg" label="组织信息" min-width="260"></el-table-column>
        <el-table-column prop="allotDate" label="签约/填写/业绩确认/审批日期" min-width="210">
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
                <el-dropdown-item @click.native.prevent="handleEdit(scope)"
                >修改
                </el-dropdown-item>
                <el-dropdown-item @click.native.prevent="handleDelete(scope)"
                >删除
                </el-dropdown-item>
                <el-dropdown-item @click.native.prevent="handleRecall(scope)"
                >撤回
                </el-dropdown-item>
                <el-dropdown-item @click.native.prevent="handleReview(scope)"
                >审核
                </el-dropdown-item>
                <el-dropdown-item @click.native.prevent="handleReviewAchieve(scope)"
                >审核申报业绩
                </el-dropdown-item>
                <el-dropdown trigger="click" class="el-dropdown-menu__item" placement="top-start">
                  <span class="el-dropdown-link">
                  补充成交
                  <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native.prevent="handleChangeDealInfo(scope, 'baseInfo')"
                    >变更基础信息
                    </el-dropdown-item>
                    <el-dropdown-item @click.native.prevent="handleChangeDealInfo(scope, 'achieveInfo')"
                    >变更业绩信息
                    </el-dropdown-item>
                    <el-dropdown-item @click.native.prevent="handleChangeDealInfo(scope, 'checkOut')"
                    >退房
                    </el-dropdown-item>
                    <el-dropdown-item @click.native.prevent="handleChangeDealInfo(scope, 'staffAchieveInfo')"
                    >内部员工业绩变更
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown-item @click.native.prevent="handleWithdrawalReview(scope)"
                >撤回审核
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
  import SelectOrganizationTree from "@/components/select/SelectOrganizationTree.vue";
  import SelectByBroker from "@/components/select/SelectByBroker.vue";
  import SelectByCycle from "@/components/select/SelectByCycle.vue";
  import SelectByTower from "@/components/select/SelectByTower.vue";

  import {
    post_deal_getList,
    post_deal_delete__id,
    post_deal_withdrawDeal,
    post_processRecord_withdrawReview
  } from "@/api/deal";

  import PaginationMixin from "@/mixins/pagination";

  @Component({
    components: {SelectOrganizationTree, SelectByBroker, SelectByCycle, SelectByTower},
    mixins: [PaginationMixin],
  })
  export default class DealReportList extends Vue {
    queryPageParameters: any = {
      dealCode: null,
      contType: null,
      status: null,
      suppContType: null,
      dealOrg: null,
      entryPerson: null,
      customerName: null,
      customerPhone: null,
      agencyName: null,
      stage: null,
      projectCycle: null,
      broker: null,
      timeType: null,
      beginTime: null,
      endTime: null
    };
    selectTimeRange: any = [];

    resPageInfo: any = {
      total: null,
      list: [{},{}],
    };

    async created() {
      await this.getListMixin();
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
          type: "error",
          message: "请选择对应查询时间!",
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
        dealOrg: null,
        entryPerson: null,
        customerName: null,
        customerPhone: null,
        agencyName: null,
        stage: null,
        projectCycle: null,
        broker: null,
        timeType: null,
        beginTime: null,
        endTime: null,
        pageNum: 1,
        pageSize: this.queryPageParameters.pageSize
      };
      this.selectTimeRange = [];
    }

    // 新增
    async handleAdd() {
      this.$router.push({
        path: "/dealReport/add"
      });
    }

    // 查看
    async handleInfo(scope: any) {
      this.$router.push({
        path: "/dealReport/info",
        query: {id: scope.row.id}
      });
    }

    // 修改
    async handleEdit(scope: any) {
      this.$router.push({
        path: "/dealReport/add",
        query: {id: scope.row.id}
      });
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
        let postData: any = {
          id: scope.row.id, // 成交ID
          jobId: 0, // 当前用户岗位ID
          status: scope.row.status, // 成交当前状态
          userId: 0 // 当前用户ID
        }
        await post_deal_withdrawDeal(postData);
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
      this.$router.push({
        path: "/dealReport/reviewDealInfo",
        query: {
          id: scope.row.id
        }
      });
    }

    // 审核申报业绩
    async handleReviewAchieve(scope: any) {
      console.log(scope);
      this.$router.push({
        path: "/dealReport/add",
        query: {id: scope.row.id}
      });
    }

    /*
    * type: 变更成交按钮类型
    * baseInfo --- 变更基础信息
    * achieveInfo --- 变更业绩信息
    * checkOut --- 退房
    * staffAchieveInfo --- 内部员工业绩变更
    * */
    async handleChangeDealInfo(scope: any, type: any) {
      console.log(scope);
      this.$router.push({
        path: "/dealReport/changeDealInfo",
        query: {
          id: scope.row.id,
          type: type
        }
      });
    }

    // 撤回审核
    async handleWithdrawalReview(scope: any) {
      try {
        await this.$confirm("是否确定撤回审核?", "提示");
        let postData: any = {
          id: scope.row.id, // 成交ID
          jobId: 0, // 当前用户岗位ID
          status: scope.row.status, // 成交当前状态
          userId: 0 // 当前用户ID
        }
        await post_processRecord_withdrawReview(postData);
        this.$message({
          type: "success",
          message: "撤回审核成功!",
        });
        await this.getListMixin();
      } catch (error) {
        console.log(error);
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
