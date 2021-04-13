<!--
 * @Description:
 * @version:
 * @Author: zyc
 * @Date: 2021-03-24 17:50:50
 * @LastEditors: lsj
 * @LastEditTime: 2021-03-31 15:06:13
-->
<template>
  <IhPage label-width="100px">
    <template v-slot:form>
      <el-form ref="form" label-width="100px" class="report-wrapper">
        <el-row>
          <el-col :span="7">
            <el-form-item label="组织">
              <IhSelectOrgTree
                @change="selectOrg"
                v-model="queryPageParameters.chooseOrgId" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="合同状态">
              <el-select
                v-model="queryPageParameters.status"
                multiple
                collapse-tags
                class="width--100"
                placeholder="请选择">
                <el-option
                  v-for="item in $root.dictAllList('DealStatus')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="日期类型">
              <div class="date-type-wrapper">
                <div class="left">
                  <el-select
                    v-model="queryPageParameters.arguTimeType"
                    clearable
                    class="width--100"
                    placeholder="日期类型">
                    <el-option
                      v-for="item in $root.dictAllList('ArguTimeType')"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </div>
                <div class="right">
                  <el-date-picker
                    v-model="queryPageParameters.expiresTime"
                    type="daterange"
                    align="left"
                    unlink-panels
                    style="width: 100%"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    value-format="yyyy-MM-dd"
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
        <el-button type="success" @click="exportExcel()">导出</el-button>
      </el-row>
    </template>
    <template v-slot:table>
      <br />
      <div class="ih-table-report">
        <u-table
          use-virtual
          v-loading="!tableRender"
          class="ih-table"
          :data="list"
          :empty-text="emptyText"
          :height="height - 62 * 1 + 'px'"
          max-height="1300px"
          :show-summary="true"
          :summary-method="summaryMethod">
          <u-table-column type="index" label=" " width="50" fixed> </u-table-column>
          <u-table-column prop="orgName" label="组织" width="150" fixed></u-table-column>
          <u-table-column label="市场化业务">
            <u-table-column prop="rent" label="租赁">
              <u-table-column prop="rentHouseSets" label="成交套数" width="100">
              </u-table-column>
              <u-table-column prop="rentReceivable" label="应收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="rentExternalAmount" label="对外拆佣/万元" width="120">
              </u-table-column>
              <u-table-column prop="rentArea" label="成交面积/㎡" width="120">
              </u-table-column>
              <u-table-column prop="rentAmount" label="月租金/万元" width="120">
              </u-table-column>
              <u-table-column prop="rentRatio" label="费率/个月" width="100">
              </u-table-column>
              <u-table-column prop="rentReceived" label="实收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="rentUnreceived" label="未收/万元" width="120">
              </u-table-column>
            </u-table-column>
            <u-table-column prop="sale" label="二手买卖">
              <u-table-column prop="saleHouseSets" label="成交套数" width="100">
              </u-table-column>
              <u-table-column prop="saleReceivable" label="应收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="saleExternalAmount" label="对外拆佣/万元" width="120">
              </u-table-column>
              <u-table-column prop="saleArea" label="成交面积/㎡" width="120">
              </u-table-column>
              <u-table-column prop="saleAmount" label="成交总价/万元" width="140">
              </u-table-column>
              <u-table-column prop="saleRatio" label="费率/个月" width="100">
              </u-table-column>
              <u-table-column prop="saleReceived" label="实收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="saleUnreceived" label="未收/万元" width="120">
              </u-table-column>
            </u-table-column>
            <u-table-column prop="newPolySelf" label="新房-保利-自行成交">
              <u-table-column prop="newPolySelfHouseSets" label="成交套数" width="100">
              </u-table-column>
              <u-table-column prop="newPolySelfReceivable" label="应收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="newPolySelfChannelAmount" label="含其他渠道费用/万元" width="160">
              </u-table-column>
              <u-table-column prop="newPolySelfAchievement" label="考核业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="newPolySelfExternalAmount" label="对外拆佣/万元" width="120">
              </u-table-column>
              <u-table-column prop="newPolySelfArea" label="成交面积/㎡" width="120">
              </u-table-column>
              <u-table-column prop="newPolySelfAmount" label="成交总价/万元" width="140">
              </u-table-column>
              <u-table-column prop="newPolySelfRatio" label="费率/个月" width="100">
              </u-table-column>
              <u-table-column prop="newPolySelfReceived" label="实收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="newPolySelfUnreceived" label="未收/万元" width="120">
              </u-table-column>
            </u-table-column>
            <u-table-column prop="newNotPolySelf" label="新房-非保利-自行成交">
              <u-table-column prop="newNotPolySelfHouseSets" label="成交套数" width="100">
              </u-table-column>
              <u-table-column prop="newNotPolySelfReceivable" label="应收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="newNotPolySelfChannelAmount" label="含其他渠道费用/万元" width="160">
              </u-table-column>
              <u-table-column prop="newNotPolySelfAchievement" label="考核业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="newNotPolySelfExternalAmount" label="对外拆佣/万元" width="120">
              </u-table-column>
              <u-table-column prop="newNotPolySelfArea" label="成交面积/㎡" width="120">
              </u-table-column>
              <u-table-column prop="newNotPolySelfAmount" label="成交总价/万元" width="140">
              </u-table-column>
              <u-table-column prop="newNotPolySelfRatio" label="费率/个月" width="100">
              </u-table-column>
              <u-table-column prop="newNotPolySelfReceived" label="实收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="newNotPolySelfUnreceived" label="未收/万元" width="120">
              </u-table-column>
            </u-table-column>
            <u-table-column prop="newNotPolyVisit" label="新房-非保利-自然来访成交">
              <u-table-column prop="newNotPolyVisitHouseSets" label="成交套数" width="100">
              </u-table-column>
              <u-table-column prop="newNotPolyVisitReceivable" label="应收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="newNotPolyVisitChannelAmount" label="含其他渠道费用/万元" width="160">
              </u-table-column>
              <u-table-column prop="newNotPolyVisitAchievement" label="考核业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="newNotPolyVisitExternalAmount" label="对外拆佣/万元" width="120">
              </u-table-column>
              <u-table-column prop="newNotPolyVisitArea" label="成交面积/㎡" width="120">
              </u-table-column>
              <u-table-column prop="newNotPolyVisitAmount" label="成交总价/万元" width="140">
              </u-table-column>
              <u-table-column prop="newNotPolyVisitRatio" label="费率/个月" width="100">
              </u-table-column>
              <u-table-column prop="newNotPolyVisitReceived" label="实收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="newNotPolyVisitUnreceived" label="未收/万元" width="120">
              </u-table-column>
            </u-table-column>
            <u-table-column prop="newNotPolyDistribution" label="新房-非保利-分销成交">
              <u-table-column prop="newNotPolyDistributionHouseSets" label="成交套数" width="100">
              </u-table-column>
              <u-table-column prop="newNotPolyDistributionReceivable" label="应收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="newNotPolyDistributionChannelAmount" label="含其他渠道费用/万元" width="160">
              </u-table-column>
              <u-table-column prop="newNotPolyDistributionAchievement" label="考核业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="newNotPolyDistributionExternalAmount" label="对外拆佣/万元" width="120">
              </u-table-column>
              <u-table-column prop="newNotPolyDistributionArea" label="成交面积/㎡" width="120">
              </u-table-column>
              <u-table-column prop="newNotPolyDistributionAmount" label="成交总价/万元" width="140">
              </u-table-column>
              <u-table-column prop="newNotPolyDistributionRatio" label="费率/个月" width="100">
              </u-table-column>
              <u-table-column prop="newNotPolyDistributionReceived" label="实收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="newNotPolyDistributionUnreceived" label="未收/万元" width="120">
              </u-table-column>
            </u-table-column>
            <u-table-column prop="finishedStallNotPolySelf" label="产成品（车位、储藏室）-非保利-自行成交">
              <u-table-column prop="finishedStallNotPolySelfHouseSets" label="成交套数" width="100">
              </u-table-column>
              <u-table-column prop="finishedStallNotPolySelfReceivable" label="应收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="finishedStallNotPolySelfChannelAmount" label="含其他渠道费用/万元" width="160">
              </u-table-column>
              <u-table-column prop="finishedStallNotPolySelfAchievement" label="考核业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="finishedStallNotPolySelfExternalAmount" label="对外拆佣/万元" width="120">
              </u-table-column>
              <u-table-column prop="finishedStallNotPolySelfArea" label="成交面积/㎡" width="120">
              </u-table-column>
              <u-table-column prop="finishedStallNotPolySelfAmount" label="成交总价/万元" width="140">
              </u-table-column>
              <u-table-column prop="finishedStallNotPolySelfRatio" label="费率/个月" width="100">
              </u-table-column>
              <u-table-column prop="finishedStallNotPolySelfReceived" label="实收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="finishedStallNotPolySelfUnreceived" label="未收/万元" width="120">
              </u-table-column>
            </u-table-column>
            <u-table-column prop="finishedStallNotPolyDistribution" label="产成品（车位、储藏室）-非保利-分销成交">
              <u-table-column prop="finishedStallNotPolyDistributionHouseSets" label="成交套数" width="100">
              </u-table-column>
              <u-table-column prop="finishedStallNotPolyDistributionReceivable" label="应收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="finishedStallNotPolyDistributionChannelAmount" label="含其他渠道费用/万元" width="160">
              </u-table-column>
              <u-table-column prop="finishedStallNotPolyDistributionAchievement" label="考核业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="finishedStallNotPolyDistributionExternalAmount" label="对外拆佣/万元" width="120">
              </u-table-column>
              <u-table-column prop="finishedStallNotPolyDistributionArea" label="成交面积/㎡" width="120">
              </u-table-column>
              <u-table-column prop="finishedStallNotPolyDistributionAmount" label="成交总价/万元" width="140">
              </u-table-column>
              <u-table-column prop="finishedStallNotPolyDistributionRatio" label="费率/个月" width="100">
              </u-table-column>
              <u-table-column prop="finishedStallNotPolyDistributionReceived" label="实收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="finishedStallNotPolyDistributionUnreceived" label="未收/万元" width="120">
              </u-table-column>
            </u-table-column>
            <u-table-column prop="finishedNotStallPolySelf" label="产成品（非车位、储藏室）-保利-自行成交">
              <u-table-column prop="finishedNotStallPolySelfHouseSets" label="成交套数" width="100">
              </u-table-column>
              <u-table-column prop="finishedNotStallPolySelfReceivable" label="应收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="finishedNotStallPolySelfChannelAmount" label="含其他渠道费用/万元" width="160">
              </u-table-column>
              <u-table-column prop="finishedNotStallPolySelfAchievement" label="考核业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="finishedNotStallPolySelfExternalAmount" label="对外拆佣/万元" width="120">
              </u-table-column>
              <u-table-column prop="finishedNotStallPolySelfArea" label="成交面积/㎡" width="120">
              </u-table-column>
              <u-table-column prop="finishedNotStallPolySelfAmount" label="成交总价/万元" width="140">
              </u-table-column>
              <u-table-column prop="finishedNotStallPolySelfRatio" label="费率/个月" width="100">
              </u-table-column>
              <u-table-column prop="finishedNotStallPolySelfReceived" label="实收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="finishedNotStallPolySelfUnreceived" label="未收/万元" width="120">
              </u-table-column>
            </u-table-column>
            <u-table-column prop="finishedNotStallNotPolySelf" label="产成品（非车位、储藏室）-非保利-自行成交">
              <u-table-column prop="finishedNotStallNotPolySelfHouseSets" label="成交套数" width="100">
              </u-table-column>
              <u-table-column prop="finishedNotStallNotPolySelfReceivable" label="应收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="finishedNotStallNotPolySelfChannelAmount" label="含其他渠道费用/万元" width="160">
              </u-table-column>
              <u-table-column prop="finishedNotStallNotPolySelfAchievement" label="考核业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="finishedNotStallNotPolySelfExternalAmount" label="对外拆佣/万元" width="120">
              </u-table-column>
              <u-table-column prop="finishedNotStallNotPolySelfArea" label="成交面积/㎡" width="120">
              </u-table-column>
              <u-table-column prop="finishedNotStallNotPolySelfAmount" label="成交总价/万元" width="140">
              </u-table-column>
              <u-table-column prop="finishedNotStallNotPolySelfRatio" label="费率/个月" width="100">
              </u-table-column>
              <u-table-column prop="finishedNotStallNotPolySelfReceived" label="实收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="finishedNotStallNotPolySelfUnreceived" label="未收/万元" width="120">
              </u-table-column>
            </u-table-column>
            <u-table-column prop="finishedNotStallNotPolyDistribution" label="产成品（非车位、储藏室）-非保利-分销成交">
              <u-table-column prop="finishedNotStallNotPolyDistributionHouseSets" label="成交套数" width="100">
              </u-table-column>
              <u-table-column prop="finishedNotStallNotPolyDistributionReceivable" label="应收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="finishedNotStallNotPolyDistributionChannelAmount" label="含其他渠道费用/万元" width="160">
              </u-table-column>
              <u-table-column prop="finishedNotStallNotPolyDistributionAchievement" label="考核业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="finishedNotStallNotPolyDistributionExternalAmount" label="对外拆佣/万元" width="120">
              </u-table-column>
              <u-table-column prop="finishedNotStallNotPolyDistributionArea" label="成交面积/㎡" width="120">
              </u-table-column>
              <u-table-column prop="finishedNotStallNotPolyDistributionAmount" label="成交总价/万元" width="140">
              </u-table-column>
              <u-table-column prop="finishedNotStallNotPolyDistributionRatio" label="费率/个月" width="100">
              </u-table-column>
              <u-table-column prop="finishedNotStallNotPolyDistributionReceived" label="实收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="finishedNotStallNotPolyDistributionUnreceived" label="未收/万元" width="120">
              </u-table-column>
            </u-table-column>
            <u-table-column prop="market" label="市场化小计">
              <u-table-column prop="marketHouseSets" label="成交套数" width="100">
              </u-table-column>
              <u-table-column prop="marketReceivable" label="应收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="marketChannelAmount" label="含其他渠道费用/万元" width="160">
              </u-table-column>
              <u-table-column prop="marketAchievement" label="考核业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="marketExternalAmount" label="对外拆佣/万元" width="120">
              </u-table-column>
              <u-table-column prop="marketShareAmount" label="公司业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="marketArea" label="成交面积/㎡" width="120">
              </u-table-column>
              <u-table-column prop="marketAmount" label="成交总价/万元" width="140">
              </u-table-column>
              <u-table-column prop="marketReceived" label="实收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="marketUnreceived" label="未收/万元" width="120">
              </u-table-column>
            </u-table-column>
          </u-table-column>
          <u-table-column label="非市场化业务">
            <u-table-column prop="newPolyVisit" label="新房-保利-自然来访成交">
              <u-table-column prop="newPolyVisitHouseSets" label="成交套数" width="100">
              </u-table-column>
              <u-table-column prop="newPolyVisitReceivable" label="应收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="newPolyVisitChannelAmount" label="含其他渠道费用/万元" width="160">
              </u-table-column>
              <u-table-column prop="newPolyVisitExternalAmount" label="对外拆佣/万元" width="120">
              </u-table-column>
              <u-table-column prop="newPolyVisitArea" label="成交面积/㎡" width="120">
              </u-table-column>
              <u-table-column prop="newPolyVisitAmount" label="成交总价/万元" width="140">
              </u-table-column>
              <u-table-column prop="newPolyVisitRatio" label="费率/个月" width="100">
              </u-table-column>
              <u-table-column prop="newPolyVisitReceived" label="实收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="newPolyVisitUnreceived" label="未收/万元" width="120">
              </u-table-column>
            </u-table-column>
            <u-table-column prop="newPolyDistribution" label="新房-保利-分销成交">
              <u-table-column prop="newPolyDistributionHouseSets" label="成交套数" width="100">
              </u-table-column>
              <u-table-column prop="newPolyDistributionReceivable" label="应收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="newPolyDistributionChannelAmount" label="含其他渠道费用/万元" width="160">
              </u-table-column>
              <u-table-column prop="newPolyDistributionExternalAmount" label="对外拆佣/万元" width="120">
              </u-table-column>
              <u-table-column prop="newPolyDistributionArea" label="成交面积/㎡" width="120">
              </u-table-column>
              <u-table-column prop="newPolyDistributionAmount" label="成交总价/万元" width="140">
              </u-table-column>
              <u-table-column prop="newPolyDistributionRatio" label="费率/个月" width="100">
              </u-table-column>
              <u-table-column prop="newPolyDistributionReceived" label="实收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="newPolyDistributionUnreceived" label="未收/万元" width="120">
              </u-table-column>
            </u-table-column>
            <u-table-column prop="finishedStallPolySelf" label="产成品（车位、储藏室）-保利-自行成交">
              <u-table-column prop="finishedStallPolySelfHouseSets" label="成交套数" width="100">
              </u-table-column>
              <u-table-column prop="finishedStallPolySelfReceivable" label="应收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="finishedStallPolySelfChannelAmount" label="含其他渠道费用/万元" width="160">
              </u-table-column>
              <u-table-column prop="finishedStallPolySelfExternalAmount" label="对外拆佣/万元" width="120">
              </u-table-column>
              <u-table-column prop="finishedStallPolySelfArea" label="成交面积/㎡" width="120">
              </u-table-column>
              <u-table-column prop="finishedStallPolySelfAmount" label="成交总价/万元" width="140">
              </u-table-column>
              <u-table-column prop="finishedStallPolySelfRatio" label="费率/个月" width="100">
              </u-table-column>
              <u-table-column prop="finishedStallPolySelfReceived" label="实收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="finishedStallPolySelfUnreceived" label="未收/万元" width="120">
              </u-table-column>
            </u-table-column>
            <u-table-column prop="finishedStallPolyDistribution" label="产成品（车位、储藏室）-保利-分销成交">
              <u-table-column prop="finishedStallPolyDistributionHouseSets" label="成交套数" width="100">
              </u-table-column>
              <u-table-column prop="finishedStallPolyDistributionReceivable" label="应收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="finishedStallPolyDistributionChannelAmount" label="含其他渠道费用/万元" width="160">
              </u-table-column>
              <u-table-column prop="finishedStallPolyDistributionExternalAmount" label="对外拆佣/万元" width="120">
              </u-table-column>
              <u-table-column prop="finishedStallPolyDistributionArea" label="成交面积/㎡" width="120">
              </u-table-column>
              <u-table-column prop="finishedStallPolyDistributionAmount" label="成交总价/万元" width="140">
              </u-table-column>
              <u-table-column prop="finishedStallPolyDistributionRatio" label="费率/个月" width="100">
              </u-table-column>
              <u-table-column prop="finishedStallPolyDistributionReceived" label="实收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="finishedStallPolyDistributionUnreceived" label="未收/万元" width="120">
              </u-table-column>
            </u-table-column>
            <u-table-column prop="finishedNotStallPolyDistribution" label="产成品（非车位、储藏室）-保利-分销成交">
              <u-table-column prop="finishedNotStallPolyDistributionHouseSets" label="成交套数" width="100">
              </u-table-column>
              <u-table-column prop="finishedNotStallPolyDistributionReceivable" label="应收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="finishedNotStallPolyDistributionChannelAmount" label="含其他渠道费用/万元" width="160">
              </u-table-column>
              <u-table-column prop="finishedNotStallPolyDistributionExternalAmount" label="对外拆佣/万元" width="120">
              </u-table-column>
              <u-table-column prop="finishedNotStallPolyDistributionArea" label="成交面积/㎡" width="120">
              </u-table-column>
              <u-table-column prop="finishedNotStallPolyDistributionAmount" label="成交总价/万元" width="140">
              </u-table-column>
              <u-table-column prop="finishedNotStallPolyDistributionRatio" label="费率/个月" width="100">
              </u-table-column>
              <u-table-column prop="finishedNotStallPolyDistributionReceived" label="实收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="finishedNotStallPolyDistributionUnreceived" label="未收/万元" width="120">
              </u-table-column>
            </u-table-column>
            <u-table-column prop="notMarket" label="非市场化小计">
              <u-table-column prop="notMarketHouseSets" label="成交套数" width="100">
              </u-table-column>
              <u-table-column prop="notMarketReceivable" label="应收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="notMarketChannelAmount" label="含其他渠道费用/万元" width="160">
              </u-table-column>
              <u-table-column prop="notMarketExternalAmount" label="对外拆佣/万元" width="120">
              </u-table-column>
              <u-table-column prop="notMarketArea" label="成交面积/㎡" width="120">
              </u-table-column>
              <u-table-column prop="notMarketDealPrice" label="成交总价/万元" width="140">
              </u-table-column>
              <u-table-column prop="notMarketRatio" label="费率/个月" width="100">
              </u-table-column>
              <u-table-column prop="notMarketReceived" label="实收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="notMarketUnreceived" label="未收/万元" width="120">
              </u-table-column>
            </u-table-column>
          </u-table-column>
          <u-table-column label="总业绩（不含自渠业务）">
            <u-table-column prop="allNotnaturalHouseSets" label="成交套数" width="100">
            </u-table-column>
            <u-table-column prop="allNotnaturalReceivable" label="应收业绩/万元" width="120">
            </u-table-column>
            <u-table-column prop="allNotnaturalChannelAmount" label="含其他渠道费用/万元" width="160">
            </u-table-column>
            <u-table-column prop="allNotnaturalExternalAmount" label="对外拆佣/万元" width="120">
            </u-table-column>
            <u-table-column prop="allNotnaturalShareAmount" label="公司业绩/万元" width="120">
            </u-table-column>
            <u-table-column prop="allNotnaturalArea" label="成交面积/㎡" width="120">
            </u-table-column>
            <u-table-column prop="allNotnaturalDealPrice" label="成交总价/万元" width="140">
            </u-table-column>
            <u-table-column prop="allNotnaturalReceived" label="实收业绩/万元" width="120">
            </u-table-column>
            <u-table-column prop="allNotnaturalUnreceived" label="未收/万元" width="120">
            </u-table-column>
          </u-table-column>
          <u-table-column label="自渠业务">
            <u-table-column prop="natural" label="自渠成交">
              <u-table-column prop="naturalHouseSets" label="成交套数" width="100">
              </u-table-column>
              <u-table-column prop="naturalReceivable" label="应收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="naturalChannelAmount" label="含其他渠道费用/万元" width="160">
              </u-table-column>
              <u-table-column prop="naturalExternalAmount" label="对外拆佣/万元" width="120">
              </u-table-column>
              <u-table-column prop="naturalArea" label="成交面积/㎡" width="120">
              </u-table-column>
              <u-table-column prop="naturalDealPrice" label="成交总价/万元" width="140">
              </u-table-column>
              <u-table-column prop="naturalRatio" label="费率/个月" width="100">
              </u-table-column>
              <u-table-column prop="naturalReceived" label="实收业绩/万元" width="120">
              </u-table-column>
              <u-table-column prop="naturalUnreceived" label="未收/万元" width="120">
              </u-table-column>
            </u-table-column>
          </u-table-column>
        </u-table>
      </div>
    </template>
  </IhPage>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TableReportMixin from "@/mixins/table-report";
