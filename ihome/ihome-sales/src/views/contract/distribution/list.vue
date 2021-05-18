<!--
 * @Description: 中介分销协议列表
 * @version: 
 * @Author: ywl
 * @Date: 2020-09-25 17:34:32
 * @LastEditors: ywl
 * @LastEditTime: 2021-05-18 11:16:07
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
                class="width--100"
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
            <el-form-item label="标题备注">
              <el-input
                v-model="queryPageParameters.titleOrRemark"
                placeholder="请输入关键字"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-collapse-transition>
          <div v-show="searchOpen">
            <el-row>
              <el-col :span="8">
                <el-form-item label="甲方公司">
                  <IhSelectPageByCompany
                    v-model="queryPageParameters.partyACompanyId"
                    clearable
                    class="width--100"
                  ></IhSelectPageByCompany>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="乙方公司"
                  style="text-align: left"
                >
                  <el-select
                    style="width: 30%"
                    v-model="queryPageParameters.channelCompanyKind"
                    placeholder="公司类型"
                    clearable
                    @change="() => {queryPageParameters.channelCompanyId = null}"
                  >
                    <el-option
                      v-for="(i, n) in $root.dictAllList('CompanyKind')"
                      :key="n"
                      :label="i.name"
                      :value="i.code"
                    ></el-option>
                  </el-select>
                  <IhSelectPageByCompany
                    v-if="queryPageParameters.channelCompanyKind === 'InfieldCompany'"
                    style="width: 70%"
                    v-model="queryPageParameters.channelCompanyId"
                    clearable
                    placeholder="请选择乙方公司"
                  ></IhSelectPageByCompany>
                  <IhSelectPageByChannel
                    v-else-if="queryPageParameters.channelCompanyKind === 'ChannelCompany'"
                    style="width: 70%"
                    v-model="queryPageParameters.channelCompanyId"
                    clearable
                    placeholder="请选择乙方公司"
                  ></IhSelectPageByChannel>
                  <IhSelectPageByAgency
                    v-else-if="queryPageParameters.channelCompanyKind === 'AgencyCompany'"
                    placeholder="请选择乙方公司"
                    style="width: 70%"
                    v-model="queryPageParameters.channelCompanyId"
                    clearable
                  ></IhSelectPageByAgency>
                  <el-input
                    disabled
                    style="width: 60%"
                    placeholder="请选择乙方公司"
                    v-else
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="项目">
                  <IhSelectPageByProject
                    v-model="queryPageParameters.projectId"
                    placeholder="请选择项目"
                    clearable
                  ></IhSelectPageByProject>
                </el-form-item>
              </el-col>
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
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="合同编号">
                  <el-input
                    v-model="queryPageParameters.contractNo"
                    clearable
                    placeholder="请输入合同编号"
                  ></el-input>
                </el-form-item>
              </el-col>
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
            </el-row>

            <el-row>
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
              <el-col :span="8">
                <el-form-item label="合同跟进人">
                  <IhSelectPageUser
                    v-model="queryPageParameters.handler"
                    clearable
                  ></IhSelectPageUser>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="是否垫佣">
                  <el-select
                    class="width--100"
                    v-model="queryPageParameters.padCommissionEnum"
                    clearable
                  >
                    <el-option
                      v-for="(i, n) in $root.dictAllList('PadCommission')"
                      :key="n"
                      :label="i.name"
                      :value="i.code"
                    ></el-option>
                  </el-select>
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
          type="info"
          v-if="$route.name === 'DistributionList'"
          @click="review(selectionData)"
          v-has="'B.SALES.CONTRACT.DISTLIST.AUDIT'"
        >审核通过</el-button>
        <el-button
          type="info"
          v-else-if="$route.name === 'DistributionListByBusiness'"
          @click="review(selectionData)"
          v-has="'B.SALES.CONTRACT.DISTBYBUSINESS.AUDIT'"
        >审核通过</el-button>
        <el-button
          type="info"
          v-else-if="$route.name === 'DistributionListByBack'"
          @click="review(selectionData)"
          v-has="'B.SALES.CONTRACT.DISTBYBACK.AUDIT'"
        >审核通过</el-button>

        <el-button
          type="danger"
          v-if="$route.name === 'DistributionList'"
          @click="handleDis(selectionData)"
          v-has="'B.SALES.CONTRACT.DISTLIST.AUDIT'"
        >审核驳回</el-button>
        <el-button
          type="danger"
          v-else-if="$route.name === 'DistributionListByBusiness'"
          @click="handleDis(selectionData)"
          v-has="'B.SALES.CONTRACT.DISTBYBUSINESS.AUDIT'"
        >审核驳回</el-button>
        <el-button
          type="danger"
          v-else-if="$route.name === 'DistributionListByBack'"
          @click="handleDis(selectionData)"
          v-has="'B.SALES.CONTRACT.DISTBYBACK.AUDIT'"
        >审核驳回</el-button>

        <el-button
          type="warning"
          v-if="$route.name === 'DistributionList'"
          @click="handleWith(selectionData)"
          v-has="'B.SALES.CONTRACT.DISTLIST.REVOKE'"
        >撤回</el-button>
        <el-button
          type="warning"
          v-else-if="$route.name === 'DistributionListByBusiness'"
          @click="handleWith(selectionData)"
          v-has="'B.SALES.CONTRACT.DISTBYBUSINESS.REVOKE'"
        >撤回</el-button>
        <el-button
          type="warning"
          v-else-if="$route.name === 'DistributionListByBack'"
          @click="handleWith(selectionData)"
          v-has="'B.SALES.CONTRACT.DISTBYBACK.REVOKE'"
        >撤回</el-button>

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
          label="标题/备注"
          prop="title"
          min-width="195"
        >
          <template v-slot="{ row }">
            <div>{{row.title}}</div>
            <div style="color: #2ec4b6;">{{row.titleOrRemark}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="合同类型"
          min-width="145"
        >
          <template v-slot="{ row }">
            {{$root.dictAllName(row.contractKind, 'ContractKind')}}
          </template>
        </el-table-column>
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
            <span v-if="row.beginTime && row.endTime">{{row.beginTime}} 至 {{row.endTime}}</span>
            <span v-else>-</span>
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
        <el-table-column label="佣金标准">
          <template v-slot="{ row }">
            <span v-if="['NoStandKindSaleConfirm', 'NoStandChannel'].includes(row.contractKind)">-</span>
            <el-button
              v-else
              size="mini"
              type="primary"
              @click="handleShowBrokerage(row)"
            >查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="是否垫佣">
          <template v-slot="{ row }">
            {{$root.dictAllName(row.padCommissionEnum, 'PadCommission') || '-'}}
          </template>
        </el-table-column>
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
        >
          <template v-slot="{ row }">
            {{row.archiveNo || '-'}}
          </template>
        </el-table-column>
        <el-table-column
          label="合同跟进人"
          prop="handlerName"
          width="110"
        ></el-table-column>
        <el-table-column
          label="归属组织"
          prop="organizationName"
          width="150"
        ></el-table-column>
        <el-table-column
          label="甲方公司"
          prop="partyACompanyName"
          min-width="150"
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
                  v-if="$route.name === 'DistributionList'"
                  v-has="'B.SALES.CONTRACT.DISTLIST.AUDIT'"
                  :class="{ 'ih-data-disabled': row.distributionState !== 'Pending' }"
                  @click.native.prevent="handleToAudit(row)"
                >审核</el-dropdown-item>
                <el-dropdown-item
                  v-else-if="$route.name === 'DistributionListByBusiness'"
                  v-has="'B.SALES.CONTRACT.DISTBYBUSINESS.AUDIT'"
                  :class="{ 'ih-data-disabled': row.distributionState !== 'Pending' }"
                  @click.native.prevent="handleToAudit(row)"
                >审核</el-dropdown-item>
                <el-dropdown-item
                  v-else-if="$route.name === 'DistributionListByBack'"
                  v-has="'B.SALES.CONTRACT.DISTBYBACK.AUDIT'"
                  :class="{ 'ih-data-disabled': row.distributionState !== 'Pending' }"
                  @click.native.prevent="handleToAudit(row)"
                >审核</el-dropdown-item>

                <!-- <el-dropdown-item
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
                >审核通过</el-dropdown-item> -->

                <!-- <el-dropdown-item
                  @click.native.prevent="handleDis([{ ...row }])"
                  v-if="$route.name === 'DistributionList'"
                  :class="{
                    'ih-data-disabled': !['Pending'].includes(row.distributionState)
                  }"
                  v-has="'B.SALES.CONTRACT.DISTLIST.REJECT'"
                >审核驳回</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="handleDis([{ ...row }])"
                  v-else-if="$route.name === 'DistributionListByBusiness'"
                  :class="{
                    'ih-data-disabled': !['Pending'].includes(row.distributionState)
                  }"
                  v-has="'B.SALES.CONTRACT.DISTBYBUSINESS.REJECT'"
                >审核驳回</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="handleDis([{ ...row }])"
                  v-else-if="$route.name === 'DistributionListByBack'"
                  :class="{
                    'ih-data-disabled': !['Pending'].includes(row.distributionState)
                  }"
                  v-has="'B.SALES.CONTRACT.DISTBYBACK.REJECT'"
                >审核驳回</el-dropdown-item> -->

                <el-dropdown-item
                  @click.native.prevent="handleWith([{ ...row }])"
                  v-if="$route.name === 'DistributionList'"
                  :class="{
                    'ih-data-disabled': !['Pending'].includes(row.distributionState)
                  }"
                  v-has="'B.SALES.CONTRACT.DISTLIST.REVOKE'"
                >撤回</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="handleWith([{ ...row }])"
                  v-else-if="$route.name === 'DistributionListByBusiness'"
                  :class="{
                    'ih-data-disabled': !['Pending'].includes(row.distributionState)
                  }"
                  v-has="'B.SALES.CONTRACT.DISTBYBUSINESS.REVOKE'"
                >撤回</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="handleWith([{ ...row }])"
                  v-else-if="$route.name === 'DistributionListByBack'"
                  :class="{
                    'ih-data-disabled': !['Pending'].includes(row.distributionState)
                  }"
                  v-has="'B.SALES.CONTRACT.DISTBYBACK.REVOKE'"
                >撤回</el-dropdown-item>

                <!-- 标准联动确认书没有盖章版归档 -->
                <template v-if="row.contractKind !== 'StandKindSaleConfirm'">
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
                </template>

                <el-dropdown-item
                  @click.native.prevent="handleGoOriginal(row)"
                  v-if="$route.name === 'DistributionList'"
                  :class="{ 'ih-data-disabled': !originalChange(row) }"
                  v-has="'B.SALES.CONTRACT.DISTLIST.ORIGINALFILE'"
                >原件归档</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="handleGoOriginal(row)"
                  v-else-if="$route.name === 'DistributionListByBusiness'"
                  :class="{ 'ih-data-disabled': !originalChange(row) }"
                  v-has="'B.SALES.CONTRACT.DISTBYBUSINESS.ORIGINALFILE'"
                >原件归档</el-dropdown-item>
                <el-dropdown-item
                  @click.native.prevent="handleGoOriginal(row)"
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
      <ApplyContract
        :claimPower="claimPower"
        @cancel="() => (applyVisible = false)"
      />
    </IhDialog>
    <IhDialog :show="brokerageVisible">
      <Brokerage
        :list="brokerList"
        @cancel="() => (brokerageVisible = false)"
      />
    </IhDialog>
  </IhPage>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PaginationMixin from "@/mixins/pagination";
