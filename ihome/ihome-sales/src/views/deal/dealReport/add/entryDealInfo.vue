<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-12-23 14:20:40
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-23 18:50:50
-->
<template>
  <ih-page class="text-left">
    <el-form
      v-loading="formLoading"
      :model="postData"
      :rules="rules"
      ref="ruleForm"
      label-width="160px"
      class="demo-ruleForm">
      <p id="anchor-1" class="ih-info-title">成交信息</p>
      <div class="add-all-wrapper padding-left-20">
        <el-button type="success">更新明源数据</el-button>
      </div>
      <el-row>
        <el-col :span="6" v-if="!!postData.dealCode">
          <el-form-item label="成交报告编号" :prop="!!postData.dealCode ? 'dealCode' : ''">
            <el-input
              disabled
              placeholder="成交报告编号"
              v-model="postData.dealCode"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目周期" prop="cycleId">
            <el-input placeholder="请选择项目周期" readonly v-model="postData.cycleName">
              <el-button slot="append" icon="el-icon-search" @click.native.prevent="selectProject"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="业务模式" prop="businessType">
            <el-select
              v-model="postData.businessType"
              disabled
              placeholder="项目周期自动带出"
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
          <el-form-item label="细分业务模式" prop="refineModel">
            <el-select
              v-model="postData.refineModel"
              :disabled="['TotalBagModel', 'DistriModel'].includes(postData.businessType)"
              placeholder="请选择细分业务模式"
              class="width--100">
              <el-option
                v-for="item in refineModelList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否代销" prop="isConsign">
            <el-select
              v-model="postData.isConsign"
              disabled
              placeholder="请选择是否代销"
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
              clearable
              placeholder="请选择一手代理公司"
              class="width--100">
              <el-option
                v-for="item in firstAgencyCompanyList"
                :key="item.agencyId"
                :label="item.agencyName"
                :value="item.agencyId"></el-option>
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
                v-for="item in propertyTypeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="栋座" prop="buildingId">
            <IhSelectPageByBuild
              @change="changeBuild"
              v-model="postData.buildingId"
              :proId="baseInfoByTerm.proId"
              placeholder="请选择栋座"
              clearable
            ></IhSelectPageByBuild>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="房号" prop="roomId">
            <IhSelectPageByRoom
              @change="changeRoom"
              v-model="postData.roomId"
              :proId="baseInfoByTerm.proId"
              :buildingId="postData.buildingId"
              placeholder="请选择房号"
              clearable
            ></IhSelectPageByRoom>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="合同类型" prop="contType">
            <el-select
              v-model="postData.contType"
              :clearable="!baseInfoInDeal.hasRecord"
              :disabled="baseInfoInDeal.contType === 'DistriDeal' && baseInfoInDeal.hasRecord"
              placeholder="请选择合同类型"
              @change="changeContType"
              class="width--100">
              <el-option
                v-for="item in contTypeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="baseInfoInDeal.hasRecord">
          <el-form-item label="分销协议编号" :prop="baseInfoInDeal.hasRecord ? 'contNo' : ''">
            <div class="contNo-wrapper">
              <el-select
                v-model="postData.contNo"
                clearable
                @change="changeContNo"
                placeholder="请选择分销协议编号"
                class="width--100">
                <el-option
                  v-for="(item, index) in contNoList"
                  :key="index"
                  :label="item.contractNo" :value="item.contractNo"></el-option>
              </el-select>
              <div class="link-wrapper" v-if="!!postData.contNo">
                <el-link type="primary" @click.native.prevent="previewContNo(postData.contNo)">详情</el-link>
              </div>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="baseInfoInDeal.hasRecord">
          <el-form-item label="是否垫佣" :prop="baseInfoInDeal.hasRecord ? 'isMat' : ''">
            <el-select
              v-model="postData.isMat"
              disabled
              placeholder="请选择是否垫佣"
              class="width--100">
              <el-option
                v-for="item in $root.dictAllList('PadCommission')"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="baseInfoInDeal.hasRecord">
          <el-form-item label="报备信息" :prop="baseInfoInDeal.hasRecord ? 'recordStr' : ''">
            <el-input v-model="postData.recordStr" disabled placeholder="房号自动带出"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="baseInfoInDeal.hasRecord">
          <el-form-item label="渠道公司" :prop="baseInfoInDeal.hasRecord ? 'agencyName' : ''">
            <el-input v-model="postData.agencyName" disabled placeholder="选成交报备自动带出"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="baseInfoInDeal.hasRecord">
          <el-form-item label="渠道等级" :prop="baseInfoInDeal.hasRecord ? 'channelLevelName' : ''">
            <el-input v-model="postData.channelLevelName" disabled placeholder="选成交报备自动带出"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="baseInfoInDeal.hasRecord">
          <el-form-item label="经纪人" :prop="baseInfoInDeal.hasRecord ? 'brokerName' : ''">
            <el-input v-model="postData.brokerName" disabled placeholder="选成交报备自动带出"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="备案情况" prop="recordState">
            <el-select
              v-model="postData.recordState"
              clearable
              placeholder="请选择备案情况"
              class="width--100">
              <el-option
                v-for="item in $root.dictAllList('HasOrNo')"
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
              :disabled="isDisabled('area', 'houseVO')"
              v-model="postData.area"
              placeholder="请输入建筑面积"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="户型">
            <div class="home-type-wrapper">
              <div>
                <el-input-number
                  v-digits="0"
                  :disabled="isDisabled('room', 'houseVO')"
                  v-model="postData.room"
                  :min="0"
                  :step="1"
                  size="small"
                  :controls="false"
                  :step-strictly="true"></el-input-number>室
              </div>
              <div>
                <el-input-number
                  v-digits="0"
                  :disabled="isDisabled('hall', 'houseVO')"
                  v-model="postData.hall"
                  :min="0"
                  :step="1"
                  size="small"
                  :controls="false"
                  :step-strictly="true"></el-input-number>厅
              </div>
              <div>
                <el-input-number
                  v-digits="0"
                  :disabled="isDisabled('kitchen', 'houseVO')"
                  v-model="postData.kitchen"
                  :min="0"
                  :step="1"
                  size="small"
                  :controls="false"
                  :step-strictly="true"></el-input-number>厨
              </div>
              <div>
                <el-input-number
                  v-digits="0"
                  :disabled="isDisabled('toilet', 'houseVO')"
                  v-model="postData.toilet"
                  :min="0"
                  :step="1"
                  size="small"
                  :controls="false"
                  :step-strictly="true"></el-input-number>卫
              </div>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="房产证/预售合同编号">
            <el-input v-model="postData.propertyNo" clearable placeholder="请输入房产证/预售合同编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="房产证地址">
            <el-input v-model="postData.address" clearable placeholder="请输入房产证地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="现场销售">
            <el-input v-model="postData.sceneSales" clearable placeholder="请输入现场销售"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="签约类型" prop="signType">
            <el-select
              v-model="postData.signType"
              :disabled="isDisabled('signType', 'dealVO')"
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
              :disabled="isDisabled('dealStage', 'dealVO')"
              no-data-text="请先选择项目周期"
              placeholder="请选择成交阶段"
              class="width--100">
              <el-option
                v-for="item in dealStageList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="isDisabled('returnRatio', 'dealVO')">
          <el-form-item label="明源房款回笼比例">
            <el-input
              v-model="postData.returnRatio"
              clearable placeholder="请输入明源房款回笼比例"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="认购价格" :prop="['Subscribe', 'SignUp'].includes(postData.stage) ? 'subscribePrice' : ''">
            <el-input
              :disabled="isDisabled('subscribePrice', 'dealVO')"
              v-model="postData.subscribePrice"
              placeholder="请输入认购价格"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="认购日期" :prop="['Subscribe', 'SignUp'].includes(postData.stage) ? 'subscribeDate' : ''">
            <el-date-picker
              style="width: 100%"
              :disabled="isDisabled('subscribeDate', 'dealVO')"
              v-model="postData.subscribeDate"
              type="datetime"
              placeholder="请选择认购日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="签约价格" :prop="['SignUp'].includes(postData.stage) ? 'signPrice' : ''">
            <el-input
              :disabled="isDisabled('signPrice', 'dealVO')"
              v-model="postData.signPrice"
              placeholder="请输入签约价格"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="签约日期" :prop="['SignUp'].includes(postData.stage) ? 'signDate' : ''">
            <el-date-picker
              style="width: 100%"
              :disabled="isDisabled('signDate', 'dealVO')"
              v-model="postData.signDate"
              type="datetime"
              placeholder="请选择签约日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="成交组织" prop="dealOrgId">
            <el-input v-model="postData.dealOrgId" disabled placeholder="项目周期自动带出"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="!!id">
          <el-form-item label="录入人" :prop="!!id ? 'entryPerson' : ''">
            <el-input v-model="postData.entryPerson" disabled placeholder="录入人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="!!id">
          <el-form-item label="录入日期" :prop="!!id ? 'entryDate' : ''">
            <el-date-picker
              style="width: 100%"
              v-model="postData.entryDate"
              type="datetime"
              disabled
              placeholder="请选择录入日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="数据标志" prop="dataSign">
            <el-input v-model="postData.dataSign" disabled placeholder="自动判断"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="!!id">
          <el-form-item label="成交状态" :prop="!!id ? 'status' : ''">
            <el-input v-model="postData.status" disabled placeholder="成交状态"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div id="anchor-2" v-if="baseInfoByTerm.chargeEnum !== 'Agent'">
      <p class="ih-info-title">优惠告知书信息</p>
      <el-row style="padding-left: 20px">
        <el-col>
          <div
            v-if="baseInfoByTerm.termStageEnum === 'Recognize' && !baseInfoInDeal.notice.length"
            class="add-all-wrapper">
            <el-button type="success" @click="handleAddNotice">添加</el-button>
          </div>
          <el-table
            class="ih-table"
            :data="postData.offerNoticeVO">
            <el-table-column prop="notificationType" label="名称" min-width="120">
              <template v-slot="{ row }">
                {{$root.dictAllName(row.notificationType, 'NotificationType')}}
              </template>
            </el-table-column>
            <el-table-column prop="noticeNo" label="优惠告知书编号" min-width="120"></el-table-column>
            <el-table-column prop="notificationStatus" label="优惠告知书状态" min-width="120">
              <template v-slot="{ row }">
                {{$root.dictAllName(row.notificationStatus, 'NotificationStatus')}}
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-link
                  v-if="!!scope.row.addType"
                  class="margin-right-10"
                  type="primary"
                  @click.native.prevent="removeNotice(scope)"
                >删除
                </el-link>
                <el-link
                  class="margin-right-10"
                  type="success"
                  @click.native.prevent="previewNotice(scope)"
                >预览
                </el-link>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <p id="anchor-3" class="ih-info-title">客户信息</p>
    <el-row style="padding-left: 20px">
      <el-col>
        <div
          v-if="!baseInfoInDeal.myReturnVO.customerVOS.length"
          class="add-all-wrapper">
          <el-button type="success" @click="handleAddCustomer">添加客户</el-button>
        </div>
        <el-table
          class="ih-table"
          :data="postData.customerVO">
          <el-table-column prop="custCode" label="客户编号" min-width="150"></el-table-column>
          <el-table-column prop="custType" label="客户类型" min-width="120">
            <template slot-scope="scope">
              <div>{{$root.dictAllName(scope.row.custType, 'CustType')}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="custName" label="客户名称" min-width="120"></el-table-column>
          <el-table-column prop="custTel" label="手机号码" min-width="120"></el-table-column>
          <el-table-column prop="cardType" label="证件类型" min-width="120">
            <template slot-scope="scope">
              <div>{{$root.dictAllName(scope.row.cardType, 'CardType')}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="certificateNumber" label="证件编号" min-width="150"></el-table-column>
          <el-table-column prop="email" label="邮箱" min-width="120"></el-table-column>
          <el-table-column
            v-if="!baseInfoInDeal.myReturnVO.customerVOS.length"
            fixed="right" label="操作" width="100">
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
    <p id="anchor-4" class="ih-info-title">收派金额</p>
    <el-row style="padding-left: 20px">
      <el-col>
        <el-table
          class="ih-table"
          show-summary
          sum-text="合计金额"
          :summary-method="getReceiveSummaries"
          :data="postData.receiveVO">
          <el-table-column prop="type" label="类型" min-width="120">
            <template slot-scope="scope">
              <div>{{$root.dictAllName(scope.row.type, 'FeeType')}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="partyACustomerName" label="甲方/客户" min-width="120"></el-table-column>
          <el-table-column prop="packageId" label="收派套餐" min-width="140">
            <template slot-scope="scope">
              <div v-if="!scope.row.packageId">
                <el-input
                  readonly
                  placeholder="请选择收派套餐"
                  v-model="scope.row.packageId">
                  <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click.native.prevent="selectPackage(scope)"></el-button>
                </el-input>
              </div>
              <div v-else>
                <el-tooltip placement="top" effect="light">
                  <div slot="content">
                    <el-table :data="scope.row.showData" style="width: 100%">
                      <el-table-column label="类型" prop="type" min-width="100">
                        <template slot-scope="scope">
                          <div>{{$root.dictAllName(scope.row.branchName, 'CardType')}}</div>
                        </template>
                      </el-table-column>
                      <el-table-column label="合同类型" prop="contractEnum" min-width="100">
                        <template slot-scope="scope">
                          <div>{{$root.dictAllName(scope.row.contractEnum, 'Contract')}}</div>
                        </template>
                      </el-table-column>
                      <el-table-column label="客户类型" prop="transactionEnum" min-width="100">
                        <template slot-scope="scope">
                          <div>{{$root.dictAllName(scope.row.transactionEnum, 'Transaction')}}</div>
                        </template>
                      </el-table-column>
                      <el-table-column label="条件" prop="condition" min-width="200"></el-table-column>
                      <el-table-column label="应收金额" prop="receivableAmout" min-width="100">
                        <template slot-scope="scope">
                          <div>金额：{{scope.row.receivableAmout}}</div>
                          <div>点数：{{scope.row.receivablePoint}}</div>
                        </template>
                      </el-table-column>
                      <el-table-column label="派发佣金" prop="sendAmount" min-width="100">
                        <template slot-scope="scope">
                          <div>金额：{{scope.row.sendAmount}}</div>
                          <div>点数：{{scope.row.sendPoint}}</div>
                        </template>
                      </el-table-column>
                      <el-table-column label="派发内场奖励" prop="sendInAmount" min-width="150">
                        <template slot-scope="scope">
                          <div>金额：{{scope.row.sendInAmount}}</div>
                          <div>点数：{{scope.row.sendInPoint}}</div>
                        </template>
                      </el-table-column>
                      <el-table-column label="总包业绩" prop="generalAchieveAmount" min-width="100">
                        <template slot-scope="scope">
                          <div>金额：{{scope.row.generalAchieveAmount}}</div>
                          <div>点数：{{scope.row.generalAchievePoint}}</div>
                        </template>
                      </el-table-column>
                      <el-table-column label="分销业绩" prop="distributeAchieveAmount" min-width="100">
                        <template slot-scope="scope">
                          <div>金额：{{scope.row.distributeAchieveAmount}}</div>
                          <div>点数：{{scope.row.distributeAchievePoint}}</div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <el-input
                    readonly
                    placeholder="收派标准">
                    <el-button slot="append" icon="el-icon-search"
                      @click.native.prevent="selectPackage(scope)"></el-button>
                  </el-input>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="receiveAmount" label="应收金额" min-width="120"></el-table-column>
          <el-table-column prop="commAmount" label="派发佣金金额" min-width="150"></el-table-column>
          <el-table-column prop="rewardAmount" label="派发内场奖励金额" min-width="150"></el-table-column>
          <el-table-column prop="totalPackageAmount" label="总包业绩金额" min-width="150"></el-table-column>
          <el-table-column prop="distributionAmount" label="分销业绩金额" min-width="150"></el-table-column>
          <el-table-column prop="otherChannelFees" label="其他渠道费用(正数为产生，负数为使用)" min-width="150"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row style="padding-left: 20px; margin-top: 20px">
      <el-col>
        <el-table
          class="ih-table"
          :data="receiveAchieveVO">
          <el-table-column prop="receiveAmount" label="本单应收" min-width="120"></el-table-column>
          <el-table-column prop="achieveAmount" label="本单业绩" min-width="120"></el-table-column>
          <el-table-column prop="otherChannelFees" label="其他渠道费用(正数为产生，负数为使用)" min-width="150"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <p id="anchor-5" class="ih-info-title">上传附件</p>
    <el-row style="padding-left: 20px">
      <el-col>
        <div class="add-all-wrapper" v-if="baseInfoByTerm.exMinyuan">
          <el-button type="success" @click="handleViewDealInfo">查看来访/成交确认信息</el-button>
        </div>
        <el-table
          class="ih-table"
          :data="postData.documentVO">
          <el-table-column prop="name" label="类型" width="200"></el-table-column>
          <el-table-column prop="fileName" label="附件" min-width="120">
            <template slot-scope="scope">
              <IhUpload
                :isCrop="false"
                :file-list.sync="scope.row.fileList"
                size="100px"
                :limit="100"
                :file-size="10"
                :isMove="false"
                @newFileList="getNewFile"
              ></IhUpload>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="text-center btn-top">
      <el-button type="success" @click="handleSave('submit')">提交</el-button>
      <el-button @click="cancel()">取消</el-button>
    </div>
    <div class="nav-box">
      <div class="nav-icon" @click="navFlag = !navFlag " :title="navFlag ? '收起' : '展开'">
        <i :class="navFlag ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
      </div>
      <div :class="navFlag ? 'nav-wrapper' : 'nav-wrapper nav-transition'">
        <div @click="goAnchor(item.id)" v-for="item in navList" :key="item.id" class="nav-item">{{item.name}}</div>
      </div>
    </div>
  </ih-page>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";
  import {
    post_pageData_initBasic, // 选择周期、房号后初始化页面
    get_deal_get__id, // 编辑功能
    post_deal_entryDealBasicInf, // 案场岗 - 录入成交信息
    post_deal_updateDealBasicInf // 案场岗 - 修改成交信息
  } from "@/api/deal";
  import {
    get_term_getProBaseByTermId__termId, // 通过项目周期获取成交基础信息
  } from "@/api/project";
  import {Form as ElForm} from "element-ui";
  import {NoRepeatHttp} from "ihome-common/util/aop/no-repeat-http";

  @Component({
    components: {}
  })
  export default class EntryDealInfo extends Vue {
    @Prop({
      type: Function,
      default: null,
    })
    goAnchor!: any; // 锚点跳转方法
    @Prop({
      type: Function,
      default: null,
    })
    previewContNo!: any; // 预览分销协议方法
    @Prop({
      type: Function,
      default: null,
    })
    getContTypeList!: any; // 根据业务模式获取合同类型选项
    @Prop({
      type: Function,
      default: null,
    })
    getRefineModelList!: any; // 根据业务模式获取细分业务模式选项
    contTypeList: any = []; // 合同类型选项
    refineModelList: any = []; // 细分业务模式选项
    dealStageList: any = []; // 成交阶段选项
    firstAgencyCompanyList: any = []; // 一手代理团队选项
    propertyTypeList: any = []; // 物业类型选项
    contNoList: any = []; // 分销协议列表---initPage接口
    packageIdsList: any = []; // 收派套餐ids：分销模式---选择分销协议后获取；非分销协议---请求接口获取
    baseInfoByTerm: any = {
      proId: null, // 项目id --- 用于查询分销协议列表
      termId: null, // 项目周期id
      termStageEnum: null, // 判断优惠告知书是否有添加按钮
    }; // 通过项目周期id获取到的初始化成交基础信息
    baseInfoInDeal: any = {
      notice: [], // 优惠告知书
      myReturnVO: {
        houseVO: {},
        customerVOS: {},
        dealVO: {},
        dataSign: ''
      }
    }; // 通过initPage接口获取到的成交信息(项目周期 + 房号)
    formLoading: any = false; // 表格loading状态
    postData: any = {
      baseProId: null, // 记录，当合同类型=分销成交时，需要用项目Id作为参数查报备列表
      isNeedUpdate: false, // 是否需要更新明源数据的标志
      isOver: false, // 是否穿底 --- 用来校验收派金额，其他渠道费
      isOtherProUse: false, // 是否允许跨项目使用其他渠道费用 --- 用来校验收派金额，其他渠道费
      chargeMode: null, // 收费模式 --- 初始化收派金额，有无服务费、代理费
      dealCode: null,
      cycleId: null, // 接口用到的id
      cycleName: null, // 只用于显示
      businessType: null,
      contType: null,
      refineModel: null, // 细分业务模式
      channelId: null,
      agencyId: null, // 渠道公司Id
      agencyName: null, // 渠道公司
      channelLevel: null, // 渠道等级Id
      channelLevelName: null, // 渠道等级
      brokerId: null, // 渠道经纪人Id
      brokerName: null, // 渠道经纪人
      oneAgentTeamId: null,
      isMarketProject: null,
      dealOrgId: null,
      recordState: null, // 备案情况
      returnRatio: null,
      dataSign: null, // 数据标志
      contNo: null,
      isMat: null,
      reportId: null, // 报备信息ID
      recordStr: null, // 报备信息名字，客户姓名+手机号码
      isConsign: null,
      stage: null, // 成交阶段
      signType: null, // 签约类型
      subscribePrice: null, // 认购价格
      subscribeDate: null, // 认购日期
      signPrice: null, // 签约日期
      signDate: null, // 签约价格
      entryDate: null,
      entryPerson: null,
      status: null,
      remarks: null,
      propertyType: null,
      buildingId: null, // 栋座ID
      roomNo: null, // 房号
      roomId: null, // 房号ID
      propertyNo: null, // 房产证/预售合同编号
      address: null,
      area: null,
      room: null,
      hall: null,
      kitchen: null,
      toilet: null,
      sceneSales: null, // 现场销售
      offerNoticeVO: [], // 优惠告知书
      customerVO: [], // 客户信息
      agencyVO: [], // 渠道信息
      receiveVO: [{}], // 收派金额
      receiveAchieveVO: [], // 应收信息
      documentVO: [], // 附件信息
    };
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
      refineModel: [
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
      buildingId: [
        {required: true, message: "栋座必选", trigger: "change"},
      ],
      roomId: [
        {required: true, message: "房号必选", trigger: "change"},
      ],
      recordState: [
        {required: true, message: "备案情况必选", trigger: "change"},
      ],
      signType: [
        {required: true, message: "签约类型必选", trigger: "change"},
      ],
      area: [
        {required: true, message: "建筑面积必填", trigger: "change"},
      ],
      recordStr: [
        {required: true, message: "报备信息不能为空", trigger: "change"},
      ],
      agencyName: [
        {required: true, message: "渠道公司不能为空", trigger: "change"},
      ],
      channelLevelName: [
        {required: true, message: "渠道等级不能为空", trigger: "change"},
      ],
      brokerName: [
        {required: true, message: "渠道经纪人不能为空", trigger: "change"},
      ],
      subscribePrice: [
        {required: true, message: "认购价格不能为空", trigger: "change"},
      ],
      subscribeDate: [
        {required: true, message: "认购日期不能为空", trigger: "change"},
      ],
      signPrice: [
        {required: true, message: "签约价格不能为空", trigger: "change"},
      ],
      signDate: [
        {required: true, message: "签约日期不能为空", trigger: "change"},
      ],
    };
    id: any = null;
    cycleCheckedData: any = [];
    defaultNavList: any = [
      {
        id: 1,
        name: '成交信息'
      },
      {
        id: 2,
        name: '优惠告知书信息'
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
        name: '上传附件'
      },
    ]; // 锚点列表
    navFlag: any = false; // 是否展开锚点
    navList: any = []; // 锚点列表

    // 应收信息表格
    get receiveAchieveVO() {
      let arr: any = []
      if (this.postData.receiveVO.length > 0) {
        let obj = {
          receiveAmount: 0,
          achieveAmount: 0,
          otherChannelFees: 0,
        }
        this.postData.receiveVO.forEach((item: any) => {
          obj.receiveAmount = obj.receiveAmount + parseFloat(item.receiveAmount ? item.receiveAmount : 0);
          obj.achieveAmount = obj.achieveAmount + parseFloat(item.commAmount ? item.commAmount : 0)
            + parseFloat(item.rewardAmount ? item.rewardAmount : 0)
            + parseFloat(item.totalPackageAmount ? item.totalPackageAmount : 0)
            + parseFloat(item.distributionAmount ? item.distributionAmount : 0);
          obj.otherChannelFees = obj.otherChannelFees
            + parseFloat(item.otherChannelFees ? item.otherChannelFees : 0);
        })
        arr.push(obj);
      }
      return arr;
    }

    async created() {
      this.postData.documentVO = (this as any).$root.dictAllList('DealFileType'); // 附件类型
      // 附件类型增加key
      if (this.postData.documentVO.length > 0) {
        this.postData.documentVO.forEach((vo: any) => {
          vo.fileList = []
        })
      }
      // 锚点设置默认值
      this.navList = (this as any).$tool.deepClone(this.defaultNavList);
      if (this.postData.contType === 'NaturalVisitDeal') {
        this.navList = this.navList.filter((list: any) => {
          return list.id !== 5
        })
      }
      this.id = this.$route.query.id;
      if (this.id) {
        const res: any = await get_deal_get__id({id: this.id});
        this.postData = res;
      }
    }

    /*
    * 重置值方法
    * params: objName: string --- data中存在的对象 eg:postData
    * params: keyList: array --- 需要重置对象值的key数组 eg:['a', 'b']
    * */
    resetObject(objName: any = '', keyList: any = []) {
      if (!objName || !(this as any)[objName]) return;
      if (keyList.length > 0) {
        keyList.forEach((item: any) => {
          (this as any)[objName][item] = null;
        })
      } else {
        for (let keys in (this as any)[objName]) {
          (this as any)[objName][keys] = null;
        }
      }
    }

    /*
    * 判断字段是否禁用
    * 条件(both)：1.关联明源数据（全部、部分）； 2.数据是明源带出来的（有值）。
    * params: key: string --- 需要判断的字段
    * params: type: string --- 该字段在明源Vo中的类型：houseVO、customerVOS、dealVO
    * */
    isDisabled(key: any = '', type: any = '') {
      const data: any = this.baseInfoInDeal.myReturnVO;
      if (!key || !type || !data[type]?.[key]) return false;
      let flag = true;
      // 1.是否明源数据标志
      // let signFlag = ['WholeMingYuan', 'NoWholeMingYuan'].includes(data.dataSign);
      let signFlag = this.baseInfoByTerm.exMinyuan;
      // 2.对应明源字段是否有值
      if (data[type][key] && signFlag) {
        flag = false;
      } else {
        flag = true;
      }
      return flag;
    }

    // 选择项目周期
    selectProject() {
      (this as any).$parent.selectProject();
    }

    // 确定选择项目周期
    async finishAddProjectCycle(data: any) {
      // console.log('data', data);
      if (data && data.length > 0) {
        if (data[0].termId !== this.postData.cycleId) {
          // 不相等要清空数据关联数据 + 重新请求接口
          if (this.postData.cycleId) {
            let list: any = [
              'refineModel',
              'oneAgentTeamId',
              'propertyType',
              'buildingId',
              'roomId',
              'contType',
              'contNo',
              'reportId',
              'recordStr',
              'recordState',
              'area',
              'room',
              'hall',
              'kitchen',
              'toilet',
              'propertyNo',
              'sceneSales',
              'signType',
              'stage',
              'dataSign',
            ];
            await this.resetObject('postData', list);
          }
          this.packageIdsList = []; // ids
          this.postData.cycleName = data[0].termName;
          this.postData.cycleId = data[0].termId;
          this.cycleCheckedData = [...data];
          await this.getBaseDealInfo(this.postData.cycleId);
        }
      }
    }

    // 通过项目周期id获取基础信息
    async getBaseDealInfo(id: any) {
      if (!id) return;
      let baseInfo: any = await get_term_getProBaseByTermId__termId({termId: id});
      this.baseInfoByTerm = JSON.parse(JSON.stringify(baseInfo));
      // 给postData赋值对应数据
      if (baseInfo) {
        // 业务模式
        this.postData.businessType = baseInfo.busEnum;
        this.contTypeList = await this.getContTypeList(this.postData.businessType); // 获取合同类型
        this.refineModelList =await this.getRefineModelList(this.postData.businessType); // 获取细分业务模式下拉项
        this.changeBusinessType(this.postData.businessType); // 赋值细分业务模式
        // 是否市场化项目
        this.postData.isMarketProject = baseInfo.exMarket === 1 ? 'Yes' : 'No';
        // 物业类型
        this.propertyTypeList = [];
        const typeList: any = (this as any).$root.dictAllList('Property');
        if (baseInfo.propertyEnums.length > 0 && typeList && typeList.length > 0) {
          let tempArr: any = [];
          baseInfo.propertyEnums.forEach((enu: any) => {
            typeList.forEach((list: any) => {
              if (enu === list.code) {
                tempArr.push(list);
              }
            })
          })
          this.propertyTypeList = tempArr;
        }
        // 是否代销
        this.postData.isConsign = baseInfo.exConsignment === 1 ? 'Yes' : 'No';
        // 成交阶段的选项
        this.dealStageList = [];
        if (baseInfo.termStageEnum) {
          let DealStageList: any = (this as any).$root.dictAllList('DealStage');
          if (DealStageList && DealStageList.length > 0) {
            switch(baseInfo.termStageEnum){
              case 'Subscription':
                // 认购周期 --- 只有认购+签约
                this.dealStageList = DealStageList.filter((item: any) => {
                  return item.code !== 'Recognize';
                });
                break;
              case 'Recognize':
                // 清空优惠告知书 --- 认筹周期需要自己手动添加
                this.postData.offerNoticeVO = [];
                // 认筹周期 --- 全部
                this.dealStageList = JSON.parse(JSON.stringify(DealStageList));
                break;
            }
          }
        }
        // 一手代理团队的选项
        this.firstAgencyCompanyList = [];
        if (baseInfo.firstAgencyCompanys && baseInfo.firstAgencyCompanys.length > 0) {
          this.firstAgencyCompanyList = JSON.parse(JSON.stringify(baseInfo.firstAgencyCompanys));
        }
        // 处理优惠告知书的nav
        this.postData.offerNoticeVO = []; // 先重置优惠告知书的数据
        if (baseInfo.chargeEnum === 'Agent') {
          this.navList = this.navList.filter((item: any) => {
            return item.id !== 3;
          });
        } else {
          this.navList = (this as any).$tool.deepClone(this.defaultNavList);
        }
      }
    }

    // 改变栋座
    changeBuild(value: any) {
      console.log('改变栋座', value);
      // 清空房间号 + 下面的所有信息
      this.postData.roomId = null;
      this.resetData();
    }

    // 清空数据 - 主要是和初始化数据有关的数据
    resetData() {
      this.contNoList = []; // 分销协议编号
      this.packageIdsList = []; // ids
      this.postData.customerVO = []; // 客户信息
      this.postData.offerNoticeVO = []; // 优惠告知书
      let list: any = ['contType', 'contNo', 'recordState', 'recordStr', 'area', 'room', 'hall', 'kitchen',
        'toilet', 'propertyNo', 'signType', 'stage', 'returnRatio', 'subscribePrice', 'subscribeDate',
        'signPrice', 'signDate', 'dataSign', 'agencyId', 'agencyName', 'channelLevel', 'channelLevelName']
      this.resetObject('postData', list);
    }

    // 改变房号
    changeRoom(value: any) {
      // console.log('改变房号', value);
      this.resetData(); // 重置数据
      if (value) {
        this.initPageById(this.baseInfoByTerm.termId, value);
      }
    }

    // 根据项目周期和房号初始化页面数据
    async initPageById(cycleId: any, roomId: any) {
      if (!cycleId || !roomId) return;
      let params: any = {
        cycleId: cycleId,
        roomId: roomId
      };
      let baseInfo: any = await post_pageData_initBasic(params);
      this.baseInfoInDeal = JSON.parse(JSON.stringify(baseInfo || '{}'));
      // console.log('baseInfobaseInfo', this.baseInfoInDeal);
      // 处理数据
      // 纯提示
      if (baseInfo.customerIsDifferent) {
        this.$notify({
          title: '提示',
          message: '明源客户与优惠告知书客户有差异',
          duration: 0
        });
      }
      // 栋座
      if (baseInfo.buildingId && !this.postData.buildingId) {
        this.postData.buildingId = baseInfo.buildingId;
      }
      // 合同类型
      this.postData.contType = baseInfo.contType;
      // 分销协议编号
      this.postData.contNo = null; // 重置选择的编号
      if (baseInfo.contracts && baseInfo.contracts.length > 0) {
        this.contNoList = baseInfo.contracts;
      } else {
        this.contNoList = [];
      }
      // 备案情况
      this.postData.recordState = baseInfo.myReturnVO.dealVO?.recordState;
      // 报备信息
      this.postData.recordStr = baseInfo.recordStr;
      // 建筑面积
      this.postData.area = baseInfo.myReturnVO.houseVO?.area;
      // 户型
      this.postData.room = baseInfo.myReturnVO.houseVO?.room;
      this.postData.hall = baseInfo.myReturnVO.houseVO?.hall;
      this.postData.kitchen = baseInfo.myReturnVO.houseVO?.kitchen;
      this.postData.toilet = baseInfo.myReturnVO.houseVO?.toilet;
      // 预售合同编号
      this.postData.propertyNo = baseInfo.myReturnVO.houseVO?.propertyNo;
      // 签约类型
      this.postData.signType = baseInfo.myReturnVO.dealVO?.signType;
      // 成交阶段
      this.postData.stage = baseInfo.myReturnVO.dealStage;
      // 明源房款回笼比例(%)
      this.postData.returnRatio = baseInfo.myReturnVO.dealVO?.returnRatio;
      // 认购价格
      this.postData.subscribePrice = baseInfo.myReturnVO.dealVO?.subscribePrice;
      // 认购日期
      this.postData.subscribeDate = baseInfo.myReturnVO.dealVO?.subscribeDate;
      // 签约价格
      this.postData.signPrice = baseInfo.myReturnVO.dealVO?.signPrice;
      // 签约日期
      this.postData.signDate = baseInfo.myReturnVO.dealVO?.signDate;
      // 数据标志
      let dataFlagList: any = (this as any).$root.dictAllList('DealDataFlag');
      this.postData.dataSign = null;
      if (dataFlagList && dataFlagList.length > 0 && baseInfo.myReturnVO.dataSign) {
        dataFlagList.forEach((list: any) => {
          if (list.code === baseInfo.myReturnVO.dataSign) {
            this.postData.dataSign = list.name;
          }
        });
      }
      // 分销成交和非分销成交不一样
      if (baseInfo.contType === 'DistriDeal') {
        // 分销成交模式
        // 1. 初始化渠道商/渠道公司
        this.initAgency(baseInfo.agencyVOs, true);
      } else if (['SelfChannelDeal', 'NaturalVisitDeal'].includes(baseInfo.contType)) {
        // 非分销成交模式 --- 自然来访 / 自渠成交
        this.initAgency(baseInfo.agencyVOs, false);
      }
      // 优惠告知书
      this.postData.offerNoticeVO = baseInfo.notice ? baseInfo.notice : [];
      // 客户信息
      this.postData.customerVO = baseInfo.myReturnVO && baseInfo.myReturnVO.customerVOS && baseInfo.myReturnVO.customerVOS.length ? baseInfo.myReturnVO.customerVOS : [];
      // 收派金额
      // this.postData.receiveVO = baseInfo.receiveVOS && baseInfo.receiveVOS.length ? baseInfo.receiveVOS : [];
      let obj = {
        receiveAmount: 200,
        commAmount: 10,
        rewardAmount: 5,
        totalPackageAmount: 2,
        distributionAmount: 1,
      }
      this.postData.receiveVO = [];
      for (let i = 0; i <= 3; i++) {
        this.postData.receiveVO.push(obj);
      }
    }

    // 初始化渠道商(渠道公司) --- 分销成交模式才有渠道商
    initAgency(data: any = [], flag: any = false) {
      if (flag) {
        // 分销成交模式
        if(data.length > 0) {
          let channelList: any = (this as any).$root.dictAllList('ChannelLevel');
          this.postData.agencyId = data[0].agencyId; // 渠道公司Id
          this.postData.agencyName = data[0].agencyName; // 渠道公司
          this.postData.channelLevel = data[0].channelLevel; // 渠道等级Id
          if (channelList && channelList.length > 0 && data[0].channelLevel) {
            channelList.forEach((list: any) => {
              if (list.code === data[0].channelLevel) {
                this.postData.channelLevelName= list.name; // 渠道等级
              }
            });
          }
          this.postData.brokerId= data[0].brokerId; // 渠道经纪人Id
          this.postData.brokerName= data[0].brokerName; // 渠道经纪人
        }
      } else {
        // 非分销成交模式 --- 没有渠道相关信息
        let list: any = ['agencyId', 'agencyName', 'channelLevel', 'channelLevelName'];
        this.resetObject('postData', list); // 重置值
      }
    }

    // 改变细分业务模式
    changeBusinessType(value: any) {
      // console.log(value);
      switch(value){
        case 'TotalBagModel' :
          // 总包
          this.postData.refineModel = 'All';
          break;
        case 'DistriModel' :
          // 分销
          this.postData.refineModel = 'District';
          break;
        case 'TotalBagDistriModel' :
          // 总包+分销
          this.postData.refineModel = '';
          break;
        default:
          this.postData.refineModel = '';
      }
    }

    // 修改合同类型
    changeContType(value: any) {
      if (!value) return;
      if (value === 'DistriDeal') {
        // 如果查询不到此房号的已成交报备信息，用户又选择分销成交
        this.postData.contType = '';
        if (!this.baseInfoInDeal.hasRecord) {
          this.$alert('系统查询不到此房号的已成交报备信息，请先维护报备信息！', '提示', {
            confirmButtonText: '确定'
          });
          return;
        }
      } else {
        // 不是分销成交
        // 1.清空数据
        // 2.请求接口获取数据
      }
    }

    // 是否垫佣是根据对应的分销协议来判断
    changeContNo(value: any) {
      this.postData.isMat = null;
      this.packageIdsList = [];
      if (!value) return;
      if (this.contNoList.length > 0) {
        this.contNoList.forEach((item: any) => {
          if (item.contractNo === value) {
            // 是否垫佣
            this.postData.isMat = item.advancementSituation;
            // 分销模式下获取分销协议返回的收派套餐id
            this.packageIdsList = item.packageMxIds && item.packageMxIds.length ? item.packageMxIds : [];
          }
        })
      }
    }

    // 选择收派套餐
    selectPackage(scope: any) {
      // console.log('选择收派套餐', scope);
      let params: any = {
        hasRecord: this.baseInfoInDeal.hasRecord, // 是否有成交报备(是否分销成交)
        idList: this.packageIdsList, // 分销成交 --- 选择分销协议后的ids
        contNo: this.postData.contNo, // 分销协议编号
        type: scope.row.type, // 标题类型
        postObj: {
          contractEnum: this.postData.contType, // 合同类型
          propertyEnum: this.postData.propertyType, // 物业类型
          subdivideEnum: this.postData.refineModel, // 细分业务
          termId: this.postData.cycleId, // 立项周期ID
        }, // 非分销需要获取id的参数
      };
      (this as any).$parent.selectPackage(params);
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

    // 添加优惠告知书
    handleAddNotice() {
      if(this.baseInfoByTerm.termId) {
        (this as any).$parent.handleAddNotice(this.baseInfoByTerm);
      }
    }

    // 确定选择优惠告知书
    async finishAddNotice(data: any) {
      if (data.length === 0) return;
      if (this.postData.offerNoticeVO.length > 0) {
        let flag = false;
        flag = this.postData.offerNoticeVO.some((item: any) => {
          return item.id === data[0].id;
        })
        if (flag) {
          this.$message.error('已经存在相同的优惠告知书，请重新选择！');
          return;
        } else {
          this.postData.offerNoticeVO.push(
            {
              ...data,
              addType: 'manual'
            }
          );
        }
      } else {
        this.postData.offerNoticeVO.push(
          {
            ...data,
            addType: 'manual'
          }
        );
      }
      (this as any).$parent.handleAddNotice(this.baseInfoByTerm);
    }

    // 删除优惠告知书
    removeNotice(scope: any) {
      // console.log(scope);
      this.postData.offerNoticeVO = this.postData.offerNoticeVO.filter((item: any) => {
        return item.id !== scope.row.id;
      })
    }

    // 预览-优惠告知书
    previewNotice(scope: any) {
      console.log(scope);
    }

    // 添加客户
    handleAddCustomer() {
      (this as any).$parent.handleAddCustomer();
    }

    // 确定选择客户
    async finishAddCustomer(data: any) {
      // console.log('data', data);
      if (data.length === 0) return
      if (this.postData.customerVO.length > 0) {
        let flag = false;
        flag = this.postData.customerVO.some((item: any) => {
          return item.id === data[0].id;
        })
        if (flag) {
          this.$message.error('已经存在相同的客户，请重新选择！');
          return;
        } else {
          this.postData.customerVO.push(...data);
        }
      } else {
        this.postData.customerVO.push(...data);
      }
      (this as any).$parent.handleAddCustomer();
    }

    // 确定选择收派套餐
    async finishAddReceivePackage(data: any) {
      // console.log('data', data);
      if (data.length === 0) return;
      if (this.postData.receiveVO.length > 0) {
        let flag = false;
        flag = this.postData.receiveVO.some((item: any) => {
          return item.id === data[0].id;
        })
        if (flag) {
          this.$message.error('已经存在相同的收派套餐，请重新选择！');
          return;
        } else {
          this.postData.receiveVO.push(...data);
        }
      } else {
        this.postData.receiveVO.push(...data);
      }
      (this as any).$parent.selectPackage();
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
        this.postData.customerVO = this.postData.customerVO.filter((item: any) => {
          return item.id !== scope.row.id;
        });
      } else if (type === 'broker') {
        // 删除渠道经纪人逻辑
        console.log(222);
      }
    }

    getNewFile(val: any) {
      console.log(val);
    }

    // 取消
    async cancel() {
      this.$goto({
        path: "/dealReport/list"
      });
    }

    // 保存
    async handleSave(type: any) {
      console.log('type', type);
      // type: save --- 保存； submit --- 提交
      (this.$refs["ruleForm"] as ElForm).validate(this.addSave);
    }

    @NoRepeatHttp()
    async addSave(valid: any) {
      if (valid) {
        if (this.id) {
          let postData: any = {
            id: this.id,
            modelName: this.postData.modelName,
            buModelContTypeList: []
          };
          if (this.postData.buModelContTypeList.length > 0) {
            this.postData.buModelContTypeList.forEach((list: any) => {
              postData.buModelContTypeList.push(
                {
                  contType: list
                }
              )
            })
          }
          await post_deal_updateDealBasicInf(postData);
          this.$message.success("编辑成功");
          this.$goto({
            path: "/dealReport/list",
          });
        } else {
          let postData: any = {
            modelName: this.postData.modelName,
            buModelContTypeList: []
          };
          if (this.postData.buModelContTypeList.length > 0) {
            this.postData.buModelContTypeList.forEach((list: any) => {
              postData.buModelContTypeList.push(
                {
                  contType: list
                }
              )
            })
          }
          await post_deal_entryDealBasicInf(postData);
          this.$message.success("新增成功");
          this.$goto({
            path: "/dealReport/list",
          });
        }
      } else {
        this.$message.warning("请先填好数据再保存");
        return false;
      }
    }

    // 查看来访/成交确认信息
    handleViewDealInfo() {
      (this as any).$parent.handleViewDealInfo();
    }
  }
</script>
<style lang="scss" scoped>
  .add-all-wrapper {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 10px;
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

  .manager-list {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;

    div {
      flex: 1;
    }
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

  .btn-top {
    box-sizing: border-box;
    margin-top: 20px;
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
    right: 20px;
    top: 30%;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    //align-items: center;
    border: 1px solid #ffffff;
    z-index: 200;

    .nav-icon {
      height: 40px;
      line-height: 42px;
      cursor: pointer;
      background-color: #2B4558;
      color: #ffffff;
      font-size: 29px;
    }

    .nav-wrapper {
      width: 133px;
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
        height: 40px;
        line-height: 40px;
        text-align: center;
        box-sizing: border-box;
        padding: 0px 10px;
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
