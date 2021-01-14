<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-12-10 16:45:20
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-18 16:36:10
-->
<template>
  <ih-page class="text-left">
    <el-form
      :model="postData"
      :rules="rules"
      ref="ruleForm"
      label-width="160px"
      class="demo-ruleForm">
      <p id="anchor-1" ref="#anchor-1" class="ih-info-title">成交信息</p>
      <div
        v-if="!['ChangeInternalAchieveInf'].includes(changeType)"
        class="add-all-wrapper padding-left-20">
        <el-button type="success">更新明源数据</el-button>
      </div>
      <el-row>
        <el-col :span="6">
          <el-form-item label="成交报告编号" prop="dealCode">
            <el-input
              disabled
              placeholder="成交报告编号"
              v-model="postData.dealCode"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目周期" prop="cycleId">
            <el-input
              v-if="['ChangeAchieveInf', 'RetreatRoom'].includes(changeType)"
              placeholder="请选择项目周期"
              readonly v-model="postData.cycleName">
              <el-button slot="append" icon="el-icon-search" @click.native.prevent="selectProject"></el-button>
            </el-input>
            <el-input
              v-if="['ChangeBasicInf', 'ChangeInternalAchieveInf'].includes(changeType)"
              placeholder="请选择项目周期"
              disabled v-model="postData.cycleName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="业务模式" prop="businessType">
            <el-select
              v-model="postData.businessType"
              disabled
              placeholder="请选择业务模式"
              class="width--100">
              <el-option
                v-for="item in $root.dictAllList('BusinessModel')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="细分业务模式" prop="subdivisionType">
            <el-select
              v-model="postData.subdivisionType"
              :disabled="['ChangeBasicInf', 'ChangeInternalAchieveInf'].includes(changeType)"
              placeholder="请选择细分业务模式"
              class="width--100">
              <el-option
                v-for="item in $root.dictAllList('Subdivide')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否代销" prop="isMat">
            <el-select
              v-model="postData.isMat"
              disabled
              placeholder="请选择是否垫佣"
              class="width--100">
              <el-option
                v-for="item in $root.dictAllList('YesOrNoType')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否市场化项目" prop="isMarketProject">
            <el-select
              v-model="postData.isMarketProject"
              disabled
              placeholder="请选择"
              class="width--100">
              <el-option
                v-for="item in $root.dictAllList('YesOrNoType')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="一手代理公司" prop="oneAgentTeamId">
            <el-select
              v-model="postData.oneAgentTeamId"
              :disabled="['ChangeBasicInf', 'ChangeInternalAchieveInf'].includes(changeType)"
              placeholder="请选择一手代理公司"
              class="width--100">
              <el-option label="是" value="yes"></el-option>
              <el-option label="否" value="no"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="物业类型" prop="propertyType">
            <el-select
              v-model="postData.propertyType"
              clearable
              placeholder="请选择物业类型"
              class="width--100">
              <el-option
                v-for="item in $root.dictAllList('Property')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="栋座">
            <el-input
              v-if="['ChangeInternalAchieveInf'].includes(changeType)"
              placeholder="栋座"
              disabled v-model="postData.buildingId"></el-input>
            <IhSelectPageByBuild
              v-else
              v-model="postData.buildingId"
              :proId="postData.proId"
              :propertyEnum="postData.propertyType"
              :isCascade="true"
              cascadeType="build"
              placeholder="请选择栋座"
              clearable
            ></IhSelectPageByBuild>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="房号">
            <el-input
              v-if="['ChangeInternalAchieveInf'].includes(changeType)"
              placeholder="房号"
              disabled v-model="postData.roomId"></el-input>
            <IhSelectPageByRoom
              v-else
              v-model="postData.roomId"
              :proId="postData.proId"
              :buildingId="postData.buildingId"
              :isCascade="true"
              cascadeType="room"
              placeholder="请选择房号"
              clearable
            ></IhSelectPageByRoom>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="合同类型" prop="contType">
            <el-select
              v-model="postData.contType"
              :disabled="['ChangeBasicInf', 'ChangeInternalAchieveInf'].includes(changeType)"
              placeholder="请选择合同类型"
              @change="changeContType"
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
        <el-col :span="6" v-if="postData.contType === 'DistriDeal'">
          <el-form-item label="分销协议编号">
            <div class="contNo-wrapper">
              <el-select
                v-model="postData.contNo"
                :disabled="['ChangeBasicInf', 'ChangeInternalAchieveInf'].includes(changeType)"
                placeholder="请选择分销协议编号"
                class="width--100">
                <el-option
                  v-for="(item, index) in contNoList"
                  :key="index"
                  :label="item.contractNo" :value="item.contractNo"></el-option>
              </el-select>
              <div class="link-wrapper" v-if="!!postData.contNo">
                <el-link type="primary">详情</el-link>
              </div>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="postData.contType === 'DistriDeal'">
          <el-form-item label="是否垫佣" prop="isMat">
            <el-select
              v-model="postData.isMat"
              disabled
              placeholder="请选择是否垫佣"
              class="width--100">
              <el-option
                v-for="item in $root.dictAllList('YesOrNoType')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="postData.contType === 'DistriDeal'">
          <el-form-item label="报备信息">
            <el-input
              disabled
              placeholder="成交报告编号"
              v-model="postData.reportInfo"/>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="postData.contType === 'DistriDeal'">
          <el-form-item label="渠道公司">
            <el-input placeholder="渠道公司" disabled v-model="postData.channelName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="postData.contType === 'DistriDeal'">
          <el-form-item label="渠道等级">
            <el-input placeholder="渠道公司" disabled v-model="postData.channelName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="postData.contType === 'DistriDeal'">
          <el-form-item label="经纪人">
            <el-input placeholder="渠道公司" disabled v-model="postData.channelName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="备案情况">
            <el-select
              v-model="postData.recordState"
              :disabled="['ChangeBasicInf', 'ChangeInternalAchieveInf'].includes(changeType)"
              placeholder="请选择备案情况"
              class="width--100">
              <el-option
                v-for="item in $root.dictAllList('HasOrNoType')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="建筑面积" prop="area">
            <el-input
              v-model="postData.area"
              :disabled="['ChangeInternalAchieveInf'].includes(changeType)"
              placeholder="请输入建筑面积"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="户型">
            <div class="home-type-wrapper">
              <div>
                <el-input-number
                  :disabled="['ChangeInternalAchieveInf'].includes(changeType)"
                  v-digits="0"
                  v-model="postData.room"
                  :min="0"
                  :step="1"
                  size="small"
                  :step-strictly="true"></el-input-number>室
              </div>
              <div>
                <el-input-number
                  :disabled="['ChangeInternalAchieveInf'].includes(changeType)"
                  v-digits="0"
                  v-model="postData.hall"
                  :min="0"
                  :step="1"
                  size="small"
                  :step-strictly="true"></el-input-number>厅
              </div>
              <div>
                <el-input-number
                  :disabled="['ChangeInternalAchieveInf'].includes(changeType)"
                  v-digits="0"
                  v-model="postData.toilet"
                  :min="0"
                  :step="1"
                  size="small"
                  :step-strictly="true"></el-input-number>卫
              </div>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="房产证/预售合同编号">
            <el-input
              :disabled="['ChangeInternalAchieveInf'].includes(changeType)"
              v-model="postData.propertyNo"
              placeholder="请输入房产证/预售合同编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="房产证地址">
            <el-input
              :disabled="['ChangeInternalAchieveInf'].includes(changeType)"
              v-model="postData.address"
              placeholder="请输入房产证地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="现场销售">
            <el-input
              :disabled="['ChangeInternalAchieveInf'].includes(changeType)"
              v-model="postData.remarks" placeholder="请输入现场销售"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="签约类型">
            <el-select
              v-model="postData.signType"
              :disabled="['ChangeInternalAchieveInf'].includes(changeType)"
              placeholder="请选择签约类型"
              class="width--100">
              <el-option
                v-for="item in $root.dictAllList('SignUp')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="成交阶段" prop="stage">
            <el-select
              v-model="postData.stage"
              :disabled="['ChangeInternalAchieveInf'].includes(changeType)"
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
        <el-col :span="6">
          <el-form-item label="认购价格">
            <el-input
              v-model="postData.subscribePrice"
              :disabled="['ChangeBasicInf', 'ChangeInternalAchieveInf'].includes(changeType)"
              placeholder="请输入认购价格"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="认购日期">
            <el-date-picker
              style="width: 100%"
              :disabled="['ChangeInternalAchieveInf'].includes(changeType)"
              v-model="postData.subscribeDate"
              type="datetime"
              placeholder="请选择认购日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="签约价格">
            <el-input
              v-model="postData.signPrice"
              :disabled="['ChangeBasicInf', 'ChangeInternalAchieveInf'].includes(changeType)"
              placeholder="请输入签约价格"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="签约日期">
            <el-date-picker
              style="width: 100%"
              :disabled="['ChangeInternalAchieveInf'].includes(changeType)"
              v-model="postData.signDate"
              type="datetime"
              placeholder="请选择签约日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="成交组织" prop="dealOrgId">
            <el-input v-model="postData.dealOrgId" disabled placeholder="请选择成交组织"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="录入人" prop="entryPerson">
            <el-input v-model="postData.entryPerson" disabled placeholder="录入人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="录入日期" prop="entryDate">
            <el-input v-model="postData.entryDate" disabled placeholder="录入日期"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="数据标志" prop="dataSign">
            <el-input v-model="postData.dataSign" disabled placeholder="数据标志"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="成交状态" prop="status">
            <el-input v-model="postData.status" disabled placeholder="成交状态"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="业绩分配人" prop="status">
            <el-input v-model="postData.status" disabled placeholder="成交状态"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="业绩分配时间" prop="status">
            <el-input v-model="postData.status" disabled placeholder="成交状态"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="计算方式">
            <el-input
              disabled
              v-model="postData.remarks"
              placeholder="计算方式"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <p id="anchor-2" class="ih-info-title">优惠告知书信息</p>
    <el-row style="padding-left: 20px">
      <el-col>
        <el-table
          class="ih-table"
          :data="postData.offerNoticeVO">
          <el-table-column prop="offerNoticeName" label="名称" min-width="120"></el-table-column>
          <el-table-column prop="offerNoticeCode" label="优惠告知书编号" min-width="120"></el-table-column>
          <el-table-column prop="offerNoticeStatus" label="优惠告知书状态" min-width="120"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-link
                class="margin-right-10"
                type="primary"
                @click.native.prevent="preview(scope)"
              >预览
              </el-link>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <p id="anchor-3" class="ih-info-title">客户信息</p>
    <el-row style="padding-left: 20px">
      <el-col>
        <div class="add-all-wrapper">
          <el-button
            v-if="!['ChangeInternalAchieveInf'].includes(changeType)"
            type="success" @click="handleAddCustomer">添加客户</el-button>
        </div>
        <el-table
          class="ih-table"
          :data="postData.customerVO">
          <el-table-column prop="customerNo" label="客户编号" min-width="120"></el-table-column>
          <el-table-column prop="customerType" label="客户类型" min-width="120">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.customerType"
                clearable
                placeholder="客户类型">
                <el-option
                  v-for="item in $root.dictAllList('CommObjectType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="customerName" label="客户名称" min-width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.customerName" clearable placeholder="客户名称" />
            </template>
          </el-table-column>
          <el-table-column prop="customerPhone" label="手机号码" min-width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.customerPhone" clearable placeholder="手机号码" />
            </template>
          </el-table-column>
          <el-table-column prop="cardType" label="证件类型" min-width="150">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.cardType"
                clearable
                placeholder="证件类型">
                <el-option
                  v-for="item in $root.dictAllList('CommObjectType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="cardNo" label="证件编号" min-width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.cardNo" clearable placeholder="证件编号" />
            </template>
          </el-table-column>
          <el-table-column prop="email" label="邮箱" min-width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.email" clearable placeholder="邮箱" />
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-link
                class="margin-right-10"
                type="primary"
                @click.native.prevent="deleteAdd(scope, 'customer')"
              >删除
              </el-link>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="receive-wrapper" id="anchor-4">
      <p class="ih-info-title">收派金额</p>
      <div v-if="!['ChangeBasicInf', 'ChangeInternalAchieveInf'].includes(changeType)">计算方式</div>
      <div v-if="!['ChangeBasicInf', 'ChangeInternalAchieveInf'].includes(changeType)">
        <el-select
          v-model="postData.calculation"
          placeholder="请选择计算方式"
          class="width--100">
          <el-option
            v-for="item in $root.dictAllList('DealCalculateWay')"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </div>
    </div>
    <el-row style="padding-left: 20px">
      <el-col>
        <el-table
          class="ih-table"
          show-summary
          sum-text="合计金额"
          :summary-method="getReceiveSummaries"
          :data="postData.receiveVO">
          <el-table-column prop="type" label="类型" fixed min-width="120">
            <template slot-scope="scope">
              <div>{{scope.row.type === 'ServiceFee' ? '服务费' : '代理费'}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="partyACustomerName" label="甲方/客户" min-width="120"></el-table-column>
          <el-table-column prop="packageId" label="收派套餐" min-width="120"></el-table-column>
          <el-table-column prop="receiveAmount" label="应收金额" min-width="180"></el-table-column>
          <el-table-column prop="commAmount" label="派发佣金金额" min-width="180"></el-table-column>
          <el-table-column prop="rewardAmount" label="派发内场奖励金额" min-width="180"></el-table-column>
          <el-table-column prop="totalPackageAmount" label="总包业绩金额" min-width="180"></el-table-column>
          <el-table-column prop="distributionAmount" label="分销业绩金额" min-width="180"></el-table-column>
          <el-table-column prop="otherChannelFees" label="其他渠道费用(正数为产生，负数为使用)" min-width="150"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row style="padding-left: 20px; margin-top: 20px">
      <el-col>
        <el-table
          class="ih-table"
          :data="postData.receiveAchieveVO">
          <el-table-column prop="receiveAmount" label="本单应收" min-width="120"></el-table-column>
          <el-table-column prop="achieveAmount" label="本单业绩" min-width="120"></el-table-column>
          <el-table-column prop="otherChannelFees" label="其他渠道费用(正数为产生，负数为使用)" min-width="150"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="divider-padding">
      <el-divider>业绩分配</el-divider>
    </div>
    <p id="anchor-5" class="ih-info-title">对外拆佣</p>
    <el-row style="padding-left: 20px">
      <el-col>
        <div class="add-all-wrapper" v-if="postData.calculation === 'Manual'">
          <el-button type="success" @click="handleAddCommission">增加拆佣项</el-button>
        </div>
        <el-table
          class="ih-table"
          show-summary
          sum-text="合计金额"
          :summary-method="getCommissionSummaries"
          :data="postData.commissionInfoList">
          <el-table-column prop="target" label="拆佣对象" min-width="120">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.target"
                placeholder="请选择">
                <el-option
                  v-for="item in $root.dictAllList('CommObjectType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="commName" label="收款方" min-width="120">
            <template slot-scope="scope">
              <el-input placeholder="请选择收款方" readonly v-model="scope.row.commName">
                <el-button slot="append" icon="el-icon-search" @click.native.prevent="selectCommName"></el-button>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column prop="feeType" label="费用类型" min-width="120">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.feeType"
                clearable
                placeholder="费用类型"
                class="width--100">
                <el-option
                  v-for="item in $root.dictAllList('FeeType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="partyACustomer" label="费用来源(客户/甲方)" min-width="120">
            <template slot-scope="scope">
              <el-select v-model="scope.row.partyACustomer" placeholder="请选择">
                <el-option label="客户A" value="AA"></el-option>
                <el-option label="客户B" value="BB"></el-option>
                <el-option label="甲方A" value="CC"></el-option>
                <el-option label="甲方B" value="DD"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="金额" min-width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.amount" clearable placeholder="金额"/>
            </template>
          </el-table-column>
          <el-table-column prop="remarks" label="备注" min-width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.remarks" clearable placeholder="备注"/>
            </template>
          </el-table-column>
          <el-table-column
            v-if="postData.calculation === 'Manual'"
            fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-link
                class="margin-right-10"
                type="primary"
                @click.native.prevent="deleteAdd(scope, 'broker')"
              >删除
              </el-link>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <p id="anchor-6" class="ih-info-title">平台费用</p>
    <div class="ih-type-wrapper">
      <div class="title">总包</div>
      <el-button
        v-if="!['ChangeBasicInf'].includes(changeType)"
        type="success" @click="handleAddAchieve('total')">新增角色</el-button>
    </div>
    <el-row style="padding-left: 20px">
      <el-col>
        <el-table
          class="ih-table"
          show-summary
          sum-text="合计金额"
          :summary-method="getAchieveSummaries"
          :data="postData.achieveTotalBagList">
          <el-table-column prop="roleType" label="角色类型" min-width="120"></el-table-column>
          <el-table-column prop="roleAchieveCap" label="角色业绩上限" min-width="150"></el-table-column>
          <el-table-column prop="corporateAchieve" label="公司业绩" min-width="150"></el-table-column>
          <el-table-column prop="corporateAchieveRatio" label="公司业绩比例（%）" min-width="150"></el-table-column>
          <el-table-column prop="commFees" label="拆佣金额" min-width="150"></el-table-column>
          <el-table-column prop="commFeesRatio" label="拆佣比例（%）" min-width="150"></el-table-column>
          <el-table-column prop="rolerName" label="角色人" min-width="150"></el-table-column>
          <el-table-column prop="belongOrgName" label="店组" min-width="130"></el-table-column>
          <el-table-column prop="type" label="管理岗" min-width="150">
            <template slot-scope="scope">
              <div v-if="scope.row.SupervisorList.length > 0">
                <div v-for="list in scope.row.SupervisorList" :key="list.id">
                  <span>{{list.ratio}}%</span>
                  <span>{{list.manager}}({{list.managerPosition}})</span>
                </div>
              </div>
              <div v-else>暂无信息</div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-link
                class="margin-right-10"
                type="error"
                @click.native.prevent="deleteAchieveTotalBag(scope)"
              >删除
              </el-link>
              <el-link
                class="margin-right-10"
                type="primary"
                @click.native.prevent="editAchieveTotalBag(scope)"
              >修改
              </el-link>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="ih-type-wrapper">
      <div class="title">分销</div>
      <el-button
        v-if="!['ChangeBasicInf'].includes(changeType)"
        type="success" @click="handleAddAchieve('distri')">新增角色</el-button>
    </div>
    <el-row style="padding-left: 20px">
      <el-col>
        <el-table
          class="ih-table"
          show-summary
          sum-text="合计金额"
          :summary-method="getAchieveSummaries"
          :data="postData.achieveDistriList">
          <el-table-column prop="roleType" label="角色类型" min-width="120"></el-table-column>
          <el-table-column prop="roleAchieveCap" label="角色业绩上限" min-width="120"></el-table-column>
          <el-table-column prop="corporateAchieve" label="公司业绩" min-width="120"></el-table-column>
          <el-table-column prop="corporateAchieveRatio" label="公司业绩比例（%）" min-width="120"></el-table-column>
          <el-table-column prop="commFees" label="拆佣金额" min-width="150"></el-table-column>
          <el-table-column prop="commFeesRatio" label="拆佣比例（%）" min-width="150"></el-table-column>
          <el-table-column prop="rolerName" label="角色人" min-width="150"></el-table-column>
          <el-table-column prop="belongOrgName" label="店组" min-width="150"></el-table-column>
          <el-table-column prop="type" label="管理岗" min-width="150">
            <template slot-scope="scope">
              <div v-if="scope.row.SupervisorList.length > 0">
                <div v-for="list in scope.row.SupervisorList" :key="list.id">
                  <span>{{list.ratio}}%</span>
                  <span>{{list.manager}}({{list.managerPosition}})</span>
                </div>
              </div>
              <div v-else>暂无信息</div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-link
                class="margin-right-10"
                type="error"
                @click.native.prevent="deleteAchieveDistri(scope)"
              >删除
              </el-link>
              <el-link
                class="margin-right-10"
                type="primary"
                @click.native.prevent="editAchieveDistri(scope)"
              >修改
              </el-link>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <p id="anchor-7" class="ih-info-title">上传附件</p>
    <el-row style="padding-left: 20px">
      <el-col>
        <el-table
          class="ih-table"
          :data="postData.documentVO">
          <el-table-column prop="name" label="类型" min-width="80"></el-table-column>
          <el-table-column prop="fileName" label="附件" min-width="120">
            <template slot-scope="scope">
              <IhUpload
                :isCrop="false"
                :file-list.sync="scope.row.fileList"
                size="100px"
                :limit="5"
                :file-size="10"
                :isMove="false"
                @newFileList="getNewFile"
              ></IhUpload>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="nav-box">
      <div class="nav-icon el-button--success" @click="navFlag = !navFlag " :title="navFlag ? '收起' : '展开'">
        <i :class="navFlag ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'"></i>
      </div>
      <div :class="navFlag ? 'nav-wrapper' : 'nav-wrapper nav-transition'">
        <div
          @click="goAnchor(item.id, index)"
          v-for="(item, index) in navList"
          :key="item.id"
          :class="currentActiveIndex === index ? 'el-button--warning' : ''"
          class="nav-item el-button--success">{{item.name}}</div>
      </div>
    </div>
    <ih-dialog :show="dialogAddProjectCycle" desc="选择项目周期列表">
      <SelectProjectCycle
        :hasCheckedData="cycleCheckedData"
        @cancel="() => (dialogAddProjectCycle = false)"
        @finish="
            (data) => {
              dialogAddProjectCycle = false;
              finishAddProjectCycle(data);
            }
          "
      />
    </ih-dialog>
    <ih-dialog :show="dialogAddAgentCompany" desc="选择渠道商列表">
      <AgentCompanyList
        :hasCheckedData="companyCheckedData"
        @cancel="() => (dialogAddAgentCompany = false)"
        @finish="
            (data) => {
              dialogAddAgentCompany = false;
              finishAddAgentCompany(data);
            }
          "
      />
    </ih-dialog>
    <ih-dialog :show="dialogAddReportInfo" desc="选择已成交报备信息列表">
      <SelectReportInfo
        :hasCheckedData="reportCheckedData"
        @cancel="() => (dialogAddReportInfo = false)"
        @finish="
            (data) => {
              dialogAddReportInfo = false;
              finishAddReportInfo(data);
            }
          "
      />
    </ih-dialog>
    <ih-dialog :show="dialogAddRoom" desc="选择房号列表">
      <SelectRoom
        @cancel="() => (dialogAddRoom = false)"
        @finish="
            (data) => {
              dialogAddRoom = false;
              finishAddRoom(data);
            }
          "
      />
    </ih-dialog>
    <ih-dialog :show="dialogAddCustomer" desc="选择客户列表">
      <AddCustomer
        @cancel="() => (dialogAddCustomer = false)"
        @finish="
            (data) => {
              dialogAddCustomer = false;
              finishAddCustomer(data);
            }
          "
      />
    </ih-dialog>
    <ih-dialog :show="dialogAddBroker" desc="选择渠道经纪人列表">
      <AddBroker
        @cancel="() => (dialogAddBroker = false)"
        @finish="
            (data) => {
              dialogAddBroker = false;
              finishAddBroker(data);
            }
          "
      />
    </ih-dialog>
    <ih-dialog :show="dialogEditDealAchieve" desc="新增/修改成交业绩">
      <EditDealAchieve
        @cancel="() => (dialogEditDealAchieve = false)"
        @finish="
            (data) => {
              dialogEditDealAchieve = false;
              finishAddProjectCycle(data);
            }
          "
      />
    </ih-dialog>
  </ih-page>
</template>
<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import SelectProjectCycle from "@/views/deal/dealReport/dialog/selectProjectCycle.vue";
  import SelectReportInfo from "@/views/deal/dealReport/dialog/selectReportInfo.vue";
  import AgentCompanyList from "@/views/deal/dealReport/dialog/agentCompanyList.vue";
  import SelectRoom from "@/views/deal/dealReport/dialog/selectRoom.vue";
  import AddCustomer from "@/views/deal/dealReport/dialog/addCustomer.vue";
  import AddBroker from "@/views/deal/dealReport/dialog/addBroker.vue";
  import EditDealAchieve from "@/views/deal/dealReport/dialog/editDealAchieve.vue";
  import {
    post_suppDeal_toAddSuppDeal
  } from "@/api/deal";

  @Component({
    components: {AddCustomer, AddBroker, SelectProjectCycle, SelectRoom,
      AgentCompanyList, SelectReportInfo, EditDealAchieve},
  })
  export default class BasePage extends Vue {
    changeType: any = null; // 补充成交类型
    contNoList: any = []; // 分销协议编号列表
    postData: any = {
      calculation: 'Auto',
      dealCode: null,
      cycleId: null,
      cycleName: null,
      businessType: null,
      contType: null,
      subdivisionType: null,
      channelId: null,
      channelName: null,
      oneAgentTeamId: null,
      isMarketProject: null,
      dealOrgId: null,
      recordState: null,
      dataSign: null,
      contNo: null,
      isMat: null,
      stage: null,
      signType: null,
      subscribePrice: null,
      subscribeDate: null,
      signPrice: null,
      signDate: null,
      entryDate: null,
      entryPerson: null,
      status: null,
      remarks: null,
      propertyType: null,
      buildingId: null,
      roomNo: null,
      propertyNo: null,
      address: null,
      area: null,
      room: null,
      hall: null,
      toilet: null,
      offerNoticeVO: [], // 优惠告知书
      customerVO: [], // 客户信息
      agencyVO: [], // 渠道信息
      receiveVO: [], // 收派金额
      receiveAchieveVO: [], // 应收信息
      documentVO: [], // 附件信息
      commissionInfoList: [], // 对外拆佣
      achieveTotalBagList: [
        {
          SupervisorList: [],
          ManagerList: [],
          DirectorList: [],
        }
      ], // 平台费用 - 总包
      achieveDistriList: [
        {
          SupervisorList: [],
          ManagerList: [],
          DirectorList: [],
        }
      ], // 平台费用 - 分销
    };
    DealDataFlag: any = []; // 数据来源
    rules: any = {
      dealCode: [
        {required: true, message: "成交报告编号不能为空", trigger: "change"},
      ],
      cycleId: [
        {required: true, message: "项目周期必选", trigger: "change"},
      ],
      businessType: [
        {required: true, message: "业务模式必选", trigger: "change"},
      ],
      contType: [
        {required: true, message: "合同类型必选", trigger: "change"},
      ],
      subdivisionType: [
        {required: true, message: "细分模式必选", trigger: "blur"},
      ],
      oneAgentTeamId: [
        {required: true, message: "一手代理团队必选", trigger: "change"},
      ],
      isMarketProject: [
        {required: true, message: "是否市场化项目必选", trigger: "change"},
      ],
      dealOrgId: [
        {required: true, message: "成交组织必选", trigger: "change"},
      ],
      dataSign: [
        {required: true, message: "数据标志不能为空", trigger: "change"},
      ],
      isMat: [
        {required: true, message: "是否垫佣必选", trigger: "change"},
      ],
      stage: [
        {required: true, message: "成交阶段必选", trigger: "change"},
      ],
      entryDate: [
        {required: true, message: "录入日期必选", trigger: "change"},
      ],
      entryPerson: [
        {required: true, message: "录入人不能为空", trigger: "change"},
      ],
      status: [
        {required: true, message: "成交状态必填", trigger: "change"},
      ],
      propertyType: [
        {required: true, message: "物业类型必选", trigger: "change"},
      ],
      area: [
        {required: true, message: "建筑面积必填", trigger: "change"},
      ],
    };
    id: any = null;
    dialogAddRoom: any = false;
    dialogAddCustomer: any = false;
    dialogAddBroker: any = false;
    dialogAddProjectCycle: any = false;
    cycleCheckedData: any = [];
    dialogAddReportInfo: any = false;
    reportCheckedData: any = [];
    dialogAddAgentCompany: any = false;
    companyCheckedData: any = [];
    dialogEditDealAchieve: any = false;
    navFlag: any = false; // 是否折叠锚点
    navList: any = [
      {
        id: 1,
        name: '成交信息'
      },
      {
        id: 2,
        name: '优惠告知书'
      },
      {
        id: 3,
        name: '客户信息'
      },
      {
        id: 4,
        name: '收派金额'
      },
      {
        id: 5,
        name: '对外拆佣'
      },
      {
        id: 6,
        name: '平台费用'
      },
      {
        id: 7,
        name: '上传附件'
      },
    ]; // 锚点列表
    currentActiveIndex: any = 0; // 当前激活的nav

    async created() {
      this.DealDataFlag = (this as any).$root.dictAllList('DealDataFlag'); // 数据来源
      this.postData.documentVO = (this as any).$root.dictAllList('DealFileType'); // 附件类型
      // 附件类型增加key
      if (this.postData.documentVO.length > 0) {
        this.postData.documentVO.forEach((vo: any) => {
          vo.fileList = []
        })
      }
      // 成交报告的id
      this.id = this.$route.query.id;
      this.changeType = this.$route.query.type;
      // console.log('this.changeType', this.changeType);
      if (this.id) {
        let postData: any = {
          dealId: this.id,
          suppContType: this.changeType
        }
        const res: any = await post_suppDeal_toAddSuppDeal(postData);
        this.postData = res;
      } else {
        // 录入日期
        this.postData.entryDate = new Date();
      }
    }

    // 跳转到指定索引的元素
    goAnchor(id: any, index: any) {
      this.$nextTick(() => {
        // 获取目标的 offsetTop
        let selector = `#anchor-${id}`;
        let dom = document.querySelector(selector) as any;
        const targetOffsetTop = dom ? dom.offsetTop - 60 : 0;
        // console.log('targetOffsetTop:', targetOffsetTop);
        // 获取当前 offsetTop
        let mainDom =  document.querySelector('.el-main') as any;
        let scrollTop = mainDom ? mainDom.scrollTop : 0;
        // console.log('scrollTop:', scrollTop);
        // 定义一次跳 50 个像素，数字越大跳得越快，但是会有掉帧得感觉，步子迈大了会扯到蛋
        const STEP = 50;
        // 定义往下滑函数
        function smoothDown() {
          // 如果当前 scrollTop 小于 targetOffsetTop 说明视口还没滑到指定位置
          if (scrollTop < targetOffsetTop) {
            // 如果和目标相差距离大于等于 STEP 就跳 STEP
            // 否则直接跳到目标点，目标是为了防止跳过了。
            if (targetOffsetTop - scrollTop >= STEP) {
              scrollTop += STEP;
            } else {
              scrollTop = targetOffsetTop;
            }
            mainDom.scrollTop = scrollTop;
            // 关于 requestAnimationFrame 可以自己查一下，在这种场景下，相比 setInterval 性价比更高
            window.requestAnimationFrame(smoothDown);
          }
        }
        // 定义往上滑函数
        function smoothUp() {
          if (scrollTop > targetOffsetTop) {
            if (scrollTop - targetOffsetTop >= STEP) {
              scrollTop -= STEP;
            } else {
              scrollTop = targetOffsetTop;
            }
            mainDom.scrollTop = scrollTop;
            window.requestAnimationFrame(smoothUp);
          }
        }
        // 判断是往下滑还是往上滑
        if (scrollTop > targetOffsetTop) {
          // 往上滑
          smoothUp();
        } else {
          // 往下滑
          smoothDown();
        }
        this.currentActiveIndex = index;
      })
    }

    // 修改业务模式逻辑
    changeBusinessType(value: any) {
      // console.log(value);
      switch(value){
        case 'TotalBagModel' :
          // 总包
          this.postData.subdivisionType = 'All';
          break;
        case 'DistriModel' :
          // 分销
          this.postData.subdivisionType = 'District';
          break;
        case 'TotalBagDistriModel' :
          // 总包+分销
          this.postData.subdivisionType = '';
          break;
        default:
          this.postData.subdivisionType = '';
      }
    }

    // 修改合同类型
    changeContType(value: any) {
      if (value === 'NaturalVisitDeal') {
        // 自然来访
        console.log(123)
      } else {
        // 自然来访
        console.log(123)
      }
    }

    // 计算收派金额总计
    getReceiveSummaries(param: any) {
      const {columns, data} = param;
      const sums: any = [];
      columns.forEach((column: any, index: any) => {
        if (index === 0) {
          sums[index] = '合计金额';
          return;
        }
        if (![0, 1, 2].includes(index)) {
          const values = data.map((item: any) => Number(item[column.property]));
          if (!values.every((value: any) => isNaN(value))) {
            sums[index] = values.reduce((prev: any, curr: any) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = '';
          }
        } else {
          sums[index] = '';
        }
      });
      return sums;
    }

    // 选择项目周期
    selectProject() {
      this.dialogAddProjectCycle = true;
    }

    // 确定选择项目周期
    async finishAddProjectCycle(data: any) {
      console.log('data', data);
      if (data && data.length > 0) {
        this.postData.cycleName = data[0].termName;
        this.postData.cycleId = data[0].termId;
        this.cycleCheckedData = [...data];
      }
    }

    // 选择已成交的报备信息-分销成交模式下
    selectReport() {
      this.dialogAddReportInfo = true;
    }

    // 确定选择已成交的报备信息-分销成交模式下
    finishAddReportInfo(data: any) {
      // console.log('data', data);
      if (data && data.length > 0) {
        this.postData.channelName = data[0].name;
        this.postData.channelId = data[0].id;
        this.reportCheckedData = [...data];
      }
    }

    // 选择渠道商
    selectCompany() {
      this.dialogAddAgentCompany = true;
    }

    // 确定选择渠道商
    finishAddAgentCompany(data: any) {
      // console.log('data', data);
      if (data && data.length > 0) {
        this.postData.channelName = data[0].name;
        this.postData.channelId = data[0].id;
        this.companyCheckedData = [...data];
      }
    }

    // 选择房号
    selectRoom() {
      // 分销成交模式下不能选择房号，房号是不可编辑的
      if (this.postData.contType === 'DistriDeal') return
      this.dialogAddRoom = true;
    }

    // 确定选择房号
    async finishAddRoom(data: any) {
      console.log('data', data);
    }

    // 预览-优惠告知书
    preview(scope: any) {
      console.log(scope);
    }

    // 添加客户
    handleAddCustomer() {
      this.dialogAddCustomer = true;
    }

    // 添加渠道经纪人
    handleAddBroker() {
      this.dialogAddBroker = true;
    }

    // 确定选择客户
    async finishAddCustomer(data: any) {
      console.log('data', data);
      // this.addTotalPackageList = data;
    }

    // 确定选择渠道经纪人
    async finishAddBroker(data: any) {
      console.log('data', data);
      // this.addTotalPackageList = data;
    }

    // 删除客户/渠道经纪人
    async deleteAdd(scope: any, type: any) {
      console.log(scope);
      console.log(type);
      if (type === 'customer') {
        // 删除客户信息逻辑
        console.log(111);
      } else if (type === 'broker') {
        // 删除渠道经纪人逻辑
        console.log(222);
      }
    }

    // 增加拆佣项
    handleAddCommission() {
      console.log('增加拆佣项');
      let obj = {};
      this.postData.commissionInfoList.push(obj);
    }

    // 选择拆佣名称
    selectCommName(scope: any) {
      console.log('选择收派套餐', scope);
      this.dialogAddAgentCompany = true;
    }

    // 计算对外拆佣合计
    getCommissionSummaries(param: any) {
      const {columns, data} = param;
      const sums: any = [];
      columns.forEach((column: any, index: any) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        if ([4].includes(index)) {
          const values = data.map((item: any) => Number(item[column.property]));
          if (!values.every((value: any) => isNaN(value))) {
            sums[index] = values.reduce((prev: any, curr: any) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = '';
          }
        } else {
          sums[index] = '';
        }
      });
      return sums;
    }

    // 新增总包/分销业绩
    handleAddAchieve(type: any) {
      console.log('type', type);
      // this.dialogAddRole = true;
      this.dialogEditDealAchieve = true;
      // total - 总包； distri - 分销
    }

    // 计算平台费用-总包/分销合计
    getAchieveSummaries(param: any) {
      const {columns, data} = param;
      const sums: any = [];
      columns.forEach((column: any, index: any) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        if ([1, 2, 3, 4, 5].includes(index)) {
          const values = data.map((item: any) => Number(item[column.property]));
          if (!values.every((value: any) => isNaN(value))) {
            sums[index] = values.reduce((prev: any, curr: any) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = '';
          }
        } else {
          sums[index] = '';
        }
      });
      return sums;
    }

    getNewFile(val: any) {
      console.log(val);
    }
  }
</script>
<style lang="scss" scoped>
  .add-all-wrapper {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 10px;
  }

  .receive-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    margin: 10px 0px;

    p {
      flex: 1;
      display: inline-block;
    }

    div {
      box-sizing: border-box;
      margin-left: 5px;
    }
  }

  .contNo-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;

    .link-wrapper {
      width: 15%;
      margin-left: 5px;
      box-sizing: border-box;
      font-size: 0px;
    }
  }

  .home-type-wrapper {
    width: 100%;
    display: flex;

    div {
      flex: 1;
      text-align: center;

      /deep/ .el-input-number {
        box-sizing: border-box;
        margin-right: 5px;
      }
    }
  }

  .cont-type-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;

    div {
      flex: 1;
    }
  }

  .ih-type-wrapper {
    width: 100%;
    box-sizing: border-box;
    padding-left: 20px;
    margin: 15px 0px;
    text-align: left;
    display: flex;
    align-items: center;

    .title {
      margin-right: 20px;
      box-sizing: border-box;
      border-left: 5px solid #F90;
      padding-left: 5px;
      color: #f90;
      margin-left: 20px;
    }
  }

  .nav-box {
    position: fixed;
    right: 37px;
    top: 30%;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    //align-items: center;
    //border: 1px solid #ffffff;
    z-index: 200;

    .nav-icon {
      width: 24px;
      height: 46px;
      line-height: 47px;
      border-radius: 50px 0 0 50px;
      cursor: pointer;
      //background-color: #2B4558;
      color: #ffffff;
      font-size: 12px;
      text-align: center;
    }

    .nav-wrapper {
      //width: 133px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-color: #2B4558;
      color: #ffffff;
      visibility: visible;
      transform: scaleX(1);
      transition: all 0.3s;
      transform-origin: left bottom;

      .nav-item {
        width: 44px;
        //height: 40px;
        //line-height: 40px;
        text-align: center;
        font-size: 14px;
        box-sizing: border-box;
        padding: 5px 5px;
        cursor: pointer;
        border-left: 1px solid #ffffff;
        border-bottom: 1px solid #ffffff;

        &:not(:last-child) {
          border-bottom: 1px solid #ffffff;
        }
      }
    }

    .nav-transition {
      width: 0;
      visibility: hidden;
      transform: scaleX(0);
      transition: all 0.3s;
      transform-origin: left bottom;
    }
  }

  .divider-padding {
    padding: 20px 20px;
    box-sizing: border-box;
    margin: 10px 0px;

    /deep/.el-divider {
      background-color: #409EFF;
    }

    /deep/.el-divider__text {
      color: #409EFF;
      font-size: 18px;
      font-weight: bold;
    }
  }
</style>
