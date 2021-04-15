<!--
 * @Description: 中介分销协议列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-25 17:34:32
 * @LastEditors: ywl
 * @LastEditTime: 2021-04-14 17:51:24
-->
<template>
  <IhPage label-width="100px">
    <!-- 搜索 -->
    <template #form>
      <el-form
        ref="form"
        label-width="100px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="合同标题">
              <el-input
                v-model="queryPageParameters.title"
                placeholder="请输入标题"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同类型">
              <el-select
                v-model="queryPageParameters.contractKind"
                placeholder="请选择合同类型 "
                clearable
              >
                <el-option
                  v-for="(i, n) in $root.dictAllList('ContractKind')"
                  :key="n"
                  :label="i.name"
                  :value="i.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="甲方公司">
              <IhSelectPageByCompany
                v-model="queryPageParameters.partyACompanyId"
                clearable
                class="width--100"
              ></IhSelectPageByCompany>
            </el-form-item>
          </el-col>
        </el-row>
        <el-collapse-transition>
          <div v-show="searchOpen">
            <el-row>
              <el-col :span="8">
                <el-form-item label="乙方公司">
                  <IhSelectPageByChannel
                    v-model="queryPageParameters.channelCompanyId"
                    clearable
                    placeholder="请选择乙方公司"
                    class="width--100"
                  ></IhSelectPageByChannel>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="8">
                <el-form-item label="项目地址">
                  <el-input
                    v-model="queryPageParameters.projectAddress"
                    placeholder="项目地址"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col> -->
              <el-col :span="8">
                <el-form-item label="合作时间">
                  <el-date-picker
                    style="width:100%;"
                    v-model="timeList"
                    type="daterange"
                    align="left"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="$root.pickerOptions"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="项目">
                  <IhSelectPageByProject
                    v-model="queryPageParameters.projectId"
                    placeholder="请选择项目"
                    clearable
                  ></IhSelectPageByProject>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="周期">
                  <IhSelectPageByCycle
                    v-model="queryPageParameters.cycleId"
                    placeholder="请选择周期"
                    clearable
                  ></IhSelectPageByCycle>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="归属组织">
                  <IhSelectPageDivision
                    v-model="queryPageParameters.organizationId"
                    placeholder="请选择归属组织"
                    clearable
                  ></IhSelectPageDivision>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合同编号">
                  <el-input
                    v-model="queryPageParameters.contractNo"
                    clearable
                    placeholder="请输入合同编号"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="审核状态">
                  <el-select
                    v-model="queryPageParameters.distributionState"
                    clearable
                    placeholder="请选择审核状态"
                    class="width--100"
                  >
                    <el-option
                      v-for="(item, i) in $root.dictAllList('DistributionState')"
                      :key="i"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="归档状态">
                  <el-select
                    v-model="queryPageParameters.archiveStatus"
                    clearable
                    placeholder="请选择归档状态"
                    class="width--100"
                  >
                    <el-option
                      v-for="(item, i) in $root.dictAllList('ArchiveStatus')"
                      :key="i"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="归档编号">
                  <el-input
                    v-model="queryPageParameters.archiveNo"
                    clearable
                    placeholder="请输入归档编号"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <!-- <el-col :span="8">
                <el-form-item label="合同录入人">
                  <IhSelectPageUser
                    v-model="queryPageParameters.entryPerson"
                    clearable
                  ></IhSelectPageUser>
                </el-form-item>
              </el-col> -->
              <el-col :span="8">
                <el-form-item label="合同跟进人">
                  <IhSelectPageUser
                    v-model="queryPageParameters.handler"
                    clearable
                  ></IhSelectPageUser>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-collapse-transition>
      </el-form>
    </template>
    <!-- 按钮 -->
    <template #btn>
      <el-row>
        <el-button
          type="primary"
          @click="handleSearch()"
        >查询</el-button>
        <el-button
          type="info"
          @click="handleReact()"
        >重置</el-button>
        <el-button
          type="success"
          v-if="$route.name === 'DistributionList'"
          @click="review(selectionData)"
          v-has="'B.SALES.CONTRACT.DISTLIST.VERIFY'"
        >审核</el-button>
        <el-button
          type="success"
          v-else-if="$route.name === 'DistributionListByBusiness'"
          @click="review(selectionData)"
          v-has="'B.SALES.CONTRACT.DISTBYBUSINESS.VERIFY'"
        >审核</el-button>
        <el-button
          type="success"
          v-else-if="$route.name === 'DistributionListByBack'"
          @click="review(selectionData)"
          v-has="'B.SALES.CONTRACT.DISTBYBACK.VERIFY'"
        >审核</el-button>
        <!-- <el-button
          type="success"
          @click="distribute(selectionData)"
          v-has="'B.SALES.CONTRACT.DISTLIST.DISTRIBUTE'"
        >派发</el-button> -->
        <el-button
          type="danger"
          v-if="$route.name === 'DistributionList'"
          @click="handleDis(selectionData)"
          :class="{ 'ih-data-disabled': !(channelChange() || contractChange()) }"
          v-has="'B.SALES.CONTRACT.DISTLIST.REJECT'"
        >驳回</el-button>
        <el-button
          type="danger"
          v-else-if="$route.name === 'DistributionListByBusiness'"
          @click="handleDis(selectionData)"
          :class="{ 'ih-data-disabled': !(channelChange() || contractChange()) }"
          v-has="'B.SALES.CONTRACT.DISTBYBUSINESS.REJECT'"
        >驳回</el-button>
        <el-button
          type="danger"
          v-else-if="$route.name === 'DistributionListByBack'"
          @click="handleDis(selectionData)"
          :class="{ 'ih-data-disabled': !(channelChange() || contractChange()) }"
          v-has="'B.SALES.CONTRACT.DISTBYBACK.REJECT'"
        >驳回</el-button>
        <el-button
          type="danger"
          v-if="$route.name === 'DistributionList'"
          @click="handleWith(selectionData)"
          :class="{ 'ih-data-disabled': !(channelChange() || contractChange()) }"
          v-has="'B.SALES.CONTRACT.DISTLIST.REVOKE'"
        >撤回</el-button>
        <el-button
          type="danger"
          v-else-if="$route.name === 'DistributionListByBusiness'"
          @click="handleWith(selectionData)"
          :class="{ 'ih-data-disabled': !(channelChange() || contractChange()) }"
          v-has="'B.SALES.CONTRACT.DISTBYBUSINESS.REVOKE'"
        >撤回</el-button>
        <el-button
          type="danger"
          v-else-if="$route.name === 'DistributionListByBack'"
          @click="handleWith(selectionData)"
          :class="{ 'ih-data-disabled': !(channelChange() || contractChange()) }"
          v-has="'B.SALES.CONTRACT.DISTBYBACK.REVOKE'"
        >撤回</el-button>
        <el-button
          type="success"
          v-if="$route.name === 'DistributionList'"
          @click="applyVisible = true"
          v-has="'B.SALES.CONTRACT.DISTLIST.APPLY'"
        >申领合同</el-button>
        <el-button
          type="success"
          v-else-if="$route.name === 'DistributionListByBusiness'"
          @click="applyVisible = true"
          v-has="'B.SALES.CONTRACT.DISTBYBUSINESS.APPLY'"
        >申领合同</el-button>
        <el-button
          type="success"
          v-else-if="$route.name === 'DistributionListByBack'"
          @click="applyVisible = true"
          v-has="'B.SALES.CONTRACT.DISTBYBACK.APPLY'"
        >申领合同</el-button>
        <el-button
          type="success"
          v-if="$route.name === 'DistributionList'"
          @click="handleExport()"
          v-has="'B.SALES.CONTRACT.DISTLIST.EXPORTLIST'"
        >导出列表</el-button>
        <el-button
          type="success"
          v-else-if="$route.name === 'DistributionListByBusiness'"
          @click="handleExport()"
          v-has="'B.SALES.CONTRACT.DISTBYBUSINESS.EXPORTLIST'"
        >导出列表</el-button>
        <el-button
          type="success"
          v-else-if="$route.name === 'DistributionListByBack'"
          @click="handleExport()"
          v-has="'B.SALES.CONTRACT.DISTBYBACK.EXPORTLIST'"
        >导出列表</el-button>
        <el-link
          type="primary"
          class="float-right margin-right-40"
          @click="openToggle()"
        >{{searchOpen?'收起':'展开'}}</el-link>
      </el-row>
    </template>
    <!-- table-content -->
    <template #table>
      <br />
      <el-table
        class="ih-table intermediary-table"
        ref="multipleTable"
        :data="resPageInfo.list"
        :empty-text="emptyText"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          fixed
          type="selection"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column
          fixed
          label="标题"
          prop="title"
          min-width="185"
        ></el-table-column>
        <el-table-column
          label="合同类型"
          width="145"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.contractKind, 'ContractKind')}}
          </template>
        </el-table-column>
        <el-table-column
          label="甲方公司"
          prop="partyACompanyName"
          min-width="150"
        ></el-table-column>
        <el-table-column
          label="乙方公司"
          prop="channelCompanyName"
          min-width="150"
        ></el-table-column>
        <el-table-column
          label="合作时间"
          prop="time"
          width="195"
        >
          <template v-slot="{ row }">
            <span>{{row.beginTime}} 至 {{row.endTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="项目"
          prop="projectName"
          min-width="165"
        ></el-table-column>
        <el-table-column
          label="周期"
          prop="cycleName"
          min-width="185"
        ></el-table-column>
        <el-table-column
          label="归属组织"
          prop="organizationName"
          width="150"
        ></el-table-column>
        <el-table-column
          label="合同编号"
          prop="contractNo"
          min-width="255"
        ></el-table-column>
        <el-table-column
          label="审核状态"
          prop="distributionState"
          width="110"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.distributionState, 'DistributionState')}}
          </template>
        </el-table-column>
        <el-table-column
          label="归档状态"
          prop="archiveStatus"
          width="120"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.archiveStatus, 'ArchiveStatus')}}
          </template>
        </el-table-column>
        <el-table-column
          label="归档编号"
          prop="archiveNo"
          width="200"
        ></el-table-column>
        <el-table-column
          label="合同跟进人"
          prop="handlerName"
          width="110"
        ></el-table-column>
        <el-table-column
          label="操作"
          min-width="120"
          fixed="right"
        >
          <template v-slot="{ row }">
            <el-link
              type="primary"
              @click="handleGoDetail(row)"
            >详情</el-link>
            <el-dropdown
              trigger="click"
              style="margin-left: 15px"
            >
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  @click.native.prevent="review([{ ...row }])"
                  v-if="$route.name === 'DistributionList'"
                  :class="{ 'ih-data-disabled': row.distributionState !== 'Pending' }"
                  v-has="'B.SALES.CONTRACT.DISTLIST.VERIFY'"
                >审核通过</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="review([{ ...row }])"
                  v-else-if="$route.name === 'DistributionListByBusiness'"
                  :class="{ 'ih-data-disabled': row.distributionState !== 'Pending' }"
                  v-has="'B.SALES.CONTRACT.DISTBYBUSINESS.VERIFY'"
                >审核通过</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="review([{ ...row }])"
                  v-else-if="$route.name === 'DistributionListByBack'"
                  :class="{ 'ih-data-disabled': row.distributionState !== 'Pending' }"
                  v-has="'B.SALES.CONTRACT.DISTBYBACK.VERIFY'"
                >审核通过</el-dropdown-item>

                <el-dropdown-item
                  @click.native.prevent="handleDis([{ ...row }])"
                  v-if="$route.name === 'DistributionList'"
                  :class="{
                    'ih-data-disabled': !(channelChange() || contractChange()),
                    'is-disabled': !['NotDistributed', 'Pending'].includes(row.distributionState)
                  }"
                  v-has="'B.SALES.CONTRACT.DISTLIST.REJECT'"
                >审核驳回</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="handleDis([{ ...row }])"
                  v-else-if="$route.name === 'DistributionListByBusiness'"
                  :class="{
                    'ih-data-disabled': !(channelChange() || contractChange()),
                    'is-disabled': !['NotDistributed', 'Pending'].includes(row.distributionState)
                  }"
                  v-has="'B.SALES.CONTRACT.DISTBYBUSINESS.REJECT'"
                >审核驳回</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="handleDis([{ ...row }])"
                  v-else-if="$route.name === 'DistributionListByBack'"
                  :class="{
                    'ih-data-disabled': !(channelChange() || contractChange()),
                    'is-disabled': !['NotDistributed', 'Pending'].includes(row.distributionState)
                  }"
                  v-has="'B.SALES.CONTRACT.DISTBYBACK.REJECT'"
                >审核驳回</el-dropdown-item>

                <el-dropdown-item
                  @click.native.prevent="handleWith([{ ...row }])"
                  v-if="$route.name === 'DistributionList'"
                  :class="{
                    'ih-data-disabled': !(channelChange() || contractChange()),
                    'is-disabled': !['NotDistributed', 'Pending'].includes(row.distributionState)
                  }"
                  v-has="'B.SALES.CONTRACT.DISTLIST.REVOKE'"
                >撤回</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="handleWith([{ ...row }])"
                  v-else-if="$route.name === 'DistributionListByBusiness'"
                  :class="{
                    'ih-data-disabled': !(channelChange() || contractChange()),
                    'is-disabled': !['NotDistributed', 'Pending'].includes(row.distributionState)
                  }"
                  v-has="'B.SALES.CONTRACT.DISTBYBUSINESS.REVOKE'"
                >撤回</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="handleWith([{ ...row }])"
                  v-else-if="$route.name === 'DistributionListByBack'"
                  :class="{
                    'ih-data-disabled': !(channelChange() || contractChange()),
                    'is-disabled': !['NotDistributed', 'Pending'].includes(row.distributionState)
                  }"
                  v-has="'B.SALES.CONTRACT.DISTBYBACK.REVOKE'"
                >撤回</el-dropdown-item>

                <el-dropdown-item
                  @click.native.prevent="handleGoDuplicate(row)"
                  v-if="$route.name === 'DistributionList'"
                  :class="{ 'ih-data-disabled': row.contractKind === 'ScansAreNotArchived' || !duplicateChange(row) }"
                  v-has="'B.SALES.CONTRACT.DISTLIST.STAMPFILE'"
                >盖章版归档</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="handleGoDuplicate(row)"
                  v-else-if="$route.name === 'DistributionListByBusiness'"
                  :class="{ 'ih-data-disabled': row.contractKind === 'ScansAreNotArchived' || !duplicateChange(row) }"
                  v-has="'B.SALES.CONTRACT.DISTBYBUSINESS.STAMPFILE'"
                >盖章版归档</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="handleGoDuplicate(row)"
                  v-else-if="$route.name === 'DistributionListByBack'"
                  :class="{ 'ih-data-disabled': row.contractKind === 'ScansAreNotArchived' || !duplicateChange(row) }"
                  v-has="'B.SALES.CONTRACT.DISTBYBACK.STAMPFILE'"
                >盖章版归档</el-dropdown-item>

                <el-dropdown-item
                  @click.native.prevent="handleTo(row, 'original')"
                  v-if="$route.name === 'DistributionList'"
                  :class="{ 'ih-data-disabled': !originalChange(row) }"
                  v-has="'B.SALES.CONTRACT.DISTLIST.ORIGINALFILE'"
                >原件归档</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="handleTo(row, 'original')"
                  v-else-if="$route.name === 'DistributionListByBusiness'"
                  :class="{ 'ih-data-disabled': !originalChange(row) }"
                  v-has="'B.SALES.CONTRACT.DISTBYBUSINESS.ORIGINALFILE'"
                >原件归档</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="handleTo(row, 'original')"
                  v-else-if="$route.name === 'DistributionListByBack'"
                  :class="{ 'ih-data-disabled': !originalChange(row) }"
                  v-has="'B.SALES.CONTRACT.DISTBYBACK.ORIGINALFILE'"
                >原件归档</el-dropdown-item>

                <el-dropdown-item
                  @click.native.prevent="handleExportFile(row)"
                  v-if="$route.name === 'DistributionList'"
                  v-has="'B.SALES.CONTRACT.DISTLIST.EXPRORTATTCH'"
                  :class="{ 'ih-data-disabled': !exportChange()}"
                >导出附件</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="handleExportFile(row)"
                  v-else-if="$route.name === 'DistributionListByBusiness'"
                  v-has="'B.SALES.CONTRACT.DISTBYBUSINESS.EXPRORTATTCH'"
                  :class="{ 'ih-data-disabled': !exportChange()}"
                >导出附件</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="handleExportFile(row)"
                  v-else-if="$route.name === 'DistributionListByBack'"
                  v-has="'B.SALES.CONTRACT.DISTBYBACK.EXPRORTATTCH'"
                  :class="{ 'ih-data-disabled': !exportChange()}"
                >导出附件</el-dropdown-item>

                <el-dropdown-item
                  :class="{ 'ih-data-disabled': row.distributionState !== 'Drafting' && row.distributionState !== 'Disallowance' }"
                  @click.native.prevent="remove(row)"
                  v-if="$route.name === 'DistributionList'"
                  v-has="'B.SALES.CONTRACT.DISTLIST.DELETE'"
                >删除</el-dropdown-item>
                <el-dropdown-item
                  :class="{ 'ih-data-disabled': row.distributionState !== 'Drafting' && row.distributionState !== 'Disallowance' }"
                  @click.native.prevent="remove(row)"
                  v-else-if="$route.name === 'DistributionListByBusiness'"
                  v-has="'B.SALES.CONTRACT.DISTBYBUSINESS.DELETE'"
                >删除</el-dropdown-item>
                <el-dropdown-item
                  :class="{ 'ih-data-disabled': row.distributionState !== 'Drafting' && row.distributionState !== 'Disallowance' }"
                  @click.native.prevent="remove(row)"
                  v-else-if="$route.name === 'DistributionListByBack'"
                  v-has="'B.SALES.CONTRACT.DISTBYBACK.DELETE'"
                >删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页 -->
    <template #pagination>
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
    <IhDialog :show="applyVisible">
      <ApplyContract @cancel="() => (applyVisible = false)" />
    </IhDialog>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PaginationMixin from "@/mixins/pagination";
