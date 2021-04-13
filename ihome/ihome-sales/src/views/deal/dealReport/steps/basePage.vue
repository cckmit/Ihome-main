<!--
 * @Description:
 * @version: 
 * @Author: lsj
 * @Date: 2020-12-10 16:45:20
 * @LastEditors: lsj
 * @LastEditTime: 2021-04-09 15:59:30
-->
<template>
  <ih-page class="text-left">
    <el-form
      @submit.native.prevent
      :model="postData"
      :rules="rules"
      ref="ruleForm"
      label-width="110px"
      class="demo-ruleForm">
      <p id="anchor-1" ref="#anchor-1" class="ih-info-title">成交信息</p>
      <div
        v-if="!['ChangeInternalAchieveInf'].includes(changeType)"
        class="add-all-wrapper padding-left-20">
        <el-button type="success">更新明源数据</el-button>
      </div>
      <el-row :gutter="5">
        <el-col :span="8">
          <el-form-item label="成交报告编号" prop="dealCode">
            <el-input disabled v-model="postData.dealCode"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目周期" prop="cycleId">
            <el-input
              v-if="['ChangeAchieveInf'].includes(changeType)"
              placeholder="请选择项目周期"
              readonly v-model="postData.cycleName">
              <el-button slot="append" icon="el-icon-search" @click.native.prevent="selectProject"></el-button>
            </el-input>
            <el-input
              v-if="['ChangeBasicInf', 'ChangeInternalAchieveInf', 'RetreatRoom'].includes(changeType)"
              disabled v-model="postData.projectCycle"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
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
        <el-col :span="8">
          <el-form-item label="细分业务模式" prop="refineModel">
            <div
              class="div-disabled"
              v-if="['ChangeBasicInf', 'RetreatRoom', 'ChangeInternalAchieveInf'].includes(changeType)">
              {{$root.dictAllName(postData.refineModel, 'Subdivide')}}
            </div>
            <div v-else>
              <el-select
                v-model="postData.refineModel"
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
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
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
        <el-col :span="8" class="form-item-label-wrapper">
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
        <el-col :span="8">
          <el-form-item label="一手代理公司" :prop="oneAgentRequiredFlag ? 'oneAgentTeamId' : 'notEmpty'">
            <el-select
              v-model="postData.oneAgentTeamId"
              :disabled="['ChangeBasicInf', 'RetreatRoom', 'ChangeInternalAchieveInf'].includes(changeType)"
              placeholder="请选择一手代理公司"
              @change="changeSelectAgent"
              clearable
              class="width--100">
              <el-option
                v-for="item in firstAgencyCompanyList"
                :key="item.id"
                :label="item.name"
                :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="一手代理合同" :prop="postData.oneAgentTeamId ? 'firstContNo' : 'notEmpty'">
            <div class="contNo-wrapper">
              <el-select
                v-model="postData.firstContNo"
                :disabled="['ChangeBasicInf', 'RetreatRoom', 'ChangeInternalAchieveInf'].includes(changeType)"
                clearable
                @change="changeFirstContNo"
                placeholder="请选择一手代理合同"
                class="width--100">
                <el-option
                  v-for="(item, index) in firstAgencyCompanyContList"
                  :key="index"
                  :label="item.contractTitle"
                  :value="item.contractNo"></el-option>
              </el-select>
              <div class="link-wrapper" >
                <el-link type="primary" @click.native.prevent="previewContNo(postData.firstContNo)">详情</el-link>
              </div>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="成交阶段" prop="stage">
            <div class="div-disabled">签约</div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="物业类型" prop="propertyType">
            <div
              class="div-disabled"
              v-if="['ChangeBasicInf', 'RetreatRoom', 'ChangeInternalAchieveInf'].includes(changeType)">
              {{$root.dictAllName(postData.propertyType, 'Property')}}
            </div>
            <div v-else>
              <el-select
                v-model="postData.propertyType"
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
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="栋座" prop="buildingId">
            <el-input
              v-if="['ChangeInternalAchieveInf', 'RetreatRoom'].includes(changeType)"
              disabled
              v-model="postData.buildingName"></el-input>
            <IhSelectPageByBuild
              v-else
              @change="changeBuild"
              @changeOption="(data) => {postData.buildingName = data.buildingName}"
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
        <el-col :span="8">
          <el-form-item label="房号" prop="roomId">
            <el-input
              v-if="['ChangeInternalAchieveInf', 'RetreatRoom'].includes(changeType)"
              disabled
              v-model="postData.roomNo"></el-input>
            <IhSelectPageByRoom
              v-else
              @change="changeRoom"
              @changeOption="(data) => {postData.roomNo = data.roomNo}"
              v-model="postData.roomId"
              :proId="postData.projectId"
              :buildingId="postData.buildingId"
              :props="{
                key: 'roomId',
                value: 'roomId',
                lable: 'roomNo',
                disabled: 'exDeal'
              }"
              :isCascade="true"
              cascadeType="room"
              placeholder="请选择房号"
              clearable
            ></IhSelectPageByRoom>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同类型" prop="contType">
            <div
              class="div-disabled"
              v-if="['ChangeBasicInf', 'RetreatRoom', 'ChangeInternalAchieveInf'].includes(changeType)">
              {{$root.dictAllName(postData.contType, 'ContType')}}
            </div>
            <div v-else>
              <el-select
                v-model="postData.contType"
                :disabled="baseInfoInDeal.contType === 'DistriDeal' && baseInfoInDeal.hasRecord && !!postData.roomId"
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
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="postData.contType === 'DistriDeal'">
          <el-form-item label="渠道公司" :prop="postData.contType === 'DistriDeal' ? 'agencyId' : 'notEmpty'">
            <div v-if="['ChangeBasicInf', 'RetreatRoom', 'ChangeInternalAchieveInf'].includes(changeType)">
              <el-input disabled v-model="postData.agencyName"></el-input>
            </div>
            <div v-else>
              <div class="agency-wrapper">
                <div>
                  <el-select
                    v-model="postData.companyKind"
                    clearable
                    placeholder="请选择公司类型"
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
                    v-model="postData.agencyId"
                    @changeOption="(data) => {postData.agencyName = data.name}"
                    :proId="postData.companyKind"
                    :orgId="baseInfoByTerm.startDivisionId"
                    :searchName="agencySearchName"
                    @change="changeCompany"
                    placeholder="请选择渠道公司"
                    clearable
                  ></IhSelectPageByChannelCompany>
                </div>
              </div>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="postData.contType === 'DistriDeal' && postData.companyKind === 'ChannelCompany'">
          <el-form-item label="经纪人" :prop="postData.contType === 'DistriDeal' && postData.companyKind === 'ChannelCompany' ? 'brokerId' : 'notEmpty'">
            <div v-if="['ChangeBasicInf', 'RetreatRoom', 'ChangeInternalAchieveInf'].includes(changeType)">
              <el-input disabled v-model="postData.brokerName"></el-input>
            </div>
            <div v-else>
              <IhSelectPageByChannelBroker
                v-model="postData.brokerId"
                @changeOption="(data) => {postData.brokerName = data.name}"
                :searchName="brokerSearchName"
                :proId="postData.agencyId"
                :props="{
                  lable: 'name',
                  value: 'userId',
                  key: 'id',
                  disabled: 'disabled'
                }"
                @change="changeBroker"
                clearable
              ></IhSelectPageByChannelBroker>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="postData.contType === 'DistriDeal'">
          <el-form-item label="渠道分销合同" :prop="postData.contType === 'DistriDeal' ? 'contNo' : 'notEmpty'">
            <div class="contNo-wrapper">
              <el-select
                v-model="postData.contNo"
                @change="changeContNo"
                :disabled="['ChangeBasicInf', 'RetreatRoom', 'ChangeInternalAchieveInf'].includes(changeType)"
                placeholder="请选择渠道分销合同"
                class="width--100">
                <el-option
                  v-for="(item, index) in contNoList"
                  :key="index"
                  :label="item.contractTitle" :value="item.contractNo"></el-option>
              </el-select>
              <div class="link-wrapper" v-if="!!postData.contNo">
                <el-link type="primary" @click.native.prevent="previewContNo(postData.contNo)">详情</el-link>
              </div>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="postData.contType === 'DistriDeal'">
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
        <el-col :span="8">
          <el-form-item label="备案情况">
            <el-select
              v-model="postData.recordState"
              :disabled="['ChangeBasicInf', 'RetreatRoom', 'ChangeInternalAchieveInf'].includes(changeType)"
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
        <el-col :span="8">
          <el-form-item label="建筑面积" prop="area">
            <el-input
              v-model="postData.area"
              :disabled="['ChangeInternalAchieveInf', 'RetreatRoom'].includes(changeType) || isDisabled('area', 'houseVO')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="户型" prop="room">
            <div class="home-type-wrapper">
              <div>
                <el-input
                  v-digits="0"
                  :disabled="['ChangeInternalAchieveInf', 'RetreatRoom'].includes(changeType) ||isDisabled('room', 'houseVO')"
                  v-model="postData.room">
                  <template slot="append">室</template>
                </el-input>
              </div>
              <div>
                <el-input
                  v-digits="0"
                  :disabled="['ChangeInternalAchieveInf', 'RetreatRoom'].includes(changeType) || isDisabled('hall', 'houseVO')"
                  v-model="postData.hall">
                  <template slot="append">厅</template>
                </el-input>
              </div>
              <div>
                <el-input
                  v-digits="0"
                  :disabled="['ChangeInternalAchieveInf', 'RetreatRoom'].includes(changeType) || isDisabled('toilet', 'houseVO')"
                  v-model="postData.toilet">
                  <template slot="append">卫</template>
                </el-input>
              </div>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="form-item-label-wrapper">
          <el-form-item label="房产证/预售合同编号">
            <el-input
              :disabled="['ChangeInternalAchieveInf', 'RetreatRoom'].includes(changeType)"
              v-model="postData.propertyNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="现场销售">
            <el-input
              :disabled="['ChangeInternalAchieveInf', 'RetreatRoom'].includes(changeType)"
              v-model="postData.sceneSales"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="签约类型" prop="signType">
            <el-select
              v-model="postData.signType"
              :disabled="['ChangeInternalAchieveInf', 'RetreatRoom'].includes(changeType) || isDisabled('signType', 'dealVO')"
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
        <el-col :span="8" class="form-item-label-wrapper">
          <el-form-item label="房款回笼比例">
            <el-input
              v-digits="2"
              v-model="postData.returnRatio"
              :disabled="changeType !== 'ChangeAchieveInf'"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="认购价格" prop="subscribePrice">
            <el-input
              v-digits="2"
              @blur="changePrice($event, 'SubscribePrice')"
              v-model="postData.subscribePrice"
              :disabled="['ChangeBasicInf', 'RetreatRoom', 'ChangeInternalAchieveInf'].includes(changeType) || isDisabled('subscribePrice', 'dealVO')"
              placeholder="请输入认购价格"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="认购日期" prop="subscribeDate">
            <el-date-picker
              style="width: 100%"
              :disabled="['ChangeInternalAchieveInf', 'RetreatRoom'].includes(changeType) || isDisabled('subscribeDate', 'dealVO')"
              v-model="postData.subscribeDate"
              type="date"
              :picker-options="pickerOption"
              value-format="yyyy-MM-dd"
              placeholder="请选择认购日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="签约价格" prop="signPrice">
            <el-input
              v-digits="2"
              @blur="changePrice($event, 'SignPrice')"
              v-model="postData.signPrice"
              :disabled="['ChangeBasicInf', 'RetreatRoom', 'ChangeInternalAchieveInf'].includes(changeType) || isDisabled('signPrice', 'dealVO')"
              placeholder="请输入签约价格"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="签约日期" prop="signDate">
            <el-date-picker
              style="width: 100%"
              :disabled="['ChangeInternalAchieveInf', 'RetreatRoom'].includes(changeType) || isDisabled('signDate', 'dealVO')"
              v-model="postData.signDate"
              type="date"
              :picker-options="pickerOption"
              value-format="yyyy-MM-dd"
              placeholder="请选择签约日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="成交组织">
            <el-input v-model="postData.dealOrgName" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="录入人" prop="entryPerson">
            <el-input v-model="postData.entryPerson" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="录入日期" prop="entryDate">
            <el-input v-model="postData.entryDate" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="数据标志" prop="dataSign">
            <el-input v-model="postData.dataSignName" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="成交状态">
            <el-input v-model="postData.statusName" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="['ChangeBasicInf', 'ChangeInternalAchieveInf'].includes(changeType)">
          <el-form-item label="业绩分配人">
            <el-input v-model="postData.alloter" disabled ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="['ChangeBasicInf', 'ChangeInternalAchieveInf'].includes(changeType)">
          <el-form-item label="业绩分配时间">
            <el-input v-model="postData.allotDate" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="['ChangeBasicInf', 'ChangeInternalAchieveInf'].includes(changeType)">
          <el-form-item label="计算方式">
            <el-input disabled v-model="postData.calculationName"></el-input>
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
            v-if="!['ChangeInternalAchieveInf', 'RetreatRoom'].includes(changeType) && postData.roomId"
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
            v-if="!['ChangeInternalAchieveInf', 'RetreatRoom'].includes(changeType)"
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
          :summary-method="getReceiveSummaries"
          :data="postData.receiveList">
          <el-table-column prop="type" label="类型" fixed min-width="120">
            <template slot-scope="scope">
              <div>{{scope.row.type === 'ServiceFee' ? '服务费' : '代理费'}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="partyACustomerName" label="甲方/客户" min-width="120">
            <template slot-scope="scope">
              <div>{{scope.row.type === "ServiceFee" ? '客户' : scope.row.partyACustomerName}}</div>
            </template>
          </el-table-column>
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
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="receiveAmount" label="应收金额" min-width="180">
            <template slot-scope="scope">
              <el-input
                v-if="['ChangeBasicInf', 'ChangeInternalAchieveInf'].includes(changeType)"
                v-digits="2"
                @input="changeReceiveItem($event, scope.row, 'receiveAmount')"
                v-model="scope.row.receiveAmount"
                disabled></el-input>
              <el-input
                v-else
                v-digits="2"
                @input="changeReceiveItem($event, scope.row, 'receiveAmount')"
                v-model="scope.row.receiveAmount"
                :disabled="postData.calculation === 'Auto'"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="commAmount" label="派发佣金金额" min-width="180">
            <template slot-scope="scope">
              <el-input
                v-if="['ChangeBasicInf', 'ChangeInternalAchieveInf'].includes(changeType)"
                v-digits="2"
                @input="changeReceiveItem($event, scope.row, 'commAmount')"
                v-model="scope.row.commAmount"
                disabled></el-input>
              <el-input
                v-else
                v-digits="2"
                @input="changeReceiveItem($event, scope.row, 'commAmount')"
                v-model="scope.row.commAmount"
                :disabled="postData.calculation === 'Auto'"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="rewardAmount" label="派发内场奖励金额" min-width="180">
            <template slot-scope="scope">
              <el-input
                v-if="['ChangeBasicInf', 'ChangeInternalAchieveInf'].includes(changeType)"
                v-digits="2"
                @input="changeReceiveItem($event, scope.row, 'rewardAmount')"
                v-model="scope.row.rewardAmount"
                disabled></el-input>
              <el-input
                v-else
                v-digits="2"
                @input="changeReceiveItem($event, scope.row, 'rewardAmount')"
                v-model="scope.row.rewardAmount"
                :disabled="postData.calculation === 'Auto'"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="totalPackageAmount" label="总包业绩金额" min-width="180">
            <template slot-scope="scope">
              <el-input
                v-if="['ChangeBasicInf', 'ChangeInternalAchieveInf'].includes(changeType)"
                v-digits="2"
                @input="changeReceiveItem($event, scope.row, 'totalPackageAmount')"
                v-model="scope.row.totalPackageAmount"
                disabled></el-input>
              <el-input
                v-else
                v-digits="2"
                @input="changeReceiveItem($event, scope.row, 'totalPackageAmount')"
                v-model="scope.row.totalPackageAmount"
                :disabled="(postData.calculation === 'Auto' || postData.modelCode === 'DistriModel')"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="distributionAmount" label="分销业绩金额" min-width="180">
            <template slot-scope="scope">
              <el-input
                v-if="['ChangeBasicInf', 'ChangeInternalAchieveInf'].includes(changeType)"
                v-digits="2"
                @input="changeReceiveItem($event, scope.row, 'distributionAmount')"
                v-model="scope.row.distributionAmount" disabled>
              </el-input>
              <el-input
                v-else
                v-digits="2"
                @input="changeReceiveItem($event, scope.row, 'distributionAmount')"
                v-model="scope.row.distributionAmount"
                :disabled="(postData.calculation === 'Auto' || postData.modelCode === 'TotalBagModel')">
              </el-input>
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
    <div v-if="postData.receiveList.length && ['ChangeAchieveInf', 'RetreatRoom'].includes(changeType)">
      <div class="divider-padding" v-if="addFlag">
        <div class="divider-tip color-blur">
<!--          <div>完善收派金额后请点击下方按钮初始化加载对外拆佣及平台费用数据</div>-->
          <div class="btn">
            <el-button class="btn-color" @click="handleLoadCommission('add')">点击加载对外拆佣及平台费用数据</el-button>
          </div>
        </div>
      </div>
      <div class="divider-padding border-color-red" v-if="editFlag || isShowBtn">
        <div class="divider-tip color-red">
<!--          <div>收派金额发生变动，业绩需要初始化重新分配，请点击下方刷新按钮重新初始化对外拆佣及平台费用数据</div>-->
          <div class="btn">
            <el-button type="danger" @click="handleLoadCommission('refresh')">刷新</el-button>
          </div>
        </div>
      </div>
      <div class="divider-padding border-color-none" v-if="tipsFlag">
        <el-divider>{{dividerTips}}</el-divider>
      </div>
    </div>
    <div class="divider-padding border-color-none" v-else>
      <el-divider>业绩分配</el-divider>
    </div>
    <p id="anchor-5" class="ih-info-title">对外拆佣</p>
    <el-row style="padding-left: 20px">
      <el-col>
        <div class="add-all-wrapper" v-if="false">
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
                  :disabled="postData.calculation === 'Auto' || true"
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
                <div v-if="postData.calculation === 'Auto' || true">
                  <el-input placeholder="收款方" disabled v-model="scope.row.agencyName"></el-input>
                </div>
                <div v-else>
                  <div v-if="scope.row.target === 'Personal'">
                    <el-input placeholder="请输入收款方" v-model="scope.row.agencyName"></el-input>
                  </div>
                  <div v-if="scope.row.target === 'AgentCompany'">
                    <el-input disabled v-model="scope.row.agencyName"></el-input>
                  </div>
                  <div v-if="scope.row.target === 'ChannelCompany'">
                    <el-input placeholder="请选择收款方" readonly v-model="scope.row.agencyName">
                      <el-button slot="append" icon="el-icon-search" @click.native.prevent="selectAgency('agencyName', scope)"></el-button>
                    </el-input>
                  </div>
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
                  :disabled="postData.calculation === 'Auto' || true"
                  placeholder="请选择费用类型"
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
                <div v-if="scope.row.feeType === 'ServiceFee'">客户</div>
                <div v-else>{{scope.row.partyACustomerName}}</div>
              </div>
              <div v-else>
                <div v-if="postData.calculation === 'Auto' || true">
                  <div v-if="scope.row.feeType === 'ServiceFee'">客户</div>
                  <el-input v-if="scope.row.feeType === 'AgencyFee'" disabled v-model="scope.row.partyACustomerName"></el-input>
                </div>
                <div v-else>
                  <div v-if="scope.row.feeType === 'ServiceFee'">客户</div>
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
                  :disabled="postData.calculation === 'Auto' || true"
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
                  :disabled="postData.calculation === 'Auto'"
                  v-model="scope.row.remarks"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-if="false"
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
      <div class="ih-info-title title-right">总包</div>
      <el-button
        v-if="!['ChangeBasicInf'].includes(changeType) && postData.achieveTotalBagList.length"
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
          <el-table-column prop="roleAchieveCap" label="角色业绩上限" min-width="150">
            <template slot-scope="{row}">
              <div :class="row.correct === false ? 'achieve-color-red' : ''">{{row.roleAchieveCap}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="rolerName" label="角色人" min-width="150">
            <template slot-scope="scope">
              <div v-if="scope.row.roleType === 'BranchOffice'">——</div>
              <div v-else>
                <div>{{scope.row.rolerName}}</div>
                <div>{{scope.row.rolerPosition}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="corporateAchieve" label="角色人业绩" min-width="150">
            <template slot-scope="{row}">
              <div :class="row.correct === false ? 'achieve-color-red' : ''">{{row.corporateAchieve}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="roleAchieveRatio" label="角色人业绩比例(%)" min-width="150"></el-table-column>
          <el-table-column prop="commFees" label="拆佣金额" min-width="150"></el-table-column>
          <el-table-column prop="commFeesRatio" label="拆佣比例(%)" min-width="110"></el-table-column>
          <el-table-column prop="belongOrgName" label="店组" min-width="100">
            <template slot-scope="scope">
              <div v-if="scope.row.roleType === 'BranchOffice'">{{postData.dealOrgName}}</div>
              <div v-else>{{scope.row.belongOrgName}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="managerAchieveList" label="管理岗" min-width="280">
            <template slot-scope="scope">
              <div class="manager-list" v-for="(item, index) in scope.row.managerAchieveList" :key="index">
                <div class="fee">{{item.achieveFees}}</div>
                <div class="ratio">{{item.ratio ? item.ratio : 0}}%</div>
                <div class="name">
                  <span>{{item.manager ? item.manager : '---'}}</span>
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
      <div class="ih-info-title title-right">分销</div>
      <el-button
        v-if="!['ChangeBasicInf'].includes(changeType) && !isSameFlag && postData.achieveDistriList.length"
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
          <el-table-column prop="roleAchieveCap" label="角色业绩上限" min-width="150">
            <template slot-scope="{row}">
              <div :class="row.correct === false ? 'achieve-color-red' : ''">{{row.roleAchieveCap}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="rolerName" label="角色人" min-width="150">
            <template slot-scope="scope">
              <div v-if="scope.row.roleType === 'BranchOffice'">——</div>
              <div v-else>
                <div>{{scope.row.rolerName}}</div>
                <div>{{scope.row.rolerPosition}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="corporateAchieve" label="角色人业绩" min-width="150">
            <template slot-scope="{row}">
              <div :class="row.correct === false ? 'achieve-color-red' : ''">{{row.corporateAchieve}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="roleAchieveRatio" label="角色人业绩比例(%)" min-width="150"></el-table-column>
          <el-table-column prop="commFees" label="拆佣金额" min-width="150"></el-table-column>
          <el-table-column prop="commFeesRatio" label="拆佣比例(%)" min-width="110"></el-table-column>
          <el-table-column prop="belongOrgName" label="店组" min-width="100">
            <template slot-scope="scope">
              <div v-if="scope.row.roleType === 'BranchOffice'">{{postData.dealOrgName}}</div>
              <div v-else>{{scope.row.belongOrgName}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="managerAchieveList" label="管理岗" min-width="280">
            <template slot-scope="scope">
              <div class="manager-list" v-for="(item, index) in scope.row.managerAchieveList" :key="index">
                <div class="fee">{{item.achieveFees}}</div>
                <div class="ratio">{{item.ratio ? item.ratio : 0}}%</div>
                <div class="name">
                  <span>{{item.manager ? item.manager : '---'}}</span>
                  (<span>{{item.managerPosition}}</span>)
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-if="!isSameFlag && !['ChangeBasicInf'].includes(changeType)"
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
          <el-table-column prop="name" label="类型" width="200"></el-table-column>
          <el-table-column prop="fileName" label="附件" min-width="300">
            <template slot-scope="scope">
              <IhUpload
                @newFileList="getNewFile"
                size="100px"
                :limit="scope.row.code === 'ContractInfo' ? scope.row.defaultFileList.length : 100"
                :file-size="10"
                :editPermi="false"
                v-model="scope.row.defaultFileList"
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
        :loading="btnLoading"
        @click="handleClickBtn('preview')">预览变更</el-button>
      <el-button :loading="btnLoading" v-else type="primary" @click="handleClickBtn('next')">下一步</el-button>
      <el-button :loading="btnLoading" @click="handleClickBtn('back')">取消</el-button>
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
        :data="agentCompanyData"
        @cancel="() => (dialogAddAgentCompany = false)"
        @finish="
            (data) => {
              finishAddAgency(data);
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
        :data="postData.agencyId"
        @cancel="() => (dialogAddBroker = false)"
        @finish="
            (data) => {
              dialogAddBroker = false;
              finishAddBroker(data);
            }
          "/>
    </ih-dialog>
    <ih-dialog :show="dialogEditDealAchieve" desc="新增/修改成交业绩">
      <EditDealAchieve
        :data="editDealAchieveData"
        @cancel="() => (dialogEditDealAchieve = false)"
        @finish="
            (data) => {
              finishEditDealAchieve(data);
            }
          "/>
    </ih-dialog>
    <ih-dialog :show="dialogAddReceivePackage" desc="选择收派套餐标准">
      <SelectReceivePackage
        :data="receivePackageData"
        @cancel="() => (dialogAddReceivePackage = false)"
        @finish="
            (data) => {
              finishAddReceivePackage(data);
            }
          "/>
    </ih-dialog>
    <IhImgViews
      v-if="isShowImg"
      :url-list="srcList"
      :viewer-msg="srcData"
      :onClose="() => (isShowImg = false)"
    ></IhImgViews>
  </ih-page>
</template>
<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import SelectProjectCycle from "@/views/deal/dealReport/dialog/selectProjectCycle.vue";
  import AgentCompanyList from "@/views/deal/dealReport/dialog/agentCompanyList.vue";
  import AddCustomer from "@/views/deal/dealReport/dialog/addCustomer.vue";
  import AddBroker from "@/views/deal/dealReport/dialog/addBroker.vue";
  import EditDealAchieve from "@/views/deal/dealReport/dialog/editDealAchieve.vue";
  import SelectReceivePackage from "@/views/deal/dealReport/dialog/selectReceivePackage.vue";
  import {
    post_pageData_initDistribution, // 初始化后根据渠道商信息获取分销协议
    post_pageData_initBasic, // 选择周期、房号后初始化页面
    post_pageData_recalculateAchieve, // 重算平台费用 --- 总包分销不一致的情况
    post_pageData_recalculateAchieveComm, // 重算平台费用 --- 总包分销一致的情况
    post_suppDeal_previewEntryBasicInfChange, // 预览录入基础信息变更
    post_suppDeal_previewEntryRetreatRoom, // 预览录入退房
    post_suppDeal_previewEntryAchieveInfChange, // 预览录入业绩信息变更
    post_suppDeal_previewEntryStaffAchieveChange, // 预览录入内部员工业绩变更
    post_suppDeal_toAddSuppDeal, // 新增补充成交 --- 初始页面接口
    post_buModelContType_getList,
    post_buModelContType_subList,
    post_pageData_initChannelComm,
    post_pageData_initAchieve,
    post_pageData_calculateReceiveAmount, // 根据收派套餐，计算收派金额
    get_suppDeal_toUpdateSuppDeal__id, // 去修改补充成交 --- 初始页面接口
    post_suppDeal_previewUpdateAchieveInfChange, // 预览修改业绩信息变更
    post_suppDeal_previewUpdateBasicInfChange, // 预览修改基础信息变更
    post_suppDeal_previewUpdateRetreatRoom, // 预览修改退房
    post_suppDeal_previewUpdateStaffAchieveChange, // 预览修改内部员工业绩变更
  } from "@/api/deal";
  import {
    get_org_get__id,
    post_dict_getAllByType
  } from "@/api/system"; // 获取组织name
  import {
    get_term_getProBaseByTermId__termId, // 通过项目周期获取成交基础信息
  } from "@/api/project";
  import {
    post_notice_customer_information, // 通过成交id获取优惠告知书
    post_distributionmx_receive_detail
  } from "@/api/contract";
  import {Form as ElForm} from "element-ui";
  import {NoRepeatHttp} from "ihome-common/util/aop/no-repeat-http";

  @Component({
    components: {
      AddCustomer,
      AddBroker,
      SelectProjectCycle,
      AgentCompanyList,
      EditDealAchieve,
      SelectReceivePackage,
    }
  })
  export default class BasePage extends Vue {
    private validateRoom (rule: any, value: any, callback: any) {
      if ([null, undefined, ""].includes(this.postData.room)
        || [null, undefined, ""].includes(this.postData.hall)
        || [null, undefined, ""].includes(this.postData.toilet)) {
        return callback(new Error('户型信息不全'));
      } else {
        callback();
      }
    }
    private isShowImg = false;
    private btnLoading = false;
    private srcList: any = [];
    private srcData: any = [];
    pickerOption: any = {
      disabledDate(time: any) {
        return time.getTime() > Date.now() - 8.64e6;
      },
    };
    changeType: any = null; // 补充成交类型
    btnType: any = null; // 新增add还是修改edit --- 初始化接口不一样
    contNoList: any = []; // 分销协议编号列表
    agencySearchName: any = null; // 渠道公司名字 --- 用于回显
    brokerSearchName: any = null; // 渠道经纪人名字 --- 用于回显
    postData: any = {
      charge: null, // 收费类型(Service-服务费、Agent-代理费、ServiAndAgen-服务费+代理费)
      refundAmount: null, // 退款金额 --- 用于补充发起优惠告知书页展示
      originalCustType: null, // 原来的客户类型 --- 用于补充发起优惠告知书页判断可选类型
      changeTypeByDeal: null, // 补充成交类型
      calculation: 'Auto',
      calculationName: null,
      dealCode: null,
      proId: null,
      cycleId: null,
      cycleName: null, // 周期名称 - 选择
      projectCycle: null, // 项目周期名称 - 只读显示
      projectId: null, // 项目id
      modelCode: null,
      contType: null,
      refineModel: null,
      channelId: null,
      companyKind: null, // 渠道公司类型：内部/外部
      channelName: null,
      agencyId: null, // 渠道公司Id
      agencyName: null, // 渠道公司
      channelLevel: null, // 渠道等级Id
      brokerId: null, // 渠道经纪人Id
      brokerName: null, // 渠道经纪人
      recordStr: null, // 报备信息
      reportId: null,
      oneAgentTeamId: null,
      oneAgentTeamName: null,
      firstContNo: null, // 一手代理合同
      firstContTitle: null, // 一手代理合同
      isMarketProject: null,
      recordState: null,
      dataSign: null,
      dataSignName: null,
      contNo: null, // 分销协议编号
      contTitle: null, // 合同名称
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
      house: {
        id: null
      },
      offerNoticeVO: [], // 优惠告知书
      customerList: [], // 客户信息
      agencyVO: [], // 渠道信息
      receiveList: [], // 收派金额
      receiveAchieveVO: [], // 应收信息
      receiveAchieveList: [],
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
    tempContType: any = null; // 临时存放合同类型
    contTypeList: any = [] ; // 合同类型选项
    refineModelList: any = [] ; // 细分业务模式选项
    propertyTypeList: any = [] ; // 物业类型选项
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
      firstContNo: [
        {required: true, message: "一手代理合同必选", trigger: "change"},
      ],
      buildingId: [
        {required: true, message: "栋座必选", trigger: "change"},
      ],
      roomId: [
        {required: true, message: "房号必选", trigger: "change"},
      ],
      room: [
        {validator: this.validateRoom, trigger: ["change", "blur"]}
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
      signType: [
        {required: true, message: "签约类型必选", trigger: "change"},
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
      agencyId: [
        {required: true, message: "渠道公司必选", trigger: "change"},
      ],
      brokerId: [
        {required: true, message: "经纪人必选", trigger: "change"},
      ],
      contNo: [
        {required: true, message: "渠道分销合同必选", trigger: "change"},
      ],
      notEmpty: []
    };
    id: any = null;
    firstAgencyCompanyList: any = []; // 一手代理团队选项
    firstAgencyCompanyContList: any = []; // 一手代理合同选项
    companyKindOption: any = []; // 渠道公司类型
    dealStageList: any = []; // 成交阶段选项
    firstAgencyIdsList: any = []; // 一手代理合同选择后的ids
    packageIdsList: any = []; // 收派套餐ids：分销模式---选择分销协议后获取；非分销协议---请求接口获取
    dialogAddCustomer: any = false;
    dialogAddBroker: any = false;
    dialogAddProjectCycle: any = false;
    cycleCheckedData: any = [];
    reportCheckedData: any = [];
    dialogAddAgentCompany: any = false;
    currentSelectAgencyType: any = null; // 当前选择渠道商的按钮类型
    currentSelectAgencyIndex: any = null; // 对外拆佣中选的的当前索引
    commissionCustomerList: any = []; // 初始化费用来源的甲方信息 --- 代理费
    commissionServiceFeeObj: any = []; // 初始化费用来源的甲方信息 --- 服务费
    agentCompanyData: any = {
      selectableChannelIds: [], // 可选渠道商id列表
      cycleId: null // 项目周期
    }; // 选择渠道商弹窗数据
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
    dialogAddReceivePackage: any = false;
    receivePackageData: any = {
      type: '', // 费用类型
      idList: [] // 可选的收派套餐ids
    }; // 收派套餐data数据
    navFlag: any = false; // 是否折叠锚点
    defaultNavList: any = [
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
      }
    ]; // 锚点列表
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
      }
    ]; // 锚点列表
    currentActiveIndex: any = 0; // 当前激活的nav
    baseInfoByTerm: any = {
      startDivisionId: null, // 启动事业部ID
      exMinyuan: null, // // 是否明源源：1---是，0---否
      proId: null, // 项目id --- 用于查询分销协议列表
      termId: null, // 项目周期id
      termStageEnum: null, // 判断优惠告知书是否有添加按钮
      chargeEnum: null, //
      selectableChannelIds: [], // 可选的渠道商ids
    }; // 通过项目周期id获取到的初始化成交基础信息
    baseInfoInDeal: any = {
      myReturnVO: {
        houseVO: {},
        customerVOS: {},
        dealVO: {},
        dataSign: ''
      },
      hasRecord: false,
      selectableChannelIds: [], // 可选的渠道商ids
    }; // 通过initPage接口获取到的成交信息(项目周期 + 房号)
    currentReceiveIndex: any = null; // 当前选中的收派金额列表数据
    oneAgentRequiredFlag: any = false; // 收派金额 - 派发内场奖励金额合计大于0，为true
    tempSignPrice: any = null; // 临时签约价格
    tempSubscribePrice: any = null; // 临时认购价格
    tempDocumentList: any = []; // 记录来访确认单和成交确认单
    hasChangeProCycleFlag: any = false; // 项目周期是否变动过，默认没有-false
    addFlag: any = false; // 新增页面 --- 提示框
    editFlag: any = false; // 编辑页面 --- 提示框
    tipsFlag: any = false; // 加载拆佣情况 --- 提示框
    dividerTips: any = '业绩分配'; // 分割标题：业绩分配; 刷新成功; 加载成功
    hasClickFlag: any = false; // 判断初始化平台费用按钮是否点击过，默认没有
    dealParentId: any = null; // 主成交id，2021-02-22 initBasic接口需要增加主成交id

    // 应收信息表格
    get receiveAchieveVO() {
      let arr: any = []
      let rewardTotal: any = 0; // 派发内场总金额合计，用于判断一手代理团队是否必选
      let totalAmount: any = 0; // 派发佣金合计金额+派发内场奖励合计金额
      if (this.postData.receiveList && this.postData.receiveList.length > 0) {
        let obj = {
          receiveAmount: 0,
          achieveAmount: 0,
          otherChannelFees: 0,
        }
        this.postData.receiveList.forEach((item: any) => {
          obj.receiveAmount = (this as any).$math.tofixed((this as any).$math.add(obj.receiveAmount * 1, item.receiveAmount * 1), 2);
          obj.achieveAmount = (this as any).$math.tofixed((this as any).$math.addArr([obj.achieveAmount * 1, item.commAmount * 1, item.rewardAmount * 1, item.totalPackageAmount * 1, item.distributionAmount * 1]), 2);
          obj.otherChannelFees = (this as any).$math.tofixed((this as any).$math.add(obj.otherChannelFees * 1, item.otherChannelFees * 1), 2);
          rewardTotal = (this as any).$math.tofixed((this as any).$math.add(rewardTotal * 1, item.rewardAmount * 1), 2);
          totalAmount = (this as any).$math.tofixed((this as any).$math.addArr([totalAmount * 1, item.commAmount * 1, item.rewardAmount * 1]), 2);

          // obj.receiveAmount = (obj.receiveAmount * 1 * 100 + item.receiveAmount * 1 * 100) / 100;
          // obj.achieveAmount = (obj.achieveAmount * 1 * 100 + item.commAmount * 1 * 100
          //   + item.rewardAmount * 1 * 100 + item.totalPackageAmount * 1 * 100
          //   + item.distributionAmount * 1 * 100) / 100;
          // obj.otherChannelFees = (obj.otherChannelFees * 1 * 100 + item.otherChannelFees * 1 * 100) / 100;
          // totalAmount = (totalAmount * 1 * 100 + item.commAmount * 1 * 100 +
          //   item.rewardAmount * 1 * 100) / 100;
          // rewardTotal = (rewardTotal * 1 * 100 + item.rewardAmount * 1 * 100) / 100;
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

    // 判断平台费用是否有问题，如果有，提示，然后显示加载按钮 correct
    get isShowBtn() {
      let flag: any = false;
      if (this.postData.achieveTotalBagList && this.postData.achieveTotalBagList.length && this.postData.achieveDistriList && this.postData.achieveDistriList.length) {
        let totalFlag: any = false;
        let DistriFlag: any = false;
        totalFlag = this.postData.achieveTotalBagList.some((list: any) => {
          return list.correct === false;
        });
        DistriFlag = this.postData.achieveDistriList.some((list: any) => {
          return list.correct === false;
        });
        if (totalFlag || DistriFlag) {
          flag = true;
        }
      } else {
        if (this.postData.achieveTotalBagList && this.postData.achieveTotalBagList.length) {
          flag = this.postData.achieveTotalBagList.some((list: any) => {
            return list.correct === false;
          });
        }
        if (this.postData.achieveDistriList && this.postData.achieveDistriList.length) {
          flag = this.postData.achieveDistriList.some((list: any) => {
            return list.correct === false;
          });
        }
      }
      if (flag) {
        this.$message.warning('角色人业绩大于角色业绩上限，请核对业绩比例分配方案!');
      }
      return flag;
    }

    async created() {
      await this.getCompanyTypeList();
      // 成交报告的id
      this.id = this.$route.query.id;
      this.changeType = this.$route.query.type;
      this.btnType = this.$route.query.btnType;
      this.postData.changeTypeByDeal = this.$route.query.type;
      // console.log('this.changeType', this.changeType);
      if (this.id && this.changeType && this.btnType) {
        await this.initPageInfo();
      }
    }

    // 获取公司类型
    async getCompanyTypeList() {
      this.companyKindOption = await post_dict_getAllByType({
        tag:"Channel",
        type:"CompanyKind",
        valid:"Valid",
      });
    }

    // 跳转到指定索引的元素
    goAnchor(id: any, index: any) {
      (this as any).$nextTick(() => {
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
      let res: any = null;
      if (this.btnType === "add") {
        // 去新增
        let postData: any = {
          dealId: this.id,
          suppContType: this.changeType
        }
        res = await post_suppDeal_toAddSuppDeal(postData);
      } else if (this.btnType === "edit") {
        // 去修改
        res = await get_suppDeal_toUpdateSuppDeal__id({id: this.id});
      } else {
        return;
      }
      console.log(res);
      this.dealParentId = res.parentId;
      // 通过项目周期id获取基础信息
      await this.getBaseDealInfo(res.cycleId);
      this.contTypeList = await this.getContTypeList(res.modelCode); // 根据业务模式获取合同类型
      // this.postData.refineModel = await this.getRefineModel(res.modelCode); // 赋值细分业务模式
      this.refineModelList = await this.getRefineModelList(res.modelCode); // 获取细分业务模式下拉项
      // 获取渠道分销合同的值
      this.packageIdsList = [];
      if (res.agencyList && res.agencyList.length) {
        this.contNoList = await this.getOneAgentTeamContNo('contNo', res.agencyList[0].agencyId, res.cycleId, res.agencyList[0].companyKind);
        // 获取对应的渠道分销合同的ids
        if (this.contNoList && this.contNoList.length) {
          this.contNoList.forEach((list: any) => {
            if (list.contractNo === res.firstContNo) {
              this.packageIdsList = this.getIdsList(list.distributionMxList);
            }
          });
        }
        await this.initAgency(res.agencyList, true);
      }
      // 获取一手代理合同的值
      this.firstAgencyCompanyContList = await this.getOneAgentTeamContNo('oneAgent', res.oneAgentTeamId, res.cycleId, 'AgencyCompany');
      // 获取对应的一手代理合同的ids
      this.firstAgencyIdsList = [];
      if (this.firstAgencyCompanyContList && this.firstAgencyCompanyContList.length) {
        this.firstAgencyCompanyContList.forEach((list: any) => {
          if (list.contractNo === res.firstContNo) {
            this.firstAgencyIdsList = this.getIdsList(list.distributionMxList);
          }
        });
      }
      this.postData = {
        ...this.postData,
        ...res
      };
      // 提示框
      this.addFlag = false;
      this.editFlag = false;
      this.tipsFlag = true;
      this.dividerTips = '业绩分配';
      this.postData.proId = res?.projectId;
      this.isSameFlag = res?.scheme?.isSame === "Yes"; // 分销总包是否一致
      this.postData.area = res?.house?.area;
      this.postData.buildingId = res?.house?.buildingId;
      this.postData.buildingName = res?.house?.buildingName;
      this.postData.hall = res?.house?.hall;
      this.postData.propertyNo = res?.house?.propertyNo;
      this.postData.propertyType = res?.house?.propertyType;
      this.postData.room = res?.house?.room;
      this.postData.roomId = res?.house?.roomId;
      this.postData.roomNo = res?.house?.roomNo;
      this.postData.toilet = res?.house?.toilet;
      this.postData.reportId = res?.reportId;
      this.postData.oneAgentTeamName = res?.oneAgentTeam;
      // if (res.agencyList && res.agencyList.length) {
      //   this.initAgency(res.agencyList, true);
      // }
      // 成交组织
      await this.getOrgName(res.dealOrgId);
      // 成交状态
      this.postData.statusName = (this as any).$root.dictAllName(res.status, 'DealStatus');
      // 计算方式
      this.postData.calculationName = (this as any).$root.dictAllName(res.calculation, 'DealCalculateWay');
      // 数据标志
      this.postData.dataSignName = (this as any).$root.dictAllName(res.dataSign, 'DealDataFlag');
      // 优惠告知书
      await this.getNoticeList(res?.id, res?.parentId, res?.cycleId);
      // 客户信息
      if (this.postData.customerList && this.postData.customerList.length) {
        this.postData.customerList.forEach((list: any) => {
          list.addId = list.id;
        });
        // 记录初始化时客户的类型 --- 用于告知书补发页面判断类型选择
        this.postData.originalCustType = this.postData?.customerList[0]?.customerType;
        console.log('originalCustType', this.postData.originalCustType);
      }
      // 调整收派金额信息
      await this.initReceiveList(this.postData.receiveList);
      // 平台费用
      this.postData.achieveTotalBagList = [];
      this.postData.achieveDistriList = [];
      if (res.achieveList && res.achieveList.length) {
        res.achieveList.forEach((list: any) => {
          // 处理初始化分公司角色人业绩大于0的情况
          if (list.roleType === "BranchOffice" && list.corporateAchieve && (list.corporateAchieve * 1) > 0) {
            list.roleAchieveCap = (list.corporateAchieve * 1);
            list.roleAchieveRatio = 100;
          }
          if (list.type === 'TotalBag') {
            this.postData.achieveTotalBagList.push(list);
          } else if (list.type === 'Distri') {
            this.postData.achieveDistriList.push(list);
          }
        })
      }
      // 初始化附件信息
      await this.initDocumentList(res.charge, res.contType, res.documentShowList, res.documentList);
      // 根据项目周期和房号初始化页面数据
      await this.getPageById(res.cycleId, res.house.roomId, res.house.propertyType, res.parentId, res.refineModel);
      // 获取平台费用中新增、修改弹窗中角色类型和角色业绩上限
      await this.initAchieveRole();
    }

    // 根据项目周期和房号初始化页面数据
    async getPageById(cycleId: any, roomId: any, propertyType: any = '', parentId: any = '', refineModel: any = '') {
      if (!cycleId || !roomId || !propertyType || !refineModel) return;
      let params: any = {
        parentId: parentId, // 补充成交要加parentId
        cycleId: cycleId,
        roomId: roomId,
        isMainDeal: false, // 是否主成交
        property: propertyType, // 物业类型
        refineModel: refineModel, // 细分业务模式
      };
      let baseInfo: any = await post_pageData_initBasic(params);
      this.baseInfoInDeal = JSON.parse(JSON.stringify(baseInfo || '{}'));
    }

    // 获取角色类型和角色业绩上限
    async initAchieveRole() {
      let params: any = {
        branchCompanyId: this.baseInfoByTerm.startDivisionId, // 分公司Id --- 项目周期带出
        contType: this.postData.contType, // 合同类型
        distriAmount: this.getTotalAmount('distributionAmount'), // 分销金额
        isMarketProject: this.postData.isMarketProject, // 是否市场化项目
        modelCode: this.postData.modelCode, // 业务模式
        propertyType: this.postData.propertyType, // 物业类型
        specialId: this.baseInfoByTerm.specialId, // 特殊方案Id --- 项目周期带出
        totalBagAmount: this.getTotalAmount('totalPackageAmount') // 总包金额
      };
      let achieveInfo: any = await post_pageData_initAchieve(params);
      // 是否分销与总包一致
      this.editDealAchieveData.distri = achieveInfo.distri;
      this.editDealAchieveData.totalBag = achieveInfo.totalBag;
      // 处理角色类型选项
      if (this.isSameFlag) {
        // 分销同步总包
        this.editDealAchieveData.totablBagRoles = this.getRoleListAndAchieveCap(achieveInfo.totalBag, achieveInfo.totablBagRoles);
        this.editDealAchieveData.distriRoles = this.getRoleListAndAchieveCap(achieveInfo.totalBag, achieveInfo.totablBagRoles);
      } else {
        // 分销不同步总包
        this.editDealAchieveData.totablBagRoles = this.getRoleListAndAchieveCap(achieveInfo.totalBag, achieveInfo.totablBagRoles);
        this.editDealAchieveData.distriRoles = this.getRoleListAndAchieveCap(achieveInfo.distri, achieveInfo.distriRoles);
      }
    }

    // 调整收派金额信息
    initReceiveList(data: any = []) {
      if (!data.length) return;
      data.forEach((item: any) => {
        this.$set(item, 'showData', [
          {
            ...item.collectandsendDetailDealVO,
            typeName: (this as any).$root.dictAllName(item.type, 'FeeType')
          }
        ]);
      })
    }

    // 初始化渠道商(渠道公司) --- 分销成交模式才有渠道商
    initAgency(data: any = [], flag: any = false) {
      if (flag) {
        // 分销成交模式
        if(data && data.length > 0) {
          this.postData.companyKind = data[0].companyKind; // 渠道公司类型
          this.postData.agencyId = data[0].agencyId; // 渠道公司Id
          this.postData.agencyName = data[0].agencyName; // 渠道公司
          this.agencySearchName = data[0].agencyName; // 渠道公司
          this.postData.channelLevel = data[0].channelLevel; // 渠道等级Id
          this.postData.brokerId = data[0].brokerId; // 渠道经纪人Id
          this.postData.brokerName = data[0].brokerName || data[0].broker; // 渠道经纪人
          this.brokerSearchName = data[0].brokerName || data[0].broker; // 渠道经纪人
        }
      }
    }

    /*
    * 获取分销协议编号选项和对应的packageIDS
    * channelId: 渠道商公司ID
    * cycleId: 周期ID
    * property: 物业类型
    * contNo: 初始化的分销协议编号
    * */
    async getContNoList(channelId: any, cycleId: any, property: any, contNo: any) {
      let objData: any = {
        channelId: channelId, // 渠道商公司ID
        cycleId: cycleId, // 周期ID
        property: property // 物业类型
      }
      const info: any = await post_pageData_initDistribution(objData);
      if (info.contracts && info.contracts.length) {
        this.contNoList = info.contracts;
        this.packageIdsList = [];
        info.contracts.forEach((item: any) => {
          if (item.contractNo === contNo) {
            this.packageIdsList = item.packageMxIds;
          }
        });
      } else {
        this.contNoList = [];
      }
    }

    // 根据项目周期和房号初始化页面数据
    async initPageById(cycleId: any, roomId: any, propertyType: any = '') {
      if (!cycleId || !roomId || !propertyType) return;
      let params: any = {
        parentId: this.dealParentId,
        cycleId: cycleId,
        roomId: roomId,
        isMainDeal: false, // 是否主成交
        property: propertyType, // 物业类型
        refineModel: this.postData.refineModel, // 细分业务模式
      };
      let baseInfo: any = await post_pageData_initBasic(params);
      this.baseInfoInDeal = JSON.parse(JSON.stringify(baseInfo || '{}'));
      // 处理数据
      // 纯提示
      if (baseInfo.customerIsDifferent) {
        this.$message.warning('明源客户与优惠告知书客户有差异');
      }
      if (baseInfo.errorMsgs && baseInfo.errorMsgs.length) {
        console.log(baseInfo.errorMsgs);
        let tips: any = '';
        baseInfo.errorMsgs.forEach((item: any) => {
          tips = tips + `<div>${item}</div>`
        });
        this.$message({
          dangerouslyUseHTMLString: true,
          message: tips
        });
      }
      // 多分优惠告知书情况
      this.postData.contNo = null; // 重置选择的编号
      // 2021-03-01 补充成交不改变优惠告知书，先暂时屏蔽
      // if (baseInfo.dealNoticeStatus === 'MultipleNotice') {
      //   this.$message.warning('同房号存在多份已生效的优惠告知书。(分销成交模式，请选择分销协议编号后方可手动选择优惠告知书)');
      // }
      // 分销成交和非分销成交不一样
      // if (baseInfo.contType === 'DistriDeal') {
      //   // 分销成交模式
      //   // 1. 初始化渠道商/渠道公司
      //   this.initAgency(baseInfo.agencyVOs, true);
      // } else if (['SelfChannelDeal', 'NaturalVisitDeal'].includes(baseInfo.contType)) {
      //   // 非分销成交模式 --- 自然来访 / 自渠成交
      //   this.initAgency(baseInfo.agencyVOs, false);
      // }
      this.postData.reportId = baseInfo.recordId;
      // 栋座
      if (baseInfo.buildingId && !this.postData.buildingId) {
        this.postData.buildingId = baseInfo.buildingId;
      }
      // 合同类型
      if (baseInfo.contType) {
        this.postData.contType = baseInfo.contType;
      }
      // 分销协议编号
      if (baseInfo.contracts && baseInfo.contracts.length > 0) {
        this.contNoList = baseInfo.contracts;
        // 增加需求：当分销协议只有一个的时候，默认选中
        if (baseInfo && baseInfo.contracts && baseInfo.contracts.length === 1) {
          (this as any).$nextTick(() => {
            this.initContNo(baseInfo.contracts[0]);
          });
        }
      } else {
        this.contNoList = [];
        this.postData.contNo = null;
        this.postData.isMat = null;
        this.packageIdsList = [];
      }
      // 备案情况
      if (baseInfo && baseInfo.myReturnVO && baseInfo.myReturnVO.dealVO && baseInfo.myReturnVO.dealVO.recordState) {
        this.postData.recordState = baseInfo?.myReturnVO?.dealVO?.recordState;
      }
      // 报备信息
      if (baseInfo.recordStr) {
        this.postData.recordStr = baseInfo.recordStr;
      }
      // 建筑面积
      this.postData.area = baseInfo?.myReturnVO?.houseVO?.area;
      // 户型
      this.postData.room = baseInfo?.myReturnVO?.houseVO?.room;
      this.postData.hall = baseInfo?.myReturnVO?.houseVO?.hall;
      this.postData.toilet = baseInfo?.myReturnVO?.houseVO?.toilet;
      // 预售合同编号
      this.postData.propertyNo = baseInfo.myReturnVO.houseVO?.propertyNo;
      // 签约类型
      if (baseInfo.myReturnVO && baseInfo.myReturnVO.dealVO && baseInfo.myReturnVO.dealVO.signType) {
        this.postData.signType = baseInfo?.myReturnVO?.dealVO?.signType;
      }
      // 成交阶段  --- 2021-03-01 补充成交只有签约状态
      // this.postData.stage = baseInfo.myReturnVO.dealStage;
      // 现场销售
      this.postData.sceneSales = baseInfo.myReturnVO.dealVO?.sceneSales;
      // 房款回笼比例(%)
      this.postData.returnRatio = baseInfo.myReturnVO.dealVO?.returnRatio;
      // 认购价格
      this.postData.subscribePrice = baseInfo?.myReturnVO?.dealVO?.subscribePrice;
      // 认购日期
      if (baseInfo && baseInfo.myReturnVO && baseInfo.myReturnVO.dealVO && baseInfo.myReturnVO.dealVO.subscribeDate) {
        this.postData.subscribeDate = baseInfo?.myReturnVO?.dealVO?.subscribeDate;
      }
      // 签约价格
      this.postData.signPrice = baseInfo?.myReturnVO?.dealVO?.signPrice;
      // 签约日期
      if (baseInfo && baseInfo.myReturnVO && baseInfo.myReturnVO.dealVO && baseInfo.myReturnVO.dealVO.signDate) {
        this.postData.signDate = baseInfo?.myReturnVO?.dealVO?.signDate;
      }
      // 数据标志
      if (baseInfo && baseInfo.myReturnVO && baseInfo.myReturnVO.dataSign) {
        this.postData.dataSign = baseInfo?.myReturnVO?.dataSign;
        this.postData.dataSignName = (this as any).$root.dictAllName(baseInfo.myReturnVO.dataSign, 'DealDataFlag');
      }
      // 收派金额 --- 代理费
      if (baseInfo.receiveVOS && baseInfo.receiveVOS.length) {
        let tempList: any = this.initReceiveVOS(baseInfo.receiveVOS);
        if (this.postData.receiveList && this.postData.receiveList.length) {
          this.postData.receiveList.push(...tempList);
        } else {
          this.postData.receiveList = tempList;
        }
      }
      // 收派金额中的甲方
      this.commissionCustomerList = [];
      this.commissionCustomerList = this.initCommissionCustomer(baseInfo.receiveVOS);
      // 初始化上传附件
      await this.getUploadDocumentList(baseInfo.contType);
    }

    // 通过项目周期id获取基础信息
    async getBaseDealInfo(id: any) {
      if (!id) return;
      let baseInfo: any = await get_term_getProBaseByTermId__termId({termId: id});
      this.baseInfoByTerm = JSON.parse(JSON.stringify(baseInfo));
      // 物业类型
      this.propertyTypeList = this.getPropertyTypeList(baseInfo.propertyEnums);
      // 一手代理团队的选项
      this.firstAgencyCompanyList = [];
      if (baseInfo.firstAgencyCompanys && baseInfo.firstAgencyCompanys.length > 0) {
        this.firstAgencyCompanyList = JSON.parse(JSON.stringify(baseInfo.firstAgencyCompanys));
      }
      console.log(this.firstAgencyCompanyList);
      // 成交阶段的选项
      this.dealStageList = [];
      if (baseInfo.termStageEnum) {
        let DealStageList: any = (this as any).$root.dictAllList('DealStage');
        if (DealStageList && DealStageList.length > 0) {
          // 认购周期 --- 只有认购+签约
          this.dealStageList = DealStageList.filter((item: any) => {
            return item.code !== 'Recognize';
          });
          switch(baseInfo.termStageEnum){
            case 'Recognize':
              // 清空优惠告知书 --- 认筹周期需要自己手动添加
              // this.postData.offerNoticeVO = [];
              break;
          }
        }
      }
      // 如果周期改变了，就执行以下逻辑
      if (this.hasChangeProCycleFlag) {
        this.postData.projectId = baseInfo.proId;
        // 业务模式
        this.postData.modelCode = baseInfo.busEnum;
        this.contTypeList = await this.getContTypeList(this.postData.modelCode); // 根据业务模式获取合同类型
        this.postData.refineModel = await this.getRefineModel(this.postData.modelCode); // 赋值细分业务模式
        this.refineModelList = await this.getRefineModelList(this.postData.modelCode); // 获取细分业务模式下拉项
        // 是否市场化项目
        this.postData.isMarketProject = baseInfo.exMarket === 1 ? 'Yes' : 'No';
        // 是否代销
        this.postData.isConsign = baseInfo.exConsignment === 1 ? 'Yes' : 'No';
        // 处理优惠告知书的nav
        // this.postData.offerNoticeVO = []; // 先重置优惠告知书的数据
        this.postData.charge = baseInfo?.chargeEnum;
        if (baseInfo.chargeEnum === 'Agent') {
          this.navList = this.navList.filter((item: any) => {
            return item.id !== 3;
          });
        } else {
          this.navList = (this as any).$tool.deepClone(this.defaultNavList);
        }
        // 收派金额部分信息 --- 服务费
        this.postData.receiveList = [];
        if (baseInfo.chargeEnum !== 'Agent') {
          let tempList: any = [];
          tempList.push(
            {
              type: 'ServiceFee', // 服务费
              partyACustomer: null,
              partyACustomerName: '客户',
              packgeName: null,
              packageId: null,
              receiveAmount: null,
              commAmount: null,
              rewardAmount: null,
              totalPackageAmount: null,
              distributionAmount: null,
              otherChannelFees: null,
            }
          );
          let list: any = this.initReceiveVOS(tempList);
          (this as any).$nextTick(() => {
            this.postData.receiveList.push(...list);
          });
        }
        // 成交组织
        await this.getOrgName(baseInfo.groupId);
        // 初始化附件信息
        await this.initDocument(baseInfo);
      }
    }

    // 根据业务模式获取合同类型选项
    async getContTypeList(code: any) {
      if (!code) return [];
      let ContType: any = (this as any).$root.dictAllList('ContType');
      let list: any = await post_buModelContType_getList({modelCode: code});
      let contTypeList: any = []; // 初始化
      if (list && list.length > 0 && ContType && ContType.length > 0) {
        if (list[0].contTypeList && list[0].contTypeList.length > 0) {
          list[0].contTypeList.forEach((list: any) => {
            ContType.forEach((item: any) => {
              if (list === item.code) {
                contTypeList.push(item);
              }
            });
          });
        }
      }
      return contTypeList;
    }

    // 获取细分业务模式的值
    getRefineModel(value: any = '') {
      let returnValue = '';
      switch(value){
        case 'TotalBagModel' :
          // 总包
          returnValue = 'All';
          break;
        case 'DistriModel' :
          // 分销
          returnValue = 'District';
          break;
        case 'TotalBagDistrModel' :
          // 总包+分销
          returnValue = '';
          break;
        default:
          returnValue = '';
          break;
      }
      return returnValue;
    }

    // 根据业务模式获取细分业务模式选项
    async getRefineModelList(code: any) {
      if (!code) return [];
      let Subdivide: any = (this as any).$root.dictAllList('Subdivide'); // 细分业务类型字典
      let list: any = await post_buModelContType_subList({modelCode: code});
      let refineModelList: any = [];
      if (list && list.length > 0 && Subdivide && Subdivide.length > 0) {
        list.forEach((list: any) => {
          Subdivide.forEach((item: any) => {
            if (list === item.code) {
              refineModelList.push(item);
            }
          });
        });
      }
      return refineModelList;
    }

    // 获取物业类型下拉项
    getPropertyTypeList(list: any = []) {
      let tempList: any = [];
      const typeList: any = (this as any).$root.dictAllList('Property');
      if (list && list.length > 0 && typeList && typeList.length > 0) {
        list.forEach((enu: any) => {
          typeList.forEach((list: any) => {
            if (enu === list.code) {
              tempList.push(list);
            }
          })
        });
      }
      return tempList;
    }

    // 初始化收派金额信息，置为0
    initReceiveVOS(data: any = []) {
      if (data && data.length > 0) {
        data.forEach((item: any) => {
          this.$set(item, 'showData', []);
          item.receiveAmount = item.receiveAmount ? item.receiveAmount : 0;
          item.commAmount = item.commAmount ? item.commAmount : 0;
          item.rewardAmount = item.rewardAmount ? item.rewardAmount : 0;
          item.totalPackageAmount = item.totalPackageAmount ? item.totalPackageAmount : 0;
          item.distributionAmount = item.distributionAmount ? item.distributionAmount : 0;
          item.otherChannelFees = item.otherChannelFees ? item.otherChannelFees : 0;
        })
      }
      return data;
    }

    // 初始化收派金额中的代理费的甲方数组 --- 代理费
    initCommissionCustomer(data: any = []) {
      let tempArr: any = [];
      if (data && data.length) {
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
      if (data && data.length) {
        data.forEach((item: any) => {
          if (item.type === 'ServiceFee') {
            tempArr.push(item);
          }
        });
      }
      if (tempArr && tempArr.length) {
        tempObj.partyACustomerName = tempArr[0].partyACustomerName;
        tempObj.partyACustomer = tempArr[0].partyACustomer;
      }
      return tempObj;
    }

    // 初始化附件表格数据
    initDocument(info: any) {
      let fileList: any = (this as any).$root.dictAllList('DealFileType'); // 附件类型
      // 附件类型增加key
      if (fileList && fileList.length > 0) {
        fileList.forEach((vo: any) => {
          vo.defaultFileList = []; // 存放原来的数据
          vo.fileList = []; // 存放新上传的数据
        });
      }
      // 保存来访确认单和成交确认单
      this.tempDocumentList = [];
      this.tempDocumentList = fileList.filter((item: any) => {
        return ["VisitConfirForm", "DealConfirForm"].includes(item.code);
      });
      console.log('this.tempDocumentList', this.tempDocumentList);
      if (info.chargeEnum === 'Agent') {
        // 项目周期的收费模式为代理费的话，隐藏优惠告知书
        fileList = fileList.filter((item: any) => {
          return item.code !== "Notice";
        });
      }
      // 先隐藏来访确认单和成交确认单
      fileList = fileList.filter((item: any) => {
        return !["VisitConfirForm", "DealConfirForm"].includes(item.code);
      });
      this.postData.uploadDocumentList = (this as any).$tool.deepClone(fileList);
    }

    /*
    * 初始化附件信息 --- 页面初始化的时候
    * charge：收费模式
    * contType：合同类型
    * list：回显的值
    * */
    initDocumentList(charge: any = '', contType: any = '', showList: any = [], list: any = []) {
      let fileList: any = (this as any).$root.dictAllList('DealFileType'); // 附件类型
      // 根据收费模式过滤
      if (charge === 'Agent') {
        fileList = fileList.filter((item: any) => {
          return item.code !== "Notice";
        });
      }
      // 保存来访确认单和成交确认单
      this.tempDocumentList = [];
      this.tempDocumentList = fileList.filter((item: any) => {
        return ["VisitConfirForm", "DealConfirForm"].includes(item.code);
      });
      // 根据合同类型过滤
      if (contType !== 'DistriDeal') {
        fileList = fileList.filter((item: any) => {
          return !["VisitConfirForm", "DealConfirForm"].includes(item.code);
        });
      }
      if (fileList && fileList.length > 0) {
        fileList.forEach((vo: any) => {
          vo.defaultFileList = []; // 存放原来的数据
          vo.fileList = []; // 存放新上传的数据
          if (showList && showList.length) {
            showList.forEach((item: any) => {
              if (item.fileType === vo.code) {
                item.exAuto = true; // 不能删除
                // item.name = item.fileName; // 名字
                vo.defaultFileList.push(item);
              }
            })
          }
          if (list && list.length) {
            list.forEach((item: any) => {
              if (item.fileType === vo.code) {
                item.exAuto = true; // 不能删除
                // item.name = item.fileName; // 名字
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
    async getNoticeList(dealId: any = '', parentId: any = '', cycleId: any = '') {
      if (!dealId || !parentId || !cycleId) return;
      if (dealId !== parentId) {
        const dealList: any = await post_notice_customer_information({dealId: dealId, cycleId: cycleId});
        const parentList: any = await post_notice_customer_information({dealId: parentId, cycleId: cycleId});
        this.postData.offerNoticeVO = [...dealList, ...parentList];
      } else {
        const list: any = await post_notice_customer_information({dealId: parentId, cycleId: cycleId});
        // console.log('组织info:', list);
        this.postData.offerNoticeVO = list;
      }
    }

    // 改变细分业务模式
    changeRefineModel() {
      // 初始化收派金额
      let self: any = this;
      this.$nextTick(async () => {
        // 有房号需要请求initBasic接口获取新的代理费类型收派
        if (self.postData.roomId) {
          await this.initReceiveByRoom();
        } else {
          await this.initAllReceiveList();
        }
      });
    }

    // 改变了细分业务模式需要重置收派套餐信息
    async initReceiveByRoom() {
      if (!this.postData.cycleId || !this.postData.roomId || !this.postData.propertyType) return;
      let params: any = {
        parentId: this.dealParentId ? this.dealParentId : null,
        cycleId: this.postData.cycleId,
        roomId: this.postData.roomId,
        isMainDeal: false, // 是否主成交
        property: this.postData.propertyType, // 物业类型
        refineModel: this.postData.refineModel, // 细分业务模式
      };
      let baseInfo: any = await post_pageData_initBasic(params);
      // 先清空代理费类型的收派
      if (this.postData.receiveList && this.postData.receiveList.length) {
        this.postData.receiveList = this.postData.receiveList.filter((vo: any) => {
          return vo.type === 'ServiceFee';
        });
      }
      // 收派金额 --- 代理费
      if (baseInfo.receiveVOS && baseInfo.receiveVOS.length) {
        let tempList: any = await this.initReceiveVOS(baseInfo.receiveVOS);
        console.log('receiveVO:', tempList);
        if (this.postData.receiveList && this.postData.receiveList.length) {
          this.postData.receiveList.push(...tempList);
        } else {
          this.postData.receiveList = tempList;
        }
      }
      // 初始化
      // await this.initAllReceiveList();
      // 显示手动按钮
      this.showChangeTips();
    }

    // 一手代理公司选项发生改变
    changeSelectAgent(value: any) {
      // console.log(value);
      if (value) {
        if (this.firstAgencyCompanyList && this.firstAgencyCompanyList.length) {
          this.firstAgencyCompanyList.forEach((list: any) => {
            if (list.id === value) {
              this.postData.oneAgentTeamName = list.name;
            }
          });
        }
      } else {
        this.postData.oneAgentTeamName = null;
        this.postData.oneAgentTeamId = null;
      }
      // 如果有对外拆佣信息，要同步拆佣对象为一手代理公司的收款方
      if (this.postData.channelCommList && this.postData.channelCommList.length) {
        this.postData.channelCommList.forEach((item: any) => {
          if (item.target === "AgentCompany") {
            item.agencyName = this.postData.oneAgentTeamName;
            item.agencyId = this.postData.oneAgentTeamId;
          }
        });
      }
      // 清空一手代理合同
      this.postData.firstContNo = null;
      this.firstAgencyCompanyContList = [];
      // 获取一手代理合同
      if (value) this.getOneAgentTeamContNo('oneAgent', value, this.postData.cycleId, 'AgencyCompany');

    }

    // 改变物业类型
    changePropertyType() {
      if (this.changeType !== "ChangeAchieveInf") return;
      // 清空栋座 + 房间号 + 下面的所有信息
      this.postData.roomId = null;
      this.postData.buildingId = null;
      this.initDocument(this.baseInfoByTerm);
      this.resetReceiveList();
      this.resetData();
    }

    // 改变栋座
    changeBuild() {
      if (this.changeType !== "ChangeAchieveInf") return;
      // 清空房间号 + 下面的所有信息
      this.postData.roomId = null;
      this.initDocument(this.baseInfoByTerm);
      this.resetReceiveList();
      this.resetData();
    }

    // 改变房号
    changeRoom(value: any) {
      if (this.changeType !== "ChangeAchieveInf") return;
      // console.log('改变房号', value);
      this.resetReceiveList();
      this.initDocument(this.baseInfoByTerm);
      this.resetData(); // 重置数据
      if (value) {
        this.initPageById(this.postData.cycleId, value, this.postData.propertyType);
      }
    }

    // 物业类型、栋座、房号改变，收派金额模块只需要清空代理费
    resetReceiveList() {
      if (this.postData.receiveList && this.postData.receiveList.length) {
        this.postData.receiveList = this.postData.receiveList.filter((vo: any) => {
          return vo.type === "ServiceFee";
        });
      }
      this.showChangeTips();
      // this.addFlag = false;
      // this.editFlag = true;
      // this.tipsFlag = false;
      // this.dividerTips = '刷新成功';
    }

    // 改变计算方式 --- 手动/自动
    changeCalculation() {
      this.postData.channelCommList = [];
      this.postData.achieveTotalBagList = [];
      this.postData.achieveDistriList = [];
      if (!this.addFlag) {
        this.showChangeTips();
      }
    }

    // 显示变动提示
    showChangeTips() {
      if (this.hasClickFlag) {
        // 点击过
        this.addFlag = false;
        this.editFlag = true;
        this.tipsFlag = false;
        this.dividerTips = '刷新成功';
      } else {
        // 没点击过
        this.addFlag = true;
        this.editFlag = false;
        this.tipsFlag = false;
        this.dividerTips = '加载成功';
      }
    }

    // 改变签约、认购价格后，重新计算收派套餐问题
    async changePrice(e: any, type: any) {
      let value: any = e.target.value;
      if (value !== (this as any)[`temp${type}`]) {
        // 不一样+失焦，要初始化收派套餐
        this.initAllReceiveList();
      }
      (this as any)[`temp${type}`] = value;
    }

    // 手动方式下，改变收派金额某一项的方法
    changeReceiveItem(value: any, row: any, type: any) {
      // console.log('value', value);
      // console.log('row', row);
      if (!value) {
        (this as any).$nextTick(() => {
          row[type] = 0;
          let total: any = (this as any).$math.addArr([row.commAmount * 1, row.rewardAmount * 1, row.totalPackageAmount * 1, row.distributionAmount * 1]);
          console.log('changeReceiveItem', total);
          row.otherChannelFees = (this as any).$math.tofixed(((this as any).$math.sub(row.receiveAmount * 1, total)), 2);
          // row.otherChannelFees = (row.receiveAmount * 1 * 100
          //   - row.commAmount * 1 * 100 - row.rewardAmount * 1 * 100
          //   - row.totalPackageAmount * 1 * 100 - row.distributionAmount * 1 * 100) / 100;
        });
      } else {
        (this as any).$nextTick(() => {
          let total: any = (this as any).$math.addArr([row.commAmount * 1, row.rewardAmount * 1, row.totalPackageAmount * 1, row.distributionAmount * 1]);
          console.log('changeReceiveItem', total);
          row.otherChannelFees = (this as any).$math.tofixed(((this as any).$math.sub(row.receiveAmount * 1, total)), 2);
          // row.otherChannelFees = (row.receiveAmount * 1 * 100
          //   - row.commAmount * 1 * 100 - row.rewardAmount * 1 * 100
          //   - row.totalPackageAmount * 1 * 100 - row.distributionAmount * 1 * 100) / 100;
        });
      }
      // 提示框
      if (!this.addFlag) {
        this.showChangeTips();
        // this.addFlag = false;
        // this.editFlag = true;
        // this.tipsFlag = false;
        // this.dividerTips = '刷新成功';
      }
    }

    /*
    * 选择渠道公司 + 对外拆佣中选择渠道公司--->收款方
    * type: String，点击的是基础信息中选择渠道商(agency)还是对外拆佣中选择收款方(agencyName)
    * scope: Object, 对外拆佣中当前选中的数据
    * */
    selectAgency(type: any = '', scope: any) {
      // 选择渠道公司
      if (type === 'agency' && !this.postData.agencyType) {
        this.$message.warning('请先选择公司类型');
        return;
      }
      this.currentSelectAgencyType = type;
      this.currentSelectAgencyIndex = scope.$index;
      this.agentCompanyData = {
        selectableChannelIds: this.baseInfoByTerm.selectableChannelIds,
        cycleId: this.postData.cycleId,
        property: this.postData.propertyType
      };
      this.dialogAddAgentCompany = true;
    }

    // 确定选择渠道公司
    async finishAddAgency(data: any) {
      // console.log('data', data);
      if(data.agencyData && data.agencyData.length) {
        let objData: any = {
          channelId: data[0].channelId, // 渠道商公司ID
          cycleId: this.agentCompanyData.cycleId, // 周期ID
          property: this.agentCompanyData.property // 物业类型
        }
        const info: any = await post_pageData_initDistribution(objData);
        if (info && info.contracts && info.contracts.length) {
          // 分销协议选项列表
          this.contNoList = info.contracts;
          // 回显
          if (this.currentSelectAgencyType === 'agency') {
            // 基础信息中选择渠道商
            this.postData.agencyId = data.agencyData[0].channelId; // 渠道公司Id
            this.postData.agencyName = data.agencyData[0].channelName; // 渠道公司名字
            this.postData.channelLevel = data.agencyData[0].channelGrade; // 渠道等级Id
          } else if (this.currentSelectAgencyType === 'agencyName') {
            // 对外拆佣中选择收款方
            if (this.postData.channelCommList && this.postData.channelCommList.length) {
              this.postData.channelCommList.forEach((list: any, index: any) => {
                if (index === this.currentSelectAgencyIndex) {
                  list.agencyId = data.agencyData[0].channelId; // 渠道公司Id
                  list.agencyName = data.agencyData[0].channelName; // 渠道公司名字
                }
              });
            }
          }
          this.dialogAddAgentCompany = false;
        }
      }
    }

    // 选择经纪人
    selectBroker() {
      if (!this.postData.agencyId) {
        this.$message.warning('请先选择渠道公司');
        return;
      }
      this.dialogAddBroker = true;
    }

    // 确定选择经纪人
    finishAddBroker(data: any) {
      // console.log('data', data);
      if(data && data.length) {
        this.postData.brokerId= data[0].id; // 渠道经纪人Id
        this.postData.brokerName= data[0].name; // 渠道经纪人
      }
    }

    // 只有一个分销协议的时候默认选中
    initContNo(item: any = '') {
      if (!item) return;
      this.postData.isMat = null;
      this.packageIdsList = [];
      this.postData.contNo = item.contractNo;
      // 是否垫佣
      this.postData.isMat = item.advancementSituation;
      // 分销模式下获取分销协议返回的收派套餐id
      this.packageIdsList = item.packageMxIds && item.packageMxIds.length ? item.packageMxIds : [];
    }

    // 是否垫佣是根据对应的分销协议来判断
    changeContNo(value: any) {
      this.postData.isMat = null;
      this.packageIdsList = [];
      this.showContAnnexList('contNo', []);
      if (!value) return;
      if (this.contNoList && this.contNoList.length > 0) {
        this.contNoList.forEach((item: any) => {
          if (item.contractNo === value) {
            // 是否垫佣
            this.postData.isMat = item.advancementSituation;
            // 分销模式下获取分销协议返回的收派套餐id
            this.packageIdsList = this.getIdsList(item.distributionMxList);
            // 回显合同附件信息
            this.showContAnnexList('contNo', item.annexList);
          }
        })
      }
      // 初始化收派金额
      this.initAllReceiveList();
    }

    // 获取合同中收派信息的idsList
    getIdsList(list: any = []) {
      let idList: any = [];
      if (list && list.length > 0) {
        list.forEach((item: any) => {
          idList.push(item.conditionId);
        });
      }
      return idList;
    }

    /*
    * 获取一手代理合同或者渠道分销合同
    * type: String。oneAgent：一手代理合同；contNo：渠道分销合同
    * channelCompanyId: String。渠道公司id
    * cycleId: String。项目周期id
    * companyKind: String。渠道公司类型 AgencyCompany
    * */
    async getOneAgentTeamContNo(type: any = '', channelCompanyId: any = '', cycleId: any = '', companyKind: any = '') {
      let postData: any = {
        channelCompanyId: channelCompanyId,
        channelCompanyKind: companyKind,
        cycleId: cycleId,
      }
      let list: any = await post_distributionmx_receive_detail(postData);
      console.log(list);
      if (type === 'contNo') {
        // 渠道分销合同
        this.contNoList = list;
      } else {
        // 一手代理合同
        this.firstAgencyCompanyContList = list;
      }
    }

    // 改变一手代理合同
    changeFirstContNo(value: any = '') {
      this.firstAgencyIdsList = [];
      this.initAllReceiveList();
      this.showContAnnexList('firstAgency', []);
      if (!value) return;
      if (this.firstAgencyCompanyContList && this.firstAgencyCompanyContList.length) {
        this.firstAgencyCompanyContList.forEach((item: any) => {
          if (item.contractNo === value) {
            // 获取一手代理合同返回的收派套餐id
            this.firstAgencyIdsList = this.getIdsList(item.distributionMxList);
            // 回显合同附件信息
            this.showContAnnexList('firstAgency', item.annexList);
          }
        });
      }
    }

    /*
    * 回显合同附件信息
    * type: String。firstAgency：一手代理合同类型的附件；contNo：渠道分销合同类型的附件
    * annexList: Array。需要回显的附件
    * */
    showContAnnexList(type: any = '', annexList: any = []) {
      if (annexList && annexList.length) {
        // 添加对应的合同附件
        if (this.postData && this.postData.documentVO && this.postData.documentVO.length) {
          this.postData.documentVO.forEach((vo: any) => {
            if (vo.code === 'ContractInfo') {
              annexList.forEach((list: any) => {
                vo.defaultFileList.push(
                  {
                    ...list,
                    fileId: list.fileNo,
                    fileName: list.attachmentSuffix,
                    deleteType: type,
                    fileType: 'ContractInfo', // 合同信息
                    exAuto: true, // 是否可以删除
                  }
                )
              });
            }
          });
        }
      } else {
        // 删除对应的合同附件
        if (this.postData && this.postData.documentVO && this.postData.documentVO.length) {
          this.postData.documentVO.forEach((vo: any) => {
            if (vo.code === 'ContractInfo') {
              vo.defaultFileList = vo.defaultFileList.filter((list: any) => {
                return list.deleteType !== type;
              });
            }
          });
        }
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

    // 修改公司类型
    changeAgencyType() {
      this.initAgencyInfo();
    }

    // 初始化渠道公司相关信息
    initAgencyInfo() {
      // 初始化渠道公司
      this.postData.agencyId = null;
      this.postData.agencyName = null;
      // 初始化经纪人
      this.postData.brokerId = null;
      this.postData.brokerName = null;
      // 初始化渠道分销合同
      this.postData.contNo = null;
      this.contNoList = [];
      // 初始化收派套餐
      this.initAllReceiveList();
    }

    // 改变渠道公司
    changeCompany(value: any) {
      console.log('changeCompany:', value);
      this.agencySearchName = null;
      this.initAgencyInfo();
      // 获取渠道分销合同
      if (value) this.getOneAgentTeamContNo('contNo', value, this.postData.cycleId, this.postData.companyKind);
    }

    // 改变经纪人
    changeBroker() {
      this.brokerSearchName = null;
    }

    // 修改合同类型
    changeContType(value: any) {
      // if (value === 'DistriDeal' && !this.baseInfoInDeal.hasRecord && this.postData.roomId) {
      //   // 如果查询不到此房号的已成交报备信息，用户又选择分销成交
      //   this.postData.contType = this.tempContType ? this.tempContType : null;
      //   this.$alert('系统查询不到此房号的已成交报备信息，请先维护报备信息！', '提示', {
      //     confirmButtonText: '确定'
      //   });
      //   return;
      // } else {
      //   // 不是分销成交
      //   // 初始化收派套餐
      //   this.initAllReceiveList();
      //   // 选择房号后构建表格数据
      //   // this.getUploadDocumentList(value);
      //   // 记录临时值
      //   this.tempContType = value;
      // }
      // console.log(this.tempContType);
      console.log(value);
      // 初始化收派套餐
      this.initAllReceiveList();
      // 选择房号后构建表格数据
      this.getUploadDocumentList(value);
    }

    // 选择房号后构建表格数据
    getUploadDocumentList(type: any) {
      if (type === "DistriDeal") {
        // 分销成交
        this.postData.uploadDocumentList.push(...this.tempDocumentList);
      } else {
        // 非分销成交
        this.postData.uploadDocumentList = this.postData.uploadDocumentList.filter((item: any) => {
          return !["VisitConfirForm", "DealConfirForm"].includes(item.code);
        });
      }
      // 回显房号带出来的附件
      let docs: any = [];
      if (this.postData.roomId && this.baseInfoInDeal && this.baseInfoInDeal.docs && this.baseInfoInDeal.docs.length) {
        docs = this.baseInfoInDeal.docs;
      }
      // 放入对应的文件
      if (this.postData.uploadDocumentList && this.postData.uploadDocumentList.length) {
        this.postData.uploadDocumentList.forEach((list: any) => {
          list.fileList = [];
          list.defaultFileList = [];
          docs.forEach((item: any) => {
            if (list.code === item.fileType) {
              list.defaultFileList.push(
                {
                  ...item,
                  // name: item.fileName,
                  exAuto: true, // 是否可以删除
                }
              )
            }
          });
        });
      }
    }

    // 预览分销协议
    previewContNo(contractNo: any) {
      if (!contractNo) {
        this.$message.warning('请先选择需要预览的合同');
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

    /*
    * 重置值方法
    * params: objName: string --- data中存在的对象 eg:postData
    * params: keyList: array --- 需要重置对象值的key数组 eg:['a', 'b']
    * */
    resetObject(objName: any = '', keyList: any = []) {
      if (!objName || !(this as any)[objName]) return;
      if (keyList && keyList.length > 0) {
        keyList.forEach((item: any) => {
          (this as any)[objName][item] = null;
        })
      } else {
        for (let keys in (this as any)[objName]) {
          (this as any)[objName][keys] = null;
        }
      }
    }

    // 清空数据 - 主要是和初始化数据有关的数据
    resetData() {
      this.tempSubscribePrice = null;
      this.tempSignPrice = null;
      this.contNoList = []; // 分销协议编号
      this.packageIdsList = []; // ids
      // this.postData.customerList = []; // 客户信息
      this.baseInfoInDeal.customerAddVOS = [];
      // this.postData.offerNoticeVO = []; // 优惠告知书
      // this.postData.uploadDocumentList = []; // 上传附件
      this.postData.calculation = 'Auto'; // 计算方式改为手动
      this.postData.channelCommList = []; // 对外拆佣
      this.postData.achieveTotalBagList = []; // 平台费用-总包
      this.postData.achieveDistriList = []; // 平台费用-分销
      this.hasClickFlag = false;
      this.showChangeTips();
      // this.addFlag = true;
      // this.editFlag = false;
      // this.tipsFlag = false;
      // this.dividerTips = '加载成功';
      let list: any = ['contType', 'contNo', 'recordState', 'recordStr', 'area', 'room', 'hall',
        'toilet', 'propertyNo', 'signType', 'returnRatio', 'subscribePrice', 'subscribeDate',
        'signPrice', 'signDate', 'agencyId', 'agencyName', 'channelLevel', 'sceneSales', 'returnRatio']
      this.resetObject('postData', list);
    }

    // 初始化收派套餐 --- 变更成交业绩 + 退房的时候
    initAllReceiveList() {
      if (['ChangeAchieveInf', 'RetreatRoom'].includes(this.changeType)
        && this.postData.receiveList && this.postData.receiveList.length) {
        let tempList: any = (this as any).$tool.deepClone(this.postData.receiveList);
        tempList.forEach((list: any) => {
          list.collectandsendDetailDealVO = null;
          list.showData = [];
          list.packageId = null;
          list.receiveAmount = 0;
          list.commAmount = 0;
          list.rewardAmount = 0;
          list.totalPackageAmount = 0;
          list.distributionAmount = 0;
          list.otherChannelFees = 0;
        });
        this.postData.receiveList = tempList;
        // 显示手动按钮
        this.showChangeTips();
        // this.addFlag = false;
        // this.editFlag = true;
        // this.tipsFlag = false;
        // this.dividerTips = "加载成功";
      }
    }

    // 选择项目周期
    selectProject() {
      if (this.changeType !== "ChangeAchieveInf") return;
      this.dialogAddProjectCycle = true;
    }

    // 确定选择项目周期
    async finishAddProjectCycle(data: any) {
      // console.log('data', data);
      if (data && data.length > 0) {
        // 不管是否一样，都清数据
        if (this.postData.cycleId) {
          this.postData.receiveList = []; // 收派金额
          this.postData.documentVO = []; // 上传附件
          this.postData.oneAgentTeam = null;
          this.postData.oneAgentTeamId = null;
          this.postData.stage = null;
          this.postData.propertyType = null;
          this.postData.buildingId = null;
          this.postData.roomId = null;
          this.postData.roomNo = null;
          await this.resetData();
        }
        this.postData.cycleName = data[0].termName;
        this.postData.proId = data[0].proId;
        this.postData.cycleId = data[0].termId;
        this.cycleCheckedData = [...data];
        this.hasChangeProCycleFlag = true; // 改变周期后，此标志为true
        await this.getBaseDealInfo(this.postData.cycleId);
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
      if (scope.row.templateType === "ElectronicTemplate") {
        window.open(
          `/sales-api/sales-document-cover/file/browse/${scope.row.templateId}`
        );
      } else {
        let imgList = scope.row.noticeAttachmentList || scope.row.annexList;
        this.srcList = imgList.map(
          (i: any) => `/sales-api/sales-document-cover/file/browse/${i.fileNo}`
        );
        this.srcData = imgList.map((v: any) => ({
          fileName: v.attachmentSuffix,
          preFileName: "优惠告知书",
        }));
        if (this.srcList && this.srcList.length) {
          this.isShowImg = true;
        } else {
          this.$message.warning("暂无图片");
        }
      }
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
        id: data[0].id,
        cardNo: data[0].certificateNumber,
        cardType: data[0].cardType,
        customerName: data[0].custName,
        customerNo: data[0].custCode,
        customerPhone: data[0].custTel,
        customerType: data[0].custType,
        email: data[0].email,
        isCustomer: null // 是否主要客户
      }
      if (this.postData.customerList && this.postData.customerList.length > 0) {
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
          if (this.postData.customerList && this.postData.customerList.length) {
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

    // 新增 --- 初始化拆佣和平台费用
    async handleLoadCommission(type: any = '') {
      let flag: any = false;
      flag = this.validReceiveData(this.postData.receiveList, this.postData.calculation);
      if (!flag) {
        this.$message.warning("请先完善收派金额信息！");
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
        this.hasClickFlag = true;
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
          this.dividerTips = "刷新成功";
          this.hasClickFlag = true;
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
        receives: this.postData.receiveList
      };
      let commissionData: any = await post_pageData_initChannelComm(params);
      console.log(commissionData);
      this.postData.channelCommList = commissionData;
    }

    // 初始化平台费用
    async initAchieveData() {
      let params: any = {
        branchCompanyId: this.baseInfoByTerm.startDivisionId, // 分公司Id --- 项目周期带出
        contType: this.postData.contType, // 合同类型
        distriAmount: this.getTotalAmount('distributionAmount'), // 分销金额
        isMarketProject: this.postData.isMarketProject, // 是否市场化项目
        modelCode: this.postData.modelCode, // 业务模式
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
    * 校验收派金额信息模块
    * 自动---是否都有收派套餐
    * 手动---除了其他渠道费用外是否都大于等于0
    * params: data: Array --- 需要判断的收派金额数组
    * params: way: string --- 计算方式---auto:自动；Manual:手动
    * */
    validReceiveData(data: any = [], way: any = "Auto") {
      if (data.length === 0) return false;
      let flag: any = true;
      if (way === 'Auto') {
        // 自动
        flag = data.every((item: any) => {
          return (item.showData && item.showData.length > 0);
        });
      } else {
        // 手动
        data.forEach((item: any) => {
          if ([null, undefined, ""].includes(item.receiveAmount)) {
            flag = false;
          }
          if ([null, undefined, ""].includes(item.commAmount)) {
            flag = false;
          }
          if ([null, undefined, ""].includes(item.rewardAmount)) {
            flag = false;
          }
          if ([null, undefined, ""].includes(item.totalPackageAmount)) {
            flag = false;
          }
          if ([null, undefined, ""].includes(item.distributionAmount)) {
            flag = false;
          }
        })
      }
      // 判断收派信息存在服务费的时候，是否有甲方/客户信息 --- 2021-01-23暂时取消判断
      // data.forEach((item: any) => {
      //   if (item.type === 'ServiceFee') {
      //     if (!item.partyACustomer || !item.partyACustomerName) {
      //       flag = false;
      //     }
      //   }
      // });
      return flag;
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

    /*
    * 修改收派金额或对外拆佣的值
    * updateType: String，收派金额receiveList/对外拆佣channelCommList
    * type: String，收派金额/对外拆佣对应的字段
    * id: String，更新的id
    * name: String，更新的name
    * isNull: Boolean，true: 置空，false: 置为对应值
    * */
    updateList(updateType: any = '', type: any = '', id: any = '', name: any = '', isNull: any = false) {
      console.log(id);
      if (this.postData[updateType] && this.postData[updateType].length) {
        this.postData[updateType].forEach((list: any) => {
          if (list[type] === "ServiceFee") {
            // list.partyACustomer = isNull ? null : id;
            list.partyACustomerName = isNull ? null : name;
          }
        });
      }
    }

    // 选择收派套餐
    selectPackage(scope: any) {
      // console.log('选择收派套餐', scope);
      // 价格排除0
      if (['', null, undefined].includes(this.postData.signPrice) && ['', null, undefined].includes(this.postData.subscribePrice)) {
        this.$message.warning('认购价格、签约价格不能都为空！');
        return;
      }
      // if (!this.packageIdsList.length && !this.firstAgencyIdsList.length) {
      //   this.$message.warning('一手代理合同、渠道分销合同不能都为空！');
      //   return;
      // }
      this.currentReceiveIndex = scope.$index;
      let params: any = {
        cycleId: this.baseInfoByTerm.termId, // 项目周期id
        contType: this.postData.contType, // 合同类型
        // hasRecord: this.baseInfoInDeal.hasRecord, // 是否有成交报备(是否分销成交)
        // contNo: this.postData.contNo, // 分销协议编号
        packageMxIds: [...this.packageIdsList, ...this.firstAgencyIdsList], // 分销成交 --- 选择分销协议后的ids
        costTypeEnum: scope.row.type, // 费用类型
        partyAId: scope.row.partyACustomer, // 甲方或客户
        property: this.postData.propertyType, // 物业类型
        subdivide: this.postData.refineModel, // 细分业务模式
      };
      console.log(params);
      this.receivePackageData = params;
      this.dialogAddReceivePackage = true;
    }

    // 确定选择收派套餐
    async finishAddReceivePackage(data: any) {
      // console.log('确定选择收派套餐', data);
      if (data.length === 0) return;
      let dataObj = (this as any).$tool.deepClone(data[0]);
      delete dataObj['typeName']; // 删除typeName属性
      let postData: any = {
        detail: dataObj,
        signPrice: this.postData.signPrice ? this.postData.signPrice : null,
        subscribePrice: this.postData.subscribePrice ? this.postData.subscribePrice : null
      }
      let info: any = await post_pageData_calculateReceiveAmount(postData);
      // console.log(info);
      if (this.postData.receiveList && this.postData.receiveList.length > 0) {
        this.postData.receiveList.forEach((vo: any, index: any) => {
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
      this.dialogAddReceivePackage = false;
      if (!this.addFlag) {
        this.showChangeTips();
      }
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
        let distributionAmount: any = this.getTotalAmount('distributionAmount'); // 分销金额
        if (distributionAmount && distributionAmount > 0) {
          // 只有当分销金额不为0的时候才需要新增一条
          let tempData = JSON.parse(JSON.stringify(data)); // 修改类型
          tempData.type = 'Distri';
          tempDistriList = this.getTempList(this.editDealAchieveData.btnType, this.currentChangeObj.index, this.postData.achieveDistriList, tempData);
        }
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
        if (tempArr && tempArr.length > 0) {
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
        modelCode: this.postData.modelCode, // 业务模式
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

    // 获取拆佣总金额
    getCommAmount() {
      let total = 0;
      if (this.postData.channelCommList && this.postData.channelCommList.length) {
        this.postData.channelCommList.forEach((vo: any) => {
          let commValue: any = vo.commAmount ? vo.commAmount : 0;
          let rewardValue: any = vo.rewardAmount ? vo.rewardAmount : 0;
          total = (this as any).$math.tofixed((this as any).$math.addArr([total * 1, commValue * 1, rewardValue * 1]), 2);
          // total = (total * 1 * 100 + commValue * 1 * 100 + rewardValue * 1 * 100) / 100;
        });
        return total;
      } else {
        return 0;
      }
    }

    // 获取分销金额和总包金额
    getTotalAmount(type: any = '') {
      if (!type) return;
      let total = 0;
      if (this.postData.receiveList && this.postData.receiveList.length) {
        this.postData.receiveList.forEach((vo: any) => {
          let value: any = vo[type] ? vo[type] : 0;
          total = (this as any).$math.tofixed((this as any).$math.add(total * 1, value * 1), 2);
          // total = total + parseFloat(vo[type] ? vo[type] : 0);
        });
        return total;
      } else {
        return 0;
      }
    }

    // 获取最新的上传附件
    getNewFile(data: any, type?: any) {
      // console.log(data);
      // console.log(type);
      if (this.postData.uploadDocumentList && this.postData.uploadDocumentList.length > 0) {
        this.postData.uploadDocumentList.forEach((vo: any) => {
          if (vo.code === type) {
            vo.fileList = data;
          }
        });
      }
    }

    // 底部按钮功能
    async handleClickBtn(btnType: any = '') {
      switch (btnType) {
        case "preview":
          // 预览
          if (this.changeType === "ChangeInternalAchieveInf") {
            await this.submitData();
          }
          break;
        case "next":
          // 下一步
          if (['ChangeBasicInf', 'ChangeAchieveInf'].includes(this.changeType)) {
            // 变更基础信息、变更业绩信息增加form表单校验
            (this.$refs["ruleForm"] as ElForm).validate(this.addSave);
          } else {
            await this.submitData();
          }
          break;
        case "back":
          // 取消
          this.$emit("back");
          break;
      }
    }

    @NoRepeatHttp()
    async addSave(valid: any) {
      let flag = this.validReceiveData(this.postData.receiveList, this.postData.calculation);
      if (!flag) {
        this.$message.warning('请先完善收派金额信息！');
        return;
      }
      if (valid && flag) {
        await this.submitData();
      } else {
        this.$message.warning('请先填好数据再保存');
        return false;
      }
    }

    // 后端校验数据
    async submitData() {
      // 补充成交类型
      try {
        this.btnLoading = true;
        let data: any = null;
        let callBackInfo: any = null; // 校验后后端返回来的插值数据
        switch (this.changeType) {
          case "ChangeBasicInf":
            // 变更基础信息
            if (this.btnType === "add") {
              // 去新增
              data = await this.initBaseDataByAdd();
              callBackInfo = await post_suppDeal_previewEntryBasicInfChange(data);
            } else if (this.btnType === "edit") {
              // 去修改
              data = await this.initBaseDataByUpdated();
              callBackInfo = await post_suppDeal_previewUpdateBasicInfChange(data);
            }
            this.btnLoading = false;
            this.postData.refundAmount = callBackInfo?.refundAmount;
            this.$emit('next', 'next', {
              ...this.postData,
              // receiveAchieveVO: this.receiveAchieveVO,
              currentPostData: data,
              callBackInfo
            });
            break;
          case "ChangeAchieveInf":
            // 变更成交业绩信息
            data = await this.initRetreatRoomData();
            if (this.btnType === "add") {
              // 去新增
              callBackInfo = await post_suppDeal_previewEntryAchieveInfChange(data);
            } else if (this.btnType === "edit") {
              // 去修改
              callBackInfo = await post_suppDeal_previewUpdateAchieveInfChange(data);
            }
            this.btnLoading = false;
            this.postData.refundAmount = callBackInfo?.refundAmount;
            this.$emit('next', 'next', {
              ...this.postData,
              // receiveAchieveVO: this.receiveAchieveVO,
              currentPostData: data,
              callBackInfo
            });
            break
          case "RetreatRoom":
            // 退房
            data = await this.initRetreatRoomData();
            if (this.btnType === "add") {
              // 去新增
              callBackInfo = await post_suppDeal_previewEntryRetreatRoom(data);
            } else if (this.btnType === "edit") {
              // 去修改
              callBackInfo = await post_suppDeal_previewUpdateRetreatRoom(data);
            }
            this.btnLoading = false;
            this.postData.refundAmount = callBackInfo?.refundAmount;
            this.$emit('next', 'next', {
              ...this.postData,
              // receiveAchieveVO: this.receiveAchieveVO,
              currentPostData: data,
              callBackInfo
            });
            break
          case "ChangeInternalAchieveInf":
            // 内部员工业绩变更
            if (this.btnType === "add") {
              // 去新增
              data = await this.initStaffAchieveDataByAdd();
              callBackInfo = await post_suppDeal_previewEntryStaffAchieveChange(data);
            } else if (this.btnType === "edit") {
              // 去修改
              data = await this.initStaffAchieveDataByUpdated();
              callBackInfo = await post_suppDeal_previewUpdateStaffAchieveChange(data);
            }
            this.btnLoading = false;
            this.postData.refundAmount = callBackInfo?.refundAmount;
            this.$emit("preview", {
              ...this.postData,
              // receiveAchieveVO: this.receiveAchieveVO,
              currentPostData: data,
              callBackInfo
            });
            break
        }
      } catch (error) {
        console.log(error);
        this.btnLoading = false;
      }
    }

    // 整合基础信息提交数据 - 新增
    initBaseDataByAdd() {
      let dataObj: any = {
        agencyVO: [], // 中介信息
        customerVO: this.postData.customerList && this.postData.customerList.length ? this.postData.customerList : null, // 客户信息
        dealAddInputVO: {
          sceneSales: this.postData.sceneSales,
          parentId: this.postData.parentId, // 主成交id
          signDate: this.postData.signDate,
          signType: this.postData.signType,
          stage: this.postData.stage,
          status: null, // 最后点击提交/保存的时候才会赋值
          subscribeDate: this.postData.subscribeDate,
        }, // 主成交信息
        documentVO: this.postData.uploadDocumentList && this.postData.uploadDocumentList.length ? this.getDocumentList(this.postData.uploadDocumentList) : null, // 成交附件信息
        houseAddInputVO: {
          area: this.postData.area,
          buildingId: this.postData.buildingId,
          hall: this.postData.hall,
          propertyNo: this.postData.propertyNo,
          propertyType: this.postData.propertyType,
          room: this.postData.room,
          roomId: this.postData.roomId,
          roomNo: this.postData.roomNo,
          toilet: this.postData.toilet
        },
        noticeDealList: [],
      }
      if (this.postData.agencyId) {
        dataObj.agencyVO.push(
          {
            agencyId: this.postData.agencyId,
            agencyName: this.postData.agencyName,
            brokerId: this.postData.brokerId,
            broker: this.postData.brokerName,
            companyKind: this.postData.companyKind,
            // channelLevel: this.postData.channelLevel
          }
        )
      } else {
        dataObj.agencyVO = null;
      }
      return dataObj;
    }

    // 整合基础信息提交数据 - 修改
    initBaseDataByUpdated() {
      let dataObj: any = {
        agencyVO: [], // 中介信息
        customerVO: this.postData.customerList && this.postData.customerList.length ? this.postData.customerList : null, // 客户信息
        dealUpdateInputVO: {
          dealCode: this.postData.dealCode ? this.postData.dealCode : null,
          id: this.id ? this.id : null,
          sceneSales: this.postData.sceneSales,
          parentId: this.postData.parentId, // 主成交id
          signDate: this.postData.signDate,
          signType: this.postData.signType,
          stage: this.postData.stage,
          status: null, // 最后点击提交/保存的时候才会赋值
          subscribeDate: this.postData.subscribeDate,
        }, // 主成交信息
        documentVO: this.postData.uploadDocumentList && this.postData.uploadDocumentList.length ? this.getDocumentList(this.postData.uploadDocumentList) : null, // 成交附件信息
        houseUpdateInputVO: {
          dealId: this.id ? this.id : null,
          id: this.postData?.house?.id,
          area: this.postData.area,
          buildingId: this.postData.buildingId,
          hall: this.postData.hall,
          propertyNo: this.postData.propertyNo,
          propertyType: this.postData.propertyType,
          room: this.postData.room,
          roomId: this.postData.roomId,
          roomNo: this.postData.roomNo,
          toilet: this.postData.toilet
        },
        noticeAgreementCreateRequest: [],
      }
      if (this.postData.agencyId) {
        dataObj.agencyVO.push(
          {
            dealId: this.id ? this.id : null, // 成交id
            agencyId: this.postData.agencyId,
            agencyName: this.postData.agencyName,
            brokerId: this.postData.brokerId,
            broker: this.postData.brokerName,
            companyKind: this.postData.companyKind,
            // channelLevel: this.postData.channelLevel
          }
        )
      } else {
        dataObj.agencyVO = null;
      }
      if (dataObj.customerVO && dataObj.customerVO.length) {
        dataObj.customerVO.forEach((vo: any) => {
          vo.dealId = this.id ? this.id : null;
        });
      }
      if (dataObj.documentVO && dataObj.documentVO.length) {
        dataObj.documentVO.forEach((vo: any) => {
          vo.dealId = this.id ? this.id : null;
        });
      }
      return dataObj;
    }

    // 整合退房 + 成交业绩数据
    initRetreatRoomData() {
      let dataObj: any = {
        noticeDealList: [],
        achieveVO: [...this.postData.achieveTotalBagList, ...this.postData.achieveDistriList], // 平台费用信息
        agencyVO: [], // 中介信息
        calculation: this.postData.calculation, // 计算方式
        channelCommVO: this.postData.channelCommList && this.postData.channelCommList.length ? this.postData.channelCommList : null, // 对外拆佣信息
        customerVO: this.postData.customerList && this.postData.customerList.length ? this.postData.customerList : null, // 客户信息
        dealVO: {
          ...this.postData,
          id: this.btnType === "edit" ? this.id : null,
          stage: 'SignUp', // 2021-03-01 补充成交只有签约状态
          isMat: this.postData.contType === 'DistriDeal' ? this.postData.isMat : null, // 分销成交再传
          contNo: this.postData.contType === 'DistriDeal' ? this.postData.contNo : null, // 分销成交再传
          noticeIds: [] // 优惠告知书Id
        }, // 成交基础信息
        documentVO: this.postData.uploadDocumentList && this.postData.uploadDocumentList.length ? this.getDocumentList(this.postData.uploadDocumentList) : null, // 成交附件信息
        houseVO: {
          dealId: this.btnType === "edit" ? this.id : null,
          id: this.postData?.house?.id,
          area: this.postData.area,
          buildingId: this.postData.buildingId,
          hall: this.postData.hall,
          propertyNo: this.postData.propertyNo,
          propertyType: this.postData.propertyType,
          room: this.postData.room,
          roomId: this.postData.roomId,
          roomNo: this.postData.roomNo,
          toilet: this.postData.toilet
        },
        receiveAchieveVO: [], // 应收业绩信息
        receiveVO: this.postData.receiveList && this.postData.receiveList.length ? this.postData.receiveList : null, // 收派金额
        parentId: this.postData.parentId, // 父成交Id
        status: null, // 成交状态
      }
      if (dataObj.achieveVO && dataObj.achieveVO.length) {
        dataObj.achieveVO.forEach((vo: any) => {
          vo.isMainDeal = false;
        });
      } else {
        dataObj.achieveVO = null;
      }
      if (dataObj.customerVO && dataObj.customerVO.length && this.btnType === "edit") {
        dataObj.customerVO.forEach((vo: any) => {
          vo.dealId = this.id;
        });
      }
      if (dataObj.documentVO && dataObj.documentVO.length && this.btnType === "edit") {
        dataObj.documentVO.forEach((vo: any) => {
          vo.dealId = this.id;
        });
      }
      if (dataObj.receiveVO && dataObj.receiveVO.length && this.btnType === "edit") {
        dataObj.receiveVO.forEach((vo: any) => {
          vo.dealId = this.id;
        });
      }
      if (this.postData.agencyId) {
        if (this.btnType === "edit") {
          dataObj.agencyVO.push(
            {
              agencyId: this.postData.agencyId,
              agencyName: this.postData.agencyName,
              brokerId: this.postData.brokerId,
              broker: this.postData.brokerName,
              companyKind: this.postData.companyKind,
              // channelLevel: this.postData.channelLevel,
              dealId: this.id
            }
          )
        } else if (this.btnType === "add") {
          dataObj.agencyVO.push(
            {
              agencyId: this.postData.agencyId,
              agencyName: this.postData.agencyName,
              brokerId: this.postData.brokerId,
              broker: this.postData.brokerName,
              companyKind: this.postData.companyKind,
              // channelLevel: this.postData.channelLevel
            }
          )
        }
      } else {
        dataObj.agencyVO = null;
      }
      if (this.postData.offerNoticeVO && this.postData.offerNoticeVO.length) {
        this.postData.offerNoticeVO.forEach((item: any) => {
          dataObj.dealVO.noticeIds.push(item.noticeId);
        });
      } else {
        dataObj.dealVO.noticeIds = null;
      }
      if (this.receiveAchieveVO && this.receiveAchieveVO.length && this.postData.receiveAchieveList && this.postData.receiveAchieveList.length) {
        if (this.btnType === "edit") {
          dataObj.receiveAchieveVO.push(
            {
              receiveAmount: this.receiveAchieveVO[0].receiveAmount,
              achieveAmount: this.receiveAchieveVO[0].achieveAmount,
              otherChannelFees: this.receiveAchieveVO[0].otherChannelFees,
              dealId: this.id,
              id: this.postData.receiveAchieveList[0].id
            }
          )
        } else {
          dataObj.receiveAchieveVO.push(
            {
              receiveAmount: this.receiveAchieveVO[0].receiveAmount,
              achieveAmount: this.receiveAchieveVO[0].achieveAmount,
              otherChannelFees: this.receiveAchieveVO[0].otherChannelFees,
            }
          )
        }
      } else {
        dataObj.receiveAchieveVO = null;
      }
      return dataObj;
    }

    // 整合变更内部员工业绩数据
    initStaffAchieveDataByAdd() {
      let dataObj: any = {
        achieveVO: null, // 平台费用信息
        parentId: this.postData.parentId, // 父成交Id
        status: null, // 成交状态
      }
      if (this.postData.achieveTotalBagList.length || this.postData.achieveDistriList.length) {
        dataObj.achieveVO = [...this.postData.achieveTotalBagList, ...this.postData.achieveDistriList];
      }
      return dataObj;
    }

    // 整合变更内部员工业绩数据
    initStaffAchieveDataByUpdated() {
      let dataObj: any = {
        achieveVO: null, // 平台费用信息
        dealId: this.id,
        parentId: this.postData.parentId, // 父成交Id
        status: null, // 成交状态
      }
      if (this.postData.achieveTotalBagList.length || this.postData.achieveDistriList.length) {
        dataObj.achieveVO = [...this.postData.achieveTotalBagList, ...this.postData.achieveDistriList];
      }
      return dataObj;
    }

    // 获取附件信息
    getDocumentList(list: any = []) {
      let tempList: any = [];
      if (list && list.length > 0) {
        list.forEach((item: any) => {
          // console.log(item);
          if (item.fileList && item.fileList.length) {
            item.fileList.forEach((L: any) => {
              if (!L.exAuto) {
                // 只获取新上传的
                tempList.push(
                  {
                    fileId: L.fileId,
                    fileName: L.fileName,
                    fileType: item.code
                  }
                );
              }
            });
          }
        });
      }
      return tempList;
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
                let total = (this as any).$math.tofixed((this as any).$math.add(prev * 1, curr * 1), 2);
                // let total = (prev * 1 * 100 + curr * 1 * 100) / 100;
                return total;
              } else {
                return ((this as any).$math.tofixed(prev * 1, 2));
                // return ((prev * 1 * 100) / 100);
              }
            }, 0);
            // sums[index] = Math.round(sums[index] * 100) / 100; // 解决精度缺失问题
          } else {
            sums[index] = '';
          }
        } else {
          sums[index] = '';
        }
      });
      return sums;
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
                // let total = (prev * 1 * 100 + curr * 1 * 100) / 100;
                let total = (this as any).$math.tofixed((this as any).$math.add(prev * 1, curr * 1), 2);
                return total;
              } else {
                return ((this as any).$math.tofixed(prev * 1, 2));
                // return ((prev * 1 * 100) / 100);
              }
            }, 0);
            // sums[index] = Math.round(sums[index] * 100) / 100; // 解决精度缺失问题
          } else {
            sums[index] = '';
          }
        } else {
          sums[index] = '';
        }
      });
      return sums;
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
                // let total = (prev * 1 * 100 + curr * 1 * 100) / 100;
                let total = (this as any).$math.tofixed((this as any).$math.add(prev * 1, curr * 1), 2);
                return total;
              } else {
                return ((this as any).$math.tofixed(prev * 1, 2));
                // return ((prev * 1 * 100) / 100);
              }
            }, 0);
            // sums[index] = Math.round(sums[index] * 100) / 100; // 解决精度缺失问题
          } else {
            sums[index] = '';
          }
        } else {
          sums[index] = '';
        }
      });
      return sums;
    }

    /*
    * 判断字段是否禁用
    * 条件(both)：1.关联明源数据（全部、部分）； 2.数据是明源带出来的（有值）。
    * params: key: string --- 需要判断的字段
    * params: type: string --- 该字段在明源Vo中的类型：houseVO、customerVOS、dealVO
    * */
    isDisabled(key: any = '', type: any = '') {
      const data: any = this.baseInfoInDeal.myReturnVO;
      let isMingYuanFlag: any = this.baseInfoByTerm?.exMinyuan === 1;
      if (!key || !type || !data[type]?.[key]) return false;
      let flag: any = false;
      // 对应明源字段是否有值
      if (type === 'houseVO') {
        // 针对房间vo特殊判断
        if (data[type][key] && this.postData.roomId && isMingYuanFlag) {
          flag = true;
        } else {
          flag = false;
        }
      } else {
        // 其他vo的判断
        if (data[type][key] && this.postData.roomId) {
          flag = true;
        } else {
          flag = false;
        }
      }
      return flag;
    }
  }
</script>
<style lang="scss" scoped>
  .add-all-wrapper {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 10px;
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

  .demo-ruleForm {
    /deep/.el-input-group__append {
      padding: 0px 10px;
    }
  }

  .form-item-label-wrapper {
    /deep/.el-form-item__label {
      line-height: 20px;
    }
  }

  .div-disabled {
    width: 100%;
    border-radius: 4px;
    border: 1px solid #E4E7ED;
    background-color: #F5F7FA;
    color: #C0C4CC;
    cursor: not-allowed;
    padding: 0 15px;
    box-sizing: border-box;
    height: 40px;
    line-height: 40px;
  }

  .agency-wrapper {
    width: 100%;
    display: flex;

    div {
      flex: 1;
      text-align: center;
    }
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

    .title-right {
      margin-right: 20px;
      box-sizing: border-box;
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
        //margin-top: 10px;

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
