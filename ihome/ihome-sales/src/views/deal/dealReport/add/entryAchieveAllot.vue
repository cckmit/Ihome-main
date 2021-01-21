<!--
 * @Description:
 * @version: 
 * @Author: lsj
 * @Date: 2020-12-23 14:20:30
 * @LastEditors: lsj
 * @LastEditTime: 2021-01-19 19:16:45
-->
<template>
  <ih-page class="text-left">
    <el-form
      @submit.native.prevent
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
          <el-form-item label="成交报告编号" :prop="!!postData.dealCode ? 'dealCode' : ' '">
            <el-input
              disabled
              placeholder="成交报告编号"
              v-model="postData.dealCode"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目周期" prop="cycleId">
            <el-input placeholder="请选择项目周期" readonly v-model="postData.cycleName" @click.native.prevent="selectProject">
              <el-button slot="append" icon="el-icon-search"></el-button>
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
              @change="changeRefineModel"
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
          <el-form-item label="一手代理公司" :prop="oneAgentRequiredFlag ? 'oneAgentTeamId' : 'notEmpty'">
            <el-select
              v-model="postData.oneAgentTeamId"
              clearable
              @change="changeSelectAgent"
              placeholder="请选择一手代理公司"
              class="width--100">
              <el-option
                v-for="item in firstAgencyCompanyList"
                :key="item.id"
                :label="item.name"
                :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="物业类型" prop="propertyType">
            <el-select
              v-model="postData.propertyType"
              clearable
              placeholder="请选择物业类型"
              @change="changePropertyType"
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
              :propertyEnum="postData.propertyType"
              :isCascade="true"
              cascadeType="build"
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
        <el-col :span="6" v-if="postData.contType === 'DistriDeal'">
          <el-form-item label="渠道公司" :prop="postData.contType === 'DistriDeal' ? 'agencyName' : 'notEmpty'">
            <div v-if="baseInfoInDeal.hasRecord">
              <el-input
                v-model="postData.agencyName"
                :disabled="baseInfoInDeal.hasRecord"
                placeholder=""></el-input>
            </div>
            <div v-else>
              <el-input
                placeholder="请选择渠道公司"
                readonly v-model="postData.agencyName" @click.native.prevent="selectAgency">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="postData.contType === 'DistriDeal'">
          <el-form-item label="渠道等级" :prop="postData.contType === 'DistriDeal' ? 'channelLevelName' : 'notEmpty'">
            <el-input
              v-model="postData.channelLevelName"
              disabled
              placeholder=""></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="postData.contType === 'DistriDeal'">
          <el-form-item label="经纪人" :prop="postData.contType === 'DistriDeal' ? 'brokerName' : 'notEmpty'">
            <div v-if="baseInfoInDeal.hasRecord">
              <el-input
                v-model="postData.brokerName"
                :disabled="baseInfoInDeal.hasRecord"
                placeholder=""></el-input>
            </div>
            <div v-else>
              <el-input
                placeholder="请选择经纪人"
                readonly v-model="postData.brokerName" @click.native.prevent="selectBroker">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="postData.contType === 'DistriDeal'">
          <el-form-item label="分销协议编号" :prop="postData.contType === 'DistriDeal' ? 'contNo' : 'notEmpty'">
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
        <el-col :span="6" v-if="postData.contType === 'DistriDeal'">
          <el-form-item label="是否垫佣" :prop="postData.contType === 'DistriDeal' ? 'isMat' : 'notEmpty'">
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
        <el-col :span="6" v-if="postData.contType === 'DistriDeal'">
          <el-form-item label="报备信息" :prop="postData.contType === 'DistriDeal' ? 'recordStr' : 'notEmpty'">
            <el-input
              v-model="postData.recordStr"
              :disabled="baseInfoInDeal.hasRecord"
              placeholder=""></el-input>
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
                <el-input
                  v-digits="0"
                  :disabled="isDisabled('room', 'houseVO')"
                  v-model="postData.room">
                  <div slot="append">室</div>
                </el-input>
              </div>
              <div>
                <el-input
                  v-digits="0"
                  :disabled="isDisabled('hall', 'houseVO')"
                  v-model="postData.hall">
                  <div slot="append">厅</div>
                </el-input>
              </div>
              <div>
                <el-input
                  v-digits="0"
                  :disabled="isDisabled('toilet', 'houseVO')"
                  v-model="postData.toilet">
                  <div slot="append">卫</div>
                </el-input>
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
          <el-form-item label="认购价格" :prop="['Subscribe', 'SignUp'].includes(postData.stage) ? 'subscribePrice' : 'notEmpty'">
            <el-input
              v-digits="2"
              @blur="changePrice($event, 'SubscribePrice')"
              :disabled="isDisabled('subscribePrice', 'dealVO')"
              v-model="postData.subscribePrice"
              placeholder="请输入认购价格"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="认购日期" :prop="['Subscribe', 'SignUp'].includes(postData.stage) ? 'subscribeDate' : 'notEmpty'">
            <el-date-picker
              style="width: 100%"
              :disabled="isDisabled('subscribeDate', 'dealVO')"
              v-model="postData.subscribeDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择认购日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="签约价格" :prop="['SignUp'].includes(postData.stage) ? 'signPrice' : 'notEmpty'">
            <el-input
              v-digits="2"
              @blur="changePrice($event, 'SignPrice')"
              :disabled="isDisabled('signPrice', 'dealVO')"
              v-model="postData.signPrice"
              placeholder="请输入签约价格"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="签约日期" :prop="['SignUp'].includes(postData.stage) ? 'signDate' : 'notEmpty'">
            <el-date-picker
              style="width: 100%"
              :disabled="isDisabled('signDate', 'dealVO')"
              v-model="postData.signDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择签约日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="成交组织" prop="dealOrgName">
            <el-input v-model="postData.dealOrgName" disabled placeholder="项目周期自动带出"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="!!id">
          <el-form-item label="录入人" :prop="!!id ? 'entryPerson' : 'notEmpty'">
            <el-input v-model="postData.entryPerson" disabled placeholder="录入人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="!!id">
          <el-form-item label="录入日期" :prop="!!id ? 'entryDate' : ' '">
            <el-date-picker
              style="width: 100%"
              v-model="postData.entryDate"
              type="date"
              disabled
              value-format="yyyy-MM-dd"
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
          <el-form-item label="成交状态" :prop="!!id ? 'status' : 'notEmpty'">
            <el-input v-model="postData.status" disabled placeholder="成交状态"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div id="anchor-3" v-if="baseInfoByTerm.chargeEnum !== 'Agent'">
      <p class="ih-info-title">优惠告知书信息</p>
      <el-row style="padding-left: 20px">
        <el-col>
          <div
            v-if="postData.roomId && !baseInfoInDeal.notice.length"
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
                  style="color: #f66"
                  v-if="!!scope.row.addType && scope.$index === 0"
                  class="margin-right-10"
                  type="primary"
                  @click.native.prevent="removeNotice(scope)"
                >删除
                </el-link>
                <el-link
                  class="margin-right-10"
                  type="success"
                  @click.native.prevent="$parent.previewNotice(scope)"
                >预览
                </el-link>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <p id="anchor-4" class="ih-info-title">客户信息</p>
    <el-row style="padding-left: 20px">
      <el-col>
        <div
          v-if="!baseInfoInDeal.customerAddVOS.length && !baseInfoInDeal.isMultipleNotice && postData.roomId"
          class="add-all-wrapper">
          <el-button type="success" @click="handleAddCustomer">添加客户</el-button>
        </div>
        <el-table
          class="ih-table"
          :data="postData.customerVO">
          <el-table-column prop="customerNo" label="客户编号" min-width="150"></el-table-column>
          <el-table-column prop="customerType" label="客户类型" min-width="120">
            <template slot-scope="scope">
              <div>{{$root.dictAllName(scope.row.customerType, 'CustType')}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="customerName" label="客户名称" min-width="120"></el-table-column>
          <el-table-column prop="customerPhone" label="手机号码" min-width="120"></el-table-column>
          <el-table-column prop="cardType" label="证件类型" min-width="120">
            <template slot-scope="scope">
              <div>{{$root.dictAllName(scope.row.cardType, 'CardType')}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="cardNo" label="证件编号" min-width="150"></el-table-column>
          <el-table-column prop="email" label="邮箱" min-width="120"></el-table-column>
          <el-table-column
            v-if="!baseInfoInDeal.customerAddVOS.length && !baseInfoInDeal.isMultipleNotice"
            fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-link
                style="color: #f66"
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
    <div class="receive-wrapper" id="anchor-7">
      <p class="ih-info-title">收派金额</p>
      <div>计算方式</div>
      <div>
        <el-select
          v-model="postData.calculation"
          @change="changeCalculation"
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
          :summary-method="$parent.getReceiveSummaries"
          :data="postData.receiveVO">
          <el-table-column prop="type" label="类型" fixed min-width="120">
            <template slot-scope="scope">
              <div>{{scope.row.type === 'ServiceFee' ? '服务费' : '代理费'}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="partyACustomerName" label="甲方/客户" min-width="120"></el-table-column>
          <el-table-column prop="packageId" label="收派套餐" min-width="140">
            <template slot-scope="scope">
              <div v-if="postData.calculation === 'Auto'">
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
                        <el-table-column label="类型" prop="typeName" min-width="100"></el-table-column>
                        <el-table-column label="合同类型" prop="contractEnum" min-width="100">
                          <template slot-scope="scope">
                            <div>{{$root.dictAllName(scope.row.contractEnum, 'ContType')}}</div>
                          </template>
                        </el-table-column>
                        <el-table-column label="客户类型" prop="transactionEnum" min-width="100">
                          <template slot-scope="scope">
                            <div>{{$root.dictAllName(scope.row.transactionEnum, 'Transaction')}}</div>
                          </template>
                        </el-table-column>
                        <el-table-column label="条件" prop="condition" min-width="200"></el-table-column>
                        <el-table-column label="应收金额" prop="receivableAmout" min-width="200">
                          <template slot-scope="scope">
                            <div>金额：{{scope.row.receivableAmout}}</div>
                            <div>点数：{{scope.row.receivablePoint}}</div>
                          </template>
                        </el-table-column>
                        <el-table-column label="派发佣金" prop="sendAmount" min-width="200">
                          <template slot-scope="scope">
                            <div>金额：{{scope.row.sendAmount}}</div>
                            <div>点数：{{scope.row.sendPoint}}</div>
                          </template>
                        </el-table-column>
                        <el-table-column label="派发内场奖励" prop="sendInAmount" min-width="200">
                          <template slot-scope="scope">
                            <div>金额：{{scope.row.sendInAmount}}</div>
                            <div>点数：{{scope.row.sendInPoint}}</div>
                          </template>
                        </el-table-column>
                        <el-table-column label="总包业绩" prop="generalAchieveAmount" min-width="200">
                          <template slot-scope="scope">
                            <div>金额：{{scope.row.generalAchieveAmount}}</div>
                            <div>点数：{{scope.row.generalAchievePoint}}</div>
                          </template>
                        </el-table-column>
                        <el-table-column label="分销业绩" prop="distributeAchieveAmount" min-width="200">
                          <template slot-scope="scope">
                            <div>金额：{{scope.row.distributeAchieveAmount}}</div>
                            <div>点数：{{scope.row.distributeAchievePoint}}</div>
                          </template>
                        </el-table-column>
                        <el-table-column label="其他渠道费用" prop="otherChannelAmount" min-width="160">
                          <template slot-scope="scope">
                            <div>金额：{{scope.row.otherChannelAmount}}</div>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                    <el-input
                      readonly
                      placeholder="收派标准">
                      <el-button slot="append" icon="el-icon-edit-outline"
                                 @click.native.prevent="selectPackage(scope)"></el-button>
                    </el-input>
                  </el-tooltip>
                </div>
              </div>
              <div v-else>---</div>
            </template>
          </el-table-column>
          <el-table-column prop="receiveAmount" label="应收金额" min-width="180">
            <template slot-scope="scope">
              <el-input
                v-digits="2"
                @input="changeReceiveItem($event, scope.row, 'receiveAmount')"
                v-model="scope.row.receiveAmount"
                :disabled="postData.calculation === 'Auto'"
                placeholder="应收金额"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="commAmount" label="派发佣金金额" min-width="180">
            <template slot-scope="scope">
              <el-input
                v-digits="2"
                @input="changeReceiveItem($event, scope.row, 'commAmount')"
                v-model="scope.row.commAmount"
                :disabled="postData.calculation === 'Auto'"
                placeholder="派发佣金金额"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="rewardAmount" label="派发内场奖励金额" min-width="180">
            <template slot-scope="scope">
              <el-input
                v-digits="2"
                @input="changeReceiveItem($event, scope.row, 'rewardAmount')"
                v-model="scope.row.rewardAmount"
                :disabled="postData.calculation === 'Auto'"
                placeholder="派发内场奖励金额"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="totalPackageAmount" label="总包业绩金额" min-width="180">
            <template slot-scope="scope">
              <el-input
                v-digits="2"
                @input="changeReceiveItem($event, scope.row, 'totalPackageAmount')"
                v-model="scope.row.totalPackageAmount"
                :disabled="(postData.calculation === 'Auto' || postData.businessType !== 'DistriModel')"
                placeholder="总包业绩金额"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="distributionAmount" label="分销业绩金额" min-width="180">
            <template slot-scope="scope">
              <el-input
                v-digits="2"
                @input="changeReceiveItem($event, scope.row, 'distributionAmount')"
                v-model="scope.row.distributionAmount"
                :disabled="(postData.calculation === 'Auto' || postData.businessType !== 'TotalBagModel')"
                placeholder="分销业绩金额"></el-input>
            </template>
          </el-table-column>
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
    <div v-if="postData.receiveVO.length">
      <div class="divider-padding" v-if="addFlag">
        <div class="divider-tip color-blur">
          <div>完善收派金额后请点击下方按钮初始化加载对外拆佣及平台费用数据</div>
          <div class="btn">
            <el-button class="btn-color" @click="handleLoadCommission('add')">点击加载对外拆佣及平台费用数据</el-button>
          </div>
        </div>
      </div>
      <div class="divider-padding border-color-red" v-if="editFlag">
        <div class="divider-tip color-red">
          <div>收派金额发生变动，业绩需要初始化重新分配，请点击下方刷新按钮重新初始化对外拆佣及平台费用数据</div>
          <div class="btn">
            <el-button type="danger" @click="handleLoadCommission('refresh')">刷新</el-button>
          </div>
        </div>
      </div>
      <div class="divider-padding border-color-none" v-if="tipsFlag">
        <el-divider>{{dividerTips}}</el-divider>
      </div>
    </div>
    <p id="anchor-8" class="ih-info-title">对外拆佣</p>
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
                :disabled="postData.calculation === 'Auto'"
                v-model="scope.row.target"
                @change="changeCommissionTarget($event, scope.row)"
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
          <el-table-column prop="agencyName" label="收款方" min-width="120">
            <template slot-scope="scope">
              <div v-if="postData.calculation === 'Auto'">
                <el-input placeholder="收款方" disabled v-model="scope.row.agencyName"></el-input>
              </div>
              <div v-else>
                <div v-if="scope.row.target === 'Personal'">
                  <el-input placeholder="请输入收款方" v-model="scope.row.agencyName"></el-input>
                </div>
                <div v-if="scope.row.target === 'AgentCompany'">
                  <el-input placeholder="" disabled v-model="scope.row.agencyName"></el-input>
                </div>
                <div v-if="scope.row.target === 'ChannelCompany'">
                  <el-input placeholder="请选择收款方" readonly v-model="scope.row.agencyName">
                    <el-button slot="append" icon="el-icon-search" @click.native.prevent="selectAgencyName"></el-button>
                  </el-input>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="feeType" label="费用类型" min-width="120">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.feeType"
                :disabled="postData.calculation === 'Auto'"
                placeholder="费用类型"
                @change="changeFeeType($event, scope.row)"
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
              <div v-if="postData.calculation === 'Auto'">
                <el-input placeholder="" disabled v-model="scope.row.partyACustomerName"></el-input>
              </div>
              <div v-else>
                <div v-if="scope.row.feeType === 'ServiceFee'">
                  <el-input placeholder="" disabled v-model="scope.row.partyACustomerName"></el-input>
                </div>
                <div v-if="scope.row.feeType === 'AgencyFee'">
                  <el-select
                    :disabled="postData.calculation === 'Auto'"
                    v-model="scope.row.partyACustomer"
                    @change="handleSelectCustomer($event, scope.row)"
                    placeholder="请选择">
                    <el-option
                      v-for="(item, index) in commissionCustomerList" :key="index"
                      :label="item.partyACustomerName" :value="item.partyACustomer"></el-option>
                  </el-select>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="金额" min-width="120">
            <template slot-scope="scope">
              <el-input
                v-digits="2"
                placeholder="金额"
                :disabled="postData.calculation === 'Auto'"
                v-model="scope.row.amount"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="remarks" label="备注" min-width="120">
            <template slot-scope="scope">
              <el-input
                :disabled="postData.calculation === 'Auto'"
                v-model="scope.row.remarks" placeholder="备注"/>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100" v-if="postData.calculation !== 'Auto'">
            <template slot-scope="scope">
              <el-link
                class="margin-right-10"
                type="primary"
                @click.native.prevent="deleteAdd(scope, 'commission')"
              >删除
              </el-link>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <p id="anchor-9" class="ih-info-title">平台费用</p>
    <div v-if="postData.businessType !== 'DistriModel'">
      <div class="ih-type-wrapper">
        <div class="title">总包</div>
        <el-button
          v-if="postData.achieveTotalBagList.length"
          type="success"
          @click="handleAddAchieve('total')">新增角色</el-button>
      </div>
      <el-row style="padding-left: 20px">
        <el-col>
          <el-table
            class="ih-table"
            show-summary
            sum-text="合计金额"
            :summary-method="getAchieveSummaries"
            :data="postData.achieveTotalBagList">
            <el-table-column prop="roleType" label="角色类型" min-width="120">
              <template slot-scope="scope">
                <div>{{$root.dictAllName(scope.row.roleType, 'DealRole')}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="roleAchieveCap" label="角色业绩上限" min-width="150"></el-table-column>
            <el-table-column prop="rolerName" label="角色人" min-width="150">
              <template slot-scope="scope">
                <div v-if="scope.row.roleType === 'BranchOffice'">——</div>
                <div v-else>{{scope.row.rolerName}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="corporateAchieve" label="角色人业绩" min-width="150"></el-table-column>
            <el-table-column prop="roleAchieveRatio" label="角色人业绩比例(%)" min-width="150"></el-table-column>
            <el-table-column prop="commFees" label="拆佣金额" min-width="150"></el-table-column>
            <el-table-column prop="commFeesRatio" label="拆佣比例(%)" min-width="110"></el-table-column>
            <el-table-column prop="belongOrgName" label="店组" min-width="100">
              <template slot-scope="scope">
                <div v-if="scope.row.roleType === 'BranchOffice'">{{postData.dealOrgName}}</div>
                <div v-else>{{scope.row.belongOrgName}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="managerAchieveList" label="管理岗" min-width="210">
              <template slot-scope="scope">
                <div class="manager-list" v-for="(item, index) in scope.row.managerAchieveList" :key="index">
                  <div class="fee">{{item.achieveFees}}</div>
                  <div class="ratio">{{item.achieveFeesRatio}}</div>
                  <div class="name">
                    <span>{{item.managerName}}</span>
                    (<span>{{item.managerPosition}}</span>)
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="130">
              <template slot-scope="scope">
                <el-link
                  class="margin-right-10"
                  type="primary"
                  @click.native.prevent="editAchieveTotalBag(scope, 'total')"
                >修改
                </el-link>
                <el-link
                  style="color: #f66"
                  v-if="scope.row.roleType !== 'BranchOffice'"
                  class="margin-right-10"
                  type="error"
                  @click.native.prevent="deleteAchieveTotalBag(scope, 'total')"
                >移除
                </el-link>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div v-if="postData.businessType !== 'TotalBagModel'">
      <div class="ih-type-wrapper">
        <div class="title">分销</div>
        <el-button
          v-if="!isSameFlag && postData.achieveTotalBagList.length"
          type="success"
          @click="handleAddAchieve('distri')">新增角色</el-button>
      </div>
      <el-row style="padding-left: 20px">
        <el-col>
          <el-table
            class="ih-table"
            show-summary
            sum-text="合计金额"
            :summary-method="getAchieveSummaries"
            :data="postData.achieveDistriList">
            <el-table-column prop="roleType" label="角色类型" min-width="120">
              <template slot-scope="scope">
                <div>{{$root.dictAllName(scope.row.roleType, 'DealRole')}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="roleAchieveCap" label="角色业绩上限" min-width="150"></el-table-column>
            <el-table-column prop="rolerName" label="角色人" min-width="150">
              <template slot-scope="scope">
                <div v-if="scope.row.roleType === 'BranchOffice'">——</div>
                <div v-else>{{scope.row.rolerName}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="corporateAchieve" label="角色人业绩" min-width="150"></el-table-column>
            <el-table-column prop="roleAchieveRatio" label="角色人业绩比例(%)" min-width="150"></el-table-column>
            <el-table-column prop="commFees" label="拆佣金额" min-width="150"></el-table-column>
            <el-table-column prop="commFeesRatio" label="拆佣比例(%)" min-width="110"></el-table-column>
            <el-table-column prop="belongOrgName" label="店组" min-width="100">
              <template slot-scope="scope">
                <div v-if="scope.row.roleType === 'BranchOffice'">{{postData.dealOrgName}}</div>
                <div v-else>{{scope.row.belongOrgName}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="managerAchieveList" label="管理岗" min-width="210">
              <template slot-scope="scope">
                <div class="manager-list" v-for="(item, index) in scope.row.managerAchieveList" :key="index">
                  <div class="fee">{{item.achieveFees}}</div>
                  <div class="ratio">{{item.achieveFeesRatio}}%</div>
                  <div class="name">
                    <span>{{item.managerName}}</span>
                    (<span>{{item.managerPosition}}</span>)
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              v-if="!isSameFlag"
              fixed="right"
              label="操作"
              width="130">
              <template slot-scope="scope">
                <el-link
                  class="margin-right-10"
                  type="primary"
                  @click.native.prevent="editAchieveTotalBag(scope, 'distri')"
                >修改
                </el-link>
                <el-link
                  style="color: #f66"
                  v-if="scope.row.roleType !== 'BranchOffice'"
                  class="margin-right-10"
                  type="error"
                  @click.native.prevent="deleteAchieveTotalBag(scope, 'distri')"
                >移除
                </el-link>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <p id="anchor-6" class="ih-info-title">上传附件</p>
    <el-row style="padding-left: 20px">
      <el-col>
        <div class="add-all-wrapper" v-if="baseInfoByTerm.exMinyuan">
          <el-button type="success" @click="handleViewDealInfo">查看来访/成交确认信息</el-button>
        </div>
        <el-table
          class="ih-table"
          :data="postData.documentVO">
          <el-table-column prop="name" label="类型" width="200"></el-table-column>
          <el-table-column prop="fileName" label="附件" min-width="300">
            <template slot-scope="scope">
              <IhUpload
                @newFileList="getNewFile"
                :isCrop="false"
                :isMove="false"
                :removePermi="true"
                size="100px"
                :limit="100"
                :file-size="10"
                :file-list.sync="scope.row.defaultFileList"
                :file-type="scope.row.code"
              ></IhUpload>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="text-center btn-top">
      <el-button type="primary" @click="handleSave('save')">保存</el-button>
      <el-button type="success" @click="handleSave('submit')">提交</el-button>
      <el-button @click="cancel()">取消</el-button>
    </div>
    <div class="nav-box">
      <div class="nav-icon el-button--success" @click="navFlag = !navFlag " :title="navFlag ? '收起' : '展开'">
        <i :class="navFlag ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'"></i>
      </div>
      <div :class="navFlag ? 'nav-wrapper' : 'nav-wrapper nav-transition'">
        <div
          @click="handleGoAnchor(item.id, index)"
          v-for="(item, index) in navList"
          :key="item.id"
          :class="currentActiveIndex === index ? 'el-button--warning' : ''"
          class="nav-item el-button--success">{{item.name}}</div>
      </div>
    </div>
    <ih-dialog :show="dialogAddAgentCompany" desc="选择渠道公司列表">
      <AgentCompanyList
        :data="selectableChannelIds"
        @cancel="() => (dialogAddAgentCompany = false)"
        @finish="
            (data) => {
              finishAddAgentCompany(data);
            }
          "
      />
    </ih-dialog>
    <ih-dialog :show="dialogEditDealAchieve" desc="新增/修改角色业绩">
      <EditDealAchieve
        :data="editDealAchieveData"
        @cancel="() => (dialogEditDealAchieve = false)"
        @finish="
            (data) => {
              finishEditDealAchieve(data);
            }
          "/>
    </ih-dialog>
  </ih-page>
</template>
<script lang="ts">
  import {Component, Vue, Prop} from "vue-property-decorator";
  import AgentCompanyList from "@/views/deal/dealReport/dialog/agentCompanyList.vue";
  import EditDealAchieve from "@/views/deal/dealReport/dialog/editDealAchieve.vue";
  import {
    post_pageData_initBasic, // 选择周期、房号后初始化页面
    post_pageData_initChannelComm, // 初始化对外拆佣表格数据
    post_pageData_initAchieve, // 初始化平台费用表格数据
    get_deal_get__id, // 编辑功能
    post_deal_achieveAllotEntry, // 文员岗 - 录入成交信息
    post_deal_updateAchieveAllot, // 文员岗 - 修改成交信息
    post_pageData_recalculateAchieve, // 重新计算平台费用部分
    post_pageData_recalculateAchieveComm, // 总包分销一致时，重新计算平台费用的拆佣金额及拆用比例
    post_pageData_calculateReceiveAmount, // 重算收派金额
    post_pageData_convertCustomers // 通过优惠告知书查询客户
  } from "@/api/deal";
  import {
    get_term_getProBaseByTermId__termId, // 通过项目周期获取成交基础信息
  } from "@/api/project";
  import {
    get_org_get__id, // 通过组织id获取组织name
  } from "@/api/system";
  import {Form as ElForm} from "element-ui";
  import {NoRepeatHttp} from "ihome-common/util/aop/no-repeat-http";

  @Component({
    components: {
      AgentCompanyList,
      EditDealAchieve
    }
  })
  export default class EntryAchieveAllot extends Vue {
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
      },
      customerAddVOS: [], // 客户信息
      selectableChannelIds: [], // 可选的渠道商ids
      isMultipleNotice: false, // 同房号是否存在多份优惠告知书
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
      oneAgentTeamId: null, // 一手代理团队Id
      oneAgentTeamName: null, // 一手代理团队name
      isMarketProject: null,
      dealOrgId: null, // 成交组织id
      dealOrgName: null, // 成交组织name
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
      toilet: null,
      sceneSales: null, // 现场销售
      offerNoticeVO: [], // 优惠告知书
      customerVO: [], // 客户信息
      agencyVO: [], // 渠道信息
      receiveVO: [], // 收派金额
      receiveAchieveVO: [], // 应收信息
      documentVO: [], // 附件信息
      commissionInfoList: [], // 对外拆佣
      achieveTotalBagList: [], // 平台费用 - 总包
      achieveDistriList: [], // 平台费用 - 分销
      calculation: 'Auto', // 计算方式 - 默认自动
    };
    tempReceiveVO: any = []; // 临时收派金额信息
    tempSignPrice: any = null; // 临时签约价格
    tempSubscribePrice: any = null; // 临时认购价格
    commissionCustomerList: any = []; // 初始化费用来源的甲方信息 --- 代理费
    commissionServiceFeeObj: any = []; // 初始化费用来源的甲方信息 --- 服务费
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
      dealOrgName: [
        {required: true, message: "成交组织不能为空", trigger: "change"},
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
      contNo: [
        {required: true, message: "分销协议必选", trigger: "change"},
      ],
      subscribePrice: [
        {required: true, message: "认购价格不能为空", trigger: ["change", "blur"]},
      ],
      subscribeDate: [
        {required: true, message: "认购日期不能为空", trigger: "change"},
      ],
      signPrice: [
        {required: true, message: "签约价格不能为空", trigger: ["change", "blur"]},
      ],
      signDate: [
        {required: true, message: "签约日期不能为空", trigger: "change"},
      ],
      notEmpty: []
    };
    id: any = null;
    cycleCheckedData: any = [];
    dialogAddAgentCompany: any = false;
    companyCheckedData: any = [];
    dialogEditDealAchieve: any = false;
    defaultNavList: any = [
      {
        id: 1,
        name: '成交信息'
      },
      {
        id: 3,
        name: '优惠告知书'
      },
      {
        id: 4,
        name: '客户信息'
      },
      {
        id: 7,
        name: '收派金额'
      },
      {
        id: 8,
        name: '对外拆佣'
      },
      {
        id: 9,
        name: '平台费用'
      },
      {
        id: 6,
        name: '上传附件'
      },
    ]; // 锚点列表
    navFlag: any = false; // 是否展开锚点
    navList: any = []; // 锚点列表
    currentActiveIndex: any = 0; // 当前激活的nav
    currentReceiveIndex: any = null; // 当前选中的收派金额列表数据
    addFlag: any = false; // 新增页面 --- 提示框
    editFlag: any = false; // 编辑页面 --- 提示框
    tipsFlag: any = false; // 加载拆佣情况 --- 提示框
    dividerTips: any = '业绩分配'; // 分割标题：业绩分配; 刷新成功; 加载成功
    selectableChannelIds: any = []; // 可选渠道商id
    editDealAchieveData: any = {
      isSameFlag: false, // 是否分销与总包一致
      currentEditItem: {
        roleType: null
      }, // 平台费用要修改的项
      btnType: null, // 按钮类型-新增/修改
      type: null, // 平台费用类型-总包/分销 --- 用于角色类型的下拉选择
      totalBag: [], // 平台费用——总包部分
      distri: [], // 平台费用——分销部分
      distriRoles: [], // 平台费用——分销部分——可选角色
      totablBagRoles: [], // 平台费用——总包部分——可选角色
      totalAmount: 0, // 收派金额列表中 （派发佣金合计金额+派发内场奖励合计金额）
    }; // 平台费用 --- 新增/编辑弹窗的数据
    currentChangeObj: any = {
      type: null, // 当前选择修改的类型：总包/分销
      index: null // 当前选择修改的序号：总包/分销
    };
    isSameFlag: any = false; // 是否分销与总包一致
    oneAgentRequiredFlag: any = false; // 收派金额 - 派发内场奖励金额合计大于0，为true

    // 应收信息表格
    get receiveAchieveVO() {
      let arr: any = [];
      let rewardTotal: any = 0; // 派发内场总金额合计，用于判断一手代理团队是否必选
      let totalAmount: any = 0; // 派发佣金合计金额+派发内场奖励合计金额
      if (this.postData.receiveVO.length > 0) {
        let obj = {
          receiveAmount: 0,
          achieveAmount: 0,
          otherChannelFees: 0,
        }
        this.postData.receiveVO.forEach((item: any) => {
          obj.receiveAmount = (obj.receiveAmount * 1 * 100 + item.receiveAmount * 1 * 100) / 100;
          obj.achieveAmount = (obj.achieveAmount * 1 * 100 + item.commAmount * 1 * 100
            + item.rewardAmount * 1 * 100 + item.totalPackageAmount * 1 * 100
            + item.distributionAmount * 1 * 100) / 100;
          obj.otherChannelFees = (obj.otherChannelFees * 1 * 100 + item.otherChannelFees * 1 * 100) / 100;
          totalAmount = (totalAmount * 1 * 100 + item.commAmount * 1 * 100 +
            item.rewardAmount * 1 * 100) / 100;
          rewardTotal = (rewardTotal * 1 * 100 + item.rewardAmount * 1 * 100) / 100;
        })
        arr.push(obj);
      }
      this.editDealAchieveData.totalAmount = totalAmount;
      if (rewardTotal > 0) {
        this.oneAgentRequiredFlag = true;
      } else {
        this.oneAgentRequiredFlag = false;
      }
      return arr;
    }

    async created() {
      // 锚点设置默认值
      this.navList = (this as any).$tool.deepClone(this.defaultNavList);
      if (this.postData.contType === 'NaturalVisitDeal') {
        this.navList = this.navList.filter((list: any) => {
          return list.id !== 5
        })
      }
      this.id = this.$route.query.id;
      if (this.id) {
        this.addFlag = false;
        this.editFlag = true;
        this.tipsFlag = false;
        this.dividerTips = '刷新成功';
        const res: any = await get_deal_get__id({id: this.id});
        this.postData = res;
      } else {
        this.addFlag = true;
        this.editFlag = false;
        this.tipsFlag = false;
        this.dividerTips = '业绩分配';
      }
    }

    // nav的跳转
    handleGoAnchor(id: any, index: any) {
      this.currentActiveIndex = index;
      this.goAnchor(id);
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

    // 显示变动提示
    showChangeTips() {
      this.addFlag = false;
      this.editFlag = true;
      this.tipsFlag = false;
      this.dividerTips = '加载成功';
    }

    // 改变计算方式
    changeCalculation() {
      // console.log(this.tempReceiveVO);
      this.postData.receiveVO = (this as any).$tool.deepClone(this.tempReceiveVO);
      this.postData.commissionInfoList = [];
      this.postData.achieveTotalBagList = [];
      this.postData.achieveDistriList = [];
      if (!this.addFlag) {
        this.showChangeTips();
      }
    }

    // 手动方式下，改变收派金额某一项的方法
    changeReceiveItem(value: any, row: any, type: any) {
      // console.log('value', value);
      // console.log('row', row);
      if (!value) {
        (this as any).$nextTick(() => {
          row[type] = 0;
          row.otherChannelFees = (row.receiveAmount * 1 * 100
            - row.commAmount * 1 * 100 - row.rewardAmount * 1 * 100
            - row.totalPackageAmount * 1 * 100 - row.distributionAmount * 1 * 100) / 100;
        });
      } else {
        (this as any).$nextTick(() => {
          row.otherChannelFees = (row.receiveAmount * 1 * 100
            - row.commAmount * 1 * 100 - row.rewardAmount * 1 * 100
            - row.totalPackageAmount * 1 * 100 - row.distributionAmount * 1 * 100) / 100;
        });
      }
      // 提示框
      if (!this.addFlag) {
        this.addFlag = false;
        this.editFlag = true;
        this.tipsFlag = false;
        this.dividerTips = '刷新成功';
      }
    }

    // 新增 --- 初始化拆佣和平台费用
    async handleLoadCommission(type: any = '') {
      let flag: any = false;
      flag = (this as any).$parent.validReceiveData(this.postData.receiveVO, this.postData.calculation);
      if (!flag) {
        this.$message.error("请先完善收派金额信息！");
        return;
      }
      if (type === 'add') {
        // 新增的时候
        await this.initCommissionData();
        await this.initAchieveData();
        this.addFlag = false;
        this.editFlag = false;
        this.tipsFlag = true;
        this.dividerTips = "加载成功";
      } else if (type === 'refresh') {
        // 刷新
        try {
          const h: any = this.$createElement;
          await this.$msgbox({
            title: '操作确认',
            message: h('div', null, [
              h('i', { class: 'el-icon-question', style: 'font-size: 20px; color: #F90'},
                null),
              h('span', { style: 'font-size: 18px; font-weight: bold' },
                '刷新后之前录入的对外拆用及平台费用将会被清除，清除后会自动计算加载对外拆用及平台费用的初始数据。'),
              h('div', { style: 'margin-top: 5px'}, '是否确定刷新？')
            ]),
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          });
          await this.initCommissionData();
          await this.initAchieveData();
          this.addFlag = false;
          this.editFlag = false;
          this.tipsFlag = true;
          this.dividerTips = "加载成功";
        } catch (error) {
          console.log(error);
        }
      }
    }

    // 初始化对外拆佣
    async initCommissionData() {
      let params: any = {
        channelId: this.postData.agencyId,
        channelName: this.postData.agencyName,
        firstAgencyCompanyId: this.postData.oneAgentTeamId,
        firstAgencyCompanyName: this.postData.oneAgentTeamName,
        receives: this.postData.receiveVO
      };
      let commissionData: any = await post_pageData_initChannelComm(params);
      console.log(commissionData);
      this.postData.commissionInfoList = commissionData;
    }

    // 一手代理公司选项发生改变
    changeSelectAgent(value: any) {
      // console.log(value);
      // console.log(this.firstAgencyCompanyList);
      if (value) {
        if (this.firstAgencyCompanyList && this.firstAgencyCompanyList.length) {
          this.firstAgencyCompanyList.forEach((list: any) => {
            if (list.agencyId === value) {
              this.postData.oneAgentTeamName = list.name;
            }
          })
        }
      } else {
        this.postData.oneAgentTeamName = null;
      }
    }

    // 初始化平台费用
    async initAchieveData() {
      let params: any = {
        branchCompanyId: this.baseInfoByTerm.startDivisionId, // 分公司Id --- 项目周期带出
        contType: this.postData.contType, // 合同类型
        distriAmount: this.getTotalAmount('distributionAmount'), // 分销金额
        isMarketProject: this.postData.isMarketProject, // 是否市场化项目
        modelCode: this.postData.businessType, // 业务模式
        propertyType: this.postData.propertyType, // 物业类型
        specialId: this.baseInfoByTerm.specialId, // 特殊方案Id --- 项目周期带出
        totalBagAmount: this.getTotalAmount('totalPackageAmount') // 总包金额
      };
      // 重置数据
      this.postData.achieveTotalBagList = [];
      this.postData.achieveDistriList = [];
      let achieveInfo: any = await post_pageData_initAchieve(params);
      // console.log(achieveInfo);
      this.postData.achieveTotalBagList = this.getAchieveList(achieveInfo.totalBag, 'TotalBag');
      this.postData.achieveDistriList = this.getAchieveList(achieveInfo.distri, 'Distri');
      // 是否分销与总包一致
      this.isSameFlag = achieveInfo.same;
      this.editDealAchieveData.isSameFlag = achieveInfo.same;
      this.editDealAchieveData.distri = achieveInfo.distri;
      this.editDealAchieveData.totalBag = achieveInfo.totalBag;
      // 处理角色类型选项
      if (achieveInfo.same) {
        // 分销同步总包
        this.editDealAchieveData.totablBagRoles = this.getRoleListAndAchieveCap(achieveInfo.totalBag, achieveInfo.totablBagRoles);
      } else {
        // 分销不同步总包
        this.editDealAchieveData.totablBagRoles = this.getRoleListAndAchieveCap(achieveInfo.totalBag, achieveInfo.totablBagRoles);
        this.editDealAchieveData.distriRoles = this.getRoleListAndAchieveCap(achieveInfo.distri, achieveInfo.distriRoles);
      }
    }

    // 构建总包/分销平台费用表格数据
    getAchieveList(data: any = [], type: any = '') {
      let tempArr: any = [];
      if (data.length && !!type) {
        data.forEach((item: any) => {
          tempArr.push(
            {
              commFees: 0, // 拆佣金额
              commFeesRatio: 0, // 拆佣金额比例
              corporateAchieve: 0, // 角色业绩
              roleAchieveRatio: 0, // 角色业绩比例
              roleAchieveCap: 0, // 角色业绩上限
              roleType: null, // 角色类型
              rolerId: null, // 角色人ID
              belongOrgId: item.roleType === 'BranchOffice' ? this.baseInfoByTerm.groupId : null, // 归属组织ID
              belongOrgName: null, // 归属组织name
              rolerPosition: null, // 角色人岗位
              type: type, // 类型(TotalBag-总包、Distri-分销)
              managerAchieveList: [], // 成交管理者业绩信息
              ...item
            }
          )
        })
      }
      return tempArr;
    }

    /*
    * 功能：处理角色类型选项和角色业绩上限值
    * bagList：Array，总包或者分销平台费用列表
    * roleTypeList：Array，总包或者分销通过匹配的业绩比例分配方案筛选出来的可选角色类型
    *  */
    getRoleListAndAchieveCap(bagList: any = [], roleTypeList: any = []) {
      let tempArr: any = [];
      if (bagList.length && roleTypeList.length) {
        bagList.forEach((totalItem: any) => {
          roleTypeList.forEach((roleItem: any) => {
            if (totalItem.roleType === roleItem) {
              tempArr.push(
                {
                  code: roleItem,
                  roleAchieveCap: totalItem.roleAchieveCap
                }
              )
            }
          })
        })
      }
      return tempArr;
    }

    // 获取分销金额和总包金额
    getTotalAmount(type: any = '') {
      if (!type) return;
      let total = 0;
      if (this.postData.receiveVO.length) {
        this.postData.receiveVO.forEach((vo: any) => {
          let value: any = vo[type] ? vo[type] : 0;
          total = (total * 1 * 100 + value * 1 * 100) / 100;
        });
        return total;
      } else {
        return 0;
      }
    }

    // 获取拆佣总金额
    getCommAmount() {
      let total = 0;
      if (this.postData.receiveVO.length) {
        this.postData.receiveVO.forEach((vo: any) => {
          let commValue: any = vo.commAmount ? vo.commAmount : 0;
          let rewardValue: any = vo.rewardAmount ? vo.rewardAmount : 0;
          total = (total * 1 * 100 + commValue * 1 * 100 + rewardValue * 1 * 100) / 100;
        });
        return total;
      } else {
        return 0;
      }
    }

    // 选择项目周期
    selectProject() {
      (this as any).$parent.selectProject();
    }

    // 确定选择项目周期
    async finishAddProjectCycle(data: any) {
      // console.log('data', data);
      if (data && data.length > 0) {
        // if (data[0].termId !== this.postData.cycleId) {
        //   // 不相等要清空数据关联数据 + 重新请求接口
        //   this.contNoList = []; // 分销协议编号
        //   this.packageIdsList = []; // ids
        //   this.postData.customerVO = []; // 客户信息
        //   this.postData.offerNoticeVO = []; // 优惠告知书
        //   this.postData.documentVO = []; // 上传附件
        //   let list: any = [
        //     'refineModel',
        //     'oneAgentTeamId',
        //     'propertyType',
        //     'buildingId',
        //     'roomId',
        //     'contType',
        //     'contNo',
        //     'reportId',
        //     'recordStr',
        //     'recordState',
        //     'area',
        //     'room',
        //     'hall',
        //     'toilet',
        //     'propertyNo',
        //     'sceneSales',
        //     'signType',
        //     'stage',
        //     'dataSign',
        //   ];
        //   await this.resetObject('postData', list);
        //   this.packageIdsList = []; // ids
        //   this.postData.cycleName = data[0].termName;
        //   this.postData.cycleId = data[0].termId;
        //   this.cycleCheckedData = [...data];
        //   await this.getBaseDealInfo(this.postData.cycleId);
        // }
        // 不管相等不相等要清空数据关联数据 + 重新请求接口
        if (this.postData.cycleId) {
          this.contNoList = []; // 分销协议编号
          this.packageIdsList = []; // ids
          this.postData.customerVO = []; // 客户信息
          this.postData.offerNoticeVO = []; // 优惠告知书
          this.postData.documentVO = []; // 上传附件
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
            'toilet',
            'propertyNo',
            'sceneSales',
            'signType',
            'stage',
            'dataSign',
          ];
          await this.resetObject('postData', list);
          this.packageIdsList = []; // ids
        }
        this.postData.cycleName = data[0].termName;
        this.postData.cycleId = data[0].termId;
        this.cycleCheckedData = [...data];
        await this.getBaseDealInfo(this.postData.cycleId);
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
        this.postData.refineModel = (this as any).$parent.getRefineModel(this.postData.businessType); // 赋值细分业务模式
        this.refineModelList = await this.getRefineModelList(this.postData.businessType); // 获取细分业务模式下拉项
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
        console.log(this.firstAgencyCompanyList);
        // 处理优惠告知书的nav
        this.postData.offerNoticeVO = []; // 先重置优惠告知书的数据
        if (baseInfo.chargeEnum === 'Agent') {
          this.navList = this.navList.filter((item: any) => {
            return item.id !== 3;
          });
        } else {
          this.navList = (this as any).$tool.deepClone(this.defaultNavList);
        }
        // 成交组织
        await this.getOrgName(baseInfo.groupId);
      }
    }

    // 获取组织name
    async getOrgName(id: any = '') {
      if (!id) return;
      const info: any = await get_org_get__id({id: id});
      console.log('组织info:', info);
      this.postData.dealOrgName = info.name;
      this.postData.dealOrgId = id;
    }

    // 选择渠道公司
    selectAgency() {
      if (!this.postData.roomId) {
        this.$message.warning('请先选择房号');
        return;
      }
      let data: any = {
        selectableChannelIds: this.baseInfoInDeal.selectableChannelIds,
        isMultipleNotice: this.baseInfoInDeal.isMultipleNotice,
        cycleId: this.postData.cycleId
      };
      (this as any).$parent.selectAgency(data);
    }

    // 确定选择渠道公司
    finishAddAgency(data: any) {
      // console.log('data', data);
      if(data.agencyData && data.agencyData.length) {
        let channelList: any = (this as any).$root.dictAllList('ChannelLevel');
        this.postData.agencyId = data.agencyData[0].channelId; // 渠道公司Id
        this.postData.agencyName = data.agencyData[0].channelName; // 渠道公司
        this.postData.channelLevel = data.agencyData[0].channelGrade; // 渠道等级Id
        if (channelList && channelList.length > 0 && data.agencyData[0].channelGrade) {
          channelList.forEach((list: any) => {
            if (list.code === data.agencyData[0].channelGrade) {
              this.postData.channelLevelName= list.name; // 渠道等级
            }
          });
        }
      }
      // 分销协议编号
      if (data.contNoList && data.contNoList.length) {
        this.contNoList = data.contNoList;
      }
    }

    // 选择经纪人
    selectBroker() {
      if (!this.postData.agencyId) {
        this.$message.warning('请先选择渠道公司');
        return;
      }
      (this as any).$parent.selectBroker(this.postData.agencyId);
    }

    // 确定选择经纪人
    finishAddBroker(data: any) {
      // console.log('data', data);
      if(data && data.length) {
        this.postData.brokerId= data[0].id; // 渠道经纪人Id
        this.postData.brokerName= data[0].name; // 渠道经纪人
      }
    }

    // 改变栋座
    changeBuild() {
      // 清空房间号 + 下面的所有信息
      this.postData.roomId = null;
      this.resetData();
    }

    // 清空数据 - 主要是和初始化数据有关的数据
    resetData() {
      this.tempSubscribePrice = null;
      this.tempSignPrice = null;
      this.contNoList = []; // 分销协议编号
      this.packageIdsList = []; // ids
      this.postData.customerVO = []; // 客户信息
      this.postData.receiveVO = []; // 收派金额
      this.tempReceiveVO = []; // 收派金额初始值
      this.postData.offerNoticeVO = []; // 优惠告知书
      this.postData.documentVO = []; // 上传附件
      this.postData.calculation = 'Auto'; // 计算方式改为手动
      this.postData.commissionInfoList = [];
      this.postData.achieveTotalBagList = [];
      this.postData.achieveDistriList = [];
      this.selectableChannelIds = [];
      if (this.id) {
        this.addFlag = false;
        this.editFlag = false;
        this.tipsFlag = true;
        this.dividerTips = '业绩分配';
      } else {
        this.addFlag = true;
        this.editFlag = false;
        this.tipsFlag = false;
        this.dividerTips = '加载成功';
      }
      let list: any = ['contType', 'contNo', 'recordState', 'recordStr', 'area', 'room', 'hall',
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
      // const loading = this.$loading({
      //   lock: true,
      //   text: '数据加载中...',
      //   spinner: 'el-icon-loading'
      // });
      let baseInfo: any = await post_pageData_initBasic(params);
      this.baseInfoInDeal = JSON.parse(JSON.stringify(baseInfo || '{}'));
      // console.log('baseInfobaseInfo', this.baseInfoInDeal);
      // 处理数据
      // 拆佣信息中-收款方-可选渠道商id
      this.selectableChannelIds = baseInfo.selectableChannelIds;
      // 纯提示
      if (baseInfo.customerIsDifferent) {
        this.$notify({
          title: '提示',
          message: '明源客户与优惠告知书客户有差异',
          duration: 0
        });
      }
      // 多分优惠告知书情况
      this.postData.contNo = null; // 重置选择的编号
      if (baseInfo.isMultipleNotice) {
        this.$notify({
          title: '提示',
          message: '同房号存在多份已生效的优惠告知书',
          duration: 0
        });
      } else {
        // 分销协议编号
        if (baseInfo.contracts && baseInfo.contracts.length > 0) {
          this.contNoList = baseInfo.contracts;
        } else {
          this.contNoList = [];
        }
      }
      // 栋座
      if (baseInfo.buildingId && !this.postData.buildingId) {
        this.postData.buildingId = baseInfo.buildingId;
      }
      // 合同类型
      this.postData.contType = baseInfo.contType;
      // 备案情况
      this.postData.recordState = baseInfo.myReturnVO.dealVO?.recordState;
      // 报备信息
      this.postData.recordStr = baseInfo.recordStr;
      // 建筑面积
      this.postData.area = baseInfo.myReturnVO.houseVO?.area;
      // 户型
      this.postData.room = baseInfo.myReturnVO.houseVO?.room;
      this.postData.hall = baseInfo.myReturnVO.houseVO?.hall;
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
      this.postData.offerNoticeVO = baseInfo.notice && baseInfo.notice.length ? baseInfo.notice : [];
      // 客户信息
      this.postData.customerVO = baseInfo.customerAddVOS && baseInfo.customerAddVOS.length ? baseInfo.customerAddVOS : [];
      // 收派金额
      // this.postData.receiveVO = baseInfo.receiveVOS && baseInfo.receiveVOS.length ? baseInfo.receiveVOS : [];
      this.postData.receiveVO = (this as any).$parent.initReceiveVOS(baseInfo.receiveVOS);
      this.tempReceiveVO = (this as any).$tool.deepClone(this.postData.receiveVO);
      // 收派金额中的甲方
      this.commissionCustomerList = [];
      this.commissionCustomerList = this.initCommissionCustomer(baseInfo.receiveVOS);
      this.commissionServiceFeeObj = {};
      this.commissionServiceFeeObj = this.initCommissionServiceFee(baseInfo.receiveVOS);
      console.log('commissionServiceFeeObj', this.commissionServiceFeeObj)
      // 附件信息
      this.initDocument(baseInfo.contType, baseInfo);
      // loading.close();
    }

    // 初始化收派金额中的代理费的甲方数组 --- 代理费
    initCommissionCustomer(data: any = []) {
      let tempArr: any = [];
      if (data.length) {
        data.forEach((item: any) => {
          if (item.type === 'AgencyFee') {
            tempArr.push(
              {
                partyACustomerName: item.partyACustomerName,
                partyACustomer: item.partyACustomer
              }
            )
          }
        })
      }
      return tempArr;
    }

    // 初始化收派金额中的代理费的甲方对象 --- 服务费
    initCommissionServiceFee(data: any = []) {
      let tempObj: any = {
        partyACustomerName: null,
        partyACustomer: null
      };
      let tempArr: any = [];
      if (data.length) {
        data.forEach((item: any) => {
          if (item.type === 'ServiceFee') {
            tempArr.push(item);
          }
        });
      }
      if (tempArr.length) {
        tempObj.partyACustomerName = tempArr[0].partyACustomerName;
        tempObj.partyACustomer = tempArr[0].partyACustomer;
      }
      return tempObj;
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

    // 初始化附件表格数据
    initDocument(contType: any = '', initData: any = {}) {
      let fileList: any = (this as any).$root.dictAllList('DealFileType'); // 附件类型
      // console.log('fileList', fileList);
      // 附件类型增加key
      if (fileList.length > 0) {
        fileList.forEach((vo: any) => {
          vo.defaultFileList = []; // 存放原来的数据
          vo.fileList = []; // 存放新上传的数据
          // 赋值
          switch(vo.code) {
            case "VisitConfirForm":
              // 来访确认单
              vo.defaultFileList = initData.visitConfirmForms && initData.visitConfirmForms.length ? initData.visitConfirmForms : [];
              // vo.fileList = initData.visitConfirmForms && initData.visitConfirmForms.length ? initData.visitConfirmForms : [];
              break;
            case "Notice":
              // 优惠告知书PDF
              vo.defaultFileList = initData.noticePDF && initData.noticePDF.length  ? initData.noticePDF : [];
              // vo.fileList = initData.noticePDF && initData.noticePDF.length  ? initData.noticePDF : [];
              break;
            case "OwnerID":
              // 业主身份证
              vo.defaultFileList = initData.customerIds && initData.customerIds.length ? initData.customerIds : [];
              // vo.fileList = initData.customerIds && initData.customerIds.length ? initData.customerIds : [];
              break;
            case "DealConfirForm":
              // 成交确认书
              vo.defaultFileList = initData.dealConfirmForms && initData.dealConfirmForms.length ? initData.dealConfirmForms : [];
              // vo.fileList = initData.dealConfirmForms && initData.dealConfirmForms.length ? initData.dealConfirmForms : [];
              break;
          }
        })
      }
      this.postData.documentVO = JSON.parse(JSON.stringify(fileList));
      // 1.是否是分销成交
      if (contType !== 'DistriDeal') {
        // 隐藏来访确认单、成交确认单
        this.postData.documentVO = fileList.filter((item: any) => {
          return !["VisitConfirForm", "DealConfirForm"].includes(item.code);
        });
      }
      // 2.项目周期的收费模式
      if (this.baseInfoByTerm.chargeEnum === 'Agent') {
        // 隐藏优惠告知书
        this.postData.documentVO = fileList.filter((item: any) => {
          return item.code !== "Notice";
        });
      }
      // console.log('附件信息表格：', this.postData.documentVO);
    }

    // 修改合同类型
    changeContType() {
      let flag: any = false;
      if (this.postData.receiveVO.length) {
        // 判断收派金额数据是否选了收派套餐
        flag = (this as any).$parent.hasReceivePackage(this.postData.receiveVO);
      }
      if (flag) {
        this.postData.receiveVO = (this as any).$tool.deepClone(this.tempReceiveVO);
        this.postData.commissionInfoList = [];
        this.postData.achieveTotalBagList = [];
        this.postData.achieveDistriList = [];
        // 显示手动按钮
        this.addFlag = false;
        this.editFlag = true;
        this.tipsFlag = false;
        this.dividerTips = "加载成功";
      }
    }

    // 改变物业类型
    changePropertyType() {
      // 清空栋座 + 房间号 + 下面的所有信息
      this.postData.roomId = null;
      this.postData.buildingId = null;
      this.resetData();
    }

    // 改变细分业务模式
    changeRefineModel() {
      let flag: any = false;
      if (this.postData.receiveVO.length) {
        // 判断收派金额数据是否选了收派套餐
        flag = (this as any).$parent.hasReceivePackage(this.postData.receiveVO);
      }
      if (flag) {
        // 已经选了收派套餐，要初始化收派套餐
        this.postData.receiveVO = (this as any).$tool.deepClone(this.tempReceiveVO);
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

    // 改变签约、认购价格后，初始化收派套餐问题
    changePrice(e: any, type: any) {
      // console.log(e.target.value);
      // console.log(type);
      let value: any = e.target.value;
      let flag: any = false;
      if (this.postData.receiveVO.length) {
        // 判断收派金额数据是否选了收派套餐
        flag = this.postData.receiveVO.some((item: any) => {
          return (item.showData && item.showData.length > 0);
        });
      }
      if (flag) {
        // 如果已经选了，判断价格是否和之前的一样
        if (value !== (this as any)[`temp${type}`]) {
          // 不一样+失焦，要初始化收派套餐
          this.postData.receiveVO = (this as any).$tool.deepClone(this.tempReceiveVO);
        }
      }
      (this as any)[`temp${type}`] = value;
    }

    // 选择收派套餐
    selectPackage(scope: any) {
      // console.log('选择收派套餐', scope);
      this.currentReceiveIndex = scope.$index;
      let params: any = {
        termId: this.baseInfoByTerm.termId, // 项目周期id
        contType: this.postData.contType, // 合同类型
        hasRecord: this.postData.hasRecord, // 是否有成交报备(是否分销成交)
        contNo: this.postData.contNo, // 分销协议编号
        distributionIds: this.packageIdsList, // 分销成交 --- 选择分销协议后的ids
        feeType: scope.row.type, // 费用类型
        partyACustomerId: scope.row.partyACustomer, // 甲方或客户
        property: this.postData.propertyType, // 物业类型
        subdivide: this.postData.refineModel, // 细分业务模式
      };
      (this as any).$parent.selectPackage(params);
    }

    // 确定选择收派套餐
    async finishAddReceivePackage(data: any) {
      // console.log('data', data);
      if (data.length === 0) return
      let dataObj = data[0];
      delete dataObj['typeName']; // 删除typeName属性
      let postData: any = {
        detail: dataObj,
        signPrice: this.postData.signPrice ? this.postData.signPrice : null,
        subscribePrice: this.postData.subscribePrice ? this.postData.subscribePrice : null
      }
      if (!postData.signPrice && !postData.subscribePrice) {
        this.$message.error('认购价格、签约价格不能都为空！');
        return;
      }
      let info: any = await post_pageData_calculateReceiveAmount(postData);
      // console.log(info);
      if (this.postData.receiveVO.length > 0) {
        this.postData.receiveVO.forEach((vo: any, index: any) => {
          if (index === this.currentReceiveIndex) {
            vo.showData = data;
            vo.packageId = data[0].packageMxId;
            vo.receiveAmount = info.receiveAmount;
            vo.commAmount = info.comm;
            vo.rewardAmount = info.reward;
            vo.totalPackageAmount = info.totalBag;
            vo.distributionAmount = info.distri;
            vo.otherChannelFees = info.other;
          }
        });
      }
      if (!this.addFlag) {
        this.showChangeTips();
      }
    }

    // 选择拆佣 - 收款方
    selectAgencyName(scope: any) {
      console.log('选择收款方', scope);
      if (this.postData.calculation === 'Auto') return;
      this.dialogAddAgentCompany = true;
    }

    // 确定选择渠道公司
    finishAddAgentCompany(data: any) {
      // console.log('data', data);
      if (data && data.length > 0) {
        // this.postData.agencyName = data[0].channelName;
        // this.postData.channelId = data[0].channelId;
        this.companyCheckedData = [...data];
      }
      this.dialogAddAgentCompany = false;
    }

    // 添加优惠告知书
    handleAddNotice() {
      if(this.baseInfoByTerm.termId) {
        let data: any = {
          termId: this.baseInfoByTerm.termId,
          proId: this.baseInfoByTerm.proId,
          buyUnit: this.postData.buildingId, // 栋座
          roomId: this.postData.roomId, // 多分优惠告知书下需要通过房号去限制
          isMultipleNotice: this.baseInfoInDeal.isMultipleNotice // 同房号是否存在多份优惠告知书
        };
        (this as any).$parent.handleAddNotice(data);
      }
    }

    // 确定选择优惠告知书
    async finishAddNotice(info: any) {
      // 选择优惠告知书后 --- 带出优惠告知书 + 客户信息
      this.postData.offerNoticeVO = info.dealNotices;
      this.postData.customerVO = info.customerConvertResponse;
      // 回显收派金额中类型为服务费的客户上
      if (this.postData.customerVO.length && this.postData.receiveVO && this.postData.receiveVO.length) {
        this.postData.receiveVO.forEach((item: any) => {
          if (item.type === "ServiceFee") {
            item.partyACustomer = this.postData.customerVO[0].addId;
            item.partyACustomerName = this.postData.customerVO[0].customerName;
          }
        });
      } else {
        if (this.postData.receiveVO.length) {
          if (this.postData.receiveVO && this.postData.receiveVO.length) {
            this.postData.receiveVO.forEach((item: any) => {
              if (item.type === "ServiceFee") {
                item.partyACustomer = null;
                item.partyACustomerName = null;
              }
            })
          }
        }
      }
      // 提示框
      if (!this.addFlag) {
        this.addFlag = false;
        this.editFlag = true;
        this.tipsFlag = false;
        this.dividerTips = '刷新成功';
      }
      (this as any).$parent.handleAddNotice(this.baseInfoByTerm);
    }

    // 客户信息由优惠告知书带出 ---- 2021-01-16 待定
    async getCustomByNotice(list: any = []) {
      if (!list.length) return;
      // 等待后端提供接口
      const customList: any = await post_pageData_convertCustomers(list);
      console.log(customList);
    }

    // 删除优惠告知书
    removeNotice(scope: any) {
      console.log(scope);
      // this.postData.offerNoticeVO = this.postData.offerNoticeVO.filter((item: any) => {
      //   return item.id !== scope.row.id;
      // });
      this.postData.offerNoticeVO = [];
      if (this.baseInfoInDeal.isMultipleNotice) {
        // 多份优惠告知书下，删除了优惠告知书，对应的客户也要删除
        this.postData.customerVO = [];
        if (this.postData.receiveVO.length) {
          if (this.postData.receiveVO && this.postData.receiveVO.length) {
            this.postData.receiveVO.forEach((item: any) => {
              if (item.type === "ServiceFee") {
                item.partyACustomer = null;
                item.partyACustomerName = null;
              }
            })
          }
        }
        // 提示框
        if (!this.addFlag) {
          this.addFlag = false;
          this.editFlag = true;
          this.tipsFlag = false;
          this.dividerTips = '刷新成功';
        }
      }
    }

    // 添加客户
    handleAddCustomer() {
      (this as any).$parent.handleAddCustomer();
    }

    // 确定选择客户
    async finishAddCustomer(data: any) {
      // console.log('data', data);
      if (data.length === 0) return;
      let customData: any = {
        addId: data[0].id, // 手动添加的时候保存id --- 为了回显收派金额
        cardNo: data[0].certificateNumber,
        cardType: data[0].cardType,
        customerName: data[0].custName,
        customerNo: data[0].custCode,
        customerPhone: data[0].custTel,
        customerType: data[0].custType,
        email: data[0].email,
        isCustomer: null // 是否主要客户
      }
      if (this.postData.customerVO.length > 0) {
        customData.isCustomer = "No";
        this.postData.customerVO.push(customData);
      } else {
        customData.isCustomer = "Yes";
        this.postData.customerVO.push(customData);
        // 因为没有客户，选了客户后第一个客户是主要客户，需要回显到收派金额中类型为服务费的客户上
        if (this.postData.receiveVO && this.postData.receiveVO.length) {
          this.postData.receiveVO.forEach((item: any) => {
            if (item.type === "ServiceFee") {
              item.partyACustomer = data[0].id;
              item.partyACustomerName = data[0].custName;
            }
          });
        }
        // 提示框
        if (!this.addFlag) {
          this.addFlag = false;
          this.editFlag = true;
          this.tipsFlag = false;
          this.dividerTips = '刷新成功';
        }
      }
      (this as any).$parent.handleAddCustomer();
    }

    // 删除客户/对外拆佣项
    async deleteAdd(scope: any, type: any) {
      // console.log(scope);
      // console.log(type);
      if (type === 'customer') {
        // 删除客户
        this.postData.customerVO = this.postData.customerVO.filter((item: any) => {
          return item.addId !== scope.row.addId;
        });
        if (scope.$index === 0) {
          // 删除的是第一个,需要把现在的第一个赋值给收派金额类型为服务费的信息中
          if (this.postData.customerVO.length) {
            if (this.postData.receiveVO && this.postData.receiveVO.length) {
              this.postData.receiveVO.forEach((item: any) => {
                if (item.type === "ServiceFee") {
                  item.partyACustomer = this.postData.customerVO[0].addId;
                  item.partyACustomerName = this.postData.customerVO[0].customerName;
                }
              });
            }
            this.postData.customerVO.forEach((item: any, index: any) => {
              if (index === 0) {
                item.isCustomer = "Yes";
              } else {
                item.isCustomer = "No";
              }
            })
          } else {
            if (this.postData.receiveVO.length) {
              if (this.postData.receiveVO && this.postData.receiveVO.length) {
                this.postData.receiveVO.forEach((item: any) => {
                  if (item.type === "ServiceFee") {
                    item.partyACustomer = null;
                    item.partyACustomerName = null;
                  }
                })
              }
            }
          }
          // 提示框
          if (!this.addFlag) {
            this.addFlag = false;
            this.editFlag = true;
            this.tipsFlag = false;
            this.dividerTips = '刷新成功';
          }
        }
      } else if (type === 'commission') {
        // 删除对外拆佣项
        this.postData.commissionInfoList = this.postData.commissionInfoList.filter((item: any, index: any) => {
          console.log(item);
          return index !== scope.$index;
        });
      }
    }

    // 添加渠道经纪人
    handleAddBroker() {
      (this as any).$parent.handleAddCustomer();
    }

    // 增加拆佣项
    handleAddCommission() {
      // console.log('增加拆佣项');
      let obj = {
        agencyId: null, // 拆佣公司ID
        agencyName: null, // 收款方(渠道公司)
        amount: 0, // 拆佣金额
        feeType: null, // 费用类型
        packageId: null, // 收派标准
        partyACustomer: null, // 甲方或客户
        partyACustomerName: null, // 甲方或客户名称
        remarks: null, // 备注
        target: null // 拆佣对象
      };
      this.postData.commissionInfoList.push(obj);
    }

    // 改变拆佣对象
    changeCommissionTarget(value: any, row: any) {
      if (!value) return;
      switch(value){
        case 'Personal':
          // 个人
          row.agencyName = "";
          row.agencyId = "";
          break;
        case 'AgentCompany':
          // 一手代理公司
          row.agencyName = this.postData.oneAgentTeamName;
          row.agencyId = this.postData.oneAgentTeamId;
          break;
        case 'ChannelCompany':
          // 渠道公司
          row.agencyName = "";
          row.agencyId = "";
          break;
      }
    }

    // 改变费用类型
    changeFeeType(value: any, row: any) {
      if (!value) return;
      switch(value){
        case 'ServiceFee':
          // 服务费
          row.partyACustomer = this.commissionServiceFeeObj.partyACustomer;
          row.partyACustomerName = this.commissionServiceFeeObj.partyACustomerName;
          break;
        case 'AgencyFee':
          // 代理费
          row.partyACustomer = "";
          row.partyACustomerName = "";
          break;
      }
    }

    // 选择费用来源
    handleSelectCustomer(value: any, row: any) {
      if (!value) return;
      if (this.commissionCustomerList && this.commissionCustomerList.length) {
        this.commissionCustomerList.forEach((list: any) => {
          if (list.partyACustomer === value) {
            row.partyACustomerName = list.partyACustomerName;
          }
        })
      }
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
                let total = (prev * 1 * 100 + curr * 1 * 100) / 100;
                return total;
              } else {
                return ((prev * 1 * 100) / 100);
              }
            }, 0);
            sums[index] = Math.round(sums[index] * 100) / 100; // 解决精度缺失问题
          } else {
            sums[index] = '';
          }
        } else {
          sums[index] = '';
        }
      });
      return sums;
    }

    // 新增平台角色业绩
    handleAddAchieve(type: any) {
      // console.log('type', type);
      this.editDealAchieveData.btnType = 'add';
      this.editDealAchieveData.type = type;
      this.editDealAchieveData.currentEditItem = {};
      this.editDealAchieveData.currentEditItem.roleType = 'add';
      this.currentChangeObj.type = type;
      this.currentChangeObj.index = null;
      this.dialogEditDealAchieve = true;
    }

    // 修改平台费用 --- 总包/分销
    editAchieveTotalBag(scope: any, type: any) {
      // console.log('data', scope);
      // console.log('data', type);
      this.editDealAchieveData.btnType = 'edit';
      this.editDealAchieveData.type = type;
      this.editDealAchieveData.currentEditItem = JSON.parse(JSON.stringify(scope.row));
      this.currentChangeObj.index = scope.$index;
      this.currentChangeObj.type = type;
      this.dialogEditDealAchieve = true;
    }

    // 确定新增/修改平台业绩
    async finishEditDealAchieve(data: any = {}) {
      // console.log('finishEditDealAchieve', data);
      let tempTotalBagList: any = []; // 临时总包列表
      let tempDistriList: any = []; // 临时分销列表
      if (this.editDealAchieveData.type === 'total') {
        data.type = 'TotalBag';
      } else if (this.editDealAchieveData.type === 'distri') {
        data.type = 'Distri';
      }
      if (this.isSameFlag) {
        // 总包分销一致：一起增加，一起减少
        tempTotalBagList = this.getTempList(this.editDealAchieveData.btnType, this.currentChangeObj.index, this.postData.achieveTotalBagList, data);
        let tempData = JSON.parse(JSON.stringify(data)); // 修改类型
        tempData.type = 'Distri';
        tempDistriList = this.getTempList(this.editDealAchieveData.btnType, this.currentChangeObj.index, this.postData.achieveDistriList, tempData);
      } else {
        // 总包分销不一致：新增、修改都只针对对应的类型数据
        if (this.editDealAchieveData.type === 'total') {
          tempTotalBagList = this.getTempList(this.editDealAchieveData.btnType, this.currentChangeObj.index, this.postData.achieveTotalBagList, data);
          tempDistriList = (this as any).$tool.deepClone(this.postData.achieveDistriList);
        } else if (this.editDealAchieveData.type === 'distri') {
          tempTotalBagList = (this as any).$tool.deepClone(this.postData.achieveTotalBagList);
          tempDistriList = this.getTempList(this.editDealAchieveData.btnType, this.currentChangeObj.index, this.postData.achieveDistriList, data);
        }
      }
      await this.recalculateAchieve(tempTotalBagList, tempDistriList);
      this.dialogEditDealAchieve = !this.dialogEditDealAchieve;
    }

    // 移除平台费用 --- 总包/分销
    deleteAchieveTotalBag(scope: any, type: any) {
      // console.log('data', scope);
      let tempTotalBagList: any = []; // 临时总包列表
      let tempDistriList: any = []; // 临时分销列表
      if (this.isSameFlag) {
        // 总包分销一致：一起增加，一起减少
        tempTotalBagList = this.postData.achieveTotalBagList.filter((item: any, index: any) => {
          return index !== scope.$index;
        });
        tempDistriList = this.postData.achieveDistriList.filter((item: any, index: any) => {
          return index !== scope.$index;
        });
      } else {
        // 总包分销不一致：新增、修改都只针对对应的类型数据
        if (type === 'total') {
          // 总包
          tempTotalBagList = this.postData.achieveTotalBagList.filter((item: any, index: any) => {
            return index !== scope.$index;
          });
          tempDistriList = (this as any).$tool.deepClone(this.postData.achieveDistriList);
        } else if (type === 'distri') {
          // 分销
          tempTotalBagList = (this as any).$tool.deepClone(this.postData.achieveTotalBagList);
          tempDistriList = this.postData.achieveDistriList.filter((item: any, index: any) => {
            return index !== scope.$index;
          });
        }
      }
      this.recalculateAchieve(tempTotalBagList, tempDistriList);
    }

    /*
    * 整合平台费用重算的list
    * btnType: String，按钮类型---新增/编辑
    * currentIndex: Number，当前编辑的平台费用序号
    * list：Array，总包/分销现有的表格数据
    * data: Object，新增/编辑的对象
    * */
    getTempList(btnType: any = "", currentIndex: any = null, list: any = [], data: any = {}) {
      let tempList: any = [];
      if (btnType === 'add') {
        tempList = [...list, data];
      } else if (btnType === 'edit') {
        let tempArr = JSON.parse(JSON.stringify(list));
        if (tempArr.length > 0) {
          tempArr.forEach((item: any, index: any) => {
            if (index === currentIndex) {
              tempList.push(
                {
                  ...item,
                  ...data
                }
              );
            } else {
              tempList.push(item);
            }
          });
        }
      }
      return tempList;
    }

    /*
    * 重新计算平台费用 --- 总包和分销不一致的情况
    * tempTotalBagList: Array，总包列表
    * tempDistriList：Array，分销列表
    * */
    async recalculateAchieve(tempTotalBagList: any = [], tempDistriList: any = []) {
      let params: any = {
        branchCompanyId: this.baseInfoByTerm.startDivisionId, // 分公司Id --- 项目周期带出
        contType: this.postData.contType, // 合同类型
        isMarketProject: this.postData.isMarketProject, // 是否市场化项目
        modelCode: this.postData.businessType, // 业务模式
        propertyType: this.postData.propertyType, // 物业类型
        specialId: this.baseInfoByTerm.specialId, // 特殊方案Id --- 项目周期带出
        distriAmount: this.getTotalAmount('distributionAmount'), // 分销总金额
        distriList: tempDistriList, // 分销一方内的已分配的平台费用
        totalBagAmount: this.getTotalAmount('totalPackageAmount'), // 总包总金额
        totalBagList: tempTotalBagList, // 总包一方内的已分配的平台费用
      }
      let info: any = await post_pageData_recalculateAchieve(params);
      // console.log(list);
      this.postData.achieveTotalBagList = this.getAchieveData(tempTotalBagList, info.totalBagList);
      this.postData.achieveDistriList = this.getAchieveData(tempDistriList, info.distriList);
      if (this.isSameFlag) {
        // 总包和分销一致的情况下，还需要调用重算拆佣金额接口
        await this.recalculateAchieveBySame(this.postData.achieveTotalBagList);
      }
    }

    /*
    * 重新计算平台费用 --- 总包和分销一致的情况
    * tempList：Array，总包数组参数
    * */
    async recalculateAchieveBySame(list: any = []) {
      // 分销同步总包
      let paramsObj: any = {
        totalBagList: list, // 总包拆佣
        totalCommAmount: this.getCommAmount(), // 总拆佣金额
      }
      let commInfo: any = await post_pageData_recalculateAchieveComm(paramsObj);
      // console.log(commInfo);
      this.postData.achieveTotalBagList = this.getAchieveData(this.postData.achieveTotalBagList, commInfo.totalBagList);
      this.postData.achieveDistriList = this.getAchieveData(this.postData.achieveDistriList, commInfo.distriList);
    }

    // 总包/分销平台费用从新计算
    getAchieveData(typeList: any = [], filterList: any = []) {
      let tempArr: any = [];
      typeList.forEach((typeItem: any, typeIndex: any) => {
        filterList.forEach((filterItem: any, filterIndex: any) => {
          if (typeIndex === filterIndex) {
            tempArr.push(
              {
                ...typeItem,
                ...filterItem
              }
            )
          }
        })
      });
      return tempArr;
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
        if ([3, 5, 6].includes(index)) {
          const values = data.map((item: any) => Number(item[column.property]));
          if (!values.every((value: any) => isNaN(value))) {
            sums[index] = values.reduce((prev: any, curr: any) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                let total = (prev * 1 * 100 + curr * 1 * 100) / 100;
                return total;
              } else {
                return ((prev * 1 * 100) / 100);
              }
            }, 0);
            sums[index] = Math.round(sums[index] * 100) / 100; // 解决精度缺失问题
          } else {
            sums[index] = '';
          }
        } else {
          sums[index] = '';
        }
      });
      return sums;
    }

    // 上传图片/文件
    getNewFile(data: any, type?: any) {
      // console.log(data);
      // console.log(type);
      if (this.postData.documentVO.length > 0) {
        this.postData.documentVO.forEach((vo: any) => {
          if (vo.code === type) {
            if (data && data.length) {
              vo.fileList = data;
            }
          }
        });
      }
    }

    // 取消
    async cancel() {
      this.$goto({
        path: "/dealReport/list"
      });
    }

    // 保存
    async handleSave(type: any) {
      // console.log('type', type);
      if (type === 'save') {
        // 保存
        console.log('save', type);
      } else if (type === 'submit') {
        // 提交
        if (['Recognize', 'Subscribe'].includes(this.postData.stage)) {
          this.$message.error('成交阶段未到达签约阶段，不可提交!');
          return;
        }
      }
      (this.$refs["ruleForm"] as ElForm).validate(this.addSave);
    }

    @NoRepeatHttp()
    async addSave(valid: any) {
      // 校验收派金额是都有收派套餐
      let flag = (this as any).$parent.validReceiveData(this.postData.receiveVO, this.postData.calculation);
      if (valid && flag) {
        // 整合数据
        let postData: any = this.getPostData();
        if (this.id) {
          postData.basic.dealVO.dealCode = this.postData.dealCode;
          postData.basic.dealVO.id = this.postData.id;
          postData.basic.dealVO.parentId = this.postData.parentId;
          await post_deal_updateAchieveAllot(postData);
          this.$message.success("编辑成功");
          this.$goto({
            path: "/dealReport/list",
          });
        } else {
          await post_deal_achieveAllotEntry(postData);
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

    // 构建参数
    getPostData() {
      let obj: any = {
        achieveVO: [], // 平台费用信息
        allotDate: null, // 业绩分配日期
        alloterId: null, // 业绩分配人ID
        basic: {
          agencyVO: [], // 渠道商信息
          customerVO: [], // 客户信息
          dealVO: {
            "businessType": "",
            "charge": "",
            "contNo": "",
            "contType": "",
            "cycleId": '',
            "dataSign": "",
            "dealOrgId": '',
            "isConsign": "",
            "isMarketProject": "",
            "isMat": "",
            "modelCode": "",
            "noticeIds": [],
            "oneAgentTeamId": "",
            "recordState": "",
            "refineModel": "",
            "reportId": '',
            "sceneSales": "",
            "signDate": "",
            "signPrice": '',
            "signType": "",
            "stage": "",
            "status": "",
            "subscribeDate": "",
            "subscribePrice": ""
          }, // 成交基础信息
          documentVO: [], // 上传附件
          houseVO: {
            address: "",
            area: "",
            buildingId: "",
            hall: "",
            propertyNo: "",
            propertyType: "",
            room: "",
            roomId: "",
            roomNo: "",
            toilet: ""
          }, // 房屋信息
          receiveAchieveVO: [], // 收派金额 --- 汇总
          receiveVO: [] // 收派金额
        }, // 成交基础信息
        calculation: null, // 计算方式(Auto-自动、Manual-手动)
        channelCommVO: [] // 对外拆佣信息
      }
      // 平台费用
      obj.achieveVO = this.postData.achieveTotalBagList.concat(this.postData.achieveDistriList);
      // 平台费用增加字段：isMainDeal --- 主成交为true，补充成交为false
      if (obj.achieveVO && obj.achieveVO.length) {
        obj.achieveVO.forEach((item: any) => {
          item.isMainDeal = true;
          if (item.managerAchieveList && item.managerAchieveList.length) {
            item.managerAchieveList.forEach((list: any) => {
              list.isMainDeal = true;
            });
          }
        })
      }
      // 渠道商信息 --- 分销成交才会有
      if (this.postData.contType === 'DistriDeal') {
        obj.basic.agencyVO.push(
          {
            agencyId: this.postData.agencyId,
            brokerId: this.postData.brokerId,
            channelLevel: this.postData.channelLevel,
          }
        )
        obj.basic.dealVO.contNo = this.postData.contNo;
        obj.basic.dealVO.isMat = this.postData.isMat;
      }
      // 客户信息
      if (this.postData.customerVO.length > 0) {
        this.postData.customerVO.forEach((item: any, index: any) => {
          if (index === 0) {
            item.isCustomer = 'Yes';
          } else {
            item.isCustomer = 'No';
          }
        });
        obj.basic.customerVO = this.postData.customerVO;
      }
      // 基础信息
      obj.basic.dealVO.businessType = this.baseInfoByTerm.busTypeEnum;
      obj.basic.dealVO.charge = this.baseInfoByTerm.chargeEnum;
      obj.basic.dealVO.contType = this.postData.contType;
      obj.basic.dealVO.cycleId = this.postData.cycleId;
      obj.basic.dealVO.dataSign = this.baseInfoInDeal.myReturnVO.dataSign;
      obj.basic.dealVO.dealOrgId = this.postData.dealOrgId;
      obj.basic.dealVO.isConsign = this.postData.isConsign;
      obj.basic.dealVO.isMarketProject = this.postData.isMarketProject;
      obj.basic.dealVO.modelCode = this.postData.businessType;
      // 优惠告知书
      if (this.postData.offerNoticeVO.length > 0) {
        this.postData.offerNoticeVO.forEach((vo: any) => {
          obj.basic.dealVO.noticeIds.push(vo.noticeId);
        })
      }
      obj.basic.dealVO.oneAgentTeamId = this.postData.oneAgentTeamId;
      obj.basic.dealVO.recordState = this.postData.recordState;
      obj.basic.dealVO.refineModel = this.postData.refineModel;
      obj.basic.dealVO.reportId = this.baseInfoInDeal.recordId;
      obj.basic.dealVO.sceneSales = this.postData.sceneSales;
      obj.basic.dealVO.signDate = this.postData.signDate;
      obj.basic.dealVO.signPrice = this.postData.signPrice;
      obj.basic.dealVO.signType = this.postData.signType;
      obj.basic.dealVO.stage = this.postData.stage;
      if (['Recognize', 'Subscribe'].includes(this.postData.stage)) {
        obj.basic.dealVO.status = 'Draft'; // 草稿
      } else if (this.postData.stage === 'SignUp') {
        obj.basic.dealVO.status = 'AchieveDeclareUnconfirm'; // 业绩申报待确认
      }
      obj.basic.dealVO.subscribeDate = this.postData.subscribeDate;
      obj.basic.dealVO.subscribePrice = this.postData.subscribePrice;
      obj.basic.houseVO.address = this.postData.address;
      obj.basic.houseVO.area = this.postData.area;
      obj.basic.houseVO.buildingId = this.postData.buildingId;
      obj.basic.houseVO.hall = this.postData.hall;
      obj.basic.houseVO.hall = this.postData.hall;
      obj.basic.houseVO.propertyNo = this.postData.propertyNo;
      obj.basic.houseVO.propertyType = this.postData.propertyType;
      obj.basic.houseVO.room = this.postData.room;
      obj.basic.houseVO.roomId = this.postData.roomId;
      obj.basic.houseVO.roomNo = this.baseInfoInDeal.roomNo;
      obj.basic.houseVO.toilet = this.postData.toilet;
      // 附件信息
      if (this.postData.documentVO.length > 0) {
        this.postData.documentVO.forEach((item: any) => {
          if (item.fileList.length > 0) {
            item.fileList.forEach((list: any) => {
              obj.basic.documentVO.push(
                {
                  fileId: list.fileId,
                  fileName: list.fileName,
                  fileType: item.code
                }
              )
            })
          }
        })
      }
      // 派发金额合计
      if (this.receiveAchieveVO.length > 0) {
        this.receiveAchieveVO.forEach((vo: any) => {
          obj.basic.receiveAchieveVO.push(
            {
              achieveAmount: vo.achieveAmount,
              otherChannelFees: vo.otherChannelFees,
              receiveAmount: vo.receiveAmount
            }
          )
        });
      }
      // 派发金额
      obj.basic.receiveVO = JSON.parse(JSON.stringify(this.postData.receiveVO));
      if (obj.basic && obj.basic.receiveVO && obj.basic.receiveVO.length) {
        obj.basic.receiveVO.forEach((vo: any) => {
          if ([null, undefined, 0, ""].includes(vo.otherChannelFees)) {
            vo.otherChannelFees = null; // 后台要置null
          }
        });
      }
      // 计算方式
      obj.calculation = this.postData.calculation;
      // 对外拆佣信息
      obj.channelCommVO = (this as any).$tool.deepClone(this.postData.commissionInfoList);
      if (obj.channelCommVO && obj.channelCommVO.length) {
        obj.channelCommVO.forEach((item: any) => {
          item.isMainDeal = true; // 后端说写死
        });
      }
      return obj;
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
      //flex: 1;
      &:not(:last-child) {
        margin-right: 10px;
      }
    }

    .fee {
      width: 30%;
    }

    .ratio{
      width: 20%;
    }

    .name{
      width: 50%;
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

      &:not(:last-child) {
        margin-right: 10px;
      }

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
    height: 115px;
    //padding: 20px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    margin: 10px 0px 10px 20px;
    border: 2px solid #409EFF;
    border-radius: 5px;

    .divider-tip {
      font-weight: bold;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      div {
        flex: 1;
      }

      .btn {
        margin-top: 10px;

        .btn-color {
          color: #FFF;
          background-color: #409EFF;
          border-color: #409EFF;
        }
      }
    }

    .color-blur {
      color: #409EFF;
    }

    .color-red {
      color: #f56c6c;
    }

    /deep/.el-divider {
      background-color: #409EFF;
    }

    /deep/.el-divider__text {
      color: #409EFF;
      font-size: 18px;
      font-weight: bold;
    }
  }

  .border-color-red {
    border-color: #f56c6c;
  }

  .border-color-none {
    border-color: white;
  }

  .border-color-green {
    border-color: #67c23a;

    /deep/.el-divider {
      background-color: #67c23a;
    }

    /deep/.el-divider__text {
      color: #67c23a;
    }
  }
</style>