import ApplyContract from "./dialog/applyContract.vue";
import axios from "axios";
import { getToken } from "ihome-common/util/cookies";
import {
  post_distribution_list,
  post_distribution_review,
  // post_distribution_distribute,
  post_distribution_disallowance,
  post_distribution_withdraw,
  post_distribution_delete,
} from "@/api/contract/index";

@Component({
  components: { ApplyContract },
  mixins: [PaginationMixin],
})
export default class DistributionList extends Vue {
  public queryPageParameters: any = {
    archiveNo: null,
    archiveStatus: null,
    beginTime: null,
    channelCompanyId: null,
    contractNo: null,
    cycleId: null,
    distributionState: null,
    endTime: null,
    entryPerson: null,
    handler: null,
    organizationId: null,
    partyACompanyId: null,
    projectAddress: null,
    projectId: null,
    title: null,
    contractKind: null,
  };
  resPageInfo: any = {
    total: null,
    list: [],
  };
  private timeList = [];
  private companyLoading = false;
  private searchOpen = true;
  private selectionData: any = [];
  private applyVisible = false;

  private originalChange(row: any) {
    const isDis = row.distributionState === "Distributed";
    return isDis;
  }
  private duplicateChange(row: any) {
    const isDis = row.distributionState === "Distributed";
    return isDis;
  }
  private contractChange() {
    return this.$roleTool.RContractManager();
  }
  private channelChange() {
    return this.$roleTool.RChannelStaff();
  }
  private exportChange() {
    return this.$roleTool.RBusinessManagement();
  }

