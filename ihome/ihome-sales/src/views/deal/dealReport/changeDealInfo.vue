<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-10 15:48:11
 * @LastEditors: lsj
 * @LastEditTime: 2020-11-10 16:25:55
-->
<template>
  <ih-page class="text-left">
    <div v-if="['baseInfo', 'achieveInfo', 'checkOut'].includes(changeType)">
      <p class="ih-info-title">成交信息</p>
      <el-form
        :model="postData"
        :rules="rules"
        ref="ruleForm"
        label-width="160px"
        class="demo-ruleForm">
        <el-row>
          <el-col :span="6" v-if="['achieveInfo', 'checkOut'].includes(changeType)">
            <el-form-item label="成交报告编号">
              <el-input
                disabled
                placeholder="成交报告编号"
                v-model="postData.dealCode"/>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="['achieveInfo', 'checkOut'].includes(changeType)">
            <el-form-item label="项目周期">
              <el-input
                ref="inputSelect"
                class="input-select-wrapper"
                placeholder="项目周期"
                prefix-icon="el-icon-search"
                @click.native.prevent="selectProject"
                v-model="postData.contType"/>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="['achieveInfo', 'checkOut'].includes(changeType)">
            <el-form-item label="业务模式">
              <el-select
                v-model="postData.businessType"
                clearable
                placeholder="业务模式"
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
          <el-col :span="6" v-if="['achieveInfo', 'checkOut'].includes(changeType)">
            <el-form-item label="合同类型">
              <el-select
                v-model="postData.contType"
                clearable
                placeholder="请选择合同类型"
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
          <el-col :span="6" v-if="['achieveInfo', 'checkOut'].includes(changeType)">
            <el-form-item label="渠道商">
              <el-input
                ref="inputCompany"
                class="input-select-wrapper"
                placeholder="渠道商"
                prefix-icon="el-icon-search"
                @click.native.prevent="selectCompany"
                v-model="postData.contType"/>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="['achieveInfo', 'checkOut'].includes(changeType)">
            <el-form-item label="细分业务模式">
              <el-select
                v-model="postData.businessType"
                clearable
                placeholder="细分业务模式"
                class="width--100">
                <el-option label="总包" value="totalBag"></el-option>
                <el-option label="分销" value="distri"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="['achieveInfo', 'checkOut'].includes(changeType)">
            <el-form-item label="一手代理团队">
              <el-select
                v-model="postData.oneAgentTeamId"
                clearable
                placeholder="一手代理团队"
                class="width--100">
                <el-option label="是" value="yes"></el-option>
                <el-option label="否" value="no"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="['achieveInfo', 'checkOut'].includes(changeType)">
            <el-form-item label="是否市场化项目">
              <el-select
                v-model="postData.isMarketProject"
                clearable
                placeholder="请选择是否市场化项目"
                class="width--100">
                <el-option label="是" value="yes"></el-option>
                <el-option label="否" value="no"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="['achieveInfo', 'checkOut'].includes(changeType)">
            <el-form-item label="成交组织">
              <el-input v-model="postData.dealOrgId" clearable placeholder="成交组织"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="['achieveInfo', 'checkOut'].includes(changeType)">
            <el-form-item label="备案情况">
              <el-select
                v-model="postData.recordState"
                clearable
                placeholder="备案情况"
                class="width--100">
                <el-option label="有" value="Has"></el-option>
                <el-option label="无" value="No"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="['achieveInfo', 'checkOut'].includes(changeType)">
            <el-form-item label="明源房款回笼比例">
              <el-input v-model="postData.returnRatio" clearable placeholder="明源房款回笼比例"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="['baseInfo', 'achieveInfo', 'checkOut'].includes(changeType)">
            <el-form-item label="数据标志">
              <el-input v-model="postData.dataSign" clearable placeholder="数据标志"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="['achieveInfo', 'checkOut'].includes(changeType)">
            <el-form-item label="分销协议编号">
              <el-input v-model="postData.contNo" clearable placeholder="分销协议编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="['achieveInfo', 'checkOut'].includes(changeType)">
            <el-form-item label="是否垫佣">
              <el-select
                v-model="postData.isMat"
                clearable
                placeholder="是否垫佣"
                class="width--100">
                <el-option label="是" value="yes"></el-option>
                <el-option label="否" value="no"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="['baseInfo', 'achieveInfo', 'checkOut'].includes(changeType)">
            <el-form-item label="成交阶段">
              <el-select
                v-model="postData.stage"
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
          <el-col :span="6" v-if="['baseInfo', 'achieveInfo', 'checkOut'].includes(changeType)">
            <el-form-item label="签约类型">
              <el-select
                v-model="postData.signType"
                clearable
                placeholder="签约类型"
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
          <el-col :span="6" v-if="['achieveInfo', 'checkOut'].includes(changeType)">
            <el-form-item label="认购价格">
              <el-input v-model="postData.subscribePrice" clearable placeholder="认购价格"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="['baseInfo', 'achieveInfo', 'checkOut'].includes(changeType)">
            <el-form-item label="认购日期">
              <el-date-picker
                style="width: 100%"
                v-model="postData.subscribeDate"
                type="datetime"
                placeholder="认购日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="['achieveInfo', 'checkOut'].includes(changeType)">
            <el-form-item label="签约价格">
              <el-input v-model="postData.signPrice" clearable placeholder="签约价格"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="['baseInfo', 'achieveInfo', 'checkOut'].includes(changeType)">
            <el-form-item label="签约日期">
              <el-date-picker
                style="width: 100%"
                v-model="postData.signDate"
                type="datetime"
                placeholder="签约日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="['achieveInfo', 'checkOut'].includes(changeType)">
            <el-form-item label="录入人">
              <el-input v-model="postData.entryPerson" clearable placeholder="录入人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="['achieveInfo', 'checkOut'].includes(changeType)">
            <el-form-item label="成交状态">
              <el-input v-model="postData.status" clearable placeholder="成交状态"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="['achieveInfo', 'checkOut'].includes(changeType)">
            <el-form-item label="录入日期">
              <el-date-picker
                style="width: 100%"
                v-model="postData.entryDate"
                type="datetime"
                placeholder="录入日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="['achieveInfo', 'checkOut'].includes(changeType)">
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input
                type="textarea"
                :rows="3"
                v-model="postData.remarks"
                placeholder="请输入备注说明"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div v-if="['baseInfo', 'achieveInfo', 'checkOut'].includes(changeType)">
      <p class="ih-info-title">房产信息</p>
      <el-form
        :model="postData"
        :rules="rules"
        ref="ruleForm"
        label-width="160px"
        class="demo-ruleForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="物业类型">
              <el-select
                v-model="postData.propertyType"
                clearable
                placeholder="物业类型"
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
          <el-col :span="8">
            <el-form-item label="栋座">
              <el-select
                v-model="postData.buildingId"
                clearable
                placeholder="栋座"
                class="width--100">
                <el-option
                  v-for="item in modelContType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="房号">
              <el-select
                v-model="postData.roomNo"
                clearable
                placeholder="房号"
                class="width--100">
                <el-option
                  v-for="item in modelContType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房产证/预售合同编号">
              <el-input v-model="postData.propertyNo" clearable placeholder="房产证/预售合同编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房产证地址">
              <el-input v-model="postData.address" clearable placeholder="房屋地址"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="建筑面积">
              <el-input v-model="postData.area" clearable placeholder="建筑面积"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="户型">
              <div class="home-type-wrapper">
                <div>
                  <el-input-number
                    v-model="postData.room"
                    :min="0"
                    :step="1"
                    size="small"
                    :step-strictly="true"
                    abel="描述文字"></el-input-number>
                  室
                </div>
                <div>
                  <el-input-number
                    v-model="postData.hall"
                    :min="0"
                    :step="1"
                    size="small"
                    :step-strictly="true"
                    abel="描述文字"></el-input-number>
                  厅
                </div>
                <div>
                  <el-input-number
                    v-model="postData.toilet"
                    :min="0"
                    :step="1"
                    size="small"
                    :step-strictly="true"
                    abel="描述文字"></el-input-number>
                  卫
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div v-if="['baseInfo', 'achieveInfo', 'checkOut'].includes(changeType)">
      <p class="ih-info-title">客户信息</p>
      <el-row style="padding-left: 20px">
        <el-col>
          <div class="add-all-wrapper">
            <el-button type="success" @click="handleAddCustomer">添加客户</el-button>
          </div>
          <el-table
            class="ih-table"
            :data="infoList">
            <el-table-column prop="customerNo" label="客户编号" min-width="120"></el-table-column>
            <el-table-column prop="customerType" label="客户类型" min-width="120"></el-table-column>
            <el-table-column prop="customerName" label="客户名称" min-width="120"></el-table-column>
            <el-table-column prop="customerPhone" label="手机号码" min-width="120"></el-table-column>
            <el-table-column prop="cardType" label="证件类型" min-width="150"></el-table-column>
            <el-table-column prop="cardNo" label="证件编号" min-width="150"></el-table-column>
            <el-table-column prop="email" label="邮箱" min-width="150"></el-table-column>
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
    </div>
    <div v-if="['baseInfo', 'achieveInfo', 'checkOut'].includes(changeType)">
      <p class="ih-info-title">渠道信息</p>
      <el-row style="padding-left: 20px">
        <el-col>
          <div class="add-all-wrapper">
            <el-button type="success" @click="handleAddBroker">添加渠道经纪人</el-button>
          </div>
          <el-table
            class="ih-table"
            :data="infoList">
            <el-table-column prop="agencyName" label="渠道公司名称" min-width="120"></el-table-column>
            <el-table-column prop="channelLevel" label="渠道等级" min-width="120"></el-table-column>
            <el-table-column prop="broker" label="经纪人" min-width="120"></el-table-column>
            <el-table-column prop="storeIdName" label="门店" min-width="120"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
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
    </div>
    <div v-if="['achieveInfo', 'checkOut'].includes(changeType)">
      <p class="ih-info-title">收派金额</p>
      <el-row style="padding-left: 20px">
        <el-col>
          <el-table
            class="ih-table"
            show-summary
            sum-text="合计金额"
            :summary-method="getReceiveSummaries"
            :data="infoList">
            <el-table-column prop="type" label="类型" fixed min-width="120"></el-table-column>
            <el-table-column prop="partyACustomerName" label="甲方/客户" min-width="120"></el-table-column>
            <el-table-column prop="packageId" label="收派套餐" min-width="120"></el-table-column>
            <el-table-column prop="receiveAmount" label="应收金额" min-width="180"></el-table-column>
            <el-table-column prop="receivedAmount" label="应收已收金额" min-width="180"></el-table-column>
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
            :data="infoList">
            <el-table-column prop="receiveAmount" label="本单应收" min-width="120"></el-table-column>
            <el-table-column prop="achieveAmount" label="本单业绩" min-width="120"></el-table-column>
            <el-table-column prop="otherChannelFees" label="其他渠道费用(正数为产生，负数为使用)" min-width="150"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div v-if="['achieveInfo', 'checkOut'].includes(changeType)">
      <p class="ih-info-title">对外拆佣</p>
      <el-row style="padding-left: 20px">
        <el-col>
          <div class="add-all-wrapper">
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
                <el-select v-model="scope.row.target" placeholder="请选择">
                  <el-option label="公司" value="Company"></el-option>
                  <el-option label="个人" value="Personal"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="payee" label="收款方" min-width="120">
              <template slot-scope="scope">
                <el-input v-model="scope.row.payee" clearable placeholder="收款方"/>
              </template>
            </el-table-column>
            <el-table-column prop="feeType" label="费用类型" min-width="120">
              <template slot-scope="scope">
                <el-select v-model="scope.row.feeType" placeholder="请选择">
                  <el-option label="代理费" value="AgencyFee"></el-option>
                  <el-option label="服务费" value="ServiceFee"></el-option>
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
            <el-table-column fixed="right" label="操作" width="100">
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
    </div>
    <div v-if="['achieveInfo', 'checkOut', 'staffAchieveInfo'].includes(changeType)">
      <p class="ih-info-title">平台费用</p>
      <div class="ih-type-wrapper">
        <div class="title">总包</div>
        <el-button type="success" @click="handleAddRole('total')">增加角色人</el-button>
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
        <el-button type="success" @click="handleAddRole('distri')">增加角色人</el-button>
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
    </div>
    <div v-if="['baseInfo', 'achieveInfo', 'checkOut'].includes(changeType)">
      <p class="ih-info-title">上传附件</p>
      <el-row style="padding-left: 20px">
        <el-col>
          <el-table
            class="ih-table"
            :data="infoList">
            <el-table-column prop="fileType" label="类型" min-width="120"></el-table-column>
            <el-table-column prop="fileName" label="附件" min-width="120"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div class="text-center btn-top">
      <el-button type="success" @click="handlePreview()">预览变更信息</el-button>
      <el-button type="info" @click="handleCancel()">取消</el-button>
    </div>
    <ih-dialog :show="dialogAddProjectCycle" desc="选择项目周期列表">
      <SelectProjectCycle
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
    <ih-dialog :show="dialogAddRole" desc="选择角色用户列表">
      <SelectRole
        @cancel="() => (dialogAddRole = false)"
        @finish="
            (data) => {
              dialogAddRole = false;
              finishAddProjectCycle(data);
            }
          "
      />
    </ih-dialog>
    <ih-dialog :show="dialogEditDealAchieve" desc="修改成交业绩">
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
  import AddCustomer from "@/views/deal/dealReport/dialog/addCustomer.vue";
  import AddBroker from "@/views/deal/dealReport/dialog/addBroker.vue";
  import SelectRole from "@/views/deal/dealReport/dialog/selectRole.vue";
  import EditDealAchieve from "@/views/deal/dealReport/dialog/editDealAchieve.vue";
  import {
    get_achieveScaleScheme_get__id
  } from "@/api/deal";
  // import {Form as ElForm} from "element-ui";
  // import {NoRepeatHttp} from "ihome-common/util/aop/no-repeat-http";

  @Component({
    components: {AddCustomer, AddBroker, SelectProjectCycle, SelectRole, EditDealAchieve},
  })
  export default class ChangeDealInfo extends Vue {
    postData: any = {
      modelName: null,
      contType: null,
      isMarketProject: null,
      isSame: null,
      achievePropertyTypeList: [],
      achieveProjectList: [],
      remarks: null,
      buModelContTypeList: [],
      commissionInfoList: [],
      achieveTotalBagList: [],
      achieveDistriList: [],
    };
    infoList: any = [];
    rules: any = {
      modelName: [
        {required: true, message: "业务模式必选", trigger: "change"},
      ],
      buModelContTypeList: [
        {required: true, message: "合同类型必选", trigger: "change"},
      ]
    };
    modelContType: any = [
      {
        value: "SelfDeal",
        label: "自行成交"
      },
      {
        value: "DistriDeal",
        label: "分销成交"
      },
      {
        value: "NaturalVisitDeal",
        label: "自然来访成交"
      },
      {
        value: "SelfChannelDeal",
        label: "自渠成交"
      }
    ]
    id: any = null;
    changeType: any = null; // 改变成交信息的类型
    dialogAddCustomer: any = false;
    dialogAddBroker: any = false;
    dialogAddProjectCycle: any = false;
    dialogAddAgentCompany: any = false;
    dialogAddRole: any = false;
    dialogEditDealAchieve: any = false;

    async created() {
      this.id = this.$route.query.id;
      this.changeType = this.$route.query.type;
      // console.log('changeType', this.changeType);
      if (this.id) {
        const res: any = await get_achieveScaleScheme_get__id({id: this.id});
        this.postData = res;
      }
    }

    // 增加拆佣项
    handleAddCommission() {
      console.log('增加拆佣项');
      let obj = {};
      this.postData.commissionInfoList.push(obj);
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

    // 增加角色人
    handleAddRole(type: any) {
      console.log('type', type);
      this.dialogAddRole = true;
      // total - 总包； distri - 分销
    }

    // 选择项目周期
    selectProject() {
      this.dialogAddProjectCycle = true;
      // input失焦
      (this as any).$refs.inputSelect && (this as any).$refs.inputSelect.blur();
    }

    // 确定选择项目周期
    async finishAddProjectCycle(data: any) {
      console.log('data', data);
      // this.addTotalPackageList = data;
    }

    // 选择渠道商
    selectCompany() {
      this.dialogAddAgentCompany = true;
      // input失焦
      (this as any).$refs.inputCompany && (this as any).$refs.inputCompany.blur();
    }

    // 确定选择渠道商
    finishAddAgentCompany(data: any) {
      console.log('data', data);
      // this.addTotalPackageList = data;
    }

    // 预览-优惠告知书
    preview(scope: any) {
      console.log(scope);
    }

    // 添加客户
    handleAddCustomer() {
      this.dialogAddCustomer = true;
    }

    // 删除总包平台费用
    deleteAchieveTotalBag(scope: any) {
      console.log('data', scope);
    }

    // 修改总包平台费用
    editAchieveTotalBag(scope: any) {
      console.log('data', scope);
      this.dialogEditDealAchieve = true;
    }

    // 删除分销平台费用
    deleteAchieveDistri(scope: any) {
      console.log('data', scope);
    }

    // 修改分销平台费用
    editAchieveDistri(scope: any) {
      console.log('data', scope);
      this.dialogEditDealAchieve = true;
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

    // 取消
    async handleCancel() {
      this.$goto({
        path: "/dealReport/list",
      });
    }

    // 预览
    async handlePreview() {
      this.$router.push({
        path: "/dealReport/previewDealInfo",
        query: {
          id: this.id,
          type: this.changeType
        }
      });
    }
  }
</script>
<style lang="scss" scoped>
  .add-all-wrapper {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 10px;
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

  .input-select-wrapper {
    cursor: pointer;

    /deep/ .el-input__inner {
      cursor: pointer;
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
    }
  }
</style>