import axios from "axios";
import { getToken } from "ihome-common/util/cookies";

import { post_achievementRole_getList } from "@/api/report";
@Component({
  components: {},
  mixins: [TableReportMixin],
})
export default class ManagerMonthlyReport extends Vue {
  queryPageParameters: any = {
    arguTimeType: null,
    chooseOrgId: null,
    orgTypeEnum: null,
    expiresTime: [],
    status: [],
  };
  list: any = [];
  tableRender = false;

  async created() {
    await this.getListMixin();
  }
  // 选择组织
  selectOrg(value: any) {
    console.log(value);
    if (value) {
      this.queryPageParameters.orgTypeEnum = value?.orgType;
    } else {
      this.queryPageParameters.orgTypeEnum = null;
    }
  }
  // 重置
  handleReset() {
    this.queryPageParameters = {
      arguTimeType: null,
      chooseOrgId: null,
      orgTypeEnum: null,
      expiresTime: [],
      status: [],
      pageNum: 1,
      pageSize: this.queryPageParameters.pageSize
    };
  }
  // 导出功能
  async exportExcel() {
    console.log("export");
    console.log(this.queryPageParameters);
    if (!this.validTime()) {
      return
    }
    let postData: any = await this.getPostData();
    const token: any = getToken();
    axios({
      method: "POST",
      url: `/sales-api/report/achievementRole/downExcel`,
      xsrfHeaderName: "Authorization",
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
      data: { ...postData },
    }).then((res: any) => {
      console.log(res);
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
      $a.download = "报表导出.xlsx";
      $a.click();
      $a.remove();
    });
  }
  async getListMixin() {
    try {
      if (!this.validTime()) {
        return
      }
      this.tableRender = false;
      let postData: any = await this.getPostData();
      let list: any = await post_achievementRole_getList(postData);
      console.log(list);
      this.list = list;
      this.tableRender = true;
    } catch (error) {
      this.tableRender = true;
    }
  }
  // 校验时间问题
  validTime() {
    let flag: any = true;
    if (this.queryPageParameters.arguTimeType && (!this.queryPageParameters.expiresTime || !this.queryPageParameters.expiresTime.length)) {
      this.$message({
        type: "warning",
        message: "请选择具体查询时间",
      });
      flag = false;
    }
    if (!this.queryPageParameters.arguTimeType && this.queryPageParameters.expiresTime && this.queryPageParameters.expiresTime.length) {
      this.$message({
        type: "warning",
        message: "请选择查询时间类型",
      });
      flag = false;
    }
    return flag;
  }
  // 获取数据
  getPostData() {
    let postData: any = {
      arguTimeType: this.queryPageParameters.arguTimeType, // 查询时间类型
      chooseOrgId: this.queryPageParameters.chooseOrgId, // 选中的组织ID
      endTime: null,
      orgTypeEnum: this.queryPageParameters.orgTypeEnum, // 选中的组织类型
      startTime: null,
      status: this.queryPageParameters.status // 成交状态
    }
    if (this.queryPageParameters && this.queryPageParameters.expiresTime && this.queryPageParameters.expiresTime.length) {
      postData.startTime = this.queryPageParameters.expiresTime[0];
      postData.endTime = this.queryPageParameters.expiresTime[1];
    }
    return postData;
  }
}
</script>
<style lang="scss" scoped>
/deep/.el-table__body-wrapper {
  z-index: 2;
}
/deep/ .el-table__footer td {
  text-align: center;
  padding: 6px 0;
}
/deep/ td {
  height: 36px !important;
}
.ih-table-report {
  min-height: 200px;
}

.date-type-wrapper {
  width: 100%;
  display: flex;

  .left {
    flex: 1;
  }

  .right {
    flex: 3;
  }
}

.report-wrapper {
  /deep/.el-form-item__content {
    margin-right: 5px !important;
  }
}
</style>
 