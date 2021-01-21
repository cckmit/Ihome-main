<!--
 * @Description:
 * @version: 
 * @Author: lsj
 * @Date: 2020-12-10 16:45:20
 * @LastEditors: lsj
 * @LastEditTime: 2021-01-19 18:36:55
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
              disabled v-model="postData.projectCycle"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="业务模式" prop="modelCode">
            <el-select
              v-model="postData.modelCode"
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
          <el-form-item label="细分业务模式" prop="refineModel">
            <el-select
              v-model="postData.refineModel"
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
              :disabled="['ChangeBasicInf', 'ChangeInternalAchieveInf'].includes(changeType)"
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
              disabled
              v-model="postData.buildingId"></el-input>
            <IhSelectPageByBuild
              v-else
              v-model="postData.buildingId"
              :proId="postData.projectId"
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
              disabled
              v-model="postData.roomId"></el-input>
            <IhSelectPageByRoom
              v-else
              v-model="postData.roomId"
              :proId="postData.projectId"
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
          <el-form-item label="渠道公司" prop="agencyName">
            <div v-if="['ChangeBasicInf', 'ChangeInternalAchieveInf'].includes(changeType)">
              <el-input placeholder="渠道公司" disabled v-model="postData.agencyName"></el-input>
            </div>
            <div v-else>
              <el-input
                placeholder="请选择渠道公司"
                readonly v-model="postData.agencyName">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="postData.contType === 'DistriDeal'">
          <el-form-item label="渠道等级">
            <el-input placeholder="渠道等级" disabled v-model="postData.channelLevelName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="postData.contType === 'DistriDeal'">
          <el-form-item label="经纪人">
            <el-input placeholder="经纪人" disabled v-model="postData.brokerName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="postData.contType === 'DistriDeal'">
          <el-form-item label="分销协议编号" prop="contNo">
            <div class="contNo-wrapper">
              <el-select
                v-model="postData.contNo"
                @change="changeContNo"
                :disabled="['ChangeBasicInf', 'ChangeInternalAchieveInf'].includes(changeType)"
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
          <el-form-item label="是否垫佣" prop="isMat">
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
          <el-form-item label="报备信息">
            <el-input
              disabled
              placeholder="成交报告编号"
              v-model="postData.recordStr"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="备案情况" prop="recordState">
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
                <el-input
                  v-digits="0"
                  :disabled="['ChangeInternalAchieveInf'].includes(changeType)"
                  v-model="postData.room">
                  <div slot="append">室</div>
                </el-input>
              </div>
              <div>
                <el-input
                  v-digits="0"
                  :disabled="['ChangeInternalAchieveInf'].includes(changeType)"
                  v-model="postData.hall">
                  <div slot="append">厅</div>
                </el-input>
              </div>
              <div>
                <el-input
                  v-digits="0"
                  :disabled="['ChangeInternalAchieveInf'].includes(changeType)"
                  v-model="postData.toilet">
                  <div slot="append">卫</div>
                </el-input>
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
        <el-col :span="6">
          <el-form-item label="现场销售">
            <el-input
              :disabled="['ChangeInternalAchieveInf'].includes(changeType)"
              v-model="postData.sceneSales" placeholder="请输入现场销售"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="签约类型" prop="signType">
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
                v-for="item in dealStageList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="明源房款回笼比例">
            <el-input
              v-model="postData.returnRatio"
              disabled
               placeholder="明源房款回笼比例"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="认购价格" prop="subscribePrice">
            <el-input
              v-digits="2"
              v-model="postData.subscribePrice"
              :disabled="['ChangeBasicInf', 'ChangeInternalAchieveInf'].includes(changeType)"
              placeholder="请输入认购价格"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="认购日期" prop="subscribeDate">
            <el-date-picker
              style="width: 100%"
              :disabled="['ChangeInternalAchieveInf'].includes(changeType)"
              v-model="postData.subscribeDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择认购日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="签约价格" prop="signPrice">
            <el-input
              v-digits="2"
              v-model="postData.signPrice"
              :disabled="['ChangeBasicInf', 'ChangeInternalAchieveInf'].includes(changeType)"
              placeholder="请输入签约价格"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="签约日期" prop="signDate">
            <el-date-picker
              style="width: 100%"
              :disabled="['ChangeInternalAchieveInf'].includes(changeType)"
              v-model="postData.signDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择签约日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="成交组织">
            <el-input v-model="postData.dealOrgName" disabled placeholder="请选择成交组织"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="录入人">
            <el-input v-model="postData.entryPerson" disabled placeholder="录入人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="录入日期">
            <el-input v-model="postData.entryDate" disabled placeholder="录入日期"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="数据标志" prop="dataSign">
            <el-input v-model="postData.dataSignName" disabled placeholder="数据标志"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="成交状态" prop="status">
            <el-input v-model="postData.statusName" disabled placeholder="成交状态"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="['ChangeBasicInf', 'ChangeInternalAchieveInf'].includes(changeType)">
          <el-form-item label="业绩分配人">
            <el-input v-model="postData.alloter" disabled placeholder="成交状态"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="['ChangeBasicInf', 'ChangeInternalAchieveInf'].includes(changeType)">
          <el-form-item label="业绩分配时间">
            <el-input v-model="postData.allotDate" disabled placeholder="成交状态"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="['ChangeBasicInf', 'ChangeInternalAchieveInf'].includes(changeType)">
          <el-form-item label="计算方式">
            <el-input
              disabled
              v-model="postData.calculationName"
              placeholder="计算方式"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div id="anchor-2" v-if="baseInfoByTerm.chargeEnum !== 'Agent'">
      <p class="ih-info-title">优惠告知书信息</p>
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
    </div>
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
          :data="postData.customerList">
          <el-table-column prop="customerNo" label="客户编号" min-width="150"></el-table-column>
          <el-table-column prop="customerType" label="客户类型" min-width="120">
            <template slot-scope="scope">
              <div>{{$root.dictAllName(scope.row.customerType, 'CustType')}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="customerName" label="客户名称" min-width="120"></el-table-column>
          <el-table-column prop="customerPhone" label="手机号码" min-width="120"></el-table-column>
          <el-table-column prop="CardType" label="证件类型" min-width="120">
            <template slot-scope="scope">
              <div>{{$root.dictAllName(scope.row.cardType, 'CardType')}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="cardNo" label="证件编号" min-width="150"></el-table-column>
          <el-table-column prop="email" label="邮箱" min-width="120"></el-table-column>
          <el-table-column
            v-if="changeType !== 'ChangeInternalAchieveInf'"
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
          :data="postData.receiveList">
          <el-table-column prop="type" label="类型" fixed min-width="120">
            <template slot-scope="scope">
              <div>{{scope.row.type === 'ServiceFee' ? '服务费' : '代理费'}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="partyACustomerName" label="甲方/客户" min-width="120"></el-table-column>
          <el-table-column prop="packageId" label="收派套餐" min-width="140">
            <template slot-scope="scope">
              <div v-if="['ChangeBasicInf', 'ChangeInternalAchieveInf'].includes(changeType)">
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
                    </el-table>
                  </div>
                  <el-input
                    readonly
                    placeholder="收派标准">
                    <el-button slot="append" icon="el-icon-view"></el-button>
                  </el-input>
                </el-tooltip>
              </div>
              <div v-else>
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
            </template>
          </el-table-column>
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
          :data="receiveAchieveVO">
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
          :data="postData.channelCommList">
          <el-table-column prop="target" label="拆佣对象" min-width="120">
            <template slot-scope="scope">
              <div v-if="['ChangeBasicInf', 'ChangeInternalAchieveInf'].includes(changeType)">
                {{$root.dictAllName(scope.row.target, 'CommObjectType')}}
              </div>
              <div v-else>
                <el-select
                  v-model="scope.row.target"
                  :disabled="postData.calculation === 'Auto'"
                  placeholder="请选择">
                  <el-option
                    v-for="item in $root.dictAllList('CommObjectType')"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="agencyName" label="收款方" min-width="120">
            <template slot-scope="scope">
              <div v-if="['ChangeBasicInf', 'ChangeInternalAchieveInf'].includes(changeType)">
                {{scope.row.agencyName}}
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
              <div v-if="['ChangeBasicInf', 'ChangeInternalAchieveInf'].includes(changeType)">
                {{$root.dictAllName(scope.row.feeType, 'FeeType')}}
              </div>
              <div v-else>
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
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="partyACustomer" label="费用来源(客户/甲方)" min-width="120">
            <template slot-scope="scope">
              <div v-if="['ChangeBasicInf', 'ChangeInternalAchieveInf'].includes(changeType)">
                {{scope.row.partyACustomerName}}
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
              <div v-if="['ChangeBasicInf', 'ChangeInternalAchieveInf'].includes(changeType)">
                {{scope.row.amount}}
              </div>
              <div v-else>
                <el-input
                  v-digits="2"
                  placeholder="金额"
                  :disabled="postData.calculation === 'Auto'"
                  v-model="scope.row.amount"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="remarks" label="备注" min-width="120">
            <template slot-scope="scope">
              <div v-if="['ChangeBasicInf', 'ChangeInternalAchieveInf'].includes(changeType)">
                {{scope.row.remarks}}
              </div>
              <div v-else>
                <el-input
                  v-digits="2"
                  placeholder="备注"
                  :disabled="postData.calculation === 'Auto'"
                  v-model="scope.row.remarks"></el-input>
              </div>
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
          <el-table-column prop="corporateAchieveRatio" label="角色人业绩比例(%)" min-width="150"></el-table-column>
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
          <el-table-column
            v-if="!['ChangeBasicInf'].includes(changeType)"
            fixed="right" label="操作" width="130">
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
          <el-table-column prop="corporateAchieveRatio" label="角色人业绩比例(%)" min-width="150"></el-table-column>
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
            v-if="!isSameFlag || !['ChangeBasicInf'].includes(changeType)"
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
    <p id="anchor-7" class="ih-info-title">上传附件</p>
    <el-row style="padding-left: 20px">
      <el-col>
        <el-table
          class="ih-table"
          :data="postData.uploadDocumentList">
          <el-table-column prop="name" label="类型" width="180"></el-table-column>
          <el-table-column prop="fileName" label="附件" min-width="300">
            <template slot-scope="scope">
              <IhUpload
                @newFileList="getNewFile"
                :isCrop="false"
                :isMove="false"
                :removePermi="true"
                size="100px"
                :limit="10"
                :file-size="10"
                :file-list.sync="scope.row.defaultFileList"
                :file-type="scope.row.code"
              ></IhUpload>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="btn">
      <el-button
        v-if="changeType === 'ChangeInternalAchieveInf'"
        type="success"
        @click="handleClickBtn('preview')">预览变更</el-button>
      <el-button v-else type="primary" @click="handleClickBtn('next')">下一步</el-button>
      <el-button @click="handleClickBtn('back')">取消</el-button>
    </div>
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
        :data="selectableChannelIds"
        @cancel="() => (dialogAddAgentCompany = false)"
        @finish="
            (data) => {
              dialogAddAgentCompany = false;
              finishAddAgentCompany(data);
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
          "/>
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
  import AgentCompanyList from "@/views/deal/dealReport/dialog/agentCompanyList.vue";
  import AddCustomer from "@/views/deal/dealReport/dialog/addCustomer.vue";
  import AddBroker from "@/views/deal/dealReport/dialog/addBroker.vue";
  import EditDealAchieve from "@/views/deal/dealReport/dialog/editDealAchieve.vue";
  import {
    post_pageData_recalculateAchieve, // 重算平台费用 --- 总包分销不一致的情况
    post_pageData_recalculateAchieveComm, // 重算平台费用 --- 总包分销一致的情况
    post_suppDeal_toAddSuppDeal // 新增补充成交
  } from "@/api/deal";
  import {
    get_term_getProBaseByTermId__termId, // 通过项目周期获取成交基础信息
  } from "@/api/project";
  import {get_org_get__id} from "@/api/system"; // 获取组织name
  import {
    post_notice_customer_information // 通过成交id获取优惠告知书
  } from "@/api/contract";

  @Component({
    components: {AddCustomer, AddBroker, SelectProjectCycle,
      AgentCompanyList, EditDealAchieve},
  })
  export default class BasePage extends Vue {
    changeType: any = null; // 补充成交类型
    contNoList: any = []; // 分销协议编号列表
    postData: any = {
      calculation: 'Auto',
      calculationName: null,
      dealCode: null,
      cycleId: null,
      cycleName: null, // 周期名称 - 选择
      projectCycle: null, // 项目周期名称 - 只读显示
      projectId: null, // 项目id
      modelCode: null,
      contType: null,
      refineModel: null,
      channelId: null,
      channelName: null,
      agencyId: null, // 渠道公司Id
      agencyName: null, // 渠道公司
      channelLevel: null, // 渠道等级Id
      channelLevelName: null, // 渠道等级
      brokerId: null, // 渠道经纪人Id
      brokerName: null, // 渠道经纪人
      recordStr: null, // 报备信息
      oneAgentTeamId: null,
      isMarketProject: null,
      recordState: null,
      dataSign: null,
      dataSignName: null,
      contNo: null,
      isMat: null,
      isConsign: null,
      stage: null,
      signType: null,
      subscribePrice: null,
      subscribeDate: null,
      signPrice: null,
      signDate: null,
      dealOrgName: null,
      dealOrgId: null,
      entryDate: null,
      entryPerson: null,
      status: null,
      statusName: null,
      sceneSales: null,
      address: null,
      area: null,
      buildingId: null,
      buildingName: null,
      hall: null,
      propertyNo: null,
      propertyType: null,
      room: null,
      roomId: null,
      roomNo: null,
      toilet: null,
      offerNoticeVO: [], // 优惠告知书
      customerList: [], // 客户信息
      agencyVO: [], // 渠道信息
      receiveList: [], // 收派金额
      receiveAchieveVO: [], // 应收信息
      uploadDocumentList: [], // 附件信息
      channelCommList: [], // 对外拆佣
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
    rules: any = {
      dealCode: [
        {required: true, message: "成交报告编号不能为空", trigger: "change"},
      ],
      cycleId: [
        {required: true, message: "项目周期必选", trigger: "change"},
      ],
      modelCode: [
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
      area: [
        {required: true, message: "建筑面积必填", trigger: "change"},
      ],
    };
    id: any = null;
    firstAgencyCompanyList: any = []; // 一手代理团队选项
    dealStageList: any = []; // 成交阶段选项
    packageIdsList: any = []; // 收派套餐ids：分销模式---选择分销协议后获取；非分销协议---请求接口获取
    dialogAddCustomer: any = false;
    dialogAddBroker: any = false;
    dialogAddProjectCycle: any = false;
    cycleCheckedData: any = [];
    reportCheckedData: any = [];
    dialogAddAgentCompany: any = false;
    commissionCustomerList: any = []; // 初始化费用来源的甲方信息 --- 代理费
    commissionServiceFeeObj: any = []; // 初始化费用来源的甲方信息 --- 服务费
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
    isSameFlag: any = false; // 是否分销与总包一致
    currentChangeObj: any = {
      type: null, // 当前选择修改的类型：总包/分销
      index: null // 当前选择修改的序号：总包/分销
    };
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
    baseInfoByTerm: any = {
      proId: null, // 项目id --- 用于查询分销协议列表
      termId: null, // 项目周期id
      termStageEnum: null, // 判断优惠告知书是否有添加按钮
      chargeEnum: null, //
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
    }; // 通过initPage接口获取到的成交信息(项目周期 + 房号)

    // 应收信息表格
    get receiveAchieveVO() {
      let arr: any = []
      if (this.postData.receiveList.length > 0) {
        let obj = {
          receiveAmount: 0,
          achieveAmount: 0,
          otherChannelFees: 0,
        }
        this.postData.receiveList.forEach((item: any) => {
          obj.receiveAmount = (obj.receiveAmount * 1 * 100 + item.receiveAmount * 1 * 100) / 100;
          obj.achieveAmount = (obj.achieveAmount * 1 * 100 + item.commAmount * 1 * 100
            + item.rewardAmount * 1 * 100 + item.totalPackageAmount * 1 * 100
            + item.distributionAmount * 1 * 100) / 100;
          obj.otherChannelFees = (obj.otherChannelFees * 1 * 100 + item.otherChannelFees * 1 * 100) / 100;
        })
        arr.push(obj);
      }
      return arr;
    }

    async created() {
      // 成交报告的id
      this.id = this.$route.query.id;
      this.changeType = this.$route.query.type;
      // console.log('this.changeType', this.changeType);
      if (this.id && this.changeType) {
        await this.initPageInfo();
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

    // 初始化页面数据
    async initPageInfo() {
      let postData: any = {
        dealId: this.id,
        suppContType: this.changeType
      }
      let res: any = await post_suppDeal_toAddSuppDeal(postData);
      // console.log(res);
      this.postData = {
        ...this.postData,
        ...res
      };
      this.postData.address = res.house.address;
      this.postData.area = res.house.area;
      this.postData.buildingId = res.house.buildingId;
      this.postData.buildingName = res.house.buildingName;
      this.postData.hall = res.house.hall;
      this.postData.propertyNo = res.house.propertyNo;
      this.postData.propertyType = res.house.propertyType;
      this.postData.room = res.house.room;
      this.postData.roomId = res.house.roomId;
      this.postData.roomNo = res.house.roomNo;
      this.postData.toilet = res.house.toilet;
      if (res.agencyList && res.agencyList.length) {
        this.initAgency(res.agencyList, true);
      }
      // 成交组织
      await this.getOrgName(res.dealOrgId);
      // 成交状态
      this.postData.statusName = (this as any).$root.dictAllName(res.status, 'DealStatus');
      // 计算方式
      this.postData.calculationName = (this as any).$root.dictAllName(res.calculation, 'DealCalculateWay');
      // 数据标志
      this.postData.dataSignName = (this as any).$root.dictAllName(res.dataSign, 'DealDataFlag');
      // 优惠告知书
      await this.getNoticeList(res.id);
      // 客户信息
      if (this.postData.customerList && this.postData.customerList.length) {
        this.postData.customerList.forEach((list: any) => {
          list.addId = list.id;
        });
      }
      // 调整收派金额信息
      await this.initReceiveList(this.postData.receiveList);
      // 平台费用
      this.postData.achieveTotalBagList = [];
      this.postData.achieveDistriList = [];
      if (res.achieveList && res.achieveList.length) {
        res.achieveList.forEach((list: any) => {
          if (list.type === 'TotalBag') {
            this.postData.achieveTotalBagList.push(list);
          } else if (list.type === 'Distri') {
            this.postData.achieveDistriList.push(list);
          }
        })
      }
      // 通过项目周期id获取基础信息
      await this.getBaseDealInfo(res.cycleId);
      // 初始化附件信息
      await this.initDocumentList(res.documentShowList);
    }

    // 调整收派金额信息
    initReceiveList(data: any = []) {
      if (!data.length) return;
      data.forEach((item: any) => {
        this.$set(item, 'showData', [item.collectandsendDetailDealVO]);
      })
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
      }
    }

    // 通过项目周期id获取基础信息
    async getBaseDealInfo(id: any) {
      if (!id) return;
      let baseInfo: any = await get_term_getProBaseByTermId__termId({termId: id});
      // 一手代理团队的选项
      this.firstAgencyCompanyList = [];
      if (baseInfo.firstAgencyCompanys && baseInfo.firstAgencyCompanys.length > 0) {
        this.firstAgencyCompanyList = JSON.parse(JSON.stringify(baseInfo.firstAgencyCompanys));
      }
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
    }

    // 初始化附件信息
    initDocumentList(list: any = []) {
      if (!list.length) return;
      let fileList: any = (this as any).$root.dictAllList('DealFileType'); // 附件类型
      if (fileList.length > 0) {
        fileList.forEach((vo: any) => {
          vo.defaultFileList = []; // 存放原来的数据
          vo.fileList = []; // 存放新上传的数据
          if (list && list.length) {
            list.forEach((item: any) => {
              if (item.fileType === vo.code) {
                item.exAuto = true; // 不能删除
                vo.defaultFileList.push(item);
              }
            })
          }
        });
      } else {
        fileList = [];
      }
      this.postData.uploadDocumentList = JSON.parse(JSON.stringify(fileList));
    }

    // 获取组织name
    async getOrgName(id: any = '') {
      if (!id) return;
      const info: any = await get_org_get__id({id: id});
      // console.log('组织info:', info);
      this.postData.dealOrgName = info.name;
      this.postData.dealOrgId = id;
    }

    // 通过成交id获取优惠告知书
    async getNoticeList(dealId: any = '') {
      if (!dealId) return;
      const list: any = await post_notice_customer_information({dealId: dealId});
      // console.log('组织info:', list);
      this.postData.offerNoticeVO = list;
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

    // 修改业务模式逻辑
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
      if (value === 'NaturalVisitDeal') {
        // 自然来访
        console.log(123)
      } else {
        // 自然来访
        console.log(123)
      }
    }

    // 预览分销协议
    previewContNo(contractNo: any) {
      if (!contractNo) {
        this.$message.error('请先选择需要预览的分销协议');
      } else {
        // 预览
        let router = this.$router.resolve({
          path: `/distribution/info`,
          query: {
            contractNo: contractNo
          },
        });
        window.open(router.href, "_blank");
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

    // 预览-优惠告知书
    preview(scope: any) {
      // console.log(scope);
      window.open(
        `/sales-api/sales-document-cover/file/browse/${scope.row.templateId}`
      );
    }

    // 添加客户
    handleAddCustomer() {
      this.dialogAddCustomer = !this.dialogAddCustomer;
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
      if (this.postData.customerList.length > 0) {
        customData.isCustomer = "No";
        this.postData.customerList.push(customData);
      } else {
        customData.isCustomer = "Yes";
        this.postData.customerList.push(customData);
        // 因为没有客户，选了客户后第一个客户是主要客户，需要回显到收派金额中类型为服务费的客户上
        if (this.postData.receiveList && this.postData.receiveList.length) {
          this.updateList('receiveList', 'type', data[0].id, data[0].custName, false);
        }
        // 回显到对应的对外拆佣上
        if (this.postData.channelCommList && this.postData.channelCommList.length) {
          this.updateList('channelCommList', 'feeType', data[0].id, data[0].custName, false);
        }
      }
    }

    // 删除客户/渠道经纪人
    async deleteAdd(scope: any, type: any) {
      // console.log(scope);
      // console.log(type);
      if (type === 'customer') {
        // 删除客户信息逻辑
        this.postData.customerList = this.postData.customerList.filter((list: any) => {
          return list.addId !== scope.row.addId;
        });
        if (scope.$index === 0) {
          if (this.postData.customerList.length) {
            // 修改当前第一个客户为主要客户
            this.postData.customerList.forEach((item: any, index: any) => {
              if (index === 0) {
                item.isCustomer = "Yes";
              } else {
                item.isCustomer = "No";
              }
            });
            // 删除的是第一个,需要把现在的第一个赋值给收派金额类型为服务费的信息中
            let id: any = this.postData.customerList[0].addId;
            let name: any = this.postData.customerList[0].customerName;
            if (this.postData.receiveList && this.postData.receiveList.length) {
              this.updateList('receiveList', 'type', id, name, false);
            }
            // 回显到对应的对外拆佣上
            if (this.postData.channelCommList && this.postData.channelCommList.length) {
              this.updateList('channelCommList', 'feeType', id, name, false);
            }
          } else {
            // 没有客户了，收派信息、对外拆佣的服务费对应的名字变为空
            if (this.postData.receiveList && this.postData.receiveList.length) {
              this.updateList('receiveList', 'type', '', '', true);
            }
            if (this.postData.channelCommList && this.postData.channelCommList.length) {
              this.updateList('channelCommList', 'feeType', '', '', true);
            }
          }
        }
      } else if (type === 'broker') {
        // 删除渠道经纪人逻辑
        console.log(222);
      }
    }

    /*
    * 修改收派金额或对外拆佣的值
    * updateType: String，收派金额receiveList/对外拆佣channelCommList
    * type: String，收派金额/对外拆佣对应的字段
    * id: String，更新的id
    * name: String，更新的name
    * isNull: Boolean，true: 置空，false: 置为对应值
    * */
    updateList(updateType: any = '', type: any = '', id: any = '', name: any = '', isNull: any = false) {
      if (this.postData[updateType] && this.postData[updateType].length) {
        this.postData[updateType].forEach((list: any) => {
          if (list[type] === "ServiceFee") {
            list.partyACustomer = isNull ? null : id;
            list.partyACustomerName = isNull ? null : name;
          }
        });
      }
    }

    // 添加渠道经纪人
    handleAddBroker() {
      this.dialogAddBroker = true;
    }

    // 确定选择渠道经纪人
    async finishAddBroker(data: any) {
      console.log('data', data);
      // this.addTotalPackageList = data;
    }

    // 增加拆佣项
    handleAddCommission() {
      console.log('增加拆佣项');
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
      this.postData.channelCommList.push(obj);
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

    // 选择拆佣 - 收款方
    selectAgencyName(scope: any) {
      console.log('选择收款方', scope);
      if (this.postData.calculation === 'Auto') return;
      this.dialogAddAgentCompany = true;
    }

    // 改变费用类型
    changeFeeType(value: any, row: any) {
      if (!value) return;
      switch(value){
        case 'ServiceFee':
          // 服务费
          // row.partyACustomer = this.commissionServiceFeeObj.partyACustomer;
          // row.partyACustomerName = this.commissionServiceFeeObj.partyACustomerName;
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

    // 新增总包/分销业绩
    handleAddAchieve(type: any) {
      console.log('type', type);
      // console.log('type', type);
      this.editDealAchieveData.btnType = 'add';
      // total - 总包； distri - 分销
      if (type === 'total') {
        // 总包
        this.currentChangeObj.type = 'total';
        this.editDealAchieveData.type = 'total';
        this.currentChangeObj.index = null;
      } else if (type === 'distri') {
        // 分销
        this.currentChangeObj.type = 'distri';
        this.editDealAchieveData.type = 'distri';
        this.currentChangeObj.index = null;
      }
      this.editDealAchieveData.currentEditItem.roleType = 'add';
      this.dialogEditDealAchieve = true;
    }

    // 修改平台费用 --- 总包/分销
    editAchieveTotalBag(scope: any, type: any) {
      console.log('data', scope);
      // console.log('data', type);
      this.editDealAchieveData.btnType = 'edit';
      this.editDealAchieveData.type = type;
      this.editDealAchieveData.currentEditItem = scope.row;
      this.currentChangeObj.index = scope.$index;
      this.currentChangeObj.type = type;
      this.dialogEditDealAchieve = true;
    }

    // 确定新增/修改平台业绩
    async finishEditDealAchieve(data: any = {}) {
      console.log('finishEditDealAchieve', data);
      let tempArr: any = [];
      if (this.editDealAchieveData.type === 'total') {
        tempArr = this.getTempList(this.editDealAchieveData.btnType, this.currentChangeObj.index, this.postData.achieveTotalBagList, data);
      } else if (this.editDealAchieveData.type === 'distri') {
        tempArr = this.getTempList(this.editDealAchieveData.btnType, this.currentChangeObj.index, this.postData.achieveDistriList, data);
      }
      await this.recalculateAchieve(this.editDealAchieveData.type, tempArr);
      this.dialogEditDealAchieve = !this.dialogEditDealAchieve;
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

    // 移除平台费用 --- 总包/分销
    deleteAchieveTotalBag(scope: any, type: any) {
      // console.log('data', scope);
      let tempArr: any = [];
      if (type === 'total') {
        // 总包
        tempArr = this.postData.achieveTotalBagList.filter((item: any, index: any) => {
          return index !== scope.$index;
        });
      } else if (type === 'distri') {
        // 分销
        tempArr = this.postData.achieveDistriList.filter((item: any, index: any) => {
          return index !== scope.$index;
        });
      }
      this.recalculateAchieve(type, tempArr);
    }

    /*
    * 重新计算平台费用
    * type: String，总包还是分销：total，distri
    * tempList：Array，数组参数
    * */
    async recalculateAchieve(type: any = "", tempList: any = []) {
      let params: any = {
        branchCompanyId: this.baseInfoByTerm.startDivisionId, // 分公司Id --- 项目周期带出
        contType: this.postData.contType, // 合同类型
        isMarketProject: this.postData.isMarketProject, // 是否市场化项目
        list: tempList,
        modelCode: this.postData.businessType, // 业务模式
        propertyType: this.postData.propertyType, // 物业类型
        specialId: this.baseInfoByTerm.specialId, // 特殊方案Id --- 项目周期带出
        totalAmount: null, // 总包/分销总金额
        type: null
      }
      if (type === 'total') {
        // 总包
        params.type = "TotalBag";
        params.totalAmount = this.getTotalAmount('totalPackageAmount');
      } else if (type === 'distri') {
        // 分销
        params.type = "Distri";
        params.totalAmount = this.getTotalAmount('distributionAmount');
      }
      let list: any = await post_pageData_recalculateAchieve(params);
      console.log(list);
      let commInfo: any = {};
      if (this.isSameFlag) {
        // 分销同步总包
        let paramsObj: any = {
          totalBagList: params.list, // 总包拆佣
          totalCommAmount: this.editDealAchieveData.totalAmount, // 总拆佣金额
        }
        commInfo = await post_pageData_recalculateAchieveComm(paramsObj);
        console.log(commInfo);
      }
      if (list && list.length) {
        if (type === 'total') {
          // 总包
          this.postData.achieveTotalBagList = tempList;
          if (this.postData.achieveTotalBagList.length) {
            this.postData.achieveTotalBagList = this.getAchieveData(this.postData.achieveTotalBagList, list);
          }
        } else if (type === 'distri') {
          // 分销
          this.postData.achieveDistriList = tempList;
          if (this.postData.achieveDistriList.length) {
            this.postData.achieveDistriList = this.getAchieveData(this.postData.achieveDistriList, list);
          }
        }
      }
      if (commInfo.totalBagList && commInfo.totalBagList.length) {
        // 总包同步分销
        this.postData.achieveTotalBagList = this.getAchieveData(this.postData.achieveTotalBagList, commInfo.totalBagList);
        this.postData.achieveDistriList = this.getAchieveData(this.postData.achieveDistriList, commInfo.distriList);
      }
    }

    // 获取分销金额和总包金额
    getTotalAmount(type: any = '') {
      if (!type) return;
      let total = 0;
      if (this.postData.receiveList.length) {
        this.postData.receiveList.forEach((vo: any) => {
          total = total + parseFloat(vo[type] ? vo[type] : 0);
        });
        return total;
      } else {
        return 0;
      }
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
        if ([1, 2, 3, 4, 5].includes(index)) {
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

    // 获取最新的上传附件
    getNewFile(data: any, type?: any) {
      // console.log(data);
      // console.log(type);
      // console.log(this.postData.uploadDocumentList);
      if (this.postData.uploadDocumentList.length > 0) {
        this.postData.uploadDocumentList.forEach((vo: any) => {
          if (vo.code === type) {
            vo.fileList = data;
          }
        });
      }
    }

    // 底部按钮功能
    handleClickBtn(btnType: any = '') {
      switch (btnType) {
        case "preview":
          // 预览
          this.$emit("preview");
          console.log(123);
          break;
        case "next":
          // 下一步
          console.log(456);
          this.$emit("next", 'next', this.postData);
          break;
        case "back":
          // 取消
          this.$emit("back");
          break;
      }
    }
  }
</script>
<style lang="scss" scoped>
  .add-all-wrapper {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 10px;
  }

  .btn {
    box-sizing: border-box;
    margin-top: 30px;
    text-align: center;
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
