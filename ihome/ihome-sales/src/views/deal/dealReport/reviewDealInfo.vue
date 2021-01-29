<!--
 * @Description:
 * @version: 
 * @Author: lsj
 * @Date: 2020-11-11 08:48:35
 * @LastEditors: lsj
 * @LastEditTime: 2021-01-25 14:55:22
-->
<template>
  <ih-page class="text-left">
    <div id="anchor-1" v-if="!['achieveDeal'].includes(currentType)">
      <p class="ih-info-title">成交信息</p>
      <el-form
        label-width="150px"
        class="demo-ruleForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="成交报告编号">{{postData.dealCode}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目周期">
              <div class="cycle-name-wrapper" :title="postData.cycleName">{{postData.projectCycle}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务模式">
              {{$root.dictAllName(postData.modelCode, 'BusinessModel')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="细分业务模式">
              {{$root.dictAllName(postData.refineModel, 'Subdivide')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否代销">
              {{$root.dictAllName(postData.isConsign, 'YesOrNoType')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否市场化项目">
              {{$root.dictAllName(postData.isMarketProject, 'YesOrNoType')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="一手代理公司">{{postData.oneAgentTeam}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="物业类型">
              {{$root.dictAllName(postData.house.propertyType, 'Property')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="栋座">{{postData.house.buildingName}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="房号">{{postData.house.roomNo}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同类型">
              {{$root.dictAllName(postData.contType, 'ContType')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="分销协议编号">
              <div class="contNo-wrapper">
                <div class="no cycle-name-wrapper" :title="postData.contNo">{{postData.contNo}}</div>
                <div v-if="postData.contNo">
                  <el-link
                    class="margin-left-10"
                    type="primary"
                    @click.native.prevent="viewContNoDetail(postData.contNo)"
                  >查看
                  </el-link>
                </div>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否垫佣">
              {{$root.dictAllName(postData.isMat, 'YesOrNoType')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="报备信息">{{postData.recordStr}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="渠道公司">
              {{postData.agencyList && postData.agencyList.length ? postData.agencyList[0].agencyName : ''}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="渠道等级">
              {{postData.agencyList && postData.agencyList.length ? $root.dictAllName(postData.agencyList[0].channelLevel, 'ChannelLevel') : ''}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经纪人">
              {{postData.agencyList && postData.agencyList.length ? postData.agencyList[0].broker : ''}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备案情况">
              {{$root.dictAllName(postData.recordState, 'HasOrNoType')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="建筑面积">{{postData.house.area}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="户型">
              <div class="home-type-wrapper">
                <div>{{postData.house.room}}室</div>
                <div>{{postData.house.hall}}厅</div>
                <div>{{postData.house.toilet}}卫</div>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="房产证/预售合同编号">{{postData.house.propertyNo}}</el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="房产证地址">{{postData.house.address}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="现场销售">{{postData.sceneSales}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="签约类型">
              {{$root.dictAllName(postData.signType, 'SignUp')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="成交阶段">
              {{$root.dictAllName(postData.stage, 'DealStage')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="明源房款回笼比例">{{postData.returnRatio ? postData.returnRatio : 0}}%</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="认购价格">{{postData.subscribePrice}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="认购日期">{{postData.subscribeDate}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="签约价格">{{postData.signPrice}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="签约日期">{{postData.signDate}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="成交组织">{{postData.dealOrgName}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="录入人">{{postData.entryPerson}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="录入日期">{{postData.entryDate}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="数据标志">
              {{$root.dictAllName(postData.dataSign, 'DealDataFlag')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="成交状态">
              {{$root.dictAllName(postData.status, 'DealStatus')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业绩分配人">{{postData.alloter}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业绩分配日期">{{postData.allotDate}}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="计算方式">
              {{$root.dictAllName(postData.calculation, 'DealCalculateWay')}}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div id="anchor-2" v-if="!['achieveDeal'].includes(currentType)">
      <p class="ih-info-title">优惠告知书信息</p>
      <el-row style="padding-left: 20px">
        <el-col>
          <el-table
            class="ih-table"
            :data="postData.offerNoticeList">
            <el-table-column prop="notificationType" label="名称" min-width="120">
              <template slot-scope="scope">
                <div>{{$root.dictAllName(scope.row.notificationType, 'NotificationType')}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="noticeNo" label="优惠告知书编号" min-width="120"></el-table-column>
            <el-table-column prop="notificationStatus" label="优惠告知书状态" min-width="120">
              <template v-slot="{ row }">
                {{$root.dictAllName(row.notificationStatus, 'NotificationStatus')}}
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="130">
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
    <div id="anchor-3" v-if="!['achieveDeal'].includes(currentType)">
      <p class="ih-info-title">客户信息</p>
      <el-row style="padding-left: 20px">
        <el-col>
          <el-table
            class="ih-table"
            :data="postData.customerList">
            <el-table-column prop="customerNo" label="客户编号" min-width="120"></el-table-column>
            <el-table-column prop="customerType" label="客户类型" min-width="120">
              <template slot-scope="scope">
                <div>{{$root.dictAllName(scope.row.customerType, 'CustType')}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="customerName" label="客户名称" min-width="120"></el-table-column>
            <el-table-column prop="customerPhone" label="手机号码" min-width="120"></el-table-column>
            <el-table-column prop="cardType" label="证件类型" min-width="150">
              <template slot-scope="scope">
                <div>{{$root.dictAllName(scope.row.cardType, 'CardType')}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="cardNo" label="证件编号" min-width="150"></el-table-column>
            <el-table-column prop="email" label="邮箱" min-width="150"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div id="anchor-4" v-if="!['baseDeal', 'achieveDeal'].includes(currentType)">
      <p class="ih-info-title">收派金额</p>
      <el-row style="padding-left: 20px">
        <el-col>
          <el-table
            class="ih-table"
            show-summary
            sum-text="合计金额"
            :summary-method="getReceiveSummaries"
            :data="postData.receiveList">
            <el-table-column prop="type" label="类型" min-width="120">
              <template slot-scope="scope">
                <div>{{$root.dictAllName(scope.row.type, 'FeeType')}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="partyACustomerName" label="甲方/客户" min-width="120">
              <template slot-scope="scope">
                <div>{{scope.row.type === "ServiceFee" ? '客户' : scope.row.partyACustomerName}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="packageId" label="收派套餐" min-width="140">
              <template slot-scope="scope">
                <div v-if="postData.calculation === 'Auto'">
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
                <div v-else>---</div>
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
            :data="postData.receiveAchieveList">
            <el-table-column prop="receiveAmount" label="本单应收" min-width="120"></el-table-column>
            <el-table-column prop="achieveAmount" label="本单业绩" min-width="120"></el-table-column>
            <el-table-column prop="otherChannelFees" label="其他渠道费用(正数为产生，负数为使用)" min-width="150"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div id="anchor-5" v-if="!['baseDeal', 'achieveDeal'].includes(currentType)">
      <p class="ih-info-title">对外拆佣</p>
      <el-row style="padding-left: 20px">
        <el-col>
          <el-table
            class="ih-table"
            show-summary
            sum-text="合计金额"
            :summary-method="getCommissionSummaries"
            :data="postData.channelCommList">
            <el-table-column prop="target" label="拆佣对象" min-width="120">
              <template slot-scope="scope">
                <div>{{$root.dictAllName(scope.row.target, 'CommObjectType')}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="agencyName" label="收款方" min-width="120"></el-table-column>
            <el-table-column prop="feeType" label="费用类型" min-width="120">
              <template slot-scope="scope">
                <div>{{$root.dictAllName(scope.row.feeType, 'FeeType')}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="partyACustomerName" label="费用来源(客户/甲方)" min-width="120"></el-table-column>
            <el-table-column prop="amount" label="金额" min-width="150"></el-table-column>
            <el-table-column prop="remarks" label="备注" min-width="150"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div id="anchor-6" v-if="!['baseDeal'].includes(currentType)">
      <p class="ih-info-title">平台费用</p>
      <div class="ih-type-wrapper">
        <div class="title">总包</div>
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
                <div>{{scope.row.rolerName}}</div>
                <div>{{scope.row.rolerPosition}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="roleAchieveCap" label="角色人业绩" min-width="120"></el-table-column>
            <el-table-column prop="roleAchieveRatio" label="角色业绩比例（%）" min-width="120"></el-table-column>
            <el-table-column prop="commFees" label="拆佣金额" min-width="150"></el-table-column>
            <el-table-column prop="commFeesRatio" label="拆佣比例（%）" min-width="150"></el-table-column>
            <el-table-column prop="belongOrgName" label="店组" min-width="150"></el-table-column>
            <el-table-column prop="managerAchieveList" label="管理岗" min-width="150">
              <template slot-scope="scope">
                <div class="manager-list" v-for="(item, index) in scope.row.managerAchieveList" :key="index">
                  <div class="fee">{{item.achieveFees}}</div>
                  <div class="ratio">{{item.ratio ? item.ratio : 0}}%</div>
                  <div class="name">
                    <span>{{item.manager ? item.manager : '---'}}</span>
                    (<span>{{$root.dictAllName(item.type, 'ManagerType')}}</span>)
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div class="ih-type-wrapper">
        <div class="title">分销</div>
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
                <div>{{scope.row.rolerName}}</div>
                <div>{{scope.row.rolerPosition}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="roleAchieveCap" label="角色人业绩" min-width="120"></el-table-column>
            <el-table-column prop="roleAchieveRatio" label="角色业绩比例（%）" min-width="120"></el-table-column>
            <el-table-column prop="commFees" label="拆佣金额" min-width="150"></el-table-column>
            <el-table-column prop="commFeesRatio" label="拆佣比例（%）" min-width="150"></el-table-column>
            <el-table-column prop="belongOrgName" label="店组" min-width="150"></el-table-column>
            <el-table-column prop="managerAchieveList" label="管理岗" min-width="150">
              <template slot-scope="scope">
                <div class="manager-list" v-for="(item, index) in scope.row.managerAchieveList" :key="index">
                  <div class="fee">{{item.achieveFees}}</div>
                  <div class="ratio">{{item.ratio ? item.ratio : 0}}%</div>
                  <div class="name">
                    <span>{{item.manager ? item.manager : '---'}}</span>
                    (<span>{{$root.dictAllName(item.type, 'ManagerType')}}</span>)
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div id="anchor-7" v-if="!['achieveDeal'].includes(currentType)">
      <p class="ih-info-title">上传附件</p>
      <el-row style="padding-left: 20px">
        <el-col>
          <el-table
            class="ih-table"
            :data="postData.documentList">
            <el-table-column prop="fileType" label="类型" width="200">
              <template slot-scope="scope">
                <div>{{$root.dictAllName(scope.row.code, 'DealFileType')}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="fileName" label="附件" min-width="300">
              <template slot-scope="scope">
                <IhUpload
                  v-if="scope.row.defaultFileLists.length"
                  :isCrop="false"
                  :isMove="false"
                  :removePermi="true"
                  size="100px"
                  :limit="scope.row.defaultFileLists.length"
                  :file-size="10"
                  :file-list.sync="scope.row.defaultFileLists"
                  :file-type="scope.row.code"
                  :upload-show="!!scope.row.defaultFileLists"
                ></IhUpload>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div class="audit-info-wrapper">
      <p class="ih-info-title">审核意见</p>
      <el-form
        :model="postData"
        :rules="rules"
        ref="ruleForm"
        label-width="20px"
        class="demo-ruleForm">
        <el-row class="audit-info">
          <el-col :span="12">
            <el-form-item label="" :prop="failBtn ? 'postRemarks' : 'empty'">
              <el-input
                type="textarea"
                :rows="3"
                v-model="postData.postRemarks"
                placeholder="请输入审核意见"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="">
              <el-button type="primary" @click="handleViewReviewDetail">查看审核详情</el-button>
              <el-button type="primary" @click="handleViewInfoDetail">查看原成交详情</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="text-center btn-top">
      <el-button @click="handleBack()">取消</el-button>
      <el-button type="danger" @click="handleFail()">驳回</el-button>
      <el-button type="success" @click="handlePass()">通过</el-button>
    </div>
    <div v-if="currentType === 'mainDeal'" class="nav-box">
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
    <ih-dialog :show="dialogReviewDeal" desc="成交审核操作记录信息">
      <ReviewDetailsDialog
        :data="reviewData"
        @cancel="() => (dialogReviewDeal = false)"
        @finish="() => {dialogReviewDeal = false}"
      />
    </ih-dialog>
    <ih-dialog :show="dialogSelectDate" desc="审核业绩确认时间">
      <ReviewDate
        :data="reviewData"
        @cancel="() => (dialogSelectDate = false)"
        @finish="
            (data) => {
              finishSelectDate(data);
            }
          "
      />
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
  import ReviewDetailsDialog from "@/views/deal/dealReport/dialog/reviewDetailsDialog.vue";
  import ReviewDate from "@/views/deal/dealReport/dialog/reviewDate.vue";
  import {
    get_deal_get__id, // 根据ID查询成交详情
    post_processRecord_rejectDeal, // 驳回
    post_processRecord_reviewDeal, // 通过
  } from "@/api/deal";
  import {
    post_notice_customer_information // 根据成交id获取优惠告知书
  } from "@/api/contract";
  import {get_org_get__id} from "@/api/system";
  import {Form as ElForm} from "element-ui";
  import {NoRepeatHttp} from "ihome-common/util/aop/no-repeat-http";

  @Component({
    components: {ReviewDate, ReviewDetailsDialog},
  })
  export default class ReviewDealInfo extends Vue {
    private isShowImg = false;
    private srcList: any = [];
    private srcData: any = [];
    postData: any = {
      dealCode: null,
      dealOrgName: null,
      house: {}, // 房产信息
      offerNoticeList: [], // 优惠告知书
      customerList: [], // 客户信息
      agencyList: [], // 渠道信息
      receiveList: [], // 收派金额
      receiveAchieveList: [], // 应收业绩 - 收派信息下
      channelCommList: [], // 对外拆佣信息
      achieveList: [], // 平台费用 - 包含总包和分销
      achieveTotalBagList: [], // 平台费用 - 总包 - 前端拆分
      achieveDistriList: [], // 平台费用 - 分销 - 前端拆分
      documentList: [], // 附件信息
      processRecordList: [], // 审核信息
      postRemarks: null,
      status: null, // 成交报告的状态
    };
    rules: any = {
      postRemarks: [
        {required: true, message: "驳回的时候审核意见不能为空", trigger: "change"},
      ],
      empty: []
    }
    id: any = null; // 成交id
    currentType: any = null; // 改变成交信息的类型
    dialogReviewDeal: any = false; // 成交审核记录弹窗标识
    dialogSelectDate: any = false; // 选择业绩确认时间
    selectData: any = null; // 业绩时间
    reviewData: any = null; // 审核详情
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
      }
    ]; // 锚点列表
    currentActiveIndex: any = 0; // 当前激活的nav
    failBtn: any = false; // 点击通过/驳回按钮

    async created() {
      this.id = this.$route.query.id;
      this.currentType = this.$route.query.type;
      // console.log('currentType', this.currentType);
      if (this.id) {
        await this.init();
      }
    }

    // 初始化数据
    async init() {
      let info: any = await get_deal_get__id({id: this.id});
      this.postData = (this as any).$tool.deepClone(info || {});
      // 初始化优惠告知书信息
      await this.getInformation();
      // console.log(this.postData);
      // 收派金额数据整理 showData
      if (this.postData.receiveList && this.postData.receiveList.length > 0) {
        this.postData.receiveList.forEach((list: any) => {
          this.$set(list, 'showData', [
            {
              ...list.collectandsendDetailDealVO,
              typeName: (this as any).$root.dictAllName(list.type, 'FeeType')
            }
          ]);
        });
      }
      // 平台费用 - 拆分总包和分销数据
      if (this.postData.achieveList && this.postData.achieveList.length > 0) {
        this.postData.achieveTotalBagList = [];
        this.postData.achieveDistriList = [];
        this.postData.achieveList.forEach((list: any) => {
          if (list.type === 'TotalBag') {
            this.postData.achieveTotalBagList.push(list);
          } else if (list.type === 'Distri') {
            this.postData.achieveDistriList.push(list);
          }
        })
      }
      // console.log(info.documentList);
      if (info.documentList && info.documentList.length) {
        this.postData.documentList = this.initDocumentList(info.documentList);
      }
      // 获取显示的成交组织name
      await this.getOrgName(info.dealOrgId);
    }

    // 获取组织name
    async getOrgName(id: any = '') {
      if (!id) return;
      const info: any = await get_org_get__id({id: id});
      // console.log('组织info:', info);
      this.postData.dealOrgName = info.name;
    }

    // 构建附件信息
    initDocumentList(list: any = []) {
      let fileList: any = (this as any).$root.dictAllList('DealFileType'); // 附件类型
      // 附件类型增加key
      if (fileList.length > 0 && list.length > 0) {
        fileList.forEach((vo: any) => {
          vo.defaultFileLists = []; // 存放原来的数据
          vo.fileList = []; // 存放新上传的数据
          list.forEach((item: any) => {
            if (vo.code === item.fileType) {
              vo.defaultFileLists.push(
                {
                  ...item,
                  name: list.fileName,
                  exAuto: true // 是否可以删除
                }
              );
            }
          });
        });
      }
      return fileList;
    }

    // 根据成交id获取优惠告知书列表
    async getInformation() {
      const list: any = await post_notice_customer_information({dealId: this.id});
      // console.log('优惠告知书列表', list);
      if (list && list.length > 0) {
        this.postData.offerNoticeList = list;
      } else {
        this.postData.offerNoticeList = [];
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

    // 预览-优惠告知书
    preview(scope: any) {
      if (scope.row.templateType === "ElectronicTemplate") {
        window.open(
          `/sales-api/sales-document-cover/file/browse/${scope.row.templateId}`
        );
      } else {
        let imgList = scope.row.noticeAttachmentList;
        this.srcList = imgList.map(
          (i: any) => `/sales-api/sales-document-cover/file/browse/${i.fileNo}`
        );
        this.srcData = imgList.map((v: any) => ({
          name: v.attachmentSuffix,
          preFileName: "优惠告知书",
        }));
        if (this.srcList.length) {
          this.isShowImg = true;
        } else {
          this.$message.warning("暂无图片");
        }
      }
    }

    // 查看审核记录
    handleViewReviewDetail() {
      this.dialogReviewDeal = true;
      this.reviewData = this.postData.processRecordList;
    }

    // 查看原成交详情
    handleViewInfoDetail() {
      this.$router.push({
        path: "/dealReport/info",
        query: {
          id: this.postData.id,
          type: "ID"
        }
      });
    }

    // 通过
    async handlePass() {
      // console.log('通过');
      this.failBtn = false;
      // 判断成交报告的状态
      if (['BranchBusinessManageUnreview', 'NotSigned'].includes(this.postData.status)) {
        // 最后一个节点审核通过时，需要选择业绩确认时间
        this.dialogSelectDate = true;
      } else {
        this.selectData = null;
        await this.submitPass();
      }
    }

    // 确定业绩时间
    async finishSelectDate(data: any) {
      this.selectData = data;
      // console.log(this.selectData);
      await this.submitPass();
    }

    async submitPass() {
      let postData: any = {
        dealId: this.id,
        remark: this.postData.postRemarks,
        achieveConfirmTime: this.selectData
      }
      await post_processRecord_reviewDeal(postData);
      this.dialogSelectDate = false;
      this.$goto({
        path: "/dealReport/list",
      });
    }

    // 驳回
    handleFail() {
      this.failBtn = true;
      this.$nextTick(() => {
        (this.$refs["ruleForm"] as ElForm).validate(this.submitFail);
      });
    }

    @NoRepeatHttp()
    async submitFail(valid: any) {
      if (valid) {
        let postData: any = {
          dealId: this.id,
          remark: this.postData.postRemarks
        }
        await post_processRecord_rejectDeal(postData);
        this.$goto({
          path: "/dealReport/list",
        });
      }
    }

    // 返回
    async handleBack() {
      this.$goto({
        path: "/dealReport/list",
      });
    }

    // 查看分销协议
    viewContNoDetail(contractNo: any) {
      if (!contractNo) return;
      let router = this.$router.resolve({
        path: `/distribution/info`,
        query: {
          contractNo: contractNo
        },
      });
      window.open(router.href, "_blank");
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
  }
</script>
<style lang="scss" scoped>
  .add-all-wrapper {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 10px;
  }

  .cycle-name-wrapper {
    width: 97%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
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

  .contNo-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;

    .no {
      flex: 1;
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

  .audit-info-wrapper {
    box-sizing: border-box;
    margin-top: 20px;

    .audit-info {
      display: flex;
      align-items: center;
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
</style>