  private openToggle(): void {
    this.searchOpen = !this.searchOpen;
  }
  private async remove(row: any) {
    try {
      await this.$confirm("确认删除该合同数据?", "提示");
      await post_distribution_delete([row.id]);
      // 删除list最后一条数据 返回前一页面
      if (this.resPageInfo.list.length === 1) {
        this.queryPageParameters.pageNum === 1
          ? (this.queryPageParameters.pageNum = 1)
          : this.queryPageParameters.pageNum--;
      }
      this.getListMixin();
      this.$message.success("删除成功");
    } catch (error) {
      console.log(error);
    }
  }
  private handleSearch(): void {
    let sign = this.timeList && this.timeList.length;
    this.queryPageParameters.beginTime = sign ? this.timeList[0] : "";
    this.queryPageParameters.endTime = sign ? this.timeList[1] : "";
    this.queryPageParameters.pageNum = 1;
    this.getListMixin();
  }
  private handleReact(): void {
    Object.assign(this.queryPageParameters, {
      archiveNo: null,
      archiveStatus: null,
      beginTime: null,
      channelCompanyId: null,
      contractNo: null,
      cycleId: null,
      distributionState: null,
      endTime: null,
      entryPerson: null,
      handler: null,
      organizationId: null,
      partyACompanyId: null,
      projectAddress: null,
      projectId: null,
      title: null,
      contractKind: null,
    });
    this.timeList = [];
  }
  private handleSelectionChange(val: any): void {
    this.selectionData = val;
  }
  // 根据角色来撤回
  private handleWith(selection: any) {
    if (selection.length) {
      if (this.channelChange()) {
        if (
          selection
            .map((i: any) => i.distributionState)
            .every((v: any) => v === "Pending")
        ) {
          this.withdraw(selection);
        } else {
          this.$message.warning("只有待审核的合同才能操作撤回");
          return;
        }
      }
      if (this.contractChange()) {
        if (
          selection
            .map((i: any) => i.distributionState)
            .every((v: any) => v === "NotDistributed")
        ) {
          this.withdraw(selection);
        } else {
          this.$message.warning("只有待派发的合同才能操作撤回");
          return;
        }
      }
    } else {
      this.$message.warning("请先勾选表格数据");
      return;
    }
  }
  /**
   * @description: 渠道分销合同撤回
   */
  private async withdraw(selection: any) {
    try {
      await post_distribution_withdraw({
        ids: selection.map((i: any) => i.id),
      });
      this.$message.success("撤回成功");
      this.getListMixin();
    } catch (error) {
      console.log(error);
    }
  }
  private handleExport() {
    const token: any = getToken();
    axios({
      method: "POST",
      url: `/sales-api/contract/export/distribution/list`,
      xsrfHeaderName: "Authorization",
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
      data: { ...this.queryPageParameters },
    }).then((res: any) => {
      if (res.data.type === "application/json") {
        let reader = new FileReader();
        reader.readAsText(res.data, "utf-8");
        reader.onload = () => {
          let result: any = reader.result;
          const res = JSON.parse(result);
          this.$message.warning(res.msg);
        };
        return;
      }
      const href = window.URL.createObjectURL(res.data);
      const $a = document.createElement("a");
      $a.href = href;
      $a.download = "渠道分销协议列表.xlsx";
      $a.click();
      $a.remove();
    });
    // axios({
    //   method: "POST",
    //   url: "/sales-api/sales-document-cover/pdf/ftlToPdf/brow",
    //   xsrfHeaderName: "Authorization",
    //   responseType: "blob",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "bearer " + token,
    //   },
    //   data: {
    //     data: {},
    //     fileId: "5fd960a1990e9d00015c5dc7",
    //   },
    // }).then((res: any) => {
    //   let binaryData: any = [];
    //   binaryData.push(res.data);
    //   const href = window.URL.createObjectURL(
    //     new Blob(binaryData, { type: "application/pdf" })
    //   );
    //   console.log(href);
    //   window.open(href);
    // });
  }
  private handleExportFile(row: any) {
    const token: any = getToken();
    axios({
      method: "POST",
      url: `/sales-api/contract/export/distribution/file/${row.id}`,
      xsrfHeaderName: "Authorization",
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
    }).then((res: any) => {
      if (res.data.type === "application/json") {
        let reader = new FileReader();
        reader.readAsText(res.data, "utf-8");
        reader.onload = () => {
          let result: any = reader.result;
          const res = JSON.parse(result);
          this.$message.warning(res.msg);
        };
        return;
      }
      const href = window.URL.createObjectURL(res.data);
      const $a = document.createElement("a");
      $a.href = href;
      $a.download = "渠道分销协议附件.zip";
      $a.click();
      $a.remove();
    });
  }
  // 根据角色驳回不同的操作
  private handleDis(selectionData: any) {
    if (selectionData.length) {
      if (this.contractChange()) {
        if (
          selectionData
            .map((i: any) => i.distributionState)
            .every((v: any) => v === "Pending")
        ) {
          this.disallowance(selectionData);
        } else {
          this.$message.warning("只有待审核的合同才能操作驳回");
          return;
        }
      }
      if (this.channelChange()) {
        if (
          selectionData
            .map((i: any) => i.distributionState)
            .every((v: any) => v === "NotDistributed")
        ) {
          this.disallowance(selectionData);
        } else {
          this.$message.warning("只有待派发的合同才能操作驳回");
          return;
        }
      }
    } else {
      this.$message.warning("请先勾选表格数据");
      return;
    }
  }
  /**
   * @description: 渠道分销合同驳回
   */
  private async disallowance(selectionData: any) {
    try {
      await post_distribution_disallowance({
        ids: selectionData.map((i: any) => i.id),
      });
      this.$message.success("驳回成功");
      this.getListMixin();
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * @description: 渠道分销合同审核
   */
  private async review(selectionData: any) {
    if (selectionData.length) {
      const isPend = selectionData
        .map((i: any) => i.distributionState)
        .every((v: any) => v === "Pending");
      if (isPend) {
        try {
          await post_distribution_review({
            ids: selectionData.map((i: any) => i.id),
          });
          this.$message.success("审核成功");
          this.getListMixin();
        } catch (err) {
          console.log(err);
        }
      } else {
        this.$message.warning("请选择待审核状态的合同数据");
        return;
      }
    } else {
      this.$message.warning("请先勾选表格数据");
      return;
    }
  }
  /**
   * @description: 派发合同
   * @param {*}
   */
  private async distribute(selectionData: any) {
    if (selectionData.length) {
      const isPend = selectionData
        .map((i: any) => i.distributionState)
        .every((v: any) => v === "NotDistributed");
      if (isPend) {
        try {
          // await post_distribution_distribute({
          //   ids: selectionData.map((i: any) => i.id),
          // });
          this.$message.success("派发成功");
          this.getListMixin();
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$message.warning("请选择待派发状态的合同数据");
        return;
      }
    } else {
      this.$message.warning("请先勾选表格数据");
      return;
    }
  }
  handleTo(row: any, page: string) {
    this.$router.push({
      path: "/distribution/" + page,
      query: {
        id: row.id,
      },
    });
  }
  /**
   * @description: 跳转不同的盖章版归档
   * @param {*} row
   */
  handleGoDuplicate(row: any) {
    switch (row.contractKind) {
      case "StandChannel":
        // 标准渠道分销合同
        this.$router.push(
          `/distribution/normalDistributionDuplicate?id=${row.id}`
        );
        break;
      case "NoStandChannel":
        // 非标准渠道分销合同
        this.$router.push(
          `/distribution/notDistributionDuplicate?id=${row.id}`
        );
        break;
      case "NoStandKindSaleConfirm":
        // 非标准联动销售确认书
        this.$router.push(`/distribution/notSalesDuplicate?id=${row.id}`);
        break;
      case "NoChannel":
        // 非渠道类合同
        this.$router.push(`/distribution/notChannelDuplicate?id=${row.id}`);
        break;
    }
  }
  /**
   * @description: 跳转不同的详情
   * @param {*} row
   */
  handleGoDetail(row: any) {
    switch (row.contractKind) {
      case "StandKindSaleConfirm":
        // 标准联动销售确认书
        this.$router.push(`/distribution/normalSalesInfo?id=${row.id}`);
        break;
      case "NoStandKindSaleConfirm":
        // 非标准联动销售确认书
        this.$router.push(`/distribution/notSalesInfo?id=${row.id}`);
        break;
      case "StandChannel":
        // 标准渠道分销合同
        this.$router.push(`/distribution/normalDistributionInfo?id=${row.id}`);
        break;
      case "NoStandChannel":
        // 非标准渠道分销合同
        this.$router.push(`/distribution/notDistributionInfo?id=${row.id}`);
        break;
      case "NoChannel":
        // 非渠道类合同
        this.$router.push(`/distribution/notChannelInfo?id=${row.id}`);
        break;
    }
  }
  public async getListMixin(): Promise<void> {
    this.resPageInfo = await post_distribution_list(this.queryPageParameters);
  }

  created() {
    this.getListMixin();
  }
}
</script>

<style lang="scss" scoped>
.intermediary-table {
  .el-link + .el-link {
    margin-left: 10px;
  }
}
</style>
