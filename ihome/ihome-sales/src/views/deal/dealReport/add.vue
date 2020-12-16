<!--
 * @Descripttion: 
 * @version: 
 * @Author: lsj
 * @Date: 2020-10-30 16:38:23
 * @LastEditors: lsj
 * @LastEditTime: 2020-12-14 20:10:10
-->
<template>
  <ih-page class="text-left">
    <el-form
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
          <el-form-item label="细分业务模式" prop="subdivisionType">
            <el-select
              v-model="postData.subdivisionType"
              :disabled="['TotalBagModel', 'DistriModel'].includes(postData.businessType)"
              placeholder="请选择细分业务模式"
              class="width--100">
              <el-option
                v-for="item in subdivisionTypeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否垫佣" prop="isMat">
            <el-select
              v-model="postData.isMat"
              clearable
              placeholder="请选择是否垫佣"
              class="width--100">
              <el-option label="是" value="Yes"></el-option>
              <el-option label="否" value="No"></el-option>
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
              <el-option label="是" value="Yes"></el-option>
              <el-option label="否" value="No"></el-option>
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
              <el-option label="是" value="Yes"></el-option>
              <el-option label="否" value="No"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="合同类型" prop="contType">
            <el-select
              v-model="postData.contType"
              clearable
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
          <el-form-item label="分销协议编号">
            <div class="contNo-wrapper">
              <el-select
                v-model="postData.contNo"
                clearable
                placeholder="请选择分销协议编号"
                class="width--100">
                <el-option label="A" value="Has"></el-option>
                <el-option label="B" value="No"></el-option>
              </el-select>
              <div class="link-wrapper" v-if="!!postData.contNo">
                <el-link type="primary" @click.native.prevent="previewContNo">详情</el-link>
              </div>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="postData.contType === 'DistriDeal'">
          <el-form-item label="渠道公司">
            <el-input v-model="postData.channelName" disabled placeholder="选成交报备自动带出"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="postData.contType === 'DistriDeal'">
          <el-form-item label="渠道等级">
            <el-input v-model="postData.channelName" disabled placeholder="选成交报备自动带出"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="postData.contType === 'DistriDeal'">
          <el-form-item label="经纪人">
            <el-input v-model="postData.channelName" disabled placeholder="选成交报备自动带出"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="一手代理团队" prop="oneAgentTeamId">
            <el-select
              v-model="postData.oneAgentTeamId"
              clearable
              placeholder="请选择一手代理团队"
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
            <el-input v-model="postData.buildingId" disabled placeholder="请输入栋座"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="房号">
            <el-input placeholder="请选择房号" readonly v-model="postData.roomNo">
              <el-button slot="append" icon="el-icon-search" @click.native.prevent="selectRoom"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="备案情况">
            <el-select
              v-model="postData.recordState"
              clearable
              placeholder="请选择备案情况"
              class="width--100">
              <el-option label="有" value="Has"></el-option>
              <el-option label="无" value="No"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="建筑面积" prop="area">
            <el-input v-model="postData.area" clearable placeholder="请输入建筑面积"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="户型">
            <div class="home-type-wrapper">
              <div>
                <el-input-number
                  v-digits="0"
                  v-model="postData.room"
                  :min="0"
                  :step="1"
                  size="small"
                  :step-strictly="true"></el-input-number>室
              </div>
              <div>
                <el-input-number
                  v-digits="0"
                  v-model="postData.hall"
                  :min="0"
                  :step="1"
                  size="small"
                  :step-strictly="true"></el-input-number>厅
              </div>
              <div>
                <el-input-number
                  v-digits="0"
                  v-model="postData.kitchen"
                  :min="0"
                  :step="1"
                  size="small"
                  :step-strictly="true"></el-input-number>厨
              </div>
              <div>
                <el-input-number
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
            <el-input v-model="postData.remarks" clearable placeholder="请输入现场销售"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="签约类型">
            <el-select
              v-model="postData.signType"
              clearable
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
              clearable
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
          <el-form-item label="明源房款回笼比例">
            <el-input v-model="postData.returnRatio" clearable placeholder="请输入明源房款回笼比例"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="认购价格">
            <el-input v-model="postData.subscribePrice" clearable placeholder="请输入认购价格"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="认购日期">
            <el-date-picker
              style="width: 100%"
              v-model="postData.subscribeDate"
              type="datetime"
              placeholder="请选择认购日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="签约价格">
            <el-input v-model="postData.signPrice" clearable placeholder="请输入签约价格"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="签约日期">
            <el-date-picker
              style="width: 100%"
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
          <el-form-item label="录入人" prop="entryPerson">
            <el-input v-model="postData.entryPerson" readonly placeholder="录入人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="!!id">
          <el-form-item label="录入日期" prop="entryDate">
            <el-date-picker
              style="width: 100%"
              v-model="postData.entryDate"
              type="datetime"
              readonly
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
          <el-form-item label="成交状态" prop="status">
            <el-input v-model="postData.status" disabled placeholder="成交状态"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <p id="anchor-2" class="ih-info-title" v-if="false">房产信息</p>
      <el-row v-if="false">
        <el-col :span="24">
          <div class="add-all-wrapper padding-left-20">
            <el-button type="success">更新明源数据</el-button>
          </div>
        </el-col>
        <el-col :span="8">
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
        <el-col :span="8">
          <el-form-item label="栋座">
            <el-input v-model="postData.buildingId" disabled placeholder="请输入栋座"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="房号">
            <el-input placeholder="请选择房号" readonly v-model="postData.roomNo">
              <el-button slot="append" icon="el-icon-search" @click.native.prevent="selectRoom"></el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="房产证/预售合同编号">
            <el-input v-model="postData.propertyNo" clearable placeholder="请输入房产证/预售合同编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="房产证地址">
            <el-input v-model="postData.address" clearable placeholder="请输入房产证地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="建筑面积" prop="area">
            <el-input v-model="postData.area" clearable placeholder="请输入建筑面积"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="户型">
            <div class="home-type-wrapper">
              <div>
                <el-input-number
                  v-digits="0"
                  v-model="postData.room"
                  :min="0"
                  :step="1"
                  size="small"
                  :step-strictly="true"></el-input-number>室
              </div>
              <div>
                <el-input-number
                  v-digits="0"
                  v-model="postData.hall"
                  :min="0"
                  :step="1"
                  size="small"
                  :step-strictly="true"></el-input-number>厅
              </div>
              <div>
                <el-input-number
                  v-digits="0"
                  v-model="postData.kitchen"
                  :min="0"
                  :step="1"
                  size="small"
                  :step-strictly="true"></el-input-number>厨
              </div>
              <div>
                <el-input-number
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
      </el-row>
    </el-form>
    <p id="anchor-3" class="ih-info-title">优惠告知书信息</p>
    <el-row style="padding-left: 20px">
      <el-col>
        <div class="add-all-wrapper">
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
          <el-table-column prop="notificationStatusByName" label="优惠告知书状态" min-width="120"></el-table-column>
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
    <p id="anchor-4" class="ih-info-title">客户信息</p>
    <el-row style="padding-left: 20px">
      <el-col>
        <div class="add-all-wrapper">
          <el-button type="success" @click="handleAddCustomer">添加客户</el-button>
        </div>
        <el-table
          class="ih-table"
          :data="postData.customerVO">
          <el-table-column prop="custCode" label="客户编号" min-width="150"></el-table-column>
          <el-table-column prop="custType" label="客户类型" min-width="120">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.custType"
                clearable
                placeholder="客户类型">
                <el-option
                  v-for="item in $root.dictAllList('CustType')"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="custName" label="客户名称" min-width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.custName" clearable placeholder="客户名称" />
            </template>
          </el-table-column>
          <el-table-column prop="custTel" label="手机号码" min-width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.custTel" clearable placeholder="手机号码" />
            </template>
          </el-table-column>
          <el-table-column prop="cardType" label="证件类型" min-width="120">
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
          <el-table-column prop="certificateNumber" label="证件编号" min-width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.certificateNumber" clearable placeholder="证件编号" />
            </template>
          </el-table-column>
          <el-table-column prop="email" label="邮箱" min-width="120">
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
    <p id="anchor-5" class="ih-info-title" v-if="false">渠道信息</p>
    <el-row style="padding-left: 20px" v-if="false">
      <el-col>
        <div class="add-all-wrapper">
          <el-button type="success" @click="handleAddBroker">添加渠道经纪人</el-button>
        </div>
        <el-table
          class="ih-table"
          :data="postData.agencyVO">
          <el-table-column prop="agencyName" label="渠道公司名称" min-width="120"></el-table-column>
          <el-table-column prop="channelLevel" label="渠道等级" min-width="120"></el-table-column>
          <el-table-column prop="broker" label="经纪人" min-width="120"></el-table-column>
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
    <p id="anchor-6" class="ih-info-title">上传附件</p>
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
    <div class="receive-wrapper" id="anchor-7">
      <p class="ih-info-title">收派金额</p>
      <div v-if="currentType !== 'declare'">计算方式</div>
      <div v-if="currentType !== 'declare'">
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
          <el-table-column prop="type" label="类型" min-width="120">
            <template slot-scope="scope">
              <div>{{scope.row.type === 'ServiceFee' ? '服务费' : '代理费'}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="partyACustomerName" label="甲方/客户" min-width="120"></el-table-column>
          <el-table-column prop="packageId" label="收派套餐" min-width="140">
            <template slot-scope="scope">
              <el-input
                :disabled="postData.calculation === 'Manual'"
                placeholder="请选择收派套餐"
                v-model="scope.row.packageId">
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click.native.prevent="selectPackage(scope)"></el-button>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column prop="receiveAmount" label="应收金额" min-width="120">
            <template slot-scope="scope">
              <el-input
                v-digits="2"
                v-model="scope.row.receiveAmount"
                :disabled="postData.calculation === 'Auto'"
                placeholder="应收金额"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="commAmount" label="派发佣金金额" min-width="150">
            <template slot-scope="scope">
              <el-input
                v-digits="2"
                v-model="scope.row.commAmount"
                :disabled="postData.calculation === 'Auto'"
                placeholder="应收金额"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="rewardAmount" label="派发内场奖励金额" min-width="150">
            <template slot-scope="scope">
              <el-input
                v-digits="2"
                v-model="scope.row.rewardAmount"
                :disabled="postData.calculation === 'Auto'"
                placeholder="应收金额"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="totalPackageAmount" label="总包业绩金额" min-width="150">
            <template slot-scope="scope">
              <el-input
                v-digits="2"
                v-model="scope.row.totalPackageAmount"
                :disabled="postData.calculation === 'Auto'"
                placeholder="应收金额"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="distributionAmount" label="分销业绩金额" min-width="150">
            <template slot-scope="scope">
              <el-input
                v-digits="2"
                v-model="scope.row.distributionAmount"
                :disabled="postData.calculation === 'Auto'"
                placeholder="应收金额"></el-input>
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
          :data="postData.receiveAchieveVO">
          <el-table-column prop="receiveAmount" label="本单应收" min-width="120"></el-table-column>
          <el-table-column prop="achieveAmount" label="本单业绩" min-width="120"></el-table-column>
          <el-table-column prop="otherChannelFees" label="其他渠道费用(正数为产生，负数为使用)" min-width="150"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div v-if="currentType !== 'declare'">
      <div class="divider-padding">
        <el-divider>业绩分配</el-divider>
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
                <el-select v-model="scope.row.target" placeholder="请选择">
                  <el-option label="公司" value="Company"></el-option>
                  <el-option label="个人" value="Personal"></el-option>
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
                <el-input v-digits="2" v-model="scope.row.amount" clearable placeholder="金额"/>
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
      <p id="anchor-9" class="ih-info-title">平台费用</p>
      <div class="ih-type-wrapper">
        <div class="title">总包</div>
        <el-button type="success" @click="handleAddAchieve('total')">新增总包业绩</el-button>
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
        <el-button type="success" @click="handleAddAchieve('distri')">新增分销业绩</el-button>
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
    <div class="text-center btn-top">
      <el-button type="primary" @click="handleSave('save')" v-if="currentType !== 'add'">保存</el-button>
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
    <ih-dialog :show="dialogAddNotice" desc="选择优惠告知书列表">
      <SelectNoticeList
        @cancel="() => (dialogAddNotice = false)"
        @finish="
            (data) => {
              finishAddNotice(data);
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
        :data="baseInfoByTerm.proId"
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
              finishAddCustomer(data);
            }
          "
      />
    </ih-dialog>
    <ih-dialog :show="dialogAddReceivePackage" desc="选择收派套餐列表">
      <SelectReceivePackage
        @cancel="() => (dialogAddReceivePackage = false)"
        @finish="
            (data) => {
              dialogAddReceivePackage = false;
              finishAddReceivePackage(data);
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
  import SelectNoticeList from "@/views/deal/dealReport/dialog/selectNoticeList.vue";
  import SelectReportInfo from "@/views/deal/dealReport/dialog/selectReportInfo.vue";
  import AgentCompanyList from "@/views/deal/dealReport/dialog/agentCompanyList.vue";
  import SelectRoom from "@/views/deal/dealReport/dialog/selectRoom.vue";
  import AddCustomer from "@/views/deal/dealReport/dialog/addCustomer.vue";
  import SelectReceivePackage from "@/views/deal/dealReport/dialog/selectReceivePackage.vue";
  import AddBroker from "@/views/deal/dealReport/dialog/addBroker.vue";
  import EditDealAchieve from "@/views/deal/dealReport/dialog/editDealAchieve.vue";
  import {
    post_buModelContType_getList, // 根据业务模式获取可选的合同类型
    post_buModelContType_subList, // 根据业务模式获取可选的细分业务模式
    get_deal_get__id, // 编辑功能
    post_deal_entryDealBasicInf, // 案场岗 - 录入成交信息
    post_deal_achieveAllotEntry, // 文员岗 - 录入成交信息
    post_deal_updateDealBasicInf, // 案场岗 - 修改成交信息
    post_deal_updateAchieveAllot, // 文员岗 - 修改成交信息
  } from "@/api/deal";
  import {
    get_term_getProBaseByTermId__termId, // 通过项目周期获取成交基础信息
  } from "@/api/project";
  import {Form as ElForm} from "element-ui";
  import {NoRepeatHttp} from "ihome-common/util/aop/no-repeat-http";

  @Component({
    components: {
      AddCustomer,
      SelectReceivePackage,
      AddBroker,
      SelectProjectCycle,
      SelectNoticeList,
      SelectRoom,
      AgentCompanyList,
      SelectReportInfo,
      EditDealAchieve},
  })
  export default class DealReportAdd extends Vue {
    contTypeList: any = []; // 合同类型选项
    subdivisionTypeList: any = []; // 细分业务模式选项
    currentType: any = null; // 用来区别是文员岗(add)位还是案场岗位(declare)
    baseInfoByTerm: any = {
      proId: null
    }; // 通过项目周期id获取到的初始化成交基础信息
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
      reportId: null, // 已成交的报备信息id
      reportName: null, // 已成交的报备信息名称
      subdivisionType: null,
      channelId: null,
      channelName: null,
      oneAgentTeamId: null,
      isMarketProject: null,
      dealOrgId: null,
      recordState: null,
      returnRatio: null,
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
      kitchen: null,
      toilet: null,
      offerNoticeVO: [], // 优惠告知书
      customerVO: [], // 客户信息
      agencyVO: [], // 渠道信息
      receiveVO: [{}], // 收派金额
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
      calculation: 'Auto', // 计算方式 - 默认自动
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
      reportId: [
        {required: true, message: "已成交的报备信息必选", trigger: "change"},
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
    dialogAddReceivePackage: any = false;
    dialogAddBroker: any = false;
    dialogAddProjectCycle: any = false;
    cycleCheckedData: any = [];
    dialogAddNotice: any = false;
    dialogAddReportInfo: any = false;
    reportCheckedData: any = [];
    dialogAddAgentCompany: any = false;
    companyCheckedData: any = [];
    dialogEditDealAchieve: any = false;
    defaultNavList: any = [
      {
        id: 1,
        name: '成交信息'
      },
      {
        id: 2,
        name: '房产信息'
      },
      {
        id: 3,
        name: '优惠告知书信息'
      },
      {
        id: 4,
        name: '客户信息'
      },
      {
        id: 5,
        name: '渠道信息'
      },
      {
        id: 6,
        name: '上传附件'
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
      }
    ]; // 锚点列表
    navFlag: any = false; // 是否展开锚点
    navList: any = []; // 锚点列表

    async created() {
      this.DealDataFlag = (this as any).$root.dictAllList('DealDataFlag'); // 数据来源
      this.postData.documentVO = (this as any).$root.dictAllList('DealFileType'); // 附件类型
      // 附件类型增加key
      if (this.postData.documentVO.length > 0) {
        this.postData.documentVO.forEach((vo: any) => {
          vo.fileList = []
        })
      }
      // 根据岗位来判断显示的新增页面
      if (this.$route.query.btnType) {
        this.currentType = this.$route.query.btnType;
      }
      // 锚点设置默认值
      this.navList = (this as any).$tool.deepClone(this.defaultNavList);
      if (this.postData.contType === 'NaturalVisitDeal') {
        this.navList = this.navList.filter((list: any) => {
          return list.id !== 5
        })
      }
      if (this.currentType === 'declare') {
        this.navList = this.navList.filter((list: any) => {
          return (list.id !== 8 && list.id !== 9)
        })
      }
      this.id = this.$route.query.id;
      if (this.id) {
        const res: any = await get_deal_get__id({id: this.id});
        this.postData = res;
      } else {
        // 录入日期
        this.postData.entryDate = new Date();
      }
    }

    // 根据业务模式获取合同类型选项
    async getContTypeList(code: any) {
      if (!code) return;
      let self = this;
      let ContType: any = (this as any).$root.dictAllList('ContType');
      let list: any = await post_buModelContType_getList({modelCode: code});
      self.contTypeList = []; // 初始化
      if (list && list.length > 0 && ContType && ContType.length > 0) {
        if (list[0].contTypeList && list[0].contTypeList.length > 0) {
          list[0].contTypeList.forEach((list: any) => {
            ContType.forEach((item: any) => {
              if (list === item.code) {
                self.contTypeList.push(item);
              }
            });
          });
        }
      }
    }

    // 根据业务模式获取细分业务模式选项
    async getSubdivisionTypeList(code: any) {
      if (!code) return;
      let self = this;
      let Subdivide: any = (this as any).$root.dictAllList('Subdivide'); // 细分业务类型字典
      let list: any = await post_buModelContType_subList({modelCode: code});
      this.subdivisionTypeList = [];
      if (list && list.length > 0 && Subdivide && Subdivide.length > 0) {
        list.forEach((list: any) => {
          Subdivide.forEach((item: any) => {
            if (list === item.code) {
              self.subdivisionTypeList.push(item);
            }
          });
        });
      }
    }

    // 跳转到指定索引的元素
    goAnchor(id: any) {
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
      })
    }

    // 选择项目周期
    selectProject() {
      this.dialogAddProjectCycle = true;
    }

    // 确定选择项目周期
    async finishAddProjectCycle(data: any) {
      // console.log('data', data);
      if (data && data.length > 0) {
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
        // 1.proId
        // this.postData.baseProId = baseInfo.proId;
        // 2.业务模式
        this.postData.businessType = baseInfo.busEnum;
        await this.getContTypeList(this.postData.businessType); // 获取合同类型
        await this.getSubdivisionTypeList(this.postData.businessType); // 获取细分业务模式
        // 3.是否市场化项目
        this.postData.isMarketProject = baseInfo.exMarket === 1 ? 'Yes' : 'No';
        // 4.是否需要更新明源数据的标志
        // this.postData.isNeedUpdate = baseInfo.exMinyuan === 1;
        // 5.是否代销
        this.postData.isMat = baseInfo.exConsignment === 1 ? 'Yes' : 'No';
        // 6.是否穿底
        // this.postData.isOver = baseInfo.exOver === 1;
        // 7.收费模式 --- 初始化收派金额，有无服务费、代理费
        // this.postData.chargeMode = baseInfo.exOver === 1;
        // 8.是否允许跨项目使用其他渠道费用 --- 用来校验收派金额，其他渠道费
        // this.postData.isOtherProUse = baseInfo.exOver === 1;
        // 9. 细分业务模式
        this.changeBusinessType(this.postData.businessType);
      }
    }

    // 改变细分业务模式
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
        this.navList = this.navList.filter((list: any) => {
          return list.id !== 5
        })
      } else {
        this.navList = (this as any).$tool.deepClone(this.defaultNavList);
        if (value !== 'DistriDeal') {
          // 不是分销成交，则删除已选择的报备信息
          this.postData.reportId = null;
          this.postData.reportName = null;
          this.reportCheckedData = [];
          (this as any).$refs["ruleForm"] && (this as any).$refs["ruleForm"].clearValidate('reportId');
        } else {
          // 分销成交
          this.selectReport(); // 选择已成交的报备信息
        }
      }
    }

    // 预览分销协议
    previewContNo() {
      console.log('预览分销协议');
      if (!this.postData.contNo) {
        this.$message.error('请先选择需要预览的分销协议');
        return;
      } else {
        // 预览
        let routeData = this.$router.resolve({
          path: "/distribution/info",
          query:{id: '81'}
        });
        window.open(routeData.href, '_blank');
      }
    }

    // 选择收派套餐
    selectPackage(scope: any) {
      console.log('选择收派套餐', scope);
      if (this.postData.calculation === 'Manual') return;
      this.dialogAddReceivePackage = true;
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

    // 确定选择优惠告知书
    async finishAddNotice(data: any) {
      console.log('data', data);
      if (data.length === 0) return
      if (this.postData.offerNoticeVO.length > 0) {
        let flag = false;
        flag = this.postData.offerNoticeVO.some((item: any) => {
          return item.id === data[0].id;
        })
        if (flag) {
          this.$message.error('已经存在相同的客户，请重新选择！');
        } else {
          this.postData.offerNoticeVO.push(...data);
          this.dialogAddNotice = false;
        }
      } else {
        this.postData.offerNoticeVO.push(...data);
        this.dialogAddNotice = false;
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
      console.log('data', data);
      if (data && data.length > 0) {
        this.postData.channelName = data[0].channelName;
        this.postData.channelId = data[0].channelId;
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
      // this.addTotalPackageList = data;
    }

    // 添加优惠告知书
    handleAddNotice() {
      this.dialogAddNotice = true;
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
      if (data.length === 0) return
      if (this.postData.customerVO.length > 0) {
        let flag = false;
        flag = this.postData.customerVO.some((item: any) => {
          return item.id === data[0].id;
        })
        if (flag) {
          this.$message.error('已经存在相同的客户，请重新选择！');
        } else {
          this.postData.customerVO.push(...data);
          this.dialogAddCustomer = false;
        }
      } else {
        this.postData.customerVO.push(...data);
        this.dialogAddCustomer = false;
      }
    }

    // 确定选择收派套餐
    async finishAddReceivePackage(data: any) {
      console.log('data', data);
      // this.addTotalPackageList = data;
      if (data.length === 0) return
      if (this.postData.receiveVO.length > 0) {
        let flag = false;
        flag = this.postData.receiveVO.some((item: any) => {
          return item.id === data[0].id;
        })
        if (flag) {
          this.$message.error('已经存在相同的收派套餐，请重新选择！');
        } else {
          this.postData.receiveVO.push(...data);
          this.dialogAddReceivePackage = false;
        }
      } else {
        this.postData.receiveVO.push(...data);
        this.dialogAddReceivePackage = false;
      }
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

    // 增加拆佣项
    handleAddCommission() {
      console.log('增加拆佣项');
      let obj = {};
      this.postData.commissionInfoList.push(obj);
    }

    // 选择拆佣名称
    selectCommName(scope: any) {
      console.log('选择拆佣名称', scope);
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
          // 区别案场岗和文员岗
          if (this.currentType === 'add') {
            // 文员岗
            await post_deal_updateAchieveAllot(postData);
          } else if (this.currentType === 'declare') {
            // 案场岗
            await post_deal_updateDealBasicInf(postData);
          }
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
          // 区别案场岗和文员岗
          if (this.currentType === 'add') {
            // 文员岗
            await post_deal_achieveAllotEntry(postData);
          } else if (this.currentType === 'declare') {
            // 案场岗
            await post_deal_entryDealBasicInf(postData);
          }
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