import ApplyContract from "./dialog/applyContract.vue";
import Brokerage from "./dialog/brokerage.vue";
import axios from "axios";
import { getToken } from "ihome-common/util/cookies";
import {
  post_distribution_list,
  post_distribution_review,
  // post_distribution_distribute,
  post_distribution_disallowance,
  post_distribution_withdraw,
  post_distribution_delete,
  get_distributionmx_distributionMxListById__distributionId,
} from "@/api/contract/index";

@Component({
  components: { ApplyContract, Brokerage },
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
    titleOrRemark: null,
    channelCompanyKind: null,
    padCommissionEnum: null,
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
  private claimPower: any = null;
  private brokerageVisible = false;
  private brokerList: any[] = [];

  private claimPowerMethod() {
    let type: any = null;
    switch (this.$route.name) {
      case "DistributionList":
        type = "MiddleAndBack";
        break;
      case "DistributionListByBusiness":
        type = "Business";
        break;
      case "DistributionListByBack":
        type = "MiddleAndBack";
        break;
    }
    this.claimPower = type;
  }
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
  private async handleShowBrokerage(row: any) {
    try {
      this.brokerList = await get_distributionmx_distributionMxListById__distributionId(
        { distributionId: row.id }
      );
      if (this.brokerList.length) {
        this.brokerageVisible = true;
      } else {
        this.$message.warning("此合同不涉及佣金标准，具体请查看合同详情及附件");
      }
    } catch (error) {
      console.log(error);
      this.brokerageVisible = false;
    }
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
      titleOrRemark: null,
      channelCompanyKind: null,
      padCommissionEnum: null,
    });
    this.timeList = [];
  }
  private handleSelectionChange(val: any): void {
    this.selectionData = val;
  }
  // 根据角色来撤回
  private handleWith(selection: any) {
    if (selection.length) {
      this.withdraw(selection);
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
    let params = { ...this.queryPageParameters };
    if (this.$route.name === "DistributionListByBusiness") {
      params.claimPower = "Business";
      params.excelName = "业务线乙方合同列表";
    } else {
      params.excelName = "乙方合同列表";
    }
    axios({
      method: "POST",
      url: `/sales-api/contract/export/distribution/list`,
      xsrfHeaderName: "Authorization",
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
      data: params,
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
      $a.download =
        this.$route.name === "DistributionListByBusiness"
          ? "业务线乙方合同列表.xlsx"
          : "乙方合同列表.xlsx";
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
      $a.download = "附件.zip";
      $a.click();
      $a.remove();
    });
  }
  // 根据角色驳回不同的操作
  private handleDis(selectionData: any) {
    if (selectionData.length) {
      this.disallowance(selectionData);
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
        this.$message.warning("请选择待渠道管理岗审核状态的合同数据");
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
    sessionStorage.setItem("gotoRouter", this.claimPower);
  }
  /**
   * @description: 跳转原件归档
   * @param {*} row
   */
  handleGoOriginal(row: any) {
    switch (row.contractKind) {
      case "StandKindSaleConfirm":
        // 标准联动销售确认书
        this.$router.push(`/distribution/normalSalesOriginal?id=${row.id}`);
        break;
      case "StandChannel":
        // 标准渠道分销合同
        this.$router.push(
          `/distribution/normalDistributionOriginal?id=${row.id}`
        );
        break;
      case "NoStandChannel":
        // 非标准渠道分销合同
        this.$router.push(`/distribution/notDistributionOriginal?id=${row.id}`);
        break;
      case "NoStandKindSaleConfirm":
        // 非标准联动销售确认书
        this.$router.push(`/distribution/notSalesOriginal?id=${row.id}`);
        break;
      case "NoChannel":
        // 非渠道类合同
        this.$router.push(`/distribution/notChannelOriginal?id=${row.id}`);
        break;
    }
    sessionStorage.setItem("gotoRouter", this.claimPower);
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
  /**
   * @description: 跳转审核页面
   * @param {*} row
   */
  handleToAudit(row: any) {
    switch (row.contractKind) {
      case "StandKindSaleConfirm":
        // 标准联动销售确认书
        this.$router.push(`/distribution/normalSalesAudit?id=${row.id}`);
        break;
      case "NoStandKindSaleConfirm":
        // 非标准联动销售确认书
        this.$router.push(`/distribution/notSalesAudit?id=${row.id}`);
        break;
      case "StandChannel":
        // 标准渠道分销合同
        this.$router.push(`/distribution/normalDistributionAudit?id=${row.id}`);
        break;
      case "NoStandChannel":
        // 非标准渠道分销合同
        this.$router.push(`/distribution/notDistributionAudit?id=${row.id}`);
        break;
      case "NoChannel":
        // 非渠道类合同
        this.$router.push(`/distribution/notChannelAudit?id=${row.id}`);
        break;
    }
  }
  public async getListMixin(): Promise<void> {
    let params = { ...this.queryPageParameters };
    if (this.$route.name === "DistributionListByBusiness") {
      params.claimPower = "Business";
    }
    this.resPageInfo = await post_distribution_list(params);
  }

  created() {
    this.getListMixin();
    this.claimPowerMethod();
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
